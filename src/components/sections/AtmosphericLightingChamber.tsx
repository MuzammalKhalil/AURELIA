"use client";

import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import SectionHeading from "@/components/ui/SectionHeading";
import { Sun, Sunset, Flame, Moon, Sparkles, Compass, Sliders, RotateCw } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "@/hooks/useInView";

interface AmbiancePreset {
  id: string;
  name: string;
  kelvin: string;
  description: string;
  ambientColor: string;
  ambientIntensity: number;
  dirColor: string;
  dirIntensity: number;
  secondaryColor: string;
}

const PRESETS: Record<string, AmbiancePreset> = {
  dawn: {
    id: "dawn",
    name: "Morning Mist",
    kelvin: "6500K Clean Daylight",
    description: "Crisp architectural daylight pouring through raking windows, accentuating raw stone crevices and natural bouclé weave.",
    ambientColor: "#E2E8F0",
    ambientIntensity: 1.4,
    dirColor: "#F8FAFC",
    dirIntensity: 2.5,
    secondaryColor: "#93C5FD",
  },
  golden: {
    id: "golden",
    name: "Golden Hour Sunset",
    kelvin: "3000K Amber Horizon",
    description: "Warm golden rays cascading at a low 15° angle, casting elongated velvet shadows and illuminating brushed brass patinas.",
    ambientColor: "#FED7AA",
    ambientIntensity: 0.9,
    dirColor: "#F59E0B",
    dirIntensity: 3.2,
    secondaryColor: "#D97706",
  },
  candlelight: {
    id: "candlelight",
    name: "Candlelight Salon",
    kelvin: "2200K Intimate Glow",
    description: "Intimate low-lux sanctuary calibrated for twilight relaxation, casting flickering ember tones across dark timber paneling.",
    ambientColor: "#78350F",
    ambientIntensity: 0.4,
    dirColor: "#EA580C",
    dirIntensity: 2.2,
    secondaryColor: "#92400E",
  },
  nocturne: {
    id: "nocturne",
    name: "Nocturne Luminaire",
    kelvin: "2700K Gallery Spotlight",
    description: "Museum-grade focused ceiling spotlighting that frames sculptural furniture contours against deep obsidian shadows.",
    ambientColor: "#1E293B",
    ambientIntensity: 0.3,
    dirColor: "#FEF3C7",
    dirIntensity: 3.8,
    secondaryColor: "#334155",
  },
};

function ChamberModel({ modelPath, scale, rotationSpeed }: { modelPath: string; scale: number; rotationSpeed: number }) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && rotationSpeed > 0) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}

export default function AtmosphericLightingChamber() {
  const [activePreset, setActivePreset] = useState<string>("golden");
  const [activeModel, setActiveModel] = useState<"chair" | "lamp" | "sculpture">("chair");
  const [lightAngle, setLightAngle] = useState<number>(45);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const sectionRef = useRef<HTMLElement>(null);
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.1);

  const preset = PRESETS[activePreset];

  // GSAP ScrollTrigger Entrance
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Compute light coordinates based on light angle slider
  const rad = (lightAngle * Math.PI) / 180;
  const lightX = Math.cos(rad) * 6;
  const lightZ = Math.sin(rad) * 6;

  const modelConfig = {
    chair: { path: "/models/luxury-chair.glb", scale: 1.1 },
    lamp: { path: "/models/brass-lamp.glb", scale: 0.45 },
    sculpture: { path: "/models/sculptural-art.glb", scale: 0.8 },
  }[activeModel];

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-charcoal border-y border-champagne/15 relative overflow-hidden"
    >
      {/* Background ambient lighting matching the current Kelvin temperature */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none transition-all duration-1000 opacity-20"
        style={{
          backgroundColor: preset.dirColor,
          top: "20%",
          right: "15%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <SectionHeading
            badge="Atmospheric Chamber • 3D Lighting Lab"
            title="Lighting & Shadow Calibration"
            subtitle="Observe how diurnal daylight progression, circadian Kelvin warmth, and raking shadows sculpt home decor materials in real-time."
          />

          <div className="flex items-center space-x-2 bg-obsidian/80 px-4 py-2 rounded-full border border-champagne/25 text-xs font-mono text-champagne self-start md:self-auto">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive PBR Simulator</span>
          </div>
        </div>

        {/* Interactive Chamber Grid: Left Controls (Col 5) | Right 3D Viewport (Col 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Controls & Ambiance Dossier (Col 5) */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            {/* 4 Ambiance Mood Selectors */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-ivory-dark">
                Select Circadian Ambiance:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {Object.values(PRESETS).map((p) => {
                  const isSelected = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePreset(p.id)}
                      className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                        isSelected
                          ? "bg-obsidian border-champagne shadow-champagne ring-1 ring-champagne/50 scale-[1.02]"
                          : "bg-obsidian/60 border-white/10 hover:border-champagne/40 hover:bg-obsidian/90"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className="text-[11px] sm:text-xs font-serif text-ivory font-medium">
                          {p.name}
                        </span>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: p.dirColor }}
                        />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono text-champagne/80">
                        {p.kelvin}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Ambiance Description Box */}
            <div className="bg-obsidian/80 border border-white/10 rounded-2xl p-6 space-y-3 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-xs font-mono">
                <span className="text-champagne uppercase tracking-widest text-[11px]">
                  Atmospheric Ledger
                </span>
                <span className="text-ivory-dark text-[10px]">
                  {preset.kelvin}
                </span>
              </div>
              <p className="text-xs text-ivory-muted font-light leading-relaxed">
                {preset.description}
              </p>
            </div>

            {/* Sun Azimuth & Angle Slider */}
            <div className="bg-obsidian/80 border border-white/10 rounded-2xl p-6 space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-ivory uppercase tracking-widest text-[11px] flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-champagne" />
                  <span>Light Azimuth Angle</span>
                </span>
                <span className="text-champagne font-bold">{lightAngle}°</span>
              </div>

              <input
                type="range"
                min="0"
                max="360"
                value={lightAngle}
                onChange={(e) => setLightAngle(Number(e.target.value))}
                className="w-full accent-[#C9A66B] bg-white/10 rounded-lg cursor-pointer h-1.5"
              />

              <div className="flex justify-between text-[10px] font-mono text-ivory-dark">
                <span>0° East Dawn</span>
                <span>180° South Noon</span>
                <span>360° West Dusk</span>
              </div>
            </div>

            {/* 3D Decor Subject Switcher */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-mono text-ivory-dark">
                <span className="uppercase tracking-widest">Test 3D Decor Subject:</span>
                <button
                  onClick={() => setAutoRotate(!autoRotate)}
                  className={`flex items-center space-x-1 text-[11px] transition-colors ${
                    autoRotate ? "text-champagne" : "text-ivory-dark hover:text-ivory"
                  }`}
                >
                  <RotateCw className="w-3 h-3" />
                  <span>{autoRotate ? "Auto-Orbit: ON" : "Auto-Orbit: OFF"}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {(["chair", "lamp", "sculpture"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveModel(m)}
                    className={`py-2 sm:py-2.5 px-1 rounded-xl border text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all text-center ${
                      activeModel === m
                        ? "bg-champagne text-obsidian border-champagne font-bold shadow-champagne"
                        : "bg-obsidian/60 border-white/10 hover:border-champagne/40 text-ivory-muted"
                    }`}
                  >
                    {m === "chair" ? (
                      <>
                        <span className="hidden sm:inline">Lounge </span>Armchair
                      </>
                    ) : m === "lamp" ? (
                      <>
                        <span className="hidden sm:inline">Brass </span>Lamp
                      </>
                    ) : (
                      <>
                        <span className="hidden sm:inline">Bronze </span>Ribbon
                      </>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right: 3D Real-Time Chamber Viewport (Col 7) */}
          <div
            ref={containerRef}
            className="lg:col-span-7 h-[380px] xs:h-[440px] sm:h-[520px] rounded-2xl sm:rounded-3xl bg-obsidian border border-champagne/20 relative overflow-hidden shadow-2xl flex items-center justify-center"
          >
            {/* Top Compass Pill */}
            <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center space-x-1.5 sm:space-x-2 bg-charcoal/80 border border-white/15 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono text-ivory backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-champagne" />
              <span>Angle: {lightAngle}° • {preset.name}</span>
            </div>

            {/* Canvas */}
            {isInView && (
              <Canvas
                dpr={1}
                camera={{ position: [0, 1.4, 3.4], fov: 45 }}
                className="cursor-grab active:cursor-grabbing w-full h-full"
              >
                {/* Dynamic Lighting System */}
                <ambientLight
                  color={preset.ambientColor}
                  intensity={preset.ambientIntensity}
                />
                
                {/* Directional Sun / Light source positioned via slider angle */}
                <directionalLight
                  position={[lightX, 4, lightZ]}
                  intensity={preset.dirIntensity}
                  color={preset.dirColor}
                  castShadow
                />

                {/* Secondary Fill Light */}
                <pointLight
                  position={[-lightX * 0.5, 1, -lightZ * 0.5]}
                  intensity={0.6}
                  color={preset.secondaryColor}
                />

                <Suspense fallback={null}>
                  <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
                    <ChamberModel
                      modelPath={modelConfig.path}
                      scale={modelConfig.scale}
                      rotationSpeed={autoRotate ? 0.25 : 0}
                    />
                  </Float>

                  <ContactShadows
                    position={[0, -0.65, 0]}
                    opacity={0.65}
                    scale={5.5}
                    blur={2.2}
                    far={4}
                    frames={1}
                  />
                </Suspense>

                <OrbitControls
                  enablePan={false}
                  minDistance={2.0}
                  maxDistance={5.0}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 2 + 0.05}
                />
              </Canvas>
            )}

            {/* Bottom Interaction Hint */}
            <div className="absolute bottom-4 right-5 z-20 pointer-events-none text-[10px] font-mono text-ivory-dark bg-obsidian/70 px-3 py-1 rounded-full border border-white/10">
              Drag to Orbit 360° • Adjust Slider for Sunlight
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
