"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Anton } from "next/font/google";
import { sizeClasses, type SizeClassEntry, ALL_FORMS_TIER } from "@/lib/mock-inventory";
import { NanoModal } from "./NanoModal";
import { PieceBrowserModal } from "./PieceBrowserModal";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

function SizeGuideStackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierQuery = searchParams?.get("tier");

  const [nanoOpen, setNanoOpen] = useState(false);
  const [browserTier, setBrowserTier] = useState<SizeClassEntry | null>(null);

  useEffect(() => {
    if (tierQuery) {
      if (tierQuery === "nano") {
        setNanoOpen(true);
        setBrowserTier(null);
      } else if (tierQuery === "all") {
        setBrowserTier(ALL_FORMS_TIER);
        setNanoOpen(false);
      } else {
        const matching = sizeClasses.find((t) => t.slug === tierQuery);
        if (matching && matching.behavior === "browse") {
          setBrowserTier(matching);
          setNanoOpen(false);
        }
      }
    } else {
      setNanoOpen(false);
      setBrowserTier(null);
    }
  }, [tierQuery]);

  function handleCardClick(tier: SizeClassEntry) {
    if (tier.behavior === "cart") {
      setNanoOpen(true);
      router.replace("/shop/reptile?tier=" + tier.slug, { scroll: false });
    } else if (tier.behavior === "browse") {
      setBrowserTier(tier);
      router.replace("/shop/reptile?tier=" + tier.slug, { scroll: false });
    }
  }

  function handleCloseBrowser() {
    setBrowserTier(null);
    router.replace("/shop/reptile", { scroll: false });
  }

  function handleCloseNano() {
    setNanoOpen(false);
    router.replace("/shop/reptile", { scroll: false });
  }

  return (
    <>
      <section className="deadwood-tier-section" aria-labelledby="reptile-tier-heading">
        <div className="deadwood-tier-intro">
          <p className="eyebrow">Scale &amp; Dimensions</p>
          <h2 id="reptile-tier-heading" className="deadwood-tier-heading">
            Choose by enclosure scale.
          </h2>
          <p className="deadwood-tier-subhead">
            The Missouri River archive catalogued by habitat presence — from tight desktop bioactive builds to room-defining museum centerpieces.
          </p>
        </div>

        <div className="deadwood-tier-stack">
          {sizeClasses.map((tier) => {
            const isTree = tier.slug === "tree-xxxl";
            const isCart = tier.behavior === "cart";

            const cardBody = (
              <div className={`tier-card-inner ${isTree ? "tier-card-inner-panoramic" : ""}`}>
                <div className="tier-card-copy">
                  <span className="tier-card-range">{tier.range}</span>
                  <h3 className={`${anton.className} tier-card-title`}>{tier.name}</h3>
                  <p className="tier-card-desc">{tier.description}</p>
                  <div className="tier-card-action">
                    <span className="tier-card-btn">
                      {isCart && `Add to Cart — $${tier.priceFrom}`}
                      {tier.behavior === "browse" && "Browse Available Pieces →"}
                      {isTree && "Nationwide Delivery & White-Glove Setup →"}
                    </span>
                  </div>
                </div>

                <div className={`tier-card-visual ${isTree ? "tier-card-visual-panoramic" : ""}`}>
                  <Image
                    src={tier.image}
                    alt={`${tier.name} driftwood enclosure demonstration`}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className={`tier-card-img ${isTree ? "tier-card-img-panoramic" : ""}`}
                  />
                  <div className="tier-card-visual-fade" />
                </div>
              </div>
            );

            if (isTree) {
              return (
                <Link
                  key={tier.slug}
                  href="/size-guide/tree-xxxl"
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
            onClick={() => handleCardClick(ALL_FORMS_TIER)}
            aria-label="Browse all active driftwood forms across sizes"
          >
            Browse All Forms
          </button>
        </div>
      </section>

      <NanoModal
        isOpen={nanoOpen}
        onClose={handleCloseNano}
        tier={sizeClasses[0]}
      />

      <PieceBrowserModal
        tier={browserTier}
        onClose={handleCloseBrowser}
      />
    </>
  );
}

export function SizeGuideStack() {
  return (
    <Suspense fallback={null}>
      <SizeGuideStackContent />
    </Suspense>
  );
}
