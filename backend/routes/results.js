import express from 'express';
import { Block, Lesson, Course, CourseProgress, LessonProgress } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { saveTestResult, getTestResults } from '../controllers/resultsController.js';

const router = express.Router();

// Сохранение результатов теста
router.post('/', async (req, res) => {
  try {
    const { userId, blockId, totalQuestions, correctAnswers, courseId } = req.body;

    if (!userId || !blockId || !totalQuestions || !courseId) {
      return res.status(400).json({ error: 'Не все необходимые поля предоставлены' });
    }

    // Сохраняем результат теста
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const [progress, created] = await UserProgress.findOrCreate({
      where: { userId, blockId },
      defaults: {
        score,
        totalQuestions,
        correctAnswers
      }
    });

    if (!created) {
      progress.score = score;
      progress.totalQuestions = totalQuestions;
      progress.correctAnswers = correctAnswers;
      await progress.save();
    }

    // Обновляем прогресс курса
    const courseProgress = await CourseProgress.findOne({
      where: { userId, courseId }
    });

    if (courseProgress) {
      const allProgress = await UserProgress.findAll({
        where: { userId }
      });

      const averageProgress = allProgress.reduce((acc, curr) => acc + curr.score, 0) / allProgress.length;
      courseProgress.progress = Math.round(averageProgress);
      await courseProgress.save();
    }

    res.json({
      success: true,
      score,
      progress: {
        block: progress,
        course: courseProgress
      }
    });
  } catch (error) {
    console.error('Ошибка при сохранении результата:', error);
    res.status(500).json({ error: 'Ошибка при сохранении результата' });
  }
});

// Получение результатов тестов
router.get('/', async (req, res) => {
  try {
    const { userId, blockId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'ID пользователя не указан' });
    }

    const where = { userId };
    if (blockId) {
      where.blockId = blockId;
    }

    const results = await UserProgress.findAll({ where });
    res.json(results);
  } catch (error) {
    console.error('Ошибка при получении результатов:', error);
    res.status(500).json({ error: 'Ошибка при получении результатов' });
  }
});

// Получение прогресса пользователя
router.get('/user-progress', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'ID пользователя не указан' });
    }

    const progresses = await CourseProgress.findAll({
      where: { userId },
      include: [Course]
    });

    const result = progresses.map(p => ({
      courseId: p.course.id,
      courseTitle: p.course.title,
      progress: p.progress
    }));

    res.json(result);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при получении прогресса' });
  }
});

export default router;
