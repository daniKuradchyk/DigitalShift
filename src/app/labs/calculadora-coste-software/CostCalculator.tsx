"use client";

import { useState, useMemo, useCallback } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  PROJECT_TYPES,
  MODULES,
  COMPLEXITY_MULTIPLIERS,
  USERS_SCALE_MULTIPLIERS,
  DESIGN_LEVELS,
  QA_LEVELS,
  INFRA_LEVELS,
  SECURITY_OPTIONS,
  SCENARIOS,
  type ModuleLevel,
  type ScenarioKey,
} from "./config";
import { calcQuick, calcAdvanced, type CalcResult, type QuickInput, type AdvancedInput } from "./engine";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function fmtH(n: number) {
  return `${n.toLocaleString("es-ES")} h`;
}

const MODULE_SECTIONS = Array.from(new Set(MODULES.map((m) => m.section)));

const LEVEL_LABELS: Record<ModuleLevel, string> = {
  none:     "No incluir",
  basic:    "Básico",
  medium:   "Medio",
  advanced: "Avanzado",
};

const LEVEL_COLORS: Record<ModuleLevel, string> = {
  none:     "bg-slate-100 dark:bg-white/[0.04] text-slate-500 dark:text-slate-500",
  basic:    "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/30",
  medium:   "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30",
  advanced: "bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  options,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; description?: string }[];
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 dark:border-white/[0.10] bg-white dark:bg-white/[0.03] text-slate-800 dark:text-slate-200 text-sm px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-400 transition-colors"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {options.find((o) => o.value === value)?.description && (
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-500">
          {options.find((o) => o.value === value)?.description}
        </p>
      )}
    </div>
  );
}

function NumberStepper({
  label,
  value,
  onChange,
  min = 0,
  max = 20,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        {label}
      </label>
      {hint && <p className="text-xs text-slate-500 dark:text-slate-500 mb-2">{hint}</p>}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="h-9 w-9 rounded-lg border border-slate-200 dark:border-white/[0.10] bg-white dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-colors text-lg font-bold"
        >
          −
        </button>
        <span className="min-w-[2rem] text-center text-lg font-bold text-slate-900 dark:text-white">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="h-9 w-9 rounded-lg border border-slate-200 dark:border-white/[0.10] bg-white dark:bg-white/[0.03] text-slate-600 dark:text-slate-400 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-colors text-lg font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}

function LevelPicker({
  value,
  onChange,
}: {
  value: ModuleLevel;
  onChange: (v: ModuleLevel) => void;
}) {
  const levels: ModuleLevel[] = ["none", "basic", "medium", "advanced"];
  return (
    <div className="flex gap-1">
      {levels.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={`flex-1 rounded-lg border px-1.5 py-1 text-[10px] font-semibold transition-all ${
            value === l
              ? LEVEL_COLORS[l] + " border-current shadow-sm"
              : "border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-600 hover:border-slate-300 dark:hover:border-white/[0.12]"
          }`}
        >
          {l === "none" ? "—" : LEVEL_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function PhaseBar({ label, pct, hours }: { label: string; pct: number; hours: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-600 dark:text-slate-400">{label}</span>
        <span className="font-semibold text-slate-700 dark:text-slate-300">{hours} h · {pct}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-500 dark:to-indigo-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ScenarioCard({
  scenarioKey,
  data,
  selected,
  onSelect,
}: {
  scenarioKey: ScenarioKey;
  data: { hours: number; price: number };
  selected: boolean;
  onSelect: () => void;
}) {
  const s = SCENARIOS[scenarioKey];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex-1 rounded-2xl border p-4 text-left transition-all duration-200 ${
        selected
          ? "border-sky-400 dark:border-sky-500 bg-sky-50/80 dark:bg-sky-500/10 shadow-md"
          : "border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] hover:border-slate-300 dark:hover:border-white/[0.14]"
      }`}
    >
      <p className={`text-xs font-bold uppercase tracking-[0.14em] mb-2 ${s.color}`}>{s.label}</p>
      <p className="text-xl font-extrabold text-slate-900 dark:text-white">{fmt(data.price)}</p>
      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{fmtH(data.hours)}</p>
    </button>
  );
}

function ResultPanel({ result, copied, onCopy }: { result: CalcResult; copied: boolean; onCopy: () => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("mid");

  if (!result.valid) {
    return (
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 text-center text-slate-500 dark:text-slate-500 text-sm">
        Completa los campos para ver la estimación.
      </div>
    );
  }

  const mid = result.scenarios.mid;
  const maxH = Math.max(...result.drivers.map((d) => d.hours), 1);

  return (
    <div className="space-y-5">
      {/* Scenarios */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600 mb-3">Escenarios</p>
        <div className="flex gap-2">
          {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
            <ScenarioCard
              key={k}
              scenarioKey={k}
              data={result.scenarios[k]}
              selected={activeScenario === k}
              onSelect={() => setActiveScenario(k)}
            />
          ))}
        </div>
        <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-600">
          Optimista (0.75×) · Realista (1.0×) · Conservador (1.30×) sobre estimación base de {fmtH(mid.hours)}
        </p>
      </div>

      {/* Timeline + team */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500 mb-1.5">Plazo estimado</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            {result.timeline.minWeeks}–{result.timeline.maxWeeks} sem.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500 mb-1.5">Horas totales</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{fmtH(mid.hours)}</p>
        </div>
      </div>

      {/* Team */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500 mb-3">Equipo recomendado</p>
        <div className="flex flex-wrap gap-2">
          {result.team.map((t) => (
            <span key={t} className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/[0.10] bg-slate-50 dark:bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
              {t}
            </span>
          ))}
        </div>
        {result.approach && (
          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/[0.06] pt-3">
            {result.approach}
          </p>
        )}
      </div>

      {/* Phase breakdown */}
      {result.phases.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500 mb-4">Desglose por fases</p>
          <div className="space-y-3">
            {result.phases.map((ph) => (
              <PhaseBar key={ph.label} label={ph.label} pct={ph.pct} hours={ph.hours} />
            ))}
          </div>
        </div>
      )}

      {/* Cost drivers */}
      {result.drivers.length > 0 && (
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500 mb-4">Principales factores de coste</p>
          <div className="space-y-3">
            {result.drivers.map((d) => (
              <div key={d.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 truncate mr-2">{d.label}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex-shrink-0">{d.hours} h</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100 dark:bg-white/[0.05] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-400 to-indigo-400 dark:from-violet-500 dark:to-indigo-500 transition-all duration-500"
                    style={{ width: `${Math.round((d.hours / maxH) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl border border-sky-200 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-500/10 p-5">
        <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
          ¿Quieres convertir esta estimación en una propuesta real?
        </p>
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
          Revisamos juntos los requisitos y te entregamos una propuesta detallada sin compromiso.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/#contacto"
            onClick={() => trackEvent("calculadora_coste_cta", { from: "result_panel" })}
            className="inline-flex items-center gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
          >
            Solicitar propuesta
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/[0.10] bg-white dark:bg-white/[0.03] text-slate-700 dark:text-slate-300 text-sm font-medium px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-white/[0.06] transition-colors"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M2 8l4 4 8-8" />
                </svg>
                Copiado
              </>
            ) : (
              <>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="5" y="5" width="9" height="9" rx="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" />
                </svg>
                Copiar resumen
              </>
            )}
          </button>
        </div>
      </div>

      <p className="text-[10px] text-slate-400 dark:text-slate-600 leading-relaxed text-center">
        Estimación orientativa basada en proyectos similares. La propuesta final depende de los requisitos concretos, la arquitectura elegida y el equipo asignado. Tarifa de referencia: {new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(80)}/h.
      </p>
    </div>
  );
}

// ─── Quick mode ────────────────────────────────────────────────────────────────

const DEFAULT_QUICK: QuickInput = {
  projectType:      "herramienta-interna",
  complexity:       "medium",
  usersScale:       "small",
  designLevel:      "standard",
  qaLevel:          "thorough",
  infraLevel:       "standard",
  integrations:     0,
  hasDocumentation: true,
};

function QuickMode({ onResult }: { onResult: (r: CalcResult) => void }) {
  const [form, setForm] = useState<QuickInput>(DEFAULT_QUICK);
  const [calculated, setCalculated] = useState(false);

  function set<K extends keyof QuickInput>(key: K, value: QuickInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setCalculated(false);
  }

  function handleCalc() {
    trackEvent("calculadora_coste_calculo", { mode: "quick", projectType: form.projectType });
    onResult(calcQuick(form));
    setCalculated(true);
  }

  return (
    <div className="space-y-6">
      <SelectField
        label="Tipo de proyecto"
        value={form.projectType}
        onChange={(v) => set("projectType", v)}
        options={Object.entries(PROJECT_TYPES).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Complejidad de negocio"
          value={form.complexity}
          onChange={(v) => set("complexity", v)}
          options={Object.entries(COMPLEXITY_MULTIPLIERS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
        />
        <SelectField
          label="Volumen de usuarios"
          value={form.usersScale}
          onChange={(v) => set("usersScale", v)}
          options={Object.entries(USERS_SCALE_MULTIPLIERS).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <SelectField
          label="Nivel de diseño"
          value={form.designLevel}
          onChange={(v) => set("designLevel", v)}
          options={Object.entries(DESIGN_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
        />
        <SelectField
          label="QA y testing"
          value={form.qaLevel}
          onChange={(v) => set("qaLevel", v)}
          options={Object.entries(QA_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
        />
        <SelectField
          label="Infraestructura"
          value={form.infraLevel}
          onChange={(v) => set("infraLevel", v)}
          options={Object.entries(INFRA_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
        />
        <NumberStepper
          label="Integraciones externas"
          value={form.integrations}
          onChange={(v) => set("integrations", v)}
          min={0}
          max={15}
          hint="APIs, CRM, ERP, pasarelas de pago…"
        />
      </div>

      {form.integrations > 0 && (
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <div
            role="checkbox"
            aria-checked={form.hasDocumentation}
            tabIndex={0}
            onClick={() => set("hasDocumentation", !form.hasDocumentation)}
            onKeyDown={(e) => e.key === " " && set("hasDocumentation", !form.hasDocumentation)}
            className={`relative h-5 w-9 rounded-full transition-colors ${form.hasDocumentation ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.hasDocumentation ? "translate-x-4" : ""}`} />
          </div>
          <span className="text-sm text-slate-700 dark:text-slate-300">Las APIs están bien documentadas</span>
        </label>
      )}

      <button
        type="button"
        onClick={handleCalc}
        className="w-full rounded-xl bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-semibold py-3 text-sm transition-colors shadow-md shadow-sky-500/20"
      >
        {calculated ? "Recalcular" : "Calcular estimación"}
      </button>
    </div>
  );
}

// ─── Advanced mode ─────────────────────────────────────────────────────────────

const DEFAULT_ADVANCED: AdvancedInput = {
  projectType:      "app-web-corporativa",
  modules:          {},
  complexity:       "medium",
  usersScale:       "small",
  designLevel:      "standard",
  qaLevel:          "thorough",
  infraLevel:       "standard",
  securityOptions:  [],
  integrations:     0,
  hasDocumentation: true,
};

function AdvancedMode({ onResult }: { onResult: (r: CalcResult) => void }) {
  const [form, setForm] = useState<AdvancedInput>(DEFAULT_ADVANCED);
  const [openSection, setOpenSection] = useState<string | null>(MODULE_SECTIONS[0]);

  function setModule(id: string, level: ModuleLevel) {
    setForm((f) => ({
      ...f,
      modules: { ...f.modules, [id]: level },
    }));
  }

  function toggleSecurity(id: string) {
    setForm((f) => ({
      ...f,
      securityOptions: f.securityOptions.includes(id)
        ? f.securityOptions.filter((x) => x !== id)
        : [...f.securityOptions, id],
    }));
  }

  function set<K extends keyof AdvancedInput>(key: K, value: AdvancedInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // Auto-calculate on every change
  const result = useMemo(() => calcAdvanced(form), [form]);

  // Notify parent when result changes
  useMemo(() => {
    onResult(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const selectedModuleCount = Object.values(form.modules).filter((l) => l !== "none").length;

  return (
    <div className="space-y-4">
      {/* Project type */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-5">
        <SelectField
          label="Tipo de proyecto"
          value={form.projectType}
          onChange={(v) => set("projectType", v)}
          options={Object.entries(PROJECT_TYPES).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
        />
      </div>

      {/* Module sections */}
      {MODULE_SECTIONS.map((section) => {
        const sectionModules = MODULES.filter((m) => m.section === section);
        const activeMods = sectionModules.filter((m) => (form.modules[m.id] ?? "none") !== "none").length;
        const isOpen = openSection === section;
        return (
          <div key={section} className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : section)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">{section}</span>
              <div className="flex items-center gap-2">
                {activeMods > 0 && (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-1.5">
                    {activeMods}
                  </span>
                )}
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </button>
            {isOpen && (
              <div className="border-t border-slate-100 dark:border-white/[0.06] px-5 py-4 space-y-4">
                {sectionModules.map((mod) => (
                  <div key={mod.id}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{mod.label}</p>
                        {mod.description && (
                          <p className="text-xs text-slate-500 dark:text-slate-500">{mod.description}</p>
                        )}
                      </div>
                      {(form.modules[mod.id] ?? "none") !== "none" && (
                        <span className="flex-shrink-0 text-xs text-slate-500 dark:text-slate-500">
                          {mod.hours[form.modules[mod.id] ?? "none"]} h
                        </span>
                      )}
                    </div>
                    <LevelPicker
                      value={form.modules[mod.id] ?? "none"}
                      onChange={(l) => setModule(mod.id, l)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Config options */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-5 space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-600">Configuración técnica</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Complejidad de negocio"
            value={form.complexity}
            onChange={(v) => set("complexity", v)}
            options={Object.entries(COMPLEXITY_MULTIPLIERS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
          />
          <SelectField
            label="Volumen de usuarios"
            value={form.usersScale}
            onChange={(v) => set("usersScale", v)}
            options={Object.entries(USERS_SCALE_MULTIPLIERS).map(([k, v]) => ({ value: k, label: v.label }))}
          />
          <SelectField
            label="Nivel de diseño"
            value={form.designLevel}
            onChange={(v) => set("designLevel", v)}
            options={Object.entries(DESIGN_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
          />
          <SelectField
            label="QA y testing"
            value={form.qaLevel}
            onChange={(v) => set("qaLevel", v)}
            options={Object.entries(QA_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
          />
          <SelectField
            label="Infraestructura"
            value={form.infraLevel}
            onChange={(v) => set("infraLevel", v)}
            options={Object.entries(INFRA_LEVELS).map(([k, v]) => ({ value: k, label: v.label, description: v.description }))}
          />
          <NumberStepper
            label="Integraciones externas"
            value={form.integrations}
            onChange={(v) => set("integrations", v)}
            min={0}
            max={15}
            hint="APIs, CRM, ERP, pasarelas…"
          />
        </div>
        {form.integrations > 0 && (
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              role="checkbox"
              aria-checked={form.hasDocumentation}
              tabIndex={0}
              onClick={() => set("hasDocumentation", !form.hasDocumentation)}
              onKeyDown={(e) => e.key === " " && set("hasDocumentation", !form.hasDocumentation)}
              className={`relative h-5 w-9 rounded-full transition-colors ${form.hasDocumentation ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${form.hasDocumentation ? "translate-x-4" : ""}`} />
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">Las APIs están bien documentadas</span>
          </label>
        )}
      </div>

      {/* Security options */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-600 mb-4">Seguridad y compliance</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SECURITY_OPTIONS.map((opt) => {
            const active = form.securityOptions.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleSecurity(opt.id)}
                className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left text-xs transition-all ${
                  active
                    ? "border-violet-300 dark:border-violet-500/40 bg-violet-50 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300"
                    : "border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/[0.14]"
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                <span className="flex-shrink-0 text-slate-500 dark:text-slate-500">{opt.hours} h</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary badge */}
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-[10px] font-bold px-1.5">
          {selectedModuleCount}
        </span>
        módulos seleccionados · Resultados actualizados en tiempo real
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CostCalculator() {
  const [mode, setMode] = useState<"quick" | "advanced">("quick");
  const [result, setResult] = useState<CalcResult | null>(null);
  const [copied, setCopied] = useState(false);

  const handleModeChange = useCallback((m: "quick" | "advanced") => {
    setMode(m);
    setResult(null);
    trackEvent("calculadora_coste_modo_cambio", { mode: m });
  }, []);

  const handleResult = useCallback((r: CalcResult) => {
    setResult(r);
  }, []);

  const handleCopy = useCallback(() => {
    if (!result?.valid) return;
    const mid = result.scenarios.mid;
    const text = [
      "📊 Estimación de coste de software – Qubelia",
      `Horas: ${mid.hours} h`,
      `Rango: ${fmt(result.scenarios.low.price)} – ${fmt(result.scenarios.high.price)}`,
      `Plazo: ${result.timeline.minWeeks}–${result.timeline.maxWeeks} semanas`,
      `Tarifa: 80 €/h`,
      "",
      `Desglose:\n${result.phases.map((p) => `  · ${p.label}: ${p.hours} h (${p.pct}%)`).join("\n")}`,
      "",
      "Estimación realizada en qubelia.es/labs/calculadora-coste-software",
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      trackEvent("calculadora_coste_cta", { from: "copy_summary" });
    });
  }, [result]);

  // Track page view once
  useMemo(() => {
    trackEvent("calculadora_coste_vista");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section aria-labelledby="cost-calc-title">
      <h2 id="cost-calc-title" className="sr-only">Calculadora de coste</h2>

      {/* Mode switcher */}
      <div className="flex gap-2 p-1 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] w-fit mb-8">
        {(["quick", "advanced"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeChange(m)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all ${
              mode === m
                ? "bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {m === "quick" ? "Estimación rápida" : "Configuración avanzada"}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
        {/* Left: form */}
        <div>
          {mode === "quick" ? (
            <QuickMode onResult={handleResult} />
          ) : (
            <AdvancedMode onResult={handleResult} />
          )}
        </div>

        {/* Right: results (sticky on desktop) */}
        <div className="lg:sticky lg:top-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600 mb-4">
            {mode === "advanced" ? "Resultado en tiempo real" : "Resultado"}
          </p>
          <ResultPanel result={result ?? { valid: false, scenarios: { low: { hours: 0, price: 0 }, mid: { hours: 0, price: 0 }, high: { hours: 0, price: 0 } }, phases: [], totalMidHours: 0, timeline: { minWeeks: 0, maxWeeks: 0 }, team: [], approach: "", drivers: [] }} copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    </section>
  );
}
