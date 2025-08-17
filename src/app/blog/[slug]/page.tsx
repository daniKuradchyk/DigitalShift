import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

type Params = { city: string };

// Lista de ciudades soportadas
const SUPPORTED_CITIES = ["sevilla"];

export function generateStaticParams(): Params[] {
  return SUPPORTED_CITIES.map((city) => ({ city }));
}

// revalidate debe ser literal numérico (no expresiones tipo 60*60*24)
export const revalidate = 86400; // 24h

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { city } = await params;
  const cityLc = city.toLowerCase();
  const cityName = cityLc.charAt(0).toUpperCase() + cityLc.slice(1);
  const path = `/area/${cityLc}`;

  return {
    title: titleTemplate(`Agencia de digitalización en ${cityName}`),
    description:
      `Diseño web, landing pages y marketing digital en ${cityName}. Estrategia, copy y SEO on-page para captar clientes.`,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title: `Agencia en ${cityName}`,
      description: `Soluciones de digitalización en ${cityName}`,
      url: path,
    },
  };
}

export default async function CityPage(
  { params }: { params: Promise<Params> }
) {
  const { city } = await params;
  const cityLc = city.toLowerCase();
  if (!SUPPORTED_CITIES.includes(cityLc)) {
    notFound();
  }

  const cityName = cityLc.charAt(0).toUpperCase() + cityLc.slice(1);

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Agencia de digitalización en {cityName}
        </h1>
        <p className="mt-2 text-slate-700">
          Diseño web, landing pages y marketing digital en {cityName}. Proceso por hitos, SEO on-page y medición real.
        </p>

        {/* TODO: Añade NAP real + mapa + casos locales + LocalBusiness JSON-LD */}
      </Container>
    </main>
  );
}
