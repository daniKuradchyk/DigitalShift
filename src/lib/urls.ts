// Fallback seguro: si NEXT_PUBLIC_SITE_URL no está definida (build fuera de Netlify,
// deploy manual, variable borrada), los canonical/og/JSON-LD deben apuntar al dominio
// real, nunca a localhost. Coherente con src/app/sitemap.ts y src/app/robots.ts.
const DEFAULT_BASE = "https://qubelia.es";

export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`.replace(/(?<!:)\/{2,}/g, "/");
}
