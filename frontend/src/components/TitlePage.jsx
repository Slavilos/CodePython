import React from 'react';
import { useNavigate } from 'react-router-dom'; // Должно быть добавлено!
import './TitlePage.css';

const TitlePage = () => {
  const navigate = useNavigate(); // используем useNavigate

  return (
    <div className="title-page">
      <div className="title-content">
        <img src="/images/Logo.png" alt="КодPython" className="animated-logo" />
        <h1>КодPython</h1>
        <div className="description">
          <p>Веб-платформа для изучения языка программирования Python с использованием интерактивных тестов</p>
          <p>Нажмите на кнопку "Войти" чтобы зайти на сайт</p>
        </div>
        <button onClick={() => navigate('/Home')} className="login-button">
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
