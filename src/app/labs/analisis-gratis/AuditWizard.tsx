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
  { id: "7", title: "Riesgos", summary: "Seguridad y RGPD" },
  { id: "8", title: "Informe", summary: "Recibir por email" },
  { id: "9", title: "Resultado", summary: "Diagnostico final" },
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
  risk: AuditAnswers["risk"];
  contact: AuditContact;
};

const initialDraft: AuditDraft = {
  vertical: "",
  goal: "",
  presence: {
    websiteStatus: "basic",
    ctaClarity: false,
    socialPresence: "sporadic",
    tracking: "none",
    mainChannel: "boca-oreja",
  },
  sales: {
    leadTool: "manual",
    responseTime: "24-48h",
    followUp: "sin-proceso",
  },
  operations: {
    processDocumentation: false,
    repetitionLevel: "medio",
    automationLevel: "ninguna",
    errorRate: "ocasional",
    bottleneck: "",
  },
  data: {
    kpiUsage: "none",
    reportingFrequency: "mensual",
    crmErp: "none",
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
      className={`group flex cursor-pointer flex-col gap-2 rounded-2xl border px-4 py-3 text-sm transition focus-within:ring-2 focus-within:ring-brand-200 ${
        checked
          ? "border-brand-400 bg-brand-50/80 text-slate-900 shadow-[0_16px_40px_-26px_rgba(14,29,74,0.45)] dark:border-brand-400/60 dark:bg-brand-500/10 dark:text-white"
          : "border-slate-200 bg-white/70 text-slate-700 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/80 text-brand-700 ring-1 ring-brand-100 dark:bg-slate-900/70 dark:text-brand-200 dark:ring-brand-500/30">
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
      <div className="relative flex h-11 items-center rounded-2xl border border-slate-200 bg-white/80 shadow-sm transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70">
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
    <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm shadow-sm transition hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70">
      <input type="checkbox" checked={checked} onChange={onChange} className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
      <span>
        <span className="block font-semibold text-slate-700 dark:text-slate-200">{label}</span>
        {description ? <span className="block text-xs text-slate-500 dark:text-slate-400">{description}</span> : null}
      </span>
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
      <div className="relative flex h-11 items-center rounded-2xl border border-slate-200 bg-white/80 shadow-sm transition focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70">
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
        className="w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-500"
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
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-500/30">
      {children}
    </span>
  );
}

type StepHeaderProps = {
  stepId: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

function StepHeader({ stepId, title, description, icon }: StepHeaderProps) {
  return (
    <div className="flex items-start gap-3">
      <IconBadge>{icon}</IconBadge>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Paso {stepId}</p>
        <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-300">{description}</p>
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
    if (current === 7) {
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
      { label: "Captacion", value: `${result.scores.acquisition}/100` },
      { label: "Web", value: `${result.scores.web}/100` },
      { label: "Ventas", value: `${result.scores.sales}/100` },
      { label: "Operaciones", value: `${result.scores.operations}/100` },
      { label: "Datos", value: `${result.scores.data}/100` },
      { label: "Riesgos", value: `${result.scores.risk}/100` },
    ];
  }, [result]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] items-start">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_28px_70px_-48px_rgba(14,29,74,0.55)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Formulario guiado</p>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analisis rapido en 5-8 min</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Marca las respuestas mas cercanas a tu realidad. El resultado aparece al instante.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                Paso {steps[step]?.id ?? "9"} de {steps.length}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">Progreso {progress}%</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/70 dark:bg-slate-700/60" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
              <div className="h-full origin-left rounded-full bg-brand-500/80 transition-transform" style={{ transform: `scaleX(${progress / 100})` }} />
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`group flex items-start gap-3 rounded-2xl border px-3 py-3 text-left text-xs transition ${
                    isActive
                      ? "border-brand-400 bg-brand-50/80 text-brand-700 shadow-sm dark:border-brand-500/60 dark:bg-brand-500/10 dark:text-brand-200"
                      : "border-slate-200 bg-white/70 text-slate-600 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border text-[11px] font-semibold ${
                      isActive
                        ? "border-brand-400 bg-brand-500/10 text-brand-700 dark:border-brand-400/60 dark:text-brand-200"
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

          <div className="mt-8 space-y-6">
            {step === 0 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="1"
                  title="Perfil"
                  description="Selecciona el perfil que mas se parezca a tu negocio."
                  icon={Icons.user}
                />
                <fieldset className="grid gap-3 sm:grid-cols-2">
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
                <fieldset className="grid gap-3 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                <div className="grid gap-4 sm:grid-cols-2">
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
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="7"
                  title="Riesgos"
                  description="Seguridad basica y RGPD."
                  icon={Icons.shield}
                />
                <div className="grid gap-3 sm:grid-cols-2">
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

            {step === 7 && (
              <div className="space-y-6">
                <StepHeader
                  stepId="8"
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
                  <div className="grid gap-4 sm:grid-cols-2">
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
                    <div className="sm:col-span-2 flex items-start gap-2">
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
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                    Puedes continuar sin email. El informe se muestra en pantalla.
                  </div>
                )}
              </div>
            )}

            {step === steps.length - 1 && !result ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                Completa los pasos anteriores para ver el informe final.
              </div>
            ) : null}

            {step === steps.length - 1 && result ? (
              <div className="space-y-6">
                <StepHeader
                  stepId="9"
                  title="Resultado"
                  description="Informe accionable basado en tus respuestas."
                  icon={Icons.check}
                />

                <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_26px_70px_-44px_rgba(14,29,74,0.6)] dark:border-slate-700 dark:bg-slate-900/80">
                  <div className="flex items-center gap-3">
                    <IconBadge>{Icons.chart}</IconBadge>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Score total</p>
                  </div>
                  <div className="mt-3 flex flex-wrap items-baseline gap-3">
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{result.scores.total}/100</p>
                    <span className="rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                      {verticalLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Objetivo: {goalLabel}.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {scoreCards.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{item.label}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Resumen ejecutivo</h5>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {result.report.summary.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-500/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Puntos flojos detectados</h5>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {result.report.weakPoints.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-500/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Quick wins (7 dias)</h5>
                      <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {result.report.quickWins.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald-500/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                      <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Roadmap (30-90 dias)</h5>
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
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200">
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Matriz impacto vs esfuerzo</h5>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {result.report.impactMatrix.map((group) => (
                      <div key={group.label} className="rounded-2xl border border-slate-200 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/70">
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

                <div className="flex flex-wrap items-center gap-3">
                  <Button as="a" href="/#contacto" variant="shine">
                    Agendar diagnostico gratis
                  </Button>
                  <Button as="a" href="/#contacto" variant="ghost">
                    Hablar por DM / Contactar
                  </Button>
                  <Button variant="ghost" onClick={handlePdfDownload} disabled={pdfStatus === "loading"}>
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
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              {error}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Button variant="ghost" onClick={goBack} disabled={step === 0}>
              Anterior
            </Button>
            {step < steps.length - 1 ? (
              <Button variant="shine" onClick={goNext}>
                {nextLabel}
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setStep(0)}>
                Reiniciar
              </Button>
            )}
          </div>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
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
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
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
