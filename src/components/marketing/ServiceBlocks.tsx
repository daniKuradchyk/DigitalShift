"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ServiceProblem, ServiceScenario, ServiceStep } from "@/content/services";
import { caseStudies } from "@/content/proof";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Animated wrapper ─── */
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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROBLEM GRID
   ════════════════════════════════════════════════════════════════ */

export function ProblemGrid({ items }: { items: ServiceProblem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.1}>
          <article className="group card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25">
            <div className="flex items-start gap-4">
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </span>
              <div>
                <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DELIVERABLE LIST
   ════════════════════════════════════════════════════════════════ */

export function DeliverableList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.08}>
          <div className="group flex items-start gap-4 rounded-xl border border-transparent bg-blue-500/[0.04] p-4 transition-all hover:border-blue-400/15 hover:bg-blue-500/[0.08]">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-500/15 font-mono text-xs font-bold text-blue-400">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {item}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SCENARIO GRID
   ════════════════════════════════════════════════════════════════ */

export function ScenarioGrid({ items }: { items: ServiceScenario[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.12}>
          <article className="group card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.description}
            </p>
            {item.note && (
              <p className="mt-4 border-t border-blue-400/10 pt-3 text-xs leading-relaxed text-blue-300/60">
                {item.note}
              </p>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PROCESS TIMELINE
   ════════════════════════════════════════════════════════════════ */

export function ProcessTimeline({ items }: { items: ServiceStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <ol ref={ref} className="relative grid gap-0 md:grid-cols-4">
      {/* Connecting line */}
      <div
        aria-hidden
        className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-400/30 via-blue-400/15 to-transparent md:left-0 md:right-0 md:top-[22px] md:bottom-auto md:h-px md:w-full md:bg-gradient-to-r"
      />

      {items.map((item, i) => (
        <motion.li
          key={item.step}
          className="relative pl-14 pb-8 md:pl-0 md:pb-0 md:pr-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.15, ease: EASE }}
        >
          {/* Step dot */}
          <div className="absolute left-3 top-0 md:left-0 md:top-0 flex items-center justify-center">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-blue-400/40 bg-[var(--bg-page)]">
              <span className="font-mono text-[10px] font-bold text-blue-400">{item.step}</span>
            </span>
          </div>

          <div className="md:mt-10">
            <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

/* ════════════════════════════════════════════════════════════════
   FIT PANELS
   ════════════════════════════════════════════════════════════════ */

export function FitPanels({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Reveal delay={0}>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
              <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">Buen encaje</p>
          </div>
          <ul className="space-y-3">
            {yes.map((item) => (
              <li key={item} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15">
              <svg className="h-3.5 w-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-400/80">No encaja</p>
          </div>
          <ul className="space-y-3">
            {no.map((item) => (
              <li key={item} className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   BENEFIT LIST
   ════════════════════════════════════════════════════════════════ */

export function BenefitList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <Reveal key={item} delay={i * 0.08}>
          <div className="flex items-start gap-3 rounded-xl bg-blue-500/[0.04] p-4">
            <span className="mt-0.5 text-blue-400">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {item}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CASE HIGHLIGHTS
   ════════════════════════════════════════════════════════════════ */

export function CaseHighlights({ ids }: { ids: string[] }) {
  const selected = caseStudies.filter((item) => ids.includes(item.id));

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {selected.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.12}>
          <article className="group card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.accent }}
              />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">
                {item.client}
              </p>
            </div>
            <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              {item.headline}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item.challenge}
            </p>
            <div className="mt-4 flex items-baseline gap-3 border-t border-blue-400/10 pt-4">
              <span className="text-2xl font-black tracking-tight" style={{ color: item.accent }}>
                {item.metric}
              </span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {item.metricLabel}
              </span>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
