import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import { sequelize, User, Course, CourseProgress } from './models/index.js';
import codeExecutionRoutes from './routes/codeExecutionRoutes.js';
import testRoutes from './routes/testRoutes.js';
import docsRoutes from './routes/docsRoutes.js';
import progressRoutes from './routes/progress.js';
import resultsUsers from './routes/results.js';
import eventRoutes from './routes/events.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import lessonRoutes from './routes/lessons.js';
import resultsRoutes from './routes/results.js';
import { Op } from 'sequelize';

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL вашего фронтенда
  credentials: true
}));

app.use(express.json());

// Создание временной директории
if (!fs.existsSync('temp')) {
  fs.mkdirSync('temp');
}

// Подключение маршрутов
app.use('/api/docs', docsRoutes);
app.use('/api/code', codeExecutionRoutes);
app.use('/api', testRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/results', resultsUsers);
app.use('/api/events', eventRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/results', resultsRoutes);

// Регистрация пользователя
app.post('/api/register', async (req, res) => {
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
        fullName: user.fullName
      }
    });
  } catch (err) {
    console.error('Ошибка при регистрации:', err);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
});

// Вход пользователя
app.post('/api/login', async (req, res) => {
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
        fullName: user.fullName
      }
    });
  } catch (err) {
    console.error('Ошибка при входе:', err);
    res.status(500).json({ error: 'Ошибка при входе в систему' });
  }
});

// Создание администратора
const createAdmin = async () => {
  try {
    const existing = await User.findOne({ where: { username: 'admin' } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        fullName: 'Администратор',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Администратор создан: admin / admin123');
    } else {
      console.log('ℹ️ Администратор уже существует');
    }
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
  }
};

// Получение списка курсов
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Запись на курс
app.post('/api/enroll', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    const progress = await CourseProgress.create({ userId, courseId });
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Обновление прогресса
app.put('/api/progress', async (req, res) => {
  const { userId, courseId, progress } = req.body;
  try {
    const record = await CourseProgress.findOne({ where: { userId, courseId } });
    if (!record) return res.status(404).send('Прогресс не найден');
    record.progress = progress;
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Получение профиля пользователя
app.get('/api/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findOne({ where: { id: userId }, include: [Course] });
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении данных' });
  }
});

// Выход (опционально: очистка cookie)
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Выход выполнен' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const startServer = async () => {
  try {
    // Синхронизация базы данных
    await sequelize.sync({ alter: true });
    console.log('✅ База данных синхронизирована');

    // Создание администратора
    await createAdmin();

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`✅ Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

startServer();
