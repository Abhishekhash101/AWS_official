import pkg from 'pg';
const { Pool } = pkg;
import jwt from 'jsonwebtoken';

let pool;
export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

export function authMiddleware(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
}

export function adminMiddleware(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return null;
  }
  try {
    const ADMIN_JWT_SECRET = (process.env.JWT_SECRET || 'fallback') + '_admin';
    return jwt.verify(token, ADMIN_JWT_SECRET);
  } catch {
    res.status(401).json({ error: 'Invalid admin token' });
    return null;
  }
}
