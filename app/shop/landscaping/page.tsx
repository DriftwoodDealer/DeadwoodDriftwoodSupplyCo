import Image from "next/image";
import { LandscapeInquiry } from "@/components/landscaping/LandscapeInquiry";
import { ProductCard } from "@/components/portal/product-card";
import { SectorTierStack } from "@/components/sector/SectorTierStack";
import styles from "@/components/sector/landscaping-page.module.css";
import { getInventoryBySector } from "@/lib/inventory-data";
import { getSectorBySlug } from "@/lib/mock-inventory";
import { getLandscapeSizeName } from "@/lib/landscape-sizing";
import { landscapingStorefrontConfig as config } from "@/lib/sector-storefront-config";

export default async function LandscapingShopPage() {
  const sector = getSectorBySlug("landscaping");
  if (!sector) return null;
  const items = await getInventoryBySector(sector);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="landscape-hero-title">
        <Image
          src={config.hero.desktopImage}
          alt={config.hero.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className="eyebrow">{config.statement?.eyebrow}</p>
          <h1 id="landscape-hero-title">{config.statement?.headline}</h1>
          <p>
            One-of-a-kind driftwood forms, shaped by the Missouri River and ready to bring
            natural character to a garden, entry, or outdoor space. We supply the wood;
            placement is arranged by you.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.heroAction} href="#landscape-inventory">Browse available pieces <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <div className={styles.inside}>
        <SectorTierStack
          eyebrow={config.tierSection.eyebrow}
          title={config.tierSection.title}
          subhead={config.tierSection.subhead}
          tiers={config.tierSection.tiers}
          sectorSlug="landscaping"
          inventory={items}
        />

        <section className={styles.howSection} aria-labelledby="landscape-how-title">
          <div className={styles.sectionIntro}>
            <div>
              <p className="eyebrow">{config.howToShop.eyebrow}</p>
              <h2 id="landscape-how-title">{config.howToShop.title}</h2>
            </div>
            <p>{config.howToShop.intro}</p>
          </div>
          <div className={styles.steps}>
            {config.howToShop.steps.map((step) => (
              <article className={styles.step} key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.careCard} aria-labelledby="landscape-care-title">
          <span className={styles.careIcon} aria-hidden="true">◇</span>
          <div className={styles.careCopy}>
            <p className="eyebrow">A note on outdoor care</p>
            <h2 id="landscape-care-title">Natural wood keeps changing.</h2>
            <p>
              Driftwood will continue to weather outdoors. For the longest life, keep it
              raised off soil and out of standing water.
            </p>
          </div>
        </section>

        <section className={styles.inventory} id="landscape-inventory" aria-labelledby="landscape-inventory-title">
          <div className={styles.inventoryHeader}>
            <div>
              <p className="eyebrow">{config.inventorySection.eyebrow}</p>
              <h2 id="landscape-inventory-title">{config.inventorySection.title}</h2>
            </div>
          </div>
          <div className={styles.inventoryGrid}>
            {items.map((item) => <ProductCard key={item.id} item={item} sizeLabel={getLandscapeSizeName(item.dimensions)} />)}
          </div>
          <LandscapeInquiry card />
        </section>

        <section className={styles.business} id="landscape-supply" aria-labelledby="landscape-supply-title">
          <div className={styles.businessCopy}>
            <p className="eyebrow">For landscape professionals</p>
            <h2 id="landscape-supply-title">A river source for your next project.</h2>
            <p>
              Tell us what kinds of pieces you use and how often you source. We’ll talk
              through availability, delivery, and whether ongoing supply makes sense for
              your work. No commitment required.
            </p>
          </div>
          <LandscapeInquiry type="ongoing-supply" />
        </section>
      </div>
    </main>
  );
}
