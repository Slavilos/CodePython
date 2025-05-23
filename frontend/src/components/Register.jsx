import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterPage.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, fullName, email, password }), // убираем confirmPassword
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        navigate("/login");
      } else {
        setError(data.error || data.message || "Ошибка регистрации");
      }
    } catch (err) {
      setError("Ошибка соединения с сервером");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h1>Регистрация</h1>
        <input
          type="text"
          placeholder="ФИО"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Зарегистрироваться</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Register;
