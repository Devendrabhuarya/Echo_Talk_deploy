import React from 'react';
import styles from './Home.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const navigate = useNavigate('/');
    function startRegister() {
        navigate('/authenticate');
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Echo_Talk!" icon="logo">
                <p className={styles.text}>
                    We’re working hard to get Codershouse ready for everyone!
                    While we wrap up the finishing youches, we’re adding people
                    gradually to make sure nothing breaks
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's go ! " />
                </div>
               
            </Card>
        </div>
    );
};

export default Home;
