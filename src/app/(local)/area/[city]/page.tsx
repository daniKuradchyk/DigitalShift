/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { AREAS, getArea } from "@/lib/locations";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/jsonld";
import { buildMetadata, BASE_URL } from "@/lib/seo";
import { getServices } from "@/content/services";

type Params = { city: string };

const cardClass = "surface-card rounded-3xl p-6";

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
    description: `Desarrollo de software a medida, web y automatización de procesos para empresas de ${area.name} y provincia. Trabajo ${area.mode}. Diagnóstico gratuito.`,
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
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Contacto</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.email}</p>
            <p>Base en Sevilla · Trabajo {area.mode}</p>
          </div>
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Situaciones que nos encontramos en {area.name}
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {area.scenarios.map((scenario) => (
              <li key={scenario}>{scenario}</li>
            ))}
          </ul>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className={cardClass}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sectores con peso en la zona
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {area.sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-full border border-sky-500/20 bg-sky-500/[0.06] px-3 py-1 text-xs font-medium text-sky-300"
                >
                  {sector}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              No hace falta que tu sector esté en la lista: lo que determina el encaje es que haya un
              proceso operativo concreto que hoy genera fricción, no la etiqueta sectorial.
            </p>
          </article>

          <article className={cardClass}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Qué podemos construir</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={service.href}
                    className="text-sky-400 transition-colors hover:text-sky-300"
                  >
                    {service.shortTitle}
                  </Link>
                  <span className="text-slate-600 dark:text-slate-300"> — {service.intent}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Siguiente paso razonable</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Un diagnóstico gratuito de 30 minutos para aterrizar el problema, el alcance y si merece la
            pena construir algo a medida — o si un SaaS bien configurado os resuelve. Si es lo segundo,
            también lo diremos.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Agendar diagnóstico
            </Link>
            <Link
              href="/casos"
              className="inline-flex items-center justify-center rounded-full border border-sky-500/25 px-5 py-2.5 text-sm font-semibold text-sky-300 transition-colors hover:bg-sky-500/10"
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
          })
        ),
      }}
    />
    </>
  );
}
