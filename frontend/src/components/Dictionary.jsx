import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Dictionary.css';

// Объявление topics до всех хуков и эффектов
const topics = {
  'Основы Python': [
    {
      id: 1,
      title: 'Переменные и типы данных',
      content: (
        <div>
          <p>В Python переменные создаются при первом присваивании значения.</p>
          <h3>Основные типы данных:</h3>
          <table>
            <thead>
              <tr>
                <th>Тип данных</th>
                <th>Описание</th>
                <th>Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>int</td>
                <td>Целые числа</td>
                <td><code>x = 42</code></td>
              </tr>
              <tr>
                <td>float</td>
                <td>Числа с плавающей точкой</td>
                <td><code>y = 3.14</code></td>
              </tr>
              <tr>
                <td>str</td>
                <td>Строки</td>
                <td><code>name = "Python"</code></td>
              </tr>
              <tr>
                <td>bool</td>
                <td>Булевы значения</td>
                <td><code>is_valid = True</code></td>
              </tr>
              <tr>
                <td>list</td>
                <td>Списки (изменяемые последовательности)</td>
                <td><code>numbers = [1, 2, 3]</code></td>
              </tr>
              <tr>
                <td>tuple</td>
                <td>Кортежи (неизменяемые последовательности)</td>
                <td><code>point = (10, 20)</code></td>
              </tr>
              <tr>
                <td>dict</td>
                <td>Словари (ключ-значение)</td>
                <td><code>{'user = {"name": "John"}'}</code></td>
              </tr>
              <tr>
                <td>set</td>
                <td>Множества (уникальные элементы)</td>
                <td><code>{'unique = {1, 2, 3}'}</code></td>
              </tr>
            </tbody>
          </table>
          <h3>Преобразование типов:</h3>
          <table>
            <thead>
              <tr>
                <th>Функция</th>
                <th>Описание</th>
                <th>Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>int()</td>
                <td>Преобразование в целое число</td>
                <td><code>x = int("42")</code></td>
              </tr>
              <tr>
                <td>float()</td>
                <td>Преобразование в число с плавающей точкой</td>
                <td><code>y = float("3.14")</code></td>
              </tr>
              <tr>
                <td>str()</td>
                <td>Преобразование в строку</td>
                <td><code>text = str(42)</code></td>
              </tr>
              <tr>
                <td>bool()</td>
                <td>Преобразование в булево значение</td>
                <td><code>flag = bool(1)</code></td>
              </tr>
              <tr>
                <td>list()</td>
                <td>Преобразование в список</td>
                <td><code>lst = list("abc")</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      level: 'Начальный'
    },
    {
      id: 2,
      title: 'Операторы и выражения',
      content: (
        <div>
          <h3>Основные операторы в Python:</h3>
          <table>
            <thead>
              <tr>
                <th>Категория</th>
                <th>Операторы</th>
                <th>Примеры</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Арифметические</td>
                <td>+, -, *, /, //, %, **</td>
                <td>
                  a = 10 + 5<br/>
                  b = 20 - 8<br/>
                  c = 4 * 3
                </td>
              </tr>
              <tr>
                <td>Сравнения</td>
                <td>{'==, !=, >, <, >=, <='}</td>
                <td>
                  {'if x > 0:'}<br/>
                  &nbsp;&nbsp;print("Положительное")
                </td>
              </tr>
              <tr>
                <td>Логические</td>
                <td>and, or, not</td>
                <td>
                  {'if x > 0 and y < 10:'}<br/>
                  &nbsp;&nbsp;print("В диапазоне")
                </td>
              </tr>
              <tr>
                <td>Присваивания</td>
                <td>=, +=, -=, *=, /=</td>
                <td>
                  x = 5<br/>
                  x += 3  # x = x + 3
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      level: 'Начальный'
    }
  ],
  'Управление потоком': [
    {
      id: 3,
      title: 'Условные операторы',
      content: `В Python используются следующие условные операторы:
- if: основное условие
- elif: альтернативное условие
- else: условие по умолчанию

Примеры:
if age >= 18:
    print("Доступ разрешен")
elif age >= 14:
    print("Доступ частично разрешен")
else:
    print("Доступ запрещен")

# Тернарный оператор
status = "Взрослый" if age >= 18 else "Ребенок"`,
      level: 'Начальный'
    },
    {
      id: 4,
      title: 'Циклы',
      content: `В Python есть два типа циклов:
1. for - для перебора последовательности
2. while - для повторения действий по условию

Примеры:
# Цикл for
for i in range(5):
    print(i)

# Цикл while
count = 0
while count < 5:
    print(count)
    count += 1

# Операторы break и continue
for i in range(10):
    if i == 3:
        continue  # пропускаем итерацию
    if i == 7:
        break    # прерываем цикл
    print(i)`,
      level: 'Начальный'
    }
  ],
  'Функции': [
    {
      id: 5,
      title: 'Определение и вызов функций',
      content: `Функции в Python определяются с помощью ключевого слова def:

def greet(name):
    return f"Привет, {name}!"

# Функция с параметрами по умолчанию
def power(base, exponent=2):
    return base ** exponent

# Функция с произвольным количеством аргументов
def sum_numbers(*args):
    return sum(args)

# Вызов функций
print(greet("Python"))        # Привет, Python!
print(power(3))              # 9
print(power(3, 3))           # 27
print(sum_numbers(1, 2, 3))  # 6`,
      level: 'Средний'
    },
    {
      id: 6,
      title: 'Лямбда-функции',
      content: `Лямбда-функции - это анонимные функции, которые могут содержать только одно выражение:

# Обычная функция
def square(x):
    return x ** 2

# Эквивалентная лямбда-функция
square = lambda x: x ** 2

# Использование в filter
numbers = [1, 2, 3, 4, 5]
even = list(filter(lambda x: x % 2 == 0, numbers))

# Использование в map
squares = list(map(lambda x: x ** 2, numbers))`,
      level: 'Средний'
    }
  ],
  'Структуры данных': [
    {
      id: 7,
      title: 'Списки и кортежи',
      content: `Списки и кортежи - это последовательности в Python:

# Списки (изменяемые)
numbers = [1, 2, 3]
numbers.append(4)      # [1, 2, 3, 4]
numbers.insert(0, 0)   # [0, 1, 2, 3, 4]
numbers.remove(2)      # [0, 1, 3, 4]
numbers.pop()          # [0, 1, 3]

# Кортежи (неизменяемые)
point = (10, 20)
x, y = point          # распаковка кортежа

# Срезы
numbers = [0, 1, 2, 3, 4, 5]
print(numbers[1:4])   # [1, 2, 3]
print(numbers[:3])    # [0, 1, 2]
print(numbers[3:])    # [3, 4, 5]`,
      level: 'Средний'
    },
    {
      id: 8,
      title: 'Словари и множества',
      content: `Словари и множества - это коллекции в Python:

# Словари (ключ-значение)
user = {
    "name": "John",
    "age": 30,
    "city": "Moscow"
}

# Методы словарей
user["email"] = "john@example.com"  # добавление
del user["age"]                     # удаление
value = user.get("name")            # получение значения
keys = user.keys()                  # получение ключей
values = user.values()              # получение значений

# Множества (уникальные элементы)
numbers = {1, 2, 3, 3, 4, 4, 5}    # {1, 2, 3, 4, 5}
numbers.add(6)                      # добавление
numbers.remove(3)                   # удаление
numbers.discard(7)                  # безопасное удаление`,
      level: 'Средний'
    }
  ],
  'ООП': [
    {
      id: 9,
      title: 'Классы и объекты',
      content: `Основы объектно-ориентированного программирования в Python:

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Привет, меня зовут {self.name}!"
    
    @property
    def is_adult(self):
        return self.age >= 18

# Создание объекта
person = Person("John", 30)
print(person.greet())      # Привет, меня зовут John!
print(person.is_adult)     # True

# Наследование
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
    
    def study(self):
        return f"{self.name} учится в {self.grade} классе"`,
      level: 'Продвинутый'
    },
    {
      id: 10,
      title: 'Наследование и полиморфизм',
      content: `Продвинутые концепции ООП в Python:

class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Гав!"

class Cat(Animal):
    def speak(self):
        return "Мяу!"

# Полиморфизм
animals = [Dog(), Cat()]
for animal in animals:
    print(animal.speak())  # Гав! Мяу!

# Абстрактные классы
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2`
    }
  ],
  'Продвинутые концепции': [
    {
      id: 11,
      title: 'Декораторы',
      content: (
        <div>
          <p>Декораторы - это функции, которые модифицируют поведение других функций или классов.</p>
          <table>
            <thead>
              <tr>
                <th>Тип декоратора</th>
                <th>Описание</th>
                <th>Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Функциональные декораторы</td>
                <td>Модифицируют поведение функций</td>
                <td>
                  <code>
                    {`@timer\ndef slow_function():`}<br/>
                    {`    pass`}
                  </code>
                </td>
              </tr>
              <tr>
                <td>Декораторы классов</td>
                <td>Модифицируют поведение классов</td>
                <td>
                  <code>
                    {`@singleton\nclass Database:`}<br/>
                    {`    pass`}
                  </code>
                </td>
              </tr>
              <tr>
                <td>Декораторы с параметрами</td>
                <td>Принимают дополнительные параметры</td>
                <td>
                  <code>
                    {`@retry(times=3)\ndef api_call():`}<br/>
                    {`    pass`}
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      level: 'Продвинутый'
    },
    {
      id: 12,
      title: 'Генераторы и итераторы',
      content: (
        <div>
          <h3>Генераторы</h3>
          <table>
            <thead>
              <tr>
                <th>Концепция</th>
                <th>Описание</th>
                <th>Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Функция-генератор</td>
                <td>Использует yield для возврата значений</td>
                <td>
                  <code>
                    {`def count_up_to(n):`}<br/>
                    {`    i = 1`}<br/>
                    {`    while i <= n:`}<br/>
                    {`        yield i`}<br/>
                    {`        i += 1`}
                  </code>
                </td>
              </tr>
              <tr>
                <td>Генераторное выражение</td>
                <td>Создает генератор в одну строку</td>
                <td>
                  <code>
                    {`squares = (x**2 for x in range(10))`}
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
          
          <h3>Итераторы</h3>
          <table>
            <thead>
              <tr>
                <th>Метод</th>
                <th>Описание</th>
                <th>Пример</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>__iter__()</td>
                <td>Возвращает итератор</td>
                <td>
                  <code>
                    {`def __iter__(self):`}<br/>
                    {`    return self`}
                  </code>
                </td>
              </tr>
              <tr>
                <td>__next__()</td>
                <td>Возвращает следующий элемент</td>
                <td>
                  <code>
                    {`def __next__(self):`}<br/>
                    {`    if self.index >= len(self.data):`}<br/>
                    {`        raise StopIteration`}<br/>
                    {`    return self.data[self.index]`}
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
      level: 'Продвинутый'
    }
  ]
};

const formatContent = (content) => {
  if (typeof content === 'string') {
    // Разделяем контент на секции
    const sections = content.split('\n\n');
    return sections.map((section, sectionIndex) => {
      const lines = section.split('\n');
      // Проверяем, является ли первая строка заголовком (начинается с '#' или содержит ':')
      const hasHeader = lines[0].startsWith('#') || lines[0].includes(':');
      const header = hasHeader ? lines[0].replace('#', '').trim() : '';
      const content = hasHeader ? lines.slice(1) : lines;

      if (content.some(line => line.includes('='))) {
        // Если есть строки с '=', форматируем как таблицу с примерами
        return (
          <div key={sectionIndex} className="content-section">
            {header && <h3>{header}</h3>}
            <table>
              <thead>
                <tr>
                  <th>Описание</th>
                  <th>Пример</th>
                </tr>
              </thead>
              <tbody>
                {content.map((line, index) => {
                  if (line.trim()) {
                    const [desc, example] = line.split('=').map(s => s.trim());
                    return (
                      <tr key={index}>
                        <td>{desc}</td>
                        <td><code>{example}</code></td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        );
      } else {
        // Для обычного текста создаем таблицу с одной колонкой
        return (
          <div key={sectionIndex} className="content-section">
            {header && <h3>{header}</h3>}
            <table>
              <tbody>
                {content.map((line, index) => (
                  line.trim() && (
                    <tr key={index}>
                      <td>{line.trim()}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    });
  }
  // Если контент уже является JSX (например, готовая таблица), возвращаем как есть
  return content;
};

const Dictionary = () => {
  const [searchParams] = useSearchParams();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const topicFromUrl = searchParams.get('topic');
    if (topicFromUrl) {
      for (const [category, topicsArr] of Object.entries(topics)) {
        const matchingTopic = topicsArr.find(t => t.title === topicFromUrl);
        if (matchingTopic) {
          setSelectedTopic(matchingTopic);
          break;
        }
      }
    }
  }, [searchParams]);

  const filteredTopics = Object.entries(topics).reduce((acc, [category, items]) => {
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof item.content === 'string' && item.content.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {});

  return (
    <div className="dictionary-container">
      <div className="dictionary-header">
        <h2>Справочник Python</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Поиск по справочнику..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="topics-sidebar">
        {Object.entries(filteredTopics).map(([category, items]) => (
          <div key={category} className="category-section">
            <h3>{category}</h3>
            <div className="topics-list">
              {items.map(topic => (
                <div
                  key={topic.id}
                  className={`topic-card ${selectedTopic?.id === topic.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <h4>{topic.title}</h4>
                  <span className="level-badge" data-level={topic.level}>
                    {topic.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="content-main">
        {selectedTopic ? (
          <div className="content-section">
          <h3>{selectedTopic.title}</h3>
          <div className="content-text">
              {formatContent(selectedTopic.content)}
            </div>
          </div>
        ) : (
          <div className="content-section">
            <h3>Выберите тему</h3>
            <p>Выберите тему из списка слева, чтобы увидеть подробную информацию.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dictionary; 