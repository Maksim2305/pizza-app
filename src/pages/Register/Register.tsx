import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Register.module.css';
import cn from 'classnames';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { register, userActions } from '../../store/user.slice';
import { LoginForm } from '../Login/Login';

export type RegisterForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    },
    name: {
        value: string;
    }
}

function Register () {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jwt, registerErrorMessage } =  useSelector((s: RootState) => s.user);

    useEffect(() => {
        if(jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(userActions.clearRegisterError());
        const target = event.target as typeof event.target & LoginForm;
        const { email, password, name } = target;
        dispatch(register({email: email.value, password: password.value, name: name.value}));
    };


    
    return <>
    <div>
        <h2 className={styles['login-title']}>Регистрация</h2>
        { registerErrorMessage && <div className={styles['error-message']}>{registerErrorMessage}</div>}
        <form onSubmit={submit}>
            <div className={cn(styles['login-input'],styles['margin-bottom'])}>
                <label htmlFor="login" className={styles['label-input']}>email</label>
                <input type="text" name='email' placeholder='введите email' className={styles['input']}/>
            </div>
            <div className={cn(styles['login-input'],styles['margin-bottom'])}>
                <label htmlFor="login" className={styles['label-input']}>имя</label>
                <input type="text" name='name' placeholder='введите имя' className={styles['input']}/>
            </div>
            <div style={{marginBottom: '74px'}}>
                <label htmlFor="password" className={styles['label-input']}>пароль</label>
                <input type="password" name='password' placeholder='введите пароль' className={styles['input']}/>
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center'}} className={styles['margin-bottom']}>
                <Button appearence='big'>Регистрация</Button>
            </div>
            <div className={styles['login-info']}>
                <div>Есть аккаунт?</div>
                <Link to={'/auth/login'} className={styles['register-btn']}>Войти</Link>
            </div>
        </form>
    </div>
    </>;
}

export default Register;