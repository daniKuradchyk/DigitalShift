import Container from "@/components/common/Container";

const PRINCIPLES = [
  {
    title: "Stack estable",
    description: "Next.js, TypeScript, PostgreSQL. Tecnología probada que no caduca en 6 meses.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L12 12.75 6.429 9.75m11.142 0l4.179 2.25-9.75 5.25-9.75-5.25 4.179-2.25" />
      </svg>
    ),
  },
  {
    title: "Criterio de producción",
    description: "CI/CD, tests, monitoring. Lo que entregamos funciona en real, no solo en demo.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Sin dependencia",
    description: "El código es tuyo. Repositorio, documentación y autonomía desde el día uno.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Base mantenible",
    description: "Código limpio y documentado que tu equipo (o cualquier otro) puede mantener.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
];

export default function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-title"
      className="border-y border-[#E4E6EA] bg-[#F5F6F8] py-20 sm:py-24 md:py-28"
    >
      <Container>
        {/* ── Header ── */}
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="animate-fade-up">
            <p className="section-tag mb-5 sm:mb-6">Principios</p>
          </div>

          <h2 id="trust-title" className="text-h2 animate-fade-up delay-100">
            Criterio de producción. Sin atajos.
          </h2>
        </div>

        {/* ── Principios ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className="border border-[#E4E6EA] bg-white p-7 sm:p-8 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="mb-6 inline-flex h-10 w-10 items-center justify-center border border-[#E4E6EA] text-[#101014]">
                {p.icon}
              </span>

              <h3 className="mb-3 text-lg sm:text-xl font-semibold leading-tight tracking-tight text-[#101014]">
                {p.title}
              </h3>

              <p className="text-[15px] leading-relaxed text-[#3D4046]">{p.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
