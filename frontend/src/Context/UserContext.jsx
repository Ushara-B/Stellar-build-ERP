import React, { createContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check for user data in localStorage on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Add isAuthenticated function
  const isAuthenticated = () => {
    return !!user; // Returns true if user exists, false otherwise
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loginUser, 
      logoutUser,
      isAuthenticated 
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);
  
  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};