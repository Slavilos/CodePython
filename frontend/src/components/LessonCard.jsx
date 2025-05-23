import React, {useMemo} from 'react';
import { useNavigate } from 'react-router-dom';
import TestsSection from './TestsSection';
import PracticeSection from './PracticeSection';
import './LessonCard.css';

const LessonCard = ({ lesson, block, lessonProgresses, onComplete, updatedCourse }) => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const isCompleted = useMemo(() => Boolean(lessonProgresses?.find(item => item.lessonId === lesson.id && item.userId === user.id)), [lessonProgresses]);

  console.log('LessonCard', lessonProgresses);

  const handleLessonComplete = (score = null, total = null) => {    
    onComplete(lesson, score, total);
  };

  const handleHelpClick = () => {
    navigate(`/reference?topic=${encodeURIComponent(lesson.title)}`);
  };

  return (
    <div className={`lesson-card ${isCompleted ? 'completed' : ''}`}>
      <div className="lesson-header">
        <h4>{lesson.title}</h4>
        {isCompleted && (
          <span className="completed-badge">✓ Завершено</span>
        )}
      </div>
      <p>{lesson.content}</p>

      <div className="lesson-actions">
        <button className="help-button" onClick={handleHelpClick}>
          Помощь
        </button>
      </div>

      <TestsSection lessonId={lesson.id} tests={lesson.Questions} blockId={block?.id} courseId={block?.CourseId} onFinish={handleLessonComplete} updatedCourse={updatedCourse} />
      <PracticeSection lessonId={lesson.id} assignments={lesson.PracticalAssignments} onComplete={() => handleLessonComplete()} />

    </div>
  );
};

export default LessonCard;
