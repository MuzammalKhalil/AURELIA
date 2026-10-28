import HeroSection from "@/components/sections/HeroSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import CuratedProductsSection from "@/components/sections/CuratedProductsSection";
import DecorShowcaseSection from "@/components/sections/DecorShowcaseSection";
import SignatureSpacesSection from "@/components/sections/SignatureSpacesSection";
import AtmosphericLightingChamber from "@/components/sections/AtmosphericLightingChamber";
import MaterialCraftSection from "@/components/sections/MaterialCraftSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import DesignProcessSection from "@/components/sections/DesignProcessSection";
import ContactCtaSection from "@/components/sections/ContactCtaSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Cinematic 3D Hero */}
      <HeroSection />

      {/* 2. Brand Philosophy & Deconstructed Spatial Stack */}
      <PhilosophySection />

      {/* 3. Comprehensive Design Services */}
      <ServicesSection />

      {/* 4. Curated Haute Decor & Furniture Collection (NEW: 3D Product Portfolio) */}
      <CuratedProductsSection />

      {/* 5. Interactive 3D Decorative Objects Atelier */}
      <DecorShowcaseSection />

      {/* 6. Signature Interior Scene with Scroll-Driven Camera Tour */}
      <SignatureSpacesSection />

      {/* 7. Atmospheric Lighting & Shadow Chamber 3D (NEW: Real-Time Kelvin Simulator) */}
      <AtmosphericLightingChamber />

      {/* 8. Materials and Craftsmanship with 3D PBR Orb */}
      <MaterialCraftSection />

      {/* 9. Featured Architectural Projects */}
      <FeaturedProjectsSection />

      {/* 10. Curatorial Methodology & Process */}
      <DesignProcessSection />

      {/* 11. Contact Call to Action */}
      <ContactCtaSection />
    </div>
  );
}
