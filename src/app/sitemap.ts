import type { MetadataRoute } from "next";
import { postsMeta } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubelia.es").replace(/\/$/, "");
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios/software-a-medida`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios/web-a-medida`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${base}/servicios/automatizacion-integraciones`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/servicios/crm-intranet-a-medida`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${base}/labs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/labs/analisis-gratis`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${base}/labs/roi-automatizacion`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/labs/calculadora-coste-software`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/herramientas/calculadora-irpf`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/legal/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const blogPages: MetadataRoute.Sitemap = postsMeta.map(
    (post): MetadataRoute.Sitemap[number] => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: post.date ?? now,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  return [...staticPages, ...blogPages];
}
