import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import PageTransition from "@/components/ui/PageTransition";
import FloatingParticles3D from "@/components/3d/FloatingParticles3D";

export const metadata: Metadata = {
  title: "AURELIA | Luxury Interior Architecture & Decor Atelier",
  description: "Bespoke architectural spaces, sculptural furniture, and timeless interior curation crafted with obsessive attention to light, volume, and material soul.",
  keywords: ["luxury interior design", "architectural home decor", "high-end furniture", "bespoke interiors", "sculptural living"],
  openGraph: {
    title: "AURELIA | Luxury Interior Architecture & Decor Atelier",
    description: "Spaces with soul. Details with purpose.",
    siteName: "AURELIA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian text-ivory antialiased selection:bg-champagne selection:text-obsidian min-h-screen flex flex-col relative overflow-x-hidden">
        <Preloader />
        <PageTransition />
        <CustomCursor />
        <FloatingParticles3D />
        <div className="fixed inset-0 pointer-events-none bg-noise opacity-40 z-[99]" />
        <Navbar />
        <main className="flex-grow relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
