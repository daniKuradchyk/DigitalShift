export type PostMeta = {
  slug: string;
  title: string; // <title>
  description: string; // meta description
  h1: string;
  date: string; // YYYY-MM-DD
  author: { name: string; url?: string };
  tags: string[];
};

export type PostSection = {
  title: string;
  body: string[];
};

export type Post = PostMeta & {
  intro: string;
  sections: PostSection[];
  highlights?: string[];
  cta?: { label: string; href: string; text: string };
  faqs?: { q: string; a: string }[];
};

export function estimateReadingTime(post: Post): number {
  const wordsFromSections = post.sections.reduce((acc, section) => {
    const bodyWords = section.body.join(" ").split(/\s+/).length;
    const titleWords = section.title.split(/\s+/).length;
    return acc + bodyWords + titleWords;
  }, 0);
  const words = post.intro.split(/\s+/).length + wordsFromSections + (post.highlights?.join(" ").split(/\s+/).length ?? 0);
  return Math.max(3, Math.round(words / 180));
}

const baseAuthor = { name: "Equipo Qubelia", url: "https://www.linkedin.com/company/qubelia" };

export const posts: Post[] = [
  {
    slug: "presupuesto-diseno-web-sevilla",
    title: "Presupuesto diseño web en Sevilla: rangos y factores (2025)",
    description:
      "Descubre cuánto cuesta una web en Sevilla: rangos de precios, factores clave y qué incluir para no pagar de más ni de menos.",
    h1: "¿Cuánto cuesta una web en Sevilla? Rangos y factores",
    date: "2025-02-01",
    author: baseAuthor,
    tags: ["Sevilla", "Diseño web", "Presupuesto"],
    intro:
      "Los precios de una web corporativa en Sevilla varían mucho. El rango suele ir de 1.200 € a 12.000 € según alcance, riesgos y equipo. Aquí tienes los factores que marcan la diferencia y un checklist rápido para no pagar de más ni de menos.",
    sections: [
      {
        title: "Rangos de referencia",
        body: [
          "Landing de una página: 1.200 € – 2.500 € (copy, diseño, desarrollo, analítica básica).",
          "Web corporativa 5-8 páginas: 2.500 € – 6.000 € (diseño a medida, CMS, formularios, SEO técnico básico).",
          "Sitio avanzado con integraciones: 6.000 € – 12.000 € (intranets ligeras, CRM, automatizaciones).",
        ],
      },
      {
        title: "Factores que suben el coste",
        body: [
          "Complejidad de UX/UI y número de páginas o layouts distintos.",
          "Integraciones (CRM, pasarelas de pago, ERP, marketing automation).",
          "Velocidad/SEO técnico (Core Web Vitals, imágenes optimizadas, CDN, schema).",
          "Contenido (copywriting, traducciones, assets) y propiedad intelectual.",
        ],
      },
      {
        title: "Qué debe incluir una propuesta seria",
        body: [
          "Alcance cerrado y entregables: diseño, desarrollo, QA, contenidos, formación.",
          "Plan de analítica: eventos clave en GA4, dashboards y alertas.",
          "Garantía y soporte post-lanzamiento: hotfixes y horas de acompañamiento.",
          "Propiedad del código y acceso a repositorio/infraestructura.",
        ],
      },
      {
        title: "Checklist antes de firmar",
        body: [
          "Revisar casos similares y tiempos de entrega reales.",
          "Exigir entorno de staging y despliegues versionados.",
          "Validar que el dominio/email están configurados (SPF/DKIM) para evitar spam.",
          "Acordar KPIs de éxito: velocidad, leads, conversión, ranking de keywords.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tarda un proyecto web típico?",
        a: "Para una web corporativa de 6-8 páginas, el rango habitual son 4-7 semanas si hay contenidos listos. Con integraciones o copy a medida puede ir a 8-10 semanas.",
      },
      {
        q: "¿Qué CMS usar para un sitio corporativo?",
        a: "Si buscas rendimiento y seguridad, Next.js + un CMS headless ligero (Contentful, Sanity) o incluso sin CMS si el contenido cambia poco. WordPress sigue siendo válido si tienes equipo para mantenerlo.",
      },
      {
        q: "¿Qué pasa con el mantenimiento?",
        a: "Incluye al menos hotfixes de 30 días y un plan mensual para actualizaciones de seguridad, backups y pequeñas evoluciones. Déjalo por escrito en la propuesta.",
      },
    ],
  },
  {
    slug: "checklist-landing-conversion",
    title: "Checklist para crear una landing que convierte (15 puntos)",
    description:
      "La guía práctica de 15 puntos para aumentar la conversión de tus landing pages. Priorizada y accionable.",
    h1: "Checklist para landings que convierten: 15 puntos prácticos",
    date: "2025-02-05",
    author: baseAuthor,
    tags: ["Landing pages", "CRO", "Checklist"],
    intro:
      "Una landing que convierte deja claro el problema, la propuesta de valor y el siguiente paso. Esta checklist prioriza lo esencial para captar leads o ventas en campañas PPC y orgánico.",
    sections: [
      {
        title: "Propuesta de valor y jerarquía",
        body: [
          "Título que explique el resultado, no la característica.",
          "Subtítulo que aclare a quién ayudas y en cuánto tiempo.",
          "CTA primario visible en el primer pantallazo y repetido más abajo.",
        ],
      },
      {
        title: "Prueba social y confianza",
        body: [
          "Testimonios con nombre y rol verificable.",
          "Casos de uso con métricas concretas (no genéricas).",
          "Sellos de seguridad y datos de contacto visibles (NIF, email, teléfono).",
        ],
      },
      {
        title: "UX y rendimiento",
        body: [
          "Tiempo de carga < 2 s en móvil; imágenes optimizadas y lazy loading.",
          "Formularios cortos (3-5 campos) con validación inline y honeypot.",
          "Botones contrastados, estados hover/focus y accesibilidad básica.",
        ],
      },
      {
        title: "Medición y experimentos",
        body: [
          "Eventos GA4: vistas de sección, clic en CTA, envíos de formulario, scroll 75%.",
          "Heatmaps o recordings en primeras 2 semanas para detectar fricción.",
          "A/B simple en titular o CTA una vez haya tráfico suficiente (>300 visitas).",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuántos campos debe tener el formulario?",
        a: "3-5 campos suele ser el rango óptimo. Si necesitas datos extra, pídelos en el thank you o en el contacto posterior.",
      },
      {
        q: "¿Cómo mido el éxito de una landing?",
        a: "Define conversión primaria (envío de formulario, clic en WhatsApp) y secundaria (scroll 75%, tiempo en página). Configura estos eventos en GA4 antes de lanzar campañas.",
      },
      {
        q: "¿Necesito varias versiones?",
        a: "Empieza con una y prueba variantes de titular/CTA tras 300-500 visitas cualificadas. No lances 5 versiones sin datos.",
      },
    ],
  },
  {
    slug: "seo-onpage-negocios-locales",
    title: "SEO on-page para negocios locales: guía práctica",
    description:
      "Optimiza tu SEO local: Title/Meta, H1-H3, enlazado interno, datos estructurados, NAP y rendimiento.",
    h1: "SEO on-page para negocios locales: guía práctica",
    date: "2025-02-09",
    author: baseAuthor,
    tags: ["SEO", "Local", "On-page"],
    intro:
      "Un negocio local compite por intención de búsqueda con ubicación. On-page sólido + consistencia de NAP + velocidad móvil = tráfico cualificado. Esto es lo mínimo viable.",
    sections: [
      {
        title: "Estructura y contenidos",
        body: [
          "Titles con keyword + ciudad + propuesta de valor. H1 único y coherente.",
          "Página por servicio/ciudad con FAQs, precios orientativos y CTA local.",
          "Enlazado interno claro hacia servicios, contacto y reseñas.",
        ],
      },
      {
        title: "Datos estructurados y NAP",
        body: [
          "Schema LocalBusiness con dirección, teléfono, horario y geo.",
          "NAP consistente en web, GMB, directorios y footer.",
          "BreadcrumbList y FAQPage donde aplique.",
        ],
      },
      {
        title: "Rendimiento y experiencia",
        body: [
          "LCP < 2.5 s en móvil (optimizar hero, fuentes, imágenes).",
          "Formularios con validación y envío fiable (SPF/DKIM en email).",
          "Mapa estático o con lazy loading para no penalizar CLS.",
        ],
      },
      {
        title: "Seguimiento",
        body: [
          "Eventos clave en GA4 y objetivos en GMB (clic en llamada, cómo llegar).",
          "Keywords locales monitorizadas y fichas GMB actualizadas.",
          "Revisar Core Web Vitals trimestralmente.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué es NAP y por qué importa?",
        a: "Name, Address, Phone. Debe ser idéntico en web, Google Business Profile y directorios. Inconsistencias restan confianza y pueden dañar rankings locales.",
      },
      {
        q: "¿Necesito blog para SEO local?",
        a: "No es imprescindible. Primero asegura páginas de servicio/localización sólidas. El blog ayuda si cubre dudas reales de tus clientes.",
      },
      {
        q: "¿Cómo gestiono reseñas?",
        a: "Responde todas, pide reseñas tras cada entrega y evita picos artificiales. Las reseñas con palabras clave locales ayudan.",
      },
    ],
  },
  {
    slug: "go-to-market-saas-90-dias",
    title: "Plan de go-to-market SaaS en 90 días",
    description:
      "Cómo lanzar y validar un SaaS en 90 días: ICP, propuesta de valor, pricing, demo, métricas y playbook comercial.",
    h1: "Go-to-market SaaS en 90 días: plan operativo",
    date: "2025-02-14",
    author: baseAuthor,
    tags: ["SaaS", "Go-to-market", "Producto"],
    intro:
      "Lanzar un SaaS rápido exige foco: definir ICP, resolver un caso de uso claro, empaquetarlo con pricing sencillo y medir uso real. Este plan de 90 días prioriza lo imprescindible.",
    sections: [
      {
        title: "Semana 1-3: ICP y propuesta",
        body: [
          "Definir 1-2 perfiles con problema costoso y frecuencia alta.",
          "Redactar casos de uso concretos y resultados esperados.",
          "Landing + demo guiada (vídeo corto) para testear interés.",
        ],
      },
      {
        title: "Semana 4-6: Producto mínimo demostrable",
        body: [
          "Funcionalidades core cerradas; lo demás como servicio manual.",
          "Onboarding guiado y eventos GA4 de activación (acciones clave).",
          "Soporte sincrónico (chat/llamada) para aprender fricciones.",
        ],
      },
      {
        title: "Semana 7-9: Pricing y ventas",
        body: [
          "2 planes máximo; precios redondos basados en valor percibido.",
          "Argumentario y secuencia de emails con casos de uso.",
          "Pilotos pagados cortos (4-6 semanas) con objetivo medible.",
        ],
      },
      {
        title: "Semana 10-12: Métricas y escalado",
        body: [
          "Seguir activación, retención 4 semanas y NPS temprano.",
          "Playbook de demos grabadas y guías rápidas en vídeo.",
          "Automatizar facturación y provisioning antes de escalar marketing.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuándo invertir en marketing pagado?",
        a: "Después de demostrar activación y al menos retención temprana en un segmento. Antes, usa outreach y comunidades para validar mensaje.",
      },
      {
        q: "¿Precio mensual o anual?",
        a: "Empieza con mensual para reducir fricción. Ofrece anual solo con un claro descuento y cuando haya fit probado.",
      },
      {
        q: "¿Necesito un free trial?",
        a: "Solo si el producto es autoexplicable. Si requiere acompañamiento, mejor demo guiada + piloto de 4-6 semanas.",
      },
    ],
  },
  {
    slug: "brief-tecnico-proyecto-digital",
    title: "Cómo escribir un brief técnico que evite sobrecostes",
    description:
      "Estructura de un brief técnico para proyectos digitales: objetivos, alcance, riesgos, datos, dependencias y métricas.",
    h1: "Brief técnico: la plantilla que evita sobrecostes y malentendidos",
    date: "2025-02-18",
    author: baseAuthor,
    tags: ["Producto", "Gestión", "Requisitos"],
    intro:
      "Un buen brief evita cambios de alcance y mantiene a negocio y tecnología alineados. Usa esta estructura antes de pedir propuestas o asignar un equipo interno.",
    sections: [
      {
        title: "Contexto y objetivos",
        body: [
          "Problema, usuarios afectados y objetivo de negocio cuantificable.",
          "Supuestos de éxito y lo que no está en alcance.",
          "Stakeholders y responsable único de decisiones.",
        ],
      },
      {
        title: "Alcance y priorización",
        body: [
          "Historias de usuario priorizadas (Must/Should/Could).",
          "Integraciones necesarias y APIs disponibles.",
          "Criterios de aceptación claros y demo-ready.",
        ],
      },
      {
        title: "Riesgos, seguridad y datos",
        body: [
          "Riesgos conocidos (legales, técnicos, dependencias externas).",
          "Requisitos de seguridad y cumplimiento básicos (logs, backups, acceso).",
          "Modelo de datos y fuentes de verdad (CRM, ERP, data warehouse).",
        ],
      },
      {
        title: "Métricas y entrega",
        body: [
          "KPIs a medir desde el día 1: adopción, tiempo de tarea, errores.",
          "Plan de QA y entorno de staging obligatorios.",
          "Checklist de handover: manuales, accesos, credenciales y soporte.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Quién debe redactar el brief?",
        a: "Producto/negocio con input técnico. Un responsable único que consolide feedback y decida prioridades.",
      },
      {
        q: "¿Cómo evitar cambios de alcance?",
        a: "Prioriza en Must/Should/Could, define criterios de aceptación y bloquea nuevas peticiones hasta el siguiente sprint o fase.",
      },
      {
        q: "¿Qué formato usar?",
        a: "Documento ligero con secciones fijas y tablas (alcance, riesgos, dependencias). Versiona el archivo y comparte un histórico de cambios.",
      },
    ],
  },
  {
    slug: "kpis-producto-b2b",
    title: "KPIs de producto B2B que importan (y cómo medirlos)",
    description:
      "Selecciona y mide los KPIs clave en producto B2B: activación, retención, expansión, soporte y salud técnica.",
    h1: "KPIs de producto B2B que importan",
    date: "2025-02-22",
    author: baseAuthor,
    tags: ["Producto", "B2B", "Métricas"],
    intro:
      "En B2B las ventas pueden maquillar la realidad. Los KPIs de producto deben validar que hay uso repetido, expansión y costes controlados. Estos son los mínimos para tomar decisiones.",
    sections: [
      {
        title: "Adopción y activación",
        body: [
          "Tasa de activación basada en acciones clave (no solo login).",
          "Time-to-value: tiempo hasta el primer resultado para el usuario.",
          "Usuarios activos semanales por rol (no solo totales).",
        ],
      },
      {
        title: "Retención y expansión",
        body: [
          "Retención por cohorte a 4, 8 y 12 semanas.",
          "Expansión neta: asientos o uso adicional sin ventas forzadas.",
          "Uso de features core vs secundarias para priorizar roadmap.",
        ],
      },
      {
        title: "Calidad y soporte",
        body: [
          "Errores por sesión y tiempo de respuesta en soporte.",
          "Backlog de bugs críticos abierto vs cerrado semanalmente.",
          "Satisfacción rápida (CSAT) tras tickets y NPS trimestral.",
        ],
      },
      {
        title: "Salud técnica",
        body: [
          "Disponibilidad y tiempos de respuesta en endpoints clave.",
          "Ritmo de despliegues y porcentaje revertido.",
          "Deuda visible: módulos sin tests, integraciones frágiles, dependencias sin actualizar.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cuál es un buen benchmark de activación?",
        a: "Depende del caso de uso. Define 1-2 acciones clave (ej. crear proyecto + invitar usuario) y busca >40-60% en 14 días en segmentos core.",
      },
      {
        q: "¿Qué mirar primero, retención o expansión?",
        a: "Primero retención de la funcionalidad core. La expansión sin uso real suele ser frágil y genera churn oculto.",
      },
      {
        q: "¿Cómo reportar a dirección?",
        a: "Un panel mensual con 5 métricas: activación, retención, expansión, NRR y salud técnica (incidentes + deploys revertidos).",
      },
    ],
  },
  {
    slug: "migrar-wordpress-a-nextjs",
    title: "Cómo migrar una web de WordPress a Next.js sin perder SEO",
    description:
      "Pasos para migrar de WordPress a Next.js: inventario de URLs, estrategia de redirecciones, contenido, analítica y rendimiento.",
    h1: "Migrar WordPress a Next.js sin perder tráfico",
    date: "2025-02-26",
    author: baseAuthor,
    tags: ["Migraciones", "SEO técnico", "Next.js"],
    intro:
      "Migrar a Next.js mejora rendimiento y seguridad, pero mal ejecutado puede costar tráfico. Esta guía resume el plan para mover tu sitio desde WordPress sin perder posicionamiento.",
    sections: [
      {
        title: "Planificación e inventario",
        body: [
          "Exportar todas las URLs y métricas clave (tráfico, backlinks, conversiones).",
          "Identificar plantillas necesarias (blog, servicios, categorías).",
          "Priorizar rutas críticas y contenido evergreen.",
        ],
      },
      {
        title: "SEO y redirecciones",
        body: [
          "Mapear 301 uno a uno; evitar redirecciones en cadena.",
          "Mantener slugs y parámetros cuando sea posible.",
          "Probar redirecciones antes de publicar con un entorno de staging.",
        ],
      },
      {
        title: "Contenido y datos",
        body: [
          "Migrar imágenes optimizadas y revisar alt/figcaption.",
          "Recrear schema (Article, FAQ, Breadcrumb) en Next.js.",
          "Configurar analítica y eventos equivalentes a los que ya medías.",
        ],
      },
      {
        title: "Rendimiento y lanzamiento",
        body: [
          "Core Web Vitals: LCP, CLS y TBT medidos en móvil.",
          "Pruebas de estrés en formularios y envíos de correo.",
          "Publicar en ventana de tráfico bajo y monitorizar logs/alertas las primeras 48 h.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Cómo evito perder posiciones al migrar?",
        a: "Mantén slugs, titles y headings, replica el contenido crítico, y prepara redirecciones 301 uno a uno. Verifica que el sitemap nuevo incluye todas las URLs importantes.",
      },
      {
        q: "¿Qué hacer con los plugins de WordPress?",
        a: "Audita funcionalidades imprescindibles (formularios, SEO, caché) y reemplázalas por implementaciones en Next.js o servicios externos. No intentes clonar plugins prescindibles.",
      },
      {
        q: "¿Cómo valido antes de publicar?",
        a: "Usa un entorno de staging con contraseña, pasa un crawler (Screaming Frog) para comparar URLs, y prueba Core Web Vitals en móvil con páginas clave.",
      },
    ],
  },
  {
    slug: "automatizacion-comercial-b2b",
    title: "Automatización comercial B2B sin romper la entrega",
    description:
      "Secuencias comerciales B2B con datos fiables: scoring, cadencias, playbooks y handoff a Customer Success.",
    h1: "Automatización comercial B2B que no quema a los leads",
    date: "2025-03-02",
    author: baseAuthor,
    tags: ["Automatización", "Ventas B2B", "Operaciones"],
    intro:
      "Automatizar sin control quema leads y ensucia datos. Este enfoque prioriza calidad de datos, cadencias cuidadas y handoff claro entre marketing, ventas y CS.",
    sections: [
      {
        title: "Datos y scoring",
        body: [
          "Campos obligatorios: sector, tamaño, rol, problema declarado.",
          "Enriquecimiento automático con fuentes externas y validación de email/teléfono.",
          "Scoring simple (A/B/C) según ICP y señales de intención.",
        ],
      },
      {
        title: "Secuencias y cadencias",
        body: [
          "Primera respuesta < 1 hora, personalizada con el problema citado.",
          "4-6 toques multicanal en 14 días; sin spam masivo.",
          "Plantillas con pruebas sociales y calls-to-action claros (demo, recurso, diagnóstico).",
        ],
      },
      {
        title: "Handoff y entrega",
        body: [
          "Notas estructuradas en CRM: contexto, dolor, próximos pasos.",
          "Checklist de pre-venta para no prometer features inexistentes.",
          "CS recibe expectativas claras y métricas de éxito acordadas.",
        ],
      },
      {
        title: "Medición y mejora continua",
        body: [
          "KPIs: velocidad de respuesta, conversión a demo, win rate y tiempo a cierre.",
          "Revisión mensual de secuencias y limpieza de datos duplicados.",
          "Automatizaciones con fallback manual para leads de alto valor.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué CRM recomiendas para empezar?",
        a: "Uno ligero que tu equipo pueda mantener: HubSpot Starter, Pipedrive o Close. No necesitas Salesforce para validar procesos.",
      },
      {
        q: "¿Cómo evitar spam en secuencias?",
        a: "Limita los toques, personaliza con contexto real y respeta exclusiones. Monitoriza rebotes y quejas; limpia listas cada semana.",
      },
      {
        q: "¿Qué medir en operaciones comerciales?",
        a: "Tiempo a primera respuesta, conversión a reunión, win rate y razón de pérdida. Si uno se hunde, revisa la cadencia y el ICP.",
      },
    ],
  },
  {
    slug: "ia-agentes-pymes-2026",
    title: "IA agéntica para pymes: qué funciona y qué no en 2026",
    description:
      "Guía práctica sobre agentes de IA para pymes: casos reales, riesgos, cómo evaluar ROI y por dónde empezar sin quemarse.",
    h1: "IA agéntica para pymes: casos reales, riesgos y cómo empezar",
    date: "2026-01-10",
    author: baseAuthor,
    tags: ["IA", "Automatización", "Pymes"],
    intro:
      "Los agentes de IA ya no son ciencia ficción: clasifican emails, extraen datos de facturas y generan borradores de propuestas. Pero aplicarlos sin control genera errores silenciosos y frustración. Esta guía resume qué funciona para pymes, qué falla y cómo pilotar de forma segura.",
    sections: [
      {
        title: "Casos que dan ROI real en pymes",
        body: [
          "Clasificación y borrador de respuesta de tickets de soporte con revisión humana.",
          "Extracción de datos de albaranes, facturas y contratos hacia ERP o hoja de cálculo.",
          "Generación de informes recurrentes a partir de datos validados (sin interpretación libre).",
          "Resumen de llamadas o reuniones con acción siguiente y responsable.",
        ],
      },
      {
        title: "Lo que falla sin guardarraíles",
        body: [
          "Alucinaciones en contextos críticos: números, fechas y datos de clientes.",
          "Deriva de comportamiento tras actualizaciones del modelo sin aviso.",
          "Dependencia de un solo proveedor sin fallback ni versionado de prompts.",
          "Ausencia de trazabilidad: si algo falla, no puedes saber qué procesó el agente.",
        ],
      },
      {
        title: "Cómo pilotar de forma segura",
        body: [
          "Empieza con una tarea acotada: una sola fuente de datos, un solo tipo de salida.",
          "Define la métrica de calidad antes de lanzar (ej. precisión > 95% en extracción).",
          "Revisión humana obligatoria en el piloto; automatiza solo cuando la calidad sea consistente.",
          "Observabilidad desde el día 1: logs de entradas, salidas y rechazos.",
        ],
      },
      {
        title: "Evaluar ROI antes de escalar",
        body: [
          "Mide horas ahorradas reales, no potenciales.",
          "Añade coste de prompt engineering, supervisión y mantenimiento del modelo.",
          "Calcula el coste de un error: si un error tiene consecuencias legales o económicas altas, el ROI se reduce.",
          "Revisa cada trimestre: los modelos mejoran, pero los costes de API también varían.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué modelo de IA usar para automatizaciones en pymes?",
        a: "Depende del caso. Para extracción estructurada: modelos económicos con función calling (GPT-4o mini, Gemini Flash). Para redacción o análisis: modelos más capaces. Lo más importante es versionar los prompts y medir calidad.",
      },
      {
        q: "¿Es seguro conectar IA a datos de clientes?",
        a: "Sí, con las medidas adecuadas: control de acceso, anonimización donde sea posible, acuerdos DPA con el proveedor y logs. Empieza con datos no sensibles y amplía de forma controlada.",
      },
      {
        q: "¿Cuánto tarda un piloto de IA en una pyme?",
        a: "Un piloto funcional de una tarea acotada suele estar listo en 3-5 semanas: una semana de análisis, dos de desarrollo y dos de validación con datos reales.",
      },
    ],
  },
  {
    slug: "arquitectura-nextjs-seo-2026",
    title: "Arquitectura Next.js para SEO técnico en 2026: lo que importa",
    description:
      "App Router, Server Components, ISR, sitemap dinámico y Core Web Vitals. Cómo estructurar un proyecto Next.js que posicione bien.",
    h1: "Next.js y SEO técnico en 2026: arquitectura que posiciona",
    date: "2026-01-28",
    author: baseAuthor,
    tags: ["Next.js", "SEO técnico", "Rendimiento"],
    intro:
      "Con el App Router consolidado y los Core Web Vitals como señal de ranking, la arquitectura del proyecto marca la diferencia entre una web que posiciona y una que no. Este artículo resume las decisiones clave de configuración para proyectos Next.js orientados a SEO.",
    sections: [
      {
        title: "Server Components y renderizado para SEO",
        body: [
          "Usa Server Components por defecto: el HTML llega completo al crawler sin JS.",
          "Reserva Client Components ('use client') para interactividad real: formularios, tabs, sliders.",
          "generateMetadata por ruta: title, description, canonical y og:image distintos en cada página.",
          "Evita el patrón 'fetch en cliente + spinner': el crawler ve un skeleton vacío.",
        ],
      },
      {
        title: "ISR y caché para páginas con datos",
        body: [
          "revalidate = 86400 en páginas de contenido estable (servicios, blog); más bajo en precios o inventario.",
          "generateStaticParams para rutas dinámicas de alto tráfico: el build las pre-renderiza.",
          "fetch cache: 'force-cache' con next.revalidate para controlar granularidad por endpoint.",
          "Evita force-dynamic en páginas que no lo necesiten: penaliza TTFB y coste de servidor.",
        ],
      },
      {
        title: "Sitemap y robots dinámicos",
        body: [
          "sitemap.ts con rutas estáticas + dinámicas (blog, productos): actualización automática en cada build.",
          "robots.ts que bloquee /api, /admin y parámetros de tracking (?utm_*, ?ref=).",
          "Canonical explícito en todas las rutas, incluidas paginaciones y filtros.",
          "hreflang si hay versiones en varios idiomas; sin él Google puede elegir la URL incorrecta.",
        ],
      },
      {
        title: "Core Web Vitals: las palancas reales",
        body: [
          "LCP: imagen hero con priority={true} y tamaños responsive correctos (srcSet).",
          "CLS: reserva de espacio en imágenes y fuentes (font-display: swap con subset).",
          "INP: evita handlers síncronos pesados en eventos de usuario; usa startTransition para actualizaciones no urgentes.",
          "Mide en campo (CrUX) y en laboratorio (Lighthouse CI en cada PR).",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Merece la pena migrar de Pages Router a App Router en 2026?",
        a: "Para proyectos nuevos, sí claramente. Para migraciones, evalúa el tamaño: si tienes más de 50 páginas con lógica compleja, migra de forma incremental usando el layout compartido.",
      },
      {
        q: "¿Cómo gestiono el canonical en rutas con parámetros?",
        a: "Genera el canonical en generateMetadata con la URL limpia (sin parámetros de tracking). En rutas con paginación, el canonical de la página 2 apunta a sí misma, no a la página 1.",
      },
      {
        q: "¿Necesito un sitemap por sección o uno global?",
        a: "Un sitemap global suele ser suficiente. Divide en múltiples sitemaps solo si superas 50.000 URLs o quieres métricas separadas por sección en Google Search Console.",
      },
    ],
  },
  {
    slug: "presupuesto-software-medida-2026",
    title: "Cuánto cuesta el software a medida en 2026: rangos y guía",
    description:
      "Rangos de precio para proyectos de software a medida en España: apps internas, integraciones ERP/CRM y plataformas. Factores reales que suben o bajan el coste.",
    h1: "Cuánto cuesta el software a medida en 2026",
    date: "2026-02-12",
    author: baseAuthor,
    tags: ["Software a medida", "Presupuesto", "Pymes"],
    intro:
      "Los presupuestos de software a medida varían desde 5.000 € hasta más de 100.000 € dependiendo del alcance, las integraciones y el equipo. Aquí tienes los rangos reales del mercado español en 2026 y los factores que de verdad importan para no quemar presupuesto.",
    sections: [
      {
        title: "Rangos de mercado en España (2026)",
        body: [
          "Herramienta interna simple (1-3 módulos, sin integraciones): 5.000 € – 12.000 €.",
          "App con integraciones a ERP/CRM y automatizaciones moderadas: 12.000 € – 30.000 €.",
          "Plataforma con múltiples roles, seguridad reforzada y reporting: 30.000 € – 80.000 €.",
          "Soporte y mantenimiento post-lanzamiento: 8-15 % del coste de desarrollo por año.",
        ],
      },
      {
        title: "Factores que disparan el coste",
        body: [
          "Integraciones: cada API externa (ERP, CRM, pasarela de pagos) añade 2.000 €–8.000 €.",
          "Requisitos de seguridad y cumplimiento: SSO, auditoría de accesos, cifrado de datos sensibles.",
          "Múltiples entornos: staging, producción y disaster recovery con CI/CD completo.",
          "Alcance mal definido: el scope creep puede duplicar tiempos y presupuesto.",
        ],
      },
      {
        title: "Qué incluye una propuesta seria",
        body: [
          "Discovery documentado: objetivos, backlog priorizado y criterios de aceptación.",
          "Arquitectura básica: diagrama de módulos, integraciones y modelo de datos.",
          "Entrega iterativa: demos quincenales o mensuales con entregables medibles.",
          "Handover completo: repositorio, documentación técnica, accesos y formación.",
        ],
      },
      {
        title: "Cómo reducir riesgo sin bajar calidad",
        body: [
          "Empieza con un MVP acotado: valida el uso real antes de invertir en el producto completo.",
          "Define el alcance por Must/Should/Could y bloquea el scope en el contrato.",
          "Pide referencias de proyectos similares en tamaño y sector.",
          "Evita presupuestos sin discovery previo: nadie puede dar un precio fiable sin entender el problema.",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Es mejor un equipo interno o una agencia?",
        a: "Depende del volumen y continuidad. Para proyectos puntuales o cuando no hay equipo técnico propio, una agencia o consultora es más eficiente. Para producto en evolución constante, construye equipo interno apoyado en partners externos.",
      },
      {
        q: "¿Cuánto tarda un proyecto de software a medida?",
        a: "El primer release suele estar en 8-14 semanas para proyectos de complejidad media. Con buena definición de alcance y demos iterativas, los plazos son más predecibles.",
      },
      {
        q: "¿Qué pasa con el mantenimiento?",
        a: "Presupuesta mantenimiento desde el inicio: actualizaciones de seguridad, corrección de bugs y pequeñas mejoras. El coste típico es del 10-15% del desarrollo por año.",
      },
    ],
  },
  {
    slug: "integraciones-erp-crm-pymes",
    title: "Integrar ERP y CRM en pymes: guía sin humo",
    description:
      "Cómo integrar ERP y CRM en una pyme sin un proyecto millonario: estrategia, tecnología y errores a evitar.",
    h1: "Integrar ERP y CRM en una pyme: estrategia práctica",
    date: "2026-03-05",
    author: baseAuthor,
    tags: ["Integraciones", "ERP", "CRM"],
    intro:
      "La mayoría de pymes trabajan con datos duplicados entre ERP y CRM: el comercial ve el CRM, el contable ve el ERP y nadie sabe cuál tiene la verdad. Integrarlos no requiere un proyecto de 6 meses; requiere una estrategia clara y empezar por el caso de uso correcto.",
    sections: [
      {
        title: "Por qué la integración falla a menudo",
        body: [
          "Se integra todo a la vez: pedidos, inventario, clientes, facturas, presupuestos — demasiado scope.",
          "No hay fuente de verdad definida: ¿el cliente se crea en el ERP o en el CRM?",
          "Transformaciones de datos no documentadas: el campo 'estado' tiene 12 valores distintos en cada sistema.",
          "Mantenimiento olvidado: el primer cambio de API rompe la integración y nadie lo detecta hasta una semana después.",
        ],
      },
      {
        title: "Arquitectura de integración mínima viable",
        body: [
          "Define la fuente de verdad por entidad: cliente → CRM, factura → ERP, pedido → ERP.",
          "Eventos, no polling: suscríbete a webhooks en lugar de consultar cada N minutos.",
          "Capa de transformación explícita: un servicio que mapea campos y versiona el contrato.",
          "Observabilidad: logs de cada evento, alertas si falla un sync y dashboard de estado.",
        ],
      },
      {
        title: "Casos de uso de mayor impacto",
        body: [
          "Sincronización de clientes: un cliente nuevo en CRM aparece automáticamente en ERP.",
          "Pedido cerrado → factura draft en ERP sin intervención manual.",
          "Stock bajo en ERP → alerta automática en CRM para que el comercial no prometa lo que no hay.",
          "Historial de compras en ficha de cliente del CRM para conversaciones de venta más efectivas.",
        ],
      },
      {
        title: "Hoja de ruta en 3 fases",
        body: [
          "Fase 1 (2-4 semanas): mapeo de entidades, fuentes de verdad y primer conector unidireccional.",
          "Fase 2 (4-8 semanas): sincronización bidireccional con resolución de conflictos y alertas.",
          "Fase 3 (ongoing): automatizaciones sobre los datos integrados (informes, alertas, scoring).",
        ],
      },
    ],
    faqs: [
      {
        q: "¿Qué herramienta uso para integrar ERP y CRM?",
        a: "Depende del ecosistema. Para integraciones simples con sistemas cloud: Zapier o Make. Para mayor control y volumen: una API a medida o middleware propio. Evita soluciones iPaaS costosas si el uso es puntual.",
      },
      {
        q: "¿Cuánto tarda una integración básica?",
        a: "Una integración unidireccional bien definida (ej. cliente CRM → ERP) puede estar lista en 2-3 semanas. Bidireccional con gestión de conflictos: 4-8 semanas.",
      },
      {
        q: "¿Cómo evito que la integración se rompa?",
        a: "Versiona los contratos de API, añade alertas en fallos y revisa los logs semanalmente. El mayor riesgo es un cambio de versión en el proveedor que nadie detecta a tiempo.",
      },
    ],
  },
];

export const postsMeta: PostMeta[] = posts.map(({ slug, title, description, h1, date, author, tags }) => ({
  slug,
  title,
  description,
  h1,
  date,
  author,
  tags,
}));

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getLatestPosts(limit?: number): PostMeta[] {
  return posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit ?? posts.length)
    .map(({ slug, title, description, h1, date, author, tags }) => ({
      slug,
      title,
      description,
      h1,
      date,
      author,
      tags,
    }));
}

export function getPostsWithReadingTime(limit?: number) {
  return posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit ?? posts.length)
    .map((post) => ({
      ...post,
      readingTime: estimateReadingTime(post),
    }));
}

export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const filtered = posts.filter((p) => p.slug !== slug);
  return filtered.slice(0, limit).map(({ slug, title, description, h1, date, author, tags }) => ({
    slug,
    title,
    description,
    h1,
    date,
    author,
    tags,
  }));
}
