import type { Product } from '@/types';
import ProductCard from './ProductCard';

/** One card per colour of every product. */
export default function ProductGrid({ products }: { products: Product[] }) {
  const items = products.flatMap((p) => p.colors.map((c) => ({ p, key: c.key })));
  return (
    <div className="grid">
      {items.length ? (
        items.map(({ p, key }, i) => <ProductCard key={`${p.id}-${key}`} product={p} colorKey={key} index={i} />)
      ) : (
        <p className="empty" style={{ gridColumn: '1/-1' }}>Nothing found.</p>
      )}
    </div>
  );
}
