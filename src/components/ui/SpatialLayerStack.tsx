"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Sparkles, CheckCircle2, Layers, Compass, RotateCw } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import type { LayerData } from "@/components/3d/SpatialAnatomyCanvas";

// Lazy-load Three.js 3D Canvas for instant page load & optimal performance
const SpatialAnatomyCanvas = dynamic(
  () => import("@/components/3d/SpatialAnatomyCanvas"),
  { ssr: false }
);

const LAYERS: LayerData[] = [
  {
    id: 0,
    tierNumber: "01",
    title: "Subterranean Foundation Substrate",
    tagline: "Foundation Substrate",
    category: "Tier 01 • Architectural Mass",
    material: "Roman vein-cut Tivoli travertine & obsidian slate",
    spec: "Honed cross-cut extraction • 40mm solid slab perimeter",
    elevation: "0.0 MM",
    elevationVal: 0,
    accentColor: "#9E907B",
    bgGradient: "from-stone-800/30 via-charcoal/95 to-obsidian",
    borderColor: "border-white/20",
    description: "Massive thermal stone slabs providing organic gravitas, thermal regulation, and structural grounding.",
  },
  {
    id: 1,
    tierNumber: "02",
    title: "Monolithic Joinery",
    tagline: "Structural Architectural Millwork",
    category: "Tier 02 • Precision Joinery",
    material: "Canaletto walnut & natural acoustic damping felt core",
    spec: "Millimeter shadow-line reveals • Low-VOC organic oil finish",
    elevation: "+65 MM",
    elevationVal: 65,
    accentColor: "#C2A377",
    bgGradient: "from-amber-900/20 via-charcoal/95 to-obsidian",
    borderColor: "border-champagne/40",
    description: "Slatted acoustic wood paneling attenuating sound reverberations down to 0.45 seconds for whisper-quiet intimacy.",
  },
  {
    id: 2,
    tierNumber: "03",
    title: "Tactile Acoustic Envelopes",
    tagline: "Sensory Ergonomics",
    category: "Tier 03 • Haute Upholstery",
    material: "Alpine shearling wool & unbleached Belgian linen",
    spec: "Biella Piedmont weave • 100,000 Martindale durability rating",
    elevation: "+130 MM",
    elevationVal: 130,
    accentColor: "#D8C7B0",
    bgGradient: "from-stone-300/15 via-charcoal/95 to-obsidian",
    borderColor: "border-ivory/50",
    description: "Cloud-soft textured looped bouclé that cushions the body while creating rich acoustic dampening throughout the salon.",
  },
  {
    id: 3,
    tierNumber: "04",
    title: "Circadian Luminaire Network",
    tagline: "Atmospheric Luminaire Network",
    category: "Tier 04 • Architectural Lighting",
    material: "Hand-patinated antique brass & 2700K warm LED reveals",
    spec: "CRI 98 color fidelity • Diurnal circadian synchronization",
    elevation: "+195 MM",
    elevationVal: 195,
    accentColor: "#E2C18D",
    bgGradient: "from-champagne-300/15 via-charcoal/95 to-obsidian",
    borderColor: "border-champagne/60",
    description: "Low-glare directional shadow casting calibrated to diurnal daylight progression for deep psychological calm.",
  },
  {
    id: 4,
    tierNumber: "05",
    title: "Curatorial Art & Sculptures",
    tagline: "Sculptural Focal Apex",
    category: "Tier 05 • Objets d'Art",
    material: "Lost-wax cast champagne bronze & feldspar stoneware",
    spec: "Cast bronze edition 3 of 8 • Natural chalk satin glaze",
    elevation: "+260 MM",
    elevationVal: 260,
    accentColor: "#C9A66B",
    bgGradient: "from-champagne/20 via-charcoal/95 to-obsidian",
    borderColor: "border-champagne",
    description: "Numbered bronze sculptures and organic stoneware vessels that catch raking daylight and anchor the room's emotional soul.",
  },
];

export default function SpatialLayerStack() {
  const [activeId, setActiveId] = useState<number>(4);
  const [isExploded, setIsExploded] = useState<boolean>(true);
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.1);

  const current = LAYERS.find((l) => l.id === activeId) || LAYERS[4];

  return (
    <div
      ref={containerRef}
      className="bg-charcoal/70 border border-champagne/20 rounded-2xl sm:rounded-3xl p-5 xs:p-7 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      {/* Studio Radial Ambient Glow reacting to selected tier */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20 -z-10"
        style={{
          backgroundColor: current.accentColor,
          top: "20%",
          left: "15%",
        }}
      />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-champagne/5 blur-[130px] pointer-events-none -z-10" />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-white/10 gap-4 relative z-20">
        <div>
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Spatial Chamber</span>
          </div>
          <h3 className="font-serif text-2xl xs:text-3xl sm:text-4xl text-ivory font-light">
            Deconstructed Spatial Anatomy
          </h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          <button
            onClick={() => setIsExploded(!isExploded)}
            className="flex items-center space-x-2 bg-obsidian/90 hover:bg-champagne hover:text-obsidian px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-champagne/30 text-[11px] sm:text-xs font-mono text-ivory transition-all duration-300 shadow-lg active:scale-95 group"
            aria-label="Toggle Exploded View"
          >
            <Layers className="w-3.5 h-3.5 text-champagne group-hover:text-obsidian transition-colors" />
            <span>{isExploded ? "Exploded View" : "Compact Stack"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Scene Viewport (Left) & Curatorial Dossier (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">
        
        {/* Left: Interactive Real Three.js 3D Viewport (Col 7) */}
        <div className="lg:col-span-7 relative h-[380px] xs:h-[440px] sm:h-[490px] md:h-[520px] rounded-2xl bg-gradient-to-b from-obsidian/60 to-obsidian/95 border border-white/5 overflow-hidden flex items-center justify-center select-none shadow-inner">
          
          {/* Vertical Elevation Datum Bar (Left edge of 3D viewport) */}
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center">
            <div className="w-[1px] h-36 bg-gradient-to-b from-transparent via-champagne/40 to-transparent relative">
              <div
                className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full transition-all duration-500 shadow-champagne"
                style={{
                  top: `${100 - (current.id / 4) * 100}%`,
                  backgroundColor: current.accentColor,
                }}
              />
            </div>
            <span className="text-[9px] font-mono text-champagne/90 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 mt-3 font-medium">
              {current.elevation}
            </span>
          </div>

          {/* Interactive 3D Canvas Scene */}
          <SpatialAnatomyCanvas
            layers={LAYERS}
            activeId={activeId}
            isExploded={isExploded}
            onSelect={(id) => setActiveId(id)}
            isInView={isInView}
          />

          {/* Bottom-left Orbit Hint */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 flex items-center space-x-2 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] sm:text-[11px] font-mono text-ivory-dark pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-champagne animate-spin" style={{ animationDuration: "12s" }} />
            <span>Drag to Orbit • Click Slabs to Inspect</span>
          </div>

          {/* Top-Right Active Tier Indicator */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center space-x-1.5 bg-obsidian/85 backdrop-blur-md px-3 py-1 rounded-full border border-champagne/30 text-[10px] font-mono text-champagne pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
            <span>3D Interactive Anatomy</span>
          </div>
        </div>

        {/* Right: Curatorial Deep Dossier (Col 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:pl-2">
          <div key={current.id} className="animate-luxury-fade space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2">
                <span className="w-4 h-[1px]" style={{ backgroundColor: current.accentColor }} />
                <span
                  className="text-[11px] uppercase font-mono tracking-[0.25em] font-medium"
                  style={{ color: current.accentColor }}
                >
                  {current.category}
                </span>
              </div>

              <h4 className="font-serif text-3xl sm:text-4xl text-ivory font-light leading-tight transition-all duration-300">
                {current.title}
              </h4>

              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
                {current.description}
              </p>
            </div>

            {/* Technical Ledger Box */}
            <div className="bg-obsidian/90 border border-champagne/20 rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs font-mono shadow-xl backdrop-blur-xl">
              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-ivory-dark uppercase tracking-widest text-[11px]">
                  Material Matrix
                </span>
                <span className="text-ivory font-sans text-right max-w-[62%]">
                  {current.material}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-ivory-dark uppercase tracking-widest text-[11px]">
                  Technical Spec
                </span>
                <span className="text-champagne font-sans text-right max-w-[62%]">
                  {current.spec}
                </span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-white/5">
                <span className="text-ivory-dark uppercase tracking-widest text-[11px]">
                  Relative Elevation
                </span>
                <span className="text-ivory font-mono font-medium">
                  {current.elevation}
                </span>
              </div>

              <div className="flex justify-between py-1 text-[11px]">
                <span className="text-ivory-dark uppercase tracking-widest">
                  Handover Standard
                </span>
                <span className="text-champagne flex items-center space-x-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Atelier Certified 1-of-1</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Select Buttons 05 to 01 (Safe horizontal tabs, no clipping) */}
          <div className="pt-2">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-ivory-dark mb-2.5">
              Select Architectural Tier
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[...LAYERS].reverse().map((l) => {
                const isSelected = activeId === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => setActiveId(l.id)}
                    className={`h-11 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center border transition-all duration-300 ${
                      isSelected
                        ? "bg-champagne text-obsidian border-champagne shadow-champagne scale-105 ring-2 ring-champagne/40"
                        : "bg-obsidian/80 text-ivory-muted border-white/10 hover:border-champagne/50 hover:text-ivory hover:scale-102"
                    }`}
                    aria-label={`Select tier ${l.tierNumber}`}
                  >
                    <span>{l.tierNumber}</span>
                    <span className="text-[8px] font-normal opacity-75">{l.elevation}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
