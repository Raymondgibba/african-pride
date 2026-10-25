export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type Method = 'pickup' | 'delivery';

export interface ProductColor {
  key: string;
  label: string;
  hex: string;
  image: string;
  soldOut?: boolean;
}

export interface Product {
  id: string;
  name: string;
  type: string;
  cat: 'tee' | 'tank';
  price: number;
  about: string;
  worn: string[];
  colors: ProductColor[];
}

export interface CartItem {
  id: string;
  color: string;
  size: Size;
  qty: number;
}
