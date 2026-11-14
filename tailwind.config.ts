import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          base: "#060706",
          surface: "#141511",
          raised: "#1A1C1650",
          border: "#262720",
          borderlight: "#34362C",
        },
        text: {
          primary: "#F4F5EF",
          secondary: "#9B9C92",
          muted: "#5C5D54",
        },
        signal: {
          DEFAULT: "#D6FF3F",
          dim: "#8CA824",
          glow: "#D6FF3F33",
          ink: "#17200A",
        },
        risk: {
          low: "#D6FF3F",
          medium: "#F3C14B",
          high: "#FF9152",
          critical: "#FF5470",
        },
      },
      boxShadow: {
        none: "none",
      },
      keyframes: {
        pulse_ring: {
          "0%": { boxShadow: "0 0 0 0 rgba(214,255,63,0.45)" },
          "100%": { boxShadow: "0 0 0 8px rgba(214,255,63,0)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        pulsering: "pulse_ring 2s ease-out infinite",
        rise: "rise 0.45s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
