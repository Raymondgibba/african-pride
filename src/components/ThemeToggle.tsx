'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => setDark(document.documentElement.getAttribute('data-theme') === 'dark'), []);

  const toggle = () => {
    const root = document.documentElement;
    const next = dark ? 'light' : 'dark';
    root.classList.add('tt');
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('ap_theme', next); } catch {}
    setDark(!dark);
    setTimeout(() => root.classList.remove('tt'), 600);
  };

  return (
    <button className="ic" onClick={toggle} aria-label="Switch between light and dark mode" aria-pressed={dark}>
      <svg className="i-moon" viewBox="0 0 26 26"><path d="M21 15.2A8.6 8.6 0 0110.8 5a8.6 8.6 0 1010.2 10.2z" /></svg>
      <svg className="i-sun" viewBox="0 0 26 26"><circle cx="13" cy="13" r="4.6" /><path d="M13 2.6v3M13 20.4v3M2.6 13h3M20.4 13h3M5.7 5.7l2.1 2.1M18.2 18.2l2.1 2.1M5.7 20.3l2.1-2.1M18.2 7.8l2.1-2.1" /></svg>
    </button>
  );
}
