import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import StatsStrip from "@/components/sections/StatsStrip";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import TrustStrip from "@/components/sections/TrustStrip";
import Results from "@/components/sections/Results";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Script from "next/script";
import { canonical, openGraphImage } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";
import { CONTACT } from "@/config/contact";
import { faqItems } from "@/content/faqs";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Qubelia · Software a medida, automatización e integraciones ERP/CRM en Sevilla",
  description:
    "Desarrollamos software a medida, automatizamos procesos e integramos ERP/CRM para empresas. Equipo técnico en Sevilla con entregas claras y resultados medibles.",
  alternates: { canonical: canonical("/") },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Qubelia · Software a medida, automatización e integraciones ERP/CRM",
    description:
      "Desarrollamos software a medida, automatizamos procesos e integramos ERP/CRM para empresas. Equipo técnico en Sevilla con entregas claras y resultados medibles.",
    url: canonical("/"),
    siteName: "Qubelia",
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qubelia · Software a medida, automatización e integraciones ERP/CRM",
    description:
      "Desarrollamos software a medida, automatizamos procesos e integramos ERP/CRM para empresas. Equipo técnico en Sevilla con entregas claras y resultados medibles.",
    images: openGraphImage(),
  },
};

export default function Page() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Qubelia",
    image: absoluteUrl("/icon.png"),
    url: absoluteUrl("/"),
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Torrelodones 84B",
      addressLocality: CONTACT.city,
      addressRegion: "Sevilla",
      postalCode: CONTACT.postalCode,
      addressCountry: CONTACT.country,
    },
    areaServed: "ES",
    priceRange: "EUR",
    founder: "Daniil Kuradchik Pekarskaya",
    description: "Empresa de software a medida, automatización de procesos e integraciones ERP/CRM para pymes y empresas en España.",
    knowsAbout: [
      "Software a medida",
      "Automatización de procesos",
      "Integraciones ERP CRM",
      "Digitalización operativa",
      "Desarrollo web",
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <>
      <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="ld-faqpage" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <Header />
      <main id="contenido">
        {/* 1. Hero — propuesta clara */}
        <Hero />
        {/* 2. Prueba rápida — 3 métricas de credibilidad */}
        <StatsStrip />
        {/* 3. Servicios — 3 pilares principales */}
        <Services />
        {/* 4. Metodología — cómo trabajamos */}
        <Methodology />
        {/* 5. Stack tecnológico — señal de confianza técnica */}
        <TrustStrip />
        {/* 6. Casos y resultados — prueba */}
        <Results />
        {/* 7. FAQ de compra */}
        <Faqs />
        {/* 8. CTA final — diagnóstico */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}
