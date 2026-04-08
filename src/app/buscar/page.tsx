/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { buildMetadata, canonical, titleTemplate } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

function getQuery(sp: SearchParams, key: string) {
  const raw = sp?.[key];
  return Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
}

export async function generateMetadata({ searchParams }: { searchParams: any }): Promise<Metadata> {
  const sp = (await searchParams) as SearchParams | undefined;
  const q = getQuery(sp ?? {}, "q").trim();

  if (!q) {
    return {
      ...buildMetadata({
        title: "Buscar en Qubelia",
        description:
          "Busca entre servicios de software a medida, articulos del blog, herramientas gratuitas y recursos sobre automatizacion, CRM e integraciones para empresas B2B.",
        path: "/buscar",
      }),
      robots: { index: false, follow: true },
    };
  }

  return {
    title: titleTemplate(`Buscar: ${q}`),
    description: `Resultados de busqueda para "${q}" en servicios, blog y herramientas de Qubelia.`,
    alternates: { canonical: canonical("/buscar") },
    robots: { index: false, follow: false },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: any }) {
  const sp = (await searchParams) as SearchParams | undefined;
  const q = getQuery(sp ?? {}, "q").trim();
  const results: Array<{ title: string; href: string; excerpt: string }> = [];

  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Buscar" },
      ]}
      eyebrow="Busqueda"
      title={q ? `Resultados para "${q}"` : "Buscar en Qubelia"}
      description="Busqueda interna de contenidos, servicios y recursos. Esta capa esta preparada para enlazar una indexacion real cuando se conecte la fuente definitiva."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Estado</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Busqueda visible y navegable.</p>
            <p>Preparada para conectarse a CMS, base de datos o indice externo.</p>
          </div>
        </>
      }
    >
      <div className="space-y-8">
        <form action="/buscar" method="get" className="surface-card rounded-3xl p-6">
          <label htmlFor="q" className="block text-sm font-medium text-slate-900 dark:text-white">
            Termino de busqueda
          </label>
          <div className="mt-4 flex gap-3">
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Ej. software a medida, integraciones ERP, ROI automatizacion"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400"
              autoComplete="off"
            />
            <button className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700">
              Buscar
            </button>
          </div>
        </form>

        {!q ? (
          <div className="surface-card rounded-3xl p-6">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Introduce un termino para empezar. Cuando se conecte la fuente de datos real, esta pagina devolvera resultados enlazados a servicios, blog, labs y recursos utiles.
            </p>
          </div>
        ) : null}

        {q && results.length === 0 ? (
          <div className="surface-card rounded-3xl p-6">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              No hay resultados para <strong className="text-slate-900 dark:text-white">{q}</strong>. Prueba con otro termino o navega por la capa de servicios.
            </p>
          </div>
        ) : null}

        {results.length > 0 ? (
          <ul className="grid gap-4">
            {results.map((result) => (
              <li key={result.href} className="surface-card rounded-3xl p-6">
                <a href={result.href} className="text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-sky-600 dark:text-white">
                  {result.title}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{result.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </StaticPageFrame>
  );
}
