import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";

const services = [
  {
    title: "Landing pages de alto rendimiento",
    desc: "Diseñadas para campañas y validaciones rápidas. Copy y analítica listos desde el día uno.",
    bullets: [
      "Arquitectura orientada a conversión",
      "Copy SEO + pruebas sociales",
      "Rendimiento y accesibilidad",
    ],
    Icon: LandingIcon,
  },
  {
    title: "Web corporativa que genera confianza",
    desc: "Estructura clara, mensajes precisos y diseño accesible para transmitir solvencia.",
    bullets: [
      "Mapa de contenidos y UX",
      "Componentes reutilizables",
      "Medición y eventos clave",
    ],
    Icon: WebsiteIcon,
  },
  {
    title: "Marketing digital orientado a resultados",
    desc: "SEO on-page, analítica y soporte en campañas para captar demanda cualificada.",
    bullets: [
      "SEO técnico y contenidos",
      "Tracking limpio (GA4/GSC)",
      "Iteración basada en datos",
    ],
    Icon: MarketingIcon,
  },
];

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 id="services-title" className="text-3xl font-bold tracking-tight">Servicios</h2>
          <p className="mt-2 text-slate-700">Soluciones ajustadas a tus objetivos: de la captación directa a la confianza de marca.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-brand-600/60 via-slate-200 to-emerald-600/60 shadow-card">
                <div className="rounded-2xl bg-white p-6 h-full">
                  <s.Icon />
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-slate-700">{s.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span aria-hidden className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-600" />
                        <span className="text-slate-700">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button as="a" href="#contacto" variant="shine">Solicitar propuesta</Button>
                  </div>
                </div>
                <div aria-hidden className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition shadow-glow" />
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LandingIcon() {
  return (
    <svg aria-hidden className="h-10 w-10 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 8h10M7 12h6M7 16h4" />
    </svg>
  );
}
function WebsiteIcon() {
  return (
    <svg aria-hidden className="h-10 w-10 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M2 8h20M6 12h6M6 16h10" />
    </svg>
  );
}
function MarketingIcon() {
  return (
    <svg aria-hidden className="h-10 w-10 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 11h4l4-4 4 10 4-6h2" />
      <circle cx="4" cy="19" r="2" />
    </svg>
  );
}