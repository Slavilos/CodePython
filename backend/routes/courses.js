import express from 'express';
import { Course, CourseProgress, LessonProgress, User, Block, Lesson, PracticalAssignment } from '../models/index.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Получение всех курсов
router.get('/', async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [
        CourseProgress,
        LessonProgress,
        {
          model: Block,
          as: 'Blocks', // Используем правильный псевдоним
          include: [
            {
              model: Lesson,
              as: 'Lessons', // Используем правильный псевдоним
              include: [
                {
                  model: PracticalAssignment,
                  as: 'PracticalAssignments'
                }
              ]
            }
          ]
        }        
      ]
    });

    console.log('Fetched courses with PracticalAssignments:', JSON.stringify(courses, null, 2)); // Новый отладочный вывод

    // Декодируем поле content для каждого курса
    const decodedCourses = courses.map(course => {
      return {
        ...course.toJSON(),
        content: JSON.parse(course.content)
      };
    });

    res.json(decodedCourses);
  } catch (error) {
    console.error('Ошибка при получении курсов:', error);
    res.status(500).json({ error: 'Ошибка при получении курсов' });
  }
});

// Получение курса по ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    res.json(course);
  } catch (error) {
    console.error('Ошибка при получении курса:', error);
    res.status(500).json({ error: 'Ошибка при получении курса' });
  }
});

// Запись на курс
router.post('/enroll', authMiddleware, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    const existingProgress = await CourseProgress.findOne({
      where: { userId, courseId }
    });

    if (existingProgress) {
      return res.status(400).json({ error: 'Вы уже записаны на этот курс' });
    }

    const progress = await CourseProgress.create({
      userId,
      courseId,
      progress: 0
    });

    res.status(201).json(progress);
  } catch (error) {
    console.error('Ошибка при записи на курс:', error);
    res.status(500).json({ error: 'Ошибка при записи на курс' });
  }
});

// Получение прогресса по курсу
router.get('/:id/progress', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const progress = await CourseProgress.findOne({
      where: { userId, courseId: id }
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

// Обновление прогресса по курсу
router.put('/:id/progress', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { progress } = req.body;
    const userId = req.user.userId;

    const courseProgress = await CourseProgress.findOne({
      where: { userId, courseId: id }
    });

    if (!courseProgress) {
      return res.status(404).json({ error: 'Прогресс не найден' });
    }

    courseProgress.progress = progress;
    await courseProgress.save();

    res.json(courseProgress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

export default router;