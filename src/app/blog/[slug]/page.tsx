import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BASE_URL, SITE_NAME, canonical, titleTemplate } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";
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
    // Con títulos largos omitimos el sufijo "| Qubelia" para no pasar de ~60 caracteres en SERP.
    title: post.title.length > 52 ? post.title : titleTemplate(post.title),
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
      // Sin `images`: Next usa el archivo opengraph-image.tsx de esta ruta, que genera
      // una tarjeta social propia por artículo. Si se fija aquí, se sobreescribe.
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
  const canonicalUrl = canonical(`/blog/${post.slug}`);
  // La ruta global /opengraph-image ya no existe; la imagen viva es la generada por post.
  const imageUrl = `${canonicalUrl}/opengraph-image`;

  const landingLinkSlugs = new Set([
    "software-medida-vs-saas-guia-pymes",
    "como-elegir-empresa-desarrollo-software-espana",
    "digitalizacion-pymes-espana-guia-2026",
  ]);
  const shouldLinkLanding = landingLinkSlugs.has(post.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: canonicalUrl,
    url: canonicalUrl,
    author: { "@type": "Organization", name: post.author.name, url: post.author.url },
    datePublished: published.toISOString(),
    dateModified: published.toISOString(),
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/brand/logo-qubelia-512.png`,
      },
    },
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
    "agentes-ia-pymes-guia-automatizacion-2026": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "ecosistemas-software-conectados-erp-crm-pymes": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "roi-automatizacion-procesos-b2b-guia-completa": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "integraciones-erp-crm-pymes": {
      href: "/servicios/automatizacion-integraciones",
      label: "Automatización e integraciones",
    },
    "seguridad-zero-trust-desarrollo-software-medida": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "software-medida-vs-saas-guia-pymes": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "digitalizacion-pymes-espana-guia-2026": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "como-elegir-empresa-desarrollo-software-espana": { href: "/servicios/software-a-medida", label: "Software a medida" },
    "desarrollo-web-a-medida-vs-wordpress-cuando-dar-el-salto": { href: "/servicios/web-a-medida", label: "Web a medida" },
    "crm-a-medida-vs-hubspot-salesforce-pymes": {
      href: "/servicios/crm-intranet-a-medida",
      label: "CRM / intranet a medida",
    },
  };
  const mainService = serviceCta[post.slug] ?? { href: "/servicios", label: "Servicios de Qubelia" };

  const sectionId = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

  return (
    <>
      <Header />
      <main id="contenido" className="min-h-screen">
        {/* ── Cabecera del artículo ──────────────────────────────── */}
        <div className="border-b border-[#E4E6EA] bg-white">
          <Container className="pt-14 pb-14 sm:pt-16 sm:pb-16">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.h1 },
              ]}
            />

            <div className="max-w-4xl">
              <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-1">
                {post.tags.map((tag: string) => (
                  <li key={tag} className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                    {tag}
                  </li>
                ))}
              </ul>

              <h1 className="text-h1">{post.h1}</h1>

              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#3D4046]">{post.intro}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E4E6EA] pt-6 text-sm text-[#63666D]">
                <time dateTime={post.date}>
                  {published.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <span>{readingTime} de lectura</span>
                <span>{post.author.name}</span>
              </div>
            </div>
          </Container>
        </div>

        {/* ── Cuerpo ─────────────────────────────────────────────── */}
        <Container className="py-14 sm:py-16">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-14">
            <article className="max-w-prose">
              {/* Índice para pantallas pequeñas (en escritorio vive en el aside) */}
              <nav aria-label="Tabla de contenidos" className="mb-12 border-y border-[#E4E6EA] py-7 lg:hidden">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  Contenidos
                </p>
                <ol className="mt-5 space-y-3">
                  {post.sections.map((section, index) => (
                    <li key={section.title} className="flex items-start gap-3">
                      <span className="flex-none pt-px text-xs font-medium tabular-nums text-[#9DA0A6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${sectionId(section.title)}`}
                        className="text-sm leading-snug text-[#3D4046] transition-colors hover:text-brand-600"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              {shouldLinkLanding ? (
                <div className="mb-12 flex gap-3 border-l-2 border-brand-600 bg-[#F5F6F8] px-6 py-5">
                  <span aria-hidden className="mt-0.5 flex-none text-brand-600">
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <p className="text-sm leading-relaxed text-[#3D4046]">
                    Consulta nuestra página de{" "}
                    <Link
                      className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
                      href="/servicios/software-a-medida"
                    >
                      software a medida
                    </Link>{" "}
                    con proceso, encaje y diagnóstico.
                  </p>
                </div>
              ) : null}

              <div className="divide-y divide-[#E4E6EA]">
                {post.sections.map((section, index) => (
                  <section
                    key={section.title}
                    id={sectionId(section.title)}
                    className="scroll-mt-24 py-10 first:pt-0"
                  >
                    <div className="mb-5 flex items-baseline gap-4">
                      <span aria-hidden className="flex-none select-none text-2xl font-light leading-none tabular-nums text-[#9DA0A6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-h3">{section.title}</h2>
                    </div>
                    <div className="space-y-4">
                      {section.body.map((item, itemIndex) => (
                        <p key={itemIndex} className="text-[16px] leading-relaxed text-[#3D4046]">
                          {item}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {post.faqs ? (
                <section className="mt-14 border-t border-[#E4E6EA] pt-12">
                  <h2 className="text-h3">Preguntas frecuentes</h2>
                  <div className="mt-7 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
                    {post.faqs.map((item) => (
                      <details key={item.q} className="group">
                        <summary className="flex list-none cursor-pointer select-none items-center justify-between gap-4 py-5 text-[15px] font-medium text-[#101014]">
                          <span>{item.q}</span>
                          <span
                            aria-hidden
                            className="flex h-5 w-5 flex-none items-center justify-center text-base leading-none text-[#63666D] transition-transform duration-200 group-open:rotate-45 group-open:text-brand-600"
                          >
                            +
                          </span>
                        </summary>
                        <p className="pb-6 pr-9 text-sm leading-relaxed text-[#3D4046]">{item.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              <div className="mt-14 border border-[#E4E6EA] bg-[#F5F6F8] p-8">
                <p className="section-tag">¿Lo aplicamos juntos?</p>
                <p className="mt-5 text-[15px] leading-relaxed text-[#3D4046]">
                  Preparamos un plan accionable para tu caso, enlazamos con el servicio adecuado y dejamos todo medible desde el día 1.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button as="a" href="/#contacto" variant="primary" size="sm">
                    Agendar diagnóstico
                  </Button>
                  <Button as="a" href={mainService.href} variant="ghost" size="sm">
                    {mainService.label} →
                  </Button>
                </div>
              </div>
            </article>

            {/* ── Barra lateral ────────────────────────────────────── */}
            <aside className="space-y-10 lg:sticky lg:top-24 lg:border-l lg:border-[#E4E6EA] lg:pl-8">
              <nav aria-label="En este artículo" className="hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  En este artículo
                </p>
                <ol className="mt-5 space-y-3">
                  {post.sections.map((section, index) => (
                    <li key={section.title} className="flex items-start gap-2.5">
                      <span className="flex-none pt-px text-[11px] font-medium tabular-nums text-[#9DA0A6]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <a
                        href={`#${sectionId(section.title)}`}
                        className="text-xs leading-snug text-[#3D4046] transition-colors hover:text-brand-600"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="border-t border-[#E4E6EA] pt-7">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                  Ficha
                </p>
                <dl className="mt-4 divide-y divide-[#E4E6EA]">
                  {[
                    { label: "Autor", value: post.author.name },
                    { label: "Publicado", value: published.toLocaleDateString("es-ES") },
                    { label: "Lectura", value: readingTime },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-2 py-2.5 text-sm">
                      <dt className="text-[#63666D]">{label}</dt>
                      <dd className="text-right font-medium text-[#101014]">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="border-t border-[#E4E6EA] pt-7">
                <p className="text-sm font-semibold text-[#101014]">¿Lo aplicamos a tu empresa?</p>
                <p className="mt-2 text-xs leading-relaxed text-[#63666D]">
                  Diagnóstico gratuito. Propuesta clara en 48-72 h.
                </p>
                <Link
                  href="/#contacto"
                  className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#101014] transition-colors hover:text-brand-600"
                >
                  <span className="border-b border-[#C9CCD3] transition-colors group-hover:border-brand-600">
                    Agendar diagnóstico
                  </span>
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {related.length > 0 ? (
                <div className="border-t border-[#E4E6EA] pt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                    También te puede interesar
                  </p>
                  <ul className="mt-4 divide-y divide-[#E4E6EA]">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link href={`/blog/${item.slug}`} className="group block py-3.5">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                            {item.tags.slice(0, 1).join("")}
                          </span>
                          <span className="mt-1.5 block text-xs font-medium leading-snug text-[#101014] transition-colors group-hover:text-brand-600">
                            {item.title}
                          </span>
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
          {post.faqs && post.faqs.length > 0 && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(post.faqs)) }} />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
