import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-gradient-bg">
      <div className="home-container">
        <h1 className="main-title">Почему Python актуален?</h1>
        <div className="python-blocks">
          <div className="python-card">
            <h2>Востребованность</h2>
            <p>Python — один из самых популярных языков программирования в мире. Его используют в Google, Яндексе, NASA, Facebook и тысячах других компаний.</p>
          </div>
          <div className="python-card">
            <h2>Универсальность</h2>
            <p>Python применяется в веб-разработке, анализе данных, искусственном интеллекте, автоматизации, науке и образовании. Это язык для всех!</p>
          </div>
          <div className="python-card">
            <h2>Лёгкость и сообщество</h2>
            <p>Python прост для изучения и имеет огромное дружелюбное сообщество. Тысячи бесплатных библиотек и ресурсов доступны каждому.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
