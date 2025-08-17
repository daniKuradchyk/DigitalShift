import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

type Params = { city: string };

// Lista de ciudades soportadas (amplía cuando quieras)
const SUPPORTED_CITIES = ["sevilla"];

export function generateStaticParams(): Params[] {
  return SUPPORTED_CITIES.map((city) => ({ city }));
}

export function generateMetadata(
  { params }: { params: Params }
): Metadata {
  const city = params.city.toLowerCase();
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);
  const path = `/area/${city}`;
  return {
    title: titleTemplate(`Agencia de digitalización en ${cityName}`),
    description:
      `Diseño web, landing pages y marketing digital en ${cityName}. Estrategia, copy y SEO on-page para captar clientes.`,
    alternates: { canonical: canonical(path) },
    openGraph: { title: `Agencia en ${cityName}`, description: `Soluciones de digitalización en ${cityName}`, url: path },
  };
}

// Revalidación estática (literal numérico, no expresión)
export const revalidate = 86400; // 24h

export default function CityPage({ params }: { params: Params }) {
  const city = params.city.toLowerCase();
  if (!SUPPORTED_CITIES.includes(city)) return notFound();

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Agencia de digitalización en {cityName}
        </h1>
        <p className="mt-2 text-slate-700">
          Diseño web, landing pages y marketing digital en {cityName}. Proceso por hitos, SEO on-page y medición real.
        </p>

        {/* TODO: NAP real + mapa embebido + casos locales + LocalBusiness JSON-LD */}
      </Container>
    </main>
  );
}
