/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { AREAS } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

type Params = { city: string };

const cardClass = "surface-card rounded-3xl p-6";

export function generateStaticParams(): Params[] {
  return AREAS.map((area) => ({ city: area.slug }));
}

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { city } = (await params) as Params;
  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return buildMetadata({
    title: `Software a medida en ${cityName} | Desarrollo web y automatizacion para empresas`,
    description: `Qubelia desarrolla software a medida, web y automatizacion de procesos para empresas B2B en ${cityName}. Diagnostico gratuito y propuesta en 48h.`,
    path: `/area/${city}`,
  });
}

export default async function CityPage({ params }: { params: any }) {
  const { city } = (await params) as Params;
  if (!AREAS.some((area) => area.slug === city)) {
    notFound();
  }

  const cityName = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Areas", href: "/area" },
        { label: cityName },
      ]}
      eyebrow="Area local"
      title={`Software, web e integraciones en ${cityName}`}
      description={`Qubelia trabaja con empresas de ${cityName} que necesitan ordenar operativa, construir sistemas utiles o mejorar su base digital sin separar negocio y criterio tecnico.`}
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Contacto local</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>{CONTACT.phone}</p>
            <p>{CONTACT.email}</p>
            <p>Sevilla, Espana</p>
          </div>
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Donde solemos aportar mas valor</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Herramientas internas y software a medida para procesos propios.</li>
            <li>Automatizacion e integraciones entre CRM, ERP, formularios y reporting.</li>
            <li>Web corporativa o comercial cuando la captacion y el posicionamiento importan de verdad.</li>
            <li>CRM, intranet o extranet cuando el sistema estandar ya no refleja la operativa.</li>
          </ul>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <article className={cardClass}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Trabajo local, base comun</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              El enfoque local no crea una capa comercial distinta. Sirve para aterrizar la conversacion a la realidad geografica del proyecto mientras la arquitectura, el proceso y el desarrollo siguen una base comun y mantenible.
            </p>
          </article>

          <article className={cardClass}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Siguiente paso razonable</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Si el proyecto tiene sentido, la siguiente conversacion deberia cerrar encaje, alcance inicial y prioridad. No una propuesta generica.
            </p>
          </article>
        </section>
      </div>
    </StaticPageFrame>
  );
}
