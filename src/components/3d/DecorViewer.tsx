"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { Sparkles, Info } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { getAssetPath } from "@/lib/assets";
import Canvas3DLoader from "@/components/3d/Canvas3DLoader";

useGLTF.preload(getAssetPath("/models/ceramic-vase.glb"));
useGLTF.preload(getAssetPath("/models/brass-lamp.glb"));
useGLTF.preload(getAssetPath("/models/sculptural-art.glb"));
useGLTF.preload(getAssetPath("/models/side-table.glb"));

type DecorType = "vase" | "lamp" | "sculpture" | "table";

interface DecorMeta {
  title: string;
  category: string;
  artisan: string;
  material: string;
  dimensions: string;
  edition: string;
  description: string;
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

const DECOR_ITEMS: Record<DecorType, DecorMeta> = {
  vase: {
    title: "Vessel No. VII 'Solitude'",
    category: "Studio Ceramics",
    artisan: "Kyoto Woodfire Kilns",
    material: "Ivory matte feldspathic stoneware",
    dimensions: "H 42cm × Ø 24cm",
    edition: "Numbered Series of 25",
    description: "Fluted organic geometry thrown by hand, finished in a satin chalk glaze with micro-iron flecking.",
    scale: 1.5,
    position: [0, -0.6, 0],
    rotation: [0, 0, 0],
  },
  lamp: {
    title: "Lanterne Brutaliste",
    category: "Architectural Lighting",
    artisan: "Atelier Aurelia & Milanese Foundry",
    material: "Hand-patinated antique brass & blown smoked glass",
    dimensions: "H 56cm × W 28cm × D 28cm",
    edition: "Bespoke Production",
    description: "Architectural luminaire casting warm directional silhouettes reminiscent of Milanese mid-century sanctums.",
    scale: 0.45,
    position: [0, -0.85, 0],
    rotation: [0, 0.4, 0],
  },
  sculpture: {
    title: "Infinitum Ribbon IV",
    category: "Sculptural Objet d'Art",
    artisan: "Geneva Bronze Foundry",
    material: "Lost-wax cast champagne bronze on Nero Marquina plinth",
    dimensions: "H 48cm × W 32cm × D 30cm",
    edition: "Cast 3 of 8",
    description: "Continuous mathematical surface capturing light in perpetual motion, anchored on honed black marble.",
    scale: 1.1,
    position: [0, -0.8, 0],
    rotation: [0, 0.2, 0],
  },
  table: {
    title: "Monolith Pedestal Plinth",
    category: "Architectural Furniture",
    artisan: "Tivoli Stone Masons",
    material: "Roman Vein-cut Travertine & brushed champagne trim",
    dimensions: "H 52cm × Ø 45cm",
    edition: "Hand-carved to order",
    description: "Fluted cylindrical monolith carved from cross-cut travertine quarried from historic Italian hills.",
    scale: 1.1,
    position: [0, -0.85, 0],
    rotation: [0, 0, 0],
  },
};

function ModelItem({ type, isRotating = true }: { type: DecorType; isRotating?: boolean }) {
  const meta = DECOR_ITEMS[type];
  const modelPath = getAssetPath(`/models/${
    type === "vase"
      ? "ceramic-vase.glb"
      : type === "lamp"
      ? "brass-lamp.glb"
      : type === "sculpture"
      ? "sculptural-art.glb"
      : "side-table.glb"
  }`);

  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      meta.position[1] + Math.sin(state.clock.getElapsedTime() * 0.9) * 0.04;
    if (isRotating) {
      meshRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group
      ref={meshRef}
      position={meta.position}
      rotation={meta.rotation}
      scale={meta.scale}
    >
      <primitive object={cloned} />
    </group>
  );
}

export default function DecorViewer() {
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.1);
  const [activeType, setActiveType] = useState<DecorType>("vase");
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const meta = DECOR_ITEMS[activeType];

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Interactive Stage (Col 7) */}
      <div className="lg:col-span-7 relative h-[380px] xs:h-[440px] sm:h-[500px] lg:h-[550px] bg-charcoal rounded-2xl border border-champagne/20 overflow-hidden shadow-dark">
        {/* Stage Header Info & Rotation Toggle */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center space-x-1.5 sm:space-x-2 bg-obsidian/85 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-champagne/30 text-[10px] sm:text-[11px] font-mono text-champagne">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest">3D Object Atelier</span>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 flex items-center space-x-1.5 bg-obsidian/85 backdrop-blur-md px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-champagne/25 text-[10px] font-mono uppercase tracking-widest text-ivory-dark hover:text-ivory hover:border-champagne transition-all"
        >
          <span className={`w-2 h-2 rounded-full ${isRotating ? "bg-champagne animate-pulse" : "bg-white/30"}`} />
          <span>{isRotating ? "Orbiting" : "Paused"}</span>
        </button>

        {/* Object Selector Pills */}
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-wrap justify-center gap-1 sm:gap-1.5 max-w-[94%] sm:max-w-[90%] bg-obsidian/90 backdrop-blur-md p-1 sm:p-1.5 rounded-2xl sm:rounded-full border border-champagne/25 shadow-xl">
          {(["vase", "lamp", "sculpture", "table"] as DecorType[]).map((key) => (
            <button
              key={key}
              onClick={() => setActiveType(key)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all duration-300 ${
                activeType === key
                  ? "bg-champagne text-obsidian font-semibold"
                  : "text-ivory-muted hover:text-ivory hover:bg-white/5"
              }`}
            >
              {key === "vase"
                ? "Ceramic Vase"
                : key === "lamp"
                ? "Brass Lamp"
                : key === "sculpture"
                ? "Ribbon Art"
                : "Travertine Table"}
            </button>
          ))}
        </div>

        {/* Canvas */}
        <Canvas
          camera={{ position: [0, 0.4, 2.8], fov: 40 }}
          dpr={1}
          frameloop={isInView ? "always" : "never"}
          gl={{ antialias: true, alpha: true, precision: "mediump" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <hemisphereLight args={["#FAF8F5", "#141414", 0.9]} />
          <directionalLight position={[3, 4, 3]} intensity={2.0} color="#FFE4BA" />
          <directionalLight position={[-3, 2, -2]} intensity={1.0} color="#C9A66B" />

          <Suspense fallback={<Canvas3DLoader scale={0.75} />}>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
              <ModelItem type={activeType} isRotating={isRotating} />
            </Float>
            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.5}
              scale={3.5}
              blur={2.0}
              far={2}
              frames={1}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Curatorial Dossier & Specs (Col 5) */}
      <div className="lg:col-span-5 flex flex-col space-y-6 lg:pl-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-champagne font-medium">
            {meta.category}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory mt-1">
            {meta.title}
          </h3>
        </div>

        <p className="text-sm text-ivory-muted leading-relaxed font-light">
          {meta.description}
        </p>

        {/* Spec Matrix */}
        <div className="space-y-3 pt-3 border-t border-white/10 text-xs font-mono">
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">Provenance</span>
            <span className="text-ivory font-sans">{meta.artisan}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">Materiality</span>
            <span className="text-champagne font-sans">{meta.material}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">Scale & Dimensions</span>
            <span className="text-ivory font-sans">{meta.dimensions}</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">Availability</span>
            <span className="text-ivory font-sans">{meta.edition}</span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-mono text-champagne border border-champagne/40 hover:border-champagne hover:bg-champagne/10 px-5 py-3 rounded-full transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Inquire About Piece</span>
          </a>
        </div>
      </div>
    </div>
  );
}
