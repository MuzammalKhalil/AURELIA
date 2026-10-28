"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface ModelFallbackProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function ModelFallback({
  title = "Curated Architectural Living",
  subtitle = "High-definition 3D rendering unavailable or reduced motion enabled.",
  imageUrl = "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
}: ModelFallbackProps) {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-charcoal border border-champagne/20 rounded-xl overflow-hidden p-8">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover opacity-40 mix-blend-luminosity filter contrast-125"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      
      <div className="relative z-10 max-w-md text-center flex flex-col items-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne mb-2">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-2xl text-ivory tracking-wide">{title}</h3>
        <p className="text-xs text-ivory-muted leading-relaxed">{subtitle}</p>
        <span className="text-[10px] uppercase font-mono tracking-widest text-champagne/80 border border-champagne/30 px-3 py-1 rounded-full">
          Architectural Archival Preview
        </span>
      </div>
    </div>
  );
}

