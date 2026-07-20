import type { Metadata } from "next";
import Link from "next/link";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { AREAS } from "@/lib/locations";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dónde trabajamos: software a medida en España | Qubelia",
  description:
    "Software a medida, desarrollo web y automatización de procesos para empresas de Sevilla, Madrid, Barcelona, Valencia, Málaga y toda España. Presencial y remoto.",
  path: "/area",
});

export default function AreasIndex() {
  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Dónde trabajamos" },
      ]}
      eyebrow="Cobertura"
      title="Dónde trabajamos"
      description="Qubelia trabaja desde Sevilla para empresas de toda España: presencial en Andalucía y remoto —con visitas cuando el proyecto lo pide— en el resto del país. Cada página local aterriza el contexto sectorial de la zona."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Enfoque</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Diagnóstico remoto o presencial según el proyecto.</p>
            <p>Arquitectura y desarrollo centralizados en la misma base técnica.</p>
            <p>Una sola forma de trabajar, con contexto local donde aporta.</p>
          </div>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => (
          <Link key={area.slug} href={`/area/${area.slug}`} className="surface-card rounded-3xl p-6 transition-all hover:-translate-y-0.5 hover:border-sky-300/60">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">
              {area.mode === "presencial y remoto" ? "Presencial y remoto" : "Remoto + visitas"}
            </p>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900 dark:text-white">{area.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {area.sectors.slice(0, 3).join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </StaticPageFrame>
  );
}
