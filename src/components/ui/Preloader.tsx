"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const TICK_COUNT = 36;
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => i);

export default function Preloader() {
  const pathname = usePathname();

  // Full-screen preloader state (for initial site load / refresh)
  const [initialLoading, setInitialLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  // Top sleek navigation progress bar (for instantaneous inner page navigation)
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathname = useRef(pathname);

  const tickerRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<(HTMLDivElement | null)[]>([]);

  // 1. Initial Page Load: Snappy 750ms luxury dial sequence
  useEffect(() => {
    const validTicks = ticksRef.current.filter(Boolean);
    const tl = gsap.timeline();

    if (validTicks.length > 0 && tickerRef.current) {
      tl.to(validTicks, {
        y: "-=6",
        duration: 0.04,
        stagger: 0.008,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      })
      .to(
        tickerRef.current,
        {
          rotate: 360,
          duration: 0.75,
          ease: "power2.inOut",
        },
        "<"
      );
    }

    const startTime = performance.now();
    const DURATION = 750; // Snappy 750ms
    let rafId: number;

    const tick = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / DURATION) * 100));
      setDisplayProgress(progress);

      if (elapsed >= DURATION) {
        setDisplayProgress(100);
        setFadeOut(true);
        setTimeout(() => {
          setInitialLoading(false);
        }, 380);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      tl.kill();
    };
  }, []);

  // 2. Instantaneous Inner Page Navigation with Top Velocity Beam
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      window.scrollTo(0, 0);

      // Trigger sleek top loading bar for 250ms
      setIsNavigating(true);
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 280);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <>
      {/* Top Velocity Beam on Inner Page Navigation - 0ms delay */}
      {isNavigating && (
        <div
          className="fixed top-0 left-0 right-0 h-[2.5px] z-[99999] pointer-events-none bg-gradient-to-r from-transparent via-champagne to-champagne shadow-[0_0_12px_#C9A66B] animate-progressBar"
          aria-hidden="true"
        />
      )}

      {/* Initial Entry Luxury Dial Preloader */}
      {initialLoading && (
        <div
          onClick={() => {
            setDisplayProgress(100);
            setFadeOut(true);
            setTimeout(() => setInitialLoading(false), 200);
          }}
          className={`fixed inset-0 z-[99999] bg-obsidian flex flex-col justify-between p-8 md:p-14 select-none cursor-pointer transition-all duration-400 ease-out ${
            fadeOut ? "opacity-0 pointer-events-none scale-[1.01] blur-sm" : "opacity-100 scale-100 blur-0"
          }`}
        >
          {/* Background ambient radial aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[130px] pointer-events-none" />

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
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
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
                        transform: `rotate(${deg}deg) translateY(-52px)`,
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
                <div className="w-[2px] h-13 bg-gradient-to-t from-transparent via-champagne to-champagne rounded-full -translate-y-6 shadow-[0_0_8px_#C9A66B]" />
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
              <p className="text-[10px] sm:text-[11px] uppercase font-mono tracking-[0.4em] text-champagne/90 pt-1">
                Architecture & Interior Atelier
              </p>
            </div>

            {/* Phase Subtitle */}
            <div className="h-5 flex items-center justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ivory-dark">
                INITIALIZING 3D SPATIAL ENGINE
              </span>
            </div>
          </div>

          {/* Bottom Progress Bar & Percentage */}
          <div className="w-full max-w-md mx-auto flex flex-col space-y-2 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono text-ivory-dark">
              <span className="tracking-widest uppercase text-[10px] flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-ping" />
                <span>Calibrating Viewport</span>
              </span>
              <span className="text-champagne font-semibold font-mono text-xs">
                {displayProgress}%
              </span>
            </div>

            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-champagne transition-all duration-100 ease-out shadow-[0_0_10px_#C9A66B]"
                style={{ width: `${displayProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
