"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { sizeClasses } from "@/lib/mock-inventory";

const storyDetails = [
  {
    footprint: "Up to 12 in",
    habitat: "Nano tanks, juvenile enclosures, terrarium accents",
    note: "Texture over mass. A small form gives a tight composition somewhere to start.",
    layer: "Select a compact root or branch with one clear gesture."
  },
  {
    footprint: "12 - 24 in",
    habitat: "Most bioactive builds, aquascapes, and mantis habitats",
    note: "The everyday working size: enough structure to anchor a scene without crowding it.",
    layer: "Build around one climbing line, one shelter, and open air for the animal."
  },
  {
    footprint: "24 - 36 in",
    habitat: "Larger reptile spaces, planted hardscapes, display shelves",
    note: "Stronger branching and cavities turn the enclosure into a small landscape.",
    layer: "Leave negative space around the dominant silhouette so it reads from across a room."
  },
  {
    footprint: "36 - 60 in",
    habitat: "Large enclosures, installs, lobby displays, collection pieces",
    note: "This is where the piece starts acting like architecture inside the enclosure.",
    layer: "Shipping, access, photography, and placement become part of the selection."
  },
  {
    footprint: "60 in +",
    habitat: "Commercial spaces, large installs, commissioned staging",
    note: "Rare trunk-scale material treated as natural architecture rather than inventory.",
    layer: "Tree XXXL is a conversation: scale, structure, access, and the room all matter."
  }
];

export function ReptileSizeStory() {
  const storyRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;

    const steps = Array.from(story.querySelectorAll<HTMLElement>("[data-size-story-step]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const index = visible?.target.getAttribute("data-size-story-step");
        if (index) setActiveIndex(Number(index));
      },
      { rootMargin: "-38% 0px -42%", threshold: [0.1, 0.35, 0.7] }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const activeSize = sizeClasses[activeIndex] ?? sizeClasses[0];

  return (
    <section ref={storyRef} className="reptile-size-story" aria-labelledby="reptile-scale-heading">
      <div className="reptile-size-story-intro">
        <p className="eyebrow">Scale Classes</p>
        <h2 id="reptile-scale-heading" className="section-heading">
          Start with the enclosure. Build the world around it.
        </h2>
        <p className="section-copy">
          Scroll through the scale system. The enclosure drops in first, then the driftwood,
          living texture, and finally the animal it is meant to hold.
        </p>
      </div>

      <div className="reptile-size-story-grid">
        <div className="reptile-size-story-steps">
          {sizeClasses.map((sizeClass, index) => {
            const detail = storyDetails[index];
            const active = index === activeIndex;

            return (
              <article
                key={sizeClass.name}
                className={`reptile-size-story-step${active ? " is-active" : ""}`}
                data-size-story-step={index}
                aria-current={active ? "step" : undefined}
              >
                <div className="reptile-size-story-step-count">0{index + 1}</div>
                <div>
                  <p className="reptile-size-story-scale">{sizeClass.scale}</p>
                  <h3>{sizeClass.name}</h3>
                  <p className="reptile-size-story-description">{sizeClass.description}</p>
                  <div className="reptile-size-story-meta">
                    <span>{detail.footprint}</span>
                    <span>{detail.habitat}</span>
                  </div>
                  <p className="reptile-size-story-note">{detail.note}</p>
                  <p className="reptile-size-story-layer">{detail.layer}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="reptile-size-story-stage-wrap">
          <div className={`reptile-size-story-stage stage-${activeIndex}`}>
            <div className="reptile-size-story-stage-label">
              <span>Current study</span>
              <strong>{activeSize.name}</strong>
            </div>
            <div className="reptile-size-story-scene">
              <div className="reptile-story-measure measure-width">{storyDetails[activeIndex]?.footprint}</div>
              <div className="reptile-story-measure measure-height">scale<br />study</div>
              <div className="reptile-story-tank" aria-hidden="true">
                <span className="tank-top" />
                <span className="tank-back" />
                <span className="tank-floor" />
                <span className="tank-side tank-side-left" />
                <span className="tank-side tank-side-right" />
                <span className="tank-front" />
              </div>
              <div className="reptile-story-substrate" aria-hidden="true" />
              <div className="reptile-story-driftwood" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="reptile-story-foliage" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <Image
                className="reptile-story-animal"
                src="/assets/images/gecko.png"
                alt=""
                width={1280}
                height={1024}
                aria-hidden="true"
              />
              <div className="reptile-story-scene-caption">
                <span>Enclosure presence</span>
                <strong>{activeSize.scale}</strong>
              </div>
            </div>
            <div className="reptile-size-story-progress" aria-hidden="true">
              {sizeClasses.map((sizeClass, index) => (
                <span key={sizeClass.name} className={index <= activeIndex ? "is-on" : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
