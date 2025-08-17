import React from "react";
import Container from "@/components/common/Container";

export const faqItems = [
  { q: "¿Cuánto cuesta un proyecto?", a: "Trabajamos por hitos con precio cerrado según alcance. Tras el diagnóstico inicial, te enviamos una propuesta detallada." },
  { q: "¿Plazos habituales?", a: "Entre 2 y 6 semanas según tamaño y contenidos. Priorizamos un mínimo viable para acelerar resultados." },
  { q: "¿Incluye SEO?", a: "Sí: arquitectura, copy y SEO on-page básicos. Opciones avanzadas bajo solicitud." },
  { q: "¿Necesito preparar contenidos?", a: "Te guiamos con guiones y entrevistas. Nosotros redactamos y tú validas para no frenar el proyecto." },
  { q: "¿Seré dependiente de la agencia?", a: "No. Entregamos accesos, manual y formación breve. El sitio queda a tu nombre." },
];

export default function Faqs() {
  return (
    <section id="faqs" aria-labelledby="faqs-title" className="py-20 bg-slate-50">
      <Container>
        <div className="max-w-2xl">
          <h2 id="faqs-title" className="text-3xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <p className="mt-2 text-slate-700">Resolvemos dudas comunes sobre costes, plazos, contenidos y propiedad.</p>
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