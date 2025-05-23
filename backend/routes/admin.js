import express from 'express';
import { Op } from 'sequelize';
import { adminAuth } from '../middleware/adminAuth.js';
import {
  User,
  Course,
  CourseProgress,
  Question,
  PracticalAssignment,
  Lesson,
  Block,
  Event,
  LessonProgress 
} from '../models/index.js';

const router = express.Router();

// Получение всех пользователей
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

// Удаление пользователя
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });

    await user.destroy();
    res.json({ message: 'Пользователь удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении пользователя' });
  }
});

// Получение всех курсов с вложенными блоками, уроками, вопросами и заданиями
router.get('/courses', adminAuth, async (req, res) => {
  
  try {
    const courses = await Course.findAll({      
      include: [
        CourseProgress,        
        LessonProgress,
        {
        model: Block,
        include: [{
          model: Lesson,
          include: [
            { model: Question, as: 'Questions' },
            { model: PracticalAssignment, as: 'PracticalAssignments' }
          ]
        }
      ]
      }
    ]
    });
    res.json(courses);
  } catch (error) {
    console.error(':', error);
    res.status(500).json({ error: 'Ошибка при получении курсов' });
  }
});

// Создание курса
router.post('/courses', adminAuth, async (req, res) => {
  try {
    const { blocks, content, ...courseData } = req.body;

    const course = await Course.create({
      ...courseData,
      content: JSON.stringify(content),
      authorId: req.user.id,
      isBuiltIn: false
    });

    await Event.create({
      type: 'course_created',
      description: `Создан новый курс: "${course.title}"`,
      CourseId: course.id,
      UserId: req.user.id
    });

    if (blocks?.length) {
      for (const blockData of blocks) {
        const { lessons, ...blockInfo } = blockData;
        const block = await Block.create({ ...blockInfo, CourseId: course.id });

        if (lessons?.length) {
          for (const lessonData of lessons) {
            const { questions, assignments, ...lessonInfo } = lessonData;
            const lesson = await Lesson.create({ ...lessonInfo, BlockId: block.id });

            if (questions?.length) {
              for (const q of questions) {
                await Question.create({ ...q, LessonId: lesson.id });
              }
            }

            if (assignments?.length) {
              for (const a of assignments) {
                await PracticalAssignment.create({ ...a, LessonId: lesson.id });
              }
            }
          }
        }
      }
    }

    const fullCourse = await Course.findByPk(course.id, {
      include: [{
        model: Block,
        include: [{
          model: Lesson,
          include: [
            { model: Question, as: 'Questions' },
            { model: PracticalAssignment, as: 'PracticalAssignments' }
          ]
        }]
      }]
    });

    res.status(201).json(fullCourse);
  } catch (error) {
    console.error('Ошибка при создании курса:', error);
    res.status(500).json({ error: 'Ошибка при создании курса' });
  }
});

// Обновление курса
router.put('/courses/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Курс не найден' });
    if (course.isBuiltIn) return res.status(403).json({ error: 'Встроенные курсы нельзя редактировать' });

    if (req.body.content && typeof req.body.content === 'object') {
      req.body.content = JSON.stringify(req.body.content);
    }

    await course.update(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении курса' });
  }
});

// Удаление курса
router.delete('/courses/:id', adminAuth, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return res.status(404).json({ error: 'Курс не найден' });
    if (course.isBuiltIn) return res.status(403).json({ error: 'Встроенные курсы нельзя удалять' });

    // Получаем все блоки и уроки
    const blocks = await Block.findAll({
      where: { CourseId: course.id },
      include: [{ model: Lesson }]
    });

    const lessonIds = blocks.flatMap(block => block.Lessons.map(lesson => lesson.id));

    // Удаляем зависимости в правильном порядке
    if (lessonIds.length > 0) {
      await LessonProgress.destroy({ where: { lessonId: { [Op.in]: lessonIds } } });
      await PracticalAssignment.destroy({ where: { LessonId: { [Op.in]: lessonIds } } });
      await Question.destroy({ where: { LessonId: { [Op.in]: lessonIds } } });
      await Lesson.destroy({ where: { id: { [Op.in]: lessonIds } } });
    }

    await Block.destroy({ where: { CourseId: course.id } });
    await CourseProgress.destroy({ where: { courseId: course.id } });
    await Event.destroy({ where: { CourseId: course.id } });

    await course.destroy();
    res.json({ message: 'Курс удален' });
  } catch (error) {
    console.error('Ошибка при удалении курса:', error);
    res.status(500).json({ error: 'Ошибка при удалении курса' });
  }
});

// Статистика
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.count();
    const totalCourses = await Course.count();
    const totalProgress = await CourseProgress.count();
    res.json({ totalUsers, totalCourses, totalProgress });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении статистики' });
  }
});

// Вопросы
router.get('/lessons/:lessonId/questions', adminAuth, async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { LessonId: req.params.lessonId },
      order: [['order', 'ASC']]
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении вопросов' });
  }
});

router.post('/lessons/:lessonId/questions', adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.lessonId);
    if (!lesson) return res.status(404).json({ error: 'Урок не найден' });

    const question = await Question.create({
      ...req.body,
      LessonId: req.params.lessonId
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании вопроса' });
  }
});

router.put('/questions/:id', adminAuth, async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: 'Вопрос не найден' });

    await question.update(req.body);
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении вопроса' });
  }
});

router.delete('/questions/:id', adminAuth, async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ error: 'Вопрос не найден' });

    await question.destroy();
    res.json({ message: 'Вопрос удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении вопроса' });
  }
});

// Практические задания
router.get('/lessons/:lessonId/assignments', adminAuth, async (req, res) => {
  try {  
     const assignments = await PracticalAssignment.findAll({
       where: { LessonId: req.params.lessonId },
       order: [['order', 'ASC']]
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении заданий' });
  }
});

router.post('/lessons/:lessonId/assignments', adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.lessonId);
    if (!lesson) return res.status(404).json({ error: 'Урок не найден' });

    const assignment = await PracticalAssignment.create({
      ...req.body,
      LessonId: req.params.lessonId
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании задания' });
  }
});

router.put('/assignments/:id', adminAuth, async (req, res) => {
  try {
    const assignment = await PracticalAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Задание не найдено' });

    await assignment.update(req.body);
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении задания' });
  }
});

router.delete('/assignments/:id', adminAuth, async (req, res) => {
  try {
    const assignment = await PracticalAssignment.findByPk(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Задание не найдено' });

    await assignment.destroy();
    res.json({ message: 'Задание удалено' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении задания' });
  }
});




// Получение всех блоков курса
router.get('/courses/:courseId/blocks', adminAuth, async (req, res) => {
  try {
    const blocks = await Block.findAll({
      where: { CourseId: req.params.courseId },
      include: [{
        model: Lesson,
        include: [Question, PracticalAssignment]
      }],
      order: [['order', 'ASC']]
    });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении блоков' });
  }
});

// Создание нового блока
router.post('/courses/:courseId/blocks', adminAuth, async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Курс не найден' });
    }
    if (course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    
    const block = await Block.create({
      ...req.body,
      CourseId: req.params.courseId
    });
    res.status(201).json(block);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании блока' });
  }
});

// Обновление блока
router.put('/blocks/:id', adminAuth, async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id, {
      include: [Course]
    });
    if (!block) {
      return res.status(404).json({ error: 'Блок не найден' });
    }
    if (block.Course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    await block.update(req.body);
    res.json(block);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении блока' });
  }
});

// Удаление блока
router.delete('/blocks/:id', adminAuth, async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id, {
      include: [Course]
    });
    if (!block) {
      return res.status(404).json({ error: 'Блок не найден' });
    }
    if (block.Course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    await block.destroy();
    res.json({ message: 'Блок удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении блока' });
  }
});

// Получение всех уроков блока
router.get('/blocks/:blockId/lessons', adminAuth, async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      where: { BlockId: req.params.blockId },
      include: [Question, PracticalAssignment],
      order: [['order', 'ASC']]
    });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении уроков' });
  }
});

// Создание нового урока
router.post('/blocks/:blockId/lessons', adminAuth, async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.blockId, {
      include: [Course]
    });
    if (!block) {
      return res.status(404).json({ error: 'Блок не найден' });
    }
    if (block.Course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    
    const lesson = await Lesson.create({
      ...req.body,
      BlockId: req.params.blockId
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании урока' });
  }
});

// Обновление урока
router.put('/lessons/:id', adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [{
        model: Block,
        include: [Course]
      }]
    });
    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }
    if (lesson.Block.Course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    await lesson.update(req.body);
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении урока' });
  }
});

// Удаление урока
router.delete('/lessons/:id', adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [{
        model: Block,
        include: [Course]
      }]
    });
    if (!lesson) {
      return res.status(404).json({ error: 'Урок не найден' });
    }
    if (lesson.Block.Course.isBuiltIn) {
      return res.status(403).json({ error: 'Нельзя редактировать встроенный курс' });
    }
    await lesson.destroy();
    res.json({ message: 'Урок удален' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении урока' });
  }
});

export default router; 