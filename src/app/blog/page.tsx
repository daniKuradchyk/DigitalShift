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
  title: "Blog: software a medida y automatización | Qubelia",
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
      <main id="contenido">
        {/* ── Cabecera editorial ─────────────────────────────────── */}
        <section className="bg-white">
          <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]} />

            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              <div className="col-span-12 lg:col-span-7">
                <p className="section-tag">
                  {posts.length} artículos · {fmtDate(posts[0]?.date ?? "")}
                </p>
                <h1 className="mt-7 text-h1">
                  Blog de software
                  <br className="hidden sm:block" /> y automatización B2B
                </h1>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:pt-3">
                <p className="text-lg leading-relaxed text-[#3D4046]">
                  Guías sobre desarrollo a medida, digitalización, CRM, integraciones ERP y automatización de procesos para empresas en España.
                </p>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-2.5 gap-y-2">
              {allTags.map((tag) => (
                <li
                  key={tag}
                  className="border border-[#E4E6EA] bg-white px-2.5 py-1 text-xs text-[#3D4046]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* ── Destacado ──────────────────────────────────────────── */}
        {featured && (
          <section aria-labelledby="blog-destacado" className="border-t border-[#E4E6EA] bg-[#F5F6F8]">
            <Container className="py-16 sm:py-20">
              <p id="blog-destacado" className="section-tag">
                Destacado
              </p>

              <Link href={`/blog/${featured.slug}`} className="group mt-8 block">
                <article className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
                  <div className="col-span-12 lg:col-span-3">
                    <p className="text-sm text-[#63666D]">{fmtDate(featured.date)}</p>
                    <p className="mt-1 text-sm text-[#63666D]">{featured.readingTime} de lectura</p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
                      {featured.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-span-12 lg:col-span-9 lg:border-l lg:border-[#E4E6EA] lg:pl-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight tracking-tight text-[#101014] transition-colors duration-200 group-hover:text-brand-600">
                      {featured.title}
                    </h2>
                    <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#3D4046]">
                      {featured.description}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[#101014]">
                      <span className="border-b border-[#C9CCD3] transition-colors duration-200 group-hover:border-brand-600 group-hover:text-brand-600">
                        Leer artículo completo
                      </span>
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        aria-hidden
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </Container>
          </section>
        )}

        {/* ── Listado completo ───────────────────────────────────── */}
        {rest.length > 0 && (
          <section aria-labelledby="blog-todos" className="border-t border-[#E4E6EA] bg-white">
            <Container className="py-16 sm:py-20">
              <p id="blog-todos" className="section-tag">
                Todos los artículos
              </p>

              <ul className="mt-8 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
                {rest.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="group block py-8 sm:py-10">
                      <div className="grid grid-cols-12 gap-4 sm:gap-8 lg:gap-12">
                        <div className="col-span-12 sm:col-span-2 lg:col-span-1">
                          <span className="text-xl font-light tabular-nums leading-none tracking-tight text-[#9DA0A6]">
                            {String(i + 2).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="col-span-12 sm:col-span-10 lg:col-span-3">
                          <p className="text-sm text-[#63666D]">{fmtDate(p.date)}</p>
                          <p className="mt-1 text-sm text-[#63666D]">{p.readingTime} de lectura</p>
                          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                            {p.tags.slice(0, 2).map((tag) => (
                              <li
                                key={tag}
                                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]"
                              >
                                {tag}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="col-span-12 lg:col-span-8">
                          <h2 className="text-xl sm:text-2xl font-semibold leading-snug tracking-tight text-[#101014] transition-colors duration-200 group-hover:text-brand-600">
                            {p.title}
                          </h2>
                          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#3D4046]">
                            {p.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </section>
        )}

        {/* ── CTA final ──────────────────────────────────────────── */}
        <section className="border-t border-[#E4E6EA] bg-[#F5F6F8]">
          <Container className="py-16 sm:py-20">
            <div className="grid grid-cols-12 gap-8 lg:items-end">
              <div className="col-span-12 lg:col-span-7">
                <p className="section-tag">Próximo paso</p>
                <h2 className="mt-6 text-h3">Lo aplicamos a tu caso en 45 min</h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4046]">
                  Revisamos, priorizamos y dejamos un checklist medible. Sin compromiso inicial.
                </p>
              </div>
              <div className="col-span-12 flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                <Button as="a" href="/#contacto" variant="primary">Agendar diagnóstico</Button>
                <Button as="a" href="/servicios" variant="ghost">Ver servicios</Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
