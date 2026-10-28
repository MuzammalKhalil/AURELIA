"use client";

import React, { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import { Sofa, Armchair, Rotate3d, Compass, Sun, Moon, Sunset, Play, Pause } from "lucide-react";
import { useInView } from "@/hooks/useInView";

// Preload models
useGLTF.preload("/models/luxury-chair.glb");
useGLTF.preload("/models/luxury-sofa.glb");

type LightingMood = "daylight" | "sunset" | "midnight";

function LuxuryChairModel({
  mouse,
  autoRotate,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  autoRotate: boolean;
}) {
  const { scene } = useGLTF("/models/luxury-chair.glb");
  const groupRef = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.25;
    } else {
      const targetX = (mouse.current[0] * Math.PI) / 10;
      const targetY = (mouse.current[1] * Math.PI) / 20;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetX + 0.35,
        3,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetY,
        3,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={1.85}>
      <primitive object={cloned} />
    </group>
  );
}

function LuxurySofaModel({
  mouse,
  autoRotate,
}: {
  mouse: React.MutableRefObject<[number, number]>;
  autoRotate: boolean;
}) {
  const { scene } = useGLTF("/models/luxury-sofa.glb");
  const groupRef = useRef<THREE.Group>(null);
  const cloned = useMemo(() => scene.clone(), [scene]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.25;
    } else {
      const targetX = (mouse.current[0] * Math.PI) / 10;
      const targetY = (mouse.current[1] * Math.PI) / 20;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetX + 0.2,
        3,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetY,
        3,
        delta
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.75, 0]} scale={1.3}>
      <primitive object={cloned} />
    </group>
  );
}

function InteriorFloorPedestal() {
  return (
    <group position={[0, -0.76, 0]}>
      {/* Polished Obsidian Plinth with Champagne Brass Rim */}
      <mesh receiveShadow position={[0, -0.05, 0]}>
        <cylinderGeometry args={[2.8, 3.0, 0.1, 48]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.2}
          metalness={0.25}
        />
      </mesh>
      
      {/* Thin Champagne Trim Ring */}
      <mesh position={[0, 0.005, 0]}>
        <ringGeometry args={[2.75, 2.82, 48]} />
        <meshStandardMaterial
          color="#C9A66B"
          metalness={0.92}
          roughness={0.18}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Baked Static Contact Shadow */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.7}
        scale={6}
        blur={2.2}
        far={3}
        frames={1}
      />
    </group>
  );
}

function StudioLighting({ mood }: { mood: LightingMood }) {
  if (mood === "sunset") {
    return (
      <>
        <hemisphereLight args={["#FFA767", "#1A0F0A", 1.1]} />
        <directionalLight position={[5, 4, 3]} intensity={3.0} color="#FF9344" />
        <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#C9A66B" />
        <directionalLight position={[0, 4, -4]} intensity={0.8} color="#FFE0B2" />
      </>
    );
  }

  if (mood === "midnight") {
    return (
      <>
        <hemisphereLight args={["#1B1D28", "#08080C", 0.5]} />
        <directionalLight position={[3, 5, 4]} intensity={1.8} color="#E0D2BC" />
        <directionalLight position={[-4, 1, -2]} intensity={0.6} color="#6C7C9E" />
        <spotLight position={[0, 6, 0]} intensity={2.2} color="#C9A66B" angle={0.4} penumbra={0.9} />
      </>
    );
  }

  // Default daylight atelier
  return (
    <>
      <hemisphereLight args={["#FAF8F5", "#141414", 0.95]} />
      <directionalLight position={[4, 5, 4]} intensity={2.4} color="#FFF2DF" />
      <directionalLight position={[-4, 3, -2]} intensity={1.1} color="#C9A66B" />
      <directionalLight position={[0, 4, -4]} intensity={1.3} color="#F4F0E8" />
    </>
  );
}

// Cinematic Entrance Camera Controller
function CameraEntrance({ autoRotate }: { autoRotate: boolean }) {
  const isIntroDone = useRef(false);

  useFrame((state, delta) => {
    if (!isIntroDone.current) {
      // Cinematic camera swoop from [0, 2.8, 6.0] down to [0, 1.2, 4.2]
      state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, 1.2, 1.8, delta);
      state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, 4.2, 1.8, delta);
      if (Math.abs(state.camera.position.y - 1.2) < 0.02) {
        isIntroDone.current = true;
      }
    }
  });

  return null;
}

export default function HeroScene() {
  const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.1);
  const [selectedPiece, setSelectedPiece] = useState<"chair" | "sofa">("chair");
  const [mood, setMood] = useState<LightingMood>("daylight");
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const mouseRef = useRef<[number, number]>([0, 0]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouseRef.current = [x, y];
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[560px] sm:h-[640px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-b from-obsidian/40 via-charcoal/30 to-obsidian border border-champagne/25 shadow-dark interactive-3d group"
      onPointerMove={handlePointerMove}
    >
      {/* Floating 3D Scene Controls Badge */}
      <div className="absolute top-5 left-5 z-20 flex items-center space-x-2 bg-obsidian/90 backdrop-blur-md px-4 py-2 rounded-full border border-champagne/30 text-xs text-ivory font-mono shadow-xl">
        <Rotate3d className="w-4 h-4 text-champagne animate-spin-slow" />
        <span className="tracking-widest uppercase font-medium">Interactive 3D Stage</span>
      </div>

      {/* Top Right: Lighting Atmosphere Switcher */}
      <div className="absolute top-5 right-5 z-20 flex items-center space-x-1.5 bg-obsidian/90 backdrop-blur-md p-1 rounded-full border border-champagne/25 shadow-xl">
        <button
          onClick={() => setMood("daylight")}
          title="Daylight Atelier"
          className={`p-2 rounded-full transition-all ${
            mood === "daylight"
              ? "bg-champagne text-obsidian shadow-sm"
              : "text-ivory-dark hover:text-ivory"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setMood("sunset")}
          title="Sunset Amber"
          className={`p-2 rounded-full transition-all ${
            mood === "sunset"
              ? "bg-champagne text-obsidian shadow-sm"
              : "text-ivory-dark hover:text-ivory"
          }`}
        >
          <Sunset className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setMood("midnight")}
          title="Midnight Mood"
          className={`p-2 rounded-full transition-all ${
            mood === "midnight"
              ? "bg-champagne text-obsidian shadow-sm"
              : "text-ivory-dark hover:text-ivory"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <div className="w-[1px] h-4 bg-white/20 mx-1" />

        {/* Orbit Auto-play Toggle */}
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? "Pause Auto-orbit" : "Play Auto-orbit"}
          className={`p-2 rounded-full transition-all ${
            autoRotate
              ? "bg-champagne text-obsidian"
              : "text-ivory-dark hover:text-ivory"
          }`}
        >
          {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Piece Switcher Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2 bg-obsidian/95 backdrop-blur-xl p-1.5 rounded-full border border-champagne/30 shadow-2xl">
        <button
          onClick={() => setSelectedPiece("chair")}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            selectedPiece === "chair"
              ? "bg-champagne text-obsidian font-semibold shadow-md"
              : "text-ivory-muted hover:text-ivory hover:bg-white/5"
          }`}
        >
          <Armchair className="w-3.5 h-3.5" />
          <span>Lounge Armchair</span>
        </button>

        <button
          onClick={() => setSelectedPiece("sofa")}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            selectedPiece === "sofa"
              ? "bg-champagne text-obsidian font-semibold shadow-md"
              : "text-ivory-muted hover:text-ivory hover:bg-white/5"
          }`}
        >
          <Sofa className="w-3.5 h-3.5" />
          <span>Curved Velvet Sofa</span>
        </button>
      </div>

      {/* Subtle Drag Prompt Helper */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center space-x-2 text-[10px] uppercase font-mono tracking-widest text-ivory-dark/80 bg-obsidian/80 px-3.5 py-1.5 rounded-full border border-white/5">
        <Compass className="w-3 h-3 text-champagne" />
        <span>360° Drag & Orbit</span>
      </div>

      {/* Optimized Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 2.5, 5.8], fov: 42 }}
        dpr={1}
        frameloop={isInView ? "always" : "never"}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          precision: "mediump",
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <StudioLighting mood={mood} />
        <CameraEntrance autoRotate={autoRotate} />

        <Suspense fallback={null}>
          {selectedPiece === "chair" ? (
            <LuxuryChairModel mouse={mouseRef} autoRotate={autoRotate} />
          ) : (
            <LuxurySofaModel mouse={mouseRef} autoRotate={autoRotate} />
          )}
          <InteriorFloorPedestal />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={Math.PI / 4}
          dampingFactor={0.08}
          rotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}
