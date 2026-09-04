"use client";

import React, { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/common/Button";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { trackEvent } from "@/lib/analytics";
import {
  auditSubmissionSchema,
  calculateAuditResult,
  scoreBucket,
  INDUSTRY_BENCHMARKS,
  type AuditAnswers,
  type AuditContact,
  type AuditGoal,
  type AuditResult,
  type AuditVertical,
  type WeakPoint,
  type QuickWin,
  type Opportunity,
} from "@/lib/labs/audit";
// @react-pdf/renderer (pdfkit + yoga-layout, ~526 kB gz) se carga bajo demanda dentro
// de handlePdfDownload: sólo lo descarga quien pulsa "Descargar informe PDF".

// ── Step definitions ───────────────────────────────────────────────────────────

const steps = [
  { id: "1",  title: "Perfil",           summary: "Tipo y tamaño de negocio" },
  { id: "2",  title: "Presencia Digital", summary: "Web, SEO y marca" },
  { id: "3",  title: "Marketing",         summary: "Captación y canales" },
  { id: "4",  title: "Ventas",            summary: "Pipeline y seguimiento" },
  { id: "5",  title: "Operaciones",       summary: "Procesos y automatización" },
  { id: "6",  title: "Clientes",          summary: "Retención y satisfacción" },
  { id: "7",  title: "Datos e IA",        summary: "KPIs, reporting e inteligencia" },
  { id: "8",  title: "Finanzas",          summary: "Margen, cashflow y pricing" },
  { id: "9",  title: "Seguridad",         summary: "Compliance y riesgos" },
  { id: "10", title: "Informe",           summary: "Recibir por email (opcional)" },
  { id: "11", title: "Resultado",         summary: "Diagnóstico completo" },
] as const;

// ── Vertical / Goal / option labels ───────────────────────────────────────────

const VERTICAL_CONFIG: Array<{ value: AuditVertical; label: string; desc: string }> = [
  { value: "local",        label: "Pyme local",           desc: "Negocio local con foco en zona geográfica" },
  { value: "ecommerce",    label: "E-commerce",           desc: "Ventas online, pedidos y logística" },
  { value: "despacho",     label: "Despacho profesional", desc: "Servicios legales, contables o consultoría" },
  { value: "clinica",      label: "Clínica / Salud",      desc: "Centros médicos, dentales, fisioterapia" },
  { value: "restaurante",  label: "Restauración",         desc: "Restaurantes, bares y hostelería" },
  { value: "saas",         label: "SaaS / Tech",          desc: "Software, apps y productos digitales" },
  { value: "inmobiliaria", label: "Inmobiliaria",         desc: "Agencias, promotoras y gestión de activos" },
  { value: "educacion",    label: "Educación",            desc: "Academias, formación y e-learning" },
];

const GOAL_CONFIG: Array<{ value: AuditGoal; label: string; desc: string }> = [
  { value: "captar-leads",    label: "Captar más leads",     desc: "Aumentar el volumen de clientes potenciales" },
  { value: "vender-mas",      label: "Vender más",           desc: "Mejorar conversión y ticket medio" },
  { value: "ahorrar-tiempo",  label: "Ahorrar tiempo",       desc: "Eliminar tareas manuales y ganar eficiencia" },
  { value: "reducir-errores", label: "Reducir errores",      desc: "Aumentar calidad y consistencia operativa" },
  { value: "mejorar-control", label: "Mejorar control",      desc: "Más visibilidad y datos para decidir mejor" },
  { value: "escalar",         label: "Escalar el negocio",   desc: "Crecer sin aumentar costes en la misma proporción" },
  { value: "digitalizar",     label: "Digitalizar procesos", desc: "Llevar el negocio al siguiente nivel tecnologico" },
];

const VERTICAL_LABELS: Record<AuditVertical, string> = Object.fromEntries(
  VERTICAL_CONFIG.map(v => [v.value, v.label])
) as Record<AuditVertical, string>;
const GOAL_LABELS: Record<AuditGoal, string> = Object.fromEntries(
  GOAL_CONFIG.map(g => [g.value, g.label])
) as Record<AuditGoal, string>;

// ── Radar chart ───────────────────────────────────────────────────────────────

const RADAR_AREAS: Array<{ key: keyof Omit<typeof AREA_LABELS, never>; label: string }> = [
  { key: "digital",     label: "Digital" },
  { key: "acquisition", label: "Captación" },
  { key: "sales",       label: "Ventas" },
  { key: "operations",  label: "Operaciones" },
  { key: "customers",   label: "Clientes" },
  { key: "data",        label: "Datos" },
  { key: "finance",     label: "Finanzas" },
  { key: "risk",        label: "Seguridad" },
] as const;

const AREA_LABELS = {
  digital: "Digital", acquisition: "Captación", sales: "Ventas", operations: "Operaciones",
  customers: "Clientes", data: "Datos", finance: "Finanzas", risk: "Seguridad",
};

type RadarScores = Partial<Record<keyof typeof AREA_LABELS, number>>;

function radarPt(score: number, i: number, n: number, r: number, cx: number, cy: number) {
  const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
  return { x: cx + (score / 100) * r * Math.cos(angle), y: cy + (score / 100) * r * Math.sin(angle) };
}

function RadarChart({ scores, benchmarks }: { scores: RadarScores; benchmarks: Record<string, number> }) {
  const n = RADAR_AREAS.length;
  const cx = 80, cy = 82, r = 52, lr = 70;
  const toPoly = (vals: number[]) => vals.map((s, i) => { const p = radarPt(s, i, n, r, cx, cy); return `${p.x},${p.y}`; }).join(" ");
  const gridLines = [25, 50, 75, 100];
  const benchVals = RADAR_AREAS.map(a => benchmarks[a.key] ?? 50);
  const scoreVals = RADAR_AREAS.map(a => scores[a.key] ?? 0);
  return (
    <svg viewBox="0 0 160 164" className="w-full" aria-hidden>
      {gridLines.map(g => <polygon key={g} points={toPoly(Array(n).fill(g))} fill="none" stroke="#E4E6EA" strokeWidth="0.7" />)}
      {RADAR_AREAS.map((_, i) => { const p = radarPt(100, i, n, r, cx, cy); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E4E6EA" strokeWidth="0.7" />; })}
      <polygon points={toPoly(benchVals)} fill="none" stroke="#C9CCD3" strokeWidth="1" strokeDasharray="2,2" />
      <polygon points={toPoly(scoreVals)} fill="rgba(44,75,196,0.10)" stroke="#2C4BC4" strokeWidth="1.5" />
      {scoreVals.map((s, i) => { const p = radarPt(s, i, n, r, cx, cy); return <circle key={i} cx={p.x} cy={p.y} r={s > 0 ? 2.5 : 0} fill="#2C4BC4" />; })}
      {RADAR_AREAS.map((a, i) => {
        const p = radarPt(115, i, n, lr, cx, cy);
        return (
          <text key={a.key} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="7.5" fill="#63666D" fontFamily="system-ui,sans-serif" fontWeight="500">
            {a.label}
          </text>
        );
      })}
    </svg>
  );
}

// ── Score display ──────────────────────────────────────────────────────────────

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!target) return;
    setCount(0);
    const steps = 50;
    const delay = 1500 / steps;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setCount(Math.round((target * i) / steps));
      if (i >= steps) clearInterval(timer);
    }, delay);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}</>;
}

// ── Form components ────────────────────────────────────────────────────────────

function RadioGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{children}</div>;
}

const FIELD_LABEL = "block text-sm font-medium text-[#101014]";
const FIELD_HINT  = "text-[13px] leading-snug text-[#63666D]";
const FIELD_CTRL  = "w-full border border-[#C9CCD3] bg-white px-3 py-2.5 text-sm text-[#101014]";

type RadioCardProps = {
  name: string; value: string; checked: boolean; onChange: () => void;
  title: string; description?: string;
};
function RadioCard({ name, value, checked, onChange, title, description }: RadioCardProps) {
  return (
    <label className={`relative flex cursor-pointer items-start gap-3 border p-4 text-sm transition-colors ${
      checked
        ? "border-[#101014] bg-[#F5F6F8]"
        : "border-[#E4E6EA] bg-white hover:border-[#C9CCD3]"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span aria-hidden className={`mt-1 h-2 w-2 flex-none ${checked ? "bg-brand-600" : "bg-[#C9CCD3]"}`} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium leading-snug text-[#101014]">{title}</span>
        {description && <span className="mt-1 block text-[13px] leading-snug text-[#63666D]">{description}</span>}
      </span>
    </label>
  );
}

type SelectFieldProps = { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; options: ReadonlyArray<{ value: string; label: string }> };
function SelectField({ id, label, hint, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={FIELD_LABEL}>{label}</label>
      {hint && <p className={FIELD_HINT}>{hint}</p>}
      <div className="relative">
        <select id={id} value={value} onChange={e => onChange(e.target.value)}
          className={`${FIELD_CTRL} appearance-none pr-9`}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#63666D]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="m6 8 4 4 4-4" /></svg>
        </span>
      </div>
    </div>
  );
}

type ToggleCardProps = { label: string; description?: string; checked: boolean; onChange: () => void };
function ToggleCard({ label, description, checked, onChange }: ToggleCardProps) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 border px-4 py-3.5 transition-colors ${
      checked ? "border-[#101014] bg-[#F5F6F8]" : "border-[#E4E6EA] bg-white hover:border-[#C9CCD3]"
    }`}>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[#101014]">{label}</span>
        {description && <span className="mt-1 block text-[13px] leading-snug text-[#63666D]">{description}</span>}
      </span>
      <span aria-hidden className={`relative h-5 w-9 flex-none rounded-full transition-colors duration-200 ${checked ? "bg-brand-600" : "bg-[#C9CCD3]"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

type TextInputProps = { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"] };
function TextInput({ id, label, hint, value, onChange, placeholder, inputMode = "text" }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={FIELD_LABEL}>{label}</label>
      {hint && <p className={FIELD_HINT}>{hint}</p>}
      <input id={id} type="text" inputMode={inputMode} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={FIELD_CTRL} />
    </div>
  );
}

function TextAreaInput({ id, label, hint, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={FIELD_LABEL}>{label}</label>
      {hint && <p className={FIELD_HINT}>{hint}</p>}
      <textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder}
        className={`${FIELD_CTRL} resize-none`} />
    </div>
  );
}

function StepHeader({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4 border-b border-[#E4E6EA] pb-5">
      <span className="flex h-10 w-10 flex-none items-center justify-center border border-[#E4E6EA] text-sm font-medium tabular-nums text-[#101014]">
        {String(step).padStart(2, "0")}
      </span>
      <div>
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Paso {step} de 9</p>
        <h4 className="text-lg font-semibold leading-snug tracking-tight text-[#101014]">{title}</h4>
        <p className="mt-1 text-[13px] leading-relaxed text-[#3D4046]">{description}</p>
      </div>
    </div>
  );
}

function SectionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3.5 sm:grid-cols-2">{children}</div>;
}

// ── Result components ──────────────────────────────────────────────────────────

function ScoreBar({ label, value, benchmark }: { label: string; value: number; benchmark: number }) {
  const diff = value - benchmark;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="truncate text-sm text-[#3D4046]">{label}</span>
        <div className="ml-2 flex flex-none items-center gap-3">
          <span className={`text-xs font-medium tabular-nums ${diff >= 0 ? "text-brand-600" : "text-[#9DA0A6]"}`}>
            {diff >= 0 ? "+" : ""}{diff}
          </span>
          <span className="text-sm font-semibold tabular-nums text-[#101014]">{value}</span>
        </div>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden bg-[#E4E6EA]">
        <motion.div className="h-full bg-brand-600" initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.7, ease: "easeOut" }} />
        <div className="absolute top-0 h-full w-px bg-[#101014]" style={{ left: `${benchmark}%` }} title={`Media sector: ${benchmark}`} />
      </div>
      <p className="mt-1.5 text-xs text-[#63666D]">Media sector: {benchmark}</p>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: WeakPoint["severity"] }) {
  const cfg = {
    critical: { label: "Crítico", cls: "border-[#101014] text-[#101014]" },
    high:     { label: "Alto",    cls: "border-[#C9CCD3] text-[#3D4046]" },
    medium:   { label: "Medio",   cls: "border-[#E4E6EA] text-[#63666D]" },
  }[severity];
  return (
    <span className={`inline-flex flex-none items-center border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function EffortBadge({ effort }: { effort: QuickWin["effort"] }) {
  return (
    <span className="inline-flex flex-none items-center border border-[#E4E6EA] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#63666D]">
      {effort === "low" ? "Fácil" : "Medio"}
    </span>
  );
}

function OpportunityCard({ opp, index }: { opp: Opportunity; index: number }) {
  return (
    <motion.div
      className="border border-[#E4E6EA] bg-white p-5"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <p className="mb-3 text-sm font-medium tabular-nums text-[#9DA0A6]">{String(index + 1).padStart(2, "0")}</p>
      <div className="mb-3 flex items-start justify-between gap-3">
        <h5 className="text-sm font-semibold leading-snug tracking-tight text-[#101014]">{opp.title}</h5>
        <span className="whitespace-nowrap text-xs text-[#63666D]">{opp.timeframe}</span>
      </div>
      <p className="mb-4 text-[13px] leading-relaxed text-[#3D4046]">{opp.description}</p>
      <div className="border-t border-[#E4E6EA] pt-3">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Impacto estimado</p>
        <p className="text-sm font-semibold text-brand-600">{opp.estimatedImpact}</p>
      </div>
    </motion.div>
  );
}

function MaturityInfo(score: number): { label: string; description: string; color: string } {
  if (score >= 65) return { label: "Avanzado", description: "Base sólida para escalar.", color: "border-[#101014] text-[#101014]" };
  if (score >= 45) return { label: "En progreso", description: "Prioridades claras y accionables.", color: "border-[#C9CCD3] text-[#101014]" };
  return { label: "Base", description: "Refuerza fundamentos clave.", color: "border-[#E4E6EA] text-[#101014]" };
}

// ── Draft type ────────────────────────────────────────────────────────────────

type AuditDraft = {
  vertical:        AuditVertical | "";
  goal:            AuditGoal    | "";
  companySize:     AuditAnswers["companySize"];
  yearsInBusiness: AuditAnswers["yearsInBusiness"];
  digital:         AuditAnswers["digital"];
  marketing:       AuditAnswers["marketing"];
  sales:           AuditAnswers["sales"];
  operations:      AuditAnswers["operations"];
  customers:       AuditAnswers["customers"];
  data:            AuditAnswers["data"];
  finance:         AuditAnswers["finance"];
  risk:            AuditAnswers["risk"];
  contact:         AuditContact;
};

const initialDraft: AuditDraft = {
  vertical: "", goal: "", companySize: "2-5", yearsInBusiness: "1-3",
  digital: { websiteStatus: "basic", websiteSpeed: "ok", mobileOptimized: false, seoStrategy: "none", valuePropClarity: false, ctaClarity: false, brandConsistency: "none", googlePresence: false },
  marketing: { mainChannel: "boca-oreja", monthlyLeads: "0-5", contentStrategy: "none", paidAds: "none", emailMarketing: "none", tracking: "none", segmentClarity: "none" },
  sales: { leadTool: "manual", responseTime: "24-48h", followUp: "sin-proceso", conversionTracking: "none", conversionRateKnown: false, averageTicketKnown: false, forecastLevel: "none", salesTeamSize: "solo" },
  operations: { processDocumentation: false, repetitionLevel: "medio", automationLevel: "ninguna", errorRate: "ocasional", qualityControl: false, deliveryConsistency: "variable", bottleneck: "" },
  customers: { retentionTracking: "none", feedbackLoop: "none", supportResponseTime: "days", complaintResolution: false, ltvKnown: false, referralProgram: "none" },
  data: { kpiUsage: "none", reportingFrequency: "nunca", crmErp: "none", dashboardExists: false, aiToolsUsage: "none", decisionMaking: "gut" },
  finance: { marginVisibility: "unknown", cashflowControl: "none", pricingReview: "no-review", costStructureVisibility: "unknown", profitPerClientKnown: false, paymentTerms: "30d", financialForecasting: "none" },
  risk: { backups: false, accessControl: false, rgpdBasics: false, securityUpdates: false, incidentResponse: false, dataEncryption: false },
  contact: { wantsEmail: false, contactName: "", email: "", companyName: "", website: "", phone: "", consent: false },
};

function toAnswers(d: AuditDraft): AuditAnswers {
  return { vertical: d.vertical as AuditVertical, goal: d.goal as AuditGoal, companySize: d.companySize, yearsInBusiness: d.yearsInBusiness, digital: d.digital, marketing: d.marketing, sales: d.sales, operations: d.operations, customers: d.customers, data: d.data, finance: d.finance, risk: d.risk };
}

// ── Partial score calculator ───────────────────────────────────────────────────

function computePartialScores(draft: AuditDraft, currentStep: number): RadarScores {
  if (!draft.vertical) return {};
  try {
    const answers = toAnswers(draft);
    const result = calculateAuditResult(answers);
    const stepAreaMap: Record<number, Array<keyof RadarScores>> = {
      1: [], 2: ["digital"], 3: ["digital", "acquisition"], 4: ["sales"], 5: ["operations"],
      6: ["customers"], 7: ["data"], 8: ["finance"], 9: ["risk"],
    };
    const revealed = new Set(Object.values(stepAreaMap).flat().filter((_, i) => i < currentStep + 1));
    const out: RadarScores = {};
    (Object.keys(AREA_LABELS) as Array<keyof RadarScores>).forEach(k => {
      if (revealed.has(k) || currentStep >= 9) out[k] = result.scores[k];
    });
    return out;
  } catch { return {}; }
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AuditWizard() {
  const { preferences } = useCookieConsent();
  const wizardRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AuditDraft>(initialDraft);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [emailSent, setEmailSent] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<"idle" | "loading" | "done">("idle");

  const verticalLabel = draft.vertical ? VERTICAL_LABELS[draft.vertical] : "—";
  const goalLabel     = draft.goal     ? GOAL_LABELS[draft.goal]         : "—";
  const progress      = Math.round((step / (steps.length - 1)) * 100);
  const partialScores = useMemo(() => computePartialScores(draft, step), [draft, step]);
  const benchmarks    = draft.vertical ? (INDUSTRY_BENCHMARKS[draft.vertical] as Record<string, number>) : {};
  const maturity      = result ? MaturityInfo(result.scores.total) : null;

  const scoreCards = result ? [
    { label: "Presencia Digital",  value: result.scores.digital,     bench: benchmarks["digital"] ?? 0 },
    { label: "Marketing / Captación", value: result.scores.acquisition, bench: benchmarks["acquisition"] ?? 0 },
    { label: "Ventas y Pipeline",  value: result.scores.sales,       bench: benchmarks["sales"] ?? 0 },
    { label: "Operaciones",        value: result.scores.operations,  bench: benchmarks["operations"] ?? 0 },
    { label: "Experiencia Cliente",value: result.scores.customers,   bench: benchmarks["customers"] ?? 0 },
    { label: "Datos e Inteligencia",value: result.scores.data,       bench: benchmarks["data"] ?? 0 },
    { label: "Finanzas",           value: result.scores.finance,     bench: benchmarks["finance"] ?? 0 },
    { label: "Seguridad y Compliance", value: result.scores.risk,    bench: benchmarks["risk"] ?? 0 },
  ] : [];

  function validate(): boolean {
    setError("");
    if (step === 0 && (!draft.vertical || !draft.goal)) { setError("Selecciona tipo de negocio y objetivo principal."); return false; }
    return true;
  }

  function goNext() {
    if (!validate()) return;
    if (step === steps.length - 2) {
      // Generate result
      try {
        const answers = toAnswers(draft);
        const calc = calculateAuditResult(answers);
        setResult(calc);
        if (preferences.analytics) trackEvent("audit_completed", { vertical: draft.vertical, goal: draft.goal, score: calc.scores.total, bucket: scoreBucket(calc.scores.total) });
        submit(answers, calc);
      } catch (e) {
        console.error(e);
        setError("Error al calcular el análisis. Comprueba tus respuestas.");
        return;
      }
    }
    setStep(s => Math.min(s + 1, steps.length - 1));
    setTimeout(() => wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  function goBack() { setStep(s => Math.max(s - 1, 0)); }

  async function submit(answers: AuditAnswers, calc: AuditResult) {
    setSubmitStatus("saving");
    try {
      const payload = { ...answers, contact: draft.contact };
      const parsed = auditSubmissionSchema.safeParse(payload);
      if (!parsed.success) { setSubmitStatus("idle"); return; }
      const res = await fetch("/api/labs/analisis-gratis/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.ok) { setSubmitStatus("saved"); setEmailSent(json.emailSent ?? false); }
      else setSubmitStatus("error");
    } catch { setSubmitStatus("error"); }
  }

  async function handlePdfDownload() {
    if (!result || pdfStatus === "loading") return;
    setPdfStatus("loading");
    try {
      const [{ pdf }, { default: AuditReportPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./AuditReportPdf"),
      ]);

      let logoSrc: string | undefined;
      try {
        const res = await fetch("/brand/logo-qubelia-512-dark.png");
        const buf = await res.arrayBuffer();
        const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        logoSrc = `data:image/png;base64,${b64}`;
      } catch { /* logo is optional — fallback to text */ }

      const blob = await pdf(
        <AuditReportPdf
          report={result.report}
          scores={result.scores}
          verticalLabel={verticalLabel}
          goalLabel={goalLabel}
          logoSrc={logoSrc}
        />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "analisis-qubelia.pdf"; a.click();
      URL.revokeObjectURL(url);
      setPdfStatus("done");
    } catch (e) { console.error(e); setPdfStatus("idle"); }
  }

  const nextLabel = step === steps.length - 2 ? "Ver resultado" : step === 0 && (!draft.vertical || !draft.goal) ? "Continuar" : "Siguiente";

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div ref={wizardRef} className="grid grid-cols-1 lg:grid-cols-[220px_1fr_200px] xl:grid-cols-[240px_1fr_220px] gap-6 xl:gap-8 items-start">

      {/* ── LEFT: Step tracker + Radar ───────────────────────────────── */}
      <aside className="order-2 lg:order-none lg:sticky lg:top-24 space-y-6">
        {/* Steps */}
        <div className="border border-[#E4E6EA] bg-white p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Progreso</p>
          <ol className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
            {steps.slice(0, 10).map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <li key={s.id} className="flex items-center gap-3 py-2.5">
                  <span className={`flex h-5 w-5 flex-none items-center justify-center text-[10px] font-medium tabular-nums transition-colors ${
                    done ? "bg-[#101014] text-white" : active ? "bg-brand-600 text-white" : "border border-[#E4E6EA] text-[#9DA0A6]"
                  }`}>
                    {s.id}
                  </span>
                  <span className={`text-xs leading-tight ${active ? "font-semibold text-[#101014]" : done ? "text-[#3D4046]" : "text-[#9DA0A6]"}`}>{s.title}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Live Radar */}
        {draft.vertical && (
          <div className="border border-[#E4E6EA] bg-white p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Tu diagnóstico en tiempo real</p>
            <RadarChart scores={partialScores} benchmarks={benchmarks} />
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center gap-2"><span className="inline-block h-0.5 w-3 bg-brand-600" /><span className="text-[11px] text-[#63666D]">Tu negocio</span></div>
              <div className="flex items-center gap-2"><span className="inline-block w-3 border-t border-dashed border-[#C9CCD3]" /><span className="text-[11px] text-[#63666D]">Media sector</span></div>
            </div>
          </div>
        )}
      </aside>

      {/* ── CENTER: Main form ─────────────────────────────────────────── */}
      <main className="order-1 lg:order-none min-w-0">
        <div className="border border-[#E4E6EA] bg-white">
          {/* Progress bar */}
          <div className="h-1 bg-[#E4E6EA]">
            <motion.div className="h-full bg-brand-600" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="p-6 space-y-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>

                {/* ── STEP 0: Perfil ──────────────────────────────────── */}
                {step === 0 && (
                  <div className="space-y-8">
                    <div>
                      {/* h2, no h3: el encabezado anterior de la página es el h1.
                          La clase text-h3 mantiene la tipografía intacta. */}
                      <h2 className="text-h3 mb-2">Cuéntanos sobre tu negocio</h2>
                      <p className="text-[15px] leading-relaxed text-[#3D4046]">El análisis se personaliza según tu sector y objetivo. Solo tarda 5-8 minutos.</p>
                    </div>
                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Tipo de negocio *</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {VERTICAL_CONFIG.map(v => (
                          <RadioCard key={v.value} name="vertical" value={v.value} checked={draft.vertical === v.value}
                            onChange={() => setDraft(p => ({ ...p, vertical: v.value }))} title={v.label} description={v.desc} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Objetivo principal *</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {GOAL_CONFIG.map(g => (
                          <RadioCard key={g.value} name="goal" value={g.value} checked={draft.goal === g.value}
                            onChange={() => setDraft(p => ({ ...p, goal: g.value }))} title={g.label} description={g.desc} />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <SelectField id="companySize" label="Tamaño del equipo" value={draft.companySize}
                        onChange={v => setDraft(p => ({ ...p, companySize: v as AuditAnswers["companySize"] }))}
                        options={[{ value: "solo", label: "Solo / freelance" }, { value: "2-5", label: "2-5 personas" }, { value: "6-20", label: "6-20 personas" }, { value: "20+", label: "Más de 20" }]} />
                      <SelectField id="years" label="Años en activo" value={draft.yearsInBusiness}
                        onChange={v => setDraft(p => ({ ...p, yearsInBusiness: v as AuditAnswers["yearsInBusiness"] }))}
                        options={[{ value: "menos-1", label: "Menos de 1 año" }, { value: "1-3", label: "1-3 años" }, { value: "3-10", label: "3-10 años" }, { value: "10+", label: "Más de 10 años" }]} />
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Presencia Digital ────────────────────────── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <StepHeader step="1" title="Presencia Digital" description="Web, SEO y marca. La vitrina de tu negocio en internet." />
                    <SectionGrid>
                      <SelectField id="webStatus" label="Estado de la web"
                        hint="¿Tienes web y convierte visitas en contactos?"
                        value={draft.digital.websiteStatus}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, websiteStatus: v as AuditAnswers["digital"]["websiteStatus"] } }))}
                        options={[{ value: "none", label: "Sin web" }, { value: "basic", label: "Web básica (informativa)" }, { value: "ok", label: "Web funcional con CTA" }, { value: "optimized", label: "Web optimizada para conversión" }]} />
                      <SelectField id="webSpeed" label="Velocidad de carga"
                        hint="Google penaliza las webs lentas (Core Web Vitals)."
                        value={draft.digital.websiteSpeed}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, websiteSpeed: v as AuditAnswers["digital"]["websiteSpeed"] } }))}
                        options={[{ value: "slow", label: "Lenta (más de 3 seg)" }, { value: "ok", label: "Normal (1-3 seg)" }, { value: "fast", label: "Rápida (menos de 1 seg)" }]} />
                      <SelectField id="seoStrategy" label="Estrategia SEO"
                        hint="¿Recibes visitas orgánicas de Google de forma consistente?"
                        value={draft.digital.seoStrategy}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, seoStrategy: v as AuditAnswers["digital"]["seoStrategy"] } }))}
                        options={[{ value: "none", label: "Sin SEO activo" }, { value: "basic", label: "SEO básico (keywords, metas)" }, { value: "active", label: "SEO activo y en crecimiento" }]} />
                      <SelectField id="brandConsistency" label="Consistencia de marca"
                        hint="¿Logo, colores y tono son coherentes en todos los canales?"
                        value={draft.digital.brandConsistency}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, brandConsistency: v as AuditAnswers["digital"]["brandConsistency"] } }))}
                        options={[{ value: "none", label: "Inconsistente entre canales" }, { value: "partial", label: "Parcialmente coherente" }, { value: "full", label: "Marca consistente en todo" }]} />
                    </SectionGrid>
                    <div className="space-y-2.5">
                      <ToggleCard label="Web optimizada para móvil" description="El 60%+ del tráfico es móvil. Una web no mobile-first pierde la mayoría de visitantes."
                        checked={draft.digital.mobileOptimized} onChange={() => setDraft(p => ({ ...p, digital: { ...p.digital, mobileOptimized: !p.digital.mobileOptimized } }))} />
                      <ToggleCard label="La propuesta de valor está clara y diferenciada" description="El visitante entiende en 5 segundos qué haces, para quién y por qué elegiría."
                        checked={draft.digital.valuePropClarity} onChange={() => setDraft(p => ({ ...p, digital: { ...p.digital, valuePropClarity: !p.digital.valuePropClarity } }))} />
                      <ToggleCard label="El CTA principal es visible y único" description="Hay una sola acción clara que el visitante debe hacer (agendar, llamar, comprar...)."
                        checked={draft.digital.ctaClarity} onChange={() => setDraft(p => ({ ...p, digital: { ...p.digital, ctaClarity: !p.digital.ctaClarity } }))} />
                      <ToggleCard label="Perfil de Google Business / Maps activo y completo" description="Fundamental para negocios locales: fotos, horario, reseñas y descripción actualizadas."
                        checked={draft.digital.googlePresence} onChange={() => setDraft(p => ({ ...p, digital: { ...p.digital, googlePresence: !p.digital.googlePresence } }))} />
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Marketing ────────────────────────────────── */}
                {step === 2 && (
                  <div className="space-y-5">
                    <StepHeader step="2" title="Marketing y Captación" description="Cómo atraes nuevos clientes y qué volumen genera tu sistema actual." />
                    <SectionGrid>
                      <SelectField id="mainChannel" label="Canal principal de captación"
                        hint="¿Por qué vía llegan la mayoría de tus clientes nuevos?"
                        value={draft.marketing.mainChannel}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, mainChannel: v as AuditAnswers["marketing"]["mainChannel"] } }))}
                        options={[{ value: "boca-oreja", label: "Boca a oreja / referidos" }, { value: "rrss", label: "Redes sociales (orgánico)" }, { value: "seo", label: "SEO / Google orgánico" }, { value: "ads", label: "Publicidad de pago (Google/Meta Ads)" }, { value: "email", label: "Email marketing" }, { value: "marketplaces", label: "Marketplaces / portales" }, { value: "partners", label: "Alianzas y partners" }, { value: "otro", label: "Otro canal" }]} />
                      <SelectField id="monthlyLeads" label="Leads o consultas por mes"
                        hint="Número aproximado de nuevas oportunidades que entran al mes."
                        value={draft.marketing.monthlyLeads}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, monthlyLeads: v as AuditAnswers["marketing"]["monthlyLeads"] } }))}
                        options={[{ value: "0-5", label: "0-5 leads/mes" }, { value: "6-20", label: "6-20 leads/mes" }, { value: "21-50", label: "21-50 leads/mes" }, { value: "50+", label: "Más de 50 leads/mes" }]} />
                      <SelectField id="contentStrategy" label="Estrategia de contenido"
                        hint="Blog, redes, vídeo, podcast... ¿Hay un plan o es esporádico?"
                        value={draft.marketing.contentStrategy}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, contentStrategy: v as AuditAnswers["marketing"]["contentStrategy"] } }))}
                        options={[{ value: "none", label: "Sin contenido" }, { value: "sporadic", label: "Publicaciones esporádicas" }, { value: "planned", label: "Calendario editorial definido" }, { value: "systematic", label: "Contenido sistematizado con métricas" }]} />
                      <SelectField id="paidAds" label="Publicidad de pago (Ads)"
                        hint="Google Ads, Meta Ads, LinkedIn... ¿Inviertes y optimizas?"
                        value={draft.marketing.paidAds}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, paidAds: v as AuditAnswers["marketing"]["paidAds"] } }))}
                        options={[{ value: "none", label: "Sin publicidad de pago" }, { value: "testing", label: "Probando (sin optimizar)" }, { value: "optimized", label: "Activo y optimizado" }]} />
                      <SelectField id="emailMarketing" label="Email marketing"
                        hint="Lista propia, nurturing automático, newsletters..."
                        value={draft.marketing.emailMarketing}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, emailMarketing: v as AuditAnswers["marketing"]["emailMarketing"] } }))}
                        options={[{ value: "none", label: "Sin email marketing" }, { value: "newsletter", label: "Newsletter básica" }, { value: "automated", label: "Secuencias automatizadas" }]} />
                      <SelectField id="tracking" label="Analítica y seguimiento"
                        hint="¿Mides qué canales funcionan y cuáles no?"
                        value={draft.marketing.tracking}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, tracking: v as AuditAnswers["marketing"]["tracking"] } }))}
                        options={[{ value: "none", label: "Sin analítica" }, { value: "basic", label: "GA4 básico (pageviews)" }, { value: "events", label: "Eventos y conversiones definidas" }]} />
                      <SelectField id="segmentClarity" label="Definición del cliente ideal (ICP)"
                        hint="¿Sabes exactamente a quién te diriges, cuál es su dolor y por qué te elige?"
                        value={draft.marketing.segmentClarity}
                        onChange={v => setDraft(p => ({ ...p, marketing: { ...p.marketing, segmentClarity: v as AuditAnswers["marketing"]["segmentClarity"] } }))}
                        options={[{ value: "none", label: "Sin ICP definido" }, { value: "basic", label: "Segmento definido por intuición" }, { value: "defined", label: "ICP documentado con datos" }]} />
                    </SectionGrid>
                  </div>
                )}

                {/* ── STEP 3: Ventas ───────────────────────────────────── */}
                {step === 3 && (
                  <div className="space-y-5">
                    <StepHeader step="3" title="Ventas y Pipeline" description="Cómo gestionas oportunidades desde el primer contacto hasta el cierre." />
                    <SectionGrid>
                      <SelectField id="leadTool" label="Herramienta de seguimiento de leads"
                        hint="¿Dónde vives el estado de cada oportunidad comercial?"
                        value={draft.sales.leadTool}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, leadTool: v as AuditAnswers["sales"]["leadTool"] } }))}
                        options={[{ value: "manual", label: "Manual (WhatsApp, email suelto)" }, { value: "spreadsheet", label: "Hoja de cálculo" }, { value: "crm", label: "CRM básico (HubSpot, Pipedrive...)" }, { value: "integrated", label: "CRM/ERP integrado con el proceso" }]} />
                      <SelectField id="responseTime" label="Tiempo medio de respuesta a leads"
                        hint="El 50% de clientes elige al proveedor que responde primero."
                        value={draft.sales.responseTime}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, responseTime: v as AuditAnswers["sales"]["responseTime"] } }))}
                        options={[{ value: "menos-1h", label: "Menos de 1 hora" }, { value: "mismo-dia", label: "Mismo día" }, { value: "24-48h", label: "24-48 horas" }, { value: "mas-48h", label: "Más de 48 horas" }]} />
                      <SelectField id="followUp" label="Proceso de seguimiento"
                        hint="¿Hay un protocolo definido para hacer follow-up?"
                        value={draft.sales.followUp}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, followUp: v as AuditAnswers["sales"]["followUp"] } }))}
                        options={[{ value: "sin-proceso", label: "Sin proceso definido" }, { value: "basico", label: "Recordatorios básicos" }, { value: "regular", label: "Seguimiento semanal estructurado" }, { value: "automatizado", label: "Follow-up automatizado" }]} />
                      <SelectField id="conversionTracking" label="Medición de conversión por etapa"
                        hint="¿Sabes en qué etapa del proceso se caen más oportunidades?"
                        value={draft.sales.conversionTracking}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, conversionTracking: v as AuditAnswers["sales"]["conversionTracking"] } }))}
                        options={[{ value: "none", label: "No se mide" }, { value: "basic", label: "Medición básica de cierres" }, { value: "optimized", label: "Conversión medida y optimizada por etapa" }]} />
                      <SelectField id="forecastLevel" label="Forecast de ventas"
                        hint="¿Proyectas cuánto vas a facturar el próximo mes y trimestre?"
                        value={draft.sales.forecastLevel}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, forecastLevel: v as AuditAnswers["sales"]["forecastLevel"] } }))}
                        options={[{ value: "none", label: "Sin forecast" }, { value: "basic", label: "Estimación mensual básica" }, { value: "defined", label: "Forecast con escenarios y objetivos" }]} />
                      <SelectField id="salesTeam" label="Equipo de ventas"
                        value={draft.sales.salesTeamSize}
                        onChange={v => setDraft(p => ({ ...p, sales: { ...p.sales, salesTeamSize: v as AuditAnswers["sales"]["salesTeamSize"] } }))}
                        options={[{ value: "solo", label: "Solo (fundador vende)" }, { value: "1-3", label: "1-3 personas de ventas" }, { value: "4+", label: "4 o más comerciales" }]} />
                    </SectionGrid>
                    <div className="space-y-2.5">
                      <ToggleCard label="Conoces tu tasa de conversión real" description="Sabes qué % de leads se convierten en clientes de pago."
                        checked={draft.sales.conversionRateKnown} onChange={() => setDraft(p => ({ ...p, sales: { ...p.sales, conversionRateKnown: !p.sales.conversionRateKnown } }))} />
                      <ToggleCard label="Conoces el ticket medio por cliente" description="Tienes claro cuánto factura de media cada cliente nuevo."
                        checked={draft.sales.averageTicketKnown} onChange={() => setDraft(p => ({ ...p, sales: { ...p.sales, averageTicketKnown: !p.sales.averageTicketKnown } }))} />
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Operaciones ──────────────────────────────── */}
                {step === 4 && (
                  <div className="space-y-5">
                    <StepHeader step="4" title="Operaciones y Procesos" description="Eficiencia interna, automatización y calidad en la entrega." />
                    <SectionGrid>
                      <SelectField id="repetition" label="Nivel de tareas repetitivas"
                        hint="¿Qué proporción del trabajo diario es siempre lo mismo?"
                        value={draft.operations.repetitionLevel}
                        onChange={v => setDraft(p => ({ ...p, operations: { ...p.operations, repetitionLevel: v as AuditAnswers["operations"]["repetitionLevel"] } }))}
                        options={[{ value: "bajo", label: "Bajo — cada proyecto es diferente" }, { value: "medio", label: "Medio — hay tareas recurrentes" }, { value: "alto", label: "Alto — gran parte es repetitivo" }]} />
                      <SelectField id="automation" label="Nivel de automatización"
                        hint="¿Qué herramientas automatizan tareas en tu negocio?"
                        value={draft.operations.automationLevel}
                        onChange={v => setDraft(p => ({ ...p, operations: { ...p.operations, automationLevel: v as AuditAnswers["operations"]["automationLevel"] } }))}
                        options={[{ value: "ninguna", label: "Sin automatización" }, { value: "no-code", label: "No-code básico (Zapier, Make...)" }, { value: "integraciones", label: "Integraciones entre sistemas" }, { value: "custom", label: "Automatización a medida / custom" }]} />
                      <SelectField id="errorRate" label="Frecuencia de errores operativos"
                        hint="Entregas incorrectas, datos perdidos, reprocesos..."
                        value={draft.operations.errorRate}
                        onChange={v => setDraft(p => ({ ...p, operations: { ...p.operations, errorRate: v as AuditAnswers["operations"]["errorRate"] } }))}
                        options={[{ value: "raro", label: "Raramente (sistema fiable)" }, { value: "ocasional", label: "Ocasionalmente" }, { value: "frecuente", label: "Con frecuencia — afecta la entrega" }]} />
                      <SelectField id="deliveryConsistency" label="Consistencia en tiempos de entrega"
                        hint="¿Cumples siempre los plazos prometidos al cliente?"
                        value={draft.operations.deliveryConsistency}
                        onChange={v => setDraft(p => ({ ...p, operations: { ...p.operations, deliveryConsistency: v as AuditAnswers["operations"]["deliveryConsistency"] } }))}
                        options={[{ value: "variable", label: "Variable — hay retrasos frecuentes" }, { value: "mostly", label: "Mayormente cumplidos" }, { value: "always", label: "Siempre en plazo" }]} />
                    </SectionGrid>
                    <div className="space-y-2.5">
                      <ToggleCard label="Procesos críticos documentados" description="Existe un manual o playbook operativo que cualquier persona del equipo puede seguir."
                        checked={draft.operations.processDocumentation} onChange={() => setDraft(p => ({ ...p, operations: { ...p.operations, processDocumentation: !p.operations.processDocumentation } }))} />
                      <ToggleCard label="Control de calidad antes de entregar" description="Hay un checklist o revisión sistemática antes de que el trabajo llegue al cliente."
                        checked={draft.operations.qualityControl} onChange={() => setDraft(p => ({ ...p, operations: { ...p.operations, qualityControl: !p.operations.qualityControl } }))} />
                    </div>
                    <TextAreaInput id="bottleneck" label="¿Cuál es tu mayor cuello de botella? (opcional)" value={draft.operations.bottleneck ?? ""}
                      onChange={v => setDraft(p => ({ ...p, operations: { ...p.operations, bottleneck: v } }))}
                      placeholder="Ej: tardamos demasiado en consolidar datos de ventas y generar informes para el cliente..." hint="Una frase. Max 200 caracteres." />
                  </div>
                )}

                {/* ── STEP 5: Clientes ─────────────────────────────────── */}
                {step === 5 && (
                  <div className="space-y-5">
                    <StepHeader step="5" title="Clientes y Retención" description="Qué tan bien cuidas a los clientes que ya tienes — el activo más valioso." />
                    <SectionGrid>
                      <SelectField id="retentionTracking" label="Seguimiento de retención de clientes"
                        hint="¿Sabes cuántos clientes repiten y cuántos no vuelven?"
                        value={draft.customers.retentionTracking}
                        onChange={v => setDraft(p => ({ ...p, customers: { ...p.customers, retentionTracking: v as AuditAnswers["customers"]["retentionTracking"] } }))}
                        options={[{ value: "none", label: "Sin seguimiento de retención" }, { value: "basic", label: "Seguimiento puntual" }, { value: "defined", label: "Medición por cohortes o segmentos" }]} />
                      <SelectField id="feedbackLoop" label="Medición de satisfacción del cliente"
                        hint="NPS, CSAT o encuestas de salida tras cada proyecto/compra."
                        value={draft.customers.feedbackLoop}
                        onChange={v => setDraft(p => ({ ...p, customers: { ...p.customers, feedbackLoop: v as AuditAnswers["customers"]["feedbackLoop"] } }))}
                        options={[{ value: "none", label: "No medimos satisfacción" }, { value: "sporadic", label: "Feedback puntual / informal" }, { value: "regular", label: "NPS / CSAT recurrente" }]} />
                      <SelectField id="supportTime" label="Tiempo de respuesta de soporte"
                        hint="¿Cuánto tarda el cliente en recibir respuesta cuando tiene un problema?"
                        value={draft.customers.supportResponseTime}
                        onChange={v => setDraft(p => ({ ...p, customers: { ...p.customers, supportResponseTime: v as AuditAnswers["customers"]["supportResponseTime"] } }))}
                        options={[{ value: "hours", label: "Horas (mismo día)" }, { value: "days", label: "1-2 días laborables" }, { value: "weeks", label: "Semanas o sin SLA definido" }]} />
                      <SelectField id="referral" label="Programa de referidos"
                        hint="¿Incentivas activamente que los clientes satisfechos te recomienden?"
                        value={draft.customers.referralProgram}
                        onChange={v => setDraft(p => ({ ...p, customers: { ...p.customers, referralProgram: v as AuditAnswers["customers"]["referralProgram"] } }))}
                        options={[{ value: "none", label: "Sin programa de referidos" }, { value: "informal", label: "Referidos informales / espontáneos" }, { value: "structured", label: "Programa estructurado con incentivo" }]} />
                    </SectionGrid>
                    <div className="space-y-2.5">
                      <ToggleCard label="Protocolo de atención a quejas definido" description="Hay un proceso claro y un SLA de resolución cuando un cliente tiene un problema."
                        checked={draft.customers.complaintResolution} onChange={() => setDraft(p => ({ ...p, customers: { ...p.customers, complaintResolution: !p.customers.complaintResolution } }))} />
                      <ToggleCard label="Conoces el LTV (Lifetime Value) por cliente" description="Sabes cuánto vale en promedio un cliente durante toda su relación con tu negocio."
                        checked={draft.customers.ltvKnown} onChange={() => setDraft(p => ({ ...p, customers: { ...p.customers, ltvKnown: !p.customers.ltvKnown } }))} />
                    </div>
                  </div>
                )}

                {/* ── STEP 6: Datos e IA ───────────────────────────────── */}
                {step === 6 && (
                  <div className="space-y-5">
                    <StepHeader step="6" title="Datos e Inteligencia" description="KPIs, reporting y adopción de IA — la brecha competitiva más rápida de ampliar." />
                    <SectionGrid>
                      <SelectField id="kpiUsage" label="Uso de KPIs de negocio"
                        hint="¿Tienes métricas clave definidas que revisas de forma regular?"
                        value={draft.data.kpiUsage}
                        onChange={v => setDraft(p => ({ ...p, data: { ...p.data, kpiUsage: v as AuditAnswers["data"]["kpiUsage"] } }))}
                        options={[{ value: "none", label: "Sin KPIs definidos" }, { value: "basic", label: "Algunos KPIs sin sistema" }, { value: "defined", label: "KPIs definidos, visibles y revisados" }]} />
                      <SelectField id="reportingFreq" label="Frecuencia de reporting interno"
                        hint="¿Con qué frecuencia revisas el estado del negocio con datos?"
                        value={draft.data.reportingFrequency}
                        onChange={v => setDraft(p => ({ ...p, data: { ...p.data, reportingFrequency: v as AuditAnswers["data"]["reportingFrequency"] } }))}
                        options={[{ value: "nunca", label: "Sin reporting periódico" }, { value: "mensual", label: "Revisión mensual" }, { value: "semanal", label: "Revisión semanal" }, { value: "diario", label: "Dashboard diario" }]} />
                      <SelectField id="crmErp" label="Gestión centralizada de datos (CRM/ERP)"
                        hint="¿Tienes una herramienta donde vive toda la información de clientes?"
                        value={draft.data.crmErp}
                        onChange={v => setDraft(p => ({ ...p, data: { ...p.data, crmErp: v as AuditAnswers["data"]["crmErp"] } }))}
                        options={[{ value: "none", label: "Sin CRM ni ERP" }, { value: "crm", label: "CRM básico" }, { value: "erp", label: "ERP integrado con operaciones" }]} />
                      <SelectField id="aiTools" label="Adopción de herramientas de IA"
                        hint="ChatGPT, Copilot, Midjourney, Claude... ¿Con qué profundidad?"
                        value={draft.data.aiToolsUsage}
                        onChange={v => setDraft(p => ({ ...p, data: { ...p.data, aiToolsUsage: v as AuditAnswers["data"]["aiToolsUsage"] } }))}
                        options={[{ value: "none", label: "Sin uso de IA" }, { value: "casual", label: "Uso esporádico / personal" }, { value: "integrated", label: "IA integrada en flujos de trabajo" }, { value: "custom", label: "IA personalizada y automatizada" }]} />
                      <SelectField id="decisionMaking" label="Base de las decisiones clave"
                        hint="¿Cuándo decides invertir, contratar o pivotar — qué guía la decisión?"
                        value={draft.data.decisionMaking}
                        onChange={v => setDraft(p => ({ ...p, data: { ...p.data, decisionMaking: v as AuditAnswers["data"]["decisionMaking"] } }))}
                        options={[{ value: "gut", label: "Intuición y experiencia" }, { value: "data-informed", label: "Datos como referencia" }, { value: "data-driven", label: "Datos como base principal" }]} />
                    </SectionGrid>
                    <ToggleCard label="Tienes un dashboard operativo en uso" description="Un panel donde ves el estado del negocio en tiempo real sin buscar en hojas de cálculo."
                      checked={draft.data.dashboardExists} onChange={() => setDraft(p => ({ ...p, data: { ...p.data, dashboardExists: !p.data.dashboardExists } }))} />
                  </div>
                )}

                {/* ── STEP 7: Finanzas ─────────────────────────────────── */}
                {step === 7 && (
                  <div className="space-y-5">
                    <StepHeader step="7" title="Finanzas y Rentabilidad" description="Control de márgenes, cashflow y estructura de precios." />
                    <SectionGrid>
                      <SelectField id="marginVis" label="Visibilidad del margen por producto/servicio"
                        hint="¿Sabes qué línea de negocio gana y cuál pierde dinero?"
                        value={draft.finance.marginVisibility}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, marginVisibility: v as AuditAnswers["finance"]["marginVisibility"] } }))}
                        options={[{ value: "unknown", label: "No conozco el margen real" }, { value: "rough", label: "Estimación general" }, { value: "by-line", label: "Margen calculado por línea / cliente" }]} />
                      <SelectField id="cashflow" label="Control de tesorería (cashflow)"
                        hint="¿Anticipas cuánto dinero tendrás en caja el próximo mes?"
                        value={draft.finance.cashflowControl}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, cashflowControl: v as AuditAnswers["finance"]["cashflowControl"] } }))}
                        options={[{ value: "none", label: "Sin control de tesorería" }, { value: "monthly", label: "Control mensual" }, { value: "weekly", label: "Control semanal con previsiones" }]} />
                      <SelectField id="pricingReview" label="Revisión de precios"
                        hint="¿Revisas y ajustas precios con criterios basados en costes y valor?"
                        value={draft.finance.pricingReview}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, pricingReview: v as AuditAnswers["finance"]["pricingReview"] } }))}
                        options={[{ value: "no-review", label: "Sin revisión de precios" }, { value: "annual", label: "Revisión anual" }, { value: "quarterly", label: "Revisión trimestral" }]} />
                      <SelectField id="costStruct" label="Visibilidad de estructura de costes"
                        hint="¿Distingues qué costes son fijos y cuáles variables por proyecto?"
                        value={draft.finance.costStructureVisibility}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, costStructureVisibility: v as AuditAnswers["finance"]["costStructureVisibility"] } }))}
                        options={[{ value: "unknown", label: "Costes sin desglosar" }, { value: "basic", label: "Estimación de costes principales" }, { value: "detailed", label: "Costes detallados por línea / proyecto" }]} />
                      <SelectField id="paymentTerms" label="Condiciones de cobro habituales"
                        hint="El cashflow depende de cuándo cobras — cuanto antes mejor."
                        value={draft.finance.paymentTerms}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, paymentTerms: v as AuditAnswers["finance"]["paymentTerms"] } }))}
                        options={[{ value: "immediate", label: "Pago inmediato o por adelantado" }, { value: "30d", label: "30 días desde factura" }, { value: "60d+", label: "60 días o más" }]} />
                      <SelectField id="finForecast" label="Previsión financiera"
                        hint="¿Proyectas ingresos, gastos y resultados a futuro?"
                        value={draft.finance.financialForecasting}
                        onChange={v => setDraft(p => ({ ...p, finance: { ...p.finance, financialForecasting: v as AuditAnswers["finance"]["financialForecasting"] } }))}
                        options={[{ value: "none", label: "Sin previsión financiera" }, { value: "basic", label: "Previsión básica a 3 meses" }, { value: "12m+", label: "Forecast a 12+ meses" }]} />
                    </SectionGrid>
                    <ToggleCard label="Conoces el beneficio real por cliente" description="Sabes cuánto ganas de media después de costes directos por cada cliente o proyecto."
                      checked={draft.finance.profitPerClientKnown} onChange={() => setDraft(p => ({ ...p, finance: { ...p.finance, profitPerClientKnown: !p.finance.profitPerClientKnown } }))} />
                  </div>
                )}

                {/* ── STEP 8: Seguridad ────────────────────────────────── */}
                {step === 8 && (
                  <div className="space-y-5">
                    <StepHeader step="8" title="Seguridad y Cumplimiento" description="Protección de datos, continuidad del negocio y cumplimiento legal." />
                    <div className="mb-2 border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-[13px] leading-relaxed text-[#3D4046]">
                      El 60% de las pymes que sufren un ciberataque serio cierran en 6 meses. El RGPD puede suponer sanciones de hasta el 4% de la facturación global. Estos controles básicos son no negociables.
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <ToggleCard label="Backups automáticos y verificados" description="Copias de seguridad programadas en la nube, comprobadas regularmente."
                        checked={draft.risk.backups} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, backups: !p.risk.backups } }))} />
                      <ToggleCard label="Acceso por roles y 2FA activado" description="Control de permisos por usuario + doble factor de autenticación."
                        checked={draft.risk.accessControl} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, accessControl: !p.risk.accessControl } }))} />
                      <ToggleCard label="Cumplimiento RGPD básico" description="Política de privacidad, banner de cookies y consentimientos en formularios."
                        checked={draft.risk.rgpdBasics} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, rgpdBasics: !p.risk.rgpdBasics } }))} />
                      <ToggleCard label="Actualizaciones de seguridad al día" description="Sistemas, plugins y software actualizados regularmente."
                        checked={draft.risk.securityUpdates} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, securityUpdates: !p.risk.securityUpdates } }))} />
                      <ToggleCard label="Plan de respuesta a incidentes" description="Hay un protocolo definido para actuar si hay una brecha o pérdida de datos."
                        checked={draft.risk.incidentResponse} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, incidentResponse: !p.risk.incidentResponse } }))} />
                      <ToggleCard label="Datos sensibles cifrados" description="Contraseñas, datos de clientes y documentos críticos están cifrados."
                        checked={draft.risk.dataEncryption} onChange={() => setDraft(p => ({ ...p, risk: { ...p.risk, dataEncryption: !p.risk.dataEncryption } }))} />
                    </div>
                  </div>
                )}

                {/* ── STEP 9: Informe ──────────────────────────────────── */}
                {step === 9 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-h3 mb-2">Análisis completado</h2>
                      <p className="text-[15px] leading-relaxed text-[#3D4046]">Puedes ver el resultado en pantalla ahora mismo. Si quieres recibirlo por email en PDF, rellena los datos opcionales.</p>
                    </div>
                    <ToggleCard label="Quiero recibir el informe completo por email (PDF)"
                      description="Sin registro. Solo si quieres conservarlo o compartirlo."
                      checked={draft.contact.wantsEmail} onChange={() => setDraft(p => ({ ...p, contact: { ...p.contact, wantsEmail: !p.contact.wantsEmail } }))} />
                    {draft.contact.wantsEmail && (
                      <div className="space-y-4">
                        <div className="grid gap-3.5 sm:grid-cols-2">
                          <TextInput id="contactName" label="Nombre" value={draft.contact.contactName ?? ""} onChange={v => setDraft(p => ({ ...p, contact: { ...p.contact, contactName: v } }))} placeholder="Ana García" />
                          <TextInput id="email" label="Email *" value={draft.contact.email ?? ""} onChange={v => setDraft(p => ({ ...p, contact: { ...p.contact, email: v } }))} placeholder="ana@empresa.com" inputMode="email" />
                          <TextInput id="company" label="Empresa" value={draft.contact.companyName ?? ""} onChange={v => setDraft(p => ({ ...p, contact: { ...p.contact, companyName: v } }))} placeholder="Mi Empresa SL" />
                          <TextInput id="website" label="Web" value={draft.contact.website ?? ""} onChange={v => setDraft(p => ({ ...p, contact: { ...p.contact, website: v } }))} placeholder="miempresa.es" />
                          <TextInput id="phone" label="Teléfono" value={draft.contact.phone ?? ""} onChange={v => setDraft(p => ({ ...p, contact: { ...p.contact, phone: v } }))} placeholder="+34 600 000 000" inputMode="tel" />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" checked={draft.contact.consent} onChange={e => setDraft(p => ({ ...p, contact: { ...p.contact, consent: e.target.checked } }))} className="mt-1 h-4 w-4" />
                          <span className="text-[13px] leading-relaxed text-[#3D4046]">
                            He leído y acepto la <a href="/legal/privacidad" className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600">Política de privacidad</a>. Qubelia usará estos datos solo para enviarme el informe y contactar si lo solicito.
                          </span>
                        </label>
                      </div>
                    )}
                    <div className="border border-[#E4E6EA] bg-[#F5F6F8] p-4 text-[13px] leading-relaxed text-[#3D4046]">
                      Sin PII en analytics. Email opcional y nunca obligatorio. El informe está disponible en pantalla sin registro.
                    </div>
                  </div>
                )}

                {/* ── STEP 10: Resultado ───────────────────────────────── */}
                {step === 10 && !result && (
                  <div className="flex items-center justify-center py-16">
                    <p className="text-sm text-[#63666D]">Generando tu análisis...</p>
                  </div>
                )}

                {step === 10 && result && (
                  <div className="space-y-6">
                    {/* Hero score */}
                    <motion.div
                      className="border border-[#E4E6EA] bg-white p-6"
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-6">
                        <div>
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Puntuación global</p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-semibold tabular-nums tracking-tight text-[#101014]">
                              <AnimatedCounter target={result.scores.total} />
                            </span>
                            <span className="text-2xl font-semibold text-[#9DA0A6]">/100</span>
                          </div>
                          <p className="mt-2 text-sm text-[#63666D]">{verticalLabel} · {goalLabel}</p>
                        </div>
                        {maturity && (
                          <div className={`border px-4 py-3 ${maturity.color}`}>
                            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Nivel de madurez</p>
                            <p className="text-lg font-semibold tracking-tight">{maturity.label}</p>
                            <p className="mt-0.5 text-xs text-[#63666D]">{maturity.description}</p>
                          </div>
                        )}
                        <div className="w-full sm:w-52">
                          <RadarChart scores={result.scores} benchmarks={benchmarks} />
                        </div>
                      </div>
                      <div className="mt-6 h-1.5 w-full overflow-hidden bg-[#E4E6EA]">
                        <motion.div
                          className="h-full bg-brand-600"
                          initial={{ width: 0 }} animate={{ width: `${result.scores.total}%` }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                        />
                      </div>
                    </motion.div>

                    {/* Summary */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Resumen ejecutivo</p>
                      <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                        {result.report.summary.map((item, i) => (
                          <motion.li key={i} className="py-3 text-sm leading-relaxed text-[#3D4046]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Score breakdown */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Puntuación por área vs media del sector</p>
                        <span className="text-xs text-[#9DA0A6]">Línea = media sectorial</span>
                      </div>
                      <div className="space-y-5">
                        {scoreCards.map(item => (
                          <ScoreBar key={item.label} label={item.label} value={item.value} benchmark={item.bench} />
                        ))}
                      </div>
                    </div>

                    {/* Strengths */}
                    {result.report.strengths.length > 0 && (
                      <div className="border border-[#E4E6EA] bg-white p-6">
                        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Puntos fuertes detectados</p>
                        <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                          {result.report.strengths.map((item, i) => (
                            <li key={i} className="py-3 text-sm leading-relaxed text-[#3D4046]">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Weak points */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Brechas identificadas por prioridad</p>
                      <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                        {result.report.weakPoints.map((item, i) => (
                          <motion.li key={i} className="flex items-start gap-4 py-3.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                            <span className="mt-0.5 flex-none text-sm font-medium tabular-nums text-[#9DA0A6]">{String(i + 1).padStart(2, "0")}</span>
                            <p className="min-w-0 flex-1 text-sm leading-snug text-[#3D4046]">{item.text}</p>
                            <SeverityBadge severity={item.severity} />
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div>
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Top 3 oportunidades de crecimiento</p>
                      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3">
                        {result.report.opportunities.map((opp, i) => (
                          <OpportunityCard key={i} opp={opp} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* Quick wins */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Quick wins — acciones para esta semana</p>
                      <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                        {result.report.quickWins.map((item, i) => (
                          <li key={i} className="flex items-start gap-4 py-3.5">
                            <span className="mt-0.5 flex-none text-sm font-medium tabular-nums text-[#9DA0A6]">{String(i + 1).padStart(2, "0")}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm leading-snug text-[#3D4046]">{item.text}</p>
                              <p className="mt-1 text-xs text-[#63666D]">{item.timeframe}</p>
                            </div>
                            <EffortBadge effort={item.effort} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Roadmap */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Hoja de ruta 90 días</p>
                      <div className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                        {result.report.roadmap.map((phase, pi) => (
                          <div key={pi} className="flex gap-5 py-5">
                            <span className="flex-none text-2xl font-light leading-none tabular-nums text-[#9DA0A6]">
                              {String(pi + 1).padStart(2, "0")}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold tracking-tight text-[#101014]">{phase.title}</p>
                              <p className="mt-1 mb-3 text-[13px] text-[#63666D]">{phase.goal}</p>
                              <ul className="space-y-1.5">
                                {phase.tasks.map((task, ti) => (
                                  <li key={ti} className="flex gap-2 text-[13px] leading-snug text-[#3D4046]">
                                    <span aria-hidden className="text-brand-600">·</span>
                                    <span>{task}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Impact matrix */}
                    <div className="border border-[#E4E6EA] bg-white p-6">
                      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Matriz impacto vs esfuerzo</p>
                      <div className="grid gap-px bg-[#E4E6EA] sm:grid-cols-2">
                        {result.report.impactMatrix.map(group => (
                          <div key={group.label} className="bg-white p-4">
                            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#101014]">{group.label}</p>
                            <ul className="space-y-1.5">
                              {group.items.map(item => (
                                <li key={item} className="flex gap-2 text-[13px] leading-snug text-[#3D4046]">
                                  <span aria-hidden className="text-[#9DA0A6]">·</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Personalized CTA */}
                    <motion.div
                      className="band-dark p-6 sm:p-8"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Siguiente paso recomendado</p>
                      <p className="mb-3 text-lg font-semibold leading-snug tracking-tight text-white">
                        {result.scores.total < 45
                          ? "Tu negocio tiene un potencial enorme sin explotar. En 90 días podemos transformar las brechas críticas en ventajas competitivas."
                          : result.scores.total < 65
                          ? "Estás más cerca de donde quieres estar de lo que crees. El plan está claro — necesitas el equipo que lo ejecute."
                          : "Base sólida. El siguiente nivel requiere sistemas, datos e IA bien integrados para escalar sin fricción."}
                      </p>
                      <p className="mb-6 text-sm leading-relaxed text-white/70">Agenda una llamada de 45 min con nuestro equipo — sin compromiso. Revisamos tu caso y te dejamos un plan accionable.</p>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                          href="/#contacto"
                          className="inline-flex items-center justify-center rounded-[2px] bg-white px-6 py-3 text-sm font-medium tracking-tight text-[#101014] transition-colors hover:bg-white/90"
                        >
                          Agendar diagnóstico gratuito
                        </a>
                        <button
                          type="button"
                          onClick={handlePdfDownload}
                          disabled={pdfStatus === "loading"}
                          className="inline-flex items-center justify-center rounded-[2px] border border-white/30 px-6 py-3 text-sm font-medium tracking-tight text-white transition-colors hover:border-white disabled:pointer-events-none disabled:opacity-50"
                        >
                          {pdfStatus === "loading" ? "Generando PDF…" : pdfStatus === "done" ? "PDF descargado" : "Descargar informe PDF"}
                        </button>
                      </div>
                    </motion.div>

                    {submitStatus === "saved" && <p className="text-xs text-[#63666D]">Análisis guardado.{emailSent ? " PDF enviado a tu email." : ""}</p>}
                    {submitStatus === "error" && <p className="text-xs text-[#63666D]">No se pudo guardar el análisis. El PDF sigue disponible en pantalla.</p>}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div className="border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm text-[#101014]">{error}</div>
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-3 border-t border-[#E4E6EA] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="ghost" onClick={goBack} disabled={step === 0} className="w-full sm:w-auto">Anterior</Button>
              {step < steps.length - 1 ? (
                <Button variant="primary" onClick={goNext} className="w-full sm:w-auto">{nextLabel}</Button>
              ) : (
                <Button variant="ghost" onClick={() => { setStep(0); setResult(null); setDraft(initialDraft); setSubmitStatus("idle"); }} className="w-full sm:w-auto">Repetir análisis</Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── RIGHT: Summary + CTA ─────────────────────────────────────── */}
      <aside className="order-3 lg:order-none space-y-6 lg:sticky lg:top-24">
        <div className="border border-[#E4E6EA] bg-white p-5">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Tu análisis</p>
          <dl className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
            {[
              { label: "Sector", value: verticalLabel },
              { label: "Objetivo", value: goalLabel },
              { label: "Paso", value: `${steps[step]?.id ?? "?"} / ${steps.length}` },
              { label: "Score", value: result ? `${result.scores.total}/100` : "—" },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between gap-2 py-2.5 text-xs">
                <dt className="text-[#63666D]">{row.label}</dt>
                <dd className="max-w-[120px] truncate text-right font-medium text-[#101014]">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5">
            <div className="h-1 w-full overflow-hidden bg-[#E4E6EA]">
              <motion.div className="h-full bg-brand-600" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
            <p className="mt-2 text-xs text-[#63666D]">{progress}% completado</p>
          </div>
        </div>

        <div className="border border-[#E4E6EA] bg-white p-5">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Privacidad</p>
          <p className="mb-4 text-[13px] leading-relaxed text-[#3D4046]">Sin registro. Email opcional. Tus datos no se usan en analytics sin consentimiento.</p>
          <p className="border-l-2 border-brand-600 bg-[#F5F6F8] px-3 py-2.5 text-xs text-[#3D4046]">
            Sin PII en eventos analíticos
          </p>
        </div>

        {step < 10 && (
          <div className="border border-[#E4E6EA] bg-white p-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">¿Prefieres hablar?</p>
            <p className="mb-5 text-[13px] leading-relaxed text-[#3D4046]">45 min con nuestro equipo. Dejamos un plan accionable — sin compromiso.</p>
            <Button as="a" href="/#contacto" variant="primary" size="sm" className="w-full">Agendar ahora</Button>
          </div>
        )}
      </aside>

    </div>
  );
}
