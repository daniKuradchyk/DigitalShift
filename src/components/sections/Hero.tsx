import Image from "next/image";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { partnerLogos } from "@/content/proof";

const PROOF_POINTS = [
  { value: "100+", label: "proyectos entregados" },
  { value: "4–8 sem", label: "hasta la primera entrega en producción" },
  { value: "0", label: "dependencia de proveedor: el código es vuestro" },
] as const;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-white">
      <Container>
        <div className="pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20">
          <p className="section-tag">
            Ingeniería de software B2B
          </p>

          <h1
            id="hero-title"
            className="mt-8 max-w-5xl text-display"
          >
            Software a medida que mueve
            <br className="hidden sm:block" /> resultados, no expectativas.
          </h1>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-[#3D4046]">
            Desarrollo, automatización y sistemas internos para empresas españolas
            que necesitan resultados operativos. Con IA cuando aporta, sin IA cuando no.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button as="a" href="/#contacto" variant="primary" size="lg" className="w-full sm:w-auto">
              Diagnóstico gratuito de 30 min
            </Button>
            <Button as="a" href="#servicios" variant="ghost" size="lg" className="w-full sm:w-auto">
              Cómo trabajamos
            </Button>
          </div>
        </div>

        {/* Fila de datos de prueba, separada por línea fina */}
        <div className="border-t border-[#E4E6EA]">
          <dl className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#E4E6EA]">
            {PROOF_POINTS.map((point) => (
              <div key={point.label} className="py-6 sm:py-8 sm:px-8 first:sm:pl-0 last:sm:pr-0">
                <dt className="sr-only">{point.label}</dt>
                <dd>
                  <span className="block text-3xl sm:text-4xl font-semibold tracking-tight text-[#101014]">
                    {point.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-[#63666D]">{point.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Logos: estáticos, en gris, sin marquee */}
        <div className="border-t border-[#E4E6EA] py-10 sm:py-12">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#9DA0A6]">
            Experiencia del equipo en proyectos para
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
            {partnerLogos.map((p) => (
              <Image
                key={p.name}
                src={p.logo}
                alt={`Logo de ${p.name}`}
                width={p.width}
                height={p.height}
                className="h-6 w-auto object-contain brightness-0 opacity-40 transition-opacity duration-300 hover:opacity-70"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
