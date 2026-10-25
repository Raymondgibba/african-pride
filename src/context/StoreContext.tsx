'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { CartItem, Size } from '@/types';
import { getColor, getProduct } from '@/data/products';

export interface CartLine extends CartItem {
  index: number;
  name: string;
  label: string;
  image: string;
  price: number;
}

interface Store {
  lines: CartLine[];
  count: number;
  subtotal: number;
  drawerOpen: boolean;
  toast: { text: string; view: boolean } | null;
  addItem: (id: string, color: string, size: Size, qty: number) => void;
  changeQty: (index: number, delta: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  notify: (text: string, view?: boolean) => void;
  dismissToast: () => void;
}

const Ctx = createContext<Store | null>(null);
const KEY = 'ap_cart';
const valid = (i: CartItem) => {
  const p = getProduct(i.id);
  return !!p && !!getColor(p, i.color);
};

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<Store['toast']>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCart((JSON.parse(raw) as CartItem[]).filter(valid));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(cart));
    } catch {}
  }, [cart, loaded]);

  useEffect(() => {
    document.body.classList.toggle('co2', drawerOpen);
    document.body.classList.toggle('lock', drawerOpen);
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const lines = useMemo(
    () =>
      cart.flatMap((it, index): CartLine[] => {
        const p = getProduct(it.id);
        const c = p && getColor(p, it.color);
        return p && c ? [{ ...it, index, name: p.name, label: c.label, image: c.image, price: p.price }] : [];
      }),
    [cart],
  );

  const addItem = useCallback((id: string, color: string, size: Size, qty: number) => {
    setCart((c) => {
      const f = c.find((i) => i.id === id && i.color === color && i.size === size);
      return f
        ? c.map((i) => (i === f ? { ...i, qty: Math.min(10, i.qty + qty) } : i))
        : [...c, { id, color, size, qty }];
    });
  }, []);

  const changeQty = useCallback((index: number, delta: number) => {
    setCart((c) =>
      c.flatMap((i, n) => {
        if (n !== index) return [i];
        const qty = Math.min(10, i.qty + delta);
        return qty < 1 ? [] : [{ ...i, qty }];
      }),
    );
  }, []);

  const notify = useCallback((text: string, view = false) => {
    setToast({ text, view });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const value: Store = {
    lines,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal: lines.reduce((s, l) => s + l.price * l.qty, 0),
    drawerOpen,
    toast,
    addItem,
    changeQty,
    clearCart: () => setCart([]),
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    notify,
    dismissToast: () => setToast(null),
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside <StoreProvider>');
  return s;
}
