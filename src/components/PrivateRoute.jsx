import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('jwtToken');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return children;
};

export default PrivateRoute;