import type { Metadata } from "next";
import Container from "@/components/common/Container";
import FaqList from "@/components/marketing/FaqList";
import FinalCta from "@/components/marketing/FinalCta";
import JsonLd from "@/components/marketing/JsonLd";
import ResourceLinks from "@/components/marketing/ResourceLinks";
import ServicePageHero from "@/components/marketing/ServicePageHero";
import SectionIntro from "@/components/marketing/SectionIntro";
import ServiceCards from "@/components/marketing/ServiceCards";
import {
  BenefitList,
  CaseHighlights,
  DeliverableList,
  FitPanels,
  ProblemGrid,
  ProcessTimeline,
  ScenarioGrid,
} from "@/components/marketing/ServiceBlocks";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

const service = getService("software-a-medida");

/* ─── Contenido editorial único ─── */
const decisionRows = [
  {
    title: "Sí merece la pena",
    items: [
      "El proceso es específico y da ventaja o ahorro real.",
      "Las herramientas actuales generan retrabajo o duplicidad.",
      "Hay necesidad de reglas de negocio, permisos o trazabilidad propia.",
    ],
    tone: "positive" as const,
  },
  {
    title: "Probablemente no",
    items: [
      "Un SaaS estándar cubre bien el proceso sin fricción seria.",
      "Todavía no existe una operativa estable que merezca sistematizar.",
      "La empresa solo quiere una app por imagen o moda.",
    ],
    tone: "negative" as const,
  },
];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function SoftwareServicePage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: service.shortTitle },
  ];

  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Servicios", url: absoluteUrl("/servicios") },
    { name: service.shortTitle, url: canonical(service.href) },
  ]);

  const serviceData = serviceJsonLd({
    name: service.shortTitle,
    description: service.metaDescription,
    areaUrl: canonical(service.href),
  });

  const faqData = faqJsonLd(service.faqs);

  return (
    <>
      <JsonLd id="ld-software-breadcrumbs" data={breadcrumbData} />
      <JsonLd id="ld-software-service" data={serviceData} />
      <JsonLd id="ld-software-faq" data={faqData} />
      <Header />
      <main id="contenido">
        {/* ═══ HERO ═══ */}
        <ServicePageHero
          breadcrumbs={breadcrumbs}
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          subtitle={service.heroSubtitle}
          panelTitle={service.heroPanelTitle}
          panelLines={service.heroPanelLines}
          image="/images/svc-software.png"
        />

        {/* ═══ PROBLEMAS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Problemas"
              title="Qué resuelve de verdad este servicio"
              description="No se trata de construir por construir. Se trata de dar soporte serio a procesos que ya están haciendo perder tiempo, control o capacidad de escalar."
            />
            <div className="mt-10">
              <ProblemGrid items={service.problems} />
            </div>
          </Container>
        </section>

        {/* ═══ DECISIÓN ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Decisión"
              title="Cuándo compensa desarrollar a medida y cuándo no"
              description="El mejor proyecto a veces es el que no se hace. La clave está en el peso real del proceso, el coste del parche y la necesidad de control."
            />
            <div className="mt-10">
              <FitPanels
                yes={decisionRows[0].items}
                no={decisionRows[1].items}
              />
            </div>
          </Container>
        </section>

        {/* ═══ ENTREGABLES ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Qué entregamos"
              title="Qué incluye Qubelia en este servicio"
            />
            <div className="mt-10">
              <DeliverableList items={service.deliverables} />
            </div>
          </Container>
        </section>

        {/* ═══ ESCENARIOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Escenarios"
              title="Casos de uso típicos"
              description="Herramientas internas, portales, extranet, plataformas operativas o sistemas híbridos con varias áreas trabajando sobre el mismo flujo."
            />
            <div className="mt-10">
              <ScenarioGrid items={service.scenarios} />
            </div>
          </Container>
        </section>

        {/* ═══ PROCESO ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Proceso"
              title="Cómo trabajamos en proyectos de software a medida"
            />
            <div className="mt-10">
              <ProcessTimeline items={service.process} />
            </div>
          </Container>
        </section>

        {/* ═══ ENCAJE Y BENEFICIOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Encaje y beneficios"
              title="Dónde suele generar más valor este tipo de proyecto"
            />
            <div className="mt-10">
              <FitPanels yes={service.fitYes} no={service.fitNo} />
            </div>
            <div className="mt-8">
              <BenefitList items={service.benefits} />
            </div>
          </Container>
        </section>

        {/* ═══ CASOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Casos"
              title="Resultados relacionados con esta capa de servicio"
            />
            <div className="mt-10">
              <CaseHighlights ids={service.caseStudyIds} />
            </div>
          </Container>
        </section>

        {/* ═══ RECURSOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Recursos"
              title="Contenido y herramientas relacionadas"
            />
            <div className="mt-10">
              <ResourceLinks posts={service.relatedPosts} labSlugs={service.relatedLabs} />
            </div>
          </Container>
        </section>

        {/* ═══ FAQ ═══ */}
        <section id="faq" className="scroll-mt-28 py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="FAQ"
              title="Preguntas frecuentes sobre software a medida"
            />
            <div className="mt-10 max-w-3xl">
              <FaqList items={service.faqs} />
            </div>
          </Container>
        </section>

        {/* ═══ SERVICIOS RELACIONADOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Servicios relacionados"
              title="Otras líneas que pueden complementar este servicio"
            />
            <div className="mt-10">
              <ServiceCards variant="related" slugs={service.relatedServices} />
            </div>
          </Container>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="pb-20 pt-4">
          <Container>
            <FinalCta
              title="Si el proceso importa de verdad, conviene decidir pronto qué parte merece una base propia"
              text="Podemos revisar contigo el proceso, estimar si compensa desarrollo a medida y definir una primera fase útil sin inflar alcance."
              secondaryHref="/servicios/automatizacion-integraciones"
              secondaryLabel="Ver automatización e integraciones"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
