"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { partnerLogos } from "@/content/proof";

/* ─── Shared animation constants ───────────────────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Datos del panel de consola (decorativo, aria-hidden) ─────── */
const CONSOLE_METRICS = [
  { value: "−14 h", label: "trabajo manual / semana" },
  { value: "0", label: "datos duplicados" },
  { value: "4–8 sem", label: "primera entrega" },
] as const;

const CONSOLE_FLOWS = [
  { from: "ERP", to: "CRM", detail: "pedidos sincronizados", ok: true },
  { from: "Formulario", to: "CRM", detail: "lead asignado a comercial", ok: true },
  { from: "Almacén", to: "Panel", detail: "stock en tiempo real", ok: true },
  { from: "Facturación", to: "Email", detail: "aviso de vencimiento", ok: true },
] as const;

/* ═══════════════════════════════════════════════════════════════════
   CONSOLE PANEL — sistema interno "en vivo", construido en código
   ═══════════════════════════════════════════════════════════════════ */
function ConsolePanel({ inView }: { inView: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="prism-border relative rounded-2xl overflow-hidden animate-float-slow"
      style={{
        background: "linear-gradient(180deg, rgba(13,21,48,0.92), rgba(6,11,26,0.96))",
        boxShadow: "var(--shadow-lg), var(--shadow-glow)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ opacity: 0, y: 40, rotate: 1.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 1, delay: 0.35, ease: EASE }}
    >
      {/* Window chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-blue-500/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-400/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-blue-300/30" />
        <span
          className="ml-3 font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-muted)" }}
        >
          panel-operaciones · qubelia
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px]" style={{ color: "var(--blue-300)" }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-400" />
          </span>
          en producción
        </span>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-3 gap-px" style={{ background: "rgba(91,141,239,0.10)" }}>
        {CONSOLE_METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="px-3 sm:px-4 py-4"
            style={{ background: "rgba(6,11,26,0.92)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.12, ease: EASE }}
          >
            <div
              className="text-lg sm:text-xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
              {m.value}
            </div>
            <div className="mt-0.5 text-[10px] sm:text-[11px] leading-tight" style={{ color: "var(--text-muted)" }}>
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Flow rows */}
      <div className="px-4 py-4 space-y-2.5">
        {CONSOLE_FLOWS.map((f, i) => (
          <motion.div
            key={f.detail}
            className="flex items-center gap-3 rounded-lg border px-3 py-2.5"
            style={{ borderColor: "var(--border)", background: "rgba(10,17,40,0.55)" }}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.85 + i * 0.15, ease: EASE }}
          >
            <span
              className="inline-flex h-5 w-5 flex-none items-center justify-center rounded-full"
              style={{ background: "rgba(91,141,239,0.14)", color: "var(--blue-300)" }}
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8.5 6.5 12 13 4.5" />
              </svg>
            </span>
            <span className="font-mono text-[11px] sm:text-xs" style={{ color: "var(--text-secondary)" }}>
              <span style={{ color: "var(--blue-300)" }}>{f.from}</span>
              <span className="mx-1.5" style={{ color: "var(--text-muted)" }}>→</span>
              <span style={{ color: "var(--blue-300)" }}>{f.to}</span>
              <span className="ml-2 hidden sm:inline" style={{ color: "var(--text-muted)" }}>{f.detail}</span>
            </span>
            <span className="ml-auto font-mono text-[10px]" style={{ color: "rgba(133,162,255,0.55)" }}>ok</span>
          </motion.div>
        ))}

        {/* Log line con cursor */}
        <motion.p
          className="pt-1 font-mono text-[11px]"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <span style={{ color: "var(--blue-400)" }}>$</span> sin humo, sin vendor lock-in{" "}
          <span className="console-caret" />
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOGO MARQUEE
   ═══════════════════════════════════════════════════════════════════ */
function LogoMarquee({ inView, reduced }: { inView: boolean; reduced: boolean }) {
  const logos = [...partnerLogos, ...partnerLogos];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <p
        className="mb-4 text-center text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em]"
        style={{ color: "var(--text-muted)", opacity: 0.6 }}
      >
        Experiencia del equipo en proyectos para
      </p>

      {reduced ? (
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {partnerLogos.map((p) => (
            <Image
              key={p.name}
              src={p.logo}
              alt={`Logo de ${p.name}`}
              width={p.width}
              height={p.height}
              className="h-5 sm:h-6 w-auto object-contain brightness-0 invert opacity-50"
            />
          ))}
        </div>
      ) : (
        <div className="marquee-container relative">
          <div className="marquee-track items-center gap-x-14 pr-14">
            {logos.map((p, i) => (
              <Image
                key={`${p.name}-${i}`}
                src={p.logo}
                alt={i < partnerLogos.length ? `Logo de ${p.name}` : ""}
                aria-hidden={i >= partnerLogos.length}
                width={p.width}
                height={p.height}
                className="h-5 sm:h-6 w-auto flex-none object-contain brightness-0 invert opacity-50 hover:opacity-90 transition-opacity duration-500"
              />
            ))}
          </div>
          <div aria-hidden className="marquee-fade-left pointer-events-none absolute inset-y-0 left-0 w-20" />
          <div aria-hidden className="marquee-fade-right pointer-events-none absolute inset-y-0 right-0 w-20" />
        </div>
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HERO — asimétrico: mensaje a la izquierda, sistema a la derecha
   ═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10px" });
  const reduced = useReducedMotion() ?? false;

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="hero-aurora" aria-hidden />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-12 sm:pb-14">
          {/* ── Columna izquierda: mensaje ── */}
          <div className="text-center lg:text-left">
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

            <motion.h1
              id="hero-title"
              className="mt-6 mb-5 sm:mb-6"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.1rem, 4.6vw, 3.9rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "var(--text-primary)",
              }}
              initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
            >
              La IA promete mucho.
              <br />
              Construimos el{" "}
              <span className="gradient-text-static">software a medida</span>
              <br className="hidden sm:block" />
              {" "}que de verdad mueve tu empresa.
            </motion.h1>

            <motion.p
              className="mb-7 sm:mb-8 max-w-xl mx-auto lg:mx-0 text-[15px] sm:text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              Software, automatización y sistemas internos a medida para empresas
              españolas que necesitan resultados operativos. Con IA cuando aporta,
              sin IA cuando no.
            </motion.p>

            <motion.div
              className="mb-8 flex flex-col sm:flex-row items-center lg:items-start gap-3 w-full sm:w-auto justify-center lg:justify-start"
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

            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-[11px] sm:text-xs font-medium"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
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
                Sin vendor lock-in
              </span>
            </motion.div>
          </div>

          {/* ── Columna derecha: panel de sistema ── */}
          <div className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[2.5rem]"
              style={{
                background: "radial-gradient(circle at 50% 40%, rgba(65,105,225,0.14), transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <ConsolePanel inView={inView} />
          </div>
        </div>

        {/* ── Marquee de logos, ancho completo ── */}
        <div className="pb-14 sm:pb-16">
          <LogoMarquee inView={inView} reduced={reduced} />
        </div>
      </Container>

      {/* ── Bottom gradient ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-24"
        style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
        aria-hidden
      />
    </section>
  );
}
