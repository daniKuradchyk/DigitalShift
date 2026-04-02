import type { Metadata } from "next";
import { absoluteUrl, getBaseUrl } from "./urls";

export const SITE_NAME = "Qubelia" as const;
export const SITE_TAGLINE =
  "Software a medida, web a medida, automatización e integraciones, CRM e intranet a medida" as const;
export const BASE_URL = getBaseUrl();

export function titleTemplate(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : `${SITE_NAME} | ${SITE_TAGLINE}`;
}

export function canonical(path: string) {
  return absoluteUrl(path);
}

export function openGraphImage(path = "/opengraph-image") {
  return [{ url: absoluteUrl(path), width: 1200, height: 630, alt: SITE_NAME }];
}

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: canonical(path) },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical(path),
      siteName: SITE_NAME,
      images: openGraphImage(),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: openGraphImage(),
    },
  };
}
