import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        heading: ["Nunito", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        "border-select": "hsl(var(--border-select))",
        "border-positive": "hsl(var(--border-positive))",
        "border-negative": "hsl(var(--border-negative))",
        "border-info": "hsl(var(--border-info))",
        "border-warning": "hsl(var(--border-warning))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          pressed: "hsl(var(--primary-pressed))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
          pressed: "hsl(var(--secondary-pressed))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          hover: "hsl(var(--destructive-hover))",
          pressed: "hsl(var(--destructive-pressed))",
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
        // Surface tokens
        surface: {
          "elevated-alt": "hsl(var(--surface-elevated-alt))",
          "elevated-alt-2": "hsl(var(--surface-elevated-alt-2))",
          inverse: "hsl(var(--surface-inverse))",
          "inverse-alt": "hsl(var(--surface-inverse-alt))",
          "screen-inverse": "hsl(var(--surface-screen-inverse))",
          disabled: "hsl(var(--surface-disabled))",
        },
        // Action disabled
        "action-disabled": {
          bg: "hsl(var(--action-disabled-bg))",
          text: "hsl(var(--action-disabled-text))",
        },
        // Text content tokens
        "content-primary": "hsl(var(--text-primary))",
        "content-secondary": "hsl(var(--text-secondary))",
        "content-tertiary": "hsl(var(--text-tertiary))",
        "content-high-emphasis": "hsl(var(--text-high-emphasis))",
        "content-inverse": "hsl(var(--text-inverse))",
        "content-error": "hsl(var(--text-error))",
        // Icon tokens
        icon: {
          DEFAULT: "hsl(var(--icon-default))",
          disabled: "hsl(var(--icon-disabled))",
          inverse: "hsl(var(--icon-inverse))",
          info: "hsl(var(--icon-info))",
          error: "hsl(var(--icon-error))",
          warning: "hsl(var(--icon-warning))",
          success: "hsl(var(--icon-success))",
        },
        // Sentiment (toast backgrounds)
        sentiment: {
          positive: "hsl(var(--sentiment-positive))",
          negative: "hsl(var(--sentiment-negative))",
          info: "hsl(var(--sentiment-info))",
          warning: "hsl(var(--sentiment-warning))",
        },
        // Legacy extended palette
        navy: "hsl(var(--navy))",
        charcoal: "hsl(var(--charcoal))",
        gold: "hsl(var(--gold))",
        success: "hsl(var(--success))",
        "teal-light": "hsl(var(--teal-light))",
        "teal-mid": "hsl(var(--teal-mid))",
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
        "fade-in": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
