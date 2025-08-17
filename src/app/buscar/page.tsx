import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = Record<string, string | string[] | undefined>;

function getQuery(sp: SearchParams, key: string) {
  const raw = sp[key];
  return Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
}

export function generateMetadata(
  { searchParams }: { searchParams?: SearchParams }
): Metadata {
  const q = getQuery(searchParams ?? {}, "q").trim();
  const title = q ? titleTemplate(`Buscar: ${q}`) : titleTemplate("Buscar");
  const path = q ? `/buscar?q=${encodeURIComponent(q)}` : "/buscar";
  return {
    title,
    description: q ? `Resultados de búsqueda para “${q}” en DigitalShift.` : "Busca en contenidos y servicios de DigitalShift.",
    alternates: { canonical: canonical(path) },
    openGraph: { title, description: q ? `Resultados para “${q}”.` : "Buscar en DigitalShift.", url: path },
  };
}

export default function SearchPage(
  { searchParams }: { searchParams?: SearchParams }
) {
  const q = getQuery(searchParams ?? {}, "q").trim();
  const results: Array<{ title: string; href: string; excerpt: string }> = []; // TODO: poblar

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Buscar</h1>
        <form action="/buscar" method="get" className="mt-4 max-w-xl">
          <label htmlFor="q" className="sr-only">Término de búsqueda</label>
          <div className="flex gap-2">
            <input id="q" name="q" defaultValue={q} placeholder="Ej. landing pages, SEO, Sevilla…" className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-800">Buscar</button>
          </div>
        </form>

        <section className="mt-8">
          {!q && <p className="text-slate-700">Escribe algo para empezar.</p>}
          {q && results.length === 0 && (
            <p className="text-slate-700">No hay resultados para “<strong>{q}</strong>”. Prueba con otro término.</p>
          )}
          {results.length > 0 && (
            <ul className="space-y-4">
              {results.map((r) => (
                <li key={r.href} className="rounded-2xl border border-slate-200 p-4">
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
