// PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const AdminPrivateRoute = () => {
  const { user, token } = useAuth();
return user && token && user?.username === 'Admin' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminPrivateRoute;