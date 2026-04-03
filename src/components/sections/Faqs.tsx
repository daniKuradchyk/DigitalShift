"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import { CONTACT } from "@/config/contact";
import { faqItems } from "@/content/faqs";

export { faqItems };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Faqs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<string>(faqItems[0].id);
  const active = faqItems.find((f) => f.id === selected) ?? faqItems[0];

  return (
    <section ref={ref} id="faq" aria-labelledby="faqs-title" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15 blur-3xl" style={{ background: "radial-gradient(ellipse, rgba(65,105,225,0.12) 0%, rgba(91,141,239,0.06) 50%, transparent 70%)" }} />
      </div>

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          {/* Left: nav */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div>
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
                FAQ
              </div>
              <h2 id="faqs-title" className="text-h2" style={{ color: "var(--text-primary)" }}>
                Lo que preguntáis{" "}
                <span className="gradient-text-static">antes de contratar</span>
              </h2>
              <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
                Preguntas reales de compra B2B, con respuestas sin rodeos.
              </p>
            </div>

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
                            ? "bg-brand-500/10 border border-brand-400/20"
                            : "border border-transparent hover:bg-brand-500/[0.04] hover:border-brand-400/10"
                        }`}
                        aria-pressed={isActive}
                      >
                        <span className="text-base flex-shrink-0" aria-hidden>{f.icon}</span>
                        <div className="flex-1 min-w-0">
                          <span className={`block text-[10px] font-semibold uppercase tracking-[0.14em] mb-0.5 ${isActive ? "text-brand-400" : "text-brand-400/50"}`}>
                            {f.category}
                          </span>
                          <span className={`block text-sm font-medium leading-snug truncate ${isActive ? "text-white" : ""}`} style={isActive ? {} : { color: "var(--text-secondary)" }}>
                            {f.q}
                          </span>
                        </div>
                        {isActive && <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="rounded-2xl border border-brand-400/10 bg-brand-500/[0.04] p-5">
              <p className="text-sm font-bold mb-1" style={{ color: "var(--text-primary)" }}>¿Tienes más dudas?</p>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>Respuesta en menos de 24 h laborables.</p>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2 rounded-xl bg-brand-500/10 border border-brand-400/20 px-4 py-2 text-xs font-semibold text-brand-400 hover:bg-brand-500/15 transition-colors">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                Escribir un email
              </a>
            </div>
          </motion.div>

          {/* Right: answer panel */}
          <motion.div
            className="rounded-2xl p-[1px] transition-all duration-300"
            style={{ background: "linear-gradient(135deg, rgba(65,105,225,0.35), rgba(91,141,239,0.12) 45%, rgba(133,162,255,0.20))" }}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <div className="h-full rounded-2xl bg-[#0A1128] p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl border border-brand-400/15 bg-brand-500/10 flex-shrink-0" aria-hidden>
                  {active.icon}
                </span>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-400/15 bg-brand-500/[0.06] px-3 py-1 text-[10px] font-semibold text-brand-400">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-brand-400" />
                    {active.category}
                  </span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <h3 className="text-xl font-bold leading-snug mb-4" style={{ color: "var(--text-primary)" }}>{active.q}</h3>
                  <div className="h-px w-16 mb-6" style={{ background: "linear-gradient(90deg, rgba(65,105,225,0.6), transparent)" }} />
                  <p className="leading-relaxed text-[15px]" style={{ color: "var(--text-secondary)" }}>{active.a}</p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-brand-400/8 flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {faqItems.findIndex((f) => f.id === selected) + 1} / {faqItems.length}
                </span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => { const idx = faqItems.findIndex((f) => f.id === selected); if (idx > 0) setSelected(faqItems[idx - 1].id); }} disabled={faqItems.findIndex((f) => f.id === selected) === 0} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-400/10 hover:border-brand-400/25 hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-brand-500/[0.04]" style={{ color: "var(--text-muted)" }} aria-label="Pregunta anterior">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button type="button" onClick={() => { const idx = faqItems.findIndex((f) => f.id === selected); if (idx < faqItems.length - 1) setSelected(faqItems[idx + 1].id); }} disabled={faqItems.findIndex((f) => f.id === selected) === faqItems.length - 1} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-brand-400/10 hover:border-brand-400/25 hover:text-brand-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all bg-brand-500/[0.04]" style={{ color: "var(--text-muted)" }} aria-label="Pregunta siguiente">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
