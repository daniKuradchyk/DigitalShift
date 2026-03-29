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

const SOFT_SPRING = { stiffness: 28, damping: 14, mass: 0.30 };

// ─── Canvas ───────────────────────────────────────────────────────────────────

interface Pt {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  r: number; d: number;
  a: number; ph: number; fr: number;
  hub: boolean;
}

interface Pulse { fi: number; ti: number; t: number; spd: number; }
interface Ring  { x: number; y: number; t: number; spd: number; color: string; }

const HUB_COLORS = ["56,189,248", "99,102,241", "34,211,238", "14,165,233", "129,140,248"];

function runCanvas(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext("2d", { alpha: true })!;
  let W = 0, H = 0, raf = 0, frame = 0;
  const mouse = { x: -999, y: -999 };
  let scrollY = 0, prevSY = 0, scrollVel = 0;
  let pts: Pt[]    = [];
  let pulses: Pulse[] = [];
  let rings: Ring[]   = [];
  let pulseTimer = 0, ringTimer = 0;

  const CONN  = 115;
  const MR    = 160;
  const MF    = 0.052;
  const RF    = 0.020;
  const DAMP  = 0.878;
  const CONN2 = CONN * CONN;
  const MR2   = MR * MR;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.position = "absolute";
    canvas.style.inset    = "0";
    canvas.style.width    = "100%";
    canvas.style.height   = "100%";
    ctx.scale(dpr, dpr);
    initPts();
  }

  function initPts() {
    const isMobile = W < 768;
    const N = isMobile ? 22 : Math.max(32, Math.min(44, Math.floor(W * H / 17000)));
    pts = [];
    for (let i = 0; i < N; i++) {
      const hub = i < (isMobile ? 3 : 5);
      const x = Math.random() * W;
      const y = Math.random() * H;
      pts.push({
        x, y, ox: x, oy: y,
        vx: (Math.random() - 0.5) * 0.30,
        vy: (Math.random() - 0.5) * 0.30,
        r:  hub ? Math.random() * 1.8 + 1.4 : Math.random() * 1.0 + 0.35,
        d:  Math.random() * 0.55 + 0.15,
        a:  hub ? 0.55 + Math.random() * 0.15 : Math.random() * 0.28 + 0.08,
        ph: Math.random() * Math.PI * 2,
        fr: Math.random() * 0.013 + 0.004,
        hub,
      });
    }
    pulses = [];
    rings  = [];
  }

  // Pre-allocated typed arrays (zero GC pressure)
  const pys   = new Float32Array(128);
  const glows = new Float32Array(128);

  // Connection buckets
  type Seg  = [number, number, number, number];
  type GSeg = [number, number, number, number, number]; // + glow
  const base: Seg[]  = [];
  const glow: GSeg[] = [];
  const hubseg: Seg[] = [];

  function draw() {
    frame++;
    if (frame % 2 !== 0) { raf = requestAnimationFrame(draw); return; }

    ctx.clearRect(0, 0, W, H);
    scrollVel = scrollY - prevSY;
    prevSY    = scrollY;

    base.length   = 0;
    glow.length   = 0;
    hubseg.length = 0;

    // ── 1. Physics + compute py / glow ──────────────────────────
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      pys[i]   = p.y - scrollY * p.d * 0.10;
      glows[i] = 0;

      if (mouse.x > 0) {
        const dx = p.x - mouse.x;
        const dy = pys[i] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < MR2 && d2 > 0.25) {
          const dist = Math.sqrt(d2);
          const f    = (MR - dist) / MR;
          p.vx    += (dx / dist) * f * MF;
          p.vy    += (dy / dist) * f * MF;
          glows[i] = f;
        }
      }
      p.vy += scrollVel * p.d * 0.028;
      p.vx += (p.ox - p.x) * RF;
      p.vy += (p.oy - p.y) * RF;
      p.vx *= DAMP; p.vy *= DAMP;
      p.x  += p.vx; p.y  += p.vy;
      p.ph += p.fr;
    }

    // ── 2. Build connection buckets ─────────────────────────────
    for (let i = 0; i < pts.length; i++) {
      const py_i = pys[i];
      if (py_i < -60 || py_i > H + 60) continue;

      for (let j = i + 1; j < pts.length; j++) {
        const py_j = pys[j];
        if (py_j < -60 || py_j > H + 60) continue;

        const dx = pts[i].x - pts[j].x;
        const dy = py_i - py_j;
        const d2 = dx * dx + dy * dy;

        if (d2 < CONN2) {
          const maxG = Math.max(glows[i], glows[j]);
          if (maxG > 0.06) {
            const strength = 1 - Math.sqrt(d2) / CONN;
            glow.push([pts[i].x, py_i, pts[j].x, py_j, strength * (0.25 + maxG * 0.75)]);
          } else if (pts[i].hub && pts[j].hub) {
            hubseg.push([pts[i].x, py_i, pts[j].x, py_j]);
          } else {
            base.push([pts[i].x, py_i, pts[j].x, py_j]);
          }
        }
      }
    }

    // ── 3. Draw base connections (single batched path) ──────────
    if (base.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(148,163,184,0.13)";
      ctx.lineWidth   = 0.5;
      for (const [x1, y1, x2, y2] of base) {
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }

    // ── 4. Hub-to-hub backbone (cyan, slightly brighter) ────────
    if (hubseg.length > 0) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(34,211,238,0.22)";
      ctx.lineWidth   = 0.7;
      for (const [x1, y1, x2, y2] of hubseg) {
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
      }
      ctx.stroke();
    }

    // ── 5. Glowing activated connections ────────────────────────
    for (const [x1, y1, x2, y2, alpha] of glow) {
      // Core bright line
      ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
      ctx.lineWidth   = 0.6 + alpha * 1.4;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      // Soft bloom around it (wide, low alpha — fakes blur without filter)
      ctx.strokeStyle = `rgba(56,189,248,${alpha * 0.22})`;
      ctx.lineWidth   = (0.6 + alpha * 1.4) * 4;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }

    // ── 6. Expanding ring pulses from hub nodes ──────────────────
    ringTimer++;
    if (ringTimer > 45 && rings.length < 10) {
      ringTimer = 0;
      const hubPts = pts.filter((p) => p.hub);
      if (hubPts.length > 0) {
        const p   = hubPts[Math.floor(Math.random() * hubPts.length)];
        const idx = pts.indexOf(p);
        const py  = pys[idx];
        const color = HUB_COLORS[idx % HUB_COLORS.length];
        // Inner ring (fast)
        rings.push({ x: p.x, y: py, t: 0, spd: 0.028 + Math.random() * 0.016, color });
        // Outer ring (slow, delayed slightly)
        if (Math.random() > 0.4) {
          rings.push({ x: p.x, y: py, t: -0.2, spd: 0.016 + Math.random() * 0.010, color });
        }
      }
    }

    rings = rings.filter((ring) => {
      ring.t += ring.spd;
      if (ring.t <= 0) return true; // delayed ring, not yet visible
      if (ring.t > 1)  return false;
      const r     = ring.t * 72;
      const alpha = (1 - ring.t) * (ring.spd > 0.022 ? 0.45 : 0.32);
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${ring.color},${alpha})`;
      ctx.lineWidth   = 0.8;
      ctx.stroke();
      return true;
    });

    // ── 7. Particles ─────────────────────────────────────────────
    for (let i = 0; i < pts.length; i++) {
      const p   = pts[i];
      const py  = pys[i];
      if (py < -60 || py > H + 60) continue;

      const pulse = 0.80 + Math.sin(p.ph) * 0.20;
      const mg    = glows[i];

      // Hub ambient glow
      if (p.hub) {
        const grr = p.r * 5.5;
        const gr  = ctx.createRadialGradient(p.x, py, 0, p.x, py, grr);
        const hc  = mg > 0.1 ? "56,189,248" : HUB_COLORS[i % HUB_COLORS.length];
        gr.addColorStop(0,   `rgba(${hc},${Math.min(0.72, p.a * pulse + mg * 0.32) * 0.9})`);
        gr.addColorStop(0.5, `rgba(${hc},${Math.min(0.12, p.a * pulse * 0.18)})`);
        gr.addColorStop(1,   `rgba(${hc},0)`);
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.arc(p.x, py, grr, 0, Math.PI * 2); ctx.fill();
      }

      // Cursor-proximity extra glow on any node
      if (mg > 0.15) {
        const er = p.r * (p.hub ? 3.5 : 4.0);
        const eg = ctx.createRadialGradient(p.x, py, 0, p.x, py, er);
        eg.addColorStop(0, `rgba(56,189,248,${mg * 0.55})`);
        eg.addColorStop(1, `rgba(56,189,248,0)`);
        ctx.fillStyle = eg;
        ctx.beginPath(); ctx.arc(p.x, py, er, 0, Math.PI * 2); ctx.fill();
      }

      // Core dot
      const clr   = mg > 0.30 ? "56,189,248" : p.hub ? "129,140,248" : "148,163,184";
      const alpha = Math.min(1, (p.a * pulse + mg * 0.40) * 1.3);
      ctx.fillStyle = `rgba(${clr},${alpha})`;
      ctx.beginPath(); ctx.arc(p.x, py, p.r * (1 + mg * 0.40), 0, Math.PI * 2); ctx.fill();
    }

    // ── 8. Data pulses with comet trail ─────────────────────────
    pulseTimer++;
    if (pulseTimer > 75 && pulses.length < 4) {
      pulseTimer = 0;
      const fi = Math.floor(Math.random() * pts.length);
      const ti = Math.floor(Math.random() * pts.length);
      if (fi !== ti) {
        const a = pts[fi], b = pts[ti];
        const apy = a.y - scrollY * a.d * 0.10;
        const bpy = b.y - scrollY * b.d * 0.10;
        const dx  = a.x - b.x, dy = apy - bpy;
        if (dx * dx + dy * dy < CONN2) {
          pulses.push({ fi, ti, t: 0, spd: 0.020 + Math.random() * 0.020 });
        }
      }
    }

    pulses = pulses.filter((pulse) => {
      pulse.t += pulse.spd;
      if (pulse.t > 1) return false;

      const a   = pts[pulse.fi];
      const b   = pts[pulse.ti];
      const apy = a.y - scrollY * a.d * 0.10;
      const bpy = b.y - scrollY * b.d * 0.10;
      if (apy < -60 || apy > H + 60) return false;

      const fad = Math.sin(pulse.t * Math.PI);

      // Comet trail — 5 ghost dots behind the head
      for (let k = 1; k <= 5; k++) {
        const tp = pulse.t - k * pulse.spd * 2.8;
        if (tp < 0 || tp > 1) continue;
        const tx = a.x + (b.x - a.x) * tp;
        const ty = apy + (bpy - apy) * tp;
        const ta = fad * (1 - k / 6) * 0.50;
        const tr = Math.max(0.4, 3.5 - k * 0.55);
        ctx.fillStyle = `rgba(56,189,248,${ta})`;
        ctx.beginPath(); ctx.arc(tx, ty, tr, 0, Math.PI * 2); ctx.fill();
      }

      // Pulse head — radial gradient dot
      const x  = a.x  + (b.x  - a.x)  * pulse.t;
      const y  = apy  + (bpy  - apy)   * pulse.t;
      const gp = ctx.createRadialGradient(x, y, 0, x, y, 6);
      gp.addColorStop(0,   `rgba(56,189,248,${fad * 0.95})`);
      gp.addColorStop(0.4, `rgba(56,189,248,${fad * 0.45})`);
      gp.addColorStop(1,   `rgba(56,189,248,0)`);
      ctx.fillStyle = gp;
      ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();

      // Bright core
      ctx.fillStyle = `rgba(200,240,255,${fad * 0.85})`;
      ctx.beginPath(); ctx.arc(x, y, 1.4, 0, Math.PI * 2); ctx.fill();

      return true;
    });

    raf = requestAnimationFrame(draw);
  }

  function onMouse(e: MouseEvent)  { mouse.x = e.clientX; mouse.y = e.clientY; }
  function onLeave()               { mouse.x = -999; mouse.y = -999; }
  function onScroll()              { scrollY = window.scrollY; }

  resize();
  raf = requestAnimationFrame(draw);
  window.addEventListener("mousemove",    onMouse,  { passive: true });
  window.addEventListener("scroll",       onScroll, { passive: true });
  window.addEventListener("resize",       resize,   { passive: true });
  document.addEventListener("mouseleave", onLeave);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove",    onMouse);
    window.removeEventListener("scroll",       onScroll);
    window.removeEventListener("resize",       resize);
    document.removeEventListener("mouseleave", onLeave);
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveBackground() {
  const prefersReducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const viewport  = useRef({ width: 1440, height: 900 });

  const pointerX     = useMotionValue(0);
  const pointerY     = useMotionValue(0);
  const pointerXSoft = useSpring(pointerX, SOFT_SPRING);
  const pointerYSoft = useSpring(pointerY, SOFT_SPRING);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current) return;
    return runCanvas(canvasRef.current);
  }, [prefersReducedMotion]);

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
    const handleMove  = (e: PointerEvent) => { pointerX.set(e.clientX); pointerY.set(e.clientY); };
    const handleLeave = () => {
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

  const haloX = useTransform(pointerXSoft, (v) => v - 430);
  const haloY = useTransform(pointerYSoft, (v) => v - 430);
  const beamX = useTransform(pointerXSoft, (v) => v - 520);

  const gridX      = useTransform(pointerXSoft, (v) => (v - viewport.current.width  * 0.5) * -0.035);
  const gridY      = useTransform(pointerYSoft, (v) => (v - viewport.current.height * 0.5) * -0.030);
  const meshOneY   = useTransform(scrollYProgress, [0, 1], [-100, 140]);
  const meshTwoY   = useTransform(scrollYProgress, [0, 1], [90, -120]);
  const meshOneRot = useTransform(scrollYProgress, [0, 1], [-10, 16]);
  const meshTwoRot = useTransform(scrollYProgress, [0, 1], [12, -10]);
  const beamY      = useTransform(scrollYProgress, [0, 1], [-200, 860]);
  const beamOpacity= useTransform(scrollYProgress, [0, 0.2, 0.65, 1], [0.25, 0.46, 0.32, 0.20]);

  return (
    <div className="interactive-bg" aria-hidden>
      <motion.div
        className="interactive-bg__backdrop"
        animate={prefersReducedMotion ? undefined : {
          scale:  [1, 1.04, 0.98, 1],
          rotate: [0, 5, -4, 0],
          x:      ["0%", "-2%", "1%", "0%"],
          y:      ["0%", "2.5%", "-1.5%", "0%"],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="interactive-bg__mesh interactive-bg__mesh--one"
        style={{ y: meshOneY, rotate: meshOneRot }}
        animate={prefersReducedMotion ? undefined : {
          scale:   [1, 1.08, 0.97, 1],
          opacity: [0.55, 0.68, 0.57, 0.55],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="interactive-bg__mesh interactive-bg__mesh--two"
        style={{ y: meshTwoY, rotate: meshTwoRot }}
      />

      <motion.div className="interactive-bg__grid" style={{ x: gridX, y: gridY }} />

      <canvas ref={canvasRef} className="interactive-bg__canvas" />

      <motion.div className="interactive-bg__beam" style={{ x: beamX, y: beamY, opacity: beamOpacity }} />
      <motion.div className="interactive-bg__halo" style={{ x: haloX, y: haloY, rotate: meshTwoRot }} />

      <div className="interactive-bg__noise" />
      <div className="interactive-bg__vignette" />
    </div>
  );
}
