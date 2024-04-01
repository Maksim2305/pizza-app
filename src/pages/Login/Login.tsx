import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import styles from './Login.module.css';
import cn from 'classnames';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../helpers/API';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { userActiion, userActions } from '../../store/user.slice';

export type LoginForm = {
    email: {
        value: string;
    },
    password: {
        value: string;
    }
}

function Login () {
    const [error, setError] = useState<string | null>();

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const submit = (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        const target = event.target as typeof event.target & LoginForm;
        const { email, password } = target;
        submitHandler(email.value, password.value);
    };
    const submitHandler = async(email: string, password: string) => {
        try{
            const { data } = await axios.post(`${PREFIX}/auth/login`, {
                email,
                password
            });
            dispatch(userActions.addJwt(data.access_token));
            navigate('/');
        } catch(err){
            if(err instanceof AxiosError){
                setError(err.response?.data.message);
            }
        }
    };

    
    return <>
    <div>
        <h2 className={styles['login-title']}>Вход</h2>
        { error && <div className={styles['error-message']}>{error}</div>}
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