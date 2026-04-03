"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";

const STEPS = [
  {
    step: "01",
    title: "Diagnóstico funcional",
    description: "Entendemos proceso, riesgos, actores y puntos de fricción. Definimos qué merece construirse y qué no.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Alcance y arquitectura",
    description: "Módulos, integraciones, seguridad, roadmap de releases y prioridades de negocio claras antes de escribir código.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Entrega iterativa",
    description: "Sprints quincenales con demos reales. Liberamos por bloques utilizables con feedback del equipo y QA.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
      </svg>
    ),
  },
  {
    step: "04",
    title: "Producción y evolución",
    description: "Acompañamos el go-live, medimos uso real y priorizamos mejoras con datos, no con intuición.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
];

export default function Methodology() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="metodologia"
      aria-labelledby="method-title"
      className="relative scroll-mt-28 py-24 lg:py-32"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Metodología
          </span>
          <h2 id="method-title" className="text-h2 mt-4 mb-6" style={{ color: "var(--text-primary)" }}>
            Del diagnóstico al{" "}
            <span className="gradient-text-static">resultado medible</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Un proceso claro en cuatro fases. Sin sorpresas, sin estimaciones al aire,
            con entregables reales desde la primera semana.
          </p>
        </motion.div>

        {/* Two-column layout: Image + Steps */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Process image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/methodology-visual.png"
                alt="Proceso de trabajo de Qubelia en cuatro fases"
                width={800}
                height={450}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[--bg-page] via-transparent to-transparent opacity-40" />
            </div>
            <div className="absolute -inset-4 bg-brand-500/[0.05] rounded-3xl blur-[60px] -z-10" />
          </motion.div>

          {/* Right: Steps */}
          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                className="group relative flex gap-5 p-5 rounded-xl transition-all duration-400 hover:bg-brand-500/[0.04] hover:border-brand-500/10 border border-transparent"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/15 group-hover:border-brand-500/30 group-hover:shadow-glow-sm transition-all">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-brand-400/60 tracking-widest">{step.step}</span>
                    <div className="h-px flex-1 bg-brand-500/10" />
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-brand-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
