'use client';

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';
import { cx } from '@/lib/format';

type Props = {
  as?: ElementType;
  img?: boolean; // image wipe instead of fade-up
  delay?: number; // seconds
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>;

/** Fades / wipes its content in when it scrolls into view. */
export default function Reveal({ as: Tag = 'div', img = false, delay = 0, className, style, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'wait' | 'is' | 'done'>('wait');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) return setState('is');
    // a fully wiped image is never "intersecting", so watch its container instead
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setState('is');
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(img ? el.parentElement ?? el : el);
    return () => io.disconnect();
  }, [img]);

  useEffect(() => {
    if (state !== 'is') return;
    const t = setTimeout(() => setState('done'), 2000);
    return () => clearTimeout(t);
  }, [state]);

  return (
    <Tag
      ref={ref}
      className={cx(className, state === 'is' && 'is') || undefined}
      data-r={state === 'done' ? undefined : img ? 'img' : ''}
      style={{ ...style, ...(delay ? { '--d': `${delay}s` } : {}) } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
