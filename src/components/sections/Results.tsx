import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";

const companyMarks = [
  { name: "Banco Santander", mark: "BS" },
  { name: "Unicaja", mark: "UC" },
  { name: "Accenture", mark: "ACN" },
  { name: "Soltel", mark: "SOL" },
];

const trustSignals = [
  { title: "Confidencialidad real", text: "Trabajo con NDA y gobierno de datos en entornos enterprise." },
  { title: "Entrega predecible", text: "Planificacion clara, demos y checkpoints semanales." },
  { title: "Calidad y seguridad", text: "QA, checklist y despliegues controlados por etapas." },
  { title: "Impacto medible", text: "KPIs acordados desde el inicio para evaluar resultados." },
];

const featuredCase = {
  client: "LFStudio",
  sector: "Fotografia profesional",
  summary:
    "Web premium para un fotografo profesional con foco en narrativa visual, captacion de sesiones y una experiencia fluida en movil y desktop.",
  blocks: [
    { title: "Objetivo", text: "Posicionamiento premium y conversion clara." },
    { title: "Solucion", text: "Web editorial con galerias optimizadas y UX directa." },
    { title: "Resultado", text: "Marca consistente y contacto mas cualificado." },
  ],
  deliverables: [
    "Direccion UX/UI y copy de alto valor",
    "Galerias optimizadas para carga rapida",
    "SEO tecnico y estructura de portfolio",
    "Formulario y contacto directo con clientes",
  ],
  tags: ["Web premium", "Performance", "Conversion", "SEO"],
};

const enterpriseCases = [
  {
    id: "santander",
    client: "Banco Santander",
    sector: "Banca",
    mark: "BS",
    focus: "Automatizacion y data",
    summary: "Aporte en iniciativas de integracion y analitica operativa para equipos internos.",
    highlights: [
      "Integraciones seguras entre sistemas core",
      "KPIs operativos con trazabilidad",
      "Procesos documentados y QA continuo",
    ],
    tags: ["Seguridad", "DataOps", "Compliance"],
  },
  {
    id: "unicaja",
    client: "Unicaja",
    sector: "Banca",
    mark: "UC",
    focus: "Procesos y reporting",
    summary: "Aporte en modernizacion de flujos y visibilidad operativa para equipos clave.",
    highlights: [
      "Automatizacion de reportes criticos",
      "Control de calidad en datos",
      "Trazabilidad en aprobaciones",
    ],
    tags: ["Automatizacion", "Reporting", "Governance"],
  },
  {
    id: "accenture",
    client: "Accenture",
    sector: "Consultoria",
    mark: "ACN",
    focus: "Delivery y arquitectura",
    summary: "Participacion en equipos multidisciplinares para proyectos enterprise.",
    highlights: [
      "Roadmaps tecnicos alineados al negocio",
      "Integraciones en entornos complejos",
      "Documentacion para handover efectivo",
    ],
    tags: ["Enterprise", "Escala", "Agile"],
  },
  {
    id: "soltel",
    client: "Soltel",
    sector: "Tecnologia",
    mark: "SOL",
    focus: "Integraciones y software",
    summary: "Aporte en soluciones para clientes finales y operaciones internas.",
    highlights: [
      "Integracion con sistemas legados",
      "Automatizacion de tareas repetitivas",
      "Monitoreo y soporte operativo",
    ],
    tags: ["Integraciones", "Soporte", "Rendimiento"],
  },
];

export default function Results() {
  return (
    <section id="resultados" aria-labelledby="results-title" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-brand-300/10 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-700/10" />
      </div>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
              Casos reales
            </div>
            <div className="max-w-xl space-y-3">
              <h2 id="results-title" className="text-3xl font-bold tracking-tight">Casos de exito y resultados</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Aporte en proyectos enterprise y en marcas premium. Resultados visibles, procesos claros y entregables medibles.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {companyMarks.map((c) => (
                <span
                  key={c.name}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-[11px] font-semibold text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
                    {c.mark}
                  </span>
                  {c.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Por confidencialidad, los detalles se resumen sin datos sensibles.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {trustSignals.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{t.title}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal>
            <article className="group relative overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_12%_18%,rgba(99,137,255,0.2),transparent_40%),radial-gradient(circle_at_88%_0%,rgba(14,29,74,0.25),transparent_35%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.14),rgba(99,137,255,0.18))] shadow-[0_28px_80px_-48px_rgba(14,29,74,0.65)]">
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-[0_26px_70px_-40px_rgba(14,29,74,0.6)] dark:border-slate-700/60 dark:bg-slate-900/80">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-brand-600 dark:text-brand-300">Proyecto destacado</p>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{featuredCase.client}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{featuredCase.sector}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                    Caso premium
                  </span>
                </div>
                <p className="mt-4 text-slate-700 leading-relaxed dark:text-slate-300">{featuredCase.summary}</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {featuredCase.blocks.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-2xl border border-slate-200 bg-white/80 p-4 text-left shadow-sm dark:border-slate-700 dark:bg-slate-900/70"
                    >
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{b.title}</p>
                      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{b.text}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Entregables</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {featuredCase.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500/80" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featuredCase.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button as="a" href="/#contacto" variant="shine">Agenda diagnostico gratis</Button>
                  <Button as="a" href="/#metodologia" variant="ghost">Ver metodologia</Button>
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {enterpriseCases.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <article className="group relative overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_10%_20%,rgba(99,137,255,0.18),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(14,29,74,0.22),transparent_35%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.14),rgba(99,137,255,0.18))] shadow-[0_24px_70px_-44px_rgba(14,29,74,0.6)]">
                <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-[0_22px_60px_-34px_rgba(14,29,74,0.6)] dark:border-slate-700/60 dark:bg-slate-900/80">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-50 text-sm font-semibold text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-500/30">
                        {c.mark}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{c.sector}</p>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{c.client}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{c.focus}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                      Enterprise
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{c.summary}</p>
                  <ul className="mt-4 space-y-2">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
