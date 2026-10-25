# African Pride — Next.js (TypeScript)

Your single HTML file, rebuilt as a Next.js 14 App Router project. Same design, same WhatsApp checkout.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where to edit things
| What | File |
|---|---|
| WhatsApp number, currency, delivery fee, payment methods | `src/data/site.ts` |
| Products, colours, prices, photos (add more products here) | `src/data/products.ts` |
| Colours, fonts, spacing (all the original CSS) | `src/app/globals.css` |
| Photos and logos | `public/images`, `public/logo-*.png` |
| Page content | `src/app/*/page.tsx` |

## Structure
```
src/
  app/          routes: / /shop /product/[id] /story /contact /checkout
  components/   Header, Footer, Hero, ProductCard, CartDrawer, CheckoutView, Reveal (scroll animations)...
  context/      StoreContext — cart, drawer, toast (cart saved in localStorage)
  data/         site settings + products
  lib/          money(), waLink()
  types/        shared TypeScript types
```
Routes are now real URLs (`/shop`, `/product/collar-tee?color=navy`) instead of `#/shop`.
