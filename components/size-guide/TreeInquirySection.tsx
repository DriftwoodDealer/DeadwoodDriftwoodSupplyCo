"use client";

import { useState } from "react";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export function TreeInquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    orientation: "long",
    dimensions: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="tree-page-inquiry-wrap">
      {/* Quick Direct Contact Row */}
      <div className="tree-quick-contact-row">
        <a
          href="tel:4025905038"
          className="tree-quick-contact-btn"
          aria-label="Direct Phone Line"
        >
          <span className="tree-quick-icon">📞</span>
          <div>
            <span className="tree-quick-label">Direct Line</span>
            <strong className="tree-quick-val">(402) 590-5038</strong>
          </div>
        </a>

        <a
          href="mailto:inquiry@deadwooddriftwood.com?subject=Tree%20XXXL%20Bespoke%20Inquiry"
          className="tree-quick-contact-btn"
          aria-label="Direct Email"
        >
          <span className="tree-quick-icon">✉️</span>
          <div>
            <span className="tree-quick-label">Direct Archive Email</span>
            <strong className="tree-quick-val">Send Specifications</strong>
          </div>
        </a>

        <a
          href="https://m.me/deadwooddriftwood"
          target="_blank"
          rel="noopener noreferrer"
          className="tree-quick-contact-btn"
          aria-label="Facebook Messenger"
        >
          <span className="tree-quick-icon">💬</span>
          <div>
            <span className="tree-quick-label">Facebook Messenger</span>
            <strong className="tree-quick-val">Chat with Mark</strong>
          </div>
        </a>
      </div>

      {/* Main Form Block */}
      <div className="tree-page-cta-block">
        <h2 className={`${anton.className} tree-page-cta-heading`}>
          READY TO FIND YOUR PIECE?
        </h2>
        <p className="tree-page-copy">
          Tell us about your space, dimensions, and vision. We hand-select candidate root masses from the archive, provide multi-angle dimensional scans, and quote white-glove delivery &amp; setup.
        </p>

        {submitted ? (
          <div className="tree-inquiry-success">
            <div className="tree-inquiry-success-icon">✓</div>
            <h3 className={`${anton.className} tree-inquiry-success-title`}>
              INQUIRY RECEIVED
            </h3>
            <p className="tree-inquiry-success-text">
              Thank you, {formData.name || "friend"}. We will review your enclosure dimensions and reach out within 24 hours with matching pieces from our vault archive.
            </p>
            <button
              type="button"
              className="tree-inquiry-reset-btn"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: "", contact: "", orientation: "long", dimensions: "", notes: "" });
              }}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form className="tree-inquiry-form" onSubmit={handleSubmit}>
            <div className="tree-form-grid">
              <div className="tree-form-field">
                <label htmlFor="tree-name" className="tree-form-label">
                  Your Name *
                </label>
                <input
                  id="tree-name"
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  className="tree-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="tree-form-field">
                <label htmlFor="tree-contact" className="tree-form-label">
                  Email or Phone *
                </label>
                <input
                  id="tree-contact"
                  type="text"
                  required
                  placeholder="email@domain.com or phone #"
                  className="tree-form-input"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              </div>
            </div>

            <div className="tree-form-grid">
              <div className="tree-form-field">
                <label htmlFor="tree-orientation" className="tree-form-label">
                  Installation Orientation
                </label>
                <select
                  id="tree-orientation"
                  className="tree-form-select"
                  value={formData.orientation}
                  onChange={(e) => setFormData({ ...formData, orientation: e.target.value })}
                >
                  <option value="long">Long / Horizontal (Spanning length)</option>
                  <option value="tall">Tall / Vertical (Root stump / canopy)</option>
                  <option value="corner">Corner 3D Wrap (Multi-branch anchor)</option>
                  <option value="freestanding">Freestanding 360° Island</option>
                  <option value="custom">Custom Architectural Installation</option>
                </select>
              </div>

              <div className="tree-form-field">
                <label htmlFor="tree-dimensions" className="tree-form-label">
                  Target Dimensions (L × D × H)
                </label>
                <input
                  id="tree-dimensions"
                  type="text"
                  placeholder="e.g. 72″L × 36″D × 48″H or 8ft exhibit"
                  className="tree-form-input"
                  value={formData.dimensions}
                  onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                />
              </div>
            </div>

            <div className="tree-form-field">
              <label htmlFor="tree-notes" className="tree-form-label">
                Enclosure / Project Vision &amp; Species
              </label>
              <textarea
                id="tree-notes"
                rows={3}
                placeholder="Tell us what animals, reptiles, or display this piece is for, destination city/state, and any special branch requirements..."
                className="tree-form-textarea"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="button tree-page-cta-btn"
            >
              {isSubmitting ? "Submitting Specs..." : "Request Tree XXXL Piece & Delivery Quote"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
