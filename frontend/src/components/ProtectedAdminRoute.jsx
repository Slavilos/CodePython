import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { isAdminSession } = useAuth();

  if (!isAdminSession) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute; 