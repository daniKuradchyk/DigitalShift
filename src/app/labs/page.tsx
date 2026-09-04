import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Footer from "@/components/sections/Footer";
import JsonLd from "@/components/marketing/JsonLd";
import { breadcrumbJsonLd, softwareAppJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import labs from "@/content/labs.json";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Labs Qubelia | Herramientas gratuitas para empresas",
  description:
    "Calculadoras, análisis y herramientas gratuitas para pymes y empresas B2B. ROI de automatización, coste de software, auditoría web y más.",
  path: "/labs",
});

type Lab = typeof labs[number];

function labHref(t: Lab) {
  const raw = (t as Record<string, unknown>).href;
  return raw ? String(raw) : `/labs/${t.slug}`;
}

function LabIcon({ slug }: { slug: string }) {
  if (slug === "roi-automatizacion") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m6 16 4-6 4 4 5-8" />
        <circle cx="6" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (slug === "calculadora-irpf-autonomos") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    );
  }
  if (slug === "calculadora-coste-software") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <rect x="8" y="6" width="8" height="3" rx="0.5" />
        <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" />
      </svg>
    );
  }
  if (slug === "analisis-gratis") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m7 15 3-4 4 3 4-6" />
        <circle cx="10" cy="11" r="1" />
      </svg>
    );
  }
  if (slug === "generador-brief-proyecto") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" />
        <path d="M14 3v4h4M8 13h8M8 17h6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l2 2 4-4" />
      <rect x="3" y="4" width="18" height="16" rx="1" />
    </svg>
  );
}

function isComingSoon(status: string) {
  return (status ?? "").toLowerCase().includes("camino");
}

export default function LabsPage() {
  const available = labs.filter((t) => !isComingSoon(t.status));

  const toolsForSchema = available.map((t) => ({
    title: t.title,
    desc: t.desc,
    href: (t as Record<string, unknown>).href
      ? String((t as Record<string, unknown>).href)
      : `/labs/${t.slug}`,
  }));
  const appSchemas = softwareAppJsonLd(toolsForSchema);

  const heroStats = [
    { value: String(available.length).padStart(2, "0"), label: "Herramientas" },
    { value: "0 €", label: "Coste" },
    { value: "Free", label: "Sin registro" },
  ];

  return (
    <>
      <main className="min-h-screen bg-white">
      <JsonLd
        id="ld-labs-breadcrumbs"
        data={breadcrumbJsonLd([
          { name: "Inicio", url: canonical("/") },
          { name: "Labs", url: canonical("/labs") },
        ])}
      />
      {appSchemas.map((schema, i) => (
        <JsonLd key={`ld-lab-${i}`} id={`ld-lab-${i}`} data={schema} />
      ))}

      {/* Inline header */}
      <header className="border-b border-[#E4E6EA] bg-white">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Ir a inicio" className="flex items-center gap-2">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3D4046] transition-colors hover:text-brand-600"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Inicio
            </Link>
          </div>
        </Container>
      </header>

      {/* Hero */}
      <section className="border-b border-[#E4E6EA] bg-white">
        <Container>
          <div className="pt-20 pb-14 sm:pt-24 sm:pb-16">
            <p className="section-tag">Laboratorio abierto</p>
            <h1 className="mt-8 max-w-4xl text-h1">
              Herramientas <span className="text-brand-600">gratuitas</span> para tu negocio
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3D4046]">
              Calculadoras, plantillas y análisis listos para usar. Sin registro, sin coste. Si necesitas adaptarlos a tu empresa,{" "}
              <a
                href="/#contacto"
                className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
              >
                hablamos
              </a>
              .
            </p>
          </div>

          <dl className="grid grid-cols-3 divide-x divide-[#E4E6EA] border-t border-[#E4E6EA]">
            {heroStats.map((s) => (
              <div key={s.label} className="px-5 py-8 first:pl-0 sm:px-8 sm:py-10">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-3xl font-semibold tracking-tight text-[#101014] sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block text-sm text-[#63666D]">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Available tools */}
      <section aria-labelledby="labs-available-title" className="bg-white py-20 sm:py-24">
        <Container>
          <h2
            id="labs-available-title"
            className="mb-10 text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]"
          >
            Disponibles ahora
          </h2>

          <ul className="grid gap-px bg-[#E4E6EA] sm:grid-cols-2">
            {available.map((t: Lab) => (
              <li key={t.slug} className="bg-white">
                <div className="group flex h-full flex-col p-6 transition-colors sm:p-8">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-10 w-10 flex-none items-center justify-center border border-[#E4E6EA] text-[#101014]">
                      <LabIcon slug={t.slug} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold leading-snug tracking-tight text-[#101014]">
                          {t.title}
                        </h3>
                        <span className="flex-none border border-[#E4E6EA] px-2 py-0.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[#63666D]">
                          Disponible
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-[#3D4046]">{t.desc}</p>
                    </div>
                  </div>

                  {t.tags && t.tags.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                      {t.tags.map((tag) => (
                        <li
                          key={tag}
                          className="border border-[#E4E6EA] px-2.5 py-1 text-xs text-[#3D4046]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                    <Button as="a" href={labHref(t)} variant="primary" size="sm">
                      {t.cta}
                    </Button>
                    <a
                      className="group/link inline-flex items-center gap-2 text-sm font-medium text-[#101014] transition-colors hover:text-brand-600"
                      href="/#contacto"
                    >
                      <span className="border-b border-[#C9CCD3] transition-colors group-hover/link:border-brand-600">
                        Adaptar a mi empresa
                      </span>
                      <svg className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Coming soon — oculto hasta que estén disponibles */}

      {/* CTA bottom */}
      <section className="border-t border-[#E4E6EA] bg-[#F5F6F8] py-20 sm:py-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="section-tag">Soporte profesional</p>
              <h2 className="mt-6 max-w-2xl text-h2">¿Necesitas una versión a medida?</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3D4046]">
                Adaptamos cualquier herramienta a tu operativa real: integración con tus datos, automatización y seguimiento continuo.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:items-end lg:justify-end">
              <Button as="a" href="/#contacto" variant="primary" className="w-full sm:w-auto">
                Hablar con Qubelia
              </Button>
              <Button as="a" href="/servicios" variant="ghost" className="w-full sm:w-auto">
                Ver todos los servicios
              </Button>
            </div>
          </div>
        </Container>
      </section>
      </main>
      <Footer />
    </>
  );
}
