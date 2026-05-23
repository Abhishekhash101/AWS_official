import { getPool } from './_utils.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const db = getPool();
    await db.query('SELECT 1');
    res.status(200).json({
      status: 'ok',
      backend: 'vercel serverless',
      database: 'connected',
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.status(500).json({ status: 'error', backend: 'vercel serverless', database: 'disconnected', error: err.message });
  }
}
