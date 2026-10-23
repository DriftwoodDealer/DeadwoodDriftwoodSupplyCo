import Image from "next/image";
import type { Metadata } from "next";
import { TaxidermyInquiry } from "@/components/taxidermy/TaxidermyInquiry";
import { ProductCard } from "@/components/portal/product-card";
import styles from "@/components/sector/landscaping-page.module.css";
import tax from "@/components/taxidermy/taxidermy-page.module.css";
import { getInventoryBySector } from "@/lib/inventory-data";
import { getSectorBySlug } from "@/lib/mock-inventory";

export const metadata: Metadata = {
  title: "Taxidermy Driftwood | DEADWOOD",
  description:
    "River-shaped driftwood for fish mounts, bird displays, and habitat scenes. Custom piece requests and ongoing studio supply. Nationwide and worldwide inquiries.",
};
const tiers = [
  {
    name: "Small accents",
    range: "8–14 inches",
    price: "$18–30",
    image: "/assets/images/driftwood_1.png",
    alt: "Branching driftwood form showing grain and natural lines",
    description:
      "Finishing details for compact displays. Small branches, root fragments, and texture that tie a scene together.",
  },
  {
    name: "Fish & bird displays",
    range: "15–24 inches",
    price: "$30–55",
    image: "/assets/sections/taxidermy/taxidermy-bass-driftwood.png",
    alt: "Bass mount on driftwood, shown as display inspiration only",
    description:
      "Sweeping lines for fish mounts and branching forms for bird perches. Choose the silhouette around the pose.",
  },
  {
    name: "Small-mammal habitat",
    range: "25–36 inches",
    price: "$55–95",
    image: "/assets/images/driftwood_1.png",
    alt: "Broad branching driftwood form as habitat inspiration",
    description:
      "Roots and substantial forms for fox, bobcat, and other small-mammal scenes. Match the footprint and mounting needs to your animal.",
  },
  {
    name: "Large habitat",
    range: "Over 36 inches",
    price: "Custom quote",
    image: "/assets/sections/taxidermy/taxidermy-bass-driftwood.png",
    alt: "Detailed fish and driftwood display as large habitat inspiration",
    description:
      "Larger roots, multi-piece arrangements, and ambitious dioramas. Tell us the scale; we’ll look for the right character.",
  },
];

export default async function TaxidermyShopPage() {
  const sector = getSectorBySlug("taxidermy");
  if (!sector) return null;
  const items = await getInventoryBySector(sector);
  return (
    <main className={`${styles.page} ${tax.page}`}>
      <section
        className={`${styles.hero} ${tax.hero}`}
        aria-labelledby="taxidermy-hero-title"
      >
        <Image
          src="/assets/sections/taxidermy/bass-driftwood-hero-v2.png"
          alt="Extreme close-up of an open-mouth largemouth bass display emerging from gnarled driftwood and darkness"
          fill
          priority
          sizes="100vw"
          className={`${styles.heroImage} ${tax.heroImage}`}
        />
        <div className={tax.heroShade} />
        <div className={`${styles.heroCopy} ${tax.heroCopy}`}>
          <p className="eyebrow">Taxidermy & habitat displays</p>
          <h1 id="taxidermy-hero-title">
            Give the
            <br />
            wild a stage.
          </h1>
          <p>
            River-shaped driftwood for fish, birds, and habitat scenes.
            One-of-a-kind forms that make the whole display feel at home.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.heroAction} href="#taxidermy-inventory">
              Browse available wood <span aria-hidden="true">↓</span>
            </a>
          </div>
          <span className={tax.reach}>Nationwide & worldwide inquiries</span>
        </div>
        <p className={tax.heroCaption}>Display inspiration · Driftwood only</p>
      </section>
      <div className={styles.inside}>
        <section
          className={`deadwood-tier-section ${tax.tiers}`}
          aria-labelledby="taxidermy-scale-title"
        >
          <div className="deadwood-tier-intro">
            <p className="eyebrow">Scale & character</p>
            <h2 id="taxidermy-scale-title" className="deadwood-tier-heading">
              Start with the scene.
            </h2>
            <p className="deadwood-tier-subhead">
              From a quiet accent to a full habitat. Choose by wood length, then
              tell us the shape your mount needs.
            </p>
          </div>
          <div className="deadwood-tier-stack">
            {tiers.map((tier, index) => (
              <article className={`tier-card ${tax.tier}`} key={tier.name}>
                <div className="tier-card-inner">
                  <div className="tier-card-copy">
                    <span className="tier-card-range">
                      {tier.range} · Wood length
                    </span>
                    <h3 className={`tier-card-title ${tax.tierTitle}`}>
                      {tier.name}
                    </h3>
                    <p className="tier-card-desc">{tier.description}</p>
                    <p className={tax.price}>
                      {tier.price}
                      <span>
                        {index < 3
                          ? "Estimated wood-only range"
                          : "Wood & shipping quoted separately"}
                      </span>
                    </p>
                    <div className="tier-card-action">
                      <a
                        href={
                          index < 3
                            ? "#taxidermy-inventory"
                            : "#taxidermy-custom"
                        }
                        className="tier-card-btn"
                      >
                        {index < 3
                          ? "Browse available wood →"
                          : "Request a large piece →"}
                      </a>
                    </div>
                  </div>
                  <div className={`tier-card-visual ${tax.tierVisual}`}>
                    <Image
                      src={tier.image}
                      alt={tier.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 700px"
                      className="tier-card-img"
                    />
                    <div className="tier-card-visual-fade" />
                    <span className={tax.studyLabel}>
                      Form & display inspiration
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className={tax.priceNote}>
            Estimated USD guide ranges for typical, simple forms; final quotes
            depend on shape and selection. Sculptural pieces are priced
            individually and may exceed these ranges. Shipping is separate.
            Images illustrate displays and forms, not a guaranteed size or
            included mount.
          </p>
        </section>
        <section
          className={styles.howSection}
          aria-labelledby="taxidermy-how-title"
        >
          <div className={styles.sectionIntro}>
            <div>
              <p className="eyebrow">How to source</p>
              <h2 id="taxidermy-how-title">The pose comes first.</h2>
            </div>
            <p>
              A fish needs a different line than a bird perch or a fox habitat.
              Start with the display, then find the wood that belongs in it.
            </p>
          </div>
          <div className={styles.steps}>
            {[
              [
                "01",
                "Map the footprint",
                "Measure length, width, and height. Allow clearance for the animal, base, and mounting hardware.",
              ],
              [
                "02",
                "Choose the line",
                "Look for a fork, curve, flat back, or stable contact points that work with the pose and viewing angle.",
              ],
              [
                "03",
                "Confirm the piece",
                "Review dimensions and suitability before ordering. Mounting, structural support, and final finishing are handled by your studio.",
              ],
            ].map(([number, title, body]) => (
              <article className={styles.step} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className={styles.careCard}
          aria-labelledby="taxidermy-delivery-title"
        >
          <span className={styles.careIcon} aria-hidden="true">
            ↗
          </span>
          <div className={styles.careCopy}>
            <p className="eyebrow">From our river to your studio</p>
            <h2 id="taxidermy-delivery-title">
              Nationwide. Worldwide inquiries welcome.
            </h2>
            <p>
              Share your delivery destination with your request. We’ll confirm
              availability, shipping cost, and destination requirements before
              an order, including whether international delivery is possible.
            </p>
          </div>
        </section>
        <section
          className={styles.inventory}
          id="taxidermy-inventory"
          aria-labelledby="taxidermy-inventory-title"
        >
          <div className={styles.inventoryHeader}>
            <div>
              <p className="eyebrow">The current selection</p>
              <h2 id="taxidermy-inventory-title">Available driftwood.</h2>
            </div>
          </div>
          <p className={tax.inventoryNote}>
            Individual pieces carry their own listed prices. Animals, mounts,
            and display scenery are not included.
          </p>
          {items.length ? (
            <div className={styles.inventoryGrid}>
              {items.map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  sizeLabel="Taxidermy form"
                />
              ))}
            </div>
          ) : (
            <p className={tax.empty}>
              No taxidermy pieces are listed right now. Send a custom request
              and tell us what to look for on the next river run.
            </p>
          )}
          <div id="taxidermy-custom" className={tax.custom}>
            <TaxidermyInquiry card />
          </div>
        </section>
        <section
          className={styles.business}
          id="taxidermy-supply"
          aria-labelledby="taxidermy-supply-title"
        >
          <div className={styles.businessCopy}>
            <p className="eyebrow">For working taxidermists</p>
            <h2 id="taxidermy-supply-title">
              Your craft.
              <br />A steady river source.
            </h2>
            <p>
              Need wood throughout the year? Tell us your preferred sizes,
              display types, and monthly or quarterly quantities. We can discuss
              recurring supply and becoming your exclusive driftwood source,
              with availability and terms agreed together.
            </p>
          </div>
          <TaxidermyInquiry type="ongoing-supply" />
        </section>
      </div>
    </main>
  );
}
