import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Anton } from "next/font/google";
import { TreeInquirySection } from "@/components/size-guide/TreeInquirySection";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tree XXXL — Nationwide Delivery & Setup | DEADWOOD",
  description:
    "Zoo-level Missouri River root masses and trunk-scale driftwood. 60–80+ inches. We deliver and set up nationwide — commercial exhibits, reptile displays, and bespoke installations.",
};

export default function TreeXXXLPage() {
  return (
    <div className="tree-page">
      <div className="tree-page-hero">
        <div className="tree-page-hero-image-wrap">
          <Image
            src="/assets/reptile/reptile_house_panorama.jpg"
            alt="Tree XXXL driftwood — zoo-level enclosure demonstration"
            fill
            priority
            sizes="100vw"
            className="tree-page-hero-image"
          />
          <div className="tree-page-hero-overlay" />
        </div>
        <div className="tree-page-hero-content">
          <p className="tree-page-eyebrow">60 to 80+ inches</p>
          <h1 className={`${anton.className} tree-page-headline`}>TREE XXXL</h1>
          <p className="tree-page-tagline">Zoo-level. Nationwide.</p>
        </div>
      </div>

      <div className="tree-page-body page-shell">
        <Link href="/shop/reptile" className="tree-page-back">
          ← Back to Reptile Hardscape
        </Link>

        <div className="tree-page-intro">
          <p className="eyebrow">What Tree XXXL means</p>
          <h2 className={`${anton.className} tree-page-section-heading`}>
            THIS ISN&apos;T JUST DRIFTWOOD.<br />IT&apos;S ARCHITECTURE.
          </h2>
          <p className="tree-page-copy">
            Tree XXXL pieces are trunk-scale root masses recovered from the Missouri River archive — spanning 60 to 80+ inches with natural branching structures that define space the way a sculpture or architectural element would. These aren&apos;t accent pieces. They are the room.
          </p>
          <p className="tree-page-copy">
            Every Tree XXXL piece is individually documented, power washed, inspected, and heat-treated at 275°F before staging. Vault-level photography and GPS provenance data are available for select finds.
          </p>
        </div>

        <div className="tree-page-service">
          <div className="tree-page-service-card">
            <p className="eyebrow">The Delivery</p>
            <h3 className={`${anton.className} tree-page-service-title`}>WE DON&apos;T SHIP IT. WE BRING IT.</h3>
            <p className="tree-page-copy">
              Tree XXXL pieces are too significant — and too fragile — for standard freight. We handle delivery and professional placement ourselves, anywhere in the country. You get the piece, properly installed, exactly where it needs to live.
            </p>
          </div>

          <div className="tree-page-service-card">
            <p className="eyebrow">Who it&apos;s for</p>
            <h3 className={`${anton.className} tree-page-service-title`}>BUILT FOR SERIOUS BUILDS.</h3>
            <p className="tree-page-copy">
              Commercial reptile exhibits. Museum-grade natural history displays. High-end custom vivariums with 80+ inch enclosures. Estate landscapes and botanical interiors. If the space calls for something that stops people, this is what we bring.
            </p>
          </div>

          <div className="tree-page-service-card">
            <p className="eyebrow">The process</p>
            <h3 className={`${anton.className} tree-page-service-title`}>SOURCE → QUOTE → WHITE-GLOVE SETUP.</h3>
            <p className="tree-page-copy">
              Tell us about your space and what you need. We&apos;ll source the right piece from the archive, walk you through photos and dimensions, provide a freight and installation quote, and handle everything from there. No surprises.
            </p>
          </div>
        </div>

        <TreeInquirySection />
      </div>
    </div>
  );
}
