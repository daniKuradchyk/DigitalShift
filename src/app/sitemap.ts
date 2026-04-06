import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/locations";
import { postsMeta } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubelia.es").replace(/\/$/, "");

  // Use a stable date for static pages (update this when content changes)
  const siteLastUpdated = "2026-04-09";

  const latestPostDate =
    postsMeta.reduce((latest, p) => (p.date > latest ? p.date : latest), "2020-01-01") ||
    siteLastUpdated;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/servicios`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios/software-a-medida`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios/web-a-medida`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${base}/servicios/automatizacion-integraciones`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/servicios/crm-intranet-a-medida`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${base}/labs`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/labs/analisis-gratis`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/labs/roi-automatizacion`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/labs/calculadora-coste-software`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/herramientas/calculadora-irpf`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/casos`, lastModified: siteLastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: latestPostDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/legal/aviso-legal`, lastModified: siteLastUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/privacidad`, lastModified: siteLastUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/legal/cookies`, lastModified: siteLastUpdated, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = postsMeta.map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  const areaPages: MetadataRoute.Sitemap = AREAS.map(
    (area): MetadataRoute.Sitemap[number] => ({
      url: `${base}/area/${area.slug}`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...blogPages, ...areaPages];
}
