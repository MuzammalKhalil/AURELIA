import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Services & Scope | AURELIA Interior Architecture",
  description: "Explore full-scale interior architecture, bespoke furniture commissions, and material masterplanning for luxury residences.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

