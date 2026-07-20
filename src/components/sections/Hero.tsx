"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { partnerLogos } from "@/content/proof";

const HeroCubeAsync = dynamic(() => import("./HeroCube"), { ssr: false, loading: () => null });

/* ─── Shared animation constants ───────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── CSS-only particles — no JS animation loop ────────────────── */
const PARTICLES = [
  { x: 8,  y: 15, size: 2,   dur: 14, del: 0,   op: 0.12 },
  { x: 22, y: 55, size: 1,   dur: 18, del: 2.1, op: 0.08 },
  { x: 67, y: 22, size: 1.5, dur: 16, del: 4.3, op: 0.10 },
  { x: 42, y: 78, size: 2,   dur: 20, del: 1.5, op: 0.09 },
  { x: 85, y: 35, size: 1,   dur: 15, del: 3.2, op: 0.08 },
  { x: 15, y: 80, size: 1.5, dur: 17, del: 5.1, op: 0.07 },
  { x: 75, y: 65, size: 1,   dur: 19, del: 0.8, op: 0.09 },
  { x: 55, y: 10, size: 2,   dur: 13, del: 2.7, op: 0.11 },
] as const;

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(91,141,239,${p.op})`,
            animation: `float ${p.dur}s ${p.del}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HERO
   ═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10px" });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{
        "--cube-half": "clamp(60px, 11vw, 150px)",
      } as React.CSSProperties}
    >
      <FloatingParticles />

      {/* ── 3D Cube — lazy-loaded, decorative ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-0 hidden sm:block"
        style={{
          width: "clamp(160px, 22vw, 300px)",
          height: "clamp(160px, 22vw, 300px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.5, ease: EASE }}
        aria-hidden
      >
        <HeroCubeAsync className="w-full h-full" />
      </motion.div>

      {/* ── Content ── */}
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-16 sm:pb-20 md:pb-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Ingeniería B2B · Criterio antes que tecnología
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-title"
            className="mb-5 sm:mb-6 max-w-4xl"
            style={{
              fontSize: "clamp(1.9rem, 5.5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          >
            La IA promete mucho.
            <br className="hidden sm:block" />
            {" "}Construimos el <span className="gradient-text-static">software a medida</span> que de verdad mueve tu empresa.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-7 sm:mb-8 max-w-2xl text-[15px] sm:text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Software, automatización y sistemas internos a medida para empresas
            españolas que necesitan resultados operativos. Con IA cuando aporta,
            sin IA cuando no. Sin humo, sin vendor lock-in.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-10 sm:mb-12 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <Button as="a" href="/#contacto" variant="shine" size="lg" className="w-full sm:w-auto">
              Diagnóstico gratuito de 30 min
            </Button>
            <Button as="a" href="#servicios" variant="ghost" size="lg" className="w-full sm:w-auto">
              Cómo trabajamos
            </Button>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            className="mb-10 sm:mb-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] sm:text-xs font-medium"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-400/70" />
              <strong className="font-bold" style={{ color: "var(--accent-light)" }}>100+</strong>
              proyectos entregados
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-400/70" />
              Código y datos vuestros
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-blue-400/70" />
              Sin dependencia de modelos cerrados
            </span>
          </motion.div>

          {/* Client logos */}
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="mb-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Experiencia del equipo en proyectos para
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 md:gap-x-14">
              {partnerLogos.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.6 }}
                >
                  <Image
                    src={p.logo}
                    alt={`Logo de ${p.name} — cliente de Qubelia`}
                    width={p.width}
                    height={p.height}
                    className="h-5 sm:h-6 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ── Bottom gradient ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-40"
        style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
        aria-hidden
      />
    </section>
  );
}
