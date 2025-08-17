import React from "react";
import Container from "@/components/common/Container";
import cases from "@/content/cases.json";
import testimonials from "@/content/testimonials.json";
import Reveal from "@/components/common/Reveal";

export default function Results() {
  return (
    <section id="resultados" aria-labelledby="results-title" className="py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 id="results-title" className="text-3xl font-bold tracking-tight">Resultados y experiencias de clientes</h2>
          <p className="mt-2 text-slate-700">Transparencia ante todo: medimos el antes y el después, y publicamos solo con permiso.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.client} delay={i * 0.05}>
              <article className="rounded-2xl border border-slate-200 p-6 shadow-card bg-white">
                <header className="flex items-baseline justify-between">
                  <h3 className="text-lg font-semibold">{c.client} <span className="text-slate-500 text-sm">· {c.sector}</span></h3>
                  <span className="text-sm text-slate-600">{c.period}</span>
                </header>
                <p className="mt-2 text-slate-700">{c.challenge}</p>
                <ul className="mt-3 list-disc pl-5 text-slate-700">
                  {c.highlights.map((h: string) => (<li key={h}>{h}</li>))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="relative rounded-2xl border border-slate-200 p-6 bg-white shadow-card">
                <svg aria-hidden className="absolute -top-3 -left-3 h-10 w-10 text-brand-200" viewBox="0 0 24 24" fill="currentColor"><path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V22h8v-8H6.5c0-3 2.67-3.5 3.67-3.5V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V22h8v-8h-3.5c0-3 2.67-3.5 3.67-3.5V6h-3Z"/></svg>
                <blockquote className="text-slate-800 relative">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-3 text-sm text-slate-700">{t.name} · {t.role}{t.company ? ` · ${t.company}` : ""}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
