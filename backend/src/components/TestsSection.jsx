import React from 'react';
import './TestsSection.css';

const TestsSection = ({ tests }) => {
  return (
    <div className="tests-section">
      <h4>Тесты</h4>
      {tests.map((test, index) => (
        <div key={index} className="test-question">
          <p className="question-text">{index + 1}. {test.question}</p>
          <div className="options-list">
            {test.options.map((option, optionIndex) => (
              <label key={optionIndex} className="option-label">
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optionIndex}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestsSection; 