import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { absoluteUrl } from "@/lib/urls";
import { openGraphImage } from "@/lib/seo";
import { CONTACT } from "@/config/contact";

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

const types = [
  "Aplicaciones web internas y portales de clientes.",
  "APIs y microservicios para conectar ERP, CRM y ecommerce.",
  "Dashboards operativos y reporting en tiempo real.",
  "Automatización de tareas repetitivas con IA ligera.",
  "Herramientas de backoffice a medida para equipos de operaciones y ventas.",
];

const problems = [
  "Datos duplicados entre Excel, ERP y CRM que generan errores.",
  "Procesos críticos dependientes de personas clave y sin trazabilidad.",
  "Apps antiguas lentas o sin soporte que frenan ventas y atención al cliente.",
  "Falta de integraciones y automatización que obliga a tareas manuales.",
  "Reportes poco fiables y decisiones con información incompleta.",
];

const steps = [
  "Diagnóstico express: objetivos, riesgos y backlog priorizado en 72 h.",
  "Diseño funcional: flujos, integraciones y plan de seguridad básica.",
  "Desarrollo iterativo: sprints quincenales con demos y métricas de uso.",
  "Integración y pruebas: QA, datos de prueba y checklist de despliegue.",
  "Go-live y soporte: formación, soporte con SLA y roadmap de mejoras.",
];

const prices = [
  "Desde 6.000 €: herramientas internas simples con pocas pantallas y sin integraciones complejas.",
  "Desde 12.000 €: aplicaciones con integraciones a ERP/CRM y automatizaciones moderadas.",
  "Desde 20.000 €: plataformas con múltiples roles, seguridad reforzada y reporting avanzado.",
  "Incluimos: QA, despliegue, documentación y handover; soporte opcional con SLA.",
];

const faqs = [
  { q: "¿Cuánto tarda un proyecto de software a medida?", a: "Depende del alcance y las integraciones. Un primer release suele estar en 8–12 semanas con demos quincenales." },
  { q: "¿Podéis integrar mi ERP o CRM actual?", a: "Sí. Diseñamos APIs y conectores a medida para ERP, CRM y herramientas internas, cuidando seguridad y trazabilidad." },
  { q: "¿Ofrecéis mantenimiento y soporte?", a: "Entregamos código, accesos y documentación. Podemos seguir con soporte con SLA o hacer handover a tu equipo." },
  { q: "¿Es mejor empezar con un MVP?", a: "Si hay incertidumbre de modelo o funcionalidades, empezamos con un MVP acotado y luego evolucionamos sin rehacer." },
  { q: "¿Trabajáis solo en Sevilla?", a: "Estamos en Sevilla y podemos reunirnos en persona. También trabajamos en remoto con pymes de toda España." },
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
    <main className="min-h-screen bg-white dark:bg-[#050A14]">
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Inicio"><Logo /></Link>
            <Link href="/" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">← Inicio</Link>
          </div>
        </Container>
      </header>

      <Container className="py-14 space-y-14">
        <header className="max-w-3xl space-y-4">
          <div className="section-tag"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />Sevilla · Software a medida</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Desarrollo de software a medida en Sevilla
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Pymes con procesos manuales, hojas de cálculo duplicadas y aplicaciones heredadas pierden tiempo y ventas. Cuando los sistemas no hablan entre sí, los equipos repiten tareas y crecen los errores.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            En Qubelia diseñamos y construimos software a medida en Sevilla: aplicaciones web, backends e integraciones que automatizan procesos y dejan todo trazable. Entregas quincenales, seguridad básica y soporte cercano.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Qué tipo de software a medida desarrollamos</h2>
          <ul className="space-y-3">
            {types.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10" aria-hidden>
                  <svg className="h-3 w-3 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5 10 17 19 8" /></svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Problemas que resolvemos en pymes</h2>
          <ul className="space-y-3">
            {problems.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-sky-400/70 flex-shrink-0" aria-hidden />
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Proceso de trabajo</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10 text-xs font-bold text-sky-600 dark:text-sky-400">{i + 1}</span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Precios orientativos</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {prices.map((p) => (
              <div key={p} className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {p}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Preguntas frecuentes</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">¿Listo para empezar?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Agenda un diagnóstico gratis y definimos el alcance mínimo viable sin humo.</p>
          <Button as="a" href="/#contacto" variant="shine">Ir a contacto</Button>
        </section>

        <section className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">Qubelia</p>
          <p>Calle Torrelodones 84B, 41016 Sevilla, España</p>
          <p>Tel: +34 674 569 372</p>
          <p>Email: <Link className="text-sky-600 dark:text-sky-400 hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link></p>
        </section>
      </Container>

      <Script id="ld-breadcrumb-sevilla" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Script id="ld-faq-sevilla" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </main>
  );
}
