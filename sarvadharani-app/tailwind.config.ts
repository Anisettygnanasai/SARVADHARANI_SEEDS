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
        ivory: "#FDFAF4",
        "rice-white": "#F9F6EE",
        "paddy-gold": {
          50: "#FDF8E7",
          100: "#FAF0C3",
          200: "#F5E08A",
          300: "#EFD050",
          400: "#E8BE24",
          500: "#C8981E",
          600: "#A37818",
          700: "#7D5C12",
          800: "#5C420D",
          900: "#3D2C08",
          DEFAULT: "#C8981E",
        },
        "natural-green": {
          50: "#EDF5F0",
          100: "#D5E9DC",
          200: "#A8D2B8",
          300: "#79BA93",
          400: "#52A370",
          500: "#3D6B4F",
          600: "#2E5340",
          700: "#213D30",
          800: "#162820",
          900: "#0B1510",
          DEFAULT: "#3D6B4F",
        },
        "earth-brown": {
          50: "#F5EDE4",
          100: "#E8D5C2",
          200: "#D0AB87",
          300: "#B8814D",
          400: "#8F6035",
          500: "#6B4C2A",
          600: "#513A20",
          700: "#3A2917",
          800: "#261B0F",
          900: "#130D07",
          DEFAULT: "#6B4C2A",
        },
        "deep-forest": "#1A3526",
        "warm-gray": "#8A8070",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "sway-slow": "sway 6s ease-in-out infinite",
        "sway-medium": "sway 4s ease-in-out infinite",
        "grain-drift": "grainDrift 12s linear infinite",
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-right": "marqueeRight 40s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "draw": "draw 2s ease forwards",
        "count-up": "countUp 1s ease-out forwards",
        "fade-up": "fadeUp 0.8s ease forwards",
        "scale-in": "scaleIn 0.5s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        grainDrift: {
          "0%": { transform: "translateX(0) translateY(0) rotate(0deg)" },
          "33%": { transform: "translateX(30px) translateY(-20px) rotate(120deg)" },
          "66%": { transform: "translateX(-15px) translateY(-40px) rotate(240deg)" },
          "100%": { transform: "translateX(0) translateY(-100vh) rotate(360deg)" },
        },
        marqueeLeft: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200, 152, 30, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(200, 152, 30, 0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        draw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "grain-texture": "url('/images/grain-texture.svg')",
        "gold-gradient": "linear-gradient(135deg, #C8981E 0%, #E8BE24 50%, #C8981E 100%)",
        "green-gradient": "linear-gradient(135deg, #3D6B4F 0%, #52A370 100%)",
        "ivory-gradient": "linear-gradient(180deg, #FDFAF4 0%, #F5EDE4 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(253,250,244,0.95) 0%, rgba(237,245,240,0.85) 50%, rgba(253,250,244,0.9) 100%)",
      },
      boxShadow: {
        "gold-sm": "0 2px 8px rgba(200, 152, 30, 0.2)",
        "gold-md": "0 4px 20px rgba(200, 152, 30, 0.3)",
        "gold-lg": "0 8px 40px rgba(200, 152, 30, 0.4)",
        "green-sm": "0 2px 8px rgba(61, 107, 79, 0.2)",
        "green-md": "0 4px 20px rgba(61, 107, 79, 0.3)",
        "card": "0 4px 24px rgba(107, 76, 42, 0.08), 0 1px 4px rgba(107, 76, 42, 0.06)",
        "card-hover": "0 20px 60px rgba(107, 76, 42, 0.15), 0 4px 16px rgba(107, 76, 42, 0.1)",
        "premium": "0 32px 64px rgba(26, 53, 38, 0.12), 0 8px 24px rgba(26, 53, 38, 0.08)",
      },
      blur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
