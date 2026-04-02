import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BASE_URL, canonical, openGraphImage, titleTemplate } from "@/lib/seo";
import { estimateReadingTime, getPost, getRelatedPosts, posts } from "@/lib/posts";

type Params = { slug: string };

export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
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
      images: openGraphImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: openGraphImage(),
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
  const imageUrl = `${BASE_URL}/opengraph-image`;

  const landingLinkSlugs = new Set([
    "seo-onpage-negocios-locales",
    "presupuesto-diseno-web-sevilla",
    "presupuesto-software-medida-2026",
  ]);
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
    "presupuesto-diseno-web-sevilla": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "checklist-landing-conversion": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "seo-onpage-negocios-locales": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "go-to-market-saas-90-dias": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "brief-tecnico-proyecto-digital": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "kpis-producto-b2b": { href: "/servicios/crm-intranet-a-medida", label: "CRM / intranet a medida" },
    "migrar-wordpress-a-nextjs": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "automatizacion-comercial-b2b": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "ia-agentes-pymes-2026": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "arquitectura-nextjs-seo-2026": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "presupuesto-software-medida-2026": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "integraciones-erp-crm-pymes": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
  };
  const mainService = serviceCta[post.slug] ?? { href: "/servicios", label: "Servicios de Qubelia" };

  const sectionId = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <>
      <Header />
      <main className="min-h-screen pb-20">
        <div className="border-b border-slate-200/60 dark:border-white/[0.06]">
          <Container className="py-12 sm:py-16">
            <div className="max-w-3xl">
              <div className="mb-6 flex flex-wrap gap-2.5">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 text-3xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                {post.h1}
              </h1>

              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">{post.intro}</p>

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

        <Container className="mt-12">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <article>
              <nav aria-label="Tabla de contenidos" className="relative overflow-hidden mb-10 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-6 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">
                  Contenidos
                </p>
                <ol className="space-y-2.5">
                  {post.sections.map((section, index) => (
                    <li key={section.title} className="flex items-start gap-3">
                      <span className="flex-none pt-px text-xs font-bold tabular-nums text-slate-300 dark:text-slate-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${sectionId(section.title)}`}
                        className="text-sm leading-snug text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {shouldLinkLanding ? (
                <div className="relative overflow-hidden mb-10 flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-500/20 dark:bg-sky-500/[0.06]">
                  <span className="mt-0.5 flex-none text-sky-500">
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Consulta nuestra página de{" "}
                    <Link className="font-semibold text-sky-600 underline underline-offset-4 hover:text-sky-700 dark:text-sky-400" href="/servicios/software-a-medida">
                      software a medida
                    </Link>{" "}
                    con proceso, encaje y diagnóstico.
                  </p>
                </div>
              ) : null}

              <div className="space-y-12">
                {post.sections.map((section, index) => (
                  <section key={section.title} id={sectionId(section.title)} className="scroll-mt-24">
                    <div className="mb-5 flex items-start gap-5">
                      <span className="flex-none select-none text-5xl font-black leading-none tabular-nums text-slate-100 dark:text-white/[0.05]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="pt-2 text-xl font-bold leading-snug text-slate-900 dark:text-white">{section.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {section.body.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex gap-3.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                          <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 flex-none rounded-full bg-sky-400/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              {post.faqs ? (
                <section className="mt-14">
                  <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">Preguntas frecuentes</h2>
                  <div className="space-y-2">
                    {post.faqs.map((item) => (
                      <details
                        key={item.q}
                        className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-colors open:border-sky-200/80 dark:border-white/[0.07] dark:bg-white/[0.02] dark:open:border-sky-500/20"
                      >
                        <summary className="flex list-none cursor-pointer select-none items-center justify-between gap-4 px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                          <span>{item.q}</span>
                          <span
                            aria-hidden
                            className="flex h-5 w-5 flex-none items-center justify-center rounded-full border border-slate-200 text-base leading-none text-slate-400 transition-all duration-200 group-open:rotate-45 group-open:border-sky-300 group-open:text-sky-500 dark:border-white/[0.1] dark:text-slate-500"
                          >
                            +
                          </span>
                        </summary>
                        <div className="px-6 pb-5 pt-0">
                          <div className="mb-4 h-px bg-slate-100 dark:bg-white/[0.05]" />
                          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="relative overflow-hidden mt-14 rounded-2xl border border-slate-200/80 bg-slate-50 p-7 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-sky-600 dark:text-sky-400">
                  ¿Lo aplicamos juntos?
                </p>
                <p className="mb-5 text-sm text-slate-600 dark:text-slate-300">
                  Preparamos un plan accionable para tu caso, enlazamos con el servicio adecuado y dejamos todo medible desde el día 1.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button as="a" href="/#contacto" variant="shine" size="sm">
                    Agendar diagnóstico
                  </Button>
                  <Button as="a" href={mainService.href} variant="ghost" size="sm">
                    {mainService.label} →
                  </Button>
                </div>
              </div>
            </article>

            <aside className="space-y-4 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  En este artículo
                </p>
                <ol className="space-y-3">
                  {post.sections.map((section, index) => (
                    <li key={section.title} className="flex items-start gap-2.5">
                      <span className="flex-none pt-px text-[10px] font-bold tabular-nums text-sky-500 dark:text-sky-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${sectionId(section.title)}`}
                        className="text-xs leading-snug text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-400"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/[0.07] dark:bg-white/[0.02]">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                  Ficha
                </p>
                <dl className="space-y-2.5">
                  {[
                    { label: "Autor", value: post.author.name },
                    { label: "Publicado", value: published.toLocaleDateString("es-ES") },
                    { label: "Lectura", value: `${readingTime} min` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-2 text-sm">
                      <dt className="text-slate-400 dark:text-slate-500">{label}</dt>
                      <dd className="text-right font-medium text-slate-900 dark:text-white">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-sky-200/80 bg-sky-50 p-5 dark:border-sky-500/20 dark:bg-sky-500/[0.06]">
                <div aria-hidden className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-sky-400/10 blur-xl" />
                <p className="relative mb-1.5 text-sm font-bold text-slate-900 dark:text-white">¿Lo aplicamos a tu empresa?</p>
                <p className="relative mb-4 text-xs text-slate-500 dark:text-slate-400">
                  Diagnóstico gratuito. Propuesta clara en 48-72 h.
                </p>
                <Link
                  href="/#contacto"
                  className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition-all hover:gap-2.5 dark:text-sky-400"
                >
                  Agendar diagnóstico <span aria-hidden>→</span>
                </Link>
              </div>

              {related.length > 0 ? (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    También te puede interesar
                  </p>
                  <ul className="space-y-4">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blog/${item.slug}`} className="group block">
                          <div className="mb-1.5 flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 1).map((tag) => (
                              <span key={tag} className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs font-semibold leading-snug text-slate-700 transition-colors group-hover:text-sky-600 dark:text-slate-200 dark:group-hover:text-sky-300">
                            {item.title}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </aside>
          </div>

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
