import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { getServices } from "@/content/services";
import { partnerLogos } from "@/content/proof";

const heroPrinciples = [
  {
    label: "Diagnostico util",
    text: "Primero se define el problema real y el encaje de la solucion.",
  },
  {
    label: "Entrega por bloques",
    text: "Se prioriza una primera version usable antes de inflar alcance.",
  },
  {
    label: "Base propia",
    text: "El sistema queda entendible, mantenible y sin dependencia artificial.",
  },
];

export default function Hero() {
  const services = getServices();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="section-tag mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              Arquitectura comercial y tecnica
            </div>

            <h1
              id="hero-title"
              className="max-w-4xl text-[2.4rem] font-black leading-[1.04] tracking-[-0.03em] text-slate-900 dark:text-white sm:text-[3.3rem] xl:text-[4.2rem]"
            >
              Software, web y sistemas a medida para empresas que necesitan operativa seria
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              Qubelia trabaja cuatro lineas claras: software a medida, web a medida, automatizacion e integraciones, y
              CRM o intranet a medida. La IA se usa como herramienta. El criterio tecnico es la ventaja real.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as="a" href="/#contacto" variant="shine" size="lg">
                Agendar diagnostico
              </Button>
              <Button as="a" href="/servicios" variant="ghost" size="lg">
                Ver servicios
              </Button>
            </div>

            <div className="surface-shell relative overflow-hidden mt-8 rounded-3xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">
                  Entrada directa a servicios
                </p>
                <a
                  href="#servicios"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
                >
                  Ir a la capa de servicios
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={service.href}
                    className="rounded-full border border-slate-200/70 bg-slate-50/90 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-sky-300/60 hover:text-sky-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-200 dark:hover:border-sky-500/30 dark:hover:text-sky-300"
                  >
                    {service.index} - {service.shortTitle}
                  </a>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroPrinciples.map((item) => (
                  <div key={item.label} className="surface-card relative overflow-hidden rounded-2xl px-4 py-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-400">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200/70 bg-[#0D1117] p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.40)] dark:border-white/[0.08]">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
                  qubelia-map
                </span>
              </div>
              <div className="space-y-4 font-mono text-sm leading-relaxed text-slate-300">
                <p className="text-sky-300">$ negocio.actual</p>
                <p className="pl-4 text-slate-400">procesos dispersos - duplicidad de datos - decisiones lentas</p>
                <p className="text-sky-300">$ qubelia.define-servicio</p>
                <div className="space-y-2 pl-4">
                  {services.map((service) => (
                    <div key={service.slug} className="flex items-start justify-between gap-4">
                      <span>{service.shortTitle}</span>
                      <span className="max-w-[18rem] text-right text-white/45">
                        {service.scenarios[0]?.title ?? service.intent}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sky-300">$ resultado.esperado</p>
                <p className="pl-4 text-emerald-300">mas control - menos friccion - mejor base para crecer</p>
              </div>
            </div>

            <div className="surface-panel relative overflow-hidden rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Confianza</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Experiencia real en proyectos con empresas y equipos donde la operativa importa.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {partnerLogos.map((partner) => (
                  <span
                    key={partner.name}
                    className="rounded-full border border-slate-200/70 bg-slate-50/90 px-3 py-1.5 text-sm text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300"
                  >
                    {partner.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
