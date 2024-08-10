import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';
import cn from 'classnames';
import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';

export type LoginForm = {
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

function Login () {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jwt, loginErrorMessage } =  useSelector((s: RootState) => s.user);

    useEffect(() => {
        if(jwt) {
            navigate('/');
        }
    }, [jwt, navigate]);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        dispatch(userActions.clearLoginError());
        const target = event.target as typeof event.target & LoginForm;
        const { email, password } = target;
        submitHandler(email.value, password.value);
    };
    const submitHandler = async(email: string, password: string) => {
        dispatch(login({email, password}));
    };

    
    return <>
    <div>
        <h2 className={styles['login-title']}>Вход</h2>
        { loginErrorMessage && <div className={styles['error-message']}>{loginErrorMessage}</div>}
        <form onSubmit={submit}>
            <div className={cn(styles['login-input'],styles['margin-bottom'])}>
                <label htmlFor="login" className={styles['label-input']}>Ваш email</label>
                <input type="text" name='email' placeholder='email' className={styles['input']}/>
            </div>
            <div style={{marginBottom: '74px'}}>
                <label htmlFor="password" className={styles['label-input']}>Ваш пароль</label>
                <input type="password" name='password' placeholder='пароль' className={styles['input']}/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}} className={styles['margin-bottom']}>
                <Button appearence='big'>ВХОД</Button>
            </div>
            <div className={styles['login-info']}>
                <div>Нет аккаунта?</div>
                <Link to={'/auth/register'} className={styles['register-btn']}>Зарегестрироваться</Link>
            </div>
        </form>
    </div>
    </>;
}

export default Login;