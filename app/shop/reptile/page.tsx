import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/portal/product-card";
import { ReptileTierCards } from "@/components/portal/reptile-tier-cards";
import { TreatmentProcess } from "@/components/portal/treatment-process";
import { getInventoryBySector, getSectorBySlug } from "@/lib/mock-inventory";
import styles from "@/components/portal/reptile-page.module.css";

export default function ReptileShopPage() {
  const sector = getSectorBySlug("reptile");

  if (!sector) {
    return null;
  }

  const items = getInventoryBySector(sector);

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-label="River-worn driftwood hero">
        <Image
          src="/assets/reptile/deadwoodReptileHero.png"
          alt="River-worn driftwood hero artwork"
          width={2880}
          height={1620}
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
      </section>

      <ReptileTierCards />

      <TreatmentProcess />

      <section className={styles.inventory} aria-labelledby="reptile-inventory">
        <div className="section-bar">
          <div>
            <p className="eyebrow">Available Forms</p>
            <h2 id="reptile-inventory" className="product-title">
              Current {sector.name} inventory
            </h2>
          </div>
          <Link className="button" href="/shop">
            Shop Overview
          </Link>
        </div>

        <div className={styles.inventoryGrid}>
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className={styles.divider} aria-label="River-worn driftwood forms">
        <video
          className={styles.dividerVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="River-worn driftwood forms"
        >
          <source src="/assets/dividers/deadwoodReptile.mp4" type="video/mp4" />
        </video>
      </section>
    </main>
  );
}
