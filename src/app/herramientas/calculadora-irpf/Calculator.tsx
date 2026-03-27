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
  { id: "A", title: "Situacion", summary: "Escenario y residencia fiscal" },
  { id: "B", title: "Ingresos", summary: "Rentas y retenciones" },
  { id: "C", title: "Personal", summary: "Familia y situacion" },
  { id: "D", title: "Helpers", summary: "Gastos opcionales" },
  { id: "E", title: "Resultado", summary: "Estimacion y desglose" },
] as const;

const ccaaOptions = [
  { value: "", label: "Sin seleccionar (escala combinada)" },
  { value: "andalucia", label: "Andalucia" },
  { value: "aragon", label: "Aragon" },
  { value: "asturias", label: "Asturias" },
  { value: "baleares", label: "Baleares" },
  { value: "canarias", label: "Canarias" },
  { value: "cantabria", label: "Cantabria" },
  { value: "castilla-la-mancha", label: "Castilla-La Mancha" },
  { value: "castilla-y-leon", label: "Castilla y Leon" },
  { value: "cataluna", label: "Cataluna" },
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
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20a8 8 0 0 1 16 0" />
    </svg>
  ),
  wallet: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M16 10h5v4h-5z" />
    </svg>
  ),
  users: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 20a6 6 0 0 1 12 0" />
      <path d="M10 20a6 6 0 0 1 12 0" />
    </svg>
  ),
  tools: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 7.5 20 3l1 1-4.5 5.5" />
      <path d="m3 21 9-9" />
      <path d="m9 9 6 6" />
    </svg>
  ),
  chart: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m7 14 4-4 3 3 5-6" />
    </svg>
  ),
  briefcase: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="12" rx="2" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <path d="M3 12h18" />
    </svg>
  ),
  bolt: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
    </svg>
  ),
  banknote: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M7 9h.01M17 15h.01" />
    </svg>
  ),
  home: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  meal: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a3 3 0 0 0 6 0V3" />
      <path d="M9 3v7" />
      <path d="M15 3h3a2 2 0 0 1 2 2v15" />
    </svg>
  ),
  list: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
  alert: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5" />
      <path d="M12 16h.01" />
    </svg>
  ),
  check: (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative flex h-10 items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/[0.07] dark:bg-white/[0.03]">
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
          className="h-full w-full bg-transparent px-3 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-500">
            {suffix}
          </span>
        ) : null}
      </div>
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{help}</p> : null}
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
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative flex h-10 items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/[0.07] dark:bg-white/[0.03]">
        <input
          id={id}
          type="text"
          inputMode={inputMode}
          value={value}
          disabled={disabled}
          list={listId}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="h-full w-full bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
      </div>
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{help}</p> : null}
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
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
        {label}
      </label>
      <div className="relative flex h-10 items-center rounded-xl border border-slate-200 bg-white transition focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-500/20 dark:border-white/[0.07] dark:bg-white/[0.03]">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-full w-full appearance-none bg-transparent px-3 pr-10 text-sm text-slate-900 focus:outline-none dark:text-slate-100 dark:[color-scheme:dark]"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{ color: "var(--select-option-color)", backgroundColor: "var(--select-option-bg)" }}
            >
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
      {help ? <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{help}</p> : null}
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
    <label className={`group relative flex cursor-pointer items-start gap-3 overflow-hidden rounded-xl border p-4 text-sm transition-all focus-within:ring-2 focus-within:ring-sky-500/25 ${
      checked
        ? "border-sky-400 bg-sky-50/70 dark:border-sky-500/50 dark:bg-sky-500/[0.08]"
        : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
    }`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg transition-colors ${
        checked ? "bg-sky-500 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
      }`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <span className={`block text-sm font-semibold ${checked ? "text-sky-700 dark:text-sky-200" : "text-slate-900 dark:text-slate-100"}`}>{title}</span>
        <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span>
      </div>
      {checked && (
        <span className="flex-none text-sky-500 dark:text-sky-400 mt-0.5">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5z" clipRule="evenodd" />
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
    <label className={`group flex cursor-pointer items-start justify-between gap-4 rounded-xl border p-4 text-sm transition focus-within:ring-2 focus-within:ring-sky-500/25 ${
      checked
        ? "border-sky-400/60 bg-sky-50/60 dark:border-sky-500/40 dark:bg-sky-500/[0.06]"
        : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/[0.07] dark:bg-white/[0.02] dark:hover:border-white/[0.12]"
    }`}>
      <span className="min-w-0 flex-1">
        <span className={`block font-semibold ${checked ? "text-sky-700 dark:text-sky-200" : "text-slate-800 dark:text-slate-100"}`}>{label}</span>
        {description ? <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</span> : null}
      </span>
      <span aria-hidden className={`relative mt-0.5 h-5 w-9 flex-none rounded-full transition-colors ${
        checked ? "bg-sky-500" : "bg-slate-200 dark:bg-white/[0.12]"
      }`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4" : "translate-x-0.5"
        }`} />
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
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="text-slate-600 dark:text-slate-300">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-slate-100">{value}</span>
    </div>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-white/[0.07] dark:text-slate-400">
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
      list.push("Regimen foral no soportado. Este estimador solo cubre regimen comun (AEAT).");
    }
    if (!ccaa) {
      list.push("CCAA no seleccionada: se usa escala combinada aproximada.");
    } else if (!ccaaScale) {
      list.push("CCAA seleccionada sin tabla real: se usa escala combinada aproximada.");
    }
    if (isModulos) {
      list.push("Modulo seleccionado: el rendimiento se estima por parametros, no por ingresos y gastos reales.");
      const totalIncome = toPositiveNumber(modulosIncomeTotal);
      const invoiceIncome = toPositiveNumber(modulosInvoiceTotal);
      if (totalIncome > 150000) {
        list.push("Aviso: ingresos totales superiores a 150.000 EUR pueden excluir de modulos.");
      }
      if (invoiceIncome > 75000) {
        list.push("Aviso: ingresos a empresas/profesionales superiores a 75.000 EUR pueden excluir de modulos.");
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
          return "Introduce los ingresos anuales de autonomo.";
        }
        if (autonomoMode === "modulos") {
          if (modulosMode === "simple" && toPositiveNumber(modulosNetAnnual) <= 0) {
            return "Introduce el rendimiento neto anual para modulos.";
          }
          if (modulosMode === "asistido" && !modulosActivity) {
            return "Selecciona una actividad IAE para el modo asistido.";
          }
        }
      }
    }
    if (current === 2) {
      if (toPositiveNumber(age) <= 0) {
        return "Introduce una edad valida.";
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
  const autonomoLabel = autonomoMode === "modulos" ? "modulos" : "directa";
  const situationLabel =
    situation === "employee"
      ? "Cuenta ajena"
      : situation === "autonomo"
        ? `Autonomo (${autonomoLabel})`
        : `Pluriactividad (${autonomoLabel})`;

  return (
    <div className="grid gap-5 sm:gap-6 xl:grid-cols-[220px_minmax(0,1fr)_340px] items-start">
      <nav className="order-1 min-w-0 xl:order-none">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Pasos</p>
            <span className="text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">{progress}%</span>
          </div>
          <ul className="py-1">
            {steps.map((s, index) => {
              const isActive = index === step;
              const isDone = index < step;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setStep(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                      isActive
                        ? "bg-sky-50 dark:bg-sky-500/[0.08]"
                        : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                    }`}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full text-[11px] font-bold transition-colors ${
                      isActive
                        ? "bg-sky-500 text-white"
                        : isDone
                          ? "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300"
                          : "bg-slate-100 text-slate-500 dark:bg-white/[0.06] dark:text-slate-400"
                    }`}>
                      {isDone ? (
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m4 10 4 4 8-8" />
                        </svg>
                      ) : s.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-semibold truncate ${isActive ? "text-sky-700 dark:text-sky-300" : "text-slate-700 dark:text-slate-300"}`}>{s.title}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{s.summary}</p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="mt-3 px-1 text-xs text-slate-400 dark:text-slate-500">Sin registro. Datos calculados en tu navegador.</p>
      </nav>

      <div className="order-2 min-w-0 xl:order-none">
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
          {/* Panel header with progress */}
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-100 dark:border-white/[0.05]">
            <div className="flex items-center gap-3 min-w-0">
              <svg viewBox="0 0 36 36" className="h-9 w-9 flex-none -rotate-90" aria-hidden>
                <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-100 dark:text-white/[0.06]" />
                <circle
                  cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="2.5"
                  strokeDasharray={`${progress} 100`} strokeLinecap="round"
                  className="text-sky-500 transition-all duration-300"
                  style={{ strokeDasharray: `${(progress / 100) * 97.4} 97.4` }}
                />
              </svg>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Paso {steps[step].id} de {steps.length}</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{steps[step].title}</p>
              </div>
            </div>
            <span className="text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400 flex-none">{progress}%</span>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            <div className="space-y-6">
            {step === 0 && (
            <div className="space-y-6">
              <StepHeader
                stepId="A"
                title="Situacion"
                description="Define tu escenario fiscal y la residencia para orientar el calculo."
                icon={Icons.user}
              />
              <fieldset className="grid gap-3 xl:grid-cols-3">
                <RadioCard
                  name="situation"
                  value="employee"
                  checked={situation === "employee"}
                  onChange={() => setSituation("employee")}
                  title="Cuenta ajena"
                  description="Solo nomina y retenciones."
                  icon={Icons.briefcase}
                />
                <RadioCard
                  name="situation"
                  value="autonomo"
                  checked={situation === "autonomo"}
                  onChange={() => setSituation("autonomo")}
                  title="Autonomo"
                  description="Directa o modulos."
                  icon={Icons.bolt}
                />
                <RadioCard
                  name="situation"
                  value="pluri"
                  checked={situation === "pluri"}
                  onChange={() => setSituation("pluri")}
                  title="Pluriactividad"
                  description="Combina nomina y actividad."
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
                    { value: "comun", label: "Regimen comun (AEAT)" },
                    { value: "foral", label: "Pais Vasco / Navarra (no soportado)" },
                  ]}
                />
              </div>

              <SelectField id="ccaa" label="CCAA (opcional)" value={ccaa} onChange={setCcaa} options={ccaaOptions} />

              {region !== "comun" ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                  Regimen foral no soportado. La herramienta esta preparada solo para regimen comun.
                </div>
              ) : null}
            </div>
          )}
            {step === 1 && (
            <div className="space-y-6">
              <StepHeader
                stepId="B"
                title="Ingresos y retenciones"
                description="Completa los importes anuales. Si un campo no aplica, dejalo en blanco."
                icon={Icons.wallet}
              />

              <div className={`grid gap-4 ${showWork && showAutonomo ? "xl:grid-cols-2" : ""}`}>
                {showWork ? (
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_-30px_rgba(14,29,74,0.45)] dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge>{Icons.briefcase}</IconBadge>
                      <div>
                        <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">Cuenta ajena</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Incluye nomina principal y otros pagadores.</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-200">Nomina</span>
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
                        help="Si lo dejas vacio, se usan 2000 EUR por defecto."
                        suffix="EUR"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Otros pagadores (opcional)</p>
                        <Button variant="ghost" size="sm" onClick={addOtherPayer}>
                          {Icons.plus}
                          Agregar pagador
                        </Button>
                      </div>
                      {otherPayers.length === 0 ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                        Usa esta seccion si tuviste mas de un pagador durante el año.
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
                                className="h-11 rounded-full border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:border-sky-300 hover:text-sky-700 dark:border-white/[0.07] dark:text-slate-300"
                              >
                                Quitar
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {otherPayers.length > 0 ? (
                      <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white/85 px-4 py-3 text-xs text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                        Totales extras: {formatCurrency(otherTotals.gross)} bruto, {formatCurrency(otherTotals.withhold)} retenciones, {formatCurrency(otherTotals.ss)} SS.
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {showAutonomo ? (
                  <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_-30px_rgba(14,29,74,0.45)] dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <IconBadge>{Icons.bolt}</IconBadge>
                      <div>
                        <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">Autonomo</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Selecciona si tributas en estimacion directa o por modulos.</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-200">Actividad</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setAutonomoMode("directa")}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        autonomoMode === "directa"
                          ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                          : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                      }`}
                    >
                      Estimacion directa
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAutonomoMode("modulos");
                        setIncludeOffice(false);
                        setIncludeMeals(false);
                      }}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                        autonomoMode === "modulos"
                          ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                          : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                      }`}
                    >
                      Modulos (estimacion objetiva)
                    </button>
                  </div>

                  {autonomoMode === "directa" ? (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-4 xl:grid-cols-2">
                        <NumberField id="auto-income" label="Ingresos integros (sin IVA)" value={autoIncome} onChange={setAutoIncome} suffix="EUR" />
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
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Cuota RETA</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setRetaMode("annual")}
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                retaMode === "annual"
                                  ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                                  : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                              }`}
                            >
                              Total anual
                            </button>
                            <button
                              type="button"
                              onClick={() => setRetaMode("monthly")}
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                retaMode === "monthly"
                                  ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                                  : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                              }`}
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

                      <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-xs text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
                        Gastos totales con helpers aplicados: {formatCurrency(autoExpensesTotal)}.
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4 space-y-4">
                      <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-xs text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
                        En modulos, el beneficio se calcula por parametros objetivos. El 1% en factura es una retencion a cuenta, no el impuesto final.
                      </div>

                      <div className="grid gap-4 xl:grid-cols-2">
                        <SelectField
                          id="modulos-year"
                          label="Año fiscal (modulos)"
                          value={String(modulosYear)}
                          onChange={(value) => setModulosYear(Number(value) as ModulosYear)}
                          options={[{ value: "2025", label: "2025" }]}
                        />
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Modo de entrada</p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setModulosMode("simple")}
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                modulosMode === "simple"
                                  ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                                  : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                              }`}
                            >
                              Simple (recomendado)
                            </button>
                            <button
                              type="button"
                              onClick={() => setModulosMode("asistido")}
                              className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                                modulosMode === "asistido"
                                  ? "border-sky-400 bg-sky-50/80 text-sky-700 dark:border-sky-400/60 dark:bg-sky-500/10 dark:text-sky-200"
                                  : "border-slate-200 bg-white/70 text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300"
                              }`}
                            >
                              Asistido
                            </button>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">El modo simple usa tu rendimiento anual del Modelo 131.</p>
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
                              label="Dias de actividad en el año"
                              value={modulosDays}
                              onChange={setModulosDays}
                              step="1"
                            />
                          </div>
                          <Toggle
                            label="El rendimiento ya esta prorrateado por dias"
                            description="Si es asi, no se prorratea de nuevo."
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
                            help="Selecciona un epigrafe para desplegar los modulos."
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
                                  label="Dias de actividad en el año"
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
                            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 px-4 py-3 text-xs text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                              Selecciona una actividad para mostrar los modulos. El listado es parcial y ampliable en el dataset.
                            </div>
                          )}
                        </div>
                      )}

                      <div className="rounded-2xl border border-slate-200 bg-white/85 p-4 shadow-[0_14px_34px_-26px_rgba(14,29,74,0.35)] dark:border-white/[0.07] dark:bg-white/[0.03]">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Pagos a cuenta</span>
                        </div>
                        <div className="mt-3 grid gap-4 xl:grid-cols-2">
                          <NumberField
                            id="modulos-payments"
                            label="Pagos Modelo 131 ingresados (opcional)"
                            value={modulosPayments131}
                            onChange={setModulosPayments131}
                            suffix="EUR"
                            help="Si lo dejas vacio, se estiman segun el rendimiento."
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
                            label="Mi actividad aplica retencion del 1% en modulos"
                            description="Solo algunas actividades empresariales."
                            checked={modulosWithholdingApplies}
                            onChange={() => setModulosWithholdingApplies((prev) => !prev)}
                          />
                        </div>

                        <div className="mt-3 grid gap-4 xl:grid-cols-2">
                          <TextField
                            id="modulos-withholding-search"
                            label="Buscar actividad con retencion 1% (opcional)"
                            value={modulosWithholdingSearch}
                            onChange={setModulosWithholdingSearch}
                            listId="modulos-withholding-list"
                            placeholder="IAE o actividad"
                          />
                          {modulosWithholdingApplies ? (
                            <NumberField
                              id="modulos-withholding-base"
                              label="Base facturada sujeta a retencion 1%"
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
                          <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                            Coincidencias:{" "}
                            {modulosWithholdingMatches.map((item) => `${item.iaeGroupOrEpigrafe} ${item.name}`).join(" | ")}
                          </div>
                        ) : null}
                        {modulosActivityHasWithholding ? (
                          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                            Esta actividad aparece en la lista de retencion 1%. Activa la retencion si aplica a tu facturacion.
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

                      <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-xs text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
                        Rendimiento estimado: {formatCurrency(modulosNetValue)}. Pagos 131 estimados: {formatCurrency(modulosPaymentsManualProvided ? modulosPaymentsManual : modulosPaymentsEstimate)}.
                      </div>
                    </div>
                  )}
                  </div>
                ) : null}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_-30px_rgba(14,29,74,0.45)] dark:border-white/[0.07] dark:bg-white/[0.02]">
                <div className="flex items-start gap-3">
                  <IconBadge>{Icons.banknote}</IconBadge>
                  <div>
                    <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">Rentas del ahorro (opcional)</h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Intereses, dividendos, fondos o plusvalias.</p>
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
                title="Familia y situacion personal"
                description="Datos basicos para minimo personal y reducciones."
                icon={Icons.users}
              />

              <div className="grid gap-4 xl:grid-cols-2">
                <NumberField id="age" label="Edad" value={age} onChange={setAge} step="1" suffix="años" />
                <SelectField
                  id="joint"
                  label="Tributacion"
                  value={jointType}
                  onChange={setJointType}
                  options={[
                    { value: "individual", label: "Individual" },
                    { value: "marriage", label: "Conjunta (matrimonio)" },
                    { value: "singleParent", label: "Conjunta (monoparental)" },
                  ]}
                />
                <NumberField id="dependents" label="Numero de descendientes (0-4)" value={dependents} onChange={setDependents} step="1" />
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
                label="Otras rentas no trabajo (estimacion)"
                value={otherIncome}
                onChange={setOtherIncome}
                suffix="EUR"
                help="Solo se usa para validar reduccion por rendimientos del trabajo."
              />
            </div>
          )}
            {step === 3 && (
            <div className="space-y-6">
              <StepHeader
                stepId="D"
                title="Gastos helper (opcional)"
                description="Helpers rapidos para gastos deducibles."
                icon={Icons.tools}
              />

              {!showAutonomo ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 p-4 text-sm text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                  Los helpers aplican solo a autonomo. Puedes avanzar sin completar esta seccion.
                </div>
              ) : null}

              {isModulos ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white/85 p-4 text-sm text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                  Los helpers no aplican al regimen de modulos. Puedes continuar al siguiente paso.
                </div>
              ) : null}

              {showAutonomo && !isModulos ? (
                <>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_-30px_rgba(14,29,74,0.45)] dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="flex items-start gap-3">
                        <IconBadge>{Icons.home}</IconBadge>
                        <div>
                          <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">Oficina en casa</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
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
                      <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                        Deducible estimado: {formatCurrency(officeDeduction)}.
                      </div>
                      <div className="mt-3">
                        <Toggle
                          label="Incluir oficina en gastos deducibles"
                          description="Se suma al total de gastos de autonomo."
                          checked={includeOffice}
                          onChange={() => setIncludeOffice((prev) => !prev)}
                        />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_16px_40px_-30px_rgba(14,29,74,0.45)] dark:border-white/[0.07] dark:bg-white/[0.02]">
                      <div className="flex items-start gap-3">
                        <IconBadge>{Icons.meal}</IconBadge>
                        <div>
                          <h5 className="text-base font-semibold text-slate-900 dark:text-slate-100">Manutencion (maximos)</h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Calcula el limite deducible segun dias y pernocta.
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 grid gap-3 xl:grid-cols-2">
                        <NumberField
                          id="meals-spain-no"
                          label="Dias sin pernocta (Espana)"
                          value={mealsSpainNoOvernight}
                          onChange={setMealsSpainNoOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-spain-yes"
                          label="Dias con pernocta (Espana)"
                          value={mealsSpainOvernight}
                          onChange={setMealsSpainOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-abroad-no"
                          label="Dias sin pernocta (Extranjero)"
                          value={mealsAbroadNoOvernight}
                          onChange={setMealsAbroadNoOvernight}
                          step="1"
                        />
                        <NumberField
                          id="meals-abroad-yes"
                          label="Dias con pernocta (Extranjero)"
                          value={mealsAbroadOvernight}
                          onChange={setMealsAbroadOvernight}
                          step="1"
                        />
                      </div>
                      <div className="mt-3 rounded-2xl border border-dashed border-slate-200 bg-white/85 px-3 py-2 text-xs text-slate-600 dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-300">
                        Limite deducible: {formatCurrency(mealsDeduction)}.
                      </div>
                      <div className="mt-3">
                        <Toggle
                          label="Incluir manutencion en gastos deducibles"
                          description="Solo si cumple requisitos de factura y medio de pago."
                          checked={includeMeals}
                          onChange={() => setIncludeMeals((prev) => !prev)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-3 text-xs text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
                    Total helpers aplicados: {formatCurrency(helpersTotal)}. Gastos totales de autonomo: {formatCurrency(autoExpensesTotal)}.
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
                description="Estimacion orientativa basada en los datos introducidos."
                icon={Icons.chart}
              />

              {!canCalculate ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
                  Completa los datos de ingresos para obtener la estimacion. El calculo esta bloqueado si seleccionas regimen foral.
                </div>
              ) : null}

              {canCalculate && result ? (
                <div className="space-y-4">
                  {/* Hero result */}
                  <div className={`overflow-hidden rounded-2xl border p-6 ${
                    result.cuotaDiferencial >= 0
                      ? "border-amber-200 bg-amber-50/60 dark:border-amber-500/30 dark:bg-amber-500/[0.06]"
                      : "border-emerald-200 bg-emerald-50/60 dark:border-emerald-500/30 dark:bg-emerald-500/[0.06]"
                  }`}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-3">
                      Cuota diferencial
                    </p>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className={`text-5xl font-black tabular-nums leading-none ${
                        result.cuotaDiferencial >= 0
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400"
                      }`}>
                        {formatCurrency(Math.abs(result.cuotaDiferencial))}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                        result.cuotaDiferencial >= 0
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                      }`}>
                        {result.cuotaDiferencial >= 0 ? "A pagar" : "A devolver"}
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                      Cuota liquida ({formatCurrency(result.cuotaLiquida)}) − retenciones y pagos ({formatCurrency(result.totalWithheld)})
                    </p>
                  </div>

                  {/* 4-cell breakdown */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Base general</p>
                      <p className="mt-1.5 text-xl font-bold tabular-nums text-slate-900 dark:text-white">{formatCurrency(result.baseGeneralAfterJoint)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Cuota: {formatCurrency(result.quotaGeneral)}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Base ahorro</p>
                      <p className="mt-1.5 text-xl font-bold tabular-nums text-slate-900 dark:text-white">{formatCurrency(result.baseSavingsAfterJoint)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Cuota: {formatCurrency(result.quotaSavings)}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Deducciones</p>
                      <p className="mt-1.5 text-xl font-bold tabular-nums text-slate-900 dark:text-white">{formatCurrency(result.deduccion340)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Cuota integra: {formatCurrency(result.cuotaIntegra)}</p>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Pagos a cuenta</p>
                      <p className="mt-1.5 text-xl font-bold tabular-nums text-slate-900 dark:text-white">{formatCurrency(result.totalWithheld)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Retenciones + fraccionados</p>
                    </div>
                  </div>

                  {/* Detail accordion */}
                  <details className="group overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
                    <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 select-none">
                      Detalle del calculo
                      <span className="text-slate-400 transition-transform group-open:rotate-180">
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 8 4 4 4-4" /></svg>
                      </span>
                    </summary>
                    <div className="border-t border-slate-100 dark:border-white/[0.05] px-4 py-3 space-y-2.5">
                      <SummaryRow label="Rendimiento neto trabajo" value={formatCurrency(result.workNet)} />
                      <SummaryRow label="Reduccion trabajo" value={formatCurrency(result.workReduction)} />
                      <SummaryRow label="Rendimiento actividad" value={formatCurrency(result.autonomoNet)} />
                      <SummaryRow label="Gasto dificil justificacion" value={formatCurrency(result.difficultJustification)} />
                      <SummaryRow label="Reduccion conjunta aplicada" value={formatCurrency(result.jointReductionApplied)} />
                      <SummaryRow label="Minimo personal aplicado" value={formatCurrency(result.personalMinimumApplied)} />
                    </div>
                  </details>

                  <details className="group overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
                    <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 select-none">
                      Desglose por tramos
                      <span className="text-slate-400 transition-transform group-open:rotate-180">
                        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 8 4 4 4-4" /></svg>
                      </span>
                    </summary>
                    <div className="border-t border-slate-100 dark:border-white/[0.05] px-4 py-3 space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Base general</p>
                        <div className="space-y-1.5">
                          {result.generalScale.breakdown.map((item, index) => (
                            <div key={`general-${index}`} className="flex items-center justify-between gap-3 text-xs">
                              <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                                {formatNumber(item.from)} — {item.to ? formatNumber(item.to) : "∞"}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">{formatPercent(item.rate)}</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200 tabular-nums">{formatCurrency(item.tax)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Base ahorro</p>
                        <div className="space-y-1.5">
                          {result.savingsScale.breakdown.map((item, index) => (
                            <div key={`savings-${index}`} className="flex items-center justify-between gap-3 text-xs">
                              <span className="text-slate-500 dark:text-slate-400 tabular-nums">
                                {formatNumber(item.from)} — {item.to ? formatNumber(item.to) : "∞"}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400">{formatPercent(item.rate)}</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200 tabular-nums">{formatCurrency(item.tax)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </details>

                  <p className="text-xs text-slate-400 dark:text-slate-500 px-1">
                    Estimacion orientativa. No sustituye asesoramiento profesional. Normativa cambia por año y CCAA.
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {error ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            {error}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.05] sm:flex-row sm:items-center sm:justify-between">
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
        {/* Summary card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Resumen</p>
          </div>
          <div className="px-4 py-3 space-y-2.5">
            <SummaryRow label="Situacion" value={situationLabel} />
            <SummaryRow label="Año fiscal" value={String(year)} />
            <SummaryRow label="Residencia" value={region === "comun" ? "Comun (AEAT)" : "Foral"} />
            <SummaryRow label="Paso" value={`${steps[step].id} / ${steps.length - 1}`} />
            {result && (
              <>
                <div className="h-px bg-slate-100 dark:bg-white/[0.05]" />
                <SummaryRow label="Base general" value={formatCurrency(result.baseGeneralAfterJoint)} />
                <SummaryRow label="Cuota diferencial" value={formatCurrency(result.cuotaDiferencial)} />
              </>
            )}
          </div>
        </div>

        {/* Warnings card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 dark:border-white/[0.05]">
            <span className={`h-1.5 w-1.5 rounded-full ${warnings.length > 0 ? "bg-amber-400" : "bg-emerald-500"}`} />
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">Avisos</p>
          </div>
          <ul className="px-4 py-3 space-y-2 text-sm">
            {warnings.length === 0 ? (
              <li className="text-slate-500 dark:text-slate-400 text-xs">Sin avisos relevantes.</li>
            ) : (
              warnings.map((warning, index) => (
                <li key={`${warning}-${index}`} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-amber-400" />
                  <span>{warning}</span>
                </li>
              ))
            )}
          </ul>
          <div className="px-4 py-3 border-t border-slate-100 dark:border-white/[0.05] text-xs text-slate-400 dark:text-slate-500">
            Calculo en tu navegador. Sin almacenamiento de datos.
          </div>
        </div>
      </aside>
    </div>
  );
}



