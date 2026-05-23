import jwt from 'jsonwebtoken';

const ADMIN_ID = 'aws_admin';
const ADMIN_PASSWORD = 'CloudAdmin@2025';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { adminId, password } = req.body;
  
  if (adminId !== ADMIN_ID || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }
  
  const ADMIN_JWT_SECRET = (process.env.JWT_SECRET || 'fallback') + '_admin';
  const token = jwt.sign({ role: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: '8h' });
  res.json({ message: 'Admin login successful', token });
}
