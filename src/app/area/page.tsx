import type { Metadata } from "next";
import Link from "next/link";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import SpainMap from "@/components/marketing/SpainMap";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { AREAS } from "@/lib/locations";
import { buildMetadata, canonical } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Dónde trabajamos: software a medida en España | Qubelia",
  description:
    "Software a medida, desarrollo web y automatización de procesos para empresas de Sevilla, Madrid, Barcelona y toda España. Presencial y remoto.",
  path: "/area",
});

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Dónde trabajamos", url: canonical("/area") },
]);

export default function AreasIndex() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Enfoque</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#3D4046]">
            <p>Diagnóstico remoto o presencial según el proyecto.</p>
            <p>Arquitectura y desarrollo centralizados en la misma base técnica.</p>
            <p>Una sola forma de trabajar, con contexto local donde aporta.</p>
          </div>
          <SpainMap className="mt-6 w-full" />
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area) => (
          <Link
            key={area.slug}
            href={`/area/${area.slug}`}
            className="rounded-[4px] border border-[#E4E6EA] bg-white p-6 transition-colors hover:border-[#101014]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#63666D]">
              {area.mode === "presencial y remoto" ? "Presencial y remoto" : "Remoto + visitas"}
            </p>
            <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#101014]">{area.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#63666D]">
              {area.sectors.slice(0, 3).join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </StaticPageFrame>
    </>
  );
}
