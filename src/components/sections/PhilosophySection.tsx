"use client";

import React, { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpatialLayerStack from "@/components/ui/SpatialLayerStack";
import Tilt3D from "@/components/ui/Tilt3D";
import { Compass, Sparkles, Feather, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const pillars = [
  {
    icon: Compass,
    title: "Spatial Proportions & Void",
    description: "We orchestrate spatial geometry so that negative space holds as much emotional weight and calm as the architectural structures themselves.",
  },
  {
    icon: Sparkles,
    title: "Tactile Material Honesty",
    description: "Every material—from raw Roman travertine to Canaletto walnut and unbleached Belgian linen—is allowed to age gracefully with an authentic patina.",
  },
  {
    icon: Feather,
    title: "Warm Light Orchestration",
    description: "We sculpt natural circadian light by day and craft warm, atmospheric shadow gradients by night, creating intimate emotional sanctuary.",
  },
  {
    icon: Eye,
    title: "Sculptural Singular Curation",
    description: "Furniture pieces are not merely assembled; they are bespoke commissioned sculptures engineered to withstand fleeting design trends.",
  },
];

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header reveal animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 3D Layer Stack reveal animation
      if (stackRef.current) {
        gsap.fromTo(
          stackRef.current,
          { opacity: 0, y: 50, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stackRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // 4 Pillars staggered reveal
      if (pillarsRef.current) {
        const cards = pillarsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 bg-charcoal border-y border-champagne/15 overflow-hidden"
    >
      {/* Background radial accent */}
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-20">
        
        {/* Editorial Heading */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-white/10"
        >
          <SectionHeading
            badge="Manifesto & Philosophy"
            title="Spaces with soul. Details with purpose."
            subtitle="We reject sterile minimalism and noisy ornamentation alike. Our craft is dedicated to the poetic quietude of authentic luxury."
          />
          <div className="max-w-sm text-xs text-ivory-dark leading-relaxed font-mono bg-obsidian/40 p-5 rounded-2xl border border-white/5">
            &ldquo;A residence should not demand attention; it should restore peace, deepen presence, and hold timeless generational memory.&rdquo;
            <span className="block text-champagne mt-2 font-serif text-sm">— Aurelia Design Atelier</span>
          </div>
        </div>

        {/* Puture.co.kr Inspired 3D Isometric Layer Stack Component */}
        <div ref={stackRef}>
          <SpatialLayerStack />
        </div>

        {/* 4 Architectural Pillars with 3D Tilt */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Tilt3D key={pillar.title} maxTilt={10} scale={1.02}>
                <div className="h-full relative bg-obsidian/60 border border-white/10 hover:border-champagne/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl group">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-ivory-dark group-hover:text-champagne transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl text-ivory mb-3 font-light">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/70">
                      Discipline
                    </span>
                    <span className="w-2 h-2 rounded-full bg-champagne/40 group-hover:bg-champagne transition-colors" />
                  </div>
                </div>
              </Tilt3D>
            );
          })}
        </div>

      </div>
    </section>
  );
}
