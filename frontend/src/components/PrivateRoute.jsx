import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

const PrivateRoute = () => {
  const { userInfo, loading } = useAuth();

  if (loading) {
    return <Loader />; 
  }

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;