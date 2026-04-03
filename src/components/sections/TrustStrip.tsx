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
      className="border-y border-brand-500/8 bg-brand-500/[0.015] py-8"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
          <div className="surface-panel rounded-3xl p-6">
            <h2 id="stack-title" className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Stack estable y criterio de produccion
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              La tecnologia cambia. Lo importante es dejar una base rapida, mantenible y comprensible para el equipo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-brand-400/12 bg-brand-500/[0.04] px-4 py-1.5 text-sm font-medium shadow-[0_10px_24px_-20px_rgba(0,0,0,0.40)]"
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
