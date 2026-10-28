"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    title: "Full-Scope Interior Architecture",
    category: "Spatial Planning & Execution",
    description: "From demolition down to the structural core, we re-architect interior volumes, partition walls, integrated reveals, and ceiling datum planes to maximize natural daylight and organic flow.",
    deliverables: ["Structural Space Planning", "Millwork & Joinery Blueprints", "Permit & Contractor Supervision"],
  },
  {
    num: "02",
    title: "Bespoke Sculptural Furniture",
    category: "Couture Commission",
    description: "Tailored statement pieces carved specifically for your architectural context. We partner with master stonemasons in Tivoli and joinery ateliers in Northern Italy to create heirloom-grade centerpieces.",
    deliverables: ["1-of-1 Sculptural Seating", "Monolithic Stone Plinths", "Architectural Credenzas & Tables"],
  },
  {
    num: "03",
    title: "Material & Tactile Curation",
    category: "Materiality Atelier",
    description: "We source rare, ethically harvested stones, raw Belgian linens, patinated bronzes, and reclaimed woods to assemble a cohesive tactile palette that ages with natural grace.",
    deliverables: ["Custom Stone & Timber Selection", "Textile & Drapery Harmonization", "Hardware & Joinery Finish Design"],
  },
  {
    num: "04",
    title: "Lighting & Acoustic Atmosphere",
    category: "Sensory Environment",
    description: "A room's emotional resonance hinges on acoustic calm and shadow gradients. We orchestrate low-glare architectural lighting and sound-dampening acoustic wall architectures.",
    deliverables: ["Circadian Lighting Schemes", "Hidden Acoustic Wall Systems", "Custom Luminaire Fabrication"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            badge="Atelier Disciplines"
            title="Comprehensive Design Services"
            subtitle="Tailored to discerning residential clients, private family estates, and penthouse sanctuaries."
          />
          <Link
            href="/services"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-mono text-champagne hover:underline"
          >
            <span>Explore All Atelier Services</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Tilt Services Grid with ScrollTrigger Reveal */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv) => (
            <Tilt3D key={srv.num} maxTilt={8} scale={1.015}>
              <div className="h-full bg-charcoal border border-champagne/15 hover:border-champagne/50 rounded-2xl p-8 sm:p-10 transition-all duration-300 hover:shadow-champagne flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-mono text-xs uppercase tracking-widest text-champagne">
                      {srv.category}
                    </span>
                    <span className="font-mono text-lg text-ivory-dark group-hover:text-champagne transition-colors">
                      {srv.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory mt-6 mb-4 font-light">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light mb-8">
                    {srv.description}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-dark block mb-3">
                    Scope of Deliverables
                  </span>
                  <ul className="space-y-2">
                    {srv.deliverables.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-ivory flex items-center space-x-2 font-mono"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                        <span>{item}</span>
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
