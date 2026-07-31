import type { SizeClass, InventoryStatus } from "@/lib/mock-inventory";

export type CmsSectionId =
  | "basics"
  | "pricing"
  | "categories"
  | "measurements"
  | "media"
  | "provenance"
  | "bio-sanctity"
  | "shipping"
  | "publishing";

export type CmsSection = {
  id: CmsSectionId;
  eyebrow: string;
  title: string;
  description: string;
};

export type CmsDraftField = {
  label: string;
  value: string;
  helper?: string;
};

export const cmsSections: CmsSection[] = [
  {
    id: "basics",
    eyebrow: "01",
    title: "Basics",
    description: "Core identity fields for the listing and the public slug."
  },
  {
    id: "pricing",
    eyebrow: "02",
    title: "Pricing",
    description: "Price, availability, feature flags, and collection priority."
  },
  {
    id: "categories",
    eyebrow: "03",
    title: "Categories / Spaces",
    description: "Multi-sector placement across reptile, gallery, landscape, or wholesale."
  },
  {
    id: "measurements",
    eyebrow: "04",
    title: "Measurements",
    description: "Dimensions, weight, and the practical shipping footprint."
  },
  {
    id: "media",
    eyebrow: "05",
    title: "Media",
    description: "Hero image, gallery order, alt text, captions, and video references."
  },
  {
    id: "provenance",
    eyebrow: "06",
    title: "Provenance",
    description: "Field notes, origin story, GPS notes, and visual context."
  },
  {
    id: "bio-sanctity",
    eyebrow: "07",
    title: "Bio-Sanctity",
    description: "Treatment process, suitability, and enclosure safety notes."
  },
  {
    id: "shipping",
    eyebrow: "08",
    title: "Shipping",
    description: "Crating, freight, pickup, and handling requirements."
  },
  {
    id: "publishing",
    eyebrow: "09",
    title: "Publishing",
    description: "Draft, review, schedule, publish, archive, and private preview."
  }
];

export const inventoryStatusOptions: Array<{
  value: InventoryStatus;
  label: string;
  note: string;
}> = [
  { value: "draft", label: "Draft", note: "Internal only, not public." },
  { value: "published", label: "Published", note: "Visible on storefront." },
  { value: "sold", label: "Sold", note: "Reserved or completed." },
  { value: "archived", label: "Archived", note: "Held back from active inventory." }
];

export const cmsCategoryOptions = [
  "Reptile",
  "Aquariums",
  "Taxidermy",
  "Landscaping",
  "Relic Collection",
  "Wholesale",
  "Private Gallery"
];

export const cmsSizeOptions: SizeClass[] = [
  "Nano",
  "Medium",
  "Specimen XL",
  "Centerpiece XXL",
  "Tree XXXL"
];

export const cmsDraftFields: Record<CmsSectionId, CmsDraftField[]> = {
  basics: [
    { label: "Title", value: "Riverbend Centerpiece Root" },
    { label: "Slug", value: "riverbend-centerpiece-root", helper: "URL-safe and stable." },
    { label: "Sector", value: "Reptile & Bioactive" },
    { label: "Size class", value: "Centerpiece XXL" }
  ],
  pricing: [
    { label: "Price", value: "$225" },
    { label: "Availability", value: "Available" },
    { label: "Featured", value: "Yes" },
    { label: "Public mode", value: "Quote request" }
  ],
  categories: [
    { label: "Primary spaces", value: "Reptile, Aquariums" },
    { label: "Secondary spaces", value: "Private Gallery, Relic Collection" },
    { label: "Visibility", value: "Public storefront" }
  ],
  measurements: [
    { label: "Dimensions", value: "34 in x 18 in x 14 in" },
    { label: "Weight", value: "12 lb" },
    { label: "Handling class", value: "Freight review recommended" }
  ],
  media: [
    { label: "Hero image", value: "/assets/reptile/tank-large.png" },
    { label: "Gallery count", value: "4 frames" },
    { label: "Video", value: "Optional" }
  ],
  provenance: [
    { label: "Field note", value: "Recovered from a low-water bend." },
    { label: "GPS", value: "Available for Vault records." },
    { label: "Story tone", value: "Quiet, precise, not over-written." }
  ],
  "bio-sanctity": [
    { label: "Power wash", value: "Complete" },
    { label: "Heat treat", value: "275 degrees for 4+ hours" },
    { label: "Enclosure safety", value: "Approved for living builds" }
  ],
  shipping: [
    { label: "Pickup", value: "Local and arranged" },
    { label: "Freight", value: "Required for larger pieces" },
    { label: "Crating", value: "Quote required" }
  ],
  publishing: [
    { label: "State", value: "Draft review" },
    { label: "Schedule", value: "Publish after approval" },
    { label: "Internal note", value: "Mobile-editable" }
  ]
};
