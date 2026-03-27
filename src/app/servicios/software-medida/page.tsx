import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desarrollo de software a medida para pymes | Qubelia",
  description:
    "Software a medida para pymes en Sevilla. Qubelia diseña apps con integraciones y automatización para reducir errores, ganar tiempo y crecer ventas.",
  alternates: { canonical: canonical("/servicios/software-medida") },
  openGraph: {
    title: "Desarrollo de software a medida para pymes | Qubelia",
    description:
      "Software a medida para pymes en Sevilla. Qubelia diseña apps con integraciones y automatización para reducir errores, ganar tiempo y crecer ventas.",
    url: canonical("/servicios/software-medida"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de software a medida para pymes | Qubelia",
    description:
      "Software a medida para pymes en Sevilla. Qubelia diseña apps con integraciones y automatización para reducir errores, ganar tiempo y crecer ventas.",
    images: openGraphImage(),
  },
};

const problems = [
  "Duplicidad de datos y errores por trabajar en varias hojas de cálculo.",
  "Aplicaciones antiguas sin soporte que frenan ventas y servicio al cliente.",
  "Procesos críticos que dependen de personas clave sin documentación ni trazabilidad.",
  "Falta de integraciones entre ERP, CRM y herramientas internas.",
  "Reportes lentos y poco fiables que impiden decidir con datos.",
];

const results = [
  "Eficiencia operativa: menos tareas manuales y más capacidad del equipo.",
  "Menos errores: reglas de negocio y validaciones para evitar retrabajos.",
  "Datos centralizados: una sola fuente de verdad y reportes confiables.",
  "Escalabilidad: arquitectura lista para nuevas funcionalidades y volumen.",
];

const steps = [
  "Diagnóstico rápido: procesos, riesgos y objetivos de negocio claros.",
  "Alcance y diseño funcional: definimos flujos, integraciones y seguridad básica.",
  "Desarrollo iterativo: sprints cortos con demos y eventos de uso activos.",
  "Integración y pruebas: conectamos ERP/CRM y validamos con usuarios reales.",
  "Despliegue y soporte: puesta en producción, formación y roadmap de mejoras.",
];

const faqs = [
  { q: "¿Qué incluye el desarrollo de aplicaciones a medida?", a: "Discovery, diseño funcional, desarrollo, integraciones, QA, despliegue y soporte inicial." },
  { q: "¿Cuánto tarda un proyecto típico?", a: "Un primer release suele estar en 8–12 semanas según complejidad e integraciones." },
  { q: "¿Quién mantiene el software?", a: "Entregamos código y documentación. Podemos seguir como equipo de soporte o hacer handover a tu equipo." },
  { q: "¿Se puede empezar con algo más pequeño?", a: "Sí. Podemos lanzar un MVP o piloto y evolucionarlo a medida que se valida el uso." },
];

export default function SoftwareMedidaPage() {
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
          <div className="section-tag"><span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />Servicio</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Desarrollo de software a medida para pymes
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Procesos manuales, excels por todas partes y apps heredadas frenan tus ventas. En{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/">Qubelia</Link>{" "}
            hacemos consultoría de software para diseñar y construir aplicaciones a medida que se integran con tus sistemas, reducen errores y dejan a tu equipo centrarse en tareas de valor.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Trabajamos desde Sevilla con pymes de toda España. Si necesitas automatizar tareas, también podemos enlazarlo con{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/ia-automatizacion">IA y automatización</Link>{" "}
            o preparar un{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/mvp-emprendedores">MVP rápido</Link>{" "}
            para validar antes de escalar.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Problemas que resuelve el software a medida</h2>
          <ul className="space-y-3">
            {problems.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10" aria-hidden>
                  <svg className="h-3 w-3 text-sky-500 dark:text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5 10 17 19 8" /></svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cómo trabajamos en Qubelia</h2>
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Resultados que puedes esperar</h2>
          <ul className="space-y-3">
            {results.map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" aria-hidden />
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">¿Necesitas software a medida?</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Agenda un diagnóstico gratis para evaluar procesos, riesgos y el roadmap más corto hacia resultados.</p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
            <Button as="a" href="/servicios/ia-automatizacion" variant="ghost">Ver automatización con IA</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
