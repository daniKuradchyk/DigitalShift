/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  i18n: { locales: ["es"], defaultLocale: "es", localeDetection: true },
  experimental: {
    // ❌ Elimina esto si lo tenías en true
    ppr: false,
    // o en algunas versiones antiguas:
    // experimental_ppr: false,
    optimizePackageImports: ["react", "react-dom"],
  },
};
module.exports = nextConfig;