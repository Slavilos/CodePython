import React from 'react';
import LessonCard from './LessonCard';
import './CourseBlock.css';

const CourseBlock = ({ block, lessonProgresses, updatedCourse }) => {
  const lessons = block.Lessons || [];

  return (
    <div className="block-card">
      <h3>{block.title}</h3>
      <div className="lessons-list">
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} block={block} lessonProgresses={lessonProgresses} onComplete={()=>{}} updatedCourse={updatedCourse}/>
        ))}
      </div>
    </div>
  );
};

export default CourseBlock;
