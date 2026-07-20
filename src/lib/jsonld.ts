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
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: logoUrl,
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+34-674-569-372",
      contactType: "sales",
      areaServed: "ES",
      availableLanguage: "Spanish",
    },
  };
}

export function professionalServiceJsonLd({
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
    "@type": "ProfessionalService",
    name,
    url,
    logo: logoUrl,
    image: logoUrl,
    telephone,
    email: "hola@qubelia.es",
    address: { "@type": "PostalAddress", ...address },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.3891",
      longitude: "-5.9845",
    },
    areaServed: {
      "@type": "Country",
      name: "España",
    },
    priceRange: "€€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de desarrollo de software",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Software a medida", description: "Desarrollo de herramientas internas, portales y plataformas a medida para empresas B2B" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web a medida", description: "Diseño y desarrollo de páginas web profesionales orientadas a captación y posicionamiento SEO" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Automatización e integraciones", description: "Flujos automáticos e integraciones entre ERP, CRM y herramientas empresariales" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "CRM / Intranet a medida", description: "CRM personalizado e intranet corporativa para procesos comerciales y operativos complejos" },
        },
      ],
    },
  };
}

export function websiteJsonLd({ url, name }: { url: string; name: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    inLanguage: "es",
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

export function serviceJsonLd({ name, description, areaName }: { name: string; description: string; areaName?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    inLanguage: "es",
    areaServed: areaName
      ? { "@type": "City", name: areaName }
      : { "@type": "Country", name: "España" },
    provider: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
  } as const;
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
