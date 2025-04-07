import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        navy: {
          DEFAULT: "#0A1A2F",
          50: "#F0F4F9",
          100: "#E1E9F3",
          200: "#C3D3E7",
          300: "#A5BDDB",
          400: "#87A7CF",
          500: "#6991C3",
          600: "#4B7BB7",
          700: "#3D65A1",
          800: "#2F4F8B",
          900: "#213875",
        },
        teal: {
          DEFAULT: "#2DD4BF",
          50: "#F0FDFC",
          100: "#E1FBF9",
          200: "#C3F7F3",
          300: "#A5F3ED",
          400: "#87EFE7",
          500: "#69EBE1",
          600: "#4BE7DB",
          700: "#2DD4BF",
          800: "#25B0A0",
          900: "#1D8C80",
        },
        gold: {
          DEFAULT: "#E6B74A",
          50: "#FDF9F0",
          100: "#FBF3E1",
          200: "#F7E7C3",
          300: "#F3DBA5",
          400: "#EFCF87",
          500: "#EBC369",
          600: "#E7B74B",
          700: "#E6B74A",
          800: "#C29625",
          900: "#9E791E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.5rem)",
      },
      fontFamily: {
        sans: ["Inter var", "system-ui", "sans-serif"],
        inter: ["Inter var", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
        figtree: ["Figtree", "sans-serif"],
      },
      fontSize: {
        h1: [
          "2.5rem",
          { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.05em" },
        ],
        h2: [
          "2rem",
          { lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.025em" },
        ],
        h3: [
          "1.75rem",
          { lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.025em" },
        ],
        h4: [
          "1.5rem",
          { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.015em" },
        ],
        h5: [
          "1.25rem",
          { lineHeight: "1.4", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        h6: [
          "1.125rem",
          { lineHeight: "1.4", fontWeight: "600", letterSpacing: "-0.005em" },
        ],
        body: [
          "1.1rem",
          { lineHeight: "1.6", fontWeight: "400", letterSpacing: "-0.01em" },
        ],
        small: [
          "0.875rem",
          { lineHeight: "1.5", fontWeight: "400", letterSpacing: "0" },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-out": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "slow-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "reverse-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px 0px rgba(45, 212, 191, 0.3)" },
          "50%": { boxShadow: "0 0 20px 5px rgba(45, 212, 191, 0.5)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "pan-background": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        "morph-shape": {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "25%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
          "50%": { borderRadius: "40% 60% 60% 40% / 40% 40% 60% 50%" },
          "75%": { borderRadius: "40% 60% 70% 30% / 60% 40% 50% 40%" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "text-reveal": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "underline-expand": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "background-pan": {
          "0%": { backgroundPosition: "0% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "text-gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up": "slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slide-down 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        shimmer: "shimmer 2s infinite",
        float: "float 3s ease-in-out infinite",
        "slow-spin": "slow-spin 60s linear infinite",
        "reverse-spin": "reverse-spin 50s linear infinite",
        "pulse-glow": "pulse-glow 2s infinite",
        "bounce-soft": "bounce-soft 4s ease-in-out infinite",
        ripple: "ripple 1s linear infinite",
        "pan-background": "pan-background 15s ease infinite",
        "morph-shape": "morph-shape 15s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "text-reveal": "text-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "underline-expand": "underline-expand 0.3s ease forwards",
        "background-pan": "background-pan 3s linear infinite",
        "text-gradient": "text-gradient 3s ease infinite",
      },
      backgroundImage: {
        "gradient-mesh":
          "radial-gradient(at 40% 20%, rgba(45, 212, 191, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(14, 165, 233, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(230, 183, 74, 0.1) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(45, 212, 191, 0.1) 0px, transparent 50%)",
        "gradient-shine":
          "linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.05) 50%, transparent 75%)",
        "gradient-premium": "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        "gradient-modern": "linear-gradient(135deg, #2DD4BF 0%, #0EA5E9 100%)",
        "gradient-navy": "linear-gradient(135deg, #0A1A2F 0%, #1E3A8A 100%)",
        "gradient-gold": "linear-gradient(135deg, #E6B74A 0%, #F7CE68 100%)",
        "gradient-teal": "linear-gradient(135deg, #2DD4BF 0%, #0EA5E9 100%)",
        "gradient-subtle": "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        neo: "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 5px 10px -5px rgba(0, 0, 0, 0.05)",
        glow: "0 0 20px 5px rgba(45, 212, 191, 0.15)",
        "gold-glow": "0 0 15px 0 rgba(230, 183, 74, 0.25)",
        "teal-glow": "0 0 15px 0 rgba(45, 212, 191, 0.25)",
        "navy-glow": "0 0 15px 0 rgba(10, 26, 47, 0.25)",
        magic: "0 0 15px 0 rgba(45, 212, 191, 0.25)",
        futuristic:
          "0 10px 25px -5px rgba(45, 212, 191, 0.25), 0 8px 10px -6px rgba(45, 212, 191, 0.1)",
        premium:
          "0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -10px rgba(0, 0, 0, 0.05)",
        "neumorphic-light":
          "10px 10px 20px rgba(0, 0, 0, 0.05), -10px -10px 20px rgba(255, 255, 255, 0.8)",
        "neumorphic-dark":
          "10px 10px 20px rgba(0, 0, 0, 0.2), -10px -10px 20px rgba(255, 255, 255, 0.05)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      spacing: {
        "0.5": "0.125rem", // 2px
        "1": "0.25rem", // 4px
        "1.5": "0.375rem", // 6px
        "2": "0.5rem", // 8px - Base grid unit
        "2.5": "0.625rem", // 10px
        "3": "0.75rem", // 12px
        "3.5": "0.875rem", // 14px
        "4": "1rem", // 16px - 2x grid unit
        "5": "1.25rem", // 20px
        "6": "1.5rem", // 24px - 3x grid unit
        "7": "1.75rem", // 28px
        "8": "2rem", // 32px - 4x grid unit
        "9": "2.25rem", // 36px
        "10": "2.5rem", // 40px - 5x grid unit
        "11": "2.75rem", // 44px
        "12": "3rem", // 48px - 6x grid unit
        "14": "3.5rem", // 56px - 7x grid unit
        "16": "4rem", // 64px - 8x grid unit
        "20": "5rem", // 80px - 10x grid unit
        "24": "6rem", // 96px - 12x grid unit
        "28": "7rem", // 112px - 14x grid unit
        "32": "8rem", // 128px - 16x grid unit
        "36": "9rem", // 144px - 18x grid unit
        "40": "10rem", // 160px - 20x grid unit
        "44": "11rem", // 176px
        "48": "12rem", // 192px - 24x grid unit
        "52": "13rem", // 208px
        "56": "14rem", // 224px
        "60": "15rem", // 240px - 30x grid unit
        "64": "16rem", // 256px - 32x grid unit
        "72": "18rem", // 288px - 36x grid unit
        "80": "20rem", // 320px - 40x grid unit
        "96": "24rem", // 384px - 48x grid unit
        "112": "28rem", // 448px
        "128": "32rem", // 512px
        "144": "36rem", // 576px
        "xs-section": "4vw", // Small section padding
        section: "min(8vw, 120px)", // Section padding as specified
        "lg-section": "12vw", // Large section padding
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
