import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Требуется авторизация' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Неверный токен' });
  }
}; 