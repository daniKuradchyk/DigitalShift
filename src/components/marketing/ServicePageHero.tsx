"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/common/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/marketing/Breadcrumbs";
import Button from "@/components/common/Button";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  panelTitle: string;
  panelLines: string[];
  image?: string;
};

export default function ServicePageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  panelTitle,
  panelLines,
  image,
}: Props) {
  const words = title.split(" ");

  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(65,105,225,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(91,141,239,0.08), transparent 50%)",
        }}
      />

      <Container className="relative">
        <Breadcrumbs items={breadcrumbs} />

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start">
          {/* Left — Content */}
          <div>
            <motion.div
              className="section-tag mb-5"
              initial={{ opacity: 0, scale: 0.6, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-breathe" aria-hidden />
              {eyebrow}
            </motion.div>

            <h1 className="max-w-3xl text-h1" style={{ color: "var(--text-primary)" }}>
              {words.map((word, i) => (
                <motion.span
                  key={`${word}-${i}`}
                  className="inline-block mr-[0.3em]"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: EASE }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-5 max-w-2xl text-lg leading-relaxed"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            >
              <Button as="a" href="/#contacto" variant="shine">
                Solicitar diagnóstico
              </Button>
              <Button as="a" href="/servicios" variant="ghost">
                Ver todos los servicios
              </Button>
            </motion.div>

            {/* Image below CTAs on mobile, hidden on desktop */}
            {image && (
              <motion.div
                className="relative mt-10 lg:hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              >
                <div className="relative mx-auto w-full max-w-sm">
                  <div
                    aria-hidden
                    className="absolute inset-0 -m-4 rounded-3xl"
                    style={{ background: "radial-gradient(circle, rgba(65,105,225,0.15), transparent 70%)" }}
                  />
                  <Image
                    src={image}
                    alt=""
                    width={400}
                    height={400}
                    className="relative w-full drop-shadow-[0_20px_60px_rgba(65,105,225,0.25)]"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — Panel + Image */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            {/* Service image */}
            {image && (
              <div className="relative mb-6">
                <div
                  aria-hidden
                  className="absolute inset-0 -m-6 rounded-3xl"
                  style={{ background: "radial-gradient(circle, rgba(65,105,225,0.12), transparent 70%)" }}
                />
                <Image
                  src={image}
                  alt=""
                  width={380}
                  height={380}
                  className="relative w-full animate-float-slow drop-shadow-[0_20px_60px_rgba(65,105,225,0.20)]"
                />
              </div>
            )}

            {/* Info panel */}
            <div className="card-glass rounded-2xl p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">{panelTitle}</p>
              <ul className="mt-4 space-y-3">
                {panelLines.map((line, i) => (
                  <motion.li
                    key={line}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" aria-hidden />
                    {line}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
