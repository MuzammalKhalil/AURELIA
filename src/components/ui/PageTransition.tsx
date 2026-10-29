"use client";

import React, { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, Compass } from "lucide-react";

const ROUTE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "AURELIA",
    subtitle: "HAUTE INTERIOR & SPATIAL ATELIER",
  },
  "/spaces": {
    title: "SIGNATURE SPACES",
    subtitle: "SPATIAL ANATOMY & LIVING ENVIRONMENTS",
  },
  "/services": {
    title: "BESPOKE SERVICES",
    subtitle: "ARCHITECTURAL INTERIORS & CUSTOM FABRICATION",
  },
  "/projects": {
    title: "CURATED MONOGRAPHS",
    subtitle: "GLOBAL RESIDENTIAL & CULTURAL PORTFOLIO",
  },
  "/about": {
    title: "THE ATELIER",
    subtitle: "PHILOSOPHY, PROVENANCE & MATERIAL SOUL",
  },
  "/contact": {
    title: "PRIVATE INQUIRIES",
    subtitle: "COMMISSIONS, CONSULTATIONS & ATELIER ACCESS",
  },
  "/privacy": {
    title: "LEGAL PROTOCOL",
    subtitle: "DATA CONFIDENTIALITY & CLIENT PRIVACY",
  },
  "/holo-card": {
    title: "HOLOGRAPHIC LAB",
    subtitle: "THREEUI SHADER INTERFACE CALIBRATION",
  },
};

export default function PageTransition() {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<string>("/");
  const prevPathname = useRef(pathname);
  const isFirstMount = useRef(true);

  // 1. Intercept internal navigation link clicks for instantaneous responsive feedback
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only handle internal relative page routes
      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        anchor.target !== "_blank";

      if (isInternal) {
        // Strip trailing slashes and hash for comparison
        const cleanHref = href.split("#")[0].replace(/\/$/, "") || "/";
        const currentClean = window.location.pathname.replace(/\/$/, "") || "/";

        if (cleanHref !== currentClean) {
          setTransitionTarget(cleanHref);
          setIsTransitioning(true);
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  // 2. When pathname changes, smoothly finalize and dissolve the transition curtain
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      prevPathname.current = pathname;
      return;
    }

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      // Scroll to top immediately on route change
      window.scrollTo(0, 0);

      // Keep transition curtain up briefly to allow new 3D scene & components to mount
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 380);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!isTransitioning) return null;

  const currentMeta = ROUTE_TITLES[transitionTarget] || {
    title: "AURELIA",
    subtitle: "ARCHITECTURAL SPATIAL ATELIER",
  };

  return (
    <div
      className="fixed inset-0 z-[99990] bg-obsidian/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-14 select-none pointer-events-auto transition-opacity duration-300 animate-fadeIn"
      aria-hidden="true"
    >
      {/* Top Luxury Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-champagne shadow-[0_0_14px_#C9A66B] animate-progressBar" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-champagne/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header info */}
      <div className="flex items-center justify-between text-xs font-mono relative z-10">
        <div className="flex items-center space-x-2 text-champagne">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="uppercase tracking-[0.25em]">Transitioning Route</span>
        </div>
        <div className="text-ivory-dark tracking-widest font-mono text-[10px] hidden sm:block">
          DATUM SYNC • 2026
        </div>
      </div>

      {/* Center Luxury Gyroscopic Spinner & Route Destination */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-6 relative z-10">
        {/* Architectural Dial Icon */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-champagne/30 border-dashed animate-spin-slow" />
          <div className="absolute inset-2 rounded-full border border-champagne/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-champagne shadow-[0_0_12px_#C9A66B] animate-ping" />
          <Compass className="w-6 h-6 text-champagne/90 absolute" />
        </div>

        {/* Dynamic Route Title */}
        <div className="space-y-2 max-w-lg">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-ivory tracking-[0.2em] uppercase">
            {currentMeta.title}
          </h2>
          <div className="h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-champagne to-transparent" />
          <p className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.35em] text-champagne/90">
            {currentMeta.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom Loading Indicator */}
      <div className="flex items-center justify-between text-[10px] font-mono text-ivory-dark relative z-10 max-w-xs mx-auto w-full pt-4 border-t border-white/10">
        <span className="uppercase tracking-widest flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-pulse" />
          <span>Calibrating Viewport</span>
        </span>
        <span className="text-champagne font-mono">STANDBY</span>
      </div>
    </div>
  );
}
