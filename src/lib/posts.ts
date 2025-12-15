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
