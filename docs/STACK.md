# Deadwood Driftwood Supply Co - Stack

## Framework & Language

- Next.js `^15.3.0` with the App Router
- React `^19.0.0` and React DOM `^19.0.0`
- TypeScript `^5.7.0`, strict mode
- Node.js runtime for Next.js server routes and scripts
- Path alias: `@/*` maps to the repository root

## Styling

- Custom CSS in `app/globals.css`
- CSS Modules for selected component-specific styles
- Dark editorial visual system: obsidian, glass surfaces, zinc, and copper accents
- Tailwind CSS is not installed or used
- No UI component library is currently installed

## Database, Auth & Storage

- Supabase Postgres for products, profiles, media, reservations, and sourcing requests
- Supabase Auth for admin sign-in and session protection
- Supabase Row Level Security for published-only public reads and admin operations
- Supabase Storage buckets: `product-media-public` and `product-media-private`
- `@supabase/supabase-js` for direct public/script access
- `@supabase/ssr` for browser/server session-aware clients

## Deployment

- Vercel-targeted Next.js deployment
- `vercel.json` defines the Next.js framework, install command, and build command
- GitHub source repository: `DriftwoodDealer/DeadwoodDriftwoodSupplyCo`
- GitHub Pages static deployment is deprecated for this app
- Production environment variables are configured per Vercel project

## Testing

- TypeScript: `npm run typecheck`
- ESLint: `npm run lint`
- Production build: `npm run build`
- Playwright Chromium flow: `npm run test:e2e`
- Playwright UI mode: `npm run test:e2e:ui`
- CMS E2E coverage includes admin login, two-image upload, publishing, public visibility, detail gallery, and Add to Cart.

## All Dependencies

### Runtime dependencies

| Package | Version | Purpose |
| --- | --- | --- |
| `@hookform/resolvers` | `^5.9.1` | Connects React Hook Form validation to Zod |
| `@supabase/ssr` | `^0.12.4` | Supabase browser/server cookie-aware clients |
| `@supabase/supabase-js` | `^2.112.3` | Supabase database, Auth, and Storage API client |
| `next` | `^15.3.0` | Web framework, routing, server actions, and image handling |
| `react` | `^19.0.0` | UI runtime |
| `react-dom` | `^19.0.0` | React browser rendering |
| `react-hook-form` | `^7.85.0` | CMS form state and submission handling |
| `zod` | `^4.4.3` | Form and server input validation |

### Development dependencies

| Package | Version | Purpose |
| --- | --- | --- |
| `@playwright/test` | `^1.62.1` | Browser end-to-end testing |
| `@types/node` | `^22.13.0` | Node.js TypeScript declarations |
| `@types/react` | `^19.0.0` | React TypeScript declarations |
| `@types/react-dom` | `^19.0.0` | React DOM TypeScript declarations |
| `eslint` | `^9.20.0` | Static analysis |
| `eslint-config-next` | `^15.3.0` | Next.js ESLint rules |
| `typescript` | `^5.7.0` | Type checking and compilation |

## Libraries Actually Imported

- `next`: App Router links/navigation, server actions, image component, metadata, server responses, and cache revalidation
- `react` / `react-dom`: components, hooks, and browser rendering
- `@supabase/ssr`: cookie-aware Supabase browser/server/middleware clients
- `@supabase/supabase-js`: public inventory and setup/admin scripts
- `react-hook-form`: CMS listing form state
- `@hookform/resolvers/zod`: React Hook Form/Zod integration
- `zod`: CMS and server-action schemas
- Playwright is imported by the E2E test suite, not the application runtime
- No `lucide`, `@dnd-kit`, Tailwind, Stripe, Cloudinary, or other third-party UI/media/payment library is currently imported

## Project Structure

```text
app/                 Next.js routes, layouts, server actions, and API routes
components/          Reusable storefront, CMS, auth, and UI components
lib/                 Inventory models, Supabase clients, and shared configuration
public/              Static images and public assets
supabase/             Database schema and RLS definitions
scripts/              Supabase setup, admin, check, and idea utilities
docs/                Stack, deployment, reservation, and planning documentation
tests/e2e/            Playwright browser tests
```
