import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import Button from "@/components/common/Button";
import JsonLd from "@/components/marketing/JsonLd";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { getPostsWithReadingTime } from "@/lib/posts";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Blog de Qubelia | Guías de automatización, software a medida y ERP/CRM",
  description:
    "Automatización, integraciones ERP/CRM y software a medida para empresas B2B. Guías prácticas, casos reales y estrategias sin humo.",
  path: "/blog",
});

function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogIndex() {
  const posts = getPostsWithReadingTime();
  const [featured, ...rest] = posts;
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const blogBreadcrumb = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Blog", url: absoluteUrl("/blog") },
  ]);

  return (
    <>
      <JsonLd id="ld-blog-breadcrumbs" data={blogBreadcrumb} />
      <Header />
      <main>
        {/* Editorial hero */}
        <div className="relative border-b border-slate-200/60 dark:border-white/[0.06]">
          <Container className="py-16 sm:py-24">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]} />
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  {posts.length} artículos · {fmtDate(posts[0]?.date ?? "")}
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.04] mb-6">
                <span className="text-slate-900 dark:text-white">Blog de software</span>
                <br />
                <span className="text-slate-300 dark:text-white/20">y automatización B2B</span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mb-10">
                Guías sobre desarrollo a medida, digitalización, CRM, integraciones ERP y automatización de procesos para empresas en España.
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <span key={tag} className="rounded-full border border-slate-200 dark:border-white/[0.08] bg-transparent px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-14 sm:py-20 space-y-14">

          {/* Featured */}
          {featured && (
            <section className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500 mb-5 pl-1">
                — Destacado
              </p>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <article className="surface-card relative grid lg:grid-cols-[1fr_260px] overflow-hidden rounded-3xl transition-all duration-300 hover:border-sky-300/60 dark:hover:border-sky-500/25 hover:shadow-[0_24px_64px_-24px_rgba(14,165,233,0.13)]">
                  <div aria-hidden className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(56,189,248,0.6) 50%, transparent 95%)" }} />

                  <div className="p-8 sm:p-12 flex flex-col">
                    <div className="flex flex-wrap gap-2.5 mb-6">
                      {featured.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug mb-4 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors duration-200">
                      {featured.title}
                    </h2>
                    <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 flex-1">
                      {featured.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-6">
                      <span className="text-sm text-slate-400 dark:text-slate-500">{fmtDate(featured.date)}</span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 group-hover:gap-3 transition-all duration-200">
                        Leer artículo completo <span aria-hidden>→</span>
                      </span>
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-col items-center justify-center gap-3 border-l border-slate-200/60 dark:border-white/[0.06] bg-slate-50/60 dark:bg-white/[0.01] p-10 relative overflow-hidden">
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_70%)]" />
                    <span className="relative text-8xl font-black tabular-nums text-slate-900/[0.05] dark:text-white/[0.05] select-none leading-none">
                      {featured.readingTime}
                    </span>
                    <div className="relative text-center">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">min lectura</p>
                    </div>
                    <div className="relative w-10 h-px bg-slate-200 dark:bg-white/10" />
                    <p className="relative text-xs text-slate-400 dark:text-slate-500">{featured.author.name}</p>
                  </div>
                </article>
              </Link>
            </section>
          )}

          {/* Posts grid */}
          {rest.length > 0 && (
            <section className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500 mb-5 pl-1">
                — Todos los artículos
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group block h-full">
                    <article className="surface-card relative overflow-hidden h-full flex flex-col rounded-2xl p-6 hover:border-sky-300/60 dark:hover:border-sky-500/20 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-16px_rgba(14,165,233,0.1)] transition-all duration-200">
                      <div className="flex items-start justify-between gap-2 mb-4">
                        <div className="flex flex-wrap gap-2">
                          {p.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs font-black tabular-nums text-slate-300 dark:text-white/[0.06] select-none flex-none">
                          {String(i + 2).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="text-[15px] font-semibold text-slate-900 dark:text-white leading-snug mb-3 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors flex-1">
                        {p.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-5">
                        {p.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
                        <span>{new Date(p.date).toLocaleDateString("es-ES")}</span>
                        <span className="font-medium">{p.readingTime} min</span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Bottom CTA */}
          <div className="surface-card relative overflow-hidden rounded-2xl p-8 sm:p-10">
            <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-[0.06] dark:opacity-[0.08]" style={{ background: "rgba(56,189,248,1)" }} />
            <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400 mb-3">Próximo paso</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Lo aplicamos a tu caso en 45 min
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Revisamos, priorizamos y dejamos un checklist medible. Sin compromiso inicial.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button as="a" href="/#contacto" variant="shine">Agendar diagnóstico</Button>
                <Button as="a" href="/servicios" variant="ghost">Ver servicios</Button>
              </div>
            </div>
          </div>

        </Container>
      </main>
      <Footer />
    </>
  );
}
