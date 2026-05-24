import { getPool, adminMiddleware } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const admin = adminMiddleware(req, res);
  if (!admin) return;

  try {
    const { action } = req.body;
    if (!['initiate', 'terminate'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const status = action === 'initiate' ? 'active' : 'inactive';

    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS global_settings (
        key VARCHAR(64) PRIMARY KEY,
        value VARCHAR(255) NOT NULL
      );
    `);

    await db.query(`
      INSERT INTO global_settings (key, value) VALUES ('quiz_status', $1)
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `, [status]);

    res.json({ message: `Quiz ${status} successfully`, status });
  } catch (error) {
    console.error('Quiz control error:', error);
    res.status(500).json({ error: 'Failed to update quiz status' });
  }
}
