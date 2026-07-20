import Container from "@/components/common/Container";
import { homeStats } from "@/content/proof";

/**
 * Banda de métricas bajo el hero. Server Component — reveal por CSS.
 */
export default function StatsBand() {
  return (
    <section aria-label="Datos operativos de Qubelia" className="relative py-2">
      <Container>
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border animate-fade-up"
          style={{
            background: "rgba(91,141,239,0.12)",
            borderColor: "rgba(91,141,239,0.16)",
          }}
        >
          {homeStats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative px-5 sm:px-7 py-6 sm:py-8 animate-fade-up"
              style={{
                background: "linear-gradient(180deg, rgba(10,17,40,0.92), rgba(6,11,26,0.96))",
                animationDelay: `${i * 90}ms`,
              }}
            >
              <span
                aria-hidden
                className="absolute left-0 top-0 h-px w-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(91,141,239,0.35), transparent)",
                }}
              />
              <div
                className="text-3xl sm:text-4xl font-bold tracking-tight gradient-text-static"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {stat.label}
              </div>
              <div className="mt-1 text-[11px] sm:text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
