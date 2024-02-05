import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestRoute = ({ children }) => {
    const { user,isAuth } = useSelector(state => state.auth);
    const navigate = useNavigate('/');
    useEffect(() => {
          if(!user) {
            localStorage.clear('token');
            navigate('/');
        }
        if (isAuth) {
            navigate('/rooms');
        }
    }, [isAuth]);

    return (
        <div>
            {children}
        </div>
    )
}

export default GuestRoute
