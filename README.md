# DEADWOOD: Driftwood Supply Co.

DEADWOOD is a Missouri River driftwood storefront and operations project for Mark Rosenthal and John Van Buren. The current repo is a Next.js App Router scaffold for a public landing page, a simple mock shop, product detail pages, and early admin placeholders.

The longer vision is documented in [Roadmap.md](Roadmap.md). Raw notes and unfiltered ideas belong in [BrainDump.md](BrainDump.md). Prioritized execution work belongs in [TODO.md](TODO.md).

## Current State

- Branch: `dev`
- Frontend: Next.js 15, React 19, TypeScript
- Routes currently present:
  - `/`
  - `/shop`
  - `/shop/[slug]`
  - `/admin`
- `/admin/settings`
- Inventory is mocked in `lib/mock-inventory.ts`.
- The original static landing page has been retired; the Next.js app is the public storefront.
- Phase 1 deployment is configured as a GitHub Pages static export.

## Core Sections

The public shop should support these primary sectors:

- Reptile
- Landscaping
- Taxidermy
- Fine Art / Sculptural Relics

Items may belong to more than one sector.

## Development

```bash
npm install
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Capturing Ideas

Use the shortest repo-local command when an idea needs to be saved quickly:

```bash
npm run idea -- "Add sculptural relics section for fine art buyers"
```

For the prompted push workflow:

```bash
npm run push
```

That command asks whether there are any new ideas, saves one to `BrainDump.md` if provided, then runs `git push`.

## Versioning

The project version is tracked in `package.json`. Use semantic versioning:

- `0.x`: planning, prototypes, and private buildout
- `1.0.0`: first stable public release
- Patch versions for fixes
- Minor versions for new user-facing capabilities

Record notable changes in [CHANGELOG.md](CHANGELOG.md).

## Deployment Note

The remote currently points to:

```bash
https://github.com/DriftwoodDealer/DeadwoodDriftwoodSupplyCo.git
```

Phase 1 is configured for GitHub Pages static export. `next.config.mjs` emits the static site to `out/`, and `.github/workflows/pages.yml` publishes that folder from the `dev` branch.

GitHub Pages is a good free target for the landing page and static storefront. Vercel or Netlify will be cleaner later if protected admin tools, server routes, uploads, or secret-backed backend features become necessary.
