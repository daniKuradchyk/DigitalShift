import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import RoiCalculator from "./RoiCalculator";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";

const pageTitle = "Calculadora de ROI de automatización";
const pageDescription =
  "Modelo financiero para estimar el retorno de automatizar procesos: ahorro anual, payback, VAN a 3 años y rango de confianza. Basado en benchmarks UiPath, McKinsey y APQC.";

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

export default function RoiPage() {
  return (
    <main className="relative overflow-hidden">
      {/* Dark background matching the site — no white flash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--bg-page)]" />
        <div className="absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(1200px_500px_at_50%_-10%,rgba(65,105,225,0.18),transparent_70%)]" />
        <div className="absolute -left-20 top-96 h-[480px] w-[480px] rounded-full bg-[radial-gradient(closest-side,rgba(65,105,225,0.12),transparent)] blur-3xl" />
        <div className="absolute right-0 top-[680px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(91,141,239,0.08),transparent)] blur-3xl" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              .no-print { display: none !important; }
              main { background: #060B1A !important; }
              .print-break-inside-avoid { break-inside: avoid; }
            }
          `,
        }}
      />

      <Container className="pt-8 pb-20 sm:pt-12 sm:pb-24">
        {/* Top nav */}
        <nav className="no-print mb-14 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/labs"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-blue-300/80 hover:text-blue-100 hover:bg-blue-500/10 transition-all"
            >
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M10 4L6 8l4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Labs
            </Link>
            <Button as="a" href="/#contacto" variant="shine" size="sm">
              Hablar con un consultor
            </Button>
          </div>
        </nav>

        {/* Premium hero */}
        <header className="mb-16 sm:mb-20">
          <div className="max-w-4xl">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(65,105,225,0.08)] backdrop-blur-sm ring-1 ring-[rgba(65,105,225,0.25)] px-3 py-1.5 mb-8">
              <span className="flex h-1.5 w-1.5">
                <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-semibold tracking-wide text-blue-200">
                Herramienta gratuita · sin registro
              </span>
              <span className="h-3 w-px bg-blue-500/25" />
              <span className="text-[11px] font-medium text-blue-300/70">Benchmarks 2024</span>
            </div>

            <h1 className="font-bold tracking-[-0.025em] text-[#F0F4FF] text-[2.4rem] sm:text-[3.2rem] lg:text-[3.8rem] leading-[1.02]">
              Calcula el ROI real de{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  automatizar
                </span>
                <svg
                  className="absolute -bottom-2 -left-1 w-[calc(100%+8px)] z-0"
                  height="12"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M3 8 Q 80 2, 150 6 T 297 5"
                    stroke="url(#underline)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="underline" x1="0" x2="1">
                      <stop offset="0%" stopColor="#5B8DEF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#85A2FF" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              tus procesos manuales.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-blue-100/70">
              Modelo financiero que estima <span className="font-semibold text-[#F0F4FF]">ahorro anual</span>,{" "}
              <span className="font-semibold text-[#F0F4FF]">payback</span> y{" "}
              <span className="font-semibold text-[#F0F4FF]">VAN a 3 años</span> con rango de confianza.
              Listo para presentar al comité de inversión en menos de 3 minutos.
            </p>

            {/* Trust stats with subtle separators */}
            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
              {[
                { k: "Modelo financiero", v: "VAN + payback + ROI" },
                { k: "Fuentes citadas", v: "UiPath, McKinsey, APQC" },
                { k: "Privacidad", v: "Solo en tu navegador" },
              ].map((s, i) => (
                <div key={s.k} className="flex items-center gap-10">
                  {i > 0 && <span className="hidden sm:block h-8 w-px bg-blue-500/20" />}
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300/60">
                      {s.k}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[#F0F4FF]">{s.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Calculator */}
        <RoiCalculator />
      </Container>
    </main>
  );
}
