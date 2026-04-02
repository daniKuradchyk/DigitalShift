export type ServiceSlug =
  | "software-a-medida"
  | "web-a-medida"
  | "automatizacion-integraciones"
  | "crm-intranet-a-medida";

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceProblem = {
  title: string;
  description: string;
};

export type ServiceScenario = {
  title: string;
  description: string;
  note: string;
};

export type ServiceStep = {
  step: string;
  title: string;
  description: string;
};

export type ServiceSummary = {
  slug: ServiceSlug;
  href: `/servicios/${ServiceSlug}`;
  index: string;
  shortTitle: string;
  title: string;
  eyebrow: string;
  intent: string;
  cardSummary: string;
  homeSummary: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPanelTitle: string;
  heroPanelLines: string[];
  problems: ServiceProblem[];
  deliverables: string[];
  scenarios: ServiceScenario[];
  process: ServiceStep[];
  fitYes: string[];
  fitNo: string[];
  benefits: string[];
  integrations: string[];
  faqs: ServiceFaq[];
  relatedServices: ServiceSlug[];
  relatedPosts: string[];
  relatedLabs: string[];
  caseStudyIds: string[];
};

export const serviceOrder: ServiceSlug[] = [
  "software-a-medida",
  "web-a-medida",
  "automatizacion-integraciones",
  "crm-intranet-a-medida",
];

export const services: Record<ServiceSlug, ServiceSummary> = {
  "software-a-medida": {
    slug: "software-a-medida",
    href: "/servicios/software-a-medida",
    index: "01",
    shortTitle: "Software a medida",
    title: "Software a medida para procesos y operativa real",
    eyebrow: "Servicio principal",
    intent: "Herramientas internas, portales y plataformas que no encajan en un SaaS genérico.",
    cardSummary:
      "Diseñamos software propio para procesos concretos: operaciones, backoffice, portal cliente, extranet o plataformas internas.",
    homeSummary:
      "Cuando el proceso es importante y el SaaS obliga a trabajar peor, construimos la herramienta correcta.",
    metaTitle: "Software a medida para empresas B2B | Qubelia",
    metaDescription:
      "Desarrollo de software a medida para empresas B2B: herramientas internas, portales, plataformas operativas e integraciones sin vendor lock-in.",
    heroTitle: "Software a medida cuando el negocio no cabe en un SaaS estándar",
    heroSubtitle:
      "Diseñamos herramientas internas, portales y plataformas operativas para procesos específicos que necesitan control, trazabilidad y evolución real.",
    heroPanelTitle: "Dónde suele aparecer el problema",
    heroPanelLines: [
      "Excel y procesos paralelos sosteniendo una operativa crítica.",
      "Aplicaciones heredadas que nadie quiere tocar pero todos necesitan.",
      "Portales de cliente o extranet improvisados sin control ni continuidad.",
      "Herramientas sueltas que funcionan por separado y fallan como sistema.",
    ],
    problems: [
      {
        title: "Procesos críticos fuera de control",
        description:
          "La operativa depende de hojas de cálculo, correos y personas clave que concentran el conocimiento.",
      },
      {
        title: "Sistemas que no reflejan cómo trabaja la empresa",
        description:
          "El equipo adapta su forma de trabajar a la herramienta y no al revés, con fricción diaria y errores repetidos.",
      },
      {
        title: "Dificultad para crecer sin multiplicar personal",
        description:
          "Cada nuevo cliente, proyecto o unidad de volumen añade carga manual porque el proceso no está bien soportado.",
      },
      {
        title: "Falta de visibilidad real",
        description:
          "No hay una única fuente de verdad para saber en qué estado está una operación, un pedido o una cuenta.",
      },
    ],
    deliverables: [
      "Discovery y arquitectura funcional del proceso.",
      "Diseño de flujos, roles, permisos y reglas de negocio.",
      "Aplicación web, backend e integraciones necesarias.",
      "Paneles operativos, alertas y trazabilidad de eventos.",
      "Despliegue, documentación y soporte evolutivo si hace falta.",
    ],
    scenarios: [
      {
        title: "Herramienta interna para operaciones",
        description:
          "Sustituimos un proceso manual o fragmentado por una aplicación con validaciones, estados, historial y reporting.",
        note: "Típico en operaciones, administración, logística o gestión documental.",
      },
      {
        title: "Portal de cliente o extranet",
        description:
          "Creamos un entorno propio para compartir documentación, estados, tareas, incidencias o seguimiento de servicios.",
        note: "Útil cuando la experiencia del cliente depende de un proceso repetible.",
      },
      {
        title: "Plataforma operativa a medida",
        description:
          "Unimos varios procesos y áreas en un solo sistema con criterio técnico, datos consistentes y capacidad de escalar.",
        note: "Adecuado cuando ya hay una operativa recurrente y una necesidad clara de consolidación.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Diagnóstico funcional",
        description:
          "Entendemos proceso, riesgos, actores, puntos de fricción y qué parte merece realmente construirse.",
      },
      {
        step: "02",
        title: "Alcance y arquitectura",
        description:
          "Definimos módulos, integraciones, seguridad básica, roadmap de releases y prioridades de negocio.",
      },
      {
        step: "03",
        title: "Entrega iterativa",
        description:
          "Liberamos por bloques utilizables, con feedback del equipo, QA y trazabilidad desde el primer release.",
      },
      {
        step: "04",
        title: "Puesta en producción y evolución",
        description:
          "Acompañamos el go-live, medimos uso real y priorizamos mejoras con datos, no con intuición.",
      },
    ],
    fitYes: [
      "Hay un proceso específico que aporta valor o reduce coste de forma clara.",
      "Las herramientas actuales fuerzan demasiados parches o duplicidades.",
      "La empresa necesita control de datos, permisos, trazabilidad o integraciones a medida.",
      "Se quiere una base propia que pueda evolucionar a medio y largo plazo.",
    ],
    fitNo: [
      "Existe un SaaS estándar que cubre bien el 90% del proceso sin fricción.",
      "El problema todavía no está definido y solo se busca 'tener una app'.",
      "No hay responsables de negocio disponibles para validar decisiones y prioridades.",
      "La necesidad es solo estética o de presencia comercial y no operativa.",
    ],
    benefits: [
      "Menos trabajo manual y menos dependencia de memoria individual.",
      "Datos coherentes y accesibles para decisiones operativas.",
      "Más control sobre procesos, permisos y evolución del sistema.",
      "Una base técnica propia sin quedar atado a una herramienta externa.",
    ],
    integrations: [
      "ERP, CRM, bases de datos internas y APIs externas.",
      "Herramientas comerciales, formularios, email transaccional y reporting.",
      "SSO, roles, permisos y auditoría de acciones si el contexto lo requiere.",
    ],
    faqs: [
      {
        q: "¿Cuándo merece la pena desarrollar software a medida?",
        a: "Cuando el proceso es importante para el negocio y las herramientas estándar generan demasiadas fricciones, costes ocultos o dependencia de parches.",
      },
      {
        q: "¿Cuándo no merece la pena?",
        a: "Cuando un SaaS cubre bien lo necesario sin comprometer la operativa. Si vemos eso, lo diremos antes de plantear desarrollo.",
      },
      {
        q: "¿Qué tipo de proyectos encajan mejor aquí?",
        a: "Herramientas internas, portales, extranet, plataformas operativas y sistemas que conectan varios procesos en un único entorno de trabajo.",
      },
      {
        q: "¿El código y la infraestructura son nuestros?",
        a: "Sí. El objetivo es dejar una base útil y mantenible, no crear dependencia artificial.",
      },
    ],
    relatedServices: ["automatizacion-integraciones", "crm-intranet-a-medida", "web-a-medida"],
    relatedPosts: ["presupuesto-software-medida-2026", "brief-tecnico-proyecto-digital"],
    relatedLabs: ["calculadora-coste-software", "analisis-gratis"],
    caseStudyIds: ["santander", "accenture"],
  },
  "web-a-medida": {
    slug: "web-a-medida",
    href: "/servicios/web-a-medida",
    index: "02",
    shortTitle: "Web a medida",
    title: "Web a medida para captar, posicionar y sostener marca",
    eyebrow: "Servicio principal",
    intent: "Web corporativa o comercial orientada a negocio, posicionamiento y rendimiento técnico.",
    cardSummary:
      "Diseñamos webs corporativas y comerciales a medida para empresas que necesitan presencia seria, estructura clara y una base sólida para captar demanda.",
    homeSummary:
      "No vendemos una web bonita sin más. Vendemos una web que explica, posiciona y convierte con criterio.",
    metaTitle: "Web a medida para empresas B2B | Qubelia",
    metaDescription:
      "Diseño y desarrollo web a medida para empresas B2B: estructura, rendimiento, SEO técnico base, conversión e integraciones sin plantillas clónicas.",
    heroTitle: "Web a medida para empresas que necesitan algo más que presencia",
    heroSubtitle:
      "Construimos webs corporativas y comerciales con estructura, rendimiento y criterio SEO para captar mejor, explicar mejor y transmitir solvencia real.",
    heroPanelTitle: "Qué suele fallar en una web low-cost",
    heroPanelLines: [
      "Mensaje débil o genérico que no deja claro qué hacéis.",
      "Arquitectura pobre: todo en una sola landing o en páginas sin jerarquía.",
      "Plantillas lentas y difíciles de evolucionar cuando cambia el negocio.",
      "Formularios, analítica e integraciones montados sin criterio ni seguimiento.",
    ],
    problems: [
      {
        title: "La web no explica bien el valor de la empresa",
        description:
          "Se queda en claims genéricos, confunde servicios y no ayuda a una decisión de compra B2B.",
      },
      {
        title: "No existe una arquitectura preparada para SEO",
        description:
          "Todo intenta posicionar a la vez y ninguna URL tiene suficiente intención ni entidad propia.",
      },
      {
        title: "Se depende de una plantilla rígida",
        description:
          "Cada cambio importante es más caro de la cuenta porque la base técnica y editorial es débil.",
      },
      {
        title: "La captación no se puede medir bien",
        description:
          "Faltan eventos, criterios de conversión y puntos claros de contacto o diagnóstico.",
      },
    ],
    deliverables: [
      "Arquitectura de contenidos y jerarquía de páginas.",
      "Diseño UI a medida adaptado a la marca y al contexto B2B.",
      "Desarrollo rápido, estable y mantenible con SEO técnico base.",
      "Formularios, tracking e integraciones comerciales necesarias.",
      "Sistema preparado para crecer con nuevas páginas, blog y recursos.",
    ],
    scenarios: [
      {
        title: "Web corporativa B2B",
        description:
          "Reordenamos mensaje, servicios, navegación y confianza para que la empresa se perciba sólida y clara.",
        note: "Ideal cuando la web actual no representa bien el nivel real de la compañía.",
      },
      {
        title: "Web comercial con foco en captación",
        description:
          "Diseñamos un sitio que ayuda a convertir demanda en diagnóstico, lead o reunión con mejor señal de calidad.",
        note: "Útil para negocios con venta consultiva o procesos comerciales de varios pasos.",
      },
      {
        title: "Base digital para marketing y posicionamiento",
        description:
          "Creamos una arquitectura que permita ampliar servicios, contenidos y recursos sin rehacer el sitio cada pocos meses.",
        note: "Especialmente importante cuando la web va a ser un activo de crecimiento y no solo un folleto.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Posicionamiento y estructura",
        description:
          "Traducimos la propuesta comercial en páginas, mensajes, jerarquía y navegación útiles para negocio y SEO.",
      },
      {
        step: "02",
        title: "Diseño y copy",
        description:
          "Definimos tono, ritmo visual, bloques y contenido sin caer en layouts clónicos ni frases vacías.",
      },
      {
        step: "03",
        title: "Desarrollo e instrumentación",
        description:
          "Construimos una base rápida, medible y limpia, con formularios, metadata y tracking bien resueltos.",
      },
      {
        step: "04",
        title: "Lanzamiento y mejora",
        description:
          "Publicamos, revisamos señales de captación y dejamos una base lista para escalar servicios, blog o campañas.",
      },
    ],
    fitYes: [
      "La web es una pieza comercial importante y debe transmitir nivel real de empresa.",
      "Se necesita una estructura clara para servicios, SEO y evolución futura.",
      "Hay integraciones, tracking o requisitos técnicos que una plantilla resuelve mal.",
      "Se quiere diferenciar la marca con una presencia sobria y propia.",
    ],
    fitNo: [
      "Solo se busca la opción más barata para publicar algo rápido sin estrategia.",
      "La empresa no tiene todavía claro qué vende, a quién y con qué prioridad.",
      "No se va a cuidar el contenido ni revisar mínimamente la captación después del lanzamiento.",
      "Basta con una one-page temporal de muy corto recorrido.",
    ],
    benefits: [
      "Mejor claridad comercial y mejor percepción de solvencia.",
      "Una base SEO limpia sin sobreoptimización ni páginas clónicas.",
      "Mejor conversión gracias a estructura, copy y puntos de contacto claros.",
      "Un sitio que se puede ampliar sin rehacerlo entero.",
    ],
    integrations: [
      "CRM, formularios, calendarios, email marketing, eventos y analítica.",
      "Paneles, recursos descargables, blog y módulos propios si el proyecto lo pide.",
    ],
    faqs: [
      {
        q: "¿Cuándo merece la pena una web a medida?",
        a: "Cuando la web forma parte de la captación, de la percepción de marca y de la estructura comercial de la empresa. Si solo necesitas salir del paso, probablemente no.",
      },
      {
        q: "¿En qué se diferencia de una plantilla bien montada?",
        a: "En la arquitectura, la capacidad de adaptación, el rendimiento, la coherencia del mensaje y la facilidad para evolucionar el sitio sin arrastrar limitaciones.",
      },
      {
        q: "¿Incluye SEO?",
        a: "Incluye base SEO real: jerarquía, metadata, headings, enlaces internos, breadcrumbs, rendimiento e indexabilidad bien planteados.",
      },
      {
        q: "¿Sirve solo para empresas grandes?",
        a: "No. Sirve para empresas que necesitan una presencia seria y alineada con su negocio, aunque su tamaño no sea grande.",
      },
    ],
    relatedServices: ["software-a-medida", "automatizacion-integraciones", "crm-intranet-a-medida"],
    relatedPosts: ["arquitectura-nextjs-seo-2026", "migrar-wordpress-a-nextjs"],
    relatedLabs: ["analisis-gratis", "calculadora-coste-software"],
    caseStudyIds: ["lfstudio"],
  },
  "automatizacion-integraciones": {
    slug: "automatizacion-integraciones",
    href: "/servicios/automatizacion-integraciones",
    index: "03",
    shortTitle: "Automatización e integraciones",
    title: "Automatización e integraciones para quitar fricción operativa",
    eyebrow: "Servicio principal",
    intent: "Flujos automáticos e integraciones robustas entre herramientas, datos y procesos.",
    cardSummary:
      "Diseñamos automatizaciones e integraciones con criterio técnico: menos tareas manuales, más consistencia y mejor visibilidad entre sistemas.",
    homeSummary:
      "No vendemos 'hacer clic en Make'. Diseñamos flujos fiables, observables y mantenibles.",
    metaTitle: "Automatización e integraciones para empresas | Qubelia",
    metaDescription:
      "Automatización de procesos e integraciones entre CRM, ERP, formularios, email, APIs y hojas de cálculo. Soluciones robustas y mantenibles para empresas.",
    heroTitle: "Automatización e integraciones para que tus sistemas trabajen como un sistema",
    heroSubtitle:
      "Conectamos herramientas, eliminamos tareas manuales y diseñamos flujos robustos con visibilidad, trazabilidad y mantenimiento real.",
    heroPanelTitle: "Síntomas de una operativa mal conectada",
    heroPanelLines: [
      "El mismo dato se introduce varias veces en sitios distintos.",
      "Un proceso depende de copiar, pegar y revisar manualmente cada día.",
      "Los informes llegan tarde porque nadie confía del todo en la fuente.",
      "Las automatizaciones existentes son frágiles y nadie sabe bien cómo están montadas.",
    ],
    problems: [
      {
        title: "Duplicidad de trabajo y errores evitables",
        description:
          "El equipo repite tareas entre CRM, ERP, email, hojas de cálculo y formularios con riesgo constante de fallo.",
      },
      {
        title: "Flujos montados sin diseño técnico",
        description:
          "Hay automatizaciones improvisadas que funcionan hasta que cambia un campo, un webhook o una API.",
      },
      {
        title: "Datos desalineados entre sistemas",
        description:
          "Ventas, operaciones y administración trabajan con versiones distintas de la misma información.",
      },
      {
        title: "Falta de alertas y seguimiento",
        description:
          "Cuando algo se rompe, se detecta tarde y el equipo lo descubre por las consecuencias, no por el sistema.",
      },
    ],
    deliverables: [
      "Mapa de procesos, fuentes de verdad y puntos de fallo.",
      "Diseño de integraciones, reglas de sincronización y manejo de errores.",
      "Automatizaciones operativas con observabilidad y fallback donde haga falta.",
      "Reporting, alertas y documentación para mantener el sistema vivo.",
      "Revisión de escalabilidad para evitar dependencias frágiles.",
    ],
    scenarios: [
      {
        title: "Sincronización entre CRM y ERP",
        description:
          "Clientes, pedidos, presupuestos o estados viajan entre sistemas con reglas claras y menos intervención manual.",
        note: "Muy útil cuando comercial y operaciones necesitan trabajar sobre el mismo dato.",
      },
      {
        title: "Automatización de flujos internos",
        description:
          "Solicitudes, aprobaciones, reporting, notificaciones o generación documental dejan de depender de revisar bandejas y excels.",
        note: "Suele tener impacto rápido en equipos pequeños con mucha repetición.",
      },
      {
        title: "Reporting y control de datos",
        description:
          "Consolidamos fuentes, limpiamos reglas y dejamos paneles o alertas para detectar incidencias antes.",
        note: "Importante cuando la empresa ya opera con varias herramientas conectadas entre sí.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mapa de datos y procesos",
        description:
          "Definimos qué sistema manda en cada entidad, qué evento dispara el flujo y dónde están los riesgos.",
      },
      {
        step: "02",
        title: "Diseño técnico del flujo",
        description:
          "Elegimos arquitectura, reglas de sincronización, logs, alertas y estrategia de mantenimiento.",
      },
      {
        step: "03",
        title: "Implementación y pruebas",
        description:
          "Construimos, validamos casos límite y dejamos entornos y controles para producción, no solo un prototipo.",
      },
      {
        step: "04",
        title: "Seguimiento operativo",
        description:
          "Revisamos errores, calidad de datos y oportunidades de mejora a medida que el flujo entra en rutina.",
      },
    ],
    fitYes: [
      "Hay varias herramientas que ya deberían hablar entre sí y no lo hacen bien.",
      "El coste del trabajo manual repetitivo ya es visible en horas o errores.",
      "Se necesita trazabilidad, mantenimiento y diseño técnico serio de los flujos.",
      "La empresa quiere automatizar sin crear una caja negra difícil de tocar.",
    ],
    fitNo: [
      "Solo se busca una automatización puntual sin criterio de continuidad ni responsabilidad.",
      "No existe ninguna definición mínima de proceso o dato correcto.",
      "Se espera un resultado crítico sin revisar riesgos, validaciones o fallback.",
      "La necesidad real es un sistema propio más amplio y no una integración concreta.",
    ],
    benefits: [
      "Menos fricción operativa y menos tareas manuales repetidas.",
      "Datos más consistentes entre áreas y menos retrabajo.",
      "Automatizaciones mantenibles, observables y menos frágiles.",
      "Más velocidad para escalar procesos sin añadir estructura manual al mismo ritmo.",
    ],
    integrations: [
      "CRM, ERP, formularios, email, hojas de cálculo, APIs y bases de datos.",
      "Webhooks, colas, logs, alertas y paneles de control operativos.",
      "Extracción documental, clasificación y flujos asistidos cuando la IA tiene sentido como herramienta.",
    ],
    faqs: [
      {
        q: "¿Qué tipo de integraciones suelen tener más impacto?",
        a: "Las que eliminan duplicidad entre comercial, operaciones y administración: CRM-ERP, formularios-CRM, reporting y sincronización de estados.",
      },
      {
        q: "¿Trabajáis con herramientas tipo Make o n8n?",
        a: "Sí, cuando encajan. La clave no es la herramienta sino el diseño del flujo, la trazabilidad y el mantenimiento posterior.",
      },
      {
        q: "¿La IA es parte obligatoria del servicio?",
        a: "No. Se usa cuando aporta valor real al flujo, por ejemplo en clasificación o extracción documental. No es el centro de la propuesta.",
      },
      {
        q: "¿Cómo evitáis automatizaciones frágiles?",
        a: "Definiendo fuentes de verdad, manejo de errores, alertas, logs y pruebas antes de pasar a producción.",
      },
    ],
    relatedServices: ["software-a-medida", "crm-intranet-a-medida", "web-a-medida"],
    relatedPosts: ["integraciones-erp-crm-pymes", "ia-agentes-pymes-2026", "automatizacion-comercial-b2b"],
    relatedLabs: ["roi-automatizacion", "analisis-gratis"],
    caseStudyIds: ["unicaja", "santander"],
  },
  "crm-intranet-a-medida": {
    slug: "crm-intranet-a-medida",
    href: "/servicios/crm-intranet-a-medida",
    index: "04",
    shortTitle: "CRM / intranet a medida",
    title: "CRM, intranet y sistemas internos a medida",
    eyebrow: "Servicio principal",
    intent: "Sistema interno propio para procesos comerciales, operativos o internos con reglas concretas.",
    cardSummary:
      "Diseñamos CRM, intranet o extranet a medida cuando un sistema estándar se queda corto y el proceso necesita control fino.",
    homeSummary:
      "Si tu operativa no cabe bien en HubSpot, Pipedrive o una intranet genérica, construimos el sistema interno que sí encaja.",
    metaTitle: "CRM e intranet a medida para empresas | Qubelia",
    metaDescription:
      "CRM, intranet y sistemas internos a medida para empresas: roles, permisos, trazabilidad, paneles y operativa adaptada a procesos reales.",
    heroTitle: "CRM e intranet a medida cuando el sistema estándar obliga a trabajar peor",
    heroSubtitle:
      "Construimos sistemas internos adaptados a procesos comerciales y operativos concretos, con permisos, trazabilidad y visión a largo plazo.",
    heroPanelTitle: "Cuándo un CRM estándar empieza a no encajar",
    heroPanelLines: [
      "La operativa real depende de campos, estados o aprobaciones que la herramienta no soporta bien.",
      "La empresa necesita combinar proceso comercial, operaciones y documentación en un solo flujo.",
      "Los permisos, paneles o automatizaciones no reflejan la realidad del equipo.",
      "Se acaba trabajando fuera del CRM porque el sistema no representa el negocio.",
    ],
    problems: [
      {
        title: "El equipo trabaja fuera de la herramienta principal",
        description:
          "Hay demasiadas excepciones, notas paralelas o procesos fuera de sistema porque la herramienta estándar no llega.",
      },
      {
        title: "No existe una operativa trazable de punta a punta",
        description:
          "Cuesta saber quién hizo qué, en qué estado está un expediente y qué falta para cerrar una fase.",
      },
      {
        title: "Roles y permisos mal resueltos",
        description:
          "Todos ven demasiado o demasiado poco, y la operativa termina dependiendo de arreglos manuales.",
      },
      {
        title: "El sistema no puede evolucionar con el negocio",
        description:
          "Cada nuevo proceso, panel o automatización se vuelve una lucha contra los límites de la plataforma.",
      },
    ],
    deliverables: [
      "Modelo operativo de entidades, estados, roles y permisos.",
      "CRM, intranet o extranet con módulos adaptados al proceso real.",
      "Paneles, trazabilidad, alertas y vistas por rol o equipo.",
      "Integraciones con sistemas existentes cuando procede.",
      "Base técnica lista para ampliar el sistema con nuevas áreas o procesos.",
    ],
    scenarios: [
      {
        title: "CRM comercial adaptado a un proceso complejo",
        description:
          "Diseñamos etapas, validaciones, documentación, aprobaciones y vistas que un CRM genérico no cubre bien.",
        note: "Especialmente útil en venta consultiva, licitaciones, procesos largos o equipos mixtos.",
      },
      {
        title: "Intranet operativa para equipos internos",
        description:
          "Centralizamos expedientes, tareas, estados, documentación y trazabilidad en un entorno propio.",
        note: "Aporta mucho valor cuando varias áreas tocan el mismo proceso con reglas diferentes.",
      },
      {
        title: "Sistema interno híbrido",
        description:
          "Unimos proceso comercial, backoffice y reporting en una sola capa operativa sin depender de herramientas sueltas.",
        note: "Es la opción correcta cuando el negocio ya superó los límites de una herramienta estándar.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Modelo operativo",
        description:
          "Definimos entidades, ciclo de vida, reglas, permisos, indicadores y responsables por fase del proceso.",
      },
      {
        step: "02",
        title: "Diseño de sistema",
        description:
          "Traducimos la operativa en módulos, vistas, paneles y puntos de control que tengan sentido para el equipo.",
      },
      {
        step: "03",
        title: "Construcción y validación",
        description:
          "Iteramos con usuarios reales, comprobamos adopción y ajustamos fricción antes del despliegue completo.",
      },
      {
        step: "04",
        title: "Escalado del sistema",
        description:
          "Dejamos una base que pueda crecer con nuevos procesos, automatizaciones o áreas sin rehacerlo todo.",
      },
    ],
    fitYes: [
      "El proceso comercial u operativo tiene demasiadas particularidades para un CRM estándar.",
      "Se necesitan roles, permisos, trazabilidad y paneles específicos.",
      "La empresa quiere una visión a largo plazo y una base propia para crecer.",
      "La herramienta actual ya obliga a trabajar fuera del sistema.",
    ],
    fitNo: [
      "Un CRM estándar bien configurado cubre la necesidad sin demasiada fricción.",
      "La empresa todavía no tiene un proceso definido y busca resolverlo solo con software.",
      "Solo se necesita una implantación ligera de una herramienta comercial existente.",
      "No hay intención de mantener ni evolucionar el sistema después del lanzamiento.",
    ],
    benefits: [
      "Más control sobre el proceso y mejor trazabilidad interna.",
      "Mayor adopción porque el sistema refleja la operativa real.",
      "Mejores permisos, paneles y capacidad de seguimiento.",
      "Una base que puede crecer con el negocio sin quedar limitada por un SaaS.",
    ],
    integrations: [
      "ERP, email, firma, documentación, formularios, calendarios y reporting.",
      "Automatizaciones, alertas, paneles y conexiones con otras áreas del negocio.",
    ],
    faqs: [
      {
        q: "¿Esto sustituye a un CRM como HubSpot o Pipedrive?",
        a: "A veces sí y a veces no. Depende de si la necesidad principal es un sistema propio o una capa adicional sobre herramientas existentes.",
      },
      {
        q: "¿Cuándo deja de encajar un CRM estándar?",
        a: "Cuando el equipo trabaja fuera del sistema, necesita demasiados parches o no puede representar bien su proceso real.",
      },
      {
        q: "¿Se puede empezar por una fase pequeña?",
        a: "Sí. Lo normal es empezar por el núcleo del proceso y ampliar módulos, automatizaciones o paneles después.",
      },
      {
        q: "¿Incluye roles y permisos complejos?",
        a: "Sí, si el contexto lo requiere. Es uno de los motivos por los que este tipo de proyecto suele necesitar una base a medida.",
      },
    ],
    relatedServices: ["software-a-medida", "automatizacion-integraciones", "web-a-medida"],
    relatedPosts: ["integraciones-erp-crm-pymes", "kpis-producto-b2b", "brief-tecnico-proyecto-digital"],
    relatedLabs: ["calculadora-coste-software", "roi-automatizacion"],
    caseStudyIds: ["accenture", "santander"],
  },
};

export const serviceHubFaqs: ServiceFaq[] = [
  {
    q: "¿Qubelia encaja para cualquier proyecto tecnológico?",
    a: "No. Encajamos bien cuando hay un problema operativo, comercial o de sistema que requiere criterio técnico y una solución hecha con cabeza. Si no es el caso, también lo diremos.",
  },
  {
    q: "¿Trabajáis solo con empresas de Sevilla?",
    a: "Estamos en Sevilla, pero trabajamos con empresas B2B de toda España. La cercanía ayuda; la claridad técnica y la ejecución son lo que más pesa.",
  },
  {
    q: "¿Hacéis también estrategia o solo desarrollo?",
    a: "Antes de construir definimos proceso, alcance y encaje. No hacemos consultoría vacía, pero tampoco empezamos a desarrollar sin entender el problema.",
  },
  {
    q: "¿Usáis IA en todos los proyectos?",
    a: "No. La usamos cuando mejora un flujo o acelera una tarea concreta. La ventaja competitiva no es 'usar IA', sino saber cuándo aporta y cuándo no.",
  },
];

export const serviceHubFit = {
  yes: [
    "Empresas B2B con operativa real y procesos que ya están generando fricción.",
    "Pymes y equipos que necesitan criterio técnico y una solución mantenible.",
    "Negocios que quieren una base propia para crecer sin trabajar peor cada trimestre.",
  ],
  no: [
    "Proyectos difusos sin problema de negocio bien definido.",
    "Necesidades puramente cosméticas o piezas sin recorrido real.",
    "Empresas que solo buscan la opción más barata aunque la base quede mal resuelta.",
  ],
};

export const serviceHubMethod = [
  {
    step: "01",
    title: "Diagnóstico",
    description:
      "Aterrizamos el problema, el alcance y el punto donde una intervención técnica sí cambia el negocio.",
  },
  {
    step: "02",
    title: "Diseño",
    description:
      "Definimos estructura, proceso, arquitectura y qué parte merece hacerse a medida.",
  },
  {
    step: "03",
    title: "Entrega",
    description:
      "Construimos por bloques útiles, con validación real y sin esconder complejidad detrás de humo comercial.",
  },
  {
    step: "04",
    title: "Evolución",
    description:
      "Medimos, corregimos y priorizamos siguientes pasos para que la solución siga teniendo sentido con el tiempo.",
  },
];

export function getService(slug: ServiceSlug) {
  return services[slug];
}

export function getServices() {
  return serviceOrder.map((slug) => services[slug]);
}
