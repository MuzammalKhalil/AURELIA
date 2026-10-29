"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "@/hooks/useInView";

function GyroscopeRings() {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.4;
      outerRingRef.current.rotation.y = t * 0.3;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.5;
      midRingRef.current.rotation.z = t * 0.4;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = t * 0.6;
      innerRingRef.current.rotation.x = -t * 0.3;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Golden Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[1.5, 0.035, 16, 64]} />
        <meshStandardMaterial color="#C9A66B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Mid Champagne Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[1.15, 0.03, 16, 64]} />
        <meshStandardMaterial color="#FFE3B3" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Inner Obsidian & Gold Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.8, 0.025, 16, 64]} />
        <meshStandardMaterial color="#D4B37A" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Central Gem / Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial color="#C9A66B" metalness={0.95} roughness={0.1} wireframe={false} />
      </mesh>

      {/* Core Glow Aura */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#C9A66B" distance={3} />
    </group>
  );
}

export default function ContactGlobe3D() {
  const { ref, isInView } = useInView<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-obsidian border border-champagne/20 overflow-hidden shadow-xl flex items-center justify-center"
    >
      <div className="absolute top-3.5 left-4 z-10 flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-champagne">
        <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-ping" />
        <span>Atelier Global Horizon • 3D Gyroscope</span>
      </div>

      <Canvas
        dpr={1}
        frameloop={isInView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, precision: "mediump" }}
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 3, 3]} intensity={1.5} color="#FFE6C7" />
        <directionalLight position={[-3, -2, -2]} intensity={0.5} color="#93C5FD" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <GyroscopeRings />
        </Float>
      </Canvas>

      <div className="absolute bottom-3 right-4 z-10 text-[9px] font-mono text-ivory-dark">
        Zurich • Milan • New York
      </div>
    </div>
  );
}

