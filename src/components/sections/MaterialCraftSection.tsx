"use client";

import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ModelFallback from "@/components/3d/ModelFallback";

const MaterialShowcase3D = dynamic(
  () => import("@/components/3d/MaterialShowcase3D"),
  {
    ssr: false,
    loading: () => <ModelFallback title="Interactive 3D Material Studio" />,
  }
);

export default function MaterialCraftSection() {
  return (
    <section className="py-28 bg-obsidian border-t border-champagne/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-14">
          <SectionHeading
            badge="Materiality & Provenance"
            title="Materials with Authentic Texture"
            subtitle="Rotate and inspect real physically-based 3D materials. From Canaletto walnut to Roman travertine and brushed champagne brass."
          />
        </div>

        <MaterialShowcase3D />
      </div>
    </section>
  );
}

