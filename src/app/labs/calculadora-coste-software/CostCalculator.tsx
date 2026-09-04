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

// ─── Sub-components ───────────────────────────────────────────────────────────

const FIELD_LABEL = "block text-sm font-medium text-[#101014] mb-1.5";
const FIELD_HINT  = "text-[13px] text-[#63666D] mb-2";

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
      <label className={FIELD_LABEL}>
        {label}
      </label>
      {hint && <p className={FIELD_HINT}>{hint}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-[#C9CCD3] bg-white px-3 py-2.5 text-sm text-[#101014]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {options.find((o) => o.value === value)?.description && (
        <p className="mt-2 text-[13px] text-[#63666D]">
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
      <label className={FIELD_LABEL}>
        {label}
      </label>
      {hint && <p className={FIELD_HINT}>{hint}</p>}
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Restar una integración"
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-9 w-9 items-center justify-center border border-[#C9CCD3] bg-white text-lg text-[#101014] transition-colors hover:border-[#101014]"
        >
          −
        </button>
        <span className="min-w-[2rem] text-center text-lg font-semibold tabular-nums text-[#101014]">{value}</span>
        <button
          type="button"
          aria-label="Sumar una integración"
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-9 w-9 items-center justify-center border border-[#C9CCD3] bg-white text-lg text-[#101014] transition-colors hover:border-[#101014]"
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
    <div className="grid grid-cols-4 gap-px bg-[#E4E6EA]">
      {levels.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={value === l}
          className={`px-1.5 py-1.5 text-[11px] font-medium transition-colors ${
            value === l
              ? "bg-[#101014] text-white"
              : "bg-white text-[#63666D] hover:bg-[#F5F6F8]"
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
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[#3D4046]">{label}</span>
        <span className="font-medium tabular-nums text-[#101014]">{hours} h · {pct}%</span>
      </div>
      <div className="h-1.5 overflow-hidden bg-[#E4E6EA]">
        <div
          className="h-full bg-brand-600 transition-all duration-500"
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
      aria-pressed={selected}
      className={`flex-1 border p-4 text-left transition-colors ${
        selected
          ? "border-[#101014] bg-[#F5F6F8]"
          : "border-[#E4E6EA] bg-white hover:border-[#C9CCD3]"
      }`}
    >
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">{s.label}</p>
      <p className="text-xl font-semibold tracking-tight tabular-nums text-[#101014]">{fmt(data.price)}</p>
      <p className="mt-1 text-xs tabular-nums text-[#63666D]">{fmtH(data.hours)}</p>
    </button>
  );
}

function ResultPanel({ result, copied, onCopy }: { result: CalcResult; copied: boolean; onCopy: () => void }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("mid");

  if (!result.valid) {
    return (
      <div className="border border-[#E4E6EA] bg-white p-6 text-center text-sm text-[#63666D]">
        Completa los campos para ver la estimación.
      </div>
    );
  }

  const mid = result.scenarios.mid;
  const maxH = Math.max(...result.drivers.map((d) => d.hours), 1);

  return (
    <div className="space-y-6">
      {/* Scenarios */}
      <div>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Escenarios</p>
        <div className="flex gap-3">
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
        <p className="mt-3 text-xs leading-relaxed text-[#63666D]">
          Optimista (0.75×) · Realista (1.0×) · Conservador (1.30×) sobre estimación base de {fmtH(mid.hours)}
        </p>
      </div>

      {/* Timeline + team */}
      <dl className="grid grid-cols-2 divide-x divide-[#E4E6EA] border border-[#E4E6EA] bg-white">
        <div className="p-4">
          <dt className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Plazo estimado</dt>
          <dd className="text-lg font-semibold tabular-nums tracking-tight text-[#101014]">
            {result.timeline.minWeeks}–{result.timeline.maxWeeks} sem.
          </dd>
        </div>
        <div className="p-4">
          <dt className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Horas totales</dt>
          <dd className="text-lg font-semibold tabular-nums tracking-tight text-[#101014]">{fmtH(mid.hours)}</dd>
        </div>
      </dl>

      {/* Team */}
      <div className="border border-[#E4E6EA] bg-white p-4">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Equipo recomendado</p>
        <ul className="flex flex-wrap gap-2">
          {result.team.map((t) => (
            <li key={t} className="border border-[#E4E6EA] px-2.5 py-1 text-xs text-[#3D4046]">
              {t}
            </li>
          ))}
        </ul>
        {result.approach && (
          <p className="mt-4 border-t border-[#E4E6EA] pt-4 text-[13px] leading-relaxed text-[#3D4046]">
            {result.approach}
          </p>
        )}
      </div>

      {/* Phase breakdown */}
      {result.phases.length > 0 && (
        <div className="border border-[#E4E6EA] bg-white p-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Desglose por fases</p>
          <div className="space-y-4">
            {result.phases.map((ph) => (
              <PhaseBar key={ph.label} label={ph.label} pct={ph.pct} hours={ph.hours} />
            ))}
          </div>
        </div>
      )}

      {/* Cost drivers */}
      {result.drivers.length > 0 && (
        <div className="border border-[#E4E6EA] bg-white p-4">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Principales factores de coste</p>
          <div className="space-y-4">
            {result.drivers.map((d) => (
              <div key={d.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="mr-2 truncate text-[#3D4046]">{d.label}</span>
                  <span className="flex-shrink-0 font-medium tabular-nums text-[#101014]">{d.hours} h</span>
                </div>
                <div className="h-1.5 overflow-hidden bg-[#E4E6EA]">
                  <div
                    className="h-full bg-brand-600 transition-all duration-500"
                    style={{ width: `${Math.round((d.hours / maxH) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="band-dark p-5 sm:p-6">
        <p className="mb-2 text-base font-semibold leading-snug tracking-tight text-white">
          ¿Quieres convertir esta estimación en una propuesta real?
        </p>
        <p className="mb-5 text-[13px] leading-relaxed text-white/70">
          Revisamos juntos los requisitos y te entregamos una propuesta detallada sin compromiso.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/#contacto"
            onClick={() => trackEvent("calculadora_coste_cta", { from: "result_panel" })}
            className="inline-flex items-center rounded-[2px] bg-white px-4 py-2.5 text-sm font-medium tracking-tight text-[#101014] transition-colors hover:bg-white/90"
          >
            Solicitar propuesta
          </a>
          <button
            type="button"
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-[2px] border border-white/30 px-4 py-2.5 text-sm font-medium tracking-tight text-white transition-colors hover:border-white"
          >
            {copied ? (
              <>
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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

      <p className="text-xs leading-relaxed text-[#63666D]">
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
        <label className="flex cursor-pointer select-none items-center gap-3">
          <div
            role="checkbox"
            aria-checked={form.hasDocumentation}
            tabIndex={0}
            onClick={() => set("hasDocumentation", !form.hasDocumentation)}
            onKeyDown={(e) => e.key === " " && set("hasDocumentation", !form.hasDocumentation)}
            className={`relative h-5 w-9 rounded-full transition-colors ${form.hasDocumentation ? "bg-brand-600" : "bg-[#C9CCD3]"}`}
          >
            <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${form.hasDocumentation ? "translate-x-4" : ""}`} />
          </div>
          <span className="text-sm text-[#3D4046]">Las APIs están bien documentadas</span>
        </label>
      )}

      <button
        type="button"
        onClick={handleCalc}
        className="w-full rounded-[2px] bg-[#101014] py-3 text-sm font-medium tracking-tight text-white transition-colors hover:bg-brand-600"
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
      <div className="border border-[#E4E6EA] bg-white p-5">
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
          <div key={section} className="border border-[#E4E6EA] bg-white">
            <button
              type="button"
              onClick={() => setOpenSection(isOpen ? null : section)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-[#F5F6F8]"
            >
              <span className="text-sm font-semibold tracking-tight text-[#101014]">{section}</span>
              <div className="flex items-center gap-3">
                {activeMods > 0 && (
                  <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center border border-[#E4E6EA] px-1.5 text-[10px] font-medium tabular-nums text-[#101014]">
                    {activeMods}
                  </span>
                )}
                <svg
                  viewBox="0 0 16 16"
                  className={`h-4 w-4 text-[#63666D] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
              <div className="space-y-5 border-t border-[#E4E6EA] px-5 py-5">
                {sectionModules.map((mod) => (
                  <div key={mod.id}>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-[#101014]">{mod.label}</p>
                        {mod.description && (
                          <p className="mt-0.5 text-[13px] text-[#63666D]">{mod.description}</p>
                        )}
                      </div>
                      {(form.modules[mod.id] ?? "none") !== "none" && (
                        <span className="flex-shrink-0 text-xs tabular-nums text-[#63666D]">
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
      <div className="space-y-6 border border-[#E4E6EA] bg-white p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Configuración técnica</p>
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
          <label className="flex cursor-pointer select-none items-center gap-3">
            <div
              role="checkbox"
              aria-checked={form.hasDocumentation}
              tabIndex={0}
              onClick={() => set("hasDocumentation", !form.hasDocumentation)}
              onKeyDown={(e) => e.key === " " && set("hasDocumentation", !form.hasDocumentation)}
              className={`relative h-5 w-9 rounded-full transition-colors ${form.hasDocumentation ? "bg-brand-600" : "bg-[#C9CCD3]"}`}
            >
              <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${form.hasDocumentation ? "translate-x-4" : ""}`} />
            </div>
            <span className="text-sm text-[#3D4046]">Las APIs están bien documentadas</span>
          </label>
        )}
      </div>

      {/* Security options */}
      <div className="border border-[#E4E6EA] bg-white p-5">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">Seguridad y compliance</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {SECURITY_OPTIONS.map((opt) => {
            const active = form.securityOptions.includes(opt.id);
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => toggleSecurity(opt.id)}
                aria-pressed={active}
                className={`flex items-center justify-between gap-2 border px-3 py-2.5 text-left text-xs transition-colors ${
                  active
                    ? "border-[#101014] bg-[#F5F6F8] text-[#101014]"
                    : "border-[#E4E6EA] text-[#3D4046] hover:border-[#C9CCD3]"
                }`}
              >
                <span className="font-medium">{opt.label}</span>
                <span className="flex-shrink-0 tabular-nums text-[#63666D]">{opt.hours} h</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Summary badge */}
      <div className="flex items-center gap-3 text-xs text-[#63666D]">
        <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center border border-[#E4E6EA] px-1.5 text-[10px] font-medium tabular-nums text-[#101014]">
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
      <div className="mb-10 flex w-fit gap-px border border-[#E4E6EA] bg-[#E4E6EA]">
        {(["quick", "advanced"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => handleModeChange(m)}
            aria-pressed={mode === m}
            className={`px-5 py-2.5 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-[#101014] text-white"
                : "bg-white text-[#3D4046] hover:bg-[#F5F6F8]"
            }`}
          >
            {m === "quick" ? "Estimación rápida" : "Configuración avanzada"}
          </button>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px] items-start">
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
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            {mode === "advanced" ? "Resultado en tiempo real" : "Resultado"}
          </p>
          <ResultPanel result={result ?? { valid: false, scenarios: { low: { hours: 0, price: 0 }, mid: { hours: 0, price: 0 }, high: { hours: 0, price: 0 } }, phases: [], totalMidHours: 0, timeline: { minWeeks: 0, maxWeeks: 0 }, team: [], approach: "", drivers: [] }} copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    </section>
  );
}
