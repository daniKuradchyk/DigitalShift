"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const SOFT_SPRING = { stiffness: 32, damping: 14, mass: 0.28 };

// ─── Canvas particle system ───────────────────────────────────────────────────

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  r: number;
  d: number;   // depth 0‒1 for parallax
  a: number;   // base alpha
  ph: number;  // pulse phase
  fr: number;  // pulse frequency
  hub: boolean;
}

interface Pulse {
  fi: number; ti: number; // from/to particle index
  t: number;              // progress 0‒1
  spd: number;
}

function runCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d")!;
  let W = 0, H = 0, raf = 0;
  const mouse = { x: -999, y: -999 };
  let scrollY = 0, prevSY = 0, scrollVel = 0;
  let pts: Pt[] = [];
  let pulses: Pulse[] = [];
  let pulseTimer = 0;

  const CONN = 125;
  const MR   = 195;
  const MF   = 0.055;
  const RF   = 0.022;
  const DAMP = 0.875;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    canvas.style.position = "absolute";
    canvas.style.inset     = "0";
    canvas.style.width     = "100%";
    canvas.style.height    = "100%";
    ctx.scale(dpr, dpr);
    initPts();
  }

  function initPts() {
    const N = Math.max(55, Math.min(95, Math.floor(W * H / 12000)));
    pts = [];
    for (let i = 0; i < N; i++) {
      const hub = i < 7;
      const x = Math.random() * W;
      const y = Math.random() * H;
      pts.push({
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r:  hub ? Math.random() * 1.8 + 1.6 : Math.random() * 1.1 + 0.35,
        d:  Math.random() * 0.62 + 0.18,
        a:  hub ? 0.55 + Math.random() * 0.15 : Math.random() * 0.32 + 0.10,
        ph: Math.random() * Math.PI * 2,
        fr: Math.random() * 0.016 + 0.005,
        hub,
      });
    }
    pulses = [];
  }

  function draw(time: number) {
    void time;
    ctx.clearRect(0, 0, W, H);

    scrollVel  = scrollY - prevSY;
    prevSY     = scrollY;

    // ── Particles ────────────────────────────────────────────────
    for (let i = 0; i < pts.length; i++) {
      const p  = pts[i];
      const py = p.y - scrollY * p.d * 0.12;

      // Physics even when off-screen
      if (mouse.x > 0) {
        const dx   = p.x - mouse.x;
        const dy   = py  - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MR && dist > 0.5) {
          const f = (MR - dist) / MR;
          p.vx += (dx / dist) * f * MF;
          p.vy += (dy / dist) * f * MF;
        }
      }
      p.vy  += scrollVel * p.d * 0.035;
      p.vx  += (p.ox - p.x) * RF;
      p.vy  += (p.oy - p.y) * RF;
      p.vx  *= DAMP;
      p.vy  *= DAMP;
      p.x   += p.vx;
      p.y   += p.vy;
      p.ph  += p.fr;

      if (py < -50 || py > H + 50) continue;

      const pulse  = 0.78 + Math.sin(p.ph) * 0.22;
      const mdist  = mouse.x > 0 ? Math.sqrt((p.x - mouse.x) ** 2 + (py - mouse.y) ** 2) : 9999;
      const mglow  = mdist < MR ? (1 - mdist / MR) : 0;

      // ── Connections ──────────────────────────────────────────
      for (let j = i + 1; j < pts.length; j++) {
        const q  = pts[j];
        const qy = q.y - scrollY * q.d * 0.12;
        if (qy < -50 || qy > H + 50) continue;
        const cdx = p.x - q.x;
        const cdy = py  - qy;
        const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cd < CONN) {
          const la = (1 - cd / CONN) * 0.22 * pulse;
          ctx.strokeStyle = `rgba(148,163,184,${la})`;
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, py);
          ctx.lineTo(q.x, qy);
          ctx.stroke();
        }
      }

      // ── Glow for hub / near-cursor particles ─────────────────
      if (p.hub || mglow > 0.18) {
        const grr  = p.r * (p.hub ? 5.5 : 4.5);
        const gr   = ctx.createRadialGradient(p.x, py, 0, p.x, py, grr);
        const clr  = mglow > 0.05 ? "56,189,248" : "129,140,248";
        const ga   = Math.min(0.7, (p.a * pulse + mglow * 0.35));
        gr.addColorStop(0, `rgba(${clr},${ga * 0.9})`);
        gr.addColorStop(1, `rgba(${clr},0)`);
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(p.x, py, grr, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Core dot ─────────────────────────────────────────────
      const clr2  = mglow > 0.4 ? "56,189,248" : p.hub ? "129,140,248" : "148,163,184";
      const alpha = Math.min(1, (p.a * pulse + mglow * 0.4) * 1.35);
      ctx.fillStyle = `rgba(${clr2},${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, py, p.r * (1 + mglow * 0.4), 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Data pulses ───────────────────────────────────────────────
    pulseTimer++;
    if (pulseTimer > 50 + Math.random() * 90) {
      pulseTimer = 0;
      const fi = Math.floor(Math.random() * pts.length);
      const ti = Math.floor(Math.random() * pts.length);
      if (fi !== ti) {
        const a = pts[fi], b = pts[ti];
        const apy = a.y - scrollY * a.d * 0.12;
        const bpy = b.y - scrollY * b.d * 0.12;
        const dx  = a.x - b.x;
        const dy  = apy - bpy;
        if (Math.sqrt(dx * dx + dy * dy) < CONN) {
          pulses.push({ fi, ti, t: 0, spd: 0.016 + Math.random() * 0.028 });
        }
      }
    }

    pulses = pulses.filter((pulse) => {
      pulse.t += pulse.spd;
      if (pulse.t > 1) return false;

      const a   = pts[pulse.fi];
      const b   = pts[pulse.ti];
      const apy = a.y - scrollY * a.d * 0.12;
      const bpy = b.y - scrollY * b.d * 0.12;
      if (apy < -50 || apy > H + 50) return false;

      const x   = a.x  + (b.x  - a.x)  * pulse.t;
      const y   = apy  + (bpy  - apy)   * pulse.t;
      const fad = Math.sin(pulse.t * Math.PI);
      const gp  = ctx.createRadialGradient(x, y, 0, x, y, 5);
      gp.addColorStop(0, `rgba(56,189,248,${fad * 0.85})`);
      gp.addColorStop(0.6, `rgba(56,189,248,${fad * 0.25})`);
      gp.addColorStop(1, `rgba(56,189,248,0)`);
      ctx.fillStyle = gp;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
      return true;
    });

    raf = requestAnimationFrame(draw);
  }

  function onMouse(e: MouseEvent)  { mouse.x = e.clientX; mouse.y = e.clientY; }
  function onLeave()               { mouse.x = -999;      mouse.y = -999; }
  function onScroll()              { scrollY = window.scrollY; }

  resize();
  raf = requestAnimationFrame(draw);
  window.addEventListener("mousemove", onMouse,  { passive: true });
  window.addEventListener("scroll",    onScroll, { passive: true });
  window.addEventListener("resize",    resize,   { passive: true });
  document.addEventListener("mouseleave", onLeave);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMouse);
    window.removeEventListener("scroll",    onScroll);
    window.removeEventListener("resize",    resize);
    document.removeEventListener("mouseleave", onLeave);
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveBackground() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const viewport   = useRef({ width: 1440, height: 900 });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const pointerXSoft = useSpring(pointerX, SOFT_SPRING);
  const pointerYSoft = useSpring(pointerY, SOFT_SPRING);

  const { scrollYProgress } = useScroll();

  // ── Canvas particles ───────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;
    return runCanvas(canvasRef.current);
  }, [prefersReducedMotion]);

  // ── Framer Motion pointer tracking ────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setCenter = () => {
      viewport.current = { width: window.innerWidth, height: window.innerHeight };
      pointerX.set(window.innerWidth  * 0.52);
      pointerY.set(window.innerHeight * 0.28);
    };
    const handleResize = () => {
      viewport.current = { width: window.innerWidth, height: window.innerHeight };
    };
    const handleMove   = (e: PointerEvent) => { pointerX.set(e.clientX); pointerY.set(e.clientY); };
    const handleLeave  = () => {
      pointerX.set(viewport.current.width  * 0.52);
      pointerY.set(viewport.current.height * 0.28);
    };

    setCenter();
    window.addEventListener("resize", handleResize);
    if (!prefersReducedMotion) {
      window.addEventListener("pointermove", handleMove, { passive: true });
      document.body.addEventListener("pointerleave", handleLeave);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handleMove);
      document.body.removeEventListener("pointerleave", handleLeave);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  // ── Motion transforms ─────────────────────────────────────────
  const haloX             = useTransform(pointerXSoft,  (v) => v - 430);
  const haloY             = useTransform(pointerYSoft,  (v) => v - 430);
  const beamX             = useTransform(pointerXSoft,  (v) => v - 520);

  const gridX       = useTransform(pointerXSoft, (v) => (v - viewport.current.width  * 0.5) * -0.04);
  const gridY       = useTransform(pointerYSoft, (v) => (v - viewport.current.height * 0.5) * -0.035);
  const meshOneX    = useTransform(pointerXSoft, (v) => (v - viewport.current.width  * 0.5) *  0.055);
  const meshTwoX    = useTransform(pointerXSoft, (v) => (v - viewport.current.width  * 0.5) * -0.045);
  const meshOneY    = useTransform(scrollYProgress, [0, 1], [-110, 150]);
  const meshTwoY    = useTransform(scrollYProgress, [0, 1], [100, -130]);
  const meshOneRot  = useTransform(scrollYProgress, [0, 1], [-12, 18]);
  const meshTwoRot  = useTransform(scrollYProgress, [0, 1], [14, -12]);
  const beamY       = useTransform(scrollYProgress, [0, 1], [-200, 860]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.18, 0.62, 1], [0.28, 0.52, 0.36, 0.22]);

  return (
    <div className="interactive-bg" aria-hidden>
      {/* Base aurora gradient */}
      <motion.div
        className="interactive-bg__backdrop"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.05, 0.98, 1], rotate: [0, 6, -5, 0], x: ["0%", "-2.5%", "1.5%", "0%"], y: ["0%", "3%", "-2%", "0%"] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Color mesh blobs */}
      <motion.div
        className="interactive-bg__mesh interactive-bg__mesh--one"
        style={{ x: meshOneX, y: meshOneY, rotate: meshOneRot }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.10, 0.96, 1], opacity: [0.58, 0.72, 0.60, 0.58] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="interactive-bg__mesh interactive-bg__mesh--two"
        style={{ x: meshTwoX, y: meshTwoY, rotate: meshTwoRot }}
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 0.95, 1.07, 1], opacity: [0.50, 0.66, 0.52, 0.50] }
        }
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="interactive-bg__mesh interactive-bg__mesh--three"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: [1, 1.08, 0.94, 1], opacity: [0.35, 0.50, 0.38, 0.35], rotate: [0, -8, 5, 0] }
        }
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dot + line grid */}
      <motion.div className="interactive-bg__grid" style={{ x: gridX, y: gridY }} />

      {/* Canvas particle constellation */}
      <canvas ref={canvasRef} className="interactive-bg__canvas" />

      {/* Light beam sweeping with scroll */}
      <motion.div className="interactive-bg__beam" style={{ x: beamX, y: beamY, opacity: beamOpacity }} />

      {/* Cursor-following glows */}

      {/* Halo ring */}
      <motion.div className="interactive-bg__halo" style={{ x: haloX, y: haloY, rotate: meshTwoRot }} />

      {/* Noise + vignette */}
      <div className="interactive-bg__noise" />
      <div className="interactive-bg__vignette" />
    </div>
  );
}
