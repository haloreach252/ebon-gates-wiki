import React from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useSelector(state => state.auth);

    if (loading) return <p className="text-center">Loading...</p>

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;