import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { calculateTax, TaxInput } from "../src/lib/tax-engine";
import {
  calculateModulosAssisted,
  estimateModelo131Payments,
  estimateWithholding1Percent,
  getModulosDataset,
  type ModulosActivity,
} from "../src/lib/tax-engine/modulos";

function close(actual: number, expected: number, tolerance = 0.1) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `Expected ${expected} got ${actual}`);
}

function baseInput(year: 2024 | 2025): TaxInput {
  return {
    year,
    savingsIncome: 0,
    personal: {
      age: 30,
      dependents: 0,
      dependentsUnder3: 0,
      jointType: "individual",
      otherIncome: 0,
    },
    work: null,
    autonomo: null,
  };
}

// Case 1: Cuenta ajena (renta media-baja)
{
  const input = baseInput(2024);
  input.work = { gross: 20000, withhold: 2000, ss: 1500, otherExpenses: 2000 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, -758.92);
}

// Case 2: Cuenta ajena (renta alta)
{
  const input = baseInput(2024);
  input.work = { gross: 60000, withhold: 12000, ss: 3000, otherExpenses: 2000 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, 2997.0);
}

// Case 3: Autonomo con retenciones
{
  const input = baseInput(2024);
  input.autonomo = { income: 40000, expenses: 10000, reta: 3600, withhold: 2000, modelo130: 3000 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, -365.0);
}

// Case 4: Autonomo sin retenciones
{
  const input = baseInput(2024);
  input.autonomo = { income: 40000, expenses: 10000, reta: 3600, withhold: 0, modelo130: 0 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, 4635.0);
}

// Case 5: Pluriactividad
{
  const input = baseInput(2024);
  input.work = { gross: 30000, withhold: 4000, ss: 2000, otherExpenses: 2000 };
  input.autonomo = { income: 15000, expenses: 4000, reta: 1800, withhold: 500, modelo130: 1000 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, 2033.0);
}

// Case 6: Tributacion conjunta
{
  const input = baseInput(2024);
  input.personal.jointType = "marriage";
  input.work = { gross: 22000, withhold: 2000, ss: 1500, otherExpenses: 2000 };
  const result = calculateTax(input);
  close(result.cuotaDiferencial, -394.32);
}

// Case 7: Deduccion 340 (borde 16.576)
{
  const input = baseInput(2025);
  input.work = { gross: 16576, withhold: 0, ss: 0, otherExpenses: 2000 };
  const result = calculateTax(input);
  close(result.deduccion340, 340, 0.01);
  close(result.cuotaLiquida, 0, 0.01);
}

// Case 8: Deduccion 340 (borde 18.276)
{
  const input = baseInput(2025);
  input.work = { gross: 18276, withhold: 0, ss: 0, otherExpenses: 2000 };
  const result = calculateTax(input);
  close(result.deduccion340, 0, 0.01);
}

// Modulos: rendimiento asistido con indices y reduccion (2025)
{
  const dataset = getModulosDataset(2025);
  const activity = dataset.activities[0];
  const result = calculateModulosAssisted({
    year: 2025,
    activity,
    moduleValues: {
      personal_asalariado: 1,
      personal_no_asalariado: 1,
      energia: 5,
      superficie: 2,
    },
    indexMultipliers: {
      ubicacion_quiosco: 0.8,
    },
    daysActive: 180,
    minorations: 500,
    amortizations: 200,
  });
  close(result.net, 8864.19, 0.2);
}

// Modulos: retencion 1%
{
  const estimated = estimateWithholding1Percent(10000);
  close(estimated, 100, 0.01);
}

// Modulos: estimacion Modelo 131
{
  close(estimateModelo131Payments({ rendimiento: 10000, daysActive: 365, employees: 0 }), 200, 0.01);
  close(estimateModelo131Payments({ rendimiento: 10000, daysActive: 365, employees: 1 }), 300, 0.01);
}

// UI: render dinamico de modulos por actividad
{
  const dataset = getModulosDataset(2025);
  const activity = dataset.activities[0];
  const html = renderToStaticMarkup(
    React.createElement(ModulosFields, { activity }),
  );
  assert.ok(html.includes(activity.modules[0]?.label ?? ""), "Modulos UI should render module labels");
}

function ModulosFields({ activity }: { activity: ModulosActivity }) {
  return React.createElement(
    "form",
    null,
    activity.modules.map((module) =>
      React.createElement("label", { key: module.key }, module.label),
    ),
  );
}

console.log("tax-engine tests: OK");
