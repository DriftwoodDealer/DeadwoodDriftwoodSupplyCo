# Wholesale applications

Wholesale applications are stored in Supabase and reviewed in the protected admin area at `/admin/wholesale`.

## Database setup

Apply `supabase/migrations/20261018090000_wholesale_applications.sql` in the Supabase SQL Editor before accepting applications. The public form submits through a server route using `SUPABASE_SERVICE_ROLE_KEY`; row-level security lets only admins read or update application records.

## Optional email alerts

Applications are saved even if email alerts are not configured. To email new-application notices, configure these server-side environment variables in local development and the deployment environment:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — a sender verified with Resend
- `WHOLESALE_APPLICATION_ALERT_EMAIL` — the private inbox you own and want alerts delivered to

The alert recipient is intentionally separate from any public contact address shown on the site. No message is sent to `inquiry@deadwooddriftwood.com` by default.
