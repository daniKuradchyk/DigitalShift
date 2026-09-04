"use client";

import React, { useMemo, useState } from "react";
import Button from "@/components/common/Button";
import { calculateTax, getRules, type Bracket, type TaxInput, type TaxYear } from "@/lib/tax-engine";
import {
  calculateModulosAssisted,
  calculateModulosSimple,
  estimateModelo131Payments,
  estimateWithholding1Percent,
  getModulosDataset,
  isWithholding1PercentActivity,
  listWithholdingActivities,
  type ModulosActivity,
  type ModulosYear,
} from "@/lib/tax-engine/modulos";

type Situation = "employee" | "autonomo" | "pluri";
type RetaMode = "annual" | "monthly";

type OtherPayer = {
  id: string;
  gross: string;
  withhold: string;
  ss: string;
};

const steps = [
  { id: "A", title: "Situación", summary: "Escenario y residencia fiscal" },
  { id: "B", title: "Ingresos", summary: "Rentas y retenciones" },
  { id: "C", title: "Personal", summary: "Familia y situación" },
  { id: "D", title: "Helpers", summary: "Gastos opcionales" },
  { id: "E", title: "Resultado", summary: "Estimación y desglose" },
] as const;

const ccaaOptions = [
  { value: "", label: "Sin seleccionar (escala combinada)" },
  { value: "andalucia", label: "Andalucía" },
  { value: "aragon", label: "Aragón" },
  { value: "asturias", label: "Asturias" },
  { value: "baleares", label: "Baleares" },
  { value: "canarias", label: "Canarias" },
  { value: "cantabria", label: "Cantabria" },
  { value: "castilla-la-mancha", label: "Castilla-La Mancha" },
  { value: "castilla-y-leon", label: "Castilla y León" },
  { value: "cataluna", label: "Cataluña" },
  { value: "extremadura", label: "Extremadura" },
  { value: "galicia", label: "Galicia" },
  { value: "madrid", label: "Madrid" },
  { value: "murcia", label: "Murcia" },
  { value: "valencia", label: "Valencia" },
  { value: "la-rioja", label: "La Rioja" },
] as const;

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const CCAA_SCALES: Record<string, Bracket[] | undefined> = {};

const Icons = {
  user: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  ),
  wallet: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M16 10h5v4h-5z" />
    </svg>
  ),
  users: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M10 20a6 6 0 0 1 12 0" />
    </svg>
  ),
  tools: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 7.5 20 3l1 1-4.5 5.5" />
      <path d="m3 21 9-9" />
      <path d="m9 9 6 6" />
    </svg>
  ),
  chart: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 3 3 5-6" />
    </svg>
  ),
  briefcase: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <path d="M3 12h18" />
    </svg>
  ),
  bolt: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  ),
  banknote: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 9h.01M17 15h.01" />
    </svg>
  ),
  home: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  meal: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a3 3 0 0 0 6 0V3" />
      <path d="M9 3v7" />
      <path d="M15 3h3a2 2 0 0 1 2 2v15" />
    </svg>
  ),
  list: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  alert: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  ),
  check: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 13 4 4L19 7" />
    </svg>
  ),
  plus: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

function formatCurrency(value: number) {
  return currencyFormatter.format(value);
}

function formatNumber(value: number) {
  return numberFormatter.format(value);
}

function formatPercent(rate: number) {
  return `${(rate * 100).toFixed(2).replace(/\\.00$/, "")}%`;
}

function toPositiveNumber(value: string) {
  const normalized = value.replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(0, parsed);
}

function toOptionalNumber(value: string) {
  return value.trim() === "" ? undefined : toPositiveNumber(value);
}

function clampInt(value: string, min: number, max: number) {
  const parsed = Math.floor(toPositiveNumber(value));
  return Math.max(min, Math.min(max, parsed));
}

function createId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* ── Clases compartidas del sistema corporativo ───────────────── */
const fieldLabel = "block text-sm font-medium text-[#101014]";
const fieldInput = "h-10 w-full px-3 text-sm text-[#101014] disabled:opacity-50";
const fieldHelp = "text-xs leading-relaxed text-[#63666D]";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]";
const panelCard = "rounded-[4px] border border-[#E4E6EA] bg-white p-5";
const noteBlock = "border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-xs leading-relaxed text-[#3D4046]";
const mutedBlock = "border border-[#E4E6EA] bg-[#F5F6F8] px-4 py-3 text-xs leading-relaxed text-[#63666D]";
const chipBase = "rounded-[2px] border px-3 py-1.5 text-xs font-medium transition-colors";
const chipOn = "border-[#101014] bg-[#101014] text-white";
const chipOff = "border-[#C9CCD3] bg-white text-[#3D4046] hover:border-[#101014]";

type NumberFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  placeholder?: string;
  min?: number;
  step?: string;
  suffix?: string;
  disabled?: boolean;
};

function NumberField({
  id,
  label,
  value,
  onChange,
  help,
  placeholder,
  min = 0,
  step = "0.01",
  suffix,
  disabled,
}: NumberFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${fieldInput} ${suffix ? "pr-12" : ""}`}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9DA0A6]">
            {suffix}
          </span>
        ) : null}
      </div>
      {help ? <p className={fieldHelp}>{help}</p> : null}
    </div>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  placeholder?: string;
  disabled?: boolean;
  listId?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

function TextField({
  id,
  label,
  value,
  onChange,
  help,
  placeholder,
  disabled,
  listId,
  inputMode = "text",
}: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        inputMode={inputMode}
        value={value}
        disabled={disabled}
        list={listId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={fieldInput}
      />
      {help ? <p className={fieldHelp}>{help}</p> : null}
    </div>
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
      <label htmlFor={id} className={fieldLabel}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${fieldInput} appearance-none pr-10`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span aria-hidden className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#63666D]">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 8 4 4 4-4" />
          </svg>
        </span>
      </div>
      {help ? <p className={fieldHelp}>{help}</p> : null}
    </div>
  );
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
    <label className={`group relative flex cursor-pointer items-start gap-3 rounded-[4px] border p-4 text-sm transition-colors focus-within:ring-2 focus-within:ring-brand-600/40 ${
      checked ? "border-[#101014] bg-[#F5F6F8]" : "border-[#E4E6EA] bg-white hover:border-[#101014]"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`flex h-10 w-10 flex-none items-center justify-center border transition-colors ${
        checked ? "border-[#101014] bg-[#101014] text-white" : "border-[#E4E6EA] text-[#101014]"
      }`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-[#101014]">{title}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-[#63666D]">{description}</span>
      </div>
      {checked && (
        <span aria-hidden className="mt-0.5 flex-none text-brand-600">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m4 10 4 4 8-8" />
          </svg>
        </span>
      )}
    </label>
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
    <label className={`group flex cursor-pointer items-start justify-between gap-4 rounded-[4px] border p-4 text-sm transition-colors focus-within:ring-2 focus-within:ring-brand-600/40 ${
      checked ? "border-[#101014] bg-[#F5F6F8]" : "border-[#E4E6EA] bg-white hover:border-[#101014]"
    }`}>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-[#101014]">{label}</span>
        {description ? <span className="mt-0.5 block text-xs leading-relaxed text-[#63666D]">{description}</span> : null}
      </span>
      <span aria-hidden className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center border transition-colors ${
        checked ? "border-[#101014] bg-[#101014] text-white" : "border-[#C9CCD3] bg-white text-transparent"
      }`}>
        <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m4 10 4 4 8-8" />
        </svg>
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
};

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 text-sm first:pt-0 last:pb-0">
      <span className="text-[#63666D]">{label}</span>
      <span className="font-semibold tabular-nums text-[#101014]">{value}</span>
    </div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-10 w-10 flex-none items-center justify-center border border-[#E4E6EA] text-[#101014]">
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
    <div className="flex items-start gap-4 border-b border-[#E4E6EA] pb-5">
      <div className="flex h-10 w-10 flex-none items-center justify-center border border-[#E4E6EA] text-brand-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#63666D]">Paso {stepId}</p>
        {/* h2, no h4: el encabezado anterior de la página es el h1 y no hay nivel intermedio.
            Mismas clases, así que el aspecto no cambia. */}
        <h2 className="text-lg font-semibold leading-snug tracking-tight text-[#101014]">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[#3D4046]">{description}</p>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<Situation>("employee");
  const [year, setYear] = useState<TaxYear>(2024);
  const [region, setRegion] = useState("comun");
  const [ccaa, setCcaa] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [workGross, setWorkGross] = useState("");
  const [workWithhold, setWorkWithhold] = useState("");
  const [workSs, setWorkSs] = useState("");
  const [workExpenses, setWorkExpenses] = useState("");
  const [otherPayers, setOtherPayers] = useState<OtherPayer[]>([]);
  const [savingsIncome, setSavingsIncome] = useState("");

  const [autoIncome, setAutoIncome] = useState("");
  const [autoExpenses, setAutoExpenses] = useState("");
  const [autoWithhold, setAutoWithhold] = useState("");
  const [autoModelo130, setAutoModelo130] = useState("");
  const [autonomoMode, setAutonomoMode] = useState<"directa" | "modulos">("directa");
  const [modulosMode, setModulosMode] = useState<"simple" | "asistido">("simple");
  const [modulosYear, setModulosYear] = useState<ModulosYear>(2025);
  const [modulosNetAnnual, setModulosNetAnnual] = useState("");
  const [modulosDays, setModulosDays] = useState("365");
  const [modulosNetProrated, setModulosNetProrated] = useState(false);
  const [modulosPayments131, setModulosPayments131] = useState("");
  const [modulosRetentions, setModulosRetentions] = useState("");
  const [modulosWithholdingApplies, setModulosWithholdingApplies] = useState(false);
  const [modulosWithholdingBase, setModulosWithholdingBase] = useState("");
  const [modulosWithholdingSearch, setModulosWithholdingSearch] = useState("");
  const [modulosEmployeeCount, setModulosEmployeeCount] = useState("0");
  const [modulosIncomeTotal, setModulosIncomeTotal] = useState("");
  const [modulosInvoiceTotal, setModulosInvoiceTotal] = useState("");
  const [modulosActivityQuery, setModulosActivityQuery] = useState("");
  const [modulosActivityIae, setModulosActivityIae] = useState("");
  const [modulosModuleValues, setModulosModuleValues] = useState<Record<string, string>>({});
  const [modulosIndexValues, setModulosIndexValues] = useState<Record<string, string>>({});
  const [modulosMinorations, setModulosMinorations] = useState("");
  const [modulosAmortizations, setModulosAmortizations] = useState("");
  const [retaMode, setRetaMode] = useState<RetaMode>("annual");
  const [retaAnnual, setRetaAnnual] = useState("");
  const [retaMonthly, setRetaMonthly] = useState("");

  const [age, setAge] = useState("30");
  const [jointType, setJointType] = useState("individual");
  const [dependents, setDependents] = useState("0");
  const [dependentsUnder3, setDependentsUnder3] = useState("0");
  const [otherIncome, setOtherIncome] = useState("");

  const [officeArea, setOfficeArea] = useState("");
  const [homeArea, setHomeArea] = useState("");
  const [homeSupplies, setHomeSupplies] = useState("");
  const [includeOffice, setIncludeOffice] = useState(false);

  const [mealsSpainNoOvernight, setMealsSpainNoOvernight] = useState("");
  const [mealsSpainOvernight, setMealsSpainOvernight] = useState("");
  const [mealsAbroadNoOvernight, setMealsAbroadNoOvernight] = useState("");
  const [mealsAbroadOvernight, setMealsAbroadOvernight] = useState("");
  const [includeMeals, setIncludeMeals] = useState(false);

  const rules = getRules(year);
  const showWork = situation === "employee" || situation === "pluri";
  const showAutonomo = situation === "autonomo" || situation === "pluri";
  const isModulos = showAutonomo && autonomoMode === "modulos";
  const modulosDataset = useMemo(() => getModulosDataset(modulosYear), [modulosYear]);
  const modulosActivities = modulosDataset.activities;
  const modulosActivity = useMemo<ModulosActivity | null>(() => {
    if (!modulosActivityIae) return null;
    return modulosActivities.find((activity) => activity.iae === modulosActivityIae) ?? null;
  }, [modulosActivityIae, modulosActivities]);

  const otherTotals = useMemo(() => {
    return otherPayers.reduce(
      (acc, payer) => {
        acc.gross += toPositiveNumber(payer.gross);
        acc.withhold += toPositiveNumber(payer.withhold);
        acc.ss += toPositiveNumber(payer.ss);
        return acc;
      },
      { gross: 0, withhold: 0, ss: 0 },
    );
  }, [otherPayers]);

  const workGrossTotal = toPositiveNumber(workGross) + otherTotals.gross;
  const workWithholdTotal = toPositiveNumber(workWithhold) + otherTotals.withhold;
  const workSsTotal = toPositiveNumber(workSs) + otherTotals.ss;
  const modulosDaysValue = clampInt(modulosDays, 0, 365);
  const modulosEmployeesValue = clampInt(modulosEmployeeCount, 0, 99);
  const modulosWithholdingList = useMemo(() => listWithholdingActivities(modulosYear), [modulosYear]);
  const modulosWithholdingMatches = useMemo(() => {
    const query = modulosWithholdingSearch.trim().toLowerCase();
    if (!query) return [];
    return modulosWithholdingList.filter((item) => {
      return item.iaeGroupOrEpigrafe.toLowerCase().includes(query) || item.name.toLowerCase().includes(query);
    }).slice(0, 6);
  }, [modulosWithholdingList, modulosWithholdingSearch]);
  const modulosActivityOptions = useMemo(() => {
    return modulosActivities.map((activity) => `${activity.iae} - ${activity.name}`);
  }, [modulosActivities]);
  const modulosWithholdingOptions = useMemo(() => {
    return modulosWithholdingList.map((item) => `${item.iaeGroupOrEpigrafe} - ${item.name}`);
  }, [modulosWithholdingList]);
  const modulosActivityHasWithholding = modulosActivity ? isWithholding1PercentActivity(modulosActivity.iae, modulosYear) : false;
  const modulosModuleValuesNumeric = useMemo(() => {
    if (!modulosActivity) return {};
    return modulosActivity.modules.reduce<Record<string, number>>((acc, module) => {
      acc[module.key] = toPositiveNumber(modulosModuleValues[module.key] ?? "");
      return acc;
    }, {});
  }, [modulosActivity, modulosModuleValues]);
  const modulosIndexMultipliers = useMemo(() => {
    if (!modulosActivity?.specialIndices?.length) return {};
    return modulosActivity.specialIndices.reduce<Record<string, number>>((acc, index) => {
      const fallback = index.options[0]?.multiplier ?? 1;
      acc[index.key] = toPositiveNumber(modulosIndexValues[index.key] ?? String(fallback)) || fallback;
      return acc;
    }, {});
  }, [modulosActivity, modulosIndexValues]);
  const modulosAssistedResult = useMemo(() => {
    if (!modulosActivity) return null;
    return calculateModulosAssisted({
      year: modulosYear,
      activity: modulosActivity,
      moduleValues: modulosModuleValuesNumeric,
      indexMultipliers: modulosIndexMultipliers,
      daysActive: modulosDaysValue,
      minorations: toPositiveNumber(modulosMinorations),
      amortizations: toPositiveNumber(modulosAmortizations),
    });
  }, [
    modulosActivity,
    modulosYear,
    modulosModuleValuesNumeric,
    modulosIndexMultipliers,
    modulosDaysValue,
    modulosMinorations,
    modulosAmortizations,
  ]);
  const modulosSimpleResult = useMemo(() => {
    return calculateModulosSimple({
      netAnnual: toPositiveNumber(modulosNetAnnual),
      daysActive: modulosDaysValue,
      isProrated: modulosNetProrated,
    });
  }, [modulosNetAnnual, modulosDaysValue, modulosNetProrated]);
  const modulosNetValue = isModulos
    ? (modulosMode === "simple" ? modulosSimpleResult.net : modulosAssistedResult?.net ?? 0)
    : 0;
  const modulosWithholdingManual = toPositiveNumber(modulosRetentions);
  const modulosWithholdingManualProvided = modulosRetentions.trim() !== "";
  const modulosWithholdingEstimate = modulosWithholdingApplies
    ? estimateWithholding1Percent(toPositiveNumber(modulosWithholdingBase))
    : 0;
  const modulosWithholdingTotal = modulosWithholdingManualProvided ? modulosWithholdingManual : modulosWithholdingEstimate;
  const modulosPaymentsManual = toPositiveNumber(modulosPayments131);
  const modulosPaymentsManualProvided = modulosPayments131.trim() !== "";
  const modulosPaymentBase = modulosMode === "simple" ? modulosSimpleResult.base : modulosAssistedResult?.reduced ?? 0;
  const modulosPaymentsEstimate = estimateModelo131Payments({
    rendimiento: modulosPaymentBase,
    daysActive: modulosMode === "simple" && modulosNetProrated ? 365 : modulosDaysValue,
    employees: modulosEmployeesValue,
  });
  const modulosPaymentsTotal = modulosPaymentsManualProvided ? modulosPaymentsManual : modulosPaymentsEstimate;

  const officeDeduction = useMemo(() => {
    const supplies = toPositiveNumber(homeSupplies);
    const office = toPositiveNumber(officeArea);
    const home = toPositiveNumber(homeArea);
    if (!supplies || !office || !home || office > home) return 0;
    return supplies * (office / home) * 0.3;
  }, [homeSupplies, officeArea, homeArea]);

  const mealsDeduction = useMemo(() => {
    const limits = rules.mealLimits;
    const spainNo = toPositiveNumber(mealsSpainNoOvernight);
    const spainOver = toPositiveNumber(mealsSpainOvernight);
    const abroadNo = toPositiveNumber(mealsAbroadNoOvernight);
    const abroadOver = toPositiveNumber(mealsAbroadOvernight);
    return spainNo * limits.spainNoOvernight
      + spainOver * limits.spainOvernight
      + abroadNo * limits.abroadNoOvernight
      + abroadOver * limits.abroadOvernight;
  }, [mealsSpainNoOvernight, mealsSpainOvernight, mealsAbroadNoOvernight, mealsAbroadOvernight, rules]);

  const helpersTotal = autonomoMode === "directa" ? (includeOffice ? officeDeduction : 0) + (includeMeals ? mealsDeduction : 0) : 0;
  const autoExpensesTotal = autonomoMode === "directa" ? toPositiveNumber(autoExpenses) + helpersTotal : 0;

  const retaAnnualValue = retaMode === "monthly" ? toPositiveNumber(retaMonthly) * 12 : toPositiveNumber(retaAnnual);
  const retaValue = autonomoMode === "directa" ? retaAnnualValue : 0;
  const dependentsCount = clampInt(dependents, 0, 4);
  const dependentsUnder3Count = clampInt(dependentsUnder3, 0, dependentsCount);

  const ccaaScale = ccaa ? CCAA_SCALES[ccaa] : undefined;
  const useCombinedScale = !ccaaScale;

  const autoIncomeValue = autonomoMode === "modulos" ? modulosNetValue : toPositiveNumber(autoIncome);
  const canCalculate = region === "comun" && (workGrossTotal > 0 || autoIncomeValue > 0 || toPositiveNumber(savingsIncome) > 0);

  const taxInput = useMemo<TaxInput>(() => {
    return {
      year,
      useCombinedScale,
      generalScaleOverride: ccaaScale,
      savingsIncome: toPositiveNumber(savingsIncome),
      work: showWork
        ? {
            gross: workGrossTotal,
            withhold: workWithholdTotal,
            ss: workSsTotal,
            otherExpenses: toOptionalNumber(workExpenses),
          }
        : null,
      autonomo: showAutonomo
        ? isModulos
          ? {
              income: 0,
              expenses: 0,
              withhold: modulosWithholdingTotal,
              modelo130: modulosPaymentsTotal,
              reta: 0,
              mode: "modulos",
              netOverride: modulosNetValue,
            }
          : {
              income: toPositiveNumber(autoIncome),
              expenses: autoExpensesTotal,
              withhold: toPositiveNumber(autoWithhold),
              modelo130: toPositiveNumber(autoModelo130),
              reta: retaValue,
              mode: "directa",
            }
        : null,
      personal: {
        age: Math.max(0, Math.floor(toPositiveNumber(age))),
        dependents: dependentsCount,
        dependentsUnder3: dependentsUnder3Count,
        jointType: jointType as "individual" | "marriage" | "singleParent",
        otherIncome: toPositiveNumber(otherIncome),
      },
    };
  }, [
    year,
    useCombinedScale,
    ccaaScale,
    savingsIncome,
    showWork,
    showAutonomo,
    workGrossTotal,
    workWithholdTotal,
    workSsTotal,
    workExpenses,
    autoIncome,
    autoExpensesTotal,
    autoWithhold,
    autoModelo130,
    retaValue,
    isModulos,
    modulosWithholdingTotal,
    modulosPaymentsTotal,
    modulosNetValue,
    age,
    dependentsCount,
    dependentsUnder3Count,
    jointType,
    otherIncome,
  ]);

  const result = useMemo(() => {
    if (!canCalculate) return null;
    return calculateTax(taxInput);
  }, [canCalculate, taxInput]);

  const warnings = useMemo(() => {
    const list: string[] = [];
    if (region !== "comun") {
      list.push("Régimen foral no soportado. Este estimador solo cubre régimen común (AEAT).");
    }
    if (!ccaa) {
      list.push("CCAA no seleccionada: se usa escala combinada aproximada.");
    } else if (!ccaaScale) {
      list.push("CCAA seleccionada sin tabla real: se usa escala combinada aproximada.");
    }
    if (isModulos) {
      list.push("Módulo seleccionado: el rendimiento se estima por parámetros, no por ingresos y gastos reales.");
      const totalIncome = toPositiveNumber(modulosIncomeTotal);
      const invoiceIncome = toPositiveNumber(modulosInvoiceTotal);
      if (totalIncome > 150000) {
        list.push("Aviso: ingresos totales superiores a 150.000 EUR pueden excluir de módulos.");
      }
      if (invoiceIncome > 75000) {
        list.push("Aviso: ingresos a empresas/profesionales superiores a 75.000 EUR pueden excluir de módulos.");
      }
    }
    if (includeOffice || includeMeals) {
      list.push("Helpers aplicados: revisa que los importes sean correctos y justificables.");
    }
    if (result?.warnings?.length) {
      list.push(...result.warnings);
    }
    return list;
  }, [region, ccaa, ccaaScale, includeOffice, includeMeals, isModulos, modulosIncomeTotal, modulosInvoiceTotal, result]);

  function addOtherPayer() {
    setOtherPayers((prev) => [...prev, { id: createId(), gross: "", withhold: "", ss: "" }]);
  }

  function updateOtherPayer(id: string, field: keyof Omit<OtherPayer, "id">, value: string) {
    setOtherPayers((prev) => prev.map((payer) => (payer.id === id ? { ...payer, [field]: value } : payer)));
  }

  function removeOtherPayer(id: string) {
    setOtherPayers((prev) => prev.filter((payer) => payer.id !== id));
  }

  function handleModulosActivityChange(value: string) {
    setModulosActivityQuery(value);
    const iae = value.split(" - ")[0]?.trim();
    if (modulosActivities.some((activity) => activity.iae === iae)) {
      setModulosActivityIae(iae);
    } else {
      setModulosActivityIae("");
    }
  }

  function validateStep(current: number) {
    if (current === 1) {
      if (showWork && workGrossTotal <= 0) {
        return "Introduce el salario bruto anual para cuenta ajena.";
      }
      if (showAutonomo) {
        if (autonomoMode === "directa" && toPositiveNumber(autoIncome) <= 0) {
          return "Introduce los ingresos anuales de autónomo.";
        }
        if (autonomoMode === "modulos") {
          if (modulosMode === "simple" && toPositiveNumber(modulosNetAnnual) <= 0) {
            return "Introduce el rendimiento neto anual para módulos.";
          }
          if (modulosMode === "asistido" && !modulosActivity) {
            return "Selecciona una actividad IAE para el modo asistido.";
          }
        }
      }
    }
    if (current === 2) {
      if (toPositiveNumber(age) <= 0) {
        return "Introduce una edad válida.";
      }
    }
    return null;
  }

  function goNext() {
    const message = validateStep(step);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  }

  function goBack() {
    setError(null);
    setStep((prev) => Math.max(prev - 1, 0));
  }

  const nextLabel = step === steps.length - 2 ? "Ver resultado" : "Siguiente";
  const progress = Math.round((step / (steps.length - 1)) * 100);
  const autonomoLabel = autonomoMode === "modulos" ? "módulos" : "directa";
  const situationLabel =
    situation === "employee"
      ? "Cuenta ajena"
      : situation === "autonomo"
        ? `Autónomo (${autonomoLabel})`
        : `Pluriactividad (${autonomoLabel})`;

  return (
    <div className="grid gap-5 sm:gap-6 xl:grid-cols-[220px_minmax(0,1fr)_340px] items-start">
      <nav className="order-1 min-w-0 xl:order-none">
        <div className="rounded-[4px] border border-[#E4E6EA] bg-white">
          <div className="flex items-center justify-between border-b border-[#E4E6EA] px-4 py-3">
            <p className={eyebrow}>Pasos</p>
            <span className="text-xs font-semibold tabular-nums text-[#63666D]">{progress}%</span>
          </div>
          <ul className="divide-y divide-[#E4E6EA]">
            {steps.map((s, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-[#F5F6F8]" : "hover:bg-[#F5F6F8]"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className={`flex h-7 w-7 flex-none items-center justify-center border text-[11px] font-semibold transition-colors ${
                      isActive
                        ? "border-[#101014] bg-[#101014] text-white"
                        : isDone
                          ? "border-[#101014] text-[#101014]"
                          : "border-[#E4E6EA] text-[#63666D]"
                    }`}>
                      {isDone ? (
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 10 4 4 8-8" />
                        </svg>
                      ) : s.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm font-medium ${isActive ? "text-[#101014]" : "text-[#3D4046]"}`}>{s.title}</p>
                      <p className="truncate text-xs text-[#63666D]">{s.summary}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[#63666D]">Sin registro. Datos calculados en tu navegador.</p>
      </nav>

      <div className="order-2 min-w-0 xl:order-none">
        <div className="rounded-[4px] border border-[#E4E6EA] bg-white">
          {/* Cabecera del panel con progreso */}
          <div className="border-b border-[#E4E6EA]">
            <div className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <p className={eyebrow}>Paso {steps[step].id} de {steps.length}</p>
                <p className="mt-1 truncate text-base font-semibold tracking-tight text-[#101014]">{steps[step].title}</p>
              </div>
              <span className="flex-none text-xs font-semibold tabular-nums text-[#63666D]">{progress}%</span>
            </div>
            <div aria-hidden className="h-0.5 w-full bg-[#E4E6EA]">
              <div className="h-full bg-brand-600 transition-[width] duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            <div className="space-y-6">
            {step === 0 && (
            <div className="space-y-6">
              <StepHeader
                stepId="A"
                title="Situación"
                description="Define tu escenario fiscal y la residencia para orientar el cálculo."
                icon={Icons.user}
              />
              <fieldset className="grid gap-3 xl:grid-cols-3">
                <RadioCard
                  name="situation"
                  value="employee"
                  checked={situation === "employee"}
                  onChange={() => setSituation("employee")}
                  title="Cuenta ajena"
                  description="Solo nómina y retenciones."
                  icon={Icons.briefcase}
                />
                <RadioCard
                  name="situation"
                  value="autonomo"
                  checked={situation === "autonomo"}
                  onChange={() => setSituation("autonomo")}
                  title="Autónomo"
                  description="Directa o módulos."
                  icon={Icons.bolt}
                />
                <RadioCard
                  name="situation"
                  value="pluri"
                  checked={situation === "pluri"}
                  onChange={() => setSituation("pluri")}
                  title="Pluriactividad"
                  description="Combina nómina y actividad."
                  icon={Icons.users}
                />
              </fieldset>

              <div className="grid gap-4 xl:grid-cols-2">
                <SelectField
                  id="tax-year"
                  label="Año fiscal"
                  value={String(year)}
                  onChange={(value) => setYear(Number(value) as TaxYear)}
                  options={[
                    { value: "2024", label: "2024" },
                    { value: "2025", label: "2025" },
                  ]}
                />
                <SelectField
                  id="region"
                  label="Residencia fiscal"
                  value={region}
                  onChange={setRegion}
                  options={[
                    { value: "comun", label: "Régimen común (AEAT)" },
                    { value: "foral", label: "País Vasco / Navarra (no soportado)" },
                  ]}
                />
              </div>

              <SelectField id="ccaa" label="CCAA (opcional)" value={ccaa} onChange={setCcaa} options={ccaaOptions} />

              {region !== "comun" ? (
                <div className="border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
                  Régimen foral no soportado. La herramienta está preparada solo para régimen común.
                </div>
              ) : null}
            </div>
          )}
            {step === 1 && (
            <div className="space-y-6">
              <StepHeader
                stepId="B"
                title="Ingresos y retenciones"
                description="Completa los importes anuales. Si un campo no aplica, déjalo en blanco."
                icon={Icons.wallet}
              />

              <div className={`grid gap-4 ${showWork && showAutonomo ? "xl:grid-cols-2" : ""}`}>
                {showWork ? (
                  <div className={panelCard}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge>{Icons.briefcase}</IconBadge>
                      <div>
                        <h5 className="text-base font-semibold tracking-tight text-[#101014]">Cuenta ajena</h5>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#63666D]">Incluye nómina principal y otros pagadores.</p>
                      </div>
                    </div>
                    <span className={eyebrow}>Nómina</span>
                  </div>

                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      <NumberField id="work-gross" label="Salario bruto anual" value={workGross} onChange={setWorkGross} suffix="EUR" />
                      <NumberField id="work-withhold" label="Retenciones IRPF (total anual)" value={workWithhold} onChange={setWorkWithhold} suffix="EUR" />
                      <NumberField id="work-ss" label="Cotizaciones SS trabajador" value={workSs} onChange={setWorkSs} suffix="EUR" />
                      <NumberField
                        id="work-expenses"
                        label="Otros gastos deducibles"
                        value={workExpenses}
                        onChange={setWorkExpenses}
                        placeholder={String(rules.defaultWorkExpense)}
                        help="Si lo dejas vacío, se usan 2000 EUR por defecto."
                        suffix="EUR"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-[#101014]">Otros pagadores (opcional)</p>
                        <Button variant="ghost" size="sm" onClick={addOtherPayer}>
                          {Icons.plus}
                          Agregar pagador
                        </Button>
                      </div>
                      {otherPayers.length === 0 ? (
                        <p className="text-xs leading-relaxed text-[#63666D]">
                        Usa esta sección si tuviste más de un pagador durante el año.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {otherPayers.map((payer, index) => (
                            <div key={payer.id} className="grid gap-3 xl:grid-cols-[1fr_1fr_1fr_auto] items-end">
                              <NumberField
                                id={`payer-${payer.id}-gross`}
                                label={`Pagador ${index + 2} - bruto`}
                                value={payer.gross}
                                onChange={(value) => updateOtherPayer(payer.id, "gross", value)}
                                suffix="EUR"
                              />
                              <NumberField
                                id={`payer-${payer.id}-withhold`}
                                label="Retenciones"
                                value={payer.withhold}
                                onChange={(value) => updateOtherPayer(payer.id, "withhold", value)}
                                suffix="EUR"
                              />
                              <NumberField
                                id={`payer-${payer.id}-ss`}
                                label="SS trabajador"
                                value={payer.ss}
                                onChange={(value) => updateOtherPayer(payer.id, "ss", value)}
                                suffix="EUR"
                              />
                              <button
                                type="button"
                                onClick={() => removeOtherPayer(payer.id)}
                                className="h-10 rounded-[2px] border border-[#C9CCD3] px-3 text-xs font-medium text-[#3D4046] transition-colors hover:border-[#101014] hover:text-[#101014]"
                              >
                                Quitar
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {otherPayers.length > 0 ? (
                      <div className={`mt-4 ${mutedBlock}`}>
                        Totales extras: {formatCurrency(otherTotals.gross)} bruto, {formatCurrency(otherTotals.withhold)} retenciones, {formatCurrency(otherTotals.ss)} SS.
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {showAutonomo ? (
                  <div className={panelCard}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge>{Icons.bolt}</IconBadge>
                      <div>
                        <h5 className="text-base font-semibold tracking-tight text-[#101014]">Autónomo</h5>
                        <p className="mt-0.5 text-xs leading-relaxed text-[#63666D]">Selecciona si tributas en estimación directa o por módulos.</p>
                      </div>
                    </div>
                    <span className={eyebrow}>Actividad</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setAutonomoMode("directa")}
                      className={`${chipBase} ${autonomoMode === "directa" ? chipOn : chipOff}`}
                    >
                      Estimación directa
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAutonomoMode("modulos");
                        setIncludeOffice(false);
                        setIncludeMeals(false);
                      }}
                      className={`${chipBase} ${autonomoMode === "modulos" ? chipOn : chipOff}`}
                    >
                      Módulos (estimación objetiva)
                    </button>
                  </div>

                  {autonomoMode === "directa" ? (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 xl:grid-cols-2">
                        <NumberField id="auto-income" label="Ingresos íntegros (sin IVA)" value={autoIncome} onChange={setAutoIncome} suffix="EUR" />
                        <NumberField
                          id="auto-expenses"
                          label="Gastos deducibles (total anual)"
                          value={autoExpenses}
                          onChange={setAutoExpenses}
                          suffix="EUR"
                          help="Incluye gastos afectos y justificados. Helpers se suman en el paso D."
                        />
                        <NumberField id="auto-withhold" label="Retenciones en facturas (IRPF)" value={autoWithhold} onChange={setAutoWithhold} suffix="EUR" />
                        <NumberField id="auto-modelo130" label="Pagos fraccionados Modelo 130" value={autoModelo130} onChange={setAutoModelo130} suffix="EUR" />
                      </div>

                      <div className="grid gap-3 xl:grid-cols-2">
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-[#101014]">Cuota RETA</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setRetaMode("annual")}
                              className={`${chipBase} ${retaMode === "annual" ? chipOn : chipOff}`}
                            >
                              Total anual
                            </button>
                            <button
                              type="button"
                              onClick={() => setRetaMode("monthly")}
                              className={`${chipBase} ${retaMode === "monthly" ? chipOn : chipOff}`}
                            >
                              Estimar con cuota mensual
                            </button>
                          </div>
                        </div>
                        {retaMode === "annual" ? (
                          <NumberField id="auto-reta-annual" label="Total anual pagado" value={retaAnnual} onChange={setRetaAnnual} suffix="EUR" />
                        ) : (
                          <NumberField
                            id="auto-reta-monthly"
                            label="Cuota mensual estimada"
                            value={retaMonthly}
                            onChange={setRetaMonthly}
                            suffix="EUR"
                            help="Se calcula anual = mensual x 12. Consulta la tabla oficial si lo necesitas."
                          />
                        )}
                      </div>

                      <div className={noteBlock}>
                        Gastos totales con helpers aplicados: {formatCurrency(autoExpensesTotal)}.
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className={noteBlock}>
                        En módulos, el beneficio se calcula por parámetros objetivos. El 1% en factura es una retención a cuenta, no el impuesto final.
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        <SelectField
                          id="modulos-year"
                          label="Año fiscal (módulos)"
                          value={String(modulosYear)}
                          onChange={(value) => setModulosYear(Number(value) as ModulosYear)}
                          options={[{ value: "2025", label: "2025" }]}
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-[#101014]">Modo de entrada</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setModulosMode("simple")}
                              className={`${chipBase} ${modulosMode === "simple" ? chipOn : chipOff}`}
                            >
                              Simple (recomendado)
                            </button>
                            <button
                              type="button"
                              onClick={() => setModulosMode("asistido")}
                              className={`${chipBase} ${modulosMode === "asistido" ? chipOn : chipOff}`}
                            >
                              Asistido
                            </button>
                          </div>
                          <p className={fieldHelp}>El modo simple usa tu rendimiento anual del Modelo 131.</p>
                        </div>
                      </div>

                      {modulosMode === "simple" ? (
                        <div className="space-y-4">
                          <div className="grid gap-4 xl:grid-cols-2">
                            <NumberField
                              id="modulos-net-annual"
                              label="Rendimiento neto anual a efectos de pago fraccionado"
                              value={modulosNetAnnual}
                              onChange={setModulosNetAnnual}
                              suffix="EUR"
                            />
                            <NumberField
                              id="modulos-days"
                              label="Días de actividad en el año"
                              value={modulosDays}
                              onChange={setModulosDays}
                              step="1"
                            />
                          </div>
                          <Toggle
                            label="El rendimiento ya está prorrateado por días"
                            description="Si es así, no se prorratea de nuevo."
                            checked={modulosNetProrated}
                            onChange={() => setModulosNetProrated((prev) => !prev)}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <TextField
                            id="modulos-activity"
                            label="Buscar actividad (IAE + nombre)"
                            value={modulosActivityQuery}
                            onChange={handleModulosActivityChange}
                            listId="modulos-activity-list"
                            placeholder="Ej: 659.4 - Quioscos"
                            help="Selecciona un epígrafe para desplegar los módulos."
                          />
                          <datalist id="modulos-activity-list">
                            {modulosActivityOptions.map((option) => (
                              <option key={option} value={option} />
                            ))}
                          </datalist>

                          {modulosActivity ? (
                            <div className="space-y-4">
                              <div className="grid gap-4 xl:grid-cols-2">
                                {modulosActivity.modules.map((module) => (
                                  <NumberField
                                    key={module.key}
                                    id={`modulo-${module.key}`}
                                    label={module.label}
                                    value={modulosModuleValues[module.key] ?? ""}
                                    onChange={(value) => setModulosModuleValues((prev) => ({ ...prev, [module.key]: value }))}
                                    suffix={module.unit}
                                    step="0.01"
                                  />
                                ))}
                              </div>

                              {modulosActivity.specialIndices?.length ? (
                                <div className="grid gap-4 xl:grid-cols-2">
                                  {modulosActivity.specialIndices.map((index) => (
                                    <SelectField
                                      key={index.key}
                                      id={`indice-${index.key}`}
                                      label={index.label}
                                      value={modulosIndexValues[index.key] ?? String(index.options[0]?.multiplier ?? 1)}
                                      onChange={(value) => setModulosIndexValues((prev) => ({ ...prev, [index.key]: value }))}
                                      options={index.options.map((option) => ({
                                        value: String(option.multiplier),
                                        label: `${option.label} (${formatPercent(option.multiplier)})`,
                                      }))}
                                    />
                                  ))}
                                </div>
                              ) : null}

                              <div className="grid gap-4 xl:grid-cols-2">
                                <NumberField
                                  id="modulos-minorations"
                                  label="Minoraciones por incentivos (opcional)"
                                  value={modulosMinorations}
                                  onChange={setModulosMinorations}
                                  suffix="EUR"
                                />
                                <NumberField
                                  id="modulos-amortizations"
                                  label="Amortizaciones deducibles (opcional)"
                                  value={modulosAmortizations}
                                  onChange={setModulosAmortizations}
                                  suffix="EUR"
                                />
                              </div>

                              <div className="grid gap-4 xl:grid-cols-2">
                                <NumberField
                                  id="modulos-days-assisted"
                                  label="Días de actividad en el año"
                                  value={modulosDays}
                                  onChange={setModulosDays}
                                  step="1"
                                />
                                <NumberField
                                  id="modulos-employee-count"
                                  label="Personas asalariadas (para estimar pagos 131)"
                                  value={modulosEmployeeCount}
                                  onChange={setModulosEmployeeCount}
                                  step="1"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className={mutedBlock}>
                              Selecciona una actividad para mostrar los módulos. El listado es parcial y ampliable en el dataset.
                            </div>
                          )}
                        </div>
                      )}

                      <div className="rounded-[4px] border border-[#E4E6EA] bg-white p-4">
                        <div className="flex items-center gap-2">
                          <span className={eyebrow}>Pagos a cuenta</span>
                        </div>
                        <div className="mt-3 grid gap-4 xl:grid-cols-2">
                          <NumberField
                            id="modulos-payments"
                            label="Pagos Modelo 131 ingresados (opcional)"
                            value={modulosPayments131}
                            onChange={setModulosPayments131}
                            suffix="EUR"
                            help="Si lo dejas vacío, se estiman según el rendimiento."
                          />
                          <NumberField
                            id="modulos-retentions"
                            label="Retenciones IRPF soportadas (opcional)"
                            value={modulosRetentions}
                            onChange={setModulosRetentions}
                            suffix="EUR"
                          />
                          {modulosMode === "simple" ? (
                            <NumberField
                              id="modulos-employee-count-simple"
                              label="Personas asalariadas (para estimar pagos 131)"
                              value={modulosEmployeeCount}
                              onChange={setModulosEmployeeCount}
                              step="1"
                            />
                          ) : null}
                        </div>

                        <div className="mt-3">
                          <Toggle
                            label="Mi actividad aplica retención del 1% en módulos"
                            description="Solo algunas actividades empresariales."
                            checked={modulosWithholdingApplies}
                            onChange={() => setModulosWithholdingApplies((prev) => !prev)}
                          />
                        </div>

                        <div className="mt-3 grid gap-4 xl:grid-cols-2">
                          <TextField
                            id="modulos-withholding-search"
                            label="Buscar actividad con retención 1% (opcional)"
                            value={modulosWithholdingSearch}
                            onChange={setModulosWithholdingSearch}
                            listId="modulos-withholding-list"
                            placeholder="IAE o actividad"
                          />
                          {modulosWithholdingApplies ? (
                            <NumberField
                              id="modulos-withholding-base"
                              label="Base facturada sujeta a retención 1%"
                              value={modulosWithholdingBase}
                              onChange={setModulosWithholdingBase}
                              suffix="EUR"
                            />
                          ) : null}
                        </div>
                        <datalist id="modulos-withholding-list">
                          {modulosWithholdingOptions.map((option) => (
                            <option key={option} value={option} />
                          ))}
                        </datalist>

                        {modulosWithholdingMatches.length > 0 ? (
                          <div className={`mt-3 ${mutedBlock}`}>
                            Coincidencias:{" "}
                            {modulosWithholdingMatches.map((item) => `${item.iaeGroupOrEpigrafe} ${item.name}`).join(" | ")}
                          </div>
                        ) : null}
                        {modulosActivityHasWithholding ? (
                          <div className={`mt-3 ${noteBlock}`}>
                            Esta actividad aparece en la lista de retención 1%. Activa la retención si aplica a tu facturación.
                          </div>
                        ) : null}
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        <NumberField
                          id="modulos-income-total"
                          label="Ingresos totales anuales (opcional)"
                          value={modulosIncomeTotal}
                          onChange={setModulosIncomeTotal}
                          suffix="EUR"
                        />
                        <NumberField
                          id="modulos-invoice-total"
                          label="Ingresos facturados a empresas/profesionales (opcional)"
                          value={modulosInvoiceTotal}
                          onChange={setModulosInvoiceTotal}
                          suffix="EUR"
                        />
                      </div>

                      <div className={noteBlock}>
                        Rendimiento estimado: {formatCurrency(modulosNetValue)}. Pagos 131 estimados: {formatCurrency(modulosPaymentsManualProvided ? modulosPaymentsManual : modulosPaymentsEstimate)}.
                      </div>
                    </div>
                  )}
                  </div>
                ) : null}
              </div>

              <div className={panelCard}>
                <div className="flex items-start gap-3">
                  <IconBadge>{Icons.banknote}</IconBadge>
                  <div>
                    <h5 className="text-base font-semibold tracking-tight text-[#101014]">Rentas del ahorro (opcional)</h5>
                    <p className="mt-0.5 text-xs leading-relaxed text-[#63666D]">Intereses, dividendos, fondos o plusvalías.</p>
                  </div>
                </div>
                <div className="mt-3">
                  <NumberField id="savings" label="Base del ahorro" value={savingsIncome} onChange={setSavingsIncome} suffix="EUR" />
                </div>
              </div>
            </div>
          )}
            {step === 2 && (
            <div className="space-y-6">
              <StepHeader
                stepId="C"
                title="Familia y situación personal"
                description="Datos básicos para mínimo personal y reducciones."
                icon={Icons.users}
              />

              <div className="grid gap-4 xl:grid-cols-2">
                <NumberField id="age" label="Edad" value={age} onChange={setAge} step="1" suffix="años" />
                <SelectField
                  id="joint"
                  label="Tributación"
                  value={jointType}
                  onChange={setJointType}
                  options={[
                    { value: "individual", label: "Individual" },
                    { value: "marriage", label: "Conjunta (matrimonio)" },
                    { value: "singleParent", label: "Conjunta (monoparental)" },
                  ]}
                />
                <NumberField id="dependents" label="Número de descendientes (0-4)" value={dependents} onChange={setDependents} step="1" />
                <NumberField
                  id="dependents-under3"
                  label="Descendientes menores de 3 años"
                  value={dependentsUnder3}
                  onChange={setDependentsUnder3}
                  step="1"
                />
              </div>

              <NumberField
                id="other-income"
                label="Otras rentas no trabajo (estimación)"
                value={otherIncome}
                onChange={setOtherIncome}
                suffix="EUR"
                help="Solo se usa para validar reducción por rendimientos del trabajo."
              />
            </div>
          )}
            {step === 3 && (
            <div className="space-y-6">
              <StepHeader
                stepId="D"
                title="Gastos helper (opcional)"
                description="Helpers rápidos para gastos deducibles."
                icon={Icons.tools}
              />

              {!showAutonomo ? (
                <div className="border border-[#E4E6EA] bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
                  Los helpers aplican solo a autónomo. Puedes avanzar sin completar esta sección.
                </div>
              ) : null}

              {isModulos ? (
                <div className="border border-[#E4E6EA] bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
                  Los helpers no aplican al régimen de módulos. Puedes continuar al siguiente paso.
                </div>
              ) : null}

              {showAutonomo && !isModulos ? (
                <>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className={panelCard}>
                      <div className="flex items-start gap-3">
                        <IconBadge>{Icons.home}</IconBadge>
                        <div>
                          <h5 className="text-base font-semibold tracking-tight text-[#101014]">Oficina en casa</h5>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#63666D]">
                            Deducible = suministros x (m2 afectos / m2 vivienda) x 30%.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-3 xl:grid-cols-2">
                        <NumberField id="office-area" label="m2 afectos" value={officeArea} onChange={setOfficeArea} step="0.1" />
                        <NumberField id="home-area" label="m2 vivienda" value={homeArea} onChange={setHomeArea} step="0.1" />
                        <NumberField
                          id="home-supplies"
                          label="Gasto anual suministros"
                          value={homeSupplies}
                          onChange={setHomeSupplies}
                          suffix="EUR"
                        />
                      </div>
                      <div className={`mt-3 ${mutedBlock}`}>
                        Deducible estimado: {formatCurrency(officeDeduction)}.
                      </div>
                      <div className="mt-3">
                        <Toggle
                          label="Incluir oficina en gastos deducibles"
                          description="Se suma al total de gastos de autónomo."
                          checked={includeOffice}
                          onChange={() => setIncludeOffice((prev) => !prev)}
                        />
                      </div>
                    </div>

                    <div className={panelCard}>
                      <div className="flex items-start gap-3">
                        <IconBadge>{Icons.meal}</IconBadge>
                        <div>
                          <h5 className="text-base font-semibold tracking-tight text-[#101014]">Manutención (máximos)</h5>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#63666D]">
                            Calcula el límite deducible según días y pernocta.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-3 xl:grid-cols-2">
                        <NumberField
                          id="meals-spain-no"
                          label="Días sin pernocta (España)"
                          value={mealsSpainNoOvernight}
                          onChange={setMealsSpainNoOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-spain-yes"
                          label="Días con pernocta (España)"
                          value={mealsSpainOvernight}
                          onChange={setMealsSpainOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-abroad-no"
                          label="Días sin pernocta (Extranjero)"
                          value={mealsAbroadNoOvernight}
                          onChange={setMealsAbroadNoOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-abroad-yes"
                          label="Días con pernocta (Extranjero)"
                          value={mealsAbroadOvernight}
                          onChange={setMealsAbroadOvernight}
                          step="1"
                        />
                      </div>
                      <div className={`mt-3 ${mutedBlock}`}>
                        Límite deducible: {formatCurrency(mealsDeduction)}.
                      </div>
                      <div className="mt-3">
                        <Toggle
                          label="Incluir manutención en gastos deducibles"
                          description="Solo si cumple requisitos de factura y medio de pago."
                          checked={includeMeals}
                          onChange={() => setIncludeMeals((prev) => !prev)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={noteBlock}>
                    Total helpers aplicados: {formatCurrency(helpersTotal)}. Gastos totales de autónomo: {formatCurrency(autoExpensesTotal)}.
                  </div>
                </>
              ) : null}
            </div>
          )}
            {step === 4 && (
            <div className="space-y-6">
              <StepHeader
                stepId="E"
                title="Resultado"
                description="Estimación orientativa basada en los datos introducidos."
                icon={Icons.chart}
              />

              {!canCalculate ? (
                <div className="border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
                  Completa los datos de ingresos para obtener la estimación. El cálculo está bloqueado si seleccionas régimen foral.
                </div>
              ) : null}

              {canCalculate && result ? (
                <div className="space-y-6">
                  {/* Resultado principal */}
                  <div className="border border-[#E4E6EA] bg-[#F5F6F8] p-6 sm:p-8">
                    <p className={eyebrow}>Cuota diferencial</p>
                    <div className="mt-4 flex flex-wrap items-baseline gap-4">
                      <span className="text-4xl sm:text-5xl font-semibold tabular-nums leading-none tracking-tight text-[#101014]">
                        {formatCurrency(Math.abs(result.cuotaDiferencial))}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                        result.cuotaDiferencial >= 0
                          ? "border border-[#101014] text-[#101014]"
                          : "border border-brand-600 text-brand-600"
                      }`}>
                        {result.cuotaDiferencial >= 0 ? "A pagar" : "A devolver"}
                      </span>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-[#63666D]">
                      Cuota líquida ({formatCurrency(result.cuotaLiquida)}) − retenciones y pagos ({formatCurrency(result.totalWithheld)})
                    </p>
                  </div>

                  {/* Desglose en cuatro bloques */}
                  <div className="grid border-t border-[#E4E6EA] sm:grid-cols-2">
                    <div className="border-b border-[#E4E6EA] py-5 sm:border-r sm:pr-6">
                      <p className={eyebrow}>Base general</p>
                      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[#101014]">{formatCurrency(result.baseGeneralAfterJoint)}</p>
                      <p className="mt-1 text-xs text-[#63666D]">Cuota: {formatCurrency(result.quotaGeneral)}</p>
                    </div>
                    <div className="border-b border-[#E4E6EA] py-5 sm:pl-6">
                      <p className={eyebrow}>Base ahorro</p>
                      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[#101014]">{formatCurrency(result.baseSavingsAfterJoint)}</p>
                      <p className="mt-1 text-xs text-[#63666D]">Cuota: {formatCurrency(result.quotaSavings)}</p>
                    </div>
                    <div className="border-b border-[#E4E6EA] py-5 sm:border-r sm:pr-6">
                      <p className={eyebrow}>Deducciones</p>
                      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[#101014]">{formatCurrency(result.deduccion340)}</p>
                      <p className="mt-1 text-xs text-[#63666D]">Cuota íntegra: {formatCurrency(result.cuotaIntegra)}</p>
                    </div>
                    <div className="border-b border-[#E4E6EA] py-5 sm:pl-6">
                      <p className={eyebrow}>Pagos a cuenta</p>
                      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-[#101014]">{formatCurrency(result.totalWithheld)}</p>
                      <p className="mt-1 text-xs text-[#63666D]">Retenciones + fraccionados</p>
                    </div>
                  </div>

                  {/* Detalle del calculo */}
                  <div className="divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
                    <details className="group">
                      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-3 py-4 text-sm font-medium text-[#101014] [&::-webkit-details-marker]:hidden">
                        Detalle del cálculo
                        <span aria-hidden className="flex-none text-[#101014]">
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <path d="M10 4v12" className="group-open:hidden" />
                            <path d="M4 10h12" />
                          </svg>
                        </span>
                      </summary>
                      <div className="divide-y divide-[#E4E6EA] pb-4">
                        <SummaryRow label="Rendimiento neto trabajo" value={formatCurrency(result.workNet)} />
                        <SummaryRow label="Reducción trabajo" value={formatCurrency(result.workReduction)} />
                        <SummaryRow label="Rendimiento actividad" value={formatCurrency(result.autonomoNet)} />
                        <SummaryRow label="Gasto difícil justificación" value={formatCurrency(result.difficultJustification)} />
                        <SummaryRow label="Reducción conjunta aplicada" value={formatCurrency(result.jointReductionApplied)} />
                        <SummaryRow label="Mínimo personal aplicado" value={formatCurrency(result.personalMinimumApplied)} />
                      </div>
                    </details>

                    <details className="group">
                      <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-3 py-4 text-sm font-medium text-[#101014] [&::-webkit-details-marker]:hidden">
                        Desglose por tramos
                        <span aria-hidden className="flex-none text-[#101014]">
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                            <path d="M10 4v12" className="group-open:hidden" />
                            <path d="M4 10h12" />
                          </svg>
                        </span>
                      </summary>
                      <div className="space-y-6 pb-5">
                        <div>
                          <p className={eyebrow}>Base general</p>
                          <div className="mt-2 divide-y divide-[#E4E6EA]">
                            {result.generalScale.breakdown.map((item, index) => (
                              <div key={`general-${index}`} className="flex items-center justify-between gap-3 py-2 text-xs">
                                <span className="tabular-nums text-[#63666D]">
                                  {formatNumber(item.from)} — {item.to ? formatNumber(item.to) : "∞"}
                                </span>
                                <span className="tabular-nums text-[#63666D]">{formatPercent(item.rate)}</span>
                                <span className="font-semibold tabular-nums text-[#101014]">{formatCurrency(item.tax)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className={eyebrow}>Base ahorro</p>
                          <div className="mt-2 divide-y divide-[#E4E6EA]">
                            {result.savingsScale.breakdown.map((item, index) => (
                              <div key={`savings-${index}`} className="flex items-center justify-between gap-3 py-2 text-xs">
                                <span className="tabular-nums text-[#63666D]">
                                  {formatNumber(item.from)} — {item.to ? formatNumber(item.to) : "∞"}
                                </span>
                                <span className="tabular-nums text-[#63666D]">{formatPercent(item.rate)}</span>
                                <span className="font-semibold tabular-nums text-[#101014]">{formatCurrency(item.tax)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>

                  <p className="text-xs leading-relaxed text-[#63666D]">
                    Estimación orientativa. No sustituye asesoramiento profesional. Normativa cambia por año y CCAA.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {error ? (
          <div role="alert" className="border-l-2 border-[#101014] bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#101014]">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[#E4E6EA] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="ghost" onClick={goBack} disabled={step === 0} className="w-full sm:w-auto">
            ← Anterior
          </Button>
          {step < steps.length - 1 ? (
            <Button variant="shine" onClick={goNext} className="w-full sm:w-auto">
              {nextLabel} →
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  </div>

      <aside className="order-3 min-w-0 space-y-4 lg:sticky lg:top-24 xl:order-none">
        {/* Resumen */}
        <div className="rounded-[4px] border border-[#E4E6EA] bg-white">
          <div className="border-b border-[#E4E6EA] px-4 py-3">
            <p className={eyebrow}>Resumen</p>
          </div>
          <div className="divide-y divide-[#E4E6EA] px-4 py-1">
            <SummaryRow label="Situación" value={situationLabel} />
            <SummaryRow label="Año fiscal" value={String(year)} />
            <SummaryRow label="Residencia" value={region === "comun" ? "Común (AEAT)" : "Foral"} />
            <SummaryRow label="Paso" value={`${steps[step].id} / ${steps.length - 1}`} />
            {result && (
              <>
                <SummaryRow label="Base general" value={formatCurrency(result.baseGeneralAfterJoint)} />
                <SummaryRow label="Cuota diferencial" value={formatCurrency(result.cuotaDiferencial)} />
              </>
            )}
          </div>
        </div>

        {/* Avisos */}
        <div className="rounded-[4px] border border-[#E4E6EA] bg-white">
          <div className="border-b border-[#E4E6EA] px-4 py-3">
            <p className={eyebrow}>Avisos</p>
          </div>
          <ul className="divide-y divide-[#E4E6EA] px-4">
            {warnings.length === 0 ? (
              <li className="py-3 text-xs text-[#63666D]">Sin avisos relevantes.</li>
            ) : (
              warnings.map((warning, index) => (
                <li key={`${warning}-${index}`} className="flex items-start gap-2.5 py-3 text-xs leading-relaxed text-[#3D4046]">
                  <span aria-hidden className="mt-1.5 h-px w-3 flex-none bg-brand-600" />
                  <span>{warning}</span>
                </li>
              ))
            )}
          </ul>
          <div className="border-t border-[#E4E6EA] px-4 py-3 text-xs leading-relaxed text-[#63666D]">
            Cálculo en tu navegador. Sin almacenamiento de datos.
          </div>
        </div>
      </aside>
    </div>
  );
}



