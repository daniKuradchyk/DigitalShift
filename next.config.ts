/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      // Legacy service URL redirects
      { source: "/servicios/software-medida", destination: "/servicios/software-a-medida", permanent: true },
      { source: "/servicios/diseno-web-sevilla", destination: "/servicios/web-a-medida", permanent: true },
      {
        source: "/servicios/ia-automatizacion",
        destination: "/servicios/automatizacion-integraciones",
        permanent: true,
      },
      {
        source: "/servicios/mvp-emprendedores",
        destination: "/servicios/software-a-medida",
        permanent: true,
      },
      { source: "/servicios/landing-pages", destination: "/servicios/web-a-medida", permanent: true },
      { source: "/servicios/web-corporativa", destination: "/servicios/web-a-medida", permanent: true },
      { source: "/servicios/marketing-digital", destination: "/servicios/web-a-medida", permanent: true },
      {
        source: "/sevilla/desarrollo-software-a-medida",
        destination: "/servicios/software-a-medida",
        permanent: true,
      },
      // Blog slugs discovered by Google that no longer exist — redirect to relevant content
      { source: "/blog/ia-agentes-pymes-2026", destination: "/blog/agentes-ia-pymes-guia-automatizacion-2026", permanent: true },
      { source: "/blog/automatizacion-comercial-b2b", destination: "/blog/roi-automatizacion-procesos-b2b-guia-completa", permanent: true },
      { source: "/blog/seo-onpage-negocios-locales", destination: "/blog", permanent: true },
      { source: "/blog/presupuesto-diseno-web-sevilla", destination: "/blog", permanent: true },
      { source: "/blog/presupuesto-software-medida-2026", destination: "/blog", permanent: true },
      { source: "/blog/checklist-landing-conversion", destination: "/blog", permanent: true },
      { source: "/blog/go-to-market-saas-90-dias", destination: "/blog", permanent: true },
      { source: "/blog/brief-tecnico-proyecto-digital", destination: "/blog", permanent: true },
      { source: "/blog/kpis-producto-b2b", destination: "/blog", permanent: true },
      { source: "/blog/migrar-wordpress-a-nextjs", destination: "/blog", permanent: true },
      { source: "/blog/arquitectura-nextjs-seo-2026", destination: "/blog", permanent: true },
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
      {
        source: "/fonts/(.*)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  experimental: {
    ppr: false,
    optimizePackageImports: ["react", "react-dom", "framer-motion", "lucide-react"],
  },
};

module.exports = nextConfig;
