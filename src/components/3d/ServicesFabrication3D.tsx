"use client";

import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/hooks/useInView";
import { Sparkles, Layers, RotateCw, Box } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

type ServiceModelKey = "chair" | "lamp" | "table";

function WorkbenchObject({
  modelPath,
  scale,
  wireframe,
}: {
  modelPath: string;
  scale: number;
  wireframe: boolean;
}) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);

  // Clone and apply wireframe if toggled
  const cloned = React.useMemo(() => {
    const c = scene.clone();
    c.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.wireframe = wireframe;
          if (wireframe) {
            mat.color = new THREE.Color("#C9A66B");
          }
          mesh.material = mat;
        }
      }
    });
    return c;
  }, [scene, wireframe]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      <primitive object={cloned} scale={scale} />
    </group>
  );
}

export default function ServicesFabrication3D() {
  const [selectedPiece, setSelectedPiece] = useState<ServiceModelKey>("chair");
  const [wireframe, setWireframe] = useState<boolean>(false);
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  const configs: Record<ServiceModelKey, { path: string; scale: number; title: string; spec: string }> = {
    chair: {
      path: getAssetPath("/models/luxury-chair.glb"),
      scale: 1.15,
      title: "Bespoke Sculptural Lounge Chair",
      spec: "Alpine Bouclé Wool & Solid Canaletto Walnut",
    },
    lamp: {
      path: getAssetPath("/models/brass-lamp.glb"),
      scale: 0.5,
      title: "Lanterne Brutaliste Brass Luminaire",
      spec: "Hand-Patinated Antique Brass & 2700K Warm LED",
    },
    table: {
      path: getAssetPath("/models/side-table.glb"),
      scale: 1.3,
      title: "Tivoli Roman Travertine Monolith",
      spec: "Vein-cut Honed Travertine • 40mm Solid Slab",
    },
  };

  const current = configs[selectedPiece];

  return (
    <div
      ref={ref}
      className="relative w-full h-[460px] sm:h-[540px] lg:h-[580px] rounded-2xl sm:rounded-3xl bg-charcoal border border-champagne/30 overflow-hidden shadow-2xl flex flex-col justify-between"
    >
      {/* Top Bar with Switchers */}
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 z-20 bg-gradient-to-b from-obsidian/90 via-obsidian/60 to-transparent">
        <div>
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-champagne mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisanal Fabrication Workbench</span>
          </div>
          <h4 className="font-serif text-xl sm:text-2xl text-ivory font-light">
            {current.title}
          </h4>
        </div>

        {/* Model Switcher Pills & Wireframe Toggle */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {(["chair", "lamp", "table"] as ServiceModelKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedPiece(key)}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider transition-all ${
                selectedPiece === key
                  ? "bg-champagne text-obsidian font-bold shadow-champagne scale-105"
                  : "bg-obsidian/80 text-ivory-dark border border-white/10 hover:border-champagne/50 hover:text-ivory"
              }`}
            >
              {key === "chair" ? "Lounge Chair" : key === "lamp" ? "Brass Lamp" : "Travertine Table"}
            </button>
          ))}

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider border flex items-center space-x-1.5 transition-all ${
              wireframe
                ? "bg-champagne text-obsidian border-champagne font-bold"
                : "bg-obsidian/80 text-ivory-muted border-white/10 hover:border-champagne/50"
            }`}
          >
            <Box className="w-3 h-3" />
            <span>Wireframe: {wireframe ? "ON" : "OFF"}</span>
          </button>
        </div>
      </div>

      {/* Real-time 3D Canvas */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isInView && (
          <Canvas
            dpr={1}
            camera={{ position: [0, 1.3, 3.4], fov: 42 }}
            className="cursor-grab active:cursor-grabbing w-full h-full"
          >
            <ambientLight intensity={1.1} color="#FFF8EE" />
            <directionalLight position={[4, 5, 3]} intensity={2.4} color="#FFEDD5" castShadow />
            <directionalLight position={[-4, 2, -2]} intensity={0.7} color="#93C5FD" />
            <pointLight position={[0, -0.5, 2]} intensity={0.8} color="#C9A66B" />

            <Suspense fallback={null}>
              <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
                <WorkbenchObject
                  modelPath={current.path}
                  scale={current.scale}
                  wireframe={wireframe}
                />
              </Float>
              <ContactShadows
                position={[0, -0.7, 0]}
                opacity={0.65}
                scale={6}
                blur={2.4}
                far={4}
                frames={1}
              />
            </Suspense>

            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={5.0}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2 + 0.05}
            />
          </Canvas>
        )}
      </div>

      {/* Bottom Architectural Specification Bar */}
      <div className="p-5 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-ivory-dark bg-gradient-to-t from-obsidian/90 via-obsidian/60 to-transparent border-t border-white/10">
        <div>
          <span className="text-[10px] uppercase text-champagne tracking-widest block">
            Material Formulation
          </span>
          <span className="text-ivory font-sans">{current.spec}</span>
        </div>
        <div className="text-[10px] text-ivory-dark">
          Drag to Orbit 360° • Click Wireframe to Inspect Geometry
        </div>
      </div>
    </div>
  );
}

