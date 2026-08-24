import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";
import styles from "./ReptileScaleGrid.module.css";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const cards = [
  { title: "NANO", size: "up to 12 inches", desc: "Best for Micro enclosures. Ideal for compact 12x12x12 desktop terrariums, perfect for Mantids, Jumping Spiders and other small invertebrates.", img: "/assets/reptile/nano.webp", cta: "ADD TO CART", href: "/shop/nano-12-river-root" },
  { title: "MEDIUM", size: "12 to 34 inches", desc: "Ideal for medium enclosures (12-34 inches), offering ample climbing and enrichment for arboreal reptiles and custom vivarium setups.", img: "/assets/reptile/medium.webp", cta: "VIEW DETAILS", href: "/shop/reptile#featured-forms" },
  { title: "SPECIMEN XL", size: "24 to 36 inches", desc: "Specimen XL, a statement piece, ideal for large arboreal enclosures, breeder displays and premium custom vivariums.", img: "/assets/reptile/specimen-xl.webp", cta: "VIEW DETAILS", href: "/shop/reptile#featured-forms" },
  { title: "CENTERPIECE XXL", size: "36 to 60 inches", desc: "Centerpiece XXL Tree - A true zoo-level statement piece, designed as the focal point for extra-large reptile exhibits and high-end custom vivariums.", img: "/assets/reptile/centerpiece-xxl.webp", cta: "VIEW DETAILS", href: "/shop/reptile#featured-forms" },
  { title: "TREE XXXL", size: "60 to 80+ inches", desc: "Designed for zoo-level exhibits, this XXXL tree enclosure stands 80+ inches tall, ideal for large reptile displays and custom vivarium builds.", img: "/assets/reptile/tree-xxxl.webp", cta: "INQUIRE FOR CUSTOM BUILD", href: "/custom-requests", wide: true }
];

export default function ReptileScaleGrid() {
  return (
    <section aria-labelledby="reptile-scale-heading">
      <h2 id="reptile-scale-heading" className={styles.srOnly}>Reptile driftwood size classes</h2>
      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.title} className={`${styles.card} ${card.wide ? `${styles.span2} ${styles.cardWide}` : ""}`}>
            <Image src={card.img} alt={`${card.title} reptile driftwood enclosure`} fill sizes={card.wide ? "calc(100vw - 16px)" : "(max-width: 767px) calc(100vw - 16px), calc(50vw - 12px)"} className={styles.cardImage} />
            <div className={styles.cardGradient} />
            <div className={styles.cardContent}>
              <h2 className={`${anton.className} ${styles.cardTitle}`}>{card.title}</h2>
              <span className={styles.cardSize}>{card.size}</span>
              <p className={styles.cardDesc}>{card.desc}</p>
              <Link href={card.href} className={styles.cardCta}>{card.cta}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
