import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const services = {
  "landing-pages": {
    title: "Landing pages de alto rendimiento",
    description: "Diseñadas para captar leads cualificados con copy y analítica listos desde el día uno.",
    h1: "Landing pages que convierten en Sevilla y toda España",
  },
  "web-corporativa": {
    title: "Web corporativa que genera confianza",
    description: "Arquitectura clara, mensajes precisos y rendimiento para mejorar conversión.",
    h1: "Web corporativa profesional en Sevilla y España",
  },
  "marketing-digital": {
    title: "Marketing digital orientado a resultados",
    description: "SEO on-page, medición y soporte en campañas para captar demanda.",
    h1: "Marketing digital para crecer en Sevilla y España",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: keyof typeof services } }): Metadata {
  const s = services[params.slug];
  const path = `/servicios/${params.slug}`;
  return {
    title: titleTemplate(s.title),
    description: s.description,
    alternates: { canonical: canonical(path) },
    openGraph: { title: s.title, description: s.description, url: path, images: openGraphImage() },
  };
}

export default function ServicePage({ params }: { params: { slug: keyof typeof services } }) {
  const s = services[params.slug];
  const crumbs = breadcrumbJsonLd([
    { name: "Inicio", url: canonical("/") },
    { name: "Servicios", url: canonical("/servicios") },
    { name: s.title, url: canonical(`/servicios/${params.slug}`) },
  ]);
  const svc = serviceJsonLd({ name: s.title, description: s.description });

  return (
    <main>
      <section className="py-12 sm:py-16">
        <Container>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{s.h1}</h1>
          <p className="mt-3 text-slate-700 max-w-2xl">{s.description}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Reutiliza tarjetas/bullets de la sección general de Servicios o añade contenido más específico aquí */}
            <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-semibold">Qué incluye</h2>
              <ul className="mt-2 list-disc pl-5 text-slate-700">
                <li>Arquitectura de información y copy orientado a conversión</li>
                <li>SEO on-page y medición de eventos clave</li>
                <li>Accesibilidad y rendimiento (Core Web Vitals)</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-semibold">Proceso</h2>
              <p className="mt-2 text-slate-700">Diagnóstico, estrategia, diseño, desarrollo, medición y mejora continua.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="font-semibold">Resultados esperables</h2>
              <p className="mt-2 text-slate-700">Mayor conversión, claridad de mensajes y datos para decidir.</p>
            </article>
          </div>
        </Container>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(svc) }} />
    </main>
  );
}