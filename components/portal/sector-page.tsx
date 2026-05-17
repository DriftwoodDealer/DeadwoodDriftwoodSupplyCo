import Link from "next/link";
import { ProductCard } from "@/components/portal/product-card";
import { getInventoryBySector, type Sector } from "@/lib/mock-inventory";

type SectorPageProps = {
  sector: Sector;
  children?: React.ReactNode;
};

export function SectorPage({ sector, children }: SectorPageProps) {
  const items = getInventoryBySector(sector);

  return (
    <section className="page-shell">
      <div className="shop-hero">
        <div>
          <p className="eyebrow">{sector.eyebrow}</p>
          <h1 className="section-heading">{sector.name}</h1>
        </div>
        <p className="section-copy">{sector.description}</p>
      </div>

      {children}

      <section className="store-section" aria-labelledby={`${sector.slug}-inventory`}>
        <div className="section-bar">
          <div>
            <p className="eyebrow">Available Forms</p>
            <h2 id={`${sector.slug}-inventory`} className="product-title">
              Current {sector.name} inventory
            </h2>
          </div>
          <Link className="button" href="/shop">
            Shop Overview
          </Link>
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
