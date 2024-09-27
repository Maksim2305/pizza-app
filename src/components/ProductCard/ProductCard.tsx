import { Link } from 'react-router-dom';
import styles from '../ProductCard/ProductCard.module.css';
import cn from 'classnames';
import { ProductCardProps } from '../ProductCard/ProductCard.props';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { cartActions } from '../../store/cart.slice';
import { MouseEvent } from 'react';

function ProductCard(props: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((s: RootState) => s.cart.items);
  const addToCart = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.add(props.id));
  };

  return (
    <Link to={'/product/' + props.id} className={styles['link']}>
      <div className={cn(styles['product-card'])}>
        <div className={cn(styles['product-card-top'])}>
          <img src={props.image} alt="" className={cn(styles['image'])} />
          <div className={cn(styles['price'])}>
            {props.price} <span>₽</span>
          </div>
          <button
            className={cn(styles['cart'])}
            onClick={addToCart}
            style={{
              background: items.some((it) => it.id === props.id)
                ? '#FE724C'
                : '#ccc'
            }}
          >
            <img src="/pizza-app/cart-icon.svg" alt="add-to-cart" />
          </button>
          <div className={cn(styles['rating'])}>
            <span>{props.rating}</span>
            <img src="/pizza-app/rating-star.svg" alt="rating-star" />
          </div>
        </div>
        <div className={cn(styles['product-card-bottom'])}>
          <div className={cn(styles['title'])}>{props.title}</div>
          <div className={cn(styles['description'])}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
