import Container from "@/components/common/Container";
import { postsMeta } from "@/lib/posts";

export default function Buscar({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q ?? "").toLowerCase().trim();
  const results = q
    ? postsMeta.filter((p) =>
        [p.title, p.description, p.h1, ...p.tags].some((v) => v.toLowerCase().includes(q))
      )
    : [];

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Buscar</h1>
        <form className="mt-4 max-w-xl" action="/buscar" method="get" role="search" aria-label="Buscar en DigitalShift">
          <label htmlFor="q" className="sr-only">Término de búsqueda</label>
          <div className="flex gap-2">
            <input id="q" name="q" defaultValue={q} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Busca servicios o guías (p. ej. 'Sevilla')" />
            <button className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm">Buscar</button>
          </div>
        </form>

        {q && (
          <div className="mt-8">
            <p className="text-slate-700">Resultados para: <strong>“{q}”</strong> ({results.length})</p>
            <ul className="mt-4 space-y-3">
              {results.map((r) => (
                <li key={r.slug} className="rounded-xl border border-slate-200 p-4">
                  <a className="font-semibold underline hover:no-underline" href={`/blog/${r.slug}`}>{r.title}</a>
                  <p className="text-slate-700">{r.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </main>
  );
}