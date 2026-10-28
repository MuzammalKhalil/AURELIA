"use client";

import React, { useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  {
    step: "01",
    phase: "Dialogue & Spatial Discovery",
    duration: "Weeks 1–3",
    description: "We conduct an intimate lifestyle audit: analyzing your daily domestic rituals, natural daylight angles, acoustic patterns, and functional priorities.",
    details: ["Acoustic & Daylight Study", "Functional Ritual Matrix", "Preliminary Spatial Moodboards"],
  },
  {
    step: "02",
    phase: "3D Spatial Modeling & Architecture",
    duration: "Weeks 4–7",
    description: "Our atelier renders full real-time 3D models of your rooms, exploring volumetric hierarchy, custom partition reveals, and ceiling datum alignments.",
    details: ["Interactive 3D Walkthroughs", "Structural Architectural Plans", "Lighting & Electrical Schema"],
  },
  {
    step: "03",
    phase: "Material Procurement & Craft",
    duration: "Weeks 8–14",
    description: "We travel directly to European stone quarries and master joineries to inspect travertine blocks, walnut slabs, and hand-loomed textiles in person.",
    details: ["Direct Quarry Block Selection", "Joinery & Hardware Mockups", "1-of-1 Furniture Fabrication"],
  },
  {
    step: "04",
    phase: "White-Glove Turnkey Reveal",
    duration: "Weeks 15–18",
    description: "Our master installation crew oversees final acoustic tuning, sculpture placement, curated library styling, and fragrance orchestration for the handover.",
    details: ["Architectural Art Hanging", "Acoustic & Lighting Balancing", "Curated Archival Handover Dossier"],
  },
];

export default function DesignProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 82%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-obsidian border-t border-champagne/15 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          badge="Methodology & Precision"
          title="Our Curatorial Process"
          subtitle="From initial spatial concept to white-glove handover, a meticulous 4-stage journey."
          className="mb-16"
        />

        {/* 4 Steps Grid with ScrollTrigger Reveal */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => (
            <Tilt3D key={item.step} maxTilt={9} scale={1.02}>
              <div className="h-full bg-charcoal border border-white/10 hover:border-champagne/50 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 relative group shadow-dark hover:shadow-champagne">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 h-[1px] bg-champagne/20 z-10" />
                )}

                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="font-serif text-3xl text-champagne font-light">
                      {item.step}
                    </span>
                    <span className="font-mono text-xs text-ivory-dark">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-ivory mt-5 mb-3 font-light">
                    {item.phase}
                  </h3>

                  <p className="text-xs text-ivory-muted leading-relaxed font-light mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <ul className="space-y-1.5">
                    {item.details.map((d) => (
                      <li
                        key={d}
                        className="text-[11px] font-mono text-ivory-dark flex items-center space-x-2"
                      >
                        <span className="w-1 h-1 rounded-full bg-champagne/60" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
