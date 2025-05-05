import React, { useState } from 'react';
import './TestsSection.css';

const TestsSection = ({ tests = [], blockId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);

  const currentTest = tests[currentQuestion];

  if (!currentTest) {
    return <div className="tests-section">Нет заданий для отображения.</div>;
  }

  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
  };

  const handleCodeChange = (e) => setCode(e.target.value);

  const handleExecuteCode = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
        if (data.result.trim() === currentTest.expectedOutput.trim()) {
          setScore(prev => prev + 1);
        }
        setError(null);
      } else {
        setError(data.message || 'Ошибка выполнения');
        setResult(null);
      }
    } catch (e) {
      setError('Ошибка сервера');
      setResult(null);
    }
  };

  const handleNext = () => {
    if (currentTest.type === 'choice') {
      const isCorrect = currentTest.correctAnswer === answers[currentQuestion];
      if (isCorrect) setScore(prev => prev + 1);
    }

    setCurrentQuestion(prev => prev + 1);
    setCode('');
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      await fetch('http://localhost:5000/api/results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          blockId,
          score,
          total: tests.length
        })
      });
    }

    alert(`Тест завершён! Ваш результат: ${score}/${tests.length}`);
  };

  return (
    <div className="tests-section">
      <div className="progress">Вопрос {currentQuestion + 1} из {tests.length}</div>

      <div className="question-block">
        <h4>{currentTest.question}</h4>

        { currentTest.options?.map((option, idx) => (
          <label key={idx} className={`answer-option ${answers[currentQuestion] === idx ? 'selected' : ''}`}>
            <input
              type="radio"
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
              rows={6}
              placeholder="Введите код..."
            />
            <button onClick={handleExecuteCode}>Запустить код</button>
            {result && <div className="result">Результат: {result}</div>}
            {error && <div className="error">Ошибка: {error}</div>}
          </>
        )}
      </div>

      <div className="controls">
        {currentQuestion < tests.length - 1 ? (
          <button onClick={handleNext}>Следующий</button>
        ) : (
          <button onClick={handleSubmit}>Завершить</button>
        )}
      </div>
    </div>
  );
};

export default TestsSection;
