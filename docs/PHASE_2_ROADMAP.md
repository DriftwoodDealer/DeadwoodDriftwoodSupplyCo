# Deadwood Phase 2 Roadmap

Status: planning only. The order below is approved for architecture discussion; no implementation is implied.

## Step 1 — Vercel deployment (approximately 1 hour)

- Import the GitHub repository into Vercel.
- Configure production and preview environment variables.
- Deploy the current verified Phase 1 build.
- Confirm the generated URL, protected admin route, published Supabase inventory, and Storage media.
- Add the canonical domain when the temporary deployment is healthy.
- Follow [VERCEL_DEPLOY_PLAN.md](./VERCEL_DEPLOY_PLAN.md).

## Step 2 — Production Supabase verification (approximately 30 minutes)

- Confirm Vercel can read published products from the production project.
- Confirm public and private Storage buckets and their RLS behavior.
- Confirm logged-out users cannot access `/admin`.
- Confirm the production admin can create a draft, upload media, publish, and see the product publicly.
- Add and verify a safe health endpoint returning HTTP 200.
- Record the production project/domain relationship in the architecture log.

## Step 3 — Build reservation logic from the chosen model

The planning recommendation is the hybrid model:

- NANO and MEDIUM pieces priced $20–$500 use immediate cart flow with a short server-side reservation before payment.
- SPECIMEN XL, XXL, and TREE pieces above $500 use reservation, countdown, admin quote/approval, and payment only after approval.

Implementation work must settle the final reservation status vocabulary, email ownership model, atomic conflict behavior, expiration job, admin notification path, and customer-facing expired-hold behavior before UI work is considered complete.

## Step 4 — Stripe Checkout stub

- Add a server-only Stripe boundary with test-mode configuration.
- Create Checkout only after a reservation succeeds.
- Carry product and reservation IDs in Stripe metadata.
- Add webhook-shaped handling for successful payment, cancellation, expiration, and duplicate events.
- Keep payment state authoritative on the server.
- Do not expose secret keys to client code.

## Step 5 — Four-sector template polish

- Keep one shared sector template and configuration model for Reptile, Landscaping, Taxidermy, and Sculptural Relics.
- Replace remaining mock/repeated imagery with real listing media as it becomes available.
- Improve sector-specific copy and product presentation without duplicating page implementations.
- Confirm product detail behavior remains safe for missing dimensions, weight, video, and provenance.

## Later work

- Role-based permissions beyond the current admin role.
- Activity and audit logging.
- Editorial models for articles, field notes, and video posts.
- Full mobile CMS testing and field-upload refinements.
- Shipping, crating, tax, orders, refunds, and fulfillment workflows.
- Wholesale/private-gallery permissions and pricing.
- Search, filtering, SEO hardening, and broader storefront refinement.

## Phase 2 exit criteria

- Production Vercel deployment is stable and rollback is understood.
- Production Supabase reads, Storage, RLS, Auth, and health checks pass.
- A one-of-one product cannot be reserved twice through concurrent requests.
- Expired reservations release inventory safely.
- Stripe test Checkout cannot be created without a valid reservation.
- At least one low-price instant purchase path and one high-touch reservation path are verified in test mode.
- Existing admin and public Playwright coverage still passes.
