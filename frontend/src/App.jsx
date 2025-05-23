import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import TitlePage from './components/TitlePage';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './components/AdminDashboard';
import Dictionary from './components/Dictionary';
import Events from './components/Events';
import Contact from './components/Contact';
import Profile from './components/Profile';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import './App.css';

// Компонент для защищенных маршрутов
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<TitlePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        <Route path="/dictionary" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
        <Route path="/reference" element={<ProtectedRoute><Dictionary /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </AuthProvider>
  );
};

export default App;
