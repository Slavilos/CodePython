// routes/docsRoutes.js
import express from 'express';
import { Lesson } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение всех уроков
router.get('/', authMiddleware, async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(lessons);
  } catch (error) {
    console.error('Ошибка при получении уроков:', error);
    res.status(500).json({ error: 'Ошибка при получении уроков' });
  }
});

// Получение последних уроков
router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3
    });
    res.json(lessons);
  } catch (error) {
    console.error('Ошибка при получении последних уроков:', error);
    res.status(500).json({ error: 'Ошибка при получении последних уроков' });
  }
});

// Получение урока по ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }
    res.json(lesson);
  } catch (error) {
    console.error('Ошибка при получении урока:', error);
    res.status(500).json({ error: 'Ошибка при получении урока' });
  }
});

export default router;
