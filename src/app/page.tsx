import Hero from '@/components/Hero';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import ProductGrid from '@/components/ProductGrid';
import { NavLink } from '@/components/PageTransition';
import { PRODUCTS } from '@/data/products';
import { IMG } from '@/data/site';

export default function Home() {
  const colourways = PRODUCTS.reduce((n, p) => n + p.colors.length, 0);
  return (
    <>
      <Hero />

      <section>
        <div className="w">
          <p className="eyebrow" style={{ marginBottom: 22 }}>The idea</p>
          <p className="statement">We don’t simply wear African culture. We carry it forward — one mother, one morning, one story <em>at a time.</em></p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="w">
          <div className="sh">
            <div><Reveal as="h2" className="big">The <em>collection</em></Reveal></div>
            <NavLink className="btn btn--line" href="/shop">View all</NavLink>
          </div>
          <ProductGrid products={PRODUCTS} />
        </div>
      </section>

      <section style={{ background: 'var(--soft)' }}>
        <div className="w split">
          <Reveal img className="art" data-par="art">
            <img src={IMG.collage} alt="The navy collar tee — front, back, collar and print detail" />
          </Reveal>
          <div>
            <Reveal as="p" className="eyebrow">The design</Reveal>
            <Reveal as="h2" className="big" style={{ margin: '14px 0 20px' }}>More than a graphic. A <em>legacy.</em></Reveal>
            <Reveal as="p" style={{ color: 'var(--mute)', maxWidth: '44ch', fontSize: 17 }}>
              A mother at her mortar, grinding grain at dawn. Her baby safe on her back. Her headscarf flowing into the outline of Africa itself.
            </Reveal>
            <Reveal className="facts">
              <div><Counter to={260} /><span>GSM heavyweight cotton</span></div>
              <div><Counter to={colourways} /><span>colourways</span></div>
              <div><b>S–XXL</b><span>sizes</span></div>
            </Reveal>
            <Reveal as={NavLink} className="btn btn--dark" href="/story" style={{ marginTop: 34 }}>Read our story</Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <p className="eyebrow">Worn with pride</p>
          <Reveal as="h2" className="big" style={{ margin: '16px 0 44px' }}>On the people who <em>carry it.</em></Reveal>
          <div className="lb">
            <Reveal as="figure" img><img data-par="lb" src={IMG.mb} alt="Man in the black African Pride collar tee" loading="lazy" /></Reveal>
            <Reveal as="figure" img delay={0.15}><img data-par="lb" src={IMG.collage} alt="The navy collar tee — front, back, collar and print" loading="lazy" /></Reveal>
            <Reveal as="figure" img delay={0.3}><img data-par="lb" src={IMG.woman} alt="Woman in the navy collar tee" loading="lazy" /></Reveal>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="w">
          <Reveal as="h2" className="big">Carry it <em>forward.</em></Reveal>
          <NavLink className="btn btn--white" href="/shop">Start shopping</NavLink>
        </div>
      </section>
    </>
  );
}
