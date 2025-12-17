import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desarrollo de software a medida para pymes | Qubelia",
  description:
    "Software a medida para pymes en Sevilla. Qubelia disena apps con integraciones y automatizacion para reducir errores, ganar tiempo y crecer ventas.",
  alternates: { canonical: canonical("/servicios/software-medida") },
  openGraph: {
    title: "Desarrollo de software a medida para pymes | Qubelia",
    description:
      "Software a medida para pymes en Sevilla. Qubelia disena apps con integraciones y automatizacion para reducir errores, ganar tiempo y crecer ventas.",
    url: canonical("/servicios/software-medida"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de software a medida para pymes | Qubelia",
    description:
      "Software a medida para pymes en Sevilla. Qubelia disena apps con integraciones y automatizacion para reducir errores, ganar tiempo y crecer ventas.",
    images: openGraphImage(),
  },
};

export default function SoftwareMedidaPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-brand-700">Servicio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Desarrollo de software a medida para pymes</h1>
          <p className="text-slate-700 max-w-3xl">
            Procesos manuales, excels por todas partes y apps heredadas frenan tus ventas. En{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/">
              Qubelia
            </Link>{" "}
            hacemos consultoria de software para disenar y construir desarrollo de aplicaciones a medida que se integra con tus sistemas, reduce errores y deja a
            tu equipo centrarse en tareas de valor.
          </p>
          <p className="text-slate-700 max-w-3xl">
            Trabajamos desde Sevilla con pymes de toda Espana. Si necesitas automatizar tareas, tambien podemos enlazarlo con{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/ia-automatizacion">
              IA y automatizacion
            </Link>{" "}
            o preparar un{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/mvp-emprendedores">
              MVP rapido
            </Link>{" "}
            para validar antes de escalar.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Problemas que resuelve el software a medida</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Duplicidad de datos y errores por trabajar en varias hojas de calculo.</li>
            <li>Aplicaciones antiguas sin soporte que frenan ventas y servicio al cliente.</li>
            <li>Procesos criticos que dependen de personas clave sin documentacion ni trazabilidad.</li>
            <li>Falta de integraciones entre ERP, CRM y herramientas internas.</li>
            <li>Reportes lentos y poco fiables que impiden decidir con datos.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Como trabajamos en Qubelia</h2>
          <ol className="space-y-3 text-slate-700 list-decimal list-inside">
            <li>Diagnostico rapido: procesos, riesgos y objetivos de negocio claros.</li>
            <li>Alcance y diseno funcional: definimos flujos, integraciones y seguridad basica.</li>
            <li>Desarrollo iterativo: sprints cortos con demos y eventos de uso activos.</li>
            <li>Integracion y pruebas: conectamos ERP/CRM y validamos con usuarios reales.</li>
            <li>Despliegue y soporte: puesta en produccion, formacion y roadmap de mejoras.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Resultados que puedes esperar</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Eficiencia operativa: menos tareas manuales y mas capacidad del equipo.</li>
            <li>Menos errores: reglas de negocio y validaciones para evitar retrabajos.</li>
            <li>Datos centralizados: una sola fuente de verdad y reportes confiables.</li>
            <li>Escalabilidad: arquitectura lista para nuevas funcionalidades y volumen.</li>
            <li>Software a medida para pymes que mejora la experiencia de cliente.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes</h2>
          <div className="space-y-3 text-slate-700">
            <div>
              <h3 className="text-lg font-semibold">Que incluye el desarrollo de aplicaciones a medida?</h3>
              <p>Discovery, diseno funcional, desarrollo, integraciones, QA, despliegue y soporte inicial.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cuanto tarda un proyecto tipico?</h3>
              <p>Un primer release suele estar en 8-12 semanas segun complejidad e integraciones.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quien mantiene el software?</h3>
              <p>Entregamos codigo y documentacion. Podemos seguir como equipo de soporte o hacer handover a tu equipo.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Se puede empezar con algo mas pequeno?</h3>
              <p>Si. Podemos lanzar un MVP o piloto y evolucionarlo a medida que se valida el uso.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Necesitas software a medida?</h2>
          <p className="text-slate-700">Agenda un diagnostico gratis para evaluar procesos, riesgos y el roadmap mas corto hacia resultados.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold shadow hover:bg-brand-700" href="/#contacto">
              Hablar con Qubelia
            </Link>
            <Link className="inline-flex items-center rounded-lg border border-brand-200 px-4 py-2 text-brand-800 font-semibold hover:bg-brand-50" href="/servicios/ia-automatizacion">
              Ver automatizacion con IA
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
