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
  CrmAdoptionGotchas,
  CrmEntityModel,
  CrmPanelMockup,
  CrmRolesMatrix,
} from "@/components/marketing/services/CrmBlocks";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

const service = getService("crm-intranet-a-medida");

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function CrmServicePage() {
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
      <JsonLd id="ld-crm-breadcrumbs" data={breadcrumbData} />
      <JsonLd id="ld-crm-service" data={serviceData} />
      <JsonLd id="ld-crm-faq" data={faqJsonLd(service.faqs)} />
      <Header />
      <main id="contenido" className="bg-white divide-y divide-[#E4E6EA]">
        <EditorialHero
          slug="crm-intranet-a-medida"
          breadcrumbs={breadcrumbs}
          eyebrow="CRM · Intranet · Sistemas internos"
          title="El sistema interno que refleja tu operativa real."
          subtitle="Cuando HubSpot, Pipedrive o una intranet genérica obligan a torcer cómo trabajáis, construimos el CRM, la intranet o la extranet que sí encaja. Roles, permisos, trazabilidad y paneles a medida — sin parches."
          honestyLine="Si un HubSpot bien configurado cubre el 80% de lo que necesitáis, te lo decimos. Lo correcto a veces es contratar un buen consultor de HubSpot, no un proyecto a medida."
          metaPills={[
            { label: "Primera fase", value: "8–14 semanas" },
            { label: "Inversión típica", value: "30–120k €" },
            { label: "Permisos", value: "Por entidad y estado" },
            { label: "Vendor lock-in", value: "Cero" },
          ]}
        />

        {/* ── 01 · Síntomas / problemas ── */}
        <EditorialSection
          marker="01"
          eyebrow="Cuándo deja de encajar"
          title="Cuatro señales de que el CRM estándar ya no os sirve."
        >
          <ProblemNarrative
            intro="No empieza con un drama. Empieza con notas en Slack, hojas de Excel paralelas y reglas que solo conoce una persona. Estos son los síntomas que vemos cuando una operativa ya superó el límite de un CRM genérico."
            items={service.problems}
          />
        </EditorialSection>

        {/* ── 02 · Entity model (signature único) ── */}
        <EditorialSection
          marker="02"
          eyebrow="Modelo de datos"
          title="No es un CRM con módulos. Es vuestro modelo, codificado."
          lead="Cada empresa tiene entidades propias — expedientes, contratos, instalaciones, certificados. Diseñamos el modelo sobre esas entidades reales, no sobre las que ya trae el SaaS de turno."
        >
          <CrmEntityModel />
        </EditorialSection>


        {/* ── 03 · Roles matrix detallada ── */}
        <EditorialSection
          marker="03"
          eyebrow="Permisos finos"
          title="Cada rol ve lo que tiene que ver. Ni un campo más."
          lead="Permisos por entidad, por estado, por equipo. Sin '15 perfiles que en realidad son tres'. Sin auditoría parcial. Cada acción queda trazada con actor, timestamp y diff."
        >
          <CrmRolesMatrix />
        </EditorialSection>

        {/* ── 04 · Decisión ── */}
        <EditorialSection
          marker="04"
          eyebrow="Decisión"
          title="A medida sí. A medida no. Antes de gastar un euro."
          lead="Nuestra primera respuesta no siempre es construir. A veces es 'reconfigurar lo que tenéis', y otras es 'cambiar de herramienta'. Solo recomendamos a medida cuando aporta de verdad."
        >
          <DecisionDuo
            yes={[
              "El proceso comercial u operativo tiene demasiadas particularidades para un CRM estándar.",
              "Necesitáis roles, permisos, trazabilidad y paneles específicos por equipo o estado.",
              "La empresa quiere una visión a 3–5 años y una base propia para crecer.",
              "La herramienta actual ya obliga a trabajar fuera del sistema con notas paralelas.",
            ]}
            no={[
              "Un CRM estándar bien configurado cubre el 80%+ de la necesidad sin fricción seria.",
              "La empresa todavía no tiene el proceso definido y busca resolverlo solo con software.",
              "Solo necesitáis una implantación ligera de una herramienta comercial existente.",
              "No hay intención de mantener ni evolucionar el sistema después del lanzamiento.",
            ]}
          />
        </EditorialSection>

        {/* ── 05 · Panel mockup por rol ── */}
        <EditorialSection
          marker="05"
          eyebrow="Vista por rol"
          title="Lo que ve un manager. Lo que ve un comercial. Lo que ve un cliente."
        >
          <CrmPanelMockup />
        </EditorialSection>

        {/* ── 06 · Escenarios ── */}
        <EditorialSection
          marker="06"
          eyebrow="Qué construimos"
          title="CRM, intranet o extranet. La forma depende de tu operativa."
        >
          <ScenarioRows items={service.scenarios} />
        </EditorialSection>

        {/* ── 07 · Lo que tiene dentro ── */}
        <EditorialSection
          marker="07"
          eyebrow="Lo que tiene dentro"
          title="Las piezas estándar de un sistema interno serio."
          lead="No es un módulo más, ni una plantilla. Estas son las capas que diseñamos a medida — adaptadas a vuestro proceso, no a una arquitectura genérica."
        >
          <IntegrationStrip
            items={[
              "Roles · permisos finos por entidad",
              "Estados · workflows · aprobaciones",
              "Auditoría · histórico de cambios",
              "Paneles · vistas por rol",
              "Búsqueda · filtros avanzados",
              "Documentación · ficheros · firma",
              "Notificaciones · alertas · email",
              "Integraciones ERP · facturación",
              "API REST propia",
              "Exportaciones · informes",
              "SSO · autenticación corporativa",
              "App móvil opcional",
            ]}
          />
        </EditorialSection>

        {/* ── 08 · Adoption gotchas (signature único) ── */}
        <EditorialSection
          marker="08"
          eyebrow="Lo que decide la adopción"
          title="Por qué algunos CRM a medida se abandonan en seis meses."
          lead="Construir el sistema es el 60% del trabajo. El otro 40% es asegurar que la gente lo usa. Estos son los puntos donde se gana o se pierde la adopción."
        >
          <CrmAdoptionGotchas />
        </EditorialSection>

        {/* ── 09 · Proceso ── */}
        <EditorialSection
          marker="09"
          eyebrow="Cómo trabajamos"
          title="Modelo operativo primero. Software después."
          variant="narrow"
          lead="Cuatro fases. La primera no es 'recoger requisitos'. Es entender entidades, ciclos de vida y reglas de negocio. Si esto no está bien, el sistema no se adopta — y se queda como un cementerio digital."
        >
          <ProcessRail items={service.process} />
        </EditorialSection>

        {/* ── 10 · Entregables ── */}
        <EditorialSection
          marker="10"
          eyebrow="Qué incluye"
          title="Lo que entregamos en el alcance acordado."
        >
          <DeliverableSheet
            items={service.deliverables}
            footer="Y un repositorio limpio, formación al equipo, documentación operativa por rol, y la capacidad de ampliar el sistema con nuevos módulos sin tener que rehacerlo."
          />
        </EditorialSection>

        {service.caseStudyIds.length > 0 && (
          <EditorialSection
            marker="11"
            eyebrow="Resultados reales"
            title="Adopción, trazabilidad y operativa que sí refleja el negocio."
          >
            <CaseInline ids={service.caseStudyIds} />
          </EditorialSection>
        )}

        <EditorialSection
          id="faq"
          marker="12"
          eyebrow="Preguntas frecuentes"
          title="Lo que se pregunta antes de firmar."
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
              title="Validamos contigo si tu caso necesita un sistema propio."
              body="30 minutos para mapear vuestro proceso, evaluar si un CRM estándar puede cubrirlo y, si la respuesta es no, definir una primera fase realista. Honesto, sin presión comercial."
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
