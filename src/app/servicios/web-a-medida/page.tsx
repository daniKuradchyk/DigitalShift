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

const service = getService("web-a-medida");

/* ─── Contenido editorial único ─── */
const comparison = [
  {
    title: "Web low-cost",
    text: "Sale rápido, pero suele quedarse corta en mensaje, arquitectura, rendimiento y evolución.",
    tone: "weak" as const,
  },
  {
    title: "Plantilla bien montada",
    text: "Puede valer en algunos casos, pero arrastra límites si la web debe sostener posicionamiento, integraciones o una narrativa comercial seria.",
    tone: "neutral" as const,
  },
  {
    title: "Web a medida",
    text: "Permite definir estructura, bloques, ritmo editorial, SEO técnico y sistema visual con criterio propio y margen de crecimiento.",
    tone: "strong" as const,
  },
];

const technicalFocus = [
  "Arquitectura de páginas y enlaces internos alineada con servicios reales.",
  "Metadata, canonical, breadcrumbs y headings limpios desde la base.",
  "Rendimiento y estructura técnica pensados para Core Web Vitals razonables.",
  "Tracking, formularios e integraciones montados para negocio, no como añadido al final.",
];

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
        {/* ═══ HERO ═══ */}
        <ServicePageHero
          breadcrumbs={breadcrumbs}
          eyebrow={service.eyebrow}
          title={service.heroTitle}
          subtitle={service.heroSubtitle}
          panelTitle={service.heroPanelTitle}
          panelLines={service.heroPanelLines}
          image="/images/svc-web.png"
          imageAlt="Diseño y desarrollo web a medida para empresas B2B por Qubelia"
        />

        {/* ═══ PROBLEMAS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Problemas"
              title="Qué corrige una web a medida cuando la presencia digital importa"
              description="La web corporativa o comercial no es solo una vitrina. Si está mal planteada, debilita posicionamiento, percepción y capacidad de conversión."
            />
            <div className="mt-10">
              <ProblemGrid items={service.problems} />
            </div>
          </Container>
        </section>

        {/* ═══ COMPARATIVA ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Comparativa"
              title="Web a medida frente a plantilla o solución low-cost"
              description="No siempre hace falta una base a medida. Pero cuando la web es una pieza comercial seria, las diferencias se vuelven estructurales."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {comparison.map((item) => (
                <article
                  key={item.title}
                  className={`card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25 ${
                    item.tone === "strong" ? "border-blue-400/20 bg-blue-500/[0.04]" : ""
                  }`}
                >
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══ ENTREGABLES ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Qué entregamos"
              title="Qué entrega exactamente Qubelia en este servicio"
            />
            <div className="mt-10">
              <DeliverableList items={service.deliverables} />
            </div>
          </Container>
        </section>

        {/* ═══ FOCO TÉCNICO ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Foco técnico"
              title="Rendimiento, SEO técnico base y conversión desde el principio"
              description="La base técnica importa porque condiciona cómo se posiciona la web, cómo se mantiene y cómo se mide lo que está funcionando."
            />
            <div className="mt-10">
              <DeliverableList items={technicalFocus} />
            </div>
          </Container>
        </section>

        {/* ═══ ESCENARIOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Escenarios"
              title="Dónde suele encajar mejor una web a medida"
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
              title="Cómo trabajamos este tipo de proyecto"
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
              title="Cuándo sí compensa y qué deberías notar después"
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
              title="Resultado relacionado con este servicio"
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
              title="Guías y herramientas relacionadas"
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
              title="Preguntas frecuentes sobre web a medida"
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
              title="Si la web forma parte del negocio, conviene tratarla como una pieza de negocio"
              text="Podemos revisar estructura, mensaje, SEO técnico base e integraciones para definir una web a medida que sirva a posicionamiento y captación."
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
