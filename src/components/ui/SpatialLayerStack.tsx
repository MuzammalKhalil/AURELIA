"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sparkles, CheckCircle2, Eye, Compass, MoveUpRight, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LayerData {
  id: number;
  tierNumber: string;
  title: string;
  tagline: string;
  category: string;
  material: string;
  spec: string;
  elevation: string;
  elevationVal: number;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

const LAYERS: LayerData[] = [
  {
    id: 4,
    tierNumber: "05",
    title: "Curatorial Art & Sculptures",
    tagline: "Sculptural Focal Apex",
    category: "Tier 05 • Objets d'Art",
    material: "Lost-wax cast champagne bronze & feldspar stoneware",
    spec: "Cast bronze edition 3 of 8 • Natural chalk satin glaze",
    elevation: "+260 mm",
    elevationVal: 260,
    accentColor: "#C9A66B",
    bgGradient: "from-champagne/25 via-charcoal to-obsidian",
    borderColor: "border-champagne",
    description: "Numbered bronze sculptures and organic stoneware vessels that catch raking daylight and anchor the room's emotional soul.",
  },
  {
    id: 3,
    tierNumber: "04",
    title: "Circadian Lighting Datum",
    tagline: "Atmospheric Luminaire Network",
    category: "Tier 04 • Architectural Lighting",
    material: "Hand-patinated antique brass & 2700K warm LED reveals",
    spec: "CRI 98 color fidelity • Hidden baseboard and ceiling reveals",
    elevation: "+195 mm",
    elevationVal: 195,
    accentColor: "#FFE3B3",
    bgGradient: "from-champagne-300/20 via-charcoal to-obsidian",
    borderColor: "border-champagne/70",
    description: "Low-glare directional shadow casting calibrated to diurnal daylight progression for deep psychological calm.",
  },
  {
    id: 2,
    tierNumber: "03",
    title: "Tactile Bouclé Upholstery",
    tagline: "Sensory Ergonomics",
    category: "Tier 03 • Haute Upholstery",
    material: "Alpine shearling wool & unbleached Belgian linen",
    spec: "Biella Piedmont weave • 100,000 Martindale durability rating",
    elevation: "+130 mm",
    elevationVal: 130,
    accentColor: "#F4F0E8",
    bgGradient: "from-white/20 via-charcoal to-obsidian",
    borderColor: "border-ivory/60",
    description: "Cloud-soft textured looped bouclé that cushions the body while creating rich acoustic dampening throughout the salon.",
  },
  {
    id: 1,
    tierNumber: "02",
    title: "Acoustic Timber Joinery",
    tagline: "Structural Architectural Millwork",
    category: "Tier 02 • Precision Joinery",
    material: "Canaletto walnut & natural acoustic damping felt core",
    spec: "Millimeter shadow-line reveals • Low-VOC organic oil finish",
    elevation: "+65 mm",
    elevationVal: 65,
    accentColor: "#D4B37A",
    bgGradient: "from-amber-950/30 via-charcoal to-obsidian",
    borderColor: "border-champagne/50",
    description: "Slatted acoustic wood paneling attenuating sound reverberations down to 0.45 seconds for whisper-quiet intimacy.",
  },
  {
    id: 0,
    tierNumber: "01",
    title: "Monolithic Stone Plinth",
    tagline: "Foundation Substrate",
    category: "Tier 01 • Architectural Mass",
    material: "Roman vein-cut Tivoli travertine & obsidian slate",
    spec: "Honed cross-cut extraction • 40mm solid slab perimeter",
    elevation: "0.0 mm",
    elevationVal: 0,
    accentColor: "#A39682",
    bgGradient: "from-stone-800/40 via-charcoal to-obsidian",
    borderColor: "border-white/30",
    description: "Massive thermal stone slabs providing organic gravitas, thermal regulation, and structural grounding.",
  },
];

export default function SpatialLayerStack() {
  const [activeId, setActiveId] = useState<number>(4);
  const [isFrontView, setIsFrontView] = useState<boolean>(true);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGRectElement | null)[]>([]);
  const datumPathRef = useRef<SVGPathElement | null>(null);

  // Synchronous Scroll-driven SVG drawable path animation:
  // animate(createDrawable('path'), { draw: ['0 0', '0 1', '1 1'], delay: stagger(40), ease: 'inOut(3)', autoplay: onScroll({ sync: true }) })
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const paths = pathRefs.current.filter(Boolean);
      if (paths.length > 0 && containerRef.current) {
        // Initialize path lengths for SVG draw
        paths.forEach((p) => {
          if (!p) return;
          const len = p.getTotalLength ? p.getTotalLength() : 750;
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = `${len}`;
        });

        if (datumPathRef.current) {
          const dLen = datumPathRef.current.getTotalLength ? datumPathRef.current.getTotalLength() : 300;
          datumPathRef.current.style.strokeDasharray = `${dLen}`;
          datumPathRef.current.style.strokeDashoffset = `${dLen}`;
        }

        // Create scroll-synchronized timeline matching onScroll({ sync: true })
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 25%",
            scrub: 1, // sync: true
          },
        });

        // Staggered path drawing '0 0' to '0 1'
        scrollTl
          .to(paths, {
            strokeDashoffset: 0,
            opacity: 1,
            stagger: 0.1, // stagger(40)
            ease: "power2.inOut", // inOut(3)
          }, 0)
          .to(datumPathRef.current, {
            strokeDashoffset: 0,
            opacity: 0.8,
            ease: "power2.inOut",
          }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax interpolation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleCardClick = (id: number) => {
    if (activeId === id) {
      setIsFrontView(!isFrontView);
    } else {
      setActiveId(id);
      setIsFrontView(true);
    }
  };

  const current = LAYERS.find((l) => l.id === activeId) || LAYERS[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-charcoal/70 border border-champagne/20 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      {/* Dynamic Background radial lighting reacting to selected card */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{
          backgroundColor: current.accentColor,
          top: "30%",
          left: "25%",
        }}
      />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-12 border-b border-white/10 gap-4 relative z-20">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Layer Stack</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
            Deconstructed Spatial Anatomy
          </h3>
        </div>

        {/* Action Toggle Pill */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsFrontView(!isFrontView)}
            className="flex items-center space-x-2 bg-obsidian/90 hover:bg-champagne hover:text-obsidian px-4 py-2 rounded-full border border-champagne/30 text-xs font-mono text-ivory transition-all duration-300 shadow-lg active:scale-95 group"
          >
            <Eye className="w-3.5 h-3.5 text-champagne group-hover:text-obsidian transition-colors" />
            <span>{isFrontView ? "Click Card to Dock / Front" : "Inspect Front View"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* Left: 3D Isometric Exploded Layer Stack Viewport (Col 7) */}
        <div className="lg:col-span-7 relative h-[460px] sm:h-[500px] flex items-center justify-center perspective-[1200px] select-none pt-4">
          
          {/* Scroll-driven Vertical Datum Ruler with Target Node */}
          <div className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 pointer-events-none z-30 flex flex-col items-center">
            <svg width="24" height="260" viewBox="0 0 24 260" className="overflow-visible">
              <path
                ref={datumPathRef}
                d="M 12 10 L 12 250"
                stroke="#C9A66B"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                opacity="0.2"
              />
              <circle
                cx="12"
                cy={250 - (current.id * 52)}
                r="5"
                fill={current.accentColor}
                className="transition-all duration-500 shadow-champagne"
              />
              <circle
                cx="12"
                cy={250 - (current.id * 52)}
                r="10"
                stroke={current.accentColor}
                strokeWidth="1"
                fill="none"
                opacity="0.4"
                className="transition-all duration-500"
              />
            </svg>
            <span className="text-[9px] font-mono text-champagne/80 uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 mt-2">
              {current.elevation}
            </span>
          </div>

          {/* Main 3D Tilting Stage with Mouse Parallax */}
          <div
            className="relative w-72 sm:w-80 md:w-88 h-48 sm:h-52 transition-transform duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${50 + mouseOffset.y}deg) rotateZ(${-36 + mouseOffset.x}deg) rotateY(${mouseOffset.x * 0.4}deg)`,
            }}
          >
            {/* Exploded Layers */}
            {LAYERS.map((layer) => {
              const isSelected = activeId === layer.id;
              
              // Base spacing in isometric stack
              const baseElevation = layer.id * 48;

              // When clicked/selected and in front-facing view:
              // The card counter-rotates and moves forward into the foreground facing the camera!
              const bringToFrontTransform = isSelected && isFrontView
                ? `translateZ(${baseElevation + 160}px) translateY(-35px) rotateZ(35deg) rotateX(-48deg) scale(1.15)`
                : `translateZ(${isSelected ? baseElevation + 42 : baseElevation}px) scale(${isSelected ? 1.04 : 1})`;

              return (
                <div
                  key={layer.id}
                  onClick={() => handleCardClick(layer.id)}
                  className={`absolute inset-0 rounded-2xl backdrop-blur-xl p-5 sm:p-6 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between shadow-2xl relative overflow-hidden group ${
                    isSelected
                      ? `bg-gradient-to-br ${layer.bgGradient} z-30 ring-1 ring-champagne/60`
                      : isFrontView
                      ? "bg-obsidian/90 opacity-40 hover:opacity-80 z-10"
                      : "bg-obsidian/85 opacity-75 hover:opacity-100 z-10"
                  }`}
                  style={{
                    transform: bringToFrontTransform,
                    transformStyle: "preserve-3d",
                    boxShadow: isSelected
                      ? `0 35px 70px -15px rgba(0, 0, 0, 0.95), 0 0 50px ${layer.accentColor}40, inset 0 0 20px ${layer.accentColor}25`
                      : "0 10px 30px -10px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {/* Scroll-Driven SVG Drawable Contour Path matching draw: ['0 0', '0 1', '1 1'] */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl overflow-visible">
                    <rect
                      ref={(el) => {
                        pathRefs.current[layer.id] = el;
                      }}
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="16"
                      ry="16"
                      fill="none"
                      stroke={layer.accentColor}
                      strokeWidth={isSelected ? "2" : "1.2"}
                      opacity={isSelected ? "1" : "0.5"}
                      className="transition-colors duration-500"
                      style={{
                        filter: isSelected ? `drop-shadow(0 0 8px ${layer.accentColor})` : "none",
                      }}
                    />
                  </svg>

                  {/* Subtle specular sheen shine on active front card */}
                  {isSelected && (
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-80" />
                  )}

                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between text-xs font-mono relative z-10">
                    <div className="flex items-center space-x-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full font-bold text-[11px] transition-all"
                        style={{
                          backgroundColor: isSelected ? layer.accentColor : "rgba(255,255,255,0.08)",
                          color: isSelected ? "#0A0A0A" : "#F4F0E8",
                        }}
                      >
                        {layer.tierNumber}
                      </span>
                      {isSelected && isFrontView && (
                        <span className="text-[10px] text-champagne font-mono font-medium flex items-center space-x-1 animate-pulse">
                          <span>• Front View</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/90">
                      {layer.elevation}
                    </span>
                  </div>

                  {/* Center Content */}
                  <div className="relative z-10 my-1">
                    <h4 className="font-serif text-lg sm:text-2xl text-ivory tracking-wide leading-tight mb-1 font-normal group-hover:text-champagne transition-colors">
                      {layer.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-ivory-muted line-clamp-1 font-light">
                      {layer.material}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono text-ivory-dark relative z-10">
                    <span className="line-clamp-1">{layer.tagline}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full transition-transform duration-300"
                      style={{
                        backgroundColor: layer.accentColor,
                        transform: isSelected ? "scale(1.5)" : "scale(1)",
                        boxShadow: isSelected ? `0 0 10px ${layer.accentColor}` : "none",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Curatorial Deep Dossier (Col 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:pl-4">
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
          <div className="bg-obsidian/90 border border-champagne/20 rounded-2xl p-6 space-y-3.5 text-xs font-mono shadow-xl backdrop-blur-xl">
            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-ivory-dark uppercase tracking-widest text-[11px]">
                Material Matrix
              </span>
              <span className="text-ivory font-sans text-right max-w-[60%]">
                {current.material}
              </span>
            </div>

            <div className="flex justify-between py-1.5 border-b border-white/5">
              <span className="text-ivory-dark uppercase tracking-widest text-[11px]">
                Technical Spec
              </span>
              <span className="text-champagne font-sans text-right max-w-[60%]">
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

          {/* Quick Select Buttons 05 to 01 */}
          <div className="flex items-center space-x-3 pt-2">
            {LAYERS.map((l) => {
              const isSelected = activeId === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => {
                    setActiveId(l.id);
                    setIsFrontView(true);
                  }}
                  className={`w-11 h-11 rounded-full text-xs font-mono font-bold flex items-center justify-center border transition-all duration-300 ${
                    isSelected
                      ? "bg-champagne text-obsidian border-champagne shadow-champagne scale-110 ring-2 ring-champagne/40"
                      : "bg-obsidian/80 text-ivory-muted border-white/10 hover:border-champagne/50 hover:text-ivory"
                  }`}
                  aria-label={`Select layer ${l.tierNumber}`}
                >
                  {l.tierNumber}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
