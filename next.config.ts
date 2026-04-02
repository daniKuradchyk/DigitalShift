/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      { source: "/servicios/software-medida", destination: "/servicios/software-a-medida", permanent: true },
      { source: "/servicios/diseno-web-sevilla", destination: "/servicios/web-a-medida", permanent: true },
      {
        source: "/servicios/ia-automatizacion",
        destination: "/servicios/automatizacion-integraciones",
        permanent: true,
      },
      { source: "/servicios/mvp-emprendedores", destination: "/servicios", permanent: true },
      { source: "/servicios/landing-pages", destination: "/servicios/web-a-medida", permanent: true },
      { source: "/servicios/web-corporativa", destination: "/servicios/web-a-medida", permanent: true },
      { source: "/servicios/marketing-digital", destination: "/servicios/web-a-medida", permanent: true },
      {
        source: "/sevilla/desarrollo-software-a-medida",
        destination: "/servicios/software-a-medida",
        permanent: true,
      },
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  experimental: {
    ppr: false,
    optimizePackageImports: ["react", "react-dom"],
  },
};

module.exports = nextConfig;
