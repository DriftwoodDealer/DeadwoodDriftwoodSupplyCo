import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/portal/product-card";
import { TreatmentProcess } from "@/components/portal/treatment-process";
import { SectorHero } from "@/components/sector/SectorHero";
import { SectorTierStack } from "@/components/sector/SectorTierStack";
import type { SectorStorefrontConfig } from "@/lib/sector-storefront-config";
import type { InventoryItem } from "@/lib/mock-inventory";
import styles from "@/components/portal/reptile-page.module.css";

export interface SectorStorefrontPageProps {
  config: SectorStorefrontConfig;
  items: InventoryItem[];
  treatmentComponent?: React.ReactNode;
  children?: React.ReactNode;
}

export function SectorStorefrontPage({
  config,
  items,
  treatmentComponent,
  children,
}: SectorStorefrontPageProps) {
  const { hero, tierSection, howToShop, customAndTrade, inventorySection } = config;

  return (
    <main className={styles.page}>
      <SectorHero
        title={hero.title}
        desktopImage={hero.desktopImage}
        mobileImage={hero.mobileImage}
        alt={hero.alt}
      />

      <div className={styles.interiorWrapper}>
        <SectorTierStack
          tiers={tierSection.tiers}
          eyebrow={tierSection.eyebrow}
          title={tierSection.title}
          subhead={tierSection.subhead}
          sectorSlug={config.slug}
        />

        {howToShop && (
          <section className={styles.howToShop} aria-labelledby="sector-how-to-shop">
            <div className={styles.howIntro}>
              <div>
                <p className="eyebrow">{howToShop.eyebrow}</p>
                <h2 id="sector-how-to-shop">{howToShop.title}</h2>
              </div>
              <p>{howToShop.intro}</p>
            </div>
            <div className={styles.howSteps}>
              {howToShop.steps.map((step) => (
                <div key={step.number}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className={styles.treatmentSection}>
          {treatmentComponent || <TreatmentProcess />}
        </div>

        {customAndTrade && (
          <section className={styles.partnerSection} aria-labelledby="partner-heading">
            <div>
              <p className="eyebrow">{customAndTrade.customEyebrow || "Custom & Trade"}</p>
              <h2 id="partner-heading">{customAndTrade.customTitle}</h2>
              <p>{customAndTrade.customBody}</p>
              <Link className={styles.partnerButton} href={customAndTrade.customHref}>
                {customAndTrade.customButtonText}
              </Link>
            </div>
            <div>
              <p className="eyebrow">{customAndTrade.tradeEyebrow || "Recurring Supply"}</p>
              <h3>{customAndTrade.tradeTitle}</h3>
              <p>{customAndTrade.tradeBody}</p>
              <Link className={styles.partnerButton} href={customAndTrade.tradeHref}>
                {customAndTrade.tradeButtonText}
              </Link>
            </div>
          </section>
        )}

        {children}

        {inventorySection && (
          <section className={styles.inventory} aria-labelledby="featured-forms">
            <div className={styles.inventoryHeader}>
              <div>
                <p className="eyebrow">{inventorySection.eyebrow}</p>
                <h2 id="featured-forms" className="product-title">
                  {inventorySection.title}
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
        )}
      </div>
    </main>
  );
}
