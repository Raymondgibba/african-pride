'use client';

import { useEffect, useState } from 'react';
import { IMG } from '@/data/site';
import { NavLink } from './PageTransition';

const SLIDES = [IMG.hero, IMG.mb, IMG.man, IMG.woman];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [i]); // restarts the timer whenever a dot is clicked

  return (
    <section className="hero">
      <div className="hero__m" data-par="hero">
        {SLIDES.map((src, n) => (
          <img key={src} className={n === i ? 'on' : ''} src={src} alt="African Pride collection" />
        ))}
      </div>
      <div className="w">
        <h1>
          <span className="ln"><span>Wear your</span></span>
          <span className="ln"><span><em>heritage.</em></span></span>
        </h1>
        <p className="sub">Premium African streetwear. A mother, her baby, the continent — carried on a tee.</p>
        <div className="cta">
          <NavLink className="btn btn--white" href="/shop">Shop the collection</NavLink>
          <NavLink className="btn btn--ghost" href="/story">Our story</NavLink>
        </div>
        <div className="dots">
          {SLIDES.map((_, n) => (
            <button key={n} className={n === i ? 'on' : ''} aria-label={`Photo ${n + 1}`} onClick={() => setI(n)} />
          ))}
        </div>
      </div>
    </section>
  );
}
