import express from 'express';
import { Block, Lesson, Course, CourseProgress, LessonProgress, UserProgress } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Сохранение результатов теста
router.post('/', async (req, res) => {
  try {
    const { lessonId, userId, blockId, totalQuestions, correctAnswers, courseId, totalLessons, correctLessons } = req.body;

    if (!userId || !blockId || !totalQuestions || !courseId) {
      return res.status(400).json({ error: 'Не все необходимые поля предоставлены' });
    }

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const completedLessons = Math.round((correctLessons / totalLessons) * 100);

    // Сохраняем или обновляем результат по блоку
    const [progress, created] = await UserProgress.upsert({
      blockId,
      userId,
      courseId,
      totalQuestions,
      correctAnswers,
      score,
      completedLessons,
      totalLessons,
    });

    // Обновляем общий прогресс по урокам
    const lessonProgress = await LessonProgress.findOne({ where: { userId, blockId, courseId, lessonId } });

    if (lessonProgress) {
      lessonProgress.score = score;
      await lessonProgress.save();
    } else {
      await LessonProgress.create({
        userId,
        blockId,
        courseId,
        lessonId,
        score,
        completed: false,
        totalQuestions
      });
    }

    // Обновляем общий прогресс по курсу
    const courseProgress = await CourseProgress.findOne({ where: { userId, courseId } });

    if (courseProgress) {
      // Получаем все уроки курса
      const lessonCompleted = await LessonProgress.findAll({ where: { userId, courseId } });
      // const allProgress = await UserProgress.findAll({ where: { userId, courseId } });
      // const averageProgress = allProgress.reduce((acc, curr) => acc + curr.score, 0) / allProgress.length;
      //  courseProgress.progress = Math.round(averageProgress);
      courseProgress.progress = Math.round((lessonCompleted.length / courseProgress.totalLessons) * 100),
      courseProgress.completedLessons = lessonCompleted.length;
      await courseProgress.save();
    } else {
      const courseLessons = await Lesson.findAll({
        include: [{
          model: Block,
          where: { CourseId: courseId }
        }]
      });

      await CourseProgress.create({
        userId,
        courseId,
        progress: Math.round((1 / courseLessons.length) * 100),
        completed: false,
        completedLessons: 1,
        totalLessons: courseLessons.length
      });
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

// Получение всех результатов тестов пользователя
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

// Получение общего прогресса пользователя по курсам
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
