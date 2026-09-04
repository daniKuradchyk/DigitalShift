/**
 * CrmBlocks — bloques exclusivos para /servicios/crm-intranet-a-medida.
 * Tema visual: sistema de entidades. Modelo de datos, matriz de roles,
 * panel de trabajo. Server Components.
 */

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]";

/* ────────────────────────────────────────────────────────────────
   ENTITY MODEL — diagrama de entidades + relaciones
   ──────────────────────────────────────────────────────────────── */
export function CrmEntityModel() {
  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="animate-fade-up lg:col-span-4">
        <p className={LABEL}>Modelo de datos</p>
        <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-[#101014] sm:text-2xl">
          Las entidades que estructuran vuestra operativa real.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[#3D4046]">
          No es un CRM con módulos genéricos. Es un sistema construido sobre
          las entidades que vosotros manejáis cada día — con sus estados,
          sus relaciones y sus permisos reales.
        </p>
      </div>

      <div className="animate-fade-up delay-100 lg:col-span-8">
        <div className="border border-[#E4E6EA] bg-[#F5F6F8] p-5 sm:p-6">
          <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_5rem_1fr] sm:gap-2">
            <EntityBox name="Cuenta" props={["id", "nombre", "sector", "estado"]} />
            <Connector label="N:M" />
            <EntityBox name="Contacto" props={["id", "rol", "email", "tel"]} />
          </div>

          <div className="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_5rem_1fr] sm:gap-2">
            <EntityBox name="Oportunidad" props={["id", "fase", "importe", "owner"]} accent />
            <Connector label="1:N" />
            <EntityBox name="Actividad" props={["id", "tipo", "fecha", "owner"]} />
          </div>

          <div className="mt-3 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[1fr_5rem_1fr] sm:gap-2">
            <EntityBox name="Expediente" props={["id", "estado", "asignado", "due"]} />
            <Connector label="1:N" />
            <EntityBox name="Documento" props={["id", "tipo", "version", "firma"]} />
          </div>

          <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-[#E4E6EA] pt-4 text-[10px] uppercase tracking-[0.16em]">
            <span className="font-semibold text-[#63666D]">Auditoría</span>
            <span className="text-brand-600">cada cambio · cada actor · cada timestamp</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EntityBox({
  name,
  props,
  accent = false,
}: {
  name: string;
  props: string[];
  accent?: boolean;
}) {
  return (
    <div className={`border bg-white p-3 ${accent ? "border-brand-600" : "border-[#E4E6EA]"}`}>
      <div
        className={`border-b pb-2 text-xs font-semibold ${
          accent ? "border-brand-600/30 text-brand-600" : "border-[#E4E6EA] text-[#101014]"
        }`}
      >
        {name}
      </div>
      <ul className="mt-2 space-y-1 text-[11px] text-[#63666D]">
        {props.map((p) => <li key={p}>{p}</li>)}
      </ul>
    </div>
  );
}

function Connector({ label }: { label: string }) {
  return (
    <div className="hidden flex-col items-center justify-center gap-1.5 sm:flex">
      <span aria-hidden className="h-px w-full bg-[#C9CCD3]" />
      <span className="text-[10px] uppercase tracking-[0.14em] text-[#63666D]">
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
    <div className="overflow-x-auto border border-[#E4E6EA]">
      <table className="w-full text-[13px]" style={{ minWidth: "640px" }}>
        <thead>
          <tr className="border-b border-[#E4E6EA] bg-[#F5F6F8]">
            <th className={`px-4 py-3 text-left ${LABEL}`}>Rol</th>
            {cols.map((c) => (
              <th
                key={c}
                className="px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#63666D]"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E4E6EA]">
          {rows.map((r, ri) => (
            <tr
              key={r.rol}
              className="animate-fade-up"
              style={{ animationDelay: `${ri * 60}ms` }}
            >
              <td className="px-4 py-3.5">
                <div className="font-medium text-[#101014]">{r.rol}</div>
                {r.note && (
                  <div className="mt-0.5 text-[11px] text-[#63666D]">{r.note}</div>
                )}
              </td>
              {r.perms.map((p, ci) => (
                <td key={ci} className="px-2 py-3.5 text-center">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-full ${
                      p ? "bg-brand-600" : "border border-[#C9CCD3]"
                    }`}
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
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="animate-fade-up lg:col-span-5">
        <p className={LABEL}>Vista por rol</p>
        <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight text-[#101014] sm:text-2xl">
          Cada rol ve lo suyo. Ni una vista genérica, ni 47 campos irrelevantes.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-[#3D4046]">
          Un comercial entra al sistema y ve sus oportunidades, no las del equipo.
          Un manager ve el panel del equipo. Operaciones ve la cola por estado.
          Dirección ve KPIs. La interfaz refleja la jerarquía real — sin tutorial.
        </p>
      </div>

      <div className="animate-fade-up delay-100 lg:col-span-7">
        <div className="border border-[#E4E6EA] bg-white">
          <div className="border-b border-[#E4E6EA] bg-[#F5F6F8] px-5 py-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#63666D]">
              panel.manager
            </span>
          </div>

          <div className="space-y-5 p-5">
            <div className="grid grid-cols-3 divide-x divide-[#E4E6EA] border border-[#E4E6EA]">
              <KPI label="Pipeline" value="248k €" />
              <KPI label="Cerrados mes" value="42k €" />
              <KPI label="Tasa cierre" value="28%" accent />
            </div>

            <div className="border border-[#E4E6EA]">
              <div className="border-b border-[#E4E6EA] bg-[#F5F6F8] px-4 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#63666D]">
                  Cola asignada
                </span>
              </div>
              <ul className="divide-y divide-[#E4E6EA]">
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
    <div className={`px-4 py-3 ${accent ? "bg-[#F5F6F8]" : "bg-white"}`}>
      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#63666D]">
        {label}
      </div>
      <div
        className={`mt-1 text-lg font-semibold tabular-nums ${
          accent ? "text-brand-600" : "text-[#101014]"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function Row({ name, state, warn = false }: { name: string; state: string; warn?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-3 px-4 py-2.5">
      <span className="text-[13px] text-[#3D4046]">{name}</span>
      <span
        className={`shrink-0 border px-2 py-0.5 text-[11px] ${
          warn ? "border-brand-600 text-brand-600" : "border-[#E4E6EA] text-[#63666D]"
        }`}
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
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] md:grid-cols-2">
      {items.map((it, i) => (
        <div
          key={it.k}
          className="animate-fade-up bg-white p-6 sm:p-7"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <p className="text-base font-semibold tracking-tight text-[#101014]">{it.k}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#3D4046]">{it.v}</p>
        </div>
      ))}
    </div>
  );
}
