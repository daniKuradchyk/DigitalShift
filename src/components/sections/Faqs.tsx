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
    <section id="faq" aria-labelledby="faqs-title" className="relative scroll-mt-28 overflow-hidden py-20 lg:py-28">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, rgba(192,132,252,0.06) 50%, transparent 70%)" }}
        />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">

          {/* ── Left: nav ── */}
          <div className="space-y-6">
            <div>
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                FAQ
              </div>
              <h2 id="faqs-title" className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text-primary)" }}>
                Lo que preguntáis{" "}
                <span className="gradient-text-static">antes de contratar</span>
              </h2>
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
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
                            ? "bg-violet-500/10 border border-violet-400/20"
                            : "border border-transparent hover:bg-violet-500/[0.04] hover:border-violet-400/10"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span className="text-base flex-shrink-0" aria-hidden>{f.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] mb-0.5 ${isActive ? "text-violet-400" : "text-violet-400/50"}`}>
                            {f.category}
                          </span>
                          <span className={`block text-sm font-medium leading-snug truncate ${isActive ? "text-white" : ""}`} style={isActive ? {} : { color: "var(--text-secondary)" }}>
                            {f.q}
                          </span>
                        </div>
                        {isActive && (
                          <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* "More questions" card */}
            <div className="rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] p-5">
              <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>¿Tienes más dudas?</p>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Respuesta en menos de 24 h laborables.</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-violet-500/10 border border-violet-400/20 px-4 py-2 text-xs font-semibold text-violet-400 hover:bg-violet-500/15 transition-colors"
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
            style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.35), rgba(192,132,252,0.12) 45%, rgba(103,232,249,0.20))" }}
          >
            <div className="h-full rounded-2xl bg-[#0F1117] p-8 lg:p-10">
              {/* Category + icon */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border border-violet-400/15 bg-violet-500/10 flex-shrink-0"
                  aria-hidden
                >
                  {active.icon}
                </span>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1 text-[10px] font-semibold text-violet-400">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-violet-400" />
                    {active.category}
                  </span>
                </div>
              </div>

              {/* Question */}
              <h3 className="text-xl font-bold leading-snug mb-4" style={{ color: "var(--text-primary)" }}>
                {active.q}
              </h3>

              {/* Accent line */}
              <div className="h-px w-16 mb-6" style={{ background: "linear-gradient(90deg, rgba(167,139,250,0.6), transparent)" }} />

              {/* Answer */}
              <p className="leading-relaxed text-[15px]" style={{ color: "var(--text-secondary)" }}>
                {active.a}
              </p>

              {/* Navigation hint */}
              <div className="mt-8 pt-6 border-t border-violet-400/8 flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/10 hover:border-violet-400/25 hover:text-violet-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-violet-500/[0.04]"
                    style={{ color: "var(--text-muted)" }}
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
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-violet-400/10 hover:border-violet-400/25 hover:text-violet-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-violet-500/[0.04]"
                    style={{ color: "var(--text-muted)" }}
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
