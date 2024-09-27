import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PREFIX } from '../../helpers/API';
import { ProductCart } from '../../interfaces/ProductCart.interfaces';
import cn from 'classnames';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { cartActions } from '../../store/cart.slice';
import { useNavigate } from 'react-router-dom';

export function Cart() {
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);
  const [productCart, setProductCart] = useState<ProductCart[]>([]);
  const [countProducts, setCountProducts] = useState<Record<number, number>>(
    {}
  );
  const [total, setTotal] = useState<number>(0);
  const totalDelivery = 169;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const getItem = async (id: number): Promise<ProductCart> => {
    const { data } = await axios.get(`${PREFIX}/products/${id}`);
    return data;
  };

  const loadProducts = async (): Promise<void> => {
    const data = await Promise.all(items.map((it) => getItem(it.id)));

    const newCountProducts: Record<number, number> = {};
    data.forEach((item) => {
      newCountProducts[item.id] = 1;
    });

    setProductCart(data);
    setCountProducts(newCountProducts);
  };

  useEffect(() => {
    loadProducts();
  }, [items]);

  useEffect(() => {
    const computedTotal = productCart.reduce((acc, item) => {
      acc += item.price * countProducts[item.id];
      return acc;
    }, 0);
    setTotal(computedTotal);
  }, [countProducts]);

  const addCount = (productId: number) => {
    const newCount = countProducts[productId] + 1;
    setCountProducts({ ...countProducts, [productId]: newCount });
  };

  const removeCount = (productId: number) => {
    const newCount = countProducts[productId] - 1;
    if (newCount <= 0) {
      dispatch(cartActions.remove(productId));
    } else {
      setCountProducts({ ...countProducts, [productId]: newCount });
    }
  };

  const removeFormCart = (productId: number) => {
    dispatch(cartActions.remove(productId));
  };

  const checkout = async () => {
    await axios.post(
      `${PREFIX}/order`,{ products: items },
      { headers: { Authorization: `Bearer ${jwt}` } }
    );
    dispatch(cartActions.setOrderPlaced(true));
    navigate('/success');
    dispatch(cartActions.clear());
  };

  return (
    <>
      <div className={cn(styles['cart-items-container'])}>
        <Header>Корзина</Header>
        {productCart.length ? (
          <div className={cn(styles['cart-items-wrapper'])}>
            {productCart.map((item) => {
              const product = items.find((it) => it.id === item.id);
              if (!product) return;
              return (
                <div key={item.id} className={cn(styles['cart-item'])}>
                  <div className={cn(styles['cart-item-image'])}>
                    <img src={item.image} alt={item.name} />
                    <div className={cn(styles['cart-item-info'])}>
                      <div>
                        <strong>{item.name}</strong>
                      </div>
                      <div className={cn(styles['cart-item-info-price'])}>
                        {item.price} P
                      </div>
                    </div>
                  </div>

                  <div className={cn(styles['cart-item-actions'])}>
                    <Button
                      appearence="icon"
                      transparent
                      onClick={() => removeCount(item.id)}
                    >
                      -
                    </Button>
                    <div className={cn(styles['cart-item-count'])}>
                      {countProducts[item.id]}
                    </div>
                    <Button appearence="icon" onClick={() => addCount(item.id)}>
                      +
                    </Button>
                    <Button
                      appearence="default"
                      onClick={() => removeFormCart(item.id)}
                      style={{ marginLeft: '5px' }}
                    >
                      x
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className={cn(styles['cart-items-promo'])}>
              <input type="text" placeholder="Промокод" />
              <Button appearence="big">Применить</Button>
            </div>
            <div className={cn(styles['cart-items-order-info'])}>
              <div className={cn(styles['cart-items-order-info-row'])}>
                <div>Итог</div>
                <div>{total} P</div>
              </div>
              <div className={cn(styles['cart-items-order-info-row'])}>
                <div>Доставка</div>
                <div>{totalDelivery} P</div>
              </div>
              <div className={cn(styles['cart-items-order-info-row'])}>
                <div>Итог ({items.length})</div>
                <div>{total + totalDelivery} P</div>
              </div>
            </div>
            <div className={cn(styles['cart-items-order-create'])}>
              <Button type="button" appearence="big" onClick={checkout}>
                ОФОРМИТЬ
              </Button>
            </div>
          </div>
        ) : (
          <div>Корзина пуста</div>
        )}
      </div>
    </>
  );
}
export default Cart;
