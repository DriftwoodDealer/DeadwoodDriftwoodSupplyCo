import type { SectorSlug } from "@/lib/mock-inventory";
import { sizeClasses, type SizeClassEntry } from "@/lib/mock-inventory";

export type SectorTier = Omit<SizeClassEntry, "name"> & { name: string } & {
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
    mobileImage: "/assets/reptile/reptile_mobile_hero_fitted.jpg",
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

const landscapeHeroImage = "/assets/sections/landscaping/ChatGPT%20Image%20May%2017,%202026,%2006_03_56%20PM.png";

export const landscapingStorefrontConfig: SectorStorefrontConfig = {
  slug: "landscaping",
  sectorName: "Landscape Driftwood",
  hero: {
    title: "River-worn driftwood for the landscape",
    desktopImage: "/assets/landscaping/gg.png",
    alt: "River-worn driftwood with a personalized plaque against a light background",
  },
  statement: {
    eyebrow: "One of a kind. Shaped by the river.",
    headline: "GIVE YOUR LANDSCAPE A PIECE OF THE RIVER.",
  },
  tierSection: {
    eyebrow: "Landscape Scale Guide",
    title: "Find the right form for your space.",
    subhead:
      "Browse by approximate overall length. Every piece is naturally formed, so check its individual length, height, depth, and weight before choosing.",
    tiers: [
      {
        name: "Garden Accent",
        slug: "garden-accent",
        scale: "Small focal detail",
        range: "Under 24 inches long",
        image: "/assets/images/river.png",
        behavior: "browse",
        bestFor: "Planters, compact beds, and smaller outdoor vignettes.",
        description: "A smaller river form that adds a natural detail without taking over the space.",
        metadata: { minLength: 0, maxLength: 24 },
      },
      {
        name: "Garden Form",
        slug: "garden-form",
        scale: "Grounded feature",
        range: "24–36 inches long",
        image: landscapeHeroImage,
        behavior: "browse",
        bestFor: "Garden beds, pathways, and entry accents.",
        description: "A versatile size for a visible natural focal point in a garden or entry.",
        metadata: { minLength: 24, maxLength: 36 },
      },
      {
        name: "Statement Root",
        slug: "statement-root",
        scale: "Large focal feature",
        range: "36–60 inches long",
        image: "/assets/images/deadwood-hero.png",
        behavior: "browse",
        bestFor: "Larger beds, water-feature surrounds, and landscape focal points.",
        description: "A substantial form with room for its branches, curves, and natural silhouette to lead.",
        metadata: { minLength: 36, maxLength: 60 },
      },
      {
        name: "Estate Form",
        slug: "estate-form",
        scale: "Oversized natural landmark",
        range: "60+ inches long",
        image: "/assets/images/DeadwoodTREEEz.png",
        behavior: "browse",
        bestFor: "Large properties, commercial landscapes, and site-specific requests.",
        description: "An oversized piece that needs a careful look at dimensions, access, and delivery.",
        metadata: { minLength: 60 },
      },
    ],
  },
  howToShop: {
    eyebrow: "Choosing a Piece",
    title: "Measure the space. Then follow the form.",
    intro:
      "A driftwood piece can sit in more than one orientation. Start with the space you have, then consider how the wood’s shape will read there.",
    steps: [
      { number: "01", title: "Measure the footprint", body: "Note the available length, depth, and the height you want the piece to reach." },
      { number: "02", title: "Picture its placement", body: "Consider the natural balance, support points, access, and how the piece will be viewed." },
      { number: "03", title: "Check the details", body: "Review exact dimensions, weight, delivery needs, and any plaque or house-number options." },
    ],
  },
  customAndTrade: {
    customEyebrow: "Custom Requests",
    customTitle: "Looking for a particular shape?",
    customBody: "Tell us about the space and the form you have in mind. We can keep an eye out during future river walks.",
    customButtonText: "Request a Landscape Piece",
    customHref: "#landscape-inventory",
    tradeEyebrow: "For Landscape Professionals",
    tradeTitle: "Need driftwood for upcoming projects?",
    tradeBody: "Tell us about your work, the sizes you use, and how often you source. We’ll talk through availability and delivery options.",
    tradeButtonText: "Ask About Ongoing Supply",
    tradeHref: "#landscape-supply",
  },
  inventorySection: {
    eyebrow: "One-of-a-kind pieces",
    title: "Available Landscape Driftwood",
  },
};
