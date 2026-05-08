"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import { faqItems } from "@/content/faqs";

export { faqItems };

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Group FAQs by category ─────────────────────────────────────── */
const CATEGORIES = Array.from(new Set(faqItems.map((f) => f.category)));

/* ═══════════════════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════════════════════════════ */
function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
  inView,
}: {
  faq: (typeof faqItems)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  inView: boolean;
}) {
  const delay = 0.08 + index * 0.04;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="group"
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left flex items-start gap-4 py-4 sm:py-5 transition-all duration-300"
        aria-expanded={isOpen}
      >
        {/* Animated icon */}
        <span
          className="flex-shrink-0 mt-1 w-6 h-6 rounded-md flex items-center justify-center transition-all duration-400"
          style={{
            background: isOpen ? "rgba(65,105,225,0.15)" : "rgba(65,105,225,0.05)",
            border: `1px solid ${isOpen ? "rgba(65,105,225,0.3)" : "rgba(65,105,225,0.08)"}`,
          }}
        >
          <svg
            className="w-3 h-3 transition-transform duration-400"
            style={{
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              color: isOpen ? "rgb(96,165,250)" : "var(--text-muted)",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>

        <div className="flex-1 min-w-0">
          <span
            className="text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-300 block"
            style={{ color: isOpen ? "var(--text-primary)" : "var(--text-secondary)" }}
          >
            {faq.q}
          </span>

          {/* Category tag */}
          <span
            className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-full px-2 py-0.5 transition-opacity duration-300"
            style={{
              background: "rgba(65,105,225,0.06)",
              color: "rgba(96,165,250,0.5)",
              opacity: isOpen ? 0 : 1,
            }}
          >
            {faq.category}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pl-10 pb-5 pr-4">
              <p
                className="text-sm leading-[1.8]"
                style={{ color: "var(--text-secondary)" }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      <div
        className="h-px transition-colors duration-400"
        style={{
          background: isOpen
            ? "linear-gradient(90deg, rgba(65,105,225,0.2), rgba(65,105,225,0.06))"
            : "rgba(65,105,225,0.05)",
        }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN FAQ SECTION — Independent, professional
   ═══════════════════════════════════════════════════════════════════ */
export default function Faqs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  /* Split FAQs into two columns */
  const mid = Math.ceil(faqItems.length / 2);
  const leftFaqs = faqItems.slice(0, mid);
  const rightFaqs = faqItems.slice(mid);

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faqs-title"
      className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            transformOrigin: "center",
            background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.2), transparent)",
          }}
        />
        {/* Subtle ambient glow */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
          style={{ background: "rgba(65,105,225,1)" }}
        />
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Preguntas frecuentes
            </span>
          </motion.div>

          <motion.h2
            id="faqs-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Las dudas reales,{" "}
            <span className="gradient-text-static">sin marketing</span>.
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Lo que preguntan los directivos antes de firmar. IA, presupuesto,
            plazos, propiedad del código. Respuestas directas, no folleto.
          </motion.p>

          {/* Category pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
                style={{
                  background: "rgba(65,105,225,0.05)",
                  border: "1px solid rgba(65,105,225,0.1)",
                  color: "rgba(96,165,250,0.6)",
                }}
              >
                {cat}
              </span>
            ))}
          </motion.div>
        </div>

        {/* ── Two-column FAQ grid ── */}
        <div className="grid md:grid-cols-2 gap-x-8 lg:gap-x-14 gap-y-0 max-w-5xl mx-auto">
          {/* Left column */}
          <div>
            {leftFaqs.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? "" : faq.id)}
                index={i}
                inView={inView}
              />
            ))}
          </div>

          {/* Right column */}
          <div>
            {rightFaqs.map((faq, i) => (
              <FaqItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? "" : faq.id)}
                index={i + mid}
                inView={inView}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-12 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <div
            className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 sm:px-6 sm:py-3"
            style={{
              background: "rgba(65,105,225,0.04)",
              border: "1px solid rgba(65,105,225,0.1)",
            }}
          >
            <span
              className="text-sm sm:text-base font-medium"
              style={{ color: "var(--text-secondary)" }}
            >
              ¿Tienes otra pregunta?
            </span>
            <a
              href="#contacto"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Escríbenos
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
