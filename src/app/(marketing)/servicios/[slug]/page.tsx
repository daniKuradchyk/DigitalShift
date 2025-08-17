import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

type Slug = "landing-pages" | "web-corporativa" | "marketing-digital";
type Params = { slug: Slug };

const SLUGS: Slug[] = ["landing-pages", "web-corporativa", "marketing-digital"];
const META: Record<Slug, { title: string; description: string; h1: string; bullets: string[] }> = {
  "landing-pages": {
    title: "Landing pages de alto rendimiento",
    description: "Arquitectura, copy y analítica listos desde el día uno para convertir visitas en leads.",
    h1: "Landing pages de alto rendimiento",
    bullets: ["Arquitectura orientada a conversión","Copy SEO + pruebas sociales","Medición con eventos clave (GA4)"],
  },
  "web-corporativa": {
    title: "Web corporativa que genera confianza",
    description: "Estructura clara, diseño accesible y mensajes precisos para transmitir solvencia.",
    h1: "Web corporativa que genera confianza",
    bullets: ["Mapa de contenidos y UX","Componentes reutilizables","Rendimiento y accesibilidad"],
  },
  "marketing-digital": {
    title: "Marketing digital orientado a resultados",
    description: "SEO on-page, analítica y soporte en campañas para captar demanda cualificada.",
    h1: "Marketing digital orientado a resultados",
    bullets: ["SEO técnico y contenidos","Tracking limpio (GA4/GSC)","Iteración basada en datos"],
  },
};

export function generateStaticParams(): Params[] {
  return SLUGS.map((slug) => ({ slug }));
}

export const revalidate = 86400;

export function generateMetadata(
  { params }: { params: Params }
): Metadata {
  const { slug } = params;
  const m = META[slug];
  const path = `/servicios/${slug}`;
  return {
    title: titleTemplate(m.title),
    description: m.description,
    alternates: { canonical: canonical(path) },
    openGraph: { title: m.title, description: m.description, url: path },
  };
}

export default function ServicePage({ params }: { params: Params }) {
  const { slug } = params;
  if (!SLUGS.includes(slug)) notFound();

  const m = META[slug];

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{m.h1}</h1>
        <p className="mt-2 text-slate-700">{m.description}</p>
        <ul className="mt-6 space-y-2 text-slate-700">
          {m.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span aria-hidden className="mt-2 inline-block h-2 w-2 rounded-full bg-emerald-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <a href="#contacto" className="inline-flex items-center rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">
            Solicitar propuesta
          </a>
        </div>
      </Container>
    </main>
  );
}
