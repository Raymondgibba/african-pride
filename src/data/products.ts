import type { Product, ProductColor } from '@/types';
import { IMG } from './site';

/* Add soldOut: true to a colour to show SOLD OUT. Add more products to this array. */
export const PRODUCTS: Product[] = [
  {
    id: 'collar-tee',
    name: 'Heritage Collar Tee',
    type: 'Crew neck',
    cat: 'tee',
    price: 2200,
    worn: [IMG.mb, IMG.collage],
    about:
      'Heavyweight cotton crew neck with the AFRICAN PRIDE collar wordmark and the mother-and-child print at the hem.',
    colors: [
      { key: 'navy', label: 'Navy', hex: '#1b2a4a', image: IMG.cn },
      { key: 'black', label: 'Black', hex: '#111111', image: IMG.cb },
      { key: 'white', label: 'White', hex: '#ffffff', image: IMG.cw },
    ],
  },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getColor = (p: Product, key: string): ProductColor | undefined =>
  p.colors.find((c) => c.key === key);
export const firstAvailable = (p: Product) => (p.colors.find((c) => !c.soldOut) ?? p.colors[0]).key;
