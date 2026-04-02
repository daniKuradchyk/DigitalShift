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
      className="border-y border-slate-200/60 bg-slate-50/50 py-8 dark:border-sky-500/8 dark:bg-[rgba(5,10,25,0.5)]"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-[320px_1fr] lg:items-center">
          <div className="surface-panel rounded-3xl p-6">
            <h2 id="stack-title" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Stack estable y criterio de produccion
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              La tecnologia cambia. Lo importante es dejar una base rapida, mantenible y comprensible para el equipo.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {stack.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50/90 px-4 py-1.5 text-sm font-medium text-slate-700 shadow-[0_10px_24px_-20px_rgba(15,23,42,0.25)] dark:border-sky-500/12 dark:bg-[rgba(56,189,248,0.04)] dark:text-slate-300"
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
