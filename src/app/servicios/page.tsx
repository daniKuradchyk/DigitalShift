import type { Metadata } from "next";
import Container from "@/components/common/Container";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import SectionIntro from "@/components/marketing/SectionIntro";
import FinalCta from "@/components/marketing/FinalCta";
import JsonLd from "@/components/marketing/JsonLd";
import {
  HubFitPanels,
  HubProcessTimeline,
  ServicesComparison,
  ServicesTriage,
} from "@/components/marketing/services/ServicesHubBlocks";
import { serviceHubFit, serviceHubMethod } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Servicios: software a medida, web y automatización | Qubelia",
  description:
    "Software a medida, desarrollo web, automatización de procesos y CRM a medida para empresas B2B en España. Criterio técnico y propiedad del código.",
  path: "/servicios",
});

const problems = [
  {
    title: "Operativa que depende de parches",
    description:
      "Excel, correo, mensajes sueltos y herramientas que nadie ha pensado como sistema. Cada mes hace falta un nuevo apaño y el siguiente cambio rompe otra cosa.",
  },
  {
    title: "Presencia digital que no representa el nivel real",
    description:
      "La web no explica bien qué hace la compañía, no aparece en Google para las búsquedas que importan y la operativa comercial no se apoya en ella.",
  },
  {
    title: "Herramientas desconectadas y trabajo manual repetitivo",
    description:
      "El mismo dato entra varias veces, los informes llegan tarde y los errores se descubren a las dos semanas — cuando ya nadie recuerda quién hizo qué.",
  },
  {
    title: "Sistemas estándar que ya no reflejan la realidad",
    description:
      "Cuando el CRM o la intranet obligan a trabajar fuera del sistema con notas paralelas, dejan de ordenar la operativa — y empieza el cementerio digital.",
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
        <section className="bg-white pb-16 pt-28 sm:pb-20 sm:pt-32">
          <Container>
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-6 max-w-4xl animate-fade-up">
              <SectionIntro
                as="h1"
                eyebrow="Catálogo de servicios"
                title="Software a medida, web y automatización para empresas que ya superaron la fase de los parches"
                description="Qubelia trabaja cuatro líneas concretas: software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida. Cada una responde a una decisión distinta — no son la misma propuesta con cuatro nombres."
              />
            </div>

            {/* Quick stats */}
            <div className="mt-12 border-t border-[#E4E6EA] animate-fade-up delay-200">
              <dl className="grid grid-cols-2 gap-x-6 md:grid-cols-4 md:gap-x-0 md:divide-x md:divide-[#E4E6EA]">
                {[
                  { label: "Líneas activas", value: "4" },
                  { label: "Servicios estándar", value: "0" },
                  { label: "Vendor lock-in", value: "Cero" },
                  { label: "Decir 'no'", value: "Parte del trabajo" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="py-6 md:py-8 md:px-8 first:md:pl-0 last:md:pr-0"
                  >
                    <dt className="text-sm text-[#63666D]">{s.label}</dt>
                    <dd className="mt-1.5 text-xl sm:text-2xl font-semibold tracking-tight text-[#101014]">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </section>

        {/* ═══ COMPARATIVA DE 4 SERVICIOS ═══ */}
        <section className="border-t border-[#E4E6EA] bg-white py-20 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Catálogo · vista comparada"
              title="Cuatro servicios, cuatro decisiones distintas"
              description="No es 'elige uno y nos ponemos'. Cada línea tiene su signature, su umbral de entrada y su perfil de empresa. Esta es la vista comparada para decidir antes de pedir presupuesto."
            />

            <div className="mt-14">
              <ServicesComparison />
            </div>
          </Container>
        </section>

        {/* ═══ TRIAGE — síntoma → servicio ═══ */}
        <section className="border-t border-[#E4E6EA] bg-[#F5F6F8] py-20 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Diagnóstico rápido"
              title="Empieza por el síntoma, no por la solución"
              description="La mayoría de empresas llegan sabiendo lo que les duele, no sabiendo qué servicio necesitan. Esta tabla traduce síntomas operativos en la línea de servicio que suele encajar."
            />

            <div className="mt-10">
              <ServicesTriage />
            </div>
          </Container>
        </section>

        {/* ═══ PROBLEMAS NARRATIVOS ═══ */}
        <section className="border-t border-[#E4E6EA] bg-white py-20 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Por qué llegan aquí"
              title="La misma empresa puede llegar por síntomas distintos"
              description="No siempre es obvio qué línea atacar primero. A veces el problema visible es síntoma de otro mayor. Por eso el diagnóstico precede a la propuesta."
            />

            <div className="mt-12 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
              {problems.map((problem, i) => (
                <article
                  key={problem.title}
                  className="grid grid-cols-12 gap-4 py-10 sm:gap-6 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums text-[#9DA0A6]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="col-span-10 sm:col-span-11 lg:col-span-8 lg:col-start-2">
                    <h3 className="mb-3 text-xl sm:text-2xl font-semibold tracking-tight leading-snug text-[#101014]">
                      {problem.title}
                    </h3>
                    <p className="max-w-2xl text-base leading-relaxed text-[#3D4046]">
                      {problem.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══ ENCAJE ═══ */}
        <section className="border-t border-[#E4E6EA] bg-[#F5F6F8] py-20 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Encaje"
              title="Cuándo tiene sentido hablar con Qubelia y cuándo no"
              description="Decir que no a tiempo también forma parte del trabajo. El objetivo no es forzar un proyecto, sino abrir la capa adecuada cuando de verdad merece la pena."
            />

            <div className="mt-10">
              <HubFitPanels yes={serviceHubFit.yes} no={serviceHubFit.no} />
            </div>
          </Container>
        </section>

        {/* ═══ PROCESO ═══ */}
        <section className="border-t border-[#E4E6EA] bg-white py-20 sm:py-24">
          <Container>
            <SectionIntro
              eyebrow="Cómo suele empezar"
              title="Antes de construir, ordenamos la decisión"
              description="El arranque no debería ser una propuesta grandilocuente. Debería dejar claro qué problema se ataca, con qué alcance inicial y con qué primer paso ejecutable."
            />

            <div className="mt-10">
              <HubProcessTimeline items={serviceHubMethod} />
            </div>
          </Container>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="border-t border-[#E4E6EA] bg-white py-20 sm:py-24">
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
