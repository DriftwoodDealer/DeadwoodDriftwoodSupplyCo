# DEADWOOD TODO

This is the prioritized execution list. New raw ideas should go to `BrainDump.md` first, then get promoted here when they become real work.

AI agents may only check off an item after:

1. the implementation is complete,
2. `npm run typecheck`, `npm run lint`, and `npm run build` pass,
3. the AI gives Mark clear human test steps,
4. Mark confirms those tests passed.

## P0 - Project Control

- [ ] Configure GitHub Pages static export and deployment workflow for Phase 1.
- [ ] Decide whether the Next.js app fully replaces the original `index.html` landing page.
- [ ] Remove committed/local `.DS_Store` files from the working tree and keep them ignored.
- [ ] Commit the current Phase 1 scaffold after docs and verification are clean.

## P1 - Public Storefront

- [ ] Finalize the four public sectors: Reptile, Landscaping, Taxidermy, and Fine Art / Sculptural Relics.
- [ ] Add curated sector browsing/navigation to `/shop`.
- [ ] Split storefront into dedicated static pages for sectors, wholesale, and custom requests.
- [ ] Update mock inventory so every primary sector has at least one representative item.
- [ ] Make product detail pages include provenance, treatment notes, measurements, status, and inquiry path.
- [x] Prototype premium storefront sections: featured pieces, size classes, treatment protocol, Vault, custom requests, and wholesale preview.
- [ ] Add mobile layout checks for the homepage, shop grid, and product detail pages.

## P2 - Admin Foundation

- [ ] Decide the first backend path: Supabase first, or keep mock data until storefront copy/design stabilizes.
- [ ] Protect `/admin` before any real operational controls are added.
- [ ] Draft the first inventory fields for the listing composer.
- [ ] Add a clear distinction between draft, published, sold, archived, and private preview.
- [ ] Define private field-lookout app requirements for custom request submissions visible only to Mark and John.

## P3 - Content, Media, and Brand

- [ ] Gather canonical brand assets: logo, hero images, product photos, preferred color references.
- [ ] Decide whether the fourth sector should be named `Fine Art`, `Sculptural Relics`, or another public-facing label.
- [ ] Add real product/media placeholders so the shop no longer reuses the hero image for every item.
- [ ] Decide whether articles, field notes, and provenance stories belong in Phase 2 or Phase 3.
- [ ] Define stringent wholesale verification requirements before building account access.
- [ ] Define provenance engraving and custom plaque options for Vault art and large landscaping pieces.
- [ ] Create a future treatment-process page with steps and video once real media exists.

## Backlog

- [ ] Explore QR/copper tag provenance flow.
- [ ] Define the future 3D tank/builder scope separately from the first storefront release.
- [ ] Decide if wholesale/private gallery should be visible publicly or invite-only.
