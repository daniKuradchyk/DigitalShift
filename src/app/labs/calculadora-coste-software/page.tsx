import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Footer from "@/components/sections/Footer";
import CostCalculator from "./CostCalculator";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Calculadora de coste de software";
const pageDescription =
  "Estima en minutos el rango de inversión, horas, plazo y equipo recomendado para un software a medida según alcance, módulos, integraciones y nivel técnico.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/labs/calculadora-coste-software") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/labs/calculadora-coste-software"),
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
    siteName: "Qubelia",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate(pageTitle),
    description: pageDescription,
    images: openGraphImage(),
  },
};

export const revalidate = 86400;

const WHAT_IT_ESTIMATES = [
  "Rango de presupuesto por escenarios: optimista, realista y conservador",
  "Horas totales según tipo de producto, complejidad e integraciones",
  "Plazo estimado y composición de equipo recomendada",
  "Desglose por fases: diseño, frontend, backend, QA e infraestructura",
  "Impacto de módulos avanzados, seguridad y compliance",
];

const HERO_STATS = [
  { label: "Modos", value: "2" },
  { label: "Escenarios", value: "3" },
  { label: "Registro", value: "No requerido" },
];

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Labs", url: canonical("/labs") },
  { name: pageTitle, url: canonical("/labs/calculadora-coste-software") },
]);

export default function CostCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="bg-white">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E6EA] py-5">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Button as="a" href="/labs" variant="ghost" size="sm">Volver a Labs</Button>
            <Button as="a" href="/#contacto" variant="primary" size="sm">Pedir propuesta</Button>
          </div>
        </div>

        <section
          aria-labelledby="cost-hero-title"
          className="grid items-start gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
        >
          <div>
            <p className="section-tag">Herramienta gratuita</p>

            <h1 id="cost-hero-title" className="mt-8 max-w-xl text-h1">
              Calculadora de coste
              <br className="hidden sm:block" /> de software a medida
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3D4046]">
              Configura el tipo de proyecto, el alcance funcional y el nivel técnico para
              obtener una estimación útil de presupuesto, plazo y equipo antes de pedir una propuesta.
            </p>

            <dl className="mt-12 grid grid-cols-1 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {HERO_STATS.map((s) => (
                <div key={s.label} className="py-6 sm:px-6 sm:py-8 sm:first:pl-0">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight text-[#101014]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="space-y-6">
            <div className="border border-[#E4E6EA] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                Esta calculadora estima
              </p>
              <ul className="mt-5 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                {WHAT_IT_ESTIMATES.map((item, index) => (
                  <li key={item} className="flex items-start gap-4 py-4">
                    <span className="mt-0.5 flex-none text-sm font-medium tabular-nums text-[#9DA0A6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-[#3D4046]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
              La estimación es orientativa. Sirve para acotar alcance, rango de inversión y riesgos antes del discovery técnico.
            </p>
          </aside>
        </section>

        <div className="border-t border-[#E4E6EA] py-16 sm:py-20">
          <CostCalculator />
        </div>
      </Container>
      </main>
      <Footer />
    </>
  );
}
