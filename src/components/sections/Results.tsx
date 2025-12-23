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
          <h2 id="results-title" className="text-3xl font-bold tracking-tight">Casos de exito y resultados de negocio</h2>
          <p className="mt-2 text-slate-700">Antes y despues con metricas reales de cliente.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.client + i} delay={i * 0.05}>
              <article className="group relative h-full overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_10%_20%,rgba(99,137,255,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,29,74,0.25),transparent_35%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.14),rgba(99,137,255,0.18))] shadow-[0_28px_80px_-48px_rgba(14,29,74,0.65)]">
                <div className="relative h-full rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-[0_26px_70px_-40px_rgba(14,29,74,0.65)]">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {c.client} <span className="text-slate-500 text-sm">· {c.sector}</span>
                    </h3>
                    <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-100">{c.period}</span>
                  </div>
                  <p className="mt-3 text-slate-700 leading-relaxed">{c.challenge}</p>
                  <ul className="mt-4 space-y-2">
                    {c.highlights.map((h: string, idx: number) => (
                      <li key={h} className="flex items-start gap-2">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500" />
                        <span className="text-slate-700">{h}</span>
                        <span aria-hidden className="ml-auto text-xs text-brand-500/60">#{String(idx + 1).padStart(2, "0")}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-2 text-xs text-brand-700">
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 border border-brand-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden />
                      Impacto probado
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 border border-brand-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
                      Datos cliente
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.05}>
              <figure className="relative overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_80%_20%,rgba(99,137,255,0.22),transparent_40%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.16),rgba(99,137,255,0.2))] shadow-[0_24px_70px_-44px_rgba(14,29,74,0.6)]">
                <svg aria-hidden className="absolute -top-3 -left-3 h-10 w-10 text-brand-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V22h8v-8H6.5c0-3 2.67-3.5 3.67-3.5V6H7.17Zm10 0A5.17 5.17 0 0 0 12 11.17V22h8v-8h-3.5c0-3 2.67-3.5 3.67-3.5V6h-3Z" />
                </svg>
                <div className="relative rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 p-6">
                  <blockquote className="text-slate-800 relative">"{t.quote}"</blockquote>
                  <figcaption className="mt-3 text-sm text-slate-700">
                    {t.name} · {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </figcaption>
                  <div className="mt-4 flex items-center gap-2 text-xs text-brand-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" aria-hidden />
                    Testimonio verificado
                  </div>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
