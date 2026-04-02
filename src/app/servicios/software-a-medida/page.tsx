import type { Metadata } from "next";
import Container from "@/components/common/Container";
import FaqList from "@/components/marketing/FaqList";
import FinalCta from "@/components/marketing/FinalCta";
import JsonLd from "@/components/marketing/JsonLd";
import ResourceLinks from "@/components/marketing/ResourceLinks";
import ServicePageHero from "@/components/marketing/ServicePageHero";
import SectionIntro from "@/components/marketing/SectionIntro";
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

const service = getService("software-a-medida");

const decisionRows = [
  {
    title: "Sí merece la pena",
    points: [
      "El proceso es específico y da ventaja o ahorro real.",
      "Las herramientas actuales generan retrabajo o duplicidad.",
      "Hay necesidad de reglas de negocio, permisos o trazabilidad propia.",
    ],
  },
  {
    title: "Probablemente no",
    points: [
      "Un SaaS estándar cubre bien el proceso sin fricción seria.",
      "Todavía no existe una operativa estable que merezca sistematizar.",
      "La empresa solo quiere una app por imagen o moda.",
    ],
  },
];

const patchVsSystem = [
  {
    title: "Herramientas sueltas",
    text: "Resuelven piezas concretas, pero crean dependencias, reglas dispersas y poco control del dato.",
  },
  {
    title: "Software a medida bien planteado",
    text: "Modela el proceso completo, define una fuente de verdad y deja una base que puede crecer sin parches acumulados.",
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
        <ServicePageHero
          breadcrumbs={breadcrumbs}
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          subtitle={service.heroSubtitle}
          panelTitle={service.heroPanelTitle}
          panelLines={service.heroPanelLines}
        />

        <section className="pb-20">
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

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Decisión"
              title="Cuándo compensa desarrollar a medida y cuándo no"
              description="El mejor proyecto a veces es el que no se hace. La clave está en el peso real del proceso, el coste del parche y la necesidad de control."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {decisionRows.map((row) => (
                <article key={row.title} className="surface-card relative overflow-hidden rounded-3xl p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{row.title}</h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {row.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro
              eyebrow="Enfoque"
              title="La diferencia entre parchear herramientas y construir un sistema útil"
              description="Encadenar herramientas puede servir durante un tiempo. Pero cuando el proceso ya es crítico, el coste oculto de los parches suele superar el de una base propia bien planteada."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {patchVsSystem.map((item) => (
                <article key={item.title} className="surface-card relative overflow-hidden rounded-3xl p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro eyebrow="Qué entregamos" title="Qué incluye Qubelia en este servicio" />
            <div className="mt-10">
              <DeliverableList items={service.deliverables} />
            </div>
          </Container>
        </section>

        <section className="py-20">
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

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro eyebrow="Proceso" title="Cómo trabajamos en proyectos de software a medida" />
            <div className="mt-10">
              <ProcessTimeline items={service.process} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Encaje y beneficios" title="Dónde suele generar más valor este tipo de proyecto" />
            <div className="mt-10">
              <FitPanels yes={service.fitYes} no={service.fitNo} />
            </div>
            <div className="mt-10">
              <BenefitList items={service.benefits} />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro eyebrow="Casos" title="Resultados relacionados con esta capa de servicio" />
            <div className="mt-10">
              <CaseHighlights ids={service.caseStudyIds} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Recursos" title="Contenido y herramientas relacionadas" />
            <div className="mt-10">
              <ResourceLinks posts={service.relatedPosts} labSlugs={service.relatedLabs} />
            </div>
          </Container>
        </section>

        <section id="faq" className="scroll-mt-28 bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro eyebrow="FAQ" title="Preguntas frecuentes sobre software a medida" />
            <div className="mt-10">
              <FaqList items={service.faqs} />
            </div>
          </Container>
        </section>

        <section className="py-20">
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
