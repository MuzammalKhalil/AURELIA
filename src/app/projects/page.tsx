"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import { ArrowUpRight, Filter, MapPin, X, Compass, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Category = "all" | "penthouse" | "villa" | "pavilion";

const portfolio = [
  {
    id: "tribeca",
    category: "penthouse",
    title: "The Tribeca Monolith Penthouse",
    location: "Tribeca, New York City",
    year: "2025",
    area: "480 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    materials: "Roman Vein-cut Travertine, Smoked European Oak, Champagne Brass",
    description: "A sanctuary of natural daylight overlooking the Hudson River. Built around a central monolithic fireplace mass dividing private quarters from formal reception salons.",
  },
  {
    id: "kyoto",
    category: "pavilion",
    title: "Kyoto Timber Pavilion Residence",
    location: "Higashiyama, Kyoto",
    year: "2024",
    area: "350 m²",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
    materials: "Hinoki Cypress, Shigaraki Ceramics, Raw Slub Linen",
    description: "Honoring traditional Japanese timber joinery while introducing low-slung shearling modular seating and acoustic cedar partitions overlooking a tranquil moss garden.",
  },
  {
    id: "bellagio",
    category: "villa",
    title: "Villa Bellagio Lake Sanctuary",
    location: "Lake Como, Italy",
    year: "2025",
    area: "620 m²",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    materials: "Nero Marquina Marble, Hand-loomed Wool, Fluted Plaster",
    description: "Careful restorative preservation of 19th-century vaulted ceilings contrasted against contemporary cantilevered stone plinths and warm circadian light fixtures.",
  },
  {
    id: "zurich",
    category: "villa",
    title: "Lake Zurich Brutalist Villa",
    location: "Küsnacht, Zurich",
    year: "2024",
    area: "540 m²",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    materials: "Board-formed Concrete, Canaletto Walnut, Brushed Bronze",
    description: "Softening architectural brutalism with acoustic walnut wall paneling, deep boucle armchairs, and concealed perimeter indirect lighting.",
  },
  {
    id: "mayfair",
    category: "penthouse",
    title: "Mayfair Private Salon & Library",
    location: "Mayfair, London",
    year: "2024",
    area: "310 m²",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    materials: "Ebonized Ash, Saddle Leather, Antique Brass, Alabaster",
    description: "An intimate, moody salon engineered for book collecting and private acoustic listening sessions with hidden automated bar reveals.",
  },
  {
    id: "saint-tropez",
    category: "villa",
    title: "Côte d'Azur Coastal Pavilion",
    location: "Saint-Tropez, France",
    year: "2023",
    area: "710 m²",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    materials: "Porous Sandstone, Bleached Oak, Raw Canvas, Polished Plaster",
    description: "Blurring internal and external boundaries with floor-to-ceiling motorized pocketing glass doors and shaded travertine colonnades.",
  },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState<Category>("all");
  const [activeProject, setActiveProject] = useState<typeof portfolio[0] | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "all"
      ? portfolio
      : portfolio.filter((item) => item.category === filter);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [filter]);

  return (
    <div ref={pageRef} className="pt-32 pb-24 overflow-hidden">
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <SectionHeading
          badge="Curated Archive"
          title="Interiors shaped around living."
          subtitle="A comprehensive monograph of private family estates, penthouse sanctuaries, and architectural retreats."
        />

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-ivory-dark mr-2">
            <Filter className="w-3.5 h-3.5 text-champagne" />
            <span>Topology:</span>
          </div>
          {(["all", "penthouse", "villa", "pavilion"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "bg-champagne text-obsidian font-semibold shadow-champagne scale-105"
                  : "bg-charcoal text-ivory-muted hover:text-ivory border border-white/10 hover:border-champagne/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <Tilt3D key={item.id} maxTilt={8} scale={1.02}>
              <div
                onClick={() => setActiveProject(item)}
                className="h-full bg-charcoal border border-white/10 hover:border-champagne/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="relative h-72 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-obsidian/85 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-champagne backdrop-blur-md">
                        {item.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-ivory-dark">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-champagne" />
                        <span>{item.location}</span>
                      </div>
                      <span>{item.year}</span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-serif text-2xl text-ivory mb-3 font-light group-hover:text-champagne transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light mb-6">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-xs text-champagne">
                    Area: {item.area}
                  </span>
                  <button className="inline-flex items-center space-x-1 text-xs font-mono uppercase text-ivory group-hover:text-champagne transition-colors">
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-obsidian/90 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out]">
          <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-charcoal border border-champagne/30 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl space-y-5 sm:space-y-6">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-obsidian border border-white/20 text-ivory hover:text-champagne flex items-center justify-center transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-72 sm:h-88 w-full rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
                <span className="text-champagne font-mono text-xs uppercase tracking-widest">
                  {activeProject.location} • {activeProject.year}
                </span>
                <span className="bg-champagne text-obsidian px-3 py-1 rounded-full text-xs font-mono font-bold">
                  {activeProject.area}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-3xl text-ivory font-light mb-3">
                {activeProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light mb-4">
                {activeProject.description}
              </p>
              <div className="bg-obsidian/70 p-4 rounded-xl border border-white/5 text-xs font-mono">
                <span className="text-champagne block mb-1 uppercase tracking-widest text-[10px]">
                  Material Palette Matrix
                </span>
                <span className="text-ivory font-sans">{activeProject.materials}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Link
                href="/contact"
                className="bg-champagne hover:bg-champagne-light text-obsidian px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-champagne"
              >
                Inquire on Similar Commission
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
