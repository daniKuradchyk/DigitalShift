import { z } from "zod";

// ── Option arrays ──────────────────────────────────────────────────────────────

const verticalOptions  = ["local", "ecommerce", "despacho", "clinica", "restaurante", "saas", "inmobiliaria", "educacion"] as const;
const goalOptions      = ["captar-leads", "vender-mas", "ahorrar-tiempo", "reducir-errores", "mejorar-control", "escalar", "digitalizar"] as const;
const companySizeOpts  = ["solo", "2-5", "6-20", "20+"] as const;
const yearsOpts        = ["menos-1", "1-3", "3-10", "10+"] as const;

const websiteOptions   = ["none", "basic", "ok", "optimized"] as const;
const websiteSpeedOpts = ["slow", "ok", "fast"] as const;
const seoOpts          = ["none", "basic", "active"] as const;
const brandOpts        = ["none", "partial", "full"] as const;

const channelOptions   = ["boca-oreja", "rrss", "seo", "ads", "email", "marketplaces", "partners", "otro"] as const;
const monthlyLeadsOpts = ["0-5", "6-20", "21-50", "50+"] as const;
const contentOpts      = ["none", "sporadic", "planned", "systematic"] as const;
const paidAdsOpts      = ["none", "testing", "optimized"] as const;
const emailMktOpts     = ["none", "newsletter", "automated"] as const;
const trackingOptions  = ["none", "basic", "events"] as const;
const segmentOptions   = ["none", "basic", "defined"] as const;

const leadToolOptions  = ["manual", "spreadsheet", "crm", "integrated"] as const;
const responseOptions  = ["menos-1h", "mismo-dia", "24-48h", "mas-48h"] as const;
const followUpOptions  = ["sin-proceso", "basico", "regular", "automatizado"] as const;
const conversionOpts   = ["none", "basic", "optimized"] as const;
const forecastOptions  = ["none", "basic", "defined"] as const;
const salesTeamOpts    = ["solo", "1-3", "4+"] as const;

const repetitionOpts   = ["bajo", "medio", "alto"] as const;
const automationOpts   = ["ninguna", "no-code", "integraciones", "custom"] as const;
const errorRateOpts    = ["raro", "ocasional", "frecuente"] as const;
const deliveryOpts     = ["variable", "mostly", "always"] as const;

const retentionOpts    = ["none", "basic", "defined"] as const;
const feedbackOpts     = ["none", "sporadic", "regular"] as const;
const supportTimeOpts  = ["hours", "days", "weeks"] as const;
const referralOpts     = ["none", "informal", "structured"] as const;

const kpiOpts          = ["none", "basic", "defined"] as const;
const reportingOpts    = ["nunca", "mensual", "semanal", "diario"] as const;
const crmOpts          = ["none", "crm", "erp"] as const;
const aiToolsOpts      = ["none", "casual", "integrated", "custom"] as const;
const decisionOpts     = ["gut", "data-informed", "data-driven"] as const;

const marginOpts       = ["unknown", "rough", "by-line"] as const;
const cashflowOpts     = ["none", "monthly", "weekly"] as const;
const pricingOpts      = ["no-review", "annual", "quarterly"] as const;
const costStructOpts   = ["unknown", "basic", "detailed"] as const;
const paymentTermsOpts = ["immediate", "30d", "60d+"] as const;
const finForecastOpts  = ["none", "basic", "12m+"] as const;

// ── Zod schema ─────────────────────────────────────────────────────────────────

export const auditAnswersSchema = z.object({
  vertical:         z.enum(verticalOptions, { message: "Selecciona un perfil" }),
  goal:             z.enum(goalOptions,     { message: "Selecciona un objetivo" }),
  companySize:      z.enum(companySizeOpts),
  yearsInBusiness:  z.enum(yearsOpts),

  digital: z.object({
    websiteStatus:    z.enum(websiteOptions),
    websiteSpeed:     z.enum(websiteSpeedOpts),
    mobileOptimized:  z.boolean(),
    seoStrategy:      z.enum(seoOpts),
    valuePropClarity: z.boolean(),
    ctaClarity:       z.boolean(),
    brandConsistency: z.enum(brandOpts),
    googlePresence:   z.boolean(),
  }),

  marketing: z.object({
    mainChannel:     z.enum(channelOptions),
    monthlyLeads:    z.enum(monthlyLeadsOpts),
    contentStrategy: z.enum(contentOpts),
    paidAds:         z.enum(paidAdsOpts),
    emailMarketing:  z.enum(emailMktOpts),
    tracking:        z.enum(trackingOptions),
    segmentClarity:  z.enum(segmentOptions),
  }),

  sales: z.object({
    leadTool:            z.enum(leadToolOptions),
    responseTime:        z.enum(responseOptions),
    followUp:            z.enum(followUpOptions),
    conversionTracking:  z.enum(conversionOpts),
    conversionRateKnown: z.boolean(),
    averageTicketKnown:  z.boolean(),
    forecastLevel:       z.enum(forecastOptions),
    salesTeamSize:       z.enum(salesTeamOpts),
  }),

  operations: z.object({
    processDocumentation: z.boolean(),
    repetitionLevel:      z.enum(repetitionOpts),
    automationLevel:      z.enum(automationOpts),
    errorRate:            z.enum(errorRateOpts),
    qualityControl:       z.boolean(),
    deliveryConsistency:  z.enum(deliveryOpts),
    bottleneck:           z.string().trim().max(200, "Texto demasiado largo").optional(),
  }),

  customers: z.object({
    retentionTracking:   z.enum(retentionOpts),
    feedbackLoop:        z.enum(feedbackOpts),
    supportResponseTime: z.enum(supportTimeOpts),
    complaintResolution: z.boolean(),
    ltvKnown:            z.boolean(),
    referralProgram:     z.enum(referralOpts),
  }),

  data: z.object({
    kpiUsage:           z.enum(kpiOpts),
    reportingFrequency: z.enum(reportingOpts),
    crmErp:             z.enum(crmOpts),
    dashboardExists:    z.boolean(),
    aiToolsUsage:       z.enum(aiToolsOpts),
    decisionMaking:     z.enum(decisionOpts),
  }),

  finance: z.object({
    marginVisibility:       z.enum(marginOpts),
    cashflowControl:        z.enum(cashflowOpts),
    pricingReview:          z.enum(pricingOpts),
    costStructureVisibility: z.enum(costStructOpts),
    profitPerClientKnown:   z.boolean(),
    paymentTerms:           z.enum(paymentTermsOpts),
    financialForecasting:   z.enum(finForecastOpts),
  }),

  risk: z.object({
    backups:          z.boolean(),
    accessControl:    z.boolean(),
    rgpdBasics:       z.boolean(),
    securityUpdates:  z.boolean(),
    incidentResponse: z.boolean(),
    dataEncryption:   z.boolean(),
  }),
});

const contactSchema = z.object({
  wantsEmail:  z.boolean(),
  contactName: z.string().trim().max(120).optional(),
  email:       z.string().trim().optional(),
  companyName: z.string().trim().max(120).optional(),
  website:     z.string().trim().optional(),
  phone:       z.string().trim().optional(),
  consent:     z.boolean(),
}).superRefine((value, ctx) => {
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
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El email no es válido", path: ["email"] });
  }
  const website = value.website?.trim();
  if (website) {
    try {
      const parsed = new URL(website.startsWith("http") ? website : `https://${website}`);
      if (!parsed.hostname.includes(".")) throw new Error("invalid");
    } catch {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "La web no es válida", path: ["website"] });
    }
  }
  const phone = value.phone?.trim();
  if (phone && phone.replace(/\D/g, "").length < 7) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "El teléfono no es válido", path: ["phone"] });
  }
  if (!value.consent) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Debes aceptar la política de privacidad", path: ["consent"] });
  }
});

export const auditSubmissionSchema = auditAnswersSchema.extend({ contact: contactSchema });

// ── TypeScript types ───────────────────────────────────────────────────────────

export type AuditVertical   = (typeof verticalOptions)[number];
export type AuditGoal       = (typeof goalOptions)[number];
export type AuditAnswers    = z.infer<typeof auditAnswersSchema>;
export type AuditContact    = z.infer<typeof contactSchema>;
export type AuditSubmission = z.infer<typeof auditSubmissionSchema>;

export type AuditScores = {
  total:       number;
  digital:     number;
  acquisition: number;
  sales:       number;
  operations:  number;
  customers:   number;
  data:        number;
  finance:     number;
  risk:        number;
};

export type WeakPoint  = { text: string; severity: "critical" | "high" | "medium" };
export type QuickWin   = { text: string; timeframe: string; effort: "low" | "medium"; impact: "high" | "medium" };
export type Opportunity = { title: string; description: string; estimatedImpact: string; timeframe: string };
export type RoadmapPhase = { title: string; goal: string; tasks: string[] };

export type AuditReport = {
  summary:      string[];
  strengths:    string[];
  weakPoints:   WeakPoint[];
  quickWins:    QuickWin[];
  opportunities: Opportunity[];
  roadmap:      RoadmapPhase[];
  impactMatrix: Array<{ label: string; color: "green" | "blue" | "amber" | "red"; items: string[] }>;
  benchmarks:   Record<string, number>;
};

export type AuditResult = { scores: AuditScores; report: AuditReport };

// ── Vertical weights (must each sum to 100) ────────────────────────────────────

const VERTICAL_WEIGHTS: Record<AuditVertical, Omit<AuditScores, "total">> = {
  local:        { digital: 18, acquisition: 22, sales: 12, operations: 14, customers: 14, data:  8, finance:  8, risk:  4 },
  ecommerce:    { digital: 14, acquisition: 20, sales: 14, operations: 15, customers: 12, data: 12, finance:  8, risk:  5 },
  despacho:     { digital: 10, acquisition:  8, sales: 18, operations: 20, customers: 12, data: 10, finance: 14, risk:  8 },
  clinica:      { digital: 10, acquisition: 10, sales: 10, operations: 20, customers: 20, data: 10, finance: 10, risk: 10 },
  restaurante:  { digital: 12, acquisition: 20, sales:  8, operations: 24, customers: 16, data:  8, finance: 10, risk:  2 },
  saas:         { digital: 12, acquisition: 18, sales: 18, operations: 12, customers: 15, data: 15, finance:  7, risk:  3 },
  inmobiliaria: { digital: 12, acquisition: 20, sales: 24, operations: 10, customers: 12, data:  8, finance: 10, risk:  4 },
  educacion:    { digital: 10, acquisition: 22, sales: 15, operations: 12, customers: 16, data: 10, finance: 10, risk:  5 },
};

// ── Industry benchmarks (simulated sector averages) ───────────────────────────

export const INDUSTRY_BENCHMARKS: Record<AuditVertical, Omit<AuditScores, "total">> = {
  local:        { digital: 38, acquisition: 34, sales: 42, operations: 46, customers: 37, data: 25, finance: 32, risk: 26 },
  ecommerce:    { digital: 55, acquisition: 50, sales: 52, operations: 48, customers: 44, data: 52, finance: 40, risk: 35 },
  despacho:     { digital: 35, acquisition: 30, sales: 50, operations: 53, customers: 44, data: 33, finance: 47, risk: 37 },
  clinica:      { digital: 37, acquisition: 32, sales: 40, operations: 56, customers: 53, data: 35, finance: 38, risk: 51 },
  restaurante:  { digital: 42, acquisition: 48, sales: 36, operations: 51, customers: 52, data: 24, finance: 37, risk: 19 },
  saas:         { digital: 63, acquisition: 57, sales: 59, operations: 53, customers: 56, data: 66, finance: 49, risk: 47 },
  inmobiliaria: { digital: 46, acquisition: 53, sales: 61, operations: 39, customers: 41, data: 37, finance: 44, risk: 31 },
  educacion:    { digital: 48, acquisition: 51, sales: 44, operations: 41, customers: 47, data: 39, finance: 37, risk: 27 },
};

// ── Score maps ─────────────────────────────────────────────────────────────────

const sm = {
  website:          { none: 10, basic: 35, ok: 62, optimized: 88 },
  speed:            { slow: 20, ok: 58, fast: 88 },
  seo:              { none: 20, basic: 52, active: 82 },
  brand:            { none: 20, partial: 58, full: 88 },
  channel:          { "boca-oreja": 30, rrss: 52, seo: 68, ads: 70, email: 62, marketplaces: 58, partners: 52, otro: 38 },
  monthlyLeads:     { "0-5": 18, "6-20": 48, "21-50": 72, "50+": 88 },
  content:          { none: 15, sporadic: 38, planned: 68, systematic: 88 },
  paidAds:          { none: 20, testing: 52, optimized: 82 },
  emailMkt:         { none: 15, newsletter: 52, automated: 82 },
  tracking:         { none: 18, basic: 55, events: 88 },
  segment:          { none: 18, basic: 55, defined: 88 },
  leadTool:         { manual: 22, spreadsheet: 44, crm: 72, integrated: 88 },
  response:         { "menos-1h": 92, "mismo-dia": 72, "24-48h": 48, "mas-48h": 22 },
  followUp:         { "sin-proceso": 22, basico: 44, regular: 70, automatizado: 88 },
  conversion:       { none: 22, basic: 55, optimized: 88 },
  forecast:         { none: 22, basic: 55, defined: 88 },
  salesTeam:        { solo: 48, "1-3": 65, "4+": 82 },
  repetition:       { bajo: 82, medio: 54, alto: 22 },
  automation:       { ninguna: 18, "no-code": 50, integraciones: 72, custom: 88 },
  errorRate:        { raro: 82, ocasional: 52, frecuente: 18 },
  delivery:         { variable: 22, mostly: 60, always: 88 },
  retention:        { none: 18, basic: 54, defined: 88 },
  feedback:         { none: 15, sporadic: 50, regular: 82 },
  supportTime:      { hours: 88, days: 55, weeks: 18 },
  referral:         { none: 18, informal: 50, structured: 82 },
  kpi:              { none: 18, basic: 50, defined: 82 },
  reporting:        { nunca: 12, mensual: 50, semanal: 72, diario: 88 },
  crm:              { none: 22, crm: 62, erp: 82 },
  aiTools:          { none: 12, casual: 40, integrated: 70, custom: 88 },
  decision:         { gut: 18, "data-informed": 60, "data-driven": 88 },
  margin:           { unknown: 18, rough: 50, "by-line": 82 },
  cashflow:         { none: 18, monthly: 55, weekly: 82 },
  pricing:          { "no-review": 22, annual: 55, quarterly: 82 },
  costStruct:       { unknown: 18, basic: 54, detailed: 82 },
  paymentTerms:     { immediate: 82, "30d": 55, "60d+": 22 },
  finForecast:      { none: 18, basic: 50, "12m+": 82 },
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function clamp(v: number) {
  if (!Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(100, Math.round(v)));
}

function avg(...values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

// ── Main calculation ───────────────────────────────────────────────────────────

export function calculateAuditResult(answers: AuditAnswers): AuditResult {
  const d = answers.digital;
  const m = answers.marketing;
  const s = answers.sales;
  const o = answers.operations;
  const c = answers.customers;
  const dt = answers.data;
  const f = answers.finance;
  const r = answers.risk;

  const digital = clamp(avg(
    sm.website[d.websiteStatus],
    sm.speed[d.websiteSpeed],
    d.mobileOptimized   ? 82 : 22,
    sm.seo[d.seoStrategy],
    d.valuePropClarity  ? 82 : 22,
    d.ctaClarity        ? 82 : 22,
    sm.brand[d.brandConsistency],
    d.googlePresence    ? 75 : 18,
  ));

  const acquisition = clamp(avg(
    sm.channel[m.mainChannel],
    sm.monthlyLeads[m.monthlyLeads],
    sm.content[m.contentStrategy],
    sm.paidAds[m.paidAds],
    sm.emailMkt[m.emailMarketing],
    sm.tracking[m.tracking],
    sm.segment[m.segmentClarity],
  ));

  const salesScore = clamp(avg(
    sm.leadTool[s.leadTool],
    sm.response[s.responseTime],
    sm.followUp[s.followUp],
    sm.conversion[s.conversionTracking],
    s.conversionRateKnown ? 72 : 22,
    s.averageTicketKnown  ? 68 : 22,
    sm.forecast[s.forecastLevel],
    sm.salesTeam[s.salesTeamSize],
  ));

  const operations = clamp(avg(
    o.processDocumentation ? 75 : 22,
    sm.repetition[o.repetitionLevel],
    sm.automation[o.automationLevel],
    sm.errorRate[o.errorRate],
    o.qualityControl ? 75 : 22,
    sm.delivery[o.deliveryConsistency],
  ));

  const customers = clamp(avg(
    sm.retention[c.retentionTracking],
    sm.feedback[c.feedbackLoop],
    sm.supportTime[c.supportResponseTime],
    c.complaintResolution ? 75 : 22,
    c.ltvKnown            ? 72 : 22,
    sm.referral[c.referralProgram],
  ));

  const data = clamp(avg(
    sm.kpi[dt.kpiUsage],
    sm.reporting[dt.reportingFrequency],
    sm.crm[dt.crmErp],
    dt.dashboardExists ? 78 : 22,
    sm.aiTools[dt.aiToolsUsage],
    sm.decision[dt.decisionMaking],
  ));

  const finance = clamp(avg(
    sm.margin[f.marginVisibility],
    sm.cashflow[f.cashflowControl],
    sm.pricing[f.pricingReview],
    sm.costStruct[f.costStructureVisibility],
    f.profitPerClientKnown ? 75 : 22,
    sm.paymentTerms[f.paymentTerms],
    sm.finForecast[f.financialForecasting],
  ));

  const risk = clamp(
    (r.backups          ? 17 : 0) +
    (r.accessControl    ? 17 : 0) +
    (r.rgpdBasics       ? 17 : 0) +
    (r.securityUpdates  ? 17 : 0) +
    (r.incidentResponse ? 16 : 0) +
    (r.dataEncryption   ? 16 : 0)
  );

  const w = VERTICAL_WEIGHTS[answers.vertical];
  const total = clamp(
    digital     * (w.digital     / 100) +
    acquisition * (w.acquisition / 100) +
    salesScore  * (w.sales       / 100) +
    operations  * (w.operations  / 100) +
    customers   * (w.customers   / 100) +
    data        * (w.data        / 100) +
    finance     * (w.finance     / 100) +
    risk        * (w.risk        / 100)
  );

  const scores: AuditScores = { total, digital, acquisition, sales: salesScore, operations, customers, data, finance, risk };
  return { scores, report: buildReport(answers, scores) };
}

export function scoreBucket(total: number): "0-44" | "45-64" | "65-100" {
  if (total < 45) return "0-44";
  if (total < 65) return "45-64";
  return "65-100";
}

// ── Report generation ──────────────────────────────────────────────────────────

const AREA_LABELS: Record<keyof Omit<AuditScores, "total">, string> = {
  digital:     "presencia digital",
  acquisition: "captación",
  sales:       "ventas",
  operations:  "operaciones",
  customers:   "experiencia de cliente",
  data:        "datos e inteligencia",
  finance:     "finanzas",
  risk:        "seguridad",
};

function buildReport(answers: AuditAnswers, scores: AuditScores): AuditReport {
  const benchmarks = INDUSTRY_BENCHMARKS[answers.vertical] as Record<string, number>;
  const weakPoints   = buildWeakPoints(answers, scores, benchmarks);
  const quickWins    = buildQuickWins(answers);
  const opportunities = buildOpportunities(answers, scores);
  const roadmap      = buildRoadmap(answers, scores, weakPoints);
  const strengths    = buildStrengths(answers, scores, benchmarks);
  const impactMatrix = buildImpactMatrix(answers, quickWins);
  const summary      = buildSummary(answers, scores, weakPoints, benchmarks);

  return { summary, strengths, weakPoints: weakPoints.slice(0, 8), quickWins: quickWins.slice(0, 5), opportunities, roadmap, impactMatrix, benchmarks };
}

// ── Summary ────────────────────────────────────────────────────────────────────

function buildSummary(
  answers: AuditAnswers,
  scores: AuditScores,
  weakPoints: WeakPoint[],
  benchmarks: Record<string, number>
): string[] {
  const bucket = scoreBucket(scores.total);
  const criticalCount = weakPoints.filter(w => w.severity === "critical").length;
  const areas = Object.keys(AREA_LABELS) as Array<keyof Omit<AuditScores, "total">>;
  const sortedByScore = [...areas].sort((a, b) => scores[a] - scores[b]);
  const worstArea = AREA_LABELS[sortedByScore[0]!];
  const bestArea  = AREA_LABELS[sortedByScore[sortedByScore.length - 1]!];

  const aboveBenchmark = areas.filter(a => scores[a] > (benchmarks[a] ?? 50)).length;

  const lines: string[] = [
    bucket === "0-44"
      ? `Nivel actual ${scores.total}/100 — el negocio tiene bases con potencial claro de mejora en las áreas clave.`
      : bucket === "45-64"
      ? `Nivel actual ${scores.total}/100 — estructura sólida con brechas concretas que frenan el crecimiento.`
      : `Nivel actual ${scores.total}/100 — madurez avanzada, el foco debe estar en escalar y optimizar márgenes.`,
    `Tu área más fuerte es ${bestArea}; la prioridad inmediata es ${worstArea}.`,
    criticalCount > 0
      ? `Se detectaron ${criticalCount} brecha${criticalCount > 1 ? "s" : ""} crítica${criticalCount > 1 ? "s" : ""} que requieren atención urgente antes de escalar.`
      : "No hay brechas críticas — el negocio puede crecer de forma estable con los ajustes identificados.",
    `Superas la media del sector en ${aboveBenchmark} de 8 áreas para ${answers.vertical === "local" ? "pymes locales" : answers.vertical === "ecommerce" ? "e-commerce" : answers.vertical === "despacho" ? "despachos" : answers.vertical === "clinica" ? "clínicas" : answers.vertical === "restaurante" ? "restaurantes" : answers.vertical === "saas" ? "SaaS" : answers.vertical === "inmobiliaria" ? "inmobiliarias" : "formación"}.`,
    answers.data.aiToolsUsage === "none"
      ? "La adopción de herramientas de IA es nula — es una ventaja competitiva sin explotar que los negocios de tu sector ya están aprovechando."
      : answers.data.aiToolsUsage === "casual"
      ? "El uso de IA es esporádico — integrarla en flujos clave puede multiplicar la productividad del equipo en semanas."
      : "La integración de IA en operaciones es un diferenciador competitivo que debes consolidar y escalar.",
  ];

  return lines;
}

// ── Strengths ──────────────────────────────────────────────────────────────────

function buildStrengths(
  _answers: AuditAnswers,
  scores: AuditScores,
  benchmarks: Record<string, number>
): string[] {
  const areas = Object.keys(AREA_LABELS) as Array<keyof Omit<AuditScores, "total">>;
  const above = areas
    .filter(a => scores[a] >= 55 && scores[a] > (benchmarks[a] ?? 50))
    .sort((a, b) => (scores[b] - (benchmarks[b] ?? 50)) - (scores[a] - (benchmarks[a] ?? 50)))
    .slice(0, 3);

  if (!above.length) {
    return ["El negocio tiene potencial de mejora en todas las áreas — la buena noticia es que los cambios son concretos y rápidos de implementar."];
  }

  return above.map(a =>
    `${AREA_LABELS[a].charAt(0).toUpperCase() + AREA_LABELS[a].slice(1)} (${scores[a]}/100) — por encima de la media sectorial (${benchmarks[a] ?? "?"}). Punto de apoyo para escalar.`
  );
}

// ── Weak points ────────────────────────────────────────────────────────────────

function buildWeakPoints(
  answers: AuditAnswers,
  scores: AuditScores,
  benchmarks: Record<string, number>
): WeakPoint[] {
  const items: Array<WeakPoint & { priority: number }> = [];

  const add = (text: string, severity: WeakPoint["severity"], priority: number) => {
    items.push({ text, severity, priority });
  };

  // --- Digital
  if (answers.digital.websiteStatus === "none") add("Sin web funcional — canal de captación totalmente cerrado", "critical", 1);
  else if (answers.digital.websiteStatus === "basic") add("Web básica sin conversión — no está atrayendo ni convirtiendo visitas", "high", 2);
  if (!answers.digital.ctaClarity || !answers.digital.valuePropClarity) add("Propuesta de valor y CTA poco claros — el visitante no sabe por qué elegirte ni qué hacer a continuación", "high", 2);
  if (answers.digital.seoStrategy === "none") add("Sin estrategia SEO — dependencia total de tráfico de pago o boca-oreja", "high", 3);
  if (answers.digital.brandConsistency === "none") add("Marca inconsistente entre canales — genera desconfianza y reduce conversión", "medium", 5);
  if (!answers.digital.mobileOptimized) add("Web no optimizada para móvil — más del 60% del tráfico potencial se pierde", "high", 2);

  // --- Marketing
  if (answers.marketing.tracking === "none") add("Sin analítica ni seguimiento del embudo — imposible optimizar lo que no se mide", "critical", 1);
  if (answers.marketing.segmentClarity === "none") add("Sin ICP definido — el mensaje llega a todos y convence a nadie", "critical", 1);
  if (answers.marketing.monthlyLeads === "0-5") add("Volumen de leads muy bajo — el pipeline comercial es insuficiente para crecer", "critical", 1);
  if (answers.marketing.contentStrategy === "none") add("Sin estrategia de contenido — se pierde visibilidad orgánica y autoridad en el sector", "medium", 4);
  if (answers.marketing.emailMarketing === "none") add("Sin email marketing — canal de bajo coste y alto ROI completamente desaprovechado", "medium", 5);

  // --- Sales
  if (answers.sales.leadTool === "manual" || answers.sales.leadTool === "spreadsheet") add("Seguimiento de leads manual — oportunidades perdidas por falta de sistema", "high", 2);
  if (answers.sales.responseTime === "24-48h" || answers.sales.responseTime === "mas-48h") add("Tiempo de respuesta lento — el 50% de clientes elige al proveedor que responde primero", "high", 3);
  if (answers.sales.conversionTracking === "none") add("Sin medición de tasa de cierre — no hay visibilidad sobre dónde se pierden las oportunidades", "high", 3);
  if (answers.sales.forecastLevel === "none") add("Sin forecast comercial — imposible planificar recursos y objetivos de negocio", "medium", 4);
  if (!answers.sales.conversionRateKnown) add("Tasa de conversión desconocida — no hay referencia para mejorar el proceso de venta", "medium", 4);

  // --- Operations
  if (answers.operations.automationLevel === "ninguna" && answers.operations.repetitionLevel === "alto") add("Alto volumen de tareas manuales repetitivas sin ninguna automatización — coste de oportunidad enorme", "critical", 1);
  else if (answers.operations.automationLevel === "ninguna") add("Sin ninguna automatización — el equipo invierte tiempo en trabajo que puede delegarse a sistemas", "high", 3);
  if (answers.operations.errorRate === "frecuente") add("Errores operativos frecuentes — impactan calidad, reputación y satisfacción del cliente", "high", 2);
  if (!answers.operations.processDocumentation) add("Procesos sin documentar — el conocimiento crítico está en la cabeza de personas clave, no en el sistema", "medium", 4);
  if (answers.operations.deliveryConsistency === "variable") add("Inconsistencia en tiempos de entrega — genera desconfianza y dificulta la retención de clientes", "high", 3);

  // --- Customers
  if (answers.customers.retentionTracking === "none") add("Sin seguimiento de retención — no se sabe cuántos clientes se pierden ni por qué", "high", 3);
  if (answers.customers.feedbackLoop === "none") add("Sin medición de satisfacción — las mejoras son intuición, no datos del cliente", "high", 3);
  if (answers.customers.ltvKnown === false) add("LTV por cliente desconocido — imposible priorizar canales de captación y rentabilidad real", "medium", 4);
  if (answers.customers.referralProgram === "none") add("Sin programa de referidos — el boca-oreja más potente no está siendo sistematizado", "medium", 5);
  if (answers.customers.supportResponseTime === "weeks") add("Soporte con respuesta en semanas — nivel de servicio que destruye retención y reputación", "critical", 1);

  // --- Data
  if (answers.data.kpiUsage === "none") add("Sin KPIs definidos — las decisiones de negocio se toman sin datos", "critical", 1);
  if (answers.data.reportingFrequency === "nunca") add("Sin reporting periódico — no hay visibilidad del estado real del negocio", "high", 2);
  if (answers.data.aiToolsUsage === "none" && scores.data < 40) add("Cero adopción de IA — la competencia ya automatiza con IA lo que tu equipo hace manualmente", "medium", 4);
  if (!answers.data.dashboardExists) add("Sin dashboard operativo — la información está dispersa y el tiempo de decisión se multiplica", "medium", 4);

  // --- Finance
  if (answers.finance.marginVisibility === "unknown") add("Margen por servicio/producto desconocido — es imposible saber si el negocio es rentable de verdad", "critical", 1);
  if (answers.finance.cashflowControl === "none") add("Sin control de tesorería — el riesgo de insolvencia técnica es real aunque el negocio sea rentable", "critical", 1);
  if (answers.finance.profitPerClientKnown === false) add("Beneficio por cliente desconocido — sin esta métrica no se puede priorizar qué clientes adquirir y retener", "high", 3);
  if (answers.finance.financialForecasting === "none") add("Sin forecast financiero — las decisiones de inversión y contratación se toman a ciegas", "high", 3);

  // --- Risk
  const riskCount = [!answers.risk.backups, !answers.risk.accessControl, !answers.risk.rgpdBasics, !answers.risk.securityUpdates, !answers.risk.incidentResponse, !answers.risk.dataEncryption].filter(Boolean).length;
  if (riskCount >= 4) add(`${riskCount} de 6 controles de seguridad ausentes — exposición crítica a brechas de datos y sanciones RGPD`, "critical", 1);
  else if (!answers.risk.rgpdBasics) add("Cumplimiento RGPD insuficiente — riesgo de sanciones de hasta 20M€ o el 4% de facturación global", "high", 2);
  else if (!answers.risk.backups || !answers.risk.accessControl) add("Controles de seguridad básicos incompletos — backups o control de accesos pendientes", "medium", 4);

  // Also add benchmark gaps for areas more than 15 pts below sector
  const areaKeys: Array<keyof Omit<AuditScores, "total">> = ["digital", "acquisition", "sales", "operations", "customers", "data", "finance", "risk"];
  for (const key of areaKeys) {
    const gap = (benchmarks[key] ?? 50) - scores[key];
    if (gap > 20 && !items.some(i => i.text.toLowerCase().includes(AREA_LABELS[key].toLowerCase()))) {
      add(`${AREA_LABELS[key].charAt(0).toUpperCase() + AREA_LABELS[key].slice(1)} ${scores[key]}/100 vs ${benchmarks[key]} de media sectorial — brecha significativa frente a la competencia`, "medium", 5);
    }
  }

  return items
    .sort((a, b) => a.priority - b.priority)
    .map(({ text, severity }) => ({ text, severity }));
}

// ── Quick wins ─────────────────────────────────────────────────────────────────

function buildQuickWins(answers: AuditAnswers): QuickWin[] {
  const items: Array<QuickWin & { priority: number }> = [];

  const add = (text: string, timeframe: string, effort: QuickWin["effort"], impact: QuickWin["impact"], priority: number) => {
    items.push({ text, timeframe, effort, impact, priority });
  };

  if (answers.marketing.tracking === "none") add("Instalar GA4 y definir 3 eventos de conversión clave", "3 días", "low", "high", 1);
  if (!answers.digital.ctaClarity || answers.digital.websiteStatus === "basic") add("Reescribir headline y CTA principal de la web con una sola acción clara", "2-3 días", "low", "high", 1);
  if (answers.marketing.segmentClarity === "none") add("Definir ICP en 1 página: perfil, dolor, canal y propuesta de valor", "1 día", "low", "high", 1);
  if (answers.sales.leadTool === "manual" || answers.sales.leadTool === "spreadsheet") add("Migrar pipeline a CRM gratuito (HubSpot Free o Zoho) y definir etapas", "3 días", "low", "high", 1);
  if (answers.risk.backups === false || answers.risk.accessControl === false) add("Activar backups automáticos en nube y revisar permisos de acceso por usuario", "1 día", "low", "high", 1);
  if (answers.finance.marginVisibility === "unknown") add("Calcular margen bruto por servicio o SKU con hoja de cálculo simple", "2 días", "low", "high", 1);
  if (answers.data.kpiUsage === "none") add("Definir 5 KPIs de negocio y crear reporte semanal en Google Sheets o Notion", "2 días", "low", "high", 2);
  if (answers.customers.feedbackLoop === "none") add("Lanzar encuesta NPS/CSAT de 2 preguntas al cierre de cada proyecto o venta", "1 día", "low", "high", 2);
  if (answers.marketing.emailMarketing === "none") add("Crear secuencia de bienvenida de 3 emails para nuevos leads (MailerLite Free)", "4 días", "medium", "medium", 2);
  if (!answers.risk.rgpdBasics) add("Revisar textos legales y banner de cookies según RGPD con checklist básico", "2 días", "low", "high", 2);
  if (answers.sales.responseTime === "24-48h" || answers.sales.responseTime === "mas-48h") add("Crear plantillas de respuesta rápida y definir SLA de respuesta en menos de 4h", "1 día", "low", "high", 2);
  if (answers.operations.repetitionLevel === "alto" && answers.operations.automationLevel === "ninguna") add("Identificar la tarea manual más repetitiva y automatizarla con Make o Zapier (gratis hasta 1000 operaciones/mes)", "5 días", "medium", "high", 2);
  if (answers.finance.cashflowControl === "none") add("Crear previsión de tesorería a 90 días en hoja de cálculo con entradas y salidas fijas", "2 días", "low", "high", 2);
  if (!answers.customers.complaintResolution) add("Definir protocolo de atención a quejas: 3 pasos y SLA de resolución en 24h", "1 día", "low", "medium", 3);
  if (answers.digital.googlePresence === false) add("Completar y optimizar perfil de Google Business Profile con fotos, horario y respuestas", "2 días", "low", "high", 3);

  const fallbacks: QuickWin[] = [
    { text: "Revisar propuesta de valor y eliminar distracciones en la home", timeframe: "2 días", effort: "low", impact: "medium" },
    { text: "Crear pipeline visual con etapas claras para gestionar oportunidades", timeframe: "1 día", effort: "low", impact: "medium" },
    { text: "Hacer reunión semanal de 30min para revisar los 5 KPIs clave", timeframe: "Recurrente", effort: "low", impact: "medium" },
  ];
  let fi = 0;
  while (items.length < 5 && fi < fallbacks.length) {
    items.push({ ...fallbacks[fi]!, priority: 10 });
    fi++;
  }

  return items
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5)
    .map(({ text, timeframe, effort, impact }) => ({ text, timeframe, effort, impact }));
}

// ── Opportunities ──────────────────────────────────────────────────────────────

function buildOpportunities(answers: AuditAnswers, scores: AuditScores): Opportunity[] {
  const candidates: Array<Opportunity & { weight: number }> = [];

  const add = (weight: number, opp: Opportunity) => candidates.push({ weight, ...opp });

  if (scores.acquisition < 45)
    add(10, { title: "Motor de captación consistente", description: "Definir ICP, activar analítica, optimizar el canal principal y lanzar un lead magnet o secuencia de email convierte una captación fragmentada en un flujo predecible.", estimatedImpact: "+40-80% leads cualificados en 60 días", timeframe: "45-60 días" });

  if (scores.digital < 45 && (answers.vertical === "local" || answers.vertical === "ecommerce" || answers.vertical === "restaurante"))
    add(9, { title: "Presencia digital y SEO local", description: "Optimizar web, CTA, Google Business y posicionamiento local genera tráfico orgánico cualificado sin coste por clic.", estimatedImpact: "+30-50% tráfico orgánico en 90 días", timeframe: "60-90 días" });

  if (answers.operations.automationLevel === "ninguna" && answers.operations.repetitionLevel !== "bajo")
    add(9, { title: "Automatización de operaciones críticas", description: "Automatizar los flujos repetitivos más costosos libera tiempo del equipo para tareas de mayor valor y reduce errores operativos sistemáticamente.", estimatedImpact: "15-25h/semana liberadas por persona", timeframe: "30-45 días" });

  if (scores.customers < 45)
    add(8, { title: "Programa de retención y LTV", description: "Implementar feedback, mejorar soporte y activar un programa de referidos puede incrementar el LTV significativamente con la misma base de clientes.", estimatedImpact: "+35-55% LTV medio en 90 días", timeframe: "60-90 días" });

  if (answers.data.aiToolsUsage === "none" || answers.data.aiToolsUsage === "casual")
    add(8, { title: "Adopción estratégica de IA", description: "Integrar herramientas de IA en atención al cliente, generación de contenido y análisis de datos multiplica la capacidad del equipo sin aumentar plantilla.", estimatedImpact: "2-4x productividad en tareas cognitivas", timeframe: "30-60 días" });

  if (scores.finance < 45)
    add(9, { title: "Control financiero y pricing", description: "Conocer el margen real por cliente, controlar el cashflow semanalmente y revisar precios con datos puede aumentar la rentabilidad sin incrementar ventas.", estimatedImpact: "+10-20% margen operativo en 90 días", timeframe: "30-60 días" });

  if (scores.sales < 45)
    add(9, { title: "Pipeline de ventas estructurado", description: "Implementar CRM, definir etapas, medir conversión por etapa y acelerar el tiempo de respuesta puede mejorar dramáticamente la tasa de cierre.", estimatedImpact: "+25-45% tasa de cierre en 60 días", timeframe: "30-60 días" });

  if (answers.marketing.emailMarketing === "none")
    add(7, { title: "Canal de email marketing propio", description: "Construir una lista propia y activar secuencias automáticas es el canal de mayor ROI del marketing digital — completamente independiente de algoritmos.", estimatedImpact: "ROI medio 38:1 vs inversión", timeframe: "30-45 días" });

  if (answers.operations.deliveryConsistency === "variable" && (answers.vertical === "clinica" || answers.vertical === "despacho"))
    add(8, { title: "Estandarización del proceso de entrega", description: "Documentar y sistematizar el proceso de entrega reduce varianza, mejora la percepción de calidad y permite escalar sin perder consistencia.", estimatedImpact: "+20-30% satisfacción del cliente", timeframe: "30-60 días" });

  return candidates
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map(({ title, description, estimatedImpact, timeframe }) => ({ title, description, estimatedImpact, timeframe }));
}

// ── Roadmap ────────────────────────────────────────────────────────────────────

function buildRoadmap(
  answers: AuditAnswers,
  scores: AuditScores,
  weakPoints: WeakPoint[]
): RoadmapPhase[] {
  const critical = weakPoints.filter(w => w.severity === "critical").map(w => w.text);
  const pipeline = answers.vertical === "ecommerce" ? "pedidos" : answers.vertical === "clinica" ? "pacientes" : answers.vertical === "despacho" ? "expedientes" : "leads";

  const phase1Tasks: string[] = [];
  const phase2Tasks: string[] = [];
  const phase3Tasks: string[] = [];

  // Phase 1 — Foundations (0-30 days)
  if (answers.marketing.tracking === "none") phase1Tasks.push("Instalar GA4 con 3 eventos de conversión y conectar Google Search Console");
  if (!answers.digital.ctaClarity || answers.digital.websiteStatus === "basic") phase1Tasks.push("Reoptimizar hero, headline y CTA principal de la web");
  if (answers.marketing.segmentClarity === "none") phase1Tasks.push("Definir ICP (perfil de cliente ideal) con datos y validar con 5 entrevistas");
  if (answers.sales.leadTool === "manual" || answers.sales.leadTool === "spreadsheet") phase1Tasks.push(`Implementar CRM y migrar ${pipeline} actuales con estados de pipeline`);
  if (!answers.risk.backups) phase1Tasks.push("Activar backups automáticos diarios en almacenamiento cloud");
  if (answers.finance.marginVisibility === "unknown") phase1Tasks.push("Calcular margen bruto real por línea de producto/servicio");
  if (answers.data.kpiUsage === "none") phase1Tasks.push("Definir cuadro de mando con 5 KPIs y reporte semanal automático");
  if (!answers.risk.rgpdBasics) phase1Tasks.push("Auditar cumplimiento RGPD: cookies, formularios y textos legales");
  while (phase1Tasks.length < 3) phase1Tasks.push(critical[phase1Tasks.length] ?? "Revisar propuesta de valor y canales de captación activos");
  phase1Tasks.splice(4);

  // Phase 2 — Growth systems (31-60 days)
  if (answers.operations.automationLevel === "ninguna") phase2Tasks.push("Automatizar top-3 tareas repetitivas con Make o Zapier");
  if (answers.marketing.emailMarketing === "none") phase2Tasks.push("Lanzar secuencia email de bienvenida (3 emails) para nuevos leads");
  if (answers.customers.feedbackLoop === "none") phase2Tasks.push("Implementar NPS/CSAT automático al cierre de cada cliente o venta");
  if (!answers.operations.processDocumentation) phase2Tasks.push("Documentar los 5 procesos críticos del negocio en Notion o Confluence");
  if (answers.sales.forecastLevel === "none") phase2Tasks.push("Crear forecast de ventas mensual con pipeline y tasa de cierre histórica");
  if (answers.data.aiToolsUsage === "none") phase2Tasks.push("Evaluar e integrar 2-3 herramientas de IA en el flujo de trabajo del equipo");
  while (phase2Tasks.length < 3) phase2Tasks.push("Optimizar la tasa de conversión en el paso crítico del embudo identificado");
  phase2Tasks.splice(4);

  // Phase 3 — Scale & optimize (61-90 days)
  if (scores.data < 55) phase3Tasks.push("Crear dashboard ejecutivo con todos los KPIs en tiempo real (Looker Studio o Metabase)");
  if (answers.customers.referralProgram === "none") phase3Tasks.push("Lanzar programa de referidos con incentivo para clientes satisfechos");
  if (answers.finance.pricingReview === "no-review") phase3Tasks.push("Revisar estructura de precios con margen real, valor percibido y competencia");
  if (scores.acquisition < 60) phase3Tasks.push("Escalar el canal de captación principal con budget optimizado y A/B testing");
  if (answers.operations.deliveryConsistency !== "always") phase3Tasks.push("Implementar SLAs de entrega y sistema de alerta de desviaciones");
  while (phase3Tasks.length < 3) phase3Tasks.push("Revisar y optimizar la estructura de costes para mejorar margen operativo");
  phase3Tasks.splice(4);

  return [
    { title: "Fase 1 · Días 0-30", goal: "Medición, ICP, herramientas básicas y eliminar riesgos críticos.", tasks: phase1Tasks },
    { title: "Fase 2 · Días 31-60", goal: "Sistemas de crecimiento, automatización y experiencia de cliente.", tasks: phase2Tasks },
    { title: "Fase 3 · Días 61-90", goal: "Escalar, optimizar márgenes y consolidar ventajas competitivas.", tasks: phase3Tasks },
  ];
}

// ── Impact matrix ──────────────────────────────────────────────────────────────

function buildImpactMatrix(answers: AuditAnswers, quickWins: QuickWin[]): AuditReport["impactMatrix"] {
  const highImpactLowEffort = quickWins.filter(q => q.impact === "high" && q.effort === "low").map(q => q.text);
  const highImpactHighEffort: string[] = [
    "Implementar CRM integrado con automatización de seguimiento",
    "Construir dashboard de KPIs en tiempo real para decisión diaria",
  ];
  if (answers.operations.automationLevel === "ninguna" && answers.operations.repetitionLevel === "alto") {
    highImpactHighEffort.unshift("Automatizar el flujo completo de captación a entrega");
  }
  const lowImpactLowEffort: string[] = [
    "Actualizar FAQs y textos de confianza en la web",
    "Unificar plantillas de respuesta y firma de email",
    "Organizar archivos y carpetas en la nube",
  ];
  const lowImpactHighEffort: string[] = [
    "Rediseñar la web completa sin optimizar el proceso de conversión primero",
    "Migrar stack tecnológico sin plan de migración de datos",
  ];

  return [
    { label: "Alto impacto · Bajo esfuerzo", color: "green", items: highImpactLowEffort.slice(0, 3) },
    { label: "Alto impacto · Alto esfuerzo", color: "blue",  items: highImpactHighEffort.slice(0, 3) },
    { label: "Bajo impacto · Bajo esfuerzo", color: "amber", items: lowImpactLowEffort.slice(0, 2) },
    { label: "Evitar ahora · Alto esfuerzo", color: "red",   items: lowImpactHighEffort.slice(0, 2) },
  ];
}
