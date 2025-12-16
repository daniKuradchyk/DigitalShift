const DEFAULT_BASE = "http://localhost:3000";

export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_BASE;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getBaseUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`.replace(/(?<!:)\/{2,}/g, "/");
}
