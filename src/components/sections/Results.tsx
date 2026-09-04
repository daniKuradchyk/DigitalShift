import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

/* ─── Case data ─────────────────────────────────────────────────── */
const CASES = [
  {
    client: "Banco Santander",
    logo: "/logos/santander.svg",
    metric: "100%",
    metricLabel: "auditoría trazada",
    oneLiner: "Software interno para centralizar datos y automatizar validaciones en procesos bancarios críticos.",
    sector: "Banca",
  },
  {
    client: "Unicaja Banco",
    logo: "/logos/unicaja.svg",
    metric: "−70%",
    metricLabel: "tiempo de cierre",
    oneLiner: "Automatización de reporting, validación y consolidación de datos para reducir errores manuales.",
    sector: "Banca",
  },
  {
    client: "Accenture",
    logo: "/logos/accenture.svg",
    metric: "×3",
    metricLabel: "velocidad de entrega",
    oneLiner: "Software interno para coordinar equipos y estandarizar procesos de delivery técnico.",
    sector: "Consultoría",
  },
  {
    client: "LF Studio",
    logo: "/logos/lfstudio.svg",
    metric: "+220%",
    metricLabel: "tráfico orgánico",
    oneLiner: "Estructura digital a medida para mejorar captación y seguimiento comercial.",
    sector: "Agencia",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN RESULTS SECTION — tarjetas de caso planas
   ═══════════════════════════════════════════════════════════════════ */
export default function Results() {
  return (
    <section
      id="resultados"
      aria-labelledby="results-title"
      className="scroll-mt-24 bg-white py-20 sm:py-24 md:py-28"
    >
      <Container>
        {/* ── Header ── */}
        <div className="mb-10 max-w-3xl sm:mb-14">
          <div className="animate-fade-up">
            <p className="section-tag mb-5 sm:mb-6">Casos reales</p>
          </div>

          <h2 id="results-title" className="text-h2 animate-fade-up delay-100">
            Proyectos reales. Resultados medibles.
          </h2>
        </div>

        {/* ── Tarjetas de caso ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {CASES.map((c, i) => (
            <article
              key={c.client}
              className="flex flex-col border border-[#E4E6EA] bg-white p-7 sm:p-8 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="block text-4xl sm:text-5xl font-semibold leading-none tracking-tight text-[#101014]">
                {c.metric}
              </span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                {c.metricLabel}
              </span>

              <p className="mt-6 border-t border-[#E4E6EA] pt-6 text-[15px] leading-relaxed text-[#3D4046]">
                {c.oneLiner}
              </p>

              <div className="mt-auto pt-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={`Logo de ${c.client}`}
                  className="brightness-0 opacity-40"
                  style={{ height: "20px", width: "auto", maxWidth: "120px", objectFit: "contain" }}
                />
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[#9DA0A6]">{c.sector}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 flex flex-col gap-5 border-t border-[#E4E6EA] pt-10 sm:mt-16 sm:flex-row sm:items-center sm:justify-between animate-fade-up delay-400">
          <p className="max-w-xl text-sm text-[#63666D]">
            Más de 100 proyectos entregados. Detalle completo disponible en conversación.
          </p>
          <Button as="a" href="/#contacto" variant="primary" size="lg" className="w-full sm:w-auto">
            Solicitar diagnóstico
          </Button>
        </div>
      </Container>
    </section>
  );
}
