import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#B22222", // Hinzugefügt für rote Überschriften
        link: "#1E90FF", // Hinzugefügt für Links
      },
      fontFamily: {
        fraktur: ["UnifrakturCook", ...fontFamily.serif],
        serif: ["Playfair Display", ...fontFamily.serif],
        sans: ["Geist", ...fontFamily.sans], // Geist als zusätzliche Schriftart
      },
    },
  },
  plugins: [],
} satisfies Config;
