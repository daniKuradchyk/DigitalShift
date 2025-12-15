import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { canonical, titleTemplate } from "@/lib/seo";
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
  const url = `/blog/${post.slug}`;
  return {
    title: titleTemplate(post.title),
    description: post.description,
    alternates: { canonical: canonical(url) },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      authors: [post.author.name],
      tags: post.tags,
      publishedTime: new Date(post.date).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
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

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: published.toISOString(),
    author: { "@type": "Organization", name: post.author.name, url: post.author.url },
    publisher: { "@type": "Organization", name: "Qubelia" },
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/${post.slug}`,
    inLanguage: "es",
    keywords: post.tags.join(", "),
  };

  const sectionId = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9áéíóúüñ]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <main className="pb-14">
      <div
        className="relative border-b overflow-hidden"
        style={{ background: "var(--color-bg-hero)" }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-brand-300/25 blur-3xl" />
          <div className="absolute right-4 bottom-0 h-64 w-64 rounded-full bg-brand-500/18 blur-3xl" />
        </div>
        <Container className="py-10 sm:py-14 relative space-y-4 text-[color:var(--color-text)]">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
              <div className="h-10 w-auto">
                <Logo />
              </div>
              <span className="text-sm font-semibold text-[color:var(--color-text-muted)]">Volver a inicio</span>
            </Link>
            <Link className="text-sm text-brand-700 hover:text-brand-900 inline-flex items-center gap-2" href="/blog">
              <span aria-hidden>←</span> Volver al blog
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-[3fr_1.2fr] lg:items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-brand-700">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[var(--color-bg-card)] px-2 py-1 border border-[var(--color-border)] shadow-card">
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[color:var(--color-text)] leading-tight">{post.h1}</h1>
              <p className="text-lg text-[color:var(--color-text-muted)] max-w-3xl">{post.intro}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[color:var(--color-text-muted)]">
                <span>{published.toLocaleDateString("es-ES")}</span>
                <span aria-hidden>·</span>
                <span>{readingTime} min de lectura</span>
                <span aria-hidden>·</span>
                <span>{post.author.name}</span>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-[var(--shadow-soft)] space-y-3">
              <p className="text-sm font-semibold text-[color:var(--color-text)]">Puntos clave</p>
              <ul className="space-y-2 text-sm text-[color:var(--color-text-muted)]">
                {takeaways.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden className="text-brand-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 text-xs text-[color:var(--color-text-muted)]">
                <span className="rounded-full bg-[var(--color-bg-muted)] px-3 py-1 border border-[var(--color-border)]">Revisión express en 72 h</span>
                <span className="rounded-full bg-[var(--color-bg-muted)] px-3 py-1 border border-[var(--color-border)]">Checklist accionable</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="mt-10 text-[color:var(--color-text)]">
        <article className="grid gap-10 lg:grid-cols-[3fr_1fr] items-start">
          <div className="prose prose-slate prose-lg max-w-none text-[color:var(--color-text)]">
            <div className="not-prose mb-8 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-muted)] p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-700">Tabla de contenidos</p>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--color-text-muted)]">
                {post.sections.map((section) => (
                  <li key={section.title} className="flex gap-2">
                    <span aria-hidden className="text-brand-600">•</span>
                    <a className="hover:text-brand-800" href={`#${sectionId(section.title)}`}>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {post.sections.map((section, idx) => (
              <section key={section.title} id={sectionId(section.title)} className="scroll-mt-24 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-muted)] text-sm font-semibold text-brand-700">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="m-0 text-[color:var(--color-text)]">{section.title}</h2>
                </div>
                <ul className="space-y-2 not-prose">
                  {section.body.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex gap-3 rounded-xl bg-[var(--color-bg-card)]/80 p-3 shadow-[var(--shadow-soft)] border border-[var(--color-border)]">
                      <span aria-hidden className="mt-1 h-2 w-2 rounded-full bg-brand-500" />
                      <p className="m-0 text-[color:var(--color-text-muted)]">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {post.faqs && (
              <section className="not-prose mt-10">
                <h2 className="text-xl font-semibold text-[color:var(--color-text)]">Preguntas frecuentes</h2>
                <div className="mt-4 space-y-3">
                  {post.faqs.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)]/80 p-4 shadow-[var(--shadow-soft)] open:shadow-[0_18px_54px_-24px_rgba(14,29,74,0.35)] transition"
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-2 text-base font-semibold text-[color:var(--color-text)]">
                        <span>{item.q}</span>
                        <span className="text-brand-600 group-open:rotate-45 transition">+</span>
                      </summary>
                      <p className="mt-2 text-[color:var(--color-text-muted)]">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <div className="not-prose mt-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-muted)] p-6 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-700">¿Lo aplicamos juntos?</p>
              <p className="mt-2 text-[color:var(--color-text-muted)]">Preparamos un plan accionable para tu caso y lo dejamos medible desde el día 1.</p>
              <div className="mt-4 flex gap-3">
                <Link
                  className="inline-flex items-center justify-center rounded-full bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] transition"
                  href="/#contacto"
                >
                  Agenda diagnóstico
                </Link>
                <Link
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-card)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text)] hover:-translate-y-0.5 hover:shadow-card transition"
                  href="/labs"
                >
                  Ver herramientas
                </Link>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold text-[color:var(--color-text)]">Resumen rápido</p>
              <ul className="mt-3 space-y-2 text-sm text-[color:var(--color-text-muted)]">
                {post.sections.slice(0, 4).map((section) => (
                  <li key={section.title} className="flex gap-2">
                    <span aria-hidden className="text-brand-600">•</span>
                    <span>{section.title}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-[var(--shadow-soft)]">
              <p className="text-sm font-semibold text-[color:var(--color-text)]">Ficha del artículo</p>
              <ul className="mt-2 space-y-2 text-sm text-[color:var(--color-text-muted)]">
                <li className="flex justify-between gap-2">
                  <span>Autor</span>
                  <span className="font-semibold text-[color:var(--color-text)]">{post.author.name}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Publicado</span>
                  <span>{published.toLocaleDateString("es-ES")}</span>
                </li>
                <li className="flex justify-between gap-2">
                  <span>Lectura</span>
                  <span>{readingTime} min</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-bg-muted)] p-5 text-sm text-[color:var(--color-text-muted)] shadow-[var(--shadow-soft)]">
              <p className="font-semibold text-[color:var(--color-text)]">¿Necesitas ayuda ahora?</p>
              <p className="mt-2">Hacemos auditoría express y entregamos un checklist priorizado en 72 h.</p>
              <Link className="mt-3 inline-flex text-brand-700 font-semibold hover:text-brand-900" href="/#contacto">
                Solicitar auditoría →
              </Link>
            </div>
            {related.length > 0 && (
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-5 shadow-[var(--shadow-soft)]">
                <p className="text-sm font-semibold text-[color:var(--color-text)]">También te puede interesar</p>
                <ul className="mt-3 space-y-3 text-sm text-[color:var(--color-text-muted)]">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link className="font-semibold text-brand-700 hover:text-brand-900" href={`/blog/${item.slug}`}>
                        {item.title}
                      </Link>
                      <p className="text-[color:var(--color-text-muted)]">{item.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </Container>
    </main>
  );
}
