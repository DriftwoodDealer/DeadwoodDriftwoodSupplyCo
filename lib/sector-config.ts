import type { SectorSlug } from "@/lib/mock-inventory";

export type SectorConfig = {
  slug: SectorSlug;
  hero: { eyebrow: string; title: string; image: string; alt: string };
  howToShopSteps: Array<{ number: string; title: string; body: string }>;
  blurbTitle: string;
  blurbBody: string;
};

export const sectorConfig: Record<SectorSlug, SectorConfig> = {
  reptile: {
    slug: "reptile",
    hero: {
      eyebrow: "Living Enclosures",
      title: "Reptile & Bioactive",
      image: "/assets/reptile/deadwoodReptileHero.png",
      alt: "River-worn driftwood arranged for reptile and bioactive habitats"
    },
    howToShopSteps: [
      { number: "01", title: "Choose the scale", body: "Start with the enclosure presence: Nano through Tree XXXL." },
      { number: "02", title: "Study the form", body: "Look for climbing line, shelter, silhouette, and negative space." },
      { number: "03", title: "Confirm the fit", body: "Dimensions and treatment notes are listed before a piece leaves the archive." }
    ],
    blurbTitle: "The Cleaning Process",
    blurbBody: "Every reptile piece is power washed and heat treated at 275 degrees for 4+ hours. The process is transparent; final enclosure suitability remains the keeper's responsibility."
  },
  landscaping: {
    slug: "landscaping",
    hero: {
      eyebrow: "Exterior Hardscape",
      title: "Landscaping",
      image: "/assets/sections/landscaping/ChatGPT Image May 17, 2026, 06_03_56 PM.png",
      alt: "Large river-worn driftwood form for landscape placement"
    },
    howToShopSteps: [
      { number: "01", title: "Measure the site", body: "Length, width, access, base conditions, and placement all matter." },
      { number: "02", title: "Review the weight", body: "Large forms may require freight, crating, or arranged local delivery." },
      { number: "03", title: "Request a hunt", body: "Specific shapes can become a future river-walk lookout request." }
    ],
    blurbTitle: "How We Find & Document",
    blurbBody: "Each large form begins as a river observation. We document silhouette, scale, origin notes, and the conditions that make a piece read as natural architecture."
  },
  taxidermy: {
    slug: "taxidermy",
    hero: {
      eyebrow: "Mount Staging",
      title: "Taxidermy",
      image: "/assets/sections/taxidermy/taxidermy-bass-driftwood.png",
      alt: "Bass taxidermy mount staged on driftwood"
    },
    howToShopSteps: [
      { number: "01", title: "Find the base", body: "Stable contact points give a mount the support it needs." },
      { number: "02", title: "Follow the line", body: "The branch should support the animal without stealing the composition." },
      { number: "03", title: "Ask for a shape", body: "Studios can request dimensions and profiles for upcoming work." }
    ],
    blurbTitle: "A Mount Needs a Stage",
    blurbBody: "Taxidermy pieces are selected for balance, silhouette, and a quiet relationship to the animal—not as props, but as part of the same waterline story."
  },
  "sculptural-relics": {
    slug: "sculptural-relics",
    hero: {
      eyebrow: "Gallery Material",
      title: "Sculptural Relics",
      image: "/assets/general/riverrelik.png",
      alt: "Sculptural driftwood relic from the river archive"
    },
    howToShopSteps: [
      { number: "01", title: "Enter the Vault", body: "Rare pieces receive more photography, video, and provenance attention." },
      { number: "02", title: "Read the surface", body: "Grain, silvering, cavities, and the river's marks are part of the object." },
      { number: "03", title: "Place with intention", body: "Collector pieces are available for considered display and inquiry." }
    ],
    blurbTitle: "Natural Sculpture, Held Back",
    blurbBody: "The Vault is for forms that read as gallery material first: singular silhouettes, richer visual records, and provenance details when the river gives them to us."
  }
};
