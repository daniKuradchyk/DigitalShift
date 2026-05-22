/**
 * CrmBlocks — bloques exclusivos para /servicios/crm-intranet-a-medida.
 * Tema visual: sistema de entidades. Modelo de datos, matriz de roles,
 * mockup de panel. Server Components.
 */

/* ────────────────────────────────────────────────────────────────
   ENTITY MODEL — diagrama de entidades + relaciones
   ──────────────────────────────────────────────────────────────── */
export function CrmEntityModel() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      <div className="lg:col-span-4 animate-fade-up">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
          style={{ color: "var(--accent-light)" }}
        >
          Modelo de datos
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
          Las entidades que estructuran vuestra operativa real.
        </h3>
        <p className="text-base leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          No es un CRM con módulos genéricos. Es un sistema construido sobre
          las entidades que vosotros manejáis cada día — con sus estados,
          sus relaciones y sus permisos reales.
        </p>
      </div>

      <div className="lg:col-span-8">
        <div
          className="rounded-xl border p-5 sm:p-6 font-mono text-[12px] sm:text-[13px]"
          style={{
            background: "linear-gradient(160deg, rgba(10,17,40,0.7), rgba(6,11,26,0.95))",
            borderColor: "rgba(91,141,239,0.18)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 items-stretch">
            <EntityBox name="Cuenta" props={["id", "nombre", "sector", "estado"]} delay={300} />
            <Connector label="N:M" delay={450} />
            <EntityBox name="Contacto" props={["id", "rol", "email", "tel"]} delay={600} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 mt-3 items-stretch">
            <EntityBox name="Oportunidad" props={["id", "fase", "importe", "owner"]} delay={750} accent />
            <Connector label="1:N" delay={900} />
            <EntityBox name="Actividad" props={["id", "tipo", "fecha", "owner"]} delay={1050} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 mt-3 items-stretch">
            <EntityBox name="Expediente" props={["id", "estado", "asignado", "due"]} delay={1200} />
            <Connector label="1:N" delay={1350} />
            <EntityBox name="Documento" props={["id", "tipo", "version", "firma"]} delay={1500} />
          </div>

          <div className="pt-4 mt-5 border-t border-blue-500/10 flex justify-between text-[10px] uppercase tracking-[0.18em]">
            <span style={{ color: "var(--text-muted)" }}>Auditoría</span>
            <span className="text-blue-300">cada cambio · cada actor · cada timestamp</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EntityBox({
  name,
  props,
  delay = 0,
  accent = false,
}: {
  name: string;
  props: string[];
  delay?: number;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded border p-3 animate-scale-in"
      style={{
        background: accent ? "rgba(91,141,239,0.1)" : "rgba(91,141,239,0.04)",
        borderColor: accent ? "rgba(91,141,239,0.4)" : "rgba(91,141,239,0.18)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="text-xs font-bold mb-2 pb-2 border-b border-blue-500/10"
        style={{ color: "var(--text-primary)" }}
      >
        {name}
      </div>
      <ul className="space-y-1 text-[11px]" style={{ color: "var(--text-muted)" }}>
        {props.map((p) => <li key={p}>· {p}</li>)}
      </ul>
    </div>
  );
}

function Connector({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <div
      className="hidden sm:flex flex-col items-center justify-center gap-1 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-px w-full line-grow"
        style={{
          background: "linear-gradient(90deg, rgba(91,141,239,0.3), rgba(91,141,239,0.6), rgba(91,141,239,0.3))",
          animationDelay: `${delay}ms`,
        }}
      />
      <span className="text-[10px] uppercase tracking-wider text-blue-300/70">
        {label}
      </span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ROLES MATRIX — pero más rica que la del hero
   ──────────────────────────────────────────────────────────────── */
export function CrmRolesMatrix() {
  const cols = ["Ver propio", "Ver equipo", "Editar", "Aprobar", "Borrar", "Auditar", "Exportar"];
  const rows: Array<{ rol: string; perms: number[]; note?: string }> = [
    { rol: "Cliente externo",   perms: [1, 0, 0, 0, 0, 0, 0], note: "Solo sus propios datos" },
    { rol: "Comercial",         perms: [1, 1, 1, 0, 0, 0, 0] },
    { rol: "Manager comercial", perms: [1, 1, 1, 1, 0, 1, 1] },
    { rol: "Operaciones",       perms: [1, 1, 1, 0, 0, 1, 1] },
    { rol: "Dirección",         perms: [1, 1, 1, 1, 0, 1, 1] },
    { rol: "Admin sistema",     perms: [1, 1, 1, 1, 1, 1, 1] },
  ];

  return (
    <div className="overflow-x-auto rounded-xl border"
      style={{ borderColor: "rgba(91,141,239,0.15)" }}
    >
      <table className="w-full font-mono text-[12px] sm:text-[13px]" style={{ minWidth: "640px" }}>
        <thead>
          <tr style={{ background: "rgba(91,141,239,0.06)" }}>
            <th className="text-left px-4 py-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              Rol
            </th>
            {cols.map((c) => (
              <th
                key={c}
                className="text-center px-2 py-3 text-[10px] uppercase tracking-wider"
                style={{ color: "var(--text-muted)" }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr
              key={r.rol}
              className="border-t animate-fade-up"
              style={{
                borderColor: "rgba(91,141,239,0.08)",
                animationDelay: `${ri * 70}ms`,
              }}
            >
              <td className="px-4 py-3.5">
                <div className="font-bold" style={{ color: "var(--text-primary)" }}>
                  {r.rol}
                </div>
                {r.note && (
                  <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                    {r.note}
                  </div>
                )}
              </td>
              {r.perms.map((p, ci) => (
                <td key={ci} className="text-center px-2 py-3.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{
                      background: p ? "rgb(91,141,239)" : "rgba(91,141,239,0.12)",
                      boxShadow: p ? "0 0 10px rgba(91,141,239,0.55)" : undefined,
                    }}
                    aria-label={p ? "permitido" : "denegado"}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   PANEL MOCKUP — vista típica de un usuario manager
   ──────────────────────────────────────────────────────────────── */
export function CrmPanelMockup() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      <div className="lg:col-span-5 animate-fade-up">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
          style={{ color: "var(--accent-light)" }}
        >
          Vista por rol
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
          Cada rol ve lo suyo. Ni una vista genérica, ni 47 campos irrelevantes.
        </h3>
        <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Un comercial entra al sistema y ve sus oportunidades, no las del equipo.
          Un manager ve el panel del equipo. Operaciones ve la cola por estado.
          Dirección ve KPIs. La interfaz refleja la jerarquía real — sin tutorial.
        </p>
      </div>

      <div className="lg:col-span-7 animate-fade-up delay-100">
        <div
          className="rounded-xl border overflow-hidden"
          style={{
            background: "linear-gradient(160deg, rgba(10,17,40,0.85), rgba(6,11,26,0.95))",
            borderColor: "rgba(91,141,239,0.2)",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-blue-500/10">
            <span className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400/30" />
              <span className="w-2 h-2 rounded-full bg-blue-400/20" />
              <span className="w-2 h-2 rounded-full bg-blue-400/10" />
            </span>
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: "var(--text-muted)" }}
            >
              panel.manager
            </span>
          </div>

          <div className="p-5 space-y-4 font-mono text-[12px]">
            <div className="grid grid-cols-3 gap-3">
              <KPI label="Pipeline" value="248k €" />
              <KPI label="Cerrados mes" value="42k €" />
              <KPI label="Tasa cierre" value="28%" accent />
            </div>

            <div className="rounded border p-3"
              style={{
                background: "rgba(91,141,239,0.03)",
                borderColor: "rgba(91,141,239,0.12)",
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] mb-2 text-blue-300/80">
                Cola asignada
              </div>
              <ul className="space-y-1.5">
                <Row name="Acme Corp · propuesta" state="due 3d" />
                <Row name="Beta SL · pendiente firma" state="due 1d" warn />
                <Row name="Gamma Ltd · descubrimiento" state="due 5d" />
                <Row name="Delta SA · cierre" state="hoy" warn />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded border px-3 py-2.5"
      style={{
        background: accent ? "rgba(91,141,239,0.08)" : "rgba(91,141,239,0.03)",
        borderColor: accent ? "rgba(91,141,239,0.3)" : "rgba(91,141,239,0.12)",
      }}
    >
      <div className="text-[9px] uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div className="text-lg font-bold tabular-nums mt-0.5"
        style={{ color: accent ? "rgb(91,141,239)" : "var(--text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ name, state, warn = false }: { name: string; state: string; warn?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span style={{ color: "var(--text-secondary)" }}>· {name}</span>
      <span
        className="text-[10px] px-2 py-0.5 rounded font-mono"
        style={{
          color: warn ? "rgb(91,141,239)" : "var(--text-muted)",
          background: warn ? "rgba(91,141,239,0.1)" : "rgba(91,141,239,0.03)",
          border: `1px solid ${warn ? "rgba(91,141,239,0.3)" : "rgba(91,141,239,0.1)"}`,
        }}
      >
        {state}
      </span>
    </li>
  );
}

/* ────────────────────────────────────────────────────────────────
   ADOPTION GOTCHAS — qué hace que el sistema se adopte o no
   ──────────────────────────────────────────────────────────────── */
export function CrmAdoptionGotchas() {
  const items: Array<{ k: string; v: string }> = [
    {
      k: "Diseñar antes de codificar",
      v: "Entidades, estados y flujos validados con el equipo que va a usarlo. No 'recoger requisitos' por email.",
    },
    {
      k: "Permisos finos por defecto",
      v: "Cada rol ve solo lo que necesita. Nada de 'todos ven todo y filtran ellos'.",
    },
    {
      k: "Workflows reales, no pasos decorativos",
      v: "Si un estado no tiene transición útil, no existe. Los estados son decisiones, no etiquetas.",
    },
    {
      k: "Búsqueda y filtros como prioridad",
      v: "Un CRM sin búsqueda potente se abandona en seis meses. Es el día a día del usuario.",
    },
    {
      k: "Migración del histórico",
      v: "Sin Excel paralelo el sistema no se adopta. Importamos el legacy y lo mantenemos limpio.",
    },
    {
      k: "Formación corta por rol",
      v: "30 minutos por rol con el flujo real. No un PDF de 80 páginas que nadie lee.",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      {items.map((it, i) => (
        <div
          key={it.k}
          className="rounded-xl border p-5 sm:p-6 animate-fade-up"
          style={{
            background: "rgba(91,141,239,0.03)",
            borderColor: "rgba(91,141,239,0.12)",
            animationDelay: `${i * 70}ms`,
          }}
        >
          <p className="font-bold mb-1.5"
            style={{
              color: "var(--text-primary)",
              letterSpacing: "-0.015em",
            }}
          >
            {it.k}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {it.v}
          </p>
        </div>
      ))}
    </div>
  );
}
