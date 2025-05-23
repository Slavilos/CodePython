import React, { useState } from 'react';
import './TestsSection.css';

const TestsSection = ({ tests = [], blockId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Если тестов нет — ничего не рендерим
  if (!tests || tests.length === 0) {
    return <div className="tests-section">Нет доступных заданий для блока #{blockId}</div>;
  }

  const currentTest = tests[currentQuestion];

  const handleAnswer = (optionIndex) => {
    const updated = [...answers];
    updated[currentQuestion] = optionIndex;
    setAnswers(updated);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleExecuteCode = async () => {
    try {
      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.output);
        setError(data.error || null);
      } else {
        setError(data.error || data.message || 'Ошибка выполнения кода');
        setResult(null);
      }
    } catch (err) {
      setError('Ошибка соединения с сервером');
      setResult(null);
    }
  };

  const handleNext = () => {
    if (currentQuestion < tests.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setResult(null);
      setError(null);
      setCode('');
    }
  };

  const handleSubmit = () => {
    alert('Тест завершён!');
  };

  return (
    <div className="tests-section">
      <div className="progress">
        Вопрос {currentQuestion + 1} из {tests.length}
      </div>

      <div className="question-card">
        <h4>{currentTest.question}</h4>

        {currentTest.options?.map((option, idx) => (
          <label key={idx} className="option">
            <input
              type="radio"
              name={`question-${currentQuestion}`}
              checked={answers[currentQuestion] === idx}
              onChange={() => handleAnswer(idx)}
            />
            {option}
          </label>
        ))}

        {currentTest.type === 'code' && (
          <>
            <textarea
              value={code}
              onChange={handleCodeChange}
              placeholder="Введите код"
              rows={8}
            />
            <button onClick={handleExecuteCode}>Запустить код</button>
            {result && <div className="result">Результат: {result}</div>}
            {error && <div className="error">Ошибка: {error}</div>}
          </>
        )}
      </div>

      <div className="buttons">
        {currentQuestion < tests.length - 1 ? (
          <button onClick={handleNext}>Следующий вопрос</button>
        ) : (
          <button onClick={handleSubmit}>Завершить тест</button>
        )}
      </div>
    </div>
  );
};

export default TestsSection;
