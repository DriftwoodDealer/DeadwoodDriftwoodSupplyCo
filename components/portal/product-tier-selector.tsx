"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./product-tier-selector.module.css";

type ProductTier = {
  name: string;
  size: string;
  designation: string;
  image: string;
};

const tiers: ProductTier[] = [
  { name: "Nano", size: "Up to 12 in", designation: "Small accents", image: "/assets/reptile-card-tiers/nano-no-text.png" },
  { name: "Medium", size: "12–34 in", designation: "Everyday centerpiece", image: "/assets/reptile-card-tiers/medium-no-text.png" },
  { name: "Specimen XL", size: "24–36 in", designation: "Habitat architecture", image: "/assets/reptile-card-tiers/specimen-xl-no-text.png" },
  { name: "Centerpiece XXL", size: "36–60 in", designation: "Room-defining", image: "/assets/reptile-card-tiers/centerpiece-xxl-no-text.png" }
];

const inquirySubject = 'Inquiry Regarding Tree XXXL (60"+ Piece)';
const inquiryBody = "Hi Deadwood team, I am interested in getting more details, photos, and shipping quotes for the Tree XXXL architectural piece.";

export function ProductTierSelector() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isModalOpen) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [isModalOpen]);

  const copyInquiry = async () => {
    const inquiry = `Subject: ${inquirySubject}\n\n${inquiryBody}`;
    try {
      await navigator.clipboard.writeText(inquiry);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const mailto = `mailto:deadwooddriftwood@gmail.com?subject=${encodeURIComponent(inquirySubject)}&body=${encodeURIComponent(inquiryBody)}`;

  return (
    <section className={styles.section} aria-labelledby="tier-selector-heading">
      <div className={styles.heading}>
        <p className="eyebrow">Reptile / Size Index</p>
        <h2 id="tier-selector-heading">Find the piece that holds the room.</h2>
        <p>From the smallest enclosure accent to a river-worn anchor with a presence all its own.</p>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <article key={tier.name} className={styles.card} style={{ backgroundImage: `url(${tier.image})` }}>
            <div className={styles.cardShade} />
            <div className={styles.designation}>{tier.designation}</div>
            <div className={styles.cardContent}>
              <p className={styles.size}>{tier.size}</p>
              <h3>{tier.name}</h3>
              <Link className={styles.cta} href="/shop/reptile">
                Shop now <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>
        ))}

        <article className={`${styles.card} ${styles.treeCard}`} style={{ backgroundImage: "url(/assets/reptile-card-tiers/tree-xxxl-no-text.png)" }}>
          <div className={styles.cardShade} />
          <div className={styles.designation}>Architectural relic</div>
          <div className={styles.cardContent}>
            <p className={styles.size}>60 in+</p>
            <h3>Tree XXXL</h3>
            <button ref={triggerRef} className={styles.cta} type="button" onClick={() => setIsModalOpen(true)}>
              Contact <span aria-hidden="true">↗</span>
            </button>
          </div>
        </article>
      </div>

      {isModalOpen && (
        <div className={styles.backdrop} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setIsModalOpen(false)}>
          <div ref={dialogRef} className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="tree-inquiry-title">
            <button ref={closeRef} className={styles.close} type="button" onClick={() => setIsModalOpen(false)} aria-label="Close inquiry dialog">×</button>
            <p className="eyebrow">Tree XXXL / Private inquiry</p>
            <h2 id="tree-inquiry-title">Let&apos;s find the right relic.</h2>
            <p>Ask for current photos, details, and a shipping quote for a 60-inch-plus architectural piece.</p>
            <div className={styles.dialogActions}>
              <a className={styles.mailLink} href={mailto}>Email Deadwood <span aria-hidden="true">↗</span></a>
              <button className={styles.copyButton} type="button" onClick={copyInquiry}>Copy inquiry</button>
            </div>
            <p className={styles.copyStatus} role="status">{copyState === "copied" ? "Inquiry copied to clipboard." : copyState === "failed" ? "Copy was unavailable. Please use the email link." : ""}</p>
          </div>
        </div>
      )}
    </section>
  );
}
