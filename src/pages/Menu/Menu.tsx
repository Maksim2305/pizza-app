import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import cn from 'classnames';
import styles from '../Menu/Menu.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interfaces';
import axios, { AxiosError } from 'axios';
import MenuList from './MenuList/MenuList';

export function Menu() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>('');
  const [search, setSearch] = useState<string>('');
  let timer: number = 0;

  useEffect(() => {
    getData(search);
  }, [search]);

  const getData = async (name?: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
        params: { name }
      });
      setProducts(data);
    } catch (err) {
      console.log(err);
      if(err instanceof AxiosError){
        setError(err.message);
      }
    }
    setLoading(false);
  };

  const onChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(e.target.value);
    }, 250);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={cn(styles['menu'])}>
      <div className={cn(styles['menu-search'])}>
        <Header>Меню</Header>
        <Input onChange={onChangeFilter} placeholder="Введите блюдо или состав"></Input>
      </div>
      <div className={cn(styles['menu-items'])}>
        {error && <div>{error}</div>}
        {!isLoading && products && <MenuList products={products} />}
        {!isLoading && !products.length && ('ничего не найдено :(')}
        {isLoading && <div>Загружаем...</div>}
      </div>
    </div>
  );
}
export default Menu;
