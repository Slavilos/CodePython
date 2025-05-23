import { Event, User, Course, Lesson, sequelize } from '../models/index.js';

// Создание события
export const createEvent = async (req, res) => {
  try {
    const { type, description, courseId, lessonId } = req.body;
    const userId = req.user.userId;

const event = await Event.create({
  UserId: userId,
  type,
  description,
  CourseId: courseId,
  LessonId: lessonId
});

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании события' });
  }
};

// Получение событий пользователя
export const getUserEvents = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log('FETCHING EVENTS FOR userId:', userId);

    const events = await Event.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          attributes: ['id', 'title']
        },
        {
          model: Lesson,
          attributes: ['id', 'title']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    console.log('EVENTS:', events);
    res.json(events);
  } catch (error) {
    console.error('EVENT FETCH ERROR:', error);
    res.status(500).json({ error: 'Ошибка при получении событий' });
  }
};

// Получение статистики пользователя
export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const stats = {
      totalCourses: await Course.count(),
      completedCourses: await CourseProgress.count({
        where: { userId, progress: 100 }
      }),
      totalLessons: await Lesson.count(),
      completedLessons: await LessonProgress.count({
        where: { userId, completed: true }
      }),
      averageScore: await LessonProgress.findAll({
        where: { userId },
        attributes: [[sequelize.fn('AVG', sequelize.col('scorePercent')), 'averageScore']]
      })
    };

    res.json(stats);
  } catch (error) {
    console.error('Ошибка при получении статистики:', error);
    res.status(500).json({ error: 'Ошибка при получении статистики' });
  }
}; 