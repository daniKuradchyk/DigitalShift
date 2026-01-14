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
      className={`group relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-2xl border px-3 py-3 text-sm transition focus-within:ring-2 focus-within:ring-brand-200 sm:gap-3 sm:px-4 sm:py-4 ${
        checked
          ? "border-brand-400 bg-white/90 text-slate-900 shadow-[0_18px_40px_-28px_rgba(14,29,74,0.55)] dark:border-brand-500/50 dark:bg-slate-900/80 dark:text-white"
          : "border-slate-200 bg-white/70 text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_34px_-26px_rgba(14,29,74,0.35)] dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span
        aria-hidden
        className={`absolute left-0 top-0 h-full w-1 ${checked ? "bg-[linear-gradient(180deg,#0e1d4a,#4168e1,#6389ff)]" : "bg-transparent"}`}
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 text-brand-700 shadow-sm dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200 sm:h-8 sm:w-8">
          {icon}
        </span>
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{description}</span>
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
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="relative flex h-10 items-center rounded-2xl border border-slate-200 bg-white/85 px-2 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/75 sm:h-11">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-full w-full appearance-none bg-transparent px-3 pr-10 text-sm text-slate-900 focus:outline-none dark:text-slate-100 dark:[color-scheme:dark]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ color: "var(--select-option-color)", backgroundColor: "var(--select-option-bg)" }}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 8 4 4 4-4" />
          </svg>
        </span>
      </div>
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400">{help}</p> : null}
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
    <label
      className={`group flex cursor-pointer flex-col gap-3 rounded-2xl border px-4 py-3 text-sm shadow-[0_14px_34px_-26px_rgba(14,29,74,0.35)] transition hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-200 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${
        checked
          ? "border-brand-400 bg-brand-50/70 text-slate-900 dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-slate-100"
          : "border-slate-200 bg-white/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
      }`}
    >
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{label}</span>
        {description ? <span className="block text-xs text-slate-500 dark:text-slate-400">{description}</span> : null}
      </span>
      <span
        aria-hidden
        className={`relative h-6 w-11 flex-none rounded-full border transition ${
          checked
            ? "border-brand-500/70 bg-brand-500/20"
            : "border-slate-300 bg-slate-200/70 dark:border-slate-700 dark:bg-slate-800"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full shadow transition ${
            checked ? "translate-x-6 bg-white" : "translate-x-1 bg-white"
          } dark:bg-slate-900`}
        />
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
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <div className="relative flex h-10 items-center rounded-2xl border border-slate-200 bg-white/85 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/75 sm:h-11">
        <input
          id={id}
          type="text"
          inputMode={inputMode}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400">{help}</p> : null}
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
      <label htmlFor={id} className="text-sm font-medium text-slate-700 dark:text-slate-200">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={3}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white/85 px-3 py-2 text-sm text-slate-900 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400">{help}</p> : null}
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

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-brand-100 bg-brand-50 text-brand-700 shadow-sm dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200 sm:h-10 sm:w-10">
      {children}
    </span>
  );
}

type ScoreBarRowProps = {
  label: string;
  value: number;
};

function ScoreBarRow({ label, value }: ScoreBarRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="font-semibold text-slate-800 dark:text-slate-200">{label}</span>
        <span className="text-slate-500 dark:text-slate-400">{value}/100</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/60">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#0e1d4a,#4168e1,#6389ff)] shadow-[0_6px_16px_-10px_rgba(65,104,225,0.9)]"
          style={{ width: `${value}%` }}
        />
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
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-[0_14px_34px_-26px_rgba(14,29,74,0.35)] dark:border-slate-700 dark:bg-slate-900/80 sm:p-5">
      <div aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-[linear-gradient(180deg,#0e1d4a,#4168e1,#6389ff)]" />
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
        <IconBadge>{icon}</IconBadge>
        <div className="min-w-0 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Paso {stepId}</p>
          <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
        </div>
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

  const stepLabel = steps[step]?.title ?? "Resultado";
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
    <div className="grid gap-5 sm:gap-6 xl:grid-cols-[220px_minmax(0,1fr)_320px] items-start">
      <nav className="order-1 min-w-0 xl:order-none">
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-4 sm:p-5 shadow-[0_18px_50px_-40px_rgba(14,29,74,0.45)] dark:border-slate-700 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Ruta del analisis</p>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{progress}%</span>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scroll-px-4 xl:block xl:space-y-2 xl:overflow-visible xl:pb-0 xl:snap-none">
            {steps.map((s, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`group relative flex min-w-[150px] snap-start items-start gap-3 overflow-hidden rounded-2xl border px-3 py-3 text-left text-xs transition sm:min-w-[170px] xl:min-w-0 ${
                    isActive
                      ? "border-brand-400 bg-brand-50/80 text-brand-800 shadow-[0_16px_36px_-26px_rgba(14,29,74,0.45)] dark:border-brand-500/60 dark:bg-brand-500/10 dark:text-brand-200"
                      : "border-slate-200 bg-white/75 text-slate-600 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_34px_-26px_rgba(14,29,74,0.35)] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-0 h-full w-1 ${isActive || isDone ? "bg-[linear-gradient(180deg,#0e1d4a,#4168e1,#6389ff)]" : "bg-transparent"}`}
                  />
                  <span
                    className={`flex h-9 w-9 flex-none items-center justify-center rounded-xl border text-[11px] font-semibold ${
                      isActive
                        ? "border-brand-400 bg-white text-brand-700 dark:border-brand-500/60 dark:bg-slate-900 dark:text-brand-200"
                        : isDone
                          ? "border-brand-300 bg-brand-50 text-brand-700 dark:border-brand-400/60 dark:bg-brand-500/10 dark:text-brand-200"
                          : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    {isDone ? Icons.check : s.id}
                  </span>
                  <span>
                    <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">Paso {s.id}</span>
                    <span className="block text-sm font-semibold text-slate-900 dark:text-slate-100">{s.title}</span>
                    <span className="block text-[11px] text-slate-500 dark:text-slate-400">{s.summary}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-xs text-slate-600 shadow-[0_12px_30px_-26px_rgba(14,29,74,0.3)] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          Te llevara 5-8 min. Resultado inmediato. Sin registro.
        </div>
      </nav>

      <div className="order-2 min-w-0 space-y-6 xl:order-none">
        <div className="relative w-full max-w-full overflow-hidden rounded-[24px] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] p-3 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.6)] dark:border-slate-700 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(2,6,23,0.95))] sm:rounded-[28px] sm:p-5 lg:p-6 xl:rounded-[32px] xl:p-8">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_12%_12%,rgba(99,137,255,0.18),transparent_55%),radial-gradient(circle_at_88%_0%,rgba(14,29,74,0.14),transparent_45%)]" />
            <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:32px_32px] dark:bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)]" />
          </div>
          <div className="relative space-y-6">
            <header className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6">
                <div className="space-y-3">
                  <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                    Diagnostico guiado
                  </p>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 sm:text-2xl">Analisis rapido en 5-8 min</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Marca las respuestas mas cercanas a tu realidad. El resultado aparece al instante.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Sin registro", "Resultado inmediato", "PDF incluido"].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/75 px-3 py-2.5 text-xs shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] dark:border-slate-700 dark:bg-slate-900/70 sm:px-4 sm:py-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    Paso {steps[step]?.id ?? "9"} de {steps.length}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {steps[step]?.title ?? "Resultado"} - {progress}%
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/60">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#0e1d4a,#4168e1,#6389ff)] shadow-[0_6px_16px_-10px_rgba(65,104,225,0.9)] transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
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
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 dark:bg-slate-900/75 p-4 text-sm text-slate-600 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                    Puedes continuar sin email. El informe se muestra en pantalla.
                  </div>
                )}
              </div>
            )}

            {step === steps.length - 1 && !result ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 dark:bg-slate-900/75 p-4 text-sm text-slate-600 shadow-[0_12px_30px_-24px_rgba(14,29,74,0.35)] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                Completa los pasos anteriores para ver el informe final.
              </div>
            ) : null}

            {step === steps.length - 1 && result ? (
              <div className="space-y-6">
                <StepHeader
                  stepId="10"
                  title="Resultado"
                  description="Informe accionable basado en tus respuestas."
                  icon={Icons.check}
                />

                <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
                  <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_26px_70px_-44px_rgba(14,29,74,0.6)] dark:border-slate-700 dark:bg-slate-900/80">
                      <div aria-hidden className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/10 blur-2xl" />
                      </div>
                      <div className="relative space-y-4">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <IconBadge>{Icons.chart}</IconBadge>
                              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Diagnostico ejecutivo</p>
                            </div>
                            <div className="flex flex-wrap items-baseline gap-3">
                              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{result.scores.total}/100</p>
                              <span className="rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                                Score total
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Perfil: {verticalLabel} | Objetivo: {goalLabel}</p>
                          </div>
                          {maturity ? (
                            <div className={`rounded-2xl border px-4 py-3 text-xs shadow-sm ${maturity.badgeClass}`}>
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em]">Nivel de madurez</p>
                              <p className="mt-2 text-base font-semibold">{maturity.label}</p>
                              <p className="mt-1 text-xs opacity-80">{maturity.description}</p>
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/60">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(90deg,#0e1d4a,#4168e1,#6389ff)] shadow-[0_8px_20px_-12px_rgba(65,104,225,0.8)]"
                            style={{ width: `${result.scores.total}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Score por area</p>
                        <span className="text-xs text-slate-400 dark:text-slate-500">Base 0-100</span>
                      </div>
                      <div className="mt-4 space-y-3">
                        {scoreCards.map((item) => (
                          <ScoreBarRow key={item.label} label={item.label} value={item.value} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-700 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Resumen ejecutivo</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {result.report.summary.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-700 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Prioridades detectadas</p>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {result.report.weakPoints.map((item, index) => (
                          <li key={item} className="flex gap-3">
                            <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-amber-200 bg-amber-50 text-[10px] font-semibold text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-700 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Quick wins (7 dias)</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.report.quickWins.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-700 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Roadmap (30-90 dias)</p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                      {result.report.roadmap.map((item) => (
                        <li key={item.title} className="space-y-1">
                          <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                            {item.title}
                          </span>
                          <span className="block">{item.goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 text-sm text-slate-700 shadow-[0_18px_44px_-32px_rgba(14,29,74,0.4)] dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Matriz impacto vs esfuerzo</p>
                    <span className="text-xs text-slate-400 dark:text-slate-500">Prioriza acciones</span>
                  </div>
                  <div className="mt-4 grid gap-3 xl:grid-cols-2">
                    {result.report.impactMatrix.map((group) => (
                      <div
                        key={group.label}
                        className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-[0_12px_28px_-26px_rgba(14,29,74,0.3)] dark:border-slate-700 dark:bg-slate-900/70"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">{group.label}</p>
                        <ul className="mt-2 space-y-1 text-xs text-slate-600 dark:text-slate-300">
                          {group.items.map((item) => (
                            <li key={item} className="flex gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-brand-500/70" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button as="a" href="/#contacto" variant="shine" className="w-full sm:w-auto">
                    Agendar diagnostico gratis
                  </Button>
                  <Button as="a" href="/#contacto" variant="ghost" className="w-full sm:w-auto">
                    Hablar por DM / Contactar
                  </Button>
                  <Button variant="ghost" onClick={handlePdfDownload} disabled={pdfStatus === "loading"} className="w-full sm:w-auto">
                    {pdfStatus === "loading" ? "Generando PDF..." : "Descargar PDF"}
                  </Button>
                </div>

                {submitStatus === "saving" ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">Guardando tu analisis...</p>
                ) : submitStatus === "saved" ? (
                  <p className="text-xs text-brand-700 dark:text-brand-200">
                    Informe generado. {emailSent ? "Email enviado." : "Puedes descargar el PDF."}
                  </p>
                ) : submitStatus === "error" ? (
                  <p className="text-xs text-amber-700 dark:text-amber-200">No se pudo guardar el informe. Intentalo mas tarde.</p>
                ) : null}
              </div>
            ) : null}
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/90 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-700 shadow-[0_12px_30px_-24px_rgba(120,53,15,0.35)] dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="ghost" onClick={goBack} disabled={step === 0} className="w-full sm:w-auto">
              Anterior
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="shine" onClick={goNext} className="w-full sm:w-auto">
                {nextLabel}
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
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 dark:bg-slate-900/75 p-4 sm:p-6 shadow-[0_18px_50px_-36px_rgba(14,29,74,0.5)] dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <IconBadge>{Icons.chart}</IconBadge>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Resumen rapido</p>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <SummaryRow label="Perfil" value={verticalLabel} />
            <SummaryRow label="Objetivo" value={goalLabel} />
            <SummaryRow label="Paso actual" value={stepLabel} />
            <SummaryRow label="Score total" value={result ? `${result.scores.total}/100` : "Pendiente"} />
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/60">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#0e1d4a,#4168e1,#6389ff)] shadow-[0_8px_20px_-12px_rgba(65,104,225,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Progreso {progress}%</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/85 dark:bg-slate-900/75 p-4 sm:p-6 shadow-[0_16px_46px_-32px_rgba(14,29,74,0.45)] dark:border-slate-700 dark:bg-slate-900/70">
          <div className="flex items-center gap-3">
            <IconBadge>{Icons.mail}</IconBadge>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Privacidad</p>
          </div>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Resultado inmediato. Sin registro obligatorio. Email opcional solo si quieres el PDF.
          </p>
          <div className="mt-4 rounded-2xl border border-brand-100 bg-brand-50/70 px-3 py-2 text-xs text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
            No enviamos PII a analytics. Solo eventos agregados.
          </div>
        </div>
      </aside>
    </div>
  );
}




