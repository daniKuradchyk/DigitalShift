import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { getPostsWithReadingTime } from "@/lib/posts";
import { titleTemplate, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Blog de Qubelia"),
  description: "Transformación digital, desarrollo a medida, MVPs, IA y automatización. Guías prácticas sin humo.",
  alternates: { canonical: canonical("/blog") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate("Blog de Qubelia"),
    description: "Transformación digital, desarrollo a medida, MVPs, IA y automatización. Guías prácticas sin humo.",
    url: canonical("/blog"),
    siteName: "Qubelia",
    images: [{ url: canonical("/images/og-cover.png"), width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate("Blog de Qubelia"),
    description: "Transformación digital, desarrollo a medida, MVPs, IA y automatización. Guías prácticas sin humo.",
    images: [canonical("/images/og-cover.png")],
  },
};

export default function BlogIndex() {
  const posts = getPostsWithReadingTime();
  const [featured, ...rest] = posts;
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).slice(0, 8);

  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14]">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-15"
          style={{ background: "rgba(56,189,248,0.4)" }} />
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-15"
          style={{ background: "rgba(129,140,248,0.4)" }} />
      </div>

      {/* Inline header */}
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Ir a inicio" className="flex items-center gap-2">
              <Logo />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
              >
                ← Inicio
              </Link>
              <Button as="a" href="/#contacto" variant="shine" size="sm">
                Contactar
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <div className="relative border-b border-slate-200/60 dark:border-white/[0.06] overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.4) 50%, transparent 90%)" }} />
          <div className="absolute -left-10 top-6 h-48 w-48 rounded-full blur-3xl opacity-15 dark:opacity-20"
            style={{ background: "rgba(56,189,248,0.4)" }} />
          <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full blur-3xl opacity-10 dark:opacity-15"
            style={{ background: "rgba(129,140,248,0.4)" }} />
        </div>

        <Container className="py-12 sm:py-16">
          <div className="section-tag mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Blog · Estrategia y delivery digital
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white max-w-3xl mb-4">
            Playbooks, checklists y guías{" "}
            <span className="gradient-text-static">sin humo</span>
            {" "}para lanzar producto
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mb-7">
            Go-to-market, CRO, SEO técnico, migraciones y operaciones comerciales. Contenidos accionables para founders, marketing y equipos de producto.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["Checklists listos para ejecutar", "Métricas y benchmarks claros", "Enfoque técnico + negocio"].map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-3.5 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-3 py-1 text-xs font-semibold text-sky-600 dark:text-sky-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </div>

      <Container className="py-12 space-y-10">
        {/* Featured + 2 recent */}
        {featured && (
          <section className="grid gap-5 lg:grid-cols-[1.3fr_1fr] items-stretch">
            {/* Featured */}
            <article className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-8 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none">
              <div className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.6), rgba(129,140,248,0.4), transparent)" }} />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-2.5 py-0.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
                      {tag}
                    </span>
                  ))}
                  <span className="rounded-full border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/8 px-2.5 py-0.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    Destacado
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                  <Link className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors" href={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{featured.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span>{new Date(featured.date).toLocaleDateString("es-ES")}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readingTime} min de lectura</span>
                  <span aria-hidden>·</span>
                  <span>{featured.author.name}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button as="a" href={`/blog/${featured.slug}`} variant="shine" size="sm">
                  Leer artículo completo
                </Button>
                <Button as="a" href="/#contacto" variant="ghost" size="sm">
                  Aplicarlo en mi negocio
                </Button>
              </div>
            </article>

            {/* 2 recents */}
            <div className="grid gap-4">
              {rest.slice(0, 2).map((p) => (
                <article
                  key={p.slug}
                  className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-200 hover:shadow-md dark:hover:shadow-none"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-2 py-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    <Link className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors" href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">{p.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-auto">
                    <span>{new Date(p.date).toLocaleDateString("es-ES")} · {p.readingTime} min</span>
                    <Link className="font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300" href={`/blog/${p.slug}`}>
                      Leer →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Rest of posts grid */}
        {rest.slice(2).length > 0 && (
          <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.slice(2).map((p) => (
              <article
                key={p.slug}
                className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 hover:shadow-xl dark:hover:shadow-none group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-2 py-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    <Link className="hover:text-sky-600 dark:hover:text-sky-300 transition-colors" href={`/blog/${p.slug}`}>
                      {p.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{p.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                  <span>{new Date(p.date).toLocaleDateString("es-ES")}</span>
                  <span className="flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400">
                    {p.readingTime} min ·{" "}
                    <Link className="hover:text-sky-700 dark:hover:text-sky-300" href={`/blog/${p.slug}`}>
                      Leer
                    </Link>
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* CTA bottom */}
        <section className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-7">
          <div className="grid gap-5 md:grid-cols-[2fr_1fr] md:items-center">
            <div className="space-y-2">
              <div className="section-tag w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Acción inmediata
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Te acompañamos a aplicar el playbook en 45 minutos
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                Revisamos tu caso, priorizamos acciones y dejamos un checklist medible. Sin compromiso inicial.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Button as="a" href="/#contacto" variant="shine">
                Agenda diagnóstico
              </Button>
              <Button as="a" href="/labs" variant="ghost">
                Ver herramientas
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
