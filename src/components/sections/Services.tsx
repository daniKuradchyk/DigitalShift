"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { Code2, Bot, Database, Check, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────
   DATA — Solo los 3 pilares principales en la home.
   MVP y Consultoría viven en /servicios/* pero no compiten aquí.
   ────────────────────────────────────────────────────────────── */

const services = [
  {
    id: "apps",
    Icon: Code2,
    accent: "#FB923C",
    accentRgb: "251,146,60",
    title: "Software a medida",
    tagline: "Aplicaciones que se ajustan a cómo trabaja tu empresa, no al revés",
    description:
      "Construimos aplicaciones internas, portales de clientes y plataformas operativas adaptadas a vuestros procesos reales. Arquitectura limpia, CI/CD automatizado y QA integrado. El código es vuestro desde el primer commit, sin vendor lock-in.",
    features: [
      "Aplicaciones internas, portales y plataformas operativas",
      "Arquitectura documentada sin dependencias ocultas",
      "CI/CD y tests automatizados en cada pull request",
      "Soporte y evolución post-lanzamiento disponible",
    ],
    tags: ["TypeScript", "Next.js", "AWS / GCP", "Microservicios"],
  },
  {
    id: "ia",
    Icon: Bot,
    accent: "#A78BFA",
    accentRgb: "167,139,250",
    title: "Automatización de procesos",
    tagline: "Elimina el trabajo manual repetitivo con flujos que funcionan solos",
    description:
      "Diseñamos e implementamos agentes IA y flujos RPA adaptados a tu operación real. Control humano integrado, trazabilidad completa y guardrails para entornos de producción. Sin sorpresas, sin caja negra.",
    features: [
      "Agentes IA con guardrails y fallback humano",
      "Flujos RPA para procesos repetitivos de alto volumen",
      "Clasificación inteligente y extracción de datos no estructurados",
      "Integración con tus sistemas actuales (ERP, CRM, email)",
    ],
    tags: ["LLM", "RPA", "Python", "LangChain"],
  },
  {
    id: "data",
    Icon: Database,
    accent: "#22D3EE",
    accentRgb: "34,211,238",
    title: "Integraciones ERP/CRM",
    tagline: "Conecta los sistemas que ya tienes, elimina el trabajo doble",
    description:
      "Construimos conectores, pipelines de datos y dashboards operativos que unifican la información de tus herramientas actuales. SAP, Salesforce, HubSpot, sistemas legacy o APIs propias: si tiene API o base de datos, lo conectamos.",
    features: [
      "Conectores a medida: SAP, Salesforce, HubSpot y más",
      "Pipelines ETL con control de calidad de datos",
      "Dashboards operativos en tiempo real (Looker, Power BI, custom)",
      "Alertas y reporting automatizado",
    ],
    tags: ["ETL", "REST APIs", "SAP", "Salesforce"],
  },
];

/* ──────────────────────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const panelVariants = {
  enter: { opacity: 0, y: 24, filter: "blur(4px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -18, filter: "blur(4px)" },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

/* ──────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────── */

export default function Services() {
  const [active, setActive] = useState(0);
  const s = services[active];

  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-[120px] opacity-[0.14] dark:opacity-[0.20]"
        animate={{ background: `rgba(${s.accentRgb}, 1)` }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[100px] opacity-[0.10] dark:opacity-[0.15]"
        animate={{ background: `rgba(${s.accentRgb}, 1)` }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      />

      <Container>

        {/* ── HEADER ── */}
        <motion.div
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="section-tag mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Servicios
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              id="services-title"
              className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
            >
              Tres áreas de trabajo,<br />
              <span className="gradient-text-static">un objetivo operativo</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm text-sm leading-relaxed">
              Software, automatización e integraciones. Desde el diagnóstico hasta el código en producción.
            </p>
          </div>
        </motion.div>

        {/* ── SPLIT LAYOUT ── */}
        <div className="grid lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr] gap-4 lg:gap-8 items-start">

          {/* ── LEFT: Service selector ── */}
          <motion.nav
            aria-label="Servicios principales"
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {/* Mobile: horizontal tabs */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4">
              {services.map((sv, i) => (
                <button
                  key={sv.id}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
                    ${i === active
                      ? "text-white"
                      : "bg-white/60 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 border border-slate-200/70 dark:border-white/[0.07]"
                    }`}
                  style={i === active ? { background: sv.accent } : undefined}
                  aria-current={i === active ? "true" : undefined}
                >
                  <sv.Icon className="h-3.5 w-3.5" aria-hidden />
                  <span className="text-xs">{sv.title}</span>
                </button>
              ))}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:block relative pl-4">
              {/* Animated indicator line */}
              <motion.div
                className="absolute left-0 w-[2px] rounded-full"
                style={{ height: `${100 / services.length}%` }}
                animate={{
                  top: `${active * (100 / services.length)}%`,
                  background: s.accent,
                  boxShadow: `0 0 12px rgba(${s.accentRgb}, 0.6)`,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
              />
              <div className="absolute left-0 top-0 h-full w-[2px] bg-slate-200/60 dark:bg-white/[0.06] rounded-full" />

              {services.map((sv, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={sv.id}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group w-full text-left flex items-center gap-4 pl-6 pr-3 py-5
                               rounded-xl transition-all duration-300
                               ${isActive
                                 ? "bg-white dark:bg-white/[0.05] shadow-sm dark:shadow-none"
                                 : "hover:bg-white/60 dark:hover:bg-white/[0.03]"
                               }`}
                  >
                    <span
                      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300
                                  ${isActive ? "opacity-100" : "opacity-30 group-hover:opacity-60"}`}
                      style={isActive ? { background: `rgba(${sv.accentRgb}, 0.12)`, color: sv.accent } : undefined}
                    >
                      <sv.Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden />
                    </span>
                    <span
                      className={`text-sm font-semibold leading-tight transition-colors duration-300
                                  ${isActive ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400"}`}
                    >
                      {sv.title}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                        style={{ color: sv.accent }}
                      >
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </motion.span>
                    )}
                  </button>
                );
              })}

              {/* Link to all services */}
              <div className="mt-4 pl-6">
                <a
                  href="/servicios"
                  className="text-xs text-slate-400 dark:text-slate-600 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                  Ver todos los servicios →
                </a>
              </div>
            </div>
          </motion.nav>

          {/* ── RIGHT: Content panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 dark:border-white/[0.07] bg-white dark:bg-[#070D1C] min-h-[440px]">

              <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: `radial-gradient(ellipse 80% 70% at 100% 0%, rgba(${s.accentRgb}, 0.10), transparent 60%)`,
                }}
                transition={{ duration: 0.6, ease: EASE }}
              />

              <motion.div
                className="h-0.5 w-full"
                animate={{ background: `linear-gradient(90deg, ${s.accent}, transparent 60%)` }}
                transition={{ duration: 0.4 }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  variants={panelVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative z-10 p-7 lg:p-9"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{ background: `rgba(${s.accentRgb}, 0.12)`, color: s.accent }}
                    >
                      <s.Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: s.accent }}>
                        {s.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-7 max-w-[520px]">
                    {s.description}
                  </p>

                  <motion.ul
                    key={`features-${active}`}
                    variants={listVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-3 mb-7"
                  >
                    {s.features.map((f) => (
                      <motion.li
                        key={f}
                        variants={itemVariants}
                        className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400"
                      >
                        <span
                          className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ background: `rgba(${s.accentRgb}, 0.12)` }}
                        >
                          <Check className="h-3 w-3" style={{ color: s.accent }} strokeWidth={3} aria-hidden />
                        </span>
                        {f}
                      </motion.li>
                    ))}
                  </motion.ul>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((t) => (
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
                    <Button as="a" href="/#contacto" variant="shine" size="lg" className="flex-shrink-0">
                      Agenda diagnóstico →
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-1.5 mt-4" aria-hidden>
              {services.map((sv, i) => (
                <button
                  key={sv.id}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? "20px" : "6px",
                    height: "6px",
                    background: i === active ? sv.accent : "rgba(148,163,184,0.4)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
