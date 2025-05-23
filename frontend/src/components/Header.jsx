import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user } = useAuth();

  const isPanel = useMemo(() => {
    return user && user.username === 'admin';
  }, [user]);

  return (
    <header className="header">
      <Link to="/Home" className="site-title">
        <img src="/images/Logo.png" alt="КодPython" />
        КодPython
      </Link>
      
      <nav className="nav-links">
        <Link to="/courses" className="nav-link">Курсы</Link>
        <Link to="/dictionary" className="nav-link">Справочники</Link>
        <Link to="/events" className="nav-link">События</Link>
        <Link to="/contact" className="nav-link">Контакты</Link>
        {isPanel && (
          <Link to="/admin" className="nav-link">Панель</Link>
        )}
      </nav>

      <div className="user-actions">
        {user ? (
          <Link to="/profile">
            <img src="/images/profile.png" alt="Profile" className="profile-image" />
          </Link>
        ) : (
          <Link to="/login">
            <img src="/images/profile.png" alt="Profile" className="profile-image" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
