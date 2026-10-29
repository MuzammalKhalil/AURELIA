"use client";

import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { X, Sparkles, Sun, Sunset, Moon, RotateCcw, Check, Compass, Layers } from "lucide-react";

interface ProductModalProps {
  product: {
    id: string;
    title: string;
    category: string;
    material: string;
    modelPath: string;
    scale: number;
    dimensions: string;
    edition: string;
    description: string;
    colorChoices?: { name: string; hex: string }[];
  } | null;
  onClose: () => void;
}

function ProductMesh({ modelPath, scale, color }: { modelPath: string; scale: number; color?: string }) {
  const { scene } = useGLTF(modelPath);
  const meshRef = useRef<THREE.Group>(null);

  // Clone scene so different instances don't clash
  const clonedScene = React.useMemo(() => {
    const c = scene.clone();
    if (color) {
      c.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.material) {
            const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
            mat.color = new THREE.Color(color);
            mesh.material = mat;
          }
        }
      });
    }
    return c;
  }, [scene, color]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.6, 0]}>
      <primitive object={clonedScene} scale={scale} />
    </group>
  );
}

export default function ProductModal3D({ product, onClose }: ProductModalProps) {
  const [lightMood, setLightMood] = useState<"day" | "sunset" | "night">("day");
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2.5 sm:p-6 md:p-10 bg-obsidian/90 backdrop-blur-2xl">
      {/* Container Card */}
      <div className="relative w-full max-w-5xl h-[92vh] sm:h-[88vh] bg-charcoal/95 border border-champagne/30 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden animate-[fadeIn_0.3s_ease-out]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-obsidian/80 border border-white/15 hover:border-champagne text-ivory hover:text-champagne flex items-center justify-center transition-all shadow-xl hover:scale-105 active:scale-95"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left Side: 3D Canvas Viewport */}
        <div className="w-full lg:w-7/12 h-[42%] sm:h-[46%] lg:h-full relative bg-radial-gradient flex items-center justify-center">
          
          {/* Top 3D Control Pills */}
          <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 flex items-center space-x-2">
            <div className="bg-obsidian/85 border border-white/10 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono text-champagne flex items-center space-x-1.5 sm:space-x-2 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time 3D Engine</span>
            </div>
          </div>

          {/* Lighting Selector Overlay */}
          <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 z-20 flex items-center space-x-1 sm:space-x-2 bg-obsidian/85 border border-white/10 p-1 sm:p-1.5 rounded-full shadow-lg">
            <button
              onClick={() => setLightMood("day")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono flex items-center space-x-1 sm:space-x-1.5 transition-all ${
                lightMood === "day"
                  ? "bg-champagne text-obsidian font-bold shadow-champagne"
                  : "text-ivory-dark hover:text-ivory"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Dawn</span>
            </button>
            <button
              onClick={() => setLightMood("sunset")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono flex items-center space-x-1 sm:space-x-1.5 transition-all ${
                lightMood === "sunset"
                  ? "bg-champagne text-obsidian font-bold shadow-champagne"
                  : "text-ivory-dark hover:text-ivory"
              }`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>Golden</span>
            </button>
            <button
              onClick={() => setLightMood("night")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono flex items-center space-x-1 sm:space-x-1.5 transition-all ${
                lightMood === "night"
                  ? "bg-champagne text-obsidian font-bold shadow-champagne"
                  : "text-ivory-dark hover:text-ivory"
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Nocturne</span>
            </button>
          </div>

          {/* Canvas */}
          <Canvas
            dpr={1}
            camera={{ position: [0, 1.2, 3.2], fov: 45 }}
            className="cursor-grab active:cursor-grabbing w-full h-full"
          >
            {lightMood === "day" && (
              <>
                <ambientLight intensity={1.2} />
                <directionalLight position={[4, 6, 4]} intensity={2.2} />
                <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#BEE3F8" />
              </>
            )}
            {lightMood === "sunset" && (
              <>
                <ambientLight intensity={0.8} color="#FFD1A4" />
                <directionalLight position={[5, 3, 2]} intensity={3.0} color="#FF9A3C" />
                <pointLight position={[-3, 1, 2]} intensity={1.2} color="#D4A373" />
              </>
            )}
            {lightMood === "night" && (
              <>
                <ambientLight intensity={0.3} color="#2A3445" />
                <spotLight position={[0, 5, 2]} intensity={3.5} angle={0.6} penumbra={0.8} color="#FFE6B3" />
                <pointLight position={[-2, 0.5, 1]} intensity={0.8} color="#4A6572" />
              </>
            )}

            <Suspense fallback={null}>
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
                <ProductMesh
                  modelPath={product.modelPath}
                  scale={product.scale}
                  color={selectedColor}
                />
              </Float>
              <ContactShadows
                position={[0, -0.6, 0]}
                opacity={0.6}
                scale={6}
                blur={2}
                far={4}
                frames={1}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={5.5}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2 + 0.1}
            />
          </Canvas>
        </div>

        {/* Right Side: Architectural Ledger & Specs */}
        <div className="w-full lg:w-5/12 h-[58%] sm:h-[54%] lg:h-full p-5 sm:p-7 md:p-10 flex flex-col justify-between overflow-y-auto border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>{product.category}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ivory font-light leading-tight">
                {product.title}
              </h2>
              <p className="text-xs font-mono text-champagne/80 tracking-widest mt-1 uppercase">
                {product.edition}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
              {product.description}
            </p>

            {/* Material Formulation Box */}
            <div className="bg-obsidian/80 border border-champagne/20 rounded-2xl p-5 space-y-3 font-mono text-xs shadow-xl">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-ivory-dark uppercase tracking-widest text-[10px]">
                  Material Matrix
                </span>
                <span className="text-ivory font-sans text-right max-w-[60%]">
                  {product.material}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-ivory-dark uppercase tracking-widest text-[10px]">
                  Architectural Scale
                </span>
                <span className="text-champagne font-mono">
                  {product.dimensions}
                </span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-ivory-dark uppercase tracking-widest text-[10px]">
                  Provenance
                </span>
                <span className="text-champagne flex items-center space-x-1.5 font-sans">
                  <Check className="w-3.5 h-3.5" />
                  <span>Aurelia Atelier Certified</span>
                </span>
              </div>
            </div>

            {/* Optional Color Palette Switcher */}
            {product.colorChoices && product.colorChoices.length > 0 && (
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono text-ivory-dark uppercase tracking-widest">
                  Material Finish Selection:
                </span>
                <div className="flex items-center space-x-3">
                  {product.colorChoices.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.hex)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                        selectedColor === c.hex
                          ? "border-champagne bg-champagne/15 text-ivory"
                          : "border-white/10 hover:border-champagne/50 text-ivory-muted"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                  {selectedColor && (
                    <button
                      onClick={() => setSelectedColor(undefined)}
                      className="text-[11px] font-mono text-champagne hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action Call to Action */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-ivory-dark">
              Drag to Orbit • Scroll to Zoom
            </span>
            <button
              onClick={onClose}
              className="bg-champagne hover:bg-champagne-light text-obsidian px-6 py-3 rounded-full text-xs font-mono uppercase tracking-widest font-semibold transition-all shadow-champagne hover:scale-105 active:scale-95"
            >
              Done Inspecting
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

