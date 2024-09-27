import ProductCard from '../../../components/ProductCard/ProductCard';
import { ProductCart } from '../../../interfaces/ProductCart.interfaces';
import { IMenuList } from './MenuList.props';

function MenuList({ products }: IMenuList) {
  return products?.map((p: ProductCart) => (
    <ProductCard
      key={p.id}
      id={p.id}
      title={p.name}
      price={p.price}
      description={p.ingredients.join(', ')}
      image={p.image}
      rating={p.rating}
    />
  ));
}
export default MenuList;
