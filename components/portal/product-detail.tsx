"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Anton } from "next/font/google";
import { type InventoryItem, SIZE_CLASS_RANGES } from "@/lib/mock-inventory";
import { StatusPill } from "@/components/ui/status-pill";
import { useCart } from "@/components/cart/CartContext";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

function present(value?: string | null) {
  return Boolean(
    value &&
      !["Measurements on request", "Weight on request", "Not posted yet"].includes(
        value.trim()
      )
  );
}

function formatDimensions(value: string) {
  return value
    .split(" x ")
    .map((part) => part.trim().replace(/(in|lb)$/i, ""))
    .filter(Boolean)
    .map((part) => `${part}\"`)
    .join(" × ");
}

function ProductDetailContent({
  item,
  modal = false,
}: {
  item: InventoryItem;
  modal?: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();
  const images = item.media?.length
    ? item.media
    : item.image
    ? [item.image]
    : [];
  const [activeImage, setActiveImage] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const purchasable = item.price > 0 && item.status === "published";
  const showBioactiveTreatment =
    present(item.bioSanctity) &&
    item.sectors.some((sector) => ["Reptile", "Aquariums"].includes(sector));

  const isReptile =
    item.sector === "Reptile" ||
    item.sectors?.includes("Reptile") ||
    Boolean(item.sizeClass);
  const sizeClassSlug = item.sizeClass
    ? item.sizeClass.toLowerCase().replace(/\s+/g, "-")
    : null;
  const fromTier = searchParams?.get("fromTier") || sizeClassSlug;

  const backHref = fromTier
    ? `/shop/reptile?tier=${fromTier}`
    : isReptile
    ? "/shop/reptile"
    : "/shop";
  const backLabel = fromTier
    ? `← Back to ${item.sizeClass || "Browse"} Pieces`
    : isReptile
    ? "← Back to Reptile Hardscape"
    : "← Back to Shop";

  function handleBack() {
    if (fromTier) {
      router.push(`/shop/reptile?tier=${fromTier}`);
    } else if (modal) {
      router.back();
    } else {
      router.push(backHref);
    }
  }

  function handleAddToCart() {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      sizeClass: item.sizeClass as string,
    });
  }

  return (
    <section className={modal ? "product-modal-content" : "page-shell product-detail-shell"}>
      <div className="product-detail-nav">
        <button
          type="button"
          className="product-back-btn"
          onClick={handleBack}
          aria-label={backLabel}
        >
          {backLabel}
        </button>
      </div>

      <div className="detail-layout">
        <div className="detail-gallery">
          <div
            className="detail-image glass-panel"
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX !== null && images.length > 1) {
                const deltaX = e.changedTouches[0].clientX - touchStartX;
                if (deltaX > 40) {
                  // Swipe right -> prev
                  setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                } else if (deltaX < -40) {
                  // Swipe left -> next
                  setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                }
              }
              setTouchStartX(null);
            }}
          >
            {images.length > 0 ? (
              <div
                className="detail-slider-track"
                style={{
                  transform: `translateX(-${activeImage * 100}%)`,
                }}
              >
                {images.map((img, idx) => (
                  <div key={`${img}-${idx}`} className="detail-slider-slide">
                    <img src={img} alt={`${item.title} - angle ${idx + 1}`} />
                  </div>
                ))}
              </div>
            ) : (
              <span className="detail-image-empty">No image available</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="detail-thumbnails" aria-label="Product gallery">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={index === activeImage ? "active" : ""}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`View angle ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <article className="detail-panel glass-panel">
          <p className="eyebrow">{item.id} — Missouri River Basin</p>
          <h1 className={`${anton.className} detail-title`}>{item.title}</h1>
          <div className="detail-meta">
            <span className="price">${item.price.toLocaleString()}</span>
            <StatusPill status={item.availability} />
            {item.sizeClass && (
              <span className="detail-size-pill">
                <strong className="detail-size-name">{item.sizeClass}</strong>
                {SIZE_CLASS_RANGES[item.sizeClass] && (
                  <span className="detail-size-scale"> · {SIZE_CLASS_RANGES[item.sizeClass]}</span>
                )}
              </span>
            )}
          </div>

          {present(item.description) && (
            <p className="section-copy">{item.description}</p>
          )}

          <div className="specs-table">
            <div className="spec-row">
              <span className="spec-label">Dimensions</span>
              <strong className="spec-value">{formatDimensions(item.dimensions)}</strong>
            </div>
            {present(item.weight) && (
              <div className="spec-row">
                <span className="spec-label">Dry Weight</span>
                <strong className="spec-value">{item.weight}</strong>
              </div>
            )}
            <div className="spec-row">
              <span className="spec-label">Primary Sector</span>
              <strong className="spec-value">{item.sector}</strong>
            </div>
            {item.sizeClass && (
              <div className="spec-row">
                <span className="spec-label">Size Class</span>
                <strong className="spec-value">
                  {item.sizeClass}
                  {SIZE_CLASS_RANGES[item.sizeClass] && ` (${SIZE_CLASS_RANGES[item.sizeClass]})`}
                </strong>
              </div>
            )}
          </div>

          {item.sectors?.length ? (
            <div style={{ marginTop: "1rem" }}>
              <h2 className="product-title" style={{ fontSize: "0.88rem", marginBottom: "0.4rem" }}>
                Sector Fit
              </h2>
              <div className="detail-sectors" style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {item.sectors.map((sector) => (
                  <span className="spec-badge" key={sector}>
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {present(item.provenance) && (
            <div style={{ marginTop: "1rem" }}>
              <h2 className="product-title" style={{ fontSize: "0.88rem", marginBottom: "0.4rem" }}>
                Provenance
              </h2>
              <p className="section-copy">{item.provenance}</p>
            </div>
          )}

          {showBioactiveTreatment && (
            <div style={{ marginTop: "1rem" }}>
              <h2 className="product-title" style={{ fontSize: "0.88rem", marginBottom: "0.4rem" }}>
                Bioactive Treatment
              </h2>
              <p className="section-copy">{item.bioSanctity}</p>
            </div>
          )}

          {present(item.videoUrl) && (
            <div className="detail-video" style={{ marginTop: "1rem" }}>
              <video controls playsInline src={item.videoUrl} />
            </div>
          )}

          <div className="button-row" style={{ marginTop: "1.5rem" }}>
            {purchasable ? (
              <button
                type="button"
                className="button primary"
                onClick={handleAddToCart}
                style={{ width: "100%", justifyContent: "center", cursor: "pointer" }}
              >
                Add to Cart — ${item.price.toLocaleString()}
              </button>
            ) : (
              <Link className="button primary" href="/custom-requests" style={{ width: "100%", textAlign: "center" }}>
                Request Quote
              </Link>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export function ProductDetail(props: { item: InventoryItem; modal?: boolean }) {
  return (
    <Suspense fallback={<section className="page-shell product-detail-shell" />}>
      <ProductDetailContent {...props} />
    </Suspense>
  );
}
