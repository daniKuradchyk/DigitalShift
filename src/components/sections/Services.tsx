"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Container from "@/components/common/Container";
import { serviceOrder, services } from "@/content/services";

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Visual metadata per service ──────────────────────────────── */
const SVC_META: Record<string, { img: string; accent: string; accentRgb: string }> = {
  "software-a-medida":            { img: "/images/svc-software.png",   accent: "#5B8DEF", accentRgb: "91,141,239"  },
  "web-a-medida":                 { img: "/images/svc-web.png",        accent: "#85A2FF", accentRgb: "133,162,255" },
  "automatizacion-integraciones": { img: "/images/svc-automation.png", accent: "#4169E1", accentRgb: "65,105,225"  },
  "crm-intranet-a-medida":       { img: "/images/svc-crm.png",        accent: "#ADC1FF", accentRgb: "173,193,255" },
};

/* ═══════════════════════════════════════════════════════════════════
   SERVICE CARD — image as integrated visual, no numbers, no margins
   ═══════════════════════════════════════════════════════════════════ */
function ServiceCard({ slug, index }: { slug: string; index: number }) {
  const s = services[slug as keyof typeof services];
  const meta = SVC_META[slug];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const delay = 0.15 + index * 0.12;

  return (
    <motion.div
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      <Link href={s.href} className="block relative rounded-2xl overflow-hidden h-full">
        <div
          className="relative flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: `linear-gradient(160deg, rgba(${meta.accentRgb},0.06) 0%, rgba(10,17,40,0.97) 40%, rgba(6,11,26,0.95) 100%)`,
            borderWidth: "1px",
            borderColor: `rgba(${meta.accentRgb},0.10)`,
          }}
        >
          {/* ── Image as full-bleed background visual ── */}
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            {/* Ambient gradient behind image */}
            <div
              className="absolute inset-0 transition-all duration-700"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 40%, rgba(${meta.accentRgb},0.18) 0%, transparent 60%),
                  linear-gradient(180deg, rgba(${meta.accentRgb},0.04) 0%, rgba(6,11,26,1) 100%)
                `,
              }}
            />

            {/* Image — full bleed, no padding, covers the area */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: delay + 0.1, ease: EASE }}
            >
              <Image
                src={meta.img}
                alt={s.shortTitle}
                width={500}
                height={500}
                className="w-[75%] sm:w-[65%] h-auto object-contain transition-all duration-700 group-hover:scale-[1.08]"
                style={{
                  filter: `drop-shadow(0 20px 60px rgba(${meta.accentRgb},0.25))`,
                }}
              />
            </motion.div>

            {/* Bottom fade — seamless blend into text area */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(6,11,26,1) 0%, rgba(6,11,26,0.8) 40%, transparent 100%)",
              }}
            />

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(${meta.accentRgb},0.15), transparent 65%)`,
              }}
            />
          </div>

          {/* ── Text overlapping the fade — feels integrated ── */}
          <div className="relative -mt-8 sm:-mt-10 px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col flex-1 z-10">
            {/* Eyebrow */}
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.16em] mb-1.5"
              style={{ color: meta.accent }}
            >
              {s.eyebrow}
            </span>

            {/* Title */}
            <h3
              className="text-lg sm:text-xl font-bold mb-2 transition-colors duration-400 group-hover:text-blue-200"
              style={{ color: "var(--text-primary)", letterSpacing: "-0.015em", lineHeight: 1.25 }}
            >
              {s.shortTitle}
            </h3>

            {/* Short description */}
            <p
              className="text-[13px] sm:text-sm leading-relaxed flex-1"
              style={{ color: "var(--text-secondary)", opacity: 0.85 }}
            >
              {s.cardSummary}
            </p>

            {/* CTA */}
            <div className="mt-3 sm:mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: meta.accent }}>
              <span className="transition-all duration-400 group-hover:tracking-wide">Explorar servicio</span>
              <svg
                className="w-4 h-4 transition-transform duration-400 group-hover:translate-x-2"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* ── Bottom accent line — hover ── */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            style={{
              background: `linear-gradient(90deg, transparent, ${meta.accent}, transparent)`,
            }}
          />

          {/* ── Border glow on hover ── */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              boxShadow: `inset 0 0 0 1px rgba(${meta.accentRgb},0.20), 0 0 50px rgba(${meta.accentRgb},0.06)`,
            }}
          />
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="servicios"
      aria-labelledby="services-title"
      className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            transformOrigin: "center",
            background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.2), transparent)",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]"
          style={{ y: bgY }}
        />
      </div>

      <Container className="relative">
        {/* ── Section header ── */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
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
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={headerInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Cuatro líneas claras.{" "}
            <span className="gradient-text-static">Un solo estándar.</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            Cada servicio tiene un propósito definido, un proceso propio y un tipo de empresa al que encaja.
          </motion.p>
        </div>

        {/* ── Cards grid — 2x2 ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {serviceOrder.map((slug, i) => (
            <ServiceCard key={slug} slug={slug} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
