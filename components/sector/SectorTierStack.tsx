"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Anton } from "next/font/google";
import type { SectorTier } from "@/lib/sector-storefront-config";
import { ALL_FORMS_TIER } from "@/lib/mock-inventory";
import { NanoModal } from "@/components/size-guide/NanoModal";
import { PieceBrowserModal } from "@/components/size-guide/PieceBrowserModal";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

type SectorTierStackProps = {
  eyebrow: string;
  title: string;
  subhead: string;
  tiers: SectorTier[];
  sectorSlug?: string;
};

function SectorTierStackContent({
  eyebrow,
  title,
  subhead,
  tiers,
  sectorSlug = "reptile",
}: SectorTierStackProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierQuery = searchParams?.get("tier");

  const [nanoOpen, setNanoOpen] = useState(false);
  const [browserTier, setBrowserTier] = useState<SectorTier | null>(null);

  useEffect(() => {
    if (tierQuery) {
      if (tierQuery === "nano") {
        setNanoOpen(true);
        setBrowserTier(null);
      } else if (tierQuery === "all") {
        setBrowserTier(ALL_FORMS_TIER as SectorTier);
        setNanoOpen(false);
      } else {
        const matching = tiers.find((t) => t.slug === tierQuery);
        if (matching && matching.behavior === "browse") {
          setBrowserTier(matching);
          setNanoOpen(false);
        }
      }
    } else {
      setNanoOpen(false);
      setBrowserTier(null);
    }
  }, [tierQuery, tiers]);

  function handleCardClick(tier: SectorTier) {
    if (tier.behavior === "cart") {
      setNanoOpen(true);
      router.replace(`/shop/${sectorSlug}?tier=${tier.slug}`, { scroll: false });
    } else if (tier.behavior === "browse") {
      setBrowserTier(tier);
      router.replace(`/shop/${sectorSlug}?tier=${tier.slug}`, { scroll: false });
    }
  }

  function handleCloseBrowser() {
    setBrowserTier(null);
    router.replace(`/shop/${sectorSlug}`, { scroll: false });
  }

  function handleCloseNano() {
    setNanoOpen(false);
    router.replace(`/shop/${sectorSlug}`, { scroll: false });
  }

  const nanoTier = tiers.find((t) => t.behavior === "cart") || tiers[0];

  return (
    <>
      <section className="deadwood-tier-section" aria-labelledby="sector-tier-heading">
        <div className="deadwood-tier-intro">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="sector-tier-heading" className="deadwood-tier-heading">
            {title}
          </h2>
          <p className="deadwood-tier-subhead">{subhead}</p>
        </div>

        <div className="deadwood-tier-stack">
          {tiers.map((tier) => {
            const isPage = tier.behavior === "page" || Boolean(tier.pageHref);
            const isCart = tier.behavior === "cart";
            const isPanoramic = Boolean(tier.panoramic);

            const cardBody = (
              <div className={`tier-card-inner ${isPanoramic ? "tier-card-inner-panoramic" : ""}`}>
                <div className="tier-card-copy">
                  <span className="tier-card-range">{tier.range}</span>
                  <h3 className={`${anton.className} tier-card-title`}>{tier.name}</h3>
                  <p className="tier-card-desc">{tier.description}</p>
                  <div className="tier-card-action">
                    <span className="tier-card-btn">
                      {isCart && `Add to Cart — $${tier.priceFrom || 25}`}
                      {tier.behavior === "browse" && "Browse Available Pieces →"}
                      {isPage && "Nationwide Delivery & White-Glove Setup →"}
                    </span>
                  </div>
                </div>

                <div className={`tier-card-visual ${isPanoramic ? "tier-card-visual-panoramic" : ""}`}>
                  <Image
                    src={tier.image}
                    alt={`${tier.name} demonstration`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className={`tier-card-img ${isPanoramic ? "tier-card-img-panoramic" : ""}`}
                  />
                  <div className="tier-card-visual-fade" />
                </div>
              </div>
            );

            if (isPage && tier.pageHref) {
              return (
                <Link
                  key={tier.slug}
                  href={tier.pageHref}
                  className="tier-card tier-card-panoramic-wrap tier-card-link"
                  aria-label={`${tier.name} — ${tier.range}. View dedicated service page.`}
                >
                  {cardBody}
                </Link>
              );
            }

            return (
              <button
                key={tier.slug}
                type="button"
                className="tier-card tier-card-button"
                onClick={() => handleCardClick(tier)}
                aria-label={`${tier.name} — ${tier.range}. ${isCart ? "Open cart modal" : "Browse matching inventory"}`}
              >
                {cardBody}
              </button>
            );
          })}
        </div>

        <div className="deadwood-tier-all-forms">
          <button
            type="button"
            className="deadwood-browse-all-btn"
            onClick={() => handleCardClick(ALL_FORMS_TIER as SectorTier)}
            aria-label="Browse all active driftwood forms across sizes"
          >
            Browse All Forms
          </button>
        </div>
      </section>

      {nanoTier && (
        <NanoModal
          isOpen={nanoOpen}
          onClose={handleCloseNano}
          tier={nanoTier}
        />
      )}

      <PieceBrowserModal
        tier={browserTier}
        onClose={handleCloseBrowser}
      />
    </>
  );
}

export function SectorTierStack(props: SectorTierStackProps) {
  return (
    <Suspense fallback={null}>
      <SectorTierStackContent {...props} />
    </Suspense>
  );
}
