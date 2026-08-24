import Image from "next/image";
import Link from "next/link";
import ReptileScaleGrid from "@/components/ReptileScaleGrid";
import { ProductCard } from "@/components/portal/product-card";
import { TreatmentProcess } from "@/components/portal/treatment-process";
import { getInventoryBySector } from "@/lib/inventory-data";
import { getSectorBySlug } from "@/lib/mock-inventory";
import { sectorConfig } from "@/lib/sector-config";
import styles from "@/components/portal/reptile-page.module.css";

export default async function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");
  if (!sector) return null;

  const items = await getInventoryBySector(sector);
  const steps = sectorConfig.reptile.howToShopSteps;

  return (
    <main className={styles.page}>
      <div className={styles.heroWrap}>
        <section className={styles.hero} aria-label="River-worn driftwood hero">
          <Image src="/assets/reptile/hero-gecko-driftwood.png" alt="Crested gecko resting on sculptural river-worn driftwood" fill priority sizes="100vw" className={styles.heroImg} />
          <div className={styles.heroCopy}>
            <p className="eyebrow">{sectorConfig.reptile.hero.eyebrow}</p>
            <h1>{sectorConfig.reptile.hero.title}</h1>
            <p>{sector.description}</p>
          </div>
        </section>
      </div>

      <section className={styles.howToShop} aria-labelledby="reptile-how-to-shop">
        <div className={styles.howIntro}>
          <div><p className="eyebrow">How to Shop</p><h1 id="reptile-how-to-shop">Choose the form, then place it well.</h1></div>
          <p>Every sector has a different relationship to the river archive. Start with the use, then let the piece lead.</p>
        </div>
        <div className={styles.howSteps}>
          {steps.map((step) => <div key={step.number}><span>{step.number}</span><strong>{step.title}</strong><p>{step.body}</p></div>)}
        </div>
      </section>

      <ReptileScaleGrid />
      <div className={styles.treatmentSection}><TreatmentProcess /></div>

      <section className={styles.partnerSection} aria-labelledby="partner-heading">
        <div>
          <p className="eyebrow">Custom &amp; Trade</p>
          <h2 id="partner-heading">Need more than a few pieces?</h2>
          <p>Explore our custom sourcing, bulk tiers, and commercial partner program. Approved bulk orders receive preferred pricing compared with standard individual-piece rates.</p>
          <Link className={styles.partnerButton} href="/custom-requests">Explore Custom Sourcing</Link>
        </div>
        <div>
          <p className="eyebrow">Recurring Supply</p>
          <h3>Built for shops that need a steady flow.</h3>
          <p>Retailers can inquire about recurring shipments and subscription-style supply agreements with preferred pricing for ongoing commitments.</p>
          <Link className={styles.partnerButton} href="/wholesale">View Wholesale &amp; Subscriptions</Link>
        </div>
      </section>

      <section className={styles.inventory} aria-labelledby="featured-forms">
        <div className="section-bar">
          <div><p className="eyebrow">Reptile &amp; Bioactive</p><h2 id="featured-forms" className="product-title">Featured Forms</h2></div>
          <Link className="button" href="/shop">Shop Overview</Link>
        </div>
        <div className={styles.inventoryGrid}>{items.map((item) => <ProductCard key={item.id} item={item} />)}</div>
      </section>
    </main>
  );
}
