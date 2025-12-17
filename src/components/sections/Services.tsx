import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const services = [
  {
    title: "Consultoria tecnologica y transformacion para PYMEs",
    desc: "Tu equipo sigue atrapado en excels, correos y tareas duplicadas. Actuamos como consultoria tecnologica para mapear procesos, eliminar cuellos de botella y priorizar automatizacion con foco en negocio. Resultado: menos incidencias, mas horas productivas y visibilidad diaria.",
    bullets: ["Diagnostico y backlog por impacto", "Workflows sin copias ni dobles cargas", "Indicadores de servicio y eficiencia"],
    Icon: TransformIcon,
  },
  {
    title: "Desarrollo de aplicaciones a medida",
    desc: "Si el SaaS no encaja o las licencias se disparan, construimos desarrollo de aplicaciones a medida y backends robustos. Disenamos arquitectura, QA y despliegues para crecer sin rehacer. Resultado: procesos propios digitalizados y equipos trabajando sobre una sola fuente de verdad.",
    bullets: ["Web apps y paneles de operaciones", "APIs/microservicios y seguridad", "Rendimiento, observabilidad y soporte"],
    Icon: AppIcon,
  },
  {
    title: "MVP para emprendedores",
    desc: "Para founders que necesitan validar mercado sin quemar caja. Aterrizamos propuesta, prototipo y desarrollo en 8-10 semanas con eventos de uso. Sales con un MVP vendible, metricas claras y un roadmap basado en datos, no en opiniones.",
    bullets: ["Discovery y prototipo con usuarios", "Sprints quincenales y demos", "Analitica y mejoras accionables"],
    Icon: RocketIcon,
  },
  {
    title: "IA y automatizacion de procesos",
    desc: "Si tu equipo copia datos entre herramientas o revisa correos uno a uno, disenamos automatizacion de procesos con IA y RPA ligero. Asistentes, clasificacion documental y flujos con control humano para mantener la calidad. Resultado: menos tareas repetitivas y decisiones mas rapidas.",
    bullets: ["Asistentes y flujos RPA con IA", "Extraccion y clasificacion de documentos", "Alertas y aprobaciones automatizadas"],
    Icon: AiIcon,
  },
  {
    title: "Integraciones y Data",
    desc: "Conectamos ERP, CRM, soporte y BI para que todos trabajen con el mismo dato. ETLs y conectores limpian la informacion antes de llegar a los equipos. Resultado: reportes fiables, menos rework y operaciones sincronizadas.",
    bullets: ["ETLs y conectores a medida", "Data warehouse y calidad de dato", "Informes y dashboards en tiempo real"],
    Icon: DataIcon,
  },
];

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 id="services-title" className="text-3xl font-bold tracking-tight">Servicios de desarrollo y consultoria tecnologica en Sevilla</h2>
          <p className="mt-2 text-slate-700">
            Desarrollo de software a medida en Sevilla, diseno web para pymes, automatizacion de procesos con IA e integraciones. Trabajamos con equipos que
            necesitan resultados rapidos y medibles en ventas y operaciones.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {services.map((s) => (
            <article key={s.title} className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-brand-700/60 via-brand-200/40 to-brand-500/60 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_40px_-12px_rgba(15,23,42,0.3)]">
              <div className="flex h-full flex-col rounded-2xl bg-white p-6">
                <s.Icon />
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-700">{s.desc}</p>
                <ul className="mt-4 flex-1 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden className="mt-2 inline-block h-2 w-2 rounded-full bg-brand-500" />
                      <span className="text-slate-700">{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button as="a" href="/#contacto" variant="shine">Agenda diagnostico gratis</Button>
                  <Button as="a" href="/labs" variant="ghost">Ver productos gratuitos</Button>
                </div>
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-200 bg-gradient-to-br from-brand-700/10 via-transparent to-brand-500/15 shadow-glow" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function IconBase(props: React.SVGProps<SVGSVGElement>) {
  return <svg aria-hidden className="h-10 w-10 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props} />;
}
function TransformIcon() {
  return (
    <IconBase>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 17h7M14 21h4" />
    </IconBase>
  );
}
function AppIcon() {
  return (
    <IconBase>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 8h10M7 12h6M7 16h4" />
    </IconBase>
  );
}
function RocketIcon() {
  return (
    <IconBase>
      <path d="M5 19l4-1 7-7a4 4 0 10-5-5l-7 7-1 4 4-1" />
      <path d="M15 9l-6 6" />
      <circle cx="16" cy="8" r="1" />
    </IconBase>
  );
}
function AiIcon() {
  return (
    <IconBase>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8M12 8v8" />
    </IconBase>
  );
}
function DataIcon() {
  return (
    <IconBase>
      <rect x="3" y="4" width="18" height="4" rx="1" />
      <rect x="3" y="10" width="18" height="4" rx="1" />
      <rect x="3" y="16" width="18" height="4" rx="1" />
    </IconBase>
  );
}
