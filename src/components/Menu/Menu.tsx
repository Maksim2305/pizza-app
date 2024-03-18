import Header from '../Header/Header';
import Input from '../Input/Input';
import cn from 'classnames';
import styles from '../Menu/Menu.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/Product.interfaces';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');

  const getData = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`);
      setProducts(data);
    } catch (err) {
      console.log(err);
      if(err instanceof AxiosError){
        setError(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={cn(styles['menu'])}>
      <div className={cn(styles['menu-search'])}>
        <Header>Меню</Header>
        <Input placeholder="Введите блюдо или состав"></Input>
      </div>
      <div className={cn(styles['menu-items'])}>
        {error && <div>{error}</div>}
        {!isLoading && <MenuList products={products} />}
        {isLoading && <div>Загружаем...</div>}
      </div>
    </div>
  );
}
export default Menu;
