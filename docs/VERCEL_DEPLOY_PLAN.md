# Deadwood Vercel Production Deploy Plan

Status: planning only. No deployment or application changes are included in this document.

## 1. Import the repository

1. Sign in to Vercel with the GitHub account that owns the Deadwood repository.
2. Select **Add New → Project**.
3. Import `DriftwoodDealer/DeadwoodDriftwoodSupplyCo`.
4. Confirm the framework is detected as Next.js.
5. Keep the repository root as the project root.
6. Use the repository build settings: `npm run build`; output is managed by Next.js.
7. Add the production environment variables before the first deploy.
8. Deploy and save the generated `.vercel.app` URL for verification.

## 2. Required environment variables

Add these in Vercel Project Settings → Environment Variables for **Production**, and add Preview separately if preview deployments should use Supabase:

| Variable | Value/source | Exposure |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Production Supabase project URL | Browser-safe |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key | Browser-safe |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase secret key | Server-only; never expose to the browser |
| `NEXT_PUBLIC_SITE_URL` | Final production URL, including `https://` | Browser-safe |

Do not commit `.env.local`, paste the service-role key into public settings, or reuse a development URL for production site metadata.

## 3. Production Supabase verification

After deployment:

1. Open the Vercel deployment URL and confirm `/shop` returns successfully.
2. Confirm the shop is reading the production `products` table, not mock fallback data. Publish one unmistakable test listing in Supabase/CMS and verify it appears publicly; then remove or archive it.
3. Confirm `product-media-public` and `product-media-private` exist in Supabase Storage.
4. Upload a test image through `/admin/cms` and confirm the public bucket URL loads on the published product.
5. Confirm a logged-out request to `/admin` redirects to `/login`.
6. Sign in as the production admin and confirm `/admin/cms` loads.
7. Review Vercel Functions logs for Supabase connection failures, missing environment variables, storage upload errors, and RLS errors. Logs must not print secret values.
8. Confirm a draft is absent from `/shop` and a published listing is present.

The planned completion target is a small health endpoint returning HTTP 200 and a safe payload such as `{ "ok": true }`. It must not expose credentials or database rows. Until that endpoint exists, `/shop`, `/login`, and the protected admin route are the practical smoke checks.

## 4. Domain setup

1. Add the chosen production domain in Vercel Project Settings → Domains.
2. For an apex domain, set the registrar’s A record to Vercel’s current value; for a subdomain, set the CNAME Vercel provides.
3. Wait for DNS verification and automatic TLS issuance.
4. Change `NEXT_PUBLIC_SITE_URL` to the verified canonical domain and redeploy.
5. Confirm Supabase Auth redirect URLs include the production domain and the login callback path used by the app.
6. Choose one canonical host and redirect the alternate host to it.

## 5. Rollback plan

- Every Vercel deployment is immutable. Use the Vercel deployment list to promote the last known-good deployment if a release fails.
- Keep the previous deployment URL available during verification.
- If the failure is environment-related, restore the prior environment values and redeploy; do not edit production data to solve a deployment problem.
- If a database migration is later introduced, require a backward-compatible migration and a documented down/forward recovery procedure before production execution.
- For a bad listing, unpublish/archive the record in CMS rather than rolling back the entire application.

## Definition of done

- Vercel deployment succeeds from GitHub.
- A safe health endpoint returns HTTP 200.
- `/shop` loads published inventory from the production Supabase database.
- Product media loads from the public Storage bucket.
- `/admin` is protected for logged-out visitors and loads for the production admin.
- Production environment variables are configured without exposing the service-role key.
- The canonical domain resolves with HTTPS and Supabase Auth redirects are correct.
- A rollback deployment has been identified and the team knows how to promote it.
