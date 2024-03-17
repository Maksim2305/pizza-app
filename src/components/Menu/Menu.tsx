
import Header from '../Header/Header';
import Input from '../Input/Input';
import cn from 'classnames';
import styles from '../Menu/Menu.module.css';
import ProductCard from '../ProductCard/ProductCard';

export function Menu() {
  return (
    <div className={cn(styles['menu'])}>
      <div className={cn(styles['menu-search'])}>
        <Header>Меню</Header>
        <Input placeholder='Введите блюдо или состав'></Input>
       
      </div>
      <div className={cn(styles['menu-items'])}>
          <ProductCard 
            id={1}
            title='Наслаждение'
            price={100}
            description='"салями",
            "руккола",
            "помидоры",
            "оливки"'
            image='https://cdn-bucket.hb.ru-msk.vkcs.cloud/purple-images/demo/food/food1.png'
            rating={4.7}
          />
         
        </div>
    </div>
  );
}
export default Menu;
