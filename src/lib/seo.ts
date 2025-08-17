export const SITE_NAME = "DigitalShift" as const;
export const SITE_TAGLINE = "Resultados web medibles, sin humo ni sorpresas" as const;
export const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function titleTemplate(pageTitle?: string) {
  return pageTitle ? `${pageTitle} · ${SITE_NAME}` : `${SITE_NAME} · ${SITE_TAGLINE}`;
}

export function canonical(path: string) {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function openGraphImage(path = "/images/og-cover.png") {
  return [{ url: path, width: 1200, height: 630, alt: SITE_NAME }];
}