
import styles from './Cart.module.css';
export function Cart() {
    return (
        <div className={styles['menu-item']}>
            <img src="./cart.svg" alt="menu" />
            <div>
            Корзина
          </div>
        </div>
      );
}
export default Cart;
