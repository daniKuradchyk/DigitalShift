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

const service = getService("automatizacion-integraciones");

/* ─── Contenido editorial único ─── */
const flowBlocks = [
  { label: "Comercial", text: "Formularios, CRM y procesos comerciales." },
  { label: "Finanzas", text: "ERP, facturación, reporting y consolidación." },
  { label: "Operaciones", text: "Email, documentación, aprobaciones y alertas." },
  { label: "Sistemas", text: "APIs, bases de datos y servicios internos o legacy." },
];

const robustness = [
  {
    title: "Fuente de verdad definida",
    text: "Antes de automatizar hay que saber qué sistema manda en cada dato y qué reglas deben mantenerse.",
  },
  {
    title: "Observabilidad",
    text: "Los flujos deben dejar logs, alertas y contexto suficiente para detectar y corregir fallos rápido.",
  },
  {
    title: "Mantenimiento",
    text: "La solución tiene que resistir cambios de campos, APIs o procesos sin convertirse en una bomba silenciosa.",
  },
];

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

  return (
    <>
      <JsonLd id="ld-automation-breadcrumbs" data={breadcrumbData} />
      <JsonLd
        id="ld-automation-service"
        data={serviceJsonLd({
          name: service.shortTitle,
          description: service.metaDescription,
          areaUrl: canonical(service.href),
        })}
      />
      <JsonLd id="ld-automation-faq" data={faqJsonLd(service.faqs)} />
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
          image="/images/svc-automation.png"
        />

        {/* ═══ PROBLEMAS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Problemas"
              title="Qué problemas operativos suele atacar este servicio"
              description="El objetivo no es automatizar por moda. Es quitar tareas repetitivas, evitar errores y dejar mejor conectadas áreas que ya dependen unas de otras."
            />
            <div className="mt-10">
              <ProblemGrid items={service.problems} />
            </div>
          </Container>
        </section>

        {/* ═══ ALCANCE TÉCNICO ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Alcance técnico"
              title="Qué tipo de herramientas y sistemas solemos conectar"
              description="Automatización e integraciones se plantean como servicio operativo, no como una suma de zaps o escenarios sin dueño técnico."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {flowBlocks.map((item, i) => (
                <div
                  key={item.label}
                  className="card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-400">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-base font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══ ENTREGABLES ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Qué entregamos"
              title="Qué entrega exactamente Qubelia en automatización e integraciones"
            />
            <div className="mt-10">
              <DeliverableList items={service.deliverables} />
            </div>
          </Container>
        </section>

        {/* ═══ SOLUCIÓN ROBUSTA ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Solución robusta"
              title="Por qué no vendemos automatizaciones frágiles"
              description="Conectar herramientas es fácil. Lo difícil es que siga funcionando cuando cambian campos, procesos o volumen."
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {robustness.map((item) => (
                <article
                  key={item.title}
                  className="card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25"
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

        {/* ═══ ESCENARIOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Escenarios"
              title="Escenarios habituales"
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
              title="Cómo se diseña y despliega este tipo de servicio"
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
              title="Dónde aporta más y dónde no"
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
              title="Resultados relacionados con automatización e integraciones"
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
              title="Lecturas y herramientas relacionadas"
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
              title="Preguntas frecuentes sobre automatización e integraciones"
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
              title="Si ya tienes herramientas pero la operativa sigue siendo manual, el cuello de botella casi nunca es la herramienta"
              text="Podemos revisar procesos, fuentes de verdad y puntos de sincronización para montar una solución operativa robusta y mantenible."
              secondaryHref="/servicios/crm-intranet-a-medida"
              secondaryLabel="Ver CRM / intranet a medida"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
