"use client";

import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/marketing/Breadcrumbs";
import Button from "@/components/common/Button";
import HeroSignature from "./HeroSignature";
import type { ServiceSlug } from "@/content/services";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  slug: ServiceSlug;
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  honestyLine: string;
  metaPills: { label: string; value: string }[];
};

/**
 * Hero editorial para páginas de servicio.
 * - No usa la imagen blob genérica.
 * - Tiene un slot HeroSignature por servicio (CSS-puro).
 * - Incluye una línea de "honestidad" — qué decimos NO antes de cobrar.
 * - Meta-pills numéricos como prueba de criterio (no claims vacíos).
 */
export default function EditorialHero({
  slug,
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  honestyLine,
  metaPills,
}: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24">
      {/* Background — mínimo, asimétrico */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 75% 30%, rgba(65,105,225,0.10), transparent 60%)",
        }}
      />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16">
          {/* ── LEFT: editorial column ── */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="section-tag mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-breathe" aria-hidden />
                {eyebrow}
              </span>
            </motion.div>

            <motion.h1
              className="font-bold"
              style={{
                color: "var(--text-primary)",
                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
              }}
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            >
              {title}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl"
              style={{ color: "var(--text-secondary)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            >
              {subtitle}
            </motion.p>

            {/* Honesty line — distintiva del posicionamiento */}
            <motion.div
              className="mt-7 pl-4 border-l-2"
              style={{ borderColor: "rgba(91,141,239,0.35)" }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400 mb-1.5">
                Lo que también te diremos
              </p>
              <p
                className="text-[15px] leading-relaxed italic"
                style={{ color: "var(--text-muted)" }}
              >
                {honestyLine}
              </p>
            </motion.div>

            {/* Meta pills — números/tags como prueba */}
            <motion.div
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
            >
              {metaPills.map((p) => (
                <div key={p.label} className="flex flex-col">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {p.label}
                  </span>
                  <span
                    className="font-bold text-base sm:text-lg mt-0.5"
                    style={{ color: "var(--accent-light)" }}
                  >
                    {p.value}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            >
              <Button as="a" href="/#contacto" variant="shine">
                Diagnóstico gratuito
              </Button>
              <Button as="a" href="/servicios" variant="ghost">
                Ver todos los servicios
              </Button>
            </motion.div>
          </div>

          {/* ── RIGHT: signature visual ── */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <HeroSignature slug={slug} />
          </div>
        </div>
      </Container>
    </section>
  );
}
