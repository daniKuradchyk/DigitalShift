/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { buildMetadata, canonical, titleTemplate } from "@/lib/seo";
import { searchSite } from "@/lib/search";

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
          "Busca entre servicios de software a medida, artículos del blog, herramientas gratuitas y recursos sobre automatización, CRM e integraciones para empresas B2B.",
        path: "/buscar",
      }),
      robots: { index: false, follow: true },
    };
  }

  return {
    title: titleTemplate(`Buscar: ${q}`),
    description: `Resultados de búsqueda para "${q}" en servicios, blog y herramientas de Qubelia.`,
    alternates: { canonical: canonical("/buscar") },
    robots: { index: false, follow: false },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: any }) {
  const sp = (await searchParams) as SearchParams | undefined;
  const q = getQuery(sp ?? {}, "q").trim();
  const results = q ? searchSite(q) : [];

  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Buscar" },
      ]}
      eyebrow="Búsqueda"
      title={q ? `Resultados para "${q}"` : "Buscar en Qubelia"}
      description="Búsqueda sobre servicios, artículos del blog, herramientas gratuitas y zonas de trabajo."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Sugerencias</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {["software a medida", "integraciones ERP", "ROI automatización", "CRM"].map((term) => (
              <Link
                key={term}
                href={`/buscar?q=${encodeURIComponent(term)}`}
                className="block text-sky-400 transition-colors hover:text-sky-300"
              >
                {term}
              </Link>
            ))}
          </div>
        </>
      }
    >
      <div className="space-y-8">
        <form action="/buscar" method="get" className="surface-card rounded-3xl p-6">
          <label htmlFor="q" className="block text-sm font-medium text-slate-900 dark:text-white">
            Término de búsqueda
          </label>
          <div className="mt-4 flex gap-3">
            <input
              id="q"
              name="q"
              type="text"
              defaultValue={q}
              placeholder="Ej. software a medida, integraciones ERP, ROI automatización"
              className="w-full rounded-xl px-4 py-3"
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
              Introduce un término para buscar en los servicios, el blog, las herramientas gratuitas y las
              zonas donde trabajamos. La búsqueda ignora mayúsculas y tildes.
            </p>
          </div>
        ) : null}

        {q && results.length === 0 ? (
          <div className="surface-card rounded-3xl p-6">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              No hay resultados para <strong className="text-slate-900 dark:text-white">{q}</strong>. Prueba
              con otro término o navega por los{" "}
              <Link href="/servicios" className="font-semibold text-sky-400 hover:text-sky-300">
                servicios
              </Link>{" "}
              o el{" "}
              <Link href="/blog" className="font-semibold text-sky-400 hover:text-sky-300">
                blog
              </Link>
              .
            </p>
          </div>
        ) : null}

        {results.length > 0 ? (
          <ul className="grid gap-4">
            {results.map((result) => (
              <li key={result.href} className="surface-card rounded-3xl p-6">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-sky-400">{result.type}</p>
                <Link
                  href={result.href}
                  className="text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-sky-400 dark:text-white"
                >
                  {result.title}
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{result.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </StaticPageFrame>
  );
}
