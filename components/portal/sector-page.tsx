import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/portal/product-card";
import { getInventoryBySector } from "@/lib/inventory-data";
import type { Sector } from "@/lib/mock-inventory";
import { sectorConfig } from "@/lib/sector-config";

type SectorPageProps = {
  sector: Sector;
  children?: React.ReactNode;
};

export async function SectorPage({ sector, children }: SectorPageProps) {
  const items = await getInventoryBySector(sector);
  const config = sectorConfig[sector.slug];

  return (
    <section className="page-shell">
      <div className="sector-template-hero">
        <Image src={config.hero.image} alt={config.hero.alt} width={1920} height={900} priority />
        <div className="sector-template-hero-copy">
          <p className="eyebrow">{config.hero.eyebrow}</p>
          <h1 className="section-heading">{config.hero.title}</h1>
          <p className="section-copy">{sector.description}</p>
        </div>
      </div>

      <section className="store-section how-to-shop" aria-labelledby={`${sector.slug}-how-to-shop`}>
        <div className="split-intro compact">
          <div>
            <p className="eyebrow">How to Shop</p>
            <h2 id={`${sector.slug}-how-to-shop`} className="section-heading">Choose the form, then place it well.</h2>
          </div>
          <p className="section-copy">Every sector has a different relationship to the river archive. Start with the use, then let the piece lead.</p>
        </div>
        <div className="protocol-steps">
          {config.howToShopSteps.map((step) => <div key={step.number}><span>{step.number}</span><strong>{step.title}</strong><p>{step.body}</p></div>)}
        </div>
      </section>

      <section className="store-section sector-blurb" aria-labelledby={`${sector.slug}-blurb`}>
        <p className="eyebrow">The Archive Note</p>
        <h2 id={`${sector.slug}-blurb`} className="section-heading">{config.blurbTitle}</h2>
        <p className="section-copy">{config.blurbBody}</p>
      </section>

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
