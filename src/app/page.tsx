import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import Results from "@/components/sections/Results";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const revalidate = 86400;

export default function Page() {
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
    </>
  );
}
