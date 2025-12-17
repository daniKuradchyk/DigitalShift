import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automatizacion de procesos con IA para pymes | Qubelia",
  description:
    "Automatizacion de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
  alternates: { canonical: canonical("/servicios/ia-automatizacion") },
  openGraph: {
    title: "Automatizacion de procesos con IA para pymes | Qubelia",
    description:
      "Automatizacion de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
    url: canonical("/servicios/ia-automatizacion"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatizacion de procesos con IA para pymes | Qubelia",
    description:
      "Automatizacion de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
    images: openGraphImage(),
  },
};

export default function IaAutomatizacionPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-brand-700">Servicio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">IA y automatizacion de procesos para pymes</h1>
          <p className="text-slate-700 max-w-3xl">
            Emails repetitivos, informes manuales y flujos internos que consumen horas. En{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/">
              Qubelia
            </Link>{" "}
            aplicamos IA para pymes: asistentes, extraccion documental y automatizacion de tareas repetitivas con control humano.
          </p>
          <p className="text-slate-700 max-w-3xl">
            Reducimos errores, liberamos tiempo y mantenemos trazabilidad. Si necesitas escalar a un producto propio, podemos conectarlo con nuestro{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/software-medida">
              desarrollo de software a medida
            </Link>
            .
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Que tipo de tareas podemos automatizar</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Clasificar y responder correos de soporte con asistencia humana.</li>
            <li>Extraer datos de facturas, albaranes o contratos y volcarlos en tu ERP.</li>
            <li>Generar informes recurrentes con datos validados.</li>
            <li>Flujos de aprobacion y alertas automáticas para operaciones.</li>
            <li>Chatbots y asistentes internos conectados a tu base de conocimiento.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Como trabajamos con IA en tu empresa</h2>
          <ol className="space-y-3 text-slate-700 list-decimal list-inside">
            <li>Analisis: detectamos tareas repetitivas, riesgos y tiempos actuales.</li>
            <li>Propuesta: definimos flujos, modelos y controles humanos necesarios.</li>
            <li>Prototipo: version rapida para validar calidad y ROI en semanas.</li>
            <li>Despliegue: integraciones, observabilidad y soporte al equipo.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Casos de uso tipicos para pymes</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Automatizar tareas repetitivas en atencion al cliente sin perder tono.</li>
            <li>IA para pymes industriales: checklist, partes y reportes de calidad.</li>
            <li>Clasificar incidencias y enrutar tickets segun SLA.</li>
            <li>Generar propuestas o resenas iniciales a partir de plantillas y datos internos.</li>
            <li>Consultoria de inteligencia artificial para priorizar donde empezar y medir ROI.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes sobre IA y automatizacion</h2>
          <div className="space-y-3 text-slate-700">
            <div>
              <h3 className="text-lg font-semibold">Cuanto tarda un piloto?</h3>
              <p>Un piloto funcional suele estar listo en 3-5 semanas con un flujo acotado.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Es seguro conectar IA a mis sistemas?</h3>
              <p>Implementamos control de accesos, revisiones y registros. Empezamos sin datos sensibles y ampliamos de forma controlada.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Necesito equipo tecnico interno?</h3>
              <p>No es obligatorio. Dejamos documentacion y formacion; si tienes equipo, trabajamos en conjunto.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Que pasa si el modelo falla?</h3>
              <p>Incluimos revisiones humanas y alertas. Medimos calidad y ajustamos iterativamente.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 text-slate-700">
          <p>
            Seguimos creando guias de IA aplicada en el{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/blog">
              blog
            </Link>
            . Tambien puedes ver mas sobre automatizacion conectada a productos propios en{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/software-medida">
              software a medida
            </Link>
            .
          </p>
        </section>

        <section className="space-y-3 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Agenda un diagnostico gratis para ver que puedes automatizar</h2>
          <p className="text-slate-700">Te proponemos un piloto rapido con ROI esperado y controles claros.</p>
          <Link className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold shadow hover:bg-brand-700" href="/#contacto">
            Hablar con Qubelia
          </Link>
        </section>
      </Container>
    </main>
  );
}
