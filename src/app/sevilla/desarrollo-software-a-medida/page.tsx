import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/common/Container";
import { absoluteUrl } from "@/lib/urls";
import { openGraphImage } from "@/lib/seo";

const canonicalUrl = absoluteUrl("/sevilla/desarrollo-software-a-medida");

export const metadata: Metadata = {
  title: "Desarrollo de software a medida en Sevilla | Qubelia",
  description:
    "Desarrollo de software a medida en Sevilla para pymes. Qubelia integra sistemas, automatiza procesos y reduce errores con entregas claras y soporte local.",
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "Desarrollo de software a medida en Sevilla | Qubelia",
    description:
      "Desarrollo de software a medida en Sevilla para pymes. Qubelia integra sistemas, automatiza procesos y reduce errores con entregas claras y soporte local.",
    url: canonicalUrl,
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de software a medida en Sevilla | Qubelia",
    description:
      "Desarrollo de software a medida en Sevilla para pymes. Qubelia integra sistemas, automatiza procesos y reduce errores con entregas claras y soporte local.",
    images: openGraphImage(),
  },
};

const faqs = [
  {
    q: "Cuanto tarda un proyecto de software a medida?",
    a: "Depende del alcance y las integraciones. Un primer release suele estar en 8-12 semanas con demos quincenales.",
  },
  {
    q: "Podeis integrar mi ERP o CRM actual?",
    a: "Si. Disenamos APIs y conectores a medida para ERP, CRM y herramientas internas, cuidando seguridad y trazabilidad.",
  },
  {
    q: "Ofreceis mantenimiento y soporte?",
    a: "Entregamos codigo, accesos y documentacion. Podemos seguir con soporte con SLA o hacer handover a tu equipo.",
  },
  {
    q: "Es mejor empezar con un MVP?",
    a: "Si hay incertidumbre de modelo o funcionalidades, empezamos con un MVP acotado y luego evolucionamos sin rehacer.",
  },
  {
    q: "Trabajais solo en Sevilla?",
    a: "Estamos en Sevilla y podemos reunirnos en persona. Tambien trabajamos en remoto con pymes de toda Espana.",
  },
];

export default function SevillaSoftwarePage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sevilla", item: absoluteUrl("/sevilla") },
      { "@type": "ListItem", position: 3, name: "Desarrollo de software a medida", item: canonicalUrl },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="py-12 sm:py-16">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-brand-700">Sevilla - Servicio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Desarrollo de software a medida en Sevilla</h1>
          <p className="text-slate-700 max-w-3xl">
            Pymes con procesos manuales, hojas de calculo duplicadas y aplicaciones heredadas pierden tiempo y ventas. Cuando los sistemas no hablan entre si,
            los equipos repiten tareas y crecen los errores.
          </p>
          <p className="text-slate-700 max-w-3xl">
            En Qubelia disenamos y construimos software a medida en Sevilla: aplicaciones web, backends y integraciones que automatizan procesos y dejan todo
            trazable. Entregas quincenales, seguridad basica y soporte cercano para que tu operacion no se detenga.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Que tipo de software a medida desarrollamos</h2>
          <ul className="space-y-2 text-slate-700">
            <li>Aplicaciones web internas y portales de clientes.</li>
            <li>APIs y microservicios para conectar ERP, CRM y ecommerce.</li>
            <li>Dashboards operativos y reporting en tiempo real.</li>
            <li>Automatizacion de tareas repetitivas con IA ligera.</li>
            <li>Herramientas de backoffice a medida para equipos de operaciones y ventas.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Problemas que resolvemos en pymes</h2>
          <ul className="space-y-2 text-slate-700">
            <li>Datos duplicados entre Excel, ERP y CRM que generan errores.</li>
            <li>Procesos criticos dependientes de personas clave y sin trazabilidad.</li>
            <li>Apps antiguas lentas o sin soporte que frenan ventas y atencion al cliente.</li>
            <li>Falta de integraciones y automatizacion que obliga a tareas manuales.</li>
            <li>Reportes poco fiables y decisiones con informacion incompleta.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Proceso de trabajo</h2>
          <ol className="space-y-2 text-slate-700 list-decimal list-inside">
            <li>Diagnostico express: objetivos, riesgos y backlog priorizado en 72h.</li>
            <li>Diseno funcional: flujos, integraciones y plan de seguridad basica.</li>
            <li>Desarrollo iterativo: sprints quincenales con demos y metricas de uso.</li>
            <li>Integracion y pruebas: QA, datos de prueba y checklist de despliegue.</li>
            <li>Go-live y soporte: formacion, soporte con SLA y roadmap de mejoras.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Casos reales / ejemplos</h2>
          <ul className="space-y-2 text-slate-700">
            <li>Ejemplos tipicos: portal de clientes con pedidos y facturacion sincronizada con ERP.</li>
            <li>Panel operativo para equipo de campo con avisos y registro de incidencias.</li>
            <li>Integracion de CRM con herramientas de marketing para eliminar tareas manuales.</li>
            <li>Automatizacion de backoffice: conciliacion de datos y generacion de reportes diarios.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Precios orientativos</h2>
          <ul className="space-y-2 text-slate-700">
            <li>Desde 6.000 EUR: herramientas internas simples con pocas pantallas y sin integraciones complejas.</li>
            <li>Desde 12.000 EUR: aplicaciones con integraciones a ERP/CRM y automatizaciones moderadas.</li>
            <li>Desde 20.000 EUR: plataformas con multiples roles, seguridad reforzada y reporting avanzado.</li>
            <li>Incluimos: QA, despliegue, documentacion y handover; soporte opcional con SLA.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl border border-brand-100 bg-white/80 p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.q}</h3>
                <p className="mt-1 text-slate-700">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Listo para empezar?</h2>
          <p className="text-slate-700">Agenda un diagnostico gratis y definimos el alcance minimo viable sin humo.</p>
          <Link className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold shadow hover:bg-brand-700" href="/#contacto">
            Ir a contacto
          </Link>
        </section>

        <section className="space-y-1 rounded-2xl border border-brand-100 bg-white/70 p-6 shadow-sm text-slate-800">
          <p className="text-lg font-semibold">Qubelia</p>
          <p>Calle Torrelodones 84B, 41016 Sevilla, Espana</p>
          <p>Tel: +34 674 569 372</p>
          <p>
            Email:{" "}
            <Link className="underline" href="mailto:daniil.kuradchyk@gmail.com">
              daniil.kuradchyk@gmail.com
            </Link>
          </p>
        </section>
      </Container>
      <Script id="ld-breadcrumb-sevilla" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-faq-sevilla" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </main>
  );
}
