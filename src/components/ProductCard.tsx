'use client';

import { useState } from 'react';
import type { Product, Size } from '@/types';
import { SIZES } from '@/data/site';
import { getColor } from '@/data/products';
import { money } from '@/lib/format';
import { useStore } from '@/context/StoreContext';
import { NavLink, useGo } from './PageTransition';
import Reveal from './Reveal';

export default function ProductCard({ product, colorKey, index = 0 }: { product: Product; colorKey: string; index?: number }) {
  const c = getColor(product, colorKey)!;
  const [size, setSize] = useState<Size>('M');
  const { addItem, notify } = useStore();
  const go = useGo();
  const url = `/product/${product.id}?color=${colorKey}`;
  const d = (index % 3) * 0.12;

  const act = (buy: boolean) => {
    addItem(product.id, colorKey, size, 1);
    if (buy) go('/checkout');
    else notify(`Added — ${c.label} · ${size}`, true);
  };

  return (
    <Reveal as="article" className="card" delay={d}>
      <Reveal as={NavLink} img className="card__img" delay={d} href={url}>
        {c.soldOut && <span className="sold">Sold out</span>}
        <img src={c.image} alt={`${product.name} ${c.label}`} loading="lazy" />
      </Reveal>
      <div className="card__bd">
        <div>
          <h3><NavLink href={url}>{product.name}</NavLink></h3>
          <p className="sub">{c.label} · {product.type}</p>
        </div>
        <span className="price">{money(product.price)}</span>
      </div>
      <div className="sz">
        {SIZES.map((s) => (
          <button key={s} className={s === size ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>
        ))}
      </div>
      <div className="acts">
        <button className="btn btn--dark" disabled={c.soldOut} onClick={() => act(true)}>Buy now</button>
        <button className="btn btn--line" disabled={c.soldOut} onClick={() => act(false)}>Add to cart</button>
      </div>
    </Reveal>
  );
}
