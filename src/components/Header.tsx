'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { cx } from '@/lib/format';
import { NavLink } from './PageTransition';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/story', label: 'Story' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { count, openDrawer } = useStore();
  const [menu, setMenu] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => { setMenu(false); }, [pathname]);
  useEffect(() => { document.body.classList.toggle('mo', menu); }, [menu]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => {
    if (!count) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <>
      {/* the 'sc' and 'dk' classes on #hd are toggled by <ScrollEffects /> */}
      <header id="hd">
        <div className="in">
          <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
            <button className="ic" id="mb" aria-label="Menu" onClick={() => setMenu(true)}>
              <svg viewBox="0 0 26 26"><path d="M2 8h22M2 18h22" /></svg>
            </button>
            <nav className="nav" aria-label="Main">
              {LINKS.map((l) => (
                <NavLink key={l.href} href={l.href} className={cx(pathname.startsWith(l.href) && 'on')}>{l.label}</NavLink>
              ))}
            </nav>
          </div>
          <NavLink className="logo" href="/" aria-label="African Pride home">
            <img className="l1" src="/logo-dark.png" alt="African Pride" />
            <img className="l2" src="/logo-light.png" alt="African Pride" />
          </NavLink>
          <div className="r">
            <ThemeToggle />
            <button className="ic" aria-label="Open cart" onClick={openDrawer}>
              <svg viewBox="0 0 26 26"><path d="M4 8h18l-1.4 15H5.4zM9 8V6.5a4 4 0 018 0V8" /></svg>
              <span id="cn" className={bump ? 'b' : ''} style={{ display: count ? 'grid' : 'none' }}>{count}</span>
            </button>
          </div>
        </div>
      </header>
      <button className="ic" id="mx" aria-label="Close menu" onClick={() => setMenu(false)}>
        <svg viewBox="0 0 26 26"><path d="M4 4l18 18M22 4L4 22" /></svg>
      </button>
      <nav id="menu" aria-label="Menu">
        <NavLink href="/">Home</NavLink>
        {LINKS.map((l) => <NavLink key={l.href} href={l.href}>{l.label}</NavLink>)}
      </nav>
    </>
  );
}
