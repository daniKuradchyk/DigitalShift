"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

/* ══════════════════════════════════════════════════════════════
   INLINE BRAND LOGOS (SVG)
   ══════════════════════════════════════════════════════════════ */

function LogoSantander() {
  return (
    <svg height="28" viewBox="0 0 148 28" fill="none" aria-label="Banco Santander" role="img">
      {/* Simplified flame */}
      <path
        d="M10 24 C10 24 4 18 4 12 C4 8 7 4 11 4 C11 4 9 8 11 12 C13 16 16 18 14 24 Z
           M14 24 C14 24 17 19 15 14 C13 9 15 5 18 4 C22 4 24 8 22 14 C20 19 18 22 16 26 Z"
        fill="#EC0000"
      />
      {/* Wordmark */}
      <text x="30" y="20" fill="#EC0000" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        Santander
      </text>
    </svg>
  );
}

function LogoUnicaja() {
  return (
    <svg height="28" viewBox="0 0 110 28" fill="none" aria-label="Unicaja Banco" role="img">
      {/* U-shaped mark */}
      <path
        d="M4 6 L4 18 C4 22 7 25 11 25 C15 25 18 22 18 18 L18 6"
        stroke="#00793E"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M4 6 L4 10" stroke="#00793E" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 6 L18 10" stroke="#00793E" strokeWidth="3" strokeLinecap="round" />
      {/* Wordmark */}
      <text x="26" y="20" fill="#00793E" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        Unicaja
      </text>
    </svg>
  );
}

function LogoAccenture() {
  return (
    <svg height="28" viewBox="0 0 132 28" fill="none" aria-label="Accenture" role="img">
      {/* Double-chevron ">" mark — Accenture brand mark */}
      <path d="M10 5 L17 14 L10 23" stroke="#A100FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M4 5 L11 14 L4 23" stroke="#A100FF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Wordmark */}
      <text x="24" y="20" fill="#1A1A1A" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        Accenture
      </text>
    </svg>
  );
}

function LogoSoltel() {
  return (
    <svg height="28" viewBox="0 0 90 28" fill="none" aria-label="Soltel" role="img">
      {/* Geometric S mark */}
      <rect x="2" y="4" width="16" height="8" rx="2" fill="#0062B1" />
      <rect x="2" y="16" width="16" height="8" rx="2" fill="#0062B1" opacity="0.6" />
      {/* Wordmark */}
      <text x="24" y="20" fill="#0062B1" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        Soltel
      </text>
    </svg>
  );
}

function LogoLFStudio() {
  return (
    <svg height="28" viewBox="0 0 100 28" fill="none" aria-label="LF Studio" role="img">
      {/* Camera aperture mark */}
      <circle cx="12" cy="14" r="9" stroke="#1A1A1A" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="14" r="3.5" fill="#1A1A1A" />
      <line x1="12" y1="5" x2="12" y2="8" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="23" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="5" y1="10" x2="7.5" y2="11.5" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16.5" y1="16.5" x2="19" y2="18" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wordmark */}
      <text x="27" y="20" fill="#1A1A1A" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" letterSpacing="-0.3">
        LF Studio
      </text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

const metrics = [
  { value: 4,   suffix: "+",  label: "Clientes enterprise",   accent: "text-sky-500 dark:text-sky-400",     bg: "from-sky-50 dark:from-sky-500/[0.07]",     border: "border-sky-200/80 dark:border-sky-500/20",     bar: "bg-sky-400",     barPct: "60%" },
  { value: 8,   suffix: "+",  label: "Proyectos completados", accent: "text-emerald-500 dark:text-emerald-400", bg: "from-emerald-50 dark:from-emerald-500/[0.07]", border: "border-emerald-200/80 dark:border-emerald-500/20", bar: "bg-emerald-400", barPct: "80%" },
  { value: 100, suffix: "%",  label: "Código siempre tuyo",   accent: "text-violet-500 dark:text-violet-400", bg: "from-violet-50 dark:from-violet-500/[0.07]", border: "border-violet-200/80 dark:border-violet-500/20", bar: "bg-violet-400",  barPct: "100%" },
  { value: 24,  suffix: " h", label: "Tiempo de respuesta",   accent: "text-amber-500 dark:text-amber-400",   bg: "from-amber-50 dark:from-amber-500/[0.07]",  border: "border-amber-200/80 dark:border-amber-500/20",  bar: "bg-amber-400",   barPct: "45%" },
];

const clients = [
  { name: "Banco Santander", Logo: LogoSantander },
  { name: "Unicaja",         Logo: LogoUnicaja   },
  { name: "Accenture",       Logo: LogoAccenture },
  { name: "Soltel",          Logo: LogoSoltel    },
  { name: "LF Studio",       Logo: LogoLFStudio  },
];

// Double-duplicate for seamless infinite marquee (translateX(-50%) loops back to start)
const CAROUSEL = [...clients, ...clients];

const cases = [
  {
    client: "Banco Santander",
    sector: "Banca · Enterprise",
    accent: "#EC0000",
    bg: "rgba(236,0,0,0.07)",
    border: "rgba(236,0,0,0.20)",
    headline: "Integración core y DataOps",
    result: "KPIs operativos con trazabilidad completa y compliance en sistemas core bancarios.",
    tags: ["DataOps", "Compliance", "Seguridad"],
  },
  {
    client: "Unicaja",
    sector: "Banca · Enterprise",
    accent: "#00793E",
    bg: "rgba(0,121,62,0.07)",
    border: "rgba(0,121,62,0.20)",
    headline: "Automatización de reporting",
    result: "Flujos críticos modernizados con control de calidad de datos en producción.",
    tags: ["Automatización", "Reporting", "Governance"],
  },
  {
    client: "Accenture",
    sector: "Consultoría · Enterprise",
    accent: "#A100FF",
    bg: "rgba(161,0,255,0.07)",
    border: "rgba(161,0,255,0.20)",
    headline: "Delivery y arquitectura técnica",
    result: "Roadmaps técnicos alineados al negocio en proyectos de transformación digital a gran escala.",
    tags: ["Enterprise", "Agile", "Arquitectura"],
  },
  {
    client: "LFStudio",
    sector: "Fotografía · Premium",
    accent: "#38BDF8",
    bg: "rgba(56,189,248,0.07)",
    border: "rgba(56,189,248,0.20)",
    headline: "Web premium + SEO técnico",
    result: "Galerías optimizadas, UX editorial y captación de clientes cualificados desde búsqueda orgánica.",
    tags: ["Web Premium", "Performance", "SEO"],
  },
];

/* ══════════════════════════════════════════════════════════════
   COUNT-UP HOOK
   ══════════════════════════════════════════════════════════════ */

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <p ref={ref} className="text-[2.8rem] font-black tabular-nums leading-none tracking-tight">
      {count}{suffix}
    </p>
  );
}

/* ══════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ══════════════════════════════════════════════════════════════ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════════════════════ */

export default function Results() {
  return (
    <section id="resultados" aria-labelledby="results-title" className="relative py-20 lg:py-28 overflow-hidden">

      {/* Section background tint */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-slate-50/50 dark:bg-white/[0.01]" />

      {/* Top / bottom accent rules */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.3) 50%, transparent 90%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(129,140,248,0.3) 50%, transparent 90%)" }} />
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full blur-3xl opacity-[0.08] dark:opacity-15"
          style={{ background: "rgba(56,189,248,0.5)" }} />
        <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full blur-3xl opacity-[0.08] dark:opacity-15"
          style={{ background: "rgba(129,140,248,0.5)" }} />
      </div>

      <Container>

        {/* ── Header ── */}
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

        {/* ── Animated Metrics ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className={`rounded-2xl border ${m.border} bg-gradient-to-br ${m.bg} to-white/60 dark:to-transparent p-6 text-center`}
            >
              <div className={m.accent}>
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </div>
              <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400 leading-tight">{m.label}</p>
              {/* Animated bar */}
              <div className="mt-4 h-[3px] rounded-full bg-slate-100 dark:bg-white/[0.06] overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${m.bar}`}
                  initial={{ width: "0%" }}
                  whileInView={{ width: m.barPct }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 1.0, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Client Logo Carousel ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="text-center text-[10px] uppercase tracking-[0.28em] font-bold text-slate-400 dark:text-slate-600 mb-8">
            Con la confianza de
          </p>

          {/* Infinite marquee */}
          <div className="marquee-container relative" role="list" aria-label="Clientes">
            {/* Fade masks */}
            <div
              aria-hidden
              className="marquee-fade-left pointer-events-none absolute left-0 top-0 z-10 h-full w-28"
            />
            <div
              aria-hidden
              className="marquee-fade-right pointer-events-none absolute right-0 top-0 z-10 h-full w-28"
            />

            <div className="marquee-track">
              {CAROUSEL.map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  role="listitem"
                  className="mx-10 flex items-center h-14 grayscale opacity-50
                             dark:invert dark:opacity-40
                             hover:grayscale-0 hover:opacity-100 dark:hover:invert-0 dark:hover:opacity-90
                             transition-all duration-300 cursor-default flex-shrink-0"
                >
                  <c.Logo />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-6">
            Los detalles se resumen por NDA. Casos disponibles bajo solicitud.
          </p>
        </motion.div>

        {/* ── Case Study Cards ── */}
        <div className="grid gap-5 sm:grid-cols-2 mb-12">
          {cases.map((c, i) => (
            <motion.article
              key={c.client}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
              className="group relative overflow-hidden rounded-2xl border bg-white dark:bg-[#070E22]
                         hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none
                         transition-all duration-300"
              style={{ borderColor: c.border }}
            >
              {/* Accent top bar */}
              <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${c.accent}, transparent 70%)` }} />

              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(ellipse 60% 50% at 0% 0%, ${c.bg}, transparent)` }}
              />

              <div className="relative p-6">
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  {/* Color dot */}
                  <span
                    className="mt-1 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold tracking-tight"
                    style={{ background: c.bg, color: c.accent, border: `1px solid ${c.accent}44` }}
                  >
                    {c.client.substring(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-medium text-slate-400 dark:text-slate-500">
                      {c.sector}
                    </p>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                      {c.client}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: c.accent }}>
                      {c.headline}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {c.result}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex rounded-full border border-slate-200/80 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          className="text-center"
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
