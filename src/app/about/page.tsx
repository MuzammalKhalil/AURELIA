"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import AboutAtelierScene3D from "@/components/3d/AboutAtelierScene3D";
import { ArrowUpRight, Award, Compass, Eye, ShieldCheck, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const leadership = [
  {
    name: "Elena von Berg",
    role: "Founding Principal & Architectural Director",
    bio: "Trained at ETH Zürich and the Architectural Association London, Elena has spent two decades pioneering domestic sanctuaries defined by volumetric calm and monolithic stone.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Kenzo Takahashi",
    role: "Director of Materiality & Sculptural Furniture",
    bio: "Apprenticed with traditional master joiners in Kyoto before leading bespoke furniture design in Milan. Kenzo directs custom commission pieces and quarry stone selection.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Marcello Vanezi",
    role: "Partner & Acoustic Environmental Lead",
    bio: "Specializing in the psychoacoustics of residential spaces, Marcello sculpts hidden wall cavities, sound dampening geometries, and circadian lighting fixtures.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
];

const values = [
  {
    icon: Compass,
    title: "Spatial Stillness",
    text: "We reject visual turbulence. By paring spaces down to their monolithic essence, the mind finds unforced sanctuary.",
  },
  {
    icon: Sparkles,
    title: "Honest Materiality",
    text: "Stone from Roman quarries, unbleached flax linens, and hand-rubbed timber. Nothing artificial; everything gains patina with time.",
  },
  {
    icon: Eye,
    title: "Circadian Orchestration",
    text: "Light is not merely illumination—it is the room's heartbeat. We choreograph how daylight travels across volumes.",
  },
  {
    icon: ShieldCheck,
    title: "Generational Longevity",
    text: "Every furniture commission and architectural reveal is engineered to outlive fleeting stylistic epochs.",
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
        );
      }

      // Values stagger
      if (valuesRef.current) {
        gsap.fromTo(
          valuesRef.current.children,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // Team leadership stagger
      if (teamRef.current) {
        gsap.fromTo(
          teamRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.16,
            ease: "power2.out",
            scrollTrigger: {
              trigger: teamRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-24 overflow-hidden">
      {/* Hero Header with Cinematic Reveal */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <SectionHeading
          badge="Atelier Origins & Vision"
          title="Spaces with soul. Details with purpose."
          subtitle="AURELIA was established in 2008 as an antidote to disposable trends. We practice architecture and interior design as an enduring fine art."
        />

        <div className="relative mt-12 h-[450px] sm:h-[550px] w-full rounded-3xl overflow-hidden border border-champagne/20 shadow-2xl group">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
            alt="Aurelia Studio Interior"
            fill
            className="object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 z-10">
            <div className="bg-obsidian/85 backdrop-blur-xl p-5 rounded-2xl border border-champagne/25 shadow-xl">
              <span className="text-[10px] uppercase font-mono tracking-widest text-champagne block">
                Atelier Headquarters
              </span>
              <span className="text-sm font-serif text-ivory">
                The Zurich & Milan Design Studios
              </span>
            </div>
            <div className="bg-champagne text-obsidian px-4 py-2 rounded-full font-mono text-xs font-semibold shadow-champagne">
              18 Years of Architectural Mastery
            </div>
          </div>
        </div>

        {/* Real 3D Atelier Sculpture Pedestal */}
        <div className="mt-14">
          <AboutAtelierScene3D />
        </div>
      </section>

      {/* 4 Pillars with 3D Tilt */}
      <section className="bg-charcoal/80 py-24 border-y border-champagne/15 mb-24 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <SectionHeading
              badge="Guiding Philosophies"
              title="The Four Architectural Pillars"
              subtitle="The foundational tenets that govern every residence, custom plinth, and tactile commission."
            />
          </div>

          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <Tilt3D key={v.title} maxTilt={10} scale={1.02}>
                  <div className="h-full bg-obsidian border border-white/10 hover:border-champagne/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/30 flex items-center justify-center text-champagne mb-6 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-serif text-xl text-ivory mb-3 font-light">
                        {v.title}
                      </h3>
                      <p className="text-xs text-ivory-muted leading-relaxed font-light">
                        {v.text}
                      </p>
                    </div>
                  </div>
                </Tilt3D>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section with 3D Tilt Cards */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="mb-16">
          <SectionHeading
            badge="Studio Principals"
            title="The Minds Shaping the Spaces"
            subtitle="Architects, stonemasons, and acoustic engineers united by an obsession with enduring craftsmanship."
          />
        </div>

        <div ref={teamRef} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {leadership.map((leader) => (
            <Tilt3D key={leader.name} maxTilt={8} scale={1.02}>
              <div className="h-full bg-charcoal border border-white/10 hover:border-champagne/50 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group">
                <div>
                  <div className="relative h-96 w-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-80" />
                  </div>

                  <div className="p-8">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-champagne block mb-1">
                      {leader.role}
                    </span>
                    <h3 className="font-serif text-2xl text-ivory mb-4 font-light">
                      {leader.name}
                    </h3>
                    <p className="text-xs text-ivory-muted leading-relaxed font-light">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-ivory-dark uppercase tracking-widest">
                    Atelier Principal
                  </span>
                  <span className="w-2 h-2 rounded-full bg-champagne/40 group-hover:bg-champagne transition-colors" />
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* Call to Action Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-br from-charcoal via-obsidian to-charcoal border border-champagne/25 rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
          <div className="space-y-3 z-10">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-champagne">
              Commission an Architectural Dialogue
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory font-light">
              Ready to shape your private sanctuary?
            </h3>
            <p className="text-xs sm:text-sm text-ivory-muted max-w-xl font-light">
              We accept a limited roster of 8 residential commissions per calendar year to preserve obsessive artisanal attention.
            </p>
          </div>
          <Link
            href="/contact"
            className="z-10 bg-champagne hover:bg-champagne-light text-obsidian px-8 py-4 rounded-full text-xs font-mono uppercase tracking-widest font-semibold flex items-center space-x-2 transition-all shadow-champagne hover:scale-105 active:scale-95"
          >
            <span>Begin Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
