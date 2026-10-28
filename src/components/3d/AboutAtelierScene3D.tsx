"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/hooks/useInView";
import { Sparkles, Eye } from "lucide-react";
import { getAssetPath } from "@/lib/assets";

function PedestalArt() {
  const { scene: sculpture } = useGLTF(getAssetPath("/models/sculptural-art.glb"));
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.2, 0]}>
      {/* 3D Bronze Sculpture */}
      <primitive object={sculpture} scale={1.05} />

      {/* Travertine Plinth Base */}
      <mesh position={[0, -0.65, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.35, 32]} />
        <meshStandardMaterial color="#A39682" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function AboutAtelierScene3D() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className="relative w-full h-[380px] xs:h-[440px] sm:h-[500px] lg:h-[540px] rounded-2xl sm:rounded-3xl bg-charcoal border border-champagne/30 overflow-hidden shadow-2xl flex items-center justify-center"
    >
      {/* Top Badge */}
      <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20 flex items-center space-x-1.5 sm:space-x-2 bg-obsidian/85 border border-champagne/25 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-mono text-champagne backdrop-blur-md shadow-lg">
        <Sparkles className="w-3.5 h-3.5" />
        <span>
          <span className="hidden sm:inline">Atelier Sculpture Pedestal • </span>Real-Time 3D
        </span>
      </div>

      <div className="absolute top-5 right-5 z-20 hidden sm:flex items-center space-x-1.5 text-[10px] font-mono text-ivory-dark bg-obsidian/75 px-3 py-1.5 rounded-full border border-white/10">
        <Eye className="w-3 h-3 text-champagne" />
        <span>Drag to Orbit 360°</span>
      </div>

      {/* Canvas */}
      {isInView && (
        <Canvas
          dpr={1}
          camera={{ position: [0, 1.2, 3.4], fov: 42 }}
          className="cursor-grab active:cursor-grabbing w-full h-full"
        >
          <ambientLight intensity={0.9} color="#FFF8EE" />
          <directionalLight position={[4, 5, 3]} intensity={2.6} color="#FFEDD5" castShadow />
          <directionalLight position={[-4, 2, -2]} intensity={0.8} color="#93C5FD" />
          <pointLight position={[0, -1, 2]} intensity={1.0} color="#C9A66B" />

          <Suspense fallback={null}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <PedestalArt />
            </Float>
            <ContactShadows
              position={[0, -0.9, 0]}
              opacity={0.65}
              scale={6}
              blur={2.4}
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

      {/* Bottom Technical Spec */}
      <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-[11px] font-mono text-ivory-dark bg-obsidian/80 backdrop-blur-md p-3 rounded-2xl border border-white/10">
        <span>Curatorial Piece: Infinitum Ribbon IV</span>
        <span className="text-champagne font-semibold">Lost-Wax Cast Bronze</span>
      </div>
    </div>
  );
}

