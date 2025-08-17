const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
    localeDetection: true,
  },
  images: { formats: ["image/avif", "image/webp"] },
};
module.exports = nextConfig;