export type PostMeta = {
  slug: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  date: string; // YYYY-MM-DD
  author: { name: string; url?: string };
  tags: string[];
};

export const postsMeta: PostMeta[] = [
  {
    slug: "presupuesto-diseno-web-sevilla",
    title: "Presupuesto diseño web en Sevilla: rangos y factores (2025)",
    description:
      "Descubre cuánto cuesta una web en Sevilla: rangos de precios, factores clave y qué incluir para no pagar de más ni de menos.",
    h1: "¿Cuánto cuesta una web en Sevilla? Rangos y factores",
    date: "2025-08-17",
    author: { name: "Equipo Qubelia", url: "https://www.linkedin.com/" },
    tags: ["Sevilla", "Diseño web", "Presupuesto"],
  },
  {
    slug: "checklist-landing-conversion",
    title: "Checklist para crear una landing que convierte (15 puntos)",
    description:
      "La guía práctica de 15 puntos para aumentar la conversión de tus landing pages. Priorizada y accionable.",
    h1: "Checklist para landings que convierten: 15 puntos prácticos",
    date: "2025-08-17",
    author: { name: "Equipo Qubelia", url: "https://www.linkedin.com/" },
    tags: ["Landing pages", "CRO", "Checklist"],
  },
  {
    slug: "seo-onpage-negocios-locales",
    title: "SEO on-page para negocios locales: guía práctica",
    description:
      "Optimiza tu SEO local: Title/Meta, H1-H3, enlazado interno, datos estructurados, NAP y rendimiento.",
    h1: "SEO on-page para negocios locales: guía práctica",
    date: "2025-08-17",
    author: { name: "Equipo Qubelia", url: "https://www.linkedin.com/" },
    tags: ["SEO", "Local", "On-page"],
  },
];
