import Link from "next/link";
import { getServices, type ServiceSlug } from "@/content/services";

/**
 * ServicesHubBlocks — bloques únicos para /servicios.
 * No es la suma de cards genéricas: es un hub de decisión.
 * Server Components.
 */

/* ────────────────────────────────────────────────────────────────
   SERVICE COMPARISON MATRIX — 4 servicios lado a lado
   ──────────────────────────────────────────────────────────────── */

type Signature = {
  slug: ServiceSlug;
  signature: string;
  cuando: string;
  noCuando: string;
  primeraEntrega: string;
  inversion: string;
};

const SIGNATURES: Signature[] = [
  {
    slug: "software-a-medida",
    signature: "Sistema operativo propio",
    cuando: "Un SaaS no encaja en tu proceso crítico",
    noCuando: "Un SaaS cubre el 90% del proceso",
    primeraEntrega: "4–8 semanas",
    inversion: "20–80k €",
  },
  {
    slug: "web-a-medida",
    signature: "Web rápida que posiciona",
    cuando: "La web es pieza comercial real",
    noCuando: "Solo necesitas una landing temporal",
    primeraEntrega: "4–6 semanas",
    inversion: "8–25k €",
  },
  {
    slug: "automatizacion-integraciones",
    signature: "Sistemas que ya hablan",
    cuando: "Hay 5+ herramientas que no se hablan",
    noCuando: "Es un solo flujo simple sin recorrido",
    primeraEntrega: "2–4 semanas",
    inversion: "5–25k €",
  },
  {
    slug: "crm-intranet-a-medida",
    signature: "Modelo de datos vuestro",
    cuando: "Hay notas, Excel y reglas en cabezas",
    noCuando: "HubSpot bien configurado cubre el 80%",
    primeraEntrega: "8–14 semanas",
    inversion: "30–120k €",
  },
];

export function ServicesComparison() {
  const services = getServices();
  const byId = (slug: ServiceSlug) => services.find((s) => s.slug === slug)!;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border"
      style={{
        background: "rgba(91,141,239,0.12)",
        borderColor: "rgba(91,141,239,0.18)",
      }}
    >
      {SIGNATURES.map((sig, i) => {
        const s = byId(sig.slug);
        return (
          <Link
            key={sig.slug}
            href={s.href}
            className="group relative flex flex-col p-6 sm:p-7 transition-colors animate-fade-up"
            style={{
              background: "var(--bg-page)",
              animationDelay: `${i * 100}ms`,
            }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300 mb-2">
              {String(i + 1).padStart(2, "0")} · {s.eyebrow}
            </p>
            <h3
              className="text-lg sm:text-xl font-bold mb-2 group-hover:text-blue-200 transition-colors"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {s.shortTitle}
            </h3>
            <p className="text-sm font-mono mb-5 text-blue-300/80">
              {sig.signature}
            </p>

            <dl className="space-y-3 text-[13px] mb-5 flex-1">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Cuando
                </dt>
                <dd style={{ color: "var(--text-secondary)" }}>{sig.cuando}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-wider mb-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  No cuando
                </dt>
                <dd style={{ color: "var(--text-muted)" }}>{sig.noCuando}</dd>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t"
                style={{ borderColor: "rgba(91,141,239,0.1)" }}
              >
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    1ª entrega
                  </dt>
                  <dd className="font-bold mt-0.5 text-sm" style={{ color: "var(--text-primary)" }}>
                    {sig.primeraEntrega}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Inversión
                  </dt>
                  <dd className="font-bold mt-0.5 text-sm" style={{ color: "var(--text-primary)" }}>
                    {sig.inversion}
                  </dd>
                </div>
              </div>
            </dl>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-300 group-hover:text-blue-200">
              <span>Ver servicio</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   TRIAGE — diagnóstico por síntoma → servicio recomendado
   ──────────────────────────────────────────────────────────────── */

export function ServicesTriage() {
  const rows: Array<{
    symptom: string;
    leads: string;
    service: { slug: ServiceSlug; label: string };
  }> = [
    {
      symptom: "Excel, notas en Slack, reglas en cabezas",
      leads: "Vuestra operativa depende de personas concretas",
      service: { slug: "crm-intranet-a-medida", label: "CRM/Intranet a medida" },
    },
    {
      symptom: "Web vieja, lenta, no aparece en Google",
      leads: "Demanda B2B con intención de compra real",
      service: { slug: "web-a-medida", label: "Web a medida" },
    },
    {
      symptom: "Datos que entran a mano en dos sitios",
      leads: "Equipo pierde horas en tareas repetitivas",
      service: { slug: "automatizacion-integraciones", label: "Automatización" },
    },
    {
      symptom: "SaaS obliga a torcer el proceso",
      leads: "Pagáis licencias y aún así trabajáis con Excel paralelo",
      service: { slug: "software-a-medida", label: "Software a medida" },
    },
    {
      symptom: "Tickets de soporte repiten lo mismo",
      leads: "Volumen alto de clasificación o extracción manual",
      service: { slug: "automatizacion-integraciones", label: "Automatización · IA" },
    },
    {
      symptom: "Cliente externo necesita ver su zona",
      leads: "Portal de cliente con permisos por rol y entidad",
      service: { slug: "crm-intranet-a-medida", label: "CRM/Intranet a medida" },
    },
  ];

  return (
    <div className="rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(91,141,239,0.15)" }}
    >
      <div className="grid grid-cols-12 gap-px"
        style={{ background: "rgba(91,141,239,0.12)" }}
      >
        <div className="col-span-12 md:col-span-5 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Si te suena esto…
          </span>
        </div>
        <div className="col-span-12 md:col-span-4 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Suele indicar
          </span>
        </div>
        <div className="col-span-12 md:col-span-3 px-4 py-3" style={{ background: "rgba(91,141,239,0.08)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Servicio recomendado
          </span>
        </div>

        {rows.map((r, i) => (
          <div key={r.symptom} className="contents">
            <div className="col-span-12 md:col-span-5 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {r.symptom}
              </span>
            </div>
            <div className="col-span-12 md:col-span-4 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60 + 30}ms` }}
            >
              <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {r.leads}
              </span>
            </div>
            <div className="col-span-12 md:col-span-3 px-4 py-4 animate-fade-up"
              style={{ background: "rgba(91,141,239,0.04)", animationDelay: `${i * 60 + 60}ms` }}
            >
              <Link
                href={`/servicios/${r.service.slug}`}
                className="text-sm font-bold text-blue-300 hover:text-blue-200 inline-flex items-center gap-1.5"
              >
                {r.service.label}
                <svg
                  className="w-3 h-3"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   FIT PANELS (server side)
   ──────────────────────────────────────────────────────────────── */
export function HubFitPanels({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        className="rounded-xl border p-6 sm:p-7 animate-fade-up"
        style={{
          background: "rgba(91,141,239,0.04)",
          borderColor: "rgba(91,141,239,0.25)",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300 mb-5">
          ✓ Cuando encajamos
        </p>
        <ul className="space-y-3.5">
          {yes.map((it, i) => (
            <li
              key={it}
              className="text-[15px] sm:text-base leading-relaxed flex gap-3 animate-fade-up"
              style={{ color: "var(--text-secondary)", animationDelay: `${i * 60}ms` }}
            >
              <span
                className="mt-2.5 h-1 w-3 shrink-0"
                style={{ background: "rgba(91,141,239,0.5)" }}
                aria-hidden
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="rounded-xl border p-6 sm:p-7 animate-fade-up delay-100"
        style={{
          background: "rgba(173,193,255,0.02)",
          borderColor: "rgba(173,193,255,0.12)",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          × Cuando no
        </p>
        <ul className="space-y-3.5">
          {no.map((it, i) => (
            <li
              key={it}
              className="text-[15px] sm:text-base leading-relaxed flex gap-3 animate-fade-up"
              style={{ color: "var(--text-muted)", animationDelay: `${i * 60}ms` }}
            >
              <span
                className="mt-2.5 h-1 w-3 shrink-0"
                style={{ background: "rgba(173,193,255,0.25)" }}
                aria-hidden
              />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   PROCESS TIMELINE — version server
   ──────────────────────────────────────────────────────────────── */
export function HubProcessTimeline({
  items,
}: {
  items: Array<{ step: string; title: string; description: string }>;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute hidden lg:block top-7 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(91,141,239,0.3) 5%, rgba(91,141,239,0.3) 95%, transparent 100%)",
        }}
      />
      <div className="absolute lg:hidden top-0 bottom-0 left-3 w-px"
        style={{
          background:
            "linear-gradient(to bottom, rgba(91,141,239,0.4), rgba(91,141,239,0.1))",
        }}
        aria-hidden
      />

      <ol className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((step, i) => (
          <li
            key={step.step}
            className="relative pl-10 lg:pl-0 animate-fade-up"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <div className="absolute lg:relative top-0 left-0 lg:left-auto flex items-center gap-3 lg:mb-4">
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background: "var(--bg-page)",
                  border: "2px solid rgba(91,141,239,0.5)",
                }}
              >
                <span className="font-mono text-[10px] font-bold text-blue-300">
                  {step.step}
                </span>
              </span>
            </div>
            <div className="lg:mt-2">
              <h3
                className="text-lg sm:text-xl font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
