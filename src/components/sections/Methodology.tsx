import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const steps = [
  { n: 1, title: "Diagnostico express", text: "Objetivos, KPIs y riesgos en 1-2 sesiones. Backlog priorizado en 72h." },
  { n: 2, title: "Prototipo y alcance", text: "Flujos clave y prototipo ligero con criterios de seguridad y aceptacion." },
  { n: 3, title: "Sprints de entrega", text: "Sprints quincenales con demos y eventos de uso activos desde la primera version." },
  { n: 4, title: "Puesta en produccion", text: "Despliegue controlado, checklist de QA y formacion del equipo." },
  { n: 5, title: "Soporte y mejora continua", text: "SLA, monitoreo y roadmap trimestral guiado por datos reales." },
];

export default function Methodology() {
  return (
    <section id="metodologia" aria-labelledby="method-title" className="py-20 bg-brand-50">
      <Container>
        <div className="max-w-2xl">
          <h2 id="method-title" className="text-3xl font-bold tracking-tight">Como trabajamos: pasos claros y medibles</h2>
          <p className="mt-2 text-slate-700">Que haremos, cuando y con que entregable. Seguimiento visible en cada hito.</p>
        </div>
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-5">
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block" />
          {steps.map((s) => (
            <li key={s.n} className="group relative h-full overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_20%_20%,rgba(99,137,255,0.25),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,29,74,0.25),transparent_40%),linear-gradient(120deg,rgba(14,29,74,0.18),rgba(65,104,225,0.12),rgba(99,137,255,0.18))] shadow-[0_24px_70px_-40px_rgba(14,29,74,0.6)]">
              <div className="relative h-full rounded-3xl bg-white/90 backdrop-blur-sm border border-white/60 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_22px_60px_-26px_rgba(14,29,74,0.55)] group-hover:border-brand-200">
                <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-brand-500 via-brand-300 to-brand-500 opacity-60" />
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(120deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] text-white font-semibold shadow-[0_12px_30px_-12px_rgba(14,29,74,0.55)] ring-4 ring-brand-50 ring-offset-2 ring-offset-white group-hover:bg-[position:100%_0] transition-all">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] text-brand-600">Paso {s.n}</p>
                    <h3 className="text-base font-semibold text-slate-900">{s.title}</h3>
                  </div>
                </div>
                <p className="mt-3 text-slate-700 leading-relaxed">{s.text}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-brand-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" aria-hidden />
                  Entregable listo antes de pasar al siguiente paso
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex gap-3">
          <Button as="a" href="/#contacto" variant="shine">Agenda diagnostico gratis</Button>
          <Button as="a" href="/labs" variant="ghost">Explorar Qubelia Labs</Button>
        </div>
      </Container>
    </section>
  );
}
