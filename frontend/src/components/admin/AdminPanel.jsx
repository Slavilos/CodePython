import React, { useState, useEffect } from 'react';

const ADMIN_COURSES_KEY = 'admin_courses';

const getAdminCourses = () => {
  const saved = localStorage.getItem(ADMIN_COURSES_KEY);
  return saved ? JSON.parse(saved) : [];
};

const setAdminCourses = (courses) => {
  localStorage.setItem(ADMIN_COURSES_KEY, JSON.stringify(courses));
};

const AdminPanel = () => {
  const [courses, setCourses] = useState(getAdminCourses());
  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [newLesson, setNewLesson] = useState({ title: '', description: '' });

  useEffect(() => {
    setAdminCourses(courses);
  }, [courses]);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) return;
    const id = Date.now().toString();
    setCourses([...courses, { id, title: newCourse.title, description: newCourse.description, lessons: [] }]);
    setNewCourse({ title: '', description: '' });
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!selectedCourseId || !newLesson.title.trim()) return;
    setCourses(courses.map(course =>
      course.id === selectedCourseId
        ? { ...course, lessons: [...course.lessons, { id: Date.now().toString(), title: newLesson.title, description: newLesson.description }] }
        : course
    ));
    setNewLesson({ title: '', description: '' });
  };

  return (
    <div className="admin-panel">
      <h1>Админ-панель</h1>
      <form onSubmit={handleAddCourse} className="admin-form">
        <h2>Добавить курс</h2>
        <input
          type="text"
          placeholder="Название курса"
          value={newCourse.title}
          onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание курса"
          value={newCourse.description}
          onChange={e => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <button type="submit">Добавить курс</button>
      </form>

      <form onSubmit={handleAddLesson} className="admin-form">
        <h2>Добавить урок в курс</h2>
        <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}>
          <option value="">Выберите курс</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Название урока"
          value={newLesson.title}
          onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание урока"
          value={newLesson.description}
          onChange={e => setNewLesson({ ...newLesson, description: e.target.value })}
        />
        <button type="submit">Добавить урок</button>
      </form>

      <div className="admin-courses-list">
        <h2>Текущие курсы</h2>
        {courses.map(course => (
          <div key={course.id} className="admin-course-item">
            <strong>{course.title}</strong> — {course.description}
            <ul>
              {course.lessons.map(lesson => (
                <li key={lesson.id}>{lesson.title} — {lesson.description}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel; 