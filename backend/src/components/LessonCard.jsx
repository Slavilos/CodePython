import React from 'react';
import TestsSection from './TestsSection';
import PracticeSection from './PracticeSection';
import './LessonCard.css';

const LessonCard = ({ lesson, isCompleted, onComplete }) => {
  return (
    <div className={`lesson-card ${isCompleted ? 'completed' : ''}`}>
      <div className="lesson-header">
        <h4>{lesson.title}</h4>
        {isCompleted && (
          <span className="completed-badge">✓ Завершено</span>
        )}
      </div>
      <p>{lesson.content}</p>

      <TestsSection tests={lesson.tests} />
      <PracticeSection 
        code={lesson.code} 
        onComplete={() => onComplete(lesson.id)} 
      />
    </div>
  );
};

export default LessonCard; 