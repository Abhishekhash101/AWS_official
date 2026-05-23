import { getPool, adminMiddleware } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const admin = adminMiddleware(req, res);
  if (!admin) return;

  try {
    const db = getPool();
    const [students, attempts, avg, top] = await Promise.all([
      db.query('SELECT COUNT(DISTINCT user_id) as count FROM quiz_scores'),
      db.query('SELECT COUNT(*) as count FROM quiz_scores'),
      db.query('SELECT ROUND(AVG(pct)) as avg FROM quiz_scores'),
      db.query(`
        SELECT u.first_name, u.last_name, u.email,
               ROUND(AVG(qs.pct)) as avg_pct, COUNT(*) as attempts
        FROM quiz_scores qs JOIN users u ON qs.user_id = u.id
        GROUP BY u.id, u.first_name, u.last_name, u.email
        ORDER BY avg_pct DESC LIMIT 5
      `),
    ]);
    res.json({
      totalStudents: parseInt(students.rows[0].count),
      totalAttempts: parseInt(attempts.rows[0].count),
      avgScore: parseInt(avg.rows[0].avg || 0),
      topScorers: top.rows,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
