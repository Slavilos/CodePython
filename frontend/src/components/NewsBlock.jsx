import React, { useState, useEffect } from 'react';
import './NewsBlock.css';

const NewsBlock = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // В реальном приложении здесь будет запрос к API новостей
        // Демо-данные для примера
        const demoNews = [
          {
            id: 1,
            title: 'Python 3.12 - Что нового?',
            date: '2024-03-15',
            description: 'Обзор новых возможностей Python 3.12, включая улучшения производительности и новые синтаксические конструкции.'
          },
          {
            id: 2,
            title: 'Django 5.0 выпущен',
            date: '2024-03-10',
            description: 'Новая версия популярного веб-фреймворка с асинхронными возможностями и улучшенной производительностью.'
          },
          {
            id: 3,
            title: 'FastAPI становится все популярнее',
            date: '2024-03-05',
            description: 'FastAPI обгоняет Flask по количеству загрузок на PyPI.'
          }
        ];

        setNews(demoNews);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке новостей');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div className="news-loading">Загрузка новостей...</div>;
  }

  if (error) {
    return <div className="news-error">{error}</div>;
  }

  return (
    <div className="news-block">
      <h2>Последние новости Python</h2>
      <div className="news-list">
        {news.map(item => (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <div className="news-date">
              {new Date(item.date).toLocaleDateString('ru-RU')}
            </div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsBlock; 