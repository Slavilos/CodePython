import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { Op } from 'sequelize';

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: 'Все поля обязательны' });
    }

    const existingUser = await User.findOne({ 
      where: { 
        [Op.or]: [{ email }, { username }] 
      } 
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email или username уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      fullName, 
      username, 
      email, 
      password: hashedPassword 
    });

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'secretKey', 
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      message: 'Пользователь зарегистрирован', 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

// Вход
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Необходимо указать username и password' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET || 'secretKey', 
      { expiresIn: '24h' }
    );

    res.json({ 
      message: 'Успешный вход', 
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Ошибка при входе:', err);
    res.status(500).json({ error: 'Ошибка при входе в систему' });
  }
});

// Получение профиля
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId, {
      attributes: { exclude: ['password'] }
    });
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении профиля' });
  }
});

export default router; 