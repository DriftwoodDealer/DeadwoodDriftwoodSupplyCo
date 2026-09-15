export type InventoryStatus = "draft" | "published" | "sold" | "archived";
export type SizeClass = "Nano" | "Medium" | "Specimen XL" | "Centerpiece XXL" | "Tree XXXL";
export type SectorSlug = "reptile" | "landscaping" | "taxidermy" | "sculptural-relics";

export type Sector = {
  slug: SectorSlug;
  name: string;
  eyebrow: string;
  description: string;
  cta: string;
  aliases: string[];
};

export type InventoryItem = {
  id: string;
  slug: string;
  title: string;
  sector: string;
  sectors: string[];
  sizeClass?: SizeClass | string;
  price: number;
  status: InventoryStatus;
  availability: string;
  dimensions: string;
  weight: string;
  image: string;
  featured: boolean;
  vault: boolean;
  hasVideo: boolean;
  gpsAvailable: boolean;
  description: string;
  provenance: string;
  bioSanctity: string;
  bestFor: string;
  media?: string[];
  videoUrl?: string;
};

export type SizeGuideBehavior = "cart" | "browse" | "page";

export type SizeClassEntry = {
  name: SizeClass;
  slug: string;
  scale: string;
  range: string;
  image: string;
  behavior: SizeGuideBehavior;
  bestFor: string;
  description: string;
  rangeDescription?: string;
  priceFrom?: number;
};

export const SIZE_CLASS_RANGES: Record<string, string> = {
  Nano: "up to 12 inches",
  Medium: "12 to 34 inches",
  "Specimen XL": "24 to 36 inches",
  "Centerpiece XXL": "36 to 60 inches",
  "Tree XXXL": "60 to 80+ inches",
};

export const ALL_FORMS_TIER: SizeClassEntry = {
  name: "Medium" as SizeClass,
  slug: "all",
  scale: "Complete Archive Range",
  range: "12 to 60 inches",
  image: "/assets/reptile/medium.webp",
  behavior: "browse",
  bestFor: "All medium, specimen, and centerpiece installations across living enclosures.",
  description: "Browse the curated active catalog from Medium daily accents all the way to Centerpiece XXL showcase roots.",
};

export const sizeClasses: SizeClassEntry[] = [
  {
    name: "Nano",
    slug: "nano",
    scale: "Small accents",
    range: "up to 12 inches",
    image: "/assets/reptile/nano.webp",
    behavior: "cart",
    priceFrom: 25,
    bestFor: "Nano tanks, juvenile enclosures, terrarium accents, and shelf displays.",
    description:
      "Best for Micro enclosures. Ideal for compact 12x12x12 desktop terrariums, perfect for Mantids, Jumping Spiders and other small invertebrates.",
    rangeDescription:
      "Each Nano piece is hand-selected from the river archive. You won't choose a specific piece — we pick one within the Nano size range that's right for your build. Every piece is cleaned, inspected, and heat-treated before it ships."
  },
  {
    name: "Medium",
    slug: "medium",
    scale: "Everyday centerpiece",
    range: "12 to 34 inches",
    image: "/assets/reptile/medium.webp",
    behavior: "browse",
    bestFor: "Most bioactive builds, aquascapes, mantis habitats, and medium reptile enclosures.",
    description:
      "Ideal for medium enclosures (12–34 inches), offering ample climbing and enrichment for arboreal reptiles and custom vivarium setups."
  },
  {
    name: "Specimen XL",
    slug: "specimen-xl",
    scale: "Statement structure",
    range: "24 to 36 inches",
    image: "/assets/reptile/specimen-xl.webp",
    behavior: "browse",
    bestFor: "Larger reptile spaces, taxidermy bases, display shelves, and planted hardscapes.",
    description:
      "Specimen XL, a statement piece, ideal for large arboreal enclosures, breeder displays and premium custom vivariums."
  },
  {
    name: "Centerpiece XXL",
    slug: "centerpiece-xxl",
    scale: "Room-defining",
    range: "36 to 60 inches",
    image: "/assets/reptile/centerpiece-xxl.webp",
    behavior: "browse",
    bestFor: "Large enclosures, landscaping installs, lobby displays, and serious collection pieces.",
    description:
      "Centerpiece XXL Tree — A true zoo-level statement piece, designed as the focal point for extra-large reptile exhibits and high-end custom vivariums."
  },
  {
    name: "Tree XXXL",
    slug: "tree-xxxl",
    scale: "Architectural relic",
    range: "60 to 80+ inches",
    image: "/assets/reptile/reptile_house_panorama.jpg",
    behavior: "page",
    bestFor: "Commercial spaces, large landscape installs, museum-style display, and commissioned staging.",
    description:
      "Designed for zoo-level exhibits, this XXXL tree enclosure stands 60–80+ inches tall. Ideal for large reptile displays and custom vivarium builds."
  }
];

export const sectors: Sector[] = [
  {
    slug: "reptile",
    name: "Reptile & Bioactive",
    eyebrow: "Living Enclosures",
    description:
      "Scaled by enclosure presence for keepers building misted jungles, desert shelves, planted vivariums, and display tanks.",
    cta: "Browse reptile pieces",
    aliases: ["Reptile", "Aquariums"]
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    eyebrow: "Exterior Hardscape",
    description:
      "Large river forms for estate gardens, entry moments, water features, commercial interiors, and outdoor sculptural placement, with custom plaque options for select installs.",
    cta: "View landscape forms",
    aliases: ["Landscaping"]
  },
  {
    slug: "taxidermy",
    name: "Taxidermy",
    eyebrow: "Mount Staging",
    description:
      "Stable branches, perches, roots, and bases selected for mount composition, shop work, and natural display settings.",
    cta: "View staging pieces",
    aliases: ["Taxidermy"]
  },
  {
    slug: "sculptural-relics",
    name: "Sculptural Relics",
    eyebrow: "Gallery Material",
    description:
      "Collector-grade pieces that read as natural sculpture first, with Vault-level photography, video, and engraved provenance when available.",
    cta: "Enter The Vault",
    aliases: ["Sculptural Relics", "Private Gallery", "Relic Collection"]
  }
];

export const inventoryItems: InventoryItem[] = [
  {
    id: "dw-001",
    slug: "riverbend-centerpiece-root",
    title: "Riverbend Centerpiece Root",
    sector: "Reptile",
    sectors: ["Reptile", "Aquariums", "Relic Collection"],
    sizeClass: "Centerpiece XXL",
    price: 225,
    status: "published",
    availability: "Available",
    dimensions: "34 in x 18 in x 14 in",
    weight: "12 lb",
    image: "/assets/images/deadwood-hero.png",
    media: [
      "/assets/images/deadwood-hero.png",
      "/assets/images/wood_1.png",
      "/assets/images/driftwood_1.png"
    ],
    featured: true,
    vault: true,
    hasVideo: true,
    gpsAvailable: true,
    description:
      "A sculptural Missouri River root mass with arched crawl-throughs, silvered grain, and enough mass to anchor a bioactive enclosure.",
    provenance:
      "Found along a low-water bend south of Cape Girardeau during a late-season river walk.",
    bioSanctity:
      "Power washed, inspected, and heat treated at 275 degrees for 4+ hours before final staging.",
    bestFor: "Large bioactive enclosures, high-visibility reptile displays, and artful planted builds."
  },
  {
    id: "dw-002",
    slug: "taxidermy-perch-branch",
    title: "Taxidermy Perch Branch",
    sector: "Taxidermy",
    sectors: ["Taxidermy", "Reptile", "Wholesale"],
    sizeClass: "Specimen XL",
    price: 145,
    status: "published",
    availability: "Available",
    dimensions: "28 in x 9 in x 7 in",
    weight: "7 lb",
    image: "/assets/images/wood_1.png",
    media: [
      "/assets/images/wood_1.png",
      "/assets/images/driftwood_1.png",
      "/assets/images/deadwood-hero.png"
    ],
    featured: true,
    vault: false,
    hasVideo: false,
    gpsAvailable: false,
    description:
      "Long, weathered branch form with a stable base profile for small mount staging, birds, fish, or reptile display work.",
    provenance:
      "Recovered from packed silt near an exposed bank shelf after river levels dropped.",
    bioSanctity:
      "Power washed, inspected, and heat treated at 275 degrees for 4+ hours before final staging.",
    bestFor: "Taxidermy mounts, perch staging, reptile climbing structure, and shop display work."
  },
  {
    id: "dw-003",
    slug: "estate-river-log-study",
    title: "Estate River Log Study",
    sector: "Landscaping",
    sectors: ["Landscaping", "Sculptural Relics", "Private Gallery"],
    sizeClass: "Tree XXXL",
    price: 850,
    status: "published",
    availability: "Request quote",
    dimensions: "58 in x 22 in x 20 in",
    weight: "86 lb",
    image: "/assets/images/deadwood-hero.png",
    media: [
      "/assets/images/deadwood-hero.png",
      "/assets/images/DeadwoodTREEEz.png"
    ],
    featured: true,
    vault: true,
    hasVideo: true,
    gpsAvailable: true,
    description:
      "Large-format hardscape candidate with architectural presence, intended for estate landscapes, gallery display, or private placement.",
    provenance:
      "Recovered from an exposed bend after a river drop revealed the full trunk profile.",
    bioSanctity:
      "Power washed, inspected, and heat treated at 275 degrees for 4+ hours; freight and placement review required.",
    bestFor: "Landscape installs, private collections, commercial interiors, and sculptural focal points."
  },
  {
    id: "dw-004",
    slug: "nano-river-fork",
    title: "Nano River Fork",
    sector: "Reptile",
    sectors: ["Reptile", "Aquariums"],
    sizeClass: "Nano",
    price: 48,
    status: "published",
    availability: "Available",
    dimensions: "9 in x 5 in x 4 in",
    weight: "1 lb",
    image: "/assets/images/driftwood_1.png",
    media: [
      "/assets/images/driftwood_1.png",
      "/assets/images/wood_1.png"
    ],
    featured: false,
    vault: false,
    hasVideo: false,
    gpsAvailable: false,
    description:
      "Compact forked accent with fine grain and enough negative space to make small enclosures feel intentional.",
    provenance: "Picked from a gravel shelf during a short field scout near Cape Girardeau.",
    bioSanctity: "Power washed, inspected, and heat treated at 275 degrees for 4+ hours.",
    bestFor: "Nano terrariums, juvenile reptile setups, mantis enclosures, and aquascape accent work."
  },
  {
    id: "dw-005",
    slug: "gallery-silver-root",
    title: "Gallery Silver Root",
    sector: "Reptile",
    sectors: ["Reptile", "Sculptural Relics", "Landscaping"],
    sizeClass: "Medium",
    price: 135,
    status: "published",
    availability: "Available",
    dimensions: "24 in x 14 in x 11 in",
    weight: "8 lb",
    image: "/assets/images/wood_1.png",
    media: [
      "/assets/images/wood_1.png",
      "/assets/images/driftwood_1.png",
      "/assets/images/deadwood-hero.png"
    ],
    featured: false,
    vault: true,
    hasVideo: true,
    gpsAvailable: false,
    description:
      "Silvered root structure with natural climb-throughs and a balanced profile for mid-size bioactive terrariums or vivarium hardscapes.",
    provenance: "Held back from standard inventory because the form reads with distinct natural curves.",
    bioSanctity:
      "Power washed, inspected, and heat treated at 275 degrees for 4+ hours before photography.",
    bestFor: "Medium arboreal reptile setups, bioactive vivariums, and display terrariums."
  },
  {
    id: "dw-006",
    slug: "river-bend-arboreal-arch",
    title: "River Bend Arboreal Arch",
    sector: "Reptile",
    sectors: ["Reptile", "Aquariums"],
    sizeClass: "Medium",
    price: 165,
    status: "published",
    availability: "Available",
    dimensions: "26 in x 12 in x 9 in",
    weight: "6 lb",
    image: "/assets/images/driftwood_1.png",
    media: [
      "/assets/images/driftwood_1.png",
      "/assets/images/wood_1.png"
    ],
    featured: true,
    vault: false,
    hasVideo: false,
    gpsAvailable: true,
    description:
      "Naturally hollowed Missouri River archway with deep grain fissures and excellent basking ridges for geckos and climbers.",
    provenance: "Sourced from gravel deposits exposed during late autumn water drop.",
    bioSanctity: "Power washed, sanitized, and oven-cured at 275°F.",
    bestFor: "Arboreal reptile climbing, 18x18x24 and 24x18x36 vivariums."
  },
  {
    id: "dw-007",
    slug: "specimen-split-trunk-tower",
    title: "Specimen Split Trunk Tower",
    sector: "Reptile",
    sectors: ["Reptile", "Taxidermy"],
    sizeClass: "Specimen XL",
    price: 240,
    status: "published",
    availability: "Available",
    dimensions: "32 in x 16 in x 12 in",
    weight: "14 lb",
    image: "/assets/images/deadwood-hero.png",
    media: [
      "/assets/images/deadwood-hero.png",
      "/assets/images/wood_1.png"
    ],
    featured: true,
    vault: true,
    hasVideo: true,
    gpsAvailable: true,
    description:
      "Heavy, statement-grade hardwood relic with multiple diagonal perches and ancient river-worn curves.",
    provenance: "Excavated from natural sandbank archive along the lower Missouri river basin.",
    bioSanctity: "Oven baked at 275°F for 5 hours. Guaranteed pest and mold free.",
    bestFor: "Large arboreal cages, 36+ inch enclosures, and centerpiece displays."
  }
];

export function getPublishedInventory() {
  return inventoryItems.filter((item) => item.status === "published");
}

export function getFeaturedInventory() {
  return getPublishedInventory().filter((item) => item.featured).slice(0, 3);
}

export function getVaultInventory() {
  return getPublishedInventory().filter((item) => item.vault);
}

export function getInventoryBySector(sector: Sector) {
  return getPublishedInventory().filter((item) =>
    item.sectors.some((itemSector) => sector.aliases.includes(itemSector))
  );
}

export function getSectorBySlug(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export function getInventoryBySlug(slug: string) {
  return inventoryItems.find((item) => item.slug === slug);
}
