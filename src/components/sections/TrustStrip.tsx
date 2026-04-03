"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";

/* ─── Shared easing ─────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const PRINCIPLES = [
  {
    title: "Stack estable",
    description: "Next.js, TypeScript, PostgreSQL. Tecnología probada que no caduca en 6 meses.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
      </svg>
    ),
  },
  {
    title: "Criterio de producción",
    description: "CI/CD, tests, monitoring. Lo que entregamos funciona en real, no solo en demo.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Sin dependencia",
    description: "El código es tuyo. Repositorio, documentación y autonomía desde el día uno.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Base mantenible",
    description: "Código limpio y documentado que tu equipo (o cualquier otro) puede mantener.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-labelledby="trust-title"
      className="relative py-16 sm:py-20 md:py-24 overflow-hidden"
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
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Principios
            </span>
          </motion.div>

          <motion.h2
            id="trust-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Criterio de producción.{" "}
            <span className="gradient-text-static">Sin atajos.</span>
          </motion.h2>
        </div>

        {/* ── Principles grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={i}
              className="group relative rounded-xl p-5 sm:p-6 transition-all duration-500 hover:bg-blue-500/[0.04]"
              style={{
                background: "linear-gradient(180deg, rgba(10,17,40,0.6), rgba(6,11,26,0.4))",
                borderWidth: "1px",
                borderColor: "rgba(65,105,225,0.08)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: EASE }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-400 group-hover:scale-110"
                style={{
                  background: "rgba(65,105,225,0.08)",
                  border: "1px solid rgba(65,105,225,0.15)",
                  color: "var(--accent-light)",
                }}
              >
                {p.icon}
              </div>

              {/* Title */}
              <h3
                className="text-sm sm:text-base font-bold mb-2 group-hover:text-blue-300 transition-colors duration-400"
                style={{ color: "var(--text-primary)" }}
              >
                {p.title}
              </h3>

              {/* Description */}
              <p
                className="text-xs sm:text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)", opacity: 0.85 }}
              >
                {p.description}
              </p>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(65,105,225,0.2)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
