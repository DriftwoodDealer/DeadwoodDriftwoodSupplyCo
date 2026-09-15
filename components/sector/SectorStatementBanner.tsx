import Image from "next/image";

type SectorStatementBannerProps = {
  imageSrc?: string;
  alt?: string;
};

export function SectorStatementBanner({
  imageSrc = "/assets/reptile/BUFFER.jpg",
  alt = "Naturally formed. Carefully chosen. HAND PICKED FOR THEIR WORLD",
}: SectorStatementBannerProps) {
  return (
    <section
      className="sector-statement-banner-wrap"
      aria-label={alt}
    >
      <div className="sector-statement-banner-inner">
        <Image
          src={imageSrc}
          alt={alt}
          width={3840}
          height={720}
          priority
          sizes="100vw"
          className="sector-statement-banner-img"
        />
      </div>
    </section>
  );
}
