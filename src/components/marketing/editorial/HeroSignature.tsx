import type { ServiceSlug } from "@/content/services";

/**
 * HeroSignature: Server Component. Visual signature por servicio.
 * Cada slug renderiza una composición distinta. Anim. via CSS.
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
   SOFTWARE — fragmento de typedef
   ──────────────────────────────────────────────────────────────── */
function SoftwareSignature() {
  const lines: Array<{ k: string; v: string; comment?: string }> = [
    { k: "entidad", v: "'expediente'" },
    { k: "estados", v: "8", comment: "// no 3, no 50" },
    { k: "roles", v: "4" },
    { k: "trazabilidad", v: "true" },
    { k: "auditoria", v: "true" },
    { k: "vendor_lock_in", v: "false", comment: "// nunca" },
  ];

  return (
    <SignatureFrame label="schema.ts">
      <div className="font-mono text-[12px] sm:text-[13px] leading-[1.85]">
        <div className="text-blue-300/80">
          <span className="text-blue-400/60">type</span>{" "}
          <span className="text-blue-200">ProcesoOperativo</span>{" "}
          <span className="text-blue-400/60">=</span>{" "}
          <span className="text-blue-400/60">{"{"}</span>
        </div>
        {lines.map((l, i) => (
          <div
            key={l.k}
            className="pl-4 animate-fade-right"
            style={{ animationDelay: `${500 + i * 80}ms` }}
          >
            <span style={{ color: "var(--text-secondary)" }}>{l.k}</span>
            <span className="text-blue-400/60">: </span>
            <span className="text-blue-300">{l.v}</span>
            <span className="text-blue-400/60">,</span>
            {l.comment && (
              <span className="text-blue-300/30 ml-3">{l.comment}</span>
            )}
          </div>
        ))}
        <div className="text-blue-400/60">{"}"}</div>
      </div>
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
    <SignatureFrame label="lighthouse.report">
      <div className="space-y-3.5">
        {metrics.map((m, i) => (
          <div
            key={m.name}
            className="grid grid-cols-[60px_1fr_auto] items-center gap-3 text-[12px] sm:text-[13px] animate-fade-right"
            style={{ animationDelay: `${400 + i * 100}ms` }}
          >
            <span className="font-mono font-bold text-blue-300">{m.name}</span>
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bar-grow"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(91,141,239,0.7), rgba(91,141,239,0.4))",
                  ["--bar-w" as never]: `${m.bar}%`,
                  animationDelay: `${500 + i * 100}ms`,
                }}
              />
            </div>
            <span className="font-mono text-blue-200/80 tabular-nums">{m.value}</span>
          </div>
        ))}
        <div className="pt-2 mt-3 border-t border-blue-500/10 flex justify-between text-[10px] uppercase tracking-[0.18em] font-mono">
          <span style={{ color: "var(--text-muted)" }}>Performance</span>
          <span className="text-blue-300 font-bold">98 / 100</span>
        </div>
      </div>
    </SignatureFrame>
  );
}

/* ────────────────────────────────────────────────────────────────
   AUTOMATIZACIÓN — diagrama
   ──────────────────────────────────────────────────────────────── */
function AutomationSignature() {
  return (
    <SignatureFrame label="flow.diagram">
      <div className="font-mono text-[11px] sm:text-[12px]">
        <div className="grid grid-cols-3 gap-2 items-center">
          <FlowBox label="CRM" sub="HubSpot" delay={400} />
          <FlowConnector delay={550} />
          <FlowBox label="ERP" sub="SAP" delay={700} accent />
        </div>

        <div className="flex items-center gap-2 mt-3 pl-[8%] animate-fade-up" style={{ animationDelay: "850ms" }}>
          <div
            className="w-px h-5 ml-3"
            style={{ background: "linear-gradient(to bottom, rgba(91,141,239,0.5), rgba(91,141,239,0.2))" }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-1 pl-[8%] animate-fade-up" style={{ animationDelay: "1000ms" }}>
          <FlowBox label="Email" sub="postmark" small delay={1100} />
          <FlowBox label="Logs" sub="alertas" small delay={1200} />
        </div>

        <div className="pt-4 mt-4 border-t border-blue-500/10 flex justify-between text-[10px] uppercase tracking-[0.18em]">
          <span style={{ color: "var(--text-muted)" }}>Reintentos</span>
          <span className="text-blue-300">trazables · idempotente</span>
        </div>
      </div>
    </SignatureFrame>
  );
}

function FlowBox({
  label,
  sub,
  delay = 0,
  small = false,
  accent = false,
}: {
  label: string;
  sub: string;
  delay?: number;
  small?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={`relative rounded border animate-scale-in ${small ? "px-2 py-1.5" : "px-3 py-2.5"}`}
      style={{
        background: accent ? "rgba(91,141,239,0.12)" : "rgba(91,141,239,0.05)",
        borderColor: accent ? "rgba(91,141,239,0.35)" : "rgba(91,141,239,0.18)",
        animationDelay: `${delay}ms`,
      }}
    >
      <div
        className={`font-bold ${small ? "text-[10px]" : "text-xs"}`}
        style={{ color: "var(--text-primary)" }}
      >
        {label}
      </div>
      <div
        className={`${small ? "text-[9px]" : "text-[10px]"} mt-0.5`}
        style={{ color: "var(--text-muted)" }}
      >
        {sub}
      </div>
    </div>
  );
}

function FlowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="relative h-px line-grow"
      style={{
        background:
          "linear-gradient(90deg, rgba(91,141,239,0.3), rgba(91,141,239,0.6), rgba(91,141,239,0.3))",
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-300/80 text-xs"
        aria-hidden
      >
        ›
      </span>
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
    <SignatureFrame label="roles.matrix">
      <div className="font-mono text-[11px] sm:text-[12px]">
        <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1 mb-2 pb-2 border-b border-blue-500/10">
          <span></span>
          {cols.map((c) => (
            <span
              key={c}
              className="text-center text-[9px] uppercase tracking-wider"
              style={{ color: "var(--text-muted)" }}
            >
              {c}
            </span>
          ))}
        </div>

        {rows.map((r, ri) => (
          <div
            key={r.rol}
            className="grid grid-cols-[80px_repeat(5,1fr)] gap-1 items-center py-1.5 animate-fade-right"
            style={{ animationDelay: `${400 + ri * 100}ms` }}
          >
            <span className="font-bold" style={{ color: "var(--text-secondary)" }}>
              {r.rol}
            </span>
            {r.perms.map((p, ci) => (
              <span key={ci} className="flex justify-center" aria-hidden>
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{
                    background: p ? "rgb(91,141,239)" : "rgba(91,141,239,0.12)",
                    boxShadow: p ? "0 0 8px rgba(91,141,239,0.5)" : undefined,
                  }}
                />
              </span>
            ))}
          </div>
        ))}

        <div className="pt-2 mt-2 border-t border-blue-500/10 flex justify-between text-[10px] uppercase tracking-[0.18em]">
          <span style={{ color: "var(--text-muted)" }}>Permisos finos</span>
          <span className="text-blue-300">por entidad · por estado</span>
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
    <div
      className="relative w-full max-w-md rounded-xl border overflow-hidden animate-fade-up"
      style={{
        background:
          "linear-gradient(160deg, rgba(10,17,40,0.7) 0%, rgba(6,11,26,0.95) 100%)",
        borderColor: "rgba(65,105,225,0.18)",
        animationDelay: "200ms",
      }}
    >
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(91,141,239,0.5), transparent)",
        }}
      />

      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-blue-500/10">
        <span className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400/30" />
          <span className="w-2 h-2 rounded-full bg-blue-400/20" />
          <span className="w-2 h-2 rounded-full bg-blue-400/10" />
        </span>
        <span
          className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
      </div>

      <div className="p-5 sm:p-6">{children}</div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(91,141,239,0.06), transparent 50%)",
        }}
        aria-hidden
      />
    </div>
  );
}
