"use client";

import { useState, useMemo } from "react";
import Button from "@/components/common/Button";

// ── Process type benchmarks (industry data: UiPath, McKinsey, APQC) ──────────

const PRESETS = {
  "entrada-datos": {
    label: "Entrada de datos",
    desc: "Formularios, registros, actualización de sistemas",
    automPot: 85,
    errorCost: 75,
  },
  "facturas-pagos": {
    label: "Facturación y pagos",
    desc: "AP/AR, conciliaciones, facturas, pagos",
    automPot: 80,
    errorCost: 120,
  },
  "reportes": {
    label: "Generación de informes",
    desc: "Informes periódicos, dashboards, exportaciones",
    automPot: 85,
    errorCost: 50,
  },
  "integraciones-erp": {
    label: "Sincronización ERP/CRM",
    desc: "Conectores entre sistemas, migración de datos",
    automPot: 90,
    errorCost: 100,
  },
  "onboarding": {
    label: "Onboarding / altas",
    desc: "Clientes, empleados, proveedores, contratos",
    automPot: 70,
    errorCost: 200,
  },
  "aprobaciones": {
    label: "Flujos de aprobación",
    desc: "Visados, validaciones, flujos de firma",
    automPot: 60,
    errorCost: 80,
  },
  "atencion-cliente": {
    label: "Atención al cliente",
    desc: "Tickets, consultas, seguimientos, notificaciones",
    automPot: 65,
    errorCost: 60,
  },
  "otro": {
    label: "Otro proceso",
    desc: "",
    automPot: 65,
    errorCost: 75,
  },
} as const;

type PresetKey = keyof typeof PRESETS;

// Integration complexity multiplier on dev cost
const INTEGRATION = {
  baja:  { label: "Baja — APIs estándar, sin sistemas legacy",      mult: 1.00 },
  media: { label: "Media — un ERP/CRM o sistema semiantiguado",     mult: 1.25 },
  alta:  { label: "Alta — múltiples sistemas legacy o SAP/Oracle",  mult: 1.60 },
} as const;
type IntegrationKey = keyof typeof INTEGRATION;

// Scenario multipliers on annual benefit (Nucleus Research methodology)
const SCENARIOS = {
  conservador: { label: "Conservador", mult: 0.60, note: "−40% en beneficios" },
  base:        { label: "Base",        mult: 1.00, note: "Benchmarks estándar del sector" },
  optimista:   { label: "Optimista",   mult: 1.25, note: "+25% si el proceso está muy definido" },
} as const;
type ScenarioKey = keyof typeof SCENARIOS;

const DISCOUNT = 0.10; // NPV discount rate (10%)
const Y1_DIP   = 0.90; // 10% productivity dip in year 1 (industry benchmark)

// ── Types ─────────────────────────────────────────────────────────────────────

interface Process {
  id: string;
  nombre:    string;
  tipo:      PresetKey;
  horasMes:  string;
  personas:  string;
  costeHora: string;
  erroresMes: string;
  costeError: string;
  automPot:   string;
}

interface Project {
  costeDesarrollo: string;
  integracion:     IntegrationKey;
  licencias:       string;
  mantenimientoPct: string;
}

// ── Pure helpers ──────────────────────────────────────────────────────────────

function n(s: string): number {
  const v = parseFloat(s.replace(",", "."));
  return isNaN(v) || v < 0 ? 0 : v;
}

function eur(v: number): string {
  return v.toLocaleString("es-ES", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  });
}

function num(v: number, d = 1): string {
  return v.toLocaleString("es-ES", { maximumFractionDigits: d });
}

// ── Calculation model ─────────────────────────────────────────────────────────

function calcProcess(p: Process) {
  const horas    = n(p.horasMes);
  const personas = n(p.personas);
  const ch       = n(p.costeHora);
  const errores  = n(p.erroresMes);
  const cerr     = n(p.costeError);
  const autom    = Math.min(95, Math.max(0, n(p.automPot))) / 100;
  if (horas === 0 || personas === 0 || ch === 0) return null;
  const horasMes   = horas * personas;
  const laborMes   = horasMes * ch;
  const errorMes   = errores * cerr;
  const costeMes   = laborMes + errorMes;
  const horasRec   = horasMes * autom;
  const ahorroLab  = laborMes * autom;
  const ahorroErr  = errorMes * autom;
  return { costeMes, laborMes, errorMes, horasRec, ahorroLab, ahorroErr };
}

function calcAll(
  procs: Process[],
  proj: Project,
  scenario: ScenarioKey,
) {
  const raw = procs.map(calcProcess).filter(Boolean) as NonNullable<ReturnType<typeof calcProcess>>[];
  if (raw.length === 0) return null;

  const mult      = SCENARIOS[scenario].mult;
  const costeMes  = raw.reduce((s, r) => s + r.costeMes, 0);
  const ahorroMes = raw.reduce((s, r) => s + r.ahorroLab + r.ahorroErr, 0) * mult;
  const horasRec  = raw.reduce((s, r) => s + r.horasRec, 0);
  const ahorroLab = raw.reduce((s, r) => s + r.ahorroLab, 0) * mult;
  const ahorroErr = raw.reduce((s, r) => s + r.ahorroErr, 0) * mult;

  const devBase   = n(proj.costeDesarrollo);
  const devTotal  = devBase * INTEGRATION[proj.integracion].mult;
  const licAnual  = n(proj.licencias);
  const maintPct  = n(proj.mantenimientoPct) / 100;
  const maintAnu  = devTotal * maintPct + licAnual;
  const totalInv  = devTotal + licAnual;   // year-0 outlay

  const benefAnu  = ahorroMes * 12;

  // Year-by-year cash flows (1–3)
  const years = ([1, 2, 3] as const).map((y) => {
    const benef = benefAnu * (y === 1 ? Y1_DIP : 1);
    const coste = y === 1 ? totalInv : maintAnu;
    const neto  = benef - coste;
    const desc  = neto / Math.pow(1 + DISCOUNT, y);
    return { y, benef, coste, neto, desc };
  });

  const npv      = -totalInv + years.reduce((s, r) => s + r.desc, 0);
  const net3     = years.reduce((s, r) => s + r.neto, 0);
  const roi3     = totalInv > 0 ? (net3 / totalInv) * 100 : 0;
  const payback  = totalInv > 0 && ahorroMes > 0 ? totalInv / ahorroMes : Infinity;
  const ftes     = horasRec / 160; // FTE equivalent (160h/mo)

  let oportunidad: "alta" | "media" | "baja";
  if      (payback <= 12) oportunidad = "alta";
  else if (payback <= 24) oportunidad = "media";
  else                    oportunidad = "baja";

  return {
    costeMes, costeAnual: costeMes * 12,
    ahorroMes, ahorroAnual: benefAnu,
    horasRec, ahorroLab, ahorroErr, ftes,
    totalInv, maintAnu,
    payback, roi3, npv,
    years, oportunidad,
    nProcs: raw.length,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

const INP = "w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.04] px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-colors";
const LBL = "block text-[11px] font-semibold uppercase tracking-[0.10em] text-slate-500 dark:text-slate-500 mb-1.5";

// ── Process Card ──

interface ProcessCardProps {
  proc: Process;
  idx: number;
  canRemove: boolean;
  onChange(id: string, k: keyof Process, v: string): void;
  onRemove(id: string): void;
}

function ProcessCard({ proc, idx, canRemove, onChange, onRemove }: ProcessCardProps) {
  const preset = PRESETS[proc.tipo];
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-slate-50/60 dark:bg-white/[0.01] border-b border-slate-100 dark:border-white/[0.05]">
        <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-[9px] font-bold text-indigo-600 dark:text-indigo-400">
          {idx + 1}
        </span>
        <input
          type="text"
          value={proc.nombre}
          onChange={e => onChange(proc.id, "nombre", e.target.value)}
          placeholder="Nombre del proceso (opcional)"
          className="flex-1 min-w-0 bg-transparent text-sm font-medium text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none"
        />
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(proc.id)}
            aria-label="Eliminar proceso"
            className="shrink-0 text-slate-300 dark:text-slate-700 hover:text-red-400 dark:hover:text-red-500 transition-colors"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Type selector */}
        <div>
          <label className={LBL}>Tipo de proceso</label>
          <select
            value={proc.tipo}
            onChange={e => onChange(proc.id, "tipo", e.target.value)}
            className={INP}
          >
            {(Object.keys(PRESETS) as PresetKey[]).map(k => (
              <option key={k} value={k}>{PRESETS[k].label}</option>
            ))}
          </select>
          {preset.desc && (
            <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">{preset.desc}</p>
          )}
        </div>

        {/* Fields grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className={LBL}>Horas manuales / mes</label>
            <input type="number" min="0" placeholder="40" value={proc.horasMes}
              onChange={e => onChange(proc.id, "horasMes", e.target.value)} className={INP} />
          </div>
          <div>
            <label className={LBL}>Personas implicadas</label>
            <input type="number" min="1" placeholder="2" value={proc.personas}
              onChange={e => onChange(proc.id, "personas", e.target.value)} className={INP} />
          </div>
          <div>
            <label className={LBL}>Coste / hora (€)</label>
            <input type="number" min="0" placeholder="25" value={proc.costeHora}
              onChange={e => onChange(proc.id, "costeHora", e.target.value)} className={INP} />
            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-600">Coste laboral total incluidos SS</p>
          </div>
          <div>
            <label className={LBL}>Errores o retrabajos / mes</label>
            <input type="number" min="0" placeholder="5" value={proc.erroresMes}
              onChange={e => onChange(proc.id, "erroresMes", e.target.value)} className={INP} />
          </div>
          <div>
            <label className={LBL}>Coste por error (€)</label>
            <input type="number" min="0" placeholder={String(preset.errorCost)} value={proc.costeError}
              onChange={e => onChange(proc.id, "costeError", e.target.value)} className={INP} />
            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-600">Ref. {preset.label}: {preset.errorCost} €</p>
          </div>
          <div>
            <label className={LBL}>
              Potencial de automatización —{" "}
              <span className="text-indigo-500 dark:text-indigo-400">{proc.automPot}%</span>
            </label>
            <input
              type="range" min="20" max="95" step="5"
              value={proc.automPot}
              onChange={e => onChange(proc.id, "automPot", e.target.value)}
              className="w-full h-1.5 mt-2 accent-indigo-500 cursor-pointer"
            />
            <p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-600">
              Ref. sector para «{preset.label}»: {preset.automPot}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SVG projection chart ──

interface YearRow { y: number; benef: number; coste: number; neto: number; }

function ProjectionBars({ years }: { years: YearRow[] }) {
  const maxVal = Math.max(1, ...years.flatMap(r => [r.benef, r.coste]));
  const BW = 24;   // bar width
  const GAP = 6;   // gap between pair
  const GW = BW * 2 + GAP + 28; // group width incl. spacing
  const H = 72;
  const W = years.length * GW;

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H + 18}`} className="w-full" aria-hidden>
        {/* Baseline */}
        <line x1="0" y1={H} x2={W} y2={H} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />

        {years.map((yr, i) => {
          const bH = (yr.benef / maxVal) * H;
          const cH = (yr.coste / maxVal) * H;
          const x  = i * GW + 10;
          const cx = x + BW + GAP / 2 + BW / 2 - GAP / 2; // center of group
          return (
            <g key={yr.y}>
              {/* Cost bar (gray) */}
              <rect x={x} y={H - cH} width={BW} height={cH} rx="3"
                fill="rgba(148,163,184,0.30)" />
              {/* Savings bar (green) */}
              <rect x={x + BW + GAP} y={H - bH} width={BW} height={bH} rx="3"
                fill="rgba(52,211,153,0.65)" />
              {/* Net indicator line */}
              {yr.neto > 0 && (
                <line
                  x1={x + BW + GAP} x2={x + BW + GAP + BW}
                  y1={H - bH} y2={H - bH}
                  stroke="rgba(52,211,153,0.9)" strokeWidth="1.5" strokeDasharray="2,2"
                />
              )}
              {/* Year label */}
              <text
                x={x + BW + GAP / 2}
                y={H + 13}
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                fillOpacity="0.45"
              >
                Año {yr.y}
              </text>
            </g>
          );
        })}

        {/* Legend */}
        <rect x={0}  y={1} width={8} height={8} rx="2" fill="rgba(148,163,184,0.35)" />
        <text x={11} y={9} fontSize="7.5" fill="currentColor" fillOpacity="0.5">Inversión</text>
        <rect x={58} y={1} width={8} height={8} rx="2" fill="rgba(52,211,153,0.65)" />
        <text x={69} y={9} fontSize="7.5" fill="currentColor" fillOpacity="0.5">Ahorro</text>
      </svg>
    </div>
  );
}

// ── Metric card ──

function KPI({ label, value, sub, green }: { label: string; value: string; sub?: string; green?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-100 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02] p-3">
      <p className="text-[9px] uppercase tracking-[0.16em] font-bold text-slate-400 dark:text-slate-600 mb-1">{label}</p>
      <p className={`text-[15px] font-bold tabular-nums leading-tight ${green ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}>
        {value}
      </p>
      {sub && <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5 leading-snug">{sub}</p>}
    </div>
  );
}

// ── Opportunity config ────────────────────────────────────────────────────────

const OPP = {
  alta:  { ring: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20", dot: "bg-emerald-400", label: "Oportunidad alta",  desc: "Payback ≤ 12 meses. Caso de negocio sólido." },
  media: { ring: "text-amber-700  dark:text-amber-300  bg-amber-50  dark:bg-amber-500/10  border-amber-200  dark:border-amber-500/20",  dot: "bg-amber-400",  label: "Oportunidad media", desc: "Payback 12–24 meses. Viable con el alcance correcto." },
  baja:  { ring: "text-slate-600  dark:text-slate-400  bg-slate-100 dark:bg-white/[0.05]  border-slate-200  dark:border-white/[0.08]",  dot: "bg-slate-400",  label: "Oportunidad baja",  desc: "Payback > 24 meses. Revisa alcance o coste del proceso." },
} as const;

// ── Defaults ──────────────────────────────────────────────────────────────────

function mkId(): string { return Math.random().toString(36).slice(2, 9); }

function mkProcess(tipo: PresetKey = "entrada-datos"): Process {
  return {
    id: mkId(), nombre: "", tipo,
    horasMes: "40", personas: "2", costeHora: "25",
    erroresMes: "5", costeError: String(PRESETS[tipo].errorCost),
    automPot: String(PRESETS[tipo].automPot),
  };
}

const DEFAULT_PROJECT: Project = {
  costeDesarrollo: "18000",
  integracion: "media",
  licencias: "0",
  mantenimientoPct: "17",
};

// ── Main component ────────────────────────────────────────────────────────────

export default function RoiCalculator() {
  const [procs,    setProcs]    = useState<Process[]>([mkProcess("entrada-datos")]);
  const [project,  setProject]  = useState<Project>(DEFAULT_PROJECT);
  const [scenario, setScenario] = useState<ScenarioKey>("base");

  /* ─ process handlers ─ */
  const addProc    = () => { if (procs.length < 5) setProcs(prev => [...prev, mkProcess("otro")]); };
  const removeProc = (id: string) => setProcs(prev => prev.filter(p => p.id !== id));
  const updateProc = (id: string, k: keyof Process, v: string) => {
    setProcs(prev => prev.map(proc => {
      if (proc.id !== id) return proc;
      if (k === "tipo") {
        const preset = PRESETS[v as PresetKey];
        return { ...proc, tipo: v as PresetKey, automPot: String(preset.automPot), costeError: String(preset.errorCost) };
      }
      return { ...proc, [k]: v };
    }));
  };

  /* ─ project handlers ─ */
  const updateProj = (k: keyof Project, v: string) =>
    setProject(prev => ({ ...prev, [k]: v }));

  /* ─ derived values ─ */
  const R = useMemo(() => calcAll(procs, project, scenario), [procs, project, scenario]);

  const paybackLabel = !R || R.payback === Infinity
    ? "—"
    : R.payback < 1 ? "< 1 mes" : `${num(R.payback, 1)} meses`;

  const oppStyle = R ? OPP[R.oportunidad] : null;

  return (
    <div className="space-y-8">

      {/* ── GRID ──────────────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_370px] items-start">

        {/* ── FORM ────────────────────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* — 01 Processes — */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
                  01 — Procesos a automatizar
                </p>
                <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                  Añade hasta 5 procesos. Cada tipo activa benchmarks del sector.
                </p>
              </div>
              {procs.length < 5 && (
                <button
                  type="button"
                  onClick={addProc}
                  className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                  Añadir proceso
                </button>
              )}
            </div>

            {procs.map((proc, i) => (
              <ProcessCard
                key={proc.id}
                proc={proc}
                idx={i}
                canRemove={procs.length > 1}
                onChange={updateProc}
                onRemove={removeProc}
              />
            ))}
          </div>

          {/* — 02 Project investment — */}
          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5 sm:p-6 space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
                02 — Inversión del proyecto
              </p>
              <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                La complejidad de integración aplica un multiplicador sobre el coste base.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={LBL}>Coste de desarrollo base (€)</label>
                <input type="number" min="0" placeholder="18000" value={project.costeDesarrollo}
                  onChange={e => updateProj("costeDesarrollo", e.target.value)} className={INP} />
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">
                  Proceso simple 8–15 k · ERP/CRM 20–50 k · Complejo 50 k+
                </p>
              </div>

              <div>
                <label className={LBL}>Complejidad de integración</label>
                <select
                  value={project.integracion}
                  onChange={e => updateProj("integracion", e.target.value as IntegrationKey)}
                  className={INP}
                >
                  {(Object.entries(INTEGRATION) as [IntegrationKey, typeof INTEGRATION[IntegrationKey]][]).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">
                  Multiplica el desarrollo base por {INTEGRATION[project.integracion].mult}×
                </p>
              </div>

              <div>
                <label className={LBL}>Licencias anuales (€ / año)</label>
                <input type="number" min="0" placeholder="0" value={project.licencias}
                  onChange={e => updateProj("licencias", e.target.value)} className={INP} />
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">
                  Plataformas RPA, herramientas de integración, SaaS de automatización
                </p>
              </div>

              <div>
                <label className={LBL}>
                  Mantenimiento anual —{" "}
                  <span className="text-indigo-500 dark:text-indigo-400 font-bold">{project.mantenimientoPct}%</span>
                  {" "}del desarrollo
                </label>
                <input
                  type="range" min="0" max="30" step="1"
                  value={project.mantenimientoPct}
                  onChange={e => updateProj("mantenimientoPct", e.target.value)}
                  className="w-full h-1.5 mt-2.5 accent-indigo-500 cursor-pointer"
                />
                <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-600">
                  Referencia sector: 15–20% del coste de desarrollo
                </p>
              </div>
            </div>

            {/* Investment summary */}
            {n(project.costeDesarrollo) > 0 && (
              <div className="rounded-xl border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-500/[0.05] px-4 py-3 flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
                <span className="text-slate-500 dark:text-slate-500">
                  Inversión total año 1:{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    {eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult + n(project.licencias))}
                  </strong>
                </span>
                <span className="text-slate-500 dark:text-slate-500">
                  Mantenimiento año 2–3:{" "}
                  <strong className="text-slate-800 dark:text-slate-200">
                    {eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult * (n(project.mantenimientoPct) / 100) + n(project.licencias))} / año
                  </strong>
                </span>
              </div>
            )}
          </section>
        </div>

        {/* ── RESULTS ─────────────────────────────────────────────────────── */}
        <div className="lg:sticky lg:top-6 space-y-4">

          {/* Scenario toggle */}
          <div className="flex rounded-xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-0.5">
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map(k => (
              <button
                key={k}
                type="button"
                onClick={() => setScenario(k)}
                className={`flex-1 rounded-[9px] py-2 text-xs font-semibold transition-all ${
                  scenario === k
                    ? "bg-white dark:bg-white/[0.08] text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                {SCENARIOS[k].label}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-center text-slate-400 dark:text-slate-600">
            {SCENARIOS[scenario].note}
          </p>

          {!R ? (
            <div className="rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-10 text-center">
              <p className="text-sm text-slate-400 dark:text-slate-600">Rellena los campos para ver el resultado.</p>
            </div>
          ) : (
            <>
              {/* Opportunity badge */}
              {oppStyle && (
                <div>
                  <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold ${oppStyle.ring}`}>
                    <span className={`h-2 w-2 rounded-full ${oppStyle.dot}`} aria-hidden />
                    {oppStyle.label}
                  </span>
                  <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">{oppStyle.desc}</p>
                </div>
              )}

              {/* Hero metric */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070D1C] p-5 shadow-sm space-y-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-slate-600 mb-1.5">
                    Ahorro anual potencial
                  </p>
                  <p className="text-4xl font-black tabular-nums text-emerald-500">
                    {eur(R.ahorroAnual)}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                    Escenario {SCENARIOS[scenario].label.toLowerCase()} · {R.nProcs} proceso{R.nProcs > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="h-px bg-slate-100 dark:bg-white/[0.05]" />

                <div className="grid grid-cols-2 gap-2">
                  <KPI label="Coste actual / mes" value={eur(R.costeMes)} />
                  <KPI label="Ahorro / mes"        value={eur(R.ahorroMes)} green />
                  <KPI label="Horas recuperadas / mes" value={`${num(R.horasRec)} h`}
                    sub={`≈ ${num(R.ftes, 2)} FTE equivalente`} />
                  <KPI label="Payback estimado" value={paybackLabel} />
                  <KPI label="ROI a 3 años"
                    value={R.totalInv > 0 ? `${num(R.roi3, 0)}%` : "—"}
                    green={R.roi3 > 0} />
                  <KPI label="VAN a 3 años (10%)"
                    value={R.totalInv > 0 ? eur(R.npv) : "—"}
                    green={R.npv > 0} />
                </div>
              </div>

              {/* 3-year projection */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070D1C] p-4 shadow-sm space-y-3">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-400 dark:text-slate-600">
                  Proyección 3 años
                </p>
                <ProjectionBars years={R.years} />
                <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-white/[0.05]">
                  {R.years.map(yr => (
                    <div key={yr.y} className="flex items-center justify-between text-[10px] gap-2">
                      <span className="text-slate-500 dark:text-slate-500 shrink-0 w-10">Año {yr.y}</span>
                      <span className="text-slate-400 dark:text-slate-600 tabular-nums">{eur(yr.coste)}</span>
                      <span className="text-emerald-500 tabular-nums">{eur(yr.benef)}</span>
                      <span className={`font-bold tabular-nums ${yr.neto >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-400 dark:text-red-500"}`}>
                        {yr.neto >= 0 ? "+" : ""}{eur(yr.neto)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Savings breakdown */}
                {R.ahorroMes > 0 && (
                  <div className="pt-3 border-t border-slate-100 dark:border-white/[0.04] space-y-2">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-slate-400 dark:text-slate-600">
                      Composición del ahorro mensual
                    </p>
                    {[
                      { label: "Ahorro laboral",   val: R.ahorroLab, color: "bg-emerald-400" },
                      { label: "Ahorro en errores", val: R.ahorroErr, color: "bg-sky-400" },
                    ].map(item => {
                      const pct = R.ahorroMes > 0 ? (item.val / R.ahorroMes) * 100 : 0;
                      return (
                        <div key={item.label}>
                          <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-600 mb-0.5">
                            <span>{item.label}</span>
                            <span className="tabular-nums">{eur(item.val)} · {num(pct, 0)}%</span>
                          </div>
                          <div className="h-1 rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-indigo-200/60 dark:border-indigo-500/20 bg-indigo-50/60 dark:bg-indigo-500/[0.07] p-5 space-y-3">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  ¿Quieres validar estas cifras con datos reales?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  En 45 min ajustamos la estimación a tu operativa y definimos el alcance mínimo viable para empezar a ver retorno en 3–6 meses.
                </p>
                <Button as="a" href="/#contacto" variant="shine" size="sm" className="w-full justify-center">
                  Quiero adaptar esto a mi empresa
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
      {R && (
        <section
          aria-label="Cómo interpretar este cálculo"
          className="rounded-2xl border border-slate-200/60 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.01] p-5 sm:p-6"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600 mb-4">
            Cómo interpretar este cálculo
          </p>
          <ol className="space-y-3">
            {[
              "Estimación basada en tus datos y en benchmarks del sector (UiPath, Automation Anywhere, McKinsey). El escenario «Conservador» aplica −40% sobre los beneficios para reflejar la incertidumbre real de un proyecto nuevo.",
              "El ROI real depende del nivel de madurez del proceso, las integraciones existentes y la adopción del equipo. El año 1 incorpora un factor del 90% sobre el ahorro proyectado por la curva de aprendizaje.",
              "El VAN (Valor Actual Neto) descuenta los flujos al 10% anual. Un VAN positivo indica que el proyecto genera valor por encima del coste de capital de referencia. En el diagnóstico ajustamos con datos reales de tu operación.",
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-500 dark:text-slate-500">
                <span className="shrink-0 text-[10px] font-bold text-slate-300 dark:text-slate-700 tabular-nums mt-0.5 w-5">
                  0{i + 1}
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );
}
