import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { PRODUCTS, firstAvailable, getColor, getProduct } from '@/data/products';

type Props = { params: { id: string }; searchParams: { color?: string } };

export const generateStaticParams = () => PRODUCTS.map((p) => ({ id: p.id }));
export const generateMetadata = ({ params }: Props): Metadata => ({ title: getProduct(params.id)?.name ?? 'Not found' });

export default function ProductPage({ params, searchParams }: Props) {
  const product = getProduct(params.id);
  if (!product) notFound();
  const color = searchParams.color && getColor(product, searchParams.color) ? searchParams.color : firstAvailable(product);
  // key remounts the page when you jump to another colour via a card link
  return <ProductDetail key={`${product.id}-${color}`} product={product} initialColor={color} />;
}
