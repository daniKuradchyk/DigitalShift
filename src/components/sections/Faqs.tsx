"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Container from "@/components/common/Container";
import { faqItems } from "@/content/faqs";

export { faqItems };

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════════════════════════════ */
function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqItems)[number];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#9DA0A6]">
            {faq.category}
          </span>
          <span className="mt-1.5 block text-base font-medium leading-snug text-[#101014]">
            {faq.q}
          </span>
        </span>

        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-[#63666D] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 pr-10 text-[15px] leading-relaxed text-[#3D4046]">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CIERRE — pregunta abierta
   ═══════════════════════════════════════════════════════════════════ */
function AskMore() {
  return (
    <>
      <p className="text-[15px] text-[#3D4046]">¿Tienes otra pregunta?</p>
      <a
        href="#contacto"
        className="group mt-2 inline-flex items-center gap-2 text-sm font-medium text-[#101014]"
      >
        <span className="border-b border-[#C9CCD3] transition-colors duration-200 group-hover:border-brand-600 group-hover:text-brand-600">
          Escríbenos
        </span>
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN FAQ SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Faqs() {
  const [openId, setOpenId] = useState<string>(faqItems[0].id);

  return (
    <section
      id="faq"
      aria-labelledby="faqs-title"
      className="scroll-mt-24 border-t border-[#E4E6EA] bg-[#F5F6F8] py-20 sm:py-24 md:py-28"
    >
      <Container>
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* ── Header ── */}
          <div className="col-span-12 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="animate-fade-up">
                <p className="section-tag mb-5 sm:mb-6">Preguntas frecuentes</p>
              </div>

              <h2 id="faqs-title" className="text-h2 animate-fade-up delay-100">
                Las dudas reales, sin marketing.
              </h2>

              <p className="mt-5 max-w-xl text-[15px] sm:text-base leading-relaxed text-[#3D4046] animate-fade-up delay-200">
                Lo que preguntan los directivos antes de firmar. IA, presupuesto,
                plazos, propiedad del código. Respuestas directas, no folleto.
              </p>

              <div className="mt-8 hidden border-t border-[#E4E6EA] pt-6 lg:block animate-fade-up delay-300">
                <AskMore />
              </div>
            </div>
          </div>

          {/* ── Acordeón ── */}
          <div className="col-span-12 lg:col-span-8">
            <div className="divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
              {faqItems.map((faq, i) => (
                <FaqItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => setOpenId(openId === faq.id ? "" : faq.id)}
                  index={i}
                />
              ))}
            </div>

            <div className="mt-8 lg:hidden animate-fade-up delay-300">
              <AskMore />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
