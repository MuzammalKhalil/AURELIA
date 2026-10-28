import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signature Spaces 3D | AURELIA Living Room Walkthrough",
  description: "Interactive real-time 3D walkthrough of the Grand Salon interior with customizable lighting moods and curated viewpoints.",
};

export default function SpacesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

