import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Footer from "@/components/sections/Footer";
import RoiCalculator from "./RoiCalculator";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Calculadora de ROI de automatización";
const pageDescription =
  "Modelo financiero para estimar el retorno de automatizar procesos: ahorro anual, payback, VAN a 3 años y rango de confianza. Benchmarks UiPath y McKinsey.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/labs/roi-automatizacion") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/labs/roi-automatizacion"),
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

const TRUST_STATS = [
  { k: "Modelo financiero", v: "VAN + payback + ROI" },
  { k: "Fuentes citadas", v: "UiPath, McKinsey, APQC" },
  { k: "Privacidad", v: "Solo en tu navegador" },
];

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Labs", url: canonical("/labs") },
  { name: pageTitle, url: canonical("/labs/roi-automatizacion") },
]);

export default function RoiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <main className="bg-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .no-print { display: none !important; }
              main { background: #FFFFFF !important; }
              .print-break-inside-avoid { break-inside: avoid; }
            }
          `,
        }}
      />

      <Container className="pb-20 sm:pb-24">
        {/* Top nav */}
        <nav className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E6EA] py-5">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/labs"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3D4046] transition-colors hover:text-brand-600"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M10 4L6 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Labs
            </Link>
            <Button as="a" href="/#contacto" variant="primary" size="sm">
              Hablar con un consultor
            </Button>
          </div>
        </nav>

        {/* Hero editorial */}
        <header className="pt-16 sm:pt-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4">
              <p className="section-tag">Herramienta gratuita · sin registro</p>
              <span aria-hidden className="hidden h-3 w-px bg-[#E4E6EA] sm:block" />
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-[#9DA0A6]">
                Benchmarks 2024
              </span>
            </div>

            <h1 className="mt-8 text-display">
              Calcula el ROI real de automatizar
              <br className="hidden sm:block" /> tus procesos manuales.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#3D4046]">
              Modelo financiero que estima <span className="font-semibold text-[#101014]">ahorro anual</span>,{" "}
              <span className="font-semibold text-[#101014]">payback</span> y{" "}
              <span className="font-semibold text-[#101014]">VAN a 3 años</span> con rango de confianza.
              Listo para presentar al comité de inversión en menos de 3 minutos.
            </p>
          </div>

          {/* Trust stats separados por líneas finas */}
          <dl className="mt-12 grid grid-cols-1 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TRUST_STATS.map((s) => (
              <div key={s.k} className="py-6 sm:px-8 sm:py-8 sm:first:pl-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">{s.k}</dt>
                <dd className="mt-2 text-base font-semibold tracking-tight text-[#101014]">{s.v}</dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Calculator */}
        <div className="mt-16 sm:mt-20">
          <RoiCalculator />
        </div>
      </Container>
      </main>
      <Footer />
    </>
  );
}
