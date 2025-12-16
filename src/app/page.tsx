import type { Metadata } from "next";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Methodology from "@/components/sections/Methodology";
import Results from "@/components/sections/Results";
import LocalSeo from "@/components/sections/LocalSeo";
import Faqs from "@/components/sections/Faqs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Script from "next/script";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Qubelia - Desarrollo de software a medida e IA en Sevilla",
  description:
    "Consultoria tecnologica en Sevilla especializada en desarrollo de software a medida, automatizacion con IA y diseno web para pymes y emprendedores. Resultados medibles.",
};

export default function Page() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Qubelia",
    image: "https://qubelia.es/icon.png",
    url: "https://qubelia.es",
    telephone: "+34 674 569 372",
    email: "daniil.kuradchyk@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Torrelodones 84B",
      addressLocality: "Sevilla",
      addressRegion: "Sevilla",
      postalCode: "41016",
      addressCountry: "ES",
    },
    areaServed: "ES",
    priceRange: "EUR",
    founder: "Daniil Kuradchik Pekarskaya",
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cuanto cuesta una app a medida?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Depende del alcance y riesgos. Un MVP tipico arranca en X-Y EUR y tarda 8-10 semanas. Proyectos con integraciones suben segun sistemas y automatizaciones.",
        },
      },
      {
        "@type": "Question",
        name: "Plazos habituales de un MVP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "8-10 semanas con sprints quincenales, entregas continuas y foco en un minimo viable util.",
        },
      },
      {
        "@type": "Question",
        name: "Incluye analitica/SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Si. Instrumentamos eventos clave (GA4) y cuidamos rendimiento/SEO tecnico basico. Opciones avanzadas bajo solicitud.",
        },
      },
      {
        "@type": "Question",
        name: "Quien es propietario del codigo?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tu. Entregamos repositorios, accesos, manuales y formacion para que no dependas de nosotros.",
        },
      },
      {
        "@type": "Question",
        name: "Que pasa tras el lanzamiento?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ofrecemos soporte y evolucion con SLOs. Tambien podemos formar a tu equipo interno.",
        },
      },
      {
        "@type": "Question",
        name: "Como garantizais calidad y seguridad?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Revisiones de codigo, checklist OWASP basico, CI con tests y despliegues controlados. Accesos, logs y backups bajo buenas practicas.",
        },
      },
    ],
  };

  return (
    <>
      <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="ld-faqpage" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }} />
      <Header />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <Services />
        <Methodology />
        <Results />
        <LocalSeo />
        <Faqs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
