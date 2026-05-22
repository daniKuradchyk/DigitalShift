/**
 * SoftwareBlocks — bloques exclusivos para /servicios/software-a-medida.
 * Tema visual: arquitectura como narrativa. Diagrama de capas, código,
 * decisión vs SaaS. Server Components.
 */

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
    <div className="space-y-3">
      {layers.map((L, i) => (
        <div
          key={L.label}
          className="grid grid-cols-12 items-stretch rounded-xl border overflow-hidden animate-fade-up"
          style={{
            background: L.accent ? "rgba(91,141,239,0.06)" : "rgba(10,17,40,0.55)",
            borderColor: L.accent ? "rgba(91,141,239,0.3)" : "rgba(91,141,239,0.12)",
            animationDelay: `${i * 100}ms`,
          }}
        >
          <div className="col-span-3 md:col-span-2 px-4 py-5 border-r"
            style={{ borderColor: "rgba(91,141,239,0.12)" }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              {L.label}
            </p>
          </div>
          <div className="col-span-9 md:col-span-4 px-4 py-5 border-r"
            style={{ borderColor: "rgba(91,141,239,0.12)" }}
          >
            <p
              className="text-base sm:text-lg font-bold"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
              }}
            >
              {L.title}
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 px-4 py-5">
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
              {L.items.map((it) => (
                <li
                  key={it}
                  className="text-sm font-mono"
                  style={{ color: "var(--text-secondary)" }}
                >
                  · {it}
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
    <div className="rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(91,141,239,0.15)" }}
    >
      <div className="grid grid-cols-12 gap-px"
        style={{ background: "rgba(91,141,239,0.12)" }}
      >
        <div className="col-span-4 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Decisión
          </span>
        </div>
        <div className="col-span-4 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            SaaS estándar
          </span>
        </div>
        <div className="col-span-4 px-4 py-3" style={{ background: "rgba(91,141,239,0.08)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Software a medida
          </span>
        </div>

        {rows.map((r, i) => (
          <div key={r.axis} className="contents">
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {r.axis}
              </span>
            </div>
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60 + 30}ms` }}
            >
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {r.saas}
              </span>
            </div>
            <div
              className="col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "rgba(91,141,239,0.04)", animationDelay: `${i * 60 + 60}ms` }}
            >
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {r.custom}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CODE EXAMPLE — fragmento real, no marketing
   ──────────────────────────────────────────────────────────────── */
export function SoftwareCodeExample() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-5 animate-fade-up">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
          style={{ color: "var(--accent-light)" }}
        >
          Cómo se ve por dentro
        </p>
        <h3
          className="font-bold mb-3"
          style={{
            color: "var(--text-primary)",
            fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.25,
          }}
        >
          Reglas de negocio explícitas, no enterradas en clicks de UI.
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Cada estado, transición y validación queda escrito como código auditable.
          El día que cambia el proceso, se cambia una línea — no se reconfigura
          una jungla de automatizaciones en HubSpot que nadie recuerda quién montó.
        </p>
      </div>

      <div className="lg:col-span-7 animate-fade-up delay-100">
        <pre className="rounded-xl border overflow-x-auto p-5 sm:p-6 font-mono text-[12px] sm:text-[13px] leading-[1.7]"
          style={{
            background: "linear-gradient(160deg, rgba(10,17,40,0.85), rgba(6,11,26,0.95))",
            borderColor: "rgba(91,141,239,0.18)",
            color: "var(--text-secondary)",
          }}
        >
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
      value: "20–80",
      unit: "k €",
      title: "Inversión típica fase inicial",
      sub: "Alcance acotado, hito ejecutable",
    },
    {
      value: "100%",
      unit: "",
      title: "Código y datos vuestros",
      sub: "Repo, infraestructura y backups — siempre",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-xl border"
      style={{
        background: "rgba(91,141,239,0.1)",
        borderColor: "rgba(91,141,239,0.15)",
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.title}
          className="p-6 sm:p-8 animate-fade-up"
          style={{ background: "var(--bg-page)", animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-baseline gap-1.5 mb-3">
            <span
              className="text-4xl sm:text-5xl font-black tracking-tight tabular-nums"
              style={{ color: "var(--text-primary)" }}
            >
              {s.value}
            </span>
            {s.unit && (
              <span
                className="text-lg font-bold"
                style={{ color: "var(--accent-light)" }}
              >
                {s.unit}
              </span>
            )}
          </div>
          <p
            className="text-base font-bold mb-1"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
          >
            {s.title}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {s.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
