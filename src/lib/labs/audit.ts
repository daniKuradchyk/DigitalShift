import { z } from "zod";

const verticalOptions = ["local", "ecommerce", "despacho", "clinica"] as const;
const goalOptions = ["captar-leads", "vender-mas", "ahorrar-tiempo", "reducir-errores", "mejorar-control"] as const;
const websiteOptions = ["none", "basic", "ok", "optimized"] as const;
const socialOptions = ["none", "sporadic", "active", "active-paid"] as const;
const trackingOptions = ["none", "basic", "events"] as const;
const segmentOptions = ["none", "basic", "defined"] as const;
const channelOptions = ["boca-oreja", "rrss", "seo", "ads", "marketplaces", "partners", "otro"] as const;
const leadToolOptions = ["manual", "spreadsheet", "crm", "integrated"] as const;
const responseOptions = ["menos-1h", "mismo-dia", "24-48h", "mas-48h"] as const;
const followUpOptions = ["sin-proceso", "basico", "regular", "automatizado"] as const;
const forecastOptions = ["none", "basic", "defined"] as const;
const repetitionOptions = ["bajo", "medio", "alto"] as const;
const automationOptions = ["ninguna", "no-code", "integraciones", "custom"] as const;
const errorRateOptions = ["raro", "ocasional", "frecuente"] as const;
const kpiOptions = ["none", "basic", "defined"] as const;
const reportingOptions = ["nunca", "mensual", "semanal", "diario"] as const;
const crmOptions = ["none", "crm", "erp"] as const;
const feedbackOptions = ["none", "sporadic", "regular"] as const;
const conversionOptions = ["none", "basic", "optimized"] as const;
const retentionOptions = ["none", "basic", "defined"] as const;
const marginOptions = ["unknown", "rough", "by-line"] as const;
const cashflowOptions = ["none", "monthly", "weekly"] as const;
const pricingOptions = ["no-review", "annual", "quarterly"] as const;
const costStructureOptions = ["unknown", "basic", "detailed"] as const;

export type AuditVertical = (typeof verticalOptions)[number];
export type AuditGoal = (typeof goalOptions)[number];

export const auditAnswersSchema = z.object({
  vertical: z.enum(verticalOptions, { message: "Selecciona un perfil" }),
  goal: z.enum(goalOptions, { message: "Selecciona un objetivo" }),
  presence: z.object({
    websiteStatus: z.enum(websiteOptions),
    ctaClarity: z.boolean(),
    valuePropClarity: z.boolean(),
    segmentClarity: z.enum(segmentOptions),
    socialPresence: z.enum(socialOptions),
    tracking: z.enum(trackingOptions),
    mainChannel: z.enum(channelOptions),
  }),
  sales: z.object({
    leadTool: z.enum(leadToolOptions),
    responseTime: z.enum(responseOptions),
    followUp: z.enum(followUpOptions),
    conversionTracking: z.enum(conversionOptions),
    forecastLevel: z.enum(forecastOptions),
  }),
  operations: z.object({
    processDocumentation: z.boolean(),
    repetitionLevel: z.enum(repetitionOptions),
    automationLevel: z.enum(automationOptions),
    errorRate: z.enum(errorRateOptions),
    qualityControl: z.boolean(),
    bottleneck: z.string().trim().max(160, "El texto es demasiado largo").optional(),
  }),
  data: z.object({
    kpiUsage: z.enum(kpiOptions),
    reportingFrequency: z.enum(reportingOptions),
    crmErp: z.enum(crmOptions),
    retentionTracking: z.enum(retentionOptions),
    feedbackLoop: z.enum(feedbackOptions),
  }),
  finance: z.object({
    marginVisibility: z.enum(marginOptions),
    cashflowControl: z.enum(cashflowOptions),
    pricingReview: z.enum(pricingOptions),
    costStructureVisibility: z.enum(costStructureOptions),
  }),
  risk: z.object({
    backups: z.boolean(),
    accessControl: z.boolean(),
    rgpdBasics: z.boolean(),
    securityUpdates: z.boolean(),
  }),
});

const contactSchema = z
  .object({
    wantsEmail: z.boolean(),
    contactName: z.string().trim().max(120, "Nombre demasiado largo").optional(),
    email: z.string().trim().optional(),
    companyName: z.string().trim().max(120, "Empresa demasiado larga").optional(),
    website: z.string().trim().optional(),
    phone: z.string().trim().optional(),
    consent: z.boolean(),
  })
  .superRefine((value, ctx) => {
    const hasContact =
      value.wantsEmail ||
      Boolean(value.email?.trim()) ||
      Boolean(value.contactName?.trim()) ||
      Boolean(value.companyName?.trim()) ||
      Boolean(value.website?.trim()) ||
      Boolean(value.phone?.trim());

    if (!hasContact) return;

    const email = value.email?.trim() ?? "";
    if (!email) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El email es obligatorio si quieres recibir el informe", path: ["email"] });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El email no es valido", path: ["email"] });
    }

    const website = value.website?.trim();
    if (website) {
      try {
        const parsed = new URL(website.startsWith("http") ? website : `https://${website}`);
        if (!parsed.hostname.includes(".")) {
          throw new Error("invalid");
        }
      } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La web no es valida", path: ["website"] });
      }
    }

    const phone = value.phone?.trim();
    if (phone && phone.replace(/\D/g, "").length < 7) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El telefono no es valido", path: ["phone"] });
    }

    if (!value.consent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debes aceptar la politica de privacidad",
        path: ["consent"],
      });
    }
  });

export const auditSubmissionSchema = auditAnswersSchema.extend({
  contact: contactSchema,
});

export type AuditAnswers = z.infer<typeof auditAnswersSchema>;
export type AuditContact = z.infer<typeof contactSchema>;
export type AuditSubmission = z.infer<typeof auditSubmissionSchema>;

export type AuditScores = {
  total: number;
  acquisition: number;
  web: number;
  sales: number;
  operations: number;
  data: number;
  finance: number;
  risk: number;
};

export type AuditReport = {
  summary: string[];
  weakPoints: string[];
  quickWins: string[];
  roadmap: Array<{ title: string; goal: string }>;
  impactMatrix: Array<{ label: string; items: string[] }>;
};

export type AuditResult = {
  scores: AuditScores;
  report: AuditReport;
};

const VERTICAL_WEIGHTS: Record<AuditVertical, Omit<AuditScores, "total">> = {
  ecommerce: { acquisition: 23, operations: 18, data: 18, risk: 13, web: 8, sales: 10, finance: 10 },
  clinica: { acquisition: 13, operations: 23, data: 13, risk: 18, web: 13, sales: 10, finance: 10 },
  despacho: { acquisition: 8, operations: 23, data: 13, risk: 18, web: 13, sales: 15, finance: 10 },
  local: { acquisition: 23, operations: 18, data: 13, risk: 8, web: 18, sales: 10, finance: 10 },
};

const scoreMaps = {
  website: { none: 10, basic: 35, ok: 60, optimized: 85 },
  social: { none: 15, sporadic: 35, active: 60, "active-paid": 75 },
  tracking: { none: 20, basic: 55, events: 85 },
  segment: { none: 20, basic: 55, defined: 85 },
  channel: { "boca-oreja": 35, rrss: 55, seo: 65, ads: 70, marketplaces: 60, partners: 50, otro: 45 },
  leadTool: { manual: 25, spreadsheet: 45, crm: 70, integrated: 85 },
  response: { "menos-1h": 90, "mismo-dia": 70, "24-48h": 50, "mas-48h": 30 },
  followUp: { "sin-proceso": 25, basico: 45, regular: 70, automatizado: 85 },
  conversion: { none: 25, basic: 55, optimized: 85 },
  forecast: { none: 25, basic: 55, defined: 85 },
  repetition: { bajo: 80, medio: 55, alto: 30 },
  automation: { ninguna: 25, "no-code": 55, integraciones: 70, custom: 85 },
  errorRate: { raro: 80, ocasional: 55, frecuente: 30 },
  kpiUsage: { none: 20, basic: 55, defined: 80 },
  reporting: { nunca: 20, mensual: 50, semanal: 70, diario: 85 },
  crm: { none: 25, crm: 60, erp: 80 },
  retention: { none: 20, basic: 55, defined: 80 },
  feedback: { none: 20, sporadic: 55, regular: 80 },
  margin: { unknown: 20, rough: 50, "by-line": 80 },
  cashflow: { none: 20, monthly: 55, weekly: 80 },
  pricing: { "no-review": 30, annual: 55, quarterly: 80 },
  costStructure: { unknown: 20, basic: 55, detailed: 80 },
};

const verticalContext: Record<AuditVertical, { pipeline: string; audience: string; workflow: string }> = {
  local: { pipeline: "leads", audience: "clientes", workflow: "ventas" },
  ecommerce: { pipeline: "conversiones", audience: "pedidos", workflow: "pedidos" },
  despacho: { pipeline: "expedientes", audience: "clientes", workflow: "casos" },
  clinica: { pipeline: "pacientes", audience: "citas", workflow: "atencion" },
};

function clampScore(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function average(values: number[]) {
  if (!values.length) return 0;
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

export function calculateAuditResult(answers: AuditAnswers): AuditResult {
  const acquisition = clampScore(
    average([
      scoreMaps.tracking[answers.presence.tracking],
      scoreMaps.channel[answers.presence.mainChannel],
      answers.presence.ctaClarity ? 70 : 30,
      answers.presence.valuePropClarity ? 75 : 30,
      scoreMaps.segment[answers.presence.segmentClarity],
    ])
  );

  const web = clampScore(
    average([
      scoreMaps.website[answers.presence.websiteStatus],
      scoreMaps.social[answers.presence.socialPresence],
      answers.presence.ctaClarity ? 75 : 30,
      answers.presence.valuePropClarity ? 70 : 30,
    ])
  );

  const sales = clampScore(
    average([
      scoreMaps.leadTool[answers.sales.leadTool],
      scoreMaps.response[answers.sales.responseTime],
      scoreMaps.followUp[answers.sales.followUp],
      scoreMaps.conversion[answers.sales.conversionTracking],
      scoreMaps.forecast[answers.sales.forecastLevel],
    ])
  );

  const operations = clampScore(
    average([
      answers.operations.processDocumentation ? 70 : 30,
      scoreMaps.repetition[answers.operations.repetitionLevel],
      scoreMaps.automation[answers.operations.automationLevel],
      scoreMaps.errorRate[answers.operations.errorRate],
      answers.operations.qualityControl ? 70 : 30,
    ])
  );

  const data = clampScore(
    average([
      scoreMaps.kpiUsage[answers.data.kpiUsage],
      scoreMaps.reporting[answers.data.reportingFrequency],
      scoreMaps.crm[answers.data.crmErp],
      scoreMaps.tracking[answers.presence.tracking],
      scoreMaps.retention[answers.data.retentionTracking],
      scoreMaps.feedback[answers.data.feedbackLoop],
    ])
  );

  const finance = clampScore(
    average([
      scoreMaps.margin[answers.finance.marginVisibility],
      scoreMaps.cashflow[answers.finance.cashflowControl],
      scoreMaps.pricing[answers.finance.pricingReview],
      scoreMaps.costStructure[answers.finance.costStructureVisibility],
    ])
  );

  const risk = clampScore(
    (answers.risk.backups ? 25 : 0) +
      (answers.risk.accessControl ? 25 : 0) +
      (answers.risk.rgpdBasics ? 25 : 0) +
      (answers.risk.securityUpdates ? 25 : 0)
  );

  const weights = VERTICAL_WEIGHTS[answers.vertical];
  const total = clampScore(
    acquisition * (weights.acquisition / 100) +
      web * (weights.web / 100) +
      sales * (weights.sales / 100) +
      operations * (weights.operations / 100) +
      data * (weights.data / 100) +
      finance * (weights.finance / 100) +
      risk * (weights.risk / 100)
  );

  const scores: AuditScores = { total, acquisition, web, sales, operations, data, finance, risk };
  const report = buildReport(answers, scores);
  return { scores, report };
}

export function scoreBucket(total: number) {
  if (total < 40) return "0-39";
  if (total < 70) return "40-69";
  return "70-100";
}

function buildReport(answers: AuditAnswers, scores: AuditScores): AuditReport {
  // Deterministic MVP: swap for AI-assisted generation in V2.
  const context = verticalContext[answers.vertical];
  const weakPoints = buildWeakPoints(answers, context);
  const quickWins = buildQuickWins(answers, context);
  const roadmap = buildRoadmap(answers, context);
  const impactMatrix = buildImpactMatrix(quickWins);

  const scoreSorted = [
    { key: "acquisition", label: "captacion" },
    { key: "web", label: "web/SEO" },
    { key: "sales", label: context.workflow },
    { key: "operations", label: "operaciones" },
    { key: "data", label: "datos" },
    { key: "finance", label: "finanzas" },
    { key: "risk", label: "riesgos" },
  ].sort((a, b) => scores[a.key as keyof AuditScores] - scores[b.key as keyof AuditScores]);

  const summary = [
    `Nivel actual ${scores.total}/100. Prioridad en ${scoreSorted[0]?.label ?? "operaciones"}.`,
    weakPoints[0] ? `Principal brecha: ${weakPoints[0]}.` : "Hay margen para optimizar conversion y operaciones.",
    quickWins[0] ? `Primer paso recomendado: ${quickWins[0]}.` : "Empieza por medir y priorizar tu canal principal.",
  ];

  return {
    summary,
    weakPoints: weakPoints.slice(0, 5),
    quickWins: quickWins.slice(0, 3),
    roadmap,
    impactMatrix,
  };
}

function buildWeakPoints(answers: AuditAnswers, context: { pipeline: string; audience: string; workflow: string }) {
  const items: Array<{ text: string; priority: number }> = [];

  if (answers.presence.websiteStatus === "none") {
    items.push({ text: "Sin web funcional para captar demanda", priority: 1 });
  }
  if (answers.presence.websiteStatus === "basic") {
    items.push({ text: "Web basica con baja conversion", priority: 2 });
  }
  if (!answers.presence.ctaClarity) {
    items.push({ text: "Propuesta y CTA poco visibles", priority: 2 });
  }
  if (!answers.presence.valuePropClarity) {
    items.push({ text: "Propuesta de valor poco diferenciada", priority: 2 });
  }
  if (answers.presence.segmentClarity === "none") {
    items.push({ text: "Segmento objetivo sin definir", priority: 1 });
  }
  if (answers.presence.segmentClarity === "basic") {
    items.push({ text: "Segmento objetivo poco afinado", priority: 3 });
  }
  if (answers.presence.tracking === "none") {
    items.push({ text: "Sin analitica ni medicion del embudo", priority: 1 });
  }
  if (answers.sales.leadTool === "manual" || answers.sales.leadTool === "spreadsheet") {
    items.push({ text: `Seguimiento de ${context.pipeline} manual`, priority: 2 });
  }
  if (answers.sales.conversionTracking === "none") {
    items.push({ text: "Sin medicion de tasa de cierre por etapa", priority: 2 });
  }
  if (answers.sales.forecastLevel === "none") {
    items.push({ text: "Sin forecast comercial ni pipeline proyectado", priority: 2 });
  }
  if (answers.sales.responseTime === "24-48h" || answers.sales.responseTime === "mas-48h") {
    items.push({ text: `Respuesta lenta a ${context.pipeline}`, priority: 3 });
  }
  if (answers.operations.repetitionLevel === "alto" || answers.operations.automationLevel === "ninguna") {
    items.push({ text: "Procesos manuales repetitivos", priority: 1 });
  }
  if (answers.operations.errorRate === "frecuente") {
    items.push({ text: "Errores operativos frecuentes", priority: 2 });
  }
  if (!answers.operations.qualityControl) {
    items.push({ text: "Control de calidad irregular antes de entregar", priority: 3 });
  }
  if (answers.data.kpiUsage === "none" || answers.data.reportingFrequency === "nunca") {
    items.push({ text: "Falta de KPIs y reporting regular", priority: 2 });
  }
  if (answers.data.retentionTracking === "none") {
    items.push({ text: "Sin medicion de retencion o repeticion", priority: 2 });
  }
  if (answers.data.feedbackLoop === "none") {
    items.push({ text: "Sin medicion de satisfaccion del cliente", priority: 2 });
  }
  if (answers.finance.marginVisibility === "unknown") {
    items.push({ text: "Margen por servicio no medido", priority: 1 });
  }
  if (answers.finance.costStructureVisibility === "unknown") {
    items.push({ text: "Costes fijos/variables no claros", priority: 2 });
  }
  if (answers.finance.cashflowControl === "none") {
    items.push({ text: "Sin control de tesoreria/cashflow", priority: 1 });
  }
  if (answers.finance.pricingReview === "no-review") {
    items.push({ text: "Precios sin revision periodica", priority: 3 });
  }
  if (!answers.risk.backups || !answers.risk.rgpdBasics) {
    items.push({ text: "Riesgos basicos de seguridad y RGPD", priority: 1 });
  }
  if (!answers.risk.accessControl) {
    items.push({ text: "Accesos sin control ni roles", priority: 3 });
  }

  return items
    .sort((a, b) => a.priority - b.priority)
    .map((item) => item.text);
}

function buildQuickWins(answers: AuditAnswers, context: { pipeline: string }) {
  const items: Array<{ text: string; priority: number }> = [];

  if (answers.presence.tracking === "none") {
    items.push({ text: "Instala GA4 y define 3 conversiones clave", priority: 1 });
  }
  if (!answers.presence.ctaClarity || answers.presence.websiteStatus === "basic") {
    items.push({ text: "Refuerza el CTA principal en la web con una sola accion", priority: 2 });
  }
  if (!answers.presence.valuePropClarity) {
    items.push({ text: "Define propuesta de valor y diferenciales clave", priority: 2 });
  }
  if (answers.presence.segmentClarity === "none") {
    items.push({ text: "Define ICP, dolor principal y canal prioritario", priority: 2 });
  }
  if (answers.sales.leadTool === "manual" || answers.sales.leadTool === "spreadsheet") {
    items.push({ text: `Centraliza ${context.pipeline} en un CRM gratuito`, priority: 1 });
  }
  if (answers.sales.conversionTracking === "none") {
    items.push({ text: "Mide la tasa de cierre por etapa del pipeline", priority: 2 });
  }
  if (answers.sales.forecastLevel === "none") {
    items.push({ text: "Crea un forecast mensual con pipeline y tasa de cierre", priority: 2 });
  }
  if (answers.sales.responseTime === "24-48h" || answers.sales.responseTime === "mas-48h") {
    items.push({ text: "Define plantillas y SLA de respuesta en 24h", priority: 2 });
  }
  if (answers.operations.repetitionLevel === "alto") {
    items.push({ text: "Automatiza la tarea repetitiva numero 1 con no-code", priority: 2 });
  }
  if (!answers.operations.qualityControl) {
    items.push({ text: "Implementa un checklist de calidad antes de entregar", priority: 2 });
  }
  if (!answers.risk.backups || !answers.risk.accessControl) {
    items.push({ text: "Activa backups automaticos y revisa accesos", priority: 1 });
  }
  if (!answers.risk.rgpdBasics) {
    items.push({ text: "Checklist RGPD basico (cookies, textos y consentimientos)", priority: 2 });
  }
  if (answers.data.kpiUsage === "none") {
    items.push({ text: "Define 5 KPIs y revisalos cada semana", priority: 2 });
  }
  if (answers.data.retentionTracking === "none") {
    items.push({ text: "Mide repeticion/retencion con un reporte simple", priority: 2 });
  }
  if (answers.data.feedbackLoop === "none") {
    items.push({ text: "Lanza una encuesta NPS/CSAT al cierre", priority: 2 });
  }
  if (answers.finance.marginVisibility === "unknown") {
    items.push({ text: "Calcula margen bruto por servicio o producto", priority: 1 });
  }
  if (answers.finance.costStructureVisibility === "unknown") {
    items.push({ text: "Mapea costes fijos/variables y punto de equilibrio", priority: 2 });
  }
  if (answers.finance.cashflowControl === "none") {
    items.push({ text: "Crea un forecast de tesoreria mensual", priority: 1 });
  }
  if (answers.finance.pricingReview === "no-review") {
    items.push({ text: "Revisa precios con costes y valor percibido", priority: 2 });
  }

  const sorted = items.sort((a, b) => a.priority - b.priority).map((item) => item.text);
  const fallback = [
    "Revisa la propuesta de valor y elimina distracciones en la home",
    "Ordena el pipeline comercial y crea un estado por etapa",
    "Crea un tablero simple para seguimiento semanal",
  ];

  while (sorted.length < 3) {
    const next = fallback.find((item) => !sorted.includes(item));
    if (!next) break;
    sorted.push(next);
  }

  return sorted.slice(0, 3);
}

function buildRoadmap(_answers: AuditAnswers, context: { pipeline: string; workflow: string }) {
  return [
    {
      title: "Fase 1 (0-30 dias)",
      goal: `Medicion basica, ICP, CTA claro, margen y pipeline para ${context.pipeline}.`,
    },
    {
      title: "Fase 2 (31-60 dias)",
      goal: `Automatizar tareas criticas y estandarizar ${context.workflow}.`,
    },
    {
      title: "Fase 3 (61-90 dias)",
      goal: "Escalar con dashboards, mejoras continuas y control de riesgos.",
    },
  ];
}

function buildImpactMatrix(quickWins: string[]) {
  const lowEffortHighImpact = quickWins.slice(0, 2);
  const highImpactHighEffort = [
    "Integrar CRM/ERP con procesos clave",
    "Automatizar flujo principal de captacion a entrega",
  ];
  const lowImpactLowEffort = ["Actualizar FAQs y mensajes de confianza", "Unificar plantillas de respuesta"];
  const lowImpactHighEffort = ["Redisenar la web completa", "Migrar stack sin plan de datos"];

  return [
    { label: "Alto impacto / bajo esfuerzo", items: lowEffortHighImpact },
    { label: "Alto impacto / alto esfuerzo", items: highImpactHighEffort },
    { label: "Bajo impacto / bajo esfuerzo", items: lowImpactLowEffort },
    { label: "Bajo impacto / alto esfuerzo", items: lowImpactHighEffort },
  ];
}
