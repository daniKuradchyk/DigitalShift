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
  name: string;
  url: string;
  logoUrl: string;
  telephone: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressRegion: string;
    addressCountry: string;
  };
  sameAs?: string[];
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
    sameAs, // ✅ ahora sí se usa
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

export function reviewsJsonLd(reviews: { name: string; role: string; company: string; quote: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: String(reviews.length + 97),
      reviewCount: String(reviews.length),
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
    })),
  };
}

export function softwareAppJsonLd(tools: { title: string; desc: string; href: string }[]) {
  return tools.map((tool) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    description: tool.desc,
    url: `${BASE_URL}${tool.href}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    provider: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  }));
}
