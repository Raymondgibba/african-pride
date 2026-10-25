import type { Metadata } from 'next';
import ShopView from '@/components/ShopView';

export const metadata: Metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <>
      <div className="ph">
        <div className="w">
          <h1>The <em>collection</em></h1>
          <p>Heavyweight cotton, made to be worn with pride.</p>
        </div>
      </div>
      <section style={{ paddingTop: 30 }}>
        <div className="w"><ShopView /></div>
      </section>
    </>
  );
}
