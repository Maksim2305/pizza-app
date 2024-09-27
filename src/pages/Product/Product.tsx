import { Await, Link, useLoaderData } from 'react-router-dom';
import { ProductCart } from '../../interfaces/ProductCart.interfaces';
import { Suspense } from 'react';
import Header from '../../components/Header/Header';
import styles from './Product.module.css';
import Button from '../../components/Button/Button';
import { cartActions } from '../../store/cart.slice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

function Product() {
  const data = useLoaderData() as { data: ProductCart };
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCart = (productId: number) => {
    dispatch(cartActions.add(productId));
  };
  return (
    <>
      <Suspense fallback={'Загружаем...'}>
        <Await resolve={data.data}>
          {({ data }: { data: ProductCart }) => (
            <div className={styles['product-container']}>
              <div className={styles['product-upper-container']}>
                <Link to={'/'} className={styles['product-upper-button-back']}>
                  <img
                    className={styles['arrow']}
                    src="/pizza-app/back-arrow.svg"
                    alt="back"
                  />
                </Link>
                <Header style={{ marginLeft: '36px' }}>{data.name}</Header>
                <Button
                  className={styles['product-upper-card-button']}
                  onClick={() => addToCart(data.id)}
                >
                  {cartItems?.some((item) => item.id === data.id)
                    ? 'Убрать из корзины'
                    : 'В корзину'}
                </Button>
              </div>

              <div className={styles['product-info']}>
                <img
                  className={styles['product-info-picture']}
                  src={data.image}
                  alt={data.name}
                />
                <div className={styles['product-info-description']}>
                  <div className={styles['product-info-description-price']}>
                    <span>Цена</span>
                    <span>
                      {data.price} <span>₽</span>
                    </span>
                  </div>
                  <div className={styles['product-info-description-rating']}>
                    <span>Рейтинг</span>

                    <div className={styles['product-info-rating']}>
                      <div>
                        <span>{data.rating}</span>
                        <img
                          style={{ marginLeft: '4px' }}
                          src="/pizza-app/rating-star.svg"
                          alt="rating-star"
                        />
                      </div>
                    </div>
                    <div className={styles['product-info-description-supply']}>
                      <p>Состав:</p>
                      <ul
                        className={
                          styles['product-info-description-supply-list']
                        }
                      >
                        {data.ingredients.map((ingredient) => {
                          return <li key={ingredient}>{ingredient}</li>;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </>
  );
}
export default Product;
