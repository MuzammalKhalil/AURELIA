"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ModelFallback from "@/components/3d/ModelFallback";

const DecorViewer = dynamic(() => import("@/components/3d/DecorViewer"), {
  ssr: false,
  loading: () => <ModelFallback title="3D Decorative Object Atelier" />,
});

export default function DecorShowcaseSection() {
  return (
    <section className="py-28 bg-charcoal border-y border-champagne/15 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Asset Gallery • 3D Decorative Objects"
            title="Sculptural Objets d'Art & Vessels"
            subtitle="Explore individual genuine 3D decorative objects with real-time materials, gentle organic levitation, and curatorial archives."
          />
          <a
            href="/holo-card"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-champagne border border-champagne/40 hover:border-champagne hover:bg-champagne/10 px-5 py-3 rounded-full transition-all self-start md:self-auto shadow-champagne"
          >
            <span>Dark Souls Holo Card 3D</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          </a>
        </div>

        <DecorViewer />
      </div>
    </section>
  );
}

