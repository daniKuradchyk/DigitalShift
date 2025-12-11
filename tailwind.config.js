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
          50: "#e9edff",
          100: "#d5ddff",
          200: "#b3c4ff",
          300: "#8da6ff",
          400: "#6389ff", // RGB 99 137 255
          500: "#4168e1", // RGB 65 104 225
          600: "#2f53c2",
          700: "#1c3994", // RGB 28 57 148
          800: "#152d78",
          900: "#0e1d4a", // RGB 14 29 74
        },
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(65,104,225,.35)",
        card: "0 10px 30px -14px rgba(14,29,74,.16)",
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
