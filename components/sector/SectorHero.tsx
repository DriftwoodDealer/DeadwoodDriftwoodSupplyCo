import styles from "@/components/portal/reptile-page.module.css";

type SectorHeroProps = {
  title: string;
  desktopImage: string;
  mobileImage?: string;
  alt: string;
};

export function SectorHero({ title, desktopImage, mobileImage, alt }: SectorHeroProps) {
  return (
    <div className={styles.heroWrap}>
      <section className={styles.hero} aria-label={title}>
        <picture className="sector-hero-picture">
          {mobileImage && (
            <source media="(max-width: 768px)" srcSet={mobileImage} />
          )}
          <img
            src={desktopImage}
            alt={alt}
            className={styles.heroImg}
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        <h1 className="visually-hidden">{title}</h1>
      </section>
    </div>
  );
}
