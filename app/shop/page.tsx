import { ProductCard } from "@/components/portal/product-card";
import {
  getFeaturedInventory,
  getInventoryBySector,
  getPublishedInventory,
  getVaultInventory,
  sectors
} from "@/lib/inventory-data";
import { sizeClasses } from "@/lib/mock-inventory";
import Link from "next/link";

export default async function ShopPage() {
  const [items, featuredItems, vaultItems] = await Promise.all([
    getPublishedInventory(),
    getFeaturedInventory(),
    getVaultInventory()
  ]);
  const sectorItems = await Promise.all(sectors.map((sector) => getInventoryBySector(sector)));

  return (
    <section className="page-shell">
      <div className="shop-hero">
        <div>
          <p className="eyebrow">Missouri River Relics</p>
          <h1 className="section-heading">Premium Driftwood, Treated Like Natural Sculpture</h1>
        </div>
        <p className="section-copy">
          Built for bioactive reptile spaces, sculptural interiors, taxidermy staging,
          estate hardscapes, and collectors who care where the piece came from.
        </p>
      </div>

      <nav className="sector-nav glass-panel" aria-label="Shop sections">
        {sectors.map((sector) => (
          <Link key={sector.slug} href={`/shop/${sector.slug}`}>
            <span>{sector.eyebrow}</span>
            {sector.name}
          </Link>
        ))}
        <Link href="/wholesale">
          <span>Verified Trade</span>
          Wholesale
        </Link>
        <Link href="/custom-requests">
          <span>Custom Sourcing</span>
          Requests
        </Link>
      </nav>

      <section className="store-section" aria-labelledby="featured-heading">
        <div className="section-bar">
          <div>
            <p className="eyebrow">Featured Pieces</p>
            <h2 id="featured-heading" className="product-title">
              Three river finds worth slowing down for.
            </h2>
          </div>
          <span className="section-note">Phase 1 static preview</span>
        </div>

        <div className="featured-grid">
          {featuredItems.map((item, index) => (
            <article key={item.id} className="featured-piece glass-panel">
              <span className="feature-number">0{index + 1}</span>
              <p className="product-kicker">{item.sector}</p>
              <h3>{item.title}</h3>
              <p>{item.bestFor}</p>
              <Link className="button primary" href={`/shop/${item.slug}`}>
                Request Quote
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="store-section" aria-labelledby="size-heading">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Reptile & Bioactive Scale</p>
            <h2 id="size-heading" className="section-heading">
              Browse by enclosure presence, not just price.
            </h2>
          </div>
          <p className="section-copy">
            These classes become CMS fields later, so the future tank preview tool can
            reason about fit before a customer falls in love with the wrong piece.
          </p>
        </div>

        <div className="size-grid">
          {sizeClasses.map((sizeClass) => (
            <article key={sizeClass.name} className="size-card">
              <span>{sizeClass.scale}</span>
              <h3>{sizeClass.name}</h3>
              <p>{sizeClass.description}</p>
              <strong>{sizeClass.bestFor}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="store-section" aria-labelledby="vault-heading">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">The Vault</p>
            <h2 id="vault-heading" className="section-heading">
              Rare pieces get the gallery treatment.
            </h2>
          </div>
          <p className="section-copy">
            Vault pieces are the standout forms: extra photos, optional video, GPS when it
            makes sense, and a richer detail view when the backend is ready. Select art
            pieces can carry engraved provenance with latitude, longitude, and river notes.
          </p>
        </div>

        <div className="vault-grid">
          {vaultItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="store-section" aria-labelledby="sector-heading">
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">Curated Sectors</p>
            <h2 id="sector-heading" className="section-heading">
              Different buyers need different river forms.
            </h2>
          </div>
          <p className="section-copy">
            The storefront stays curated instead of becoming a generic filter wall. Each
            sector gets its own context, language, and product rhythm.
          </p>
        </div>

        <div className="sector-sections">
          {sectors.map((sector, index) => {
            return (
              <article key={sector.slug} id={sector.slug} className="sector-section">
                <div className="sector-copy">
                  <p className="eyebrow">{sector.eyebrow}</p>
                  <h3>{sector.name}</h3>
                  <p>{sector.description}</p>
                  <Link className="button" href={`/shop/${sector.slug}`}>
                    {sector.cta}
                  </Link>
                </div>

                <div className="sector-products">
                  {sectorItems[index].slice(0, 2).map((item) => (
                    <ProductCard key={item.id} item={item} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="store-section service-grid" aria-label="Requests and wholesale">
        <article className="service-panel glass-panel">
          <p className="eyebrow">Custom Scavenging</p>
          <h2 className="product-title">Tell us what to hunt for.</h2>
          <p className="section-copy">
            Taxidermy and landscape buyers will be able to submit length, width, shape,
            use case, and reference notes. Those requests become a field lookout list.
          </p>
          <a className="button" href="/custom-requests">
            Request Form Preview
          </a>
        </article>

        <article className="service-panel glass-panel">
          <p className="eyebrow">Verified Wholesale</p>
          <h2 className="product-title">Bulk access is earned, not open.</h2>
          <p className="section-copy">
            Shops will need business verification before private pricing, recurring
            shipments, contract tiers, and larger discounts are visible.
          </p>
          <a className="button" href="/wholesale">
            Verification Preview
          </a>
        </article>
      </section>

      <section className="store-section" aria-labelledby="catalog-heading">
        <div className="section-bar">
          <div>
            <p className="eyebrow">River Archive</p>
            <h2 id="catalog-heading" className="product-title">
              Current published inventory
            </h2>
          </div>
        </div>

        <div className="grid">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </section>
  );
}
