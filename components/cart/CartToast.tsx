"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export function CartToast() {
  const { lastAdded, toastVisible, hideToast } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      hideToast();
      setIsClosing(false);
    }, 380);
  }, [hideToast]);

  useEffect(() => {
    if (!toastVisible) {
      setIsClosing(false);
      return;
    }

    const timer = setTimeout(() => {
      handleClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [toastVisible, handleClose]);

  if (!toastVisible || !lastAdded) return null;

  return (
    <aside
      className={`cart-flyout-toast ${isClosing ? "is-flying-to-cart" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="cart-toast-top">
        <div className="cart-toast-badge">
          <span className="cart-toast-check">✓</span>
          <span>Added to Cart</span>
        </div>
        <button
          className="cart-toast-close"
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>

      <div className="cart-toast-main">
        <div className="cart-toast-img-wrap">
          <Image
            src={lastAdded.image}
            alt={lastAdded.title}
            fill
            sizes="80px"
            className="cart-toast-img"
          />
        </div>
        <div className="cart-toast-details">
          <strong className="cart-toast-title">{lastAdded.title}</strong>
          {lastAdded.sizeClass && (
            <span className="cart-toast-tier">{lastAdded.sizeClass}</span>
          )}
          <span className="cart-toast-price">${lastAdded.price.toLocaleString()}</span>
        </div>
      </div>

      <div className="cart-toast-actions">
        <Link
          href="/shop"
          className="cart-toast-checkout-btn"
          onClick={handleClose}
        >
          View Cart &amp; Checkout →
        </Link>
      </div>
    </aside>
  );
}
