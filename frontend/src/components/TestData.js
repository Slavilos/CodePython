
// frontend/TestData.js
const testData = [
  {
    blockId: 1,
    title: "Введение в Python",
    theme: "Переменные и типы данных",
    description: "Изучите переменные и основные типы данных в Python.",
    questions: [
      {
        question: "Что такое переменная в Python?",
        options: [
          "Тип данных",
          "Место хранения данных",
          "Ключевое слово",
          "Цикл",
        ],
        answer: 1,
      },
      {
        question: "Какой тип данных представляет целое число?",
        options: ["float", "str", "int", "bool"],
        answer: 2,
      },
      {
        question: "Какой тип данных у значения True?",
        options: ["int", "str", "bool", "list"],
        answer: 2,
      },
      {
        question: "Что вернёт выражение type('123')?",
        options: ["<class 'int'>", "<class 'str'>", "<class 'float'>", "<class 'bool'>"],
        answer: 1,
      },
      {
        question: "Какой результат у выражения 5 + 3.0?",
        options: ["8.0", "53.0", "8", "TypeError"],
        answer: 0,
      },
    ],
  },
  {
    blockId: 2,
    title: "Python: Углубленный уровень",
    theme: "Работа с коллекциями",
    description: "Углублённое изучение списков, множеств и словарей.",
    questions: [
      {
        question: "Как добавить элемент в список?",
        options: ["add()", "append()", "insert()", "extend()"],
        answer: 1,
      },
      {
        question: "Что делает метод set()?",
        options: [
          "Создаёт список",
          "Создаёт множество",
          "Создаёт строку",
          "Удаляет элементы",
        ],
        answer: 1,
      },
      {
        question: "Как получить все ключи словаря?",
        options: ["dict.keys()", "dict.items()", "dict.values()", "dict.get()"],
        answer: 0,
      },
      {
        question: "Как объединить два списка?",
        options: ["+", "-", "*", "/"],
        answer: 0,
      },
      {
        question: "Что вернёт list(range(3))?",
        options: ["[0, 1, 2]", "[1, 2, 3]", "[0, 1, 2, 3]", "[3, 2, 1]"],
        answer: 0,
      },
    ],
  },
  {
    blockId: 3,
    title: "Python: Продвинутый уровень",
    theme: "Функции и декораторы",
    description: "Освойте продвинутые концепции Python",
    questions: [
      {
        question: "Что делает ключевое слово def?",
        options: [
          "Определяет переменную",
          "Определяет функцию",
          "Определяет класс",
          "Вызывает функцию",
        ],
        answer: 1,
      },
      {
        question: "Что такое аргумент функции?",
        options: [
          "Значение, возвращаемое функцией",
          "Значение, переданное в функцию",
          "Имя функции",
          "Тело функции",
        ],
        answer: 1,
      },
      {
        question: "Что делает return в функции?",
        options: [
          "Печатает результат",
          "Завершает цикл",
          "Выводит аргументы",
          "Возвращает значение",
        ],
        answer: 3,
      },
      {
        question: "Как обозначается декоратор?",
        options: ["#", "@", "$", "%"],
        answer: 1,
      },
      {
        question: "Можно ли передавать функцию как аргумент другой функции?",
        options: ["Да", "Нет", "Только в Python 3", "Только если она встроенная"],
        answer: 0,
      },
    ],
  },
];

export default testData;
