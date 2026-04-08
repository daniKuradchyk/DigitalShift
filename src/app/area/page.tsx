import type { Metadata } from "next";
import Link from "next/link";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { AREAS } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Areas de servicio de Qubelia",
    description:
      "Cobertura geografica de Qubelia: software a medida, desarrollo web y automatizacion para empresas B2B en Sevilla, Madrid, Barcelona y toda Espana.",
    path: "/area",
  }),
  robots: { index: false, follow: true },
};

export default function AreasIndex() {
  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Areas" },
      ]}
      eyebrow="Cobertura"
      title="Areas de servicio"
      description="Qubelia trabaja desde Sevilla para proyectos en toda Espana. Estas paginas locales sirven para contextualizar el encaje geografico sin separar la propuesta principal de servicios."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Enfoque</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Diagnostico remoto o presencial segun el proyecto.</p>
            <p>Arquitectura y desarrollo centralizados en la misma base tecnica.</p>
            <p>Sin duplicar la capa comercial de servicios.</p>
          </div>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => (
          <Link key={area.slug} href={`/area/${area.slug}`} className="surface-card rounded-3xl p-6 transition-all hover:-translate-y-0.5 hover:border-sky-300/60">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Area local</p>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-white">{area.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Contexto local, contacto y aterrizaje operativo para empresas de {area.name}.
            </p>
          </Link>
        ))}
      </div>
    </StaticPageFrame>
  );
}
