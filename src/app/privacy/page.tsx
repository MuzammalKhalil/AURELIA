import SectionHeading from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Privacy Policy & Confidentiality | AURELIA Atelier",
  description: "Our privacy standards and client confidentiality policies for private residential commissions.",
};

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <SectionHeading
          badge="Legal & Client Privacy"
          title="Confidentiality & Privacy Standards"
          subtitle="How we safeguard client identity, property blueprints, and private architectural data."
          className="mb-14"
        />

        <div className="bg-charcoal border border-champagne/15 rounded-2xl p-8 sm:p-12 space-y-8 text-xs sm:text-sm text-ivory-muted leading-relaxed font-light">
          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ivory font-normal">
              1. Non-Disclosure & Anonymity
            </h3>
            <p>
              AURELIA operates under rigorous high-discretion protocols. Unless explicitly permitted in writing by the client, no residential photographs, floor plans, real estate addresses, or family identities are ever publicly disclosed, published to social media, or entered into architectural competitions.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ivory font-normal">
              2. 3D Model & Architectural Asset Protection
            </h3>
            <p>
              Digital twin 3D files, spatial renderings, and custom furniture CAD drawings generated for private client residences remain the intellectual property of the client and Atelier Aurelia. All 3D assets are encrypted on isolated private storage infrastructure and are never licensed to third parties or used in non-consensual promotional material.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ivory font-normal">
              3. Web Inquiries & Data Collection
            </h3>
            <p>
              Information submitted via our contact and consultation request forms is utilized solely to evaluate your architectural inquiry and communicate directly regarding your project. We do not maintain marketing trackers, sell telemetry data, or distribute private contact details to commercial brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ivory font-normal">
              4. Cookies & WebGL Performance Diagnostics
            </h3>
            <p>
              Our website uses minimal functional cookies strictly required for local session navigation and rendering optimization (such as device pixel ratio detection for Three.js WebGL canvas scaling). No invasive advertising cookies or cross-site tracking pixels are deployed.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-serif text-2xl text-ivory font-normal">
              5. Atelier Contact & Legal Inquiries
            </h3>
            <p>
              For legal inquiries or to request immediate deletion of any submitted correspondence, please contact our counsel at:
            </p>
            <div className="p-4 bg-obsidian rounded-xl border border-white/5 font-mono text-xs text-champagne space-y-1">
              <div>AURELIA Atelier Ltd. Legal Division</div>
              <div>Bahnhofstrasse 28, 8001 Zürich, Switzerland</div>
              <div>legal@aurelia-atelier.com</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

