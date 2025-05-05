import React, { useState } from 'react';
import './PythonBasicsQuiz.css'; // Create this CSS file

function PythonBasicsQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null)); // Assuming 5 questions
  const [showResults, setShowResults] = useState(false);
  const [output, setOutput] = useState(''); // State for the output string
  const [userCode, setUserCode] = useState('');
  const [codeResult, setCodeResult] = useState('');

  const questions = [
    {
      question: 'Что такое Python?',
      options: [
        'Язык программирования',
        'Операционная система',
        'Текстовый редактор',
        'Веб-браузер',
      ],
      correctAnswer: 0,
    },
    {
      question: 'Как объявить переменную в Python?',
      options: [
        'int x = 10;',
        'var x = 10;',
        'x = 10',
        'string x = "hello"',
      ],
      correctAnswer: 2,
    },
    {
      question: 'Какая функция используется для вывода текста в Python?',
      options: ['console.log()', 'print()', 'echo()', 'output()'],
      correctAnswer: 1,
    },
    {
      question: 'Какой оператор используется для сравнения на равенство?',
      options: ['=', '==', '===', '!='],
      correctAnswer: 1,
    },
    {
      question: 'Какой тип данных представляет целое число?',
      options: ['string', 'float', 'int', 'bool'],
      correctAnswer: 2,
    },
  ];

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleShowOutput = () => {
    setOutput('Hello, Python!'); // Set the output string
  };

  const handleCodeInputChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleCodeSubmit = () => {
    const expectedCode = 'print("Hello, World!")';
    if (userCode.trim() === expectedCode) {
      setCodeResult('Код верен!');
    } else {
      setCodeResult('Код неверен. Попробуйте еще раз.');
    }
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }
    return score;
  };

  return (
    <div className="python-quiz-container">
      <h2>Python: Основы программирования - Тест</h2>

      {!showResults ? (
        <div className="quiz-content">
          <p className="question">{questions[currentQuestion].question}</p>
          <ul className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={answers[currentQuestion] === index ? 'selected' : ''}
              >
                {option}
              </li>
            ))}
          </ul>
          {answers[currentQuestion] !== null ? (
            <button onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Показать результаты'}
            </button>
          ) : (
            <button disabled>Выберите ответ</button>
          )}
        </div>
      ) : (
        <div className="results-section">
          <h3>Результаты</h3>
          <p>Ваш результат: {calculateScore()} / {questions.length}</p>

          <div className="code-challenge">
            <h4>Напишите код для вывода строки "Hello, World!"</h4>
            <textarea
              className="code-input"
              value={userCode}
              onChange={handleCodeInputChange}
              placeholder=""
            />
            <button onClick={handleCodeSubmit}>Проверить код</button>
            {codeResult && <p className={`code-result ${codeResult === 'Код верен!' ? 'correct' : 'incorrect'}`}>{codeResult}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default PythonBasicsQuiz;