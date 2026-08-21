# DEADWOOD: Phase 1-5 Build Roadmap
## Custom Storefront, Admin OS, CMS, Inventory, Media, and Backend

This roadmap is written as a working build plan. Every phase includes:

* **AI Build Instructions:** what Codex/AI should build in the repo.
* **Owner Setup Instructions:** what Mark/John need to create, connect, or provide.
* **Regression Testing:** what must be checked before the phase is considered done.

The first version does not need a perfect store. The goal is to prove the backend, CMS, auth, media, and listing workflows with a simple storefront first, then refine the experience.

***

## Phase 1: App Foundation & Deployment Skeleton
Goal: convert the current static splash page into a real Next.js application that can be deployed on Vercel and expanded into the DEADWOOD platform.

### AI Build Instructions
* Convert the repo from a static `index.html` site into a Next.js app using the App Router.
* Preserve the DEADWOOD visual language: obsidian background, high-contrast wood imagery, smokey glass panels, restrained luxury typography, and dark editorial styling.
* Move the current landing page into the Next.js homepage.
* Add base routes:
  * `/` public landing page.
  * `/shop` simple public inventory grid.
  * `/shop/[slug]` simple product detail page.
  * `/admin` protected admin entry point placeholder.
  * `/admin/settings` protected settings placeholder.
* Add a shared layout, navigation shell, mobile-safe responsive styling, and reusable UI primitives.
* Add environment variable examples in `.env.example`.
* Add basic project scripts for local development, linting, type checking, and build verification.
* Keep the initial shop simple and use mocked sample inventory until the database is connected.

### Owner Setup Instructions
* Create or confirm access to the GitHub repo under the `DriftwoodDealer` account.
* Create a Vercel account if one is not already available.
* Connect the GitHub repo to Vercel.
* Decide the first deployment URL:
  * Temporary Vercel URL is fine for testing.
  * Custom domain can wait until the app is stable.
* Provide any brand assets that should be considered canonical:
  * Logo files.
  * Hero images.
  * Preferred colors if already chosen.
  * Any real product photos available for testing.

### Regression Testing
* Local dev server starts without errors.
* Homepage renders the DEADWOOD theme on desktop and mobile.
* `/shop` renders a simple inventory grid from mock data.
* `/shop/[slug]` renders a product page from mock data.
* `/admin` exists but does not expose real controls yet.
* Vercel deployment succeeds from GitHub.
* No obvious layout overlap or broken text on mobile.
* No sensitive keys are committed to Git.

***

## Phase 2: Supabase Backend, Auth & Minimal CMS
Goal: create the first working backend so the site can read inventory from a real database and admins can sign in.

### AI Build Instructions
* Add Supabase client/server integration.
* Create SQL schema files for:
  * `profiles`
  * `roles`
  * `permissions`
  * `profile_roles`
  * `inventory_items`
  * `inventory_categories`
  * `inventory_item_categories`
  * `inventory_media`
  * `admin_activity_log`
* Add row-level security policies so public users can only read published inventory and admins can manage records.
* Add a protected admin layout that requires login.
* Add basic admin pages:
  * `/admin` dashboard overview.
  * `/admin/inventory` list all items.
  * `/admin/inventory/new` create a basic listing.
  * `/admin/inventory/[id]` edit a listing.
  * `/admin/settings/access` view users, roles, and access levels.
* Add simple create/edit/list flows for inventory:
  * title
  * slug
  * description
  * price
  * status
  * category placement
  * dimensions
  * weight
  * availability
  * featured flag
* Connect public `/shop` and `/shop/[slug]` to Supabase data.
* Add seed data so the database can be tested before real listings are ready.
* Keep the admin UI practical and dense, closer to Shopify inventory management than a marketing page.

### Owner Setup Instructions
* Create a Supabase account.
* Create a new Supabase project for DEADWOOD.
* Save the following values and provide them when requested:
  * Supabase project URL.
  * Supabase anon/public key.
  * Supabase service role key, only for server-side admin work.
* Add the Supabase values to Vercel environment variables.
* Add the Supabase values to local `.env.local`.
* Create the first owner/admin login in Supabase Auth.
* Confirm which email addresses should have owner/admin access.
* Decide the first set of inventory categories:
  * Reptile
  * Taxidermy
  * Aquariums
  * Landscaping
  * Relic Collection
  * Wholesale
  * Private Gallery

### Regression Testing
* Admin user can sign in.
* Non-admin user cannot access `/admin`.
* Logged-out visitor cannot access `/admin`.
* Admin can create a test listing.
* Admin can edit a test listing.
* Admin can mark a listing as draft, published, sold, or archived.
* Public `/shop` only shows published inventory.
* Public product pages do not show draft/private/sold-hidden data unless intended.
* Database policies prevent unauthorized writes.
* Vercel deployment can read from Supabase using production environment variables.
* Build, lint, and type checks pass.

***

## Phase 3: Admin OS, Media CMS & Listing Composer
Goal: turn the backend into a real custom CMS and operations console, not just database forms.

### AI Build Instructions
* Expand `/admin` into the DEADWOOD Admin OS.
* Build a Shopify/Etsy/Depop-style listing composer with sections for:
  * Basics
  * Pricing
  * Categories/spaces
  * Measurements
  * Media
  * Provenance
  * Bio-Sanctity
  * Shipping
  * Publishing status
* Add multi-sector placement so a piece can belong to reptile, taxidermy, aquarium, landscaping, wholesale, private gallery, and/or relic collections.
* Add media management:
  * image upload
  * image ordering
  * hero image selection
  * video URL attachment
  * alt text
  * captions
  * macro/detail shot tags
* Add the first editorial CMS models:
  * `articles`
  * `article_media`
  * `field_notes`
  * `video_posts`
* Add draft/review/scheduled/published/archive workflows for inventory and editorial content.
* Add admin activity logging for major actions:
  * listing created
  * listing updated
  * price changed
  * media uploaded/deleted
  * item published
  * user role changed
* Add a mobile-friendly admin layout so field uploads can be tested from a phone browser.
* Keep the first store experience simple: the priority is proving CMS workflows, not perfect final e-commerce polish.

### Owner Setup Instructions
* Create a Cloudinary account if Supabase storage is not enough for media testing.
* Provide Cloudinary values if used:
  * cloud name
  * upload preset
  * API key
  * API secret, server-side only
* Decide whether Phase 3 media should use:
  * Supabase Storage for simple testing, or
  * Cloudinary for more serious image/video handling.
* Provide 5-10 real or test product photos.
* Provide 1-2 test videos or video links if available.
* Provide sample listing copy for at least three items:
  * one reptile/aquarium piece
  * one taxidermy piece
  * one landscaping or relic piece
* Confirm the exact publishing statuses you want visible in admin.

### Regression Testing
* Admin can create a listing from phone and desktop.
* Admin can upload or attach media.
* Admin can choose a hero image.
* Admin can reorder listing images.
* Admin can assign one item to multiple spaces/categories.
* Admin can save a draft without publishing it.
* Admin can publish a listing and see it appear on `/shop`.
* Admin can archive or mark sold and see the public storefront update correctly.
* Activity log records important changes.
* Public users cannot upload media or access admin media controls.
* Mobile admin forms are usable without overlapping controls.
* Storefront still loads if a listing has no image, no video, or incomplete optional fields.

***

## Phase 4: Permissions App, Internal Tools & API Control Room
Goal: build the tiny internal permissions app and admin settings area so access is visible and controllable from the CMS.

### AI Build Instructions
* Build `/admin/settings/access` as a real permissions dashboard.
* Add user list UI showing:
  * name/email
  * role
  * allowed modules
  * last login
  * account status
  * created date
* Add role management:
  * Owner
  * Admin
  * Editor
  * Inventory Manager
  * Media Uploader
  * Contractor Manager
  * Read-Only Viewer
* Add module permissions for:
  * inventory
  * media
  * editorial
  * users/access
  * pricing
  * API settings
  * wholesale/private gallery
  * publishing
* Add protected settings pages:
  * `/admin/settings/access`
  * `/admin/settings/api`
  * `/admin/settings/store`
* Add API settings UI placeholders for services that will eventually connect:
  * Supabase
  * Cloudinary
  * Stripe or payment provider
  * shipping provider
  * email/SMS provider
  * 3D scan provider
* Keep sensitive secrets server-side. The UI should show connection status, not reveal private API keys.
* Add audit events for permission changes and API setting changes.

### Owner Setup Instructions
* Provide the first list of team members who should have access.
* For each person, provide:
  * email address
  * desired role
  * what they should be allowed to do
* Decide whether non-owner admins can:
  * change prices
  * publish listings
  * delete media
  * invite users
  * change permissions
* Decide which API integrations are needed soon and which can remain placeholders.
* Do not send private API secrets in chat unless explicitly needed. Prefer adding them directly to Vercel and `.env.local`.

### Regression Testing
* Owner can see and manage access settings.
* Lower-permission user cannot manage roles.
* Media Uploader can upload media but cannot change pricing or permissions.
* Inventory Manager can create/edit listings but cannot manage API settings.
* Read-Only Viewer can view admin data but cannot save changes.
* API settings page does not leak private secrets to the browser.
* Permission changes are logged.
* Admin navigation hides or disables modules the user cannot access.
* Direct URL access is blocked for unauthorized admin pages.

***

## Phase 5: Public Store Refinement, B2B Prep & Launch Hardening
Goal: make the public experience stronger after the backend works, then prepare for wholesale, private gallery, and future 3D tools.

### AI Build Instructions
* Refine public storefront pages:
  * `/shop`
  * `/shop/[slug]`
  * category landing pages
  * featured drops
  * sold/archive presentation
* Improve product cards and detail pages with:
  * photos
  * video embeds
  * price
  * dimensions
  * sector badges
  * provenance notes
  * Bio-Sanctity badge
  * availability status
* Add basic filtering:
  * sector/category
  * size class
  * price range
  * availability
  * featured
* Add basic search.
* Add lead/inquiry flow if checkout is not ready:
  * request info
  * reserve this piece
  * wholesale inquiry
  * custom hunt inquiry
* Add early B2B/private gallery foundation:
  * contractor account flag
  * private listing visibility
  * wholesale pricing fields
  * private gallery route placeholder
* Add performance hardening:
  * optimized images
  * loading states
  * empty states
  * error states
  * SEO metadata
* Prepare future modules without building them fully yet:
  * 3D asset fields
  * tank compatibility fields
  * QR provenance fields
  * shipping/crating fields

### Owner Setup Instructions
* Decide whether the first public launch is:
  * inquiry/reservation only, or
  * real checkout.
* If real checkout is needed, create a Stripe account and provide publishable/server keys through environment variables.
* Provide final launch copy for:
  * homepage
  * shop intro
  * product detail language
  * Bio-Sanctity explanation
  * wholesale inquiry
  * custom hunt inquiry
* Provide 10-20 real listings when ready.
* Decide how sold items should display:
  * hidden
  * shown as sold
  * archived but visible for brand proof
* Decide what information should stay private:
  * exact GPS coordinates
  * wholesale pricing
  * private gallery pieces
  * supplier/internal notes

### Regression Testing
* Public users can browse shop and product pages without login.
* Public users cannot access private gallery unless authorized.
* Filters and search return correct inventory.
* Draft/private/admin-only fields never leak publicly.
* Product pages handle missing optional data gracefully.
* Inquiry/reservation flow works end to end if enabled.
* Checkout works end to end in test mode if enabled.
* Mobile storefront is readable and polished.
* Images load efficiently and do not break layout.
* SEO metadata exists for homepage, shop, and product pages.
* Production Vercel deployment passes smoke testing.
* Admin workflows from Phases 2-4 still work after storefront refinement.

***

## Every-Phase Regression Baseline
These checks should run at the end of every phase, even when the phase is not directly about the affected area.

* Local app starts successfully.
* Production build succeeds.
* Lint/type checks pass or known exceptions are documented.
* Homepage loads.
* Shop page loads.
* Product detail page loads.
* Admin login works.
* Unauthorized users are blocked from admin.
* No private environment variables are committed.
* Mobile viewport has no major layout overlap.
* Vercel deployment succeeds.
* Existing completed phase features still work.

***

## Working Principle
Build the backend and CMS in thin, testable slices. The first storefront can be simple as long as the data model, admin workflow, permissions, media handling, and deployment path are solid. Once the Admin OS works, the public store can be polished without guessing how the business will actually manage inventory.

***
*Roadmap Authored by Mark Rosenthal & John Van Buren*
