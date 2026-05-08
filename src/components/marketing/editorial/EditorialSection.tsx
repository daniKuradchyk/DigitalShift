"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  /** Subtítulo opcional. Si no, no se renderiza. */
  lead?: string;
  /** Numeración tipográfica en margen (ej. "01"). Opcional. */
  marker?: string;
  /** Variante de layout. */
  variant?: "wide" | "split" | "narrow";
  children: React.ReactNode;
};

/**
 * EditorialSection — wrapper de sección editorial.
 *
 * Diferencias vs SectionIntro+section anterior:
 * - Numeración tipográfica grande en margen (criterio editorial).
 * - Tres variantes de ancho/layout para romper la monotonía
 *   "todas las secciones igual de centradas con padding uniforme".
 */
export default function EditorialSection({
  id,
  eyebrow,
  title,
  lead,
  marker,
  variant = "wide",
  children,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className="relative scroll-mt-28 py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          {/* Marker col */}
          <div className="col-span-12 lg:col-span-1">
            {marker && (
              <motion.span
                className="font-mono text-2xl lg:text-3xl font-light tabular-nums leading-none inline-block"
                style={{
                  color: "rgba(91,141,239,0.4)",
                  letterSpacing: "-0.02em",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EASE }}
              >
                {marker}
              </motion.span>
            )}
          </div>

          {/* Content col */}
          <div
            className={
              variant === "split"
                ? "col-span-12 lg:col-span-11"
                : variant === "narrow"
                ? "col-span-12 lg:col-span-9"
                : "col-span-12 lg:col-span-11"
            }
          >
            {/* Header */}
            <div className={variant === "narrow" ? "max-w-3xl" : ""}>
              <motion.span
                className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
                style={{ color: "var(--accent-light)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: EASE }}
              >
                {eyebrow}
              </motion.span>

              <motion.h2
                className="font-bold"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                {title}
              </motion.h2>

              {lead && (
                <motion.p
                  className="mt-4 text-base sm:text-lg leading-relaxed max-w-3xl"
                  style={{ color: "var(--text-secondary)" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
                >
                  {lead}
                </motion.p>
              )}
            </div>

            {/* Body */}
            <div className="mt-10 sm:mt-12">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
