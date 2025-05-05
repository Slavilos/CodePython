import React, { useState } from 'react';
import './InteractiveCodeBlock.css';

const InteractiveCodeBlock = ({ initialCode, testCases, onComplete }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async () => {
    try {
      setIsLoading(true);
      setOutput('');
      
      // Локальное выполнение кода для демонстрации
      // В реальном приложении здесь будет запрос к API
      setTimeout(() => {
        try {
          // Безопасное выполнение кода в try-catch блоке
          const result = evaluateCode(code);
          setOutput(result);

          // Проверка тестов
          const results = testCases.map(testCase => {
            const testResult = evaluateTest(code, testCase);
            return {
              ...testCase,
              passed: testResult.success,
              output: testResult.output
            };
          });

          setTestResults(results);
          const allPassed = results.every(result => result.passed);
          setIsCorrect(allPassed);

          if (allPassed && onComplete) {
            onComplete();
          }
        } catch (error) {
          setOutput(`Ошибка выполнения: ${error.message}`);
        } finally {
          setIsLoading(false);
        }
      }, 500);

    } catch (error) {
      setOutput(`Ошибка: ${error.message}`);
      setIsLoading(false);
    }
  };

  // Функция для безопасного выполнения кода
  const evaluateCode = (codeToEval) => {
    // Здесь должна быть реализация безопасного выполнения кода
    // В демо-версии просто возвращаем текст
    return `Результат выполнения:\n${codeToEval}`;
  };

  // Функция для проверки тестов
  const evaluateTest = (codeToEval, testCase) => {
    try {
      // Здесь должна быть реализация проверки тестов
      // В демо-версии всегда возвращаем успех
      return {
        success: true,
        output: testCase.expectedOutput
      };
    } catch (error) {
      return {
        success: false,
        output: error.message
      };
    }
  };

  return (
    <div className="interactive-code-block">
      <div className="code-editor">
        <div className="editor-header">
          <span className="language">Python</span>
          <button 
            onClick={executeCode} 
            className="run-button"
            disabled={isLoading}
          >
            {isLoading ? 'Выполнение...' : 'Запустить код'}
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="code-input"
          spellCheck="false"
          disabled={isLoading}
        />
      </div>

      <div className="output-section">
        <div className="output-header">
          <h3>Результат</h3>
          {isCorrect && <span className="success-badge">Все тесты пройдены!</span>}
        </div>
        {isLoading ? (
          <div className="loading">Выполнение кода...</div>
        ) : (
          <pre className="output-display">{output}</pre>
        )}
      </div>
    </div>
  );
};

export default InteractiveCodeBlock; 