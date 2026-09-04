import Container from "@/components/common/Container";

/* ─── Fases del método ─────────────────────────────────────────── */
const STEPS = [
  {
    id: 0,
    step: "01",
    title: "Diagnóstico funcional",
    subtitle: "Entendemos antes de construir",
    description:
      "Analizamos proceso, riesgos, actores y puntos de fricción. Definimos qué merece construirse, qué no, y por qué.",
  },
  {
    id: 1,
    step: "02",
    title: "Alcance y arquitectura",
    subtitle: "Diseño antes que código",
    description:
      "Módulos, integraciones, seguridad, roadmap de releases y prioridades de negocio claras antes de escribir una línea.",
  },
  {
    id: 2,
    step: "03",
    title: "Entrega iterativa",
    subtitle: "Sprints con demos reales",
    description:
      "Sprints quincenales con demos funcionales. Liberamos por bloques utilizables con feedback del equipo y QA continua.",
  },
  {
    id: 3,
    step: "04",
    title: "Producción y evolución",
    subtitle: "Acompañamiento post-lanzamiento",
    description:
      "Acompañamos el go-live, medimos uso real y priorizamos mejoras con datos, no con intuición.",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   STEP ROW — fila editorial numerada
   ═══════════════════════════════════════════════════════════════════ */
function StepRow({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  return (
    <li
      className="grid grid-cols-12 gap-x-6 gap-y-3 py-10 sm:gap-x-8 sm:py-12 lg:gap-x-12 lg:py-14 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Numeral */}
      <div className="col-span-12 sm:col-span-2 lg:col-span-1">
        <span className="text-2xl sm:text-3xl font-light tabular-nums leading-none tracking-tight text-[#9DA0A6]">
          {step.step}
        </span>
      </div>

      {/* Título + subtítulo */}
      <div className="col-span-12 sm:col-span-10 lg:col-span-5">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
          {step.subtitle}
        </span>
        <h3 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-[#101014]">
          {step.title}
        </h3>
      </div>

      {/* Descripción */}
      <div className="col-span-12 sm:col-span-10 sm:col-start-3 lg:col-span-6 lg:col-start-7">
        <p className="max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#3D4046]">
          {step.description}
        </p>
      </div>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN METHODOLOGY SECTION
   ═══════════════════════════════════════════════════════════════════ */
export default function Methodology() {
  return (
    <section
      id="metodologia"
      aria-labelledby="method-title"
      className="scroll-mt-24 border-t border-[#E4E6EA] bg-white py-20 sm:py-24 md:py-28"
    >
      <Container>
        {/* ── Section header ── */}
        <div className="mb-10 grid grid-cols-12 gap-6 sm:mb-14 sm:gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="animate-fade-up">
              <p className="section-tag mb-5 sm:mb-6">Metodología</p>
            </div>

            <h2 id="method-title" className="text-h2 animate-fade-up delay-100">
              Primero pensar. Después construir.
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:pt-2 animate-fade-up delay-200">
            <p className="max-w-2xl text-[15px] sm:text-base lg:text-lg leading-relaxed text-[#3D4046]">
              Cuatro fases pensadas para empresas que ya han pagado el coste de
              decidir rápido. Si algo no merece construirse, lo decimos antes de
              cobrar la primera hora.
            </p>
          </div>
        </div>

        {/* ── Las cuatro fases, de un vistazo ── */}
        {/* ── Fases ── */}
        <ol className="divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
          {STEPS.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
