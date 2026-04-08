"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { partnerLogos } from "@/content/proof";

/* ─── Shared animation constants (used across ALL sections) ────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════════
   3D CUBE — CSS transforms, mouse-reactive
   ═══════════════════════════════════════════════════════════════════ */
function HeroCube({ className = "" }: { className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 20, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 20, damping: 18 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(((e.clientX - cx) / cx) * 15);
      mouseY.set(((e.clientY - cy) / cy) * -15);
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(smoothY, (v) => 22 + v);
  const rotateY = useTransform(smoothX, (v) => -35 + v);

  if (!mounted) return null;

  const faces = [
    { transform: "translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(65,105,225,0.22) 0%, rgba(91,141,239,0.06) 100%)" },
    { transform: "rotateY(180deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(30,80,200,0.18) 0%, rgba(65,105,225,0.04) 100%)" },
    { transform: "rotateY(-90deg) translateZ(var(--cube-half))", bg: "linear-gradient(180deg, rgba(91,141,239,0.20) 0%, rgba(65,105,225,0.04) 100%)" },
    { transform: "rotateY(90deg) translateZ(var(--cube-half))", bg: "linear-gradient(180deg, rgba(65,105,225,0.16) 0%, rgba(133,162,255,0.04) 100%)" },
    { transform: "rotateX(90deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(133,162,255,0.30) 0%, rgba(91,141,239,0.08) 100%)" },
    { transform: "rotateX(-90deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(10,17,40,0.35) 0%, rgba(30,80,200,0.06) 100%)" },
  ];

  const innerT = [
    "translateZ(var(--inner-half))",
    "rotateY(180deg) translateZ(var(--inner-half))",
    "rotateY(-90deg) translateZ(var(--inner-half))",
    "rotateY(90deg) translateZ(var(--inner-half))",
    "rotateX(90deg) translateZ(var(--inner-half))",
    "rotateX(-90deg) translateZ(var(--inner-half))",
  ];

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <motion.div className="relative w-full h-full" style={{ transformStyle: "preserve-3d", rotateX, rotateY }}>
        <motion.div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {faces.map((f, i) => (
            <div
              key={i}
              className="absolute w-full h-full border border-white/[0.04]"
              style={{ transform: f.transform, background: f.bg, backdropFilter: "blur(1px)" }}
            />
          ))}
          {[[-1,-1,1],[1,-1,1],[-1,1,1],[1,1,1],[-1,-1,-1],[1,-1,-1],[-1,1,-1],[1,1,-1]].map(([x,y,z],i) => (
            <div
              key={`v-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/60"
              style={{
                left: "50%", top: "50%",
                transform: `translate3d(calc(${x} * var(--cube-half) - 3px), calc(${y} * var(--cube-half) - 3px), calc(${z} * var(--cube-half)))`,
                boxShadow: "0 0 6px rgba(91,141,239,0.6)",
              }}
            />
          ))}
          <motion.div
            className="absolute inset-[28%]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, -360], rotateX: [0, 180] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          >
            {innerT.map((t, i) => (
              <div key={`inner-${i}`} className="absolute w-full h-full border border-blue-400/15" style={{ transform: t }} />
            ))}
          </motion.div>
        </motion.div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: "180%", height: "180%", background: "radial-gradient(circle, rgba(65,105,225,0.10) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.25 + 0.08,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: `rgba(91,141,239,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(91,141,239,${p.opacity * 0.5})`,
          }}
          animate={{ y: [0, -25, 0], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROTATING WORDS
   ═══════════════════════════════════════════════════════════════════ */
const WORDS = ["impulsa", "transforma", "escala", "diferencia"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % WORDS.length), 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-grid align-bottom" style={{ height: "1.15em" }}>
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
        {WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          className="col-start-1 row-start-1 gradient-text whitespace-nowrap"
          initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN HERO
   ═══════════════════════════════════════════════════════════════════ */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const cubeY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const cubeOpacity = useTransform(scrollYProgress, [0, 0.5], [0.6, 0]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{
        "--cube-half": "clamp(60px, 11vw, 150px)",
        "--inner-half": "50%",
      } as React.CSSProperties}
    >
      <FloatingParticles />

      {/* ── 3D Cube — decorative, behind content ── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-0 hidden sm:block"
        style={{
          y: cubeY,
          opacity: cubeOpacity,
          width: "clamp(160px, 22vw, 300px)",
          height: "clamp(160px, 22vw, 300px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 0.6, scale: 1 } : {}}
        transition={{ duration: 2, delay: 0.3, ease: EASE }}
        aria-hidden
      >
        <HeroCube className="w-full h-full" />
      </motion.div>

      {/* ── Content ── */}
      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center pt-28 sm:pt-32 md:pt-40 lg:pt-48 pb-16 sm:pb-20 md:pb-24">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Software a medida para empresas B2B
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-title"
            className="mb-4 sm:mb-5 max-w-4xl"
            style={{
              fontSize: "clamp(1.9rem, 5.5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          >
            Software a medida que{" "}
            <RotatingWord />
            <br className="hidden sm:block" />
            {" "}tu empresa
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-7 sm:mb-8 max-w-lg text-[15px] sm:text-base md:text-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          >
            Desarrollo de software a medida para empresas B2B en España.
            Sin plantillas ni dependencia de proveedor.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-10 sm:mb-12 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            <Button as="a" href="/#contacto" variant="shine" size="lg" className="w-full sm:w-auto">
              Solicitar diagnóstico gratuito
            </Button>
            <Button as="a" href="#servicios" variant="ghost" size="lg" className="w-full sm:w-auto">
              Ver servicios
            </Button>
          </motion.div>

          {/* Single hero metric — 100+ proyectos */}
          <motion.div
            className="mb-10 sm:mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-5 py-2.5">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--accent-light)" }}>
                100+
              </span>
              <span className="text-xs sm:text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                proyectos entregados a empresas B2B
              </span>
            </div>
          </motion.div>

          {/* Client logos */}
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="mb-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Empresas que confían en nosotros
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-10 md:gap-x-14">
              {partnerLogos.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.6 }}
                >
                  <Image
                    src={p.logo}
                    alt={`Logo de ${p.name} — cliente de Qubelia`}
                    width={p.width}
                    height={p.height}
                    className="h-5 sm:h-6 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-60 transition-opacity duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* ── Bottom gradient — seamless transition ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-40"
        style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
        aria-hidden
      />
    </section>
  );
}
