import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { getPostsWithReadingTime } from "@/lib/posts";
import { titleTemplate, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Blog de Qubelia"),
  description: "Transformacion digital, desarrollo a medida, MVPs, IA y automatizacion. Guias practicas sin humo.",
  alternates: { canonical: canonical("/blog") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate("Blog de Qubelia"),
    description: "Transformacion digital, desarrollo a medida, MVPs, IA y automatizacion. Guias practicas sin humo.",
    url: canonical("/blog"),
    siteName: "Qubelia",
    images: [{ url: canonical("/images/og-cover.png"), width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate("Blog de Qubelia"),
    description: "Transformacion digital, desarrollo a medida, MVPs, IA y automatizacion. Guias practicas sin humo.",
    images: [canonical("/images/og-cover.png")],
  },
};

export default function BlogIndex() {
  const posts = getPostsWithReadingTime();
  const [featured, ...rest] = posts;
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).slice(0, 8);

  return (
    <main className="pb-16">
      <div className="relative border-b overflow-hidden" style={{ background: "var(--color-bg-hero)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-6 h-44 w-44 rounded-full bg-brand-300/25 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
        </div>
        <Container className="py-12 sm:py-16 space-y-6 text-[color:var(--color-text)]">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <div className="h-10 w-auto">
                <Logo />
              </div>
              <span className="text-sm font-semibold text-[color:var(--color-text-muted)]">Volver a inicio</span>
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-[var(--color-bg-card)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] hover:-translate-y-0.5 hover:shadow-card transition"
              href="/#contacto"
            >
              Contactar
            </Link>
          </div>

          <div className="max-w-4xl space-y-5 relative text-[color:var(--color-text)]">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-700">Blog · Estrategia y delivery digital</p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[color:var(--color-text)]">Playbooks, checklists y guias sin humo para lanzar y escalar producto</h1>
            <p className="text-lg text-[color:var(--color-text-muted)]">
              Go-to-market, CRO, SEO tecnico, migraciones y operaciones comerciales. Contenidos accionables para founders, marketing y equipos de producto.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-[color:var(--color-text-muted)]">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-brand-100 shadow-card">
                • Checklists listas para ejecutar
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-brand-100 shadow-card">
                • Metricas y benchmarks claros
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-brand-100 shadow-card">
                • Enfoque tecnico + negocio
              </span>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs text-brand-700">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-white px-3 py-1 border border-brand-100 shadow-card">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container className="mt-10 space-y-10">
        {featured && (
          <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr] items-stretch">
            <article className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-[var(--shadow-strong)] p-8 flex flex-col justify-between">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/40 via-transparent to-brand-100/30 pointer-events-none" aria-hidden />
              <div className="relative space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-700">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-50 px-2 py-1 border border-brand-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 leading-snug">
                  <Link className="hover:underline" href={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-[color:var(--color-text-muted)] text-base">{featured.description}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-text-muted)]">
                  <span>{new Date(featured.date).toLocaleDateString("es-ES")}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readingTime} min de lectura</span>
                  <span aria-hidden>·</span>
                  <span>{featured.author.name}</span>
                </div>
              </div>
              <div className="relative mt-6 flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] transition"
                  href={`/blog/${featured.slug}`}
                >
                  Leer articulo completo
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] hover:-translate-y-0.5 hover:shadow-card transition"
                  href="/#contacto"
                >
                  Aplicarlo en mi negocio
                </Link>
              </div>
            </article>

            <div className="grid gap-4">
              {rest.slice(0, 2).map((p) => (
                <article
                  key={p.slug}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-[var(--shadow-soft)] hover:-translate-y-1 transition flex flex-col gap-3"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-brand-700">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-50 px-2 py-1 border border-brand-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                    <Link className="hover:underline" href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[color:var(--color-text-muted)]">{p.description}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[color:var(--color-text-muted)]">
                    <span>{new Date(p.date).toLocaleDateString("es-ES")}</span>
                    <span aria-hidden>·</span>
                    <span>{p.readingTime} min</span>
                    <span aria-hidden>·</span>
                    <span>{p.author.name}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(2).map((p) => (
            <article
              key={p.slug}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 shadow-[var(--shadow-soft)] flex flex-col justify-between hover:-translate-y-1 transition"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-brand-700">
                  {p.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-50 px-2 py-1 border border-brand-100">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-semibold leading-snug text-slate-900">
                  <Link className="hover:underline" href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[color:var(--color-text-muted)] text-sm">{p.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--color-text-muted)]">
                <span>{new Date(p.date).toLocaleDateString("es-ES")}</span>
                <span className="flex items-center gap-1 font-semibold text-brand-700">
                  {p.readingTime} min ·{" "}
                  <Link className="hover:text-brand-900" href={`/blog/${p.slug}`}>
                    Leer
                  </Link>
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-muted)] p-7 shadow-[var(--shadow-soft)]">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr] md:items-center">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-700">Accion inmediata</p>
              <h2 className="text-xl font-bold text-slate-900">Te acompanamos a aplicar el playbook en 45 minutos</h2>
              <p className="text-slate-700">
                Revisamos tu caso, priorizamos acciones y dejamos un checklist medible. Sin compromiso inicial.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                className="inline-flex items-center justify-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] transition"
                href="/#contacto"
              >
                Agenda diagnostico
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-800 hover:-translate-y-0.5 hover:shadow-card transition"
                href="/labs"
              >
                Ver herramientas
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
