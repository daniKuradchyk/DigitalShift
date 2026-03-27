import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { canonical, openGraphImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Desarrollo de MVP para emprendedores | Qubelia",
  description:
    "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir tracción sin gastar más.",
  alternates: { canonical: canonical("/servicios/mvp-emprendedores") },
  openGraph: {
    title: "Desarrollo de MVP para emprendedores | Qubelia",
    description:
      "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir tracción sin gastar más.",
    url: canonical("/servicios/mvp-emprendedores"),
    images: openGraphImage(),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo de MVP para emprendedores | Qubelia",
    description:
      "Desarrollo de MVP para emprendedores. Qubelia prioriza funcionalidades esenciales, valida con usuarios y entrega en semanas para medir tracción sin gastar más.",
    images: openGraphImage(),
  },
};

const solution = [
  "Scope reducido a la propuesta de valor mínima.",
  "Eventos de uso activos para medir conversión y retención.",
  "Infraestructura ligera y escalable para el siguiente paso.",
  "Diseño funcional claro para presentar a usuarios o inversores.",
];

const steps = [
  "Descubrimiento: problema, usuarios y objetivos de negocio.",
  "Priorización: backlog esencial y roadmap de 6–10 semanas.",
  "Desarrollo: sprints con demos y feedback continuo.",
  "Test con usuarios: medición de uso y mejoras rápidas.",
];

const faqs = [
  { q: "¿Cuál es el presupuesto base?", a: "Depende del alcance, pero arrancamos con un MVP que prioriza impacto y tiempo de salida al mercado." },
  { q: "¿Qué pasa tras validar?", a: "Podemos evolucionar hacia un producto completo o hacer handover a tu equipo con documentación." },
  { q: "¿Incluye diseño?", a: "Sí, diseño funcional y visual suficiente para presentar y vender. Podemos ampliar si lo requiere." },
  { q: "¿Cuánto dura el proyecto?", a: "Normalmente 6–10 semanas, según número de funcionalidades y complejidad de integraciones." },
];

export default function MvpEmprendedoresPage() {
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
          <div className="section-tag"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />Servicio</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Desarrollo de MVP para emprendedores
          </h1>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Para quienes tienen una idea digital y necesitan validarla sin quemar presupuesto. En{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/">Qubelia</Link>{" "}
            creamos MVPs a medida que se lanzan rápido, miden tracción y se pueden evolucionar sin rehacer todo.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Combinamos discovery, diseño y desarrollo en sprints cortos. Si el producto escala, podemos continuar con{" "}
            <Link className="text-sky-600 dark:text-sky-400 hover:underline" href="/servicios/software-medida">desarrollo de software a medida</Link>{" "}
            para consolidar tu siguiente versión.
          </p>
        </header>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">El problema: ideas que se quedan en la cabeza o en un PowerPoint</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            La competencia se mueve, el mercado cambia y los inversores piden evidencia. Un MVP funcional te permite validar con usuarios reales, aprender y decidir qué merece la siguiente inversión.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Nuestra solución: MVP funcional centrado en lo esencial</h2>
          <ul className="space-y-3">
            {solution.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" aria-hidden>
                  <svg className="h-3 w-3 text-emerald-500 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12.5 10 17 19 8" /></svg>
                </span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Cómo trabajamos el MVP</h2>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-none items-center justify-center rounded-lg border border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">{i + 1}</span>
                <span className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Preguntas frecuentes sobre MVP</h2>
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
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cuéntame tu idea y vemos qué MVP tiene sentido</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Agenda un diagnóstico gratis para definir alcance, riesgos y siguiente release.</p>
          <div className="flex flex-wrap gap-3">
            <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
            <Button as="a" href="/servicios/software-medida" variant="ghost">Pasar a software a medida</Button>
          </div>
        </section>
      </Container>
    </main>
  );
}
