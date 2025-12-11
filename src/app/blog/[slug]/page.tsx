/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import labs from "@/content/labs.json";
import { canonical, titleTemplate } from "@/lib/seo";

type Tool = typeof labs[number];
type Params = { slug: Tool["slug"] };

export const revalidate = 86400;

export function generateStaticParams(): Params[] {
  return labs.map((t) => ({ slug: t.slug as Params["slug"] }));
}

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  const { slug } = (await params) as Params;
  const tool = labs.find((t) => t.slug === slug);
  if (!tool) return {};
  const path = `/labs/${tool.slug}`;
  const title = `${tool.title} · Qubelia Labs`;
  const description = tool.desc;
  return {
    title: titleTemplate(title),
    description,
    alternates: { canonical: canonical(path) },
    openGraph: { title, description, url: path }
  };
}

export default async function ToolPage({ params }: { params: any }) {
  const { slug } = (await params) as Params;
  const tool = labs.find((t) => t.slug === slug);
  if (!tool) notFound();

  const ld = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
    "publisher": { "@type": "Organization", "name": "Qubelia España" },
    "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/labs/${tool.slug}`,
    "description": tool.desc
  };

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
          <a className="hover:underline" href="/labs">Labs</a>
          <span aria-hidden className="mx-1">/</span>
          <span className="text-slate-900">{tool.title}</span>
        </nav>

        <header className="mt-3 flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{tool.title}</h1>
          <span className="rounded-full bg-brand-50 text-brand-700 text-xs px-2 py-1 border border-brand-200">
            {tool.status}
          </span>
        </header>
        <p className="mt-2 text-slate-700 max-w-2xl">{tool.desc}</p>

        {/* Demo / contenido — próximamente */}
        <div className="mt-8 rounded-2xl border border-dashed border-brand-200 p-6 text-slate-600 bg-brand-50">
          <p className="font-medium">Demo próximamente</p>
          <p className="mt-1 text-sm">
            Estamos preparando una versión interactiva. Si quieres usarla ya o adaptarla a tu empresa, <a className="underline" href="#contacto">escríbenos</a>.
          </p>
        </div>

        {/* Guía de uso y roadmap (plantilla genérica por ahora) */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-brand-100 p-6 bg-white shadow-card">
            <h2 className="text-lg font-semibold">Cómo funcionará</h2>
            <ul className="mt-3 list-disc pl-5 text-slate-700">
              {tool.slug === "calculadora-irpf-autonomos" ? (
                <>
                  <li>Introduce ingresos brutos, gastos deducibles, cuotas de autónomos y retenciones.</li>
                  <li>El sistema estima base imponible, tramos y pago aproximado (no sustituye asesoría fiscal).</li>
                  <li>Exporta resultados en PDF y guarda escenarios.</li>
                </>
              ) : tool.slug === "generador-brief-proyecto" ? (
                <>
                  <li>Completa objetivos, usuarios, alcance, riesgos y métricas.</li>
                  <li>Genera un brief claro para alinear equipo y proveedores.</li>
                  <li>Exporta a PDF o copia a Notion.</li>
                </>
              ) : (
                <>
                  <li>Checklist guiado por secciones: datos personales, cookies, formularios, derechos.</li>
                  <li>Marca estado (OK, pendiente, no aplica) y obtén un reporte de acciones.</li>
                  <li>Incluye enlaces a recursos y modelos.</li>
                </>
              )}
            </ul>
          </article>

          <article className="rounded-2xl border border-brand-100 p-6 bg-white shadow-card">
            <h2 className="text-lg font-semibold">Roadmap</h2>
            <ol className="mt-3 list-decimal pl-5 text-slate-700">
              <li>Prototipo navegable.</li>
              <li>Validación con 5–10 usuarios reales.</li>
              <li>Versión pública con exportación.</li>
              <li>Adaptaciones específicas por sector.</li>
            </ol>
            <a className="mt-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-white bg-[linear-gradient(115deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] hover:bg-[position:100%_0] border border-brand-900/60 shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all" href="#contacto">
              Quiero ser beta-tester
            </a>
          </article>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </Container>
    </main>
  );
}
