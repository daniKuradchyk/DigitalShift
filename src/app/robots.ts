import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://qubelia.es";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /buscar NO se bloquea aquí a propósito: emite `noindex, follow` en el HTML
        // y Google necesita poder rastrearla para leer esa etiqueta. Bloquearla por
        // robots.txt impedía leer el noindex y permitía que la URL acabara indexada.
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
