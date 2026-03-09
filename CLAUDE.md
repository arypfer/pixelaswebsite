# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Next.js + Payload CMS admin)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

No test framework is configured.

## Architecture

This is a **Next.js 15 + Payload CMS 3.0** monolith deployed to Vercel. Products are managed via Payload admin at `/admin` and displayed on a public storefront.

### Route Groups

- `app/(frontend)/` — Public storefront. Server components fetch data via Payload local API (`getPayload({ config })`), then pass serialized props to client components.
- `app/(payload)/` — Payload CMS admin panel, mounted at `/admin`. Not linked from the storefront.

### Key Data Flow

1. **Products collection** (`collections/Products.ts`) — The central content type. Has `visible` field controlling public access (enforced at collection-level `read` access).
2. **Server pages** (`page.tsx`) call `payload.find()` with `depth: 1-2`, serialize results (strip non-serializable Payload internals), and pass to client components.
3. **Client components** (e.g., `HomeClient.tsx`) handle search, filtering, animations via Framer Motion.
4. **Revalidation**: Pages use `export const revalidate = 60` (ISR).

### Standalone Product Pages

- `app/(frontend)/pxtouch/` and `app/(frontend)/canonstyle/` — Hardcoded landing pages for specific products, not driven by the Products collection.

### Database & Storage

- **DB**: Supabase PostgreSQL via `@payloadcms/db-postgres` (pooler connection on port 6543)
- **Media storage**: Supabase S3-compatible storage via `@payloadcms/storage-s3`, bucket `product-images`
- **Config**: See `.env.example` for required env vars

### Path Aliases

- `@/*` maps to project root (e.g., `@/components/PixelasLogo`)
- `@payload-config` maps to `./payload.config.ts`

## Conventions

- **Buy buttons** are plain `<a>` tags linking to external mayar.id URLs. Always wrap with `ensureUrl()` (defined in `products/[slug]/page.tsx`) to prevent relative-path bugs. No Stripe/payment processing.
- **Fonts**: Plus Jakarta Sans (`--font-body`) for body, Instrument Serif (`--font-display`) for display headings. Loaded via `next/font/google` in the frontend layout.
- **Design system**: Dark luxury editorial — `#060606` background, `#0c0c0c` card surfaces, amber-400/500 accent. Custom CSS utilities in `globals.css`: `noise`, `ambient-glow`, `card-glow`, `shimmer-border`, `text-gradient`.
- **Icons**: Lucide React. Product features reference icon names as strings (e.g., "Zap", "Camera") resolved dynamically via `getLucideIcon()`.
- **Currency**: IDR, formatted with `Intl.NumberFormat('id-ID')`.
- **Prices** stored in Products collection are in IDR (Indonesian Rupiah).

## Collections

- `Users` — Admin authentication only
- `Media` — Image uploads, public read access, stored in Supabase S3
- `Products` — Main content type. Fields organized in tabs: General, Content (rich text + features array), Media (cover + gallery), Pricing & Links (supports single buyUrl or multiple platform-specific buyLinks), SEO
