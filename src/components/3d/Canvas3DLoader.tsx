"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Canvas3DLoader({ scale = 1 }: { scale?: number }) {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (outerRingRef.current) {
      outerRingRef.current.rotation.y += delta * 0.8;
      outerRingRef.current.rotation.x += delta * 0.4;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 1.1;
      innerRingRef.current.rotation.z += delta * 0.5;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(state.clock.getElapsedTime() * 2.5) * 0.08;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={[0, 0, 0]} scale={scale}>
      {/* Outer Champagne Gyroscope Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.9, 0.015, 16, 48]} />
        <meshStandardMaterial
          color="#C9A66B"
          metalness={0.9}
          roughness={0.2}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Inner Counter-Rotating Ring */}
      <mesh ref={innerRingRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.65, 0.012, 16, 36]} />
        <meshStandardMaterial
          color="#F4F0E8"
          metalness={0.8}
          roughness={0.25}
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Pulsing Core Gem */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#C9A66B"
          metalness={0.95}
          roughness={0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

