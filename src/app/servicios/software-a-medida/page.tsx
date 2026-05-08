import type { Metadata } from "next";
import Container from "@/components/common/Container";
import FaqList from "@/components/marketing/FaqList";
import JsonLd from "@/components/marketing/JsonLd";
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
        <EditorialHero
          slug="software-a-medida"
          breadcrumbs={breadcrumbs}
          eyebrow="Software a medida · Ingeniería B2B"
          title="El SaaS no encaja en tu proceso. Construimos el que sí."
          subtitle="Herramientas internas, portales de cliente, plataformas operativas. Cuando el proceso es ventaja competitiva — no algo que un Pipedrive cualquiera resuelve — diseñamos el sistema que refleja cómo trabaja tu empresa."
          honestyLine="Si un SaaS estándar cubre el 90% de tu proceso sin fricción seria, te lo decimos antes de cobrar la primera hora. No vendemos proyectos que no deberían existir."
          metaPills={[
            { label: "Primera entrega", value: "4–8 semanas" },
            { label: "Inversión típica", value: "20–80k €" },
            { label: "Código y datos", value: "Vuestros, siempre" },
            { label: "Vendor lock-in", value: "Cero" },
          ]}
        />

        <EditorialSection
          marker="01"
          eyebrow="El problema real"
          title="No sois lentos. Es que el sistema no está hecho para vuestro proceso."
        >
          <ProblemNarrative
            intro="Software a medida no se justifica con 'queremos algo nuevo'. Se justifica con dolor operativo medible: horas perdidas, errores que se repiten, datos que no cuadran. Estos son los cuatro síntomas que vemos antes de que una empresa nos llame."
            items={service.problems}
          />
        </EditorialSection>

        <EditorialSection
          marker="02"
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

        <EditorialSection
          marker="03"
          eyebrow="Casos de uso"
          title="Tres formas en que esto suele aterrizar."
          lead="No empezamos con 'una app'. Empezamos con un escenario operativo concreto. Estos son los más recurrentes."
        >
          <ScenarioRows items={service.scenarios} />
        </EditorialSection>

        <EditorialSection
          marker="04"
          eyebrow="Cómo trabajamos"
          title="Primero pensar. Después construir. Sin estimaciones al aire."
          variant="narrow"
          lead="Cuatro fases. Cada una con un entregable concreto que podéis usar para decidir si seguimos. No hay sprint cero, ni 'fase de descubrimiento de tres meses'."
        >
          <ProcessRail items={service.process} />
        </EditorialSection>

        <EditorialSection
          marker="05"
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
            marker="06"
            eyebrow="Resultados reales"
            title="Lo que han conseguido empresas con problemas parecidos al tuyo."
          >
            <CaseInline ids={service.caseStudyIds} />
          </EditorialSection>
        )}

        <EditorialSection
          id="faq"
          marker="07"
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

        <Container>
          <EditorialFinalCta
            kicker="Antes de pedir presupuesto"
            title="Empieza por entender si esto merece construirse."
            body="Una conversación de 30 minutos. Te decimos si tu caso entra limpio aquí, si encaja mejor con otro servicio, o si la respuesta correcta es no hacer nada todavía. Sin presión comercial."
            secondaryHref="/servicios/automatizacion-integraciones"
            secondaryLabel="Ver automatización"
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
