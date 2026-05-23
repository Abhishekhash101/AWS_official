import { getPool, authMiddleware } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const user = authMiddleware(req, res);
  if (!user) return;

  try {
    const db = getPool();
    const result = await db.query(
      'SELECT * FROM quiz_scores WHERE user_id = $1 ORDER BY attempted_at DESC',
      [user.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scores' });
  }
}
