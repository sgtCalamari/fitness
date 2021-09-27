import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const authentication = JSON.parse(localStorage.getItem('auth')) ??
{
  success: false,
  token: null
};

const PrivateRoute = ({ children, ...rest }) => {
  return <Route {...rest} render={() => {
    return authentication.success
      ? children
      : <Redirect to='/login' />
  }}/>;
}

export default PrivateRoute;
