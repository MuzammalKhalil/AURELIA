"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import SectionHeading from "@/components/ui/SectionHeading";
import ModelFallback from "@/components/3d/ModelFallback";
import Tilt3D from "@/components/ui/Tilt3D";
import Link from "next/link";
import { ArrowUpRight, Compass, Eye, Layers, Sparkles, Volume2, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InteriorShowcaseScene = dynamic(
  () => import("@/components/3d/InteriorShowcaseScene"),
  {
    ssr: false,
    loading: () => <ModelFallback title="Interactive 3D Signature Spaces Tour" />,
  }
);

const roomSpecs = [
  {
    title: "The Grand Salon Concept",
    area: "95 m²",
    ceilingHeight: "3.8 m",
    flooring: "Roman Vein-cut Travertine & Smoked French Oak",
    lighting: "Recessed circadian cove perimeter & brass architectural lanterns",
    focalPoint: "Cantilevered Nero Marquina hearth & curved boucle sofa grouping",
  },
  {
    title: "Acoustic Attenuation",
    rating: "STC 58 sound isolation",
    finishes: "Slatted acoustic American walnut wall baffling with natural felt core",
    reverberation: "Controlled 0.45s decay time for intimate conversation clarity",
    integration: "Concealed high-fidelity architectural line arrays",
    focalPoint: "Perimeter shadow reveal with acoustic isolation gaskets",
  },
];

export default function SpacesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (specsRef.current) {
        gsap.fromTo(
          specsRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: specsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-24 overflow-hidden">
      {/* Intro Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Signature Spaces • Spatial Walkthrough"
            title="The Living Room Experience in Real-Time 3D"
            subtitle="Navigate through the full 3D interior. Use the controls at the top or scroll downwards to move the camera between curated architectural vantage points."
          />
          <div className="flex items-center space-x-2 bg-charcoal border border-champagne/30 px-4 py-2 rounded-full text-xs font-mono text-champagne self-start md:self-auto shadow-champagne">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WebGL 2.0 Real-time Rendering</span>
          </div>
        </div>
      </section>

      {/* 3D Scene Viewport */}
      <section className="w-full relative mb-24 border-y border-champagne/20">
        <InteriorShowcaseScene />
      </section>

      {/* Architectural Specifications Table with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12">
          <SectionHeading
            badge="Engineering Ledger"
            title="Architectural Blueprints & Acoustic Matrix"
            subtitle="The exact spatial dimensions, material assemblies, and isolation metrics engineered into the living room sanctum."
          />
        </div>

        <div ref={specsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {roomSpecs.map((spec) => (
            <Tilt3D key={spec.title} maxTilt={6} scale={1.015}>
              <div className="bg-charcoal border border-white/10 hover:border-champagne/50 rounded-2xl p-8 space-y-6 transition-all duration-300 shadow-xl backdrop-blur-xl group">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="font-serif text-2xl text-ivory font-light group-hover:text-champagne transition-colors">
                    {spec.title}
                  </h3>
                  <span className="font-mono text-xs text-champagne">
                    {spec.area || spec.rating}
                  </span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  {Object.entries(spec)
                    .filter(([k]) => k !== "title" && k !== "area" && k !== "rating")
                    .map(([key, val]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-ivory-dark uppercase tracking-widest text-[10px] capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </span>
                        <span className="text-ivory font-sans text-right max-w-[65%] font-light">
                          {val}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="bg-obsidian border border-champagne/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="font-serif text-xl text-ivory block">
                Commission a Custom 3D Architectural Walkthrough
              </span>
              <span className="text-xs text-ivory-muted font-light">
                Every private Aurelia project receives a bespoke WebGL digital twin prior to physical construction.
              </span>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-champagne hover:bg-champagne-light text-obsidian px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all shadow-champagne flex-shrink-0"
          >
            <span>Inquire on Spatial Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
