"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import ServiceVisual from "@/components/marketing/ServiceVisual";
import { serviceOrder, services, type ServiceSlug } from "@/content/services";

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Visual accent per service (sutil, sólo color) ────────────── */
const SVC_ACCENT: Record<string, { rgb: string; hex: string }> = {
  "software-a-medida":            { rgb: "91,141,239",  hex: "#5B8DEF" },
  "web-a-medida":                 { rgb: "133,162,255", hex: "#85A2FF" },
  "automatizacion-integraciones": { rgb: "65,105,225",  hex: "#4169E1" },
  "crm-intranet-a-medida":        { rgb: "173,193,255", hex: "#ADC1FF" },
};

/* ═══════════════════════════════════════════════════════════════════
   SERVICE ROW — fila editorial asimétrica, sin card-blob
   ═══════════════════════════════════════════════════════════════════ */
function ServiceRow({ slug, index, total }: { slug: string; index: number; total: number }) {
  const s = services[slug as keyof typeof services];
  const accent = SVC_ACCENT[slug];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const delay = 0.1 + index * 0.08;
  const indexNum = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="group relative"
    >
      <Link
        href={s.href}
        className="block relative py-10 sm:py-14 lg:py-16 transition-colors duration-500"
        style={{ ["--svc-rgb" as string]: accent.rgb }}
      >
        {/* ── Hover wash (full row, sutil) ── */}
        <div
          className="pointer-events-none absolute inset-x-[-1.5rem] sm:inset-x-[-2rem] inset-y-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              `radial-gradient(ellipse at 30% 50%, rgba(${accent.rgb}, 0.05) 0%, transparent 65%)`,
          }}
        />

        <div className="relative grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* ── Numeración tipográfica ── */}
          <div className="col-span-12 sm:col-span-2 lg:col-span-1 order-1">
            <span
              className="font-mono text-2xl sm:text-3xl lg:text-4xl font-light tabular-nums leading-none transition-colors duration-500"
              style={{
                color: `rgba(${accent.rgb}, 0.55)`,
                letterSpacing: "-0.02em",
              }}
            >
              {indexNum}
            </span>
          </div>

          {/* ── Bloque principal (texto editorial) ── */}
          <div className="col-span-12 sm:col-span-10 lg:col-span-7 order-2">
            <span
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 sm:mb-3 inline-block"
              style={{ color: accent.hex, opacity: 0.85 }}
            >
              {s.eyebrow}
            </span>

            <h3
              className="font-bold mb-3 sm:mb-4 transition-colors duration-300"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
              }}
            >
              {s.shortTitle}
            </h3>

            <p
              className="text-[15px] sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
            >
              {s.cardSummary}
            </p>

            {/* Stack tags — mono, mostrando sustancia técnica */}
            <ul className="flex flex-wrap gap-x-3 gap-y-2 mb-6 sm:mb-7">
              {s.homeStack.map((tag) => (
                <li
                  key={tag}
                  className="font-mono text-[11px] sm:text-xs px-2.5 py-1 rounded border"
                  style={{
                    color: "var(--text-secondary)",
                    background: `rgba(${accent.rgb}, 0.04)`,
                    borderColor: `rgba(${accent.rgb}, 0.12)`,
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* CTA tipográfico — sin bordes ni botón */}
            <span
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-400"
              style={{ color: accent.hex }}
            >
              <span className="border-b border-transparent group-hover:border-current transition-colors duration-300">
                Explorar este servicio
              </span>
              <svg
                className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-1.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>

          {/* ── Panel visual + sí/no a la derecha ── */}
          <div className="col-span-12 lg:col-span-4 order-3 lg:pl-6 lg:border-l border-blue-500/10">
            {/* Ilustración del servicio */}
            <ServiceVisual
              slug={slug as ServiceSlug}
              accentRgb={accent.rgb}
              className="mb-6 aspect-[8/5] transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Cuándo sí */}
            <div className="mb-5">
              <div
                className="flex items-center gap-2 mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: accent.hex }}
              >
                <span
                  className="inline-block w-3 h-px"
                  style={{ background: accent.hex }}
                />
                Cuándo sí encaja
              </div>
              <ul className="space-y-1.5">
                {s.homeFitYes.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] sm:text-sm leading-snug flex gap-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span aria-hidden style={{ color: accent.hex, opacity: 0.6 }}>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cuándo no */}
            <div>
              <div
                className="flex items-center gap-2 mb-2.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: "var(--text-muted)" }}
              >
                <span
                  className="inline-block w-3 h-px"
                  style={{ background: "var(--text-muted)" }}
                />
                Cuándo no
              </div>
              <ul className="space-y-1.5">
                {s.homeFitNo.map((item) => (
                  <li
                    key={item}
                    className="text-[13px] sm:text-sm leading-snug flex gap-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    <span aria-hidden>·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>

      {/* ── Separador inferior — fino, no card border ── */}
      {index < total - 1 && (
        <div
          className="h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(65,105,225,0.12) 30%, rgba(65,105,225,0.12) 70%, transparent)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SECTION HEADER — asimétrico (no centro)
   ═══════════════════════════════════════════════════════════════════ */
function SectionHeader({ inView }: { inView: boolean }) {
  return (
    <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-20">
      {/* Eyebrow + H2 a la izquierda */}
      <div className="col-span-12 lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="section-tag mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Servicios
          </span>
        </motion.div>

        <motion.h2
          id="services-title"
          className="text-h2"
          style={{ color: "var(--text-primary)" }}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
        >
          Cuatro formas de resolver lo que el SaaS{" "}
          <span className="gradient-text-static">no resuelve</span>.
        </motion.h2>
      </div>

      {/* Subtítulo a la derecha */}
      <motion.div
        className="col-span-12 lg:col-span-5 lg:pt-2"
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
      >
        <p
          className="text-[15px] sm:text-base lg:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Software, web, automatización y sistemas internos a medida.
          Cada uno con su propio encaje — y honestidad para decirte cuándo
          <em
            className="not-italic font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {" "}no es lo que necesitas
          </em>.
        </p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   "NONE OF THESE FIT" — cierre honesto
   ═══════════════════════════════════════════════════════════════════ */
function HonestClose({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-12 gap-6 sm:gap-8"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
    >
      <div className="col-span-12 sm:col-span-2 lg:col-span-1">
        <span
          className="font-mono text-2xl sm:text-3xl lg:text-4xl font-light tabular-nums leading-none"
          style={{ color: "var(--text-muted)", letterSpacing: "-0.02em" }}
        >
          —
        </span>
      </div>
      <div className="col-span-12 sm:col-span-10 lg:col-span-11">
        <span
          className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em] mb-3 inline-block"
          style={{ color: "var(--text-muted)" }}
        >
          Si no encajas
        </span>
        <p
          className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-3xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Si tu caso no entra limpio en ninguno de los cuatro,
          <span style={{ color: "var(--text-primary)" }}>
            {" "}también te lo decimos
          </span>. A veces lo correcto es un SaaS, un freelance, o no hacer
          nada todavía. La conversación inicial es gratuita y honesta — sin
          presión comercial.
        </p>
        <Link
          href="/#contacto"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors"
        >
          <span className="border-b border-blue-300/40 hover:border-blue-200">
            Cuéntanos qué problema tienes
          </span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* ── Background — minimal, sin blob ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            transformOrigin: "center",
            background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.2), transparent)",
          }}
        />
      </div>

      <Container className="relative">
        <SectionHeader inView={inView} />

        {/* ── Filas de servicios — vertical, asimétrico ── */}
        <div className="relative">
          {serviceOrder.map((slug, i) => (
            <ServiceRow
              key={slug}
              slug={slug}
              index={i}
              total={serviceOrder.length}
            />
          ))}
        </div>

        <HonestClose inView={inView} />
      </Container>
    </section>
  );
}
