import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const UserRoute = () => {
  const { auth } = useContext(AuthContext);
  
  if (!auth.token) {
    // If not logged in, send to login
    return React.createElement(Navigate, { to: "/login" });
  }
  
  if (auth.user.role !== 'user') {
    // If logged in but NOT a user (i.e., admin), send to home
    return React.createElement(Navigate, { to: "/" });
  }

  // If logged in AND a user, show the page
  return React.createElement(Outlet);
};

export default UserRoute;