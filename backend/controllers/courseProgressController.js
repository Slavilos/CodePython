import { Course, CourseProgress, Lesson, LessonProgress } from '../models/index.js';

export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // Получаем прогресс по всем курсам пользователя
    const progress = await CourseProgress.findAll({
      where: { userId },
      include: [{
        model: Course,
        attributes: ['id', 'title', 'description']
      }],
      order: [['updatedAt', 'DESC']]
    });

    // Для каждого курса вычисляем актуальный прогресс
    const progressWithDetails = await Promise.all(progress.map(async (p) => {
      // Получаем все уроки курса
      const lessons = await Lesson.findAll({
        where: { courseId: p.courseId }
      });

      // Получаем завершенные уроки
      const completedLessons = await LessonProgress.findAll({
        where: {
          userId,
          lessonId: lessons.map(l => l.id),
          completed: true
        }
      });

      // Вычисляем процент прогресса
      const totalLessons = lessons.length;
      const completedCount = completedLessons.length;
      const progressPercent = totalLessons > 0 
        ? Math.round((completedCount / totalLessons) * 100)
        : 0;

      // Обновляем прогресс в базе, если он изменился
      if (p.progress !== progressPercent) {
        await p.update({
          progress: progressPercent,
          completed: progressPercent === 100
        });
      }

      return {
        ...p.toJSON(),
        progress: progressPercent,
        completed: progressPercent === 100,
        totalLessons,
        completedLessons: completedCount
      };
    }));

    res.json(progressWithDetails);
  } catch (error) {
    console.error('Ошибка при получении прогресса:', error);
    res.status(500).json({ error: 'Ошибка при получении прогресса курсов' });
  }
};

export const updateLessonProgress = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;
    const { completed } = req.body;

    // Обновляем или создаем прогресс урока
    const [lessonProgress] = await LessonProgress.findOrCreate({
      where: { userId, lessonId },
      defaults: { completed: false }
    });

    await lessonProgress.update({ completed });

    // Обновляем прогресс курса
    const lesson = await Lesson.findByPk(lessonId);
    if (lesson) {
      const courseProgress = await getUserProgress(req, res);
    }

    res.json(lessonProgress);
  } catch (error) {
    console.error('Ошибка при обновлении прогресса урока:', error);
    res.status(500).json({ error: 'Ошибка при обновлении прогресса' });
  }
};

export const resetProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId } = req.params;

    // Удаляем прогресс всех уроков курса
    await LessonProgress.destroy({
      where: {
        userId,
        lessonId: {
          [Op.in]: Sequelize.literal(`
            SELECT id FROM Lessons WHERE courseId = ${courseId}
          `)
        }
      }
    });

    // Обновляем прогресс курса
    await CourseProgress.update(
      { progress: 0, completed: false },
      { where: { userId, courseId } }
    );

    res.json({ message: 'Прогресс курса сброшен' });
  } catch (error) {
    console.error('Ошибка при сбросе прогресса:', error);
    res.status(500).json({ error: 'Ошибка при сбросе прогресса курса' });
  }
}; 