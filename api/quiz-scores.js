import { getPool, authMiddleware } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const user = authMiddleware(req, res);
  if (!user) return;

  try {
    const { quizId, quizTitle, quizType, score, total } = req.body;
    if (quizId === undefined || score === undefined || !total)
      return res.status(400).json({ error: 'Missing required fields' });

    const pct = Math.round((score / total) * 100);
    const db = getPool();
    const result = await db.query(
      `INSERT INTO quiz_scores (user_id, quiz_id, quiz_title, quiz_type, score, total, pct)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [user.id, quizId, quizTitle, quizType || 'quiz', score, total, pct]
    );
    res.status(201).json({ message: 'Score saved', score: result.rows[0] });
  } catch (error) {
    console.error('Score save error:', error);
    res.status(500).json({ error: 'Failed to save score' });
  }
}
