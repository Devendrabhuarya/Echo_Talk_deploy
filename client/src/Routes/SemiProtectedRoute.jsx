import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const SemiProtectedRoute = ({ children }) => {

    const { user, isAuth } = useSelector(state => state.auth);

    console.log(user, isAuth);
    const navigate = useNavigate('/');

    useEffect(() => {
        if (!isAuth || !user)
            navigate('/');
        else if (isAuth && user?.activated)
            navigate('/rooms')

    }, [user]);
    return (
        <div>
            {children}
        </div>
    )
}

export default SemiProtectedRoute
