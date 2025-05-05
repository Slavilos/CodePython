import express from 'express';
import { Lesson, LessonProgress, Course } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение всех уроков курса
router.get('/course/:courseId', async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { courseId: req.params.courseId },
      order: [['order', 'ASC']]
    });
    res.json(lessons);
  } catch (error) {
    console.error('Ошибка при получении уроков:', error);
    res.status(500).json({ error: 'Ошибка при получении уроков' });
  }
});

// Получение урока по ID
router.get('/:id', async (req, res) => {
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

// Получение прогресса по уроку
router.get('/:id/progress', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const progress = await LessonProgress.findOne({
      where: { userId, lessonId: id }
    });

    if (!progress) {
      return res.status(404).json({ error: 'Прогресс не найден' });
    }

    res.json(progress);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при получении прогресса' });
  }
});

// Обновление прогресса по уроку
router.put('/:id/progress', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    const userId = req.user.userId;

    const lessonProgress = await LessonProgress.findOne({
      where: { userId, lessonId: id }
    });

    if (!lessonProgress) {
      return res.status(404).json({ error: 'Прогресс не найден' });
    }

    lessonProgress.progress = progress;
    await lessonProgress.save();

    // Обновляем прогресс курса
    const lesson = await Lesson.findByPk(id);
    if (lesson) {
      const courseLessons = await Lesson.findAll({
        where: { courseId: lesson.courseId }
      });

      const courseProgress = await LessonProgress.findAll({
        where: {
          userId,
          lessonId: courseLessons.map(l => l.id)
        }
      });

      const averageProgress = courseProgress.reduce((acc, curr) => acc + curr.progress, 0) / courseLessons.length;

      await CourseProgress.update(
        { progress: Math.round(averageProgress) },
        { where: { userId, courseId: lesson.courseId } }
      );
    }

    res.json(lessonProgress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

export default router; 