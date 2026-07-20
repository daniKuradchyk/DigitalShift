import { getServices } from "@/content/services";
import { AREAS } from "@/lib/locations";
import { posts } from "@/lib/posts";

export type SearchResult = {
  title: string;
  href: string;
  excerpt: string;
  type: "Servicio" | "Blog" | "Herramienta" | "Página" | "Zona";
};

type IndexEntry = SearchResult & {
  /** Texto completo normalizado sobre el que se busca. */
  haystack: string;
};

/** Normaliza para búsqueda insensible a mayúsculas y tildes. */
function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function truncate(text: string, max = 180) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

let index: IndexEntry[] | null = null;

function buildIndex(): IndexEntry[] {
  const entries: IndexEntry[] = [];

  for (const service of getServices()) {
    entries.push({
      title: service.title,
      href: service.href,
      excerpt: truncate(service.cardSummary),
      type: "Servicio",
      haystack: normalize(
        [service.title, service.shortTitle, service.intent, service.cardSummary, service.metaDescription, ...service.deliverables, ...service.benefits].join(" ")
      ),
    });
  }

  for (const post of posts) {
    const body = post.sections.flatMap((s) => [s.title, ...s.body]).join(" ");
    entries.push({
      title: post.title,
      href: `/blog/${post.slug}`,
      excerpt: truncate(post.description),
      type: "Blog",
      haystack: normalize([post.title, post.description, post.tags.join(" "), body].join(" ")),
    });
  }

  const tools: Array<Omit<IndexEntry, "haystack"> & { keywords: string }> = [
    {
      title: "Calculadora de ROI de automatización",
      href: "/labs/roi-automatizacion",
      excerpt: "Calcula cuántas horas y euros puede ahorrar tu empresa automatizando tareas repetitivas.",
      type: "Herramienta",
      keywords: "roi retorno inversion automatizacion horas ahorro calculadora gratis",
    },
    {
      title: "Calculadora de coste de software a medida",
      href: "/labs/calculadora-coste-software",
      excerpt: "Estima el rango de inversión de tu proyecto de software a medida según alcance e integraciones.",
      type: "Herramienta",
      keywords: "coste precio presupuesto software a medida calculadora cuanto cuesta desarrollo",
    },
    {
      title: "Análisis gratuito de tu negocio",
      href: "/labs/analisis-gratis",
      excerpt: "Auditoría guiada de tu operativa digital con informe PDF y recomendaciones accionables.",
      type: "Herramienta",
      keywords: "analisis auditoria gratis diagnostico operativa digital informe",
    },
    {
      title: "Calculadora de IRPF para autónomos",
      href: "/herramientas/calculadora-irpf",
      excerpt: "Estima tu cuota anual de IRPF como autónomo en estimación directa o por módulos.",
      type: "Herramienta",
      keywords: "irpf autonomos impuestos cuota estimacion directa modulos hacienda",
    },
    {
      title: "Casos de éxito",
      href: "/casos",
      excerpt: "Proyectos reales con resultados medibles: problema, solución aplicada e impacto en el negocio.",
      type: "Página",
      keywords: "casos exito clientes proyectos resultados referencias",
    },
    {
      title: "Servicios de Qubelia",
      href: "/servicios",
      excerpt: "Software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida.",
      type: "Página",
      keywords: "servicios catalogo software web automatizacion crm intranet",
    },
  ];
  for (const tool of tools) {
    const { keywords, ...rest } = tool;
    entries.push({ ...rest, haystack: normalize([rest.title, rest.excerpt, keywords].join(" ")) });
  }

  for (const area of AREAS) {
    entries.push({
      title: `Software a medida en ${area.name}`,
      href: `/area/${area.slug}`,
      excerpt: truncate(area.intro),
      type: "Zona",
      haystack: normalize([area.name, area.province, area.intro, area.sectors.join(" "), area.scenarios.join(" ")].join(" ")),
    });
  }

  return entries;
}

export function searchSite(query: string, limit = 20): SearchResult[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  index ??= buildIndex();
  const tokens = q.split(/\s+/).filter((t) => t.length >= 2);
  if (tokens.length === 0) return [];

  const scored = index
    .map((entry) => {
      const titleNorm = normalize(entry.title);
      let score = 0;
      for (const token of tokens) {
        if (titleNorm.includes(token)) score += 3;
        else if (entry.haystack.includes(token)) score += 1;
      }
      // Frase completa en el título o el cuerpo pesa más.
      if (tokens.length > 1) {
        if (titleNorm.includes(q)) score += 4;
        else if (entry.haystack.includes(q)) score += 2;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(({ entry }) => ({
    title: entry.title,
    href: entry.href,
    excerpt: entry.excerpt,
    type: entry.type,
  }));
}
