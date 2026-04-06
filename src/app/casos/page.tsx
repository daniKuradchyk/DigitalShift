import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import JsonLd from "@/components/marketing/JsonLd";
import Button from "@/components/common/Button";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";
import cases from "@/content/cases.json";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Casos de exito | Proyectos reales de software, web y automatizacion",
  description:
    "Casos reales de empresas que han mejorado su operativa con software a medida, integraciones y automatizacion. Resultados medibles y verificables.",
  path: "/casos",
});

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CasosPage() {
  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Casos de exito", url: absoluteUrl("/casos") },
  ]);

  return (
    <>
      <JsonLd id="ld-casos-breadcrumbs" data={breadcrumbData} />
      <Header />
      <main id="contenido">
        <section className="py-16 sm:py-20">
          <Container>
            <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Casos de exito" }]} />

            <div className="max-w-3xl mb-14">
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                Resultados reales
              </div>
              <h1
                className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.08] mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Casos de exito
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Proyectos reales con resultados medibles. Cada caso refleja un problema concreto, la
                solucion aplicada y el impacto en el negocio.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <article
                  key={c.client}
                  className="surface-card relative overflow-hidden rounded-2xl p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-400">
                      {c.client.charAt(0)}
                    </span>
                    <div>
                      <h2 className="text-base font-bold" style={{ color: "var(--text-primary)" }}>
                        {c.client}
                      </h2>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                        {c.sector} · {c.period}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
                    {c.challenge}
                  </p>

                  <div className="space-y-2 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.2em]"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Resultados clave
                    </p>
                    <ul className="space-y-1.5">
                      {c.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-emerald-400" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-14 surface-card relative overflow-hidden rounded-2xl p-8 text-center">
              <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>
                Quieres resultados similares?
              </h2>
              <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                Analizamos tu caso en 45 minutos. Sin compromiso, con propuesta clara.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button as="a" href="/#contacto" variant="shine">
                  Agendar diagnostico
                </Button>
                <Button as="a" href="/servicios" variant="ghost">
                  Ver servicios
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
