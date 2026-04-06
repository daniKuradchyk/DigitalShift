import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import { buildMetadata } from "@/lib/seo";
import labs from "@/content/labs.json";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Labs Qubelia | Herramientas gratuitas para empresas",
  description:
    "Calculadoras, análisis y herramientas gratuitas para pymes y empresas B2B. ROI de automatización, coste de software, auditoría web y más.",
  path: "/labs",
});

type Lab = typeof labs[number];

const accentMap: Record<string, { icon: string; badge: string; border: string; bg: string }> = {
  "roi-automatizacion": {
    icon: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20",
    badge: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
    border: "border-indigo-200/80 dark:border-indigo-500/20",
    bg: "hover:shadow-indigo-100 dark:hover:shadow-indigo-500/5",
  },
  "analisis-gratis": {
    icon: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-500/10 border-sky-200 dark:border-sky-500/20",
    badge: "bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-500/20",
    border: "border-sky-200/80 dark:border-sky-500/20",
    bg: "hover:shadow-sky-100 dark:hover:shadow-sky-500/5",
  },
  "calculadora-coste-software": {
    icon: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20",
    badge: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
    border: "border-rose-200/80 dark:border-rose-500/20",
    bg: "hover:shadow-rose-100 dark:hover:shadow-rose-500/5",
  },
  "calculadora-irpf-autonomos": {
    icon: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20",
    badge: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    border: "border-emerald-200/80 dark:border-emerald-500/20",
    bg: "hover:shadow-emerald-100 dark:hover:shadow-emerald-500/5",
  },
  "generador-brief-proyecto": {
    icon: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20",
    badge: "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-500/20",
    border: "border-violet-200/80 dark:border-violet-500/20",
    bg: "",
  },
  "checklist-rgpd-basico": {
    icon: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20",
    badge: "bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
    border: "border-amber-200/80 dark:border-amber-500/20",
    bg: "",
  },
};

function getAccent(slug: string) {
  return accentMap[slug] ?? accentMap["analisis-gratis"];
}

function LabIcon({ slug }: { slug: string }) {
  if (slug === "roi-automatizacion") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m6 16 4-6 4 4 5-8" />
        <circle cx="6" cy="16" r="1" fill="currentColor" stroke="none" />
        <circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="14" r="1" fill="currentColor" stroke="none" />
        <circle cx="19" cy="6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (slug === "calculadora-irpf-autonomos") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    );
  }
  if (slug === "calculadora-coste-software") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <rect x="8" y="6" width="8" height="3" rx="1" />
        <path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 17h.01M12 17h.01M15.5 17h.01" />
      </svg>
    );
  }
  if (slug === "analisis-gratis") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m7 15 3-4 4 3 4-6" />
        <circle cx="10" cy="11" r="1" />
      </svg>
    );
  }
  if (slug === "generador-brief-proyecto") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" />
        <path d="M14 3v4h4M8 13h8M8 17h6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l2 2 4-4" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
}

function isComingSoon(status: string) {
  return (status ?? "").toLowerCase().includes("camino");
}

export default function LabsPage() {
  const available = labs.filter((t) => !isComingSoon(t.status));

  return (
    <main className="relative overflow-hidden min-h-screen bg-white dark:bg-[#050A14]">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -left-20 top-20 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(56,189,248,0.4)" }} />
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(129,140,248,0.4)" }} />
      </div>

      {/* Inline header */}
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Ir a inicio" className="flex items-center gap-2">
              <Logo />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 18l-6-6 6-6" />
              </svg>
              Inicio
            </Link>
          </div>
        </Container>
      </header>

      <Container className="py-14">
        {/* Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-tag mb-5 mx-auto w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} aria-hidden />
            Laboratorio abierto
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-4">
            Herramientas{" "}
            <span className="gradient-text-static">gratuitas</span>
            {" "}para tu negocio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Calculadoras, plantillas y análisis listos para usar. Sin registro, sin coste. Si necesitas adaptarlos a tu empresa,{" "}
            <a href="/#contacto" className="text-sky-600 dark:text-sky-400 hover:underline">hablamos</a>.
          </p>

          {/* Stats */}
          <div className="inline-flex items-center divide-x divide-slate-200 dark:divide-white/[0.08] border border-slate-200/80 dark:border-white/[0.07] rounded-2xl bg-white dark:bg-white/[0.02] overflow-hidden">
            {[
              { value: String(available.length).padStart(2, "0"), label: "Herramientas" },
              { value: "0 €",  label: "Coste" },
              { value: "Free", label: "Sin registro" },
            ].map((s) => (
              <div key={s.label} className="px-6 py-3 text-center">
                <p className="text-lg font-extrabold text-sky-600 dark:text-sky-400">{s.value}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-500 uppercase tracking-[0.14em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Available tools */}
        <section aria-labelledby="labs-available-title">
          <h2 id="labs-available-title" className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600 mb-6">
            Disponibles ahora
          </h2>
          <ul className="grid gap-5 sm:grid-cols-2">
            {available.map((t: Lab) => {
              const acc = getAccent(t.slug);
              return (
                <li
                  key={t.slug}
                  className={`group relative overflow-hidden rounded-2xl border bg-white dark:bg-[#070D1C] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-none ${acc.border}`}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.6), rgba(129,140,248,0.4), transparent)" }} />

                  <div className="flex items-start gap-4">
                    <span className={`inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border ${acc.icon}`}>
                      <LabIcon slug={t.slug} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">{t.title}</h3>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0 ${acc.badge}`}>
                          <span className="h-1 w-1 rounded-full bg-current" aria-hidden />
                          Disponible
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>

                  {t.tags && t.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {t.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex rounded-full border border-slate-200/80 dark:border-white/[0.08] px-2.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.03]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Button as="a" href={t.href ?? `/labs/${t.slug}`} variant="shine" size="sm">
                      {t.cta}
                    </Button>
                    <a
                      className="text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors"
                      href="/#contacto"
                    >
                      Adaptar a mi empresa →
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Coming soon — oculto hasta que estén disponibles */}

        {/* CTA bottom */}
        <div className="mt-16 rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-8 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-600 dark:text-sky-400 mb-3">Soporte profesional</p>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            ¿Necesitas una versión a medida?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Adaptamos cualquier herramienta a tu operativa real: integración con tus datos, automatización y seguimiento continuo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button as="a" href="/#contacto" variant="shine">
              Hablar con Qubelia
            </Button>
            <Button as="a" href="/" variant="ghost">
              Ver todos los servicios
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
