"use client";

import React, { useEffect, useRef } from "react";

type Particle = { x: number; y: number; vx: number; vy: number; size: number };

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const prefersReduce =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let rafId = 0;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const baseCount = Math.max(80, Math.floor((width + height) / 25));

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      particlesRef.current = Array.from({ length: baseCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: 0.8 + Math.random() * 0.8,
        size: 1.2 + Math.random() * 1.6,
      }));
    };

    const handleResize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      initParticles();
    };

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particlesRef.current) {
        // mouse repulsion
        if (mouseRef.current) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist2 = dx * dx + dy * dy;
          const influence = 20000; // radius^2
          if (dist2 < influence && dist2 > 0.1) {
            const force = (influence - dist2) / influence;
            p.vx += (dx / Math.sqrt(dist2)) * force * 0.6;
            p.vy += (dy / Math.sqrt(dist2)) * force * 0.6;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        // gentle drag
        p.vx *= 0.985;
        p.vy = Math.min(p.vy + 0.005, 1.6);

        // recycle
        if (p.y > height + 10 || p.x < -20 || p.x > width + 20) {
          p.x = Math.random() * width;
          p.y = -10;
          p.vx = (Math.random() - 0.5) * 0.3;
          p.vy = 0.8 + Math.random() * 0.8;
        }

        // draw particle with subtle halo
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        g.addColorStop(0, "rgba(255,255,255,0.95)");
        g.addColorStop(1, "rgba(99,137,255,0.25)");
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.shadowColor = "rgba(99,137,255,0.5)";
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rafId = requestAnimationFrame(step);
    };

    initParticles();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMove);
    if (!prefersReduce) rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [prefersReduce]);

  return <canvas className="interactive-bg" ref={canvasRef} aria-hidden />;
}
