import Container from "@/components/common/Container";
import SectionIntro from "@/components/marketing/SectionIntro";
import { serviceHubMethod } from "@/content/services";

export default function Methodology() {
  return (
    <section
      id="metodologia"
      aria-labelledby="method-title"
      className="scroll-mt-28 bg-violet-500/[0.01] py-20 lg:py-24"
    >
      <Container>
        <SectionIntro
          eyebrow="Metodología"
          title="Proceso claro para no vender humo antes de construir"
          description="No arrancamos un proyecto tecnológico con una propuesta vacía. Primero aterrizamos el problema, luego decidimos qué hay que diseñar y solo después construimos."
          align="center"
        />

        <ol className="mt-12 grid gap-5 lg:grid-cols-4">
          {serviceHubMethod.map((step) => (
            <li
              key={step.step}
              className="surface-card relative overflow-hidden rounded-3xl p-6"
            >
              <div aria-hidden className="surface-line absolute inset-x-0 top-0 h-px" />
              <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">{step.step}</p>
              <h3 className="relative mt-4 text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
              <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
