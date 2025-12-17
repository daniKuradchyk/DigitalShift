import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Diseno web en Sevilla para pymes y emprendedores | Qubelia",
  description:
    "Diseno web en Sevilla para pymes y emprendedores. Qubelia crea sitios rapidos y claros que convierten visitas en leads con SEO basico y analitica lista.",
  alternates: { canonical: canonical("/servicios/diseno-web-sevilla") },
  openGraph: {
    title: "Diseno web en Sevilla para pymes y emprendedores | Qubelia",
    description:
      "Diseno web en Sevilla para pymes y emprendedores. Qubelia crea sitios rapidos y claros que convierten visitas en leads con SEO basico y analitica lista.",
    url: canonical("/servicios/diseno-web-sevilla"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diseno web en Sevilla para pymes y emprendedores | Qubelia",
    description:
      "Diseno web en Sevilla para pymes y emprendedores. Qubelia crea sitios rapidos y claros que convierten visitas en leads con SEO basico y analitica lista.",
    images: openGraphImage(),
  },
};

export default function DisenoWebSevillaPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-brand-700">Servicio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Diseno web en Sevilla para pymes y emprendedores</h1>
          <p className="text-slate-700 max-w-3xl">
            Pymes, profesionales y emprendedores en Sevilla que necesitan una web que convierta y no solo se vea bien. En{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/">
              Qubelia
            </Link>{" "}
            disenamos y desarrollamos sitios rapidos, claros y listos para captar leads.
          </p>
          <p className="text-slate-700 max-w-3xl">
            Mas imagen y mas negocio: copy orientado a conversion, SEO on-page basico y analitica configurada para medir formularios y llamadas. Si despues
            necesitas integraciones o{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/software-medida">
              desarrollo de software a medida
            </Link>
            , lo tenemos en casa.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Por que tu pyme en Sevilla necesita una web que convierta?</h2>
          <p className="text-slate-700 max-w-3xl">
            Competencia local, publicidad que cuesta y visitas que no siempre rellenan un formulario. Una web clara y rapida reduce rebotes, explica tu valor y
            convierte visitas en oportunidades reales.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Que incluye nuestro servicio de diseno web</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Diseno y maquetacion centrados en conversion, no solo estetica.</li>
            <li>Copywriting orientado a leads y a resolver objeciones.</li>
            <li>Responsive completo para movil y desktop.</li>
            <li>SEO on-page basico: metadatos, headings y rendimiento.</li>
            <li>Integracion con analitica y eventos en formularios y llamadas.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Proceso de trabajo</h2>
          <ol className="space-y-3 text-slate-700 list-decimal list-inside">
            <li>Auditoria y objetivos: negocio, buyer persona y referencias.</li>
            <li>Propuesta de estructura y copy base.</li>
            <li>Diseno visual y componentes.</li>
            <li>Desarrollo, SEO on-page y analitica.</li>
            <li>Lanzamiento y checklist tecnico.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes sobre diseno web en Sevilla</h2>
          <div className="space-y-3 text-slate-700">
            <div>
              <h3 className="text-lg font-semibold">Cuanto tarda un proyecto?</h3>
              <p>Entre 3 y 6 semanas segun numero de paginas y si hay integraciones adicionales.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Incluye textos y fotos?</h3>
              <p>Incluimos copy orientado a conversion. Podemos usar tu material o seleccionar recursos libres.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Como medimos resultados?</h3>
              <p>Configuramos eventos en formularios, llamadas y clicks clave. Acceso a panel con metricas basicas.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Y si necesito algo mas complejo?</h3>
              <p>Si requieres integraciones o aplicaciones, conectamos con nuestro equipo de software a medida.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Trabajamos solo en Sevilla?</h2>
          <p className="text-slate-700 max-w-3xl">
            Estamos en Sevilla y podemos reunirnos en persona, pero trabajamos en remoto con pymes y emprendedores de toda Espana. Misma calidad y tiempos de
            respuesta.
          </p>
        </section>

        <section className="space-y-3 text-slate-700">
          <p>
            Si quieres saber que debe tener una landing page que convierte, visita nuestro{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/blog">
              blog
            </Link>
            . Si buscas algo mas que una web corporativa, revisa nuestro servicio de{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/software-medida">
              desarrollo de software a medida
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Listo para una web que genere clientes?</h2>
          <p className="text-slate-700">Agenda un diagnostico gratis y te contamos que cambios priorizar para mejorar conversion.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold shadow hover:bg-brand-700" href="/#contacto">
              Hablar con Qubelia
            </Link>
            <Link className="inline-flex items-center rounded-lg border border-brand-200 px-4 py-2 text-brand-800 font-semibold hover:bg-brand-50" href="/servicios/software-medida">
              Ver software a medida
            </Link>
          </div>
        </section>

        <section className="space-y-1 rounded-2xl border border-brand-100 bg-white/70 p-6 shadow-sm text-slate-800">
          <p className="text-lg font-semibold">Qubelia</p>
          <p>Calle Torrelodones 84B, 41016 Sevilla, Espana</p>
          <p>Telefono: 674 569 372</p>
          <p>
            Email:{" "}
            <Link className="underline" href="mailto:daniil.kuradchyk@gmail.com">
              daniil.kuradchyk@gmail.com
            </Link>
          </p>
        </section>
      </Container>
    </main>
  );
}
