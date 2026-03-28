import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { canonical, openGraphImage } from "@/lib/seo";
import { CONTACT } from "@/config/contact";

export const metadata: Metadata = {
  title: "Diseño web en Sevilla para pymes y emprendedores | Qubelia",
  description:
    "Diseño web en Sevilla para pymes y emprendedores. Qubelia crea sitios rápidos y claros que convierten visitas en leads con SEO básico y analítica lista.",
  alternates: { canonical: canonical("/servicios/diseno-web-sevilla") },
  openGraph: {
    title: "Diseño web en Sevilla para pymes y emprendedores | Qubelia",
    description:
      "Diseño web en Sevilla para pymes y emprendedores. Qubelia crea sitios rápidos y claros que convierten visitas en leads con SEO básico y analítica lista.",
    url: canonical("/servicios/diseno-web-sevilla"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseño web en Sevilla para pymes y emprendedores | Qubelia",
    description:
      "Diseño web en Sevilla para pymes y emprendedores. Qubelia crea sitios rápidos y claros que convierten visitas en leads con SEO básico y analítica lista.",
    images: openGraphImage(),
  },
};

const includes = [
  "Diseño y maquetación centrados en conversión, no solo estética.",
  "Copywriting orientado a leads y a resolver objeciones.",
  "Responsive completo para móvil y desktop.",
  "SEO on-page básico: metadatos, headings y rendimiento.",
  "Integración con analítica y eventos en formularios y llamadas.",
];

const steps = [
  "Auditoría y objetivos: negocio, buyer persona y referencias.",
  "Propuesta de estructura y copy base.",
  "Diseño visual y componentes.",
  "Desarrollo, SEO on-page y analítica.",
  "Lanzamiento y checklist técnico.",
];

const faqs = [
  { q: "¿Cuánto tarda un proyecto?", a: "Entre 3 y 6 semanas según número de páginas y si hay integraciones adicionales." },
  { q: "¿Incluye textos y fotos?", a: "Incluimos copy orientado a conversión. Podemos usar tu material o seleccionar recursos libres." },
  { q: "¿Cómo medimos resultados?", a: "Configuramos eventos en formularios, llamadas y clicks clave. Acceso a panel con métricas básicas." },
  { q: "¿Y si necesito algo más complejo?", a: "Si requieres integraciones o aplicaciones, conectamos con nuestro equipo de software a medida." },
];

export default function DisenoWebSevillaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14]">
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Inicio"><Logo /></Link>
            <Link href="/servicios" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">← Servicios</Link>
          </div>
        </Container>
      </header>

      <Container className="py-14 space-y-14">
        <header className="max-w-3xl space-y-4">
          <div className="section-tag"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />Servicio · Sevilla</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Diseño web en Sevilla para pymes y emprendedores
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Pymes, profesionales y emprendedores en Sevilla que necesitan una web que convierta y no solo se vea bien. En{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/">Qubelia</Link>{" "}
            diseñamos y desarrollamos sitios rápidos, claros y listos para captar leads.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Más imagen y más negocio: copy orientado a conversión, SEO on-page básico y analítica configurada para medir formularios y llamadas. Si después
            necesitas integraciones o{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/software-medida">desarrollo de software a medida</Link>, lo tenemos en casa.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">¿Por qué tu pyme en Sevilla necesita una web que convierta?</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            Competencia local, publicidad que cuesta y visitas que no siempre rellenan un formulario. Una web clara y rápida reduce rebotes, explica tu valor y convierte visitas en oportunidades reales.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Qué incluye nuestro servicio de diseño web</h2>
          <ul className="space-y-3">
            {includes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10" aria-hidden>
                  <svg className="h-3 w-3 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5 10 17 19 8" /></svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Preguntas frecuentes sobre diseño web en Sevilla</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">¿Trabajamos solo en Sevilla?</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-3xl">
            Estamos en Sevilla y podemos reunirnos en persona, pero trabajamos en remoto con pymes y emprendedores de toda España. Misma calidad y tiempos de respuesta.
          </p>
        </section>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Si quieres saber qué debe tener una landing page que convierte, visita nuestro{" "}
          <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/blog">blog</Link>.
          Si buscas algo más que una web corporativa, revisa nuestro servicio de{" "}
          <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/software-medida">desarrollo de software a medida</Link>.
        </p>

        <section className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">¿Listo para una web que genere clientes?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Agenda un diagnóstico gratis y te contamos qué cambios priorizar para mejorar conversión.</p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
            <Button as="a" href="/servicios/software-medida" variant="ghost">Ver software a medida</Button>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-5 text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <p className="font-bold text-slate-900 dark:text-white">Qubelia</p>
          <p>Calle Torrelodones 84B, 41016 Sevilla, España</p>
          <p>Tel: +34 674 569 372</p>
          <p>Email: <Link className="text-sky-600 dark:text-sky-400 hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link></p>
        </section>
      </Container>
    </main>
  );
}
