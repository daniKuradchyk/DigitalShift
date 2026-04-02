module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
        obsidian: {
          50: "#FAFAFF",
          100: "#F1F0FB",
          200: "#E4E2F0",
          300: "#9CA3AF",
          400: "#6B6482",
          500: "#3D3654",
          600: "#1A1625",
          700: "#161822",
          800: "#0F1117",
          900: "#08090E",
        },
        prism: {
          violet: "#A78BFA",
          purple: "#C084FC",
          pink: "#F0ABFC",
          cyan: "#67E8F9",
        },
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(167,139,250,.30)",
        "glow-lg": "0 20px 50px -12px rgba(167,139,250,.25)",
        card: "0 10px 30px -14px rgba(8,9,14,.50)",
        prism: "0 0 40px rgba(167,139,250,0.12), 0 0 80px rgba(192,132,252,0.06)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        blob: {
          "0%": { transform: "translate(0px,0px) scale(1)" },
          "33%": { transform: "translate(10px,-20px) scale(1.05)" },
          "66%": { transform: "translate(-10px,10px) scale(0.98)" },
          "100%": { transform: "translate(0px,0px) scale(1)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(12px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "prism-pulse": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.7 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "fade-up": "fade-up .6s ease-out both",
        "prism-pulse": "prism-pulse 4s ease-in-out infinite",
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
