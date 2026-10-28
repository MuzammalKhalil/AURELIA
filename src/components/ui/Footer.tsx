"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-charcoal border-t border-champagne/15 text-ivory relative z-10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-light tracking-[0.25em] text-ivory">
                AURELIA
              </span>
              <span className="block text-[10px] uppercase tracking-[0.35em] text-champagne font-mono mt-0.5">
                Architecture & Interior Atelier
              </span>
            </Link>
            <p className="text-sm text-ivory-muted leading-relaxed max-w-sm">
              We orchestrate high-dimensional living spaces where sculptural geometry, warm tactile materiality, and natural light harmonize into timeless private sanctuaries.
            </p>
            <div className="pt-2 text-xs text-champagne/90 tracking-widest uppercase font-mono">
              New York • Zurich • Kyoto • Milan
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-champagne font-mono mb-6">
              Navigation
            </h4>
            <ul className="space-y-3.5 text-sm text-ivory-muted">
              <li>
                <Link href="/" className="hover:text-champagne transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link href="/spaces" className="hover:text-champagne transition-colors">
                  Signature Spaces (3D)
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-champagne transition-colors">
                  Selected Portfolio
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-champagne transition-colors">
                  Bespoke Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-champagne transition-colors">
                  Our Philosophy & Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Specialties */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-champagne font-mono mb-6">
              Atelier Disciplines
            </h4>
            <ul className="space-y-3.5 text-sm text-ivory-muted">
              <li>Architectural Spatial Planning</li>
              <li>Sculptural Custom Furniture</li>
              <li>Tactile Material Curation</li>
              <li>Acoustic & Lighting Masterplans</li>
              <li>Private Art & Decor Commission</li>
            </ul>
          </div>

          {/* Newsletter / Gazette */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-champagne font-mono mb-6">
              Private Gazette
            </h4>
            <p className="text-xs text-ivory-muted leading-relaxed">
              Receive quarterly monographs on architectural form, tactile research, and private openings.
            </p>
            {subscribed ? (
              <div className="p-3 bg-champagne/10 border border-champagne/40 rounded-sm flex items-center space-x-2 text-champagne text-xs">
                <Check className="w-4 h-4" />
                <span>You are on our private dispatch list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-obsidian border border-champagne/25 px-4 py-3 text-xs text-ivory placeholder-ivory-dark focus:outline-none focus:border-champagne transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-champagne hover:bg-champagne-400 text-obsidian transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-ivory-dark">
                  Strictly confidential. No spam ever.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-ivory-dark space-y-4 md:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} AURELIA Atelier Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-champagne transition-colors">
              Privacy & Legal
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-champagne transition-colors">
              Client Concierge
            </Link>
            <span>•</span>
            <span className="font-mono text-champagne/70">WebGL 2.0 / R3F Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

