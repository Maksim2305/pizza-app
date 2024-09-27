import { FC } from 'react';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';
import { useNavigate, Navigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

export const Success: FC = () => {
  const navigate = useNavigate();
  const isOrderPlaced = useSelector(
    (state: RootState) => state.cart.isOrderPlaced
  );

  if (!isOrderPlaced) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <div className={styles['success-container']}>
      <img src="/pizza-app/pizza.png" alt="pizza" />
      <p>Ваш заказ успешно оформлен!</p>
      <Button appearence="big" onClick={() => navigate('/')}>
        Сделать новый
      </Button>
    </div>
  );
};
