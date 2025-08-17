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
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(79,70,229,.35)",
        card: "0 6px 24px -8px rgba(2,6,23,.15)",
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
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        "fade-up": "fade-up .6s ease-out both",
      },
      borderRadius: { "2xl": "1rem" },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};