export const initialCourses = [
  {
    title: 'Основы Python',
    description: 'Базовый курс по программированию на Python',
    isBuiltIn: true,
    order: 1,
    level: 'beginner',
    duration: 120,
    blocks: [
      {
        title: 'Введение в Python',
        description: 'Знакомство с языком программирования Python',
        order: 1,
        lessons: [
          {
            title: 'Что такое Python',
            content: 'Python - это высокоуровневый язык программирования...',
            order: 1,
            type: 'lecture'
          },
          {
            title: 'Установка Python',
            content: 'Как установить Python на разные операционные системы...',
            order: 2,
            type: 'lecture'
          }
        ]
      },
      {
        title: 'Основные конструкции',
        description: 'Изучение основных конструкций языка',
        order: 2,
        lessons: [
          {
            title: 'Переменные и типы данных',
            content: 'Изучение переменных и типов данных в Python...',
            order: 1,
            type: 'lecture'
          },
          {
            title: 'Условные операторы',
            content: 'Изучение условных операторов if, elif, else...',
            order: 2,
            type: 'lecture'
          }
        ]
      }
    ]
  },
  {
    title: 'Python для продвинутых',
    description: 'Углубленный курс по Python',
    isBuiltIn: true,
    order: 2,
    level: 'advanced',
    duration: 180,
    blocks: [
      {
        title: 'Объектно-ориентированное программирование',
        description: 'Изучение ООП в Python',
        order: 1,
        lessons: [
          {
            title: 'Классы и объекты',
            content: 'Основы работы с классами и объектами в Python...',
            order: 1,
            type: 'lecture'
          },
          {
            title: 'Наследование',
            content: 'Изучение механизма наследования в Python...',
            order: 2,
            type: 'lecture'
          }
        ]
      }
    ]
  }
]; 