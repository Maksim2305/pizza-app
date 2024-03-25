import { Outlet } from 'react-router-dom';
import styles from './Auth.module.css';

function Auth(){
    return <>
        <div className={styles['auth-container']}>
            <div className={styles['auth-container-img']}>
                <img src="/Group.svg" alt="auth-picture" />
            </div>
            <div className={styles['auth-container-outlet']}>
                <Outlet/>
            </div>
        </div>
    </>;
}
export default Auth;