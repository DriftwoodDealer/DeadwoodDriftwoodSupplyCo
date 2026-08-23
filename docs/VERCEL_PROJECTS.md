# Deadwood Vercel Projects

## One account, separate projects

Both repositories under the `DriftwoodDealer` GitHub organization can safely live under the same Vercel account. Vercel isolates environment variables, deployments, domains, and settings per project.

### Existing project: DeadwoodMusic

- Keep the existing Vercel project as-is.
- Repository: `DriftwoodDealer/DeadwoodMusic`
- Vercel project name: `deadwoodmusic`

### New project: DeadwoodDriftwoodSupplyCo

- Repository: `DriftwoodDealer/DeadwoodDriftwoodSupplyCo`
- Vercel project name: `deadwood-driftwood-supply-co`
- Framework: Next.js
- Build command: `npm run build`
- Environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`

Environment variables are isolated per project. It is safe for both Deadwood projects to use the same Vercel account because the projects do not share their configuration automatically.

## Add the new project

1. Open the Vercel Dashboard.
2. Choose **Add New → Project**.
3. Import `DriftwoodDealer/DeadwoodDriftwoodSupplyCo`.
4. Confirm Next.js is detected.
5. Add the four environment variables above to the appropriate deployment environments.
6. Deploy.
7. Verify `/api/health`, `/shop`, and `/admin` on the generated Vercel URL.
8. Add the custom domain later, after the generated URL passes production checks.
