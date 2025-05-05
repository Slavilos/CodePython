import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import NewsBlock from './NewsBlock';
import NewArticlesBlock from './NewArticlesBlock';
import './HomePage.css';

const HomePage = () => {
    const [pythonNews, setPythonNews] = useState([]);
    const [latestArticles, setLatestArticles] = useState([]);

    const [news] = useState([
        {
            id: 1,
            title: 'Релиз Python 3.12',
            description: 'Новая версия Python с улучшенной производительностью и новыми возможностями.',
            date: '14 февраля 2024'
        },
        {
            id: 2,
            title: 'Django 5.0 выпущен',
            description: 'Популярный веб-фреймворк получил важные обновления и улучшения безопасности.',
            date: '12 февраля 2024'
        },
        {
            id: 3,
            title: 'PyTorch 2.2 доступен для загрузки',
            description: 'Новая версия фреймворка для машинного обучения с улучшенной поддержкой GPU.',
            date: '10 февраля 2024'
        }
    ]);

    const [articles] = useState([
        {
            id: 1,
            title: 'Введение в Python для начинающих',
            description: 'Базовые концепции языка Python и его преимущества для новичков.'
        },
        {
            id: 2,
            title: 'Работа с базами данных в Python',
            description: 'Обзор популярных библиотек для работы с различными базами данных.'
        },
        {
            id: 3,
            title: 'Асинхронное программирование',
            description: 'Глубокое погружение в asyncio и его применение в реальных проектах.'
        }
    ]);

    useEffect(() => {
        // Получение новостей Python из API новостей
        const fetchPythonNews = async () => {
            try {
                const response = await fetch('https://newsapi.org/v2/everything?q=python+programming&language=ru&sortBy=publishedAt&apiKey=YOUR_API_KEY');
                const data = await response.json();
                setPythonNews(data.articles.slice(0, 5));
            } catch (error) {
                console.error('Ошибка при получении новостей Python:', error);
            }
        };

        // Получение последних статей с бэкенда
        const fetchLatestArticles = async () => {
            try {
                const response = await fetch('/api/articles/latest');
                const data = await response.json();
                setLatestArticles(data.slice(0, 3));
            } catch (error) {
                console.error('Ошибка при получении последних статей:', error);
            }
        };

        fetchPythonNews();
        fetchLatestArticles();
    }, []);

    const popularCourses = [
        { id: 13, title: 'Оптимизация Python кода', description: 'Продвинутые методы', image: '/images/course13.jpg' },
        { id: 14, title: 'Разработка REST API на Python', description: 'Использование Django REST Framework', image: '/images/course14.jpg' },
        { id: 15, title: 'Параллельное программирование на Python', description: 'Использование asyncio', image: '/images/course15.jpg' },
        { id: 16, title: 'Безопасность веб-приложений на Python', description: 'Предотвращение уязвимостей', image: '/images/course16.jpg' },
        { id: 17, title: 'Разработка GUI приложений на Python', description: 'Использование Tkinter', image: '/images/course17.jpg' },
        { id: 18, title: 'Автоматизация тестирования на Python', description: 'Использование pytest', image: '/images/course18.jpg' },
    ];

    return (
        <div className="home-page">
            <section className="hero-section">
                <img src="/images/Logo.png" alt="КодPython" />
                <h1>Добро пожаловать на платформу обучения Python</h1>
                <p>Ваш путь к освоению Python начинается здесь</p>
                <Link to="/courses" className="start-button">Начать обучение</Link>
            </section>

            <section className="news-section">
                <h2>Последние новости Python</h2>
                <div className="news-grid">
                    {news.map(item => (
                        <div key={item.id} className="news-card">
                            <span className="news-date">{item.date}</span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="articles-section">
                <h2>Последние статьи</h2>
                <div className="articles-grid">
                    {articles.map(article => (
                        <div key={article.id} className="article-card">
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;