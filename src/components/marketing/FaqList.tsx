"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { ServiceFaq } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FaqList({ items }: { items: ServiceFaq[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div ref={ref} className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <motion.div
            key={item.q}
            className="group card-glass overflow-hidden rounded-2xl transition-all"
            style={{ borderColor: isOpen ? "rgba(65,105,225,0.20)" : undefined }}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
          >
            {/* Accent line top */}
            <div
              className="h-px transition-opacity duration-300"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.40), transparent)",
                opacity: isOpen ? 1 : 0,
              }}
            />

            <button
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                {item.q}
              </span>
              <motion.span
                className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-blue-400/20 text-blue-400 text-sm"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 max-w-3xl text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
