import Container from "@/components/common/Container";

const stack = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "APIs",
  "CI/CD",
  "Observabilidad",
  "Integraciones",
];

export default function TrustStrip() {
  return (
    <section
      aria-labelledby="stack-title"
      className="border-y border-blue-500/8 bg-blue-500/[0.015] py-6 sm:py-8"
    >
      <Container>
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6" style={{ background: "rgba(10,17,40,0.6)", border: "1px solid rgba(65,105,225,0.1)" }}>
            <h2 id="stack-title" className="text-base sm:text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Stack estable y criterio de producción
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              La tecnología cambia. Lo importante es dejar una base rápida, mantenible y comprensible para el equipo.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {stack.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-blue-400/12 bg-blue-500/[0.04] px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
