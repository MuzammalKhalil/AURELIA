"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Layers, Rotate3d, Compass } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface MaterialItem {
  id: string;
  name: string;
  type: string;
  origin: string;
  finish: string;
  tactileFeel: string;
  acoustic: string;
  application: string;
  color: string;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
}

const MATERIALS: MaterialItem[] = [
  {
    id: "walnut",
    name: "Canaletto Walnut",
    type: "Hardwood Timber",
    origin: "Trentino, Northern Italy",
    finish: "Hand-rubbed organic beeswax & natural oil",
    tactileFeel: "Silky, warm grain with subtle organic ridges",
    acoustic: "High resonant absorption (NRC 0.35)",
    application: "Architectural wall paneling, credenzas, custom joinery",
    color: "#4A3525",
    roughness: 0.38,
    metalness: 0.05,
    clearcoat: 0.3,
  },
  {
    id: "travertine",
    name: "Roman Vein-Cut Travertine",
    type: "Sedimentary Limestone",
    origin: "Tivoli Quarries, Rome",
    finish: "Honed and semi-filled matte",
    tactileFeel: "Cool, porous tactile surface with micro-cavities",
    acoustic: "Sound diffusing reflective mass",
    application: "Fireplace hearths, plinths, cantilevered islands",
    color: "#D8D0C0",
    roughness: 0.82,
    metalness: 0.02,
  },
  {
    id: "boucle",
    name: "Alpine Bouclé Fleece",
    type: "Textile & Upholstery",
    origin: "Biella Weaving Mills, Piedmont",
    finish: "Unsheared raw loop wool & linen blend",
    tactileFeel: "Dense, cloud-soft nubby texture with high resilience",
    acoustic: "Exceptional sound-damping dampener (NRC 0.65)",
    application: "Curved sofas, sculptural armchairs, padded headboards",
    color: "#EFECE4",
    roughness: 0.95,
    metalness: 0.0,
    sheen: 0.6,
  },
  {
    id: "brass",
    name: "Brushed Champagne Brass",
    type: "Architectural Alloy",
    origin: "Brescia Precision Metalworks",
    finish: "Multi-directional hairline brushed & wax sealed",
    tactileFeel: "Subtle micro-grain with warm thermal mass",
    acoustic: "Specular sonic bounce",
    application: "Joinery reveals, door hardware, luminaire bodies",
    color: "#C9A66B",
    roughness: 0.24,
    metalness: 0.92,
  },
  {
    id: "ceramic",
    name: "Ivory Feldspar Ceramic",
    type: "High-Fire Stoneware",
    origin: "Shigaraki, Shiga Prefecture",
    finish: "Satin dolomite glaze with iron specks",
    tactileFeel: "Glass-smooth with gentle undulating throwing marks",
    acoustic: "Clean reverberant tone",
    application: "Custom vessel collections, sculptural lamps, table tops",
    color: "#F4F0E8",
    roughness: 0.15,
    metalness: 0.08,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
  },
  {
    id: "linen",
    name: "Flemish Raw Slub Linen",
    type: "Natural Flax Weave",
    origin: "Kortrijk, Flanders",
    finish: "Stone-washed, unbleached pure flax",
    tactileFeel: "Crisp yet supple weave with natural tactile slubs",
    acoustic: "Medium dampening (NRC 0.40)",
    application: "Sheer ceiling drapery, wall hangings, daybed slipcovers",
    color: "#C5BDB0",
    roughness: 0.88,
    metalness: 0.01,
  },
];

const SHEEN_COLOR = new THREE.Color("#FAF6EF");

function MaterialSphere({ material }: { material: MaterialItem }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshPhysicalMaterial
          color={material.color}
          roughness={material.roughness}
          metalness={material.metalness}
          clearcoat={material.clearcoat ?? 0}
          clearcoatRoughness={material.clearcoatRoughness ?? 0}
          sheen={material.sheen ?? 0}
          sheenColor={SHEEN_COLOR}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#C9A66B"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      <ContactShadows
        position={[0, -1.45, 0]}
        opacity={0.6}
        scale={4}
        blur={2}
        far={2}
        frames={1}
      />
    </group>
  );
}

export default function MaterialShowcase3D() {
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.1);
  const [activeId, setActiveId] = useState("walnut");
  const activeMat = MATERIALS.find((m) => m.id === activeId) || MATERIALS[0];

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left: Material Swatches Selection & Dossier (Col 6) */}
      <div className="lg:col-span-6 flex flex-col space-y-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Tactile Materiality</span>
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-ivory">
            {activeMat.name}
          </h3>
          <p className="text-xs uppercase font-mono tracking-widest text-champagne/80 mt-1">
            {activeMat.type} • {activeMat.origin}
          </p>
        </div>

        {/* 6 Material Interactive Selector Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {MATERIALS.map((mat) => {
            const isSelected = mat.id === activeId;
            return (
              <button
                key={mat.id}
                onClick={() => setActiveId(mat.id)}
                className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-charcoal border-champagne shadow-champagne"
                    : "bg-obsidian/70 border-white/10 hover:border-champagne/40 hover:bg-charcoal/40"
                }`}
              >
                <span
                  className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-sm"
                  style={{ backgroundColor: mat.color }}
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-medium text-ivory truncate">
                    {mat.name.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-ivory-dark truncate font-mono">
                    {mat.type.split(" ")[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Material Data Sheet */}
        <div className="bg-charcoal/70 border border-champagne/20 rounded-2xl p-5 space-y-3.5 text-xs font-mono">
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">
              Surface Treatment
            </span>
            <span className="text-ivory font-sans text-right max-w-[60%]">
              {activeMat.finish}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">
              Tactile Sensation
            </span>
            <span className="text-champagne font-sans text-right max-w-[60%]">
              {activeMat.tactileFeel}
            </span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-white/5">
            <span className="text-ivory-dark uppercase tracking-widest">
              Acoustic Profile
            </span>
            <span className="text-ivory font-sans text-right max-w-[60%]">
              {activeMat.acoustic}
            </span>
          </div>
          <div className="flex justify-between py-1.5">
            <span className="text-ivory-dark uppercase tracking-widest">
              Ideal Integration
            </span>
            <span className="text-ivory font-sans text-right max-w-[60%]">
              {activeMat.application}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Real-time 3D Material Orb Inspector (Col 6) */}
      <div className="lg:col-span-6 relative h-[420px] sm:h-[460px] lg:h-[500px] bg-charcoal rounded-2xl border border-champagne/20 overflow-hidden shadow-dark">
        {/* Floating Top Badge */}
        <div className="absolute top-5 left-5 z-20 flex items-center space-x-2 bg-obsidian/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/30 text-[11px] font-mono text-champagne">
          <Rotate3d className="w-3.5 h-3.5" />
          <span className="uppercase tracking-widest">Real-time PBR Shader</span>
        </div>

        {/* Orbit Helper */}
        <div className="absolute bottom-5 right-5 z-20 flex items-center space-x-2 text-[10px] font-mono tracking-widest text-ivory-dark bg-obsidian/75 px-3 py-1 rounded-full border border-white/5">
          <Compass className="w-3 h-3 text-champagne" />
          <span>Click & drag to rotate orb</span>
        </div>

        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 45 }}
          dpr={1}
          frameloop={isInView ? "always" : "never"}
          gl={{ antialias: true, alpha: true, precision: "mediump" }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <hemisphereLight args={["#FAF8F5", "#141414", 0.9]} />
          <directionalLight position={[4, 5, 4]} intensity={2.5} color="#FFF1D9" />
          <directionalLight position={[-4, 2, -3]} intensity={1.2} color="#C9A66B" />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
              <MaterialSphere material={activeMat} />
            </Float>
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            dampingFactor={0.08}
          />
        </Canvas>
      </div>
    </div>
  );
}
