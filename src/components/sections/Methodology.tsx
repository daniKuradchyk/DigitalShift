import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";

const steps = [
  { n: 1, title: "Descubrimiento", text: "Objetivos y KPIs, usuarios, mapa de procesos y riesgos. Plan mínimo viable priorizado por impacto." },
  { n: 2, title: "Diseño & Prototipo", text: "UX/UI accesible, prototipo testeable y checklist técnico/seguridad." },
  { n: 3, title: "MVP ágil", text: "Sprints quincenales, entregas continuas y analítica de uso desde el día uno." },
  { n: 4, title: "Go-Live & Formación", text: "Despliegue, manuales, handover y gobierno básico (SLAs/SLOs)." },
  { n: 5, title: "Evolución & Soporte", text: "Roadmap trimestral, mejoras por datos y soporte según criticidad." },
];

export default function Methodology() {
  return (
    <section id="metodologia" aria-labelledby="method-title" className="py-20 bg-slate-50">
      <Container>
        <div className="max-w-2xl">
          <h2 id="method-title" className="text-3xl font-bold tracking-tight">Nuestra metodología en 5 pasos</h2>
          <p className="mt-2 text-slate-700">Proceso claro, entregables por hito y visibilidad del avance en todo momento.</p>
        </div>
        <ol className="relative mt-10 grid gap-6 lg:grid-cols-5">
          <div aria-hidden className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-emerald-600 text-white font-semibold shadow-glow">
                    {s.n}
                  </span>
                  <h3 className="text-base font-semibold">{s.title}</h3>
                </div>
                <p className="mt-3 text-slate-700">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <div className="mt-8 flex gap-3">
          <Button as="a" href="#contacto" variant="shine">Agenda diagnóstico gratis</Button>
          <Button as="a" href="/labs" variant="ghost">Explorar Qubelia Labs</Button>
        </div>
      </Container>
    </section>
  );
}
