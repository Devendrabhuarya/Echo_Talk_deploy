import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.css';
import { logOutUser } from '../../../apiCalls/User';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../redux/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
const Navigation = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center',
    };
    const dispatch = useDispatch();
    const navigate = useNavigate('/');
    const { user } = useSelector(state => state.auth);
    const onLogOut = async () => {
        try {
            const { data } = await logOutUser();
            dispatch(setAuth(data));
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }
    const logoText = {
        marginLeft: '10px',
    };

    return (

        user && <nav className={`${styles.navbar} container flex`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>Echo_Talk</span>
            </Link>
            <div className='ml-auto flex cursor-pointer'
                onClick={() => navigate(`/profile/${user._id}`)}
            >
                {user?.activated && <span className='mt-2 mr-3 capitalize'>{user?.name}</span>}
                {user?.activated && <img src={`/images/0efe72eeb53f95204350c184ffcd7d38`} alt="0efe72eeb53f95204350c184ffcd7d38"
                    className='w-10 h-10 rounded-full mr-4 '
                />}
                {user && <button
                    className=' mr-3'
                    onClick={onLogOut}
                ><LogoutIcon /></button>}
            </div>
        </nav>

    );
};

export default Navigation;
