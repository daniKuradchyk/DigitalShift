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

const service = getService("crm-intranet-a-medida");

const modules = [
  {
    title: "Roles y permisos",
    text: "Cada perfil ve y hace lo que debe, sin convertir el sistema en un espacio indiferenciado.",
  },
  {
    title: "Estados y trazabilidad",
    text: "Cada expediente, oportunidad o tarea deja rastro claro y medible a lo largo del proceso.",
  },
  {
    title: "Paneles y vistas por equipo",
    text: "La información importante se presenta según contexto operativo, no como una tabla genérica para todos.",
  },
  {
    title: "Automatizaciones y alertas",
    text: "El sistema puede mover tareas, avisar, generar documentación o sincronizar con otras herramientas.",
  },
];

const longTerm = [
  "El sistema debe poder crecer por módulos sin reescribirse entero.",
  "La operativa comercial y la operativa interna pueden convivir en una misma base si el modelo está bien planteado.",
  "La adopción mejora cuando el sistema refleja el proceso real y no obliga a esconder trabajo fuera.",
];

export const metadata: Metadata = buildMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: service.href,
});

export default function CrmIntranetServicePage() {
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
      <JsonLd id="ld-crm-breadcrumbs" data={breadcrumbData} />
      <JsonLd
        id="ld-crm-service"
        data={serviceJsonLd({
          name: service.shortTitle,
          description: service.metaDescription,
          areaUrl: canonical(service.href),
        })}
      />
      <JsonLd id="ld-crm-faq" data={faqJsonLd(service.faqs)} />
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
              title="Qué suele empujar a una empresa a plantearse un CRM o una intranet a medida"
              description="Normalmente la señal es clara: el equipo ya trabaja fuera del sistema porque el sistema no representa bien la operativa."
            />
            <div className="mt-10">
              <ProblemGrid items={service.problems} />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Módulos clave"
              title="Qué suele incluir este tipo de sistema"
              description="No se trata de replicar un CRM genérico. Se trata de modelar bien la operativa, el control y la visibilidad."
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              {modules.map((item) => (
                <article key={item.title} className="surface-card relative overflow-hidden rounded-3xl p-6">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Qué entregamos" title="Qué entrega Qubelia en este servicio" />
            <div className="mt-10">
              <DeliverableList items={service.deliverables} />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Escenarios"
              title="Casos de uso habituales"
              description="Desde un CRM adaptado a un proceso complejo hasta una intranet operativa que conecta varias áreas en un mismo flujo."
            />
            <div className="mt-10">
              <ScenarioGrid items={service.scenarios} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Proceso" title="Cómo se construye un sistema interno útil" />
            <div className="mt-10">
              <ProcessTimeline items={service.process} />
            </div>
          </Container>
        </section>

        <section className="bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro
              eyebrow="Visión a largo plazo"
              title="Este tipo de sistema tiene sentido cuando se piensa como infraestructura de negocio"
              description="No es una herramienta decorativa. Es una base operativa que debe ganar valor con el tiempo."
            />
            <div className="mt-10 grid gap-3">
              {longTerm.map((item, index) => (
                <div key={item} className="surface-card relative overflow-hidden flex gap-4 rounded-2xl p-4">
                  <span className="font-mono text-sm text-sky-400">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Encaje y beneficios" title="Cuándo sí encaja este servicio y qué mejoras debería producir" />
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
            <SectionIntro eyebrow="Casos" title="Resultados relacionados con esta capa de sistema interno" />
            <div className="mt-10">
              <CaseHighlights ids={service.caseStudyIds} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <SectionIntro eyebrow="Recursos" title="Contenido y labs relacionados" />
            <div className="mt-10">
              <ResourceLinks posts={service.relatedPosts} labSlugs={service.relatedLabs} />
            </div>
          </Container>
        </section>

        <section id="faq" className="scroll-mt-28 bg-slate-50/30 py-20 dark:bg-white/[0.01]">
          <Container>
            <SectionIntro eyebrow="FAQ" title="Preguntas frecuentes sobre CRM e intranet a medida" />
            <div className="mt-10">
              <FaqList items={service.faqs} />
            </div>
          </Container>
        </section>

        <section className="py-20">
          <Container>
            <FinalCta
              title="Si el equipo ya trabaja fuera del sistema, la prioridad no es añadir más parches"
              text="Podemos revisar proceso, límites de la herramienta actual y qué parte tiene sentido construir como sistema interno propio."
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
