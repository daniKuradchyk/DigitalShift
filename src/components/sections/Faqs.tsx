import React from "react";
import Container from "@/components/common/Container";

export const faqItems = [
  { q: "¿Cuánto cuesta una app a medida?", a: "Depende del alcance y riesgos. Un MVP típico ronda X–Y € y 8–10 semanas. Proyectos de transformación con integraciones varían según sistemas y automatizaciones." },
  { q: "¿Plazos habituales de un MVP?", a: "8–10 semanas con sprints quincenales, entregas continuas y foco en un mínimo viable útil." },
  { q: "¿Incluye analítica/SEO?", a: "Sí. Instrumentamos eventos clave (GA4) y cuidamos rendimiento/SEO técnico básico. Opciones avanzadas bajo solicitud." },
  { q: "¿Quién es propietario del código?", a: "Tú. Entregamos repositorios, accesos, manuales y formación para que no dependas de nosotros." },
  { q: "¿Qué pasa tras el lanzamiento?", a: "Ofrecemos soporte y evolución con SLOs. También podemos formar a tu equipo interno." },
];

export default function Faqs() {
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="py-20 bg-slate-50">
      <Container>
        <div className="max-w-2xl">
          <h2 id="faqs-title" className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <p className="mt-2 text-slate-700">Dudas comunes sobre costes, plazos, propiedad del código y soporte.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {faqItems.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
              <summary className="cursor-pointer list-none font-semibold flex items-center justify-between text-slate-900">
                <span>{f.q}</span>
                <span aria-hidden className="ml-3 h-5 w-5 rounded-full border border-slate-300 grid place-items-center text-slate-600 group-open:rotate-45 transition">+</span>
              </summary>
              <p className="mt-3 text-slate-700">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
