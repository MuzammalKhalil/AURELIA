"use client";

import { useState, useEffect, useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt3D from "@/components/ui/Tilt3D";
import ContactGlobe3D from "@/components/3d/ContactGlobe3D";
import { ArrowUpRight, Check, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    projectType: "Full Architectural Renovation",
    timeline: "Within 6 Months",
    budgetRange: "$250k – $500k",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const pageRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" }
        );
      }
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div ref={pageRef} className="pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeading
          badge="Direct Concierge & Inquiry"
          title="Let's create something timeless."
          subtitle="We welcome inquiries from private residential clients, estate owners, and fellow architects."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details & Studios (Col 5) with 3D Tilt */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-ivory mb-3 font-light">
                Private Consultation
              </h3>
              <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed font-light mb-6">
                Every project begins with a confidential dialogue with one of our founding principals to assess volumetric potential, architectural scope, and alignment.
              </p>

              {/* 3D Global Horizon Gyroscope */}
              <ContactGlobe3D />
            </div>

            {/* Atelier Studios with 3D Tilt */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-mono tracking-[0.25em] text-champagne">
                Atelier Locations
              </h4>

              <Tilt3D maxTilt={6} scale={1.01}>
                <div className="bg-charcoal/80 border border-champagne/15 hover:border-champagne/40 rounded-2xl p-6 space-y-2 backdrop-blur-xl transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-ivory">Zurich Studio</span>
                    <span className="text-[10px] font-mono text-champagne uppercase">Headquarters</span>
                  </div>
                  <p className="text-xs text-ivory-muted font-light">
                    Bahnhofstrasse 42, 8001 Zürich, Switzerland
                  </p>
                  <p className="text-xs font-mono text-ivory-dark pt-1">
                    +41 44 211 88 00
                  </p>
                </div>
              </Tilt3D>

              <Tilt3D maxTilt={6} scale={1.01}>
                <div className="bg-charcoal/80 border border-champagne/15 hover:border-champagne/40 rounded-2xl p-6 space-y-2 backdrop-blur-xl transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-ivory">Milan Foundry & Joinery</span>
                    <span className="text-[10px] font-mono text-champagne uppercase">Bespoke Atelier</span>
                  </div>
                  <p className="text-xs text-ivory-muted font-light">
                    Via Monte Napoleone 18, 20121 Milano, Italy
                  </p>
                  <p className="text-xs font-mono text-ivory-dark pt-1">
                    +39 02 876 54 32
                  </p>
                </div>
              </Tilt3D>

              <Tilt3D maxTilt={6} scale={1.01}>
                <div className="bg-charcoal/80 border border-champagne/15 hover:border-champagne/40 rounded-2xl p-6 space-y-2 backdrop-blur-xl transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-lg text-ivory">New York Concierge</span>
                    <span className="text-[10px] font-mono text-champagne uppercase">Private Suite</span>
                  </div>
                  <p className="text-xs text-ivory-muted font-light">
                    Franklin Street, Tribeca, New York, NY 10013
                  </p>
                  <p className="text-xs font-mono text-ivory-dark pt-1">
                    +1 (212) 555-0198
                  </p>
                </div>
              </Tilt3D>
            </div>

            {/* Direct Channel */}
            <div className="bg-obsidian border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-dark block">
                  Direct Private Dispatch
                </span>
                <span className="font-mono text-xs text-champagne">
                  concierge@aureliadesign.com
                </span>
              </div>
              <Mail className="w-5 h-5 text-champagne" />
            </div>
          </div>

          {/* Form (Col 7) */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-charcoal border border-champagne/30 rounded-3xl p-10 sm:p-14 text-center space-y-6 shadow-2xl animate-[fadeIn_0.3s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-champagne/15 border border-champagne flex items-center justify-center mx-auto text-champagne shadow-champagne">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-ivory font-light">
                  Inquiry Dispatched to Atelier
                </h3>
                <p className="text-xs sm:text-sm text-ivory-muted leading-relaxed max-w-md mx-auto font-light">
                  Thank you for entrusting us with your vision. An Aurelia founding principal will review your architectural scope and contact you within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-mono uppercase tracking-widest text-champagne hover:underline"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="bg-charcoal/80 border border-white/10 rounded-3xl p-8 sm:p-12 space-y-6 shadow-2xl backdrop-blur-xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Julian Sterling"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-sans text-ivory outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. j.sterling@residence.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-sans text-ivory outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 917 555 0142"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-sans text-ivory outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Property Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aspen, CO or London, UK"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-sans text-ivory outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Engagement Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-mono text-ivory outline-none transition-colors"
                    >
                      <option>Full Architectural Renovation</option>
                      <option>New Ground-Up Sanctuary</option>
                      <option>Bespoke Furniture Commission</option>
                      <option>Spatial & Material Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                      Investment Envelope
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl px-4 py-3 text-xs font-mono text-ivory outline-none transition-colors"
                    >
                      <option>$100k – $250k (Furniture / Styling)</option>
                      <option>$250k – $500k (Full Interior)</option>
                      <option>$500k – $1M (Penthouse / Estate)</option>
                      <option>$1M+ (Ground-Up Commission)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-ivory-dark mb-2">
                    Spatial Ambitions & Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your property, timeline, architectural desires, and material preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-obsidian border border-white/15 focus:border-champagne rounded-xl p-4 text-xs font-sans text-ivory outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-champagne hover:bg-champagne-light text-obsidian py-4 rounded-full text-xs font-mono uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all shadow-champagne hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                >
                  {loading ? (
                    <span>Encrypting & Dispatching...</span>
                  ) : (
                    <>
                      <span>Transmit Private Inquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
