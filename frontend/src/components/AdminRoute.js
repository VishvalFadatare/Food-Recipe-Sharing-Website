import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { auth } = useContext(AuthContext);
  
  if (!auth.token) {
    return React.createElement(Navigate, { to: "/login" });
  }
  
  if (auth.user.role !== 'admin') {
    return React.createElement(Navigate, { to: "/" });
  }

  return React.createElement(Outlet);
};

export default AdminRoute;