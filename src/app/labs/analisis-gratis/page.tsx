import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Footer from "@/components/sections/Footer";
import AuditWizard from "./AuditWizard";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Análisis gratuito de tu negocio";
const pageDescription =
  "Autodiagnóstico en 5-8 min para pymes y autónomos. Detecta puntos flojos, quick wins y un roadmap 30-90 días sin registro.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/labs/analisis-gratis") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/labs/analisis-gratis"),
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

const stats = [
  { label: "Tiempo", value: "5-8 min" },
  { label: "Resultado", value: "Inmediato" },
  { label: "Registro", value: "No requerido" },
];

const benefits = [
  "Resumen ejecutivo con prioridades reales.",
  "Puntos flojos + quick wins en 7 días.",
  "Roadmap 30-90 días y matriz impacto/esfuerzo.",
  "PDF descargable sin email obligatorio.",
];

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Labs", url: canonical("/labs") },
  { name: pageTitle, url: canonical("/labs/analisis-gratis") },
]);

export default function AuditPage() {
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
            <Button as="a" href="/#contacto" variant="primary" size="sm">Hablar con Qubelia</Button>
          </div>
        </div>

        <section className="grid items-start gap-10 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="section-tag">Herramienta gratuita</p>

            <h1 className="mt-8 max-w-xl text-h1">Análisis gratuito de tu negocio</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3D4046]">
              Autodiagnóstico rápido para pymes y autónomos. Detecta puntos flojos, quick wins y un plan de 30-90 días en minutos.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button as="a" href="#analisis" variant="primary" size="lg" className="w-full sm:w-auto">Analizar ahora</Button>
              <Button as="a" href="/#contacto" variant="ghost" size="lg" className="w-full sm:w-auto">Adaptar a mi empresa</Button>
            </div>

            <dl className="mt-12 grid grid-cols-1 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {stats.map((s, index) => (
                <div key={s.label} className="py-6 sm:px-6 sm:py-8 sm:first:pl-0">
                  <p className="text-xs font-medium tabular-nums text-[#9DA0A6]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <dt className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    {s.label}
                  </dt>
                  <dd className="mt-2 text-xl font-semibold tracking-tight text-[#101014]">{s.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-8 border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm text-[#3D4046]">
              Te llevará 5-8 min. Resultado inmediato. Sin registro. Email opcional.
            </p>
          </div>

          <aside className="space-y-6">
            <div className="border border-[#E4E6EA] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Incluye</p>
              <ul className="mt-5 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                {benefits.map((b, index) => (
                  <li key={b} className="flex items-start gap-4 py-4">
                    <span className="mt-0.5 flex-none text-sm font-medium tabular-nums text-[#9DA0A6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-[#3D4046]">{b}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-l-2 border-brand-600 bg-[#F5F6F8] px-4 py-3 text-sm leading-relaxed text-[#3D4046]">
                Sin registro obligatorio. Solo pedimos email si quieres el PDF o una llamada.
              </p>
            </div>

            <div className="border border-[#E4E6EA] bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Privacidad</p>
              <p className="mt-4 text-sm leading-relaxed text-[#3D4046]">
                Cumplimos RGPD. Tus datos se usan solo para generar el informe y, si lo pides, enviarte el PDF.
              </p>
            </div>
          </aside>
        </section>

        <section id="analisis" className="scroll-mt-24 border-t border-[#E4E6EA] py-16 sm:py-20">
          <AuditWizard />
        </section>
      </Container>
      </main>
      <Footer />
    </>
  );
}
