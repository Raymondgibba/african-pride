'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState, type ComponentProps, type ReactNode } from 'react';

type LinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };
const GoCtx = createContext<(href: string) => void>(() => {});
export const useGo = () => useContext(GoCtx);

/** Black curtain wipe between pages (same effect as the original site). */
export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<'' | 'in' | 'out'>('');
  const busy = useRef(false);
  const target = useRef('');

  const go = useCallback(
    (href: string) => {
      const path = href.split('?')[0];
      if (busy.current || path === pathname) return router.push(href);
      busy.current = true;
      target.current = path;
      document.body.classList.remove('mo');
      setPhase('in');
      setTimeout(() => router.push(href), 520);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!busy.current || pathname !== target.current) return;
    const t = setTimeout(() => {
      setPhase('out');
      setTimeout(() => {
        setPhase('');
        busy.current = false;
      }, 700);
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <GoCtx.Provider value={go}>
      <div id="curtain" className={phase}>
        <img src="/logo-light.png" alt="" />
      </div>
      {children}
    </GoCtx.Provider>
  );
}

/** Drop-in <Link> that plays the page curtain. Forwards its ref so <Reveal as={NavLink}> works. */
export const NavLink = forwardRef<HTMLAnchorElement, LinkProps>(function NavLink({ href, onClick, ...rest }, ref) {
  const go = useGo();
  return (
    <Link
      ref={ref}
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        go(href);
      }}
    />
  );
});
