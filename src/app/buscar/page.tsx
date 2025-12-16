/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

function getQuery(sp: SearchParams, key: string) {
  const raw = sp?.[key];
  return Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
}

export async function generateMetadata(
  { searchParams }: { searchParams: any }
): Promise<Metadata> {
  const sp = (await searchParams) as SearchParams | undefined;
  const q = getQuery(sp ?? {}, "q").trim();
  const title = q ? titleTemplate(`Buscar: ${q}`) : titleTemplate("Buscar");
  const path = q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar";
  const descBase = "Busca en contenidos, servicios y productos de Qubelia.";
  return {
    title,
    description: q ? `Resultados de búsqueda para “${q}” en Qubelia.` : descBase,
    alternates: { canonical: canonical(path) },
    robots: { index: false, follow: false },
    openGraph: { title, description: q ? `Resultados para “${q}”.` : descBase, url: path },
  };
}

export default async function SearchPage(
  { searchParams }: { searchParams: any }
) {
  const sp = (await searchParams) as SearchParams | undefined;
  const q = getQuery(sp ?? {}, "q").trim();

  // TODO: Reemplaza por tu búsqueda real (CMS/algolia/db)
  const results: Array<{ title: string; href: string; excerpt: string }> = [];

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Buscar</h1>
        <form action="/buscar" method="get" className="mt-4 max-w-xl">
          <label htmlFor="q" className="sr-only">Término de búsqueda</label>
          <div className="flex gap-2">
            <input
              id="q"
              name="q"
              defaultValue={q}
              placeholder="Ej. transformación digital, MVP, integraciones…"
              className="w-full rounded-xl border border-brand-200 px-3 py-2"
              autoComplete="off"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-white bg-[linear-gradient(115deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] hover:bg-[position:100%_0] border border-brand-900/60 shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all">
              Buscar
            </button>
          </div>
        </form>

        <section className="mt-8">
          {!q && <p className="text-slate-700">Escribe algo para empezar.</p>}
          {q && results.length === 0 && (
            <p className="text-slate-700">
              No hay resultados para “<strong>{q}</strong>”. Prueba con otro término.
            </p>
          )}
          {results.length > 0 && (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r.href} className="rounded-2xl border border-brand-100 p-4 shadow-card">
                  <a href={r.href} className="font-semibold hover:underline">{r.title}</a>
                  <p className="text-slate-700">{r.excerpt}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </Container>
    </main>
  );
}
