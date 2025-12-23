"use client";

import React, { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const services = [
  {
    id: "consultoria",
    title: "Consultoria tecnologica y transformacion para PYMEs",
    summary: "Ordenamos procesos, medimos impacto y priorizamos automatizacion con ROI rapido.",
    detail:
      "Arrancamos con entrevistas y analisis de operacion para detectar fricciones, duplicidades y riesgos. Cerramos con un plan de 90 dias, objetivos medibles y responsables claros.",
    chips: [
      { icon: "🧭", label: "Diagnostico" },
      { icon: "🧩", label: "Procesos" },
      { icon: "📈", label: "ROI rapido" },
    ],
    detailPoints: [
      { icon: "🧭", title: "Mapa operativo", desc: "Inventario de procesos, roles y dependencias para reducir tiempos muertos." },
      { icon: "🧾", title: "Backlog priorizado", desc: "Iniciativas por impacto, costo y tiempo con quick wins identificados." },
      { icon: "🛡", title: "Gobierno y KPIs", desc: "Metricas, responsables y seguimiento mensual para sostener mejoras." },
    ],
    bullets: [
      { icon: "✅", title: "Diagnostico accionable", desc: "Documento ejecutivo con oportunidades y riesgos." },
      { icon: "🔧", title: "Plan de automatizacion", desc: "Flujos objetivo y estimacion de esfuerzo." },
      { icon: "📊", title: "Indicadores clave", desc: "KPIs de servicio, eficiencia y ahorro." },
    ],
    Icon: TransformIcon,
  },
  {
    id: "apps",
    title: "Desarrollo de aplicaciones a medida",
    summary: "Producto digital propio con arquitectura escalable, QA y despliegues continuos.",
    detail:
      "Construimos software con arquitectura modular, integraciones seguras y documentacion viva. Entregamos con CI/CD, monitoreo y handover para operar sin dependencia.",
    chips: [
      { icon: "🧱", label: "Arquitectura" },
      { icon: "🔐", label: "Seguridad" },
      { icon: "⚙", label: "Integraciones" },
    ],
    detailPoints: [
      { icon: "🧱", title: "Arquitectura limpia", desc: "Modulos desacoplados, dominio claro y capas de integracion." },
      { icon: "🧪", title: "QA y confiabilidad", desc: "Pruebas automatizadas, criterios de aceptacion y revision de codigo." },
      { icon: "🚀", title: "Entregas continuas", desc: "Pipelines de despliegue, versionado y rollback seguro." },
    ],
    bullets: [
      { icon: "💻", title: "Experiencia de usuario", desc: "Interfaces claras y paneles operativos." },
      { icon: "🔌", title: "APIs robustas", desc: "Endpoints versionados y documentacion tecnica." },
      { icon: "📈", title: "Escalabilidad", desc: "Rendimiento, observabilidad y soporte." },
    ],
    Icon: AppIcon,
  },
  {
    id: "mvp",
    title: "MVP para emprendedores",
    summary: "Validacion rapida con producto funcional, eventos y aprendizaje accionable.",
    detail:
      "En 8-10 semanas pasamos de hipotesis a producto. Validamos con usuarios reales, medimos uso y ajustamos para traccion.",
    chips: [
      { icon: "🧪", label: "Experimentos" },
      { icon: "🗺", label: "Roadmap" },
      { icon: "📊", label: "Analitica" },
    ],
    detailPoints: [
      { icon: "💡", title: "Propuesta clara", desc: "Definicion de valor, segmento y KPIs de validacion." },
      { icon: "👥", title: "Usuarios reales", desc: "Testing guiado y feedback estructurado." },
      { icon: "📣", title: "Lanzamiento controlado", desc: "Piloto con eventos de uso y aprendizaje." },
    ],
    bullets: [
      { icon: "🧭", title: "Discovery intensivo", desc: "Sprints de definicion y prototipo." },
      { icon: "⚡", title: "Desarrollo rapido", desc: "Entregas quincenales con demos." },
      { icon: "🧾", title: "Roadmap accionable", desc: "Prioridades para crecimiento y siguientes pasos." },
    ],
    Icon: RocketIcon,
  },
  {
    id: "ia",
    title: "IA y automatizacion de procesos",
    summary: "IA aplicada con control humano, flujos RPA y trazabilidad.",
    detail:
      "Automatizamos tareas repetitivas con IA generativa y clasificacion inteligente. Todo con guardrails, control humano y auditoria.",
    chips: [
      { icon: "🤖", label: "Asistentes" },
      { icon: "🧠", label: "Clasificacion" },
      { icon: "🧾", label: "Documentos" },
    ],
    detailPoints: [
      { icon: "🤖", title: "Orquestacion IA", desc: "Modelos y prompts gobernados con versionado." },
      { icon: "🧯", title: "Control humano", desc: "Aprobaciones, reglas y fallback manual." },
      { icon: "🔍", title: "Observabilidad", desc: "Trazabilidad de decisiones y logs operativos." },
    ],
    bullets: [
      { icon: "⚙", title: "Flujos RPA", desc: "Automatizacion de tareas repetitivas." },
      { icon: "📥", title: "Ingesta inteligente", desc: "Extraccion de datos y normalizacion." },
      { icon: "🔔", title: "Alertas proactivas", desc: "Notificaciones y reglas de negocio." },
    ],
    Icon: AiIcon,
  },
  {
    id: "data",
    title: "Integraciones y Data",
    summary: "Datos confiables y conectores que alimentan dashboards en tiempo real.",
    detail:
      "Conectamos ERP, CRM, soporte y finanzas para unificar datos. Disenamos pipelines con calidad, alertas y ownership claro.",
    chips: [
      { icon: "🔗", label: "Conectores" },
      { icon: "🗃", label: "Data" },
      { icon: "📡", label: "Tiempo real" },
    ],
    detailPoints: [
      { icon: "🔗", title: "Integraciones seguras", desc: "Conectores a medida con logs y reintentos." },
      { icon: "🧹", title: "Calidad de datos", desc: "Reglas de limpieza y reconciliacion." },
      { icon: "📊", title: "Analitica operativa", desc: "Dashboards y alertas de negocio." },
    ],
    bullets: [
      { icon: "🧾", title: "ETL/ELT", desc: "Modelado y cargas programadas." },
      { icon: "🧭", title: "Gobierno de datos", desc: "Diccionario, permisos y ownership." },
      { icon: "🛰", title: "Reporteria", desc: "Informes y paneles compartibles." },
    ],
    Icon: DataIcon,
  },
];

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="servicios" aria-labelledby="services-title" className="py-20">
      <Container>
        <div className="max-w-2xl">
          <h2 id="services-title" className="text-3xl font-bold tracking-tight">Servicios de desarrollo y consultoria tecnologica en Sevilla</h2>
          <p className="mt-2 text-slate-700">Software a medida, automatizacion con IA, diseno web y data para pymes que quieren resultados rapidos y medibles.</p>
        </div>
        <div className="mt-10 grid items-start gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const isOpen = s.id === openId;
            const panelId = `${s.id}-panel`;

            return (
              <article
                key={s.id}
                className={`group relative rounded-2xl p-[1px] bg-[linear-gradient(140deg,rgba(28,57,148,0.55),rgba(99,137,255,0.25),rgba(14,29,74,0.35))] shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_-18px_rgba(14,29,74,0.55)] dark:bg-[linear-gradient(140deg,rgba(15,23,42,0.85),rgba(28,57,148,0.55),rgba(15,23,42,0.85))] dark:shadow-[0_22px_70px_-46px_rgba(0,0,0,0.8)] ${isOpen ? "scale-[1.01] lg:col-span-3" : ""}`}
              >
                <div className="flex flex-col rounded-2xl bg-white/95 p-5 sm:p-6 border border-white/60 dark:bg-slate-900/90 dark:border-slate-700/80">
                  <button
                    type="button"
                    className="flex w-full items-start gap-4 text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-brand-400 dark:focus-visible:ring-offset-slate-900"
                    onClick={() => setOpenId(isOpen ? null : s.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="mt-0.5 flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 shadow-sm dark:bg-slate-900/80 dark:text-brand-300 dark:ring-brand-500/30">
                      <s.Icon />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{s.title}</h3>
                        <span className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300">
                          Ver detalle
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed dark:text-slate-300">{s.summary}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {s.chips.map((c) => (
                          <span
                            key={`${s.id}-${c.label}`}
                            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                          >
                            <span aria-hidden className="text-sm">{c.icon}</span>
                            {c.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span
                      aria-hidden
                      className={`mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border text-sm font-bold transition duration-200 ${isOpen ? "rotate-45 border-brand-200 bg-brand-50 text-brand-600 shadow-sm dark:border-brand-500/50 dark:bg-brand-500/10 dark:text-brand-200" : "border-slate-200 bg-white text-slate-600 group-hover:border-brand-200 group-hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:group-hover:border-brand-400/70 dark:group-hover:text-brand-200"}`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-live="polite"
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-700/70">
                        <p className="text-sm text-slate-700 leading-relaxed dark:text-slate-200">{s.detail}</p>
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {s.detailPoints.map((p) => (
                            <div
                              key={`${s.id}-${p.title}`}
                              className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-700/60 dark:bg-slate-800/60"
                            >
                              <div className="flex items-start gap-3">
                                <span aria-hidden className="text-lg">{p.icon}</span>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{p.title}</p>
                                  <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-300">{p.desc}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Incluye</p>
                          <ul className="mt-2 space-y-2">
                            {s.bullets.map((b) => (
                              <li key={`${s.id}-${b.title}`} className="flex gap-3">
                                <span aria-hidden className="text-base">{b.icon}</span>
                                <div>
                                  <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{b.title}</p>
                                  <p className="text-xs text-slate-600 leading-relaxed dark:text-slate-300">{b.desc}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-2">
                          <Button as="a" href="/#contacto" variant="shine">Agenda diagnostico gratis</Button>
                          <Button as="a" href="/labs" variant="ghost">Ver productos gratuitos</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-200 bg-gradient-to-br from-brand-700/10 via-transparent to-brand-500/15 shadow-glow dark:from-brand-500/10 dark:to-brand-400/20" />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function IconBase(props: React.SVGProps<SVGSVGElement>) {
  return <svg aria-hidden className="h-7 w-7 text-brand-700 dark:text-brand-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props} />;
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
