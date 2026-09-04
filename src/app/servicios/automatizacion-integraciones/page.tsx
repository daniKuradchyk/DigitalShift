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
  IntegrationStrip,
  ProblemNarrative,
  ProcessRail,
  RelatedNav,
  ScenarioRows,
} from "@/components/marketing/editorial/EditorialBlocks";
import {
  AutomationAiHonestStance,
  AutomationBeforeAfter,
  AutomationRoiPanel,
} from "@/components/marketing/services/AutomationBlocks";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

const service = getService("automatizacion-integraciones");

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function AutomationServicePage() {
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

  return (
    <>
      <JsonLd id="ld-automation-breadcrumbs" data={breadcrumbData} />
      <JsonLd id="ld-automation-service" data={serviceData} />
      <JsonLd id="ld-automation-faq" data={faqJsonLd(service.faqs)} />
      <Header />
      <main id="contenido" className="bg-white divide-y divide-[#E4E6EA]">
        <EditorialHero
          slug="automatizacion-integraciones"
          breadcrumbs={breadcrumbs}
          eyebrow="Automatización · Integraciones · IA aplicada"
          title="Conectamos tus sistemas. Eliminamos lo repetitivo. Sin cajas negras."
          subtitle="Integraciones entre CRM, ERP, formularios, email, APIs y bases de datos. Flujos robustos con logs, alertas, reintentos y trazabilidad. Con IA donde de verdad ahorra horas — no como argumento de venta."
          honestyLine="Si lo tuyo es un solo flujo simple sin recorrido futuro, montarlo en una hora con Make y olvidarse es honestamente más barato. Te lo decimos antes de proponer proyecto."
          metaPills={[
            { label: "Stack", value: "n8n · Make · código" },
            { label: "Primera entrega", value: "2–4 semanas" },
            { label: "ROI típico", value: "20–60h/mes" },
            { label: "Cajas negras", value: "Cero" },
          ]}
        />

        {/* ── 01 · Before / After (signature único) ── */}
        <EditorialSection
          marker="01"
          eyebrow="Antes vs después"
          title="El mismo flujo, doce minutos contra seis segundos."
          lead="Una secuencia operativa típica de captación. Antes corre con manos. Después corre sola, deja logs, se reintenta si falla, y entrega métrica."
        >
          <AutomationBeforeAfter />
        </EditorialSection>


        {/* ── 02 · Síntomas / problemas ── */}
        <EditorialSection
          marker="02"
          eyebrow="Síntomas"
          title="Si te resulta familiar, llevas perdiendo tiempo desde hace meses."
        >
          <ProblemNarrative
            intro="La operativa mal conectada no se ve en una sola tarea — se ve en la suma de muchas. Estos son los cuatro síntomas más comunes en empresas B2B con cinco o más herramientas digitales."
            items={service.problems}
          />
        </EditorialSection>

        {/* ── 03 · ROI panel ── */}
        <EditorialSection
          marker="03"
          eyebrow="ROI medible"
          title="Lo que recuperáis al mes — no proyecciones, números reales."
          lead="Cuatro automatizaciones que solemos montar primero, con su coste manual antes y su coste automatizado después. Sumadas, suelen superar las 70 horas/mes."
        >
          <AutomationRoiPanel />
        </EditorialSection>

        {/* ── 04 · Casos típicos ── */}
        <EditorialSection
          marker="04"
          eyebrow="Casos típicos"
          title="Las tres formas más comunes en que esto aterriza."
        >
          <ScenarioRows items={service.scenarios} />
        </EditorialSection>

        {/* ── 05 · Lo que conectamos (tags) ── */}
        <EditorialSection
          marker="05"
          eyebrow="Lo que conectamos"
          title="Sistemas, datos y eventos que viajan entre herramientas — bien."
          lead="No es 'usamos n8n'. La clave es el diseño del flujo, las reglas de sincronización, el manejo de errores y el mantenimiento. Estas son las piezas que solemos tocar."
        >
          <IntegrationStrip
            items={[
              "SAP · Holded · A3 · Odoo",
              "Salesforce · HubSpot · Pipedrive",
              "ERP a medida · APIs propias",
              "Webhooks · colas · eventos",
              "Email transaccional · Postmark",
              "Hojas de cálculo · Google Sheets",
              "Formularios · Typeform · Tally",
              "Calendarios · Google · Outlook",
              "Firma digital · Docusign · Signaturit",
              "Logs · Sentry · BetterStack",
              "Bases de datos · PostgreSQL · MySQL",
              "IA: clasificación · extracción · OCR",
            ]}
          />
        </EditorialSection>

        {/* ── 06 · Decisión ── */}
        <EditorialSection
          marker="06"
          eyebrow="Decisión"
          title="Cuándo automatizar — y cuándo es matar moscas a cañonazos."
          lead="No todo problema operativo se arregla con un flujo. A veces es un proceso mal definido, no una herramienta mal conectada."
        >
          <DecisionDuo
            yes={[
              "Hay varias herramientas que ya deberían hablar entre sí y no lo hacen bien.",
              "El coste del trabajo manual repetitivo es visible en horas, errores o quejas.",
              "Necesitáis trazabilidad, mantenimiento y diseño técnico serio de los flujos.",
              "Queréis automatizar sin crear una caja negra que nadie pueda tocar mañana.",
            ]}
            no={[
              "Solo se busca una automatización puntual sin criterio de continuidad.",
              "No existe ninguna definición mínima del proceso o del dato correcto.",
              "Se espera resultado crítico sin revisar riesgos, validaciones o fallback.",
              "La necesidad real es un sistema propio más amplio, no integraciones.",
            ]}
          />
        </EditorialSection>

        {/* ── 07 · IA honest stance (más rica) ── */}
        <EditorialSection
          marker="07"
          eyebrow="La IA, sin marketing"
          title="La metemos cuando ahorra horas. No para tener algo que vender."
          lead="Aquí dejamos por escrito dónde la IA aporta y dónde es ruido. Esta página es honesta porque queremos clientes que sepan dónde están entrando."
        >
          <AutomationAiHonestStance />
        </EditorialSection>

        {/* ── 08 · Proceso ── */}
        <EditorialSection
          marker="08"
          eyebrow="Cómo trabajamos"
          title="Mapa primero. Construcción después. Observabilidad siempre."
          variant="narrow"
          lead="Antes de tocar n8n, Make o código, definimos qué sistema manda en cada dato y qué pasa cuando algo se rompe. Sin esto, las automatizaciones se caen al primer cambio."
        >
          <ProcessRail items={service.process} />
        </EditorialSection>

        {/* ── 09 · Entregables ── */}
        <EditorialSection
          marker="09"
          eyebrow="Qué entregamos"
          title="Lo que se queda en producción cuando terminamos."
        >
          <DeliverableSheet
            items={service.deliverables}
            footer="Documentación del flujo, accesos a logs, alertas configuradas en Slack o email, runbook básico de incidencias y formación al equipo si se necesita."
          />
        </EditorialSection>

        {service.caseStudyIds.length > 0 && (
          <EditorialSection
            marker="10"
            eyebrow="Resultados reales"
            title="Horas recuperadas, errores eliminados, datos consistentes."
          >
            <CaseInline ids={service.caseStudyIds} />
          </EditorialSection>
        )}

        <EditorialSection
          id="faq"
          marker="11"
          eyebrow="Preguntas frecuentes"
          title="Lo que se pregunta antes de empezar."
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
              kicker="Antes de invertir"
              title="Mapeamos contigo dónde se pierde tiempo de verdad."
              body="30 minutos para identificar los flujos que realmente generan dolor y estimar el ROI de automatizarlos. Si no compensa, te lo decimos. Sin presión, sin marketing."
              secondaryHref="/servicios/software-a-medida"
              secondaryLabel="Ver software a medida"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
