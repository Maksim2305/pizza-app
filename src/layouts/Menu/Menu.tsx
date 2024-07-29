import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';
import { RootState } from '@reduxjs/toolkit/query';
// import { RootState } from '@reduxjs/toolkit/query';

export function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const profile = useSelector((s: RootState) => s.user.profile);
    const items = useSelector((s: RootState) => s.cart.items);

    const logout = () => {
        dispatch(userActions.logout());
        navigate('/auth/login');
    };

    useEffect(() => {
        dispatch(getProfile());
    },[]);

    return (
        <div className={styles['wrapper']}>
            
             <div className={styles['menu']}>

                <img src="./avatar.png" alt="user-icon" />
                <div className={styles['menu-user-info']}>
                    <span className={styles['menu-user-info-title']}>{profile?.name}</span>
                    <span className={styles['menu-user-info-email']}>{profile?.email}</span>
                </div>
                <div className={styles['menu-item']}>
                    <img src="/menu.svg" alt="menu" />
                    <Link to="/">Меню</Link>
                </div>
                <div className={styles['menu-item']}>
                    <img src="/cart.svg" alt="cart" />
                    <Link to="/cart">Корзина</Link>
                </div>
                <div>
                    {items.length ? items.length : ''}
                </div>
                <div style={{'marginTop': 'auto'}}>
                    <Button appearence='small' onClick={logout}>
                        <span style={{display: 'flex', flexDirection: 'row', gap: '9px', alignItems: 'center'}}><img src="/exit.svg" alt="exit" />Выйти</span>
                    </Button>
                </div>
            </div>
            
            <div className={styles['layout']}>
                <Outlet/>
            </div>
        </div>
    );
}
