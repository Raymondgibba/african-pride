'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/** Scroll progress bar, header state, hero/art parallax. Pure DOM, no React state, so it never re-renders. */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const home = pathname === '/';
    let ticking = false;

    const tick = () => {
      const vh = innerHeight;
      const y = scrollY;
      const hero = document.querySelector<HTMLElement>('[data-par=hero]');
      if (hero && y < vh * 1.2) hero.style.transform = `translateY(${y * 0.28}px)`;

      document.querySelectorAll<HTMLElement>('[data-par=art] img,[data-par=lb]').forEach((img) => {
        const r = img.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        img.style.transform = `translateY(${((r.top + r.height / 2 - vh / 2) / vh) * -6}%)`;
      });

      const max = document.documentElement.scrollHeight - vh;
      const bar = document.getElementById('bar');
      if (bar) bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

      const overHero = home && y < vh * 0.75;
      const header = document.getElementById('hd');
      header?.classList.toggle('sc', y > 30);
      header?.classList.toggle('dk', overHero);
      document.body.classList.toggle('scrolled', y > 30 && !overHero);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        tick();
        ticking = false;
      });
    };

    tick();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', tick);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', tick);
    };
  }, [pathname]);

  return null;
}
