import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import ServiceCards from "@/components/marketing/ServiceCards";
import SectionIntro from "@/components/marketing/SectionIntro";

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="relative scroll-mt-28 py-20 lg:py-28">
      <Container>
        <div className="surface-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_36%)]"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
            <SectionIntro
              eyebrow="Servicios principales"
              title="Cuatro lineas de servicio visibles, diferenciadas y con entidad propia"
              description="La home ya no intenta venderlo todo a la vez. Aqui se reparte la propuesta de Qubelia en cuatro capas claras para que cada una tenga su sitio, su intencion y su siguiente paso."
            />
            <div className="surface-panel relative overflow-hidden rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Como leer esta capa</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <li>Software cuando el proceso no cabe en un SaaS.</li>
                <li>Web cuando la presencia digital afecta negocio y posicionamiento.</li>
                <li>Automatizacion cuando hay friccion entre sistemas y tareas repetidas.</li>
                <li>CRM o intranet cuando el sistema estandar ya no representa la operativa.</li>
              </ul>

              <div className="mt-5 border-t border-slate-200/70 pt-5 dark:border-white/[0.08]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Jerarquia</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  La home resume. El hub <strong className="font-semibold text-slate-900 dark:text-white">/servicios</strong> reparte
                  autoridad. Cada pagina de servicio desarrolla su problema, su proceso y su enlazado interno.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-10">
            <ServiceCards variant="home" />
          </div>

          <div className="relative mt-8 flex flex-wrap gap-3">
            <Button as="a" href="/servicios" variant="shine">
              Ver hub de servicios
            </Button>
            <Button as="a" href="/#contacto" variant="ghost">
              Pedir diagnostico
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
