"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
import ModelFallback from "@/components/3d/ModelFallback";

// Dynamic import with SSR false for Three.js Canvas to prevent hydration mismatches
const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => <ModelFallback title="Interactive 3D Furniture Hero" />,
});

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-champagne/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -top-32 right-10 w-[400px] h-[400px] bg-champagne/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Architectural Editorial Text (Col 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-7 text-left">
            <div className="inline-flex items-center space-x-2.5">
              <span className="w-8 h-[1px] bg-champagne" />
              <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne font-medium">
                Atelier Architectural 2026
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-light text-ivory tracking-tight leading-[1.08]">
              The Art of <br />
              <span className="italic font-normal luxury-gradient-text">
                Elevated Living
              </span>
            </h1>

            <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-lg">
              We design architectural spaces with soul and sculptural furniture with purpose. Where monolithic materiality, tactile warmth, and natural light harmonize into timeless domestic sanctuaries.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/spaces"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-obsidian bg-champagne hover:bg-champagne-300 px-7 py-3.5 rounded-full transition-all duration-300 shadow-champagne hover:scale-[1.02]"
              >
                <span>Enter 3D Showcase</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-ivory border border-champagne/30 hover:border-champagne hover:bg-champagne/10 px-7 py-3.5 rounded-full transition-all duration-300"
              >
                <span>View Portfolio</span>
              </Link>
            </div>

            {/* Curatorial Trust Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-2 xs:gap-3 sm:gap-6">
              <div>
                <span className="block font-serif text-xl xs:text-2xl md:text-3xl text-ivory font-light">
                  18+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-ivory-dark">
                  Years Provenance
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl xs:text-2xl md:text-3xl text-champagne font-light">
                  140+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-ivory-dark">
                  Private Residencies
                </span>
              </div>
              <div>
                <span className="block font-serif text-xl xs:text-2xl md:text-3xl text-ivory font-light">
                  100%
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-ivory-dark">
                  Bespoke Craft
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Hero Furniture (Col 7) */}
          <div className="lg:col-span-7 w-full">
            <HeroScene />
          </div>

        </div>
      </div>
    </section>
  );
}

