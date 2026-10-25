'use client';

import { useState } from 'react';
import type { Product, Size } from '@/types';
import { SIZES } from '@/data/site';
import { PRODUCTS, getColor } from '@/data/products';
import { cx, money } from '@/lib/format';
import { useStore } from '@/context/StoreContext';
import { useGo } from './PageTransition';
import ProductGrid from './ProductGrid';

export default function ProductDetail({ product: p, initialColor }: { product: Product; initialColor: string }) {
  const [colorKey, setColorKey] = useState(initialColor);
  const [size, setSize] = useState<Size>('M');
  const [qty, setQty] = useState(1);
  const [worn, setWorn] = useState(-1); // -1 = showing the product shot
  const { addItem, notify } = useStore();
  const go = useGo();
  const c = getColor(p, colorKey)!;
  const others = PRODUCTS.filter((x) => x.id !== p.id);

  const act = (buy: boolean) => {
    addItem(p.id, colorKey, size, qty);
    if (buy) go('/checkout');
    else notify('Added to cart', true);
  };

  return (
    <>
      <section className="page" style={{ paddingBottom: 40 }}>
        <div className="w">
          <div className="pd">
            <div>
              <div className="pd__main">
                {c.soldOut && <span className="sold">Sold out</span>}
                {worn >= 0 ? (
                  <img key={`w${worn}`} className="cv" src={p.worn[worn]} alt={`${p.name} worn`} />
                ) : (
                  <img key={c.key} src={c.image} alt={`${p.name} ${c.label}`} />
                )}
              </div>
              {(p.colors.length > 1 || p.worn.length > 0) && (
                <div className="thumbs">
                  {p.colors.map((k) => (
                    <button key={k.key} className={worn < 0 && k.key === colorKey ? 'on' : ''} aria-label={k.label} onClick={() => { setColorKey(k.key); setWorn(-1); }}>
                      <img src={k.image} alt="" />
                    </button>
                  ))}
                  {p.worn.map((w, i) => (
                    <button key={w} className={worn === i ? 'on' : ''} aria-label={`Worn photo ${i + 1}`} onClick={() => setWorn(i)}>
                      <img src={w} alt="" style={{ objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pd__info">
              <p className="eyebrow">{p.type}</p>
              <h1 style={{ marginTop: 10 }}>{p.name}</h1>
              <span className="price">{money(p.price)}</span>
              <p style={{ color: 'var(--mute)' }}>{p.about}</p>

              <p className="lbl">Colour — {c.label}</p>
              <div className="dots2">
                {p.colors.map((k) => (
                  <button key={k.key} className={cx(k.key === colorKey && 'on', k.soldOut && 'out')} aria-label={k.label} style={{ background: k.hex }} onClick={() => { setColorKey(k.key); setWorn(-1); }} />
                ))}
              </div>

              <p className="lbl">Size</p>
              <div className="sz">
                {SIZES.map((s) => <button key={s} className={s === size ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
              </div>

              <p className="lbl">Quantity</p>
              <div className="qty">
                <button aria-label="Less" onClick={() => setQty((n) => Math.max(1, n - 1))}>−</button>
                <span>{qty}</span>
                <button aria-label="More" onClick={() => setQty((n) => Math.min(10, n + 1))}>+</button>
              </div>

              <div className="acts">
                <button className="btn btn--dark" disabled={c.soldOut} onClick={() => act(true)}>Buy now</button>
                <button className="btn btn--line" disabled={c.soldOut} onClick={() => act(false)}>Add to cart</button>
              </div>

              <div style={{ marginTop: 30, borderTop: '1px solid var(--line)' }}>
                <details open><summary>Details</summary><p>{p.cat === 'tee' ? 'Heavyweight 260 GSM cotton. ' : ''}Sizes S to XXL.</p></details>
                <details><summary>How ordering works</summary><p>Add to cart, then check out. Your order opens in WhatsApp as a ready message and we confirm it with you.</p></details>
                <details><summary>Pickup &amp; delivery</summary><p>Collect your order or have it delivered. We confirm the details with you on WhatsApp.</p></details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section style={{ paddingTop: 40 }}>
          <div className="w">
            <h2 className="big" style={{ fontSize: 'clamp(2rem,6vw,3.4rem)', marginBottom: 30 }}>You may also <em>like</em></h2>
            <ProductGrid products={others} />
          </div>
        </section>
      )}
    </>
  );
}
