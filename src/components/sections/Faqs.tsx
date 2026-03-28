"use client";

import React, { useState } from "react";
import Container from "@/components/common/Container";
import { CONTACT } from "@/config/contact";
import { faqItems } from "@/content/faqs";

export { faqItems };

export default function Faqs() {
  const [selected, setSelected] = useState<string>(faqItems[0].id);
  const active = faqItems.find((f) => f.id === selected) ?? faqItems[0];

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-10 dark:opacity-15 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.15) 0%, rgba(129,140,248,0.08) 50%, transparent 70%)" }}
        />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">

          {/* ── Left: nav ── */}
          <div className="space-y-6">
            <div>
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
                FAQ
              </div>
              <h2 id="faqs-title" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl">
                Lo que preguntáis{" "}
                <span className="gradient-text-static">antes de contratar</span>
              </h2>
              <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm">
                Preguntas reales de compra B2B, con respuestas sin rodeos.
              </p>
            </div>

            {/* Question list */}
            <nav aria-label="FAQ navigation">
              <ul className="space-y-1">
                {faqItems.map((f) => {
                  const isActive = f.id === selected;
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        onClick={() => setSelected(f.id)}
                        className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                          isActive
                            ? "bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20"
                            : "border border-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03] hover:border-slate-200/80 dark:hover:border-white/[0.06]"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span className="text-base flex-shrink-0" aria-hidden>{f.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] mb-0.5 ${isActive ? "text-sky-600 dark:text-sky-400" : "text-slate-400 dark:text-slate-500"}`}>
                            {f.category}
                          </span>
                          <span className={`block text-sm font-medium leading-snug truncate ${isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-300"}`}>
                            {f.q}
                          </span>
                        </div>
                        {isActive && (
                          <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* "More questions" card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">¿Tienes más dudas?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Respuesta en menos de 24 h laborables.</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 px-4 py-2 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-500/15 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                Escribir un email
              </a>
            </div>
          </div>

          {/* ── Right: answer panel ── */}
          <div
            className="rounded-2xl p-[1px] transition-all duration-300"
            style={{ background: "linear-gradient(135deg, rgba(56,189,248,0.35), rgba(14,165,233,0.08) 45%, rgba(129,140,248,0.28))" }}
          >
            <div className="h-full rounded-2xl bg-white dark:bg-[#070E22] p-8 lg:p-10">
              {/* Category + icon */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 flex-shrink-0"
                  aria-hidden
                >
                  {active.icon}
                </span>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-3 py-1 text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-sky-400" />
                    {active.category}
                  </span>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-snug mb-4">
                {active.q}
              </h3>

              {/* Accent line */}
              <div className="h-px w-16 mb-6" style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.6), transparent)" }} />

              {/* Answer */}
              <p className="text-slate-500 dark:text-slate-300 leading-relaxed text-[15px]">
                {active.a}
              </p>

              {/* Navigation hint */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <span className="text-xs text-slate-400 dark:text-slate-600">
                  {faqItems.findIndex((f) => f.id === selected) + 1} / {faqItems.length}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const idx = faqItems.findIndex((f) => f.id === selected);
                      if (idx > 0) setSelected(faqItems[idx - 1].id);
                    }}
                    disabled={faqItems.findIndex((f) => f.id === selected) === 0}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 hover:border-sky-300 dark:hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white dark:bg-white/[0.02]"
                    aria-label="Pregunta anterior"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const idx = faqItems.findIndex((f) => f.id === selected);
                      if (idx < faqItems.length - 1) setSelected(faqItems[idx + 1].id);
                    }}
                    disabled={faqItems.findIndex((f) => f.id === selected) === faqItems.length - 1}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-white/[0.08] text-slate-400 dark:text-slate-500 hover:border-sky-300 dark:hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-white dark:bg-white/[0.02]"
                    aria-label="Pregunta siguiente"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
