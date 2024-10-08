import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';
import { cartActions } from '../../store/cart.slice';

export function Layout() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((s: RootState) => s.user.profile);
  const items = useSelector((s: RootState) => s.cart.items);

  const logout = () => {
    dispatch(userActions.logout());
    dispatch(cartActions.clear());
    navigate('/auth/login');
  };

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['menu']}>
        <img src="/pizza-app/avatar.png" alt="user-icon" />
        <div className={styles['menu-user-info']}>
          <span className={styles['menu-user-info-title']}>
            {profile?.name}
          </span>
          <span className={styles['menu-user-info-email']}>
            {profile?.email}
          </span>
        </div>
        <div className={styles['menu-item']}>
          <img src="/pizza-app/menu.svg" alt="menu" />
          <Link to="/">Меню</Link>
        </div>
        <div className={styles['menu-item']}>
          <img src="/pizza-app/cart.svg" alt="cart" />
          <Link to="/cart">
            Корзина 
          </Link>
          <span className={styles['menu-item-count']}>{items.length ? items.length : ''}</span>
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Button appearence="small" onClick={logout}>
            <span
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '9px',
                alignItems: 'center'
              }}
            >
              <img src="/pizza-app/exit.svg" alt="exit" />
              Выйти
            </span>
          </Button>
        </div>
      </div>

      <div className={styles['layout']}>
        <Outlet />
      </div>
    </div>
  );
}
