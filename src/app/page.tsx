import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Methodology from "@/components/sections/Methodology";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import TrustStrip from "@/components/sections/TrustStrip";
import JsonLd from "@/components/marketing/JsonLd";
import { CONTACT } from "@/config/contact";
import { faqItems } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Qubelia | Software, web y sistemas a medida para empresas B2B",
  description:
    "Qubelia desarrolla software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida para empresas B2B en España.",
  path: "/",
});

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
    description:
      "Empresa de software a medida, web a medida, automatización e integraciones, y CRM o intranet a medida para empresas B2B.",
    knowsAbout: [
      "Software a medida",
      "Web a medida",
      "Automatización de procesos",
      "Integraciones ERP CRM",
      "CRM a medida",
      "Intranet a medida",
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <JsonLd id="ld-home-localbusiness" data={localBusiness} />
      <JsonLd id="ld-home-faq" data={faqData} />
      <Header />
      <main id="contenido">
        <Hero />
        <Services />
        <Methodology />
        <TrustStrip />
        <Results />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
