import { Course, User, CourseProgress } from '../models/index.js';
import { Op } from 'sequelize';

// Получение всех опубликованных курсов
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      where: { status: 'published' },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'fullName', 'username']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(courses);
  } catch (error) {
    console.error('Ошибка при получении курсов:', error);
    res.status(500).json({ error: 'Ошибка при получении курсов' });
  }
};

// Получение курса по ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({
      where: { 
        id,
        status: 'published'
      },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'fullName', 'username']
      }]
    });

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Если пользователь авторизован, получаем его прогресс
    if (req.user) {
      const progress = await CourseProgress.findOne({
        where: {
          userId: req.user.id,
          courseId: id
        }
      });
      return res.json({ ...course.toJSON(), userProgress: progress });
    }

    res.json(course);
  } catch (error) {
    console.error('Ошибка при получении курса:', error);
    res.status(500).json({ error: 'Ошибка при получении курса' });
  }
};

// Создание нового курса
export const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      authorId: req.user.id
    };

    const course = await Course.create(courseData);
    res.status(201).json(course);
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    res.status(500).json({ error: 'Ошибка при создании курса' });
  }
};

// Обновление курса
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверяем права на редактирование
    if (course.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Нет прав на редактирование курса' });
    }

    await course.update(req.body);
    res.json(course);
  } catch (error) {
    console.error('Ошибка при обновлении курса:', error);
    res.status(500).json({ error: 'Ошибка при обновлении курса' });
  }
};

// Удаление курса (архивация)
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }

    // Проверяем права на удаление
    if (course.authorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Нет прав на удаление курса' });
    }

    // Вместо физического удаления меняем статус на archived
    await course.update({ status: 'archived' });
    res.json({ message: 'Курс успешно архивирован' });
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    res.status(500).json({ error: 'Ошибка при удалении курса' });
  }
};

// Поиск курсов
export const searchCourses = async (req, res) => {
  try {
    const { query, level, sort } = req.query;
    
    const where = {
      status: 'published'
    };

    if (query) {
      where[Op.or] = [
        { title: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }
      ];
    }

    if (level) {
      where.level = level;
    }

    let order = [['createdAt', 'DESC']];
    if (sort === 'popular') {
      order = [['totalLessons', 'DESC']];
    }

    const courses = await Course.findAll({
      where,
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'fullName', 'username']
      }],
      order
    });

    res.json(courses);
  } catch (error) {
    console.error('Ошибка при поиске курсов:', error);
    res.status(500).json({ error: 'Ошибка при поиске курсов' });
  }
}; 