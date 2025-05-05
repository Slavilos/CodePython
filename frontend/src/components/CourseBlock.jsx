import React from 'react';
import LessonCard from './LessonCard';
import './CourseBlock.css';

const CourseBlock = ({ block, completedLessons, onLessonComplete }) => {
  return (
    <div className="block-card">
      <h3>{block.title}</h3>
      <div className="lessons-list">
        {block.lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            isCompleted={completedLessons.has(lesson.id)}
            onComplete={onLessonComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseBlock; 