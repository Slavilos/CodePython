import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize';
import {
  sequelize,
  User,
  Course,
  CourseProgress
} from './models/index.js';
import codeExecutionRoutes from './routes/codeExecutionRoutes.js';
import testRoutes from './routes/testRoutes.js';
import docsRoutes from './routes/docsRoutes.js';
import progressRoutes from './routes/progress.js';
import resultsUsers from './routes/results.js';
import eventRoutes from './routes/events.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import lessonsRoutes from './routes/lessons.js';
import resultsRoutes from './routes/results.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:5173',
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
app.use('/api/lessons', lessonsRoutes);
app.use('/api/results', resultsRoutes);
app.use('/api/admin', adminRoutes);

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
      const hashedPassword = await bcrypt.hash('password', 10);
      await User.create({
        fullName: 'Администратор',
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Администратор создан: admin / password');
    } else {
      // Обновляем пароль существующего админа
      const hashedPassword = await bcrypt.hash('password', 10);
      await existing.update({
        password: hashedPassword,
        role: 'admin'
      });
      console.log('✅ Пароль администратора обновлен: admin / password');
    }
  } catch (error) {
    console.error('Ошибка при создании/обновлении администратора:', error);
  }
};

// Получение списка курсов
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { isBuiltIn: false },
      include: [{
        model: Block,
        include: [{
          model: Lesson,
          include: [Question, PracticalAssignment]
        }]
      }]
    });
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Что-то пошло не так!' });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;

const createTestCourse = async () => {
  try {
    const exists = await Course.findOne({ where: { title: 'Введение в Python' } });
    if (exists) return;

    const course = await Course.create({
      title: 'Введение в Python',
      description: 'Базовый курс по программированию на Python',
      level: 'beginner',
      duration: 60,
      authorId: 1,
      isBuiltIn: false
    });

    const block = await Block.create({
      title: 'Блок 1: Основы',
      CourseId: course.id
    });

    const lesson = await Lesson.create({
      title: 'Урок 1: Первая программа',
      content: { sections: [] }, // Добавлено значение для content
      BlockId: block.id
    });

    await Question.create({
      question: 'Что выведет print("Hello")?',
      options: ['Hi', 'Hello', 'Error', 'None'],
      correctAnswer: 1,
      type: 'choice',
      LessonId: lesson.id
    });

    await PracticalAssignment.create({
      title: 'Практика: Hello World',
      description: 'Напишите программу, которая печатает "Hello"',
      initialCode: 'print("")',
      testCases: [
        { input: '', expectedOutput: 'Hello' }
      ],
      LessonId: lesson.id
    });

    console.log('✅ Курс с блоком, уроком и практикой создан');
  } catch (error) {
    console.error('❌ Ошибка при создании тестового курса:', error);
  }
};
const startServer = async () => {
  try {
    // Создаем временное подключение для создания базы данных
    const tempSequelize = new Sequelize('mysql', 'codepython', '7KsycuFIlChyG20FuUuQqodadkwYZ4LB', {
      host: 'dpg-d0o0o7ali9vc73fhqe20-a',
       port: 5432,
      dialect: 'mysql'
    });


    // // Создаем базу данных, если она не существует
    // await tempSequelize.query('CREATE DATABASE IF NOT EXISTS codepython;');
    // await tempSequelize.close();

    // Проверка подключения к базе данных
    await sequelize.authenticate();
    console.log('✅ Подключение к базе данных установлено');

    // Синхронизация моделей с базой данных
    await sequelize.sync({ 
      alter: true,
      force: false // не удаляем существующие таблицы
    });
    console.log('✅ База данных синхронизирована');

    // Создание администратора
    await createAdmin();
    
    // Создание тестового курса
    await createTestCourse();

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
