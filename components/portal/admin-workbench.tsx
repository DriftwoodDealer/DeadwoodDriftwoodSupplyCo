"use client";

import { useState } from "react";
import Link from "next/link";
import { inventoryItems, sizeClasses } from "@/lib/mock-inventory";
import {
  cmsCategoryOptions,
  cmsDraftFields,
  cmsSections,
  cmsSizeOptions,
  inventoryStatusOptions
} from "@/lib/cms-spec";

const composerHighlights = [
  {
    title: "Phone-first",
    body: "Every field stack collapses cleanly on mobile, with no side-scroll dependency."
  },
  {
    title: "Fast access",
    body: "The admin route lands you in the CMS or the inventory scan with one tap."
  },
  {
    title: "Drag to reorder",
    body: "Featured content and media cards can be shuffled visually before a save."
  }
];

const featureBoardSeed = [
  { id: "hero", label: "Homepage hero", detail: "Top-of-funnel feature slot", accent: "cyan" },
  { id: "drop", label: "New drop", detail: "Latest arrivals and one-off pieces", accent: "lime" },
  { id: "vault", label: "Vault spotlight", detail: "Gallery-style collector focus", accent: "pink" },
  { id: "reptile", label: "Reptile feature", detail: "Enclosure-first merchandising", accent: "yellow" }
];

function moveItem<T>(items: T[], from: number, to: number) {
  const copy = [...items];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export function AdminWorkbench() {
  const featuredItem = inventoryItems[0];
  const [featureBoard, setFeatureBoard] = useState(featureBoardSeed);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  return (
    <section className="admin-workbench">
      <div className="cms-banner cms-panel">
        <div>
          <p className="eyebrow">Admin / CMS</p>
          <h1 className="section-heading">Content system with a phone-first workflow.</h1>
          <p className="section-copy">
            Sign in, land in the hub, then jump into inventory, media, and featured collection
            management without leaving the front end.
          </p>
        </div>

        <div className="cms-banner-actions">
          <Link className="cms-button primary" href="/admin/cms">
            Open CMS
          </Link>
          <Link className="cms-button" href="/admin/settings">
            Settings
          </Link>
        </div>
      </div>

      <div className="admin-metrics">
        <article className="metric-card cms-panel">
          <span>Inventory items</span>
          <strong>{inventoryItems.length}</strong>
        </article>
        <article className="metric-card cms-panel">
          <span>Size classes</span>
          <strong>{sizeClasses.length}</strong>
        </article>
        <article className="metric-card cms-panel">
          <span>Composer sections</span>
          <strong>{cmsSections.length}</strong>
        </article>
      </div>

      <div className="admin-workbench-grid">
        <aside className="cms-rail cms-panel">
          <div className="cms-rail-card">
            <p className="eyebrow">Session</p>
            <h2>Admin preview mode</h2>
            <p>
              This is the front-end shell for the future authenticated CMS session.
            </p>
          </div>

          <nav className="cms-rail-nav" aria-label="Admin workbench navigation">
            <a href="#inventory-composer">Inventory</a>
            <a href="#feature-board">Feature board</a>
            <a href="#media">Media</a>
            <a href="#publishing">Publishing</a>
          </nav>

          <div className="cms-rail-card cms-rail-card-muted">
            <p className="eyebrow">Workflow</p>
            <p>
              Start with inventory, then drag featured blocks, then finish media and publish.
            </p>
          </div>
        </aside>

        <div className="admin-main">
          <section className="cms-summary cms-panel">
            <div>
              <p className="eyebrow">Current Draft</p>
              <h2>{featuredItem.title}</h2>
              <p>{featuredItem.description}</p>
            </div>
            <div className="cms-summary-meta">
              <span>{featuredItem.sizeClass}</span>
              <span>{featuredItem.availability}</span>
              <span>{featuredItem.sector}</span>
            </div>
          </section>

          <section className="admin-highlights">
            {composerHighlights.map((item) => (
              <article key={item.title} className="admin-highlight cms-panel">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </section>

          <section id="feature-board" className="feature-board cms-panel">
            <div className="section-bar">
              <div>
                <p className="eyebrow">Feature Collection</p>
                <h2 className="product-title">Drag cards to reorder the surface.</h2>
              </div>
              <span className="section-note">Mobile draggable board</span>
            </div>

            <div className="feature-board-grid">
              {featureBoard.map((card, index) => (
                <button
                  key={card.id}
                  className={`feature-card accent-${card.accent}`}
                  type="button"
                  draggable
                  onDragStart={() => setDragIndex(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (dragIndex === null || dragIndex === index) {
                      return;
                    }

                    setFeatureBoard(moveItem(featureBoard, dragIndex, index));
                    setDragIndex(null);
                  }}
                  onDragEnd={() => setDragIndex(null)}
                >
                  <span className="feature-card-kicker">Drag</span>
                  <strong>{card.label}</strong>
                  <p>{card.detail}</p>
                </button>
              ))}
            </div>
          </section>

          <section id="inventory-composer" className="composer-shell cms-panel">
            <div className="composer-head">
              <div>
                <p className="eyebrow">Inventory Composer</p>
                <h2 className="section-heading">Build for the feed, the listing, and the phone.</h2>
              </div>
              <div className="composer-actions">
                <button className="cms-button" type="button">
                  Save Draft
                </button>
                <button className="cms-button primary" type="button">
                  Publish
                </button>
              </div>
            </div>

            <div className="composer-body">
              <div className="composer-form">
                {cmsSections.map((section) => (
                  <details key={section.id} className="composer-section" open={section.id === "basics"}>
                    <summary>
                      <span>{section.eyebrow}</span>
                      <strong>{section.title}</strong>
                      <p>{section.description}</p>
                    </summary>

                    <div className="field-grid">
                      {cmsDraftFields[section.id].map((field) => (
                        <label key={field.label} className="field-card">
                          <span>{field.label}</span>
                          {field.label === "Story tone" || field.label === "Internal note" ? (
                            <textarea defaultValue={field.value} rows={3} />
                          ) : (
                            <input defaultValue={field.value} />
                          )}
                          {field.helper ? <small>{field.helper}</small> : null}
                        </label>
                      ))}
                    </div>

                    {section.id === "categories" ? (
                      <div className="chip-group" aria-label="Category options">
                        {cmsCategoryOptions.map((option) => (
                          <button key={option} className="chip" type="button">
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {section.id === "pricing" ? (
                      <div className="chip-group" aria-label="Status options">
                        {inventoryStatusOptions.map((option) => (
                          <button key={option.value} className="chip" type="button">
                            {option.label}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {section.id === "measurements" ? (
                      <div className="chip-group" aria-label="Size options">
                        {cmsSizeOptions.map((option) => (
                          <button key={option} className="chip" type="button">
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </details>
                ))}
              </div>

              <aside className="composer-sidebar">
                <article className="composer-card">
                  <p className="eyebrow">Publish Preview</p>
                  <h3>{featuredItem.title}</h3>
                  <p>{featuredItem.bestFor}</p>
                  <div className="composer-preview-list">
                    <span>{featuredItem.price.toLocaleString()}</span>
                    <span>{featuredItem.dimensions}</span>
                    <span>{featuredItem.weight}</span>
                    <span>{featuredItem.bioSanctity}</span>
                  </div>
                </article>

                <article className="composer-card" id="media">
                  <p className="eyebrow">Media Stack</p>
                  <ul>
                    <li>Add photos, video, and alt text from the same panel.</li>
                    <li>Drag the order before you publish.</li>
                    <li>Feature collection slots can be pinned from here.</li>
                  </ul>
                </article>

                <article className="composer-card" id="publishing">
                  <p className="eyebrow">Publishing Controls</p>
                  <ul>
                    <li>Draft, review, scheduled, published, archived</li>
                    <li>Private preview for internal eyes only</li>
                    <li>Designed to work comfortably on a phone</li>
                  </ul>
                </article>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
