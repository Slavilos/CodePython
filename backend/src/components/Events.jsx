import React, { useState } from 'react';
import './Events.css';

const Events = () => {
  const [events] = useState([
    {
      id: 1,
      type: 'lesson_completed',
      title: 'Пройден урок "Переменные и типы данных"',
      course: 'Python: Основы',
      grade: 5,
      date: '2024-02-15 14:30'
    },
    {
      id: 2,
      type: 'lesson_completed',
      title: 'Пройден урок "Условные операторы"',
      course: 'Python: Основы',
      grade: 4,
      date: '2024-02-15 15:45'
    },
    {
      id: 3,
      type: 'test_completed',
      title: 'Пройден тест по теме "Функции"',
      course: 'Python: Углубленный уровень',
      grade: 5,
      date: '2024-02-14 16:20'
    },
    {
      id: 4,
      type: 'practice_completed',
      title: 'Выполнено практическое задание "Работа со списками"',
      course: 'Python: Основы',
      grade: 5,
      date: '2024-02-14 17:15'
    }
  ]);

  return (
    <div className="events">
      <h2>События</h2>
      <div className="events-list">
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className="event-type">
                {event.type === 'lesson_completed' ? '📚' : 
                 event.type === 'test_completed' ? '✍️' : '💻'}
              </span>
              <span className="event-date">
                {new Date(event.date).toLocaleString('ru-RU')}
              </span>
            </div>
            <div className="event-content">
              <h3>{event.title}</h3>
              <p className="event-course">{event.course}</p>
              <div className="event-grade">
                Оценка: <span className={`grade-${event.grade}`}>{event.grade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events; 