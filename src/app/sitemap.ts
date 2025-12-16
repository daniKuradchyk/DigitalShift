import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/locations";
import { postsMeta } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubelia.es").replace(/\/$/, "");
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/labs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicios`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/legal/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/legal/privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/legal/cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const areaPages: MetadataRoute.Sitemap = [
    { url: `${base}/area`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...AREAS.map((a) => ({
      url: `${base}/area/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];

  const servicePages: MetadataRoute.Sitemap = [
    { url: `${base}/servicios/landing-pages`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicios/web-corporativa`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/servicios/marketing-digital`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const blogPages: MetadataRoute.Sitemap = postsMeta.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...areaPages, ...servicePages, ...blogPages];
}
