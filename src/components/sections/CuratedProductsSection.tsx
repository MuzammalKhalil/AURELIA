"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import ProductModal3D from "@/components/3d/ProductModal3D";
import { Sparkles, Eye, Compass, ArrowUpRight, Check, Box } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface DecorProduct {
  id: string;
  title: string;
  category: "Seating" | "Lighting" | "Objets" | "Monoliths";
  material: string;
  modelPath: string;
  scale: number;
  dimensions: string;
  edition: string;
  description: string;
  image: string;
  colorChoices?: { name: string; hex: string }[];
}

const PRODUCTS: DecorProduct[] = [
  {
    id: "lounge-chair",
    title: "Aurelia Monolith Lounge Armchair",
    category: "Seating",
    material: "Alpine Bouclé Wool & American Canaletto Walnut",
    modelPath: "/models/luxury-chair.glb",
    scale: 1.15,
    dimensions: "W 92cm × D 88cm × H 76cm",
    edition: "Numbered Series of 12",
    description: "Deep low-slung lounge armchair engineered with biomorphic curves, cloud-soft looped bouclé, and solid oil-rubbed walnut joinery.",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80",
    colorChoices: [
      { name: "Cream Bouclé", hex: "#F4F0E8" },
      { name: "Obsidian", hex: "#1A1A1A" },
      { name: "Champagne Velvet", hex: "#C9A66B" },
    ],
  },
  {
    id: "salon-sofa",
    title: "Velvet Salon Curved Sofa",
    category: "Seating",
    material: "Smoked Charcoal Velvet & Brushed Antique Brass",
    modelPath: "/models/luxury-sofa.glb",
    scale: 0.9,
    dimensions: "W 240cm × D 110cm × H 74cm",
    edition: "Atelier Made-to-Order",
    description: "Curvilinear three-seater sanctuary upholstered in dense Italian silk-cotton velvet resting on a continuous brushed brass plinth.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    colorChoices: [
      { name: "Smoked Charcoal", hex: "#222222" },
      { name: "Champagne Gold", hex: "#C9A66B" },
    ],
  },
  {
    id: "brass-lamp",
    title: "Lanterne Brutaliste Brass Luminaire",
    category: "Lighting",
    material: "Hand-Patinated Antique Brass & 2700K Warm LED",
    modelPath: "/models/brass-lamp.glb",
    scale: 0.5,
    dimensions: "H 56cm × W 28cm × D 28cm",
    edition: "Numbered Cast of 20",
    description: "Architectural luminaire casting low-glare shadow gradients, inspired by Milanese mid-century sanctums and cast brass foundry traditions.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ceramic-vase",
    title: "Vessel No. VII 'Solitude'",
    category: "Objets",
    material: "Matte Ivory Feldspathic Stoneware",
    modelPath: "/models/ceramic-vase.glb",
    scale: 1.5,
    dimensions: "H 42cm × Ø 24cm",
    edition: "Woodfire Kiln Series",
    description: "Hand-thrown fluted ceramic vessel finished in a matte chalk feldspar glaze with subtle micro-iron speckling, anchoring meditative console vignettes.",
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sculpture-art",
    title: "Infinitum Ribbon IV Bronze",
    category: "Objets",
    material: "Lost-Wax Cast Champagne Bronze on Nero Marquina",
    modelPath: "/models/sculptural-art.glb",
    scale: 0.8,
    dimensions: "H 48cm × W 32cm × D 30cm",
    edition: "Cast Edition 3 of 8",
    description: "Continuous cast-bronze ribbon sculpture exploring mathematical infinity and poetic negative volume, mounted on a solid black marble pedestal.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "stone-table",
    title: "Tivoli Roman Travertine Monolith",
    category: "Monoliths",
    material: "Roman Vein-Cut Tivoli Travertine Slab",
    modelPath: "/models/side-table.glb",
    scale: 1.25,
    dimensions: "W 65cm × D 65cm × H 46cm",
    edition: "Honed Monolith 1-of-1",
    description: "Solid travertine architectural side table carved with chamfered cantilevered edges, showing natural geological fissures and porous thermal texture.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
  },
];

type FilterCategory = "All" | "Seating" | "Lighting" | "Objets" | "Monoliths";

export default function CuratedProductsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedProduct, setSelectedProduct] = useState<DecorProduct | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeFilter === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeFilter);

  // GSAP ScrollTrigger Scroll Entrance Animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
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

      // Grid cards staggered entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
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
  }, [activeFilter]);

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-obsidian border-y border-champagne/15 relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-champagne/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        
        {/* Section Heading & Filter Bar */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/10">
          <SectionHeading
            badge="Curated Haute Collection • 3D Atelier"
            title="Sculptural Decor & Furniture Portfolio"
            subtitle="Explore bespoke architectural pieces, museum-grade stoneware, and handcrafted luminaires engineered for timeless interior spaces."
          />

          {/* Filter Category Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {(["All", "Seating", "Lighting", "Objets", "Monoliths"] as FilterCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-champagne text-obsidian font-bold shadow-champagne scale-105"
                    : "bg-charcoal/80 text-ivory-dark border border-white/10 hover:border-champagne/50 hover:text-ivory"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Product Grid with 3D Tilt Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <Tilt3D key={prod.id} maxTilt={9} scale={1.02}>
              <div className="h-full bg-charcoal/80 border border-white/10 hover:border-champagne/50 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group relative overflow-hidden backdrop-blur-xl">
                
                {/* Image & 3D Badge Container */}
                <div>
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-obsidian mb-6 group-hover:shadow-lg transition-shadow">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-60" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-obsidian/85 border border-white/15 text-[10px] font-mono uppercase tracking-widest text-champagne backdrop-blur-md">
                        {prod.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-champagne text-obsidian text-[10px] font-mono font-bold flex items-center space-x-1 shadow-champagne">
                        <Box className="w-3 h-3" />
                        <span>3D Ready</span>
                      </span>
                    </div>

                    {/* Quick Inspect Button on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-obsidian/50 backdrop-blur-[2px]">
                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="bg-champagne hover:bg-champagne-light text-obsidian px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest font-semibold flex items-center space-x-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Inspect in 3D</span>
                      </button>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-champagne">
                      <span>{prod.edition}</span>
                      <span className="text-ivory-dark">{prod.dimensions}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-ivory font-light group-hover:text-champagne transition-colors leading-tight">
                      {prod.title}
                    </h3>

                    <p className="text-xs text-ivory-muted font-light line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer Spec & 3D Inspect Trigger */}
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-ivory-dark uppercase tracking-wider">
                    {prod.material.split("&")[0]}
                  </div>

                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-champagne hover:text-champagne-light group-hover:translate-x-1 transition-all"
                  >
                    <span>View 3D</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </Tilt3D>
          ))}
        </div>

      </div>

      {/* 3D Real-Time Inspection Modal */}
      <ProductModal3D
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}

