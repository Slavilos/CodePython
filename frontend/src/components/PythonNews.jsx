import React, { useState, useEffect } from 'react';
import './PythonNews.css';

const PythonNews = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Python 3.12: Новые возможности и улучшения',
      content: 'Выпущена новая версия Python 3.12, которая включает улучшенную производительность, новые функции и оптимизации. Основные изменения включают улучшенную обработку ошибок, новые возможности для типизации и оптимизированный сборщик мусора.',
      date: '2024-02-15'
    },
    {
      id: 2,
      title: 'Искусственный интеллект на Python: Новые библиотеки',
      content: 'Появились новые библиотеки для работы с ИИ на Python, включая улучшенные версии TensorFlow и PyTorch. Также выпущены новые инструменты для обработки естественного языка и компьютерного зрения.',
      date: '2024-02-10'
    },
    {
      id: 3,
      title: 'Python в образовании: Новые курсы и ресурсы',
      content: 'Запущены новые образовательные программы по Python, включая интерактивные курсы, практические задания и проекты. Особое внимание уделяется обучению школьников и студентов.',
      date: '2024-02-05'
    }
  ]);

  return (
    <div className="python-news">
      <h2>Новости Python</h2>
      <div className="news-grid">
        {news.map(item => (
          <div key={item.id} className="news-card">
            <div className="news-date">{new Date(item.date).toLocaleDateString('ru-RU')}</div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PythonNews; 