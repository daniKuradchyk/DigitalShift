import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const metrics = [
  { value: "4+",   label: "Clientes enterprise",   colorClass: "text-sky-500 dark:text-sky-400",         bgClass: "bg-sky-50 dark:bg-sky-500/10",         borderClass: "border-sky-200 dark:border-sky-500/20"         },
  { value: "8+",   label: "Proyectos completados", colorClass: "text-emerald-500 dark:text-emerald-400",   bgClass: "bg-emerald-50 dark:bg-emerald-500/10",   borderClass: "border-emerald-200 dark:border-emerald-500/20"   },
  { value: "100%", label: "Código siempre tuyo",   colorClass: "text-violet-500 dark:text-violet-400",     bgClass: "bg-violet-50 dark:bg-violet-500/10",     borderClass: "border-violet-200 dark:border-violet-500/20"     },
  { value: "24 h", label: "Tiempo de respuesta",   colorClass: "text-amber-500 dark:text-amber-400",       bgClass: "bg-amber-50 dark:bg-amber-500/10",       borderClass: "border-amber-200 dark:border-amber-500/20"       },
];

const clients = [
  { name: "Banco Santander", mark: "BS",  accent: "#EF4444", bg: "rgba(239,68,68,0.10)"  },
  { name: "Unicaja",         mark: "UC",  accent: "#22C55E", bg: "rgba(34,197,94,0.10)"  },
  { name: "Accenture",       mark: "ACN", accent: "#A855F7", bg: "rgba(168,85,247,0.10)" },
  { name: "Soltel",          mark: "SOL", accent: "#38BDF8", bg: "rgba(56,189,248,0.10)" },
];

const cases = [
  {
    client: "Banco Santander",
    sector: "Banca · Enterprise",
    mark: "BS",
    accent: "#EF4444",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    headline: "Integración core y DataOps",
    result: "KPIs operativos con trazabilidad completa y compliance en sistemas core.",
    tags: ["DataOps", "Compliance", "Seguridad"],
  },
  {
    client: "Unicaja",
    sector: "Banca · Enterprise",
    mark: "UC",
    accent: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.25)",
    headline: "Automatización de reporting",
    result: "Flujos críticos modernizados con control de calidad de datos en producción.",
    tags: ["Automatización", "Reporting", "Governance"],
  },
  {
    client: "Accenture",
    sector: "Consultoría · Enterprise",
    mark: "ACN",
    accent: "#A855F7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.25)",
    headline: "Delivery y arquitectura",
    result: "Roadmaps técnicos alineados al negocio en proyectos de gran escala.",
    tags: ["Enterprise", "Agile", "Arquitectura"],
  },
  {
    client: "LFStudio",
    sector: "Fotografía · Premium",
    mark: "LF",
    accent: "#38BDF8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.25)",
    headline: "Web premium + SEO técnico",
    result: "Galerías optimizadas, UX editorial y captación de clientes cualificados.",
    tags: ["Web Premium", "Performance", "SEO"],
  },
];

export default function Results() {
  return (
    <section id="resultados" aria-labelledby="results-title" className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/40 dark:bg-white/[0.01]">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)" }} />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px w-3/4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)" }} />
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-15"
          style={{ background: "rgba(129,140,248,0.4)" }} />
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-15"
          style={{ background: "rgba(56,189,248,0.4)" }} />
      </div>

      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Casos reales
          </div>
          <h2 id="results-title" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            Resultados que{" "}
            <span className="gradient-text-static">se miden</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Proyectos enterprise y marcas premium. Entregables claros, KPIs desde el primer día.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`rounded-2xl border ${m.borderClass} ${m.bgClass} p-6 text-center`}
            >
              <p className={`text-4xl font-extrabold tracking-tight ${m.colorClass}`}>{m.value}</p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Clients strip */}
        <div className="mb-14">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-400 dark:text-slate-600 mb-6">
            Con la confianza de
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-3 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] px-5 py-3 transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none"
              >
                <span
                  className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                  style={{ background: c.bg, color: c.accent, border: `1px solid ${c.accent}33` }}
                >
                  {c.mark}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-5">
            Por NDA los detalles se resumen sin datos sensibles.
          </p>
        </div>

        {/* Case grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {cases.map((c) => (
            <article
              key={c.client}
              className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-[#070E22] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none"
              style={{ borderColor: c.border }}
            >
              {/* Accent top bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent 70%)` }} />

              <div className="p-6">
                {/* Header row */}
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-base font-bold tracking-tight"
                    style={{ background: c.bg, color: c.accent, border: `1px solid ${c.accent}33` }}
                  >
                    {c.mark}
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-slate-400 dark:text-slate-500">{c.sector}</p>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{c.client}</h3>
                    <p className="text-sm font-semibold" style={{ color: c.accent }}>{c.headline}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{c.result}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex rounded-full border border-slate-200/80 dark:border-white/[0.08] px-2.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.03]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button as="a" href="/#contacto" variant="shine" size="lg">
            Agenda diagnóstico gratis
          </Button>
        </div>
      </Container>
    </section>
  );
}
