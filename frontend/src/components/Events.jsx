import React, { useState, useEffect, useCallback } from 'react';
import './Events.css';

const Events = () => {
  const [events, setEvents] = useState([]);

  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const getEvents = async () => {
    const token = localStorage.getItem('token'); // Получение токена из localStorage

    try {
      const response = await fetch(
          '/api/admin/courses',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch assignments');
        }
        
        const data = await response.json();
        setEvents(data);
    }
    catch (error) {
        console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    getEvents();    
  }, []);

const getProgresses = useCallback((event, lessonId) => {
  const progresses = event?.LessonProgresses.find(item => item.lessonId === lessonId && item.userId === user.id) || {score: 0};
  let grade = 2;
  if (progresses?.score >= 85) grade = 5;
  else if (progresses?.score >= 75) grade = 4;
  else if (progresses?.score >= 60) grade = 3;
  
  return (
    <span className="grade-badge" data-grade={grade}>
      {progresses?.score ? grade : 'Не выполнен'}
    </span>
  );
}, []);

  return (
    <div className="events">
      <h2>События</h2>
      <div className="events-list">
        {events.length === 0 && <div className="no-events">Нет событий</div>}
        {events.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              {event?.title}

              {/* <span className="event-type">
                {event.type === 'lesson_completed' ? '📚' :
                 event.type === 'test_completed' ? '✍️' :
                 event.type === 'course_completed' ? '🏆' : 'ℹ️'}
              </span>
              <span className="event-date">
                {new Date(event.createdAt).toLocaleString()}
              </span> */}
            </div>
            <div className="event-content">
              {event?.Blocks?.length && event?.Blocks.map(block => (
                <div>
                  <h3>{block.title}</h3>
                  {block?.Lessons?.length && block?.Lessons.map(lesson => (
                    <div>
                      <h4>{lesson.title}</h4>
                      {getProgresses(event, lesson.id)}
                      
                    </div>
                  ))}
                </div>
              ))

              }
             {/* {event.type === 'test_completed' ? (
  <>
    <p><strong>Результат:</strong> {event.description}</p>
    {event.Course && <p><strong>Курс:</strong> {event.Course.title}</p>}
    {event.Lesson && <p><strong>Урок:</strong> {event.Lesson.title}</p>}
  </>
) : (
  <>
    <p>{event.description}</p>
    {event.Course && <p className="event-course">Курс: {event.Course.title}</p>}
    {event.Lesson && <p className="event-lesson">Урок: {event.Lesson.title}</p>}
  </>
)} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
