import styles from "./shop-selector.module.css";

const collections = [
  {
    slug: "reptile",
    title: "REPTILE",
    captionLines: ["Prepared for", "living habitats"],
    href: "/shop/reptile",
  },
  {
    slug: "taxidermy",
    title: "TAXIDERMY",
    captionLines: ["A natural stage for", "your work"],
    href: "/shop/taxidermy",
  },
  {
    slug: "landscaping",
    title: "LANDSCAPING",
    captionLines: ["River character", "Outdoor scale"],
    href: "/shop/landscaping",
  },
  {
    slug: "relics",
    title: "RELICS",
    captionLines: ["Artistry meets", "everyday use"],
    href: "/shop/sculptural-relics",
  },
  {
    slug: "wholesale",
    title: "WHOLESALE",
    captionLines: ["Supply for", "your business"],
    href: "/wholesale",
  },
];

export default function ShopPage() {
  return (
    <div className={styles.selector}>
      <h1 className={styles.visuallyHidden}>
        From the water. Made for your world.
      </h1>

      <header className={styles.heroStage}>
        <picture className={styles.riverPicture}>
          <source
            srcSet="/assets/selector/from-the-water.webp"
            type="image/webp"
          />
          <img
            src="/assets/selector/from-the-water.png"
            width={2700}
            height={600}
            alt="From the water. Deadwood Driftwood Supply Co. Made for your world."
            fetchPriority="high"
            decoding="async"
            className={styles.riverImage}
          />
        </picture>
      </header>

      <nav className={styles.collections} aria-label="Shop sections">
        {collections.map((collection, index) => (
          <a
            key={collection.slug}
            className={styles.collection}
            href={collection.href}
            aria-label={`${collection.title} — ${collection.captionLines.join(" ")}`}
          >
            <div className={styles.posterFrame}>
              <picture className={styles.posterPicture}>
                <source
                  srcSet={`/assets/selector/trial/${collection.slug}-360.webp 360w, /assets/selector/trial/${collection.slug}-720.webp 720w`}
                  sizes="(max-width: 1023px) 45vw, 15vw"
                  type="image/webp"
                />
                <img
                  src={`/assets/selector/trial/${collection.slug}-720.webp`}
                  alt=""
                  width={720}
                  height={1280}
                  loading={index < 3 ? "eager" : "lazy"}
                  decoding="async"
                  className={styles.posterImage}
                />
              </picture>
              <span className={styles.posterTitleBadge}>
                <span className={styles.posterTitleText}>{collection.title}</span>
              </span>
            </div>

            <span className={styles.caption}>
              {collection.captionLines[0]}
              <br />
              {collection.captionLines[1]}
            </span>
          </a>
        ))}
      </nav>
    </div>
  );
}
