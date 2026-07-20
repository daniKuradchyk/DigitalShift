import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import AuditWizard from "./AuditWizard";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Análisis gratuito de tu negocio";
const pageDescription =
  "Autodiagnostico en 5-8 min para pymes y autonomos. Detecta puntos flojos, quick wins y un roadmap 30-90 dias sin registro.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/labs/analisis-gratis") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/labs/analisis-gratis"),
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

const stats = [
  { label: "Tiempo", value: "5-8 min" },
  { label: "Resultado", value: "Inmediato" },
  { label: "Registro", value: "No requerido" },
];

const benefits = [
  "Resumen ejecutivo con prioridades reales.",
  "Puntos flojos + quick wins en 7 dias.",
  "Roadmap 30-90 dias y matriz impacto/esfuerzo.",
  "PDF descargable sin email obligatorio.",
];

export default function AuditPage() {
  return (
    <main className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-sky-50/40 via-white/20 to-sky-50/40 dark:from-slate-950/40 dark:via-slate-900/20 dark:to-slate-950/40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-700/10" />
      </div>

      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Button as="a" href="/labs" variant="ghost">Volver a Labs</Button>
            <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
          </div>
        </div>

        <section className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Herramienta gratuita
            </div>
            <div className="max-w-xl space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Análisis gratuito de tu negocio</h1>
              <p className="text-slate-700 dark:text-slate-300">
                Autodiagnostico rapido para pymes y autonomos. Detecta puntos flojos, quick wins y un plan de 30-90 dias en minutos.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#analisis" variant="shine" className="w-full sm:w-auto">Analizar ahora</Button>
              <Button as="a" href="/#contacto" variant="ghost" className="w-full sm:w-auto">Adaptar a mi empresa</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((s, index) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/85 dark:bg-white/[0.03] p-4 shadow-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">0{index + 1}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-sky-100 dark:border-sky-500/40 bg-sky-50/80 dark:bg-sky-500/10 px-4 py-3 text-xs text-sky-700 dark:text-sky-300">
              Te llevara 5-8 min. Resultado inmediato. Sin registro. Email opcional.
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white/90 dark:bg-white/[0.03] p-4 sm:p-6 shadow-sm backdrop-blur-sm dark:border-white/[0.07]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Incluye</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {benefits.map((b, index) => (
                  <li key={b} className="flex items-start gap-3 rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/80 dark:bg-white/[0.02] p-3 shadow-sm">
                    <span className="mt-0.5 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-sky-100 dark:border-sky-500/30 bg-sky-50 dark:bg-sky-500/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-sky-100 dark:border-sky-500/40 bg-sky-50/80 dark:bg-sky-500/10 p-4 text-sm text-sky-700 dark:text-sky-300">
                Sin registro obligatorio. Solo pedimos email si quieres el PDF o una llamada.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-4 sm:p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Privacidad</p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                Cumplimos RGPD. Tus datos se usan solo para generar el informe y, si lo pides, enviarte el PDF.
              </p>
            </div>
          </aside>
        </section>

        <section id="analisis" className="mt-12">
          <AuditWizard />
        </section>
      </Container>
    </main>
  );
}

