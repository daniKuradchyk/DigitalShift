import rules2024 from "../../../tax-rules/2024.json";
import rules2025 from "../../../tax-rules/2025.json";

export type TaxYear = 2024 | 2025;

export type Bracket = {
  upto: number | null;
  rate: number;
};

export type ScaleBreakdownItem = {
  from: number;
  to: number | null;
  rate: number;
  base: number;
  tax: number;
};

export type ScaleResult = {
  total: number;
  breakdown: ScaleBreakdownItem[];
};

export type TaxRules = {
  year: TaxYear;
  generalScaleState: Bracket[];
  combinedFactor: number;
  savingsScale: Bracket[];
  workReduction: {
    maxNet: number;
    maxOtherIncome: number;
    tramo1Max: number;
    tramo2Max: number;
    tramo3Max: number;
    tramo1Amount: number;
    tramo2Base: number;
    tramo2Rate: number;
    tramo3Base: number;
    tramo3Rate: number;
    tramo3StartAmount: number;
  };
  autonomo: {
    difficultJustificationRate: number;
    difficultJustificationMax: number;
  };
  jointReduction: {
    marriage: number;
    singleParent: number;
  };
  personalMinimum: {
    base: number;
    over65: number;
    over75Extra: number;
  };
  descendantsMinimum: {
    first: number;
    second: number;
    third: number;
    fourth: number;
    under3Extra: number;
  };
  deduction340: {
    threshold1: number;
    threshold2: number;
    max: number;
    slope: number;
    maxOtherIncome: number;
  } | null;
  defaultWorkExpense: number;
  mealLimits: {
    spainNoOvernight: number;
    spainOvernight: number;
    abroadNoOvernight: number;
    abroadOvernight: number;
  };
};

export type WorkInput = {
  gross: number;
  withhold: number;
  ss: number;
  otherExpenses?: number;
};

export type AutonomoInput = {
  income: number;
  expenses: number;
  withhold: number;
  modelo130: number;
  reta: number;
  mode?: "directa" | "modulos";
  netOverride?: number;
};

export type PersonalInput = {
  age: number;
  dependents: number;
  dependentsUnder3: number;
  jointType: "individual" | "marriage" | "singleParent";
  otherIncome: number;
};

export type TaxInput = {
  year: TaxYear;
  work?: WorkInput | null;
  autonomo?: AutonomoInput | null;
  savingsIncome: number;
  personal: PersonalInput;
  useCombinedScale?: boolean;
  generalScaleOverride?: Bracket[];
};

export type TaxResult = {
  baseGeneral: number;
  baseSavings: number;
  baseGeneralAfterJoint: number;
  baseSavingsAfterJoint: number;
  workNet: number;
  workReduction: number;
  workTaxable: number;
  autonomoNet: number;
  autonomoNetBefore: number;
  difficultJustification: number;
  jointReductionApplied: number;
  personalMinimumApplied: number;
  quotaGeneral: number;
  quotaSavings: number;
  cuotaIntegra: number;
  deduccion340: number;
  cuotaLiquida: number;
  totalWithheld: number;
  cuotaDiferencial: number;
  generalScale: ScaleResult;
  savingsScale: ScaleResult;
  warnings: string[];
};

const RULES: Record<TaxYear, TaxRules> = {
  2024: rules2024 as TaxRules,
  2025: rules2025 as TaxRules,
};

export function getRules(year: TaxYear): TaxRules {
  return RULES[year];
}

export function applyProgressiveScale(base: number, brackets: Bracket[], multiplier = 1): ScaleResult {
  const safeBase = Math.max(0, base);
  let lastLimit = 0;
  let total = 0;
  const breakdown: ScaleBreakdownItem[] = [];

  for (const bracket of brackets) {
    const limit = bracket.upto ?? Number.POSITIVE_INFINITY;
    if (safeBase <= lastLimit) break;
    const taxable = Math.max(0, Math.min(safeBase, limit) - lastLimit);
    const rate = bracket.rate * multiplier;
    const tax = taxable * rate;
    total += tax;
    breakdown.push({
      from: lastLimit,
      to: bracket.upto,
      rate,
      base: taxable,
      tax,
    });
    lastLimit = limit;
  }

  return { total, breakdown };
}

export function calculateWorkReduction(net: number, otherIncome: number, rules: TaxRules): number {
  if (net <= 0) return 0;
  if (net >= rules.workReduction.maxNet) return 0;
  if (otherIncome > rules.workReduction.maxOtherIncome) return 0;

  if (net <= rules.workReduction.tramo1Max) {
    return rules.workReduction.tramo1Amount;
  }
  if (net <= rules.workReduction.tramo2Max) {
    return Math.max(
      0,
      rules.workReduction.tramo1Amount - rules.workReduction.tramo2Rate * (net - rules.workReduction.tramo2Base),
    );
  }
  if (net <= rules.workReduction.tramo3Max) {
    return Math.max(
      0,
      rules.workReduction.tramo3StartAmount - rules.workReduction.tramo3Rate * (net - rules.workReduction.tramo3Base),
    );
  }
  return 0;
}

export function calculatePersonalMinimum(
  age: number,
  dependents: number,
  dependentsUnder3: number,
  rules: TaxRules,
): number {
  let minimum = rules.personalMinimum.base;
  if (age >= 65) minimum += rules.personalMinimum.over65;
  if (age >= 75) minimum += rules.personalMinimum.over75Extra;

  const d = rules.descendantsMinimum;
  const depCount = Math.max(0, Math.min(4, Math.floor(dependents)));
  if (depCount >= 1) minimum += d.first;
  if (depCount >= 2) minimum += d.second;
  if (depCount >= 3) minimum += d.third;
  if (depCount >= 4) minimum += d.fourth;

  const under3 = Math.max(0, Math.min(depCount, Math.floor(dependentsUnder3)));
  if (under3 > 0) minimum += under3 * d.under3Extra;
  return minimum;
}

export function calculateTax(input: TaxInput): TaxResult {
  const rules = getRules(input.year);
  const generalScaleSource = input.generalScaleOverride ?? rules.generalScaleState;
  const useCombined = input.useCombinedScale ?? true;
  const combinedFactor = useCombined ? rules.combinedFactor : 1;
  const warnings: string[] = [];
  if (useCombined) {
    warnings.push("Escala combinada aproximada (estatal x2).");
  }

  const work = input.work ?? null;
  const workGross = work?.gross ?? 0;
  const workWithhold = work?.withhold ?? 0;
  const workSS = work?.ss ?? 0;
  const workExpenses = work?.otherExpenses ?? rules.defaultWorkExpense;
  const workNet = Math.max(0, workGross - workSS - workExpenses);
  const workReduction = calculateWorkReduction(workNet, input.personal.otherIncome, rules);
  const workTaxable = Math.max(0, workNet - workReduction);

  const auto = input.autonomo ?? null;
  const autoIncome = auto?.income ?? 0;
  const autoExpenses = auto?.expenses ?? 0;
  const autoReta = auto?.reta ?? 0;
  const autoWithhold = auto?.withhold ?? 0;
  const autoModelo130 = auto?.modelo130 ?? 0;

  const autoMode = auto?.mode ?? "directa";
  const hasOverride = autoMode === "modulos" && Number.isFinite(auto?.netOverride ?? Number.NaN);
  const autonomoNetBefore = hasOverride ? Math.max(0, auto?.netOverride ?? 0) : Math.max(0, autoIncome - autoExpenses - autoReta);
  const difficultJustification = hasOverride
    ? 0
    : Math.min(
        rules.autonomo.difficultJustificationMax,
        autonomoNetBefore * rules.autonomo.difficultJustificationRate,
      );
  const autonomoNet = hasOverride ? autonomoNetBefore : Math.max(0, autonomoNetBefore - difficultJustification);

  const baseGeneral = workTaxable + autonomoNet;
  const baseSavings = Math.max(0, input.savingsIncome);

  const jointReduction =
    input.personal.jointType === "marriage"
      ? rules.jointReduction.marriage
      : input.personal.jointType === "singleParent"
        ? rules.jointReduction.singleParent
        : 0;

  const baseGeneralAfterJoint = Math.max(0, baseGeneral - jointReduction);
  const remainingJoint = Math.max(0, jointReduction - baseGeneral);
  const baseSavingsAfterJoint = Math.max(0, baseSavings - remainingJoint);

  const personalMinimum = calculatePersonalMinimum(
    input.personal.age,
    input.personal.dependents,
    input.personal.dependentsUnder3,
    rules,
  );

  const generalScale = applyProgressiveScale(baseGeneralAfterJoint, generalScaleSource, combinedFactor);
  const minimumScale = applyProgressiveScale(
    Math.min(baseGeneralAfterJoint, personalMinimum),
    generalScaleSource,
    combinedFactor,
  );
  const quotaGeneral = Math.max(0, generalScale.total - minimumScale.total);

  const savingsScale = applyProgressiveScale(baseSavingsAfterJoint, rules.savingsScale, 1);
  const quotaSavings = Math.max(0, savingsScale.total);

  const cuotaIntegra = quotaGeneral + quotaSavings;

  let deduccion340 = 0;
  if (rules.deduction340 && workGross > 0 && input.personal.otherIncome <= rules.deduction340.maxOtherIncome) {
    if (workGross <= rules.deduction340.threshold1) {
      deduccion340 = rules.deduction340.max;
    } else if (workGross <= rules.deduction340.threshold2) {
      deduccion340 = Math.max(
        0,
        rules.deduction340.max - rules.deduction340.slope * (workGross - rules.deduction340.threshold1),
      );
    }
  }

  const cuotaLiquida = Math.max(0, cuotaIntegra - deduccion340);
  const totalWithheld = workWithhold + autoWithhold + autoModelo130;
  const cuotaDiferencial = cuotaLiquida - totalWithheld;

  return {
    baseGeneral,
    baseSavings,
    baseGeneralAfterJoint,
    baseSavingsAfterJoint,
    workNet,
    workReduction,
    workTaxable,
    autonomoNet,
    autonomoNetBefore,
    difficultJustification,
    jointReductionApplied: jointReduction,
    personalMinimumApplied: personalMinimum,
    quotaGeneral,
    quotaSavings,
    cuotaIntegra,
    deduccion340,
    cuotaLiquida,
    totalWithheld,
    cuotaDiferencial,
    generalScale,
    savingsScale,
    warnings,
  };
}
