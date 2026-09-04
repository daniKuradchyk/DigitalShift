/**
 * SoftwareBlocks — bloques exclusivos para /servicios/software-a-medida.
 * Tema visual: arquitectura como narrativa. Diagrama de capas, código,
 * decisión vs SaaS. Server Components.
 */

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]";

/* ────────────────────────────────────────────────────────────────
   ARCHITECTURE LAYERS — diagrama 4 capas con responsabilidades
   ──────────────────────────────────────────────────────────────── */
export function SoftwareArchitecture() {
  const layers: Array<{
    label: string;
    title: string;
    items: string[];
    accent?: boolean;
  }> = [
    {
      label: "Capa 04",
      title: "Frontend operativo",
      items: ["Next.js App Router", "Vistas por rol", "Acciones rápidas"],
    },
    {
      label: "Capa 03",
      title: "API · contratos",
      items: ["REST tipado · GraphQL", "Validación con Zod", "Auth · SSO · RBAC"],
      accent: true,
    },
    {
      label: "Capa 02",
      title: "Dominio · reglas de negocio",
      items: ["Estados y transiciones", "Auditoría · trazabilidad", "Workflows aprobaciones"],
    },
    {
      label: "Capa 01",
      title: "Datos · persistencia",
      items: ["PostgreSQL · Prisma", "Migrations versionadas", "Backups · point-in-time"],
    },
  ];

  return (
    <div className="divide-y divide-[#E4E6EA] border border-[#E4E6EA]">
      {layers.map((L, i) => (
        <div
          key={L.label}
          className={`grid animate-fade-up grid-cols-12 ${L.accent ? "bg-[#F5F6F8]" : "bg-white"}`}
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="col-span-12 flex items-baseline gap-4 px-5 pt-5 sm:col-span-6 sm:py-6 sm:pr-6">
            <span
              className={`w-[4.5rem] shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] ${
                L.accent ? "text-brand-600" : "text-[#63666D]"
              }`}
            >
              {L.label}
            </span>
            <p className="text-base font-semibold tracking-tight text-[#101014] sm:text-lg">
              {L.title}
            </p>
          </div>

          <div className="col-span-12 px-5 pb-5 pt-4 sm:col-span-6 sm:border-l sm:border-[#E4E6EA] sm:py-6 sm:pl-6">
            <ul className="flex flex-wrap gap-x-2.5 gap-y-2">
              {L.items.map((it) => (
                <li
                  key={it}
                  className="border border-[#E4E6EA] bg-white px-2.5 py-1 text-xs text-[#3D4046]"
                >
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   SAAS VS CUSTOM — matriz de decisión profunda (no las 4 frases del hub)
   ──────────────────────────────────────────────────────────────── */
export function SoftwareSaasVsCustom() {
  const rows: Array<{ axis: string; saas: string; custom: string }> = [
    {
      axis: "Encaje con tu proceso",
      saas: "Tienes que adaptar el proceso al SaaS",
      custom: "El sistema se adapta a tu proceso real",
    },
    {
      axis: "Permisos y roles",
      saas: "Granularidad limitada por el vendor",
      custom: "Roles por entidad · estado · campo",
    },
    {
      axis: "Coste a 5 años",
      saas: "Licencias × usuarios × inflación anual",
      custom: "Inversión inicial, después mantenimiento real",
    },
    {
      axis: "Integraciones",
      saas: "Lo que el SaaS expone, tarifa por tier",
      custom: "Cualquier API o sistema, sin upcharge",
    },
    {
      axis: "Datos",
      saas: "En su nube, su esquema, su exportación",
      custom: "En tu infraestructura, tu esquema",
    },
    {
      axis: "Vendor lock-in",
      saas: "Alto · migrar es prácticamente rehacer",
      custom: "Cero · el código y los datos son tuyos",
    },
  ];

  return (
    <div className="overflow-x-auto border border-[#E4E6EA]">
      <div className="min-w-[560px]">
        <div className="grid grid-cols-12 border-b border-[#E4E6EA] bg-[#F5F6F8]">
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className={LABEL}>Decisión</span>
          </div>
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className={LABEL}>SaaS estándar</span>
          </div>
          <div className="col-span-4 px-4 py-3 sm:px-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
              Software a medida
            </span>
          </div>
        </div>

        <ul className="divide-y divide-[#E4E6EA]">
          {rows.map((r, i) => (
            <li
              key={r.axis}
              className="grid animate-fade-up grid-cols-12"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="col-span-4 px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] font-medium text-[#101014] sm:text-sm">
                  {r.axis}
                </span>
              </div>
              <div className="col-span-4 px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] leading-relaxed text-[#63666D] sm:text-sm">
                  {r.saas}
                </span>
              </div>
              <div className="col-span-4 bg-[#F5F6F8] px-4 py-4 sm:px-5 sm:py-5">
                <span className="text-[13px] leading-relaxed text-[#3D4046] sm:text-sm">
                  {r.custom}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CODE EXAMPLE — fragmento real, no marketing
   ──────────────────────────────────────────────────────────────── */
export function SoftwareCodeExample() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="animate-fade-up lg:col-span-5">
        <p className={LABEL}>Cómo se ve por dentro</p>
        <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-[#101014] sm:text-2xl">
          Reglas de negocio explícitas, no enterradas en clicks de UI.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[#3D4046]">
          Cada estado, transición y validación queda escrito como código auditable.
          El día que cambia el proceso, se cambia una línea — no se reconfigura
          una jungla de automatizaciones en HubSpot que nadie recuerda quién montó.
        </p>
      </div>

      <div className="animate-fade-up delay-100 lg:col-span-7">
        <pre className="overflow-x-auto border border-[#E4E6EA] bg-[#F5F6F8] p-5 font-mono text-[12px] leading-[1.7] text-[#3D4046] sm:p-6 sm:text-[13px]">
{`// dominio/expediente.ts
export const transiciones = {
  borrador:      ['en_revision'],
  en_revision:   ['aprobado', 'devuelto'],
  devuelto:      ['en_revision', 'archivado'],
  aprobado:      ['firmado', 'archivado'],
  firmado:       ['archivado'],
  archivado:     [],  // estado terminal
} as const

export const puedeAprobar = (rol: Rol) =>
  rol === 'manager' || rol === 'admin'
//                       └─ regla, no opinión`}
        </pre>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ROI / NUMBERS — tres números honestos
   ──────────────────────────────────────────────────────────────── */
export function SoftwareNumbers() {
  const stats = [
    {
      value: "4–8",
      unit: "sem",
      title: "Primera entrega productiva",
      sub: "MVP usable en operativa, no demo cerrada",
    },
    {
      value: "8–20",
      unit: "k €",
      title: "Primer módulo funcional",
      sub: "Proyectos completos con integraciones: desde 20k €",
    },
    {
      value: "100%",
      unit: "",
      title: "Código y datos vuestros",
      sub: "Repo, infraestructura y backups — siempre",
    },
  ];

  return (
    <div className="grid grid-cols-1 divide-y divide-[#E4E6EA] border border-[#E4E6EA] bg-[#F5F6F8] md:grid-cols-3 md:divide-x md:divide-y-0">
      {stats.map((s, i) => (
        <div
          key={s.title}
          className="animate-fade-up p-6 sm:p-8"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-semibold tracking-tight tabular-nums text-[#101014] sm:text-5xl">
              {s.value}
            </span>
            {s.unit && (
              <span className="text-lg font-medium text-brand-600">{s.unit}</span>
            )}
          </div>
          <p className="mt-4 text-base font-semibold tracking-tight text-[#101014]">
            {s.title}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#63666D]">{s.sub}</p>
        </div>
      ))}
    </div>
  );
}
