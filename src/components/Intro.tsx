'use client';

import { useEffect, useState } from 'react';

/** Logo splash shown once per session. Adds body.ready which starts the hero animations. */
export default function Intro() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem('ap_intro');
      sessionStorage.setItem('ap_intro', '1');
    } catch {}
    if (seen) {
      setGone(true);
      document.body.classList.add('ready');
      return;
    }
    const a = setTimeout(() => {
      setDone(true);
      document.body.classList.add('ready');
    }, 1800);
    const b = setTimeout(() => setGone(true), 2900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  if (gone) return null;
  return (
    <div id="intro" className={done ? 'done' : ''}>
      <img src="/logo-light.png" alt="African Pride" />
      <i />
    </div>
  );
}
