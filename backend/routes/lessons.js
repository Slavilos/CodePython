import express from 'express';
import { Lesson, LessonProgress, Block, CourseProgress } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение всех уроков курса по его ID
router.get('/course/:courseId', async (req, res) => {
  try {
    const blocks = await Block.findAll({
      where: { CourseId: req.params.courseId },
      attributes: ['id']
    });

    const blockIds = blocks.map(b => b.id);

    const lessons = await Lesson.findAll({
      where: { BlockId: blockIds },
      order: [['order', 'ASC']]
    });

    res.json(lessons);
  } catch (error) {
    console.error('Ошибка при получении уроков:', error);
    res.status(500).json({ error: 'Ошибка при получении уроков' });
  }
});

// Получение уроков по ID курса
router.get('/course/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.findAll({
      where: { '$Block.CourseId$': courseId },
      include: [{
        association: 'Block',
        attributes: []
      }]
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
      // Получаем блок урока
      const block = await Block.findByPk(lesson.BlockId);
      if (!block) {
        return res.status(404).json({ error: 'Блок не найден' });
      }

      // Получаем все блоки курса
      const blocks = await Block.findAll({
        where: { CourseId: block.CourseId },
        attributes: ['id']
      });

      const blockIds = blocks.map(b => b.id);

      // Получаем все уроки курса через блоки
      const courseLessons = await Lesson.findAll({
        where: { BlockId: blockIds }
      });

      // Получаем прогресс по этим урокам
      const courseProgress = await LessonProgress.findAll({
        where: {
          userId,
          lessonId: courseLessons.map(l => l.id)
        }
      });

      // Вычисляем средний прогресс
      const averageProgress = courseProgress.reduce((acc, curr) => acc + curr.progress, 0) / courseLessons.length;

      await CourseProgress.update(
        { progress: Math.round(averageProgress) },
        { where: { userId, courseId: block.CourseId } }
      );
    }

    res.json(lessonProgress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

export default router;
