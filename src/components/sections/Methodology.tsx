import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const highlights = [
  { title: "Visibilidad total", text: "Tablero de avance y demos en cada sprint." },
  { title: "Riesgo controlado", text: "QA, checklist y despliegues seguros." },
  { title: "Equipo senior", text: "Direccion tecnica y contacto directo." },
  { title: "Entregables medibles", text: "KPIs definidos desde el inicio." },
];

const steps = [
  {
    id: "diagnostico",
    n: "01",
    title: "Diagnostico y objetivos",
    summary: "Alineamos negocio, procesos y riesgos para una hoja de ruta realista.",
    time: "Semana 1",
    outputs: ["Mapa de procesos y dependencias", "KPIs y backlog priorizado"],
  },
  {
    id: "alcance",
    n: "02",
    title: "Alcance y prototipo",
    summary: "Definimos flujos criticos y validamos con prototipo funcional.",
    time: "Semana 2",
    outputs: ["Flujos clave y wireframes", "Estimacion y plan tecnico"],
  },
  {
    id: "entrega",
    n: "03",
    title: "Entrega iterativa",
    summary: "Sprints quincenales con demos y eventos de uso desde el primer release.",
    time: "Semanas 3-6",
    outputs: ["Entrega cada 2 semanas", "Feedback y ajustes rapidos"],
  },
  {
    id: "produccion",
    n: "04",
    title: "Produccion y adopcion",
    summary: "Despliegue controlado, QA y formacion del equipo.",
    time: "Go-live",
    outputs: ["Checklist de calidad", "Handover y documentacion"],
  },
  {
    id: "mejora",
    n: "05",
    title: "Mejora continua",
    summary: "Monitoreo, soporte y roadmap trimestral guiado por datos.",
    time: "Mensual",
    outputs: ["SLA y observabilidad", "Roadmap por datos reales"],
  },
];

export default function Methodology() {
  return (
    <section id="metodologia" aria-labelledby="method-title" className="relative overflow-hidden py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-10 h-72 w-72 rounded-full bg-brand-300/10 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-700/10" />
      </div>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
              Proceso en 5 etapas
            </div>
            <div className="max-w-xl space-y-3">
              <h2 id="method-title" className="text-3xl font-bold tracking-tight">Como trabajamos: pasos claros y medibles</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Proceso claro, entregables medibles y visibilidad semanal. Sabras que se entrega y cuando.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{h.title}</p>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{h.text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="/#contacto" variant="shine">Agenda diagnostico gratis</Button>
            </div>
          </div>

          <ol className="relative space-y-4">
            <div
              aria-hidden
              className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-brand-300/60 via-brand-200/40 to-transparent dark:from-brand-400/50 dark:via-brand-500/30"
            />
            {steps.map((s) => (
              <li key={s.id} className="relative pl-14">
                <span className="absolute left-0 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-sm font-semibold text-brand-700 shadow-sm dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                  {s.n}
                </span>
                <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-[0_18px_50px_-34px_rgba(14,29,74,0.4)] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-brand-200 dark:border-slate-700 dark:bg-slate-900/80">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Paso {s.n}</p>
                      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                    </div>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                      {s.time}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{s.summary}</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {s.outputs.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-500/80" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
