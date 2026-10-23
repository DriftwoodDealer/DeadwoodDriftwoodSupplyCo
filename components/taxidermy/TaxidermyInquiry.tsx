"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "@/components/landscaping/landscape-inquiry.module.css";

type InquiryType = "custom-piece" | "ongoing-supply";
const initialValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  location: "",
  species: "",
  dimensions: "",
  units: "inches",
  orientation: "not-sure",
  shape: "",
  quantity: "",
  timing: "",
  cadence: "as-needed",
  exclusive: false,
  details: "",
  website: "",
};

export function TaxidermyInquiry({
  type = "custom-piece",
  card = false,
}: {
  type?: InquiryType;
  card?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const supply = type === "ongoing-supply";
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialog.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);
  function update<K extends keyof typeof initialValues>(
    key: K,
    value: (typeof initialValues)[K],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }
  function open() {
    if (sent) setValues(initialValues);
    setSent(false);
    setError("");
    setIsOpen(true);
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/taxidermy-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true)
        throw new Error(
          result.error || "Your inquiry was not sent. Please try again.",
        );
      setSent(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Your inquiry was not sent. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <>
      <button
        type="button"
        className={card ? styles.requestCard : styles.inlineButton}
        onClick={open}
        aria-haspopup="dialog"
      >
        {card ? (
          <>
            <span className={styles.requestCopy}>
              <strong>Have a particular piece in mind?</strong>
              <span>
                Give us the dimensions, species, and shape to look out for.
              </span>
            </span>
            <span className={styles.requestLink}>Make a request ↗</span>
          </>
        ) : (
          <>
            {supply ? "Ask about studio supply" : "Request a custom piece"}
            <span aria-hidden="true">→</span>
          </>
        )}
      </button>
      {isOpen && (
        <dialog
          ref={dialog}
          className={styles.backdrop}
          aria-labelledby={titleId}
          onCancel={(event) => {
            if (submitting) event.preventDefault();
            else setIsOpen(false);
          }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !submitting)
              setIsOpen(false);
          }}
        >
          <div className={styles.dialog}>
            <div className={styles.dialogHeader}>
              <div>
                <p className="eyebrow">
                  {supply ? "Ongoing studio supply" : "Custom taxidermy wood"}
                </p>
                <h2 id={titleId}>
                  {supply
                    ? "A source for your studio."
                    : "Tell us what to look for."}
                </h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                disabled={submitting}
                onClick={() => setIsOpen(false)}
                aria-label="Close inquiry form"
              >
                ×
              </button>
            </div>
            {sent ? (
              <div className={styles.success} role="status">
                <span aria-hidden="true">✓</span>
                <h3>Inquiry sent.</h3>
                <p>
                  Thanks, {values.name}. We’ll review your request and reply by
                  email.
                </p>
                <button
                  type="button"
                  className={styles.inlineButton}
                  onClick={() => setIsOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className={styles.form}>
                <div className={styles.fields}>
                  {supply && (
                    <label className={styles.field}>
                      Studio / business name
                      <input
                        required
                        minLength={2}
                        maxLength={160}
                        autoComplete="organization"
                        value={values.businessName}
                        onChange={(e) => update("businessName", e.target.value)}
                      />
                    </label>
                  )}
                  <label className={styles.field}>
                    Your name
                    <input
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    Email
                    <input
                      required
                      type="email"
                      maxLength={254}
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    Phone (optional)
                    <input
                      type="tel"
                      maxLength={32}
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    Delivery destination
                    <input
                      required
                      minLength={2}
                      maxLength={160}
                      placeholder="City, state / region, postal code, country"
                      value={values.location}
                      onChange={(e) => update("location", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    {supply
                      ? "Species / display preferences"
                      : "Species / display type"}
                    <input
                      required
                      minLength={2}
                      maxLength={160}
                      placeholder="Bass wall mount, duck, fox habitat…"
                      value={values.species}
                      onChange={(e) => update("species", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    {supply
                      ? "Preferred sizes (optional)"
                      : "Target length × width × height (optional)"}
                    <input
                      maxLength={160}
                      placeholder="24 × 12 × 10, or a range"
                      value={values.dimensions}
                      onChange={(e) => update("dimensions", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    Dimension units
                    <select
                      value={values.units}
                      onChange={(e) => update("units", e.target.value)}
                    >
                      <option value="inches">Inches</option>
                      <option value="centimeters">Centimeters</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    Display orientation
                    <select
                      value={values.orientation}
                      onChange={(e) => update("orientation", e.target.value)}
                    >
                      <option value="not-sure">Not sure / mixed</option>
                      <option value="wall">Wall mounted</option>
                      <option value="tabletop">Tabletop / base</option>
                      <option value="upright">Upright / perch</option>
                      <option value="floor">Floor / habitat scene</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    Desired shape (optional)
                    <input
                      maxLength={240}
                      placeholder="Forked perch, flat back, twisted root…"
                      value={values.shape}
                      onChange={(e) => update("shape", e.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    {supply ? "Pieces per delivery / period" : "Quantity"}
                    <input
                      required
                      maxLength={120}
                      placeholder={
                        supply
                          ? "e.g. 6–10 per month; mixed sizes"
                          : "e.g. 1 piece"
                      }
                      value={values.quantity}
                      onChange={(e) => update("quantity", e.target.value)}
                    />
                  </label>
                  {supply && (
                    <label className={styles.field}>
                      Supply cadence
                      <select
                        value={values.cadence}
                        onChange={(e) => update("cadence", e.target.value)}
                      >
                        <option value="as-needed">As needed</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="other">Other / let’s discuss</option>
                      </select>
                    </label>
                  )}
                  <label className={styles.field}>
                    Timing (optional)
                    <input
                      maxLength={160}
                      placeholder="Project deadline or preferred start"
                      value={values.timing}
                      onChange={(e) => update("timing", e.target.value)}
                    />
                  </label>
                </div>
                {supply && (
                  <fieldset className={styles.addons}>
                    <legend>Supply partnership</legend>
                    <label>
                      <input
                        type="checkbox"
                        checked={values.exclusive}
                        onChange={(e) => update("exclusive", e.target.checked)}
                      />
                      I’m interested in discussing DEADWOOD as our exclusive
                      driftwood supplier.
                    </label>
                  </fieldset>
                )}
                <label className={styles.field}>
                  What else should we look out for? (optional)
                  <textarea
                    rows={4}
                    maxLength={1800}
                    placeholder="Grain, silhouette, mounting clearance, wood preferences, or anything your next display needs."
                    value={values.details}
                    onChange={(e) => update("details", e.target.value)}
                  />
                </label>
                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </label>
                {error && (
                  <p className={styles.error} role="alert">
                    {error}
                  </p>
                )}
                <div className={styles.formFooter}>
                  <p>
                    Wood only. Availability, pricing, and destination
                    eligibility are confirmed before an order. Your details are
                    used to respond to this inquiry.
                  </p>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={styles.submitButton}
                  >
                    {submitting ? "Sending…" : "Send inquiry"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
