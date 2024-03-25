import { Link, Outlet } from 'react-router-dom';
import styles from './Menu.module.css';
import Button from '../../components/Button/Button';

export function Layout() {
    return (
        <div className={styles['wrapper']}>
            
             <div className={styles['menu']}>

                <img src="./avatar.png" alt="user-icon" />
                <div className={styles['menu-user-info']}>
                    <span className={styles['menu-user-info-title']}>loerm lorem</span>
                    <span className={styles['menu-user-info-email']}>email@mail.ru</span>
                </div>
                <div className={styles['menu-item']}>
                    <img src="/menu.svg" alt="menu" />
                    <Link to="/">Меню</Link>
                </div>
                <div className={styles['menu-item']}>
                    <img src="/cart.svg" alt="cart" />
                    <Link to="/cart">Корзина</Link>
                </div>
                <div style={{'marginTop': 'auto'}}>
                    <Button appearence='small'>
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
