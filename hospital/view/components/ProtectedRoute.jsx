import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../src/context/AuthContext.jsx';
import Loader from './Loader.jsx';

const DASH = { admin: '/admin/dashboard', doctor: '/doctor/dashboard', patient: '/patient/dashboard' };

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (role && user.role !== role) return <Navigate to={DASH[user.role] || '/login'} replace />;

  return children;
}
