import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './RegisterPage.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // для логина
  const [password, setPassword] = useState(""); // для пароля
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Проверка на наличие токена в localStorage при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/courses"); // Если токен найден, сразу перенаправляем на курсы
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }), // передаем username и password
      });

      
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // Сохраняем весь объект пользователя
        localStorage.setItem("token", data.token); // Сохраняем токен отдельно
        onLogin(); // вызываем onLogin, чтобы поменять состояние
        navigate("/courses"); // переходим на страницу с курсами
      } else {
        setError(data.error || data.message || "Неверный логин или пароль"); // если ошибка
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Вход</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // правильно обновляем username
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // правильно обновляем password
            required
          />
          <button type="submit" className="auth-button">
            Войти
          </button>
        </form>
        {error && <div className="error">{error}</div>} {/* Отображаем ошибку */}
        <div className="link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
