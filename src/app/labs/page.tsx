import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import labs from "@/content/labs.json";

export const revalidate = 86400;

const stats = [
  { label: "Herramientas activas", value: String(labs.length).padStart(2, "0") },
  { label: "Costo", value: "0 EUR" },
  { label: "Acceso", value: "Sin registro" },
];

const labBenefits = [
  "Plantillas y calculadoras listas para usar.",
  "Resultados inmediatos y accionables.",
  "Enfoque en pymes y equipos operativos.",
  "Actualizaciones y mejoras continuas.",
];

function statusLabel(status: string) {
  if (!status) return "Disponible";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function LabIcon({ slug }: { slug: string }) {
  if (slug === "calculadora-irpf-autonomos") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 7h8M8 11h8M8 15h4" />
      </svg>
    );
  }
  if (slug === "generador-brief-proyecto") {
    return (
      <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7" />
        <path d="M14 3v4h4" />
        <path d="M8 13h8M8 17h6" />
      </svg>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l2 2 4-4" />
      <rect x="3" y="4" width="18" height="16" rx="2" />
    </svg>
  );
}

export default function LabsPage() {
  return (
    <main className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-brand-50/40 via-white/20 to-brand-50/40 dark:from-slate-950/40 dark:via-slate-900/20 dark:to-slate-950/40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-300/10 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-700/10" />
      </div>

      <Container>
        <div className="mb-8 flex items-center">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
        </div>
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
              Laboratorio abierto
            </div>
            <div className="max-w-xl space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Qubelia Labs - Productos gratuitos</h1>
              <p className="text-slate-700 dark:text-slate-300">
                Herramientas y plantillas utiles para pymes y emprendedores. Gratis, sin registro. Si quieres adaptar cualquiera a tu empresa,{" "}
                <a className="underline" href="/#contacto">contactanos</a>.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#labs-list" variant="shine">Ver herramientas</Button>
              <Button as="a" href="/#contacto" variant="ghost">Adaptar a mi empresa</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(14,29,74,0.45)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Que incluye Labs</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                {labBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-500/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/80 p-4 text-sm text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                Necesitas una version a medida? Podemos adaptar cualquiera de estos labs a tu proceso real.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Soporte profesional</p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                Te ayudamos a integrar el resultado en tu operativa, con datos, integraciones y seguimiento.
              </p>
              <div className="mt-4">
                <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Herramientas disponibles</h2>
              <p className="text-slate-700 dark:text-slate-300">
                Recursos listos para usar. Cada herramienta esta pensada para reducir tiempo y riesgos en proyectos reales.
              </p>
            </div>
            <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Actualizaciones continuas
            </span>
          </div>

          <ul id="labs-list" className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((t) => {
              const isComingSoon = (t.status ?? "").toLowerCase().includes("camino");
              return (
                <li
                  key={t.slug}
                  className="group relative overflow-hidden rounded-3xl p-[1px] bg-[radial-gradient(circle_at_12%_18%,rgba(99,137,255,0.2),transparent_40%),radial-gradient(circle_at_88%_0%,rgba(14,29,74,0.2),transparent_35%),linear-gradient(120deg,rgba(14,29,74,0.12),rgba(65,104,225,0.14),rgba(99,137,255,0.18))] shadow-[0_24px_70px_-44px_rgba(14,29,74,0.6)]"
                >
                  <div className="relative h-full rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-[0_22px_60px_-36px_rgba(14,29,74,0.6)] dark:border-slate-700/60 dark:bg-slate-900/80">
                    
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-brand-500/10 dark:text-brand-200 dark:ring-brand-500/30">
                        <LabIcon slug={t.slug} />
                      </span>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{t.title}</h3>
                          <span className="inline-flex items-center rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-200">
                            {statusLabel(t.status)}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{t.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {t.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      {isComingSoon ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                          Disponible pronto
                        </span>
                      ) : (
                        <Button as="a" href={t.href ?? `/labs/${t.slug}`} variant="shine">
                          {t.cta}
                        </Button>
                      )}
                      <a className="text-sm text-slate-700 hover:text-brand-700 dark:text-slate-300 dark:hover:text-brand-200" href="/#contacto">
                        Adaptar a mi empresa
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </Container>
    </main>
  );
}
