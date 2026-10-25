import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Steps from '@/components/Steps';
import { NavLink } from '@/components/PageTransition';
import { IMG } from '@/data/site';

export const metadata: Metadata = { title: 'Story' };

const p17 = { color: 'var(--mute)', fontSize: 17, maxWidth: '46ch' } as const;

export default function StoryPage() {
  return (
    <>
      <div className="ph">
        <div className="w">
          <p className="eyebrow" style={{ marginBottom: 14 }}>Our story</p>
          <h1>Rooted in <em>heritage.</em></h1>
        </div>
      </div>

      <section style={{ paddingTop: 30 }}>
        <div className="w">
          <p className="statement">
            Every African Pride piece begins with one image: a mother at her mortar, grinding grain at dawn, her baby safe on her back. Heritage is not worn lightly — it is lived, passed down, and <em>honoured.</em>
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--soft)' }}>
        <div className="w split">
          <Reveal img className="art"><img src={IMG.collage} alt="The navy collar tee — front, back, collar and print detail" /></Reveal>
          <div>
            <Reveal as="h2" className="big" style={{ marginBottom: 20 }}>More than a graphic. A <em>legacy.</em></Reveal>
            <Reveal as="p" style={{ ...p17, marginBottom: 14 }}>
              The African Pride silhouette tells a story older than borders. A mother grinding grain with mortar and pestle — the daily rhythm of sustenance and survival. Her baby wrapped securely on her back, carried forward through every generation.
            </Reveal>
            <Reveal as="p" style={p17}>Every tee is a canvas for identity — minimal on the surface, monumental in meaning.</Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="w">
          <Steps items={[
            ['260 GSM', 'Heavyweight cotton with real structure and drape.'],
            ['Embroidered collar', 'AFRICAN PRIDE, stitched where you can feel it.'],
            ['Mother & child', 'The print at the hem that started it all.'],
          ]} />
        </div>
      </section>

      <section>
        <div className="w">
          <p className="eyebrow">Lookbook</p>
          <h2 className="big" style={{ margin: '16px 0 44px' }}>Worn with <em>pride.</em></h2>
          <div className="lb">
            <Reveal as="figure" img><img src={IMG.mb} alt="Man in the black collar tee" loading="lazy" /></Reveal>
            <Reveal as="figure" img delay={0.15}><img src={IMG.collage} alt="Navy collar tee details" loading="lazy" /></Reveal>
            <Reveal as="figure" img delay={0.3}><img src={IMG.hero} alt="Models in the navy collar tee" loading="lazy" /></Reveal>
          </div>
        </div>
      </section>

      <section className="dark">
        <div className="w">
          <p className="eyebrow" style={{ color: 'var(--gold)' }}>Her story continues</p>
          <Reveal as="h2" className="big">Collection II — <em>after.</em></Reveal>
          <NavLink className="btn btn--white" href="/shop">Shop the collection</NavLink>
        </div>
      </section>
    </>
  );
}
