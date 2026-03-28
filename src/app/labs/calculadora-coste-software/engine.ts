import {
  HOURLY_RATE,
  PM_PCT,
  CONTINGENCY_PCT,
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

// ─── Input types ─────────────────────────────────────────────────────────────

export interface QuickInput {
  projectType: string;       // key of PROJECT_TYPES
  complexity: string;        // key of COMPLEXITY_MULTIPLIERS
  usersScale: string;        // key of USERS_SCALE_MULTIPLIERS
  designLevel: string;       // key of DESIGN_LEVELS
  qaLevel: string;           // key of QA_LEVELS
  infraLevel: string;        // key of INFRA_LEVELS
  integrations: number;      // count of external integrations (0–10)
  hasDocumentation: boolean; // well-documented APIs?
}

export interface AdvancedInput {
  projectType: string;
  modules: Record<string, ModuleLevel>;
  complexity: string;
  usersScale: string;
  designLevel: string;
  qaLevel: string;
  infraLevel: string;
  securityOptions: string[];
  integrations: number;
  hasDocumentation: boolean;
}

// ─── Output types ─────────────────────────────────────────────────────────────

export interface PhaseBreakdown {
  label: string;
  hours: number;
  pct: number;
}

export interface CostDriver {
  label: string;
  hours: number;
}

export interface CalcResult {
  scenarios: Record<ScenarioKey, { hours: number; price: number }>;
  phases: PhaseBreakdown[];
  totalMidHours: number;
  timeline: { minWeeks: number; maxWeeks: number };
  team: string[];
  approach: string;
  drivers: CostDriver[];
  valid: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function integrationHours(count: number, documented: boolean): number {
  if (count === 0) return 0;
  const hoursEach = documented ? 32 : 60;
  return count * hoursEach;
}

function applyMultipliers(
  base: number,
  complexity: string,
  usersScale: string,
  designLevel: string,
): number {
  const cm = COMPLEXITY_MULTIPLIERS[complexity]?.mult ?? 1;
  const um = USERS_SCALE_MULTIPLIERS[usersScale]?.mult ?? 1;
  const dm = DESIGN_LEVELS[designLevel]?.frontendMult ?? 1;
  // Apply complexity and users scale to full base, design only to ~40% (frontend)
  return base * cm * um * (0.60 + 0.40 * dm);
}

function buildPhases(
  coreHours: number,
  qaHours: number,
  infraHours: number,
  pmHours: number,
  contingencyHours: number,
  designExtraHours: number,
): PhaseBreakdown[] {
  const total = coreHours + qaHours + infraHours + pmHours + contingencyHours + designExtraHours;
  if (total === 0) return [];
  const phases: Array<{ label: string; hours: number }> = [
    { label: "Diseño y UX",          hours: Math.round(coreHours * 0.10 + designExtraHours) },
    { label: "Frontend",             hours: Math.round(coreHours * 0.35) },
    { label: "Backend y lógica",     hours: Math.round(coreHours * 0.40) },
    { label: "QA y testing",         hours: Math.round(qaHours) },
    { label: "Infraestructura",      hours: Math.round(infraHours) },
    { label: "Gestión de proyecto",  hours: Math.round(pmHours) },
    { label: "Contingencia",         hours: Math.round(contingencyHours) },
  ].filter((p) => p.hours > 0);
  return phases.map((p) => ({ ...p, pct: Math.round((p.hours / total) * 100) }));
}

function calcTimeline(hours: number): { minWeeks: number; maxWeeks: number } {
  // Assume 2 devs, 40h/week effective each
  const weeks = hours / (2 * 38);
  const minWeeks = Math.max(4, Math.floor(weeks * 0.85));
  const maxWeeks = Math.ceil(weeks * 1.15);
  return { minWeeks, maxWeeks };
}

function recommendTeam(hours: number, projectType: string): string[] {
  const team: string[] = [];
  if (hours < 200) {
    team.push("1 Full-stack senior");
  } else if (hours < 400) {
    team.push("1 Frontend", "1 Backend");
  } else if (hours < 700) {
    team.push("1 Tech Lead", "1 Frontend", "1 Backend");
  } else {
    team.push("1 Tech Lead", "1–2 Frontend", "1–2 Backend", "1 QA");
  }
  if (projectType === "app-movil") team.push("1 Mobile developer");
  if (projectType === "plataforma-ia") team.push("1 ML Engineer");
  if (projectType === "plataforma-saas" || projectType === "marketplace") team.push("1 DevOps");
  return team;
}

function recommendApproach(hours: number, projectType: string): string {
  if (hours < 250) return "Desarrollo iterativo con sprints de 2 semanas. Entrega de MVP funcional en fase 1.";
  if (hours < 500) return "Metodología ágil con fases claras: discovery, MVP, iteraciones. Revisiones cada 2 semanas.";
  if (projectType === "plataforma-saas" || projectType === "marketplace") {
    return "Arquitectura por módulos con entrega incremental. Fase 1 core + auth. Fases siguientes por módulo de negocio.";
  }
  return "Proyecto estructurado en milestones. Discovery técnico previo recomendado para reducir riesgos de alcance.";
}

function buildScenarios(midHours: number): Record<ScenarioKey, { hours: number; price: number }> {
  return (Object.entries(SCENARIOS) as [ScenarioKey, typeof SCENARIOS[ScenarioKey]][]).reduce(
    (acc, [key, s]) => {
      const h = Math.round(midHours * s.mult);
      acc[key] = { hours: h, price: Math.round(h * HOURLY_RATE) };
      return acc;
    },
    {} as Record<ScenarioKey, { hours: number; price: number }>,
  );
}

// ─── Quick calculator ─────────────────────────────────────────────────────────

export function calcQuick(input: QuickInput): CalcResult {
  const pt = PROJECT_TYPES[input.projectType];
  if (!pt) return emptyResult();

  const baseHours = pt.baseHours;
  const intHours = integrationHours(input.integrations, input.hasDocumentation);
  const designExtra = DESIGN_LEVELS[input.designLevel]?.extraHours ?? 0;

  const coreRaw = baseHours + intHours;
  const coreHours = applyMultipliers(coreRaw, input.complexity, input.usersScale, input.designLevel);

  const qaHours = coreHours * (QA_LEVELS[input.qaLevel]?.pct ?? 0.15);
  const infraHours = INFRA_LEVELS[input.infraLevel]?.extraHours ?? 52;
  const pmHours = (coreHours + qaHours + infraHours) * PM_PCT;
  const contingencyHours = (coreHours + qaHours + infraHours + pmHours) * CONTINGENCY_PCT;

  const totalMidHours = Math.round(coreHours + qaHours + infraHours + pmHours + contingencyHours + designExtra);

  const drivers: CostDriver[] = [
    { label: pt.label,                     hours: Math.round(baseHours * (COMPLEXITY_MULTIPLIERS[input.complexity]?.mult ?? 1)) },
    { label: "QA y testing",               hours: Math.round(qaHours) },
    { label: "Gestión de proyecto",        hours: Math.round(pmHours) },
    { label: "Integraciones externas",     hours: Math.round(intHours) },
    { label: "Infraestructura y DevOps",   hours: Math.round(infraHours) },
  ]
    .filter((d) => d.hours > 0)
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  return {
    scenarios: buildScenarios(totalMidHours),
    phases: buildPhases(coreHours, qaHours, infraHours, pmHours, contingencyHours, designExtra),
    totalMidHours,
    timeline: calcTimeline(totalMidHours),
    team: recommendTeam(totalMidHours, input.projectType),
    approach: recommendApproach(totalMidHours, input.projectType),
    drivers,
    valid: true,
  };
}

// ─── Advanced calculator ───────────────────────────────────────────────────────

export function calcAdvanced(input: AdvancedInput): CalcResult {
  const pt = PROJECT_TYPES[input.projectType];
  if (!pt) return emptyResult();

  // Sum module hours
  let moduleHours = 0;
  const moduleDrivers: CostDriver[] = [];

  for (const mod of MODULES) {
    const level = input.modules[mod.id] ?? "none";
    const h = mod.hours[level];
    if (h > 0) {
      moduleHours += h;
      moduleDrivers.push({ label: mod.label, hours: h });
    }
  }

  const intHours = integrationHours(input.integrations, input.hasDocumentation);
  const securityHours = input.securityOptions.reduce((sum, id) => {
    const opt = SECURITY_OPTIONS.find((o) => o.id === id);
    return sum + (opt?.hours ?? 0);
  }, 0);

  const designExtra = DESIGN_LEVELS[input.designLevel]?.extraHours ?? 0;
  const coreRaw = pt.baseHours + moduleHours + intHours + securityHours;
  const coreHours = applyMultipliers(coreRaw, input.complexity, input.usersScale, input.designLevel);

  const qaHours = coreHours * (QA_LEVELS[input.qaLevel]?.pct ?? 0.15);
  const infraHours = INFRA_LEVELS[input.infraLevel]?.extraHours ?? 52;
  const pmHours = (coreHours + qaHours + infraHours) * PM_PCT;
  const contingencyHours = (coreHours + qaHours + infraHours + pmHours) * CONTINGENCY_PCT;

  const totalMidHours = Math.round(coreHours + qaHours + infraHours + pmHours + contingencyHours + designExtra);

  // Top 5 drivers
  const allDrivers: CostDriver[] = [
    ...moduleDrivers,
    { label: "Base del proyecto",         hours: pt.baseHours },
    { label: "Integraciones externas",    hours: intHours },
    { label: "Seguridad",                 hours: securityHours },
    { label: "QA y testing",              hours: Math.round(qaHours) },
    { label: "Infraestructura y DevOps",  hours: infraHours },
    { label: "Gestión de proyecto",       hours: Math.round(pmHours) },
  ]
    .filter((d) => d.hours > 0)
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 5);

  return {
    scenarios: buildScenarios(totalMidHours),
    phases: buildPhases(coreHours, qaHours, infraHours, pmHours, contingencyHours, designExtra),
    totalMidHours,
    timeline: calcTimeline(totalMidHours),
    team: recommendTeam(totalMidHours, input.projectType),
    approach: recommendApproach(totalMidHours, input.projectType),
    drivers: allDrivers,
    valid: true,
  };
}

function emptyResult(): CalcResult {
  return {
    scenarios: {
      low:  { hours: 0, price: 0 },
      mid:  { hours: 0, price: 0 },
      high: { hours: 0, price: 0 },
    },
    phases: [],
    totalMidHours: 0,
    timeline: { minWeeks: 0, maxWeeks: 0 },
    team: [],
    approach: "",
    drivers: [],
    valid: false,
  };
}
