"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";
import type { SizeClassEntry } from "@/lib/mock-inventory";

type NanoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  tier: SizeClassEntry;
};

export function NanoModal({ isOpen, onClose, tier }: NanoModalProps) {
  const { addItem } = useCart();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  function handleAddToCart() {
    addItem({
      id: `nano-curated-${Date.now()}`,
      title: "Curated Nano Driftwood Piece",
      price: tier.priceFrom || 25,
      image: tier.image,
      sizeClass: "Nano",
    });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="nano-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nano-modal-title"
    >
      <div className="nano-modal-panel">
        <button
          className="nano-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="nano-modal-image-wrap">
          <Image
            src={tier.image}
            alt="Nano driftwood piece"
            fill
            sizes="(max-width: 640px) 90vw, 480px"
            className="nano-modal-image"
          />
        </div>

        <div className="nano-modal-body">
          <div className="nano-modal-header">
            <h2 id="nano-modal-title" className="nano-modal-title">
              {tier.name}
            </h2>
            <p className="nano-modal-range">{tier.range}</p>
          </div>

          <p className="nano-modal-copy">{tier.rangeDescription}</p>

          <ul className="nano-modal-features">
            <li>Hand-selected from the Missouri River archive</li>
            <li>Power washed, inspected &amp; heat-treated at 275°F</li>
            <li>Ships ready to place — no prep needed</li>
            <li>Perfect for Mantids, Jumping Spiders &amp; small invertebrates</li>
          </ul>

          <div className="nano-modal-cta-row">
            <span className="nano-modal-price">
              ${tier.priceFrom?.toLocaleString()}
            </span>
            <button className="nano-modal-add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          <p className="nano-modal-fine-print">
            You won&apos;t select a specific piece — we hand-pick one from our current river archive that fits your build.
          </p>
        </div>
      </div>
    </div>
  );
}
