'use client';

import { money } from '@/lib/format';
import { useStore } from '@/context/StoreContext';
import CartLineItem from './CartLineItem';
import { NavLink } from './PageTransition';

export default function CartDrawer() {
  const { lines, subtotal, closeDrawer } = useStore();
  const has = lines.length > 0;
  return (
    <>
      <div id="ov" onClick={closeDrawer} />
      <aside id="cart" aria-label="Your cart">
        <div className="hd">
          <h4>Your cart</h4>
          <button className="x" onClick={closeDrawer} aria-label="Close cart">×</button>
        </div>
        <div className="items">
          {has ? lines.map((l) => <CartLineItem key={`${l.id}-${l.color}-${l.size}`} line={l} />) : <p className="empty">Your cart is empty.</p>}
        </div>
        <div className="row2 t"><span>Subtotal</span><span>{money(subtotal)}</span></div>
        <NavLink
          className="btn btn--dark"
          href="/checkout"
          onClick={closeDrawer}
          style={{ opacity: has ? 1 : 0.4, pointerEvents: has ? 'auto' : 'none' }}
        >
          Checkout
        </NavLink>
      </aside>
    </>
  );
}
