import type { MetadataRoute } from "next"
import { AREAS } from "@/lib/locations"
import { postsMeta } from "@/lib/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qubelia.es").replace(/\/$/, "")
  const now = new Date().toISOString()

  // Páginas estáticas principales
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/labs`,
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
    {
      url: `${base}/servicios`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/legal/aviso-legal`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/legal/privacidad`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${base}/legal/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]

  // Página índice de áreas + cada área concreta
  const areaPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/area`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...AREAS.map(
      (a): MetadataRoute.Sitemap[number] => ({
        url: `${base}/area/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      }),
    ),
  ]

  // NUEVOS servicios (ajusta slugs a los que realmente uses en /servicios/*)
  const serviceSlugs = [
    "software-medida",
    "diseno-web-sevilla",
    "ia-automatizacion",
    "mvp-emprendedores",
  ] as const

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map(
    (slug): MetadataRoute.Sitemap[number] => ({
      url: `${base}/servicios/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  )

  // Blog: índice + cada post
  const blogIndex: MetadataRoute.Sitemap[number] = {
    url: `${base}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }

  const blogPages: MetadataRoute.Sitemap = postsMeta.map(
    (p): MetadataRoute.Sitemap[number] => ({
      url: `${base}/blog/${p.slug}`,
      // Usa la fecha del post si viene en ISO; si no, cae a "now"
      lastModified: p.date ?? now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  )

  return [...staticPages, ...areaPages, ...servicePages, blogIndex, ...blogPages]
}
