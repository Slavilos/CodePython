import React, { useState, useEffect } from 'react';
import InteractiveCodeBlock from './InteractiveCodeBlock';
import './PracticeSection.css';

const PracticeSection = ({ lessonId, onComplete }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token'); // Получение токена из localStorage

        const response = await fetch(
          `/api/admin/lessons/${lessonId}/assignments`,
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
        setAssignments(data);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, [lessonId]);

  if (!assignments.length) {
    return (
      <div className="code-section">
        <h4>Практическое задание</h4>
        <div>Нет практических заданий</div>
      </div>
    );
  }

  return (
    <div className="code-section">
      <h4>Практическое задание</h4>
      {assignments.map((task, idx) => (
        <div key={idx} className="code-task">
          <h5>{task.title}</h5>
          {task.description && <p>{task.description}</p>}

          {Array.isArray(task.requirements) && task.requirements.length > 0 && (
            <div className="code-requirements">
              <h6>Требования:</h6>
              <ol>
                {task.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ol>
            </div>
          )}

          <InteractiveCodeBlock
            initialCode={task.initialCode}
            testCases={task.testCases}
            onComplete={onComplete}
          />
        </div>
      ))}
    </div>
  );
};

export default PracticeSection;
