import { Link } from 'react-router-dom';
import styles from '../ProductCard/ProductCard.module.css';
import cn from 'classnames';
import {ProductCardProps} from '../ProductCard/ProductCard.props';

function ProductCard(props: ProductCardProps) {
  return (
    <Link to={'/product/'+props.id} className={styles['link']}>
      <div className={cn(styles['product-card'])}>
        <div className={cn(styles['product-card-top'])}>
          <img
            src={props.image}
            alt=""
            className={cn(styles['image'])}
          />
          <div className={cn(styles['price'])}>{props.price} <span>₽</span></div>
          <div className={cn(styles['cart'])}>
            <img src="/cart-icon.svg" alt="add-to-cart" />
          </div>
          <div className={cn(styles['rating'])}>
            <span>{props.rating}</span>
            <img src="/rating-star.svg" alt="rating-star" />
          </div>
        </div>
        <div className={cn(styles['product-card-bottom'])}>
          <div className={cn(styles['title'])}>{props.title}</div>
          <div className={cn(styles['description'])}>
           {props.description}
          </div>
        </div>
      </div>
    </Link>
  );
}
export default ProductCard;
