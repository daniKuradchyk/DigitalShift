import type { ServiceSlug } from "@/content/services";

/**
 * HeroSignature: Server Component. Ficha visual por servicio.
 * Composición plana: tarjeta blanca, líneas finas y un solo acento azul.
 */
export default function HeroSignature({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "software-a-medida":
      return <SoftwareSignature />;
    case "web-a-medida":
      return <WebSignature />;
    case "automatizacion-integraciones":
      return <AutomationSignature />;
    case "crm-intranet-a-medida":
      return <CrmSignature />;
    default:
      return null;
  }
}

/* ────────────────────────────────────────────────────────────────
   SOFTWARE — ficha de especificación
   ──────────────────────────────────────────────────────────────── */
function SoftwareSignature() {
  const rows: Array<{ k: string; v: string; note?: string }> = [
    { k: "Entidad", v: "Expediente" },
    { k: "Estados", v: "8", note: "ni 3, ni 50" },
    { k: "Roles", v: "4" },
    { k: "Trazabilidad", v: "Sí" },
    { k: "Auditoría", v: "Sí" },
    { k: "Vendor lock-in", v: "No", note: "nunca" },
  ];

  return (
    <SignatureFrame label="Especificación del sistema">
      <dl className="divide-y divide-[#E4E6EA]">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex items-baseline justify-between gap-4 py-2.5 first:pt-0 last:pb-0"
          >
            <dt className="text-sm text-[#3D4046]">{row.k}</dt>
            <dd className="flex items-baseline gap-2 text-right">
              {row.note && (
                <span className="text-xs text-[#9DA0A6]">{row.note}</span>
              )}
              <span className="text-sm font-semibold tabular-nums text-[#101014]">
                {row.v}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </SignatureFrame>
  );
}

/* ────────────────────────────────────────────────────────────────
   WEB — panel Core Web Vitals
   ──────────────────────────────────────────────────────────────── */
function WebSignature() {
  const metrics = [
    { name: "LCP",  value: "1.2s",  bar: 95 },
    { name: "INP",  value: "98ms",  bar: 92 },
    { name: "CLS",  value: "0.02",  bar: 98 },
    { name: "TTFB", value: "180ms", bar: 90 },
  ];

  return (
    <SignatureFrame label="Core Web Vitals">
      <div className="space-y-4">
        {metrics.map((m) => (
          <div
            key={m.name}
            className="grid grid-cols-[52px_1fr_auto] items-center gap-3"
          >
            <span className="text-sm font-medium text-[#101014]">{m.name}</span>
            <span className="block h-1 w-full bg-[#E4E6EA]" aria-hidden>
              <span
                className="block h-full bg-brand-600"
                style={{ width: `${m.bar}%` }}
              />
            </span>
            <span className="text-sm tabular-nums text-[#3D4046]">{m.value}</span>
          </div>
        ))}

        <div className="mt-1 flex items-baseline justify-between border-t border-[#E4E6EA] pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            Performance
          </span>
          <span className="text-sm font-semibold tabular-nums text-[#101014]">
            98 / 100
          </span>
        </div>
      </div>
    </SignatureFrame>
  );
}

/* ────────────────────────────────────────────────────────────────
   AUTOMATIZACIÓN — esquema de flujo
   ──────────────────────────────────────────────────────────────── */
function AutomationSignature() {
  return (
    <SignatureFrame label="Flujo de integración">
      <div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <FlowBox label="CRM" sub="HubSpot" />
          <FlowConnector />
          <FlowBox label="ERP" sub="SAP" accent />
        </div>

        <div className="ml-6 h-6 w-px bg-[#C9CCD3]" aria-hidden />

        <div className="grid grid-cols-2 gap-3">
          <FlowBox label="Email" sub="postmark" small />
          <FlowBox label="Logs" sub="alertas" small />
        </div>

        <div className="mt-5 flex items-baseline justify-between border-t border-[#E4E6EA] pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            Reintentos
          </span>
          <span className="text-sm text-[#101014]">trazables · idempotente</span>
        </div>
      </div>
    </SignatureFrame>
  );
}

function FlowBox({
  label,
  sub,
  small = false,
  accent = false,
}: {
  label: string;
  sub: string;
  small?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`border bg-[#F5F6F8] ${
        accent ? "border-[#101014]" : "border-[#E4E6EA]"
      } ${small ? "px-2.5 py-2" : "px-3 py-2.5"}`}
    >
      <div className={`font-semibold text-[#101014] ${small ? "text-[11px]" : "text-xs"}`}>
        {label}
      </div>
      <div className={`mt-0.5 text-[#63666D] ${small ? "text-[10px]" : "text-[11px]"}`}>
        {sub}
      </div>
    </div>
  );
}

function FlowConnector() {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      <span className="block h-px w-8 bg-[#C9CCD3]" />
      <span className="text-xs leading-none text-[#63666D]">&rsaquo;</span>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CRM — matriz de permisos por rol
   ──────────────────────────────────────────────────────────────── */
function CrmSignature() {
  const rows = [
    { rol: "Admin",     perms: [1, 1, 1, 1, 1] },
    { rol: "Manager",   perms: [1, 1, 1, 1, 0] },
    { rol: "Comercial", perms: [1, 1, 0, 0, 0] },
    { rol: "Cliente",   perms: [1, 0, 0, 0, 0] },
  ];
  const cols = ["Ver", "Editar", "Aprobar", "Borrar", "Audit"];

  return (
    <SignatureFrame label="Matriz de permisos">
      <div>
        <div className="grid grid-cols-[76px_repeat(5,1fr)] gap-1 border-b border-[#E4E6EA] pb-2">
          <span />
          {cols.map((c) => (
            <span
              key={c}
              className="text-center text-[10px] uppercase tracking-[0.1em] text-[#63666D]"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="divide-y divide-[#E4E6EA]">
          {rows.map((r) => (
            <div
              key={r.rol}
              className="grid grid-cols-[76px_repeat(5,1fr)] items-center gap-1 py-2"
            >
              <span className="text-xs font-medium text-[#101014]">{r.rol}</span>
              {r.perms.map((p, ci) => (
                <span key={ci} className="flex justify-center" aria-hidden>
                  <span
                    className={`block h-2 w-2 ${p ? "bg-brand-600" : "bg-[#E4E6EA]"}`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-baseline justify-between border-t border-[#E4E6EA] pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            Permisos finos
          </span>
          <span className="text-sm text-[#101014]">por entidad · por estado</span>
        </div>
      </div>
    </SignatureFrame>
  );
}

/* ────────────────────────────────────────────────────────────────
   FRAME
   ──────────────────────────────────────────────────────────────── */
function SignatureFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-[4px] border border-[#E4E6EA] bg-white animate-fade-up delay-200">
      <div className="border-b border-[#E4E6EA] px-5 py-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
          {label}
        </span>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </div>
  );
}
