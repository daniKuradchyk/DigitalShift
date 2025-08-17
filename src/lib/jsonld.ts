import { BASE_URL, SITE_NAME } from "./seo";

export function organizationJsonLd({
  name,
  url,
  logoUrl,
  sameAs = [] as string[],
}: {
  name: string;
  url: string;
  logoUrl: string;
  sameAs?: string[];
}) {
  return { "@context": "https://schema.org", "@type": "Organization", name, url, logo: logoUrl, sameAs };
}

export function websiteJsonLd({ url, name }: { url: string; name: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/buscar?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  } as const;
}

export function localBusinessJsonLd({
  name,
  url,
  logoUrl,
  telephone,
  address,
  sameAs = [] as string[],
}: {
  name: string; url: string; logoUrl: string; telephone: string; address: { streetAddress: string; addressLocality: string; postalCode: string; addressRegion: string; addressCountry: string; }; sameAs?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    logo: logoUrl,
    telephone,
    address: { "@type": "PostalAddress", ...address },
    areaServed: "ES",
    image: [logoUrl],
  } as const;
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  } as const;
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

export function serviceJsonLd({ name, description, areaUrl }: { name: string; description: string; areaUrl?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    areaServed: areaUrl ?? BASE_URL,
    provider: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  } as const;
}
export function articleJsonLd({
  headline,
  description,
  authorName,
  url,
  datePublished,
  image = "/images/og-cover.png",
}: {
  headline: string;
  description: string;
  authorName: string;
  url: string;
  datePublished: string; // YYYY-MM-DD
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    author: { "@type": "Person", name: authorName },
    datePublished,
    mainEntityOfPage: url,
    image: [image],
    publisher: { "@type": "Organization", name: "DigitalShift", logo: { "@type": "ImageObject", url: "/favicon.ico" } },
  } as const;
}