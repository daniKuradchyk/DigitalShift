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

/* ═══════════════════════════════════════════════════════════════════
   EASING
   ═══════════════════════════════════════════════════════════════════ */
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED 3D CUBE — CSS 3D transforms, mouse-reactive, nested
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
    { transform: "translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(65,105,225,0.22) 0%, rgba(91,141,239,0.06) 100%)", shadow: "inset 0 0 80px rgba(65,105,225,0.06)" },
    { transform: "rotateY(180deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(30,80,200,0.18) 0%, rgba(65,105,225,0.04) 100%)", shadow: "" },
    { transform: "rotateY(-90deg) translateZ(var(--cube-half))", bg: "linear-gradient(180deg, rgba(91,141,239,0.20) 0%, rgba(65,105,225,0.04) 100%)", shadow: "" },
    { transform: "rotateY(90deg) translateZ(var(--cube-half))", bg: "linear-gradient(180deg, rgba(65,105,225,0.16) 0%, rgba(133,162,255,0.04) 100%)", shadow: "" },
    { transform: "rotateX(90deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(133,162,255,0.30) 0%, rgba(91,141,239,0.08) 100%)", shadow: "inset 0 0 100px rgba(133,162,255,0.05)" },
    { transform: "rotateX(-90deg) translateZ(var(--cube-half))", bg: "linear-gradient(135deg, rgba(10,17,40,0.35) 0%, rgba(30,80,200,0.06) 100%)", shadow: "" },
  ];

  const innerTransforms = [
    "translateZ(var(--inner-half))",
    "rotateY(180deg) translateZ(var(--inner-half))",
    "rotateY(-90deg) translateZ(var(--inner-half))",
    "rotateY(90deg) translateZ(var(--inner-half))",
    "rotateX(90deg) translateZ(var(--inner-half))",
    "rotateX(-90deg) translateZ(var(--inner-half))",
  ];

  return (
    <div className={`${className}`} style={{ perspective: "1200px" }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      >
        {/* Outer cube — slow rotation */}
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
              style={{
                transform: f.transform,
                background: f.bg,
                backdropFilter: "blur(1px)",
                boxShadow: f.shadow || undefined,
              }}
            />
          ))}

          {/* Vertex dots — outer cube */}
          {[
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1],
            [-1, -1, -1], [1, -1, -1], [-1, 1, -1], [1, 1, -1],
          ].map(([x, y, z], i) => (
            <div
              key={`v-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/60"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate3d(
                  calc(${x} * var(--cube-half) - 3px),
                  calc(${y} * var(--cube-half) - 3px),
                  calc(${z} * var(--cube-half))
                )`,
                boxShadow: "0 0 6px rgba(91,141,239,0.6)",
              }}
            />
          ))}

          {/* Inner wireframe cube — counter-rotation */}
          <motion.div
            className="absolute inset-[28%]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, -360], rotateX: [0, 180] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          >
            {innerTransforms.map((t, i) => (
              <div
                key={`inner-${i}`}
                className="absolute w-full h-full border border-blue-400/15"
                style={{ transform: t }}
              />
            ))}
          </motion.div>

          {/* Micro cube — innermost, fast rotation */}
          <motion.div
            className="absolute inset-[42%]"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: [0, 360], rotateZ: [0, 360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {innerTransforms.map((t, i) => (
              <div
                key={`micro-${i}`}
                className="absolute w-full h-full border border-blue-300/10"
                style={{ transform: t.replace("--inner-half", "--micro-half") }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Glow aura */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "180%",
            height: "180%",
            background: "radial-gradient(circle, rgba(65,105,225,0.10) 0%, rgba(91,141,239,0.03) 35%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   FLOATING PARTICLES — decorative ambient dots
   ═══════════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      duration: Math.random() * 8 + 12,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.08,
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `rgba(91,141,239,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 3}px rgba(91,141,239,${p.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════════ */
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const steps = 50;
    const step = dur / steps;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      const p = 1 - Math.pow(1 - i / steps, 4);
      setDisplay(Math.round(value * p));
      if (i >= steps) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROTATING WORDS — fixed width, no layout shift
   The container renders ALL words invisibly to measure the max width,
   then only shows the active one with animation.
   ═══════════════════════════════════════════════════════════════════ */
const ROTATING_WORDS = ["impulsa", "transforma", "escala", "diferencia"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-grid align-bottom" style={{ height: "1.15em" }}>
      {/* Invisible sizer: renders the longest word to set the column width */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
        {ROTATING_WORDS.reduce((a, b) => (a.length >= b.length ? a : b))}
      </span>

      {/* Animated visible word */}
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          className="col-start-1 row-start-1 gradient-text whitespace-nowrap"
          initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-110%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   LOGO STRIP — infinite scroll marquee
   ═══════════════════════════════════════════════════════════════════ */
function LogoMarquee() {
  const tripled = [...partnerLogos, ...partnerLogos, ...partnerLogos];
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex items-center gap-16 w-max"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {tripled.map((p, i) => (
          <Image
            key={`${p.name}-${i}`}
            src={p.logo}
            alt={p.name}
            width={p.width}
            height={p.height}
            className="h-5 sm:h-6 md:h-7 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-60 transition-opacity duration-500"
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   HORIZONTAL DIVIDER — animated line
   ═══════════════════════════════════════════════════════════════════ */
function GlowDivider() {
  return (
    <div className="relative w-full max-w-xl mx-auto h-px my-10 md:my-14">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <motion.div
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-blue-400/70 to-transparent"
        animate={{ left: ["-10%", "110%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
      />
    </div>
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

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const cubeY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cubeScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.75]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden pt-20 pb-12 md:pt-0 md:pb-0"
      style={{
        "--cube-half": "clamp(80px, 13vw, 170px)",
        "--inner-half": "50%",
        "--micro-half": "50%",
      } as React.CSSProperties}
    >
      {/* ── Floating particles ───────────────────────────────── */}
      <FloatingParticles />

      {/* ── 3D Cube — behind content ─────────────────────────── */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          y: cubeY,
          scale: cubeScale,
          opacity: fadeOut,
          width: "clamp(180px, 26vw, 340px)",
          height: "clamp(180px, 26vw, 340px)",
        }}
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={inView ? { opacity: 0.65, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 2, delay: 0.3, ease: EASE_OUT_EXPO }}
        aria-hidden
      >
        <HeroCube className="w-full h-full" />
      </motion.div>

      {/* ── Content ──────────────────────────────────────────── */}
      <Container className="relative z-10">
        <motion.div
          className="flex flex-col items-center text-center"
          style={{ y: contentY, opacity: fadeOut }}
        >
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
            className="mb-6 md:mb-8"
          >
            <span className="section-tag">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
              </span>
              Software a medida para empresas B2B
            </span>
          </motion.div>

          {/* Headline — responsive, rotating word never clips */}
          <motion.h1
            id="hero-title"
            className="mb-5 md:mb-7 max-w-5xl px-2"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
            }}
            initial={{ opacity: 0, y: 40, filter: "blur(14px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1, delay: 0.15, ease: EASE_OUT_EXPO }}
          >
            <span className="block sm:inline">Software que </span>
            <RotatingWord />
            <span className="block sm:inline"> tu negocio</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-8 md:mb-10 max-w-xl text-base sm:text-lg md:text-xl px-4"
            style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT_EXPO }}
          >
            Desarrollo a medida, sin plantillas ni dependencia de proveedor.
            Herramientas que encajan en tu operativa real.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mb-10 md:mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE_OUT_EXPO }}
          >
            <Button as="a" href="/#contacto" variant="shine" size="lg" className="w-full sm:w-auto">
              Solicitar diagnóstico gratuito
            </Button>
            <Button as="a" href="#servicios" variant="ghost" size="lg" className="w-full sm:w-auto">
              Ver servicios
            </Button>
          </motion.div>

          {/* Animated divider */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <GlowDivider />
          </motion.div>

          {/* Proof metrics — compact, elegant */}
          <motion.div
            className="mb-10 md:mb-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-14"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT_EXPO }}
          >
            {[
              { val: 8, suf: "+", label: "proyectos entregados" },
              { val: 100, suf: "%", label: "código siempre tuyo" },
              { val: 24, suf: "h", label: "respuesta máxima" },
            ].map((m, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                  style={{ color: "var(--accent-light)" }}
                >
                  <Counter value={m.val} suffix={m.suf} />
                </span>
                <span
                  className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Client logos — marquee */}
          <motion.div
            className="w-full max-w-2xl"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 1 }}
          >
            <p
              className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
            >
              Empresas que confían en nosotros
            </p>
            <LogoMarquee />
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Bottom gradient fade ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 md:h-56"
        style={{ background: "linear-gradient(to top, var(--bg-page), transparent)" }}
        aria-hidden
      />
    </section>
  );
}
