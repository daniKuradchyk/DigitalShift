import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Automatización de procesos con IA para pymes | Qubelia",
  description:
    "Automatización de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
  alternates: { canonical: canonical("/servicios/ia-automatizacion") },
  openGraph: {
    title: "Automatización de procesos con IA para pymes | Qubelia",
    description:
      "Automatización de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
    url: canonical("/servicios/ia-automatizacion"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatización de procesos con IA para pymes | Qubelia",
    description:
      "Automatización de procesos con IA para pymes. Qubelia analiza tareas repetitivas, propone flujos y despliega asistentes que ahorran tiempo y evitan errores.",
    images: openGraphImage(),
  },
};

const tasks = [
  "Clasificar y responder correos de soporte con asistencia humana.",
  "Extraer datos de facturas, albaranes o contratos y volcarlos en tu ERP.",
  "Generar informes recurrentes con datos validados.",
  "Flujos de aprobación y alertas automáticas para operaciones.",
  "Chatbots y asistentes internos conectados a tu base de conocimiento.",
];

const steps = [
  "Análisis: detectamos tareas repetitivas, riesgos y tiempos actuales.",
  "Propuesta: definimos flujos, modelos y controles humanos necesarios.",
  "Prototipo: versión rápida para validar calidad y ROI en semanas.",
  "Despliegue: integraciones, observabilidad y soporte al equipo.",
];

const useCases = [
  "Automatizar tareas repetitivas en atención al cliente sin perder tono.",
  "IA para pymes industriales: checklist, partes y reportes de calidad.",
  "Clasificar incidencias y enrutar tickets según SLA.",
  "Generar propuestas o reseñas iniciales a partir de plantillas y datos internos.",
];

const faqs = [
  { q: "¿Cuánto tarda un piloto?", a: "Un piloto funcional suele estar listo en 3–5 semanas con un flujo acotado." },
  { q: "¿Es seguro conectar IA a mis sistemas?", a: "Implementamos control de accesos, revisiones y registros. Empezamos sin datos sensibles y ampliamos de forma controlada." },
  { q: "¿Necesito equipo técnico interno?", a: "No es obligatorio. Dejamos documentación y formación; si tienes equipo, trabajamos en conjunto." },
  { q: "¿Qué pasa si el modelo falla?", a: "Incluimos revisiones humanas y alertas. Medimos calidad y ajustamos iterativamente." },
];

export default function IaAutomatizacionPage() {
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
          <div className="section-tag"><span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />Servicio</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            IA y automatización de procesos para pymes
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Emails repetitivos, informes manuales y flujos internos que consumen horas. En{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/">Qubelia</Link>{" "}
            aplicamos IA para pymes: asistentes, extracción documental y automatización de tareas repetitivas con control humano.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Reducimos errores, liberamos tiempo y mantenemos trazabilidad. Si necesitas escalar a un producto propio, podemos conectarlo con nuestro{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/software-medida">desarrollo de software a medida</Link>.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Qué tipo de tareas podemos automatizar</h2>
          <ul className="space-y-3">
            {tasks.map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10" aria-hidden>
                  <svg className="h-3 w-3 text-violet-500 dark:text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5 10 17 19 8" /></svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{t}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cómo trabajamos con IA en tu empresa</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-violet-200 dark:border-violet-500/20 bg-violet-50 dark:bg-violet-500/10 text-xs font-bold text-violet-600 dark:text-violet-400">{i + 1}</span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Casos de uso típicos para pymes</h2>
          <ul className="space-y-3">
            {useCases.map((u) => (
              <li key={u} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 flex-shrink-0" aria-hidden />
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{u}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Preguntas frecuentes sobre IA y automatización</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{f.q}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <p className="text-sm text-slate-500 dark:text-slate-400">
          Seguimos creando guías de IA aplicada en el{" "}
          <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/blog">blog</Link>.
          También puedes ver más sobre automatización conectada a productos propios en{" "}
          <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/software-medida">software a medida</Link>.
        </p>

        <section className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Agenda un diagnóstico gratis para ver qué puedes automatizar</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Te proponemos un piloto rápido con ROI esperado y controles claros.</p>
          <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
        </section>
      </Container>
    </main>
  );
}
