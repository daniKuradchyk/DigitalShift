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
import AuditReportPdf from "./AuditReportPdf";
import { pdf } from "@react-pdf/renderer";

// ── Step definitions ───────────────────────────────────────────────────────────

const steps = [
  { id: "1",  title: "Perfil",           summary: "Tipo y tamaño de negocio" },
  { id: "2",  title: "Presencia Digital", summary: "Web, SEO y marca" },
  { id: "3",  title: "Marketing",         summary: "Captacion y canales" },
  { id: "4",  title: "Ventas",            summary: "Pipeline y seguimiento" },
  { id: "5",  title: "Operaciones",       summary: "Procesos y automatizacion" },
  { id: "6",  title: "Clientes",          summary: "Retencion y satisfaccion" },
  { id: "7",  title: "Datos e IA",        summary: "KPIs, reporting e inteligencia" },
  { id: "8",  title: "Finanzas",          summary: "Margen, cashflow y pricing" },
  { id: "9",  title: "Seguridad",         summary: "Compliance y riesgos" },
  { id: "10", title: "Informe",           summary: "Recibir por email (opcional)" },
  { id: "11", title: "Resultado",         summary: "Diagnostico completo" },
] as const;

// ── Vertical / Goal / option labels ───────────────────────────────────────────

const VERTICAL_CONFIG: Array<{ value: AuditVertical; emoji: string; label: string; desc: string }> = [
  { value: "local",        emoji: "🏪", label: "Pyme local",         desc: "Negocio local con foco en zona geografica" },
  { value: "ecommerce",    emoji: "🛍️", label: "E-commerce",         desc: "Ventas online, pedidos y logistica" },
  { value: "despacho",     emoji: "⚖️", label: "Despacho profesional", desc: "Servicios legales, contables o consultoria" },
  { value: "clinica",      emoji: "🏥", label: "Clinica / Salud",    desc: "Centros medicos, dentales, fisioterapia" },
  { value: "restaurante",  emoji: "🍽️", label: "Restauracion",       desc: "Restaurantes, bares y hosteleria" },
  { value: "saas",         emoji: "💻", label: "SaaS / Tech",        desc: "Software, apps y productos digitales" },
  { value: "inmobiliaria", emoji: "🏠", label: "Inmobiliaria",       desc: "Agencias, promotoras y gestion de activos" },
  { value: "educacion",    emoji: "🎓", label: "Educacion",          desc: "Academias, formacion y e-learning" },
];

const GOAL_CONFIG: Array<{ value: AuditGoal; emoji: string; label: string; desc: string }> = [
  { value: "captar-leads",   emoji: "🎯", label: "Captar mas leads",       desc: "Aumentar el volumen de clientes potenciales" },
  { value: "vender-mas",     emoji: "📈", label: "Vender mas",             desc: "Mejorar conversion y ticket medio" },
  { value: "ahorrar-tiempo", emoji: "⚡", label: "Ahorrar tiempo",         desc: "Eliminar tareas manuales y ganar eficiencia" },
  { value: "reducir-errores",emoji: "🛡️", label: "Reducir errores",        desc: "Aumentar calidad y consistencia operativa" },
  { value: "mejorar-control",emoji: "📊", label: "Mejorar control",        desc: "Mas visibilidad y datos para decidir mejor" },
  { value: "escalar",        emoji: "🚀", label: "Escalar el negocio",     desc: "Crecer sin aumentar costes en la misma proporcion" },
  { value: "digitalizar",    emoji: "🔄", label: "Digitalizar procesos",   desc: "Llevar el negocio al siguiente nivel tecnologico" },
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
  { key: "acquisition", label: "Captacion" },
  { key: "sales",       label: "Ventas" },
  { key: "operations",  label: "Operaciones" },
  { key: "customers",   label: "Clientes" },
  { key: "data",        label: "Datos" },
  { key: "finance",     label: "Finanzas" },
  { key: "risk",        label: "Seguridad" },
] as const;

const AREA_LABELS = {
  digital: "Digital", acquisition: "Captacion", sales: "Ventas", operations: "Operaciones",
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
      {gridLines.map(g => <polygon key={g} points={toPoly(Array(n).fill(g))} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="0.7" />)}
      {RADAR_AREAS.map((_, i) => { const p = radarPt(100, i, n, r, cx, cy); return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.7" />; })}
      <polygon points={toPoly(benchVals)} fill="rgba(99,102,241,0.10)" stroke="rgba(99,102,241,0.30)" strokeWidth="1" strokeDasharray="2,2" />
      <polygon points={toPoly(scoreVals)} fill="rgba(14,165,233,0.18)" stroke="rgba(14,165,233,0.75)" strokeWidth="1.5" />
      {scoreVals.map((s, i) => { const p = radarPt(s, i, n, r, cx, cy); return <circle key={i} cx={p.x} cy={p.y} r={s > 0 ? 2.5 : 0} fill="rgba(14,165,233,0.9)" />; })}
      {RADAR_AREAS.map((a, i) => {
        const p = radarPt(115, i, n, lr, cx, cy);
        return (
          <text key={a.key} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="7.5" fill="rgba(148,163,184,0.85)" fontFamily="system-ui,sans-serif" fontWeight="500">
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

type RadioCardProps = {
  name: string; value: string; checked: boolean; onChange: () => void;
  emoji?: string; title: string; description?: string;
};
function RadioCard({ name, value, checked, onChange, emoji, title, description }: RadioCardProps) {
  return (
    <label className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border p-3.5 text-sm transition-all duration-150 focus-within:ring-2 focus-within:ring-sky-500/25 ${
      checked
        ? "border-sky-400/70 bg-sky-500/[0.09] shadow-[0_0_0_1px_rgba(14,165,233,0.25)]"
        : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.04]"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {emoji && (
        <span className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg text-lg transition-colors ${
          checked ? "bg-sky-500/20" : "bg-white/[0.05]"
        }`}>{emoji}</span>
      )}
      <div className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold leading-snug ${checked ? "text-sky-200" : "text-slate-100"}`}>{title}</span>
        {description && <span className="block text-[11px] text-slate-400 mt-0.5 leading-snug">{description}</span>}
      </div>
      {checked && (
        <span className="flex-none text-sky-400 ml-1">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </label>
  );
}

type SelectFieldProps = { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; options: ReadonlyArray<{ value: string; label: string }> };
function SelectField({ id, label, hint, value, onChange, options }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</label>
      {hint && <p className="text-[11px] text-slate-500 leading-snug">{hint}</p>}
      <div className="relative">
        <select id={id} value={value} onChange={e => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 pr-9 text-sm text-slate-100 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 [color-scheme:dark]">
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m6 8 4 4 4-4" /></svg>
        </span>
      </div>
    </div>
  );
}

type ToggleCardProps = { label: string; description?: string; checked: boolean; onChange: () => void };
function ToggleCard({ label, description, checked, onChange }: ToggleCardProps) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-colors ${
      checked ? "border-sky-400/50 bg-sky-500/[0.07]" : "border-white/[0.07] bg-white/[0.025] hover:bg-white/[0.04]"
    }`}>
      <span className="min-w-0">
        <span className={`block text-sm font-semibold ${checked ? "text-slate-100" : "text-slate-200"}`}>{label}</span>
        {description && <span className="block text-[11px] text-slate-400 mt-0.5">{description}</span>}
      </span>
      <span aria-hidden className={`relative h-5 w-9 flex-none rounded-full transition-colors duration-200 ${checked ? "bg-sky-500" : "bg-white/[0.10]"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

type TextInputProps = { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"] };
function TextInput({ id, label, hint, value, onChange, placeholder, inputMode = "text" }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</label>
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
      <input id={id} type="text" inputMode={inputMode} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20" />
    </div>
  );
}

function TextAreaInput({ id, label, hint, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</label>
      {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
      <textarea id={id} value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 resize-none" />
    </div>
  );
}

function StepHeader({ step, title, description, icon }: { step: string; title: string; description: string; icon: string }) {
  return (
    <div className="flex items-start gap-3 pb-5 border-b border-white/[0.06]">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sky-500/20 text-xl">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-0.5">Paso {step} de 9</p>
        <h4 className="text-base font-bold text-white leading-snug">{title}</h4>
        <p className="text-xs text-slate-400 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function SectionGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3.5 sm:grid-cols-2">{children}</div>;
}

// ── Result components ──────────────────────────────────────────────────────────

function ScoreBar({ label, value, benchmark }: { label: string; value: number; benchmark: number }) {
  const color = value >= 70 ? "bg-emerald-400" : value >= 45 ? "bg-sky-400" : "bg-amber-400";
  const diff = value - benchmark;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-slate-300 truncate">{label}</span>
        <div className="flex items-center gap-2 ml-2 flex-none">
          <span className={`text-[10px] font-semibold ${diff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
            {diff >= 0 ? "+" : ""}{diff}
          </span>
          <span className="text-xs font-bold tabular-nums text-slate-200">{value}</span>
        </div>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div className={`h-full rounded-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut" }} />
        <div className="absolute top-0 h-full w-px bg-indigo-400/50" style={{ left: `${benchmark}%` }} title={`Media sector: ${benchmark}`} />
      </div>
      <p className="mt-0.5 text-[10px] text-slate-600">Media sector: {benchmark}</p>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: WeakPoint["severity"] }) {
  const cfg = {
    critical: { label: "Crítico", cls: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
    high:     { label: "Alto",    cls: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
    medium:   { label: "Medio",   cls: "bg-slate-500/15 text-slate-300 border-slate-500/25" },
  }[severity];
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function EffortBadge({ effort }: { effort: QuickWin["effort"] }) {
  return (
    <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${effort === "low" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
      {effort === "low" ? "↗ Facil" : "⚙ Medio"}
    </span>
  );
}

function OpportunityCard({ opp, index }: { opp: Opportunity; index: number }) {
  const colors = ["from-sky-500/10 to-sky-500/5 border-sky-500/20", "from-violet-500/10 to-violet-500/5 border-violet-500/20", "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20"];
  const accentColors = ["text-sky-300", "text-violet-300", "text-emerald-300"];
  return (
    <motion.div
      className={`rounded-2xl border bg-gradient-to-br p-5 ${colors[index % 3]}`}
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h5 className={`text-sm font-bold leading-snug ${accentColors[index % 3]}`}>{opp.title}</h5>
        <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">{opp.timeframe}</span>
      </div>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">{opp.description}</p>
      <div className="rounded-lg bg-white/[0.05] px-3 py-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">Impacto estimado</p>
        <p className={`text-sm font-bold ${accentColors[index % 3]}`}>{opp.estimatedImpact}</p>
      </div>
    </motion.div>
  );
}

function MaturityInfo(score: number): { label: string; description: string; color: string; glow: string } {
  if (score >= 65) return { label: "Avanzado", description: "Base sólida para escalar.", color: "text-emerald-300 border-emerald-500/30 bg-emerald-500/[0.08]", glow: "shadow-emerald-500/10" };
  if (score >= 45) return { label: "En progreso", description: "Prioridades claras y accionables.", color: "text-sky-300 border-sky-500/30 bg-sky-500/[0.08]", glow: "shadow-sky-500/10" };
  return { label: "Base", description: "Refuerza fundamentos clave.", color: "text-amber-300 border-amber-500/30 bg-amber-500/[0.08]", glow: "shadow-amber-500/10" };
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
    { label: "Marketing / Captacion", value: result.scores.acquisition, bench: benchmarks["acquisition"] ?? 0 },
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
        setError("Error al calcular el analisis. Comprueba tus respuestas.");
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
      <aside className="order-2 lg:order-none lg:sticky lg:top-24 space-y-4">
        {/* Steps */}
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">Progreso</p>
          <div className="space-y-1">
            {steps.slice(0, 10).map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div key={s.id} className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${active ? "bg-sky-500/10" : ""}`}>
                  <div className={`h-5 w-5 flex-none rounded-full flex items-center justify-center text-[9px] font-bold transition-colors ${done ? "bg-emerald-500 text-white" : active ? "bg-sky-500 text-white" : "bg-white/[0.06] text-slate-500"}`}>
                    {done ? "✓" : s.id}
                  </div>
                  <span className={`text-[11px] leading-tight ${active ? "text-sky-300 font-semibold" : done ? "text-slate-400" : "text-slate-500"}`}>{s.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Radar */}
        {draft.vertical && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-2">Tu diagnóstico en tiempo real</p>
            <RadarChart scores={partialScores} benchmarks={benchmarks} />
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-sky-400 rounded" /><span className="text-[9px] text-slate-500">Tu negocio</span></div>
              <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 border-t border-dashed border-indigo-400" /><span className="text-[9px] text-slate-500">Media sector</span></div>
            </div>
          </div>
        )}
      </aside>

      {/* ── CENTER: Main form ─────────────────────────────────────────── */}
      <main className="order-1 lg:order-none min-w-0">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-white/[0.04]">
            <motion.div className="h-full bg-sky-500 rounded-r-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
          </div>

          <div className="p-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>

                {/* ── STEP 0: Perfil ──────────────────────────────────── */}
                {step === 0 && (
                  <div className="space-y-7">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Cuéntanos sobre tu negocio</h3>
                      <p className="text-sm text-slate-400">El análisis se personaliza según tu sector y objetivo. Solo tarda 5-8 minutos.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">Tipo de negocio *</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {VERTICAL_CONFIG.map(v => (
                          <RadioCard key={v.value} name="vertical" value={v.value} checked={draft.vertical === v.value}
                            onChange={() => setDraft(p => ({ ...p, vertical: v.value }))} emoji={v.emoji} title={v.label} description={v.desc} />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">Objetivo principal *</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {GOAL_CONFIG.map(g => (
                          <RadioCard key={g.value} name="goal" value={g.value} checked={draft.goal === g.value}
                            onChange={() => setDraft(p => ({ ...p, goal: g.value }))} emoji={g.emoji} title={g.label} description={g.desc} />
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <SelectField id="companySize" label="Tamaño del equipo" value={draft.companySize}
                        onChange={v => setDraft(p => ({ ...p, companySize: v as AuditAnswers["companySize"] }))}
                        options={[{ value: "solo", label: "Solo / freelance" }, { value: "2-5", label: "2-5 personas" }, { value: "6-20", label: "6-20 personas" }, { value: "20+", label: "Mas de 20" }]} />
                      <SelectField id="years" label="Años en activo" value={draft.yearsInBusiness}
                        onChange={v => setDraft(p => ({ ...p, yearsInBusiness: v as AuditAnswers["yearsInBusiness"] }))}
                        options={[{ value: "menos-1", label: "Menos de 1 año" }, { value: "1-3", label: "1-3 años" }, { value: "3-10", label: "3-10 años" }, { value: "10+", label: "Mas de 10 años" }]} />
                    </div>
                  </div>
                )}

                {/* ── STEP 1: Presencia Digital ────────────────────────── */}
                {step === 1 && (
                  <div className="space-y-5">
                    <StepHeader step="1" title="Presencia Digital" description="Web, SEO y marca. La vitrina de tu negocio en internet." icon="🌐" />
                    <SectionGrid>
                      <SelectField id="webStatus" label="Estado de la web"
                        hint="¿Tienes web y convierte visitas en contactos?"
                        value={draft.digital.websiteStatus}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, websiteStatus: v as AuditAnswers["digital"]["websiteStatus"] } }))}
                        options={[{ value: "none", label: "Sin web" }, { value: "basic", label: "Web básica (informativa)" }, { value: "ok", label: "Web funcional con CTA" }, { value: "optimized", label: "Web optimizada para conversion" }]} />
                      <SelectField id="webSpeed" label="Velocidad de carga"
                        hint="Google penaliza las webs lentas (Core Web Vitals)."
                        value={draft.digital.websiteSpeed}
                        onChange={v => setDraft(p => ({ ...p, digital: { ...p.digital, websiteSpeed: v as AuditAnswers["digital"]["websiteSpeed"] } }))}
                        options={[{ value: "slow", label: "Lenta (mas de 3 seg)" }, { value: "ok", label: "Normal (1-3 seg)" }, { value: "fast", label: "Rápida (menos de 1 seg)" }]} />
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
                    <StepHeader step="2" title="Marketing y Captación" description="Cómo atraes nuevos clientes y qué volumen genera tu sistema actual." icon="🎯" />
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
                    <StepHeader step="3" title="Ventas y Pipeline" description="Cómo gestionas oportunidades desde el primer contacto hasta el cierre." icon="📈" />
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
                        options={[{ value: "none", label: "No se mide" }, { value: "basic", label: "Medición básica de cierres" }, { value: "optimized", label: "Conversion medida y optimizada por etapa" }]} />
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
                    <StepHeader step="4" title="Operaciones y Procesos" description="Eficiencia interna, automatización y calidad en la entrega." icon="⚙️" />
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
                    <StepHeader step="5" title="Clientes y Retención" description="Qué tan bien cuidas a los clientes que ya tienes — el activo más valioso." icon="🤝" />
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
                    <StepHeader step="6" title="Datos e Inteligencia" description="KPIs, reporting y adopción de IA — la brecha competitiva más rápida de ampliar." icon="📊" />
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
                    <StepHeader step="7" title="Finanzas y Rentabilidad" description="Control de márgenes, cashflow y estructura de precios." icon="💰" />
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
                    <StepHeader step="8" title="Seguridad y Cumplimiento" description="Protección de datos, continuidad del negocio y cumplimiento legal." icon="🛡️" />
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-3 text-xs text-amber-300 mb-2">
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
                      <h3 className="text-xl font-bold text-white mb-1">Análisis completado 🎉</h3>
                      <p className="text-sm text-slate-400">Puedes ver el resultado en pantalla ahora mismo. Si quieres recibirlo por email en PDF, rellena los datos opcionales.</p>
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
                        <label className="flex items-start gap-2.5 cursor-pointer">
                          <input type="checkbox" checked={draft.contact.consent} onChange={e => setDraft(p => ({ ...p, contact: { ...p.contact, consent: e.target.checked } }))} className="mt-1 h-4 w-4 accent-sky-500" />
                          <span className="text-xs text-slate-400 leading-relaxed">
                            He leído y acepto la <a href="/legal/privacidad" className="text-sky-400 underline">Política de privacidad</a>. Qubelia usará estos datos solo para enviarme el informe y contactar si lo solicito.
                          </span>
                        </label>
                      </div>
                    )}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 text-xs text-slate-500 leading-relaxed">
                      🔒 Sin PII en analytics. Email opcional y nunca obligatorio. El informe está disponible en pantalla sin registro.
                    </div>
                  </div>
                )}

                {/* ── STEP 10: Resultado ───────────────────────────────── */}
                {step === 10 && !result && (
                  <div className="flex items-center justify-center py-16">
                    <div className="text-center space-y-2">
                      <div className="text-3xl animate-pulse">⚡</div>
                      <p className="text-slate-400 text-sm">Generando tu análisis...</p>
                    </div>
                  </div>
                )}

                {step === 10 && result && (
                  <div className="space-y-6">
                    {/* Hero score */}
                    <motion.div
                      className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-6"
                      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/[0.06] to-indigo-500/[0.04] pointer-events-none" />
                      <div className="relative flex flex-wrap items-start justify-between gap-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-2">Puntuación global</p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-6xl font-black tabular-nums text-white">
                              <AnimatedCounter target={result.scores.total} />
                            </span>
                            <span className="text-2xl font-bold text-white/20">/100</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1.5">{verticalLabel} · {goalLabel}</p>
                        </div>
                        {maturity && (
                          <div className={`rounded-xl border px-4 py-3 ${maturity.color}`}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1 opacity-70">Nivel de madurez</p>
                            <p className="text-lg font-black">{maturity.label}</p>
                            <p className="text-xs opacity-70 mt-0.5">{maturity.description}</p>
                          </div>
                        )}
                        <div className="w-full sm:w-52">
                          <RadarChart scores={result.scores} benchmarks={benchmarks} />
                        </div>
                      </div>
                      <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400"
                          initial={{ width: 0 }} animate={{ width: `${result.scores.total}%` }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                        />
                      </div>
                    </motion.div>

                    {/* Summary */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">Resumen ejecutivo</p>
                      <ul className="space-y-2.5">
                        {result.report.summary.map((item, i) => (
                          <motion.li key={i} className="flex gap-2.5 text-sm text-slate-300 leading-relaxed" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                            <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-sky-400" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Score breakdown */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Puntuación por área vs media del sector</p>
                        <span className="text-[10px] text-slate-600">Línea = media sectorial</span>
                      </div>
                      <div className="space-y-4">
                        {scoreCards.map(item => (
                          <ScoreBar key={item.label} label={item.label} value={item.value} benchmark={item.bench} />
                        ))}
                      </div>
                    </div>

                    {/* Strengths */}
                    {result.report.strengths.length > 0 && (
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400 mb-3">✦ Puntos fuertes detectados</p>
                        <ul className="space-y-2.5">
                          {result.report.strengths.map((item, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-slate-300 leading-relaxed">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Weak points */}
                    <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.04] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-rose-300 mb-3">⚠ Brechas identificadas por prioridad</p>
                      <ul className="space-y-3">
                        {result.report.weakPoints.map((item, i) => (
                          <motion.li key={i} className="flex items-start gap-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                            <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/[0.06] text-[9px] font-bold text-slate-400 mt-0.5">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                            </div>
                            <SeverityBadge severity={item.severity} />
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-3">🚀 Top 3 oportunidades de crecimiento</p>
                      <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3">
                        {result.report.opportunities.map((opp, i) => (
                          <OpportunityCard key={i} opp={opp} index={i} />
                        ))}
                      </div>
                    </div>

                    {/* Quick wins */}
                    <div className="rounded-2xl border border-sky-500/20 bg-sky-500/[0.04] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sky-400 mb-3">⚡ Quick wins — acciones para esta semana</p>
                      <ul className="space-y-3">
                        {result.report.quickWins.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sky-500/20 text-[9px] font-bold text-sky-300 mt-0.5">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-300 leading-snug">{item.text}</p>
                              <p className="text-[10px] text-slate-500 mt-0.5">{item.timeframe}</p>
                            </div>
                            <EffortBadge effort={item.effort} />
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Roadmap */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-4">🗺 Hoja de ruta 90 días</p>
                      <div className="space-y-5">
                        {result.report.roadmap.map((phase, pi) => {
                          const phaseColors = ["text-amber-300", "text-sky-300", "text-emerald-300"];
                          const phaseBg = ["border-amber-500/20 bg-amber-500/[0.05]", "border-sky-500/20 bg-sky-500/[0.05]", "border-emerald-500/20 bg-emerald-500/[0.05]"];
                          return (
                            <div key={pi} className={`rounded-xl border p-4 ${phaseBg[pi % 3]}`}>
                              <p className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-1 ${phaseColors[pi % 3]}`}>{phase.title}</p>
                              <p className="text-xs text-slate-400 mb-2.5">{phase.goal}</p>
                              <ul className="space-y-1.5">
                                {phase.tasks.map((task, ti) => (
                                  <li key={ti} className="flex gap-2 text-xs text-slate-300">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/20" />
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Impact matrix */}
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-4">Matriz impacto vs esfuerzo</p>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {result.report.impactMatrix.map(group => {
                          const styles = { green: "border-emerald-500/20 bg-emerald-500/[0.05]", blue: "border-sky-500/20 bg-sky-500/[0.05]", amber: "border-amber-500/20 bg-amber-500/[0.05]", red: "border-rose-500/20 bg-rose-500/[0.05]" };
                          const labelStyles = { green: "text-emerald-400", blue: "text-sky-400", amber: "text-amber-400", red: "text-rose-400" };
                          return (
                            <div key={group.label} className={`rounded-xl border p-3.5 ${styles[group.color]}`}>
                              <p className={`text-[10px] font-bold uppercase tracking-[0.14em] mb-2 ${labelStyles[group.color]}`}>{group.label}</p>
                              <ul className="space-y-1.5">
                                {group.items.map(item => (
                                  <li key={item} className="flex gap-2 text-[11px] text-slate-300 leading-snug">
                                    <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-white/15" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Personalized CTA */}
                    <motion.div
                      className="rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-sky-500/[0.05] p-6"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-300 mb-2">Siguiente paso recomendado</p>
                      <p className="text-base font-bold text-white mb-2">
                        {result.scores.total < 45
                          ? "Tu negocio tiene un potencial enorme sin explotar. En 90 días podemos transformar las brechas críticas en ventajas competitivas."
                          : result.scores.total < 65
                          ? "Estás más cerca de donde quieres estar de lo que crees. El plan está claro — necesitas el equipo que lo ejecute."
                          : "Base sólida. El siguiente nivel requiere sistemas, datos e IA bien integrados para escalar sin fricción."}
                      </p>
                      <p className="text-sm text-slate-400 mb-4">Agenda una llamada de 45 min con nuestro equipo — sin compromiso. Revisamos tu caso y te dejamos un plan accionable.</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button as="a" href="/#contacto" variant="shine">Agendar diagnóstico gratuito →</Button>
                        <Button variant="ghost" onClick={handlePdfDownload} disabled={pdfStatus === "loading"}>
                          {pdfStatus === "loading" ? "Generando PDF…" : pdfStatus === "done" ? "PDF descargado ✓" : "Descargar informe PDF"}
                        </Button>
                      </div>
                    </motion.div>

                    {submitStatus === "saved" && <p className="text-xs text-sky-400">Análisis guardado.{emailSent ? " PDF enviado a tu email." : ""}</p>}
                    {submitStatus === "error" && <p className="text-xs text-amber-400">No se pudo guardar el análisis. El PDF sigue disponible en pantalla.</p>}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.08] px-4 py-3 text-sm text-amber-300">{error}</div>
            )}

            {/* Navigation */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-white/[0.05]">
              <Button variant="ghost" onClick={goBack} disabled={step === 0} className="w-full sm:w-auto">← Anterior</Button>
              {step < steps.length - 1 ? (
                <Button variant="shine" onClick={goNext} className="w-full sm:w-auto">{nextLabel} →</Button>
              ) : (
                <Button variant="ghost" onClick={() => { setStep(0); setResult(null); setDraft(initialDraft); setSubmitStatus("idle"); }} className="w-full sm:w-auto">Repetir análisis</Button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── RIGHT: Summary + CTA ─────────────────────────────────────── */}
      <aside className="order-3 lg:order-none space-y-4 lg:sticky lg:top-24">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 mb-3">Tu análisis</p>
          <div className="space-y-2.5">
            {[
              { label: "Sector", value: verticalLabel },
              { label: "Objetivo", value: goalLabel },
              { label: "Paso", value: `${steps[step]?.id ?? "?"} / ${steps.length}` },
              { label: "Score", value: result ? `${result.scores.total}/100` : "—" },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">{row.label}</span>
                <span className="font-semibold text-slate-200 truncate text-right max-w-[120px]">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-3.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div className="h-full rounded-full bg-sky-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
            </div>
            <p className="mt-1.5 text-[10px] text-slate-600">{progress}% completado</p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 mb-2">Privacidad</p>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">Sin registro. Email opcional. Tus datos no se usan en analytics sin consentimiento.</p>
          <div className="flex items-start gap-2 rounded-xl border border-sky-500/20 bg-sky-500/[0.06] px-3 py-2.5">
            <span className="text-sky-400 mt-0.5">✓</span>
            <p className="text-[10px] text-sky-300">Sin PII en eventos analíticos</p>
          </div>
        </div>

        {step < 10 && (
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500 mb-2">¿Prefieres hablar?</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">45 min con nuestro equipo. Dejamos un plan accionable — sin compromiso.</p>
            <Button as="a" href="/#contacto" variant="shine" size="sm" className="w-full">Agendar ahora</Button>
          </div>
        )}
      </aside>

    </div>
  );
}
