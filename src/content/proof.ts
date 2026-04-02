import type { ServiceSlug } from "@/content/services";

export type HomeStat = {
  value: string;
  label: string;
  detail: string;
};

export type PartnerLogo = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export type ResultKpi = {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  accent: string;
  accentRgb: string;
  bar: number;
};

export type CaseStudy = {
  id: string;
  service: ServiceSlug;
  client: string;
  logo: string;
  logoW: number;
  logoH: number;
  sector: string;
  accent: string;
  accentRgb: string;
  headline: string;
  challenge: string;
  result: string;
  metric: string;
  metricLabel: string;
  tags: string[];
  featured?: boolean;
};

export const homeStats: HomeStat[] = [
  {
    value: "4",
    label: "líneas de servicio claras",
    detail: "software, web, automatización y sistemas internos",
  },
  {
    value: "4-8 sem",
    label: "para la primera entrega útil",
    detail: "cuando el alcance inicial está bien definido",
  },
  {
    value: "24 h",
    label: "respuesta comercial máxima",
    detail: "con diagnóstico y siguiente paso concreto",
  },
  {
    value: "100%",
    label: "propiedad del código",
    detail: "sin dependencia artificial de proveedor",
  },
];

export const partnerLogos: PartnerLogo[] = [
  { name: "Banco Santander", logo: "/logos/santander.svg", width: 200, height: 68 },
  { name: "Unicaja Banco", logo: "/logos/unicaja.svg", width: 176, height: 65 },
  { name: "Accenture", logo: "/logos/accenture.svg", width: 204, height: 56 },
  { name: "Soltel Group", logo: "/logos/soltel.svg", width: 200, height: 68 },
  { name: "LF Studio", logo: "/logos/lfstudio.svg", width: 180, height: 60 },
];

export const resultKpis: ResultKpi[] = [
  {
    value: 4,
    suffix: "+",
    label: "Clientes enterprise",
    sub: "activos",
    accent: "#38BDF8",
    accentRgb: "56,189,248",
    bar: 60,
  },
  {
    value: 8,
    suffix: "+",
    label: "Proyectos completados",
    sub: "entregados",
    accent: "#34D399",
    accentRgb: "52,211,153",
    bar: 80,
  },
  {
    value: 100,
    suffix: "%",
    label: "Código siempre tuyo",
    sub: "garantizado",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    bar: 100,
  },
  {
    value: 24,
    suffix: "h",
    label: "Tiempo de respuesta",
    sub: "máximo",
    accent: "#FB923C",
    accentRgb: "251,146,60",
    bar: 45,
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "santander",
    service: "software-a-medida",
    client: "Banco Santander",
    logo: "/logos/santander.svg",
    logoW: 140,
    logoH: 48,
    sector: "Procesos bancarios",
    accent: "#EC0000",
    accentRgb: "236,0,0",
    headline: "Software interno y trazabilidad operativa",
    challenge:
      "Centralizar validaciones, estados y visibilidad sobre procesos bancarios con alta exigencia de control.",
    result:
      "Desarrollo de herramientas a medida para centralizar datos, automatizar validaciones y dar visibilidad completa a procesos críticos.",
    metric: "100%",
    metricLabel: "auditoría trazada",
    tags: ["Software a medida", "Automatización", "Trazabilidad"],
    featured: true,
  },
  {
    id: "unicaja",
    service: "automatizacion-integraciones",
    client: "Unicaja Banco",
    logo: "/logos/unicaja.svg",
    logoW: 130,
    logoH: 48,
    sector: "Optimización bancaria",
    accent: "#62A24C",
    accentRgb: "98,162,76",
    headline: "Automatización de reporting y cierres",
    challenge:
      "Reducir tareas repetitivas de consolidación, validación y cierre con datos más fiables y menos fricción.",
    result:
      "Optimizamos reporting, validaciones y consolidación de datos para reducir tiempo de cierre y dependencia manual.",
    metric: "-70%",
    metricLabel: "tiempo de cierre",
    tags: ["Procesos", "Reporting", "Calidad de datos"],
  },
  {
    id: "accenture",
    service: "crm-intranet-a-medida",
    client: "Accenture",
    logo: "/logos/accenture.svg",
    logoW: 148,
    logoH: 40,
    sector: "Operaciones enterprise",
    accent: "#A100FF",
    accentRgb: "161,0,255",
    headline: "Backoffice y delivery a medida",
    challenge:
      "Coordinar equipos, estándares de entrega y visibilidad interna sobre la operativa diaria.",
    result:
      "Diseñamos software interno para coordinar equipos, estandarizar entregas y acelerar procesos de delivery técnico.",
    metric: "x3",
    metricLabel: "velocidad de entrega",
    tags: ["Sistema interno", "Backoffice", "Arquitectura"],
  },
  {
    id: "lfstudio",
    service: "web-a-medida",
    client: "LF Studio",
    logo: "/logos/lfstudio.svg",
    logoW: 130,
    logoH: 44,
    sector: "Operativa comercial",
    accent: "#111111",
    accentRgb: "17,17,17",
    headline: "Estructura comercial conectada a negocio",
    challenge:
      "Ordenar presencia digital, entrada de solicitudes y seguimiento comercial con una base web más seria.",
    result:
      "Replanteamos captación, estructura y proceso comercial para mejorar la entrada de demanda y reducir fricción operativa.",
    metric: "+220%",
    metricLabel: "tráfico orgánico",
    tags: ["Web a medida", "Captación", "Proceso comercial"],
  },
];

export function getCaseStudiesForService(service: ServiceSlug) {
  return caseStudies.filter((item) => item.service === service);
}
