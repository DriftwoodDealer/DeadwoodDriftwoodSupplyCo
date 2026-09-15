"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { CartToast } from "@/components/cart/CartToast";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/custom-requests", label: "Custom Sourcing", className: "site-nav-accent" },
];

export function SiteHeader() {
  const { itemCount, cartGlow } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="brand-mark" href="/" aria-label="DEADWOOD home">
          Deadwood
        </Link>

        {/* Desktop Centered Capsule Navigation */}
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={item.className}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions on far right: Cart + Mobile Hamburger */}
        <div className="site-header-actions">
          <Link
            href="/shop"
            id="nav-cart-btn"
            className={`nav-cart-button ${cartGlow ? "is-glowing" : ""}`}
            aria-label={`Cart with ${itemCount} items`}
          >
            <svg
              className="nav-cart-icon"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="nav-cart-count">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className={`mobile-nav-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
          >
            <span className="hamburger-line line-1" />
            <span className="hamburger-line line-2" />
            <span className="hamburger-line line-3" />
          </button>
        </div>
      </header>

      {/* Mobile Slide-down / Full-overlay Navigation Drawer */}
      {menuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        >
          <nav
            className="mobile-nav-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className="mobile-nav-header">
              <span className="mobile-nav-eyebrow">Navigation</span>
              <button
                type="button"
                className="mobile-nav-close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav-link ${item.className || ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}

      <CartToast />
    </>
  );
}
