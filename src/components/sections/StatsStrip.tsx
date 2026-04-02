import Container from "@/components/common/Container";
import { homeStats } from "@/content/proof";

export default function StatsStrip() {
  return (
    <section className="relative border-y border-slate-200/60 bg-slate-50/50 dark:border-white/[0.06] dark:bg-white/[0.02]">
      <Container>
        <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
          {homeStats.map((item) => (
            <div
              key={item.label}
              className="border-b border-slate-200/60 px-5 py-6 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0 dark:border-white/[0.06]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Dato operativo</p>
              <p className="mt-4 text-3xl font-black tracking-tight text-slate-900 dark:text-white">{item.value}</p>
              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
