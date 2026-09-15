import type { SectorSlug } from "@/lib/mock-inventory";
import { sizeClasses, type SizeClassEntry } from "@/lib/mock-inventory";

export type SectorTier = SizeClassEntry & {
  panoramic?: boolean;
  pageHref?: string;
  metadata?: Record<string, string | number | boolean | undefined>;
};

export type SectorStorefrontConfig = {
  slug: SectorSlug;
  sectorName: string;
  hero: {
    title: string;
    desktopImage: string;
    mobileImage?: string;
    alt: string;
  };
  statement?: {
    eyebrow: string;
    headline: string;
  };
  tierSection: {
    eyebrow: string;
    title: string;
    subhead: string;
    tiers: SectorTier[];
  };
  howToShop: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: Array<{ number: string; title: string; body: string }>;
  };
  customAndTrade: {
    customEyebrow?: string;
    customTitle: string;
    customBody: string;
    customButtonText: string;
    customHref: string;
    tradeEyebrow?: string;
    tradeTitle: string;
    tradeBody: string;
    tradeButtonText: string;
    tradeHref: string;
  };
  inventorySection: {
    eyebrow: string;
    title: string;
  };
};

export const reptileStorefrontConfig: SectorStorefrontConfig = {
  slug: "reptile",
  sectorName: "Reptile & Bioactive",
  hero: {
    title: "Reptiles & Bioactive Driftwood — Living Enclosures",
    desktopImage: "/assets/reptile/LIVING%20ENCLOSURES.jpg",
    mobileImage: "/assets/reptile/reptile_mobile_landing.jpg",
    alt: "Living Enclosures — Reptiles and Bioactive. Wood should feel like the environment is built around it.",
  },
  statement: {
    eyebrow: "Naturally formed. Carefully chosen.",
    headline: "HAND PICKED FOR THEIR WORLD",
  },
  tierSection: {
    eyebrow: "Scale & Dimensions",
    title: "Choose by enclosure scale.",
    subhead:
      "The Missouri River archive catalogued by habitat presence — from tight desktop bioactive builds to room-defining museum centerpieces.",
    tiers: sizeClasses.map((tier) => ({
      ...tier,
      panoramic: tier.slug === "tree-xxxl",
      pageHref: tier.slug === "tree-xxxl" ? "/size-guide/tree-xxxl" : undefined,
    })),
  },
  howToShop: {
    eyebrow: "How to Shop",
    title: "Choose the form, then place it well.",
    intro:
      "Every sector has a different relationship to the river archive. Start with the use, then let the piece lead.",
    steps: [
      {
        number: "01",
        title: "Choose the scale",
        body: "Start with the enclosure presence: Nano through Tree XXXL.",
      },
      {
        number: "02",
        title: "Study the form",
        body: "Look for climbing line, shelter, silhouette, and negative space.",
      },
      {
        number: "03",
        title: "Confirm the fit",
        body: "Dimensions and treatment notes are listed before a piece leaves the archive.",
      },
    ],
  },
  customAndTrade: {
    customEyebrow: "Custom & Trade",
    customTitle: "Need more than a few pieces?",
    customBody:
      "Explore our custom sourcing, bulk tiers, and commercial partner program. Approved bulk orders receive preferred pricing compared with standard individual-piece rates.",
    customButtonText: "Explore Custom Sourcing",
    customHref: "/custom-requests",
    tradeEyebrow: "Recurring Supply",
    tradeTitle: "Built for shops that need a steady flow.",
    tradeBody:
      "Retailers can inquire about recurring shipments and subscription-style supply agreements with preferred pricing for ongoing commitments.",
    tradeButtonText: "View Wholesale & Subscriptions",
    tradeHref: "/wholesale",
  },
  inventorySection: {
    eyebrow: "Reptile & Bioactive",
    title: "Featured Forms",
  },
};
