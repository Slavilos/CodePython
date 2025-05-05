import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AdminLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (login === 'admin' && password === 'password') {
      navigate('/admin-panel');
      toast.success('Добро пожаловать, админ!');
    } else {
      toast.error('Неверные данные');
    }
  }

  return (
    <div>
      <h2>Вход для администратора</h2>
      <form onSubmit={handleLogin}>
        <input value={login} onChange={e => setLogin(e.target.value)} placeholder="Логин" required /><br/>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" required /><br/>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}

export default AdminLogin;
