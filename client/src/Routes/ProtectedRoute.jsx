import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const { user, isAuth } = useSelector(state => state.auth);
    const navigate = useNavigate('/');

    useEffect(() => {
        if (!isAuth) {
            navigate('/');
        } else if (isAuth && !user?.activated) {
            navigate('/active');
        } else if (isAuth && user?.activated)
            navigate('/rooms')
    }, []);


    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectedRoute
