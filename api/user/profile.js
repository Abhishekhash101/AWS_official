import { getPool, authMiddleware } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });
  const user = authMiddleware(req, res);
  if (!user) return;

  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) return res.status(400).json({ error: 'Missing fields' });
    const db = getPool();
    const result = await db.query(
      'UPDATE users SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING id, first_name, last_name, email',
      [firstName, lastName, user.id]
    );
    res.json({ message: 'Profile updated', user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
}
