import React, { useState, useEffect } from 'react';
import './TestsSection.css';

const TestsSection = ({ lessonId, blockId, onFinish, courseId, updatedCourse}) => {
  const [tests, setTests] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const token = localStorage.getItem('token'); // Получение токена из localStorage

        const response = await fetch(`/api/admin/lessons/${lessonId}/questions`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Не удалось загрузить вопросы теста');
        }
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Ошибка при загрузке вопросов теста:', error);
      }
    };

    fetchTests();
  }, [lessonId]);

  const currentTest = tests[currentQuestion];

  useEffect(() => {
    if (tests && tests.length > 0) {
      setCurrentQuestion(0);
      setAnswers([]);
      setScore(0);
      setIsTestCompleted(false);
    }
  }, [tests.length, tests[0]?.id]);

  if (!currentTest) {
    return <div className="tests-section">Нет заданий для отображения.</div>;
  }

  // Улучшенная обратная связь для правильных/неправильных ответов и улучшенное управление состоянием
  const handleAnswer = (index) => {
    const updated = [...answers];
    updated[currentQuestion] = index;
    setAnswers(updated);
  };

  const handleCodeChange = (e) => setCode(e.target.value);

  const handleExecuteCode = async () => {
    try {
      const res = await fetch('/api/code/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.output);
        setError(data.error || null);
        if (data.output && data.output.trim() === currentTest.expectedOutput?.trim()) {
          setScore(prev => prev + 1);
        }
      } else {
        setError(data.error || data.message || 'Ошибка выполнения');
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
      if (isCorrect) setScore((prev) => prev + 1);
    }

    if (currentQuestion < tests.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setCode('');
      setResult(null);
      setError(null);
    } else {
      setIsTestCompleted(true);
    }
  };

  const handleSubmit = async () => {
    const {finalScore} = calcPercent();
    const token = localStorage.getItem('token');

    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user?.id) {
      try {
        const response = await fetch('api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: user?.id,
            lessonId,
            blockId,
            courseId,
            totalQuestions: tests.length,
            correctAnswers: finalScore
          }),
        });

        if (!response.ok) {
          throw new Error('Ошибка при сохранении результатов');
        }

        const data = await response.json();
        if (data.success) {
          updatedCourse(data);
          const events = JSON.parse(localStorage.getItem('events') || '[]');
          events.unshift({
            id: Date.now(),
            type: 'TEST_COMPLETED',
            description: `Пользователь завершил тест с результатом ${Math.round(
              (finalScore / tests.length) * 100
            )}%`,
            date: new Date().toISOString(),
            courseId,
            blockId,
          });
          localStorage.setItem('events', JSON.stringify(events));
        }
      } catch (error) {
        console.error('Ошибка при сохранении результатов:', error);
      }
    }

    if (onFinish) onFinish(finalScore, tests.length);
    setIsTestCompleted(true);
  };

  const calcPercent = () => {
    const finalScore = score + (currentTest.type === 'choice' && currentTest.correctAnswer === answers[currentQuestion] ? 1 : 0);
    return {
      finalScore,
      percentage: (finalScore / tests.length) * 100
    };
  };

  if (isTestCompleted) {
    const {finalScore, percentage} = calcPercent();
    let grade = 2;
    if (percentage >= 85) grade = 5;
    else if (percentage >= 75) grade = 4;
    else if (percentage >= 60) grade = 3;

    return (
      <div className="tests-section">
        <h3>Тест завершен!</h3>
        <p>Ваш результат: {finalScore} из {tests.length} ({percentage.toFixed(1)}%)</p>
        <p>Оценка: {grade}</p>
      </div>
    );
  }

  return (
    <div className="tests-section">
      <div className="progress">Вопрос {currentQuestion + 1} из {tests.length}</div>

      <div className="question-block">
        <h4>{currentTest.question}</h4>

        { JSON.parse(currentTest.options)?.map((option, idx) => (
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
