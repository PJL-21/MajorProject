import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <>Loading...</>

  return (
    <Route
      {...rest}
      render={(props) =>
        !loading ? (
          isAuthenticated() ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        ) : null
      }
    />
  );
};

export default PrivateRoute;