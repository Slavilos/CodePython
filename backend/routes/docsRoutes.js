// routes/docsRoutes.js
import express from 'express';
import { Lecture } from '../models/index.js'; // Убедись, что Lecture подключена правильно

const router = express.Router();

// Отдаём последние 3 лекции
router.get('/latest-docs', async (req, res) => {
  try {
    const latest = await Lecture.findAll({
      order: [['createdAt', 'DESC']],
      limit: 3,
    });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при загрузке лекций' });
  }
});

export default router;
