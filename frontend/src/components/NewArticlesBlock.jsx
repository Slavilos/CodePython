import React, { useState, useEffect } from 'react';
import './NewArticlesBlock.css';

const NewArticlesBlock = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // В реальном приложении здесь будет запрос к API статей
        // Демо-данные для примера
        const demoArticles = [
          {
            id: 1,
            title: 'Введение в Python для начинающих',
            date: '2024-03-15',
            description: 'Базовые концепции Python, установка и настройка окружения, первая программа.',
            tags: ['Python', 'Начинающим']
          },
          {
            id: 2,
            title: 'Работа с базами данных в Python',
            date: '2024-03-12',
            description: 'Изучаем SQLAlchemy и основные принципы работы с базами данных.',
            tags: ['Python', 'Базы данных', 'SQLAlchemy']
          },
          {
            id: 3,
            title: 'Асинхронное программирование',
            date: '2024-03-08',
            description: 'Глубокое погружение в asyncio и асинхронное программирование в Python.',
            tags: ['Python', 'Asyncio', 'Продвинутый уровень']
          }
        ];

        setArticles(demoArticles);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке статей');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div className="articles-loading">Загрузка статей...</div>;
  }

  if (error) {
    return <div className="articles-error">{error}</div>;
  }

  return (
    <div className="articles-block">
      <h2>Последние статьи</h2>
      <div className="articles-list">
        {articles.map(article => (
          <div key={article.id} className="article-item">
            <h3>{article.title}</h3>
            <div className="article-date">
              {new Date(article.date).toLocaleDateString('ru-RU')}
            </div>
            <p>{article.description}</p>
            <div className="article-tags">
              {article.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArticlesBlock; 