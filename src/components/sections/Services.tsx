import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { BarChart3, Code2, Rocket, Bot, Database, ArrowRight } from "lucide-react";

/* ─── Decorative SVG background patterns per card ─────────────────── */

function GridPattern({ color }: { color: string }) {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`gp-${color}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke={color} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#gp-${color})`} />
    </svg>
  );
}

function DotsPattern({ color }: { color: string }) {
  return (
    <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`dp-${color}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dp-${color})`} />
    </svg>
  );
}

/* ─── Card definitions ──────────────────────────────────────────────── */

const services = [
  {
    id: "consultoria",
    Icon: BarChart3,
    title: "Consultoría y\ntransformación",
    description: "Diagnóstico operativo, hoja de ruta de 90 días y KPIs medibles para que cada euro invertido tenga retorno claro.",
    tags: ["Diagnóstico", "Procesos", "ROI rápido"],
    accent: "#38BDF8",
    glow: "rgba(56,189,248,0.15)",
    iconBg: "bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20",
    iconColor: "text-sky-600 dark:text-sky-400",
    span: "lg:col-span-2 lg:row-span-2",
    large: true,
    Pattern: GridPattern,
  },
  {
    id: "ia",
    Icon: Bot,
    title: "IA y\nautomatización",
    description: "Flujos RPA, agentes IA y clasificación inteligente con control humano y trazabilidad completa.",
    tags: ["Agentes IA", "RPA", "Guardrails"],
    accent: "#A78BFA",
    glow: "rgba(167,139,250,0.15)",
    iconBg: "bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    span: "lg:col-span-1",
    large: false,
    Pattern: DotsPattern,
  },
  {
    id: "mvp",
    Icon: Rocket,
    title: "MVP en\n8 semanas",
    description: "De hipótesis a producto funcional con usuarios reales. Sprints quincenales y aprendizaje accionable.",
    tags: ["Sprints", "Validación", "Analytics"],
    accent: "#34D399",
    glow: "rgba(52,211,153,0.15)",
    iconBg: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    span: "lg:col-span-1",
    large: false,
    Pattern: GridPattern,
  },
  {
    id: "apps",
    Icon: Code2,
    title: "Desarrollo a medida",
    description: "Software con arquitectura limpia, CI/CD, QA automatizado y handover completo. Tú eres dueño del código.",
    tags: ["Arquitectura", "CI/CD", "QA"],
    accent: "#FB923C",
    glow: "rgba(251,146,60,0.15)",
    iconBg: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    span: "lg:col-span-2",
    large: false,
    Pattern: DotsPattern,
  },
  {
    id: "data",
    Icon: Database,
    title: "Integraciones y Data",
    description: "Conectores ERP/CRM, pipelines de calidad y dashboards operativos en tiempo real.",
    tags: ["Conectores", "ETL", "Reporting"],
    accent: "#22D3EE",
    glow: "rgba(34,211,238,0.15)",
    iconBg: "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    span: "lg:col-span-1",
    large: false,
    Pattern: GridPattern,
  },
];

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-1/3 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(56,189,248,0.4)" }} />
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(167,139,250,0.4)" }} />
      </div>

      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="section-tag mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
              Servicios
            </div>
            <h2 id="services-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Todo lo que necesita
              <br />
              <span className="gradient-text-static">tu empresa digital</span>
            </h2>
          </div>
          <Button as="a" href="/#contacto" variant="shine">
            Hablar con un experto
          </Button>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {services.map((s) => {
            const { Pattern } = s;
            return (
              <article
                key={s.id}
                className={`group relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-[#070D1C] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,40,0.12)] dark:hover:shadow-none ${s.span}`}
                style={{
                  "--glow": s.glow,
                } as React.CSSProperties}
              >
                {/* Background pattern */}
                <Pattern color={s.accent} />

                {/* Glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{ boxShadow: `inset 0 0 60px ${s.glow}` }}
                />

                {/* Top: icon + tags */}
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${s.iconBg} ${s.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                    <s.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
                  </div>
                  <div className="flex flex-wrap justify-end gap-1.5">
                    {s.tags.slice(0, s.large ? 3 : 2).map((t) => (
                      <span
                        key={t}
                        className="inline-flex rounded-full border border-slate-200/80 dark:border-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-white/[0.04] backdrop-blur-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: text */}
                <div className="relative z-10">
                  <h3 className={`font-bold text-slate-900 dark:text-white leading-tight whitespace-pre-line ${s.large ? "text-2xl" : "text-lg"}`}>
                    {s.title}
                  </h3>
                  {(s.large || true) && (
                    <p className={`mt-2 text-slate-500 dark:text-slate-400 leading-relaxed ${s.large ? "text-sm" : "text-xs"}`}>
                      {s.description}
                    </p>
                  )}
                  <div
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                    style={{ color: s.accent }}
                  >
                    Ver más <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </article>
            );
          })}

          {/* CTA card */}
          <article className="relative overflow-hidden rounded-2xl p-[1px] lg:col-span-1"
            style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.6), rgba(14,165,233,0.15) 45%, rgba(129,140,248,0.5))" }}>
            <div className="h-full rounded-2xl p-6 flex flex-col justify-center items-center text-center gap-4 bg-sky-50/90 dark:bg-[#060C1A]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-600 dark:text-sky-400 mb-2">Empieza hoy</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  ¿Hablamos de tu proyecto?
                </h3>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  Diagnóstico gratuito en 1 semana.
                </p>
              </div>
              <Button as="a" href="/#contacto" variant="shine" className="w-full">
                Agenda gratis
              </Button>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
