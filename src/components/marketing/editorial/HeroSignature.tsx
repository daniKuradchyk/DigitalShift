"use client";

import { motion } from "framer-motion";
import type { ServiceSlug } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * HeroSignature: visual signature CSS-puro propio de cada servicio.
 * Sustituye las ilustraciones blob genéricas por un detalle editorial
 * que demuestra sustancia técnica sin parecer plantilla.
 *
 * Cada slug renderiza una composición distinta — no es la misma
 * imagen rotada con otro título.
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
   SOFTWARE — fragmento de typedef como prueba de criterio técnico
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
          <motion.div
            key={l.k}
            className="pl-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
          >
            <span style={{ color: "var(--text-secondary)" }}>{l.k}</span>
            <span className="text-blue-400/60">: </span>
            <span className="text-blue-300">{l.v}</span>
            <span className="text-blue-400/60">,</span>
            {l.comment && (
              <span className="text-blue-300/30 ml-3">{l.comment}</span>
            )}
          </motion.div>
        ))}
        <div className="text-blue-400/60">{"}"}</div>
      </div>
    </SignatureFrame>
  );
}

/* ────────────────────────────────────────────────────────────────
   WEB — panel de Core Web Vitals reales
   ──────────────────────────────────────────────────────────────── */
function WebSignature() {
  const metrics = [
    { name: "LCP",  value: "1.2s",  bar: 95, target: "< 2.5s" },
    { name: "INP",  value: "98ms",  bar: 92, target: "< 200ms" },
    { name: "CLS",  value: "0.02",  bar: 98, target: "< 0.1" },
    { name: "TTFB", value: "180ms", bar: 90, target: "< 800ms" },
  ];

  return (
    <SignatureFrame label="lighthouse.report">
      <div className="space-y-3.5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: EASE }}
            className="grid grid-cols-[60px_1fr_auto] items-center gap-3 text-[12px] sm:text-[13px]"
          >
            <span className="font-mono font-bold text-blue-300">{m.name}</span>
            <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, rgba(91,141,239,0.7), rgba(91,141,239,0.4))`,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${m.bar}%` }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: EASE }}
              />
            </div>
            <span className="font-mono text-blue-200/80 tabular-nums">{m.value}</span>
          </motion.div>
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
   AUTOMATIZACIÓN — diagrama de flujo horizontal
   ──────────────────────────────────────────────────────────────── */
function AutomationSignature() {
  return (
    <SignatureFrame label="flow.diagram">
      <div className="font-mono text-[11px] sm:text-[12px]">
        {/* Top row */}
        <div className="grid grid-cols-3 gap-2 items-center">
          <FlowBox label="CRM" sub="HubSpot" delay={0.4} />
          <FlowConnector delay={0.55} />
          <FlowBox label="ERP" sub="SAP" delay={0.7} accent />
        </div>

        {/* Middle (down arrow from CRM) */}
        <motion.div
          className="flex items-center gap-2 mt-3 pl-[8%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
        >
          <div
            className="w-px h-5 ml-3"
            style={{ background: "linear-gradient(to bottom, rgba(91,141,239,0.5), rgba(91,141,239,0.2))" }}
          />
        </motion.div>

        {/* Side branches */}
        <motion.div
          className="grid grid-cols-2 gap-3 mt-1 pl-[8%]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <FlowBox label="Email" sub="postmark" small delay={1.1} />
          <FlowBox label="Logs" sub="alertas" small delay={1.2} />
        </motion.div>

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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className={`relative rounded border ${small ? "px-2 py-1.5" : "px-3 py-2.5"}`}
      style={{
        background: accent
          ? "rgba(91,141,239,0.12)"
          : "rgba(91,141,239,0.05)",
        borderColor: accent
          ? "rgba(91,141,239,0.35)"
          : "rgba(91,141,239,0.18)",
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
    </motion.div>
  );
}

function FlowConnector({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="relative h-px"
      style={{
        background: "linear-gradient(90deg, rgba(91,141,239,0.3), rgba(91,141,239,0.6), rgba(91,141,239,0.3))",
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-300/80 text-xs"
        aria-hidden
      >
        ›
      </span>
    </motion.div>
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
        {/* Header */}
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
          <motion.div
            key={r.rol}
            className="grid grid-cols-[80px_repeat(5,1fr)] gap-1 items-center py-1.5"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + ri * 0.1, ease: EASE }}
          >
            <span
              className="font-bold"
              style={{ color: "var(--text-secondary)" }}
            >
              {r.rol}
            </span>
            {r.perms.map((p, ci) => (
              <span
                key={ci}
                className="flex justify-center"
                aria-hidden
              >
                <span
                  className="block w-2 h-2 rounded-full"
                  style={{
                    background: p
                      ? "rgb(91,141,239)"
                      : "rgba(91,141,239,0.12)",
                    boxShadow: p ? "0 0 8px rgba(91,141,239,0.5)" : undefined,
                  }}
                />
              </span>
            ))}
          </motion.div>
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
   FRAME — wrapper común para dar identidad de "ficha técnica"
   ──────────────────────────────────────────────────────────────── */
function SignatureFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
      className="relative w-full max-w-md rounded-xl border overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(10,17,40,0.7) 0%, rgba(6,11,26,0.95) 100%)",
        borderColor: "rgba(65,105,225,0.18)",
      }}
    >
      {/* Top accent line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(91,141,239,0.5), transparent)",
        }}
      />

      {/* Pseudo-titlebar */}
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

      {/* Body */}
      <div className="p-5 sm:p-6">{children}</div>

      {/* Subtle inner glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(91,141,239,0.06), transparent 50%)",
        }}
        aria-hidden
      />
    </motion.div>
  );
}
