'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { cx } from '@/lib/format';
import ProductGrid from './ProductGrid';

const CATS = [['all', 'All'], ['tee', 'Tees'], ['tank', 'Tanks']] as const;

export default function ShopView() {
  const [cat, setCat] = useState<string>('all');
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) => (cat === 'all' || p.cat === cat) && (!q || `${p.name} ${p.type}`.toLowerCase().includes(q)),
  );

  return (
    <>
      {/* filters only appear once the shop has more than 2 products */}
      {PRODUCTS.length > 2 && (
        <div className="bar2">
          <div className="chips">
            {CATS.map(([k, label]) => (
              <button key={k} className={cx('chip', cat === k && 'on')} onClick={() => setCat(k)}>{label}</button>
            ))}
          </div>
          <input className="search" placeholder="Search" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}
      <ProductGrid products={list} />
    </>
  );
}
