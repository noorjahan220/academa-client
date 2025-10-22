import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. If the auth state is still loading, show a loading indicator
    if (loading) {
        return <div className="text-center my-20"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    // 2. If the user is logged in, allow them to see the page
    if (user) {
        return children;
    }

    // 3. If the user is not logged in, redirect them to the login page
    // We pass the original location in state so we can redirect them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;