import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { BASE_URL, canonical, titleTemplate } from "@/lib/seo";
import { estimateReadingTime, getPost, getRelatedPosts, posts } from "@/lib/posts";

type Params = { slug: string };

export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = canonical(`/blog/${post.slug}`);
  return {
    title: titleTemplate(post.title),
    description: post.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      authors: [post.author.name],
      tags: post.tags,
      publishedTime: new Date(post.date).toISOString(),
      images: [{ url: canonical("/images/og-cover.png"), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [canonical("/images/og-cover.png")],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const published = new Date(post.date);
  const readingTime = estimateReadingTime(post);
  const related = getRelatedPosts(post.slug, 3);
  const canonicalUrl = canonical(`/blog/${post.slug}`);
  const imageUrl = `${BASE_URL}/images/og-cover.png`;

  const landingLinkSlugs = new Set(["seo-onpage-negocios-locales", "presupuesto-diseno-web-sevilla", "presupuesto-software-medida-2026"]);
  const shouldLinkLanding = landingLinkSlugs.has(post.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: { "@type": "Person", name: "Daniil Kuradchik Pekarskaya" },
    datePublished: published.toISOString(),
    dateModified: published.toISOString(),
    publisher: { "@type": "Organization", name: "Qubelia", url: BASE_URL },
    image: [imageUrl],
    inLanguage: "es",
    keywords: post.tags.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: canonical("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: canonical("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
    ],
  };

  const serviceCta: Record<string, { href: string; label: string }> = {
    "presupuesto-diseno-web-sevilla": { href: "/servicios/diseno-web-sevilla", label: "Diseño web en Sevilla" },
    "checklist-landing-conversion": { href: "/servicios/mvp-emprendedores", label: "MVP para emprendedores" },
    "seo-onpage-negocios-locales": { href: "/servicios/diseno-web-sevilla", label: "Diseño web en Sevilla" },
    "go-to-market-saas-90-dias": { href: "/servicios/mvp-emprendedores", label: "MVP para emprendedores" },
    "brief-tecnico-proyecto-digital": { href: "/servicios/software-medida", label: "Software a medida" },
    "kpis-producto-b2b": { href: "/servicios/software-medida", label: "Software a medida" },
    "migrar-wordpress-a-nextjs": { href: "/servicios/diseno-web-sevilla", label: "Migración y diseño web" },
    "automatizacion-comercial-b2b": { href: "/servicios/ia-automatizacion", label: "Automatización con IA" },
    "ia-agentes-pymes-2026": { href: "/servicios/ia-automatizacion", label: "IA y automatización" },
    "arquitectura-nextjs-seo-2026": { href: "/servicios/diseno-web-sevilla", label: "Diseño web técnico" },
    "presupuesto-software-medida-2026": { href: "/servicios/software-medida", label: "Software a medida" },
    "integraciones-erp-crm-pymes": { href: "/servicios/software-medida", label: "Software a medida" },
  };
  const mainService = serviceCta[post.slug] ?? { href: "/servicios/software-medida", label: "Servicios de Qubelia" };

  const sectionId = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14] pb-20">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full blur-[120px] opacity-[0.05] dark:opacity-[0.10]"
          style={{ background: "conic-gradient(from 160deg, #38bdf8, #818cf8, #38bdf8)" }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-white/[0.06] bg-white/95 dark:bg-[#050A14]/95 backdrop-blur-xl">
        <Container>
          <div className="flex h-14 items-center justify-between">
            <Link href="/" aria-label="Inicio"><Logo /></Link>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Blog
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <div className="border-b border-slate-200/60 dark:border-white/[0.06]">
        <Container className="py-12 sm:py-16">
          <div className="max-w-3xl">
            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              {post.h1}
            </h1>

            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-2xl">
              {post.intro}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 dark:text-slate-500">
              <time dateTime={post.date}>
                {published.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </time>
              <span aria-hidden className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{readingTime} min de lectura</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{post.author.name}</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Body */}
      <Container className="mt-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px] items-start">

          {/* Main content */}
          <article>
            {/* TOC */}
            <nav aria-label="Tabla de contenidos" className="mb-10 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50/60 dark:bg-white/[0.02] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500 mb-4">
                Contenidos
              </p>
              <ol className="space-y-2.5">
                {post.sections.map((section, idx) => (
                  <li key={section.title} className="flex items-start gap-3">
                    <span className="text-xs font-bold text-slate-300 dark:text-slate-700 tabular-nums flex-none pt-px">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={`#${sectionId(section.title)}`}
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors leading-snug"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Landing link banner */}
            {shouldLinkLanding && (
              <div className="mb-10 flex gap-3 rounded-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/[0.06] p-5">
                <span className="mt-0.5 flex-none text-sky-500">
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </span>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Consulta nuestra página de{" "}
                  <Link className="font-semibold text-sky-600 dark:text-sky-400 underline underline-offset-4 hover:text-sky-700" href="/sevilla/desarrollo-software-a-medida">
                    desarrollo de software a medida en Sevilla
                  </Link>
                  {" "}con proceso, precios orientativos y FAQs.
                </p>
              </div>
            )}

            {/* Sections */}
            <div className="space-y-12">
              {post.sections.map((section, idx) => (
                <section key={section.title} id={sectionId(section.title)} className="scroll-mt-24">
                  <div className="flex items-start gap-5 mb-5">
                    <span className="text-5xl font-black tabular-nums text-slate-100 dark:text-white/[0.05] leading-none select-none flex-none">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-2 leading-snug">{section.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {section.body.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3.5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 rounded-full bg-sky-400/60 flex-none" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* FAQs */}
            {post.faqs && (
              <section className="mt-14">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Preguntas frecuentes</h2>
                <div className="space-y-2">
                  {post.faqs.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] overflow-hidden open:border-sky-200/80 dark:open:border-sky-500/20 transition-colors"
                    >
                      <summary className="flex cursor-pointer select-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white list-none">
                        <span>{item.q}</span>
                        <span aria-hidden className="h-5 w-5 flex-none rounded-full border border-slate-200 dark:border-white/[0.1] flex items-center justify-center text-slate-400 dark:text-slate-500 group-open:rotate-45 group-open:border-sky-300 group-open:text-sky-500 transition-all duration-200 text-base leading-none">
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-5 pt-0">
                        <div className="h-px bg-slate-100 dark:bg-white/[0.05] mb-4" />
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <div className="mt-14 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400 mb-3">
                ¿Lo aplicamos juntos?
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-5">
                Preparamos un plan accionable para tu caso, enlazamos con el servicio adecuado y dejamos todo medible desde el día 1.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button as="a" href="/#contacto" variant="shine" size="sm">Agendar diagnóstico</Button>
                <Button as="a" href={mainService.href} variant="ghost" size="sm">
                  {mainService.label} →
                </Button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            {/* Quick summary */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-4">En este artículo</p>
              <ol className="space-y-3">
                {post.sections.map((section, idx) => (
                  <li key={section.title} className="flex items-start gap-2.5">
                    <span className="text-[10px] font-bold tabular-nums text-sky-500 dark:text-sky-400 flex-none pt-px">{String(idx + 1).padStart(2, "0")}</span>
                    <a href={`#${sectionId(section.title)}`} className="text-xs text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors leading-snug">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Meta */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-4">Ficha</p>
              <dl className="space-y-2.5">
                {[
                  { label: "Autor", value: post.author.name },
                  { label: "Publicado", value: published.toLocaleDateString("es-ES") },
                  { label: "Lectura", value: `${readingTime} min` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-baseline justify-between gap-2 text-sm">
                    <dt className="text-slate-400 dark:text-slate-500">{label}</dt>
                    <dd className="font-medium text-slate-900 dark:text-white text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* CTA card */}
            <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/[0.06] p-5">
              <div aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-400/10 blur-xl" />
              <p className="relative text-sm font-bold text-slate-900 dark:text-white mb-1.5">¿Necesitas ayuda ahora?</p>
              <p className="relative text-xs text-slate-500 dark:text-slate-400 mb-4">
                Auditoría express. Checklist priorizado en 72 h.
              </p>
              <Link
                href="/#contacto"
                className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 dark:text-sky-400 hover:gap-2.5 transition-all"
              >
                Solicitar auditoría <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500 mb-4">También te puede interesar</p>
                <ul className="space-y-4">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/blog/${item.slug}`} className="block group">
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          {item.tags.slice(0, 1).map((tag) => (
                            <span key={tag} className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">{tag}</span>
                          ))}
                        </div>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors leading-snug">
                          {item.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </Container>
    </main>
  );
}
