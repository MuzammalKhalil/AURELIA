"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, Compass } from "lucide-react";
import gsap from "gsap";

const phrases = [
  "INITIALIZING 3D SPATIAL ENGINE",
  "CALIBRATING LIGHT & MATERIALS",
  "SYNCHRONIZING ARCHITECTURAL DATUM",
  "WELCOME TO AURELIA",
];

// 36 precision dial tick marks
const TICK_COUNT = 36;
const TICKS = Array.from({ length: TICK_COUNT }, (_, i) => i);

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const ticksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Exactly implement user's timeline:
    // createTimeline()
    //   .add('.tick', { y: '-=6', duration: 50 }, stagger(10))
    //   .add('.ticker', { rotate: 360, duration: 1920 }, '<');
    const validTicks = ticksRef.current.filter(Boolean);

    const tl = gsap.timeline({
      onComplete: () => {
        setFadeOut(true);
        setTimeout(() => setLoading(false), 450);
      },
    });

    if (validTicks.length > 0 && tickerRef.current) {
      tl.to(validTicks, {
        y: "-=6",
        duration: 0.05, // 50ms
        stagger: 0.01,  // stagger(10ms)
        yoyo: true,
        repeat: 3,      // ripples around the dial during the spin
        ease: "power1.inOut",
      })
      .to(tickerRef.current, {
        rotate: 360,
        duration: 1.92, // 1920ms
        ease: "power2.inOut",
      }, "<"); // Starts synchronously with '<'
    }

    // 2. Synchronize progress counter smoothly to 100% over 1920ms
    const startTime = performance.now();
    const duration = 1920;

    const timer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct > 75) setPhraseIndex(3);
      else if (pct > 50) setPhraseIndex(2);
      else if (pct > 25) setPhraseIndex(1);

      if (elapsed >= duration) {
        clearInterval(timer);
      }
    }, 20);

    return () => {
      clearInterval(timer);
      tl.kill();
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      ref={containerRef}
      onClick={() => setLoading(false)}
      className={`fixed inset-0 z-[99999] bg-obsidian flex flex-col justify-between p-8 md:p-14 select-none cursor-pointer transition-all duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background ambient radial aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs font-mono relative z-10">
        <div className="flex items-center space-x-2 text-champagne">
          <Sparkles className="w-3.5 h-3.5" />
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
          
          {/* Subtle outer dial ring */}
          <div className="absolute inset-2 rounded-full border border-champagne/20 pointer-events-none" />
          <div className="absolute inset-5 rounded-full border border-dashed border-white/10 pointer-events-none" />

          {/* .tick marks arranged along the circular circumference */}
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

          {/* .ticker central pointer needle spinning 360deg in 1920ms */}
          <div
            ref={tickerRef}
            className="ticker absolute w-full h-full flex items-center justify-center pointer-events-none"
            style={{ transformOrigin: "center center" }}
          >
            {/* Compass / Needle Pointer */}
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
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-light text-ivory tracking-[0.25em]">
            AURELIA
          </h1>

          <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-champagne to-transparent" />

          <p className="text-[11px] uppercase font-mono tracking-[0.4em] text-champagne/90 pt-1">
            Architecture & Interior Atelier
          </p>
        </div>

        {/* Phase subtitle */}
        <div className="h-5 flex items-center justify-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-ivory-dark transition-all duration-300">
            {phrases[phraseIndex]}
          </span>
        </div>
      </div>

      {/* Bottom Progress Bar & Percentage */}
      <div className="w-full max-w-md mx-auto flex flex-col space-y-2 relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-ivory-dark">
          <span className="tracking-widest uppercase text-[10px] flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-champagne animate-ping" />
            <span>Calibrating Spatial Engine</span>
          </span>
          <span className="text-champagne font-semibold font-mono text-xs">
            {progress}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-champagne transition-all duration-100 ease-linear shadow-[0_0_10px_#C9A66B]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
