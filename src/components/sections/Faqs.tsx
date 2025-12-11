"use client";

import React, { useState } from "react";
import Container from "@/components/common/Container";

type FaqItem = { id: string; q: string; a: string; meta?: string; icon: string };

export const faqItems: FaqItem[] = [
  {
    id: "coste",
    q: "¿Cuánto cuesta una app a medida?",
    a: "Depende del alcance y riesgos. Un MVP típico arranca en X–Y € y tarda 8–10 semanas. Proyectos con integraciones suben según sistemas y automatizaciones.",
    meta: "Costes y plazos",
    icon: "💰",
  },
  {
    id: "plazos",
    q: "¿Plazos habituales de un MVP?",
    a: "8–10 semanas con sprints quincenales, entregas continuas y foco en un mínimo viable útil.",
    meta: "Time-to-market",
    icon: "⏱️",
  },
  {
    id: "analitica",
    q: "¿Incluye analítica/SEO?",
    a: "Sí. Instrumentamos eventos clave (GA4) y cuidamos rendimiento/SEO técnico básico. Opciones avanzadas bajo solicitud.",
    meta: "Datos y SEO",
    icon: "📊",
  },
  {
    id: "propiedad",
    q: "¿Quién es propietario del código?",
    a: "Tú. Entregamos repositorios, accesos, manuales y formación para que no dependas de nosotros.",
    meta: "Propiedad",
    icon: "🗝️",
  },
  {
    id: "post-lanzamiento",
    q: "¿Qué pasa tras el lanzamiento?",
    a: "Ofrecemos soporte y evolución con SLOs. También podemos formar a tu equipo interno.",
    meta: "Soporte",
    icon: "🛟",
  },
  {
    id: "procesos",
    q: "¿Cómo garantizáis calidad y seguridad?",
    a: "Revisiones de código, checklist OWASP básico, CI con tests y despliegues controlados. Accesos, logs y backups bajo buenas prácticas.",
    meta: "Calidad y seguridad",
    icon: "🛡️",
  },
];

export default function Faqs() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="relative overflow-hidden py-20 bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-brand-300/20 blur-3xl" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="max-w-3xl space-y-3">
          <h2 id="faqs-title" className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <p className="text-slate-700">Dudas habituales sobre costes, plazos, analítica, propiedad y soporte continuo.</p>
        </div>

        <div className="mt-10 columns-1 lg:columns-2 gap-6 [column-fill:_balance]">
          {faqItems.map((f, index) => {
            const isOpen = f.id === openId;
            const panelId = `${f.id}-panel`;

            return (
              <div
                key={f.id}
                className={`group relative mb-6 break-inside-avoid rounded-3xl p-[1px] bg-[radial-gradient(circle_at_10%_10%,rgba(99,137,255,0.22),transparent_40%),radial-gradient(circle_at_90%_0%,rgba(14,29,74,0.22),transparent_40%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.14),rgba(99,137,255,0.18))] shadow-[0_24px_70px_-44px_rgba(14,29,74,0.55)] transition duration-300 hover:-translate-y-1 ${isOpen ? "scale-[1.01]" : ""}`}
              >
                <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-brand-500/80 via-brand-300/80 to-brand-500/80 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-within:opacity-100" aria-hidden />

                <button
                  type="button"
                  className="flex w-full items-start gap-4 text-left focus:outline-none rounded-3xl bg-white/90 backdrop-blur-sm border border-white/60 p-6 transition-all duration-300 group-hover:shadow-[0_22px_60px_-30px_rgba(14,29,74,0.6)] focus-visible:ring-2 focus-visible:ring-brand-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  onClick={() => setOpenId(f.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span
                    className={`relative flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-base transition ${isOpen ? "bg-[linear-gradient(120deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] text-white ring-2 ring-brand-200" : "bg-brand-50 text-brand-700 ring-1 ring-brand-100 group-hover:bg-brand-100"}`}
                    aria-hidden
                  >
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition" />
                    <span className="relative shadow-[0_12px_30px_-12px_rgba(14,29,74,0.5)]">
                      {f.icon}
                    </span>
                  </span>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-xs uppercase tracking-[0.08em] text-brand-600">Pregunta</p>
                        <p className="text-base font-semibold text-slate-900">{f.q}</p>
                        {f.meta && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[11px] font-semibold text-brand-700 border border-brand-100">
                            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                            {f.meta}
                          </span>
                        )}
                      </div>
                      <span
                        aria-hidden
                        className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold transition duration-200 ${isOpen ? "rotate-45 border-brand-200 bg-brand-50 text-brand-600 shadow-sm" : "border-brand-100 bg-white text-slate-600 group-hover:border-brand-200 group-hover:text-brand-600"}`}
                      >
                        +
                      </span>
                    </div>

                    <div
                      id={panelId}
                      role="region"
                      aria-live="polite"
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden pt-3 text-sm leading-relaxed text-slate-700">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
