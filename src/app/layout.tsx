import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/context/StoreContext';
import { TransitionProvider } from '@/components/PageTransition';
import Intro from '@/components/Intro';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import ScrollEffects from '@/components/ScrollEffects';

export const metadata: Metadata = {
  title: { default: 'African Pride — Rooted in Heritage', template: '%s — African Pride' },
  description: 'Premium African streetwear. A mother, her baby, the continent — carried on a tee.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

// runs before first paint so the saved theme never flashes
const themeScript = `try{var t=localStorage.getItem('ap_theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body>
        <StoreProvider>
          <TransitionProvider>
            <Intro />
            <div id="bar" />
            <Header />
            <main id="app">{children}</main>
            <Footer />
            <CartDrawer />
            <Toast />
            <ScrollEffects />
          </TransitionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
