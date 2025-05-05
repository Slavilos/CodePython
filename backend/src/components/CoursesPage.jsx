import React, { useState } from 'react';
import CourseBlock from './CourseBlock';
import './CoursesPage.css';

const CoursesPage = () => {
  const [activeCourse, setActiveCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());

    const courses = [
    {
      id: 1,
      title: 'Python: Основы',
      description: 'Изучите основы программирования на Python',
      blocks: [
        {
          id: 'block1',
          title: 'Введение в Python',
          lessons: [
            {
              id: 'lesson1',
              title: 'Переменные и типы данных',
              content: 'Изучите переменные и основные типы данных в Python.',
              tests: [
                {
                  question: 'Какой тип данных у числа 42?',
                  options: ['int', 'float', 'str', 'bool'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать строку в Python?',
                  options: ['"текст"', "'текст'", 'str("текст")', 'все варианты верны'],
                  correctAnswer: 3
                },
                {
                  question: 'Какой оператор используется для присваивания значения?',
                  options: ['==', '=', ':=', '=>'],
                  correctAnswer: 1
                },
                {
                  question: 'Как получить тип данных переменной?',
                  options: ['type()', 'typeof()', 'getType()', 'varType()'],
                  correctAnswer: 0
                },
                {
                  question: 'Какое значение будет у переменной после выполнения: x = 3.14?',
                  options: ['int', 'float', 'decimal', 'complex'],
                  correctAnswer: 1
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте переменную x со значением 42',
                  'Создайте переменную y со значением 3.14',
                  'Создайте переменную name со значением "Python"',
                  'Выведите тип каждой переменной с помощью функции type()',
                  'Выведите значения всех переменных'
                ],
                testCases: [
                  {
                    input: 'x = 42\ny = 3.14\nname = "Python"\nprint(type(x))\nprint(type(y))\nprint(type(name))\nprint(x)\nprint(y)\nprint(name)',
                    expectedOutput: "<class 'int'>\n<class 'float'>\n<class 'str'>\n42\n3.14\nPython"
                  }
                ]
              }
            },
            {
              id: 'lesson2',
              title: 'Операторы и выражения',
              content: 'Изучите основные операторы и выражения в Python.',
              tests: [
                {
                  question: 'Какой оператор используется для сложения?',
                  options: ['+', '-', '*', '/'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для деления с остатком?',
                  options: ['%', '//', '/', '**'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для возведения в степень?',
                  options: ['**', '^', 'pow()', 'exp()'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для целочисленного деления?',
                  options: ['//', '/', '%', 'div()'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для сравнения на неравенство?',
                  options: ['!=', '<>', 'not=', '≠'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте переменную a со значением 10',
                  'Создайте переменную b со значением 3',
                  'Вычислите сумму a и b',
                  'Вычислите разность a и b',
                  'Вычислите произведение a и b',
                  'Вычислите частное a и b',
                  'Вычислите остаток от деления a на b'
                ],
                testCases: [
                  {
                    input: 'a = 10\nb = 3\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a % b)',
                    expectedOutput: "13\n7\n30\n3.3333333333333335\n1"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block2',
          title: 'Управление потоком',
          lessons: [
            {
              id: 'lesson3',
              title: 'Условные операторы',
              content: 'Изучите условные операторы в Python.',
              tests: [
                {
                  question: 'Какой оператор используется для проверки условия?',
                  options: ['if', 'when', 'check', 'verify'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для альтернативного условия?',
                  options: ['else', 'otherwise', 'elif', 'or'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для дополнительных условий?',
                  options: ['elif', 'else if', 'if else', 'when'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для логического И?',
                  options: ['and', '&&', '&', '&&&'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для логического ИЛИ?',
                  options: ['or', '||', '|', '|||'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте переменную age со значением 18',
                  'Создайте переменную has_ticket со значением True',
                  'Напишите условие: если возраст больше или равен 18 и есть билет, выведите "Доступ разрешен"',
                  'Иначе выведите "Доступ запрещен"'
                ],
                testCases: [
                  {
                    input: 'age = 18\nhas_ticket = True\nif age >= 18 and has_ticket:\n    print("Доступ разрешен")\nelse:\n    print("Доступ запрещен")',
                    expectedOutput: "Доступ разрешен"
                  }
                ]
              }
            },
            {
              id: 'lesson4',
              title: 'Циклы',
              content: 'Изучите циклы в Python.',
              tests: [
                {
                  question: 'Какой цикл используется для перебора последовательности?',
                  options: ['for', 'while', 'loop', 'repeat'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой цикл используется для повторения действий по условию?',
                  options: ['while', 'for', 'loop', 'repeat'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для выхода из цикла?',
                  options: ['break', 'exit', 'stop', 'quit'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для пропуска итерации?',
                  options: ['continue', 'skip', 'next', 'pass'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для создания бесконечного цикла?',
                  options: ['while True', 'for True', 'loop True', 'repeat True'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте список numbers со значениями [1, 2, 3, 4, 5]',
                  'Используя цикл for, выведите каждый элемент списка',
                  'Добавьте условие: если число четное, выведите "Четное число"',
                  'Добавьте условие: если число равно 3, пропустите его с помощью continue',
                  'После вывода всех чисел выведите "Цикл завершен"'
                ],
                testCases: [
                  {
                    input: 'numbers = [1, 2, 3, 4, 5]\nfor num in numbers:\n    if num == 3:\n        continue\n    print(num)\n    if num % 2 == 0:\n        print("Четное число")\nprint("Цикл завершен")',
                    expectedOutput: "1\n2\nЧетное число\n4\nЧетное число\n5\nЦикл завершен"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block3',
          title: 'Функции',
          lessons: [
            {
              id: 'lesson5',
              title: 'Основы функций',
              content: 'Изучите основы работы с функциями в Python.',
              tests: [
                {
                  question: 'Как определить функцию в Python?',
                  options: ['def', 'function', 'func', 'create'],
                  correctAnswer: 0
                },
                {
                  question: 'Какой оператор используется для возврата значения?',
                  options: ['return', 'back', 'give', 'output'],
                  correctAnswer: 0
                },
                {
                  question: 'Как передать аргументы в функцию?',
                  options: ['в скобках', 'через запятую', 'в квадратных скобках', 'в фигурных скобках'],
                  correctAnswer: 0
                },
                {
                  question: 'Как задать значение по умолчанию для параметра?',
                  options: ['param=value', 'param:value', 'param=>value', 'param:=value'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить количество аргументов функции?',
                  options: ['len(args)', 'count(args)', 'size(args)', 'length(args)'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте функцию greet, которая принимает имя и возвращает приветствие',
                  'Создайте функцию add, которая принимает два числа и возвращает их сумму',
                  'Вызовите обе функции и выведите результаты'
                ],
                testCases: [
                  {
                    input: 'def greet(name):\n    return f"Привет, {name}!"\n\ndef add(a, b):\n    return a + b\n\nprint(greet("Python"))\nprint(add(5, 3))',
                    expectedOutput: "Привет, Python!\n8"
                  }
                ]
              }
            },
            {
              id: 'lesson6',
              title: 'Продвинутые функции',
              content: 'Изучите продвинутые концепции функций в Python.',
              tests: [
                {
                  question: 'Что такое lambda-функция?',
                  options: ['анонимная функция', 'встроенная функция', 'рекурсивная функция', 'метод класса'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать lambda-функцию?',
                  options: ['lambda x: x', 'def lambda x: x', 'function lambda x: x', 'create lambda x: x'],
                  correctAnswer: 0
                },
                {
                  question: 'Что такое декоратор?',
                  options: ['функция, изменяющая другую функцию', 'тип данных', 'оператор', 'класс'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать декоратор?',
                  options: ['@decorator', '#decorator', '$decorator', '&decorator'],
                  correctAnswer: 0
                },
                {
                  question: 'Что такое замыкание?',
                  options: ['функция с доступом к внешней области видимости', 'тип данных', 'оператор', 'класс'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте lambda-функцию для возведения числа в квадрат',
                  'Создайте декоратор, который выводит время выполнения функции',
                  'Создайте функцию с замыканием, которая хранит счетчик вызовов',
                  'Продемонстрируйте работу всех созданных функций'
                ],
                testCases: [
                  {
                    input: 'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"Время выполнения: {end - start} сек")\n        return result\n    return wrapper\n\n@timer\ndef square(n):\n    return n ** 2\n\ncounter = 0\ndef counter_func():\n    global counter\n    counter += 1\n    return counter\n\nprint(square(5))\nprint(counter_func())\nprint(counter_func())',
                    expectedOutput: "25\nВремя выполнения: 0.0 сек\n1\n2"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block4',
          title: 'Структуры данных',
          lessons: [
            {
              id: 'lesson7',
              title: 'Списки и кортежи',
              content: 'Изучите списки и кортежи в Python.',
              tests: [
                {
                  question: 'Как создать пустой список?',
                  options: ['[]', 'list()', 'new list', 'create list'],
                  correctAnswer: 0
                },
                {
                  question: 'Как добавить элемент в список?',
                  options: ['append()', 'add()', 'insert()', 'push()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как удалить элемент из списка?',
                  options: ['remove()', 'delete()', 'erase()', 'clear()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить длину списка?',
                  options: ['len()', 'length()', 'size()', 'count()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать кортеж?',
                  options: ['()', 'tuple()', 'new tuple', 'create tuple'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте список numbers со значениями [1, 2, 3]',
                  'Добавьте число 4 в конец списка',
                  'Удалите число 2 из списка',
                  'Выведите длину списка',
                  'Создайте кортеж с теми же значениями'
                ],
                testCases: [
                  {
                    input: 'numbers = [1, 2, 3]\nnumbers.append(4)\nnumbers.remove(2)\nprint(len(numbers))\nnumbers_tuple = tuple(numbers)\nprint(numbers_tuple)',
                    expectedOutput: "3\n(1, 3, 4)"
                  }
                ]
              }
            },
            {
              id: 'lesson8',
              title: 'Словари и множества',
              content: 'Изучите словари и множества в Python.',
              tests: [
                {
                  question: 'Как создать пустой словарь?',
                  options: ['{}', 'dict()', 'new dict', 'create dict'],
                  correctAnswer: 0
                },
                {
                  question: 'Как добавить элемент в словарь?',
                  options: ['dict[key] = value', 'add()', 'insert()', 'push()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как удалить элемент из словаря?',
                  options: ['del dict[key]', 'remove()', 'erase()', 'clear()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить значение по ключу?',
                  options: ['dict[key]', 'get()', 'value()', 'find()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать множество?',
                  options: ['set()', '{}', 'new set', 'create set'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте словарь person с ключами name и age',
                  'Добавьте ключ city со значением "Moscow"',
                  'Удалите ключ age',
                  'Выведите значение по ключу name',
                  'Создайте множество unique_numbers со значениями [1, 2, 2, 3, 3, 4]'
                ],
                testCases: [
                  {
                    input: 'person = {"name": "John", "age": 30}\nperson["city"] = "Moscow"\ndel person["age"]\nprint(person["name"])\nunique_numbers = set([1, 2, 2, 3, 3, 4])\nprint(unique_numbers)',
                    expectedOutput: "John\n{1, 2, 3, 4}"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block5',
          title: 'Работа с файлами',
          lessons: [
            {
              id: 'lesson9',
              title: 'Основы работы с файлами',
              content: 'Изучите основы работы с файлами в Python.',
              tests: [
                {
                  question: 'Как открыть файл для чтения?',
                  options: ['open(file, "r")', 'read(file)', 'load(file)', 'get(file)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как открыть файл для записи?',
                  options: ['open(file, "w")', 'write(file)', 'save(file)', 'put(file)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как прочитать все строки файла?',
                  options: ['readlines()', 'readall()', 'getlines()', 'lines()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как записать строку в файл?',
                  options: ['write()', 'writeline()', 'putline()', 'addline()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как закрыть файл?',
                  options: ['close()', 'end()', 'finish()', 'stop()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте файл test.txt и запишите в него строку "Hello, World!"',
                  'Прочитайте содержимое файла и выведите его',
                  'Добавьте новую строку "Python is awesome!" в конец файла',
                  'Прочитайте обновленное содержимое файла и выведите его'
                ],
                testCases: [
                  {
                    input: 'with open("test.txt", "w") as f:\n    f.write("Hello, World!")\n\nwith open("test.txt", "r") as f:\n    print(f.read())\n\nwith open("test.txt", "a") as f:\n    f.write("\\nPython is awesome!")\n\nwith open("test.txt", "r") as f:\n    print(f.read())',
                    expectedOutput: "Hello, World!\nHello, World!\nPython is awesome!"
                  }
                ]
              }
            },
            {
              id: 'lesson10',
              title: 'Продвинутая работа с файлами',
              content: 'Изучите продвинутые концепции работы с файлами в Python.',
              tests: [
                {
                  question: 'Как переместить указатель в файле?',
                  options: ['seek()', 'move()', 'position()', 'goto()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить текущую позицию указателя?',
                  options: ['tell()', 'position()', 'current()', 'where()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как проверить существование файла?',
                  options: ['os.path.exists()', 'file.exists()', 'exists()', 'check()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить размер файла?',
                  options: ['os.path.getsize()', 'file.size()', 'size()', 'length()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как переименовать файл?',
                  options: ['os.rename()', 'file.rename()', 'rename()', 'change()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте файл data.txt и запишите в него несколько строк',
                  'Переместите указатель в начало файла',
                  'Прочитайте первые 5 символов',
                  'Переместите указатель в конец файла',
                  'Добавьте новую строку',
                  'Выведите текущую позицию указателя'
                ],
                testCases: [
                  {
                    input: 'with open("data.txt", "w") as f:\n    f.write("Hello, World!\\nPython is awesome!")\n\nwith open("data.txt", "r+") as f:\n    f.seek(0)\n    print(f.read(5))\n    f.seek(0, 2)\n    f.write("\\nThis is the end!")\n    print(f.tell())',
                    expectedOutput: "Hello\n42"
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Python: Углубленный уровень',
      description: 'Углубите свои знания Python',
      blocks: [
        {
          id: 'block1',
          title: 'Объектно-ориентированное программирование',
          lessons: [
            {
              id: 'lesson1',
              title: 'Классы и объекты',
              content: 'Изучите основы ООП в Python.',
              tests: [
                {
                  question: 'Как определить класс?',
                  options: ['class', 'def class', 'create class', 'new class'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать объект класса?',
                  options: ['ClassName()', 'new ClassName', 'create ClassName', 'make ClassName'],
                  correctAnswer: 0
                },
                {
                  question: 'Как определить метод класса?',
                  options: ['def method(self)', 'method(self)', 'function method(self)', 'create method(self)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить доступ к атрибуту объекта?',
                  options: ['object.attribute', 'object->attribute', 'object[attribute]', 'object:attribute'],
                  correctAnswer: 0
                },
                {
                  question: 'Как определить конструктор класса?',
                  options: ['__init__', 'constructor', 'init', 'create'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте класс Person с атрибутами name и age',
                  'Определите конструктор класса',
                  'Создайте метод greet, который возвращает приветствие',
                  'Создайте объект класса и вызовите метод greet'
                ],
                testCases: [
                  {
                    input: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Привет, меня зовут {self.name}!"\n\nperson = Person("John", 30)\nprint(person.greet())',
                    expectedOutput: "Привет, меня зовут John!"
                  }
                ]
              }
            },
            {
              id: 'lesson2',
              title: 'Наследование и полиморфизм',
              content: 'Изучите наследование и полиморфизм в Python.',
              tests: [
                {
                  question: 'Как указать родительский класс?',
                  options: ['class Child(Parent)', 'class Child extends Parent', 'class Child : Parent', 'class Child inherits Parent'],
                  correctAnswer: 0
                },
                {
                  question: 'Как вызвать метод родительского класса?',
                  options: ['super().method()', 'parent.method()', 'base.method()', 'parent().method()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как переопределить метод?',
                  options: ['определить метод с тем же именем', 'override method', 'redefine method', 'change method'],
                  correctAnswer: 0
                },
                {
                  question: 'Что такое полиморфизм?',
                  options: ['способность объектов разных классов отвечать на одни и те же методы', 'наследование', 'инкапсуляция', 'абстракция'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать абстрактный метод?',
                  options: ['@abstractmethod', '@abstract', '@virtual', '@override'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте базовый класс Animal с методом speak',
                  'Создайте классы Dog и Cat, наследующие от Animal',
                  'Переопределите метод speak в каждом классе',
                  'Создайте объекты классов и вызовите метод speak'
                ],
                testCases: [
                  {
                    input: 'class Animal:\n    def speak(self):\n        return "Some sound"\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return "Meow!"\n\nanimals = [Dog(), Cat()]\nfor animal in animals:\n    print(animal.speak())',
                    expectedOutput: "Woof!\nMeow!"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block2',
          title: 'Исключения',
          lessons: [
            {
              id: 'lesson3',
              title: 'Основы обработки исключений',
              content: 'Изучите основы обработки исключений в Python.',
              tests: [
                {
                  question: 'Как обработать исключение?',
                  options: ['try-except', 'catch', 'handle', 'process'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить информацию об исключении?',
                  options: ['except Exception as e', 'catch Exception as e', 'handle Exception as e', 'process Exception as e'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать пользовательское исключение?',
                  options: ['class CustomError(Exception)', 'def CustomError(Exception)', 'create CustomError(Exception)', 'new CustomError(Exception)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как вызвать исключение?',
                  options: ['raise', 'throw', 'error', 'exception'],
                  correctAnswer: 0
                },
                {
                  question: 'Как выполнить код в любом случае?',
                  options: ['finally', 'always', 'finally block', 'always block'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте функцию divide, которая принимает два числа',
                  'Добавьте обработку деления на ноль',
                  'Создайте пользовательское исключение NegativeNumberError',
                  'Добавьте проверку на отрицательные числа',
                  'Вызовите функцию с разными аргументами'
                ],
                testCases: [
                  {
                    input: 'class NegativeNumberError(Exception):\n    pass\n\ndef divide(a, b):\n    if b == 0:\n        raise ZeroDivisionError("Деление на ноль невозможно")\n    if a < 0 or b < 0:\n        raise NegativeNumberError("Числа должны быть положительными")\n    return a / b\n\ntry:\n    print(divide(10, 2))\n    print(divide(-5, 2))\nexcept ZeroDivisionError as e:\n    print(f"Ошибка: {e}")\nexcept NegativeNumberError as e:\n    print(f"Ошибка: {e}")',
                    expectedOutput: "5.0\nОшибка: Числа должны быть положительными"
                  }
                ]
              }
            },
            {
              id: 'lesson4',
              title: 'Продвинутая обработка исключений',
              content: 'Изучите продвинутые концепции обработки исключений в Python.',
              tests: [
                {
                  question: 'Как создать контекстный менеджер?',
                  options: ['__enter__ и __exit__', 'enter и exit', 'start и end', 'begin и finish'],
                  correctAnswer: 0
                },
                {
                  question: 'Как использовать контекстный менеджер?',
                  options: ['with', 'using', 'context', 'manage'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать декоратор для обработки исключений?',
                  options: ['def decorator(func)', 'create decorator(func)', 'new decorator(func)', 'make decorator(func)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить стек вызовов?',
                  options: ['traceback', 'stacktrace', 'callstack', 'backtrace'],
                  correctAnswer: 0
                },
                {
                  question: 'Как очистить стек исключений?',
                  options: ['sys.exc_clear()', 'clear()', 'reset()', 'clean()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте класс FileManager как контекстный менеджер',
                  'Реализуйте методы __enter__ и __exit__',
                  'Создайте декоратор для логирования исключений',
                  'Продемонстрируйте работу с файлами через контекстный менеджер'
                ],
                testCases: [
                  {
                    input: 'import logging\n\ndef log_exceptions(func):\n    def wrapper(*args, **kwargs):\n        try:\n            return func(*args, **kwargs)\n        except Exception as e:\n            logging.error(f"Ошибка в функции {func.__name__}: {e}")\n            raise\n    return wrapper\n\nclass FileManager:\n    def __init__(self, filename, mode):\n        self.filename = filename\n        self.mode = mode\n        self.file = None\n    \n    def __enter__(self):\n        self.file = open(self.filename, self.mode)\n        return self.file\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        if self.file:\n            self.file.close()\n\n@log_exceptions\ndef write_to_file(filename, content):\n    with FileManager(filename, "w") as f:\n        f.write(content)\n\nwrite_to_file("test.txt", "Hello, World!")',
                    expectedOutput: ""
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block3',
          title: 'Модули и пакеты',
          lessons: [
            {
              id: 'lesson5',
              title: 'Работа с модулями',
              content: 'Изучите работу с модулями в Python.',
              tests: [
                {
                  question: 'Как импортировать модуль?',
                  options: ['import module', 'require module', 'include module', 'load module'],
                  correctAnswer: 0
                },
                {
                  question: 'Как импортировать конкретные элементы?',
                  options: ['from module import element', 'import element from module', 'require element from module', 'include element from module'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать псевдоним для модуля?',
                  options: ['import module as alias', 'alias = module', 'module as alias', 'import alias from module'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить список всех атрибутов модуля?',
                  options: ['dir(module)', 'help(module)', 'info(module)', 'list(module)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить документацию модуля?',
                  options: ['help(module)', 'doc(module)', 'info(module)', 'manual(module)'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте модуль calculator.py с функциями add и subtract',
                  'Импортируйте модуль в основной файл',
                  'Используйте функции из модуля',
                  'Импортируйте конкретные функции',
                  'Создайте псевдоним для модуля'
                ],
                testCases: [
                  {
                    input: 'import calculator as calc\n\nprint(calc.add(5, 3))\nprint(calc.subtract(10, 4))\n\nfrom calculator import add, subtract\n\nprint(add(2, 1))\nprint(subtract(8, 3))',
                    expectedOutput: "8\n6\n3\n5"
                  }
                ]
              }
            },
            {
              id: 'lesson6',
              title: 'Создание пакетов',
              content: 'Изучите создание пакетов в Python.',
              tests: [
                {
                  question: 'Как создать пакет?',
                  options: ['создать директорию с __init__.py', 'создать файл package.py', 'использовать pip install', 'создать setup.py'],
                  correctAnswer: 0
                },
                {
                  question: 'Как установить пакет?',
                  options: ['pip install package', 'install package', 'get package', 'download package'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать setup.py?',
                  options: ['from setuptools import setup', 'from setup import setup', 'from package import setup', 'from install import setup'],
                  correctAnswer: 0
                },
                {
                  question: 'Как указать зависимости пакета?',
                  options: ['install_requires в setup.py', 'dependencies в setup.py', 'requires в setup.py', 'needs в setup.py'],
                  correctAnswer: 0
                },
                {
                  question: 'Как опубликовать пакет?',
                  options: ['twine upload dist/*', 'upload package', 'publish package', 'release package'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте структуру пакета mypackage',
                  'Создайте файл __init__.py',
                  'Создайте модуль с функциями',
                  'Создайте setup.py',
                  'Установите пакет в режиме разработки'
                ],
                testCases: [
                  {
                    input: 'from setuptools import setup, find_packages\n\nsetup(\n    name="mypackage",\n    version="0.1",\n    packages=find_packages(),\n    install_requires=[],\n)\n\n# Установка: pip install -e .',
                    expectedOutput: ""
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block4',
          title: 'Регулярные выражения',
          lessons: [
            {
              id: 'lesson7',
              title: 'Основы регулярных выражений',
              content: 'Изучите основы регулярных выражений в Python.',
              tests: [
                {
                  question: 'Как импортировать модуль re?',
                  options: ['import re', 'require re', 'include re', 'load re'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать регулярное выражение?',
                  options: ['re.compile(pattern)', 're.pattern(pattern)', 're.create(pattern)', 're.make(pattern)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как найти все совпадения?',
                  options: ['re.findall()', 're.find()', 're.search()', 're.match()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как заменить текст по шаблону?',
                  options: ['re.sub()', 're.replace()', 're.change()', 're.update()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как разделить строку по шаблону?',
                  options: ['re.split()', 're.divide()', 're.cut()', 're.separate()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте регулярное выражение для поиска email-адресов',
                  'Найдите все email-адреса в тексте',
                  'Замените email-адреса на [EMAIL]',
                  'Разделите текст по пробелам',
                  'Выведите результаты'
                ],
                testCases: [
                  {
                    input: 'import re\n\ntext = "Email: test@example.com, another@example.com"\npattern = r"\\w+@\\w+\\.\\w+"\n\nprint(re.findall(pattern, text))\nprint(re.sub(pattern, "[EMAIL]", text))\nprint(re.split(r"\\s+", text))',
                    expectedOutput: "['test@example.com', 'another@example.com']\nEmail: [EMAIL], [EMAIL]\n['Email:', 'test@example.com,', 'another@example.com']"
                  }
                ]
              }
            },
            {
              id: 'lesson8',
              title: 'Продвинутые регулярные выражения',
              content: 'Изучите продвинутые концепции регулярных выражений в Python.',
              tests: [
                {
                  question: 'Что такое группа в регулярном выражении?',
                  options: ['часть шаблона в скобках', 'символ', 'шаблон', 'выражение'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить группы совпадения?',
                  options: ['groups()', 'get_groups()', 'find_groups()', 'match_groups()'],
                  correctAnswer: 0
                },
                {
                  question: 'Что такое квантификатор?',
                  options: ['символ повторения', 'символ', 'шаблон', 'выражение'],
                  correctAnswer: 0
                },
                {
                  question: 'Как сделать совпадение нежадным?',
                  options: ['?', '*?', '+?', '??'],
                  correctAnswer: 0
                },
                {
                  question: 'Как использовать флаги в регулярных выражениях?',
                  options: ['re.IGNORECASE', 're.ignore_case', 're.ignorecase', 're.ignore'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте регулярное выражение с группами для парсинга даты',
                  'Используйте квантификаторы для поиска повторяющихся символов',
                  'Создайте нежадное совпадение',
                  'Используйте флаги для поиска без учета регистра',
                  'Выведите результаты'
                ],
                testCases: [
                  {
                    input: 'import re\n\ntext = "Date: 2023-12-31, Time: 15:30"\npattern = r"(\\d{4})-(\\d{2})-(\\d{2})"\n\nmatch = re.search(pattern, text)\nprint(match.groups())\n\npattern = r"a+?"\ntext = "aaaaa"\nprint(re.findall(pattern, text))\n\npattern = r"python"\ntext = "Python is awesome, PYTHON is great"\nprint(re.findall(pattern, text, re.IGNORECASE))',
                    expectedOutput: "('2023', '12', '31')\n['a', 'a', 'a', 'a', 'a']\n['Python', 'PYTHON']"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block5',
          title: 'Многопоточность',
          lessons: [
            {
              id: 'lesson9',
              title: 'Основы многопоточности',
              content: 'Изучите основы многопоточности в Python.',
              tests: [
                {
                  question: 'Как создать поток?',
                  options: ['threading.Thread', 'threading.create', 'threading.new', 'threading.make'],
                  correctAnswer: 0
                },
                {
                  question: 'Как запустить поток?',
                  options: ['start()', 'run()', 'begin()', 'execute()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как дождаться завершения потока?',
                  options: ['join()', 'wait()', 'finish()', 'end()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать блокировку?',
                  options: ['threading.Lock()', 'threading.lock()', 'threading.create_lock()', 'threading.new_lock()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как использовать блокировку?',
                  options: ['with lock:', 'lock.acquire()', 'lock.lock()', 'lock.use()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте функцию для выполнения в потоке',
                  'Создайте и запустите поток',
                  'Дождитесь завершения потока',
                  'Используйте блокировку для синхронизации',
                  'Выведите результаты'
                ],
                testCases: [
                  {
                    input: 'import threading\nimport time\n\nlock = threading.Lock()\ncounter = 0\n\ndef worker():\n    global counter\n    with lock:\n        for _ in range(5):\n            counter += 1\n            time.sleep(0.1)\n\nthread = threading.Thread(target=worker)\nthread.start()\nthread.join()\nprint(counter)',
                    expectedOutput: "5"
                  }
                ]
              }
            },
            {
              id: 'lesson10',
              title: 'Продвинутая многопоточность',
              content: 'Изучите продвинутые концепции многопоточности в Python.',
              tests: [
                {
                  question: 'Как создать пул потоков?',
                  options: ['ThreadPoolExecutor', 'ThreadPool', 'Pool', 'Executor'],
                  correctAnswer: 0
                },
                {
                  question: 'Как отправить задачу в пул?',
                  options: ['submit()', 'send()', 'add()', 'put()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить результат задачи?',
                  options: ['result()', 'get()', 'return()', 'value()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать семафор?',
                  options: ['threading.Semaphore()', 'threading.semaphore()', 'threading.create_semaphore()', 'threading.new_semaphore()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как использовать семафор?',
                  options: ['with semaphore:', 'semaphore.acquire()', 'semaphore.lock()', 'semaphore.use()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте пул потоков',
                  'Отправьте несколько задач в пул',
                  'Получите результаты задач',
                  'Используйте семафор для ограничения параллельных потоков',
                  'Выведите результаты'
                ],
                testCases: [
                  {
                    input: 'from concurrent.futures import ThreadPoolExecutor\nimport threading\nimport time\n\nsemaphore = threading.Semaphore(2)\n\ndef worker(n):\n    with semaphore:\n        time.sleep(0.1)\n        return n * n\n\nwith ThreadPoolExecutor(max_workers=3) as executor:\n    futures = [executor.submit(worker, i) for i in range(5)]\n    results = [f.result() for f in futures]\n\nprint(results)',
                    expectedOutput: "[0, 1, 4, 9, 16]"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block6',
          title: 'Базы данных',
          lessons: [
            {
              id: 'lesson11',
              title: 'Основы работы с базами данных',
              content: 'Изучите основы работы с базами данных в Python.',
              tests: [
                {
                  question: 'Как подключиться к SQLite?',
                  options: ['sqlite3.connect()', 'sqlite3.open()', 'sqlite3.create()', 'sqlite3.new()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать курсор?',
                  options: ['connection.cursor()', 'connection.create_cursor()', 'connection.new_cursor()', 'connection.make_cursor()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как выполнить SQL-запрос?',
                  options: ['cursor.execute()', 'cursor.run()', 'cursor.execute_query()', 'cursor.run_query()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить результаты запроса?',
                  options: ['cursor.fetchall()', 'cursor.get_all()', 'cursor.fetch_results()', 'cursor.get_results()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как сохранить изменения?',
                  options: ['connection.commit()', 'connection.save()', 'connection.apply()', 'connection.update()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте подключение к SQLite',
                  'Создайте таблицу',
                  'Добавьте данные',
                  'Выполните запрос',
                  'Получите результаты'
                ],
                testCases: [
                  {
                    input: 'import sqlite3\n\nconn = sqlite3.connect("test.db")\ncursor = conn.cursor()\n\ncursor.execute("""\n    CREATE TABLE IF NOT EXISTS users (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        age INTEGER\n    )\n""")\n\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("John", 30))\nconn.commit()\n\ncursor.execute("SELECT * FROM users")\nprint(cursor.fetchall())\n\nconn.close()',
                    expectedOutput: "[(1, 'John', 30)]"
                  }
                ]
              }
            },
            {
              id: 'lesson12',
              title: 'Продвинутая работа с базами данных',
              content: 'Изучите продвинутые концепции работы с базами данных в Python.',
              tests: [
                {
                  question: 'Как использовать ORM?',
                  options: ['SQLAlchemy', 'Django ORM', 'Peewee', 'все варианты верны'],
                  correctAnswer: 3
                },
                {
                  question: 'Как создать модель?',
                  options: ['class Model(Base)', 'class Model(model)', 'class Model(table)', 'class Model(database)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать сессию?',
                  options: ['Session()', 'create_session()', 'new_session()', 'make_session()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как выполнить миграцию?',
                  options: ['alembic upgrade head', 'alembic migrate', 'alembic update', 'alembic apply'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать транзакцию?',
                  options: ['with session.begin()', 'session.begin()', 'session.start()', 'session.create()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте модель с помощью SQLAlchemy',
                  'Создайте сессию',
                  'Добавьте данные',
                  'Выполните запрос',
                  'Используйте транзакции'
                ],
                testCases: [
                  {
                    input: 'from sqlalchemy import create_engine, Column, Integer, String\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom sqlalchemy.orm import sessionmaker\n\nBase = declarative_base()\n\nclass User(Base):\n    __tablename__ = "users"\n    \n    id = Column(Integer, primary_key=True)\n    name = Column(String)\n    age = Column(Integer)\n\nengine = create_engine("sqlite:///test.db")\nBase.metadata.create_all(engine)\n\nSession = sessionmaker(bind=engine)\nsession = Session()\n\nwith session.begin():\n    user = User(name="John", age=30)\n    session.add(user)\n\nusers = session.query(User).all()\nfor user in users:\n    print(f"{user.name}, {user.age}")',
                    expectedOutput: "John, 30"
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Python: Продвинутый уровень',
      description: 'Освойте продвинутые концепции Python',
      blocks: [
        {
          id: 'block1',
          title: 'Декораторы и метаклассы',
          lessons: [
            {
              id: 'lesson1',
              title: 'Декораторы',
              content: 'Изучите декораторы в Python.',
              tests: [
                {
                  question: 'Как создать декоратор?',
                  options: ['def decorator(func)', 'create decorator(func)', 'new decorator(func)', 'make decorator(func)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как применить декоратор?',
                  options: ['@decorator', '#decorator', '$decorator', '&decorator'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать декоратор с параметрами?',
                  options: ['def decorator(param)', 'create decorator(param)', 'new decorator(param)', 'make decorator(param)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как сохранить метаданные функции?',
                  options: ['@functools.wraps', '@wraps', '@preserve', '@keep'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать декоратор класса?',
                  options: ['def decorator(cls)', 'create decorator(cls)', 'new decorator(cls)', 'make decorator(cls)'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте декоратор для измерения времени выполнения функции',
                  'Создайте декоратор с параметром для повторения функции',
                  'Создайте декоратор класса для добавления методов',
                  'Используйте @functools.wraps',
                  'Продемонстрируйте работу всех декораторов'
                ],
                testCases: [
                  {
                    input: 'import time\nimport functools\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        end = time.time()\n        print(f"Время выполнения: {end - start} сек")\n        return result\n    return wrapper\n\ndef repeat(n):\n    def decorator(func):\n        @functools.wraps(func)\n        def wrapper(*args, **kwargs):\n            for _ in range(n):\n                result = func(*args, **kwargs)\n            return result\n        return wrapper\n    return decorator\n\n@timer\n@repeat(3)\ndef greet(name):\n    return f"Привет, {name}!"\n\nprint(greet("Python"))',
                    expectedOutput: "Время выполнения: 0.0 сек\nПривет, Python!"
                  }
                ]
              }
            },
            {
              id: 'lesson2',
              title: 'Метаклассы',
              content: 'Изучите метаклассы в Python.',
              tests: [
                {
                  question: 'Как создать метакласс?',
                  options: ['class Meta(type)', 'class Meta(metaclass=type)', 'class Meta(metaclass=Type)', 'class Meta(metaclass=Class)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как указать метакласс для класса?',
                  options: ['class MyClass(metaclass=Meta)', 'class MyClass(Meta)', 'class MyClass(metaclass=Meta)', 'class MyClass(meta=Meta)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как переопределить создание класса?',
                  options: ['__new__', 'create', 'new', 'make'],
                  correctAnswer: 0
                },
                {
                  question: 'Как переопределить инициализацию класса?',
                  options: ['__init__', 'init', 'initialize', 'setup'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить все атрибуты класса?',
                  options: ['__dict__', 'dict', 'attributes', 'members'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте метакласс для добавления методов в класс',
                  'Создайте класс с использованием метакласса',
                  'Переопределите создание класса',
                  'Переопределите инициализацию класса',
                  'Продемонстрируйте работу метакласса'
                ],
                testCases: [
                  {
                    input: 'class AddMethods(type):\n    def __new__(cls, name, bases, attrs):\n        attrs["greet"] = lambda self: f"Привет, {self.name}!"\n        return super().__new__(cls, name, bases, attrs)\n\nclass Person(metaclass=AddMethods):\n    def __init__(self, name):\n        self.name = name\n\nperson = Person("Python")\nprint(person.greet())',
                    expectedOutput: "Привет, Python!"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block2',
          title: 'Дескрипторы',
          lessons: [
            {
              id: 'lesson3',
              title: 'Основы дескрипторов',
              content: 'Изучите основы дескрипторов в Python.',
              tests: [
                {
                  question: 'Как создать дескриптор?',
                  options: ['class Descriptor', 'def Descriptor', 'create Descriptor', 'new Descriptor'],
                  correctAnswer: 0
                },
                {
                  question: 'Как определить метод __get__?',
                  options: ['def __get__(self, instance, owner)', 'def get(self, instance, owner)', 'def __get__(self, instance)', 'def get(self, instance)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как определить метод __set__?',
                  options: ['def __set__(self, instance, value)', 'def set(self, instance, value)', 'def __set__(self, value)', 'def set(self, value)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как определить метод __delete__?',
                  options: ['def __delete__(self, instance)', 'def delete(self, instance)', 'def __delete__(self)', 'def delete(self)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как использовать дескриптор в классе?',
                  options: ['attribute = Descriptor()', 'attribute = descriptor', 'attribute = new Descriptor()', 'attribute = create Descriptor()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте дескриптор для валидации возраста',
                  'Создайте класс Person с дескриптором',
                  'Определите методы __get__, __set__ и __delete__',
                  'Добавьте валидацию значения',
                  'Продемонстрируйте работу дескриптора'
                ],
                testCases: [
                  {
                    input: 'class AgeDescriptor:\n    def __get__(self, instance, owner):\n        return instance._age\n    \n    def __set__(self, instance, value):\n        if not isinstance(value, int):\n            raise TypeError("Возраст должен быть числом")\n        if value < 0:\n            raise ValueError("Возраст не может быть отрицательным")\n        instance._age = value\n    \n    def __delete__(self, instance):\n        del instance._age\n\nclass Person:\n    age = AgeDescriptor()\n    \n    def __init__(self, age):\n        self.age = age\n\nperson = Person(25)\nprint(person.age)',
                    expectedOutput: "25"
                  }
                ]
              }
            },
            {
              id: 'lesson4',
              title: 'Продвинутые дескрипторы',
              content: 'Изучите продвинутые концепции дескрипторов в Python.',
              tests: [
                {
                  question: 'Что такое property?',
                  options: ['декоратор для создания дескриптора', 'функция', 'класс', 'метод'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать property?',
                  options: ['@property', '@property()', '@property decorator', '@property decorator()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать setter для property?',
                  options: ['@property.setter', '@setter', '@property.set', '@set'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать deleter для property?',
                  options: ['@property.deleter', '@deleter', '@property.delete', '@delete'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать property с помощью функции?',
                  options: ['property()', 'create_property()', 'new_property()', 'make_property()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте класс с property для имени',
                  'Добавьте валидацию имени',
                  'Создайте setter для изменения имени',
                  'Создайте deleter для удаления имени',
                  'Продемонстрируйте работу property'
                ],
                testCases: [
                  {
                    input: 'class Person:\n    def __init__(self, name):\n        self._name = name\n    \n    @property\n    def name(self):\n        return self._name\n    \n    @name.setter\n    def name(self, value):\n        if not isinstance(value, str):\n            raise TypeError("Имя должно быть строкой")\n        if not value:\n            raise ValueError("Имя не может быть пустым")\n        self._name = value\n    \n    @name.deleter\n    def name(self):\n        del self._name\n\nperson = Person("Python")\nprint(person.name)\nperson.name = "Python3"\nprint(person.name)',
                    expectedOutput: "Python\nPython3"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block3',
          title: 'Асинхронное программирование',
          lessons: [
            {
              id: 'lesson5',
              title: 'Основы асинхронного программирования',
              content: 'Изучите основы асинхронного программирования в Python.',
              tests: [
                {
                  question: 'Как создать корутину?',
                  options: ['async def', 'def async', 'create async', 'new async'],
                  correctAnswer: 0
                },
                {
                  question: 'Как запустить корутину?',
                  options: ['await', 'run', 'start', 'execute'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать событийный цикл?',
                  options: ['asyncio.get_event_loop()', 'asyncio.loop()', 'asyncio.create_loop()', 'asyncio.new_loop()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как запустить несколько корутин?',
                  options: ['asyncio.gather()', 'asyncio.run_all()', 'asyncio.execute_all()', 'asyncio.start_all()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать задачу?',
                  options: ['asyncio.create_task()', 'asyncio.new_task()', 'asyncio.make_task()', 'asyncio.start_task()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте асинхронную функцию для задержки',
                  'Создайте асинхронную функцию для вывода сообщения',
                  'Запустите несколько асинхронных функций',
                  'Используйте asyncio.gather',
                  'Продемонстрируйте работу асинхронного кода'
                ],
                testCases: [
                  {
                    input: 'import asyncio\n\nasync def delay(seconds):\n    await asyncio.sleep(seconds)\n\nasync def print_message(message):\n    await delay(1)\n    print(message)\n\nasync def main():\n    await asyncio.gather(\n        print_message("Первое сообщение"),\n        print_message("Второе сообщение"),\n        print_message("Третье сообщение")\n    )\n\nasyncio.run(main())',
                    expectedOutput: "Первое сообщение\nВторое сообщение\nТретье сообщение"
                  }
                ]
              }
            },
            {
              id: 'lesson6',
              title: 'Продвинутое асинхронное программирование',
              content: 'Изучите продвинутые концепции асинхронного программирования в Python.',
              tests: [
                {
                  question: 'Как создать асинхронный контекстный менеджер?',
                  options: ['async with', 'async context', 'async enter', 'async exit'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать асинхронный итератор?',
                  options: ['async def __aiter__', 'async def __iter__', 'async def __next__', 'async def __anext__'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать асинхронный генератор?',
                  options: ['async def', 'async yield', 'async return', 'async break'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать асинхронный декоратор?',
                  options: ['async def decorator', 'async decorator', 'async def wrapper', 'async wrapper'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать асинхронный класс?',
                  options: ['class AsyncClass', 'async class', 'class async', 'async def class'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте асинхронный контекстный менеджер',
                  'Создайте асинхронный итератор',
                  'Создайте асинхронный генератор',
                  'Создайте асинхронный декоратор',
                  'Продемонстрируйте работу всех асинхронных конструкций'
                ],
                testCases: [
                  {
                    input: 'import asyncio\n\nclass AsyncContextManager:\n    async def __aenter__(self):\n        print("Вход")\n        return self\n    \n    async def __aexit__(self, exc_type, exc_val, exc_tb):\n        print("Выход")\n\nclass AsyncIterator:\n    def __init__(self):\n        self.count = 0\n    \n    def __aiter__(self):\n        return self\n    \n    async def __anext__(self):\n        if self.count >= 3:\n            raise StopAsyncIteration\n        self.count += 1\n        await asyncio.sleep(0.1)\n        return self.count\n\nasync def async_generator():\n    for i in range(3):\n        await asyncio.sleep(0.1)\n        yield i\n\nasync def async_decorator(func):\n    async def wrapper(*args, **kwargs):\n        print("До выполнения")\n        result = await func(*args, **kwargs)\n        print("После выполнения")\n        return result\n    return wrapper\n\n@async_decorator\nasync def example():\n    async with AsyncContextManager():\n        async for i in AsyncIterator():\n            print(f"Итератор: {i}")\n        async for i in async_generator():\n            print(f"Генератор: {i}")\n\nasyncio.run(example())',
                    expectedOutput: "До выполнения\nВход\nИтератор: 1\nИтератор: 2\nИтератор: 3\nГенератор: 0\nГенератор: 1\nГенератор: 2\nВыход\nПосле выполнения"
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block4',
          title: 'Сетевое программирование',
          lessons: [
            {
              id: 'lesson7',
              title: 'Основы сетевого программирования',
              content: 'Изучите основы сетевого программирования в Python.',
              tests: [
                {
                  question: 'Как создать сокет?',
                  options: ['socket.socket()', 'socket.create()', 'socket.new()', 'socket.make()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как привязать сокет к адресу?',
                  options: ['bind()', 'connect()', 'attach()', 'link()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как прослушивать соединения?',
                  options: ['listen()', 'accept()', 'receive()', 'get()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как принять соединение?',
                  options: ['accept()', 'connect()', 'receive()', 'get()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как отправить данные?',
                  options: ['send()', 'write()', 'transmit()', 'push()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте серверный сокет',
                  'Привяжите сокет к адресу',
                  'Начните прослушивание',
                  'Примите соединение',
                  'Отправьте и получите данные'
                ],
                testCases: [
                  {
                    input: 'import socket\n\nserver = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nserver.bind(("localhost", 5000))\nserver.listen(1)\n\nclient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\nclient.connect(("localhost", 5000))\n\nconn, addr = server.accept()\nclient.send(b"Hello, Server!")\ndata = conn.recv(1024)\nprint(data.decode())\n\nconn.send(b"Hello, Client!")\ndata = client.recv(1024)\nprint(data.decode())\n\nconn.close()\nclient.close()\nserver.close()',
                    expectedOutput: "Hello, Server!\nHello, Client!"
                  }
                ]
              }
            },
            {
              id: 'lesson8',
              title: 'Продвинутое сетевое программирование',
              content: 'Изучите продвинутые концепции сетевого программирования в Python.',
              tests: [
                {
                  question: 'Как создать асинхронный сервер?',
                  options: ['asyncio.start_server()', 'asyncio.create_server()', 'asyncio.new_server()', 'asyncio.make_server()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать асинхронный клиент?',
                  options: ['asyncio.open_connection()', 'asyncio.connect()', 'asyncio.create_connection()', 'asyncio.new_connection()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать протокол?',
                  options: ['class Protocol(asyncio.Protocol)', 'class Protocol(protocol)', 'class Protocol(connection)', 'class Protocol(server)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать транспорт?',
                  options: ['class Transport(asyncio.Transport)', 'class Transport(transport)', 'class Transport(connection)', 'class Transport(server)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать SSL-соединение?',
                  options: ['ssl.create_default_context()', 'ssl.context()', 'ssl.create_context()', 'ssl.new_context()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте асинхронный сервер',
                  'Создайте асинхронный клиент',
                  'Реализуйте протокол',
                  'Реализуйте транспорт',
                  'Добавьте SSL-шифрование'
                ],
                testCases: [
                  {
                    input: 'import asyncio\nimport ssl\n\nclass EchoServerProtocol(asyncio.Protocol):\n    def connection_made(self, transport):\n        self.transport = transport\n\n    def data_received(self, data):\n        self.transport.write(data)\n\n    def connection_lost(self, exc):\n        self.transport.close()\n\nasync def main():\n    context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)\n    context.load_cert_chain("cert.pem", "key.pem")\n\n    server = await asyncio.start_server(\n        EchoServerProtocol,\n        "localhost",\n        5000,\n        ssl=context\n    )\n\n    async with server:\n        await server.serve_forever()\n\nasyncio.run(main())',
                    expectedOutput: ""
                  }
                ]
              }
            }
          ]
        },
        {
          id: 'block5',
          title: 'Базы данных',
          lessons: [
            {
              id: 'lesson9',
              title: 'Основы работы с базами данных',
              content: 'Изучите основы работы с базами данных в Python.',
              tests: [
                {
                  question: 'Как подключиться к SQLite?',
                  options: ['sqlite3.connect()', 'sqlite3.open()', 'sqlite3.create()', 'sqlite3.new()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать курсор?',
                  options: ['connection.cursor()', 'connection.create_cursor()', 'connection.new_cursor()', 'connection.make_cursor()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как выполнить SQL-запрос?',
                  options: ['cursor.execute()', 'cursor.run()', 'cursor.execute_query()', 'cursor.run_query()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как получить результаты запроса?',
                  options: ['cursor.fetchall()', 'cursor.get_all()', 'cursor.fetch_results()', 'cursor.get_results()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как сохранить изменения?',
                  options: ['connection.commit()', 'connection.save()', 'connection.apply()', 'connection.update()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте подключение к SQLite',
                  'Создайте таблицу',
                  'Добавьте данные',
                  'Выполните запрос',
                  'Получите результаты'
                ],
                testCases: [
                  {
                    input: 'import sqlite3\n\nconn = sqlite3.connect("test.db")\ncursor = conn.cursor()\n\ncursor.execute("""\n    CREATE TABLE IF NOT EXISTS users (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        age INTEGER\n    )\n""")\n\ncursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("John", 30))\nconn.commit()\n\ncursor.execute("SELECT * FROM users")\nprint(cursor.fetchall())\n\nconn.close()',
                    expectedOutput: "[(1, 'John', 30)]"
                  }
                ]
              }
            },
            {
              id: 'lesson10',
              title: 'Продвинутая работа с базами данных',
              content: 'Изучите продвинутые концепции работы с базами данных в Python.',
              tests: [
                {
                  question: 'Как использовать ORM?',
                  options: ['SQLAlchemy', 'Django ORM', 'Peewee', 'все варианты верны'],
                  correctAnswer: 3
                },
                {
                  question: 'Как создать модель?',
                  options: ['class Model(Base)', 'class Model(model)', 'class Model(table)', 'class Model(database)'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать сессию?',
                  options: ['Session()', 'create_session()', 'new_session()', 'make_session()'],
                  correctAnswer: 0
                },
                {
                  question: 'Как выполнить миграцию?',
                  options: ['alembic upgrade head', 'alembic migrate', 'alembic update', 'alembic apply'],
                  correctAnswer: 0
                },
                {
                  question: 'Как создать транзакцию?',
                  options: ['with session.begin()', 'session.begin()', 'session.start()', 'session.create()'],
                  correctAnswer: 0
                }
              ],
              code: {
                initial: '# Напишите код здесь\n',
                requirements: [
                  'Создайте модель с помощью SQLAlchemy',
                  'Создайте сессию',
                  'Добавьте данные',
                  'Выполните запрос',
                  'Используйте транзакции'
                ],
                testCases: [
                  {
                    input: 'from sqlalchemy import create_engine, Column, Integer, String\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom sqlalchemy.orm import sessionmaker\n\nBase = declarative_base()\n\nclass User(Base):\n    __tablename__ = "users"\n    \n    id = Column(Integer, primary_key=True)\n    name = Column(String)\n    age = Column(Integer)\n\nengine = create_engine("sqlite:///test.db")\nBase.metadata.create_all(engine)\n\nSession = sessionmaker(bind=engine)\nsession = Session()\n\nwith session.begin():\n    user = User(name="John", age=30)\n    session.add(user)\n\nusers = session.query(User).all()\nfor user in users:\n    print(f"{user.name}, {user.age}")',
                    expectedOutput: "John, 30"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ];

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

    return (
        <div className="courses-page">
      <div className="courses-header">
        <h1>Курсы Python</h1>
        <p>Выберите курс для начала обучения программированию на Python</p>
      </div>

      <div className="courses-content">
        <div className="courses-list">
          {courses.map(course => (
            <div
              key={course.id}
              className={`course-card ${activeCourse?.id === course.id ? 'active' : ''}`}
              onClick={() => setActiveCourse(course)}
            >
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="course-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(course.blocks.reduce((acc, block) => 
                        acc + block.lessons.filter(lesson => completedLessons.has(lesson.id)).length, 0) / 
                        course.blocks.reduce((acc, block) => acc + block.lessons.length, 0)) * 100}%`
                    }}
                  />
                </div>
                <span className="progress-text">
                  {course.blocks.reduce((acc, block) => 
                    acc + block.lessons.filter(lesson => completedLessons.has(lesson.id)).length, 0)} / 
                  {course.blocks.reduce((acc, block) => acc + block.lessons.length, 0)} уроков завершено
                </span>
              </div>
            </div>
              ))}
            </div>

        {activeCourse && (
          <div className="course-content">
            <h2>{activeCourse.title}</h2>
            <p className="course-description">{activeCourse.description}</p>

            <div className="blocks-list">
              {activeCourse.blocks.map(block => (
                <CourseBlock
                  key={block.id}
                  block={block}
                  completedLessons={completedLessons}
                  onLessonComplete={handleLessonComplete}
                />
              ))}
            </div>
          </div>
        )}
          </div>
        </div>
      );
};
    
    export default CoursesPage;