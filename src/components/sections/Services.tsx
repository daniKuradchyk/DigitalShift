import React from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const services = [
  {
    title: "Transformacion digital para PYMEs",
    desc: "Automatizamos procesos y conectamos tus sistemas para ganar eficiencia real desde el primer mes. Detectamos cuellos de botella y orquestamos integraciones para que los datos fluyan sin duplicidades. Cada entrega se orienta a impacto medible en negocio.",
    bullets: ["Mapeo de procesos y oportunidades", "Integracion ERP/CRM y automatizaciones", "Dashboards e indicadores en tiempo real"],
    Icon: TransformIcon,
  },
  {
    title: "Desarrollo de software a medida",
    desc: "Aplicaciones web y moviles, APIs y backends robustos con seguridad desde el diseno. Creamos software a medida listo para escalar y mantener, con observabilidad, rendimiento y soporte a negocio.",
    bullets: ["Web apps y mobile", "APIs/microservicios y bases de datos", "Seguridad, rendimiento y observabilidad"],
    Icon: AppIcon,
  },
  {
    title: "MVP para emprendedores",
    desc: "De idea a MVP en 8-10 semanas con enfoque lean y metricas desde el dia uno. Validamos hipotesis rapido y entregamos un producto utilizable para primeras ventas o inversion, con trazabilidad de uso.",
    bullets: ["Discovery y prototipo", "Sprints quincenales y entregas continuas", "Analitica y aprendizajes accionables"],
    Icon: RocketIcon,
  },
  {
    title: "IA y automatizacion de procesos",
    desc: "Asistentes, RPA ligero y analitica asistida por IA para ahorrar tiempo y mejorar decisiones. Disenamos flujos de automatizacion con control humano, seguridad y medicion del ROI.",
    bullets: ["Asistentes y flujos RPA", "Extraccion y clasificacion documental", "Analitica asistida por IA"],
    Icon: AiIcon,
  },
  {
    title: "Integraciones y Data",
    desc: "Conectamos tus herramientas internas y unificamos datos para orquestar tu operacion con menos friccion. ETLs, conectores y alertas en tiempo real para reducir errores y acelerar decisiones.",
    bullets: ["ETLs y conectores", "Data warehouse y calidad de datos", "Informes y alertas en tiempo real"],
    Icon: DataIcon,
  },
];

export default function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 id="services-title" className="text-3xl font-bold tracking-tight">Servicios de desarrollo y consultoria tecnologica</h2>
          <p className="mt-2 text-slate-700">
            De la auditoria de procesos al desarrollo de software a medida, automatizacion con IA e integraciones para pymes y emprendedores en Sevilla y toda Espana.
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
