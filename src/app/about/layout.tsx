import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Atelier | AURELIA Luxury Interior Architecture",
  description: "Founded on principles of architectural stillness and tactile authenticity. Meet the principals and master stonemasons behind Atelier Aurelia.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

