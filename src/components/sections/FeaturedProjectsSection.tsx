"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "The Tribeca Monolith Penthouse",
    location: "Tribeca, New York",
    category: "Full Architectural Renovation",
    year: "2025",
    area: "480 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    description: "A sanctuary of vein-cut Roman travertine, smoked European oak wall systems, and bronze reveals overlooking the Hudson River.",
  },
  {
    title: "Kyoto Timber Pavilion Residence",
    location: "Higashiyama, Kyoto",
    category: "Private Architectural Estate",
    year: "2024",
    area: "350 m²",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80",
    description: "Bridging traditional Sukiya-zukuri carpentry with modern minimalist acoustics and low-slung shearling seating.",
  },
  {
    title: "Villa Bellagio Lake Sanctuary",
    location: "Lake Como, Italy",
    category: "Historic Restorative Architecture",
    year: "2025",
    area: "620 m²",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80",
    description: "Meticulous restoration of 19th-century ceiling vaults offset by custom Nero Marquina cantilevered fireplaces and brushed brass detailing.",
  },
];

export default function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.16,
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
    <section ref={sectionRef} className="py-28 bg-charcoal border-t border-champagne/15 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeading
            badge="Selected Portfolio"
            title="Interiors shaped around living."
            subtitle="A curated selection of private residences, penthouse sanctuaries, and architectural retreats."
          />
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-mono text-champagne hover:underline"
          >
            <span>View All Commissions</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Tilt Project Cards with ScrollTrigger Stagger */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <Tilt3D key={proj.title} maxTilt={9} scale={1.02}>
              <div className="h-full bg-obsidian border border-white/10 hover:border-champagne/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-obsidian/80 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-champagne backdrop-blur-md">
                        {proj.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-ivory-dark">
                      <span>{proj.location}</span>
                      <span>{proj.year}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-ivory mb-3 font-light group-hover:text-champagne transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light mb-6">
                      {proj.description}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-champagne">
                    Scale: {proj.area}
                  </span>
                  <Link
                    href="/projects"
                    className="inline-flex items-center space-x-1 text-xs font-mono text-ivory group-hover:text-champagne transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </div>
    </section>
  );
}
