import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute component to protect certain routes
const ProtectedRoutes = () => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    // console.log('Token:', token); // Log the token for debugging
    // console.log('ProtectedRoutes rendered');
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
