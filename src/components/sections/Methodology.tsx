"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Steps data with images ───────────────────────────────────── */
const STEPS = [
  {
    id: 0,
    step: "01",
    title: "Diagnóstico funcional",
    subtitle: "Entendemos antes de construir",
    description:
      "Analizamos proceso, riesgos, actores y puntos de fricción. Definimos qué merece construirse, qué no, y por qué.",
    image: "/images/phase-01-diagnosis.png",
    accentRgb: "91,141,239",
  },
  {
    id: 1,
    step: "02",
    title: "Alcance y arquitectura",
    subtitle: "Diseño antes que código",
    description:
      "Módulos, integraciones, seguridad, roadmap de releases y prioridades de negocio claras antes de escribir una línea.",
    image: "/images/phase-02-architecture.png",
    accentRgb: "65,105,225",
  },
  {
    id: 2,
    step: "03",
    title: "Entrega iterativa",
    subtitle: "Sprints con demos reales",
    description:
      "Sprints quincenales con demos funcionales. Liberamos por bloques utilizables con feedback del equipo y QA continua.",
    image: "/images/phase-03-delivery.png",
    accentRgb: "133,162,255",
  },
  {
    id: 3,
    step: "04",
    title: "Producción y evolución",
    subtitle: "Acompañamiento post-lanzamiento",
    description:
      "Acompañamos el go-live, medimos uso real y priorizamos mejoras con datos, no con intuición.",
    image: "/images/phase-04-evolution.png",
    accentRgb: "173,193,255",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   STEP SELECTOR — clickable step with active state
   ═══════════════════════════════════════════════════════════════════ */
function StepItem({
  step,
  isActive,
  onClick,
  inView,
  index,
}: {
  step: (typeof STEPS)[number];
  isActive: boolean;
  onClick: () => void;
  inView: boolean;
  index: number;
}) {
  const delay = 0.2 + index * 0.1;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={`group relative w-full text-left transition-all duration-500 rounded-xl p-4 sm:p-5 ${
        isActive
          ? "bg-blue-500/[0.06] border-blue-400/20"
          : "bg-transparent border-transparent hover:bg-blue-500/[0.03]"
      }`}
      style={{ borderWidth: "1px" }}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {/* Active indicator bar */}
      <motion.div
        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
        style={{ background: `rgba(${step.accentRgb}, 0.8)` }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      <div className="flex items-start gap-3 sm:gap-4">
        {/* Step number */}
        <span
          className="text-xs sm:text-sm font-mono font-bold mt-0.5 transition-colors duration-400 shrink-0"
          style={{
            color: isActive ? `rgba(${step.accentRgb}, 1)` : "var(--text-muted)",
          }}
        >
          {step.step}
        </span>

        <div className="min-w-0 flex-1">
          {/* Title */}
          <h3
            className="text-sm sm:text-base font-bold mb-0.5 transition-colors duration-400"
            style={{
              color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
            }}
          >
            {step.title}
          </h3>

          {/* Description — only visible when active */}
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.p
                className="text-xs sm:text-sm leading-relaxed mt-1.5"
                style={{ color: "var(--text-secondary)" }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {step.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar at bottom — auto-advances */}
      {isActive && (
        <motion.div
          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `rgba(${step.accentRgb}, 0.5)` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: "linear" }}
            onAnimationComplete={onClick}
          />
        </motion.div>
      )}
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN METHODOLOGY SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeStep, setActiveStep] = useState(0);

  const handleAdvance = () => {
    setActiveStep((prev) => (prev + 1) % STEPS.length);
  };

  const currentStep = STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      id="metodologia"
      aria-labelledby="method-title"
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
      </div>

      <Container className="relative">
        {/* ── Section header ── */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Metodología
            </span>
          </motion.div>

          <motion.h2
            id="method-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Primero pensar.{" "}
            <span className="gradient-text-static">Después construir</span>.
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Cuatro fases pensadas para empresas que ya han pagado el coste de
            decidir rápido. Si algo no merece construirse, lo decimos antes de
            cobrar la primera hora.
          </motion.p>
        </div>

        {/* ── Two-column: Steps + Image ── */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* ── Left: Step selectors ── */}
          <div className="space-y-1 order-2 lg:order-1">
            {STEPS.map((step, i) => (
              <StepItem
                key={step.id}
                step={step}
                isActive={activeStep === i}
                onClick={() => setActiveStep(i)}
                inView={inView}
                index={i}
              />
            ))}
          </div>

          {/* ── Right: Image that changes with active step ── */}
          <motion.div
            className="relative order-1 lg:order-2 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10]" style={{ background: "var(--bg-card-solid)" }}>
              {/* Image crossfade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Image
                    src={currentStep.image}
                    alt={currentStep.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Bottom gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060B1A]/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Step info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold tracking-widest"
                      style={{ color: `rgba(${currentStep.accentRgb}, 0.9)` }}
                    >
                      FASE {currentStep.step}
                    </span>
                    <h3
                      className="text-base sm:text-lg font-bold mt-0.5"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {currentStep.subtitle}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Border */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-all duration-500"
                style={{
                  border: `1px solid rgba(${currentStep.accentRgb}, 0.15)`,
                  boxShadow: `0 0 60px rgba(${currentStep.accentRgb}, 0.06)`,
                }}
              />
            </div>

            {/* Step indicators below image */}
            <div className="flex justify-center gap-2 mt-4">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-400"
                  style={{
                    width: activeStep === i ? "2rem" : "0.75rem",
                    background: activeStep === i
                      ? `rgba(${s.accentRgb}, 0.6)`
                      : "rgba(65,105,225,0.15)",
                  }}
                  aria-label={`Fase ${s.step}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
