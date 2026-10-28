import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0A",
          50: "#1E1E1E",
          100: "#141414",
          900: "#050505",
        },
        charcoal: {
          DEFAULT: "#171717",
          50: "#2A2A2A",
          100: "#222222",
          200: "#1c1c1c",
          900: "#0e0e0e",
        },
        champagne: {
          DEFAULT: "#C9A66B",
          50: "#FAF6EF",
          100: "#F4ECDD",
          200: "#E9D8BC",
          300: "#DFC59A",
          400: "#D4B37A",
          500: "#C9A66B",
          600: "#B89150",
          700: "#96753C",
          800: "#70572C",
          900: "#4B3B1D",
        },
        ivory: {
          DEFAULT: "#F4F0E8",
          muted: "#D8D3C8",
          dark: "#BDB7AA",
          soft: "#FAF8F5",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
        luxury: "0.35em",
      },
      boxShadow: {
        champagne: "0 10px 40px -10px rgba(201, 166, 107, 0.25)",
        dark: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-subtle": "radial-gradient(circle at 50% 30%, rgba(201, 166, 107, 0.08) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;

