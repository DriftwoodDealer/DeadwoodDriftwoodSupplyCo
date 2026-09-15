"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";
import { useCart } from "@/components/cart/CartContext";
import {
  inventoryItems,
  type InventoryItem,
  type SizeClassEntry,
  SIZE_CLASS_RANGES,
} from "@/lib/mock-inventory";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

type PieceBrowserModalProps = {
  tier: SizeClassEntry | null;
  onClose: () => void;
};

export function PieceBrowserModal({ tier, onClose }: PieceBrowserModalProps) {
  const [selectedPiece, setSelectedPiece] = useState<InventoryItem | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [inspectorTouchStartY, setInspectorTouchStartY] = useState<number | null>(null);
  const [mediaTouchStartX, setMediaTouchStartX] = useState<number | null>(null);
  const { addItem } = useCart();
  const isOpen = tier !== null;

  const isAllForms = tier?.slug === "all";

  const pieces = tier
    ? inventoryItems.filter((item) => {
        if (item.status !== "published") return false;
        if (isAllForms) {
          return ["Medium", "Specimen XL", "Centerpiece XXL"].includes(
            item.sizeClass as string
          );
        }
        return item.sizeClass === tier.name;
      })
    : [];

  useEffect(() => {
    setSelectedPiece(null);
    setActiveMediaIndex(0);
  }, [tier?.slug]);

  useEffect(() => {
    setActiveMediaIndex(0);
  }, [selectedPiece?.id]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selectedPiece) {
          setSelectedPiece(null);
        } else {
          onClose();
        }
      }
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, selectedPiece, onClose]);

  function handleAddToCart(item: InventoryItem) {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      sizeClass: item.sizeClass as string,
    });
  }

  if (!isOpen || !tier) return null;

  const mediaList = selectedPiece
    ? selectedPiece.media && selectedPiece.media.length > 0
      ? selectedPiece.media
      : [selectedPiece.image]
    : [];

  const activeImage = mediaList[activeMediaIndex] || selectedPiece?.image || "";

  return (
    <div
      className="piece-browser-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="piece-browser-title"
    >
      <div className="piece-browser-panel">
        {/* Mobile drag handle */}
        <div
          className="piece-browser-drag-handle"
          onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
          onTouchEnd={(e) => {
            if (touchStartY !== null && e.changedTouches[0].clientY - touchStartY > 50) {
              onClose();
            }
            setTouchStartY(null);
          }}
          aria-hidden="true"
        />

        {/* Top bar */}
        <div
          className="piece-browser-header"
          onTouchStart={(e) => setTouchStartY(e.touches[0].clientY)}
          onTouchEnd={(e) => {
            if (touchStartY !== null && e.changedTouches[0].clientY - touchStartY > 50) {
              onClose();
            }
            setTouchStartY(null);
          }}
        >
          <div>
            <span className="piece-browser-range">{tier.range}</span>
            <h2 id="piece-browser-title" className={`${anton.className} piece-browser-title`}>
              {isAllForms ? "All Forms" : tier.name}
            </h2>
          </div>
          <button
            className="piece-browser-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="piece-browser-sub-row">
          <p className="piece-browser-sub">{tier.description}</p>
        </div>

        {/* Main interactive area with Grid + Slide-Out Inspector */}
        <div className="piece-browser-body-wrap">
          {/* Inventory Grid */}
          <div
            className={`piece-browser-grid-scroll ${selectedPiece ? "has-active-inspector" : ""}`}
            onClick={(e) => {
              if (selectedPiece && e.target === e.currentTarget) {
                setSelectedPiece(null);
              }
            }}
          >
            {pieces.length > 0 ? (
              <div
                className="piece-browser-grid"
                onClick={(e) => {
                  if (selectedPiece && e.target === e.currentTarget) {
                    setSelectedPiece(null);
                  }
                }}
              >
                {pieces.map((item) => {
                  const isSelected = selectedPiece?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`piece-browser-card ${isSelected ? "is-selected" : ""}`}
                      onClick={() => setSelectedPiece(isSelected ? null : item)}
                      aria-label={`Select ${item.title} — $${item.price}`}
                    >
                      <div className="piece-browser-card-img">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 45vw, 260px"
                          className="piece-browser-img"
                        />
                        <span className="piece-browser-badge">One of a kind</span>
                      </div>
                      <div className="piece-browser-card-body">
                        {item.sizeClass && (
                          <div className="piece-browser-size-pill">
                            <span className="size-name">{item.sizeClass}</span>
                            {SIZE_CLASS_RANGES[item.sizeClass] && (
                              <span className="size-scale"> · {SIZE_CLASS_RANGES[item.sizeClass]}</span>
                            )}
                          </div>
                        )}
                        <h3 className="piece-browser-item-title">{item.title}</h3>
                        <p className="piece-browser-item-dim">{item.dimensions}</p>
                        <div className="piece-browser-item-footer">
                          <strong className="piece-browser-item-price">
                            ${item.price.toLocaleString()}
                          </strong>
                          <span className="piece-browser-item-avail">
                            {item.availability}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="piece-browser-empty">
                <p>No published pieces in this size class right now.</p>
                <p className="piece-browser-empty-sub">
                  Pieces are harvested, photographed, and heat-treated in limited river runs. Check back soon as new pieces enter the archive.
                </p>
              </div>
            )}
          </div>

          {/* Dimmed backdrop on mobile / tablet to tap outside to close */}
          {selectedPiece && (
            <div
              className="piece-inspector-backdrop-dim"
              onClick={() => setSelectedPiece(null)}
              aria-hidden="true"
            />
          )}

          {/* Slide-out Inspector Panel (Apple / Linear Style) */}
          <aside className={`piece-inspector-drawer ${selectedPiece ? "is-open" : ""}`}>
            {selectedPiece && (
              <div className="piece-inspector-content">
                {/* Mobile drag handle for inspector */}
                <div
                  className="piece-inspector-drag-handle"
                  onTouchStart={(e) => setInspectorTouchStartY(e.touches[0].clientY)}
                  onTouchEnd={(e) => {
                    if (inspectorTouchStartY !== null && e.changedTouches[0].clientY - inspectorTouchStartY > 50) {
                      setSelectedPiece(null);
                    }
                    setInspectorTouchStartY(null);
                  }}
                  aria-hidden="true"
                />

                <div
                  className="piece-inspector-top"
                  onTouchStart={(e) => setInspectorTouchStartY(e.touches[0].clientY)}
                  onTouchEnd={(e) => {
                    if (inspectorTouchStartY !== null && e.changedTouches[0].clientY - inspectorTouchStartY > 50) {
                      setSelectedPiece(null);
                    }
                    setInspectorTouchStartY(null);
                  }}
                >
                  <span className="piece-inspector-eyebrow">Piece Details</span>
                  <button
                    className="piece-inspector-close-btn"
                    onClick={() => setSelectedPiece(null)}
                    aria-label="Close piece details"
                  >
                    ✕
                  </button>
                </div>

                {/* Media Stage with Gallery Selector & Horizontal Swipe */}
                <div
                  className="piece-inspector-media"
                  onTouchStart={(e) => setMediaTouchStartX(e.touches[0].clientX)}
                  onTouchEnd={(e) => {
                    if (mediaTouchStartX !== null && mediaList.length > 1) {
                      const deltaX = e.changedTouches[0].clientX - mediaTouchStartX;
                      if (deltaX > 40) {
                        // Swipe right -> prev photo
                        setActiveMediaIndex((prev) =>
                          prev === 0 ? mediaList.length - 1 : prev - 1
                        );
                      } else if (deltaX < -40) {
                        // Swipe left -> next photo
                        setActiveMediaIndex((prev) =>
                          prev === mediaList.length - 1 ? 0 : prev + 1
                        );
                      }
                    }
                    setMediaTouchStartX(null);
                  }}
                >
                  <Image
                    src={activeImage}
                    alt={selectedPiece.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="piece-inspector-img"
                  />
                  {mediaList.length > 1 && (
                    <div className="piece-inspector-media-nav">
                      <button
                        type="button"
                        className="piece-media-nav-btn prev"
                        onClick={() =>
                          setActiveMediaIndex((prev) =>
                            prev === 0 ? mediaList.length - 1 : prev - 1
                          )
                        }
                        aria-label="Previous photo"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="piece-media-nav-btn next"
                        onClick={() =>
                          setActiveMediaIndex((prev) =>
                            prev === mediaList.length - 1 ? 0 : prev + 1
                          )
                        }
                        aria-label="Next photo"
                      >
                        ›
                      </button>
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {mediaList.length > 1 && (
                  <div className="piece-inspector-thumbs">
                    {mediaList.map((thumbUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`piece-thumb-btn ${idx === activeMediaIndex ? "is-active" : ""}`}
                        onClick={() => setActiveMediaIndex(idx)}
                        aria-label={`View angle ${idx + 1}`}
                      >
                        <Image src={thumbUrl} alt="" fill sizes="48px" className="piece-thumb-img" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="piece-inspector-body">
                  <h3 className={`${anton.className} piece-inspector-title`}>
                    {selectedPiece.title}
                  </h3>
                  {selectedPiece.sizeClass && (
                    <div className="piece-inspector-size-pill">
                      <span className="size-name">{selectedPiece.sizeClass}</span>
                      {SIZE_CLASS_RANGES[selectedPiece.sizeClass] && (
                        <span className="size-scale"> · Scale: {SIZE_CLASS_RANGES[selectedPiece.sizeClass]}</span>
                      )}
                    </div>
                  )}
                  <div className="piece-inspector-price-row">
                    <span className="piece-inspector-price">
                      ${selectedPiece.price.toLocaleString()}
                    </span>
                    <span className="piece-inspector-avail-badge">
                      {selectedPiece.availability}
                    </span>
                  </div>

                  <p className="piece-inspector-desc">{selectedPiece.description}</p>

                  <div className="piece-inspector-specs">
                    {selectedPiece.sizeClass && (
                      <div className="piece-spec-item">
                        <span className="piece-spec-label">Size Class</span>
                        <strong className="piece-spec-val">
                          {selectedPiece.sizeClass}
                          {SIZE_CLASS_RANGES[selectedPiece.sizeClass] && ` (${SIZE_CLASS_RANGES[selectedPiece.sizeClass]})`}
                        </strong>
                      </div>
                    )}
                    <div className="piece-spec-item">
                      <span className="piece-spec-label">Dimensions</span>
                      <strong className="piece-spec-val">{selectedPiece.dimensions}</strong>
                    </div>
                    {selectedPiece.weight && (
                      <div className="piece-spec-item">
                        <span className="piece-spec-label">Weight</span>
                        <strong className="piece-spec-val">{selectedPiece.weight}</strong>
                      </div>
                    )}
                    <div className="piece-spec-item">
                      <span className="piece-spec-label">Sanctity</span>
                      <strong className="piece-spec-val">Heat-Treated 275°F (Bio-Safe)</strong>
                    </div>
                    <div className="piece-spec-item">
                      <span className="piece-spec-label">Provenance</span>
                      <strong className="piece-spec-val">Missouri River Archive</strong>
                    </div>
                  </div>

                  <div className="piece-inspector-actions">
                    <button
                      type="button"
                      className="piece-inspector-buy-btn"
                      onClick={() => handleAddToCart(selectedPiece)}
                    >
                      Add to Cart — ${selectedPiece.price.toLocaleString()}
                    </button>
                    <Link
                      href={`/shop/${selectedPiece.slug}?fromTier=${tier.slug}`}
                      className="piece-inspector-link"
                    >
                      Open Full Piece Page →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
