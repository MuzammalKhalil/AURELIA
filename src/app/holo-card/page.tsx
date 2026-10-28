"use client";

import { Scene } from "@/components/shaders/Scene";
import SectionHeading from "@/components/ui/SectionHeading";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function HoloCardPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-obsidian text-ivory">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-champagne hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Atelier</span>
          </Link>
          <div className="flex items-center space-x-2 bg-charcoal border border-champagne/30 px-3.5 py-1.5 rounded-full text-xs font-mono text-champagne">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ThreeUI Holographic Shaders</span>
          </div>
        </div>

        <SectionHeading
          badge="Interactive 3D Artifact"
          title="Dark Souls Holo Card — The Ashen One"
          subtitle="Original holographic shader card beside the candlelit sword shrine. Drag to rotate in 3D, hover to tilt, and double-click or press 'F' to flip."
          className="mb-10"
        />

        <div className="w-full">
          <Scene />
        </div>
      </div>
    </div>
  );
}

