import Link from "next/link";
import { getServices, type ServiceSlug } from "@/content/services";

/**
 * ServicesHubBlocks — bloques únicos para /servicios.
 * No es la suma de cards genéricas: es un hub de decisión.
 * Server Components.
 */

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]";

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
    inversion: "desde 8k €",
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
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] md:grid-cols-2 lg:grid-cols-4">
      {SIGNATURES.map((sig, i) => {
        const s = byId(sig.slug);
        return (
          <Link
            key={sig.slug}
            href={s.href}
            className="group flex animate-fade-up flex-col bg-white p-6 transition-colors duration-200 hover:bg-[#F5F6F8] sm:p-7"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-light leading-none tabular-nums tracking-tight text-[#9DA0A6]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={LABEL}>{s.eyebrow}</span>
            </div>

            <h3 className="mt-4 text-lg font-semibold leading-tight tracking-tight text-[#101014] transition-colors duration-200 group-hover:text-brand-600 sm:text-xl">
              {s.shortTitle}
            </h3>
            <p className="mt-2 text-sm text-[#63666D]">{sig.signature}</p>

            <dl className="mt-6 flex-1 space-y-4 text-[13px]">
              <div>
                <dt className={LABEL}>Cuando</dt>
                <dd className="mt-1 leading-relaxed text-[#3D4046]">{sig.cuando}</dd>
              </div>
              <div>
                <dt className={LABEL}>No cuando</dt>
                <dd className="mt-1 leading-relaxed text-[#63666D]">{sig.noCuando}</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-[#E4E6EA] pt-4">
                <div>
                  <dt className={LABEL}>1ª entrega</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#101014]">
                    {sig.primeraEntrega}
                  </dd>
                </div>
                <div>
                  <dt className={LABEL}>Inversión</dt>
                  <dd className="mt-1 text-sm font-semibold text-[#101014]">
                    {sig.inversion}
                  </dd>
                </div>
              </div>
            </dl>

            <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#101014]">
              <span className="border-b border-[#C9CCD3] transition-colors duration-200 group-hover:border-brand-600 group-hover:text-brand-600">
                Ver servicio
              </span>
              <svg
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
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
    <div className="border border-[#E4E6EA]">
      <div className="hidden border-b border-[#E4E6EA] bg-[#F5F6F8] md:grid md:grid-cols-12">
        <div className="col-span-5 px-5 py-3">
          <span className={LABEL}>Si te suena esto…</span>
        </div>
        <div className="col-span-4 px-5 py-3">
          <span className={LABEL}>Suele indicar</span>
        </div>
        <div className="col-span-3 px-5 py-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            Servicio recomendado
          </span>
        </div>
      </div>

      <ul className="divide-y divide-[#E4E6EA]">
        {rows.map((r, i) => (
          <li
            key={r.symptom}
            className="grid animate-fade-up grid-cols-1 gap-2 px-5 py-5 md:grid-cols-12 md:gap-0 md:px-0 md:py-0"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="md:col-span-5 md:px-5 md:py-5">
              <span className="text-sm font-medium text-[#101014]">{r.symptom}</span>
            </div>
            <div className="md:col-span-4 md:px-5 md:py-5">
              <span className="text-sm leading-relaxed text-[#63666D]">{r.leads}</span>
            </div>
            <div className="md:col-span-3 md:bg-[#F5F6F8] md:px-5 md:py-5">
              <Link
                href={`/servicios/${r.service.slug}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#101014] transition-colors hover:text-brand-600"
              >
                <span className="border-b border-[#C9CCD3] transition-colors group-hover:border-brand-600">
                  {r.service.label}
                </span>
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   FIT PANELS (server side)
   ──────────────────────────────────────────────────────────────── */
export function HubFitPanels({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] md:grid-cols-2">
      <div className="animate-fade-up bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span aria-hidden className="inline-block h-px w-3 bg-brand-600" />
          Cuando encajamos
        </div>
        <ul className="mt-5 divide-y divide-[#E4E6EA]">
          {yes.map((it) => (
            <li
              key={it}
              className="py-3 text-[15px] leading-relaxed text-[#3D4046] first:pt-0 last:pb-0 sm:text-base"
            >
              {it}
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-fade-up bg-[#F5F6F8] p-6 delay-100 sm:p-8">
        <div className={`flex items-center gap-2 ${LABEL}`}>
          <span aria-hidden className="inline-block h-px w-3 bg-[#C9CCD3]" />
          Cuando no
        </div>
        <ul className="mt-5 divide-y divide-[#E4E6EA]">
          {no.map((it) => (
            <li
              key={it}
              className="py-3 text-[15px] leading-relaxed text-[#63666D] first:pt-0 last:pb-0 sm:text-base"
            >
              {it}
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
    <ol className="grid grid-cols-1 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA] lg:grid-cols-4 lg:divide-x lg:divide-y-0">
      {items.map((step, i) => (
        <li
          key={step.step}
          className="animate-fade-up py-8 lg:px-8 lg:first:pl-0 lg:last:pr-0"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="text-2xl font-light leading-none tabular-nums tracking-tight text-[#9DA0A6] lg:text-3xl">
            {step.step}
          </span>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-[#101014] sm:text-xl">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3D4046]">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
