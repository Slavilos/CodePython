import React, { useState } from 'react';
import './TestComponent.css';

const TestComponent = ({ tests, blockId, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [testProgress, setTestProgress] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const handleAnswer = (questionIndex, optionIndex) => {
    const updatedResults = [...testResults];
    updatedResults[questionIndex] = optionIndex;
    setTestResults(updatedResults);
  };

  const handleSubmit = () => {
    let score = 0;
    tests.forEach((test, index) => {
      if (testResults[index] === test.correctOption) {
        score += 1;
      }
    });

    const percent = (score / tests.length) * 100;
    setTestProgress(score);
    setIsTestCompleted(true);

    // Сообщаем родителю (LessonCard), что тест завершён
    if (onComplete) {
      onComplete(percent); // Передаём процент правильных ответов
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < tests.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div>
      <div>
        <h4>Вопрос {currentQuestionIndex + 1}</h4>
        <p>{tests[currentQuestionIndex].question}</p>
        {tests[currentQuestionIndex].options.map((option, index) => (
          <div key={index}>
            <label>
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                onChange={() => handleAnswer(currentQuestionIndex, index)}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleNext} disabled={currentQuestionIndex === tests.length - 1}>Следующий вопрос</button>
        <button onClick={handleSubmit}>Завершить тест</button>
      </div>
      {isTestCompleted && <div>Ваш результат: {testProgress} из {tests.length} ({((testProgress / tests.length) * 100).toFixed(1)}%)</div>}
    </div>
  );
};

export default TestComponent;
