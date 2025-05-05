import React from 'react';
import './TitlePage.css';

const TitlePage = ({ onLogin }) => {
  return (
    <div className="title-page">
      <div className="title-content">
        <img src="/images/Logo.png" alt="КодPython" className="animated-logo" />
        <h1>КодPython</h1>
        <div className="description">
          <p>Веб-платформа для изучения языка программирования Python с использованием интерактивных тестов</p>
          <p>Нажмите на кнопку войти чтобы зайти на сайт</p>
        </div>
        <button onClick={onLogin} className="login-button">
          Войти
        </button>
        <div className="developer-info">
          <p>Разработчик: студент группы 2-ИС Чунарёв Святослав Игоревич</p>
          <p>специальность 09.02.07: Информационные системы и программирование</p>
          <p>ГБПОУ «Пермский краевой колледж «Оникс»</p>
        </div>
      </div>
    </div>
  );
};

export default TitlePage;