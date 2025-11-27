import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* -------------------------
         AICOD BRAND FONTS (Per Brand Guidelines)
      -------------------------- */
      fontFamily: {
        // Primary brand fonts
        arialBlack: ["Arial Black", "Arial", "sans-serif"],
        arialBold: ["Arial", "Helvetica", "sans-serif"], // Arial Bold is weight-based
        corsiva: ["Monotype Corsiva", "cursive"],

        // System fonts (keep for flexibility)
        body: ["Arial", "Helvetica", "sans-serif"], // Changed to Arial as primary
        headline: ["Arial", "Helvetica", "sans-serif"], // Changed to Arial per user request
        sans: ["Arial", "Helvetica", "sans-serif"], // Default sans to Arial
        code: ["monospace"],
      },

      /* -------------------------
         AICOD BRAND COLORS (Per Brand Guidelines)
         R=38, G=36, B=109 → #26246D (Navy Blue)
         R=153, G=202, B=60 → #99CA3C (Green)
         R=199, G=93, B=48 → #C75D30 (Orange)
         R=255, G=205, B=51 → #FFCD33 (Yellow)
      -------------------------- */
      colors: {
        // Brand colors
        brand: {
          blue: "#26246D",
          green: "#99CA3C",
          orange: "#C75D30",
          yellow: "#FFCD33",
        },

        /* Theme color overrides to use brand colors */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#26246D", // Brand blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#99CA3C", // Brand green
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#C75D30", // Brand orange
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#99CA3C", // Brand green for focus rings

        chart: {
          "1": "#26246D", // Brand blue
          "2": "#99CA3C", // Brand green
          "3": "#C75D30", // Brand orange
          "4": "#FFCD33", // Brand yellow
          "5": "hsl(var(--chart-5))",
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
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        enter: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        enter: "enter 0.3s ease-out forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;