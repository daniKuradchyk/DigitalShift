"use client";

import { useState, useMemo, useEffect, useRef, useCallback, type ReactNode } from "react";
import Button from "@/components/common/Button";

// ── Process type benchmarks (UiPath, McKinsey, APQC) ─────────────────────────

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

const INTEGRATION = {
  baja:  { label: "Baja — APIs estándar, sin sistemas legacy",     mult: 1.00 },
  media: { label: "Media — un ERP/CRM o sistema semi-antiguo",     mult: 1.25 },
  alta:  { label: "Alta — múltiples sistemas legacy o SAP/Oracle", mult: 1.60 },
} as const;
type IntegrationKey = keyof typeof INTEGRATION;

const SCENARIOS = {
  conservador: { label: "Conservador", short: "Cons.", mult: 0.60, note: "−40 % sobre beneficios proyectados" },
  base:        { label: "Base",        short: "Base",  mult: 1.00, note: "Benchmark estándar del sector" },
  optimista:   { label: "Optimista",   short: "Opt.",  mult: 1.25, note: "+25 % si el proceso está muy definido" },
} as const;
type ScenarioKey = keyof typeof SCENARIOS;

const DISCOUNT = 0.10;
const Y1_DIP   = 0.90;

// ── Industry starter templates ───────────────────────────────────────────────

type StarterProc = { tipo: PresetKey; nombre: string; horasMes: string; personas: string; costeHora: string; erroresMes: string };

interface Industry {
  key: string;
  label: string;
  tagline: string;
  gradient: string;
  svg: ReactNode;
  project: { costeDesarrollo: string; integracion: IntegrationKey; licencias: string };
  procs: StarterProc[];
}

const INDUSTRIES: Industry[] = [
  {
    key: "ecommerce",
    label: "E-commerce",
    tagline: "Pedidos, devoluciones, stock",
    gradient: "from-sky-400 to-blue-500",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h2l2.4 12.4a2 2 0 002 1.6h8.7a2 2 0 002-1.6L22 7H6" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></svg>,
    project: { costeDesarrollo: "22000", integracion: "media", licencias: "1200" },
    procs: [
      { tipo: "integraciones-erp", nombre: "Sincronización stock y precios", horasMes: "35", personas: "2", costeHora: "26", erroresMes: "8" },
      { tipo: "atencion-cliente",  nombre: "Tickets post-venta y RMA",        horasMes: "60", personas: "3", costeHora: "22", erroresMes: "6" },
    ],
  },
  {
    key: "industria",
    label: "Industria",
    tagline: "Producción, compras, calidad",
    gradient: "from-orange-400 to-rose-500",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21V10l6 4V10l6 4V10l6 4v7H3z" /><path d="M7 17h2M13 17h2M17 17h1" /></svg>,
    project: { costeDesarrollo: "32000", integracion: "alta", licencias: "2400" },
    procs: [
      { tipo: "integraciones-erp", nombre: "ERP ↔ planta / MES", horasMes: "50", personas: "2", costeHora: "32", erroresMes: "4" },
      { tipo: "reportes",          nombre: "Informes de producción diarios", horasMes: "30", personas: "1", costeHora: "28", erroresMes: "2" },
      { tipo: "aprobaciones",      nombre: "Aprobación de órdenes de compra", horasMes: "25", personas: "2", costeHora: "35", erroresMes: "3" },
    ],
  },
  {
    key: "servicios",
    label: "Servicios",
    tagline: "Facturación, reporting, onboarding",
    gradient: "from-indigo-400 to-violet-500",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2" /></svg>,
    project: { costeDesarrollo: "18000", integracion: "media", licencias: "600" },
    procs: [
      { tipo: "facturas-pagos", nombre: "Facturación mensual y conciliación", horasMes: "40", personas: "1", costeHora: "30", erroresMes: "5" },
      { tipo: "reportes",       nombre: "Reporting de horas a cliente",       horasMes: "35", personas: "2", costeHora: "28", erroresMes: "3" },
    ],
  },
  {
    key: "saas",
    label: "SaaS",
    tagline: "Onboarding, billing, soporte",
    gradient: "from-emerald-400 to-teal-500",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M7 9h10M7 13h6M7 17h4" /></svg>,
    project: { costeDesarrollo: "24000", integracion: "baja", licencias: "1800" },
    procs: [
      { tipo: "onboarding",     nombre: "Onboarding de nuevas cuentas",       horasMes: "28", personas: "2", costeHora: "35", erroresMes: "2" },
      { tipo: "facturas-pagos", nombre: "Revisión manual de billing y dunning", horasMes: "22", personas: "1", costeHora: "32", erroresMes: "4" },
    ],
  },
  {
    key: "logistica",
    label: "Logística",
    tagline: "Albaranes, transporte, trazabilidad",
    gradient: "from-amber-400 to-orange-500",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v10H3zM14 10h5l2 3v4h-7" /><circle cx="7" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /></svg>,
    project: { costeDesarrollo: "26000", integracion: "alta", licencias: "1500" },
    procs: [
      { tipo: "integraciones-erp", nombre: "Sincronización transportistas ↔ ERP", horasMes: "45", personas: "2", costeHora: "24", erroresMes: "10" },
      { tipo: "entrada-datos",     nombre: "Carga de albaranes y POD",             horasMes: "55", personas: "3", costeHora: "20", erroresMes: "12" },
    ],
  },
  {
    key: "custom",
    label: "Personalizado",
    tagline: "Empezar desde cero",
    gradient: "from-slate-400 to-slate-600",
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>,
    project: { costeDesarrollo: "18000", integracion: "media", licencias: "0" },
    procs: [
      { tipo: "entrada-datos", nombre: "", horasMes: "40", personas: "2", costeHora: "25", erroresMes: "5" },
    ],
  },
];

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
  const v = parseFloat(String(s).replace(",", "."));
  return isNaN(v) || v < 0 ? 0 : v;
}

function eur(v: number): string {
  return v.toLocaleString("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
}

function num(v: number, d = 1): string {
  return v.toLocaleString("es-ES", { maximumFractionDigits: d });
}

function mkId(): string { return Math.random().toString(36).slice(2, 9); }

function procFromStarter(s: StarterProc): Process {
  return {
    id: mkId(),
    nombre: s.nombre,
    tipo: s.tipo,
    horasMes: s.horasMes,
    personas: s.personas,
    costeHora: s.costeHora,
    erroresMes: s.erroresMes,
    costeError: String(PRESETS[s.tipo].errorCost),
    automPot:   String(PRESETS[s.tipo].automPot),
  };
}

// ── Model ─────────────────────────────────────────────────────────────────────

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

function calcAll(procs: Process[], proj: Project, scenario: ScenarioKey) {
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
  const totalInv  = devTotal + licAnual;

  const benefAnu  = ahorroMes * 12;

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
  const ftes     = horasRec / 160;

  const rawBenefBase = benefAnu / mult;
  const benefLow  = rawBenefBase * SCENARIOS.conservador.mult;
  const benefHigh = rawBenefBase * SCENARIOS.optimista.mult;

  let oportunidad: "alta" | "media" | "baja";
  if      (payback <= 12) oportunidad = "alta";
  else if (payback <= 24) oportunidad = "media";
  else                    oportunidad = "baja";

  return {
    costeMes, costeAnual: costeMes * 12,
    ahorroMes, ahorroAnual: benefAnu,
    benefLow, benefHigh,
    horasRec, ahorroLab, ahorroErr, ftes,
    totalInv, maintAnu, devTotal,
    payback, roi3, npv,
    years, oportunidad,
    nProcs: raw.length,
  };
}

// ── Design primitives (dark theme) ───────────────────────────────────────────

/** Glass card — dark navy with subtle blue border glow. */
const SURFACE = "rounded-3xl bg-[rgba(10,17,40,0.85)] backdrop-blur-md ring-1 ring-[rgba(65,105,225,0.12)] shadow-[0_8px_32px_rgba(0,0,0,0.40),0_0_40px_rgba(65,105,225,0.08)]";

const INPUT_CLS =
  "w-full rounded-xl bg-[rgba(15,27,76,0.40)] px-3.5 py-2.5 text-sm font-medium text-[#F0F4FF] ring-1 ring-[rgba(65,105,225,0.25)] placeholder:text-blue-300/40 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-0 hover:ring-[rgba(65,105,225,0.40)] transition-all";

function Label({ children, info, suffix }: { children: ReactNode; info?: string; suffix?: ReactNode }) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-blue-200/70 mb-1.5">
      {children}
      {info && <InfoDot text={info} />}
      {suffix && <span className="ml-auto font-mono text-[11px] tracking-normal font-bold text-blue-400">{suffix}</span>}
    </label>
  );
}

function NumInput({
  value, onChange, placeholder, prefix, suffix, min = 0, step,
}: { value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string; suffix?: string; min?: number; step?: number }) {
  return (
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-300/50">{prefix}</span>}
      <input
        type="number" min={min} step={step} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${INPUT_CLS} tabular-nums ${prefix ? "pl-7" : ""} ${suffix ? "pr-12" : ""}`}
      />
      {suffix && <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-blue-300/50">{suffix}</span>}
    </div>
  );
}

function InfoDot({ text }: { text: string }) {
  return (
    <span className="group/info relative inline-flex">
      <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500/15 text-[9px] font-bold text-blue-300/70 cursor-help select-none hover:bg-blue-500/25 transition-colors">?</span>
      <span className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-30 w-56 rounded-xl bg-[#0D1530] ring-1 ring-[rgba(65,105,225,0.25)] text-[10.5px] leading-snug text-blue-100 px-3 py-2.5 opacity-0 group-hover/info:opacity-100 transition-opacity shadow-2xl">
        {text}
      </span>
    </span>
  );
}

// ── Process Card — premium panel ─────────────────────────────────────────────

interface ProcessCardProps {
  proc: Process;
  idx: number;
  canRemove: boolean;
  onChange(id: string, k: keyof Process, v: string): void;
  onRemove(id: string): void;
}

function ProcessCard({ proc, idx, canRemove, onChange, onRemove }: ProcessCardProps) {
  const preset = PRESETS[proc.tipo];
  const subtotal = useMemo(() => calcProcess(proc), [proc]);

  return (
    <div className={`${SURFACE} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-blue-500/5 via-transparent to-transparent">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-[11px] font-bold tabular-nums shadow-[0_4px_12px_-2px_rgba(65,105,225,0.35)]">
          {idx + 1}
        </span>
        <input
          type="text"
          value={proc.nombre}
          onChange={e => onChange(proc.id, "nombre", e.target.value)}
          placeholder={`Proceso ${idx + 1} — pon un nombre descriptivo`}
          className="flex-1 min-w-0 rounded-lg bg-[rgba(15,27,76,0.30)] px-2.5 py-1.5 ring-1 ring-[rgba(65,105,225,0.20)] text-[15px] font-semibold text-[#F0F4FF] placeholder:text-blue-300/40 placeholder:font-medium outline-none focus:ring-2 focus:ring-blue-400/40"
        />
        {subtotal && (
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 ring-1 ring-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold tabular-nums text-emerald-400">
              {eur(subtotal.ahorroLab + subtotal.ahorroErr)}/mes
            </span>
          </div>
        )}
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(proc.id)}
            aria-label="Eliminar proceso"
            className="no-print shrink-0 h-7 w-7 inline-flex items-center justify-center rounded-lg text-blue-300/50 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-5 py-5 space-y-5 border-t border-[rgba(65,105,225,0.10)]">
        {/* Type */}
        <div>
          <Label info="Cada tipo activa un benchmark de potencial de automatización y coste medio de error (UiPath, APQC).">
            Tipo de proceso
          </Label>
          <select
            value={proc.tipo}
            onChange={e => onChange(proc.id, "tipo", e.target.value)}
            className={INPUT_CLS}
          >
            {(Object.keys(PRESETS) as PresetKey[]).map(k => (
              <option key={k} value={k}>{PRESETS[k].label}</option>
            ))}
          </select>
          {preset.desc && <p className="mt-1.5 text-[11.5px] text-blue-300/50">{preset.desc}</p>}
        </div>

        {/* Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label info="Horas totales que dedica una persona a este proceso cada mes.">Horas / mes</Label>
            <NumInput value={proc.horasMes} onChange={v => onChange(proc.id, "horasMes", v)} placeholder="40" suffix="h" />
          </div>
          <div>
            <Label>Personas</Label>
            <NumInput value={proc.personas} min={1} onChange={v => onChange(proc.id, "personas", v)} placeholder="2" />
          </div>
          <div>
            <Label info="Coste laboral bruto + SS + overhead. Referencia España 2024: perfil administrativo ~22–28 €/h.">Coste / hora</Label>
            <NumInput value={proc.costeHora} onChange={v => onChange(proc.id, "costeHora", v)} placeholder="25" prefix="€" />
          </div>
          <div>
            <Label info="Incidencias que requieren corrección manual cada mes (tickets reabiertos, facturas mal emitidas…).">Errores / mes</Label>
            <NumInput value={proc.erroresMes} onChange={v => onChange(proc.id, "erroresMes", v)} placeholder="5" />
          </div>
          <div>
            <Label info={`Coste total de detectar, corregir y reprocesar un error. Ref. ${preset.label}: ${preset.errorCost} €. Fuente APQC.`}>
              Coste / error
            </Label>
            <NumInput value={proc.costeError} onChange={v => onChange(proc.id, "costeError", v)} placeholder={String(preset.errorCost)} prefix="€" />
          </div>
          <div>
            <Label suffix={`${proc.automPot}%`} info={`Porcentaje del proceso automatizable. Ref. sector «${preset.label}»: ${preset.automPot} %. Fuente UiPath.`}>
              Potencial auto.
            </Label>
            <div className="relative rounded-xl bg-[rgba(15,27,76,0.30)] ring-1 ring-[rgba(65,105,225,0.20)] px-3.5 py-3">
              <input
                type="range" min="20" max="95" step="5"
                value={proc.automPot}
                onChange={e => onChange(proc.id, "automPot", e.target.value)}
                className="w-full h-1.5 accent-blue-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cashflow chart ───────────────────────────────────────────────────────────

interface YearRow { y: number; benef: number; coste: number; neto: number; }

function CashflowChart({ years, invest, paybackMonths }: { years: YearRow[]; invest: number; paybackMonths: number }) {
  const MONTHS = 36;
  const monthly = years.map((y) => ({
    benefMonth: y.benef / 12,
    costMonth:  y.y === 1 ? 0 : y.coste / 12,
  }));
  const W = 560, H = 200, PADL = 46, PADR = 14, PADT = 14, PADB = 28;
  const IW = W - PADL - PADR;
  const IH = H - PADT - PADB;

  const points: { x: number; y: number }[] = [];
  let cum = -invest;
  points.push({ x: 0, y: cum });
  for (let m = 1; m <= MONTHS; m++) {
    const yr = Math.ceil(m / 12) - 1;
    cum += monthly[yr].benefMonth - monthly[yr].costMonth;
    points.push({ x: m, y: cum });
  }
  const cumMin = Math.min(...points.map(p => p.y), 0);
  const cumMax = Math.max(...points.map(p => p.y), 0);
  const range  = Math.max(1, cumMax - cumMin);

  const xAt = (m: number) => PADL + (m / MONTHS) * IW;
  const yAt = (v: number) => PADT + IH - ((v - cumMin) / range) * IH;
  const zeroY = yAt(0);

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${xAt(p.x).toFixed(1)},${yAt(p.y).toFixed(1)}`).join(" ");
  const area = `${path} L${xAt(MONTHS)},${zeroY} L${xAt(0)},${zeroY} Z`;

  const pbX = isFinite(paybackMonths) && paybackMonths > 0 && paybackMonths <= MONTHS ? xAt(paybackMonths) : null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Proyección de caja acumulada">
      <defs>
        <linearGradient id="cashArea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4169E1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#4169E1" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cashLine" x1="0" x2="1">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      <line x1={PADL} x2={W - PADR} y1={zeroY} y2={zeroY} stroke="rgb(15,23,42)" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 4" />

      {[12, 24, 36].map((m) => (
        <g key={m}>
          <line x1={xAt(m)} x2={xAt(m)} y1={PADT} y2={PADT + IH} stroke="rgb(15,23,42)" strokeOpacity="0.05" />
          <text x={xAt(m)} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="500" fill="rgb(100,116,139)">
            Mes {m}
          </text>
        </g>
      ))}

      <text x={PADL - 8} y={yAt(cumMax) + 3} textAnchor="end" fontSize="10" fontWeight="500" fill="rgb(71,85,105)">{eur(cumMax)}</text>
      <text x={PADL - 8} y={zeroY + 3} textAnchor="end" fontSize="10" fill="rgb(100,116,139)">0</text>
      <text x={PADL - 8} y={yAt(cumMin) + 3} textAnchor="end" fontSize="10" fontWeight="500" fill="rgb(71,85,105)">{eur(cumMin)}</text>

      <path d={area} fill="url(#cashArea)" />
      <path d={path} fill="none" stroke="url(#cashLine)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {pbX !== null && (
        <g>
          <line x1={pbX} x2={pbX} y1={PADT} y2={PADT + IH} stroke="rgb(16,185,129)" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx={pbX} cy={zeroY} r="5" fill="#0D1530" stroke="rgb(16,185,129)" strokeWidth="2.5" />
          <text x={pbX + 8} y={PADT + 13} fontSize="11" fontWeight="700" fill="rgb(52,211,153)">
            Payback · {num(paybackMonths, 1)}m
          </text>
        </g>
      )}
    </svg>
  );
}

// ── Opportunity ───────────────────────────────────────────────────────────────

const OPP = {
  alta:  { bg: "bg-emerald-500/10", text: "text-emerald-400", ring: "ring-emerald-500/20", dot: "bg-emerald-500", label: "Oportunidad alta",  desc: "Payback ≤ 12 meses" },
  media: { bg: "bg-amber-500/10",   text: "text-amber-300",   ring: "ring-amber-500/20",   dot: "bg-amber-500",   label: "Oportunidad media", desc: "Payback 12–24 meses" },
  baja:  { bg: "bg-blue-500/10",  text: "text-blue-300",   ring: "ring-blue-500/15",   dot: "bg-blue-400",   label: "Oportunidad baja",  desc: "Payback > 24 meses" },
} as const;

// ── URL state ────────────────────────────────────────────────────────────────

function encodeState(procs: Process[], project: Project, scenario: ScenarioKey): string {
  const payload = { p: procs.map(({ id: _id, ...r }) => r), j: project, s: scenario };
  try { return btoa(encodeURIComponent(JSON.stringify(payload))); } catch { return ""; }
}
function decodeState(s: string): { procs: Process[]; project: Project; scenario: ScenarioKey } | null {
  try {
    const payload = JSON.parse(decodeURIComponent(atob(s)));
    if (!payload || !Array.isArray(payload.p)) return null;
    const procs = payload.p.map((r: Omit<Process, "id">) => ({ ...r, id: mkId() }));
    return { procs, project: payload.j, scenario: payload.s };
  } catch { return null; }
}

const DEFAULT_PROJECT: Project = {
  costeDesarrollo: "18000",
  integracion: "media",
  licencias: "0",
  mantenimientoPct: "17",
};

const STARTER_DEFAULT = INDUSTRIES.find(i => i.key === "servicios")!;

// ── Section header ────────────────────────────────────────────────────────────

function SectionHead({ step, title, caption }: { step: string; title: string; caption?: string }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="mt-1 inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg bg-blue-500/15 ring-1 ring-blue-500/25 text-[11px] font-bold text-blue-400 tabular-nums px-2">
        {step}
      </span>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#F0F4FF]">{title}</h2>
        {caption && <p className="mt-1 text-sm text-blue-200/60 leading-relaxed max-w-xl">{caption}</p>}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function RoiCalculator() {
  const [procs,    setProcs]    = useState<Process[]>(() => STARTER_DEFAULT.procs.map(procFromStarter));
  const [project,  setProject]  = useState<Project>(() => ({ ...DEFAULT_PROJECT, ...STARTER_DEFAULT.project }));
  const [scenario, setScenario] = useState<ScenarioKey>("base");
  const [activeIndustry, setActiveIndustry] = useState<string>(STARTER_DEFAULT.key);
  const [shareStatus, setShareStatus] = useState<"idle" | "copied">("idle");
  const [showMethodology, setShowMethodology] = useState(false);
  const calcSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const s = new URLSearchParams(window.location.search).get("c");
    if (!s) return;
    const decoded = decodeState(s);
    if (decoded) {
      setProcs(decoded.procs);
      setProject(decoded.project);
      setScenario(decoded.scenario);
      setActiveIndustry("");
    }
  }, []);

  const loadIndustry = (ind: Industry) => {
    setProcs(ind.procs.map(procFromStarter));
    setProject((prev) => ({ ...prev, ...ind.project }));
    setActiveIndustry(ind.key);
    calcSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const addProc = () => {
    if (procs.length < 5)
      setProcs(prev => [...prev, procFromStarter({ tipo: "otro", nombre: "", horasMes: "20", personas: "1", costeHora: "25", erroresMes: "2" })]);
  };
  const removeProc = (id: string) => setProcs(prev => prev.filter(p => p.id !== id));
  const updateProc = useCallback((id: string, k: keyof Process, v: string) => {
    setProcs(prev => prev.map(proc => {
      if (proc.id !== id) return proc;
      if (k === "tipo") {
        const preset = PRESETS[v as PresetKey];
        return { ...proc, tipo: v as PresetKey, automPot: String(preset.automPot), costeError: String(preset.errorCost) };
      }
      return { ...proc, [k]: v };
    }));
  }, []);

  const updateProj = (k: keyof Project, v: string) => setProject(prev => ({ ...prev, [k]: v }));

  const R = useMemo(() => calcAll(procs, project, scenario), [procs, project, scenario]);
  const paybackLabel = !R || R.payback === Infinity ? "—" : R.payback < 1 ? "< 1 mes" : `${num(R.payback, 1)} meses`;
  const oppStyle = R ? OPP[R.oportunidad] : null;

  const handleShare = async () => {
    const encoded = encodeState(procs, project, scenario);
    const url = `${window.location.origin}${window.location.pathname}?c=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareStatus("copied");
      setTimeout(() => setShareStatus("idle"), 2200);
    } catch { /* silent */ }
  };

  const handlePrint = () => window.print();

  const story = useMemo(() => {
    if (!R) return null;
    if (R.ahorroAnual <= 0 || R.totalInv <= 0) return null;
    return {
      ftes: num(R.ftes, 1),
      ahorro: eur(R.ahorroAnual),
      pb: R.payback === Infinity ? "—" : R.payback < 1 ? "menos de un mes" : `${num(R.payback, 1)} meses`,
    };
  }, [R]);

  return (
    <div className="space-y-10" ref={calcSectionRef}>

      {/* ── 01 INDUSTRIES ──────────────────────────────────────────────── */}
      <section className="no-print">
        <SectionHead
          step="01"
          title="Empieza con una plantilla"
          caption="Procesos y cifras realistas precargadas por sector. Puedes ajustar todo después."
        />

        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind) => {
            const active = activeIndustry === ind.key;
            return (
              <button
                key={ind.key}
                type="button"
                onClick={() => loadIndustry(ind)}
                className={`group relative rounded-2xl p-4 text-left transition-all ${
                  active
                    ? "bg-[rgba(65,105,225,0.12)] ring-1 ring-blue-400/30 shadow-[0_4px_12px_-2px_rgba(65,105,225,0.20),0_12px_32px_-16px_rgba(65,105,225,0.25)]"
                    : "bg-[rgba(10,17,40,0.60)] ring-1 ring-[rgba(65,105,225,0.12)] hover:bg-[rgba(65,105,225,0.08)] hover:ring-blue-400/25 hover:shadow-[0_4px_16px_-4px_rgba(65,105,225,0.15)] hover:-translate-y-0.5"
                }`}
              >
                <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${ind.gradient} text-white shadow-[0_4px_12px_-2px_rgba(15,23,42,0.12)]`}>
                  <span className="h-4 w-4">{ind.svg}</span>
                </div>
                <p className="text-[13px] font-bold text-[#F0F4FF] leading-tight">{ind.label}</p>
                <p className="mt-1 text-[11px] text-blue-200/50 leading-snug">{ind.tagline}</p>
                {active && (
                  <span className="absolute top-3 right-3 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm">
                    <svg viewBox="0 0 10 10" className="h-2 w-2" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 5l2 2 4-4" /></svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── MAIN GRID ──────────────────────────────────────────────────── */}
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-start">

        {/* ── FORM ─────────────────────────────────────────────────────── */}
        <div className="space-y-10">

          {/* 02 Procesos */}
          <section>
            <div className="flex items-start justify-between gap-4 mb-6">
              <SectionHead
                step="02"
                title="Tu operación, hoy"
                caption="Añade hasta 5 procesos candidatos a automatización."
              />
              {procs.length < 5 && (
                <button
                  type="button"
                  onClick={addProc}
                  className="no-print shrink-0 mt-1 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3.5 py-2 text-[11px] font-bold text-blue-300 ring-1 ring-blue-500/25 hover:bg-blue-500/20 hover:ring-blue-400/35 transition-all"
                >
                  <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                    <path d="M8 2v12M2 8h12" />
                  </svg>
                  Añadir
                </button>
              )}
            </div>

            <div className="space-y-4">
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
          </section>

          {/* 03 Inversión */}
          <section>
            <SectionHead
              step="03"
              title="La inversión"
              caption="La complejidad de integración aplica un multiplicador sobre el coste de desarrollo base."
            />

            <div className={`${SURFACE} p-5 sm:p-6 space-y-6`}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label info="Coste one-off: análisis, implementación, pruebas y despliegue.">
                    Coste de desarrollo base
                  </Label>
                  <NumInput value={project.costeDesarrollo} onChange={v => updateProj("costeDesarrollo", v)} placeholder="18000" prefix="€" />
                  <p className="mt-1.5 text-[11px] text-blue-300/50">Proceso simple 8–15 k · ERP/CRM 20–50 k · Complejo 50 k+</p>
                </div>

                <div>
                  <Label info="Sistemas heredados, conectores custom o protocolos propietarios encarecen la implementación.">
                    Complejidad integración
                  </Label>
                  <select
                    value={project.integracion}
                    onChange={e => updateProj("integracion", e.target.value as IntegrationKey)}
                    className={INPUT_CLS}
                  >
                    {(Object.entries(INTEGRATION) as [IntegrationKey, typeof INTEGRATION[IntegrationKey]][]).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-[11px] text-blue-300/50">Multiplica desarrollo × {INTEGRATION[project.integracion].mult}</p>
                </div>

                <div>
                  <Label info="Plataformas RPA, iPaaS o SaaS recurrentes. 0 € si es código propio.">
                    Licencias anuales
                  </Label>
                  <NumInput value={project.licencias} onChange={v => updateProj("licencias", v)} placeholder="0" prefix="€" suffix="/año" />
                </div>

                <div>
                  <Label suffix={`${project.mantenimientoPct}%`} info="Correcciones y evolutivos tras el launch. Referencia sector: 15–20 %.">
                    Mantenimiento anual
                  </Label>
                  <div className="relative rounded-xl bg-[rgba(15,27,76,0.30)] ring-1 ring-[rgba(65,105,225,0.20)] px-3.5 py-3">
                    <input
                      type="range" min="0" max="30" step="1"
                      value={project.mantenimientoPct}
                      onChange={e => updateProj("mantenimientoPct", e.target.value)}
                      className="w-full h-1.5 accent-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Investment summary */}
              {n(project.costeDesarrollo) > 0 && (
                <div className="rounded-2xl bg-[rgba(15,27,76,0.30)] ring-1 ring-[rgba(65,105,225,0.15)] p-4 grid gap-x-6 gap-y-3 sm:grid-cols-3">
                  {[
                    { k: "Desarrollo año 1", v: eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult) },
                    { k: "Licencias año 1",  v: eur(n(project.licencias)) },
                    { k: "Mantenim. / año",  v: eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult * (n(project.mantenimientoPct) / 100) + n(project.licencias)) },
                  ].map((s) => (
                    <div key={s.k}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-300/60 mb-1">{s.k}</p>
                      <p className="text-base font-bold tabular-nums text-[#F0F4FF]">{s.v}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── RESULTS (sticky) ────────────────────────────────────────── */}
        <aside className="lg:sticky lg:top-6 space-y-4">

          {/* Scenario */}
          <div className={`${SURFACE} p-1.5`}>
            <p className="px-3 pt-1.5 pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300/50">
              Escenario
            </p>
            <div className="flex gap-1">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setScenario(k)}
                  className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                    scenario === k
                      ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-[0_4px_12px_-2px_rgba(65,105,225,0.35)]"
                      : "bg-[rgba(15,27,76,0.30)] text-blue-300 ring-1 ring-[rgba(65,105,225,0.15)] hover:bg-[rgba(65,105,225,0.10)] hover:text-blue-200"
                  }`}
                >
                  {SCENARIOS[k].label}
                </button>
              ))}
            </div>
            <p className="px-3 pt-1.5 pb-1.5 text-[10.5px] text-blue-300/50">
              {SCENARIOS[scenario].note}
            </p>
          </div>

          {!R ? (
            <div className={`${SURFACE} p-10 text-center`}>
              <p className="text-sm text-blue-200/50">Rellena los campos para ver el resultado.</p>
            </div>
          ) : (
            <>
              {/* Hero metric panel */}
              <div className={`${SURFACE} p-6 relative overflow-hidden`}>
                {/* Decorative gradient */}
                <div aria-hidden className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 to-emerald-500/10 blur-3xl" />

                {oppStyle && (
                  <div className={`inline-flex items-center gap-1.5 rounded-full ${oppStyle.bg} ${oppStyle.text} ${oppStyle.ring} ring-1 px-2.5 py-1 mb-4`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${oppStyle.dot}`} />
                    <span className="text-[10.5px] font-bold uppercase tracking-wider">{oppStyle.label}</span>
                  </div>
                )}

                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-300/50 mb-1.5">
                    Ahorro anual potencial
                  </p>
                  <p className="text-[2.6rem] font-black tabular-nums leading-[0.95] bg-gradient-to-br from-[#F0F4FF] to-blue-200 bg-clip-text text-transparent">
                    {eur(R.ahorroAnual)}
                  </p>

                  {/* Confidence band */}
                  <div className="mt-4">
                    <div className="relative h-1.5 rounded-full bg-blue-900/40 overflow-hidden ring-1 ring-[rgba(65,105,225,0.12)]">
                      {(() => {
                        const total = Math.max(1, R.benefHigh);
                        const lowPct  = (R.benefLow / total) * 100;
                        const midPct  = (R.ahorroAnual / total) * 100;
                        return (
                          <>
                            <div
                              className="absolute inset-y-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                              style={{ left: `${lowPct}%`, width: `${100 - lowPct}%` }}
                            />
                            <div
                              className="absolute -top-1 h-[14px] w-[3px] bg-[#F0F4FF] rounded-full shadow-md"
                              style={{ left: `calc(${midPct}% - 1.5px)` }}
                            />
                          </>
                        );
                      })()}
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-semibold text-blue-300/50 tabular-nums">
                      <span>Cons. {eur(R.benefLow)}</span>
                      <span>Opt. {eur(R.benefHigh)}</span>
                    </div>
                  </div>

                  {story && (
                    <div className="mt-5 pt-4 border-t border-[rgba(65,105,225,0.10)] text-[13px] leading-relaxed text-blue-100/70">
                      Liberarías <strong className="text-[#F0F4FF]">~{story.ftes} FTE</strong> y
                      recuperarías la inversión en{" "}
                      <strong className="text-[#F0F4FF]">{story.pb}</strong>.
                    </div>
                  )}

                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[
                      { k: "Payback", v: paybackLabel },
                      { k: "VAN 3a", v: R.totalInv > 0 ? eur(R.npv) : "—", tone: R.npv >= 0 ? "pos" as const : "neg" as const },
                      { k: "ROI 3a", v: R.totalInv > 0 ? `${num(R.roi3, 0)}%` : "—", tone: R.roi3 >= 0 ? "pos" as const : "neg" as const },
                    ].map((s) => (
                      <div key={s.k} className="rounded-xl bg-[rgba(15,27,76,0.30)] ring-1 ring-[rgba(65,105,225,0.12)] p-2.5">
                        <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-blue-300/50 mb-0.5">{s.k}</p>
                        <p className={`text-[13px] font-bold tabular-nums leading-tight ${
                          s.tone === "pos" ? "text-emerald-400" : s.tone === "neg" ? "text-red-400" : "text-[#F0F4FF]"
                        }`}>
                          {s.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className={`${SURFACE} p-5`}>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300/50">
                    Caja acumulada · 36 meses
                  </p>
                  <span className="text-[10px] text-blue-300/40">{R.nProcs} proceso{R.nProcs > 1 ? "s" : ""}</span>
                </div>
                <CashflowChart years={R.years} invest={R.totalInv} paybackMonths={R.payback} />
              </div>

              {/* Details */}
              <div className={`${SURFACE} p-5 space-y-3`}>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-300/50">
                  Detalle mensual
                </p>
                <dl className="space-y-2 text-[13px]">
                  {[
                    { k: "Coste actual / mes", v: eur(R.costeMes) },
                    { k: "Ahorro / mes",        v: eur(R.ahorroMes), tone: "pos" as const },
                    { k: "Horas liberadas",     v: `${num(R.horasRec)} h · ≈ ${num(R.ftes, 2)} FTE` },
                    { k: "Mantenim. / año",     v: eur(R.maintAnu) },
                  ].map((s) => (
                    <div key={s.k} className="flex items-baseline justify-between gap-3 border-b border-[rgba(65,105,225,0.08)] last:border-0 pb-2 last:pb-0">
                      <dt className="text-blue-200/60">{s.k}</dt>
                      <dd className={`font-semibold tabular-nums ${s.tone === "pos" ? "text-emerald-400" : "text-[#F0F4FF]"}`}>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Actions */}
              <div className="no-print grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 px-3 py-2.5 text-[12px] font-bold text-blue-300 hover:bg-blue-500/20 hover:ring-blue-400/30 transition-all"
                >
                  {shareStatus === "copied" ? (
                    <>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8l3 3 7-7" /></svg>
                      Copiado
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M6 10l4-4M5 6a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4z" />
                      </svg>
                      Compartir
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-blue-500/10 ring-1 ring-blue-500/20 px-3 py-2.5 text-[12px] font-bold text-blue-300 hover:bg-blue-500/20 hover:ring-blue-400/30 transition-all"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 6V2h8v4M4 12H2V7h12v5h-2M4 10h8v4H4z" />
                  </svg>
                  PDF / Print
                </button>
              </div>

              {/* CTA — premium */}
              <div className="no-print relative rounded-3xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-5 text-white overflow-hidden shadow-[0_8px_32px_-8px_rgba(65,105,225,0.5)]">
                <div aria-hidden className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
                <div aria-hidden className="absolute bottom-0 left-0 h-24 w-24 rounded-full bg-indigo-300/20 blur-2xl" />
                <div className="relative">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70 mb-2">
                    Siguiente paso
                  </p>
                  <p className="text-[15px] font-bold leading-snug mb-2">
                    Valida estas cifras con un consultor.
                  </p>
                  <p className="text-[12px] text-white/80 leading-relaxed mb-4">
                    En 45 min ajustamos el modelo con tu operativa real y definimos el alcance mínimo viable.
                  </p>
                  <a
                    href="/#contacto"
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-[13px] font-bold text-blue-600 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.2)] hover:bg-blue-50 transition-colors"
                  >
                    Reservar diagnóstico gratuito
                    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </a>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* ── 04 METHODOLOGY ────────────────────────────────────────────── */}
      {R && (
        <section className={`${SURFACE} overflow-hidden print-break-inside-avoid`}>
          <button
            type="button"
            onClick={() => setShowMethodology(v => !v)}
            className="no-print w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-blue-500/5 transition-colors"
            aria-expanded={showMethodology}
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-lg bg-blue-500/15 ring-1 ring-blue-500/25 text-[11px] font-bold text-blue-400 tabular-nums px-2">
                04
              </span>
              <div>
                <p className="text-base font-bold text-[#F0F4FF]">Metodología y fuentes</p>
                <p className="text-[12px] text-blue-200/50 mt-0.5">Fórmulas auditables · benchmarks citados</p>
              </div>
            </div>
            <svg viewBox="0 0 16 16" className={`h-4 w-4 text-blue-300/50 transition-transform ${showMethodology ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          <div className={`${showMethodology ? "block" : "hidden"} print:block border-t border-[rgba(65,105,225,0.10)]`}>
            <div className="grid gap-8 lg:grid-cols-2 p-5 sm:p-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300/50 mb-4">
                  Fórmulas
                </p>
                <div className="space-y-3">
                  {[
                    ["Coste mensual", "horas × personas × €/h + errores × €/error"],
                    ["Ahorro mensual", "Coste × %automatización × escenario"],
                    ["Inversión total", "desarrollo × integración + licencias"],
                    ["Payback",        "Inversión / Ahorro mensual"],
                    ["VAN 3 años",     "−I₀ + Σ [(Benefₜ − Costeₜ) / (1+r)ᵗ], r = 10 %"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-[rgba(15,27,76,0.30)] ring-1 ring-[rgba(65,105,225,0.15)] p-3">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-300/60 mb-1">{k}</p>
                      <p className="font-mono text-[11.5px] text-blue-100">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-300/50 mb-4">
                  Supuestos y fuentes
                </p>
                <ul className="space-y-3 text-[13px] text-blue-100/70 leading-relaxed">
                  {[
                    "Curva de aprendizaje año 1: 0.9× sobre beneficio proyectado.",
                    "Tasa de descuento 10 % anual (referencia pyme/mediana).",
                    "1 FTE = 160 horas/mes. Potencial limitado al 95 % máx.",
                    "Fuentes: UiPath Automation Benchmark · McKinsey Global Institute · APQC PCF · Nucleus Research.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-blue-500/10 text-[10px] font-bold text-blue-400 tabular-nums">
                        {i + 1}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/15 p-3 text-[11.5px] text-amber-200 leading-relaxed">
                  <strong>Estimación orientativa.</strong> El ROI real depende de la madurez
                  del proceso, integraciones y adopción. Agenda un diagnóstico para un análisis preciso.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
