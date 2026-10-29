"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleCloud({ count = 65 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

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
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    // Gentle 3D orbital drift
    meshRef.current.rotation.y += delta * 0.035;
    meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
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
        size={0.065}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function FloatingParticles3D() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={1}
        frameloop={isScrolling ? "never" : "always"}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power", depth: false, stencil: false }}
        className="w-full h-full"
      >
        <ParticleCloud count={65} />
      </Canvas>
    </div>
  );
}

