import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import { getServices } from "@/content/services";
import { partnerLogos } from "@/content/proof";

const heroPrinciples = [
  {
    label: "Diagnostico util",
    text: "Primero se define el problema real y el encaje de la solucion.",
    icon: "01",
  },
  {
    label: "Entrega por bloques",
    text: "Se prioriza una primera version usable antes de inflar alcance.",
    icon: "02",
  },
  {
    label: "Base propia",
    text: "El sistema queda entendible, mantenible y sin dependencia artificial.",
    icon: "03",
  },
];

export default function Hero() {
  const services = getServices();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* ── Left column ── */}
          <div>
            <div className="section-tag mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden />
              Arquitectura comercial y tecnica
            </div>

            <h1
              id="hero-title"
              className="max-w-4xl text-[2.6rem] font-black leading-[1.02] tracking-[-0.04em] sm:text-[3.5rem] xl:text-[4.4rem]"
              style={{ color: "var(--text-primary)" }}
            >
              Software, web y sistemas a medida para empresas que necesitan{" "}
              <span className="gradient-text">operativa seria</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Qubelia trabaja cuatro lineas claras: software a medida, web a medida, automatizacion e integraciones, y
              CRM o intranet a medida. La IA se usa como herramienta. El criterio tecnico es la ventaja real.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button as="a" href="/#contacto" variant="shine" size="lg">
                Agendar diagnostico
              </Button>
              <Button as="a" href="/servicios" variant="ghost" size="lg">
                Ver servicios
              </Button>
            </div>

            {/* Service access panel */}
            <div className="surface-shell relative overflow-hidden mt-10 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">
                  Entrada directa a servicios
                </p>
                <a
                  href="#servicios"
                  className="text-sm font-medium transition-colors hover:text-violet-300"
                  style={{ color: "var(--text-muted)" }}
                >
                  Ir a la capa de servicios
                </a>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={service.href}
                    className="rounded-full border border-violet-400/10 bg-violet-500/[0.04] px-4 py-2 text-sm font-medium transition-all hover:border-violet-400/25 hover:bg-violet-500/[0.08] hover:text-violet-300"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {service.index} - {service.shortTitle}
                  </a>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {heroPrinciples.map((item) => (
                  <div key={item.label} className="surface-card relative overflow-hidden rounded-xl px-4 py-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-violet-500/10 text-[10px] font-bold text-violet-400">
                        {item.icon}
                      </span>
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-400">{item.label}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-5">
            {/* Terminal-style panel with prism border */}
            <div className="rounded-2xl p-[1px]" style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.30), rgba(192,132,252,0.15) 45%, rgba(103,232,249,0.20))" }}>
              <div className="rounded-2xl bg-[#0C0D14] p-6 shadow-[0_24px_80px_-12px_rgba(0,0,0,0.60)]">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-violet-500/60" />
                  <span className="h-3 w-3 rounded-full bg-purple-400/50" />
                  <span className="h-3 w-3 rounded-full bg-cyan-400/50" />
                  <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400/30">
                    qubelia-map
                  </span>
                </div>
                <div className="space-y-4 font-mono text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  <p className="text-violet-400">$ negocio.actual</p>
                  <p className="pl-4" style={{ color: "var(--text-muted)" }}>procesos dispersos - duplicidad de datos - decisiones lentas</p>
                  <p className="text-violet-400">$ qubelia.define-servicio</p>
                  <div className="space-y-2 pl-4">
                    {services.map((service) => (
                      <div key={service.slug} className="flex items-start justify-between gap-4">
                        <span>{service.shortTitle}</span>
                        <span className="max-w-[18rem] text-right" style={{ color: "var(--text-muted)" }}>
                          {service.scenarios[0]?.title ?? service.intent}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-violet-400">$ resultado.esperado</p>
                  <p className="pl-4 text-cyan-300">mas control - menos friccion - mejor base para crecer</p>
                </div>
              </div>
            </div>

            {/* Trust panel */}
            <div className="surface-panel relative overflow-hidden rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">Confianza</p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Experiencia real en proyectos con empresas y equipos donde la operativa importa.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {partnerLogos.map((partner) => (
                  <span
                    key={partner.name}
                    className="rounded-full border border-violet-400/10 bg-violet-500/[0.04] px-3 py-1.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
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
