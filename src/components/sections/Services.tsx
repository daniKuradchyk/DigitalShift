"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { serviceOrder, services } from "@/content/services";

const SERVICE_ICONS: Record<string, string> = {
  "software-a-medida": "/images/icon-software.png",
  "web-a-medida": "/images/icon-web.png",
  "automatizacion-integraciones": "/images/icon-automation.png",
  "crm-intranet-a-medida": "/images/icon-crm.png",
};

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="servicios"
      aria-labelledby="services-title"
      className="relative scroll-mt-28 py-24 lg:py-32"
    >
      {/* Section accents */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-brand-500/[0.03] blur-[120px]" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-tag mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
            Servicios principales
          </span>
          <h2 id="services-title" className="text-h2 mt-4 mb-6" style={{ color: "var(--text-primary)" }}>
            Cuatro líneas claras.{" "}
            <span className="gradient-text-static">Sin ambigüedad.</span>
          </h2>
          <p className="text-body-lg max-w-2xl mx-auto">
            Cada servicio tiene un propósito definido, un proceso propio y un tipo de empresa al que encaja.
            No vendemos horas: vendemos resultado.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {serviceOrder.map((slug, i) => {
            const s = services[slug];
            return (
              <motion.div
                key={slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={s.href}
                  className="group card-elevated block p-8 lg:p-10 h-full transition-all duration-500 hover:border-brand-500/25 hover:shadow-glow-lg hover:-translate-y-2"
                >
                  {/* Icon + Index */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 relative">
                      <Image
                        src={SERVICE_ICONS[slug] || "/images/icon-software.png"}
                        alt={s.shortTitle}
                        width={96}
                        height={96}
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(65,105,225,0.3)]"
                      />
                    </div>
                    <span className="text-5xl font-black text-brand-500/10 group-hover:text-brand-500/20 transition-colors">
                      {s.index}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-brand-400 transition-colors" style={{ color: "var(--text-primary)" }}>
                    {s.shortTitle}
                  </h3>
                  <p className="text-sm lg:text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                    {s.cardSummary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {s.deliverables.slice(0, 3).map((d, j) => (
                      <span
                        key={j}
                        className="text-xs px-3 py-1 rounded-full border border-brand-500/10 bg-brand-500/[0.04]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {d.split(".")[0].slice(0, 40)}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-brand-400 text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>Ver servicio completo</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button as="a" href="/servicios" variant="shine">
            Ver hub de servicios
          </Button>
          <Button as="a" href="/#contacto" variant="ghost">
            Pedir diagnóstico
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
