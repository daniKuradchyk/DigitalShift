"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function HeroCube({ className = "" }: { className?: string }) {
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

  return (
    <div className={className} style={{ perspective: "1200px" }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d", rotateX, rotateY }}
      >
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
        </motion.div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{ width: "180%", height: "180%", background: "radial-gradient(circle, rgba(65,105,225,0.10) 0%, transparent 65%)", filter: "blur(40px)" }}
        />
      </motion.div>
    </div>
  );
}
