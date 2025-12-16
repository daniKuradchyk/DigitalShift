import { absoluteUrl, getBaseUrl } from "./urls";

export const SITE_NAME = "Qubelia" as const;
export const SITE_TAGLINE = "Resultados web medibles, sin humo ni sorpresas" as const;
export const BASE_URL = getBaseUrl();

export function titleTemplate(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`;
}

export function canonical(path: string) {
  return absoluteUrl(path);
}

export function openGraphImage(path = "/images/og-cover.png") {
  return [{ url: absoluteUrl(path), width: 1200, height: 630, alt: SITE_NAME }];
}
