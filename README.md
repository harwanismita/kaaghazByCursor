# Kaaghaz The Art Studio

A free replacement for the Shopify store at [studiokaaghaz.com](https://studiokaaghaz.com/). Same cream-and-brown look, same products, same copy — without the ₹1,994/month Shopify Basic plan.

Smita still paints every piece. Shoppers browse the catalog, add to cart, and send the order on WhatsApp (7975111625). Payment is UPI / transfer, confirmed by Smita. There is no monthly website fee.

## What’s included

- Home page matching the live store: pinewood launch, most-loved, shop-by-category, founder story
- All 74 products and the main collections
- Product pages with photos, variants, “name to paint”, add to cart
- Cart with `WELCOME10` (10% off) and free shipping over ₹1,199
- Custom-order form, About, FAQ, shipping / refund / privacy / terms
- Mobile menu and search

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43217](http://localhost:43217).

## Deploy for ₹0

This is a standard Next.js app. Host it on [Vercel](https://vercel.com) (free hobby plan):

1. Push this repo to GitHub / Origin
2. Import the project in Vercel
3. Click Deploy
4. Point `studiokaaghaz.com` at Vercel when you are ready to leave Shopify (or use the free `*.vercel.app` URL until then)

Product photos still load from the existing Shopify CDN. After you cancel Shopify those image URLs may stop working — download the photos from the Shopify admin first, drop them in `public/products`, and update `data/products.json`.

## After you switch

1. Place a test order on WhatsApp and confirm the message looks right
2. In Shopify Admin → Settings → Plan, cancel the subscription so the ₹2,000 charge stops
3. Keep the domain on Shopify only until you move DNS, then release it

## Edit the catalog

- Products: `data/products.json`
- Collections: `data/collections.json`
- Phone, email, shipping rules, announcement: `data/site.json`
