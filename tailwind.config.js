module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{css}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#EBF0FF",
          100: "#D6E0FF",
          200: "#ADC1FF",
          300: "#85A2FF",
          400: "#5B8DEF",
          500: "#4169E1",
          600: "#3355C4",
          700: "#2641A7",
          800: "#1B2B6B",
          900: "#0F1B4C",
          950: "#060B1A",
        },
        surface: {
          DEFAULT: "#0A1128",
          card:    "#0D1530",
          muted:   "#111D42",
        },
      },
      boxShadow: {
        glow:      "0 0 40px rgba(65, 105, 225, 0.15)",
        "glow-lg": "0 0 80px rgba(65, 105, 225, 0.20)",
        "glow-sm": "0 0 20px rgba(65, 105, 225, 0.10)",
        card:      "0 10px 30px -14px rgba(6, 11, 26, 0.50)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-left": {
          from: { opacity: 0, transform: "translateX(-30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "fade-right": {
          from: { opacity: 0, transform: "translateX(30px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(65,105,225,0.20)" },
          "50%": { boxShadow: "0 0 40px rgba(65,105,225,0.40)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) skewX(-12deg)" },
          "100%": { transform: "translateX(250%) skewX(-12deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float:       "float 6s ease-in-out infinite",
        "fade-up":   "fade-up .7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-left": "fade-left .7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-right":"fade-right .7s cubic-bezier(0.22,1,0.36,1) both",
        "pulse-glow":"pulse-glow 3s ease-in-out infinite",
        shimmer:     "shimmer 3s ease-in-out infinite",
        marquee:     "marquee 28s linear infinite",
      },
      borderRadius: {
        "2xl": "1rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
