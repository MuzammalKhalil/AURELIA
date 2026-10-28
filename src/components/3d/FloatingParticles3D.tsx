"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    const champagne = new THREE.Color("#C9A66B");
    const ivory = new THREE.Color("#F4F0E8");
    const gold = new THREE.Color("#E5C388");

    for (let i = 0; i < count; i++) {
      // Wide atmospheric dispersal
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      // Color variation between champagne and ivory
      const rand = Math.random();
      const chosenColor = rand > 0.6 ? champagne : rand > 0.3 ? gold : ivory;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;

      scl[i] = Math.random() * 2.5 + 1.0;
    }

    return [pos, col, scl];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle 3D orbital drift
    meshRef.current.rotation.y += delta * 0.035;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;

    // Subtle pointer parallax
    const targetX = (state.pointer.x * Math.PI) / 16;
    const targetY = (state.pointer.y * Math.PI) / 20;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.02;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.02;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function FloatingParticles3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        className="w-full h-full"
      >
        <ParticleCloud count={140} />
      </Canvas>
    </div>
  );
}

