import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const clientToken = Cookies.get('clientToken');
  const clientData = Cookies.get('clientData');

  if (!clientToken || !clientData) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/client/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 