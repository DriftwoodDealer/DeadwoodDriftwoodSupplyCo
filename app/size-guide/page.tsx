import type { Metadata } from "next";
import { SizeGuideStack } from "@/components/size-guide/SizeGuideStack";

export const metadata: Metadata = {
  title: "Shop By Size — Driftwood Size Guide | DEADWOOD",
  description:
    "Find the right Missouri River driftwood for your build. Nano through Tree XXXL — compact terrarium accents to zoo-level architectural root masses. Each tier sized for how the piece will live.",
};

export default function SizeGuidePage() {
  return (
    <div className="size-guide-page page-shell">
      <div className="size-guide-intro">
        <p className="eyebrow">Shop By Size</p>
        <h1 className="size-guide-heading">
          Find the right piece<br />for your build.
        </h1>
        <p className="size-guide-subhead">
          Every piece is scaled to how it will live. Choose a tier to see what&apos;s available — or let us pick one for you.
        </p>
      </div>
      <SizeGuideStack />
    </div>
  );
}
