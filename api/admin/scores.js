import { getPool, adminMiddleware } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const admin = adminMiddleware(req, res);
  if (!admin) return;

  try {
    const db = getPool();
    const result = await db.query(`
      SELECT qs.id, qs.quiz_id, qs.quiz_title, qs.quiz_type,
             qs.score, qs.total, qs.pct, qs.attempted_at,
             u.first_name, u.last_name, u.email
      FROM quiz_scores qs
      JOIN users u ON qs.user_id = u.id
      ORDER BY qs.attempted_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Admin scores error:', error);
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
}
