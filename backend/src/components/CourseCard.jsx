import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import './CourseCard.css';

function CourseCard({ course }) {
  const isPythonBasics = course.title === 'Python: Основы программирования';

  return (
    <>
      {isPythonBasics ? (
        <Link to="/python-quiz" className="course-card-link">
          <div className="course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        </Link>
      ) : (
        <div className="course-card">
          <img src={course.image} alt={course.title} />
          <h3>{course.title}</h3>
          <p>{course.description}</p>
        </div>
      )}
    </>
  );
}

export default CourseCard;