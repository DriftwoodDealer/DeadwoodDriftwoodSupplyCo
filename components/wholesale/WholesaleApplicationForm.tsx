"use client";

import { useState, type Dispatch, type SetStateAction } from "react";

type ProfileLink = { id: number; value: string };
type SocialPlatform = "instagram" | "facebook" | "tiktok" | "linkedin" | "other";
type SocialLink = ProfileLink & { platform: SocialPlatform };

function LinkMark({ kind }: { kind: "website" | "social" }) {
  return (
    <span className={`wholesale-link-mark wholesale-link-mark-${kind}`} aria-hidden="true">
      {kind === "website" ? (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" />
          <path d="M3.5 12h17M12 3c2.5 2.4 3.6 5.4 3.6 9s-1.1 6.6-3.6 9c-2.5-2.4-3.6-5.4-3.6-9S9.5 5.4 12 3Z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none">
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.8" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      )}
    </span>
  );
}

function SocialMark({ platform }: { platform: SocialPlatform }) {
  const marks: Record<SocialPlatform, string> = {
    instagram: "◎",
    facebook: "f",
    tiktok: "♪",
    linkedin: "in",
    other: "↗",
  };
  return <span className={`wholesale-social-mark wholesale-social-mark-${platform}`} aria-hidden="true">{marks[platform]}</span>;
}

export function WholesaleApplicationForm() {
  const [websites, setWebsites] = useState<ProfileLink[]>([{ id: 1, value: "" }]);
  const [socials, setSocials] = useState<SocialLink[]>([{ id: 1, value: "", platform: "instagram" }]);
  const [preferredContact, setPreferredContact] = useState("email");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function updateLink<T extends ProfileLink>(
    setter: Dispatch<SetStateAction<T[]>>,
    id: number,
    value: string,
  ) {
    setter((current) => current.map((item) => item.id === id ? { ...item, value } : item));
  }

  function addLink(setter: typeof setWebsites, current: ProfileLink[]) {
    setter([...current, { id: Date.now() + current.length, value: "" }]);
  }

  function addSocial() {
    setSocials([...socials, { id: Date.now() + socials.length, value: "", platform: "instagram" }]);
  }

  function removeLink<T extends ProfileLink>(setter: Dispatch<SetStateAction<T[]>>, current: T[], id: number) {
    setter(current.filter((item) => item.id !== id));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      businessName: String(data.get("businessName") || ""),
      contactName: String(data.get("contactName") || ""),
      businessType: String(data.get("businessType") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      preferredContact,
      location: String(data.get("location") || ""),
      websites: websites.map((item) => item.value.trim()).filter(Boolean),
      socialProfiles: socials.filter((item) => item.value.trim()).map(({ platform, value }) => ({ platform, url: value.trim() })),
      wholesaleInterest: String(data.get("wholesaleInterest") || ""),
      honeypot: String(data.get("companyFax") || ""),
      consent: data.get("consent") === "on",
    };

    try {
      const response = await fetch("/api/wholesale-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We couldn’t submit your application. Please try again.");
      setSubmitted(true);
      form.reset();
      setWebsites([{ id: Date.now(), value: "" }]);
      setSocials([{ id: Date.now() + 1, value: "", platform: "instagram" }]);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn’t submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="wholesale-success" role="status" aria-live="polite">
        <span className="wholesale-success-icon" aria-hidden="true">✓</span>
        <p className="eyebrow">Application received</p>
        <h3>Thanks for telling us about your business.</h3>
        <p>We’ll review your details and follow up using your preferred contact method.</p>
        <button type="button" className="wholesale-reset-button" onClick={() => setSubmitted(false)}>
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form className="wholesale-form" onSubmit={handleSubmit}>
      <div className="wholesale-form-grid">
        <label className="wholesale-field">
          <span>Business or studio name <b>*</b></span>
          <input name="businessName" required maxLength={160} autoComplete="organization" placeholder="The name customers know you by" />
        </label>
        <label className="wholesale-field">
          <span>Your name <b>*</b></span>
          <input name="contactName" required maxLength={120} autoComplete="name" placeholder="Who should we speak with?" />
        </label>
        <label className="wholesale-field">
          <span>What best describes your business? <b>*</b></span>
          <select name="businessType" required defaultValue="">
            <option value="" disabled>Select a business type</option>
            <option value="retail-shop">Retail shop or showroom</option>
            <option value="reptile-aquarium">Reptile, aquarium, or habitat professional</option>
            <option value="builder-installer">Builder or installer</option>
            <option value="taxidermy-studio">Taxidermy or art studio</option>
            <option value="landscape-design">Landscape or interior design</option>
            <option value="other">Another established business</option>
          </select>
        </label>
        <label className="wholesale-field">
          <span>Business location <b>*</b></span>
          <input name="location" required maxLength={240} autoComplete="street-address" placeholder="City and state, or full delivery address" />
          <small>A home address is fine if that’s where your business operates.</small>
        </label>
      </div>

      <fieldset className="wholesale-link-group">
        <legend><LinkMark kind="website" /> Business websites <span>Optional</span></legend>
        <p className="wholesale-field-note">Share one or more sites that show what your business does.</p>
        {websites.map((item, index) => (
          <div className="wholesale-repeat-row" key={item.id}>
            <label className="wholesale-sr-only" htmlFor={`website-${item.id}`}>Business website {index + 1}</label>
            <input id={`website-${item.id}`} type="url" value={item.value} onChange={(event) => updateLink(setWebsites, item.id, event.target.value)} placeholder="https://yourbusiness.com" />
            {websites.length > 1 && <button type="button" className="wholesale-remove-link" aria-label={`Remove website ${index + 1}`} onClick={() => removeLink(setWebsites, websites, item.id)}>−</button>}
          </div>
        ))}
        <button type="button" className="wholesale-add-link" onClick={() => addLink(setWebsites, websites)}><span>+</span> Add another website</button>
      </fieldset>

      <fieldset className="wholesale-link-group">
        <legend><LinkMark kind="social" /> Social profiles <span>Optional</span></legend>
        <p className="wholesale-field-note">Instagram, Facebook, TikTok, LinkedIn, or any profile relevant to your work.</p>
        {socials.map((item, index) => (
          <div className="wholesale-repeat-row" key={item.id}>
            <label className="wholesale-social-select-wrap">
              <span className="wholesale-sr-only">Social network {index + 1}</span>
              <SocialMark platform={item.platform} />
              <select aria-label={`Social network ${index + 1}`} value={item.platform} onChange={(event) => setSocials((current) => current.map((profile) => profile.id === item.id ? { ...profile, platform: event.target.value as SocialPlatform } : profile))}>
                <option value="instagram">Instagram</option>
                <option value="facebook">Facebook</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label className="wholesale-sr-only" htmlFor={`social-${item.id}`}>{item.platform} profile URL {index + 1}</label>
            <input id={`social-${item.id}`} type="url" value={item.value} onChange={(event) => updateLink(setSocials, item.id, event.target.value)} placeholder={`https://${item.platform === "other" ? "example.com" : `${item.platform}.com`}/yourbusiness`} />
            {socials.length > 1 && <button type="button" className="wholesale-remove-link" aria-label={`Remove social profile ${index + 1}`} onClick={() => removeLink(setSocials, socials, item.id)}>−</button>}
          </div>
        ))}
        <button type="button" className="wholesale-add-link" onClick={addSocial}><span>+</span> Add another social profile</button>
      </fieldset>

      <div className="wholesale-form-grid wholesale-contact-grid">
        <label className="wholesale-field">
          <span>Email address {preferredContact === "email" && <b>*</b>}</span>
          <input name="email" type="email" required={preferredContact === "email"} maxLength={254} autoComplete="email" placeholder="you@yourbusiness.com" />
        </label>
        <label className="wholesale-field">
          <span>Phone number {preferredContact === "phone" && <b>*</b>}</span>
          <input name="phone" type="tel" required={preferredContact === "phone"} maxLength={32} autoComplete="tel" placeholder="(555) 555-5555" />
        </label>
        <label className="wholesale-field">
          <span>Best way to reach you <b>*</b></span>
          <select value={preferredContact} onChange={(event) => setPreferredContact(event.target.value)}>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </label>
      </div>

      <label className="wholesale-field wholesale-interest-field">
        <span>What materials or supply are you looking for?</span>
        <textarea name="wholesaleInterest" rows={4} maxLength={2000} placeholder="Tell us a little about your work, the pieces you use, or the kind of supply you’re looking for." />
      </label>

      <label className="wholesale-honeypot" aria-hidden="true">
        <span>Fax</span><input name="companyFax" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="wholesale-consent">
        <input type="checkbox" name="consent" required />
        <span>I confirm these details describe my business and agree that Deadwood may contact me about this application.</span>
      </label>
      {error && <p className="wholesale-form-error" role="alert">{error}</p>}
      <button className="button primary wholesale-submit" type="submit" disabled={submitting}>
        {submitting ? "Sending application…" : "Send application"}
        {!submitting && <span aria-hidden="true">→</span>}
      </button>
      <p className="wholesale-form-footnote">Sending an application doesn’t create an account or commit you to an order.</p>
    </form>
  );
}
