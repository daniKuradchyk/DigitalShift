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
  const takeaways = post.sections.slice(0, 3).map((s) => s.title);
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
    <main className="min-h-screen bg-white dark:bg-[#050A14] pb-14">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-80 w-80 rounded-full blur-3xl opacity-8 dark:opacity-12"
          style={{ background: "rgba(56,189,248,0.35)" }} />
        <div className="absolute -right-20 bottom-1/3 h-80 w-80 rounded-full blur-3xl opacity-8 dark:opacity-12"
          style={{ background: "rgba(129,140,248,0.35)" }} />
      </div>

      {/* Inline header */}
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Ir a inicio" className="flex items-center gap-2">
              <Logo />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Volver al blog
            </Link>
          </div>
        </Container>
      </header>

      {/* Post hero */}
      <div className="relative border-b border-slate-200/60 dark:border-white/[0.06] overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.35) 50%, transparent 90%)" }} />
          <div className="absolute -left-16 top-8 h-48 w-48 rounded-full blur-3xl opacity-15 dark:opacity-20"
            style={{ background: "rgba(56,189,248,0.4)" }} />
          <div className="absolute right-4 bottom-0 h-56 w-56 rounded-full blur-3xl opacity-10 dark:opacity-15"
            style={{ background: "rgba(129,140,248,0.4)" }} />
        </div>

        <Container className="py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[3fr_1.1fr] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-2.5 py-0.5 text-xs font-semibold text-sky-600 dark:text-sky-400">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {post.h1}
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">{post.intro}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 dark:text-slate-500">
                <span>{published.toLocaleDateString("es-ES")}</span>
                <span aria-hidden>·</span>
                <span>{readingTime} min de lectura</span>
                <span aria-hidden>·</span>
                <span>{post.author.name}</span>
              </div>
            </div>

            {/* Key takeaways card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">Puntos clave</p>
              <ul className="space-y-2">
                {takeaways.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/70 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                <span className="rounded-full border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400">
                  Revisión express en 72 h
                </span>
                <span className="rounded-full border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.03] px-2.5 py-1 text-xs text-slate-500 dark:text-slate-400">
                  Checklist accionable
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Article body */}
      <Container className="mt-10">
        <article className="grid gap-10 lg:grid-cols-[3fr_1fr] items-start">
          {/* Main content */}
          <div>
            {/* Table of contents */}
            <div className="mb-8 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">
                Tabla de contenidos
              </p>
              <ul className="space-y-2">
                {post.sections.map((section) => (
                  <li key={section.title} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-400/60 flex-shrink-0" />
                    <a
                      className="text-sm text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      href={`#${sectionId(section.title)}`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Landing link banner */}
            {shouldLinkLanding && (
              <div className="mb-8 rounded-2xl border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 p-5">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-300 mb-1">Recurso relacionado</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Consulta nuestra página de{" "}
                  <Link className="text-sky-600 dark:text-sky-400 underline underline-offset-4 hover:text-sky-700" href="/sevilla/desarrollo-software-a-medida">
                    desarrollo de software a medida en Sevilla
                  </Link>{" "}
                  con proceso, precios orientativos y FAQs.
                </p>
              </div>
            )}

            {/* Sections */}
            <div className="space-y-10">
              {post.sections.map((section, idx) => (
                <section key={section.title} id={sectionId(section.title)} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 text-xs font-bold text-sky-600 dark:text-sky-400 flex-shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">{section.title}</h2>
                  </div>
                  <ul className="space-y-2">
                    {section.body.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex gap-3 rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-3.5">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/70 flex-shrink-0" />
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {/* In-article FAQs */}
            {post.faqs && (
              <section className="mt-10">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {post.faqs.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-4 open:border-sky-200 dark:open:border-sky-500/20"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-slate-900 dark:text-white list-none">
                        <span>{item.q}</span>
                        <span className="text-sky-500 dark:text-sky-400 group-open:rotate-45 transition-transform duration-200 flex-shrink-0 text-lg leading-none">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom CTA */}
            <div className="mt-10 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-600 dark:text-sky-400 mb-2">
                ¿Lo aplicamos juntos?
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                Preparamos un plan accionable para tu caso, enlazamos con el servicio adecuado y dejamos todo medible desde el día 1.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button as="a" href="/#contacto" variant="shine" size="sm">
                  Agenda diagnóstico
                </Button>
                <Button as="a" href={mainService.href} variant="ghost" size="sm">
                  Ver servicio: {mainService.label}
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">Resumen rápido</p>
              <ul className="space-y-2">
                {post.sections.slice(0, 4).map((section) => (
                  <li key={section.title} className="flex gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/60 flex-shrink-0" />
                    <span>{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">Ficha</p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex justify-between gap-2">
                  <span className="text-slate-400 dark:text-slate-500">Autor</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{post.author.name}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-slate-400 dark:text-slate-500">Publicado</span>
                  <span className="text-slate-600 dark:text-slate-300">{published.toLocaleDateString("es-ES")}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span className="text-slate-400 dark:text-slate-500">Lectura</span>
                  <span className="text-slate-600 dark:text-slate-300">{readingTime} min</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-sky-200/80 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 p-5">
              <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">¿Necesitas ayuda ahora?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Hacemos auditoría express y entregamos un checklist priorizado en 72 h.
              </p>
              <Link
                className="inline-flex items-center text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                href="/#contacto"
              >
                Solicitar auditoría →
              </Link>
            </div>

            {related.length > 0 && (
              <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-[#070E22] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-3">
                  También te puede interesar
                </p>
                <ul className="space-y-4">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        className="block text-sm font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 mb-1 transition-colors"
                        href={`/blog/${item.slug}`}
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      </Container>
    </main>
  );
}
