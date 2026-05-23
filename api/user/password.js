import { getPool, authMiddleware } from '../_utils.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ error: 'Method not allowed' });
  const user = authMiddleware(req, res);
  if (!user) return;

  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Missing fields' });
    
    const db = getPool();
    const userResult = await db.query('SELECT password_hash FROM users WHERE id = $1', [user.id]);
    const valid = await bcrypt.compare(oldPassword, userResult.rows[0].password_hash);
    if (!valid) return res.status(400).json({ error: 'Incorrect old password' });
    
    const hash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, user.id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update password' });
  }
}
