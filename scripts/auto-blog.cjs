#!/usr/bin/env node
/**
 * auto-blog.cjs — Generates a new SEO blog post, injects it into posts.ts,
 * updates the sitemap date and commits + pushes to main.
 *
 * Usage:
 *   node scripts/auto-blog.cjs
 *
 * The script picks the next unpublished topic from a curated editorial calendar
 * aligned with Qubelia's 90-day SEO plan for the Spanish B2B market.
 *
 * It is designed to be run by a scheduled task (cron / Windows Task Scheduler)
 * once per week to maintain a consistent publishing cadence.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── Paths ───────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, "..");
const POSTS_FILE = path.join(ROOT, "src", "lib", "posts.ts");
const SITEMAP_FILE = path.join(ROOT, "src", "app", "sitemap.ts");
const STATE_FILE = path.join(__dirname, ".auto-blog-state.json");

// ── Helpers ─────────────────────────────────────────────────────────────
function today() {
  return new Date().toISOString().slice(0, 10);
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readState() {
  if (fs.existsSync(STATE_FILE)) return JSON.parse(fs.readFileSync(STATE_FILE, "utf8"));
  return { published: [] };
}

function writeState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf8", stdio: "pipe" });
}

// ── Editorial Calendar ──────────────────────────────────────────────────
// Each entry is a complete blog post ready to inject.
// Add more entries to extend the publishing calendar.
const EDITORIAL_CALENDAR = [
  {
    id: "migracion-legacy",
    slug: "migracion-software-legacy-guia-empresas-2026",
    title: "Migración de software legacy: Guía completa para empresas en 2026",
    description:
      "Cómo migrar sistemas legacy sin paralizar tu empresa. Estrategias de migración progresiva, gestión de riesgos y casos reales de modernización en España.",
    h1: "Migración de software legacy: Cómo modernizar sin romper lo que funciona",
    tags: ["Software legacy", "Migración", "Modernización", "B2B"],
    intro:
      "Tu ERP tiene 15 años, funciona sobre Windows Server 2012 y solo una persona en la empresa sabe cómo mantenerlo. Suena familiar? El software legacy no es un problema hasta que lo es: un fallo crítico, una actualización de seguridad incompatible o la jubilación del único técnico que lo entiende. En 2026, migrar no es opcional; es gestión de riesgos. Pero migrar mal puede ser peor que no migrar. Esta guía explica cómo hacerlo de forma segura, progresiva y sin paralizar tu operativa.",
    sections: [
      {
        title: "Cuándo tu software pasa de 'legacy' a 'riesgo operativo'",
        body: [
          "El software legacy no es malo por ser antiguo. Es malo cuando cumple una o más de estas condiciones: el proveedor original ya no existe o no da soporte, la tecnología sobre la que se ejecuta está fuera de su ciclo de vida de seguridad, solo una o dos personas en la empresa entienden cómo funciona, o no puede integrarse con las herramientas modernas que necesitas.",
          "El verdadero peligro no es que el sistema falle hoy. Es que cuando falle (y fallará), el coste de la parada será catastrófico. Si tu ERP se cae un viernes y necesitas 72 horas para recuperarlo, ¿cuánto facturación pierdes? ¿Cuántos clientes se ven afectados? Esa cifra es el coste de no migrar.",
          "En España, el 38% de las pymes industriales aún opera con software desarrollado antes de 2015. Muchos de estos sistemas funcionan sobre bases de datos obsoletas (Access, FoxPro) o lenguajes sin comunidad activa (Visual Basic 6, Delphi). Cada año que pasa, encontrar un programador que pueda mantener esto es más difícil y más caro.",
        ],
      },
      {
        title: "Estrategia de migración progresiva: El patrón Strangler Fig",
        body: [
          "La peor decisión es intentar reescribir todo desde cero. Los proyectos de reescritura total fracasan en más del 60% de los casos porque subestiman la complejidad oculta del sistema antiguo y tardan tanto que los requisitos cambian durante el desarrollo.",
          "La alternativa inteligente es el patrón 'Strangler Fig' (Higuera Estranguladora): construyes el nuevo sistema alrededor del antiguo, migrando funcionalidades una a una. El sistema legacy sigue funcionando mientras el nuevo crece y lo va reemplazando gradualmente.",
          "Fase 1: Identifica los módulos más críticos y los que más dolor causan. No empieces por el más importante; empieza por el que tiene mayor impacto con menor riesgo. Un módulo de reporting o de gestión de documentos es un buen candidato inicial.",
          "Fase 2: Crea una capa de integración (API gateway) entre el sistema antiguo y el nuevo. Esto permite que ambos coexistan y compartan datos sin conflictos.",
          "Fase 3: Migra módulo a módulo, validando cada uno en producción con usuarios reales antes de pasar al siguiente. Cuando el último módulo migre, el sistema legacy se apaga solo.",
        ],
      },
      {
        title: "Gestión de datos: El reto que nadie presupuesta",
        body: [
          "La migración de datos es el 50% del esfuerzo de cualquier proyecto de modernización y suele ser el 10% del presupuesto. Este desajuste es la causa número uno de fracasos.",
          "Los sistemas legacy acumulan años de datos con inconsistencias: clientes duplicados, campos usados para propósitos distintos a su nombre, registros huérfanos y formatos de fecha incompatibles. Antes de migrar datos, necesitas limpiarlos.",
          "La limpieza de datos no es un paso técnico; es un paso de negocio. Solo el equipo que trabaja con esos datos puede decidir qué registros son válidos, cuáles se fusionan y cuáles se descartan. Planifica talleres de limpieza de datos con los usuarios clave y asigna al menos 2-4 semanas exclusivamente para esta tarea.",
          "Un consejo crítico: nunca borres los datos del sistema antiguo. Mantén una copia de la base de datos legacy accesible durante al menos 12 meses después de la migración. Te ahorrará crisis cuando alguien pregunte por una factura de 2019.",
        ],
      },
      {
        title: "Gestión del cambio: El factor humano",
        body: [
          "La resistencia al cambio no es un capricho de los empleados; es una respuesta lógica al miedo de perder competencia. Si alguien lleva 10 años dominando el sistema antiguo y ahora le pides que aprenda uno nuevo, siente que su valor en la empresa disminuye.",
          "La solución es involucrar a los usuarios clave desde el día 1. No como espectadores, sino como co-diseñadores del nuevo sistema. Si el administrativo que procesa 200 pedidos al día participa en definir cómo será la nueva pantalla de pedidos, la adoptará como suya.",
          "La formación debe ser práctica y progresiva. Nada de manuales de 80 páginas. Sesiones de 2 horas con datos reales, acompañamiento durante las primeras semanas y un canal directo para resolver dudas sin burocracia.",
          "Celebra las victorias tempranas. Cuando el primer módulo migrado ahorre tiempo real y los usuarios lo confirmen, tienes la mejor herramienta de gestión del cambio: la prueba de que funciona.",
        ],
      },
    ],
    highlights: [
      "El 38% de pymes industriales en España opera con software anterior a 2015.",
      "El patrón Strangler Fig permite migrar sin parar la operativa.",
      "La limpieza de datos es el 50% del esfuerzo pero suele ser el 10% del presupuesto.",
      "Involucrar a los usuarios clave desde el día 1 multiplica la tasa de adopción.",
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo lleva migrar un sistema legacy completo?",
        a: "Depende de la complejidad, pero para una pyme típica con un ERP legacy, el proceso completo (diagnóstico, migración progresiva y cierre del sistema antiguo) suele durar entre 6 y 18 meses. Lo importante es que desde el mes 2-3 ya hay módulos nuevos en producción generando valor.",
      },
      {
        q: "¿Puedo seguir usando el sistema antiguo mientras se construye el nuevo?",
        a: "Sí, esa es precisamente la ventaja de la migración progresiva. Ambos sistemas coexisten durante todo el proceso. Los usuarios van migrando módulo a módulo, no de golpe. Esto elimina el riesgo del 'big bang' donde todo puede fallar a la vez.",
      },
      {
        q: "¿Qué pasa con los informes y el histórico de datos?",
        a: "Todos los datos históricos se migran al nuevo sistema con validación. Además, mantenemos acceso de solo lectura al sistema legacy durante al menos 12 meses para consultas puntuales que puedan surgir.",
      },
    ],
    cta: {
      label: "Solicitar diagnóstico de migración",
      href: "/#contacto",
      text: "¿Tu sistema legacy te preocupa? Evaluamos su estado, sus riesgos y te proponemos una hoja de ruta de migración sin parar tu negocio.",
    },
  },
  {
    id: "automatizacion-facturacion-electronica",
    slug: "automatizacion-facturacion-electronica-espana-obligatoria-2026",
    title: "Facturación electrónica obligatoria en España: Cómo automatizarla en 2026",
    description:
      "Guía práctica sobre la facturación electrónica obligatoria B2B en España. Plazos legales, requisitos técnicos, integración con ERP y automatización completa.",
    h1: "Facturación electrónica obligatoria: Guía de automatización para empresas B2B",
    tags: ["Facturación electrónica", "Automatización", "España", "ERP"],
    intro:
      "La facturación electrónica B2B será completamente obligatoria en España para todas las empresas. No es una tendencia; es ley. Para las pymes que aún facturan con PDFs enviados por email o, peor, con facturas en papel, el reloj corre. Pero la obligación legal es también la mayor oportunidad de automatización de la última década. Las empresas que integren la facturación electrónica correctamente no solo cumplirán la ley: ahorrarán miles de horas al año, cobrarán más rápido y tendrán una visibilidad financiera que antes era imposible.",
    sections: [
      {
        title: "Marco legal: Qué dice la ley y qué plazos tienes",
        body: [
          "La Ley Crea y Crece (Ley 18/2022) establece la obligatoriedad de la factura electrónica en todas las relaciones B2B en España. Los plazos de implementación dependen del tamaño de la empresa: las empresas con facturación superior a 8 millones de euros ya deben estar adaptadas, y el resto de empresas tiene un plazo adicional de 12-24 meses desde la publicación del reglamento técnico.",
          "El formato estándar es Facturae (versión 3.2.x), que es un XML estructurado con firma electrónica. Esto significa que un PDF con tu logo no es una factura electrónica válida, aunque muchas empresas aún lo crean así.",
          "La ley también exige la conservación de facturas electrónicas durante un mínimo de 4 años (6 para determinados supuestos), con garantía de integridad, autenticidad y legibilidad. Esto implica un sistema de almacenamiento que cumpla con la normativa, no una carpeta de Gmail.",
          "Las sanciones por incumplimiento pueden alcanzar los 10.000€ por factura no emitida en formato electrónico. El regulador aún está definiendo el régimen sancionador exacto, pero la dirección es clara: cumplir no es opcional.",
        ],
      },
      {
        title: "Arquitectura de automatización: Del pedido al cobro sin intervención manual",
        body: [
          "La facturación electrónica no debería ser 'hacer lo mismo pero en XML en vez de PDF'. Es la oportunidad de automatizar todo el ciclo Order-to-Cash: desde que se confirma un pedido hasta que se registra el cobro.",
          "Flujo automatizado ideal: 1) El comercial cierra un deal en el CRM → 2) El sistema genera automáticamente el pedido en el ERP → 3) Al completar el servicio/entrega, se genera la factura electrónica en formato Facturae con firma digital → 4) Se envía automáticamente al cliente por el canal requerido → 5) Se registra la factura en el SII (Suministro Inmediato de Información) de la AEAT → 6) Se programa el seguimiento automático de cobro.",
          "Cada paso manual que eliminas del proceso reduce el tiempo medio de cobro (DSO). Las empresas que automatizan completamente este flujo reportan una reducción del DSO de 45-60 días a 20-30 días. Para una empresa que factura 500.000€/año, eso son decenas de miles de euros de liquidez recuperada.",
          "La integración con el sistema de contabilidad también debe ser automática. La factura emitida se contabiliza, el pago recibido se concilia y el IVA se calcula sin intervención humana. El administrativo pasa de 'introducir facturas' a 'supervisar excepciones'.",
        ],
      },
      {
        title: "Integración con ERPs españoles: Soluciones prácticas",
        body: [
          "Los ERPs más utilizados por pymes en España (Sage 200, A3ERP, Holded, Odoo, SAP Business One) ya tienen módulos de facturación electrónica, pero su nivel de automatización varía enormemente.",
          "Para Sage y A3, existen conectores nativos que generan Facturae, pero la automatización del envío, seguimiento y conciliación suele requerir desarrollo adicional o herramientas intermedias.",
          "Para ERPs legacy o desarrollos propios, la solución más eficiente es crear una capa middleware que: reciba los datos de la factura del ERP vía API o lectura de base de datos, genere el XML Facturae con firma electrónica, lo envíe al destinatario y registre el resultado en el sistema de origen.",
          "Esta capa middleware también puede gestionar la comunicación con el SII de la AEAT, automatizando la declaración de IVA en tiempo real y eliminando la carga trimestral que hoy consume horas de trabajo contable.",
          "En Qubelia hemos implementado este tipo de integración para distribuidoras y empresas de servicios técnicos, reduciendo el tiempo de facturación de 3-5 días a menos de 24 horas desde la finalización del servicio.",
        ],
      },
      {
        title: "Errores comunes y cómo evitarlos",
        body: [
          "Error 1: Esperar al último momento. La implementación de facturación electrónica real (no un parche) requiere entre 4 y 12 semanas dependiendo de la complejidad de tu ERP. Si esperas a que la obligación sea inminente, pagarás sobrecostes de urgencia y arriesgas sanciones.",
          "Error 2: Confundir PDF con factura electrónica. Un PDF es una imagen de una factura. Una factura electrónica es un XML estructurado con firma digital que puede ser procesado automáticamente por el sistema del receptor. Son cosas completamente diferentes.",
          "Error 3: No validar la firma electrónica. El formato Facturae requiere firma electrónica reconocida. Asegúrate de que tu certificado digital está vigente y de que el proceso de firma está integrado en el flujo automático.",
          "Error 4: Ignorar la gestión de rechazos. El receptor puede rechazar una factura electrónica por errores en los datos. Tu sistema debe gestionar estos rechazos automáticamente: notificar al responsable, corregir y reenviar sin perder la trazabilidad.",
        ],
      },
    ],
    highlights: [
      "Las sanciones pueden alcanzar los 10.000€ por factura no emitida en formato electrónico.",
      "La automatización completa del ciclo Order-to-Cash reduce el DSO de 45-60 días a 20-30 días.",
      "La implementación real requiere entre 4 y 12 semanas según la complejidad del ERP.",
      "Un PDF no es una factura electrónica: se requiere formato Facturae (XML) con firma digital.",
    ],
    faqs: [
      {
        q: "¿Mi programa de facturación actual genera facturas electrónicas válidas?",
        a: "Depende. Si genera archivos en formato Facturae 3.2.x con firma electrónica, sí. Si genera PDFs (aunque los llame 'facturas electrónicas'), no. La forma más rápida de verificarlo es comprobar si el archivo generado es un XML con extensión .xsig y contiene una firma digital.",
      },
      {
        q: "¿Necesito un certificado digital específico para la facturación electrónica?",
        a: "Necesitas un certificado digital de persona jurídica o de representante emitido por un prestador reconocido (FNMT, Camerfirma, etc.). Si ya usas certificado digital para presentar impuestos ante la AEAT, ese mismo certificado suele valer para firmar facturas electrónicas.",
      },
      {
        q: "¿Qué pasa con mis clientes que no tienen sistema para recibir facturas electrónicas?",
        a: "La ley obliga a ambas partes. El receptor debe poder recibir y procesar facturas electrónicas. En la práctica, existirán plataformas públicas de intercambio donde podrás depositar la factura para que tu cliente la descargue, similar al modelo italiano SDI.",
      },
    ],
    cta: {
      label: "Preparar mi facturación electrónica",
      href: "/#contacto",
      text: "¿Tu sistema está preparado para la facturación electrónica obligatoria? Evaluamos tu situación y te proponemos un plan de implementación con plazos claros.",
    },
  },
  {
    id: "ia-generativa-procesos-b2b",
    slug: "ia-generativa-aplicaciones-practicas-empresas-b2b-2026",
    title: "IA generativa para empresas B2B: 8 aplicaciones prácticas que funcionan en 2026",
    description:
      "Aplicaciones reales de la IA generativa en empresas B2B más allá del hype. Generación de propuestas, análisis de contratos, atención al cliente y automatización documental.",
    h1: "IA generativa en B2B: 8 aplicaciones que ya generan ROI en 2026",
    tags: ["IA", "IA generativa", "B2B", "Productividad"],
    intro:
      "La IA generativa ha pasado del hype al pragmatismo. En 2024 todo el mundo hablaba de ChatGPT; en 2026, las empresas B2B inteligentes ya no preguntan '¿debería usar IA?' sino '¿en qué procesos concretos me genera retorno?'. La respuesta no es 'en todo'. Es en tareas específicas donde la IA generativa ahorra tiempo real, reduce errores y permite a tu equipo enfocarse en lo que realmente importa: cerrar negocios y servir bien a tus clientes. Estas son las 8 aplicaciones que hemos implementado con resultados medibles.",
    sections: [
      {
        title: "Generación automática de propuestas comerciales",
        body: [
          "El proceso de crear una propuesta comercial personalizada consume entre 4 y 12 horas de trabajo de un perfil senior. Con IA generativa integrada en tu CRM, este tiempo baja a 30-60 minutos.",
          "El sistema analiza la ficha del cliente (sector, tamaño, necesidades identificadas en las notas del CRM), cruza la información con propuestas anteriores exitosas y genera un primer borrador con estructura profesional, pricing adaptado y casos de referencia relevantes.",
          "El comercial revisa, ajusta y personaliza el toque humano. El resultado: propuestas más rápidas, más consistentes y con mayor tasa de conversión. Un cliente del sector industrial pasó de enviar 8 propuestas al mes a 25, manteniendo el mismo equipo comercial.",
        ],
      },
      {
        title: "Análisis y resumen de contratos y documentación legal",
        body: [
          "Revisar un contrato de 40 páginas para extraer las cláusulas clave (plazos, penalizaciones, exclusiones, renovación automática) consume horas de trabajo de un perfil jurídico o de dirección.",
          "Un agente de IA entrenado con tu base de contratos puede resumir el documento en 2 minutos, señalar las cláusulas que difieren de tu estándar y alertar sobre riesgos específicos. No sustituye al abogado, pero le ahorra el 80% del trabajo de lectura inicial.",
          "En empresas que gestionan decenas de contratos mensuales (distribuidoras, empresas de servicios técnicos, consultoras), esta automatización libera cientos de horas al año de perfiles caros.",
        ],
      },
      {
        title: "Atención al cliente de nivel 2 con contexto empresarial",
        body: [
          "Los chatbots de atención al cliente han existido durante años, pero eran rígidos y frustrantes. La IA generativa en 2026 permite crear asistentes que realmente entienden el contexto: acceden al historial del cliente, conocen tu catálogo de productos y pueden resolver consultas complejas como cambios de pedido, reclamaciones y consultas técnicas.",
          "La clave es la integración. Un chatbot con IA pero sin acceso a tu ERP y CRM solo puede dar respuestas genéricas. Conectado a tus sistemas, puede decir: 'Tu pedido #4521 se envió ayer con Seur, el tracking es X y la entrega estimada es mañana entre 10h y 14h'. Eso es útil. Eso reduce llamadas al equipo de soporte un 40-60%.",
          "Importante: la IA gestiona el 70-80% de las consultas. El 20-30% restante (reclamaciones complejas, negociaciones, excepciones) se escala a un humano con todo el contexto ya recopilado. El agente humano no empieza de cero; empieza informado.",
        ],
      },
      {
        title: "Generación de contenido técnico y marketing",
        body: [
          "Crear un artículo técnico de 2.000 palabras, fichas de producto actualizadas o emails de nurturing para cada segmento de cliente es trabajo que pocas pymes tienen tiempo de hacer bien.",
          "La IA generativa produce primeros borradores de alta calidad que un experto humano revisa y valida en una fracción del tiempo. El flujo ideal: el equipo de marketing define el tema y las keywords objetivo, la IA genera el borrador estructurado con datos y argumentos, y el humano añade la experiencia propia, los matices del mercado español y la voz de marca.",
          "Esto permite mantener una cadencia de publicación de 2-4 artículos semanales con un equipo mínimo, algo que antes solo podían permitirse empresas con departamentos de marketing completos.",
        ],
      },
      {
        title: "Clasificación y extracción de datos de documentos",
        body: [
          "Albaranes de entrega escaneados, partes de trabajo escritos a mano, certificaciones de proveedores en PDF... Las empresas B2B manejan documentos de múltiples formatos que necesitan ser clasificados, procesados y registrados en el ERP.",
          "La IA con visión (multimodal) puede leer un albarán fotografiado con el móvil, extraer los datos relevantes (número de pedido, cantidades, firma) y registrarlos automáticamente en tu sistema. Lo que antes era una hora de trabajo administrativo se convierte en 10 segundos.",
          "Las tasas de precisión en 2026 superan el 95% para documentos semiestructurados. Para el 5% restante, el sistema marca el documento para revisión humana en lugar de registrar datos incorrectos.",
        ],
      },
      {
        title: "Análisis predictivo de ventas y churn",
        body: [
          "Con datos históricos de tu CRM (deals ganados, perdidos, tiempo en cada fase, interacciones), un modelo de IA puede predecir qué oportunidades tienen mayor probabilidad de cierre y qué clientes están en riesgo de abandono.",
          "Esto permite al director comercial asignar recursos de forma inteligente: dedicar más atención a las oportunidades calientes y activar campañas de retención antes de que el cliente se vaya, no después.",
          "Los modelos no necesitan millones de datos. Con 200-500 registros históricos de ventas, ya se pueden construir predicciones útiles que mejoran con cada dato nuevo.",
        ],
      },
      {
        title: "Automatización de informes y reporting",
        body: [
          "El informe semanal de ventas. El reporte mensual de operaciones. El cuadro de mando trimestral para el consejo. Son tareas que consumen horas y que, seamos honestos, casi nadie disfruta.",
          "La IA generativa puede crear informes narrativos a partir de datos brutos: no solo gráficos, sino texto explicativo que contextualiza las cifras. 'Las ventas crecieron un 12% respecto al mes anterior, impulsadas principalmente por el sector logístico (+28%). Sin embargo, el sector retail muestra una tendencia descendente del 8% que requiere atención'.",
          "Estos informes se generan automáticamente con la periodicidad que definas y se envían por email al equipo directivo. El tiempo de preparación pasa de 4-6 horas a cero.",
        ],
      },
      {
        title: "Onboarding automatizado de nuevos clientes",
        body: [
          "Cuando un nuevo cliente firma, comienza un proceso de onboarding que incluye recopilar documentación, configurar accesos, presentar al equipo asignado y establecer las bases del proyecto.",
          "Un flujo automatizado con IA puede: enviar el kit de bienvenida personalizado, solicitar la documentación necesaria con formularios inteligentes, crear las cuentas y accesos en tus sistemas, agendar la reunión de kickoff y generar el plan de proyecto inicial basado en el tipo de servicio contratado.",
          "El resultado: el cliente siente una experiencia profesional y ágil desde el minuto uno, y tu equipo ahorra entre 3 y 5 horas de trabajo administrativo por cada nuevo cliente.",
        ],
      },
    ],
    highlights: [
      "La generación de propuestas con IA reduce el tiempo de 4-12 horas a 30-60 minutos.",
      "Los asistentes con IA conectados al ERP y CRM reducen llamadas de soporte un 40-60%.",
      "La extracción automática de datos de documentos supera el 95% de precisión.",
      "El reporting automatizado elimina 4-6 horas semanales de trabajo manual de dirección.",
    ],
    faqs: [
      {
        q: "¿Los datos de mi empresa se usan para entrenar la IA?",
        a: "No si se implementa correctamente. Utilizamos instancias privadas de modelos de IA (Azure OpenAI, AWS Bedrock) con contratos que garantizan que tus datos no se usan para entrenamiento. La privacidad y el cumplimiento del RGPD son innegociables.",
      },
      {
        q: "¿Qué nivel técnico necesita mi equipo para usar estas herramientas?",
        a: "Ninguno. Las interfaces están diseñadas para perfiles de negocio. Si tu equipo sabe usar un CRM y un email, puede usar estas herramientas. La complejidad técnica está en la implementación, no en el uso diario.",
      },
      {
        q: "¿Cuánto cuesta implementar una de estas soluciones?",
        a: "Depende del alcance. Una integración de IA puntual (generador de propuestas o clasificador de documentos) cuesta entre 5.000 y 15.000€. Un ecosistema completo con múltiples agentes de IA conectados puede costar entre 25.000 y 60.000€. El ROI suele ser positivo en los primeros 3-6 meses.",
      },
    ],
    cta: {
      label: "Identificar oportunidades de IA en mi empresa",
      href: "/#contacto",
      text: "¿Quieres saber qué procesos de tu empresa pueden beneficiarse de la IA generativa? Lo analizamos juntos en una sesión de 45 minutos.",
    },
  },
  {
    id: "seo-tecnico-web-b2b",
    slug: "seo-tecnico-para-webs-b2b-checklist-2026",
    title: "SEO técnico para webs B2B: Checklist completa 2026",
    description:
      "Guía de SEO técnico para empresas B2B en España. Core Web Vitals, datos estructurados, indexación, rendimiento y errores comunes que destruyen tu posicionamiento.",
    h1: "SEO técnico para webs B2B: Todo lo que necesitas en 2026",
    tags: ["SEO", "Web a medida", "Rendimiento", "B2B"],
    intro:
      "El contenido es el rey, pero si tu web tarda 4 segundos en cargar, genera errores de indexación o no tiene datos estructurados, ese rey gobierna un reino invisible. El SEO técnico es la base sobre la que se construye toda tu estrategia de posicionamiento. Para empresas B2B donde cada lead orgánico puede valer cientos o miles de euros, tener la base técnica bien resuelta no es un lujo; es la inversión con mayor retorno de tu presupuesto de marketing digital. Esta checklist cubre todo lo que tu web necesita en 2026.",
    sections: [
      {
        title: "Core Web Vitals: Las 3 métricas que Google mide (y tú deberías)",
        body: [
          "LCP (Largest Contentful Paint): Mide cuánto tarda en cargar el elemento visual más grande de la página (imagen hero, título principal). Objetivo: menos de 2.5 segundos. Las webs B2B con mucho JavaScript y sin optimización de imágenes suelen fallar aquí.",
          "INP (Interaction to Next Paint): Mide la capacidad de respuesta de la página cuando el usuario interactúa (clic, scroll, input). Objetivo: menos de 200ms. Los formularios complejos, los sliders con JavaScript pesado y los pop-ups de cookies mal implementados son los principales culpables.",
          "CLS (Cumulative Layout Shift): Mide la estabilidad visual. Si el contenido se mueve mientras carga (porque una imagen sin dimensiones empuja el texto, o un banner de cookies desplaza todo), Google penaliza. Objetivo: menos de 0.1.",
          "Cómo medir: Google Search Console > Experiencia de página. Para diagnóstico detallado: PageSpeed Insights (lab data) y CrUX Report (datos reales de usuarios). No te fíes solo de herramientas de laboratorio; los datos de campo son los que Google usa para rankear.",
        ],
      },
      {
        title: "Indexación y rastreo: Asegúrate de que Google ve lo que debe ver",
        body: [
          "Un error sorprendentemente común: webs que bloquean páginas importantes en robots.txt o con meta robots noindex sin darse cuenta. Revisa Google Search Console > Páginas para ver qué URLs están indexadas, cuáles están excluidas y por qué.",
          "Tu sitemap.xml debe incluir solo las URLs que quieres que Google indexe, con fechas de última modificación reales (no 'hoy'). Un sitemap que cambia de fecha cada vez que se regenera sin cambios reales es una señal de spam para Google.",
          "Canonical URLs: cada página debe tener un <link rel='canonical'> apuntando a sí misma o a la versión preferida. Las páginas con parámetros de query (?utm_source=...) deben canonicalizar a la versión limpia.",
          "Crawl budget: para webs pequeñas y medianas (menos de 1.000 páginas) no es crítico, pero asegúrate de que robots.txt bloquea las rutas innecesarias (/api/, /admin/, carpetas de assets) para que Google no pierda tiempo rastreando lo que no importa.",
        ],
      },
      {
        title: "Datos estructurados (JSON-LD): Habla el idioma de Google",
        body: [
          "Los datos estructurados no mejoran directamente tu ranking, pero sí tu CTR (Click-Through Rate) al habilitar resultados enriquecidos (rich snippets): estrellas de valoración, FAQs desplegables, breadcrumbs, información de empresa...",
          "Los schemas esenciales para una web B2B: Organization (información de tu empresa, logo, contacto), WebSite (para sitelinks search box), BreadcrumbList (navegación jerárquica en resultados), FAQPage (preguntas frecuentes desplegables), Service (descripción de cada servicio), BlogPosting (para artículos del blog) y LocalBusiness o ProfessionalService (para SEO local).",
          "Implementa JSON-LD directamente en el HTML, no con plugins que inyectan datos genéricos. Cada schema debe contener datos reales y específicos de tu empresa, no plantillas genéricas.",
          "Valida tus datos estructurados con el Rich Results Test de Google y el Schema Markup Validator. Un schema con errores es peor que no tener schema, porque Google puede interpretarlo como spam.",
        ],
      },
      {
        title: "Rendimiento del servidor y hosting",
        body: [
          "TTFB (Time To First Byte): Mide cuánto tarda tu servidor en responder. Objetivo: menos de 200ms para contenido estático, menos de 600ms para contenido dinámico. Si tu TTFB supera 1 segundo, ninguna optimización de frontend compensará esa lentitud.",
          "Para webs Next.js o similares, el hosting en edge (Netlify, Vercel, Cloudflare Pages) ofrece TTFB inferior a 100ms sirviendo desde el nodo más cercano al usuario. Para webs WordPress, un hosting con LiteSpeed, Redis y CDN es el mínimo aceptable.",
          "Compresión: Asegúrate de que tu servidor envía contenido con compresión Brotli (o al menos Gzip). Esto reduce el tamaño de las respuestas HTML, CSS y JS entre un 60% y un 80%. Verifica con: curl -I -H 'Accept-Encoding: br' tu-url.",
          "HTTP/2 o HTTP/3: Tu servidor debe servir tráfico con HTTP/2 como mínimo. HTTP/3 (QUIC) ya está soportado por los principales CDNs y ofrece mejoras adicionales en latencia para conexiones móviles.",
        ],
      },
      {
        title: "Errores técnicos que destruyen tu SEO sin que lo sepas",
        body: [
          "Contenido duplicado: Páginas accesibles con y sin www, con y sin barra final (/servicios y /servicios/), con HTTP y HTTPS. Todas deben redirigir 301 a una única versión canónica.",
          "Redirecciones en cadena: /pagina-antigua → /pagina-intermedia → /pagina-final. Cada redirección añade latencia y diluye el PageRank. Máximo 1 redirección entre la URL original y la final.",
          "Imágenes sin optimizar: Un hero image de 3MB destruye tu LCP. Usa formatos modernos (WebP, AVIF), dimensiones responsivas (srcset) y lazy loading para imágenes below the fold. Next.js Image component hace esto automáticamente si lo usas bien.",
          "JavaScript que bloquea el renderizado: Scripts cargados en el <head> sin defer ni async impiden que el navegador pinte la página. Audita con Lighthouse y mueve todo el JavaScript no crítico a carga diferida.",
          "Links rotos internos: Un enlace que devuelve 404 es una señal negativa para Google y una mala experiencia para el usuario. Ejecuta Screaming Frog o un rastreo con Ahrefs mensualmente para detectarlos y corregirlos.",
        ],
      },
    ],
    highlights: [
      "LCP < 2.5s, INP < 200ms y CLS < 0.1 son los umbrales de Core Web Vitals en 2026.",
      "Los datos estructurados JSON-LD mejoran el CTR entre un 15% y un 40% con rich snippets.",
      "Un TTFB superior a 1 segundo anula cualquier optimización de frontend.",
      "Audita links rotos y redirecciones en cadena mensualmente con Screaming Frog.",
    ],
    faqs: [
      {
        q: "¿El SEO técnico es más importante que el contenido?",
        a: "Son complementarios. Sin SEO técnico, tu contenido no se indexa correctamente ni carga a tiempo. Sin buen contenido, una web técnicamente perfecta no rankea porque no tiene nada que ofrecer al usuario. Empieza por la base técnica y construye contenido sobre ella.",
      },
      {
        q: "¿Con qué frecuencia debo auditar el SEO técnico de mi web?",
        a: "Una auditoría completa cada 3 meses y una revisión básica (Search Console, Core Web Vitals, links rotos) cada mes. Cada vez que publiques contenido nuevo o hagas cambios significativos en la web, valida que no hayas introducido errores.",
      },
      {
        q: "¿Puedo hacer SEO técnico sin conocimientos de programación?",
        a: "Puedes diagnosticar muchos problemas con herramientas como Google Search Console, PageSpeed Insights y Screaming Frog. Pero para corregirlos (especialmente en webs a medida), normalmente necesitas un desarrollador. La auditoría la puedes hacer tú; la corrección, mejor con un técnico.",
      },
    ],
    cta: {
      label: "Solicitar auditoría SEO técnica",
      href: "/#contacto",
      text: "¿Tu web tiene problemas de indexación, velocidad o posicionamiento? Realizamos una auditoría SEO técnica completa con informe de prioridades y plan de acción.",
    },
  },
];

// ── Main ────────────────────────────────────────────────────────────────
function main() {
  const state = readState();

  // Find the first unpublished topic
  const next = EDITORIAL_CALENDAR.find((t) => !state.published.includes(t.id));
  if (!next) {
    console.log("✅ Todos los posts del calendario editorial están publicados.");
    console.log("   Añade más entradas a EDITORIAL_CALENDAR para continuar.");
    process.exit(0);
  }

  const dateStr = today();
  console.log(`📝 Generando post: "${next.title}" (${dateStr})`);

  // ── Build the post object as TypeScript source ──
  const postTS = `  {
    slug: ${JSON.stringify(next.slug)},
    title: ${JSON.stringify(next.title)},
    description:\n      ${JSON.stringify(next.description)},
    h1: ${JSON.stringify(next.h1)},
    date: ${JSON.stringify(dateStr)},
    author: baseAuthor,
    tags: ${JSON.stringify(next.tags)},
    intro:\n      ${JSON.stringify(next.intro)},
    sections: [
${next.sections
  .map(
    (s) => `      {
        title: ${JSON.stringify(s.title)},
        body: [
${s.body.map((b) => `          ${JSON.stringify(b)},`).join("\n")}
        ],
      }`
  )
  .join(",\n")}
    ],${
      next.highlights
        ? `
    highlights: [
${next.highlights.map((h) => `      ${JSON.stringify(h)},`).join("\n")}
    ],`
        : ""
    }
    faqs: [
${next.faqs
  .map(
    (f) => `      {
        q: ${JSON.stringify(f.q)},
        a: ${JSON.stringify(f.a)},
      }`
  )
  .join(",\n")}
    ],${
      next.cta
        ? `
    cta: {
      label: ${JSON.stringify(next.cta.label)},
      href: ${JSON.stringify(next.cta.href)},
      text: ${JSON.stringify(next.cta.text)},
    },`
        : ""
    }
  },`;

  // ── Inject into posts.ts ──
  let postsContent = fs.readFileSync(POSTS_FILE, "utf8");
  const marker = "\nexport const postsMeta";
  if (!postsContent.includes(marker)) {
    console.error("❌ No se encontró el marcador en posts.ts");
    process.exit(1);
  }
  postsContent = postsContent.replace(marker, `\n${postTS}\n\nexport const postsMeta`);
  fs.writeFileSync(POSTS_FILE, postsContent, "utf8");
  console.log("   ✅ Post inyectado en posts.ts");

  // ── Update sitemap date ──
  let sitemapContent = fs.readFileSync(SITEMAP_FILE, "utf8");
  const dateMatch = sitemapContent.match(/const siteLastUpdated = "(\d{4}-\d{2}-\d{2})"/);
  if (dateMatch) {
    sitemapContent = sitemapContent.replace(
      `const siteLastUpdated = "${dateMatch[1]}"`,
      `const siteLastUpdated = "${dateStr}"`
    );
    fs.writeFileSync(SITEMAP_FILE, sitemapContent, "utf8");
    console.log("   ✅ Fecha de sitemap actualizada");
  }

  // ── Git commit & push ──
  try {
    git("add src/lib/posts.ts src/app/sitemap.ts");
    const commitMsg = `blog: ${next.title}\n\nNew SEO blog post: ${next.slug}\nPublished: ${dateStr}`;
    git(`commit -m "${commitMsg.replace(/"/g, '\\"')}"`);
    console.log("   ✅ Commit creado");

    git("push origin main");
    console.log("   ✅ Push a origin/main completado");
  } catch (err) {
    console.error("❌ Error en git:", err.message);
    process.exit(1);
  }

  // ── Update state ──
  state.published.push(next.id);
  writeState(state);

  console.log(`\n🚀 Post publicado exitosamente: /blog/${next.slug}`);
  console.log(`   Posts restantes en el calendario: ${EDITORIAL_CALENDAR.length - state.published.length}`);
}

main();
