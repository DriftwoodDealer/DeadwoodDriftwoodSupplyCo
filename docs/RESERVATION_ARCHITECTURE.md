# Deadwood Reservation Architecture

Status: planning decision record. No reservation or checkout code is included here.

## Decision

Recommend **Option C: Hybrid commerce**.

- NANO and MEDIUM pieces priced from $20–$500: immediate Add to Cart and Stripe Checkout.
- SPECIMEN XL, XXL, and TREE pieces priced above $500: reservation first, then quote/approval and a Stripe payment link or Checkout session.

This matches Deadwood’s two buying rhythms: smaller pieces can be impulse purchases, while large, rare, heavy, or placement-sensitive pieces need a human conversation about freight, fit, and timing.

## Option A — Cart/Checkout first

Flow: Browse → Add to Cart → create short inventory hold → Stripe Checkout → confirm payment → mark sold.

### Advantages

- Familiar buying experience for lower-priced pieces.
- Short path from product discovery to payment.
- Works well for repeatable or easily shipped NANO and MEDIUM pieces.

### Costs and risks

- A cart cannot be treated as ownership; the hold must be server-side and time-limited.
- Stripe success must be reconciled by webhook, not by trusting the browser redirect.
- A one-of-one item can be viewed by many customers at once, so the database must atomically claim it.

### Race-condition rule

Creating a reservation must be one transaction that succeeds only when the product is published, not sold, and has no active unexpired reservation. Two simultaneous requests must result in one reservation and one conflict response. The losing customer sees that the piece is temporarily held or unavailable.

If two people cart the same piece, the first confirmed server-side reservation gets the hold. The second cart cannot proceed to a valid Checkout session for that item. Expired holds release automatically; a paid Stripe session wins and marks the product sold after webhook confirmation.

## Option B — Inquiry/reservation first

Flow: Browse → **Reserve** → 30-minute hold with countdown → checkout or inquiry form → admin approves → Stripe payment link → payment webhook marks sold.

### Advantages

- Fits luxury, high-touch one-of-one sales.
- Gives Deadwood time to review shipping, crating, placement, and customer questions.
- Reduces accidental checkout of a piece that needs freight or custom handling.

### Costs and risks

- More friction for small purchases.
- Requires customer identity/contact collection before payment.
- Requires reliable expiration, countdown, notifications, and admin follow-up.

### Reservation lifecycle

1. Customer selects Reserve.
2. Server atomically creates a 30-minute reservation if the piece is eligible.
3. Customer sees the expiration time and can complete an inquiry or checkout request.
4. Admin receives an internal notification and approves, declines, or asks for more information.
5. Approved reservation receives a Stripe Checkout session or payment link.
6. Stripe webhook confirms payment and marks the piece sold.
7. If the reservation expires without approval/payment, it becomes expired and the product is available again.

Expiration should be enforced by both read-time checks and a scheduled cleanup job. The cleanup job marks expired reservations inactive/expired and sends no customer-facing message unless the product was being actively viewed; the next request sees the item as available.

## Option C — Hybrid recommendation

The hybrid model keeps the storefront elegant while respecting the very different economics of the inventory:

| Inventory class | Typical behavior | Commerce path |
| --- | --- | --- |
| NANO / MEDIUM, $20–$500 | Easy to understand and ship | Add to Cart → short reservation → Stripe Checkout |
| SPECIMEN XL / XXL / TREE, above $500 | Freight, placement, scarcity, higher support | Reserve → 30-minute hold → admin quote/approval → Stripe |

The price threshold is a starting policy, not a permanent truth. CMS should eventually allow an override such as `commerce_mode = instant | reservation | inquiry` for exceptional pieces.

## Reservation data model

The existing `inventory_reservations` table already provides the foundation. The intended business fields are:

| Field | Purpose |
| --- | --- |
| `id` | Unique reservation identifier |
| `product_id` | One-of-one product being held |
| `email` | Customer contact for the hold and follow-up; current schema can derive identity from `user_id`, so this is a planned addition or a server-side profile lookup |
| `user_id` | Optional authenticated customer identity |
| `expires_at` | Hard expiration timestamp; default target is 30 minutes |
| `status` | Planned values: `active`, `expired`, `approved`, `payment_pending`, `completed`, `cancelled` |
| `checkout_session_id` | Stripe linkage once checkout exists |
| `created_at` | Audit timestamp |

The current schema uses `active boolean` and a partial unique index for one active reservation per product. Before implementation, decide whether to retain `active` alongside `status` or replace it with a status-based unique strategy. Do not make this schema change during planning.

## API contract

These are proposed server contracts, not implemented endpoints.

### `POST /api/reserve`

Request:

```json
{ "productId": "uuid", "email": "buyer@example.com" }
```

Success `201`:

```json
{ "reservationId": "uuid", "productId": "uuid", "status": "active", "expiresAt": "ISO-8601" }
```

Conflict `409`: product is already held, sold, unpublished, or otherwise unavailable.

### `POST /api/reserve/release`

Request:

```json
{ "reservationId": "uuid" }
```

Success: idempotently changes an active reservation to `cancelled` and makes the product available. Only the reservation owner, authorized server workflow, or admin may release it.

### `GET /api/reserve/status`

Query: `?productId=uuid` or `?reservationId=uuid`.

Response:

```json
{ "productId": "uuid", "status": "available|held|sold", "expiresAt": "ISO-8601|null" }
```

Do not reveal another customer’s email or personal details.

## Stripe timing

Stripe Checkout is created **only after a reservation is confirmed server-side**. The sequence is:

1. Validate product and create/claim reservation transactionally.
2. Create Stripe Checkout session with the reservation and product IDs in metadata.
3. Keep the reservation active while payment is pending.
4. Treat the Stripe webhook as authoritative for payment.
5. On successful payment, mark reservation completed and product sold in one server-side operation.
6. On checkout expiration, cancellation, or failed payment, release the reservation if it has not otherwise expired.

## Recommendation summary

Choose Option C. It protects the one-of-one inventory from double-selling, preserves a fast path for accessible pieces, and gives high-value driftwood the human handling that the brand and logistics require.
