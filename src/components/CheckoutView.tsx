'use client';

import { useState } from 'react';
import type { Method } from '@/types';
import { SETTINGS } from '@/data/site';
import { money, waLink } from '@/lib/format';
import { useStore } from '@/context/StoreContext';
import CartLineItem from './CartLineItem';
import { NavLink } from './PageTransition';

const FREE_PAY = SETTINGS.payments[0];

export default function CheckoutView() {
  const { lines, subtotal, clearCart } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addr, setAddr] = useState('');
  const [note, setNote] = useState('');
  const [pay, setPay] = useState(FREE_PAY);
  const [method, setMethod] = useState<Method>('pickup');
  const [error, setError] = useState('');
  const [sent, setSent] = useState<{ url: string; payNote: string } | null>(null);

  const fee = method === 'delivery' ? SETTINGS.deliveryFee : 0;
  const total = subtotal + fee;
  const payNote = pay === FREE_PAY ? '' : `We will send you the ${pay} payment details on WhatsApp.`;

  const place = () => {
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (phone.replace(/\D/g, '').length < 7) return setError('Please enter a valid phone number.');
    if (method === 'delivery' && addr.trim().length < 4) return setError('Please enter your delivery address.');
    setError('');

    const ref = `AP-${Date.now().toString(36).slice(-5).toUpperCase()}`;
    const items = lines.map((l) => `${l.qty} x ${l.name} - ${l.label}, size ${l.size} (${money(l.price * l.qty)})`);
    const msg =
      `Hello African Pride, I would like to order:\n${items.join('\n')}\n\n` +
      `Total: ${money(total)}${fee ? ` (includes delivery ${money(fee)})` : ''}\n` +
      `${method === 'pickup' ? 'Pickup' : `Delivery to: ${addr.trim()}`}\nPayment: ${pay}\nOrder ref: ${ref}\n` +
      `Name: ${name.trim()}\nPhone: ${phone.trim()}${note.trim() ? `\nNote: ${note.trim()}` : ''}`;

    const url = waLink(msg);
    window.open(url, '_blank');
    setSent({ url, payNote });
    clearCart();
    scrollTo(0, 0);
  };

  if (sent)
    return (
      <section className="page">
        <div className="w">
          <div className="done">
            <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><path d="M30 52l14 14 27-30" /></svg>
            <p className="eyebrow">Almost done</p>
            <h1>Press send in WhatsApp</h1>
            <p>Your order message is ready. Once you send it, we confirm everything with you. {sent.payNote}</p>
            <div className="cta">
              <a className="btn btn--dark" href={sent.url} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a>
              <NavLink className="btn btn--line" href="/shop">Continue shopping</NavLink>
            </div>
          </div>
        </div>
      </section>
    );

  if (!lines.length)
    return (
      <section className="page">
        <div className="w">
          <div className="done">
            <h1>Your cart is empty</h1>
            <p>Add something you love first.</p>
            <div className="cta"><NavLink className="btn btn--dark" href="/shop">Shop the collection</NavLink></div>
          </div>
        </div>
      </section>
    );

  return (
    <>
      <div className="ph" style={{ paddingBottom: 20 }}>
        <div className="w"><h1 style={{ fontSize: 'clamp(2.6rem,10vw,6rem)' }}>Check<em>out</em></h1></div>
      </div>
      <section style={{ paddingTop: 30 }}>
        <div className="w co">
          <div>
            <label className="fld">Full name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={80} /></label>
            <label className="fld">Phone number<input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 7001234" maxLength={20} /></label>
            <div className="seg">
              {(['pickup', 'delivery'] as const).map((m) => (
                <button key={m} type="button" className={method === m ? 'on' : ''} onClick={() => setMethod(m)}>{m === 'pickup' ? 'Pickup' : 'Delivery'}</button>
              ))}
            </div>
            <p className="hint">
              {method === 'pickup' ? (SETTINGS.pickupAddress ? `Pickup at: ${SETTINGS.pickupAddress}` : 'We will tell you when and where to collect.') : ''}
            </p>
            {method === 'delivery' && (
              <label className="fld">Delivery address<textarea value={addr} onChange={(e) => setAddr(e.target.value)} rows={2} maxLength={200} /></label>
            )}
            <label className="fld">Payment
              <select value={pay} onChange={(e) => setPay(e.target.value)}>
                {SETTINGS.payments.map((x) => <option key={x}>{x}</option>)}
              </select>
            </label>
            <p className="hint">{pay === FREE_PAY ? '' : `We send you the ${pay} payment details on WhatsApp when we confirm your order.`}</p>
            <label className="fld">Note (optional)<input value={note} onChange={(e) => setNote(e.target.value)} maxLength={300} /></label>
          </div>

          <div className="sum">
            <h3>Order summary</h3>
            {lines.map((l) => <CartLineItem key={`${l.id}-${l.color}-${l.size}`} line={l} showTotal />)}
            {fee > 0 && <div className="row2"><span>Delivery</span><span>{money(fee)}</span></div>}
            <div className="row2 t"><span>Total</span><span>{money(total)}</span></div>
            <p className="err" role="alert">{error}</p>
            <button className="btn btn--dark" style={{ width: '100%' }} onClick={place}>Send order on WhatsApp</button>
          </div>
        </div>
      </section>
    </>
  );
}
