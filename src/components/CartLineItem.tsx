'use client';

import { money } from '@/lib/format';
import { useStore, type CartLine } from '@/context/StoreContext';

export default function CartLineItem({ line, showTotal = false }: { line: CartLine; showTotal?: boolean }) {
  const { changeQty } = useStore();
  return (
    <div className="li">
      <img src={line.image} alt="" />
      <div>
        <b>{line.name}</b>
        <span className="sub">
          {line.label} · Size {line.size}
          {!showTotal && ` · ${money(line.price)}`}
        </span>
        <div className="q">
          <button onClick={() => changeQty(line.index, -1)} aria-label="Less">−</button>
          <span>{line.qty}</span>
          <button onClick={() => changeQty(line.index, 1)} aria-label="More">+</button>
        </div>
      </div>
      {showTotal && <b>{money(line.price * line.qty)}</b>}
    </div>
  );
}
