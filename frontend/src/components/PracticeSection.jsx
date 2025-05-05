import React from 'react';
import InteractiveCodeBlock from './InteractiveCodeBlock';
import './PracticeSection.css';

const PracticeSection = ({ code, onComplete }) => {
  return (
    <div className="code-section">
      <h4>Практическое задание</h4>
      <div className="code-requirements">
        <h5>Требования к коду:</h5>
        <ol>
          {code.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ol>
      </div>
      <InteractiveCodeBlock
        initialCode={code.initial}
        testCases={code.testCases}
        onComplete={onComplete}
      />
    </div>
  );
};

export default PracticeSection; 