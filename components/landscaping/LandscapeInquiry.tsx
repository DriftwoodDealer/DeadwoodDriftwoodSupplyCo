"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./landscape-inquiry.module.css";

type InquiryType = "custom-piece" | "ongoing-supply";

const initialValues = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  location: "",
  projectType: "garden",
  dimensions: "",
  addons: [] as string[],
  plaqueDetails: "",
  cadence: "as-needed",
  details: "",
  website: "",
};

export function LandscapeInquiry({
  type = "custom-piece",
  card = false,
}: {
  type?: InquiryType;
  card?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [openType, setOpenType] = useState<InquiryType | null>(null);
  const [values, setValues] = useState(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!openType) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenType(null);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = oldOverflow;
      previousFocus?.focus();
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openType]);

  function update<K extends keyof typeof initialValues>(key: K, value: (typeof initialValues)[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function open(kind: InquiryType) {
    setOpenType(kind);
    setError("");
    setSent(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!openType) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/landscape-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: openType }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "We couldn’t send your inquiry. Please try again.");
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn’t send your inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const trigger = card ? (
    <button type="button" className={styles.requestCard} onClick={() => open(type)} aria-haspopup="dialog">
      <span className={styles.requestCopy}>
        <strong>Looking for something specific?</strong>
        <span>Tell us the scale, shape, or setting you have in mind.</span>
      </span>
      <span className={styles.requestLink}>Make a request <span aria-hidden="true">↗</span></span>
    </button>
  ) : (
    <button type="button" className={styles.inlineButton} onClick={() => open(type)} aria-haspopup="dialog">
      {type === "ongoing-supply" ? "Ask About Ongoing Supply" : "Request a Landscape Piece"}
      <span aria-hidden="true">→</span>
    </button>
  );

  return (
    <>
      {trigger}
      {openType && (
        <dialog
          ref={dialogRef}
          className={styles.backdrop}
          aria-labelledby={titleId}
          onCancel={() => setOpenType(null)}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpenType(null);
          }}
        >
          <div className={styles.dialog}>
            <div className={styles.dialogHeader}>
              <div>
                <p className="eyebrow">{openType === "custom-piece" ? "Custom landscape request" : "Landscape professional inquiry"}</p>
                <h2 id={titleId}>
                  {openType === "custom-piece" ? "Tell us what you’re looking for." : "Let’s talk about your projects."}
                </h2>
              </div>
              <button className={styles.closeButton} type="button" onClick={() => setOpenType(null)} aria-label="Close inquiry form">×</button>
            </div>

            {sent ? (
              <div className={styles.success} role="status">
                <span aria-hidden="true">✓</span>
                <h3>Inquiry sent.</h3>
                <p>Thanks, {values.name}. We’ll review the details and get back to you.</p>
                <button type="button" className={styles.inlineButton} onClick={() => setOpenType(null)}>Done</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={submit}>
                <div className={styles.fields}>
                  {openType === "ongoing-supply" && (
                    <label className={styles.field}>
                      Business name
                      <input required minLength={2} maxLength={160} value={values.businessName} onChange={(event) => update("businessName", event.target.value)} autoComplete="organization" />
                    </label>
                  )}
                  <label className={styles.field}>
                    Your name
                    <input required minLength={2} maxLength={120} value={values.name} onChange={(event) => update("name", event.target.value)} autoComplete="name" />
                  </label>
                  <label className={styles.field}>
                    Email
                    <input required type="email" maxLength={254} value={values.email} onChange={(event) => update("email", event.target.value)} autoComplete="email" />
                  </label>
                  <label className={styles.field}>
                    Phone <span>(optional)</span>
                    <input type="tel" maxLength={32} value={values.phone} onChange={(event) => update("phone", event.target.value)} autoComplete="tel" />
                  </label>
                  <label className={styles.field}>
                    Project location
                    <input required minLength={2} maxLength={160} placeholder="City, state or ZIP code" value={values.location} onChange={(event) => update("location", event.target.value)} autoComplete="address-level2" />
                  </label>
                  {openType === "custom-piece" ? (
                    <>
                      <label className={styles.field}>
                        Where will the piece go?
                        <select value={values.projectType} onChange={(event) => update("projectType", event.target.value)}>
                          <option value="garden">Garden or landscape</option>
                          <option value="entry">Entryway</option>
                          <option value="water-feature">Near a water feature</option>
                          <option value="commercial">Commercial property</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                      <label className={styles.field}>
                        Approximate dimensions <span>(optional)</span>
                        <input maxLength={120} placeholder="Length × height × depth" value={values.dimensions} onChange={(event) => update("dimensions", event.target.value)} />
                      </label>
                    </>
                  ) : (
                    <>
                      <label className={styles.field}>
                        How often do you source?
                        <select value={values.cadence} onChange={(event) => update("cadence", event.target.value)}>
                          <option value="as-needed">Project by project</option>
                          <option value="monthly">Monthly</option>
                          <option value="seasonal">Seasonally</option>
                          <option value="other">Other / not sure yet</option>
                        </select>
                      </label>
                      <label className={styles.field}>
                        Typical size or quantity <span>(optional)</span>
                        <input maxLength={160} placeholder="For example, a few large pieces each season" value={values.dimensions} onChange={(event) => update("dimensions", event.target.value)} />
                      </label>
                    </>
                  )}
                </div>

                {openType === "custom-piece" && (
                  <fieldset className={styles.addons}>
                    <legend>Interested in a personalized plaque?</legend>
                    {["House number", "Longitude and latitude", "Company name"].map((option) => (
                      <label key={option}>
                        <input
                          type="checkbox"
                          checked={values.addons.includes(option)}
                          onChange={(event) => update("addons", event.target.checked ? [...values.addons, option] : values.addons.filter((value) => value !== option))}
                        />
                        {option}
                      </label>
                    ))}
                    {values.addons.length > 0 && (
                      <label className={styles.field}>
                        Plaque details <span>(optional)</span>
                        <input maxLength={300} placeholder="Number, coordinates, or company name" value={values.plaqueDetails} onChange={(event) => update("plaqueDetails", event.target.value)} />
                      </label>
                    )}
                  </fieldset>
                )}

                <label className={styles.field}>
                  {openType === "custom-piece" ? "Anything else we should know?" : "Tell us about the work you do"} <span>(optional)</span>
                  <textarea rows={4} maxLength={1800} value={values.details} onChange={(event) => update("details", event.target.value)} />
                </label>
                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
                </label>
                {error && <p className={styles.error} role="alert">{error}</p>}
                <div className={styles.formFooter}>
                  <p>Your information is used only to respond to this inquiry.</p>
                  <button className={styles.submitButton} type="submit" disabled={submitting}>
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
