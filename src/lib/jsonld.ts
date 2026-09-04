import { CONTACT } from "@/config/contact";
import { AREAS } from "./locations";
import { BASE_URL } from "./seo";

/**
 * Identificadores estables de las entidades del grafo. Sin `@id`, Google ve
 * Organization, ProfessionalService y WebSite como tres negocios distintos que
 * casualmente comparten nombre y URL, y no consolida el NAP en una sola entidad.
 */
export const ORGANIZATION_ID = `${BASE_URL}/#organization`;
export const LOCAL_BUSINESS_ID = `${BASE_URL}/#localbusiness`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

/** Formato E.164 sin espacios ni guiones: el que recomienda Google y el que casa con GBP. */
export const TELEPHONE_E164 = CONTACT.phone.replace(/[^\d+]/g, "");

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
    "@id": ORGANIZATION_ID,
    name,
    url,
    logo: { "@type": "ImageObject", url: logoUrl },
    sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: TELEPHONE_E164,
      email: CONTACT.email,
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
    "@id": LOCAL_BUSINESS_ID,
    name,
    url,
    parentOrganization: { "@id": ORGANIZATION_ID },
    logo: logoUrl,
    image: logoUrl,
    telephone: telephone.replace(/[^\d+]/g, ""),
    email: CONTACT.email,
    address: { "@type": "PostalAddress", ...address },
    geo: {
      "@type": "GeoCoordinates",
      // TODO(SEO local): estas coordenadas son el centroide del municipio de Sevilla,
      // no la geocodificación de Calle Torrelodones 84B. Sustituir por las exactas y
      // alinearlas con el pin de la ficha de Google Business Profile.
      latitude: 37.3891,
      longitude: -5.9845,
    },
    areaServed: [
      { "@type": "Country", name: "España" },
      { "@type": "AdministrativeArea", name: "Andalucía" },
      ...AREAS.map((area) => ({ "@type": "City" as const, name: area.name })),
    ],
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

export function websiteJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    // Sólo la marca: es el valor que Google usa como sitename en la SERP.
    name,
    ...(description ? { description } : {}),
    url,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "es",
  };
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

export function serviceJsonLd({
  name,
  description,
  areaName,
  url,
  serviceType,
}: {
  name: string;
  description: string;
  areaName?: string;
  url?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    inLanguage: "es",
    ...(url ? { url } : {}),
    ...(serviceType ? { serviceType } : {}),
    areaServed: areaName
      ? { "@type": "City", name: areaName }
      : { "@type": "Country", name: "España" },
    // Referencia a la entidad ya declarada en el layout, en vez de un tercer
    // Organization suelto que Google no puede vincular con el NAP.
    provider: { "@id": LOCAL_BUSINESS_ID },
  };
}

export function softwareAppJsonLd(tools: { title: string; desc: string; href: string }[]) {
  return tools.map((tool) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    // @id estable: la misma herramienta declarada desde /labs y desde su propia
    // página es una sola entidad, no dos.
    "@id": `${BASE_URL}${tool.href}#app`,
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
    provider: { "@id": ORGANIZATION_ID },
  }));
}
