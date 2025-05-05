import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user || !user.token) return;
    fetch('http://localhost:5000/api/profile', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => res.json())
      .then(data => setUserData(data));
  }, [user]);

  if (!userData) return <div>Загрузка...</div>;

  return (
    <div className="profile-page">
      <h2>Личный кабинет</h2>
      <div className="profile-card">
        <img src="/images/profile.png" alt="Profile" className="profile-avatar" />
        <div className="profile-info">
          <p><strong>ФИО:</strong> {userData.fullName}</p>
          <p><strong>Имя пользователя:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Роль:</strong> {userData.role || 'user'}</p>
          <p><strong>Дата регистрации:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
