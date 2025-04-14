import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRole } from '../services/dataService';

const PrivateRoute = ({ role, children }) => {
  const currentRole = getRole();

  if (!currentRole) {
    return <Navigate to="/login" replace />;
  }

  if (role && currentRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
