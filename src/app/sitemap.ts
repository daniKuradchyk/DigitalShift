import { AREAS } from "@/lib/locations";

export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date().toISOString();
  const urls = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1.0, lastModified: now },
    { url: `${base}/servicios`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/servicios/landing-pages`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/servicios/web-corporativa`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/servicios/marketing-digital`, changeFrequency: "monthly", priority: 0.8, lastModified: now },
    { url: `${base}/area`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    ...AREAS.map((a) => ({ url: `${base}/area/${a.slug}`, changeFrequency: "monthly", priority: 0.7, lastModified: now })),
  ];
  return urls;
}
