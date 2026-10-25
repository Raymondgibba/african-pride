import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Steps from '@/components/Steps';
import { SETTINGS } from '@/data/site';
import { waLink } from '@/lib/format';

export const metadata: Metadata = { title: 'Contact' };

const h2s = { fontSize: 'clamp(2rem,6vw,3.4rem)', marginBottom: 12 } as const;

export default function ContactPage() {
  return (
    <>
      <div className="ph">
        <div className="w">
          <p className="eyebrow" style={{ marginBottom: 14 }}>Contact</p>
          <h1>Let’s <em>talk.</em></h1>
          <p>We reply on WhatsApp.</p>
          <div className="cta">
            <a className="btn btn--dark" href={waLink('Hello African Pride, I have a question.')} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </div>

      <section style={{ paddingTop: 30 }}>
        <div className="w">
          <p className="eyebrow" style={{ marginBottom: 26 }}>How ordering works</p>
          <Steps stagger={0.1} items={[
            ['Choose', 'Pick your piece, colour and size.'],
            ['Check out', 'Add your name, phone, and pickup or delivery.'],
            ['Send on WhatsApp', 'Your order opens as a ready message.'],
            ['We confirm', 'We reply to confirm payment and collection.'],
          ]} />
        </div>
      </section>

      <section style={{ background: 'var(--soft)' }}>
        <div className="w split">
          <Reveal>
            <h2 className="big" style={h2s}>Pickup &amp; <em>delivery</em></h2>
            <p style={{ color: 'var(--mute)' }}>
              {SETTINGS.pickupAddress ? `Pickup: ${SETTINGS.pickupAddress}. ` : ''}We confirm pickup times and delivery details with you on WhatsApp.
            </p>
          </Reveal>
          <Reveal>
            <h2 className="big" style={h2s}><em>Payment</em></h2>
            <p style={{ color: 'var(--mute)' }}>Pay on pickup or delivery, or with Wave, Afrimoney or QMoney. We send you the payment details when we confirm your order.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
