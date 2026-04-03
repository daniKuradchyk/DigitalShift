"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const kpis = [
  { value: 4, suffix: "+", label: "Clientes enterprise", sub: "activos", accent: "#5B8DEF", accentRgb: "91,141,239", bar: 60 },
  { value: 8, suffix: "+", label: "Proyectos completados", sub: "entregados", accent: "#85A2FF", accentRgb: "133,162,255", bar: 80 },
  { value: 100, suffix: "%", label: "Código siempre tuyo", sub: "garantizado", accent: "#4169E1", accentRgb: "65,105,225", bar: 100 },
  { value: 24, suffix: "h", label: "Tiempo de respuesta", sub: "máximo", accent: "#ADC1FF", accentRgb: "173,193,255", bar: 45 },
];

const clients = [
  { name: "Banco Santander", logo: "/logos/santander.svg", w: 200, h: 68 },
  { name: "Unicaja Banco", logo: "/logos/unicaja.svg", w: 176, h: 65 },
  { name: "Accenture", logo: "/logos/accenture.svg", w: 204, h: 56 },
  { name: "Soltel Group", logo: "/logos/soltel.svg", w: 200, h: 68 },
  { name: "LF Studio", logo: "/logos/lfstudio.svg", w: 180, h: 60 },
];

const CAROUSEL = [...clients, ...clients];

const cases = [
  {
    id: "santander",
    client: "Banco Santander",
    logo: "/logos/santander.svg",
    logoW: 140, logoH: 48,
    sector: "Procesos bancarios",
    accent: "#EC0000", accentRgb: "236,0,0",
    headline: "Software interno y trazabilidad operativa",
    result: "Desarrollo de herramientas a medida para centralizar datos, automatizar validaciones y dar visibilidad completa a procesos bancarios críticos.",
    metric: "100%", metricLabel: "auditoría trazada",
    tags: ["Software a medida", "Automatización", "Trazabilidad"],
    featured: true,
  },
  {
    id: "unicaja",
    client: "Unicaja Banco",
    logo: "/logos/unicaja.svg",
    logoW: 130, logoH: 48,
    sector: "Optimización bancaria",
    accent: "#62a24c", accentRgb: "98,162,76",
    headline: "Automatización de reporting y cierres",
    result: "Optimización de procesos repetitivos de reporting, validación y consolidación de datos para reducir tiempos de cierre y errores manuales.",
    metric: "−70%", metricLabel: "tiempo de cierre",
    tags: ["Procesos", "Reporting", "Calidad de datos"],
    featured: false,
  },
  {
    id: "accenture",
    client: "Accenture",
    logo: "/logos/accenture.svg",
    logoW: 148, logoH: 40,
    sector: "Operaciones enterprise",
    accent: "#A100FF", accentRgb: "161,0,255",
    headline: "Backoffice y delivery a medida",
    result: "Diseño y evolución de software interno para coordinar equipos, estandarizar entregas y acelerar procesos de delivery técnico.",
    metric: "×3", metricLabel: "velocidad de entrega",
    tags: ["Software interno", "Delivery", "Arquitectura"],
    featured: false,
  },
  {
    id: "lfstudio",
    client: "LF Studio",
    logo: "/logos/lfstudio.svg",
    logoW: 130, logoH: 44,
    sector: "Operativa comercial",
    accent: "#5B8DEF", accentRgb: "91,141,239",
    headline: "Flujo comercial conectado a negocio",
    result: "Estructura digital a medida para mejorar captación, entrada de solicitudes y seguimiento comercial con menos fricción operativa.",
    metric: "+220%", metricLabel: "tráfico orgánico",
    tags: ["Captación", "Optimización", "Proceso comercial"],
    featured: false,
  },
];

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

function FeaturedCase({ c }: { c: (typeof cases)[0] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border bg-[#0A1128] hover:shadow-[0_24px_80px_rgba(0,0,0,0.30)] transition-all duration-500"
      style={{ borderColor: `rgba(${c.accentRgb},0.20)` }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${c.accent},rgba(65,105,225,0.3) 60%,transparent)` }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse 60% 50% at 0% 0%, rgba(${c.accentRgb},0.06), transparent)` }}
      />

      <div className="p-7 lg:p-10 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
        <div>
          <div className="mb-6 space-y-3">
            <div className="relative h-10 flex-shrink-0" style={{ width: c.logoW * (40 / c.logoH) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={c.client} height={40} style={{ height: "40px", width: "auto", maxWidth: "160px", objectFit: "contain" }} className="block invert brightness-200" />
            </div>
            <span className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ background: `rgba(${c.accentRgb},0.10)`, color: c.accent }}>
              {c.sector}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{c.headline}</h3>
          <p className="leading-relaxed mb-5 max-w-lg" style={{ color: "var(--text-muted)" }}>{c.result}</p>
          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((t) => (
              <span key={t} className="inline-flex rounded-full border border-brand-400/10 bg-brand-500/[0.04] px-2.5 py-0.5 text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-2xl px-8 py-6 flex-shrink-0 min-w-[160px]" style={{ background: `rgba(${c.accentRgb},0.07)`, border: `1px solid rgba(${c.accentRgb},0.15)` }}>
          <span className="text-[3rem] font-black tabular-nums leading-none tracking-tight" style={{ color: c.accent }}>{c.metric}</span>
          <span className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-center" style={{ color: "var(--text-muted)" }}>{c.metricLabel}</span>
        </div>
      </div>
    </motion.article>
  );
}

function CompactCase({ c, delay }: { c: (typeof cases)[0]; delay: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className="group relative overflow-hidden rounded-2xl border bg-[#0A1128] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
      style={{ borderColor: `rgba(${c.accentRgb},0.15)` }}
    >
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,${c.accent},transparent 55%)` }} />
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 70% 50% at 0% 0%, rgba(${c.accentRgb},0.05), transparent)` }} />

      <div className="p-6">
        <div className="flex flex-wrap items-start gap-3 mb-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.logo} alt={c.client} style={{ height: "32px", width: "auto", maxWidth: "130px", objectFit: "contain" }} className="invert brightness-200" />
          <span className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] flex-shrink-0" style={{ background: `rgba(${c.accentRgb},0.10)`, color: c.accent }}>
            {c.sector}
          </span>
        </div>
        <p className="text-[2.2rem] font-black tabular-nums leading-none tracking-tight mb-1" style={{ color: c.accent }}>{c.metric}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: "var(--text-muted)" }}>{c.metricLabel}</p>
        <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{c.headline}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{c.result}</p>
        <div className="flex flex-wrap gap-1.5">
          {c.tags.map((t) => (
            <span key={t} className="inline-flex rounded-full border border-brand-400/8 bg-brand-500/[0.03] px-2 py-0.5 text-[9px] font-medium" style={{ color: "var(--text-muted)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Results() {
  const featured = cases.find((c) => c.featured)!;
  const compact = cases.filter((c) => !c.featured);

  return (
    <section id="resultados" aria-labelledby="results-title" className="relative scroll-mt-28 overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg,transparent 10%,rgba(65,105,225,0.25) 50%,transparent 90%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent 10%,rgba(91,141,239,0.25) 50%,transparent 90%)" }} />
      </div>

      <Container>
        {/* Header */}
        <motion.div className="text-center max-w-2xl mx-auto mb-14" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: EASE }}>
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden />
            Casos reales
          </div>
          <h2 id="results-title" className="text-h2" style={{ color: "var(--text-primary)" }}>
            Proyectos reales,{" "}
            <span className="gradient-text-static">resultados medibles</span>
          </h2>
          <p className="mt-3 text-body-lg">
            Sectores distintos, el mismo principio: entregar algo que funciona y que se puede medir.
          </p>
        </motion.div>

        {/* KPI tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {kpis.map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 32, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }} className="rounded-2xl border border-brand-400/10 bg-[#0A1128] p-6 text-center">
              <p className="text-[2.6rem] font-black tabular-nums leading-none tracking-tight mb-1" style={{ color: k.accent }}>
                <Counter target={k.value} suffix={k.suffix} />
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{k.label}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: "var(--text-muted)" }}>{k.sub}</p>
              <div className="h-[3px] rounded-full bg-brand-500/[0.08] overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: k.accent }} initial={{ width: "0%" }} whileInView={{ width: `${k.bar}%` }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1, duration: 1.0, ease: "easeOut" }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Logo marquee */}
        <motion.div className="mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }}>
          <p className="text-center text-[10px] uppercase tracking-[0.28em] font-bold text-brand-400/50 mb-8">Con la confianza de</p>
          <div className="marquee-container relative overflow-hidden" aria-label="Clientes" role="list">
            <div aria-hidden className="marquee-fade-left pointer-events-none absolute left-0 top-0 z-10 h-full w-32" />
            <div aria-hidden className="marquee-fade-right pointer-events-none absolute right-0 top-0 z-10 h-full w-32" />
            <div className="marquee-track">
              {CAROUSEL.map((c, i) => (
                <div key={`${c.name}-${i}`} role="listitem" className="mx-10 flex items-center justify-center flex-shrink-0 grayscale opacity-40 invert brightness-200 hover:grayscale-0 hover:opacity-90 transition-all duration-400 cursor-default" style={{ height: "44px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.logo} alt={c.name} style={{ height: "44px", width: "auto", maxWidth: "180px", objectFit: "contain" }} />
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
            Todos los casos incluyen métricas reales. Detalle completo disponible en conversación comercial.
          </p>
        </motion.div>

        {/* Case studies */}
        <div className="space-y-5">
          <FeaturedCase c={featured} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {compact.map((c, i) => (
              <CompactCase key={c.id} c={c} delay={i * 0.1} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div className="mt-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, ease: EASE }}>
          <Button as="a" href="/#contacto" variant="shine" size="lg">
            Agenda diagnóstico gratis
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
