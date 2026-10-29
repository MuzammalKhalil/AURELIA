"use client";

import React, { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import Canvas3DLoader from "@/components/3d/Canvas3DLoader";

export interface LayerData {
  id: number;
  tierNumber: string;
  title: string;
  tagline: string;
  category: string;
  material: string;
  spec: string;
  elevation: string;
  elevationVal: number;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  description: string;
}

function LuxuryDustParticles({ count = 40 }: { count?: number }) {
  const points = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#E2C18D"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SlabMesh({
  layer,
  index,
  isSelected,
  isHovered,
  isExploded,
  onSelect,
  onHover,
  onUnhover,
}: {
  layer: LayerData;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  isExploded: boolean;
  onSelect: () => void;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sculptureRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  // Smooth lerping of position, scale and rotation in 3D space
  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const spacing = isExploded ? 0.62 : 0.26;
    const baseY = (index - 2) * spacing;
    const targetY = baseY + (isSelected ? 0.28 : 0);
    const targetZ = isSelected ? 0.42 : 0;
    const targetScale = isSelected ? 1.07 : isHovered ? 1.03 : 1;
    const targetRotX = isSelected ? -0.1 : 0;

    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 6, delta);
    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 6, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 6, delta);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 6, delta)
    );

    // Dynamic rotation of Tier 05 bronze sculpture
    if (sculptureRef.current) {
      sculptureRef.current.rotation.y += delta * 0.5;
      sculptureRef.current.rotation.x += delta * 0.25;
    }

    // Dynamic pulse of Tier 04 luminaire halo
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.4;
    }
  });

  // Dedicated slab dimensions
  const slabWidth = 2.6;
  const slabHeight = 0.16;
  const slabDepth = 1.7;

  // Box geometry for slab
  const boxGeo = useMemo(() => new THREE.BoxGeometry(slabWidth, slabHeight, slabDepth), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  return (
    <group
      ref={groupRef}
      position={[0, (index - 2) * (isExploded ? 0.62 : 0.26), 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover();
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        onUnhover();
        document.body.style.cursor = "auto";
      }}
    >
      {/* Main Architectural Slab Mesh */}
      <mesh geometry={boxGeo}>
        {index === 4 && (
          // Tier 05 - Lost-wax Cast Champagne Bronze & Feldspar Slab
          <meshStandardMaterial
            color="#221D18"
            metalness={0.88}
            roughness={0.25}
            envMapIntensity={1.5}
          />
        )}
        {index === 3 && (
          // Tier 04 - Patinated Brass Architectural Luminaire Slab
          <meshStandardMaterial
            color="#3D301C"
            metalness={0.85}
            roughness={0.3}
            envMapIntensity={1.2}
          />
        )}
        {index === 2 && (
          // Tier 03 - Haute Shearling Wool & Belgian Linen Slab
          <meshStandardMaterial
            color="#EAE3D6"
            metalness={0.05}
            roughness={0.92}
          />
        )}
        {index === 1 && (
          // Tier 02 - Canaletto Walnut Slatted Architectural Slab
          <meshStandardMaterial
            color="#473322"
            metalness={0.15}
            roughness={0.6}
          />
        )}
        {index === 0 && (
          // Tier 01 - Honed Tivoli Travertine Mass Slab
          <meshStandardMaterial
            color="#7E7568"
            metalness={0.08}
            roughness={0.88}
          />
        )}
      </mesh>

      {/* Decorative Bevel / Outline Highlight */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial
          color={isSelected ? layer.accentColor : isHovered ? "#FFFFFF" : "#444444"}
          linewidth={isSelected ? 2 : 1}
          transparent
          opacity={isSelected ? 0.95 : isHovered ? 0.6 : 0.25}
        />
      </lineSegments>

      {/* TIER 05 SPECIAL: Lost-Wax Cast Champagne Bronze Floating Sculpture */}
      {index === 4 && (
        <group position={[0, 0.42, 0]}>
          <mesh ref={sculptureRef}>
            <dodecahedronGeometry args={[0.32, 0]} />
            <meshStandardMaterial
              color="#D8B574"
              metalness={0.95}
              roughness={0.18}
              wireframe={false}
            />
          </mesh>
          <pointLight
            color="#F2D194"
            intensity={isSelected ? 2.5 : 1.2}
            distance={2}
          />
        </group>
      )}

      {/* TIER 04 SPECIAL: Circadian 2700K Luminaire Radiant Halo */}
      {index === 3 && (
        <group position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh ref={haloRef}>
            <torusGeometry args={[0.75, 0.025, 16, 48]} />
            <meshStandardMaterial
              color="#FFAF4D"
              emissive="#FF9D2E"
              emissiveIntensity={isSelected ? 3.5 : 2.0}
            />
          </mesh>
          <pointLight
            color="#FF9D2E"
            intensity={isSelected ? 3.0 : 1.2}
            distance={2.5}
          />
        </group>
      )}

      {/* TIER 02 SPECIAL: Canaletto Walnut Inset Reveal Lines */}
      {index === 1 && (
        <group position={[0, 0.082, 0]}>
          {[-0.6, 0, 0.6].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, 0, 0]}>
              <boxGeometry args={[0.04, 0.005, 1.6]} />
              <meshStandardMaterial color="#1A120B" roughness={0.9} />
            </mesh>
          ))}
        </group>
      )}

      {/* Selected Elevation Light */}
      {isSelected && (
        <pointLight
          color={layer.accentColor}
          intensity={2.8}
          distance={3}
          position={[0, 0.5, 0.3]}
        />
      )}
    </group>
  );
}

function SceneContent({
  layers,
  activeId,
  isExploded,
  onSelect,
}: {
  layers: LayerData[];
  activeId: number;
  isExploded: boolean;
  onSelect: (id: number) => void;
}) {
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);

  return (
    <>
      {/* Studio Lighting Setup */}
      <ambientLight intensity={0.7} color="#2A241E" />
      <directionalLight position={[4, 7, 5]} intensity={2.2} color="#FFF8EE" />
      <directionalLight position={[-4, 3, -3]} intensity={0.8} color="#C9A66B" />

      {/* Weightless Floating Atmosphere */}
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.35}>
        <group rotation={[0.42, -0.58, 0.22]}>
          {layers.map((layer, index) => (
            <SlabMesh
              key={layer.id}
              layer={layer}
              index={index}
              isSelected={activeId === layer.id}
              isHovered={hoveredId === layer.id}
              isExploded={isExploded}
              onSelect={() => onSelect(layer.id)}
              onHover={() => setHoveredId(layer.id)}
              onUnhover={() => setHoveredId(null)}
            />
          ))}
        </group>
      </Float>

      {/* Luxury Gold Atmospheric Dust Particles */}
      <LuxuryDustParticles count={38} />

      {/* Studio Floor Ambient Occlusion Contact Shadow */}
      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.8}
        scale={7.5}
        blur={2.4}
        far={4.5}
        color="#000000"
      />

      {/* Orbit Controls with Natural Architectural Clamping */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2 + 0.08}
        minAzimuthAngle={-Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 2.5}
        rotateSpeed={0.5}
        dampingFactor={0.06}
      />
    </>
  );
}

export default function SpatialAnatomyCanvas({
  layers,
  activeId,
  isExploded,
  onSelect,
  isInView,
}: {
  layers: LayerData[];
  activeId: number;
  isExploded: boolean;
  onSelect: (id: number) => void;
  isInView: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [3.4, 2.2, 4.4], fov: 42 }}
      frameloop={isInView ? "always" : "never"}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<Canvas3DLoader />}>
        <SceneContent
          layers={layers}
          activeId={activeId}
          isExploded={isExploded}
          onSelect={onSelect}
        />
      </Suspense>
    </Canvas>
  );
}

