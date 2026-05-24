import { getPool } from '../_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS global_settings (
        key VARCHAR(64) PRIMARY KEY,
        value VARCHAR(255) NOT NULL
      );
    `);
    
    // Default to active if not set, or inactive? User requested "block" unless initiated, so default inactive.
    const result = await db.query("SELECT value FROM global_settings WHERE key = 'quiz_status'");
    const status = result.rows.length > 0 ? result.rows[0].value : 'inactive';
    
    res.status(200).json({ status });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch status' });
  }
}
