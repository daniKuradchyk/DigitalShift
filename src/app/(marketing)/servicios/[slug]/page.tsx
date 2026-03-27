/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

type Slug = "landing-pages" | "web-corporativa" | "marketing-digital";
type Params = { slug: Slug };

const SLUGS: Slug[] = ["landing-pages", "web-corporativa", "marketing-digital"];

const META: Record<
  Slug,
  { title: string; description: string; h1: string; bullets: string[] }
> = {
  "landing-pages": {
    title: "Landing pages de alto rendimiento",
    description:
      "Arquitectura, copy y analítica listos desde el día uno para convertir visitas en leads.",
    h1: "Landing pages de alto rendimiento",
    bullets: [
      "Arquitectura orientada a conversión",
      "Copy SEO + pruebas sociales",
      "Medición con eventos clave (GA4)",
    ],
  },
  "web-corporativa": {
    title: "Web corporativa que genera confianza",
    description:
      "Estructura clara, diseño accesible y mensajes precisos para transmitir solvencia.",
    h1: "Web corporativa que genera confianza",
    bullets: [
      "Mapa de contenidos y UX",
      "Componentes reutilizables",
      "Rendimiento y accesibilidad",
    ],
  },
  "marketing-digital": {
    title: "Marketing digital orientado a resultados",
    description:
      "SEO on-page, analítica y soporte en campañas para captar demanda cualificada.",
    h1: "Marketing digital orientado a resultados",
    bullets: [
      "SEO técnico y contenidos",
      "Tracking limpio (GA4/GSC)",
      "Iteración basada en datos",
    ],
  },
};

export function generateStaticParams(): Params[] {
  return SLUGS.map((slug) => ({ slug }));
}

export const revalidate = 86400; // 24h (literal numérico)

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  const { slug } = (await params) as Params;
  if (!SLUGS.includes(slug)) return {};
  const m = META[slug];
  const path = `/servicios/${slug}`;
  return {
    title: titleTemplate(m.title),
    description: m.description,
    alternates: { canonical: canonical(path) },
    robots: { index: true, follow: true },
    openGraph: { title: m.title, description: m.description, url: canonical(path) },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [canonical("/images/og-cover.png")],
    },
  };
}

export default async function ServicePage({ params }: { params: any }) {
  const { slug } = (await params) as Params;
  if (!SLUGS.includes(slug)) notFound();

  const m = META[slug];

  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14] py-12 sm:py-16">
      <Container>
        <div className="max-w-2xl">
          <div className="section-tag mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Servicio
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">{m.h1}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">{m.description}</p>

          <ul className="space-y-3 mb-8">
            {m.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10"
                  aria-hidden
                >
                  <svg className="h-3 w-3 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12.5 10 17 19 8" />
                  </svg>
                </span>
                <span className="text-slate-700 dark:text-slate-300 text-sm">{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="/#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-white relative overflow-hidden bg-[linear-gradient(135deg,#0369A1_0%,#0EA5E9_35%,#22D3EE_65%,#818CF8_100%)] bg-[length:250%_100%] hover:bg-[position:100%_0] border border-sky-500/30 shadow-[0_0_24px_rgba(56,189,248,0.22)] hover:shadow-[0_0_40px_rgba(56,189,248,0.40)] hover:-translate-y-0.5 transition-all"
            >
              Solicitar propuesta
            </a>
            <a
              href="/servicios"
              className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 bg-white/80 dark:bg-slate-800/50 hover:border-sky-300 dark:hover:border-sky-500/20 hover:text-sky-600 dark:hover:text-sky-300 hover:-translate-y-0.5 transition-all"
            >
              Ver todos los servicios
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
