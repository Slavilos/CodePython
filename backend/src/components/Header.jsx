import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="site-title">
                <img src="/images/Logo.png" alt="КодPython" />
                КодPython
            </Link>
            
            <nav className="nav-links">
                <Link to="/courses" className="nav-link">Курсы</Link>
                <Link to="/dictionary" className="nav-link">Справочники</Link>
                <Link to="/events" className="nav-link">События</Link>
                <Link to="/contacts" className="nav-link">Контакты</Link>
            </nav>

            <div className="user-actions">
                <button><img src="/images/poisk.png" alt="Search" className="tes" /></button>
                <button><img src="/images/profile.png" alt="Profile" className="profile-image" /></button>
            </div>
        </header>
    );
};

export default Header;