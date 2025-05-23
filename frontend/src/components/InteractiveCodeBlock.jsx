import React, { useState } from 'react';
import './InteractiveCodeBlock.css';

const InteractiveCodeBlock = ({ initialCode, testCases }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async () => {
    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/code/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении кода');
      }

      const data = await response.json();
      const resultOutput = data.output?.trim() || '';
      setOutput(resultOutput);
      if (data.error) setOutput(prev => prev + (prev ? '\n' : '') + 'Ошибка: ' + data.error);

      console.log('Received testCases:', testCases); // Отладочный вывод
      const results = Array.isArray(testCases) ? testCases.map(test => {
        const passed = resultOutput === test.expectedOutput.trim();
        return {
          ...test,
          passed,
          output: resultOutput
        };
      }) : [];

      console.log('Updated testResults:', results); // Отладочный вывод
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      setIsCorrect(allPassed);
    } catch (error) {
      setOutput(`Ошибка: ${error.message}`);
      setIsCorrect(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="interactive-code-block">
      <div className="code-editor">
        <div className="editor-header">
          <span className="language">Python</span>
          <button onClick={executeCode} disabled={isLoading} className="run-button">
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
          {!isCorrect && <span className="warning-badge">Результат не засчитан</span>}
          {isCorrect && <span className="success-badge">Все тесты пройдены!</span>}
        </div>
        <pre className="output-display">{output}</pre>
      </div>
    </div>
  );
};

// ✅ ЭТО ГЛАВНОЕ: default-экспорт
export default InteractiveCodeBlock;
