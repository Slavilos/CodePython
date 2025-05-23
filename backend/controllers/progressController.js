import { UserProgress, CourseProgress, Course, Lesson, LessonProgress, Block } from '../models/index.js';
import { logEvent } from '../utils/logEvent.js';

export const saveProgress = async (req, res) => {
  try {
    const { userId, blockId, score, courseId } = req.body;

    // Валидация входных данных
    if (!userId || !blockId || score === undefined || !courseId) {
      return res.status(400).json({ message: 'Не все необходимые поля предоставлены' });
    }

    if (score < 0 || score > 100) {
      return res.status(400).json({ message: 'Оценка должна быть от 0 до 100' });
    }

    // Сохраняем прогресс пользователя
    let progress = await UserProgress.findOne({ where: { userId, blockId } });

    if (progress) {
      progress.score = score;
      await progress.save();
    } else {
      progress = await UserProgress.create({ userId, blockId, score });
    }

    // Обновляем общий прогресс курса
    const courseProgress = await CourseProgress.findOne({ 
      where: { userId, courseId }
    });

    if (courseProgress) {
      // Получаем все блоки курса
      const course = await Course.findByPk(courseId, {
        include: [{ model: Lesson, as: 'lessons' }]
      });

      // Получаем прогресс по всем блокам
      const allProgress = await UserProgress.findAll({
        where: { 
          userId,
          blockId: course.lessons.map(lesson => lesson.id)
        }
      });

      // Вычисляем средний прогресс
      const averageProgress = allProgress.reduce((acc, curr) => acc + curr.score, 0) / allProgress.length;

      courseProgress.progress = Math.round(averageProgress);
      await courseProgress.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        progress: score
      });
    }

    res.json({
      blockProgress: progress,
      courseProgress: courseProgress
    });
  } catch (error) {
    console.error('Ошибка при сохранении прогресса:', error);
    res.status(500).json({ message: 'Ошибка при сохранении прогресса' });
  }
};

export const getProgress = async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.query.courseId;

    if (!userId) {
      return res.status(400).json({ message: 'ID пользователя не указан' });
    }

    const query = { where: { userId } };
    
    if (courseId) {
      query.where.courseId = courseId;
    }

    const progress = await UserProgress.findAll(query);
    const courseProgress = await CourseProgress.findAll(query);

    res.json({
      blockProgress: progress,
      courseProgress: courseProgress
    });
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ message: 'Ошибка при получении прогресса' });
  }
};

// Получение прогресса по курсам
export const getCourseProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await CourseProgress.findAll({
      where: { userId },
      include: [{
        model: Course,
        attributes: ['id', 'title', 'description']
      }]
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении прогресса' });
  }
};

// Обновление прогресса по курсу
export const updateCourseProgress = async (req, res) => {
  try {
    const { courseId, progress } = req.body;
    const userId = req.user.id;

    const [courseProgress, created] = await CourseProgress.findOrCreate({
      where: { userId, courseId },
      defaults: { progress: 0 }
    });

    if (!created) {
      courseProgress.progress = progress;
      await courseProgress.save();
    }

    res.json(courseProgress);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
};

// Получение прогресса по урокам
export const getLessonProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await LessonProgress.findAll({
      where: { userId },
      include: [{
        model: Lesson,
        attributes: ['id', 'title', 'content'],
        include: [{
          model: Block,
          attributes: ['id', 'title']
        }]
      }]
    });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении прогресса уроков' });
  }
};

// Обновление прогресса по уроку
export const updateLessonProgress = async (req, res) => {
  try {
    const { lessonId, scorePercent, completed } = req.body;
    const userId = req.user.id;

    const [lessonProgress, created] = await LessonProgress.findOrCreate({
      where: { userId, lessonId },
      defaults: { scorePercent: 0, completed: false }
    });

    if (!created) {
      lessonProgress.scorePercent = scorePercent;
      lessonProgress.completed = completed;
      await lessonProgress.save();
    }
if (completed) {
  const lesson = await Lesson.findByPk(lessonId, {
    include: [{
      model: Block,
      include: [{ model: Course }]
    }]
  });

  const course = lesson?.Block?.Course;
  const courseId = course?.id;

await logEvent({
  userId,
  type: 'lesson_completed',
  description: `Урок "${lesson.title}" завершён с результатом ${scorePercent}%. Курс: "${course?.title}"`,
  courseId,
  lessonId
});
}
    res.json(lessonProgress);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении прогресса урока' });
  }
};
