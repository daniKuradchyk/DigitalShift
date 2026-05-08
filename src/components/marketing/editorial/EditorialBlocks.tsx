"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Button from "@/components/common/Button";
import {
  getServices,
  type ServiceProblem,
  type ServiceScenario,
  type ServiceSlug,
  type ServiceStep,
} from "@/content/services";
import { caseStudies } from "@/content/proof";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ════════════════════════════════════════════════════════════════
   Reveal — animation wrapper compartido
   ════════════════════════════════════════════════════════════════ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROBLEM NARRATIVE — problemas como prosa editorial
   No es un grid de 4 cards iguales con el mismo icono rojo.
   Cada problema es una fila con número grande y cita destacada.
   ════════════════════════════════════════════════════════════════ */

export function ProblemNarrative({
  intro,
  items,
}: {
  intro?: string;
  items: ServiceProblem[];
}) {
  return (
    <div>
      {intro && (
        <Reveal>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            {intro}
          </p>
        </Reveal>
      )}

      <div className="space-y-10 sm:space-y-12">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.08}>
            <article className="grid grid-cols-12 gap-4 sm:gap-6 group">
              {/* Number marker */}
              <div className="col-span-2 sm:col-span-1">
                <span
                  className="font-mono text-sm sm:text-base font-bold tabular-nums"
                  style={{ color: "var(--text-muted)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="col-span-10 sm:col-span-11 lg:col-span-7 lg:col-start-2">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-blue-200"
                  style={{
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.description}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DECISION DUO — sí/no como columnas editoriales
   Sin verdes/rojos chillones; tipografía pesada y borde sutil.
   ════════════════════════════════════════════════════════════════ */

export function DecisionDuo({
  yesTitle = "Cuándo sí",
  noTitle = "Cuándo no",
  yes,
  no,
}: {
  yesTitle?: string;
  noTitle?: string;
  yes: string[];
  no: string[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <Reveal>
        <div className="relative pl-6">
          <span
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(91,141,239,0.5) 0%, rgba(91,141,239,0.1) 100%)",
            }}
          />
          <div className="flex items-baseline gap-3 mb-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300">
              ✓ {yesTitle}
            </span>
          </div>
          <ul className="space-y-3.5">
            {yes.map((item) => (
              <li
                key={item}
                className="text-[15px] sm:text-base leading-relaxed flex gap-3"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="mt-2.5 h-1 w-3 shrink-0"
                  style={{ background: "rgba(91,141,239,0.5)" }}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative pl-6">
          <span
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(173,193,255,0.2) 0%, rgba(173,193,255,0.05) 100%)",
            }}
          />
          <div className="flex items-baseline gap-3 mb-5">
            <span
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)" }}
            >
              × {noTitle}
            </span>
          </div>
          <ul className="space-y-3.5">
            {no.map((item) => (
              <li
                key={item}
                className="text-[15px] sm:text-base leading-relaxed flex gap-3"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="mt-2.5 h-1 w-3 shrink-0"
                  style={{ background: "rgba(173,193,255,0.25)" }}
                  aria-hidden
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCENARIO ROWS — escenarios como filas asimétricas
   ════════════════════════════════════════════════════════════════ */

export function ScenarioRows({ items }: { items: ServiceScenario[] }) {
  return (
    <div className="space-y-12 sm:space-y-14">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.1}>
          <article className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-10">
            {/* Title col */}
            <div className="col-span-12 lg:col-span-5">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.18em] block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Escenario {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>
            </div>

            {/* Description + note */}
            <div className="col-span-12 lg:col-span-7">
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.description}
              </p>
              {item.note && (
                <p
                  className="text-sm italic leading-relaxed pl-4 border-l"
                  style={{
                    color: "var(--text-muted)",
                    borderColor: "rgba(91,141,239,0.25)",
                  }}
                >
                  {item.note}
                </p>
              )}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROCESS RAIL — proceso horizontal en desktop, vertical en mobile
   Numeración grande + título pegado al número (no bullets)
   ════════════════════════════════════════════════════════════════ */

export function ProcessRail({ items }: { items: ServiceStep[] }) {
  return (
    <div className="relative">
      {/* Connecting rail */}
      <div
        aria-hidden
        className="absolute hidden lg:block top-7 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(91,141,239,0.3) 5%, rgba(91,141,239,0.3) 95%, transparent 100%)",
        }}
      />
      <div className="absolute lg:hidden top-0 bottom-0 left-3 w-px"
        style={{
          background:
            "linear-gradient(to bottom, rgba(91,141,239,0.4), rgba(91,141,239,0.1))",
        }}
        aria-hidden
      />

      <ol className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-10">
        {items.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.12} className="relative pl-10 lg:pl-0">
            {/* Dot */}
            <div className="absolute lg:relative top-0 left-0 lg:left-auto flex items-center gap-3 lg:mb-4">
              <span
                className="relative flex h-7 w-7 items-center justify-center rounded-full"
                style={{
                  background: "var(--bg-page)",
                  border: "2px solid rgba(91,141,239,0.5)",
                }}
              >
                <span className="font-mono text-[10px] font-bold text-blue-300">
                  {step.step}
                </span>
              </span>
            </div>

            <div className="lg:mt-2">
              <h3
                className="text-lg sm:text-xl font-bold mb-2"
                style={{
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {step.description}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DELIVERABLE SHEET — entregables como ficha técnica editorial
   ════════════════════════════════════════════════════════════════ */

export function DeliverableSheet({
  items,
  footer,
}: {
  items: string[];
  footer?: string;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* Caption col */}
      <div className="lg:col-span-4">
        <Reveal>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.18em] mb-2"
            style={{ color: "var(--accent-light)" }}
          >
            Lo que llevas a casa
          </p>
          <p
            className="text-base leading-relaxed max-w-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Sin asteriscos, sin sorpresas. Lo que aparece aquí es lo que
            entregamos en el alcance acordado.
          </p>
        </Reveal>
      </div>

      {/* Items col */}
      <div className="lg:col-span-8">
        <ul className="space-y-0">
          {items.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li
                className="flex items-baseline gap-4 py-4 border-b"
                style={{ borderColor: "rgba(91,141,239,0.1)" }}
              >
                <span
                  className="font-mono text-xs tabular-nums shrink-0"
                  style={{ color: "var(--accent-light)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[15px] sm:text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
        {footer && (
          <Reveal delay={items.length * 0.06}>
            <p
              className="mt-5 text-sm italic"
              style={{ color: "var(--text-muted)" }}
            >
              {footer}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   INTEGRATION STRIP — tira de integraciones como tags mono
   ════════════════════════════════════════════════════════════════ */

export function IntegrationStrip({ items }: { items: string[] }) {
  return (
    <Reveal>
      <ul className="flex flex-wrap gap-2 sm:gap-2.5">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
            className="font-mono text-xs sm:text-sm px-3 py-1.5 rounded border"
            style={{
              color: "var(--text-secondary)",
              background: "rgba(91,141,239,0.04)",
              borderColor: "rgba(91,141,239,0.15)",
            }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </Reveal>
  );
}

/* ════════════════════════════════════════════════════════════════
   BENEFIT PROSE — beneficios como párrafos en columnas (tipo periódico)
   ════════════════════════════════════════════════════════════════ */

export function BenefitProse({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.08}>
          <div className="flex gap-4">
            <span
              className="mt-1.5 shrink-0 font-mono text-xs font-bold tabular-nums"
              style={{ color: "var(--accent-light)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <p
              className="text-base sm:text-[17px] leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {item}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CASE INLINE — caso real integrado en el flujo (no en bloque aparte)
   ════════════════════════════════════════════════════════════════ */

export function CaseInline({ ids }: { ids: string[] }) {
  const selected = caseStudies.filter((item) => ids.includes(item.id));
  if (!selected.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {selected.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.1}>
          <article
            className="relative rounded-xl border p-6 sm:p-7 transition-all duration-500 hover:border-blue-400/30"
            style={{
              background:
                "linear-gradient(160deg, rgba(91,141,239,0.04) 0%, rgba(6,11,26,0.6) 100%)",
              borderColor: "rgba(91,141,239,0.15)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: "var(--accent-light)" }}
              >
                {item.client}
              </span>
            </div>

            <h3
              className="text-lg sm:text-xl font-bold mb-3"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
              }}
            >
              {item.headline}
            </h3>

            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: "var(--text-secondary)" }}
            >
              {item.challenge}
            </p>

            <div
              className="flex items-baseline gap-3 pt-5 border-t"
              style={{ borderColor: "rgba(91,141,239,0.12)" }}
            >
              <span
                className="text-3xl font-black tracking-tight tabular-nums"
                style={{ color: item.accent }}
              >
                {item.metric}
              </span>
              <span
                className="text-xs leading-tight"
                style={{ color: "var(--text-muted)" }}
              >
                {item.metricLabel}
              </span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   RELATED NAV — servicios relacionados como navegación inferior
   No card grid; estilo "siguiente capítulo" tipo footer-nav.
   ════════════════════════════════════════════════════════════════ */

export function RelatedNav({ slugs }: { slugs: ServiceSlug[] }) {
  const items = getServices().filter((s) => slugs.includes(s.slug));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-xl border"
      style={{
        background: "rgba(91,141,239,0.08)",
        borderColor: "rgba(91,141,239,0.15)",
      }}
    >
      {items.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.1}>
          <Link
            href={s.href}
            className="group relative flex flex-col h-full p-6 sm:p-7 transition-colors duration-400"
            style={{ background: "var(--bg-page)" }}
          >
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2"
              style={{ color: "var(--accent-light)" }}
            >
              Sigue por
            </span>
            <h4
              className="text-base sm:text-lg font-bold mb-3 transition-colors duration-300 group-hover:text-blue-200"
              style={{
                color: "var(--text-primary)",
                letterSpacing: "-0.015em",
                lineHeight: 1.3,
              }}
            >
              {s.shortTitle}
            </h4>
            <p
              className="text-sm leading-relaxed flex-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {s.cardSummary}
            </p>
            <span
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 group-hover:text-blue-200"
            >
              <span>Ver servicio</span>
              <svg
                className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   EDITORIAL FINAL CTA — más sobrio que el FinalCta original
   ════════════════════════════════════════════════════════════════ */

export function EditorialFinalCta({
  kicker,
  title,
  body,
  primaryHref = "/#contacto",
  primaryLabel = "Diagnóstico gratuito",
  secondaryHref,
  secondaryLabel,
}: {
  kicker?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <Reveal>
      <div className="relative grid grid-cols-12 gap-6 lg:gap-10 py-12 sm:py-16 border-t"
        style={{ borderColor: "rgba(91,141,239,0.15)" }}
      >
        <div className="col-span-12 lg:col-span-7">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.2em] mb-3 inline-block"
            style={{ color: "var(--accent-light)" }}
          >
            {kicker || "Siguiente paso"}
          </span>
          <h2
            className="font-bold mb-4"
            style={{
              color: "var(--text-primary)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {body}
          </p>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:flex lg:items-end lg:justify-end">
          <div className="flex flex-wrap gap-3">
            <Button as="a" href={primaryHref} variant="shine">
              {primaryLabel}
            </Button>
            {secondaryHref && secondaryLabel && (
              <Button as="a" href={secondaryHref} variant="ghost">
                {secondaryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
