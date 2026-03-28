export type FaqItem = { id: string; q: string; a: string; category: string; icon: string };

export const faqItems: FaqItem[] = [
  {
    id: "coste",
    icon: "💰",
    category: "Inversión",
    q: "¿Cuánto cuesta un proyecto de software a medida?",
    a: "Depende del alcance, complejidad y sistemas a integrar. Un módulo funcional inicial suele estar entre 8.000 € y 20.000 €; proyectos completos con integraciones ERP/CRM y automatizaciones van de 20.000 € en adelante. En el diagnóstico inicial cerramos alcance real, prioridades y precio antes de comprometer nada.",
  },
  {
    id: "cuando-medida",
    icon: "🎯",
    category: "Encaje",
    q: "¿Cuándo merece la pena software a medida y cuándo no?",
    a: "Merece la pena cuando ninguna herramienta estándar se ajusta a vuestros procesos sin forzar cambios operativos, cuando tenéis flujos únicos que son ventaja competitiva, o cuando el coste de adaptación de un SaaS supera el de construir. No merece la pena si existe un SaaS que cubre el 90% de lo que necesitáis sin fricciones. Os lo decimos en el diagnóstico.",
  },
  {
    id: "plazos",
    icon: "⏱️",
    category: "Plazos",
    q: "¿Cuánto tarda un proyecto típico?",
    a: "La primera entrega funcional llega en 4–8 semanas dependiendo del alcance. Trabajamos con sprints quincenales con demos reales para que veáis avance desde el principio. Proyectos completos con integraciones y automatizaciones suelen durar 3–6 meses. No estimamos sin diagnóstico previo: las estimaciones sin contexto son la fuente principal de decepciones.",
  },
  {
    id: "integraciones",
    icon: "🔗",
    category: "Integraciones",
    q: "¿Integráis con ERP, CRM y sistemas ya instalados?",
    a: "Sí. Es una de nuestras especialidades. SAP, Salesforce, HubSpot, Holded, A3, Odoo, sistemas legacy con API REST o SOAP, bases de datos propias. Si tiene API o base de datos, lo conectamos. Si no tiene API estándar, construimos el conector. Os pedimos acceso técnico en la fase de diagnóstico para evaluar el alcance real.",
  },
  {
    id: "proceso",
    icon: "⚙️",
    category: "Proceso",
    q: "¿Cómo trabajáis? ¿Sprints, reuniones, comunicación?",
    a: "Diagnóstico en la primera semana → diseño y alcance en la segunda → sprints quincenales con demos reales hasta el go-live. Canal de comunicación directo (Slack o Teams), reunión quincenal de revisión, repositorio accesible desde el día uno. Sin intermediarios, sin capas de gestión.",
  },
  {
    id: "post-lanzamiento",
    icon: "🛟",
    category: "Soporte",
    q: "¿Qué pasa tras el lanzamiento? ¿Hacéis mantenimiento?",
    a: "Sí. Ofrecemos contratos de mantenimiento con SLAs definidos: respuesta a incidencias críticas en 4 h, evolutivos planificados cada mes. También podemos formar a vuestro equipo técnico interno para que lleven la plataforma de forma autónoma. El código es 100% vuestro: nunca dependéis de nosotros para operar.",
  },
  {
    id: "propiedad",
    icon: "🗝️",
    category: "Propiedad",
    q: "¿Quién es propietario del código y la infraestructura?",
    a: "Vosotros, siempre. Entregamos los repositorios completos, accesos a todos los entornos, documentación técnica y formación. Nunca generamos dependencias artificiales: si en algún momento queréis continuar con otro equipo, lo hacéis sin fricciones.",
  },
  {
    id: "calidad",
    icon: "🛡️",
    category: "Calidad",
    q: "¿Cómo garantizáis calidad y seguridad en producción?",
    a: "Revisiones de código obligatorias, checklist OWASP básico en cada release, CI/CD con tests automáticos y despliegues por etapas. Logs, backups y gestión de accesos bajo buenas prácticas desde el principio. Para sectores regulados (salud, finanzas) aplicamos capas adicionales según el contexto.",
  },
];
