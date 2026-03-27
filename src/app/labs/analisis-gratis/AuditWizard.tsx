"use client";

import React, { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { trackEvent } from "@/lib/analytics";
import {
  auditSubmissionSchema,
  calculateAuditResult,
  scoreBucket,
  type AuditAnswers,
  type AuditContact,
  type AuditGoal,
  type AuditResult,
  type AuditVertical,
} from "@/lib/labs/audit";
import AuditReportPdf from "./AuditReportPdf";
import { pdf } from "@react-pdf/renderer";

const steps = [
  { id: "1", title: "Perfil", summary: "Tu tipo de negocio" },
  { id: "2", title: "Objetivo", summary: "Prioridad principal" },
  { id: "3", title: "Presencia", summary: "Web, canales y tracking" },
  { id: "4", title: "Ventas", summary: "Seguimiento y respuesta" },
  { id: "5", title: "Operaciones", summary: "Procesos y automatizacion" },
  { id: "6", title: "Datos", summary: "KPIs y reporting" },
  { id: "7", title: "Finanzas", summary: "Margen y cashflow" },
  { id: "8", title: "Riesgos", summary: "Seguridad y RGPD" },
  { id: "9", title: "Informe", summary: "Recibir por email" },
  { id: "10", title: "Resultado", summary: "Diagnostico final" },
] as const;

const verticalOptions: Array<{ value: AuditVertical; label: string; desc: string }> = [
  { value: "local", label: "Pymes locales", desc: "Negocio local con foco en zona." },
  { value: "ecommerce", label: "E-commerce", desc: "Ventas online y pedidos." },
  { value: "despacho", label: "Despachos", desc: "Servicios profesionales y casos." },
  { value: "clinica", label: "Clinicas", desc: "Salud, pacientes y citas." },
];

const goalOptions: Array<{ value: AuditGoal; label: string }> = [
  { value: "captar-leads", label: "Captar leads" },
  { value: "vender-mas", label: "Vender mas" },
  { value: "ahorrar-tiempo", label: "Ahorrar tiempo" },
  { value: "reducir-errores", label: "Reducir errores" },
  { value: "mejorar-control", label: "Mejorar control" },
];

const segmentOptions = [
  { value: "none", label: "Sin segmento definido" },
  { value: "basic", label: "Segmento definido por intuicion" },
  { value: "defined", label: "ICP definido con datos" },
] as const;

const conversionOptions = [
  { value: "none", label: "No se mide la tasa de cierre" },
  { value: "basic", label: "Se mide de forma basica" },
  { value: "optimized", label: "Se mide y se optimiza por etapa" },
] as const;

const forecastOptions = [
  { value: "none", label: "Sin forecast ni pipeline" },
  { value: "basic", label: "Forecast basico mensual" },
  { value: "defined", label: "Forecast con escenarios y objetivos" },
] as const;

const retentionOptions = [
  { value: "none", label: "No se mide repeticion/retencion" },
  { value: "basic", label: "Se mide de forma puntual" },
  { value: "defined", label: "Se mide por cohortes o segmentos" },
] as const;

const feedbackOptions = [
  { value: "none", label: "No medimos satisfaccion" },
  { value: "sporadic", label: "Feedback puntual" },
  { value: "regular", label: "NPS/CSAT recurrente" },
] as const;

const marginOptions = [
  { value: "unknown", label: "No conozco el margen por servicio" },
  { value: "rough", label: "Tengo una estimacion general" },
  { value: "by-line", label: "Mido margen por linea o servicio" },
] as const;

const costStructureOptions = [
  { value: "unknown", label: "Costes fijos/variables no claros" },
  { value: "basic", label: "Costes estimados" },
  { value: "detailed", label: "Costes detallados por linea/proyecto" },
] as const;

const cashflowOptions = [
  { value: "none", label: "Sin control de tesoreria" },
  { value: "monthly", label: "Control mensual de cashflow" },
  { value: "weekly", label: "Control semanal y previsiones" },
] as const;

const pricingOptions = [
  { value: "no-review", label: "No reviso precios" },
  { value: "annual", label: "Reviso precios al menos 1 vez al ano" },
  { value: "quarterly", label: "Reviso precios de forma trimestral" },
] as const;

const labelsByVertical: Record<AuditVertical, { label: string; pipeline: string; workflow: string }> = {
  local: { label: "Pymes locales", pipeline: "leads", workflow: "ventas" },
  ecommerce: { label: "E-commerce", pipeline: "pedidos", workflow: "pedidos" },
  despacho: { label: "Despachos", pipeline: "expedientes", workflow: "casos" },
  clinica: { label: "Clinicas", pipeline: "pacientes", workflow: "atencion" },
};

const goalLabels: Record<AuditGoal, string> = {
  "captar-leads": "Captar leads",
  "vender-mas": "Vender mas",
  "ahorrar-tiempo": "Ahorrar tiempo",
  "reducir-errores": "Reducir errores",
  "mejorar-control": "Mejorar control",
};

const Icons = {
  user: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  ),
  target: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
      <path d="M22 12h-3M5 12H2M12 2v3M12 22v-3" />
    </svg>
  ),
  globe: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M2 12h20" />
      <path d="M12 3c2.5 3 2.5 15 0 18" />
      <path d="M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  ),
  sales: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m7 15 4-4 3 3 5-6" />
    </svg>
  ),
  settings: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.86l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.86-.34 1.7 1.7 0 0 0-1 1.54V22a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.54 1.7 1.7 0 0 0-1.86.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.86 1.7 1.7 0 0 0-1.54-1H2a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.54-1 1.7 1.7 0 0 0-.34-1.86l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.86.34H8a1.7 1.7 0 0 0 1-1.54V2a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.54 1.7 1.7 0 0 0 1.86-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.86V8c0 .69.4 1.31 1.02 1.6.28.13.59.2.92.2H22a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.54 1Z" />
    </svg>
  ),
  chart: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 13h3v5H7zM12 9h3v9h-3zM17 6h3v12h-3z" />
    </svg>
  ),
  wallet: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M16 10h5v4h-5z" />
    </svg>
  ),
  shield: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  mail: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  check: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 13 4 4L19 7" />
    </svg>
  ),
};

type AuditDraft = {
  vertical: AuditVertical | "";
  goal: AuditGoal | "";
  presence: AuditAnswers["presence"];
  sales: AuditAnswers["sales"];
  operations: AuditAnswers["operations"];
  data: AuditAnswers["data"];
  finance: AuditAnswers["finance"];
  risk: AuditAnswers["risk"];
  contact: AuditContact;
};

const initialDraft: AuditDraft = {
  vertical: "",
  goal: "",
  presence: {
    websiteStatus: "basic",
    ctaClarity: false,
    valuePropClarity: false,
    segmentClarity: "none",
    socialPresence: "sporadic",
    tracking: "none",
    mainChannel: "boca-oreja",
  },
  sales: {
    leadTool: "manual",
    responseTime: "24-48h",
    followUp: "sin-proceso",
    conversionTracking: "none",
    forecastLevel: "none",
  },
  operations: {
    processDocumentation: false,
    repetitionLevel: "medio",
    automationLevel: "ninguna",
    errorRate: "ocasional",
    qualityControl: false,
    bottleneck: "",
  },
  data: {
    kpiUsage: "none",
    reportingFrequency: "mensual",
    crmErp: "none",
    retentionTracking: "none",
    feedbackLoop: "none",
  },
  finance: {
    marginVisibility: "unknown",
    cashflowControl: "none",
    pricingReview: "no-review",
    costStructureVisibility: "unknown",
  },
  risk: {
    backups: false,
    accessControl: false,
    rgpdBasics: false,
    securityUpdates: false,
  },
  contact: {
    wantsEmail: false,
    contactName: "",
    email: "",
    companyName: "",
    website: "",
    phone: "",
    consent: false,
  },
};

function toAnswers(draft: AuditDraft): AuditAnswers {
  return {
    vertical: draft.vertical as AuditVertical,
    goal: draft.goal as AuditGoal,
    presence: draft.presence,
    sales: draft.sales,
    operations: draft.operations,
    data: draft.data,
    finance: draft.finance,
    risk: draft.risk,
  };
}

type RadioCardProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function RadioCard({ name, value, checked, onChange, title, description, icon }: RadioCardProps) {
  return (
    <label
      className={`group relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-xl border p-4 text-sm transition-all focus-within:ring-2 focus-within:ring-sky-500/25 ${
        checked
          ? "border-sky-400 bg-sky-50/70 dark:border-sky-500/50 dark:bg-sky-500/[0.08]"
          : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span
        className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg transition-colors ${
          checked
            ? "bg-sky-500 text-white"
            : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
        }`}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold leading-snug ${checked ? "text-sky-700 dark:text-sky-200" : "text-slate-900 dark:text-slate-100"}`}>
          {title}
        </span>
        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>
      </div>
      {checked && (
        <span className="flex-none text-sky-500 dark:text-sky-400 mt-0.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
          </svg>
        </span>
      )}
    </label>
  );
}

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
  help?: string;
};

function SelectField({ id, label, value, onChange, options, help }: SelectFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-900 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100 dark:[color-scheme:dark]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ color: "var(--select-option-color)", backgroundColor: "var(--select-option-bg)" }}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 8 4 4 4-4" />
          </svg>
        </span>
      </div>
      {help ? <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{help}</p> : null}
    </div>
  );
}

type ToggleProps = {
  label: string;
  description?: string;
  checked: boolean;
  onChange: () => void;
};

function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <label className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-colors focus-within:ring-2 focus-within:ring-sky-500/25 ${
      checked
        ? "border-sky-300/70 bg-sky-50/50 dark:border-sky-500/30 dark:bg-sky-500/[0.06]"
        : "border-slate-200 bg-white hover:bg-slate-50/50 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:bg-white/[0.03]"
    }`}>
      <span className="min-w-0">
        <span className={`block text-sm font-semibold ${checked ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-200"}`}>{label}</span>
        {description ? <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span> : null}
      </span>
      <span
        aria-hidden
        className={`relative h-5 w-9 flex-none rounded-full transition-colors ${checked ? "bg-sky-500" : "bg-slate-200 dark:bg-white/[0.1]"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  help?: string;
};

function TextField({ id, label, value, onChange, placeholder, inputMode = "text", help }: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {help ? <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{help}</p> : null}
    </div>
  );
}

type TextAreaProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  help?: string;
};

function TextArea({ id, label, value, onChange, placeholder, help }: TextAreaProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {help ? <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{help}</p> : null}
    </div>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-slate-100">{value}</span>
    </div>
  );
}


type ScoreBarRowProps = {
  label: string;
  value: number;
};

function ScoreBarRow({ label, value }: ScoreBarRowProps) {
  const barColor = value >= 70 ? "bg-emerald-500" : value >= 45 ? "bg-sky-500" : "bg-amber-500";
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">{label}</span>
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 ml-2 flex-none tabular-nums">{value}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
          <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}

type MaturityInfo = {
  label: string;
  description: string;
  badgeClass: string;
};

function getMaturityInfo(total: number): MaturityInfo {
  if (total >= 75) {
    return {
      label: "Avanzado",
      description: "Base solida para escalar.",
      badgeClass:
        "border-emerald-200 bg-emerald-50/80 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200",
    };
  }
  if (total >= 55) {
    return {
      label: "En progreso",
      description: "Prioridades claras y accionables.",
      badgeClass:
        "border-sky-200 bg-sky-50/80 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200",
    };
  }
  return {
    label: "Base",
    description: "Refuerza los fundamentos clave.",
    badgeClass:
      "border-amber-200 bg-amber-50/80 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200",
  };
}

type StepHeaderProps = {
  stepId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function StepHeader({ stepId, title, description, icon }: StepHeaderProps) {
  return (
    <div className="flex items-start gap-4 pb-5 border-b border-slate-100 dark:border-white/[0.06]">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-sky-500 text-white">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-0.5">Paso {stepId}</p>
        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{description}</p>
      </div>
    </div>
  );
}

export default function AuditWizard() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<AuditDraft>(initialDraft);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [emailSent, setEmailSent] = useState(false);
  const [pdfStatus, setPdfStatus] = useState<"idle" | "loading">("idle");
  const [started, setStarted] = useState(false);
  const { preferences, hasNonEssentialCookies } = useCookieConsent();

  const canTrack = !hasNonEssentialCookies || preferences.analytics;
  const progress = Math.round((step / (steps.length - 1)) * 100);
  const verticalLabel = draft.vertical ? labelsByVertical[draft.vertical].label : "Sin seleccionar";
  const goalLabel = draft.goal ? goalLabels[draft.goal] : "Sin seleccionar";

  const pipelineLabel = draft.vertical ? labelsByVertical[draft.vertical].pipeline : "leads";
  const workflowLabel = draft.vertical ? labelsByVertical[draft.vertical].workflow : "ventas";

  function safeTrack(name: string, params?: Record<string, string | number>) {
    if (!canTrack) return;
    trackEvent(name, params);
  }

  function validateStep(current: number) {
    if (current === 0 && !draft.vertical) return "Selecciona un perfil para continuar.";
    if (current === 1 && !draft.goal) return "Selecciona el objetivo principal.";
    if (current === 8) {
      const payload = { ...toAnswers(draft), contact: draft.contact };
      const parsed = auditSubmissionSchema.safeParse(payload);
      if (!parsed.success) {
        return parsed.error.issues[0]?.message ?? "Revisa los datos de contacto.";
      }
    }
    return null;
  }

  async function handlePdfDownload() {
    if (!result) return;
    setPdfStatus("loading");
    try {
      const doc = (
        <AuditReportPdf
          report={result.report}
          scores={result.scores}
          verticalLabel={verticalLabel}
          goalLabel={goalLabel}
        />
      );
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "analisis-qubelia.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      safeTrack("labs_audit_pdf_download");
    } catch {
      // silencio: el usuario ya ve el informe en pantalla
    } finally {
      setPdfStatus("idle");
    }
  }

  async function submitAudit() {
    setSubmitStatus("saving");
    setEmailSent(false);
    try {
      const payload = {
        ...toAnswers(draft),
        contact: {
          ...draft.contact,
          contactName: draft.contact.contactName?.trim() || "",
          email: draft.contact.email?.trim() || "",
          companyName: draft.contact.companyName?.trim() || "",
          website: draft.contact.website?.trim() || "",
          phone: draft.contact.phone?.trim() || "",
        },
      };
      const response = await fetch("/api/labs/analisis-gratis/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("submit_failed");
      }
      const data = (await response.json()) as {
        id?: string;
        report?: AuditResult["report"];
        scores?: AuditResult["scores"];
        emailSent?: boolean;
      };
      if (data.report && data.scores) {
        setResult({ report: data.report, scores: data.scores });
      }
      if (data.emailSent) {
        setEmailSent(true);
        safeTrack("labs_audit_email_sent", { vertical: draft.vertical || "" });
      }
      setSubmitStatus("saved");
    } catch {
      setSubmitStatus("error");
    }
  }

  function goNext() {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);

    const nextStep = Math.min(step + 1, steps.length - 1);
    if (!started) {
      setStarted(true);
      safeTrack("labs_audit_start");
    }
    safeTrack("labs_audit_step", { step_index: nextStep + 1 });

    if (nextStep === steps.length - 1) {
      const computed = calculateAuditResult(toAnswers(draft));
      setResult(computed);
      safeTrack("labs_audit_complete", {
        vertical: draft.vertical || "",
        score_bucket: scoreBucket(computed.scores.total),
      });
      submitAudit();
    }

    setStep(nextStep);
  }

  function goBack() {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  }

  const nextLabel = step === steps.length - 2 ? "Ver resultado" : "Siguiente";

  const scoreCards = useMemo(() => {
    if (!result) return [];
    return [
      { label: "Captacion", value: result.scores.acquisition },
      { label: "Web", value: result.scores.web },
      { label: "Ventas", value: result.scores.sales },
      { label: "Operaciones", value: result.scores.operations },
      { label: "Datos", value: result.scores.data },
      { label: "Finanzas", value: result.scores.finance },
      { label: "Riesgos", value: result.scores.risk },
    ];
  }, [result]);

  const maturity = useMemo(() => (result ? getMaturityInfo(result.scores.total) : null), [result]);

  return (
    <div className="grid gap-5 sm:gap-6 xl:grid-cols-[200px_minmax(0,1fr)_280px] items-start">
      <nav className="order-1 min-w-0 xl:order-none">
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Análisis</p>
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">{progress}%</span>
          </div>
          <div className="p-2">
            {steps.map((s, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-sky-50 dark:bg-sky-500/10"
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span className={`flex h-6 w-6 flex-none items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-sky-500 text-white"
                      : isDone
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-400 dark:bg-white/[0.06] dark:text-slate-500"
                  }`}>
                    {isDone ? "✓" : s.id}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-sky-700 dark:text-sky-300" : "text-slate-700 dark:text-slate-300"}`}>{s.title}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{s.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-400 dark:text-slate-500">5-8 min · resultado inmediato · sin registro.</p>
      </nav>

      <div className="order-2 min-w-0 space-y-5 xl:order-none">
        <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
          {/* Panel header */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-100 dark:border-white/[0.05]">
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                Paso {steps[step]?.id ?? "10"} de {steps.length} · {steps[step]?.title ?? "Resultado"}
              </p>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">Diagnóstico digital en 5-8 min</h3>
            </div>
            <div className="flex-none relative h-11 w-11">
              <svg className="h-11 w-11 -rotate-90" viewBox="0 0 36 36" aria-hidden>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-slate-100 dark:text-white/[0.06]" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-sky-500" strokeDasharray={`${progress} 100`} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-200">{progress}%</span>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <header className="sr-only">
              <h2>Análisis rápido</h2>
            </header>

            <div className="space-y-6">
            {step === 0 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="1"
                  title="Perfil"
                  description="Selecciona el perfil que mas se parezca a tu negocio."
                  icon={Icons.user}
                />
                <fieldset className="grid gap-3 xl:grid-cols-2">
                  {verticalOptions.map((option) => (
                    <RadioCard
                      key={option.value}
                      name="vertical"
                      value={option.value}
                      checked={draft.vertical === option.value}
                      onChange={() => setDraft((prev) => ({ ...prev, vertical: option.value }))}
                      title={option.label}
                      description={option.desc}
                      icon={Icons.user}
                    />
                  ))}
                </fieldset>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="2"
                  title="Objetivo principal"
                  description="Elige la prioridad para este trimestre."
                  icon={Icons.target}
                />
                <fieldset className="grid gap-3 xl:grid-cols-2">
                  {goalOptions.map((option) => (
                    <RadioCard
                      key={option.value}
                      name="goal"
                      value={option.value}
                      checked={draft.goal === option.value}
                      onChange={() => setDraft((prev) => ({ ...prev, goal: option.value }))}
                      title={option.label}
                      description="Selecciona la opcion que mas te duele."
                      icon={Icons.target}
                    />
                  ))}
                </fieldset>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="3"
                  title="Presencia y captacion"
                  description="Web, redes, tracking y canal principal."
                  icon={Icons.globe}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <SelectField
                    id="websiteStatus"
                    label="Estado de la web"
                    value={draft.presence.websiteStatus}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        presence: { ...prev.presence, websiteStatus: value as AuditAnswers["presence"]["websiteStatus"] },
                      }))
                    }
                    options={[
                      { value: "none", label: "No tengo web" },
                      { value: "basic", label: "Basica / desactualizada" },
                      { value: "ok", label: "Correcta con CTA" },
                      { value: "optimized", label: "Optimizada (SEO + velocidad)" },
                    ]}
                  />
                  <SelectField
                    id="socialPresence"
                    label="Presencia en redes"
                    value={draft.presence.socialPresence}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        presence: { ...prev.presence, socialPresence: value as AuditAnswers["presence"]["socialPresence"] },
                      }))
                    }
                    options={[
                      { value: "none", label: "No uso redes" },
                      { value: "sporadic", label: "Publico de vez en cuando" },
                      { value: "active", label: "Activa y constante" },
                      { value: "active-paid", label: "Activa con pauta" },
                    ]}
                  />
                  <SelectField
                    id="tracking"
                    label="Tracking/analitica"
                    value={draft.presence.tracking}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        presence: { ...prev.presence, tracking: value as AuditAnswers["presence"]["tracking"] },
                      }))
                    }
                    options={[
                      { value: "none", label: "No mido nada" },
                      { value: "basic", label: "GA4 basico" },
                      { value: "events", label: "Eventos y conversiones" },
                    ]}
                  />
                  <SelectField
                    id="segmentClarity"
                    label="Segmento objetivo"
                    value={draft.presence.segmentClarity}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        presence: { ...prev.presence, segmentClarity: value as AuditAnswers["presence"]["segmentClarity"] },
                      }))
                    }
                    options={segmentOptions}
                  />
                  <SelectField
                    id="channel"
                    label="Canal principal"
                    value={draft.presence.mainChannel}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        presence: { ...prev.presence, mainChannel: value as AuditAnswers["presence"]["mainChannel"] },
                      }))
                    }
                    options={[
                      { value: "boca-oreja", label: "Boca a boca" },
                      { value: "rrss", label: "Redes sociales" },
                      { value: "seo", label: "SEO / organico" },
                      { value: "ads", label: "Paid ads" },
                      { value: "marketplaces", label: "Marketplaces" },
                      { value: "partners", label: "Partners / referidos" },
                      { value: "otro", label: "Otro" },
                    ]}
                  />
                </div>
                <Toggle
                  label="La propuesta y el CTA principal estan claros"
                  description="El usuario sabe que hacer en menos de 5 segundos."
                  checked={draft.presence.ctaClarity}
                  onChange={() =>
                    setDraft((prev) => ({
                      ...prev,
                      presence: { ...prev.presence, ctaClarity: !prev.presence.ctaClarity },
                    }))
                  }
                />
                <Toggle
                  label="La propuesta de valor esta clara y diferenciada"
                  description="Se entiende por que elegirte frente a alternativas."
                  checked={draft.presence.valuePropClarity}
                  onChange={() =>
                    setDraft((prev) => ({
                      ...prev,
                      presence: { ...prev.presence, valuePropClarity: !prev.presence.valuePropClarity },
                    }))
                  }
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="4"
                  title={`Ventas y ${workflowLabel}`}
                  description={`Como gestionas ${pipelineLabel} y seguimiento.`}
                  icon={Icons.sales}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <SelectField
                    id="leadTool"
                    label={`Herramienta para ${pipelineLabel}`}
                    value={draft.sales.leadTool}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, leadTool: value as AuditAnswers["sales"]["leadTool"] },
                      }))
                    }
                    options={[
                      { value: "manual", label: "Manual (mensajes sueltos)" },
                      { value: "spreadsheet", label: "Hoja de calculo" },
                      { value: "crm", label: "CRM basico" },
                      { value: "integrated", label: "CRM/ERP integrado" },
                    ]}
                  />
                  <SelectField
                    id="responseTime"
                    label="Tiempo medio de respuesta"
                    value={draft.sales.responseTime}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, responseTime: value as AuditAnswers["sales"]["responseTime"] },
                      }))
                    }
                    options={[
                      { value: "menos-1h", label: "Menos de 1h" },
                      { value: "mismo-dia", label: "Mismo dia" },
                      { value: "24-48h", label: "24-48h" },
                      { value: "mas-48h", label: "Mas de 48h" },
                    ]}
                  />
                  <SelectField
                    id="followUp"
                    label="Seguimiento"
                    value={draft.sales.followUp}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, followUp: value as AuditAnswers["sales"]["followUp"] },
                      }))
                    }
                    options={[
                      { value: "sin-proceso", label: "Sin proceso definido" },
                      { value: "basico", label: "Recordatorios basicos" },
                      { value: "regular", label: "Seguimiento semanal" },
                      { value: "automatizado", label: "Automatizado" },
                    ]}
                  />
                  <SelectField
                    id="conversionTracking"
                    label="Medicion de tasa de cierre"
                    value={draft.sales.conversionTracking}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, conversionTracking: value as AuditAnswers["sales"]["conversionTracking"] },
                      }))
                    }
                    options={conversionOptions}
                  />
                  <SelectField
                    id="forecastLevel"
                    label="Forecast de ventas"
                    value={draft.sales.forecastLevel}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        sales: { ...prev.sales, forecastLevel: value as AuditAnswers["sales"]["forecastLevel"] },
                      }))
                    }
                    options={forecastOptions}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="5"
                  title="Operaciones"
                  description="Procesos, repeticion y errores."
                  icon={Icons.settings}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <SelectField
                    id="repetition"
                    label="Nivel de tareas repetitivas"
                    value={draft.operations.repetitionLevel}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        operations: { ...prev.operations, repetitionLevel: value as AuditAnswers["operations"]["repetitionLevel"] },
                      }))
                    }
                    options={[
                      { value: "bajo", label: "Bajo" },
                      { value: "medio", label: "Medio" },
                      { value: "alto", label: "Alto" },
                    ]}
                  />
                  <SelectField
                    id="automation"
                    label="Nivel de automatizacion"
                    value={draft.operations.automationLevel}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        operations: { ...prev.operations, automationLevel: value as AuditAnswers["operations"]["automationLevel"] },
                      }))
                    }
                    options={[
                      { value: "ninguna", label: "Ninguna" },
                      { value: "no-code", label: "No-code basico" },
                      { value: "integraciones", label: "Integraciones" },
                      { value: "custom", label: "Automatizacion a medida" },
                    ]}
                  />
                  <SelectField
                    id="errorRate"
                    label="Errores operativos"
                    value={draft.operations.errorRate}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        operations: { ...prev.operations, errorRate: value as AuditAnswers["operations"]["errorRate"] },
                      }))
                    }
                    options={[
                      { value: "raro", label: "Raros" },
                      { value: "ocasional", label: "Ocasionales" },
                      { value: "frecuente", label: "Frecuentes" },
                    ]}
                  />
                </div>
                <Toggle
                  label="Procesos documentados y estandarizados"
                  description="Existe un playbook para el trabajo diario."
                  checked={draft.operations.processDocumentation}
                  onChange={() =>
                    setDraft((prev) => ({
                      ...prev,
                      operations: { ...prev.operations, processDocumentation: !prev.operations.processDocumentation },
                    }))
                  }
                />
                <Toggle
                  label="Control de calidad antes de entregar"
                  description="Checklist o revision previa a entrega."
                  checked={draft.operations.qualityControl}
                  onChange={() =>
                    setDraft((prev) => ({
                      ...prev,
                      operations: { ...prev.operations, qualityControl: !prev.operations.qualityControl },
                    }))
                  }
                />
                <TextArea
                  id="bottleneck"
                  label="Tu mayor cuello de botella (opcional)"
                  value={draft.operations.bottleneck ?? ""}
                  onChange={(value) =>
                    setDraft((prev) => ({
                      ...prev,
                      operations: { ...prev.operations, bottleneck: value },
                    }))
                  }
                  placeholder="Ejemplo: perdemos tiempo consolidando datos de ventas."
                  help="Una frase. Max 160 caracteres."
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="6"
                  title="Datos y control"
                  description="KPIs, reporting y herramientas."
                  icon={Icons.chart}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <SelectField
                    id="kpiUsage"
                    label="Uso de KPIs"
                    value={draft.data.kpiUsage}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        data: { ...prev.data, kpiUsage: value as AuditAnswers["data"]["kpiUsage"] },
                      }))
                    }
                    options={[
                      { value: "none", label: "No medimos KPIs" },
                      { value: "basic", label: "Algunos KPIs" },
                      { value: "defined", label: "KPIs definidos y visibles" },
                    ]}
                  />
                  <SelectField
                    id="reportingFrequency"
                    label="Frecuencia de reporting"
                    value={draft.data.reportingFrequency}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        data: { ...prev.data, reportingFrequency: value as AuditAnswers["data"]["reportingFrequency"] },
                      }))
                    }
                    options={[
                      { value: "nunca", label: "Nunca" },
                      { value: "mensual", label: "Mensual" },
                      { value: "semanal", label: "Semanal" },
                      { value: "diario", label: "Diario" },
                    ]}
                  />
                  <SelectField
                    id="crmErp"
                    label="CRM/ERP"
                    value={draft.data.crmErp}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        data: { ...prev.data, crmErp: value as AuditAnswers["data"]["crmErp"] },
                      }))
                    }
                    options={[
                      { value: "none", label: "Ninguno" },
                      { value: "crm", label: "CRM basico" },
                      { value: "erp", label: "ERP integrado" },
                    ]}
                  />
                  <SelectField
                    id="retentionTracking"
                    label="Retencion o repeticion"
                    value={draft.data.retentionTracking}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        data: { ...prev.data, retentionTracking: value as AuditAnswers["data"]["retentionTracking"] },
                      }))
                    }
                    options={retentionOptions}
                  />
                  <SelectField
                    id="feedbackLoop"
                    label="Satisfaccion del cliente"
                    value={draft.data.feedbackLoop}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        data: { ...prev.data, feedbackLoop: value as AuditAnswers["data"]["feedbackLoop"] },
                      }))
                    }
                    options={feedbackOptions}
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="7"
                  title="Finanzas"
                  description="Margen, tesoreria y pricing."
                  icon={Icons.wallet}
                />
                <div className="grid gap-4 xl:grid-cols-2">
                  <SelectField
                    id="marginVisibility"
                    label="Margen por servicio"
                    value={draft.finance.marginVisibility}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        finance: { ...prev.finance, marginVisibility: value as AuditAnswers["finance"]["marginVisibility"] },
                      }))
                    }
                    options={marginOptions}
                  />
                  <SelectField
                    id="costStructureVisibility"
                    label="Costes fijos/variables"
                    value={draft.finance.costStructureVisibility}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        finance: { ...prev.finance, costStructureVisibility: value as AuditAnswers["finance"]["costStructureVisibility"] },
                      }))
                    }
                    options={costStructureOptions}
                  />
                  <SelectField
                    id="cashflowControl"
                    label="Control de tesoreria"
                    value={draft.finance.cashflowControl}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        finance: { ...prev.finance, cashflowControl: value as AuditAnswers["finance"]["cashflowControl"] },
                      }))
                    }
                    options={cashflowOptions}
                  />
                  <SelectField
                    id="pricingReview"
                    label="Revision de precios"
                    value={draft.finance.pricingReview}
                    onChange={(value) =>
                      setDraft((prev) => ({
                        ...prev,
                        finance: { ...prev.finance, pricingReview: value as AuditAnswers["finance"]["pricingReview"] },
                      }))
                    }
                    options={pricingOptions}
                  />
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="8"
                  title="Riesgos"
                  description="Seguridad basica y RGPD."
                  icon={Icons.shield}
                />
                <div className="grid gap-3 xl:grid-cols-2">
                  <Toggle
                    label="Backups automaticos"
                    description="Copias programadas y verificadas."
                    checked={draft.risk.backups}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        risk: { ...prev.risk, backups: !prev.risk.backups },
                      }))
                    }
                  />
                  <Toggle
                    label="Accesos por roles o 2FA"
                    description="Control de permisos por usuario."
                    checked={draft.risk.accessControl}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        risk: { ...prev.risk, accessControl: !prev.risk.accessControl },
                      }))
                    }
                  />
                  <Toggle
                    label="RGPD basico cubierto"
                    description="Textos legales y consentimientos."
                    checked={draft.risk.rgpdBasics}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        risk: { ...prev.risk, rgpdBasics: !prev.risk.rgpdBasics },
                      }))
                    }
                  />
                  <Toggle
                    label="Actualizaciones de seguridad"
                    description="Actualizaciones y parches al dia."
                    checked={draft.risk.securityUpdates}
                    onChange={() =>
                      setDraft((prev) => ({
                        ...prev,
                        risk: { ...prev.risk, securityUpdates: !prev.risk.securityUpdates },
                      }))
                    }
                  />
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="9"
                  title="Recibir informe (opcional)"
                  description="Email opcional para enviarte el PDF y coordinar una llamada."
                  icon={Icons.mail}
                />
                <Toggle
                  label="Quiero recibir el PDF por email"
                  description="Sin registro. Solo si quieres el informe en tu correo."
                  checked={draft.contact.wantsEmail}
                  onChange={() =>
                    setDraft((prev) => ({
                      ...prev,
                      contact: { ...prev.contact, wantsEmail: !prev.contact.wantsEmail },
                    }))
                  }
                />
                {draft.contact.wantsEmail ? (
                  <div className="grid gap-4 xl:grid-cols-2">
                    <TextField
                      id="contactName"
                      label="Nombre"
                      value={draft.contact.contactName ?? ""}
                      onChange={(value) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, contactName: value } }))}
                    />
                    <TextField
                      id="email"
                      label="Email"
                      value={draft.contact.email ?? ""}
                      onChange={(value) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, email: value } }))}
                      inputMode="email"
                    />
                    <TextField
                      id="companyName"
                      label="Empresa"
                      value={draft.contact.companyName ?? ""}
                      onChange={(value) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, companyName: value } }))}
                    />
                    <TextField
                      id="website"
                      label="Web"
                      value={draft.contact.website ?? ""}
                      onChange={(value) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, website: value } }))}
                      placeholder="qubelia.es"
                    />
                    <TextField
                      id="phone"
                      label="Telefono"
                      value={draft.contact.phone ?? ""}
                      onChange={(value) => setDraft((prev) => ({ ...prev, contact: { ...prev.contact, phone: value } }))}
                      inputMode="tel"
                    />
                    <div className="xl:col-span-2 flex items-start gap-2">
                      <input
                        id="consent"
                        type="checkbox"
                        checked={draft.contact.consent}
                        onChange={(event) =>
                          setDraft((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, consent: event.target.checked },
                          }))
                        }
                        className="mt-1 h-4 w-4"
                      />
                      <label htmlFor="consent" className="text-sm text-slate-700 dark:text-slate-300">
                        He leido y acepto la{" "}
                        <a className="underline" href="/legal/privacidad">
                          Politica de privacidad
                        </a>
                        .
                      </label>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 dark:bg-white/[0.03] p-4 text-sm text-slate-600 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                    Puedes continuar sin email. El informe se muestra en pantalla.
                  </div>
                )}
              </div>
            )}

            {step === steps.length - 1 && !result ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 dark:bg-white/[0.03] p-4 text-sm text-slate-600 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                Completa los pasos anteriores para ver el informe final.
              </div>
            ) : null}

            {step === steps.length - 1 && result ? (
              <div className="space-y-5">
                <StepHeader
                  stepId="10"
                  title="Informe de diagnóstico"
                  description="Resultados accionables basados en tus respuestas."
                  icon={Icons.check}
                />

                {/* Score hero */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-1">Score total</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl font-black tabular-nums text-slate-900 dark:text-white">{result.scores.total}</span>
                        <span className="text-xl font-bold text-slate-300 dark:text-white/20">/100</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{verticalLabel} · {goalLabel}</p>
                    </div>
                    {maturity && (
                      <div className={`rounded-xl border px-4 py-3 ${maturity.badgeClass}`}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Madurez</p>
                        <p className="text-lg font-bold mt-1">{maturity.label}</p>
                        <p className="text-xs opacity-75 mt-0.5">{maturity.description}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/[0.08]">
                    <div className="h-full rounded-full bg-sky-500 transition-all" style={{ width: `${result.scores.total}%` }} />
                  </div>
                </div>

                {/* Score breakdown + summary */}
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Score por área</p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500">0 – 100</span>
                    </div>
                    <div className="space-y-3">
                      {scoreCards.map((item) => (
                        <ScoreBarRow key={item.label} label={item.label} value={item.value} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-3">Resumen ejecutivo</p>
                      <ul className="space-y-2">
                        {result.report.summary.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            <span className="mt-[0.5em] h-1.5 w-1.5 flex-none rounded-full bg-sky-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-amber-200/80 dark:border-amber-500/20 bg-amber-50/60 dark:bg-amber-500/[0.06] p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600 dark:text-amber-400 mb-3">Prioridades detectadas</p>
                      <ul className="space-y-2.5">
                        {result.report.weakPoints.map((item, index) => (
                          <li key={item} className="flex gap-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            <span className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-amber-500/20 text-[9px] font-bold text-amber-700 dark:text-amber-400 mt-0.5">
                              {index + 1}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Quick wins + Roadmap */}
                <div className="grid gap-4 xl:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/[0.05] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400 mb-3">Quick wins · 7 días</p>
                    <ul className="space-y-2">
                      {result.report.quickWins.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          <span className="mt-[0.5em] h-1.5 w-1.5 flex-none rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-3">Roadmap · 30-90 días</p>
                    <ul className="space-y-3">
                      {result.report.roadmap.map((item) => (
                        <li key={item.title}>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-sky-600 dark:text-sky-400 mb-0.5">{item.title}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.goal}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Impact matrix */}
                <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Matriz impacto vs esfuerzo</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {result.report.impactMatrix.map((group) => (
                      <div key={group.label} className="rounded-xl border border-slate-100 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02] p-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-2">{group.label}</p>
                        <ul className="space-y-1.5">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-2 text-xs text-slate-600 dark:text-slate-300">
                              <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-sky-400/60" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button as="a" href="/#contacto" variant="shine">
                    Agendar diagnóstico gratis
                  </Button>
                  <Button variant="ghost" onClick={handlePdfDownload} disabled={pdfStatus === "loading"}>
                    {pdfStatus === "loading" ? "Generando PDF…" : "Descargar PDF"}
                  </Button>
                  <Button as="a" href="/#contacto" variant="ghost">
                    Hablar con el equipo
                  </Button>
                </div>

                {submitStatus === "saving" && <p className="text-xs text-slate-400 dark:text-slate-500">Guardando análisis…</p>}
                {submitStatus === "saved" && <p className="text-xs text-sky-600 dark:text-sky-400">Informe generado.{emailSent ? " Email enviado." : ""}</p>}
                {submitStatus === "error" && <p className="text-xs text-amber-600 dark:text-amber-400">No se pudo guardar. Inténtalo más tarde.</p>}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-500/[0.08] px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-slate-100 dark:border-white/[0.05]">
            <Button variant="ghost" onClick={goBack} disabled={step === 0} className="w-full sm:w-auto">
              ← Anterior
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="shine" onClick={goNext} className="w-full sm:w-auto">
                {nextLabel} →
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setStep(0)} className="w-full sm:w-auto">
                Reiniciar
              </Button>
            )}
          </div>
          </div>
        </div>
      </div>

      <aside className="order-3 min-w-0 space-y-4 lg:sticky lg:top-24 xl:order-none">
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-4">Tu análisis</p>
          <div className="space-y-3">
            <SummaryRow label="Perfil" value={verticalLabel} />
            <SummaryRow label="Objetivo" value={goalLabel} />
            <SummaryRow label="Paso" value={`${steps[step]?.id ?? "?"} / ${steps.length}`} />
            <SummaryRow label="Score" value={result ? `${result.scores.total}/100` : "—"} />
          </div>
          <div className="mt-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/[0.06]">
              <div className="h-full rounded-full bg-sky-500 transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">Completado {progress}%</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-3">Privacidad</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Sin registro obligatorio. Email opcional solo para recibir el PDF.
          </p>
          <div className="mt-3 flex items-start gap-2 rounded-xl border border-sky-200/80 dark:border-sky-500/20 bg-sky-50/60 dark:bg-sky-500/[0.06] px-3 py-2.5">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 flex-none text-sky-500 mt-0.5" fill="currentColor" aria-hidden>
              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-sky-700 dark:text-sky-300">Sin PII en analytics. Solo eventos agregados.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-3">¿Prefieres hablar?</p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Revisamos tu caso en 45 min y dejamos un plan accionable.
          </p>
          <Button as="a" href="/#contacto" variant="shine" size="sm" className="w-full">
            Agendar diagnóstico
          </Button>
        </div>
      </aside>
    </div>
  );
}




