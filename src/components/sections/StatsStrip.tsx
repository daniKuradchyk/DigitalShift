"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/common/Container";

const stats = [
  {
    value: 8,
    suffix: "–10 sem",
    label: "al primer MVP en producción",
    icon: "⚡",
    color: "text-sky-500 dark:text-sky-400",
  },
  {
    value: 100,
    suffix: "%",
    label: "del código es tuyo — siempre",
    icon: "🔑",
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    value: 24,
    suffix: " h",
    label: "respuesta garantizada",
    icon: "📡",
    color: "text-violet-500 dark:text-violet-400",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1200;
        const raf = (now: number) => {
          const pct = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          setVal(Math.round(ease * target));
          if (pct < 1) requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}{suffix}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <div className="relative border-y border-slate-200/60 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.02]">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 15%, rgba(56,189,248,0.35) 50%, transparent 85%)" }} />

      <Container>
        <div className="grid grid-cols-3 divide-x divide-slate-200/60 dark:divide-white/[0.06]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 py-8 px-4 text-center"
            >
              <span className="text-xl mb-1" aria-hidden>{s.icon}</span>
              <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${s.color}`}>
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 leading-snug max-w-[120px]">{s.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
