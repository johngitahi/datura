import React from 'react';
import LoginButton from '../components/LoginButton';
import { useAuth0 } from '@auth0/auth0-react';
import WLoader from '../components/Loader/Loader';
import Admin from './Admin';

const LoginPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <WLoader />;
  }

  return !isAuthenticated ? (
    <div className="login-page-container">
      <h2>Please Log In</h2>
      <LoginButton />
    </div>
  ) : (
    <Admin />
  );
};

export default LoginPage;
