"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/common/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  title: string;
  text: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function FinalCta({ title, text, secondaryHref, secondaryLabel }: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.section
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-blue-400/10 bg-blue-500/[0.04] p-8 sm:p-12"
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(65,105,225,0.12), transparent 40%), radial-gradient(circle at 80% 70%, rgba(91,141,239,0.08), transparent 40%)",
        }}
      />

      {/* Accent line top */}
      <motion.div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.50), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
      />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <motion.p
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
          >
            Siguiente paso
          </motion.p>
          <motion.h2
            className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mt-3 max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
          >
            {text}
          </motion.p>
        </div>

        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <Button as="a" href="/#contacto" variant="shine">
            Agendar diagnóstico
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button as="a" href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
          ) : null}
        </motion.div>
      </div>
    </motion.section>
  );
}
