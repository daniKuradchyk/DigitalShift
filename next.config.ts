/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
    ];

    return [
      {
        // Applies to all app routes (SSR/ISR/SSG). HSTS se gestiona en Netlify si procede.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    // ƒ?O Elimina esto si lo tenÇðas en true
    ppr: false,
    // o en algunas versiones antiguas:
    // experimental_ppr: false,
    optimizePackageImports: ["react", "react-dom"],
  },
};
module.exports = nextConfig;
