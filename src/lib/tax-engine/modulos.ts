import modulos2025 from "../../../data/modulos/irpf/2025.json";

export type ModulosYear = 2025;

export type ModulosModule = {
  key: string;
  label: string;
  unit: string;
  annualYieldPerUnit: number;
};

export type ModulosIndexOption = {
  label: string;
  multiplier: number;
};

export type ModulosSpecialIndex = {
  key: string;
  label: string;
  type: "select";
  options: ModulosIndexOption[];
};

export type ModulosActivity = {
  iae: string;
  name: string;
  modules: ModulosModule[];
  specialIndices?: ModulosSpecialIndex[];
  withholdingRule?: { type: "none_or_unknown" | "one_percent" };
};

export type ModulosWithholdingActivity = {
  iaeGroupOrEpigrafe: string;
  name: string;
};

export type ModulosDataset = {
  year: ModulosYear;
  generalReductionRate: number;
  activities: ModulosActivity[];
  withholding1PercentActivities: ModulosWithholdingActivity[];
};

export type ModulosAssistedInput = {
  year: ModulosYear;
  activity: ModulosActivity;
  moduleValues: Record<string, number | undefined>;
  indexMultipliers?: Record<string, number | undefined>;
  daysActive?: number;
  minorations?: number;
  amortizations?: number;
};

export type ModulosCalculationResult = {
  base: number;
  reduced: number;
  prorated: number;
  net: number;
};

export type ModulosSimpleInput = {
  netAnnual: number;
  daysActive?: number;
  isProrated?: boolean;
};

export type Modelo131EstimateInput = {
  rendimiento: number;
  daysActive?: number;
  employees?: number;
};

const DATASETS: Record<ModulosYear, ModulosDataset> = {
  2025: modulos2025 as ModulosDataset,
};

function clampDays(value: number | undefined) {
  if (!Number.isFinite(value ?? 365)) return 365;
  return Math.max(0, Math.min(365, Math.floor(value ?? 365)));
}

function safeNumber(value: number | undefined) {
  if (!Number.isFinite(value ?? 0)) return 0;
  return Math.max(0, value ?? 0);
}

function normalizeIae(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function expandIaeGroup(raw: string): string[] {
  const cleaned = raw.trim();
  if (!cleaned) return [];
  const tokens = cleaned.replace(/\s+y\s+/gi, ",").split(",").map((part) => part.trim()).filter(Boolean);
  if (tokens.length <= 1) {
    return [cleaned];
  }

  const baseToken = tokens[0];
  const basePrefix = baseToken.includes(".") ? `${baseToken.split(".")[0]}.` : "";
  return tokens.map((token, index) => {
    if (index === 0) return token;
    if (token.includes(".")) return token;
    return basePrefix ? `${basePrefix}${token}` : token;
  });
}

export function getModulosDataset(year: ModulosYear): ModulosDataset {
  return DATASETS[year];
}

export function listModulosActivities(year: ModulosYear) {
  return getModulosDataset(year).activities;
}

export function listWithholdingActivities(year: ModulosYear) {
  return getModulosDataset(year).withholding1PercentActivities;
}

export function isWithholding1PercentActivity(iae: string, year: ModulosYear): boolean {
  const normalized = normalizeIae(iae);
  return listWithholdingActivities(year).some((entry) => {
    return expandIaeGroup(entry.iaeGroupOrEpigrafe).some((code) => normalizeIae(code) === normalized);
  });
}

export function calculateModulosAssisted(input: ModulosAssistedInput): ModulosCalculationResult {
  const dataset = getModulosDataset(input.year);
  const days = clampDays(input.daysActive);
  const base = input.activity.modules.reduce((total, module) => {
    const units = safeNumber(input.moduleValues[module.key]);
    return total + units * module.annualYieldPerUnit;
  }, 0);

  const minorations = safeNumber(input.minorations);
  const amortizations = safeNumber(input.amortizations);
  const afterMinorations = Math.max(0, base - minorations);
  const multiplier = Object.values(input.indexMultipliers ?? {}).reduce((acc, value) => {
    const safe = Number.isFinite(value ?? 1) ? (value ?? 1) : 1;
    return acc * safe;
  }, 1);
  const afterIndices = afterMinorations * multiplier;
  const afterAmortizations = Math.max(0, afterIndices - amortizations);
  const reduced = afterAmortizations * (1 - dataset.generalReductionRate);
  const prorated = reduced * (days / 365);
  return {
    base,
    reduced,
    prorated,
    net: Math.max(0, prorated),
  };
}

export function calculateModulosSimple(input: ModulosSimpleInput): ModulosCalculationResult {
  const days = clampDays(input.daysActive);
  const base = safeNumber(input.netAnnual);
  const prorated = input.isProrated ? base : base * (days / 365);
  return {
    base,
    reduced: base,
    prorated,
    net: Math.max(0, prorated),
  };
}

export function estimateWithholding1Percent(base: number): number {
  return safeNumber(base) * 0.01;
}

export function estimateModelo131Payments(input: Modelo131EstimateInput): number {
  const days = clampDays(input.daysActive);
  const employees = Math.max(0, Math.floor(input.employees ?? 0));
  const rate = employees === 0 ? 0.02 : employees === 1 ? 0.03 : 0.04;
  const base = safeNumber(input.rendimiento);
  if (base === 0) return 0;
  const estimated = base * rate;
  return estimated * (days / 365);
}
