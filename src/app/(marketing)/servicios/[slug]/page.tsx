/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

type Slug = "landing-pages" | "web-corporativa" | "marketing-digital";
type Params = { slug: Slug };

const redirects: Record<Slug, string> = {
  "landing-pages": "/servicios/web-a-medida",
  "web-corporativa": "/servicios/web-a-medida",
  "marketing-digital": "/servicios/web-a-medida",
};

export function generateStaticParams(): Params[] {
  return Object.keys(redirects).map((slug) => ({ slug: slug as Slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { slug } = (await params) as Params;
  const destination = redirects[slug];

  if (!destination) return {};

  return {
    title: "Servicio consolidado | Qubelia",
    description: "Ruta consolidada en la nueva arquitectura de servicios de Qubelia.",
    alternates: { canonical: destination },
    robots: { index: false, follow: true },
  };
}

export default async function LegacyMarketingServicePage({ params }: { params: any }) {
  const { slug } = (await params) as Params;
  const destination = redirects[slug];

  if (!destination) {
    notFound();
  }

  permanentRedirect(destination);
}
