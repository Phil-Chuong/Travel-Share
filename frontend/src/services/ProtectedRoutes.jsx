import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to protect certain routes
const ProtectedRoutes = ({ children }) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    console.log('Token:', token); // Log the token for debugging
    console.log('ProtectedRoutes rendered');

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" />;
    }

    // If token exists, render the protected component
    return children;
    // return <div>Protected Content</div>;
};

export default ProtectedRoutes;
