import type { Metadata } from "next";
import Container from "@/components/common/Container";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import JsonLd from "@/components/marketing/JsonLd";
import Button from "@/components/common/Button";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";
import cases from "@/content/cases.json";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Casos de éxito en software a medida | Qubelia",
  description:
    "Casos reales de empresas que han mejorado su operativa con software a medida, integraciones y automatización de procesos. Resultados medibles y verificables.",
  path: "/casos",
});

export default function CasosPage() {
  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Casos de éxito", url: absoluteUrl("/casos") },
  ]);

  return (
    <>
      <JsonLd id="ld-casos-breadcrumbs" data={breadcrumbData} />
      <Header />
      <main id="contenido">
        {/* ── Cabecera ───────────────────────────────────────────── */}
        <section className="bg-white">
          <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Casos de éxito" }]} />

            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              <div className="col-span-12 lg:col-span-7">
                <p className="section-tag">Resultados reales</p>
                <h1 className="mt-7 text-h1">Casos de éxito</h1>
              </div>
              <div className="col-span-12 lg:col-span-5 lg:pt-3">
                <p className="text-lg leading-relaxed text-[#3D4046]">
                  Proyectos reales con resultados medibles. Cada caso refleja un problema concreto, la
                  solución aplicada y el impacto en el negocio.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Tarjetas de caso ───────────────────────────────────── */}
        <section className="border-t border-[#E4E6EA] bg-[#F5F6F8]">
          <Container className="py-16 sm:py-20">
            <div className="grid gap-px border border-[#E4E6EA] bg-[#E4E6EA] sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => {
                const [headline, ...secondary] = c.highlights;

                return (
                  <article key={c.client} className="flex flex-col bg-white p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                      {c.sector} · {c.period}
                    </p>

                    <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#101014]">
                      {c.client}
                    </h2>

                    <p className="mt-4 flex-1 text-[15px] leading-relaxed text-[#3D4046]">
                      {c.challenge}
                    </p>

                    <div className="mt-8 border-t border-[#E4E6EA] pt-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                        Resultados clave
                      </p>

                      {headline ? (
                        <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-[#101014]">
                          {headline}
                        </p>
                      ) : null}

                      {secondary.length > 0 ? (
                        <ul className="mt-5 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                          {secondary.map((h) => (
                            <li key={h} className="py-3 text-sm leading-snug text-[#3D4046]">
                              {h}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── CTA final ──────────────────────────────────────────── */}
        <section className="border-t border-[#E4E6EA] bg-white">
          <Container className="py-16 sm:py-20">
            <div className="grid grid-cols-12 gap-8 lg:items-end">
              <div className="col-span-12 lg:col-span-7">
                <h2 className="text-h3">¿Quieres resultados similares?</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4046]">
                  Analizamos tu caso en 45 minutos. Sin compromiso, con propuesta clara.
                </p>
              </div>
              <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <Button as="a" href="/#contacto" variant="primary">
                  Agendar diagnóstico
                </Button>
                <Button as="a" href="/servicios" variant="ghost">
                  Ver servicios
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
