import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user: authUser } = useAuth();

  
  const ADMIN_COURSES_KEY = 'admin_courses';
  const [adminCourses, setAdminCourses] = useState([]);
  useEffect(() => {
    const saved = localStorage.getItem(ADMIN_COURSES_KEY);
    setAdminCourses(saved ? JSON.parse(saved) : []);
  }, []);
  const courses = [...adminCourses];

  const username = authUser?.username || 'guest';
  const getProgressKey = () => `completedLessons_${username}`;
  const [completedLessons, setCompletedLessons] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(getProgressKey());
    setCompletedLessons(saved ? JSON.parse(saved) : {});
  }, [username]);

  if (!authUser) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>Личный кабинет</h1>
        <div className="profile-content">
          <div className="profile-avatar">
            {authUser.avatar ? (
              <img src={authUser.avatar} alt={authUser.username} />
            ) : (
              <div className="avatar-placeholder">
                {authUser.username?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          
          <div className="profile-details">
            <div className="profile-item">
              <strong>Имя пользователя:</strong>
              <span>{authUser.username}</span>
            </div>
            <div className="profile-item">
              <strong>Email:</strong>
              <span>{authUser.email}</span>
            </div>
            {authUser.createdAt && (
              <div className="profile-item">
                <strong>Дата регистрации:</strong>
                <span>{new Date(authUser.createdAt).toLocaleDateString()}</span>
              </div>
            )}
            {authUser.fullName && (
              <div className="profile-item">
                <strong>Полное имя:</strong>
                <span>{authUser.fullName}</span>
              </div>
            )}
          </div>
        </div>

        {/* --- Шкалы прогресса по курсам --- */}
        <div className="profile-progress-section">
          <div className="profile-courses-progress">
            {courses.map(course => {
              const completedCount = (completedLessons[course.id] || []).length;
              const totalCount = course.blocks.reduce((acc, block) => acc + block.lessons.length, 0);
              return (
                <div key={course.id} className="profile-course-progress">
                  <div className="profile-course-title">{course.title}</div>
                  <div className="profile-progress-bar">
                    <div
                      className="profile-progress-fill"
                      style={{ width: `${(completedCount / totalCount) * 100}%` }}
                    />
                  </div>
                  <span className="profile-progress-text">
                    {completedCount} / {totalCount} уроков завершено
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        {/* --- конец шкал --- */}

        <div className="profile-actions">
          <button onClick={() => navigate('/courses')} className="action-button">
            Мои курсы
          </button>
          {authUser.role === 'admin' && (
            <button 
              onClick={() => navigate('/admin')} 
              className="action-button admin"
            >
              Админ панель
            </button>
          )}
          <button onClick={handleLogout} className="action-button logout">
            Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 