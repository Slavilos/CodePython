import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

function Login() {
  const navigate = useNavigate();
  const { login, setAdminSession } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [adminForm, setAdminForm] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminChange = (e) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await login(formData.username, formData.password);
      toast.success('Успешная авторизация');
      if (userData.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(adminForm.username, adminForm.password);
      setAdminSession();
      toast.success('Вход в админ-панель выполнен');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Ошибка при входе');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Вход в систему</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Имя пользователя"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
        <button
          className="admin-login-btn"
          onClick={() => setShowAdmin((prev) => !prev)}
          style={{ marginTop: '1rem', background: '#2ecc71', color: 'white', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer' }}
        >
          {showAdmin ? 'Скрыть вход для администратора' : 'Вход для администратора'}
        </button>
        {showAdmin && (
          <form onSubmit={handleAdminSubmit} className="admin-login-form" style={{ marginTop: '1.5rem', background: '#f8fff8', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(46,204,113,0.08)' }}>
            <h3 style={{ color: '#27ae60', marginBottom: '1rem' }}>Вход для администратора</h3>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Логин администратора"
                value={adminForm.username}
                onChange={handleAdminChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Пароль администратора"
                value={adminForm.password}
                onChange={handleAdminChange}
                required
              />
            </div>
            <button type="submit" disabled={loading} style={{ background: '#27ae60', color: 'white' }}>
              {loading ? 'Вход...' : 'Войти как админ'}
            </button>
          </form>
        )}
        <p className="auth-link">
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
