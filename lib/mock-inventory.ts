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
  sizeClass: SizeClass;
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
};

export const sizeClasses: Array<{
  name: SizeClass;
  scale: string;
  bestFor: string;
  description: string;
}> = [
  {
    name: "Nano",
    scale: "Small accents",
    bestFor: "Nano tanks, juvenile enclosures, terrarium accents, and shelf displays.",
    description:
      "Small river-worn forms selected for tight compositions where texture matters more than mass."
  },
  {
    name: "Medium",
    scale: "Everyday centerpiece",
    bestFor: "Most bioactive builds, aquascapes, mantis habitats, and medium reptile enclosures.",
    description:
      "Balanced pieces with enough shape to anchor a scene without swallowing the enclosure."
  },
  {
    name: "Specimen XL",
    scale: "Statement structure",
    bestFor: "Larger reptile spaces, taxidermy bases, display shelves, and planted hardscapes.",
    description:
      "Distinct silhouettes with stronger branching, arches, cavities, or vertical movement."
  },
  {
    name: "Centerpiece XXL",
    scale: "Room-defining",
    bestFor: "Large enclosures, landscaping installs, lobby displays, and serious collection pieces.",
    description:
      "Heavy, sculptural finds that need measured placement, stronger photography, and shipping review."
  },
  {
    name: "Tree XXXL",
    scale: "Architectural relic",
    bestFor: "Commercial spaces, large landscape installs, museum-style display, and commissioned staging.",
    description:
      "Rare trunk-scale material treated more like natural architecture than ordinary inventory."
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
      "Large river forms for estate gardens, entry moments, water features, commercial interiors, and outdoor sculptural placement.",
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
      "Collector-grade pieces that read as natural sculpture first, with Vault-level photography, video, and provenance when available.",
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
    sectors: ["Taxidermy", "Wholesale"],
    sizeClass: "Specimen XL",
    price: 145,
    status: "published",
    availability: "Available",
    dimensions: "28 in x 9 in x 7 in",
    weight: "7 lb",
    image: "/assets/images/deadwood-hero.png",
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
    image: "/assets/images/deadwood-hero.png",
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
    sector: "Sculptural Relics",
    sectors: ["Sculptural Relics", "Landscaping", "Private Gallery"],
    sizeClass: "Medium",
    price: 310,
    status: "published",
    availability: "Request quote",
    dimensions: "24 in x 14 in x 11 in",
    weight: "10 lb",
    image: "/assets/images/deadwood-hero.png",
    featured: false,
    vault: true,
    hasVideo: true,
    gpsAvailable: false,
    description:
      "Silvered root structure with gallery-grade surface texture and a balanced profile for display or refined hardscape work.",
    provenance: "Held back from standard inventory because the form reads more like sculpture than supply.",
    bioSanctity:
      "Power washed, inspected, and heat treated at 275 degrees for 4+ hours before photography.",
    bestFor: "Fine art display, boutique interiors, planted hardscape, and collector shelving."
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
