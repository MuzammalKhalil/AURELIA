"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";

export default function ContactCtaSection() {
  return (
    <section className="py-28 bg-charcoal border-t border-champagne/15 relative overflow-hidden">
      {/* Warm champagne atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-champagne/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2.5 mb-6">
          <span className="w-8 h-[1px] bg-champagne" />
          <span className="text-xs uppercase font-mono tracking-[0.3em] text-champagne font-medium">
            Atelier Commission 2026/2027
          </span>
          <span className="w-8 h-[1px] bg-champagne" />
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-ivory font-light leading-[1.1] mb-6">
          Let&apos;s create something{" "}
          <span className="italic font-normal luxury-gradient-text">
            timeless.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-ivory-muted font-light leading-relaxed max-w-xl mb-10">
          Whether you are embarking on a complete penthouse architectural redesign or commissioning a bespoke sculptural furniture collection, our partners are at your service.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-obsidian bg-champagne hover:bg-champagne-300 px-8 py-4 rounded-full transition-all duration-300 shadow-champagne hover:scale-[1.02]"
          >
            <span>Request Private Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <Link
            href="/spaces"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-ivory border border-champagne/30 hover:border-champagne hover:bg-champagne/10 px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>Explore 3D Spaces</span>
          </Link>
        </div>

        {/* Global Atelier Contact Badges */}
        <div className="w-full pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono text-ivory-dark">
          <div className="flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4 text-champagne" />
            <span>concierge@aurelia-atelier.com</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Phone className="w-4 h-4 text-champagne" />
            <span>+1 (212) 890-4420</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <MapPin className="w-4 h-4 text-champagne" />
            <span>740 Madison Ave, New York</span>
          </div>
        </div>
      </div>
    </section>
  );
}

