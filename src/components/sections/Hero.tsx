"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

// ── Terminal animation data ───────────────────────────────────────────
const LINES = [
  { type: "cmd",  text: 'qubelia init --project "TuEmpresa"',   delay: 500  },
  { type: "ok",   text: "Onboarding completado · KPIs listos",   delay: 1300 },
  { type: "cmd",  text: "audit --full --ai",                     delay: 2100 },
  { type: "ok",   text: "23 mejoras críticas identificadas",      delay: 2800 },
  { type: "ok",   text: "Arquitectura cloud validada",            delay: 3400 },
  { type: "cmd",  text: "build --mvp --weeks 8",                 delay: 4200 },
  { type: "prog", text: "Sem 6/8  ·  API lista  ·  UI 91%",     delay: 5100 },
  { type: "cmd",  text: "deploy --env production",               delay: 6000 },
  { type: "live", text: "✓  tuempresa.es   ●  LIVE",             delay: 6800 },
] as const;

const CLIENTS = ["Santander", "Unicaja", "Accenture", "Soltel"];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const up = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────
export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [cursor,       setCursor]       = useState(true);

  // Terminal loop
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      setVisibleLines(0);
      LINES.forEach((line, i) => {
        timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
      });
      // restart after last line + pause
      timers.push(setTimeout(run, LINES[LINES.length - 1].delay + 4200));
    };

    run();
    return () => timers.forEach(clearTimeout);
  }, []);

  // Cursor blink
  useEffect(() => {
    const t = setInterval(() => setCursor(c => !c), 540);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden min-h-svh flex items-center"
    >
      {/* ── BACKGROUND ACCENTS ──────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Top rule */}
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent 10%,rgba(99,102,241,0.55) 50%,transparent 90%)" }} />
        {/* Radial spotlight */}
        <div className="absolute inset-x-0 top-0 h-[70vh] dark:hidden"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 0%,rgba(99,102,241,0.07),transparent 70%)" }} />
        {/* Dark glow */}
        <div className="absolute hidden dark:block"
          style={{ top:"-15%",left:"50%",transform:"translateX(-50%)",width:"80vw",height:"70vh",
            background:"radial-gradient(ellipse,rgba(99,102,241,0.13) 0%,transparent 65%)",filter:"blur(40px)" }} />
        {/* Bottom blend */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#F7F9FF] dark:from-[#050A14] to-transparent" />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-24 items-center py-28 lg:py-20">

          {/* ── LEFT — TEXT ─────────────────────────────────────── */}
          <motion.div variants={stagger} initial="hidden" animate="show">

            {/* Badge */}
            <motion.div variants={up} className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-indigo-300/40 dark:border-indigo-500/20 bg-white/80 dark:bg-indigo-500/[0.07] px-4 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-indigo-700 dark:text-indigo-300 shadow-sm shadow-indigo-100/60 dark:shadow-none backdrop-blur-md">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 inset-0" />
                  <span className="relative rounded-full bg-emerald-400 h-2 w-2" />
                </span>
                Consultoría tecnológica · Sevilla · España
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-title"
              variants={up}
              className="font-black leading-[1.02] tracking-[-0.032em] text-slate-900 dark:text-white mb-8
                         text-[2.9rem] sm:text-[3.8rem] xl:text-[4.6rem]"
            >
              De idea<br />
              <span className="gradient-text">a producto real.</span><br />
              En 8 semanas.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={up}
              className="text-[1.05rem] sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-[420px] mb-10"
            >
              MVPs, IA aplicada y automatización. Equipo senior que entrega con fechas reales — no con estimaciones infinitas.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={up} className="flex flex-col sm:flex-row gap-3 mb-5">
              <Button as="a" href="/#contacto" variant="shine" size="lg">
                Agenda diagnóstico gratis
              </Button>
              <Button as="a" href="/labs" variant="ghost" size="lg">
                Ver herramientas →
              </Button>
            </motion.div>

            <motion.p variants={up} className="text-xs text-slate-400/70 dark:text-slate-600 mb-10">
              Sin compromiso · Respuesta en 24 h · Tu código, siempre tuyo
            </motion.p>

            {/* Trust */}
            <motion.div variants={up}>
              <p className="text-[9px] uppercase tracking-[0.28em] font-bold text-slate-400/60 dark:text-slate-600 mb-3">
                Con la confianza de
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {CLIENTS.map(c => (
                  <span key={c}
                    className="text-[13px] font-bold tracking-wide text-slate-400/80 dark:text-slate-700 hover:text-indigo-500 dark:hover:text-slate-400 transition-colors cursor-default">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT — BENTO GRID ──────────────────────────────── */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, y: 44, scale: 0.97 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            transition={{ duration: 1.0, delay: 0.25, ease: EASE }}
          >

            {/* TERMINAL — full width */}
            <div className="col-span-2 rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0D1117]
                            shadow-[0_24px_80px_-12px_rgba(0,0,0,0.40),0_0_0_1px_rgba(255,255,255,0.05)]">
              {/* Chrome */}
              <div className="flex items-center gap-1.5 px-4 py-[11px] border-b border-white/[0.06] bg-white/[0.025]">
                <span className="h-[11px] w-[11px] rounded-full bg-[#FF5F57]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
                <span className="ml-auto text-[10px] font-mono text-white/25 tracking-wider">
                  qubelia-studio — zsh
                </span>
              </div>
              {/* Body */}
              <div className="p-5 min-h-[220px]" style={{ fontFamily: "var(--font-mono)" }}>
                {LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={`${i}-${line.text}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.18 }}
                    className="leading-[1.8] text-[12px]"
                  >
                    {line.type === "cmd" && (
                      <span>
                        <span className="select-none text-emerald-500">❯ </span>
                        <span className="text-sky-300">{line.text}</span>
                      </span>
                    )}
                    {line.type === "ok" && (
                      <span className="text-slate-400 pl-4">
                        <span className="text-emerald-400">✓</span>{"  "}{line.text}
                      </span>
                    )}
                    {line.type === "prog" && (
                      <span className="text-amber-400/90 pl-4">
                        <span className="animate-pulse">◎</span>{"  "}{line.text}
                      </span>
                    )}
                    {line.type === "live" && (
                      <span className="pl-4 font-bold text-emerald-300"
                        style={{ textShadow: "0 0 16px rgba(52,211,153,0.55)" }}>
                        {line.text}
                      </span>
                    )}
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                {visibleLines < LINES.length && (
                  <div className="leading-[1.8] text-[12px] text-sky-300">
                    <span className="select-none text-emerald-500">❯ </span>
                    <span
                      className="inline-block w-[7px] h-[13px] bg-sky-400 align-middle rounded-[1px]"
                      style={{ opacity: cursor ? 1 : 0, transition: "opacity 0.1s" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* METRIC A — +40% ventas */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] p-5
                            bg-gradient-to-br from-white to-emerald-50/60 dark:from-white/[0.03] dark:to-emerald-500/[0.06]
                            shadow-sm dark:shadow-none">
              <p className="text-[2.6rem] font-black tabular-nums leading-none tracking-tight text-emerald-500 mb-2">
                +40%
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 leading-tight">
                Crecimiento<br />en ventas
              </p>
              <div className="mt-4 h-[3px] rounded-full bg-emerald-100 dark:bg-emerald-500/[0.15] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-emerald-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "72%" }}
                  transition={{ delay: 1.0, duration: 1.2, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* METRIC B — 8 semanas */}
            <div className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07] p-5
                            bg-gradient-to-br from-white to-sky-50/60 dark:from-white/[0.03] dark:to-sky-500/[0.06]
                            shadow-sm dark:shadow-none">
              <p className="text-[2.6rem] font-black tabular-nums leading-none tracking-tight text-sky-500 mb-2">
                8 sem
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 leading-tight">
                De idea<br />a MVP live
              </p>
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 h-[5px] rounded-full"
                    style={{ background: i < 6 ? "#38BDF8" : "rgba(148,163,184,0.2)" }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 1.0 + i * 0.07, duration: 0.3, ease: "backOut" }}
                  />
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
