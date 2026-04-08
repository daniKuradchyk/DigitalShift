import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import RoiCalculator from "./RoiCalculator";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Calculadora de ROI de automatización";
const pageDescription =
  "Calcula en 2 minutos el ahorro de automatizar un proceso en tu empresa: coste operativo, horas recuperables, payback y nivel de oportunidad.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/labs/roi-automatizacion") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/labs/roi-automatizacion"),
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
    siteName: "Qubelia",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate(pageTitle),
    description: pageDescription,
    images: openGraphImage(),
  },
};

export const revalidate = 86400;

const WHAT_IT_ESTIMATES = [
  "Coste operativo real del proceso actual",
  "Horas recuperables por persona y mes",
  "Ahorro anual potencial tras automatizar",
  "Payback estimado de la inversión",
  "Nivel de oportunidad: alta, media o baja",
];

export default function RoiPage() {
  return (
    <main className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-indigo-50/40 via-white/20 to-sky-50/40 dark:from-slate-950/40 dark:via-slate-900/20 dark:to-slate-950/40">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-indigo-300/10 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-700/10" />
      </div>

      <Container>
        {/* Nav */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Button as="a" href="/labs" variant="ghost">Volver a Labs</Button>
            <Button as="a" href="/#contacto" variant="shine">Pedir diagnóstico</Button>
          </div>
        </div>

        {/* Hero intro */}
        <section
          aria-labelledby="roi-hero-title"
          className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start mb-12"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 dark:border-indigo-500/30 bg-indigo-50/80 dark:bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
              Herramienta gratuita
            </div>

            <div className="max-w-xl space-y-3">
              <h1
                id="roi-hero-title"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
              >
                Calculadora de ROI<br className="hidden sm:block" /> de automatización
              </h1>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Introduce los datos de tu proceso manual y calcula en 2 minutos el ahorro
                potencial, las horas recuperables y el tiempo de retorno de la inversión.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Tiempo", value: "2 min" },
                { label: "Resultado", value: "Inmediato" },
                { label: "Registro", value: "No requerido" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/80 dark:bg-white/[0.03] p-4 shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    {s.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-5 sm:p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400 mb-4">
                Esta calculadora estima
              </p>
              <ul className="space-y-3">
                {WHAT_IT_ESTIMATES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-indigo-100 dark:border-indigo-500/40 bg-indigo-50/80 dark:bg-indigo-500/10 px-4 py-3 text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
              Los datos se calculan en tu navegador. No se almacena ninguna información.
            </div>
          </aside>
        </section>

        {/* Calculator */}
        <RoiCalculator />
      </Container>
    </main>
  );
}
