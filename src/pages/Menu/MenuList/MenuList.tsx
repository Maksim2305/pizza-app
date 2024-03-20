import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuList } from './MenuList.props';

function MenuList({products}: MenuList){
    return products?.map((p) => (
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