# IRPF Calculator (Qubelia)

## Rules per year
Las reglas estan en:
- `tax-rules/2024.json`
- `tax-rules/2025.json`

Para actualizar un anio:
1) Ajusta los tramos (`generalScaleState`, `savingsScale`) y parametros.
2) Guarda cambios en el JSON correspondiente.
3) Si hay nuevas deducciones, amplialas en el JSON y en `src/lib/tax-engine/index.ts`.

## Escalas autonomicas reales
Actualmente se usa una escala combinada aproximada (estatal x2).
Para usar CCAA reales:
1) Crea un mapa de escalas autonomicas en un nuevo JSON (por ejemplo `tax-rules/ccaa/2024.json`).
2) Anade un selector en la UI y enlaza el codigo de CCAA a `generalScaleOverride`.
3) Pasa `generalScaleOverride` a `calculateTax` y desactiva `useCombinedScale` cuando haya tabla real.

## Tests
Tests unitarios en `scripts/test-tax-engine.ts`.
Ejecuta con `npx tsx scripts/test-tax-engine.ts` (o `ts-node` si prefieres).
