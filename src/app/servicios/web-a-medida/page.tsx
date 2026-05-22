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
import {
  WebLighthousePanel,
  WebSeoChecklist,
  WebStackSnapshot,
  WebVsTemplate,
} from "@/components/marketing/services/WebBlocks";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService } from "@/content/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

const service = getService("web-a-medida");

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function WebServicePage() {
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

  return (
    <>
      <JsonLd id="ld-web-breadcrumbs" data={breadcrumbData} />
      <JsonLd id="ld-web-service" data={serviceData} />
      <JsonLd id="ld-web-faq" data={faqJsonLd(service.faqs)} />
      <Header />
      <main id="contenido">
        <EditorialHero
          slug="web-a-medida"
          breadcrumbs={breadcrumbs}
          eyebrow="Web a medida · Diseño y rendimiento"
          title="Una web que transmite el nivel real de tu empresa."
          subtitle="Web corporativa o comercial diseñada con criterio. Estructura, rendimiento, SEO técnico base y un mensaje que explica qué hacéis sin claims vacíos. No otra plantilla maquillada con animaciones."
          honestyLine="Si solo necesitas una landing temporal o una one-page para salir del paso, una web a medida es matar moscas a cañonazos. Te lo decimos."
          metaPills={[
            { label: "Core Web Vitals", value: "95+ / 100" },
            { label: "Stack", value: "Next.js · React" },
            { label: "Primera entrega", value: "4–6 semanas" },
            { label: "Inversión típica", value: "8–25k €" },
          ]}
        />

        {/* ── 01 · Performance como diferenciador (signature único de Web) ── */}
        <EditorialSection
          marker="01"
          eyebrow="Lo que se mide, posiciona"
          title="Core Web Vitals reales — no promesas de plantilla."
          lead="Estos son los números que Google evalúa para decidir si tu web aparece. Una web a medida los respeta desde el primer día; una plantilla con plugins suele fallarlos todos."
        >
          <WebLighthousePanel />
        </EditorialSection>

        {/* ── 02 · Problemas ── */}
        <EditorialSection
          marker="02"
          eyebrow="Por qué importa"
          title="Tu web no es lenta por casualidad. Es lenta por decisiones."
        >
          <ProblemNarrative
            intro="La mayoría de webs B2B españolas fallan por las mismas cuatro razones — y ninguna se arregla cambiando la imagen del hero o pidiendo a un freelance 'que la haga más bonita'."
            items={service.problems}
          />
        </EditorialSection>

        {/* ── 03 · Comparativa contra plantilla / WP ── */}
        <EditorialSection
          marker="03"
          eyebrow="A medida vs plantilla"
          title="La diferencia no es estética. Es lo que pasa al año."
          lead="Una plantilla aguanta tres meses. Después llegan los plugins, los parches, los plugins que rompen plugins y la migración que cuesta más que haberlo hecho bien desde el principio."
        >
          <WebVsTemplate />
        </EditorialSection>

        {/* ── 04 · Decisión sí/no ── */}
        <EditorialSection
          marker="04"
          eyebrow="Decisión"
          title="Web a medida sí. Web a medida no. Sin medias tintas."
          lead="No siempre hace falta. Esta es la conversación honesta antes del diagnóstico."
        >
          <DecisionDuo
            yes={[
              "La web es pieza comercial real, no un folleto. Forma parte del proceso de venta.",
              "Necesitáis posicionar en Google para términos B2B con intención de compra.",
              "Hay integraciones, tracking o requisitos técnicos que una plantilla resuelve mal.",
              "Queréis una base que pueda crecer: nuevos servicios, blog, landing pages, recursos.",
            ]}
            no={[
              "Solo buscáis publicar algo rápido sin estrategia, presupuesto pequeño y plazo corto.",
              "La empresa todavía no tiene claro qué vende, a quién y con qué prioridad.",
              "No vais a cuidar el contenido ni revisar la captación después del lanzamiento.",
              "Una one-page o un Webflow temporal cubre lo que necesitáis ahora mismo.",
            ]}
          />
        </EditorialSection>

        {/* ── 05 · Stack técnico ── */}
        <EditorialSection
          marker="05"
          eyebrow="Foco técnico"
          title="Lo que montamos desde el día uno — no como añadido al final."
          lead="Estos no son extras. Son la base que diferencia una web que posiciona y convierte de una que solo se ve."
        >
          <WebStackSnapshot />
        </EditorialSection>

        {/* ── 06 · SEO técnico checklist ── */}
        <EditorialSection
          marker="06"
          eyebrow="SEO técnico"
          title="Diez puntos que decide Google — y que nadie audita."
          lead="Esto no lo hace un plugin. Lo hace la arquitectura del proyecto. Una web a medida los cumple por construcción, no por configuración posterior."
        >
          <WebSeoChecklist />
        </EditorialSection>

        {/* ── 07 · Casos típicos ── */}
        <EditorialSection
          marker="07"
          eyebrow="Casos típicos"
          title="Tres formas en que esto suele aterrizar."
        >
          <ScenarioRows items={service.scenarios} />
        </EditorialSection>

        {/* ── 08 · Proceso ── */}
        <EditorialSection
          marker="08"
          eyebrow="Cómo trabajamos"
          title="Estructura primero. Diseño después. Código al final."
          variant="narrow"
          lead="Cuatro fases con entregables concretos. Antes de escribir una línea de código, validamos arquitectura, mensaje y bloques contigo."
        >
          <ProcessRail items={service.process} />
        </EditorialSection>

        {/* ── 09 · Entregables ── */}
        <EditorialSection
          marker="09"
          eyebrow="Qué incluye"
          title="Lo que sale de aquí cuando terminamos."
        >
          <DeliverableSheet
            items={service.deliverables}
            footer="Y un repositorio en GitHub, despliegue continuo configurado, documentación de cómo añadir páginas y recursos, y la garantía de que cualquier desarrollador puede continuar el trabajo mañana."
          />
        </EditorialSection>

        {service.caseStudyIds.length > 0 && (
          <EditorialSection
            marker="10"
            eyebrow="Resultados reales"
            title="Lo que han conseguido empresas en situaciones parecidas."
          >
            <CaseInline ids={service.caseStudyIds} />
          </EditorialSection>
        )}

        <EditorialSection
          id="faq"
          marker="11"
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

        <Container>
          <EditorialFinalCta
            kicker="Antes de pedir presupuesto"
            title="Empieza por revisar tu web actual."
            body="30 minutos para auditar estructura, mensaje, SEO técnico y conversión. Te decimos qué se puede arreglar sin rehacer y cuándo merece la pena empezar de cero. Honesto, sin presión."
            secondaryHref="/servicios/software-a-medida"
            secondaryLabel="Ver software a medida"
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
