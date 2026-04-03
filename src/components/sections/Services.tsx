"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { serviceOrder, services } from "@/content/services";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SVC_META: Record<string, { img: string; gradient: string; accentRgb: string }> = {
  "software-a-medida":           { img: "/images/svc-software.png",   gradient: "from-blue-500/20 to-blue-600/5",   accentRgb: "91,141,239" },
  "web-a-medida":                { img: "/images/svc-web.png",        gradient: "from-sky-500/20 to-blue-500/5",    accentRgb: "133,162,255" },
  "automatizacion-integraciones":{ img: "/images/svc-automation.png", gradient: "from-indigo-500/20 to-blue-600/5", accentRgb: "65,105,225" },
  "crm-intranet-a-medida":      { img: "/images/svc-crm.png",        gradient: "from-violet-500/15 to-blue-500/5", accentRgb: "173,193,255" },
};

/* ═══════════════════════════════════════════════════════════════════
   SERVICE CARD
   ═══════════════════════════════════════════════════════════════════ */
function ServiceCard({
  slug,
  index,
  isActive,
  onActivate,
}: {
  slug: string;
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const s = services[slug as keyof typeof services];
  const meta = SVC_META[slug];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08 + index * 0.12, ease: EASE }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group"
    >
      <Link
        href={s.href}
        className="relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          background: "linear-gradient(180deg, rgba(10, 17, 40, 0.92), rgba(6, 11, 26, 0.88))",
          borderWidth: "1px",
          borderColor: isActive ? `rgba(${meta.accentRgb}, 0.3)` : "rgba(65, 105, 225, 0.1)",
          boxShadow: isActive ? `0 0 40px rgba(${meta.accentRgb}, 0.08), 0 20px 60px -20px rgba(0,0,0,0.5)` : "0 4px 24px -8px rgba(0,0,0,0.3)",
          transform: isActive ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Top accent line */}
        <div
          className="h-[2px] w-full transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${meta.accentRgb}, ${isActive ? 0.6 : 0.2}), transparent)`,
          }}
        />

        {/* Image area */}
        <div className={`relative w-full aspect-[16/10] overflow-hidden bg-gradient-to-br ${meta.gradient}`}>
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-6 sm:p-8"
            animate={isActive ? { scale: 1.05, y: -4 } : { scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={meta.img}
              alt={s.shortTitle}
              width={320}
              height={320}
              className="w-full max-w-[180px] sm:max-w-[200px] h-auto object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            />
          </motion.div>

          {/* Glow on hover */}
          <div
            className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 80%, rgba(${meta.accentRgb}, 0.15), transparent 60%)`,
              opacity: isActive ? 1 : 0,
            }}
          />

          {/* Index number — decorative */}
          <span
            className="absolute top-4 right-5 text-5xl sm:text-6xl font-black tracking-tighter pointer-events-none select-none"
            style={{ color: `rgba(${meta.accentRgb}, 0.07)` }}
          >
            {s.index}
          </span>
        </div>

        {/* Text content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          {/* Eyebrow */}
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-2"
            style={{ color: `rgba(${meta.accentRgb}, 0.7)` }}
          >
            {s.eyebrow}
          </span>

          {/* Title */}
          <h3
            className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-400 group-hover:text-blue-300"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.015em", lineHeight: 1.25 }}
          >
            {s.shortTitle}
          </h3>

          {/* Summary */}
          <p
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {s.cardSummary}
          </p>

          {/* Deliverables — always visible, compact */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.deliverables.slice(0, 3).map((d, j) => (
              <span
                key={j}
                className="text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full"
                style={{
                  border: `1px solid rgba(${meta.accentRgb}, 0.15)`,
                  background: `rgba(${meta.accentRgb}, 0.05)`,
                  color: "var(--text-muted)",
                }}
              >
                {d.split(".")[0].slice(0, 35)}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-400 group-hover:gap-3"
            style={{ color: `rgba(${meta.accentRgb}, 0.9)` }}
          >
            <span>Explorar servicio</span>
            <svg className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
      </div>

      <Container className="relative">
        {/* ── Header ───────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Servicios
            </span>
          </motion.div>

          <motion.h2
            id="services-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          >
            Cuatro líneas claras.{" "}
            <span className="gradient-text-static">Un solo estándar.</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          >
            Cada servicio tiene un propósito definido, un proceso propio y un tipo de empresa al que encaja.
          </motion.p>
        </div>

        {/* ── Cards grid — 1 col mobile, 2 cols tablet+desktop ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {serviceOrder.map((slug, i) => (
            <ServiceCard
              key={slug}
              slug={slug}
              index={i}
              isActive={active === i}
              onActivate={() => setActive(i)}
            />
          ))}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <motion.div
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
        >
          <Button as="a" href="/servicios" variant="shine" size="lg" className="w-full sm:w-auto">
            Ver todos los servicios
          </Button>
          <Button as="a" href="/#contacto" variant="ghost" size="lg" className="w-full sm:w-auto">
            Solicitar diagnóstico
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
