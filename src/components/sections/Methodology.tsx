import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Search, PenTool, Zap, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    n: "01",
    Icon: Search,
    title: "Diagnóstico",
    summary: "Mapeamos procesos, riesgos y KPIs en una semana. Salimos con una hoja de ruta realista.",
    time: "Semana 1",
    color: "sky",
  },
  {
    n: "02",
    Icon: PenTool,
    title: "Diseño y alcance",
    summary: "Flujos críticos, prototipo validado y plan técnico con estimaciones cerradas.",
    time: "Semana 2",
    color: "violet",
  },
  {
    n: "03",
    Icon: Zap,
    title: "Sprints de entrega",
    summary: "Ciclos de 2 semanas con demo, feedback real y ajustes desde el primer release.",
    time: "Sem. 3–6",
    color: "emerald",
  },
  {
    n: "04",
    Icon: Rocket,
    title: "Go-live controlado",
    summary: "Despliegue por etapas, QA exhaustivo y formación del equipo antes de soltar el piloto.",
    time: "Go-live",
    color: "amber",
  },
  {
    n: "05",
    Icon: TrendingUp,
    title: "Mejora continua",
    summary: "Monitoreo, SLA y roadmap trimestral guiado por datos reales de producción.",
    time: "Mensual",
    color: "sky",
  },
];

const colorMap = {
  sky:     { icon: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20",     number: "text-sky-500 dark:text-sky-400",     line: "rgba(56,189,248,0.4)"  },
  violet:  { icon: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20", number: "text-violet-500 dark:text-violet-400", line: "rgba(167,139,250,0.4)" },
  emerald: { icon: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20", number: "text-emerald-500 dark:text-emerald-400", line: "rgba(52,211,153,0.4)"  },
  amber:   { icon: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",   number: "text-amber-500 dark:text-amber-400",   line: "rgba(251,146,60,0.4)"  },
};

const highlights = [
  { icon: "👁", title: "Visibilidad total",      text: "Demo en cada sprint." },
  { icon: "🛡", title: "Riesgo controlado",      text: "QA y despliegues seguros." },
  { icon: "🧑‍💻", title: "Sin intermediarios",       text: "Acceso directo al equipo técnico." },
  { icon: "📊", title: "KPIs desde el día 1",    text: "Métricas reales, no intuición." },
];

export default function Methodology() {
  return (
    <section id="metodologia" aria-labelledby="method-title" className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/40 dark:bg-white/[0.01]">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-px w-3/4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.3), transparent)" }} />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-px w-3/4"
          style={{ background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.3), transparent)" }} />
      </div>

      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Proceso en 5 etapas
          </div>
          <h2 id="method-title" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
            Cómo trabajamos:{" "}
            <span className="gradient-text-static">sin sorpresas</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Sabrás qué se entrega, cuándo y por qué. Sin caja negra.
          </p>
        </div>

        {/* Steps — horizontal on lg */}
        <div className="relative">
          {/* Connector line */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-9 left-[calc(10%+20px)] right-[calc(10%+20px)] h-px z-0"
            style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.4), rgba(129,140,248,0.4), rgba(56,189,248,0.4))" }}
          />

          <ol className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((s) => {
              const c = colorMap[s.color as keyof typeof colorMap] ?? colorMap.sky;
              return (
                <li key={s.n} className="group flex flex-col items-center text-center gap-3">
                  {/* Number node */}
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`inline-flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-2xl border ${c.icon} transition-transform duration-300 group-hover:scale-110 group-hover:shadow-md`}
                    >
                      <s.Icon className="h-7 w-7" strokeWidth={1.6} aria-hidden />
                    </div>
                    <span className={`mt-2 text-[10px] font-bold uppercase tracking-[0.15em] ${c.number}`}>{s.n}</span>
                  </div>

                  {/* Content */}
                  <div>
                    <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      {s.time}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{s.title}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{s.summary}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Highlights strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="flex flex-col items-center text-center gap-2 rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none"
            >
              <span className="text-2xl" aria-hidden>{h.icon}</span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{h.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{h.text}</p>
            </div>
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
