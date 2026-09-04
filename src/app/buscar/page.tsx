/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/common/Button";
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Sugerencias</p>
          <ul className="mt-4 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
            {["software a medida", "integraciones ERP", "ROI automatización", "CRM"].map((term) => (
              <li key={term}>
                <Link
                  href={`/buscar?q=${encodeURIComponent(term)}`}
                  className="block py-2.5 text-sm text-[#3D4046] transition-colors hover:text-brand-600"
                >
                  {term}
                </Link>
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div className="max-w-4xl">
        {/* ── Formulario ─────────────────────────────────────────── */}
        <form action="/buscar" method="get">
          <label htmlFor="q" className="block text-sm font-medium text-[#101014]">
            Término de búsqueda
          </label>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              id="q"
              name="q"
              type="text"
              defaultValue={q}
              placeholder="Ej. software a medida, integraciones ERP, ROI automatización"
              className="w-full px-4 py-3.5 text-base"
              autoComplete="off"
            />
            <Button type="submit" variant="primary" className="flex-none sm:w-auto">
              Buscar
            </Button>
          </div>
        </form>

        {/* ── Estados vacíos ─────────────────────────────────────── */}
        {!q ? (
          <p className="mt-10 border-t border-[#E4E6EA] pt-8 text-[15px] leading-relaxed text-[#3D4046]">
            Introduce un término para buscar en los servicios, el blog, las herramientas gratuitas y las
            zonas donde trabajamos. La búsqueda ignora mayúsculas y tildes.
          </p>
        ) : null}

        {q && results.length === 0 ? (
          <p className="mt-10 border-t border-[#E4E6EA] pt-8 text-[15px] leading-relaxed text-[#3D4046]">
            No hay resultados para <strong className="font-semibold text-[#101014]">{q}</strong>. Prueba
            con otro término o navega por los{" "}
            <Link
              href="/servicios"
              className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
            >
              servicios
            </Link>{" "}
            o el{" "}
            <Link
              href="/blog"
              className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
            >
              blog
            </Link>
            .
          </p>
        ) : null}

        {/* ── Resultados ─────────────────────────────────────────── */}
        {results.length > 0 ? (
          <ul className="mt-10 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
            {results.map((result) => (
              <li key={result.href} className="py-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  {result.type}
                </p>
                <Link
                  href={result.href}
                  className="mt-2 block text-lg font-semibold tracking-tight text-[#101014] transition-colors hover:text-brand-600"
                >
                  {result.title}
                </Link>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#3D4046]">{result.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </StaticPageFrame>
  );
}
