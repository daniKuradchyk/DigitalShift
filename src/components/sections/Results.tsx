"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════════════════════════════════
   KPI DATA
   ══════════════════════════════════════════════════════════════ */

const kpis = [
  {
    value: 4,
    suffix: "+",
    label: "Clientes enterprise",
    sub: "activos",
    accent: "#38BDF8",
    accentRgb: "56,189,248",
    bar: 60,
  },
  {
    value: 8,
    suffix: "+",
    label: "Proyectos completados",
    sub: "entregados",
    accent: "#34D399",
    accentRgb: "52,211,153",
    bar: 80,
  },
  {
    value: 100,
    suffix: "%",
    label: "Código siempre tuyo",
    sub: "garantizado",
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    bar: 100,
  },
  {
    value: 24,
    suffix: "h",
    label: "Tiempo de respuesta",
    sub: "máximo",
    accent: "#FB923C",
    accentRgb: "251,146,60",
    bar: 45,
  },
];

/* ══════════════════════════════════════════════════════════════
   CLIENT CAROUSEL DATA
   ══════════════════════════════════════════════════════════════ */

const clients = [
  { name: "Banco Santander", logo: "/logos/santander.svg", w: 200, h: 68 },
  { name: "Unicaja Banco",   logo: "/logos/unicaja.svg",   w: 176, h: 65 },
  { name: "Accenture",       logo: "/logos/accenture.svg", w: 204, h: 56 },
  { name: "Soltel Group",    logo: "/logos/soltel.svg",    w: 200, h: 68 },
  { name: "LF Studio",       logo: "/logos/lfstudio.svg",  w: 180, h: 60 },
];

// Double for seamless marquee loop
const CAROUSEL = [...clients, ...clients];

/* ══════════════════════════════════════════════════════════════
   CASE STUDIES
   ══════════════════════════════════════════════════════════════ */

const cases = [
  {
    id: "santander",
    client: "Banco Santander",
    logo: "/logos/santander.svg",
    logoW: 140,
    logoH: 48,
    sector: "Banca Enterprise",
    accent: "#EC0000",
    accentRgb: "236,0,0",
    headline: "Integración core y DataOps",
    result: "KPIs operativos con trazabilidad completa y compliance en sistemas core bancarios.",
    metric: "100%",
    metricLabel: "auditoría trazada",
    tags: ["DataOps", "Compliance", "Seguridad"],
    featured: true,
  },
  {
    id: "unicaja",
    client: "Unicaja Banco",
    logo: "/logos/unicaja.svg",
    logoW: 130,
    logoH: 48,
    sector: "Banca Enterprise",
    accent: "#62a24c",
    accentRgb: "98,162,76",
    headline: "Automatización de reporting",
    result: "Flujos críticos modernizados con control de calidad de datos en producción.",
    metric: "−70%",
    metricLabel: "tiempo de cierre",
    tags: ["Automatización", "Reporting", "Governance"],
    featured: false,
  },
  {
    id: "accenture",
    client: "Accenture",
    logo: "/logos/accenture.svg",
    logoW: 148,
    logoH: 40,
    sector: "Consultoría Enterprise",
    accent: "#A100FF",
    accentRgb: "161,0,255",
    headline: "Delivery y arquitectura técnica",
    result: "Roadmaps técnicos alineados al negocio en proyectos de transformación a gran escala.",
    metric: "×3",
    metricLabel: "velocidad de entrega",
    tags: ["Enterprise", "Agile", "Arquitectura"],
    featured: false,
  },
  {
    id: "lfstudio",
    client: "LF Studio",
    logo: "/logos/lfstudio.svg",
    logoW: 130,
    logoH: 44,
    sector: "Fotografía Premium",
    accent: "#111111",
    accentRgb: "17,17,17",
    headline: "Web premium + SEO técnico",
    result: "Galerías optimizadas, UX editorial y captación de clientes cualificados desde búsqueda orgánica.",
    metric: "+220%",
    metricLabel: "tráfico orgánico",
    tags: ["Web Premium", "Performance", "SEO"],
    featured: false,
  },
];

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ══════════════════════════════════════════════════════════════ */

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, 1400 / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════════
   CASE CARD — FEATURED (full width)
   ══════════════════════════════════════════════════════════════ */

function FeaturedCase({ c }: { c: (typeof cases)[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-[#070E22]
                 hover:shadow-[0_24px_80px_rgba(0,0,0,0.10)] transition-all duration-500"
      style={{ borderColor: `rgba(${c.accentRgb},0.25)` }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${c.accent},transparent 60%)` }} />

      {/* Radial glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse 60% 50% at 0% 0%, rgba(${c.accentRgb},0.07), transparent)` }}
      />

      <div className="p-7 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
        {/* Left content */}
        <div>
          {/* Client logo + sector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative h-10 flex-shrink-0" style={{ width: c.logoW * (40 / c.logoH) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.logo}
                alt={c.client}
                height={40}
                style={{ height: "40px", width: "auto", maxWidth: "160px", objectFit: "contain" }}
                className="dark:invert"
              />
            </div>
            <span
              className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ background: `rgba(${c.accentRgb},0.10)`, color: c.accent }}
            >
              {c.sector}
            </span>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{c.headline}</h3>
          <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-5 max-w-lg">{c.result}</p>

          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <span
                key={t}
                className="inline-flex rounded-full border border-slate-200/80 dark:border-white/[0.08]
                           bg-slate-50 dark:bg-white/[0.03] px-2.5 py-0.5
                           text-[10px] font-medium text-slate-500 dark:text-slate-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: big metric */}
        <div
          className="flex flex-col items-center justify-center rounded-2xl px-8 py-6 flex-shrink-0 min-w-[160px]"
          style={{ background: `rgba(${c.accentRgb},0.07)`, border: `1px solid rgba(${c.accentRgb},0.15)` }}
        >
          <span className="text-[3rem] font-black tabular-nums leading-none tracking-tight" style={{ color: c.accent }}>
            {c.metric}
          </span>
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500 text-center">
            {c.metricLabel}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════
   CASE CARD — COMPACT
   ══════════════════════════════════════════════════════════════ */

function CompactCase({ c, delay }: { c: (typeof cases)[0]; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-[#070E22]
                 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none transition-all duration-300"
      style={{ borderColor: `rgba(${c.accentRgb},0.20)` }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${c.accent},transparent 55%)` }} />

      {/* Inner glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 70% 50% at 0% 0%, rgba(${c.accentRgb},0.06), transparent)` }}
      />

      <div className="p-6">
        {/* Logo + sector row */}
        <div className="flex items-start justify-between gap-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.logo}
            alt={c.client}
            style={{ height: "32px", width: "auto", maxWidth: "130px", objectFit: "contain" }}
            className="dark:invert"
          />
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] flex-shrink-0"
            style={{ background: `rgba(${c.accentRgb},0.10)`, color: c.accent }}
          >
            {c.sector}
          </span>
        </div>

        {/* Big metric */}
        <p className="text-[2.2rem] font-black tabular-nums leading-none tracking-tight mb-0.5" style={{ color: c.accent }}>
          {c.metric}
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600 mb-3">
          {c.metricLabel}
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{c.headline}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">{c.result}</p>

        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span
              key={t}
              className="inline-flex rounded-full border border-slate-200/70 dark:border-white/[0.07]
                         bg-slate-50 dark:bg-white/[0.03] px-2 py-0.5
                         text-[9px] font-medium text-slate-400 dark:text-slate-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════════ */

export default function Results() {
  const featured = cases.find((c) => c.featured)!;
  const compact = cases.filter((c) => !c.featured);

  return (
    <section id="resultados" aria-labelledby="results-title" className="relative py-20 lg:py-28 overflow-hidden">

      {/* Section tint */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-slate-50/50 dark:bg-white/[0.01]" />
      {/* Top/bottom rules */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent 10%,rgba(56,189,248,0.3) 50%,transparent 90%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent 10%,rgba(167,139,250,0.3) 50%,transparent 90%)" }} />
      </div>

      <Container>

        {/* ── HEADER ── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Casos reales
          </div>
          <h2 id="results-title" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Resultados que{" "}
            <span className="gradient-text-static">se miden</span>
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400">
            Proyectos enterprise y marcas premium. Entregables claros, KPIs desde el primer día.
          </p>
        </motion.div>

        {/* ── KPI TILES ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
              className="rounded-2xl border border-slate-200/70 dark:border-white/[0.07]
                         bg-white dark:bg-white/[0.03] p-6 text-center"
            >
              <p
                className="text-[2.6rem] font-black tabular-nums leading-none tracking-tight mb-1"
                style={{ color: k.accent }}
              >
                <Counter target={k.value} suffix={k.suffix} />
              </p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{k.label}</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-600 uppercase tracking-[0.15em] mb-3">{k.sub}</p>
              {/* Animated bar */}
              <div className="h-[3px] rounded-full bg-slate-100 dark:bg-white/[0.05] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: k.accent }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${k.bar}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 1.0, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── LOGO MARQUEE ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.28em] font-bold text-slate-400 dark:text-slate-600 mb-8">
            Con la confianza de
          </p>

          <div className="marquee-container relative overflow-hidden" aria-label="Clientes" role="list">
            {/* Fade masks */}
            <div aria-hidden className="marquee-fade-left pointer-events-none absolute left-0 top-0 z-10 h-full w-32" />
            <div aria-hidden className="marquee-fade-right pointer-events-none absolute right-0 top-0 z-10 h-full w-32" />

            <div className="marquee-track">
              {CAROUSEL.map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  role="listitem"
                  className="mx-10 flex items-center justify-center flex-shrink-0
                             grayscale opacity-50 dark:invert dark:opacity-35
                             hover:grayscale-0 hover:opacity-100 dark:hover:invert-0 dark:hover:opacity-90
                             transition-all duration-400 cursor-default"
                  style={{ height: "44px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logo}
                    alt={c.name}
                    style={{ height: "44px", width: "auto", maxWidth: "180px", objectFit: "contain" }}
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
            Los detalles se resumen por NDA. Casos disponibles bajo solicitud.
          </p>
        </motion.div>

        {/* ── CASE STUDIES ── */}
        <div className="space-y-5">

          {/* Featured */}
          <FeaturedCase c={featured} />

          {/* Compact grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {compact.map((c, i) => (
              <CompactCase key={c.id} c={c} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <Button as="a" href="/#contacto" variant="shine" size="lg">
            Agenda diagnóstico gratis
          </Button>
        </motion.div>

      </Container>
    </section>
  );
}
