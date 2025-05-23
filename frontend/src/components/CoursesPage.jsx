import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseBlock from './CourseBlock';
import './CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);

  const getCourses = async () => {
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
        setCourses(data);
        const storedId = localStorage.getItem('activeCourseId');
        
        const matched = data.find(c => c.id === Number(storedId));

        if (matched) setActiveCourse(matched);
        console.log('activeCourseId',activeCourse, storedId, matched);
    }
    catch (error) {
        console.error('Error fetching assignments:', error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const handleSelect = (course) => {
    setActiveCourse(course);
  };

  return (
    <div className="courses-page">
      <div className="sidebar">
        {courses.map(course => (
          <div
            key={course.id}
            className={`course-card ${activeCourse?.id === course.id ? 'active' : ''}`}
            onClick={() => handleSelect(course)}
          >
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(course?.CourseProgresses[0]?.completedLessons || 0 / course?.CourseProgresses[0]?.totalLessons || 1) * 100}%` }}
              ></div>
            </div>
            <p>{course?.CourseProgresses?.length ? `${course?.CourseProgresses[0]?.completedLessons} из ${course?.CourseProgresses[0]?.totalLessons} уроков` : ''}</p>
          </div>
        ))}
      </div>
      <div className="content">
        {activeCourse && (
          <div className="active-course">
            {activeCourse.Blocks?.map(block => (
              <CourseBlock key={block.id} block={block} lessonProgresses={activeCourse?.LessonProgresses || []} updatedCourse={getCourses}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
