import React, { useState } from 'react';
import './Dictionary.css';

const Dictionary = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const topics = {
    'Основы Python': [
      {
        id: 1,
        title: 'Переменные и типы данных',
        content: `В Python переменные создаются при первом присваивании значения. Основные типы данных:
- Числа (int, float)
- Строки (str)
- Булевы значения (bool)
- Списки (list)
- Кортежи (tuple)
- Словари (dict)
- Множества (set)

Примеры:
x = 42          # целое число
y = 3.14        # число с плавающей точкой
name = "Python" # строка
is_valid = True # булево значение
numbers = [1, 2, 3] # список
point = (10, 20)    # кортеж
user = {"name": "John", "age": 30} # словарь
unique = {1, 2, 3}  # множество`,
        level: 'Начальный'
      },
      {
        id: 2,
        title: 'Операторы и выражения',
        content: `Основные операторы в Python:
- Арифметические: +, -, *, /, //, %, **
- Сравнения: ==, !=, >, <, >=, <=
- Логические: and, or, not
- Присваивания: =, +=, -=, *=, /=

Примеры:
a = 10 + 5      # сложение
b = 20 - 8      # вычитание
c = 4 * 3       # умножение
d = 15 / 3      # деление
e = 17 // 3     # целочисленное деление
f = 17 % 3      # остаток от деления
g = 2 ** 3      # возведение в степень

if x > 0 and y < 10:  # логические операторы
    print("Условие выполнено")`,
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
        return 3.14 * self.radius ** 2`,
        level: 'Продвинутый'
      }
    ]
  };

  const filteredTopics = Object.entries(topics).filter(([topic]) =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dictionary">
      <h2>Справочник Python</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Поиск по темам..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="dictionary-content">
        <div className="topics-list">
          {filteredTopics.map(([topic, articles]) => (
            <div
              key={topic}
              className={`topic-item ${selectedTopic === topic ? 'active' : ''}`}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="articles-list">
          {selectedTopic && topics[selectedTopic].map(article => (
            <div key={article.id} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <span className="article-level">{article.level}</span>
              </div>
              <pre className="article-content">{article.content}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dictionary; 