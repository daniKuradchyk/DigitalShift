import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import JsonLd from "@/components/marketing/JsonLd";
import Container from "@/components/common/Container";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import { getService, serviceHubFit, type ServiceSummary } from "@/content/services";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";
import { absoluteUrl } from "@/lib/urls";

const softwareService = getService("software-a-medida");
const webService = getService("web-a-medida");
const automationService = getService("automatizacion-integraciones");
const crmService = getService("crm-intranet-a-medida");

const serviceFrameClass =
  "rounded-[2rem] border border-slate-200/70 bg-white/88 p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-8";
const serviceBoxClass =
  "rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-5 shadow-[0_18px_48px_-40px_rgba(15,23,42,0.16)]";
const jumpLinkClass =
  "inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-sky-700";

const problemMap = [
  {
    index: "01",
    title: "Operativa que depende de parches",
    description:
      "Excel, correo, mensajes sueltos y herramientas que nadie ha pensado como sistema. El trabajo sale, pero sale peor y con demasiado conocimiento atrapado en personas concretas.",
  },
  {
    index: "02",
    title: "Presencia digital que no representa el nivel real de la empresa",
    description:
      "La web no explica bien que hace la compania, no ayuda a captar demanda cualificada y no deja una base clara para crecer en SEO, contenidos o conversion.",
  },
  {
    index: "03",
    title: "Herramientas desconectadas y trabajo manual repetitivo",
    description:
      "El mismo dato entra varias veces, los informes llegan tarde y cada cambio menor rompe una automatizacion montada con demasiada fragilidad.",
  },
  {
    index: "04",
    title: "Sistemas estandar que ya no reflejan la realidad del negocio",
    description:
      "Cuando el CRM o la intranet obligan a trabajar fuera del sistema, dejan de ordenar la operativa y pasan a ser una limitacion mas.",
  },
];

const kickoffSteps = [
  {
    step: "01",
    title: "Aterrizar el problema",
    text: "Primero cerramos que duele, donde esta el cuello de botella y si realmente hay un servicio de Qubelia que encaja.",
  },
  {
    step: "02",
    title: "Definir alcance inicial",
    text: "No empezamos por un proyecto enorme. Delimitamos un primer tramo util, con prioridad clara y criterio tecnico razonable.",
  },
  {
    step: "03",
    title: "Abrir la primera fase",
    text: "La siguiente conversacion debe dejar decisiones, no solo entusiasmo: que se hace ahora, que se deja fuera y como se valida.",
  },
];

const webAxes = [
  {
    label: "Mensaje",
    value: "La propuesta de valor tiene que quedar clara antes de hablar de estilos o animaciones.",
  },
  {
    label: "Estructura",
    value: "Cada pagina debe tener una funcion comercial y una jerarquia comprensible para usuario y buscador.",
  },
  {
    label: "SEO base",
    value: "Metadata, headings, enlazado interno, rendimiento e indexabilidad bien planteados desde el principio.",
  },
  {
    label: "Conversion",
    value: "La web debe dejar siguiente paso, contexto y puntos de contacto sin friccion innecesaria.",
  },
];

const automationFlow = ["Formulario", "CRM", "ERP", "Email", "Reporting"];

const crmLayers = [
  { label: "Comercial", value: "Estados, pipeline, validaciones y seguimiento real." },
  { label: "Operaciones", value: "Expedientes, tareas, documentos y handoffs entre equipos." },
  { label: "Permisos", value: "Acceso por rol, visibilidad por area y trazabilidad de acciones." },
  { label: "Paneles", value: "Vista de carga, bloqueos y avance sin depender de reportes manuales." },
];

export const metadata: Metadata = buildMetadata({
  title: "Servicios de Qubelia | Software, web, automatizacion y CRM a medida",
  description:
    "Hub editorial de servicios de Qubelia: software a medida, web a medida, automatizacion e integraciones, y CRM o intranet a medida para empresas B2B.",
  path: "/servicios",
});

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios" },
  ];

  const breadcrumbData = breadcrumbJsonLd([
    { name: "Inicio", url: absoluteUrl("/") },
    { name: "Servicios", url: canonical("/servicios") },
  ]);

  return (
    <>
      <JsonLd id="ld-services-breadcrumbs" data={breadcrumbData} />
      <Header />
      <main id="contenido">
        <section className="pb-14 pt-16 sm:pt-20">
          <Container>
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-6 grid gap-10 border-b border-slate-200/70 pb-14 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="max-w-4xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sky-500">Catalogo de servicios</p>
                <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-900 sm:text-5xl">
                  Cuatro servicios para empresas que ya han superado la fase de los parches
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
                  Qubelia no vende una bolsa difusa de tecnologia. Trabaja cuatro lineas concretas: software a
                  medida, web a medida, automatizacion e integraciones, y CRM o intranet a medida. Esta pagina existe
                  para ordenar esa capa, mostrar criterio y ayudarte a abrir la conversacion correcta.
                </p>
              </div>

              <aside className="rounded-[1.75rem] border border-slate-200/70 bg-slate-50/80 p-6 shadow-[0_18px_48px_-40px_rgba(15,23,42,0.16)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Marco</p>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
                  <p>Entramos cuando ya hay negocio, captacion u operativa que no se sostiene bien con apaños.</p>
                  <p>No es una pagina para vender tecnologia en abstracto ni para mezclar servicios sin jerarquia.</p>
                </div>

                <div className="mt-5 border-t border-slate-200/70 pt-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Lectura rapida</p>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                    <li>Proceso propio: software a medida o CRM.</li>
                    <li>Captacion y posicionamiento: web a medida.</li>
                    <li>Herramientas mal conectadas: automatizacion e integraciones.</li>
                  </ul>
                </div>
              </aside>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
              <div className="border-t border-slate-200/70 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Que hace Qubelia</p>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
                  Desarrollo con criterio tecnico para empresas B2B que necesitan sistemas utiles, una base web seria o
                  una operativa menos fragmentada. No vendemos una herramienta por moda. Elegimos la capa que tiene
                  sentido.
                </p>
              </div>

              <div className="border-t border-slate-200/70 pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Como leer esta pagina</p>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  No es una mini-home. No repite FAQ, casos ni recursos por costumbre. Resume que problema ataca cada
                  linea y reparte autoridad hacia sus paginas canonicas.
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Problemas que resolvemos</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  La misma empresa puede llegar por sintomas distintos
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  La pagina de servicios no deberia empezar por una lista de enlaces. Primero hay que entender desde
                  que clase de friccion suele empezar la conversacion.
                </p>
              </div>

              <ol className="overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/84 shadow-[0_18px_48px_-42px_rgba(15,23,42,0.14)]">
                {problemMap.map((problem) => (
                  <ProblemRow key={problem.index} {...problem} />
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section className="border-y border-slate-200/70 py-16 sm:py-20">
          <Container>
            <div className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Catalogo</p>
              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                Cuatro lineas, cuatro conversaciones diferentes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Cada servicio existe porque responde a una decision distinta. No cambia solo el H1: cambia el tipo de
                problema, el foco comercial y la forma de entrar en el proyecto.
              </p>
            </div>

            <div className="mt-10 space-y-6">
              <SoftwareServiceBlock service={softwareService} />
              <WebServiceBlock service={webService} />
              <AutomationServiceBlock service={automationService} />
              <CrmServiceBlock service={crmService} />
            </div>
          </Container>
        </section>

        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Encaje</p>
                <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  Cuando tiene sentido hablar con Qubelia y cuando no
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Decir que no a tiempo tambien forma parte del trabajo. El objetivo no es forzar un proyecto, sino
                  abrir la capa adecuada cuando de verdad merece la pena.
                </p>
              </div>

              <div className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white/88 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.18)]">
                <div className="grid md:grid-cols-2">
                  <div className="p-6 sm:p-8 md:border-r md:border-slate-200/70">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Encajamos bien cuando</p>
                    <ul className="mt-5 space-y-4">
                      {serviceHubFit.yes.map((item, index) => (
                        <li key={item} className="grid gap-3 sm:grid-cols-[28px_minmax(0,1fr)]">
                          <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                          <span className="text-sm leading-relaxed text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50/70 p-6 sm:p-8">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">No somos buena opcion si</p>
                    <ul className="mt-5 space-y-4">
                      {serviceHubFit.no.map((item, index) => (
                        <li key={item} className="grid gap-3 sm:grid-cols-[28px_minmax(0,1fr)]">
                          <span className="font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</span>
                          <span className="text-sm leading-relaxed text-slate-600">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="metodologia" className="scroll-mt-28 py-16 sm:py-20">
          <Container>
            <div className="rounded-[2rem] border border-slate-200/70 bg-white/88 p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.18)] sm:p-8">
              <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Como suele empezar</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl">
                    Antes de construir, ordenamos la decision
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    El arranque no deberia ser una propuesta grandilocuente. Deberia dejar claro que problema se ataca,
                    con que alcance inicial y con que primer paso ejecutable.
                  </p>
                </div>

                <ol className="grid overflow-hidden rounded-[1.5rem] border border-slate-200/70 divide-y divide-slate-200/70 md:grid-cols-3 md:divide-x md:divide-y-0">
                  {kickoffSteps.map((item) => (
                    <li key={item.step} className="p-6">
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">{item.step}</p>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-900">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Container>
        </section>

        <section className="pb-20 pt-4">
          <Container>
            <div className="border-t border-slate-200/70 pt-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="max-w-2xl">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Siguiente paso</p>
                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900">
                    Si el problema ya esta claro, la siguiente conversacion deberia ser concreta
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Revisamos encaje, prioridad y primera fase del proyecto. Sin promesas abstractas y sin abrir una
                    linea de servicio que no toca.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/#contacto"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:border-sky-400 hover:text-sky-700"
                  >
                    Agendar diagnostico
                  </Link>
                  <Link
                    href={softwareService.href}
                    className="inline-flex items-center gap-2 rounded-full px-2 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:text-sky-700"
                  >
                    Ver un servicio en detalle
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProblemRow({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <li className="grid gap-4 border-t border-slate-200/70 p-6 first:border-t-0 md:grid-cols-[72px_minmax(0,1fr)] md:items-start">
      <span className="font-mono text-sm text-slate-400">{index}</span>
      <div>
        <h3 className="text-xl font-bold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </li>
  );
}

function SoftwareServiceBlock({ service }: { service: ServiceSummary }) {
  return (
    <article className={serviceFrameClass}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_320px]">
        <div>
          <ServiceLabel index="01" tone="Estrategico" />
          <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900">{service.shortTitle}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Cuando un proceso importante ya no cabe bien en un SaaS, el problema no es de interfaz. Es de control,
            trazabilidad y capacidad de evolucion. Aqui suele entrar la conversacion mas estrategica.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-l border-slate-200 pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">Donde aparece</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Operaciones sostenidas con excel, correo, memoria de equipo y herramientas que nunca se pensaron para
                esa operativa.
              </p>
            </div>
            <div className="border-l border-slate-200 pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">Que se busca</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Una base propia para trabajar mejor, no solo para digitalizar por encima un proceso mal resuelto.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-600">
            {service.scenarios.map((scenario) => (
              <span key={scenario.title} className="rounded-full border border-slate-200/70 px-3 py-1.5">
                {scenario.title}
              </span>
            ))}
          </div>
        </div>

        <aside className={serviceBoxClass}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Cuando suele merecer la pena</p>
          <ul className="mt-4 space-y-3">
            {service.fitYes.slice(0, 3).map((item) => (
              <li key={item} className="text-sm leading-relaxed text-slate-600">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-slate-200/70 pt-4">
            <ServiceJumpLink href={service.href}>Abrir software a medida</ServiceJumpLink>
          </div>
        </aside>
      </div>
    </article>
  );
}

function WebServiceBlock({ service }: { service: ServiceSummary }) {
  return (
    <article className={serviceFrameClass}>
      <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <div>
          <ServiceLabel index="02" tone="Comercial" />
          <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900">{service.shortTitle}</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Esta linea no vende una web bonita. Vende una base comercial y editorial que explique mejor la empresa,
            posicione mejor sus servicios y deje una presencia mas seria para captar.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            La diferencia importante no esta en el estilo del hero. Esta en mensaje, estructura, rendimiento,
            enlazado interno y conversion.
          </p>
          <div className="mt-6">
            <ServiceJumpLink href={service.href}>Abrir web a medida</ServiceJumpLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-slate-200/70 bg-slate-50/85">
          <div className="flex items-center gap-2 border-b border-slate-200/70 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden />
            <p className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Base comercial de la web</p>
          </div>

          <div className="divide-y divide-slate-200/70">
            {webAxes.map((item) => (
              <div key={item.label} className="grid gap-3 px-5 py-4 md:grid-cols-[110px_minmax(0,1fr)]">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-500">{item.label}</p>
                <p className="text-sm leading-relaxed text-slate-600">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function AutomationServiceBlock({ service }: { service: ServiceSummary }) {
  return (
    <article className={serviceFrameClass}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <ServiceLabel index="03" tone="Operativo" />
          <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900">{service.shortTitle}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Aqui el objetivo no es poner una automatizacion mas. Es quitar trabajo manual, conectar herramientas con
            criterio y dejar un flujo que aguante cambios, errores y mantenimiento real.
          </p>

          <div className="mt-6 rounded-[1.5rem] border border-slate-200/70 bg-slate-50/80 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Flujo habitual</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {automationFlow.map((node, index) => (
                <span key={node} className="flex items-center gap-2">
                  <span className="rounded-full border border-slate-200/70 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                    {node}
                  </span>
                  {index < automationFlow.length - 1 ? (
                    <span className="font-mono text-xs text-slate-400">&rarr;</span>
                  ) : null}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              La conversacion buena aqui no es que herramienta usar. Es que dato manda, que evento dispara el flujo y
              como se detecta un fallo antes de que llegue a cliente o a operaciones.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          <div className={serviceBoxClass}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Lo que suele desaparecer</p>
            <ul className="mt-4 space-y-3">
              <li className="text-sm leading-relaxed text-slate-600">Copiar y pegar datos entre sistemas.</li>
              <li className="text-sm leading-relaxed text-slate-600">Revisiones manuales de estado una y otra vez.</li>
              <li className="text-sm leading-relaxed text-slate-600">Automatizaciones montadas como caja negra.</li>
            </ul>
          </div>

          <div className={serviceBoxClass}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">A donde lleva</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Menos friccion entre comercial, operaciones y administracion. Mas control sobre el flujo y mejor calidad
              de dato.
            </p>
            <div className="mt-5 border-t border-slate-200/70 pt-4">
              <ServiceJumpLink href={service.href}>Abrir automatizacion e integraciones</ServiceJumpLink>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function CrmServiceBlock({ service }: { service: ServiceSummary }) {
  return (
    <article className={serviceFrameClass}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <ServiceLabel index="04" tone="Sistemico" />
          <h3 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-slate-900">{service.shortTitle}</h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
            Esta linea entra cuando el problema ya no es una integracion concreta ni una app aislada, sino el sistema
            que deberia ordenar la operativa comercial o interna y ya no lo esta haciendo.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="border-t border-slate-200/70 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">Vision</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Un entorno propio que represente como trabaja la empresa, no como obliga a trabajar un SaaS.
              </p>
            </div>
            <div className="border-t border-slate-200/70 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">Foco</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Roles, permisos, estados, paneles y trazabilidad puestos al servicio del proceso real.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <ServiceJumpLink href={service.href}>Abrir CRM / intranet a medida</ServiceJumpLink>
          </div>
        </div>

        <aside className={serviceBoxClass}>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-500">Capas habituales del sistema</p>
          <div className="mt-4 space-y-4">
            {crmLayers.map((layer) => (
              <div key={layer.label} className="border-t border-slate-200/70 pt-4 first:border-t-0 first:pt-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{layer.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{layer.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}

function ServiceLabel({ index, tone }: { index: string; tone: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-slate-400">{index}</span>
      <span className="rounded-full border border-slate-200/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
        {tone}
      </span>
    </div>
  );
}

function ServiceJumpLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={jumpLinkClass}>
      <span>{children}</span>
      <span aria-hidden>&rarr;</span>
    </Link>
  );
}
