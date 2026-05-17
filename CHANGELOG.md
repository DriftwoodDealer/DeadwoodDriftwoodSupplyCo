# Changelog

All notable project changes should be documented here.

This project uses semantic versioning through the `version` field in `package.json`.

## [Unreleased]

### Added

- Project workflow docs for TODO tracking, changelog discipline, and AI agent handoff.
- Repo-local idea capture workflow through `npm run idea`.
- Optional prompted push workflow through `npm run push`.
- GitHub Pages static export configuration and deployment workflow.
- Dedicated static pages for sector shopping, wholesale verification preview, and custom request preview.
- Push guard now checks the active GitHub account against the remote owner before pushing.

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
