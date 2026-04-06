import type { Metadata } from "next";
import Container from "@/components/common/Container";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import SectionIntro from "@/components/marketing/SectionIntro";
import ServiceCards from "@/components/marketing/ServiceCards";
import FinalCta from "@/components/marketing/FinalCta";
import JsonLd from "@/components/marketing/JsonLd";
import { FitPanels, ProcessTimeline } from "@/components/marketing/ServiceBlocks";
import { serviceHubFit, serviceHubMethod } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

/* ─── SEO ─── */
export const metadata: Metadata = buildMetadata({
  title: "Servicios de Qubelia | Software, web, automatización y CRM a medida",
  description:
    "Cuatro líneas de servicio para empresas B2B: software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida. Criterio técnico, propiedad del código y entrega real.",
  path: "/servicios",
});

/* ─── Data ─── */
const problems = [
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
    title: "Operativa que depende de parches",
    description:
      "Excel, correo, mensajes sueltos y herramientas que nadie ha pensado como sistema.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Presencia digital que no representa el nivel real",
    description:
      "La web no explica bien qué hace la compañía ni ayuda a captar demanda cualificada.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Herramientas desconectadas y trabajo manual repetitivo",
    description:
      "El mismo dato entra varias veces, los informes llegan tarde y cada cambio rompe algo.",
  },
  {
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Sistemas estándar que ya no reflejan la realidad",
    description:
      "Cuando el CRM o la intranet obligan a trabajar fuera del sistema, dejan de ordenar la operativa.",
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios" },
  ];

  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Servicios", url: canonical("/servicios") },
  ]);

  return (
    <>
      <JsonLd id="ld-services-breadcrumbs" data={breadcrumbData} />
      <Header />
      <main id="contenido">
        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 50% at 30% 20%, rgba(65,105,225,0.12), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(91,141,239,0.08), transparent 50%)",
            }}
          />
          <Container className="relative">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-6 max-w-4xl">
              <SectionIntro
                eyebrow="Catálogo de servicios"
                title="Cuatro líneas para empresas que ya han superado la fase de los parches"
                description="Qubelia trabaja cuatro líneas concretas: software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida. Cada una responde a una decisión distinta."
              />
            </div>
          </Container>
        </section>

        {/* ═══ PROBLEMAS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Problemas que resolvemos"
              title="La misma empresa puede llegar por síntomas distintos"
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {problems.map((problem) => (
                <article
                  key={problem.title}
                  className="group card-glass rounded-2xl p-6 transition-all hover:border-blue-400/25"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                      {problem.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                        {problem.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {problem.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══ CATÁLOGO DE SERVICIOS ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Nuestros servicios"
              title="Cuatro líneas, cuatro conversaciones diferentes"
              description="Cada servicio existe porque responde a una decisión distinta. No cambia solo el título: cambia el tipo de problema, el foco comercial y la forma de entrar en el proyecto."
            />

            <div className="mt-10">
              <ServiceCards variant="hub" />
            </div>
          </Container>
        </section>

        {/* ═══ ENCAJE ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Encaje"
              title="Cuándo tiene sentido hablar con Qubelia y cuándo no"
              description="Decir que no a tiempo también forma parte del trabajo. El objetivo no es forzar un proyecto, sino abrir la capa adecuada cuando de verdad merece la pena."
            />

            <div className="mt-10">
              <FitPanels yes={serviceHubFit.yes} no={serviceHubFit.no} />
            </div>
          </Container>
        </section>

        {/* ═══ PROCESO ═══ */}
        <section className="py-16 sm:py-20">
          <Container>
            <SectionIntro
              eyebrow="Cómo suele empezar"
              title="Antes de construir, ordenamos la decisión"
              description="El arranque no debería ser una propuesta grandilocuente. Debería dejar claro qué problema se ataca, con qué alcance inicial y con qué primer paso ejecutable."
            />

            <div className="mt-10">
              <ProcessTimeline items={serviceHubMethod} />
            </div>
          </Container>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="pb-20 pt-4">
          <Container>
            <FinalCta
              title="Si el problema ya está claro, la siguiente conversación debería ser concreta"
              text="Revisamos encaje, prioridad y primera fase del proyecto. Sin promesas abstractas y sin abrir una línea de servicio que no toca."
              secondaryHref="/servicios/software-a-medida"
              secondaryLabel="Ver un servicio en detalle"
            />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
