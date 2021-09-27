import React from 'react';
import { Link } from 'react-router-dom';

const removeAuth = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('username');
  console.log('auth token removed from local storage');
  window.location.reload();
}

const Logout = ({ children, ...rest }) => {
  return <Link to='/login' onClick={removeAuth} {...rest}>Logout</Link>;
}

export default Logout;
