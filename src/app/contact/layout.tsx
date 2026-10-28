import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Client Concierge | AURELIA Atelier Inquiries",
  description: "Inquire with our founding principals regarding private residential architecture and bespoke sculptural commissions.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

