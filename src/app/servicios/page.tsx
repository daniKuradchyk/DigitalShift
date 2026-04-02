import type { Metadata } from "next";
import FinalCta from "@/components/marketing/FinalCta";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import FaqList from "@/components/marketing/FaqList";
import JsonLd from "@/components/marketing/JsonLd";
import ResourceLinks from "@/components/marketing/ResourceLinks";
import SectionIntro from "@/components/marketing/SectionIntro";
import ServiceCards from "@/components/marketing/ServiceCards";
import { CaseHighlights, FitPanels, ProcessTimeline } from "@/components/marketing/ServiceBlocks";
import Container from "@/components/common/Container";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { serviceHubFaqs, serviceHubFit, serviceHubMethod } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de Qubelia | Software, web, automatizacion y CRM a medida",
  description:
    "Hub de servicios de Qubelia: software a medida, web a medida, automatizacion e integraciones, y CRM o intranet a medida para empresas B2B.",
  path: "/servicios",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios" },
  ];

  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Servicios", url: canonical("/servicios") },
  ]);

  return (
    <>
      <JsonLd id="ld-services-breadcrumbs" data={breadcrumbData} />
      <Header />
      <main id="contenido">
        <section className="pb-12 pt-16 sm:pb-16 sm:pt-20">
          <Container>
            <Breadcrumbs items={breadcrumbs} />

            <div className="surface-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_34%)]"
              />

              <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
                <div className="max-w-4xl">
                  <div className="section-tag mb-5">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
                    Hub de servicios
                  </div>
                  <h1 className="text-4xl font-black tracking-[-0.03em] text-slate-900 dark:text-white sm:text-5xl">
                    Servicios pensados como una arquitectura comercial seria, no como una landing que intenta explicarlo todo
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                    Qubelia trabaja una capa clara de servicios para empresas B2B: software a medida, web a medida,
                    automatizacion e integraciones, y CRM o intranet a medida. Cada linea tiene entidad propia, una
                    intencion de busqueda distinta y un encaje de negocio concreto.
                  </p>
                </div>

                <div className="surface-panel relative overflow-hidden rounded-3xl p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Que resuelve Qubelia</p>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    <li>Procesos manuales que frenan al equipo.</li>
                    <li>Webs que no reflejan el nivel real de la empresa.</li>
                    <li>Herramientas desconectadas y datos duplicados.</li>
                    <li>Sistemas estandar que ya no encajan con la operativa.</li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-20">
          <Container>
            <ServiceCards variant="hub" />
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Encaje"
              title="Para quien tiene sentido Qubelia y para quien no"
              description="No todo problema merece desarrollo a medida. Parte del trabajo es decidir con claridad cuando si compensa intervenir y cuando no."
            />
            <div className="mt-10">
              <FitPanels yes={serviceHubFit.yes} no={serviceHubFit.no} />
            </div>
          </Container>
        </section>

        <section id="metodologia" className="scroll-mt-28 py-20">
          <Container>
            <SectionIntro
              eyebrow="Metodo"
              title="Metodologia resumida para tomar decisiones y entregar sin ruido"
              description="Mismo principio en los cuatro servicios: entender el problema, definir encaje real, construir por bloques utiles y dejar una base que pueda evolucionar."
            />
            <div className="mt-10">
              <ProcessTimeline items={serviceHubMethod} />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Casos"
              title="Mini casos relacionados con los servicios"
              description="La capa comercial tiene sentido cuando conecta con operativa real y resultados medibles."
            />
            <div className="mt-10">
              <CaseHighlights ids={["santander", "unicaja", "lfstudio", "accenture"]} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro
              eyebrow="Recursos"
              title="Blog y labs bien enlazados desde la capa de servicios"
              description="Los servicios no se quedan aislados: apuntan a guias, herramientas y contenido util para seguir profundizando."
            />
            <div className="mt-10">
              <ResourceLinks
                posts={["presupuesto-software-medida-2026", "integraciones-erp-crm-pymes", "arquitectura-nextjs-seo-2026"]}
                labSlugs={["analisis-gratis", "roi-automatizacion"]}
              />
            </div>
          </Container>
        </section>

        <section id="faq" className="scroll-mt-28 bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="FAQ"
              title="Preguntas transversales antes de pasar a una propuesta"
              description="Respuestas directas para entender mejor el encaje del proyecto y como trabajamos."
            />
            <div className="mt-10">
              <FaqList items={serviceHubFaqs} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <FinalCta
              title="Si ya sabes que capa necesitas, la siguiente conversacion debe ser concreta"
              text="Podemos revisar proceso, encaje, alcance y prioridad del proyecto. Sin humo, sin maquillar lo que no merece hacerse y con siguiente paso claro."
              secondaryHref="/#resultados"
              secondaryLabel="Ver casos"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
