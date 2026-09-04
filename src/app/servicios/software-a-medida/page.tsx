import type { Metadata } from "next";
import Container from "@/components/common/Container";
import FaqList from "@/components/marketing/FaqList";
import JsonLd from "@/components/marketing/JsonLd";
import ResourceLinks from "@/components/marketing/ResourceLinks";
import EditorialHero from "@/components/marketing/editorial/EditorialHero";
import EditorialSection from "@/components/marketing/editorial/EditorialSection";
import {
  CaseInline,
  DecisionDuo,
  DeliverableSheet,
  EditorialFinalCta,
  ProblemNarrative,
  ProcessRail,
  RelatedNav,
  ScenarioRows,
} from "@/components/marketing/editorial/EditorialBlocks";
import {
  SoftwareArchitecture,
  SoftwareCodeExample,
  SoftwareNumbers,
  SoftwareSaasVsCustom,
} from "@/components/marketing/services/SoftwareBlocks";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

const service = getService("software-a-medida");

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
    url: canonical(service.href),
  });

  const faqData = faqJsonLd(service.faqs);

  return (
    <>
      <JsonLd id="ld-software-breadcrumbs" data={breadcrumbData} />
      <JsonLd id="ld-software-service" data={serviceData} />
      <JsonLd id="ld-software-faq" data={faqData} />
      <Header />
      <main id="contenido" className="bg-white divide-y divide-[#E4E6EA]">
        <EditorialHero
          slug="software-a-medida"
          breadcrumbs={breadcrumbs}
          eyebrow="Software a medida · Ingeniería B2B"
          title="El SaaS no encaja en tu proceso. Construimos el que sí."
          subtitle="Herramientas internas, portales de cliente, plataformas operativas. Cuando el proceso es ventaja competitiva — no algo que un Pipedrive cualquiera resuelve — diseñamos el sistema que refleja cómo trabaja tu empresa."
          honestyLine="Si un SaaS estándar cubre el 90% de tu proceso sin fricción seria, te lo decimos antes de cobrar la primera hora. No vendemos proyectos que no deberían existir."
          metaPills={[
            { label: "Primera entrega", value: "4–8 semanas" },
            { label: "Primer módulo", value: "8–20k €" },
            { label: "Código y datos", value: "Vuestros, siempre" },
            { label: "Vendor lock-in", value: "Cero" },
          ]}
        />

        {/* ── 01 · Números clave por delante ── */}
        <EditorialSection
          marker="01"
          eyebrow="Inversión y entrega"
          title="Tres números antes de seguir leyendo."
        >
          <SoftwareNumbers />
        </EditorialSection>

        {/* ── 02 · Problemas reales ── */}
        <EditorialSection
          marker="02"
          eyebrow="El problema real"
          title="No sois lentos. Es que el sistema no está hecho para vuestro proceso."
        >
          <ProblemNarrative
            intro="Software a medida no se justifica con 'queremos algo nuevo'. Se justifica con dolor operativo medible: horas perdidas, errores que se repiten, datos que no cuadran. Estos son los cuatro síntomas que vemos antes de que una empresa nos llame."
            items={service.problems}
          />
        </EditorialSection>

        {/* ── 03 · SaaS vs Custom — matriz profunda ── */}
        <EditorialSection
          marker="03"
          eyebrow="SaaS vs a medida"
          title="La decisión que cuesta 5 años, no 5 meses."
          lead="Comparar plantilla con vendor lock-in vs. propiedad real del código. Para algunos casos, SaaS es lo correcto. Para otros, es una losa que ya no podéis quitar."
        >
          <SoftwareSaasVsCustom />
        </EditorialSection>

        {/* ── 04 · Arquitectura en capas (signature único) ── */}
        <EditorialSection
          marker="04"
          eyebrow="Cómo lo construimos"
          title="Cuatro capas con responsabilidades claras."
          lead="No es 'una app'. Es una arquitectura tipada con frontera de dominio. Cada capa tiene una responsabilidad — y eso es lo que permite cambiar reglas sin romper el sistema entero."
        >
          <SoftwareArchitecture />
        </EditorialSection>


        {/* ── 05 · Código real ── */}
        <EditorialSection
          marker="05"
          eyebrow="Cómo se ve por dentro"
          title="La regla de negocio se lee, no se adivina."
        >
          <SoftwareCodeExample />
        </EditorialSection>

        {/* ── 06 · Decisión sí/no ── */}
        <EditorialSection
          marker="06"
          eyebrow="Antes de empezar"
          title="Cuándo desarrollar a medida es la respuesta — y cuándo no."
          lead="El mejor proyecto a veces es el que no se hace. Esta es la conversación que tenemos en el diagnóstico inicial, gratuito y honesto."
        >
          <DecisionDuo
            yes={[
              "El proceso es específico y ya genera ventaja o ahorro real medible.",
              "Las herramientas actuales obligan a parches, duplicidades o trabajo paralelo.",
              "Necesitáis control de datos, permisos finos, trazabilidad o integraciones a medida.",
              "Queréis una base propia que evolucione a 3–5 años, no un parche temporal.",
            ]}
            no={[
              "Existe un SaaS que cubre el 90% del proceso sin fricción seria.",
              "El problema todavía no está definido y solo se busca 'tener una app'.",
              "No hay responsables de negocio disponibles para validar decisiones.",
              "La necesidad es estética o de presencia, no operativa.",
            ]}
          />
        </EditorialSection>

        {/* ── 07 · Escenarios ── */}
        <EditorialSection
          marker="07"
          eyebrow="Casos de uso"
          title="Tres formas en que esto suele aterrizar."
          lead="No empezamos con 'una app'. Empezamos con un escenario operativo concreto. Estos son los más recurrentes."
        >
          <ScenarioRows items={service.scenarios} />
        </EditorialSection>

        {/* ── 08 · Proceso ── */}
        <EditorialSection
          marker="08"
          eyebrow="Cómo trabajamos"
          title="Primero pensar. Después construir. Sin estimaciones al aire."
          variant="narrow"
          lead="Cuatro fases. Cada una con un entregable concreto que podéis usar para decidir si seguimos. No hay sprint cero, ni 'fase de descubrimiento de tres meses'."
        >
          <ProcessRail items={service.process} />
        </EditorialSection>

        {/* ── 09 · Entregables ── */}
        <EditorialSection
          marker="09"
          eyebrow="Qué incluye"
          title="Lo que entra en el alcance — y lo que sale de aquí cuando terminamos."
        >
          <DeliverableSheet
            items={service.deliverables}
            footer="Y un repositorio limpio, documentación técnica, formación de tu equipo si la queréis, y la garantía de que mañana podéis continuar con quien queráis."
          />
        </EditorialSection>

        {service.caseStudyIds.length > 0 && (
          <EditorialSection
            marker="10"
            eyebrow="Resultados reales"
            title="Lo que han conseguido empresas con problemas parecidos al tuyo."
          >
            <CaseInline ids={service.caseStudyIds} />
          </EditorialSection>
        )}

        <EditorialSection
          id="faq"
          marker="11"
          eyebrow="Preguntas frecuentes"
          title="Lo que preguntan los directivos antes de firmar."
          variant="narrow"
        >
          <FaqList items={service.faqs} />
        </EditorialSection>

        <EditorialSection
          eyebrow="Sigue por aquí"
          title="Otros servicios que suelen ir de la mano."
          variant="narrow"
        >
          <RelatedNav slugs={service.relatedServices} />
        </EditorialSection>

        <EditorialSection
          eyebrow="Recursos relacionados"
          title="Guías y herramientas para preparar la decisión."
          variant="narrow"
        >
          <ResourceLinks posts={service.relatedPosts} labSlugs={service.relatedLabs} />
        </EditorialSection>

        <section className="bg-white pb-8 sm:pb-12">
          <Container>
            <EditorialFinalCta
              kicker="Antes de pedir presupuesto"
              title="Empieza por entender si esto merece construirse."
              body="Una conversación de 30 minutos. Te decimos si tu caso entra limpio aquí, si encaja mejor con otro servicio, o si la respuesta correcta es no hacer nada todavía. Sin presión comercial."
              secondaryHref="/servicios/automatizacion-integraciones"
              secondaryLabel="Ver automatización"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
