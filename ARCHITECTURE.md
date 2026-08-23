# Architecture - Deadwood Driftwood Supply Co - LIVING LOG

This file is append-only living stack truth. New stack and schema changes are added under
`## Log`; historical entries are never rewritten.

## Current Stack Truth

- Framework: Next.js 15 App Router, React 19, TypeScript 5.7
- Hosting: Vercel-capable Next.js deployment; GitHub Pages workflow deprecated
- Database target: Supabase Postgres, Auth, Row Level Security, and Storage
- Payments: Not implemented; Stripe Checkout remains Phase 3
- Shipping: Not implemented; Shippo/EasyPost and local pickup remain Phase 3
- UI: Custom dark editorial CSS; no component library added yet
- Testing: npm typecheck, lint, production build, and Playwright Chromium CMS flow
- Media: Public assets remain for legacy/mock fallback; product media targets Supabase Storage

## Security Model

- `/admin/*` is protected by middleware and a server-side admin layout.
- Admin access requires an authenticated Supabase user with `profiles.role = 'admin'`.
- Public inventory queries request published products only.
- Product media is separated into public and private Storage buckets.
- The Supabase service-role key is not imported by client code.
- RLS policies are defined in `supabase/schema.sql`.

## Core Phase 1 Data Model

- `products`: product identity, category, story, dimensions, treatment, pricing, publishing state, feature flags, and audit references.
- `product_media`: ordered image/video assets with privacy, alt text, and captions.
- `profiles`: customer and admin identity data with an explicit role.
- `inventory_reservations`: one-of-one reservation records with a ten-minute expiry and an active guard; Stripe confirmation is deferred.
- `sourcing_requests`: public submission and admin-only review foundation; internal synchronization is deferred.

## Routing Model

- Public product cards use same-tab Next.js links.
- The shop layout owns the `@modal` parallel route and intercepts product navigation for modal presentation.
- Direct product URLs continue to render the full product page.
- Sector pages share the `SectorPage` template and `sectorConfig`; sector-specific content is passed as template children.

## Log

### [2026-08-21] - Phase 1 Foundation Skeleton

- Removed Next.js static export configuration and disabled the GitHub Pages deployment workflow.
- Added Supabase browser/server/middleware clients with environment-safe local fallback behavior.
- Added the initial Supabase schema and RLS policies for products, media, profiles, reservations, sourcing requests, and Storage buckets.
- Added Supabase Auth login and server-protected admin routes.
- Replaced the CMS placeholder composer with a validated React Hook Form/Zod listing workflow and server actions for save/update/delete/media upload.
- Added the shared sector configuration/template and converted public product data access to published-only Supabase queries when configured.
- Added same-tab product modal interception through the shop parallel route.
- Caveats: a Supabase project and local environment values still need to be supplied; Stripe, shipping, reservation expiry cleanup, order webhooks, wholesale, subscriptions, and sourcing synchronization remain intentionally stubbed for later phases.

### [2026-08-21] - Supabase Project Automation

- Configured local-only `.env.local` for project `dkrsgkoxafribdkcnbbl` at `https://dkrsgkoxafribdkcnbbl.supabase.co`.
- Confirmed the new key format: the `sb_publishable_…` value maps to `NEXT_PUBLIC_SUPABASE_ANON_KEY`; the `sb_secret_…` value is server/script-only and maps to `SUPABASE_SERVICE_ROLE_KEY`.
- Added `product-media-public` and `product-media-private` Storage buckets through the Supabase Storage API.
- Added `npm run supabase:check`, `npm run supabase:setup`, and `npm run supabase:create-admin` scripts.
- Added `scripts/setup-supabase.mjs` with bucket creation, products-table verification, and an optional `exec_sql` RPC attempt.
- Added `scripts/create-admin.mjs` to create or locate a confirmed Auth user and upsert an admin profile.
- The project connection is reachable, but `public.products` is not yet present. Supabase client APIs cannot execute arbitrary SQL by default, so the remaining manual step is to run `supabase/schema.sql` once in Dashboard → SQL Editor. Storage buckets are already present.

### [2026-08-21] - Supabase Schema Applied

- Ran `supabase/schema.sql` in the Supabase SQL Editor for project `dkrsgkoxafribdkcnbbl`.
- Verified `public.products` exists and the publishable-key query returns successfully under RLS with zero visible rows.
- Verified both Storage buckets are present: `product-media-public` and `product-media-private`.
- The remaining setup item is creating the first Auth user and admin profile; credentials are intentionally not stored in repository files or inferred from the browser session.

### [2026-08-21] - Phase 1 Product and Media Corrections

- Public product reads fetch published products first, then fetch non-private `product_media` separately so missing media cannot make a published product appear absent.
- Published media is read through the `product_media` RLS policy and public Storage URLs; private media remains admin-only.
- CMS image intake fills the first available slot in order, always assigning the first image to MAIN, with five image slots and one optional video slot.
- Product details use a contained hero image, thumbnail gallery, optional dimensions/size/weight/video rows, provenance/treatment sections only when populated, and Add to Cart for published items with a positive price.
- Playwright is configured through `playwright.config.ts` with the authenticated `tests/e2e/cms-flow.spec.ts` flow.
