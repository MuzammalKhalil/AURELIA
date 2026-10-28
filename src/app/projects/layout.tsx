import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Monograph & Portfolio | AURELIA Private Residences",
  description: "A curated archive of private family estates, penthouse sanctuaries, and architectural retreats worldwide.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

