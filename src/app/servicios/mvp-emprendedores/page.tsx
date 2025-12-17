import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desarrollo de MVP para emprendedores | Qubelia",
  description:
    "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir traccion sin gastar mas.",
  alternates: { canonical: canonical("/servicios/mvp-emprendedores") },
  openGraph: {
    title: "Desarrollo de MVP para emprendedores | Qubelia",
    description:
      "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir traccion sin gastar mas.",
    url: canonical("/servicios/mvp-emprendedores"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de MVP para emprendedores | Qubelia",
    description:
      "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir traccion sin gastar mas.",
    images: openGraphImage(),
  },
};

export default function MvpEmprendedoresPage() {
  return (
    <main className="py-12 sm:py-16">
      <Container className="space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold text-brand-700">Servicio</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Desarrollo de MVP para emprendedores</h1>
          <p className="text-slate-700 max-w-3xl">
            Para quienes tienen una idea digital y necesitan validarla sin quemar presupuesto. En{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/">
              Qubelia
            </Link>{" "}
            creamos MVP a medida que se lanzan rapido, miden traccion y se pueden evolucionar sin rehacer todo.
          </p>
          <p className="text-slate-700 max-w-3xl">
            Combinamos discovery, diseno y desarrollo en sprints cortos. Si el producto escala, podemos continuar con{" "}
            <Link className="underline decoration-brand-500 underline-offset-4" href="/servicios/software-medida">
              desarrollo de software a medida
            </Link>{" "}
            para consolidar tu siguiente version.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">El problema: ideas que se quedan en la cabeza o en un PowerPoint</h2>
          <p className="text-slate-700 max-w-3xl">
            La competencia se mueve, el mercado cambia y los inversores piden evidencia. Un MVP funcional te permite validar con usuarios reales, aprender y
            decidir que merece la siguiente inversion.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Nuestra solucion: MVP funcional centrado en lo esencial</h2>
          <ul className="space-y-3 text-slate-700">
            <li>Scope reducido a la propuesta de valor minima.</li>
            <li>Eventos de uso activos para medir conversion y retencion.</li>
            <li>Infraestructura ligera y escalable para el siguiente paso.</li>
            <li>Diseño funcional claro para presentar a usuarios o inversores.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Como trabajamos el MVP</h2>
          <ol className="space-y-3 text-slate-700 list-decimal list-inside">
            <li>Descubrimiento: problema, usuarios y objetivos de negocio.</li>
            <li>Priorizacion: backlog esencial y roadmap de 6-10 semanas.</li>
            <li>Desarrollo: sprints con demos y feedback continuo.</li>
            <li>Test con usuarios: medicion de uso y mejoras rapidas.</li>
          </ol>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes sobre MVP</h2>
          <div className="space-y-3 text-slate-700">
            <div>
              <h3 className="text-lg font-semibold">Cual es el presupuesto base?</h3>
              <p>Depende del alcance, pero arrancamos con un MVP que prioriza impacto y tiempo de salida.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Que pasa tras validar?</h3>
              <p>Podemos evolucionar hacia un producto completo o hacer handover a tu equipo con documentacion.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Incluye diseno?</h3>
              <p>Si, diseno funcional y visual suficiente para presentar y vender. Podemos ampliar si lo requiere.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Cuanto dura el proyecto?</h3>
              <p>Normalmente 6-10 semanas, segun numero de funcionalidades y complejidad de integraciones.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm">
          <h2 className="text-xl font-bold tracking-tight">Cuentame tu idea y vemos que MVP tiene sentido</h2>
          <p className="text-slate-700">Agenda un diagnostico gratis para definir alcance, riesgos y siguiente release.</p>
          <div className="flex flex-wrap gap-3">
            <Link className="inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 text-white font-semibold shadow hover:bg-brand-700" href="/#contacto">
              Hablar con Qubelia
            </Link>
            <Link className="inline-flex items-center rounded-lg border border-brand-200 px-4 py-2 text-brand-800 font-semibold hover:bg-brand-50" href="/servicios/software-medida">
              Pasar a software a medida
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}
