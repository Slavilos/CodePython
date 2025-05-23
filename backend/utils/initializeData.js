import { Course, Block, Lesson } from '../models/index.js';
import { initialCourses } from '../data/initialCourses.js';

export const initializeBuiltInCourses = async () => {
  try {
    for (const courseData of initialCourses) {
      // Проверяем, существует ли курс
      let course = await Course.findOne({ where: { title: courseData.title } });
      
      if (!course) {
        // Создаем курс
        course = await Course.create({
          title: courseData.title,
          description: courseData.description,
          isBuiltIn: courseData.isBuiltIn,
          order: courseData.order,
          level: courseData.level,
          duration: courseData.duration
        });

        // Создаем блоки для курса
        for (const blockData of courseData.blocks) {
          const block = await Block.create({
            title: blockData.title,
            description: blockData.description,
            order: blockData.order,
            CourseId: course.id
          });

          // Создаем уроки для блока
          for (const lessonData of blockData.lessons) {
            await Lesson.create({
              title: lessonData.title,
              content: lessonData.content,
              order: lessonData.order,
              type: lessonData.type,
              BlockId: block.id
            });
          }
        }
        console.log(`✅ Создан встроенный курс: ${course.title}`);
      }
    }
    console.log('✅ Все встроенные курсы загружены в базу данных');
  } catch (error) {
    console.error('❌ Ошибка при инициализации встроенных курсов:', error);
  }
}; 