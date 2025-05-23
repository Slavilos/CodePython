
import React from 'react';
import TestsSection from '../components/TestsSection';
import testData from '../components/TestData';

const TestsPage = () => {
  // Берём вопросы из первого блока для отображения
  const questions = testData[0].questions;

  return (
    <div className="tests-page">
      <h2>{testData[0].title}</h2>
      <p>{testData[0].description}</p>
      <TestsSection tests={questions} />
    </div>
  );
};

export default TestsPage;
