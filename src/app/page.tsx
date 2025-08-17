import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import Results from "@/components/sections/Results";
import Faqs, { faqItems } from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { faqJsonLd } from "@/lib/jsonld";

export const revalidate = 60 * 60 * 24; // 24h

export default function Page() {
  const faqLd = faqJsonLd(faqItems);
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <Services />
        <Methodology />
        <Results />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}