"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Signature Spaces", href: "/spaces" },
  { name: "Projects", href: "/projects" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let prev = false;
    const handleScroll = () => {
      const isPast = window.scrollY > 40;
      if (isPast !== prev) {
        prev = isPast;
        setScrolled(isPast);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/85 backdrop-blur-md py-4 border-b border-champagne/15 shadow-2xl"
          : "bg-gradient-to-b from-obsidian/90 via-obsidian/40 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-xl sm:text-2xl md:text-3xl font-light tracking-[0.2em] sm:tracking-[0.25em] text-ivory group-hover:text-champagne transition-colors">
            AURELIA
          </span>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-champagne/80 font-mono -mt-1">
            Atelier & Interiors
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-9">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs uppercase tracking-[0.22em] transition-colors py-1 ${
                  isActive
                    ? "text-champagne font-medium"
                    : "text-ivory-muted hover:text-ivory"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-champagne animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-obsidian bg-champagne hover:bg-champagne-300 px-5 py-2.5 rounded-full transition-all duration-300 shadow-champagne hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Consult Atelier</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-ivory hover:text-champagne transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[65px] sm:top-[73px] bg-obsidian/95 backdrop-blur-2xl z-40 border-t border-champagne/15 flex flex-col px-6 sm:px-8 py-8 space-y-6 overflow-y-auto max-h-[calc(100vh-65px)]">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-serif text-2xl tracking-widest text-ivory hover:text-champagne transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col space-y-3">
            <span className="text-[11px] uppercase tracking-widest text-champagne font-mono">
              Direct Inquiries
            </span>
            <p className="text-xs sm:text-sm text-ivory-muted font-mono">concierge@aurelia-atelier.com</p>
            <p className="text-xs sm:text-sm text-ivory-muted font-mono">+1 (212) 890-4420</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-obsidian bg-champagne hover:bg-champagne-300 px-6 py-3 rounded-full mt-2 shadow-champagne transition-all"
            >
              <span>Request Private Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

