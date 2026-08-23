# Changelog

All notable project changes should be documented here.

This project uses semantic versioning through the `version` field in `package.json`.

## [Unreleased]

### CMS Editorial Restoration - 2026-08-21

- Restyled the CMS with an obsidian, clay, and glass editorial system matching the storefront.
- Replaced technical copy with listing-focused language and a centered “No listings yet” state.
- Added five square image slots with MAIN designation, previews, removal, multi-file intake, Finder drop upload, and native drag reordering.
- Added the optional 16:9 Moving Study slot, clearer publishing controls, USD price entry, and responsive dimensions layout.
- Corrected media fill behavior so dropped or multi-selected files occupy MAIN and the next available slots.
- Added optional reptile size, client-side preview, save/publish toast feedback, and restored the Playwright CMS flow.
- Corrected product detail gallery sizing, hidden empty metadata, provenance/treatment mapping, public media reads, and paid-item Add to Cart behavior.

### Phase 1 Foundation - 2026-08-21

- Replaced the GitHub Pages static-export configuration with a Vercel-capable Next.js build and deprecated the Pages workflow.
- Added Supabase environment variables, browser/server clients, middleware session refresh, database schema, Storage buckets, and RLS policies.
- Added Supabase Auth login and server-side admin protection for every `/admin` route.
- Replaced the CMS visual placeholder with a validated listing composer that supports drafts, review/published states, category selection, featured flags, dimensions, story, treatment details, and media upload handling.
- Connected public inventory queries to published Supabase products with mock fallback when local Supabase credentials are not configured.
- Consolidated sector pages onto a shared template/configuration model and added the product-detail intercepting modal route without opening new tabs.
- Verified `npm run typecheck`, `npm run lint`, and `npm run build`.
- Caveats: Supabase credentials/project setup, manual Auth/RLS verification, Stripe Checkout, shipping, reservation cleanup/webhooks, orders, wholesale, subscriptions, and sourcing synchronization remain stubbed intentionally.

### Supabase Automation - 2026-08-21

- Created and verified the ignored local `.env.local` using the supplied Supabase project URL and new publishable/secret key format.
- Confirmed `.env.local` is excluded by the existing `.env.*` `.gitignore` rule.
- Added Supabase connection checking, project setup, and admin creation scripts.
- Ran `npm run supabase:setup`; both `product-media-public` and `product-media-private` buckets were created successfully.
- The products query currently reports that `public.products` is missing, and the optional `exec_sql` RPC is unavailable. The remaining dashboard action is to paste/run `supabase/schema.sql` in Supabase Dashboard → SQL Editor, then rerun `npm run supabase:setup` and `npm run supabase:check`.
- Admin creation remains available through `npm run supabase:create-admin -- you@email.com yourpassword` after the schema is applied.

### Supabase Schema Verification - 2026-08-21

- Ran the full schema successfully in the Supabase SQL Editor: “Success. No rows returned.”
- Reran `npm run supabase:setup`; both buckets were present and `public.products` was confirmed to exist.
- Reran `npm run supabase:check`; the connection and RLS-backed products query passed with zero visible rows.
- Verified the local app redirects logged-out `/admin` visits to `/login` and public `/shop` still renders.
- Remaining manual setup: create an Auth user and admin profile, then run the authenticated CMS workflow checks.

### Deadwood CMS Listing Composer - 2026-08-21

- Replaced development-oriented CMS language with Deadwood CMS and Deadwood Listings terminology.
- Reworked product media into five square image slots plus one optional video slot.
- Added glass-style empty states, Main image designation, first-image hero behavior, and drag reordering before upload.
- Updated server-side media persistence to upload ordered images/video and store `sort_order` plus the first public image as `hero_image_url`.
- Added the role-by-email/magic-link access model to the future auth direction; the current admin role and password flow remain unchanged until that feature is designed and implemented.

### Added

- Project workflow docs for TODO tracking, changelog discipline, and AI agent handoff.
- Repo-local idea capture workflow through `npm run idea`.
- Optional prompted push workflow through `npm run push`.
- GitHub Pages static export configuration and deployment workflow.
- Dedicated static pages for sector shopping, wholesale verification preview, and custom request preview.
- Push guard now checks the active GitHub account against the remote owner before pushing.
- Refined custom request language around private field targets and captured future lookout-list workflow.
- Homepage now points into the real sector, wholesale, and custom request routes instead of test/admin preview CTAs.
- Added homepage curated preview, tighter mobile hero spacing, treatment learn-more affordance, and provenance/plaque language.
- Moved treatment protocol content out of the general shop and into the Reptile & Bioactive flow only.
- Added selected AI mock imagery as section features for Reptile & Bioactive and Taxidermy.
- Retired the original static `index.html` landing page in favor of the Next.js storefront.
- Confirmed Sculptural Relics as the fourth public storefront sector.

### Verified

- `npm run typecheck`
- `npm run lint`
- `npm run build`

## [0.1.0] - 2026-05-16

### Added

- Initial Next.js App Router scaffold.
- Public landing page migrated from the original static splash page direction.
- Mock shop route at `/shop`.
- Mock product detail route at `/shop/[slug]`.
- Admin placeholder routes at `/admin` and `/admin/settings`.
- Mock inventory data in `lib/mock-inventory.ts`.
