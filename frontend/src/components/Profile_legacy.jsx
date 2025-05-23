import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.token) {
      setError('Нет токена авторизации');
      return;
    }
    fetch('/api/auth/profile', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error('Ошибка загрузки профиля');
        return res.json();
      })
      .then(data => setUserData(data))
      .catch(err => setError(err.message));
  }, [user]);

  if (error) return <div className="home-gradient-bg"><div className="home-container"><h2>Ошибка</h2><p>{error}</p></div></div>;
  if (!userData) return <div className="home-gradient-bg"><div className="home-container">Загрузка...</div></div>;

  return (
    <div className="home-gradient-bg">
      <div className="home-container" style={{maxWidth: 600}}>
        <h1 className="main-title">Личный кабинет</h1>
        <div style={{display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center'}}>
          <img src="/images/profile.png" alt="Profile" style={{width: 120, height: 120, borderRadius: '50%', background: '#23272f', boxShadow: '0 4px 24px rgba(0,0,0,0.18)', border: '3px solid #00ff9d'}} />
          <div style={{color: '#fff', fontSize: '1.1rem'}}>
          <p><strong>ФИО:</strong> {userData.fullName}</p>
          <p><strong>Имя пользователя:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Роль:</strong> {userData.role || 'user'}</p>
          <p><strong>Дата регистрации:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
