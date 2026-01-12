# Dart Valley Fungi

A fast, SEO-first, content-led ecommerce site for **Dart Valley Fungi**, built with **Next.js (App Router)**, **Headless Shopify**, and deployed on **Vercel**.

## About

At Dart Valley Fungi, Mic Eaton and Luke Watson grow gourmet mushrooms in Devon using upcycled agricultural waste from local producers like Barnaby's Brewhouse and Riverford Dairy.

## Features

- **Educational Content**: Fungi profiles and blog posts in MDX
- **E-commerce**: Product catalog with cart functionality (Shopify Storefront API ready)
- **Brand-Focused Design**: Earthy color palette, sustainable messaging
- **SEO Optimized**: Server-rendered pages with proper metadata

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **MDX** for content
- **Shopify Storefront API** (mock data for development)
- **Vitest + Playwright** for testing

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and add your Shopify credentials when ready:

```
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── content/          # MDX files (fungi, blog)
├── lib/              # Utilities (Shopify, MDX, etc.)
└── types/            # TypeScript definitions
```

## Deployment

Deploy to Vercel with one click. The `main` branch triggers preview deployments automatically.

## License

MIT
