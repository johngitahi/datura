import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import WLoader from './Loader/Loader';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
        isLoading ? (
          <div><WLoader/></div> // Show loading spinner or message
        ) : isAuthenticated ? (
          <Outlet />
        ) : (
          <Navigate to="/login" />
        )
  );
};

export default ProtectedRoute;
