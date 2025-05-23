import express from 'express';
import UserProgress from '../models/UserProgress.js';
import { getCourseProgress, updateCourseProgress, getLessonProgress, updateLessonProgress, saveProgress, getProgress } from '../controllers/progressController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { LessonProgress, User, Lesson, CourseProgress, Course, Block } from '../models/index.js';
import { getUserProgress, resetProgress } from '../controllers/courseProgressController.js';

const router = express.Router();

// Сохранение прогресса пользователя
router.post('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { totalQuestions, correctAnswers, blockId } = req.body;

    if (!totalQuestions || !blockId) {
      return res.status(400).json({ error: 'Недостаточно данных' });
    }

    const percentage = (correctAnswers / totalQuestions) * 100;
    let grade = 3;
    if (percentage >= 85) grade = 5;
    else if (percentage >= 75) grade = 4;

    const [progress, created] = await UserProgress.findOrCreate({
      where: { 
        UserId: userId,
        BlockId: blockId
      },
      defaults: {
        totalQuestions,
        correctAnswers,
        grade,
        lastAccessedAt: new Date()
      }
    });

    if (!created) {
      progress.totalQuestions = totalQuestions;
      progress.correctAnswers = correctAnswers;
      progress.grade = grade;
      progress.lastAccessedAt = new Date();
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Ошибка при сохранении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при сохранении прогресса' });
  }
});

// Получение прогресса пользователя
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await UserProgress.findAll({
      where: { UserId: userId },
      include: [Block]
    });
    res.json(progress);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при получении прогресса' });
  }
});

// Сохранение прогресса по уроку
router.post('/lesson/:lessonId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lessonId } = req.params;
    const { completed, score, answers, totalQuestions, correctAnswers } = req.body;

    // Обновляем прогресс урока
    const [lessonProgress, lessonCreated] = await LessonProgress.findOrCreate({
      where: { 
        UserId: userId,
        LessonId: lessonId
      },
      defaults: {
        completed: completed || false,
        score: score || 0,
        answers: answers || [],
        totalQuestions: totalQuestions || 0,
        correctAnswers: correctAnswers || 0,
        lastAccessedAt: new Date()
      }
    });

    if (!lessonCreated) {
      lessonProgress.completed = completed !== undefined ? completed : lessonProgress.completed;
      lessonProgress.score = score !== undefined ? score : lessonProgress.score;
      lessonProgress.answers = answers || lessonProgress.answers;
      lessonProgress.totalQuestions = totalQuestions || lessonProgress.totalQuestions;
      lessonProgress.correctAnswers = correctAnswers || lessonProgress.correctAnswers;
      lessonProgress.lastAccessedAt = new Date();
      await lessonProgress.save();
    }

    // Получаем курс, к которому принадлежит урок
    const lesson = await Lesson.findByPk(lessonId, {
      include: [{
        model: Block,
        include: [Course]
      }]
    });

    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }

    const courseId = lesson.Block.Course.id;

    // Получаем все уроки курса
    const courseLessons = await Lesson.findAll({
      include: [{
        model: Block,
        where: { CourseId: courseId }
      }]
    });

    // Получаем прогресс по всем урокам курса
    const completedLessons = await LessonProgress.count({
      where: {
        UserId: userId,
        LessonId: courseLessons.map(l => l.id),
        completed: true
      }
    });

    // Обновляем прогресс курса
    const [courseProgress, courseCreated] = await CourseProgress.findOrCreate({
      where: { 
        UserId: userId,
        CourseId: courseId
      },
      defaults: {
        completed: completedLessons === courseLessons.length,
        completedLessons,
        totalLessons: courseLessons.length,
        lastAccessedAt: new Date()
      }
    });

    if (!courseCreated) {
      courseProgress.completed = completedLessons === courseLessons.length;
      courseProgress.completedLessons = completedLessons;
      courseProgress.totalLessons = courseLessons.length;
      courseProgress.lastAccessedAt = new Date();
      await courseProgress.save();
    }

    // Обновляем общий прогресс пользователя
    const [userProgress, userCreated] = await UserProgress.findOrCreate({
      where: { 
        UserId: userId,
        BlockId: lesson.BlockId
      },
      defaults: {
        totalQuestions: totalQuestions || 0,
        correctAnswers: correctAnswers || 0,
        grade: calculateGrade(correctAnswers, totalQuestions),
        lastAccessedAt: new Date()
      }
    });

    if (!userCreated) {
      userProgress.totalQuestions = totalQuestions || userProgress.totalQuestions;
      userProgress.correctAnswers = correctAnswers || userProgress.correctAnswers;
      userProgress.grade = calculateGrade(correctAnswers, totalQuestions);
      userProgress.lastAccessedAt = new Date();
      await userProgress.save();
    }

    res.json({
      lessonProgress,
      courseProgress,
      userProgress
    });
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

// Вспомогательная функция для расчета оценки
function calculateGrade(correctAnswers, totalQuestions) {
  if (!totalQuestions) return 0;
  const percentage = (correctAnswers / totalQuestions) * 100;
  if (percentage >= 85) return 5;
  if (percentage >= 75) return 4;
  if (percentage >= 60) return 3;
  return 2;
}

// Получение прогресса по уроку
router.get('/lesson/:lessonId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { lessonId } = req.params;

    const progress = await LessonProgress.findOne({
      where: { 
        UserId: userId,
        LessonId: lessonId
      },
      include: [Lesson]
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

// Получение прогресса по курсу
router.get('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;

    const progress = await CourseProgress.findOne({
      where: { 
        UserId: userId,
        CourseId: courseId
      },
      include: [{
        model: Course,
        include: [{
          model: Lesson,
          include: [{
            model: User,
            through: LessonProgress,
            where: { id: userId }
          }]
        }]
      }]
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

// Получение всех курсов с прогрессом пользователя
router.get('/courses', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    const courses = await Course.findAll({
      include: [{
        model: User,
        through: CourseProgress,
        where: { id: userId }
      }]
    });

    res.json(courses);
  } catch (error) {
    console.error('Ошибка при получении курсов:', error);
    res.status(500).json({ error: 'Ошибка при получении курсов' });
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

// Получение прогресса по урокам
router.get('/lesson-progress', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const progress = await LessonProgress.findAll({
      where: { UserId: userId },
      include: [Lesson]
    });
    res.json(progress);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при получении прогресса' });
  }
});

// Обновление прогресса по уроку
router.post('/lesson-progress', authMiddleware, async (req, res) => {
  try {
    const { lessonId, completed, score } = req.body;
    const userId = req.user.userId;

    const [progress, created] = await LessonProgress.findOrCreate({
      where: { 
        UserId: userId,
        LessonId: lessonId
      },
      defaults: {
        completed: completed || false,
        score: score || 0
      }
    });

    if (!created) {
      progress.completed = completed || progress.completed;
      progress.score = score || progress.score;
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

// Обновление прогресса по курсу
router.post('/course/:courseId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { courseId } = req.params;
    const { completed, score, completedLessons, totalLessons } = req.body;

    const [progress, created] = await CourseProgress.findOrCreate({
      where: { 
        UserId: userId,
        CourseId: courseId
      },
      defaults: {
        completed: completed || false,
        score: score || 0,
        completedLessons: completedLessons || 0,
        totalLessons: totalLessons || 0,
        lastAccessedAt: new Date()
      }
    });

    if (!created) {
      progress.completed = completed !== undefined ? completed : progress.completed;
      progress.score = score !== undefined ? score : progress.score;
      progress.completedLessons = completedLessons !== undefined ? completedLessons : progress.completedLessons;
      progress.totalLessons = totalLessons !== undefined ? totalLessons : progress.totalLessons;
      progress.lastAccessedAt = new Date();
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
});

// Получение прогресса пользователя по всем курсам
router.get('/courses', authMiddleware, getUserProgress);

// Обновление прогресса урока
router.post('/lessons/:lessonId', authMiddleware, updateLessonProgress);

// Сброс прогресса курса
router.post('/courses/:courseId/reset', authMiddleware, resetProgress);

export default router;
