"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { ServiceFaq } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function FaqList({ items }: { items: ServiceFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div
            key={item.q}
            className="animate-fade-up"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <button
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="text-base font-medium leading-snug text-[#101014]">
                {item.q}
              </span>
              {isOpen ? (
                <Minus className="h-5 w-5 shrink-0 text-[#101014]" aria-hidden />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-[#101014]" aria-hidden />
              )}
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
                  <p className="max-w-3xl pb-5 text-sm leading-relaxed text-[#3D4046]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
