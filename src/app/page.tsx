import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";
import Faqs from "@/components/sections/Faqs";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Methodology from "@/components/sections/Methodology";
import Results from "@/components/sections/Results";
import Services from "@/components/sections/Services";
import StatsBand from "@/components/sections/StatsBand";
import TrustStrip from "@/components/sections/TrustStrip";
import JsonLd from "@/components/marketing/JsonLd";
import { faqItems } from "@/content/faqs";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Software a medida y automatización para empresas | Qubelia",
  description:
    "Empresa española de software a medida: desarrollo web, automatización de procesos y CRM a medida. Con IA cuando aporta, sin IA cuando no. Sin humo ni vendor lock-in.",
  path: "/",
});

export default function Page() {
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
      <JsonLd id="ld-home-faq" data={faqData} />
      <Header />
      <main id="contenido">
        <Hero />
        <StatsBand />
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
