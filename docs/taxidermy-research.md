# Taxidermy driftwood sourcing and tentative pricing

Research date: October 18, 2026. These are supplier listings, not a representative market average. Customer guide ranges are provisional curated-piece estimates, not validated margin-based prices. Mark must confirm handling, yield, cleaning, packing, and margins before adopting them as sale prices. Existing inventory prices are unchanged.

## Supplier benchmarks

- [Second 2 Nature — real driftwood](https://www.second2nature.com/Driftwood-Real_c_1834.html): mostly Louisiana cypress; listings $16 for 8–14in, $20 for 15–18in, $24 for 19–24in, $28 for 25–30in, $32 for 31–36in. Approximate selected dimensions; use in fish, bird, and small-animal displays.
- [Jim Allred — driftwood](https://jimallred.com/product/driftwood/): weathered cedar, including flat-backed wall forms. Listing range $14.95–125.95 spans individual options AND a six-piece assortment (two small, three medium, one large). The upper price must not be presented as a single-piece comparison.
- [McKenzie NW422](https://www.mckenzietaxidermy.com/NW422-P16654.aspx): artificial flat-backed driftwood, 17.5 × 12 × 4in, $37.60; related artificial examples $33.95–56.40. Artificial forms are a separate alternative, not direct natural-wood equivalents.
- [Matuska driftwood](https://shop.matuskataxidermy.com/driftwood/): applications include fish, birds, and larger dioramas.

## Proposed guide

| Wood length | Application | Tentative USD wood-only estimate |
| --- | --- | --- |
| 8–14in | Small accents | $18–30 |
| 15–24in | Fish / bird displays | $30–55 |
| 25–36in | Small-mammal habitat | $55–95 |
| Over 36in | Large habitat / dioramas | Individual quote |

Ranges apply to typical/simple forms; selected sculptural roots and individually photographed specimens can cost more (including the existing $145 taxidermy listing). A premium over bulk catalog wood is a hypothesis based on shape selection and project fit, not established demand. Shipping is separate. Larger animal displays need individual mounting and support assessment by the studio; do not market driftwood as a complete structural mounting system.

## Studio supply

Mixed assortments have precedent; fixed subscriptions, minimum orders, and exclusivity terms do not yet exist here. Collect the studio’s quantity per period, monthly/quarterly/as-needed cadence, preferred dimensions and shapes, display species, destination, timing, and optional interest in exclusive supply. Agree availability and terms individually. Worldwide inquiries are welcome; destination eligibility, requirements, and freight costs must be checked before confirming an order.

## Inquiry operation

`/api/taxidermy-inquiries` follows the landscape email route using `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, and `WHOLESALE_APPLICATION_ALERT_EMAIL`. It only reports success after the mail provider accepts the request. It stores no database record and needs no migration. Unconfigured delivery returns 503 with an explicit unsent message; form input is retained for retry. The in-memory rate limit is best-effort per process, not a distributed production spam defense.

## Hero provenance

Generated with built-in image_gen; saved as `public/assets/sections/taxidermy/bass-driftwood-hero-v2.png`. Prompt: “Wide cinematic website hero. Extreme close-up premium taxidermy largemouth bass display, mouth fully open toward camera, prominently emerging above sculptural gnarled river driftwood. Hyperreal tactile wood grain, barkless silver brown twisting roots and olive gold fish scales, restrained warm directional studio lighting. Animal and wood occupy right two-thirds; left third black negative space for page heading. All outer edges dissolve irregularly into pure black with organic jagged scattered shadows; looks like the bass and driftwood emerge suddenly from darkness. Museum-quality staged taxidermy display inspiration, no water, no text, no logos, no people.” Original assets preserved. Other display images are illustrative, not products or included mounts.
