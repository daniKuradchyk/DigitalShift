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
  svg: ReactNode;
  project: { costeDesarrollo: string; integracion: IntegrationKey; licencias: string };
  procs: StarterProc[];
}

const INDUSTRIES: Industry[] = [
  {
    key: "ecommerce",
    label: "E-commerce",
    tagline: "Pedidos, devoluciones, stock",
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

// ── Design primitives (sistema corporativo claro) ────────────────────────────

/** Tarjeta plana: fondo blanco, borde fino, sin sombra. */
const SURFACE = "border border-[#E4E6EA] bg-white";

const INPUT_CLS =
  "w-full border border-[#C9CCD3] bg-white px-3 py-2.5 text-sm text-[#101014]";

function Label({ children, info, suffix }: { children: ReactNode; info?: string; suffix?: ReactNode }) {
  return (
    <label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-[#101014]">
      {children}
      {info && <InfoDot text={info} />}
      {suffix && <span className="ml-auto text-xs font-semibold tabular-nums text-brand-600">{suffix}</span>}
    </label>
  );
}

function NumInput({
  value, onChange, placeholder, prefix, suffix, min = 0, step,
}: { value: string; onChange: (v: string) => void; placeholder?: string; prefix?: string; suffix?: string; min?: number; step?: number }) {
  return (
    <div className="relative">
      {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#63666D]">{prefix}</span>}
      <input
        type="number" min={min} step={step} value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${INPUT_CLS} tabular-nums ${prefix ? "pl-7" : ""} ${suffix ? "pr-12" : ""}`}
      />
      {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#63666D]">{suffix}</span>}
    </div>
  );
}

function InfoDot({ text }: { text: string }) {
  return (
    <span className="group/info relative inline-flex">
      <span className="inline-flex h-4 w-4 cursor-help select-none items-center justify-center border border-[#C9CCD3] text-[10px] font-semibold text-[#63666D] transition-colors hover:border-[#101014] hover:text-[#101014]">?</span>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 w-56 -translate-x-1/2 border border-[#E4E6EA] bg-white px-3 py-2.5 text-xs font-normal normal-case leading-snug tracking-normal text-[#3D4046] opacity-0 transition-opacity group-hover/info:opacity-100">
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
    <div className={SURFACE}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-[#E4E6EA] text-[11px] font-medium tabular-nums text-[#101014]">
          {String(idx + 1).padStart(2, "0")}
        </span>
        <input
          type="text"
          value={proc.nombre}
          onChange={e => onChange(proc.id, "nombre", e.target.value)}
          placeholder={`Proceso ${idx + 1} — pon un nombre descriptivo`}
          className="min-w-0 flex-1 border border-[#E4E6EA] bg-white px-3 py-1.5 text-[15px] font-medium text-[#101014]"
        />
        {subtotal && (
          <span className="hidden items-center border border-[#E4E6EA] px-2.5 py-1 text-[11px] font-medium tabular-nums text-[#101014] sm:inline-flex">
            {eur(subtotal.ahorroLab + subtotal.ahorroErr)}/mes
          </span>
        )}
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(proc.id)}
            aria-label="Eliminar proceso"
            className="no-print inline-flex h-7 w-7 shrink-0 items-center justify-center text-[#63666D] transition-colors hover:text-[#101014]"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-5 border-t border-[#E4E6EA] px-5 py-5">
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
          {preset.desc && <p className="mt-2 text-[13px] text-[#63666D]">{preset.desc}</p>}
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
            <div className="relative border border-[#E4E6EA] bg-[#F5F6F8] px-3.5 py-3">
              <input
                type="range" min="20" max="95" step="5"
                value={proc.automPot}
                onChange={e => onChange(proc.id, "automPot", e.target.value)}
                className="h-1.5 w-full cursor-pointer accent-brand-600"
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
      <line x1={PADL} x2={W - PADR} y1={zeroY} y2={zeroY} stroke="#C9CCD3" strokeWidth="1" strokeDasharray="4 4" />

      {[12, 24, 36].map((m) => (
        <g key={m}>
          <line x1={xAt(m)} x2={xAt(m)} y1={PADT} y2={PADT + IH} stroke="#E4E6EA" />
          <text x={xAt(m)} y={H - 8} textAnchor="middle" fontSize="10" fontWeight="500" fill="#63666D">
            Mes {m}
          </text>
        </g>
      ))}

      <text x={PADL - 8} y={yAt(cumMax) + 3} textAnchor="end" fontSize="10" fontWeight="500" fill="#3D4046">{eur(cumMax)}</text>
      <text x={PADL - 8} y={zeroY + 3} textAnchor="end" fontSize="10" fill="#63666D">0</text>
      <text x={PADL - 8} y={yAt(cumMin) + 3} textAnchor="end" fontSize="10" fontWeight="500" fill="#3D4046">{eur(cumMin)}</text>

      <path d={area} fill="rgba(44,75,196,0.08)" />
      <path d={path} fill="none" stroke="#2C4BC4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {pbX !== null && (
        <g>
          <line x1={pbX} x2={pbX} y1={PADT} y2={PADT + IH} stroke="#101014" strokeWidth="1" strokeDasharray="4 3" />
          <circle cx={pbX} cy={zeroY} r="4" fill="#FFFFFF" stroke="#101014" strokeWidth="2" />
          <text x={pbX + 8} y={PADT + 13} fontSize="11" fontWeight="600" fill="#101014">
            Payback · {num(paybackMonths, 1)}m
          </text>
        </g>
      )}
    </svg>
  );
}

// ── Opportunity ───────────────────────────────────────────────────────────────

const OPP = {
  alta:  { cls: "border-[#101014] text-[#101014]", label: "Oportunidad alta",  desc: "Payback ≤ 12 meses" },
  media: { cls: "border-[#C9CCD3] text-[#3D4046]", label: "Oportunidad media", desc: "Payback 12–24 meses" },
  baja:  { cls: "border-[#E4E6EA] text-[#63666D]", label: "Oportunidad baja",  desc: "Payback > 24 meses" },
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
    <div className="mb-6 flex items-start gap-5">
      <span className="text-2xl font-light leading-none tabular-nums tracking-tight text-[#9DA0A6] sm:text-3xl">
        {step}
      </span>
      <div>
        <h2 className="text-h3">{title}</h2>
        {caption && <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[#3D4046]">{caption}</p>}
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

        <div className="grid grid-cols-2 gap-px bg-[#E4E6EA] md:grid-cols-3 lg:grid-cols-6">
          {INDUSTRIES.map((ind) => {
            const active = activeIndustry === ind.key;
            return (
              <button
                key={ind.key}
                type="button"
                onClick={() => loadIndustry(ind)}
                aria-pressed={active}
                className={`relative p-4 text-left transition-colors ${
                  active ? "bg-[#F5F6F8]" : "bg-white hover:bg-[#F5F6F8]"
                }`}
              >
                <span className={`mb-3 inline-flex h-10 w-10 items-center justify-center border ${
                  active ? "border-[#101014] text-[#101014]" : "border-[#E4E6EA] text-[#3D4046]"
                }`}>
                  <span className="h-5 w-5">{ind.svg}</span>
                </span>
                <p className="text-[13px] font-semibold leading-tight tracking-tight text-[#101014]">{ind.label}</p>
                <p className="mt-1 text-[11px] leading-snug text-[#63666D]">{ind.tagline}</p>
                {active && <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-600" />}
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
                  className="no-print mt-1 inline-flex shrink-0 items-center gap-2 border border-[#C9CCD3] px-3.5 py-2 text-xs font-medium text-[#101014] transition-colors hover:border-[#101014]"
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
                  <p className="mt-2 text-[13px] text-[#63666D]">Proceso simple 8–15 k · ERP/CRM 20–50 k · Complejo 50 k+</p>
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
                  <p className="mt-2 text-[13px] text-[#63666D]">Multiplica desarrollo × {INTEGRATION[project.integracion].mult}</p>
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
                  <div className="relative border border-[#E4E6EA] bg-[#F5F6F8] px-3.5 py-3">
                    <input
                      type="range" min="0" max="30" step="1"
                      value={project.mantenimientoPct}
                      onChange={e => updateProj("mantenimientoPct", e.target.value)}
                      className="h-1.5 w-full cursor-pointer accent-brand-600"
                    />
                  </div>
                </div>
              </div>

              {/* Investment summary */}
              {n(project.costeDesarrollo) > 0 && (
                <div className="grid gap-x-6 gap-y-4 border-t border-[#E4E6EA] pt-6 sm:grid-cols-3">
                  {[
                    { k: "Desarrollo año 1", v: eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult) },
                    { k: "Licencias año 1",  v: eur(n(project.licencias)) },
                    { k: "Mantenim. / año",  v: eur(n(project.costeDesarrollo) * INTEGRATION[project.integracion].mult * (n(project.mantenimientoPct) / 100) + n(project.licencias)) },
                  ].map((s) => (
                    <div key={s.k}>
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">{s.k}</p>
                      <p className="text-lg font-semibold tabular-nums tracking-tight text-[#101014]">{s.v}</p>
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
          <div className={`${SURFACE} p-4`}>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
              Escenario
            </p>
            <div className="grid grid-cols-3 gap-px bg-[#E4E6EA]">
              {(Object.keys(SCENARIOS) as ScenarioKey[]).map(k => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setScenario(k)}
                  aria-pressed={scenario === k}
                  className={`py-2 text-xs font-medium transition-colors ${
                    scenario === k
                      ? "bg-[#101014] text-white"
                      : "bg-white text-[#3D4046] hover:bg-[#F5F6F8]"
                  }`}
                >
                  {SCENARIOS[k].label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-[#63666D]">
              {SCENARIOS[scenario].note}
            </p>
          </div>

          {!R ? (
            <div className={`${SURFACE} p-10 text-center`}>
              <p className="text-sm text-[#63666D]">Rellena los campos para ver el resultado.</p>
            </div>
          ) : (
            <>
              {/* Hero metric panel */}
              <div className={`${SURFACE} p-6`}>
                {oppStyle && (
                  <p className={`mb-5 inline-flex items-center border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${oppStyle.cls}`}>
                    {oppStyle.label}
                  </p>
                )}

                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    Ahorro anual potencial
                  </p>
                  <p className="text-[2.6rem] font-semibold leading-[0.95] tabular-nums tracking-tight text-[#101014]">
                    {eur(R.ahorroAnual)}
                  </p>

                  {/* Confidence band */}
                  <div className="mt-5">
                    <div className="relative h-1.5 w-full overflow-hidden bg-[#E4E6EA]">
                      {(() => {
                        const total = Math.max(1, R.benefHigh);
                        const lowPct  = (R.benefLow / total) * 100;
                        const midPct  = (R.ahorroAnual / total) * 100;
                        return (
                          <>
                            <div
                              className="absolute inset-y-0 bg-brand-600"
                              style={{ left: `${lowPct}%`, width: `${100 - lowPct}%` }}
                            />
                            <div
                              className="absolute -top-1 h-[14px] w-[2px] bg-[#101014]"
                              style={{ left: `calc(${midPct}% - 1px)` }}
                            />
                          </>
                        );
                      })()}
                    </div>
                    <div className="mt-2 flex justify-between text-xs tabular-nums text-[#63666D]">
                      <span>Cons. {eur(R.benefLow)}</span>
                      <span>Opt. {eur(R.benefHigh)}</span>
                    </div>
                  </div>

                  {story && (
                    <div className="mt-6 border-t border-[#E4E6EA] pt-5 text-[13px] leading-relaxed text-[#3D4046]">
                      Liberarías <strong className="font-semibold text-[#101014]">~{story.ftes} FTE</strong> y
                      recuperarías la inversión en{" "}
                      <strong className="font-semibold text-[#101014]">{story.pb}</strong>.
                    </div>
                  )}

                  <dl className="mt-6 grid grid-cols-3 divide-x divide-[#E4E6EA] border-t border-[#E4E6EA] pt-5">
                    {[
                      { k: "Payback", v: paybackLabel },
                      { k: "VAN 3a", v: R.totalInv > 0 ? eur(R.npv) : "—" },
                      { k: "ROI 3a", v: R.totalInv > 0 ? `${num(R.roi3, 0)}%` : "—" },
                    ].map((s, i) => (
                      <div key={s.k} className={i === 0 ? "pr-3" : "px-3 last:pr-0"}>
                        <dt className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#63666D]">{s.k}</dt>
                        <dd className="text-sm font-semibold leading-tight tabular-nums text-[#101014]">
                          {s.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Chart */}
              <div className={`${SURFACE} p-5`}>
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    Caja acumulada · 36 meses
                  </p>
                  <span className="text-xs text-[#9DA0A6]">{R.nProcs} proceso{R.nProcs > 1 ? "s" : ""}</span>
                </div>
                <CashflowChart years={R.years} invest={R.totalInv} paybackMonths={R.payback} />
              </div>

              {/* Details */}
              <div className={`${SURFACE} p-5`}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  Detalle mensual
                </p>
                <dl className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA] text-[13px]">
                  {[
                    { k: "Coste actual / mes", v: eur(R.costeMes) },
                    { k: "Ahorro / mes",        v: eur(R.ahorroMes) },
                    { k: "Horas liberadas",     v: `${num(R.horasRec)} h · ≈ ${num(R.ftes, 2)} FTE` },
                    { k: "Mantenim. / año",     v: eur(R.maintAnu) },
                  ].map((s) => (
                    <div key={s.k} className="flex items-baseline justify-between gap-3 py-2.5">
                      <dt className="text-[#63666D]">{s.k}</dt>
                      <dd className="font-semibold tabular-nums text-[#101014]">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Actions */}
              <div className="no-print grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 border border-[#C9CCD3] px-3 py-2.5 text-xs font-medium text-[#101014] transition-colors hover:border-[#101014]"
                >
                  {shareStatus === "copied" ? (
                    <>
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M3 8l3 3 7-7" /></svg>
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
                  className="inline-flex items-center justify-center gap-2 border border-[#C9CCD3] px-3 py-2.5 text-xs font-medium text-[#101014] transition-colors hover:border-[#101014]"
                >
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M4 6V2h8v4M4 12H2V7h12v5h-2M4 10h8v4H4z" />
                  </svg>
                  PDF / Print
                </button>
              </div>

              {/* CTA */}
              <div className="no-print band-dark p-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">
                  Siguiente paso
                </p>
                <p className="mb-3 text-base font-semibold leading-snug tracking-tight text-white">
                  Valida estas cifras con un consultor.
                </p>
                <p className="mb-6 text-[13px] leading-relaxed text-white/70">
                  En 45 min ajustamos el modelo con tu operativa real y definimos el alcance mínimo viable.
                </p>
                <a
                  href="/#contacto"
                  className="inline-flex w-full items-center justify-center rounded-[2px] bg-white px-4 py-2.5 text-[13px] font-medium tracking-tight text-[#101014] transition-colors hover:bg-white/90"
                >
                  Reservar diagnóstico gratuito
                </a>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* ── 04 METHODOLOGY ────────────────────────────────────────────── */}
      {R && (
        <section className={`${SURFACE} print-break-inside-avoid`}>
          <button
            type="button"
            onClick={() => setShowMethodology(v => !v)}
            className="no-print flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F5F6F8] sm:px-6"
            aria-expanded={showMethodology}
          >
            <div className="flex items-center gap-5">
              <span className="text-2xl font-light leading-none tabular-nums tracking-tight text-[#9DA0A6]">
                04
              </span>
              <div>
                <p className="text-base font-semibold tracking-tight text-[#101014]">Metodología y fuentes</p>
                <p className="mt-0.5 text-[13px] text-[#63666D]">Fórmulas auditables · benchmarks citados</p>
              </div>
            </div>
            <svg viewBox="0 0 16 16" className={`h-4 w-4 text-[#63666D] transition-transform ${showMethodology ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 6l4 4 4-4" />
            </svg>
          </button>

          <div className={`${showMethodology ? "block" : "hidden"} print:block border-t border-[#E4E6EA]`}>
            <div className="grid gap-10 p-5 sm:p-6 lg:grid-cols-2">
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  Fórmulas
                </p>
                <dl className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                  {[
                    ["Coste mensual", "horas × personas × €/h + errores × €/error"],
                    ["Ahorro mensual", "Coste × %automatización × escenario"],
                    ["Inversión total", "desarrollo × integración + licencias"],
                    ["Payback",        "Inversión / Ahorro mensual"],
                    ["VAN 3 años",     "−I₀ + Σ [(Benefₜ − Costeₜ) / (1+r)ᵗ], r = 10 %"],
                  ].map(([k, v]) => (
                    <div key={k} className="py-3">
                      <dt className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">{k}</dt>
                      <dd className="text-[13px] text-[#101014]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  Supuestos y fuentes
                </p>
                <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA] text-[13px] leading-relaxed text-[#3D4046]">
                  {[
                    "Curva de aprendizaje año 1: 0.9× sobre beneficio proyectado.",
                    "Tasa de descuento 10 % anual (referencia pyme/mediana).",
                    "1 FTE = 160 horas/mes. Potencial limitado al 95 % máx.",
                    "Fuentes: UiPath Automation Benchmark · McKinsey Global Institute · APQC PCF · Nucleus Research.",
                  ].map((t, i) => (
                    <li key={i} className="flex gap-4 py-3">
                      <span className="flex-none font-medium tabular-nums text-[#9DA0A6]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-[13px] leading-relaxed text-[#3D4046]">
                  <strong className="font-semibold text-[#101014]">Estimación orientativa.</strong> El ROI real depende de la madurez
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
