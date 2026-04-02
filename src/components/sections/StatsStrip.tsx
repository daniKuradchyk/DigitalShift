import Container from "@/components/common/Container";
import { homeStats } from "@/content/proof";

export default function StatsStrip() {
  return (
    <section className="relative border-y border-violet-500/8 bg-violet-500/[0.015]">
      <Container>
        <div className="grid gap-0 sm:grid-cols-2 xl:grid-cols-4">
          {homeStats.map((item) => (
            <div
              key={item.label}
              className="border-b border-violet-500/8 px-5 py-6 last:border-b-0 sm:border-r sm:last:border-r-0 xl:border-b-0"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">Dato operativo</p>
              <p className="mt-4 text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>{item.value}</p>
              <p className="mt-2 text-sm font-semibold" style={{ color: "var(--text-secondary)" }}>{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.detail}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
