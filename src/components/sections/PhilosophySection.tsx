"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SpatialLayerStack from "@/components/ui/SpatialLayerStack";
import Tilt3D from "@/components/ui/Tilt3D";
import Pillar3DVisual from "@/components/ui/Pillar3DVisual";
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
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

        {/* 4 Architectural Pillars with Interactive 3D Visuals & 3D Spatial Depth */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4"
        >
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCard === idx;
            return (
              <Tilt3D key={pillar.title} maxTilt={12} scale={1.03}>
                <div
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`h-full relative bg-obsidian/70 border rounded-2xl p-7 flex flex-col justify-between transition-all duration-500 overflow-hidden group select-none ${
                    isHovered
                      ? "border-champagne/60 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(201,166,107,0.25)] -translate-y-2"
                      : "border-white/10 hover:border-champagne/30 shadow-lg"
                  }`}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Dynamic background light radial */}
                  <div
                    className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle, rgba(201,166,107,0.25), transparent 70%)",
                      opacity: isHovered ? 1 : 0.2,
                    }}
                  />

                  {/* Top Bar: Icon + Tier Index */}
                  <div
                    className="flex items-center justify-between mb-2 relative z-10"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-champagne text-obsidian shadow-champagne scale-110"
                          : "bg-champagne/10 border border-champagne/30 text-champagne"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`font-mono text-xs font-bold transition-colors ${
                        isHovered ? "text-champagne" : "text-ivory-dark"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Real Interactive 3D Geometric Animation */}
                  <div
                    className="relative z-10 transition-transform duration-500"
                    style={{ transform: isHovered ? "translateZ(50px) scale(1.05)" : "translateZ(25px)" }}
                  >
                    <Pillar3DVisual type={idx as 0 | 1 | 2 | 3} isHovered={isHovered} />
                  </div>

                  {/* Title & Description */}
                  <div
                    className="relative z-10"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <h3
                      className={`font-serif text-xl mb-2.5 font-light transition-colors ${
                        isHovered ? "text-champagne" : "text-ivory"
                      }`}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bottom Discipline Badge */}
                  <div
                    className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between relative z-10"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    <span
                      className={`text-[10px] uppercase font-mono tracking-widest transition-colors ${
                        isHovered ? "text-champagne font-semibold" : "text-champagne/70"
                      }`}
                    >
                      Discipline
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isHovered ? "bg-champagne shadow-[0_0_10px_#C9A66B] scale-125" : "bg-champagne/40"
                      }`}
                    />
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
