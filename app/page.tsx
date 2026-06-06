import Image from "next/image";
import Link from "next/link";
import { getFeaturedInventory, sectors } from "@/lib/mock-inventory";
import { ProductCard } from "@/components/portal/product-card";

export default function HomePage() {
  const featuredItems = getFeaturedInventory();

  return (
    <>
      <section className="hero-stage home-hero">
        <div className="hero-image-band">
          <Image
            src="/assets/images/DEADWOODdark.png"
            alt="Deadwood driftwood hero artwork"
            width={3344}
            height={1882}
            priority
          />
        </div>
      </section>

      <section className="page-shell home-entry">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Choose The Terrain</p>
            <h2 className="section-heading">Four ways into the river archive.</h2>
          </div>
          <p className="section-copy">
            The same wood can serve different worlds. The catalog is organized by how the
            piece will live after it leaves the river.
          </p>
        </div>

        <div className="home-sector-grid">
          {sectors.map((sector) => (
            <Link key={sector.slug} className="home-sector-card glass-panel" href={`/shop/${sector.slug}`}>
              <span>{sector.eyebrow}</span>
              <h3>{sector.name}</h3>
              <p>{sector.description}</p>
            </Link>
          ))}
        </div>

        <div className="home-service-row">
          <Link className="service-panel glass-panel" href="/wholesale">
            <p className="eyebrow">Verified Trade</p>
            <h3 className="product-title">Wholesale access is gated.</h3>
            <p className="section-copy">
              Private pricing and recurring shipment contracts require business verification.
            </p>
          </Link>

          <Link className="service-panel glass-panel" href="/custom-requests">
            <p className="eyebrow">Custom Sourcing</p>
            <h3 className="product-title">Tell us what you need.</h3>
            <p className="section-copy">
              Tell us what you need, and we will watch the river for it.
            </p>
          </Link>
        </div>

        <section className="store-section" aria-labelledby="home-river-archive">
          <div className="section-bar">
            <div>
              <p className="eyebrow">From The River Archive</p>
              <h2 id="home-river-archive" className="product-title">
                A few pieces worth crossing the room for.
              </h2>
            </div>
            <Link className="button" href="/shop">
              Shop
            </Link>
          </div>

          <div className="grid">
            {featuredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </section>

      <footer className="home-footer" aria-label="Site footer">
        <div className="home-footer-content">
          <div className="home-footer-brand">DEADWOOD: DRIFTWOOD SUPPLY CO. LLC</div>
          <a className="home-footer-email" href="mailto:deadwooddriftwood@gmail.com">
            deadwooddriftwood@gmail.com
          </a>
          <div className="home-footer-links">
            <Link href="/terms">Terms</Link>
            <span aria-hidden="true">|</span>
            <Link href="/privacy">Privacy</Link>
            <span aria-hidden="true">|</span>
            <Link href="/shipping">Shipping</Link>
            <span aria-hidden="true">|</span>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="home-footer-rights">© 2026 DEADWOOD. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}
