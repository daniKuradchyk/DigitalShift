import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://qubelia.es";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/buscar"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
