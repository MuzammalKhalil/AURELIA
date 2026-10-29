"use client";

import React, { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { getAssetPath } from "@/lib/assets";
import Canvas3DLoader from "@/components/3d/Canvas3DLoader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Curated viewpoints for the interior walk-through
const STORY_STOPS = [
  {
    id: 0,
    title: "Spatial Overview: The Curated Living Room",
    subtitle: "Harmonizing negative space with monolithic presence",
    description: "An intentional orchestration of low-slung seating, acoustic geometry, and ambient warmth creating a serene sanctuary.",
    camPos: [0, 2.2, 5.2] as [number, number, number],
    camTarget: [0, 0.2, 0] as [number, number, number],
  },
  {
    id: 1,
    title: "Tactile Sanctuary: Lounge Armchair",
    subtitle: "Artisanal shearling upholstery & sculpted timber joinery",
    description: "Every curve is engineered to hug the human form while catching ambient light on soft brushed velvet and hand-rubbed oil finish.",
    camPos: [-1.4, 0.9, 2.2] as [number, number, number],
    camTarget: [-0.6, 0.2, 0] as [number, number, number],
  },
  {
    id: 2,
    title: "Sculptural Vignette: Travertine & Brass Lamp",
    subtitle: "Tivoli Roman stone meets Milanese luminaire casting",
    description: "A dialogue between porous vein-cut travertine stone and rich hand-patinated antique brass illuminating reflective textures.",
    camPos: [1.8, 1.3, 2.3] as [number, number, number],
    camTarget: [0.8, 0.6, 0] as [number, number, number],
  },
  {
    id: 3,
    title: "Atmospheric Horizon: Light & Shadow Dialogue",
    subtitle: "Low-angle architectural depth and shadow geometry",
    description: "A study in shadow gradients across obsidian floors, where each piece occupies its distinct acoustic frequency.",
    camPos: [0.3, 0.45, 2.9] as [number, number, number],
    camTarget: [0, 0.9, -0.5] as [number, number, number],
  },
];

// Interior 3D Room Architecture Component with memoized primitives
const InteriorRoom = React.memo(function InteriorRoom() {
  const chairGltf = useGLTF(getAssetPath("/models/luxury-chair.glb"));
  const lampGltf = useGLTF(getAssetPath("/models/brass-lamp.glb"));
  const tableGltf = useGLTF(getAssetPath("/models/side-table.glb"));
  const vaseGltf = useGLTF(getAssetPath("/models/ceramic-vase.glb"));

  const chairScene = useMemo(() => chairGltf.scene.clone(), [chairGltf.scene]);
  const lampScene = useMemo(() => lampGltf.scene.clone(), [lampGltf.scene]);
  const tableScene = useMemo(() => tableGltf.scene.clone(), [tableGltf.scene]);
  const vaseScene = useMemo(() => vaseGltf.scene.clone(), [vaseGltf.scene]);

  return (
    <group position={[0, -0.7, 0]}>
      {/* 1. Architectural Floor: Large Obsidian Slate Tiles with Champagne Inlay */}
      <mesh receiveShadow position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial
          color="#121212"
          roughness={0.25}
          metalness={0.15}
        />
      </mesh>

      {/* Decorative Wool Rug */}
      <mesh receiveShadow position={[0, 0.005, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.6, 3.6]} />
        <meshStandardMaterial
          color="#181818"
          roughness={0.9}
          metalness={0.02}
        />
      </mesh>

      {/* Thin Gold Border for Rug */}
      <mesh position={[0, 0.008, 0.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.32, 48]} />
        <meshStandardMaterial color="#C9A66B" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* 2. Back Architectural Wall */}
      <mesh receiveShadow position={[0, 3.5, -4.5]}>
        <boxGeometry args={[12, 8, 0.3]} />
        <meshStandardMaterial color="#141414" roughness={0.8} />
      </mesh>

      {/* Champagne Accent Wall Panel */}
      <mesh position={[-2.5, 3.2, -4.2]}>
        <boxGeometry args={[2.2, 3.8, 0.05]} />
        <meshStandardMaterial
          color="#0c0c0c"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Minimal Gold Trim Frame on Art */}
      <mesh position={[-2.5, 3.2, -4.17]}>
        <boxGeometry args={[2.3, 3.9, 0.02]} />
        <meshStandardMaterial color="#C9A66B" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* 3. Luxury Chair (Focal Left) */}
      <group position={[-0.9, 0, 0.2]} rotation={[0, 0.45, 0]} scale={1.65}>
        <primitive object={chairScene} />
      </group>

      {/* 4. Travertine Side Table (Focal Right) */}
      <group position={[1.1, 0, 0.1]} scale={1.05}>
        <primitive object={tableScene} />
      </group>

      {/* 5. Architectural Brass Lantern */}
      <group position={[1.4, 0, -0.4]} rotation={[0, -0.5, 0]} scale={0.42}>
        <primitive object={lampScene} />
      </group>

      {/* 6. Ceramic Vase placed atop the Travertine Table */}
      <group position={[1.1, 1.25, 0.1]} scale={0.4}>
        <primitive object={vaseScene} />
      </group>

      {/* Static Contact Shadow: frames={1} for maximum framerate */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={8}
        blur={2.0}
        far={3}
        frames={1}
      />
    </group>
  );
});

// Camera Director Component that animates camera transforms based on active progress
function CameraDirector({
  progressRef,
  manualStopRef,
}: {
  progressRef: React.MutableRefObject<number>;
  manualStopRef: React.MutableRefObject<number | null>;
}) {
  const curPos = useRef(new THREE.Vector3(0, 2.2, 5.2));
  const curLookAt = useRef(new THREE.Vector3(0, 0.2, 0));

  useFrame((state, delta) => {
    let desiredPos: THREE.Vector3;
    let desiredLook: THREE.Vector3;

    if (manualStopRef.current !== null) {
      const stop = STORY_STOPS[manualStopRef.current];
      desiredPos = new THREE.Vector3(...stop.camPos);
      desiredLook = new THREE.Vector3(...stop.camTarget);
    } else {
      const clampedProg = Math.max(0, Math.min(0.999, progressRef.current));
      const totalStops = STORY_STOPS.length;
      const indexFloat = clampedProg * (totalStops - 1);
      const idxA = Math.floor(indexFloat);
      const idxB = Math.min(idxA + 1, totalStops - 1);
      const factor = indexFloat - idxA;

      const stopA = STORY_STOPS[idxA];
      const stopB = STORY_STOPS[idxB];

      const pA = new THREE.Vector3(...stopA.camPos);
      const pB = new THREE.Vector3(...stopB.camPos);
      const lA = new THREE.Vector3(...stopA.camTarget);
      const lB = new THREE.Vector3(...stopB.camTarget);

      desiredPos = pA.lerp(pB, factor);
      desiredLook = lA.lerp(lB, factor);
    }

    curPos.current.lerp(desiredPos, delta * 4.0);
    curLookAt.current.lerp(desiredLook, delta * 4.0);

    state.camera.position.copy(curPos.current);
    state.camera.lookAt(curLookAt.current);
  });

  return null;
}

export default function InteriorShowcaseScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);
  const progressRef = useRef(0);
  const manualStopRef = useRef<number | null>(null);
  const activeStopRef = useRef(0);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const [roomMood, setRoomMood] = useState<"day" | "golden" | "night">("day");

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "250px" }
    );
    observer.observe(containerRef.current);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=1200",
        pin: true,
        scrub: 0.3,
        onUpdate: (self) => {
          manualStopRef.current = null;
          progressRef.current = self.progress;
          const stopIdx = Math.min(
            STORY_STOPS.length - 1,
            Math.floor(self.progress * STORY_STOPS.length)
          );
          if (stopIdx !== activeStopRef.current) {
            activeStopRef.current = stopIdx;
            setActiveStopIndex(stopIdx);
          }
        },
      });
    }, containerRef);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const currentStop =
    manualStopRef.current !== null ? STORY_STOPS[manualStopRef.current] : STORY_STOPS[activeStopIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-obsidian text-ivory flex flex-col justify-between overflow-hidden"
    >
      {/* Top Floating Header & Viewpoint Navigation */}
      <div className="relative z-30 pt-8 px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-none">
        <div className="bg-obsidian/85 backdrop-blur-md px-4 py-2 rounded-xl border border-champagne/20">
          <div className="flex items-center space-x-2 text-xs font-mono text-champagne uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Scroll-Controlled 3D Interior Tour</span>
          </div>
          <span className="text-[11px] text-ivory-dark">
            Viewpoint {activeStopIndex + 1} of {STORY_STOPS.length} • Scroll or select stop
          </span>
        </div>

        {/* Clickable Quick Jump Stops */}
        <div className="pointer-events-auto flex items-center space-x-1.5 sm:space-x-2 bg-charcoal/80 backdrop-blur-md p-1 sm:p-1.5 rounded-full border border-champagne/25 shadow-xl max-w-full overflow-x-auto">
          <div className="flex items-center space-x-1 pr-1.5 sm:pr-2 border-r border-white/15">
            <button
              onClick={() => setRoomMood("day")}
              className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all ${
                roomMood === "day" ? "bg-champagne text-obsidian font-bold" : "text-ivory-dark hover:text-ivory"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setRoomMood("golden")}
              className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all ${
                roomMood === "golden" ? "bg-champagne text-obsidian font-bold" : "text-ivory-dark hover:text-ivory"
              }`}
            >
              Sunset
            </button>
            <button
              onClick={() => setRoomMood("night")}
              className={`px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-wider transition-all ${
                roomMood === "night" ? "bg-champagne text-obsidian font-bold" : "text-ivory-dark hover:text-ivory"
              }`}
            >
              Night
            </button>
          </div>
          {STORY_STOPS.map((stop, i) => (
            <button
              key={stop.id}
              onClick={() => {
                manualStopRef.current = i;
                activeStopRef.current = i;
                setActiveStopIndex(i);
              }}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-300 ${
                activeStopIndex === i
                  ? "bg-champagne text-obsidian font-bold shadow-sm"
                  : "text-ivory-muted hover:text-ivory hover:bg-white/5"
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Scene Viewport (Full Screen Background) */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas
          camera={{ position: [0, 2.2, 5.2], fov: 44 }}
          dpr={1}
          frameloop={isInView ? "always" : "never"}
          gl={{ antialias: true, alpha: true, precision: "mediump" }}
          className="w-full h-full"
        >
          {roomMood === "golden" ? (
            <>
              <hemisphereLight args={["#FFA767", "#1A0F0A", 1.2]} />
              <directionalLight position={[4, 6, 3]} intensity={3.0} color="#FF9A4A" />
              <directionalLight position={[-4, 3, -1]} intensity={1.2} color="#C9A66B" />
            </>
          ) : roomMood === "night" ? (
            <>
              <hemisphereLight args={["#1E2235", "#0A0B10", 0.6]} />
              <directionalLight position={[4, 6, 3]} intensity={1.6} color="#E8DAC5" />
              <directionalLight position={[-4, 3, -1]} intensity={0.6} color="#7E8DA8" />
              <pointLight position={[1.4, 0.4, -0.4]} intensity={2.5} color="#FFA742" distance={4} />
            </>
          ) : (
            <>
              <hemisphereLight args={["#FAF8F5", "#141414", 0.95]} />
              <directionalLight position={[4, 6, 3]} intensity={2.2} color="#FFE6C4" />
              <directionalLight position={[-4, 3, -1]} intensity={1.0} color="#C9A66B" />
            </>
          )}

          <Suspense fallback={<Canvas3DLoader scale={1.5} />}>
            <InteriorRoom />
            <CameraDirector
              progressRef={progressRef}
              manualStopRef={manualStopRef}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Curatorial Card (Synchronized with Viewpoint) */}
      <div className="relative z-30 pb-6 sm:pb-10 px-4 sm:px-6 md:px-12 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-2xl bg-obsidian/90 backdrop-blur-xl border border-champagne/30 rounded-2xl p-5 sm:p-8 shadow-2xl transition-all duration-500">
          <div className="flex items-center justify-between pb-2.5 sm:pb-3 border-b border-champagne/15">
            <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest text-champagne line-clamp-1">
              {currentStop.subtitle}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-ivory-dark flex-shrink-0 ml-2">
              STOP 0{currentStop.id + 1} / 04
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory mt-2.5 sm:mt-3 mb-1.5 sm:mb-2 font-light">
            {currentStop.title}
          </h3>
          <p className="text-[11px] sm:text-xs md:text-sm text-ivory-muted leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
            {currentStop.description}
          </p>

          <div className="mt-5 flex items-center justify-between text-xs font-mono text-ivory-dark pt-3 border-t border-white/5">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
              <span>Scroll down to advance camera viewpoint</span>
            </div>
            <a
              href="/spaces"
              className="text-champagne hover:underline inline-flex items-center space-x-1"
            >
              <span>Explore Spaces</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
