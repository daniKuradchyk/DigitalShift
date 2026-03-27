"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

// ── Data ──────────────────────────────────────────────────────────────
const kpis = [
  { label: "+40%",  sub: "ventas en 6 meses",  color: "#22C55E", bg: "rgba(34,197,94,0.09)"   },
  { label: "8 sem", sub: "primer MVP en vivo",  color: "#38BDF8", bg: "rgba(56,189,248,0.09)"  },
];

const clients = ["Santander", "Unicaja", "Accenture", "Soltel"];

const headlineWords = [
  "crece de verdad",
  "escala más rápido",
  "convierte más leads",
  "supera la competencia",
];

const roadmap = [
  { label: "Auditoría + arquitectura", weeks: "Sem 1–2", done: true,  pct: 100 },
  { label: "Diseño UI/UX",             weeks: "Sem 3–4", done: true,  pct: 100 },
  { label: "Desarrollo core",          weeks: "Sem 5–6", done: false, pct: 72  },
  { label: "Testing + MVP Live",       weeks: "Sem 7–8", done: false, pct: 0   },
];

const activity = [
  { color: "#22C55E", text: "Deploy exitoso · prod", time: "2 min" },
  { color: "#38BDF8", text: "3 nuevos leads hoy",    time: "1 h"   },
  { color: "#A78BFA", text: "Test suite · 100%",     time: "3 h"   },
];

const bottomMetrics = [
  { label: "Proyectos entregados", value: "12", color: "#6366F1" },
  { label: "NPS de clientes",      value: "94", color: "#22C55E" },
  { label: "Clientes activos",     value: "8",  color: "#38BDF8" },
];

// SVG chart — smooth bezier growth curve (viewBox 0 0 480 100)
const CHART_LINE = "M0,88 C40,82 80,76 120,68 C160,60 200,65 240,52 C280,39 320,32 360,20 C400,8 440,5 480,3";
const CHART_AREA = `${CHART_LINE} L480,100 L0,100 Z`;

// ── Framer Motion ─────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.09, delayChildren: 0.16 } },
};

const up = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────
export default function Hero() {
  const [word, setWord] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWord(i => (i + 1) % headlineWords.length), 3200);
    return () => clearInterval(t);
  }, []);

  const tiltRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-300, 300], [4, -4]), { stiffness: 72, damping: 22 });
  const rotY = useSpring(useTransform(mx, [-480, 480], [-6, 6]), { stiffness: 72, damping: 22 });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = tiltRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left  - r.width  / 2);
    my.set(e.clientY - r.top   - r.height / 2);
  }, [mx, my]);

  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">

      {/* ── BACKGROUND ───────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }} />
        {/* Radial top spotlight */}
        <div className="absolute inset-x-0 top-0 h-[65%] dark:hidden" style={{
          background: "radial-gradient(ellipse 75% 90% at 50% 0%, rgba(99,102,241,0.09), transparent 70%)",
        }} />
        {/* Dark glows */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute left-1/2 -translate-x-1/2 -top-[12%] w-[860px] h-[640px] rounded-full" style={{
            background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, rgba(56,189,248,0.06) 50%, transparent 72%)",
          }} />
          <div className="absolute right-[-8%] top-[15%] w-[520px] h-[520px] rounded-full" style={{
            background: "radial-gradient(ellipse, rgba(56,189,248,0.08), transparent 70%)",
            filter: "blur(60px)",
          }} />
        </div>
        {/* Top rule */}
        <div className="absolute inset-x-0 top-0 h-px" style={{
          background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.65) 50%, transparent 95%)",
        }} />
        {/* Page blend */}
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#EEF0FA] dark:from-[#050A14] to-transparent" />
      </div>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <Container>
        <div className="flex flex-col items-center min-h-[100svh] justify-center py-28 lg:py-20">

          {/* ── TEXT ─────────────────────────────────────────────── */}
          <motion.div
            className="text-center w-full max-w-3xl"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={up} className="mb-7 flex justify-center">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-300/40 bg-white/85 dark:bg-indigo-500/[0.07] dark:border-indigo-500/20 px-4 py-[7px] shadow-sm shadow-indigo-200/50 dark:shadow-none backdrop-blur-md">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-75 inset-0" />
                  <span className="relative rounded-full bg-emerald-400 h-2 w-2" />
                </span>
                <span className="text-[11px] font-semibold tracking-[0.04em] text-indigo-700 dark:text-indigo-300">
                  Consultoría tecnológica · Sevilla · Qubelia
                </span>
              </div>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={up}
              className="mb-7 font-black tracking-[-0.028em] leading-[1.04] text-slate-900 dark:text-white text-5xl sm:text-6xl lg:text-7xl"
            >
              Digitaliza tu empresa,
              <span className="block mt-2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={word}
                    className="gradient-text block text-center leading-[1.04]"
                    initial={{ opacity: 0, filter: "blur(14px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)"  }}
                    exit  ={{ opacity: 0, filter: "blur(14px)" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {headlineWords[word]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mb-9 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-[520px] mx-auto"
            >
              MVPs en 8 semanas, IA aplicada y software a medida. Equipo senior con resultados medibles — no promesas.
            </motion.p>

            <motion.div variants={up} className="mb-5 flex flex-col sm:flex-row gap-3 justify-center">
              <Button as="a" href="/#contacto" variant="shine" size="lg">
                Agenda diagnóstico gratis
              </Button>
              <Button as="a" href="/labs" variant="ghost" size="lg">
                Ver herramientas →
              </Button>
            </motion.div>

            <motion.p variants={up} className="mb-9 text-xs text-slate-400 dark:text-slate-600">
              Sin compromiso · Respuesta en 24 h · Tu código, siempre tuyo
            </motion.p>

            <motion.div variants={up} className="flex flex-col items-center gap-3">
              <p className="text-[10px] uppercase tracking-[0.28em] font-bold text-slate-400/80 dark:text-slate-600">Con la confianza de</p>
              <div className="flex flex-wrap justify-center items-center gap-7">
                {clients.map(c => (
                  <span key={c} className="text-sm font-bold tracking-wide text-slate-400/90 dark:text-slate-700 hover:text-indigo-500 dark:hover:text-slate-400 transition-colors cursor-default">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── VISUAL COMPOSITION ───────────────────────────────── */}
          <motion.div
            className="relative w-full max-w-5xl mx-auto mt-12"
            initial={{ opacity: 0, y: 56, scale: 0.975 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            transition={{ duration: 1.0, delay: 0.5, ease: EASE }}
          >
            {/* Floating card A — top-left */}
            <div className="hero-float-card absolute z-20 hidden sm:block"
              style={{ top: "-1.4rem", left: "-0.5rem", animation: "heroFloat 6s ease-in-out infinite" }}>
              <NotifCard icon="🔔" title="Nueva consulta" desc="hace 2 min · Formulario web" live />
            </div>

            {/* Floating card B — bottom-right */}
            <div className="hero-float-card absolute z-20 hidden sm:block"
              style={{ bottom: "-1.4rem", right: "-0.5rem", animation: "heroFloat 7.5s ease-in-out infinite 1.2s" }}>
              <NotifCard icon="🚀" title="MVP publicado" desc="Proyecto Unicaja · semana 8 de 8" />
            </div>

            {/* Glow */}
            <div aria-hidden className="absolute left-1/2 -translate-x-1/2 -bottom-10 h-20 w-3/4 rounded-full blur-3xl opacity-20 dark:opacity-35"
              style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.7), rgba(56,189,248,0.6))" }} />

            {/* 3D tilt */}
            <div ref={tiltRef} onMouseMove={onMove} onMouseLeave={onLeave} style={{ perspective: "1200px" }}>
              <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="will-change-transform">

                <div className="grid lg:grid-cols-[1fr_240px] gap-4">

                  {/* ── PRIMARY CARD — Revenue chart ── */}
                  <div className="rounded-3xl overflow-hidden border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#060C1A] shadow-[0_2px_4px_rgba(0,0,80,0.04),0_20px_60px_-12px_rgba(99,102,241,0.13)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.65)]">

                    {/* Bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-white/[0.06] bg-slate-50/50 dark:bg-white/[0.015]">
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-md bg-indigo-500/10 dark:bg-indigo-400/20 flex items-center justify-center">
                          <span className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-300">Q</span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-200">Panel de resultados · Qubelia</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute animate-ping rounded-full bg-emerald-400 opacity-60 inset-0" />
                          <span className="relative rounded-full bg-emerald-400 h-1.5 w-1.5" />
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 tracking-[0.2em]">LIVE</span>
                      </div>
                    </div>

                    <div className="p-5 xl:p-6">

                      {/* KPI headline */}
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">Ingresos · Q2 2026</p>
                          <p className="text-[2.2rem] font-black tabular-nums text-slate-900 dark:text-white leading-none">€ 284.500</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="inline-flex items-center bg-emerald-50 dark:bg-emerald-500/[0.12] text-emerald-700 dark:text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/50 dark:border-emerald-500/20">
                              ↑ 40 %
                            </span>
                            <span className="text-[11px] text-slate-400 dark:text-slate-500">vs. Q1 2026</span>
                          </div>
                        </div>
                        <div className="hidden sm:grid grid-cols-2 gap-2 flex-none">
                          {kpis.map(k => (
                            <div key={k.label} className="rounded-xl border border-slate-200/60 dark:border-white/[0.06] p-2.5 text-center" style={{ background: k.bg }}>
                              <p className="text-[15px] font-black tabular-nums leading-none" style={{ color: k.color }}>{k.label}</p>
                              <p className="text-[7px] text-slate-500 dark:text-slate-400 mt-1 leading-tight">{k.sub}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Area chart */}
                      <div className="h-28 sm:h-32 xl:h-36 -mx-1 mb-4">
                        <svg viewBox="0 0 480 100" className="w-full h-full" preserveAspectRatio="none" aria-hidden>
                          <defs>
                            <linearGradient id="heroAreaFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%"  stopColor="rgba(99,102,241,0.22)" />
                              <stop offset="88%" stopColor="rgba(99,102,241,0.01)" />
                            </linearGradient>
                          </defs>
                          {[22, 50, 78].map(y => (
                            <line key={y} x1="0" y1={y} x2="480" y2={y}
                              stroke="rgba(148,163,184,0.07)" strokeWidth="1" strokeDasharray="6 6" />
                          ))}
                          <motion.path
                            d={CHART_AREA}
                            fill="url(#heroAreaFill)"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.8 }}
                          />
                          <motion.path
                            d={CHART_LINE}
                            fill="none"
                            stroke="#6366F1"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.8, delay: 0.85, ease: "easeOut" }}
                          />
                          <motion.circle
                            cx={480} cy={3}
                            fill="#6366F1"
                            style={{ filter: "drop-shadow(0 0 5px rgba(99,102,241,0.8))" }}
                            initial={{ r: 0, opacity: 0 }}
                            animate={{ r: 4.5, opacity: 1 }}
                            transition={{ delay: 2.6, duration: 0.3, ease: "backOut" }}
                          />
                        </svg>
                      </div>

                      {/* Bottom metrics */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.05]">
                        {bottomMetrics.map(m => (
                          <div key={m.label} className="text-center">
                            <p className="text-[1.35rem] font-black tabular-nums leading-none" style={{ color: m.color }}>{m.value}</p>
                            <p className="text-[8px] font-medium text-slate-400 dark:text-slate-500 mt-1 leading-tight">{m.label}</p>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* ── RIGHT COLUMN ── */}
                  <div className="hidden lg:flex flex-col gap-4">

                    {/* Roadmap */}
                    <div className="flex-1 rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#060C1A] shadow-md p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-4">Roadmap · 8 semanas</p>
                      <div className="space-y-3">
                        {roadmap.map((step, i) => (
                          <div key={step.label} className="flex items-start gap-2.5">
                            <div className={`h-[18px] w-[18px] rounded-full flex items-center justify-center flex-none text-[8px] font-bold mt-[1px] ${
                              step.done
                                ? "bg-emerald-500 text-white"
                                : i === 2
                                  ? "border-2 border-sky-400 text-sky-500"
                                  : "border-2 border-slate-200 dark:border-white/[0.12] text-slate-400"
                            }`}>
                              {step.done ? "✓" : i + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 leading-none truncate pr-1">{step.label}</p>
                                <p className="text-[9px] text-slate-400 dark:text-slate-500 flex-none">{step.weeks}</p>
                              </div>
                              {step.pct > 0 && step.pct < 100 && (
                                <div className="h-[3px] rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full bg-sky-400"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${step.pct}%` }}
                                    transition={{ delay: 1.2, duration: 0.9, ease: "easeOut" }}
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#060C1A] shadow-md p-5">
                      <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500 mb-3">Actividad reciente</p>
                      <div className="space-y-2.5">
                        {activity.map(a => (
                          <div key={a.text} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full flex-none" style={{ background: a.color }} />
                              <p className="text-[10px] text-slate-600 dark:text-slate-400">{a.text}</p>
                            </div>
                            <p className="text-[9px] text-slate-400 dark:text-slate-500 flex-none ml-2">{a.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            </div>
          </motion.div>

          {/* ── Scroll indicator ─────────────────────────────────── */}
          <motion.div
            className="hidden lg:flex flex-col items-center gap-2 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
            aria-hidden
          >
            <p className="text-[9px] uppercase tracking-[0.34em] font-semibold text-slate-400 dark:text-slate-600">Explorar</p>
            <div className="w-5 h-8 rounded-full border-2 border-slate-300/70 dark:border-white/[0.18] flex items-start justify-center pt-[5px]">
              <motion.div
                className="w-1 h-1.5 rounded-full bg-slate-400/70 dark:bg-white/25"
                animate={{ y: [0, 11, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

// ── Floating notification card ────────────────────────────────────────
function NotifCard({
  icon, title, desc, live,
}: {
  icon: string;
  title: string;
  desc: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/90 dark:border-white/[0.09] bg-white/[0.97] dark:bg-[#0C1525]/[0.97] backdrop-blur-xl shadow-lg shadow-slate-900/[0.06] dark:shadow-black/50 px-4 py-2.5 select-none">
      <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-white/[0.07] flex items-center justify-center flex-none text-[15px] leading-none">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100 leading-none">{title}</p>
        <p className="text-[9px] text-slate-500 dark:text-slate-400 mt-[3px] truncate max-w-[160px]">{desc}</p>
      </div>
      {live && (
        <span
          className="h-2 w-2 rounded-full bg-emerald-400 flex-none ml-0.5"
          style={{ boxShadow: "0 0 7px rgba(34,197,94,0.9), 0 0 14px rgba(34,197,94,0.4)" }}
        />
      )}
    </div>
  );
}
