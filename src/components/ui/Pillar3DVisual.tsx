"use client";

import React, { useRef, useEffect } from "react";

interface Pillar3DVisualProps {
  type: 0 | 1 | 2 | 3;
  isHovered: boolean;
  light?: boolean;
}

// 3D Point definition
interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function Pillar3DVisual({ type, isHovered, light = true }: Pillar3DVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef = useRef({ x: 0.3, y: 0.2, z: 0 });
  const speedRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Define 3D geometries based on pillar discipline
    let vertices: Point3D[] = [];
    let edges: [number, number][] = [];

    if (type === 0) {
      // 01: Spatial Proportions & Void -> 3D Isometric Architectural Prism
      const s = 34;
      const h = 42;
      vertices = [
        { x: -s, y: -h / 2, z: -s },
        { x: s, y: -h / 2, z: -s },
        { x: s, y: -h / 2, z: s },
        { x: -s, y: -h / 2, z: s },
        { x: -s, y: h / 2, z: -s },
        { x: s, y: h / 2, z: -s },
        { x: s, y: h / 2, z: s },
        { x: -s, y: h / 2, z: s },
        // Central Golden Ratio anchor node
        { x: 0, y: 0, z: 0 },
      ];
      edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // bottom
        [4, 5], [5, 6], [6, 7], [7, 4], // top
        [0, 4], [1, 5], [2, 6], [3, 7], // pillars
        [0, 8], [2, 8], [5, 8], [7, 8], // internal spatial diagonals
      ];
    } else if (type === 1) {
      // 02: Tactile Material Honesty -> 3D Faceted Octahedral Gemstone / Mineral
      const r = 40;
      vertices = [
        { x: 0, y: -r * 1.1, z: 0 }, // top apex
        { x: -r, y: 0, z: 0 },
        { x: 0, y: 0, z: r },
        { x: r, y: 0, z: 0 },
        { x: 0, y: 0, z: -r },
        { x: 0, y: r * 1.1, z: 0 }, // bottom apex
        // Secondary facet vertices
        { x: -r * 0.5, y: -r * 0.4, z: r * 0.5 },
        { x: r * 0.5, y: -r * 0.4, z: r * 0.5 },
      ];
      edges = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [5, 1], [5, 2], [5, 3], [5, 4],
        [1, 2], [2, 3], [3, 4], [4, 1],
        [0, 6], [2, 6], [1, 6],
        [0, 7], [2, 7], [3, 7],
      ];
    } else if (type === 2) {
      // 03: Warm Light Orchestration -> 3D Celestial Luminaire Gyroscope Rings
      const numPoints = 16;
      const radius = 38;
      // Ring 1 (XY plane)
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        vertices.push({
          x: Math.cos(theta) * radius,
          y: Math.sin(theta) * radius,
          z: 0,
        });
      }
      // Ring 2 (XZ plane)
      for (let i = 0; i < numPoints; i++) {
        const theta = (i / numPoints) * Math.PI * 2;
        vertices.push({
          x: Math.cos(theta) * radius * 0.78,
          y: 0,
          z: Math.sin(theta) * radius * 0.78,
        });
      }
      // Connect rings
      for (let i = 0; i < numPoints; i++) {
        edges.push([i, (i + 1) % numPoints]);
        edges.push([numPoints + i, numPoints + ((i + 1) % numPoints)]);
      }
      // Axis connections
      edges.push([0, numPoints]);
      edges.push([Math.floor(numPoints / 2), numPoints + Math.floor(numPoints / 2)]);
    } else {
      // 04: Sculptural Singular Curation -> 3D Möbius Architectural Ribbon Loop
      const numSegments = 24;
      const R = 32;
      const w = 12;
      for (let i = 0; i < numSegments; i++) {
        const u = (i / numSegments) * Math.PI * 2;
        const v = Math.PI / 2;
        const x = (R + w * Math.cos(u / 2)) * Math.cos(u);
        const y = (R + w * Math.cos(u / 2)) * Math.sin(u);
        const z = w * Math.sin(u / 2) * 1.4;
        vertices.push({ x, y, z });
      }
      for (let i = 0; i < numSegments; i++) {
        edges.push([i, (i + 1) % numSegments]);
        if (i % 3 === 0) {
          edges.push([i, (i + 8) % numSegments]);
        }
      }
    }

    const render = () => {
      time += 0.016;

      // Smooth acceleration when hovered
      const targetSpeed = isHovered ? 2.4 : 1.0;
      speedRef.current += (targetSpeed - speedRef.current) * 0.08;

      rotRef.current.x += 0.009 * speedRef.current;
      rotRef.current.y += 0.013 * speedRef.current;
      rotRef.current.z += 0.004 * speedRef.current;

      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Rotation angles
      const ax = rotRef.current.x;
      const ay = rotRef.current.y;
      const az = rotRef.current.z;

      const cosX = Math.cos(ax), sinX = Math.sin(ax);
      const cosY = Math.cos(ay), sinY = Math.sin(ay);
      const cosZ = Math.cos(az), sinZ = Math.sin(az);

      const fov = 180;
      const projected: { x: number; y: number; z: number; scale: number }[] = [];

      // Transform & Project 3D to 2D
      for (let i = 0; i < vertices.length; i++) {
        const v = vertices[i];

        // Rotate Y
        let x1 = v.x * cosY + v.z * sinY;
        let y1 = v.y;
        let z1 = -v.x * sinY + v.z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2 + 130; // camera distance

        const scale = fov / Math.max(z3, 1);
        const px = cx + x3 * scale;
        const py = cy + y3 * scale;

        projected.push({ x: px, y: py, z: z3, scale });
      }

      // Draw Edges with glowing depth-based alpha
      ctx.lineWidth = isHovered ? 1.6 : 1.1;

      for (let i = 0; i < edges.length; i++) {
        const [p1Idx, p2Idx] = edges[i];
        const p1 = projected[p1Idx];
        const p2 = projected[p2Idx];

        if (!p1 || !p2) continue;

        const avgZ = (p1.z + p2.z) / 2;
        const depthAlpha = Math.max(0.18, Math.min(0.9, (200 - avgZ) / 100));

        if (light) {
          ctx.strokeStyle = isHovered
            ? `rgba(130, 95, 40, ${depthAlpha * 1.3})`
            : `rgba(165, 126, 65, ${depthAlpha * 1.1})`;
        } else {
          ctx.strokeStyle = isHovered
            ? `rgba(201, 166, 107, ${depthAlpha * 1.2})`
            : `rgba(201, 166, 107, ${depthAlpha * 0.7})`;
        }

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Draw Glowing Nodes at Vertices
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const nodeRadius = Math.max(1, (2.4 * fov) / p.z);

        const nodeAlpha = Math.max(0.25, (200 - p.z) / 100);
        if (light) {
          ctx.fillStyle = isHovered ? "#6B4D1C" : "#A88242";
        } else {
          ctx.fillStyle = isHovered ? "#F4ECDD" : "#C9A66B";
        }
        ctx.globalAlpha = nodeAlpha;

        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        // Extra halo for frontmost nodes
        if (p.z < 130 && isHovered) {
          ctx.fillStyle = light ? "rgba(180, 140, 75, 0.45)" : "rgba(201, 166, 107, 0.4)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeRadius * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1.0;

      // Special Photon Core for Type 2 (Warm Light)
      if (type === 2) {
        const pulse = 1 + Math.sin(time * 3.5) * 0.2;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18 * pulse);
        grad.addColorStop(0, light ? "rgba(225, 135, 35, 0.9)" : "rgba(255, 180, 80, 0.8)");
        grad.addColorStop(0.5, light ? "rgba(180, 140, 75, 0.45)" : "rgba(201, 166, 107, 0.35)");
        grad.addColorStop(1, "rgba(201, 166, 107, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, 18 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [type, isHovered, light]);

  return (
    <div className="relative w-full h-32 flex items-center justify-center my-2 pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        width={180}
        height={130}
        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(201,166,107,0.25)] transition-transform duration-500"
        style={{
          transform: isHovered ? "scale(1.12)" : "scale(1.0)",
        }}
      />
    </div>
  );
}

