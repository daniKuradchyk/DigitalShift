/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";
import { CONTACT } from "@/config/contact";

type Params = { city: string };

// Amplía cuando quieras más ubicaciones
const SUPPORTED_CITIES = ["sevilla"] as const;

export function generateStaticParams(): Params[] {
  return SUPPORTED_CITIES.map((city) => ({ city }));
}

export const revalidate = 86400;

export async function generateMetadata(
  { params }: { params: any }
): Promise<Metadata> {
  const { city } = (await params) as Params;
  const cityLc = city.toLowerCase();
  const cityName = cityLc.charAt(0).toUpperCase() + cityLc.slice(1);
  const path = `/area/${cityLc}`;

  const title = `Software a medida, automatización e integraciones ERP/CRM en ${cityName}`;
  const description = `Desarrollamos software a medida, automatizamos procesos e integramos ERP/CRM para empresas en ${cityName}. Equipo técnico con entregas claras.`;

  return {
    title: titleTemplate(title),
    description,
    alternates: { canonical: canonical(path) },
    openGraph: { title, description, url: path },
  };
}

export default async function CityPage({ params }: { params: any }) {
  const { city } = (await params) as Params;
  const cityLc = city.toLowerCase();
  if (!SUPPORTED_CITIES.includes(cityLc as any)) notFound();

  const cityName = cityLc.charAt(0).toUpperCase() + cityLc.slice(1);

  const ldLocalBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Qubelia España",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/area/${cityLc}`,
    "email": CONTACT.email,
    "telephone": CONTACT.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sevilla",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "areaServed": cityName
  };

  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Software a medida, automatización e integraciones ERP/CRM en {cityName}
        </h1>
        <p className="mt-2 text-slate-700 max-w-2xl">
          Desarrollamos herramientas internas, automatizamos procesos e integramos ERP/CRM para empresas en {cityName}.
          Reducimos trabajo manual, ganamos visibilidad operativa y escalamos sin caos.
        </p>

        <ul className="mt-6 space-y-2 text-slate-700">
          {[
            "Auditoría de procesos y plan de digitalización por impacto",
            "Software a medida: aplicaciones web/móvil, APIs y backends escalables",
            "Integraciones ERP/CRM (SAP, Salesforce, Odoo), ETLs y dashboards en tiempo real",
            "Automatización de procesos repetitivos con RPA e IA",
            "Soporte y evolución con SLOs y roadmap trimestral"
          ].map((b) => (
            <li key={b} className="flex gap-2">
              <span aria-hidden className="mt-2 inline-block h-2 w-2 rounded-full bg-sky-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#contacto" className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-white bg-[linear-gradient(115deg,#0e1d4a,#1c3994,#4168e1,#6389ff)] bg-[length:200%_100%] hover:bg-[position:100%_0] border border-sky-900/60 shadow-[0_18px_54px_-18px_rgba(14,29,74,0.7)] hover:-translate-y-0.5 hover:shadow-[0_22px_64px_-20px_rgba(65,104,225,0.7)] focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all">
            Agenda diagnóstico
          </a>
          <a href="/servicios" className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-sky-900 bg-[#f4f7ff] border border-sky-200 shadow-[0_12px_34px_-18px_rgba(14,29,74,0.4)] hover:bg-[#e8edff] hover:border-sky-300 hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-18px_rgba(65,104,225,0.45)] focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all">
            Ver servicios
          </a>
        </div>

        {/* JSON-LD LocalBusiness con NAP real */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocalBusiness) }} />
      </Container>
    </main>
  );
}
