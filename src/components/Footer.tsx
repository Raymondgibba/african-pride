import { NavLink } from './PageTransition';
import { waLink } from '@/lib/format';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="top">
          <div>
            <img src="/logo-light.png" alt="African Pride" />
            <p style={{ marginTop: 14, color: '#a8a396', maxWidth: '28ch' }}>Premium African streetwear. Rooted in Heritage.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><NavLink href="/shop">Shop</NavLink></li>
              <li><NavLink href="/story">Our Story</NavLink></li>
              <li><NavLink href="/contact">Contact</NavLink></li>
            </ul>
          </div>
          <div>
            <h4>Order</h4>
            <ul>
              <li><NavLink href="/checkout">Checkout</NavLink></li>
              <li><a href={waLink('Hello African Pride, I have a question.')} target="_blank" rel="noopener noreferrer">WhatsApp us</a></li>
            </ul>
          </div>
        </div>
        <p className="fine">Crafted from Memory. Rooted in Heritage. © {new Date().getFullYear()} African Pride.</p>
      </div>
    </footer>
  );
}
