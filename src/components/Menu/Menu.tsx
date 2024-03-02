
import styles from '../Menu/Menu.module.css';
export function Menu() {
  return (
    <div className={styles['menu-item']}>
        <img src="/menu.svg" alt="menu" />
        <div>
        Меню
      </div>
    </div>
  );
}
export default Menu;
