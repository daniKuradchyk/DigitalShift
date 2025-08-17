import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { AREAS, getArea } from "@/lib/locations";
import { breadcrumbJsonLd, localBusinessJsonLd } from "@/lib/jsonld";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

export function generateStaticParams() { return AREAS.map((a) => ({ city: a.slug })); }

export function generateMetadata({ params }: { params: { city: string } }): Metadata {
  const area = getArea(params.city);
  const cityName = area?.name ?? params.city;
  const title = `Agencia de digitalización en ${cityName}`;
  const description = `Diseño web, landing pages y marketing digital en ${cityName}. Estrategia, copy y SEO para captar clientes.`;
  const path = `/area/${params.city}`;
  return { title: titleTemplate(title), description, alternates: { canonical: canonical(path) }, openGraph: { title, description, url: path, images: openGraphImage() } };
}

export default function AreaPage({ params }: { params: { city: string } }) {
  const area = getArea(params.city);
  const cityName = area?.name ?? params.city;

  const crumbs = breadcrumbJsonLd([
    { name: "Inicio", url: canonical("/") },
    { name: "Áreas", url: canonical("/area") },
    { name: cityName, url: canonical(`/area/${params.city}`) },
  ]);

  const local = localBusinessJsonLd({
    name: "DigitalShift",
    url: canonical(`/area/${params.city}`),
    logoUrl: "/favicon.ico",
    telephone: "TODO:+34-XXX-XXX-XXX",
    address: {
      streetAddress: "TODO: Dirección",
      addressLocality: cityName,
      postalCode: "TODO: CP",
      addressRegion: params.city === "sevilla" ? "Sevilla" : "",
      addressCountry: "ES",
    },
    sameAs: [],
  });

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Agencia de digitalización en {cityName}</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">Creamos webs y campañas que convierten visitas en clientes. Trabajamos con PYMES y emprendedores en {cityName} y toda España.</p>
        <ul className="mt-6 list-disc pl-5 text-slate-700 max-w-3xl">
          <li>Diseño web y landing pages con foco en conversión</li>
          <li>SEO on-page, medición (GA4/GSC) y rendimiento</li>
          <li>Proceso por hitos, precio cerrado y transparencia</li>
        </ul>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(local) }} />
    </main>
  );
}
