import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx;
import SearchModal from './components/SearchModal.jsx;
import Home from './pages/Home.jsx;
import Login from './pages/Login.jsx;
import Dashboard from './pages/Dashboard.jsx;
import AdminLogin from './pages/AdminLogin.jsx;
import AdminPanel from './pages/AdminPanel.jsx;
import Contacts from './pages/Contacts.jsx;
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <Router>
      <Header openSearch={() => setIsSearchOpen(true)} />
      {isSearchOpen && <SearchModal closeSearch={() => setIsSearchOpen(false)} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
