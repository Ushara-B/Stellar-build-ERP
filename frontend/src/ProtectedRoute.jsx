import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if user is logged in by looking for user data in localStorage
  const isAuthenticated = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.id && user.email && user.role;
    } catch (error) {
      return false;
    }
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;