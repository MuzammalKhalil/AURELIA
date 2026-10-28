"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import ServicesFabrication3D from "@/components/3d/ServicesFabrication3D";
import { ArrowUpRight, CheckCircle2, ChevronDown, Sparkles, Compass, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const serviceTiers = [
  {
    tier: "Full-Scale Interior Architecture",
    tag: "Comprehensive Turnkey",
    idealFor: "Penthouses, historic estates, luxury residential ground-up builds",
    scope: [
      "Complete structural volumetric planning and partition re-engineering",
      "Integrated architectural lighting, HVAC reveals, and acoustic cavity design",
      "Full 3D digital twin room simulations with interactive walkthroughs",
      "Custom millwork, monolithic carved stone basins, and bespoke kitchen architectures",
      "Direct quarry block selection and global master artisan coordination",
      "Turnkey site management and white-glove curation handover",
    ],
    timeline: "6 – 18 Months",
  },
  {
    tier: "Bespoke Furniture & Curatorial Styling",
    tag: "Artisanal Commission",
    idealFor: "Refining existing luxury residences with 1-of-1 statement pieces",
    scope: [
      "Custom 1-of-1 sculptural lounge chairs, curved velvet sofas, and monolith dining tables",
      "Rare vintage collectible design sourcing from European auction houses",
      "Hand-tufted natural wool & silk rug masterplans",
      "Private gallery art advisory and custom plinth engineering",
      "Tactile drapery and soft-goods material harmonization",
    ],
    timeline: "3 – 6 Months",
  },
  {
    tier: "Spatial Advisory & Material Consultation",
    tag: "Strategic Direction",
    idealFor: "Clients seeking high-level architectural direction and material curation",
    scope: [
      "Comprehensive spatial layout and architectural circulation review",
      "Tactile material board curation (timbers, limestones, patinated metals)",
      "Circadian lighting schematics and luminaire specification",
      "Acoustic optimization guidance for media lounges and private libraries",
      "Contractor finish specification binder with exact tolerances",
    ],
    timeline: "4 – 8 Weeks",
  },
];

const faqs = [
  {
    q: "Do you take commissions internationally?",
    a: "Yes. Our principals maintain active studios in New York, Zurich, and Milan, handling private residential commissions across the United States, Europe, the Middle East, and East Asia.",
  },
  {
    q: "How does the 3D modeling process work for clients?",
    a: "Every client receives access to a private digital twin room model rendered in real-time 3D (similar to the interactive models featured on our site), enabling you to inspect sightlines, daylight movement, and furniture proportions interactively before fabrication.",
  },
  {
    q: "Can you collaborate with our existing executive architect?",
    a: "Seamlessly. We frequently serve as lead interior architects in concert with executive architects of record, delivering all interior millwork, detailing, lighting schedules, and finishes.",
  },
  {
    q: "What is your typical project budget threshold?",
    a: "Given the bespoke nature of our quarry stone extraction, master joinery, and custom furniture curation, our full-scale architectural engagements typically start at $250,000 for interior scopes.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const pageRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLDivElement>(null);
  const faqsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Tiers stagger reveal
      if (tiersRef.current) {
        gsap.fromTo(
          tiersRef.current.children,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            stagger: 0.18,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tiersRef.current,
              start: "top 82%",
            },
          }
        );
      }

      // FAQs reveal
      if (faqsRef.current) {
        gsap.fromTo(
          faqsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: faqsRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pt-32 pb-24 overflow-hidden">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <SectionHeading
            badge="Atelier Disciplines & Scope"
            title="Tailored Architectural Engagements"
            subtitle="From ground-up volumetric interior architecture to individual bespoke furniture commissions, our atelier provides uncompromised spatial mastery."
          />
          <div className="flex items-center space-x-2 bg-charcoal border border-champagne/30 px-4 py-2 rounded-full text-xs font-mono text-champagne self-start md:self-auto shadow-champagne">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Turnkey White-Glove Handover</span>
          </div>
        </div>
      </section>

      {/* 3 Service Tiers with 3D Tilt */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div ref={tiersRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {serviceTiers.map((tier, idx) => (
            <Tilt3D key={tier.tier} maxTilt={8} scale={1.02}>
              <div className="h-full bg-charcoal/80 border border-white/10 hover:border-champagne/50 rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl group relative backdrop-blur-xl">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-champagne">
                      {tier.tag}
                    </span>
                    <span className="font-mono text-xs text-ivory-dark">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-ivory mt-6 mb-3 font-light group-hover:text-champagne transition-colors">
                    {tier.tier}
                  </h3>

                  <div className="bg-obsidian/70 rounded-xl p-3.5 mb-6 border border-white/5">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-champagne block mb-1">
                      Ideal For:
                    </span>
                    <p className="text-xs text-ivory-muted font-light leading-relaxed">
                      {tier.idealFor}
                    </p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-dark block">
                      Scope Deliverables:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.scope.map((item) => (
                        <li key={item} className="flex items-start space-x-2 text-xs text-ivory-muted font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-champagne flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-ivory-dark">
                    <span>Timeline: </span>
                    <span className="text-champagne font-semibold">{tier.timeline}</span>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center space-x-1 text-xs font-mono uppercase tracking-wider text-champagne hover:text-champagne-light group-hover:translate-x-1 transition-all"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>

      {/* Real-time 3D Bespoke Fabrication Workbench */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-28">
        <div className="mb-12">
          <SectionHeading
            badge="Bespoke Commission Lab"
            title="Real-Time 3D Fabrication Studio"
            subtitle="Inspect custom furniture models, wireframe structures, and quarry stone selections prior to master artisan fabrication."
          />
        </div>
        <ServicesFabrication3D />
      </section>

      {/* Interactive Accordion FAQs */}
      <section className="bg-charcoal/70 py-24 border-y border-champagne/15 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <SectionHeading
            badge="Client Inquiries"
            title="Frequently Addressed Questions"
            subtitle="Everything you need to know about commissioning our architectural interior atelier."
            className="mb-14 text-center md:text-left"
          />

          <div ref={faqsRef} className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-obsidian border border-white/10 hover:border-champagne/40 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-serif text-lg sm:text-xl text-ivory font-light">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-champagne transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-champagne text-obsidian" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-ivory-muted leading-relaxed font-light border-t border-white/5 animate-[fadeIn_0.3s_ease-out]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
