/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import SpainMap from "@/components/marketing/SpainMap";
import { CONTACT } from "@/config/contact";
import { AREAS, getArea } from "@/lib/locations";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, BASE_URL } from "@/lib/seo";
import { getServices } from "@/content/services";

type Params = { city: string };

const cardClass = "rounded-[4px] border border-[#E4E6EA] bg-white p-6 sm:p-8";

export function generateStaticParams(): Params[] {
  return AREAS.map((area) => ({ city: area.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { city } = (await params) as Params;
  const area = getArea(city);
  if (!area) return {};

  return buildMetadata({
    title: `Software a medida en ${area.name} | Qubelia`,
    description: `Desarrollo de software a medida, web y automatización para empresas de ${area.name} y provincia. Trabajo ${area.mode}. Diagnóstico gratuito.`,
    path: `/area/${city}`,
  });
}

export default async function CityPage({ params }: { params: any }) {
  const { city } = (await params) as Params;
  const area = getArea(city);
  if (!area) {
    notFound();
  }

  const services = getServices();

  return (
    <>
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Dónde trabajamos", href: "/area" },
        { label: area.name },
      ]}
      eyebrow={`Empresas de ${area.name}`}
      title={`Software a medida y automatización en ${area.name}`}
      description={area.intro}
      aside={
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Contacto</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#3D4046]">
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.email}</p>
            <p>Base en Sevilla · Trabajo {area.mode}</p>
          </div>
          <SpainMap activeSlug={city} className="mt-6 w-full" />
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">
            Situaciones que nos encontramos en {area.name}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3D4046]">
            {area.scenarios.map((scenario) => (
              <li key={scenario}>{scenario}</li>
            ))}
          </ul>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className={cardClass}>
            <h2 className="text-xl font-semibold tracking-tight text-[#101014]">
              Sectores con peso en la zona
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {area.sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-[2px] border border-[#E4E6EA] bg-[#F5F6F8] px-3 py-1 text-xs font-medium text-[#3D4046]"
                >
                  {sector}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-[#3D4046]">
              No hace falta que tu sector esté en la lista: lo que determina el encaje es que haya un
              proceso operativo concreto que hoy genera fricción, no la etiqueta sectorial.
            </p>
          </article>

          <article className={cardClass}>
            <h2 className="text-xl font-semibold tracking-tight text-[#101014]">Qué podemos construir</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
                  >
                    {service.shortTitle}
                  </Link>
                  <span className="text-[#3D4046]"> — {service.intent}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">Siguiente paso razonable</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Un diagnóstico gratuito de 30 minutos para aterrizar el problema, el alcance y si merece la
            pena construir algo a medida — o si un SaaS bien configurado os resuelve. Si es lo segundo,
            también lo diremos.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-[2px] bg-[#101014] px-6 py-3 text-sm font-medium tracking-tight text-white transition-colors duration-150 hover:bg-brand-600"
            >
              Agendar diagnóstico
            </Link>
            <Link
              href="/casos"
              className="inline-flex items-center justify-center rounded-[2px] border border-[#C9CCD3] px-6 py-3 text-sm font-medium tracking-tight text-[#101014] transition-colors duration-150 hover:border-[#101014]"
            >
              Ver casos de éxito
            </Link>
          </div>
        </section>
      </div>
    </StaticPageFrame>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Inicio", url: BASE_URL },
            { name: "Dónde trabajamos", url: `${BASE_URL}/area` },
            { name: area.name, url: `${BASE_URL}/area/${city}` },
          ])
        ),
      }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          serviceJsonLd({
            name: `Software a medida en ${area.name}`,
            description: `Desarrollo de software a medida, web profesional y automatización de procesos para empresas de ${area.name} y provincia.`,
            areaName: area.name,
            url: `${BASE_URL}/area/${city}`,
          })
        ),
      }}
    />
    </>
  );
}
