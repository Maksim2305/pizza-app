import { Await, Link, useLoaderData } from 'react-router-dom';
import { ProductCart } from '../../interfaces/ProductCart.interfaces';
import { Suspense } from 'react';
import Header from '../../components/Header/Header';
import styles from './Product.module.css';
import Button from '../../components/Button/Button';

function Product() {
  const data = useLoaderData() as { data: ProductCart };
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
                    src="/back-arrow.svg"
                    alt="back"
                  />
                </Link>
                <Header style={{ marginLeft: '36px' }}>{data.name}</Header>
                <Button className={styles['product-upper-card-button']}>
                  В корзину
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
                          src="/rating-star.svg"
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
