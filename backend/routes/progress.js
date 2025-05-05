import express from 'express';
import UserProgress from '../models/UserProgress.js';
import { getCourseProgress, updateCourseProgress, getLessonProgress, updateLessonProgress, saveProgress, getProgress } from '../controllers/progressController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  const { userId, blockId, totalQuestions, correctAnswers } = req.body;

  if (!userId || !blockId || !totalQuestions) {
    return res.status(400).json({ message: 'Недостаточно данных' });
  }

  const percentage = (correctAnswers / totalQuestions) * 100;
  let grade = 3;
  if (percentage >= 85) grade = 5;
  else if (percentage >= 75) grade = 4;

  try {
    const [record, created] = await UserProgress.upsert({
      userId, blockId, totalQuestions, correctAnswers, grade,
    });

    res.json({ message: 'Прогресс сохранён', grade });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при сохранении', error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await UserProgress.findAll({ where: { userId } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка загрузки', error: err.message });
  }
});

// Маршруты для прогресса блоков
router.post('/blocks/save', authMiddleware, saveProgress);
router.get('/blocks/:userId', authMiddleware, getProgress);

// Маршруты для прогресса курсов
router.get('/courses', authMiddleware, getCourseProgress);
router.post('/courses', authMiddleware, updateCourseProgress);

// Маршруты для прогресса уроков
router.get('/lessons', authMiddleware, getLessonProgress);
router.post('/lessons', authMiddleware, updateLessonProgress);

export default router;
