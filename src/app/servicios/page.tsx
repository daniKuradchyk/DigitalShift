import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import { canonical, titleTemplate } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Servicios"),
  description: "Servicios de Qubelia: software a medida, diseño web, IA y automatización, MVP y datos.",
  alternates: { canonical: canonical("/servicios") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate("Servicios"),
    description: "Servicios de Qubelia: software a medida, diseño web, IA y automatización, MVP y datos.",
    url: canonical("/servicios"),
    images: [{ url: canonical("/images/og-cover.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate("Servicios"),
    description: "Servicios de Qubelia: software a medida, diseño web, IA y automatización, MVP y datos.",
    images: [canonical("/images/og-cover.png")],
  },
};

const serviceLinks = [
  { label: "Software a medida en Sevilla", href: "/sevilla/desarrollo-software-a-medida", tag: "Local SEO" },
  { label: "Software a medida",            href: "/servicios/software-medida",              tag: "Servicio" },
  { label: "Diseño web en Sevilla",        href: "/servicios/diseno-web-sevilla",           tag: "Servicio" },
  { label: "IA y automatización",          href: "/servicios/ia-automatizacion",            tag: "Servicio" },
  { label: "MVP para emprendedores",       href: "/servicios/mvp-emprendedores",            tag: "Servicio" },
];

export default function ServicesIndex() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14]">
      {/* Inline header */}
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Ir a inicio">
              <Logo />
            </Link>
            <Link href="/" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">
              ← Inicio
            </Link>
          </div>
        </Container>
      </header>

      <Container className="py-14">
        <div className="max-w-2xl">
          <div className="section-tag mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
            Servicios
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-4">
            Soluciones enfocadas a{" "}
            <span className="gradient-text-static">impacto real</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10">
            De la auditoría de procesos al software a medida, IA y automatización para pymes.
          </p>

          <ul className="space-y-3">
            {serviceLinks.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="flex items-center justify-between gap-4 rounded-xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.03] px-5 py-4 hover:border-sky-300 dark:hover:border-sky-500/30 hover:-translate-y-0.5 hover:shadow-md dark:hover:shadow-none transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-sky-400 group-hover:scale-110 transition-transform" aria-hidden />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-300 transition-colors">
                      {s.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-[0.14em]">{s.tag}</span>
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-slate-300 dark:text-slate-600 group-hover:text-sky-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button as="a" href="/#contacto" variant="shine">
              Agenda diagnóstico gratis
            </Button>
            <Button as="a" href="/" variant="ghost">
              Ver toda la web
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
