"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

/* ─── Shared easing ─────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Case data ─────────────────────────────────────────────────── */
const CASES = [
  {
    client: "Banco Santander",
    logo: "/logos/santander.svg",
    metric: "100%",
    metricLabel: "auditoría trazada",
    oneLiner: "Software interno para centralizar datos y automatizar validaciones en procesos bancarios críticos.",
    sector: "Banca",
    accent: "#EC0000",
    accentRgb: "236,0,0",
  },
  {
    client: "Unicaja Banco",
    logo: "/logos/unicaja.svg",
    metric: "−70%",
    metricLabel: "tiempo de cierre",
    oneLiner: "Automatización de reporting, validación y consolidación de datos para reducir errores manuales.",
    sector: "Banca",
    accent: "#62a24c",
    accentRgb: "98,162,76",
  },
  {
    client: "Accenture",
    logo: "/logos/accenture.svg",
    metric: "×3",
    metricLabel: "velocidad de entrega",
    oneLiner: "Software interno para coordinar equipos y estandarizar procesos de delivery técnico.",
    sector: "Consultoría",
    accent: "#A100FF",
    accentRgb: "161,0,255",
  },
  {
    client: "LF Studio",
    logo: "/logos/lfstudio.svg",
    metric: "+220%",
    metricLabel: "tráfico orgánico",
    oneLiner: "Estructura digital a medida para mejorar captación y seguimiento comercial.",
    sector: "Agencia",
    accent: "#5B8DEF",
    accentRgb: "91,141,239",
  },
];

const AUTO_INTERVAL = 6000;

/* ═══════════════════════════════════════════════════════════════════
   MAIN RESULTS SECTION — Spotlight carousel
   ═══════════════════════════════════════════════════════════════════ */
export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(idx);
    setProgress(0);
  }, []);

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % CASES.length);
    setProgress(0);
  }, []);

  /* Auto-advance */
  useEffect(() => {
    if (!inView) return;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + 100 / (AUTO_INTERVAL / 50);
      });
    }, 50);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, active, goNext]);

  const c = CASES[active];

  return (
    <section
      ref={sectionRef}
      id="resultados"
      aria-labelledby="results-title"
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
        {/* Dynamic glow that changes color with active case */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[120px]"
            style={{ background: `rgba(${c.accentRgb},0.04)` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: EASE }}
          />
        </AnimatePresence>
      </div>

      <Container className="relative">
        {/* ── Header ── */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Casos reales
            </span>
          </motion.div>

          <motion.h2
            id="results-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Proyectos reales.{" "}
            <span className="gradient-text-static">Resultados medibles.</span>
          </motion.h2>
        </div>

        {/* ── Spotlight area ── */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          {/* Main spotlight panel */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 sm:p-10 md:p-14 lg:p-16 min-h-[280px] sm:min-h-[320px]"
            style={{
              background: "linear-gradient(180deg, rgba(10,17,40,0.97), rgba(6,11,26,0.95))",
              borderWidth: "1px",
              borderColor: `rgba(${c.accentRgb},0.12)`,
              transition: "border-color 0.6s ease",
            }}
          >
            {/* Accent line top */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </AnimatePresence>

            {/* Content — crossfade between cases */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 lg:gap-16"
                initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -40, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {/* Left: metric */}
                <div className="flex-shrink-0 text-center md:text-left">
                  <span
                    className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-none"
                    style={{ color: c.accent }}
                  >
                    {c.metric}
                  </span>
                  <span
                    className="block text-xs sm:text-sm font-bold uppercase tracking-[0.18em] mt-2 sm:mt-3"
                    style={{ color: `rgba(${c.accentRgb},0.6)` }}
                  >
                    {c.metricLabel}
                  </span>
                </div>

                {/* Vertical divider */}
                <div
                  className="hidden md:block w-px self-stretch flex-shrink-0"
                  style={{ background: `rgba(${c.accentRgb},0.15)` }}
                />

                {/* Right: client info */}
                <div className="flex-1 min-w-0">
                  {/* Logo */}
                  <div className="flex items-center gap-3 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.logo}
                      alt={c.client}
                      className="invert brightness-200 opacity-80"
                      style={{ height: "28px", width: "auto", maxWidth: "140px", objectFit: "contain" }}
                    />
                    <span
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        borderColor: `rgba(${c.accentRgb},0.2)`,
                        color: `rgba(${c.accentRgb},0.7)`,
                        background: `rgba(${c.accentRgb},0.06)`,
                      }}
                    >
                      {c.sector}
                    </span>
                  </div>

                  {/* One-liner */}
                  <p
                    className="text-base sm:text-lg md:text-xl leading-relaxed font-medium"
                    style={{ color: "var(--text-primary)", opacity: 0.9 }}
                  >
                    {c.oneLiner}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Corner accent glow */}
            <div
              className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-[80px] pointer-events-none transition-all duration-1000"
              style={{ background: `rgba(${c.accentRgb},0.06)` }}
            />
          </div>

          {/* ── Progress indicators ── */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {CASES.map((cs, i) => (
              <button
                key={cs.client}
                type="button"
                onClick={() => goTo(i)}
                className="group relative flex flex-col items-center gap-2"
                aria-label={`Ver caso ${cs.client}`}
              >
                {/* Logo thumbnail */}
                <div
                  className="flex items-center justify-center w-16 sm:w-20 h-10 sm:h-12 rounded-lg transition-all duration-400"
                  style={{
                    background: i === active ? `rgba(${cs.accentRgb},0.08)` : "rgba(65,105,225,0.03)",
                    borderWidth: "1px",
                    borderColor: i === active ? `rgba(${cs.accentRgb},0.25)` : "rgba(65,105,225,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cs.logo}
                    alt={cs.client}
                    className="invert brightness-200 transition-opacity duration-400"
                    style={{
                      height: "16px",
                      width: "auto",
                      maxWidth: "60px",
                      objectFit: "contain",
                      opacity: i === active ? 0.9 : 0.3,
                    }}
                  />
                </div>

                {/* Progress bar */}
                <div
                  className="w-full h-[2px] rounded-full overflow-hidden"
                  style={{ background: "rgba(65,105,225,0.08)" }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: i === active ? `${progress}%` : i < active ? "100%" : "0%",
                      background: cs.accent,
                      opacity: i === active ? 0.8 : 0.3,
                      transition: i === active ? "width 50ms linear" : "width 0.4s ease",
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          className="mt-10 sm:mt-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
        >
          <p
            className="text-xs sm:text-sm mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            Más de 100 proyectos entregados. Detalle completo disponible en conversación.
          </p>
          <Button as="a" href="/#contacto" variant="shine" size="lg" className="w-full sm:w-auto">
            Solicitar diagnóstico
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
