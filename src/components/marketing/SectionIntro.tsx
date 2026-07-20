"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Nivel semántico del titular. Usa "h1" en el hero de la página. */
  as?: "h1" | "h2";
};

export default function SectionIntro({ eyebrow, title, description, align = "left", as: Heading = "h2" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const centered = align === "center";

  const words = title.split(" ");

  return (
    <div ref={ref} className={`relative ${centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}`}>
      {/* Eyebrow tag */}
      <motion.div
        className={`section-tag mb-5 ${centered ? "mx-auto w-fit" : ""}`}
        initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-breathe" aria-hidden />
        {eyebrow}
      </motion.div>

      {/* Headline — word-by-word blur reveal */}
      <Heading className="max-w-4xl text-3xl font-bold tracking-tight sm:text-[2.65rem] leading-[1.1]" style={{ color: "var(--text-primary)" }}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.04, ease: EASE }}
          >
            {word}
          </motion.span>
        ))}
      </Heading>

      {/* Description */}
      {description && (
        <motion.p
          className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + words.length * 0.04, ease: EASE }}
        >
          {description}
        </motion.p>
      )}

      {/* Animated divider line */}
      <motion.div
        className="mt-6 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--border-glow), transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      />
    </div>
  );
}
