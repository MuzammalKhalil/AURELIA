"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useProgress } from "@react-three/drei";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  "/": "INITIALIZING 3D SPATIAL ENGINE • WELCOME TO AURELIA",
  "/spaces": "CALIBRATING LIVING ENVIRONMENTS • SIGNATURE SPACES",
  "/services": "PREPARING BESPOKE FABRICATION • ATELIER SERVICES",
  "/projects": "CURATING ARCHITECTURAL MONOGRAPHS • PORTFOLIO",
  "/about": "PROVENANCE & CRAFTSMANSHIP • THE ATELIER",
  "/contact": "ESTABLISHING PRIVATE COMMISSION DATUM • INQUIRIES",
  "/privacy": "CONFIDENTIALITY & CLIENT PROTOCOL",
  "/holo-card": "HOLOGRAPHIC SHADER CALIBRATION LAB",
};

const PHRASES = [
  "INITIALIZING 3D SPATIAL ENGINE",
  "CALIBRATING LIGHT & MATERIALS",
  "SYNCHRONIZING ARCHITECTURAL DATUM",
  "WELCOME TO AURELIA",
];

const TICK_COUNT = 36;
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => i);

export default function Preloader() {
  const pathname = usePathname();
  const { active, progress: threeProgress } = useProgress();

  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<(HTMLDivElement | null)[]>([]);

  const isTransitioningRef = useRef(false);
  const prevPathname = useRef(pathname);
  const isInitialMount = useRef(true);

  // Play Dial and Needle Timeline Choreography
  const playDialChoreography = useCallback((durationSec: number) => {
    const validTicks = ticksRef.current.filter(Boolean);
    const tl = gsap.timeline();

    if (validTicks.length > 0 && tickerRef.current) {
      tl.to(validTicks, {
        y: "-=6",
        duration: 0.05,
        stagger: 0.01,
        yoyo: true,
        repeat: Math.max(1, Math.round(durationSec / 0.45)),
        ease: "power1.inOut",
      })
      .to(
        tickerRef.current,
        {
          rotate: "+=360",
          duration: durationSec,
          ease: "power2.inOut",
        },
        "<"
      );
    }
    return tl;
  }, []);

  // Main Loading Runner
  const runLoadingSequence = useCallback((isInitial: boolean) => {
    setLoading(true);
    setFadeOut(false);
    setDisplayProgress(0);
    setPhraseIndex(0);
    isTransitioningRef.current = true;

    const minDuration = isInitial ? 1800 : 950; // 1.8s for initial load, 0.95s for inner page load
    const startTime = performance.now();
    const durationSec = minDuration / 1000;

    const tl = playDialChoreography(durationSec);
    let rafId: number;
    let currentVal = 0;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const timePercent = Math.min(100, (elapsed / minDuration) * 100);

      // In initial load, wait for 3D progress; in inner route navigation, interpolate timePercent
      const targetPercent = isInitial && active
        ? Math.max(timePercent * 0.7, threeProgress)
        : timePercent;

      currentVal += (targetPercent - currentVal) * 0.12;
      const rounded = Math.min(100, Math.floor(currentVal));
      setDisplayProgress(rounded);

      if (rounded > 75) setPhraseIndex(3);
      else if (rounded > 50) setPhraseIndex(2);
      else if (rounded > 25) setPhraseIndex(1);

      if (elapsed >= minDuration && rounded >= 99) {
        setDisplayProgress(100);
        setFadeOut(true);
        setTimeout(() => {
          setLoading(false);
          isTransitioningRef.current = false;
        }, 550);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, [active, threeProgress, playDialChoreography]);

  // 1. Initial Load & Refresh Handler
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      const cleanup = runLoadingSequence(true);
      return cleanup;
    }
  }, [runLoadingSequence]);

  // 2. Trigger on Every Route / Inner Page Change
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);
      const cleanup = runLoadingSequence(false);
      return cleanup;
    }
  }, [pathname, runLoadingSequence]);

  // 3. Intercept Internal Link Clicks for Instant Preloader Trigger
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isInternal =
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.startsWith("/#") &&
        !href.startsWith("mailto:") &&
        !href.startsWith("tel:") &&
        anchor.target !== "_blank";

      if (isInternal) {
        const cleanHref = href.split("#")[0].replace(/\/$/, "") || "/";
        const currentClean = window.location.pathname.replace(/\/$/, "") || "/";

        if (cleanHref !== currentClean && !isTransitioningRef.current) {
          // Immediately show preloader on click
          setLoading(true);
          setFadeOut(false);
        }
      }
    };

    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleDocumentClick, { capture: true });
    };
  }, []);

  if (!loading) return null;

  const currentDesc = ROUTE_DESCRIPTIONS[pathname] || PHRASES[phraseIndex];

  return (
    <div
      ref={containerRef}
      onClick={() => {
        setDisplayProgress(100);
        setFadeOut(true);
        setTimeout(() => setLoading(false), 350);
      }}
      className={`fixed inset-0 z-[99999] bg-obsidian flex flex-col justify-between p-8 md:p-14 select-none cursor-pointer transition-all duration-700 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none scale-[1.02] blur-sm" : "opacity-100 scale-100 blur-0"
      }`}
    >
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs font-mono relative z-10">
        <div className="flex items-center space-x-2 text-champagne">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="uppercase tracking-[0.25em]">Atelier 3D Experience</span>
        </div>
        <div className="text-ivory-dark tracking-widest font-mono text-[11px]">
          MMVIII • EDITION 2026
        </div>
      </div>

      {/* Central Brand Reveal + Precision Ticker Gauge */}
      <div className="flex flex-col items-center justify-center text-center my-auto space-y-6 relative z-10">
        
        {/* Luxury Architectural Dial Gauge */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          
          {/* Outer dial rings */}
          <div className="absolute inset-2 rounded-full border border-champagne/20 pointer-events-none" />
          <div className="absolute inset-5 rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* Dial tick marks */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {TICKS.map((idx) => {
              const deg = (idx * 360) / TICK_COUNT;
              return (
                <div
                  key={idx}
                  className="absolute flex flex-col items-center origin-center"
                  style={{
                    transform: `rotate(${deg}deg) translateY(-54px)`,
                  }}
                >
                  <div
                    ref={(el) => {
                      ticksRef.current[idx] = el;
                    }}
                    className={`tick rounded-full transition-colors ${
                      idx % 3 === 0
                        ? "w-[2px] h-3 bg-champagne shadow-[0_0_6px_#C9A66B]"
                        : "w-[1.5px] h-1.5 bg-ivory-dark/60"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Needle Pointer */}
          <div
            ref={tickerRef}
            className="ticker absolute w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformOrigin: "center center" }}
          >
            <div className="w-[2px] h-14 bg-gradient-to-t from-transparent via-champagne to-champagne rounded-full -translate-y-7 shadow-[0_0_8px_#C9A66B]" />
            <div className="absolute top-5 w-2 h-2 rounded-full bg-champagne shadow-[0_0_10px_#C9A66B]" />
          </div>

          {/* Center Pivot Gem */}
          <div className="relative w-6 h-6 rounded-full bg-obsidian border border-champagne flex items-center justify-center shadow-champagne">
            <div className="w-2 h-2 rounded-full bg-champagne animate-pulse" />
          </div>
        </div>

        {/* Brand Title */}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-light text-ivory tracking-[0.2em] sm:tracking-[0.25em]">
            AURELIA
          </h1>

          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-champagne to-transparent" />

          <p className="text-[11px] uppercase font-mono tracking-[0.4em] text-champagne/90 pt-1">
            Architecture & Interior Atelier
          </p>
        </div>

        {/* Phase / Route subtitle */}
        <div className="h-5 flex items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ivory-dark transition-all duration-300">
            {currentDesc}
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="w-full max-w-md mx-auto flex flex-col space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-ivory-dark">
          <span className="tracking-widest uppercase text-[10px] flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-ping" />
            <span>Streaming 3D Spatial Geometry</span>
          </span>
          <span className="text-champagne font-semibold font-mono text-xs">
            {displayProgress}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-champagne transition-all duration-150 ease-out shadow-[0_0_10px_#C9A66B]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
