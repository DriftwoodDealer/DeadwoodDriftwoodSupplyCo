import Image from "next/image";
import Link from "next/link";
import styles from "./reptile-page.module.css";

const tiers = [
  {
    name: "Nano",
    image: "/assets/reptile/reptile card assets/nano.png",
    copy:
      "NANO - UP TO 12 INCHES | Nano tanks, juvenile enclosures, terrarium accents | SELECT A COMPACT ROOT OR BRANCH WITH ONE CLEAR GESTURE."
  },
  {
    name: "Medium",
    image: "/assets/reptile/reptile card assets/medium.png",
    copy:
      "MEDIUM - 12-34 INCHES | Most bioactive builds, aquascapes, and mantis habitats | BUILD AROUND ONE CLIMBING LINE, ONE SHELTER, AND OPEN AIR FOR THE ANIMAL."
  },
  {
    name: "Specimen XL",
    image: "/assets/reptile/reptile card assets/speciman.png",
    copy:
      "SPECIMEN XL - 24 TO 36 INCHES | Larger Reptile spaces, Planted hardscapes, display shelves | DISTINCT SILHOUETTES WITH STRONGER BRANCHING, ARCHES, CAVITIES, OR VERTICAL MOVEMENT."
  },
  {
    name: "Centerpiece XXL",
    image: "/assets/reptile/reptile card assets/centerpiece.png",
    copy:
      "CENTERPIECE XXL - 36-60 INCHES | Large enclosures, installs, lobby displays, collection pieces | THIS IS WHERE THE PIECE STARTS ACTING LIKE ARCHITECTURE INSIDE THE ENCLOSURE."
  },
  {
    name: "Tree XXXL",
    image: "/assets/reptile/reptile card assets/tree.png",
    copy:
      "TREE XXXL - 60 PLUS INCHES | Commercial spaces, Large installs, Commissioned staging | RARE TRUNK-SCALE MATERIAL TREATED MORE LIKE NATURAL ARCHITECTURE THAN ORDINARY INVENTORY."
  }
];

export function ReptileTierCards() {
  return (
    <section className={styles.tierSection} aria-labelledby="reptile-tier-heading">
      <h2 id="reptile-tier-heading" className={styles.srOnly}>
        Reptile driftwood size classes
      </h2>
      <div className={styles.tierGrid}>
        {tiers.map((tier) => (
          <article className={styles.tierCard} key={tier.name}>
            <Image
              src={tier.image}
              alt=""
              fill
              sizes="(max-width: 760px) calc(100vw - 32px), calc(50vw - 50px)"
              className={styles.tierImage}
            />
            <Link className={styles.tierLink} href="/shop/reptile#reptile-inventory">
              <span className={styles.srOnly}>{tier.copy}</span>
            </Link>
          </article>
        ))}
        <article className={styles.wholesaleCard}>
          <div>
            <h2>Need more than a couple pieces?</h2>
            <p>Explore our custom sourcing, bulk tiers, and commercial partner program.</p>
          </div>
          <Link className={styles.wholesaleButton} href="/wholesale">
            View Wholesale &amp; Policies
          </Link>
        </article>
      </div>
    </section>
  );
}
