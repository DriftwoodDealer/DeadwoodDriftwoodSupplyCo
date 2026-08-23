"use client";

import { useState } from "react";
import Link from "next/link";
import type { InventoryItem } from "@/lib/mock-inventory";
import { StatusPill } from "@/components/ui/status-pill";

function present(value?: string | null) { return Boolean(value && !["Measurements on request", "Weight on request", "Not posted yet"].includes(value.trim())); }
function formatDimensions(value: string) { return value.split(" x ").map((part) => part.trim().replace(/(in|lb)$/i, "")).filter(Boolean).map((part) => `${part}\"`).join(" × "); }

export function ProductDetail({ item, modal = false }: { item: InventoryItem; modal?: boolean }) {
  const images = item.media?.length ? item.media : (item.image ? [item.image] : []);
  const [activeImage, setActiveImage] = useState(0);
  const purchasable = item.price > 0 && item.status === "published";
  const showBioactiveTreatment = present(item.bioSanctity) && item.sectors.some((sector) => ["Reptile", "Aquariums"].includes(sector));
  const active = images[activeImage] || images[0];

  return <section className={modal ? "product-modal-content" : "page-shell"}>
    {modal ? <Link className="modal-close" href="/shop" aria-label="Close product detail">×</Link> : <Link className="detail-back-link" href="/shop">← Back to Shop</Link>}
    <div className="detail-layout">
      <div className="detail-gallery">
        <div className="detail-image glass-panel">{active ? <img src={active} alt={item.title} /> : <span className="detail-image-empty">No image available</span>}</div>
        {images.length > 1 ? <div className="detail-thumbnails" aria-label="Product gallery">{images.slice(0, 5).map((image, index) => <button key={`${image}-${index}`} className={index === activeImage ? "active" : ""} type="button" onClick={() => setActiveImage(index)}><img src={image} alt={`${item.title} view ${index + 1}`} /></button>)}</div> : null}
      </div>
      <article className="detail-panel glass-panel">
        <p className="eyebrow">{item.sector}</p><h1 className="section-heading">{item.title}</h1>
        {present(item.description) ? <p className="section-copy">{item.description}</p> : null}
        <div className="pill-row" style={{ justifyContent: "flex-start" }}>{item.sectors.map((sector) => <StatusPill key={sector} status={sector} />)}</div>
        <div className="spec-list"><div className="spec-row"><span>Price</span><strong>${item.price.toLocaleString()}</strong></div>{present(item.dimensions) ? <div className="spec-row"><span>Dimensions</span><strong>{formatDimensions(item.dimensions)}</strong></div> : null}{item.sector === "Reptile" && present(item.sizeClass) ? <div className="spec-row"><span>Size</span><strong>{item.sizeClass}</strong></div> : null}{present(item.weight) ? <div className="spec-row"><span>Weight</span><strong>{item.weight}</strong></div> : null}</div>
        {present(item.bestFor) ? <><h2 className="product-title">Best For</h2><p className="section-copy">{item.bestFor}</p></> : null}
        {present(item.provenance) ? <><h2 className="product-title">Provenance</h2><p className="section-copy">{item.provenance}</p></> : null}
        {showBioactiveTreatment ? <><h2 className="product-title">Bioactive Treatment</h2><p className="section-copy">{item.bioSanctity}</p></> : null}
        {present(item.videoUrl) ? <div className="detail-video"><video controls playsInline src={item.videoUrl} /></div> : null}
        <div className="button-row"><Link className="button primary" href={purchasable ? `/shop?add=${item.slug}` : "/custom-requests"}>{purchasable ? "🛒 Add to Cart" : "Request Quote"}</Link></div>
      </article>
    </div>
  </section>;
}
