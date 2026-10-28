"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ModelFallback from "@/components/3d/ModelFallback";

const InteriorShowcaseScene = dynamic(
  () => import("@/components/3d/InteriorShowcaseScene"),
  {
    ssr: false,
    loading: () => <ModelFallback title="3D Interior Architectural Scene" />,
  }
);

export default function SignatureSpacesSection() {
  return (
    <section className="relative bg-obsidian">
      {/* Intro Heading Banner */}
      <div className="py-20 border-b border-champagne/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Signature Spaces • Spatial Composition"
            title="The Living Room Experience"
            subtitle="Scroll through the real 3D interior to navigate across curated camera angles, architectural lighting, and bespoke furniture arrangements."
          />
          <div className="text-xs font-mono text-champagne bg-charcoal/80 border border-champagne/30 px-4 py-2 rounded-full self-start md:self-auto">
            GSAP ScrollTrigger • Real 3D Camera Controls
          </div>
        </div>
      </div>

      {/* Full-bleed 3D Pinned Scroll Showcase Scene */}
      <InteriorShowcaseScene />
    </section>
  );
}

