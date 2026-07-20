export type Area = {
  slug: string;
  name: string;
  province: string;
  /** Cómo solemos trabajar con empresas de esta zona. */
  mode: "presencial y remoto" | "remoto con visitas puntuales";
  /** Intro única para la landing local (2-3 frases, tono editorial). */
  intro: string;
  /** Sectores con peso real en la economía local donde el software a medida suele encajar. */
  sectors: string[];
  /** Situaciones típicas que nos encontramos en empresas de la zona. */
  scenarios: string[];
};

export const AREAS: Area[] = [
  {
    slug: "sevilla",
    name: "Sevilla",
    province: "Sevilla",
    mode: "presencial y remoto",
    intro:
      "Qubelia tiene su base en Sevilla, así que aquí el diagnóstico puede empezar con una reunión presencial en vuestras oficinas. Trabajamos con empresas del área metropolitana que sostienen su operativa sobre Excel, correo y herramientas sueltas, y necesitan un sistema que aguante el crecimiento.",
    sectors: ["Aeroespacial y auxiliar", "Agroindustria", "Ingeniería y construcción", "Logística y distribución", "Servicios profesionales"],
    scenarios: [
      "Empresas industriales del entorno de Aerópolis y Dos Hermanas con procesos de calidad y trazabilidad que un ERP genérico no cubre.",
      "Distribuidoras y agroindustria que gestionan pedidos y albaranes en hojas de cálculo paralelas.",
      "Despachos y consultoras que necesitan un portal de cliente propio en vez de enviar todo por email.",
    ],
  },
  {
    slug: "madrid",
    name: "Madrid",
    province: "Madrid",
    mode: "remoto con visitas puntuales",
    intro:
      "Madrid concentra sedes corporativas, consultoría y servicios B2B con procesos comerciales largos. Trabajamos en remoto con reuniones presenciales cuando el proyecto lo pide: el AVE deja Sevilla a dos horas y media de vuestra oficina.",
    sectors: ["Consultoría y servicios B2B", "Fintech y seguros", "Inmobiliario", "Salud privada", "Distribución"],
    scenarios: [
      "Equipos comerciales con venta consultiva que han desbordado HubSpot o Pipedrive y trabajan fuera del CRM.",
      "Empresas de servicios con back-office intensivo en documentación, aprobaciones y reporting manual.",
      "Compañías con varios sistemas (ERP, CRM, facturación) que no se hablan y duplican datos a diario.",
    ],
  },
  {
    slug: "barcelona",
    name: "Barcelona",
    province: "Barcelona",
    mode: "remoto con visitas puntuales",
    intro:
      "En Barcelona y su cinturón industrial conviven industria exportadora, ecommerce y empresas tecnológicas. Encajamos bien cuando el proceso productivo o logístico es la ventaja competitiva y las herramientas estándar se quedan cortas.",
    sectors: ["Industria y manufactura", "Ecommerce y retail", "Farma y química", "Logística internacional", "Tecnología"],
    scenarios: [
      "Fabricantes con planificación de producción en Excel que necesitan trazabilidad de lote y órdenes de trabajo digitales.",
      "Ecommerce con operativa multialmacén que sincroniza stock a mano entre plataforma, ERP y marketplaces.",
      "Empresas exportadoras con flujos documentales (aduanas, certificados) que se gestionan por correo.",
    ],
  },
  {
    slug: "valencia",
    name: "Valencia",
    province: "Valencia",
    mode: "remoto con visitas puntuales",
    intro:
      "El tejido valenciano mezcla industria cerámica y del mueble, agroalimentario y una logística portuaria potente. Ayudamos a empresas que ya facturan bien pero cuya operativa interna sigue dependiendo de personas clave y hojas de cálculo.",
    sectors: ["Agroalimentario", "Cerámica y mueble", "Logística portuaria", "Distribución", "Construcción"],
    scenarios: [
      "Cooperativas y exportadoras agro con campañas estacionales que multiplican el trabajo administrativo.",
      "Fabricantes con catálogos y tarifas complejas que los comerciales gestionan en PDF y WhatsApp.",
      "Operadores logísticos que necesitan visibilidad de expediciones sin depender de llamadas.",
    ],
  },
  {
    slug: "malaga",
    name: "Málaga",
    province: "Málaga",
    mode: "presencial y remoto",
    intro:
      "Málaga es hoy uno de los polos tecnológicos del país, pero fuera del TechPark sigue habiendo empresas de toda la vida con procesos por digitalizar. Estamos a una hora de AVE, así que combinamos presencial y remoto sin fricción.",
    sectors: ["Tecnología y scaleups", "Turismo y hostelería", "Inmobiliario y construcción", "Comercio y distribución", "Servicios profesionales"],
    scenarios: [
      "Empresas turísticas y de gestión de alojamientos con reservas, partes e incidencias repartidos en varias herramientas.",
      "Promotoras y constructoras que controlan certificaciones y costes de obra en Excel.",
      "Scaleups que necesitan herramientas internas de operaciones que su equipo de producto no puede asumir.",
    ],
  },
  {
    slug: "bilbao",
    name: "Bilbao",
    province: "Bizkaia",
    mode: "remoto con visitas puntuales",
    intro:
      "La industria vasca tiene una cultura de proceso muy fuerte: calidad, homologaciones, mantenimiento. Ahí el software a medida no es capricho, es la única forma de que el sistema refleje cómo se trabaja de verdad en planta y oficina técnica.",
    sectors: ["Industria avanzada", "Máquina-herramienta", "Energía", "Ingeniería", "Siderurgia y metal"],
    scenarios: [
      "Talleres y fabricantes con partes de trabajo, mantenimientos y no conformidades todavía en papel o Excel.",
      "Ingenierías que gestionan proyectos largos con hitos, documentación y certificaciones dispersas.",
      "Empresas industriales que necesitan conectar planta (producción, calidad) con el ERP de gestión.",
    ],
  },
  {
    slug: "zaragoza",
    name: "Zaragoza",
    province: "Zaragoza",
    mode: "remoto con visitas puntuales",
    intro:
      "Zaragoza vive de la logística, la automoción y el agroalimentario: sectores de márgenes ajustados donde cada hora de trabajo manual duplicado se nota. Automatizar ahí tiene retorno directo y medible.",
    sectors: ["Logística y transporte", "Automoción y auxiliar", "Agroalimentario", "Distribución", "Industria"],
    scenarios: [
      "Operadores y transportistas que gestionan expediciones, incidencias y facturación con procesos manuales.",
      "Proveedores de automoción con requisitos de trazabilidad y etiquetado que su sistema actual no cubre.",
      "Distribuidoras con pedidos que entran por teléfono, email y comerciales, sin un canal unificado.",
    ],
  },
  {
    slug: "murcia",
    name: "Murcia",
    province: "Murcia",
    mode: "remoto con visitas puntuales",
    intro:
      "La huerta de Europa funciona con campañas, volumen y márgenes finos. Trabajamos con empresas murcianas del agro, la exportación y el transporte que necesitan quitar fricción administrativa sin parar la operativa ni un solo día.",
    sectors: ["Agroalimentario y exportación", "Transporte frigorífico", "Industria conservera", "Distribución", "Servicios agrícolas"],
    scenarios: [
      "Exportadoras hortofrutícolas con confirmaciones de pedido, packing lists y documentación por email.",
      "Empresas de transporte con planificación de rutas y partes de conductor gestionados a mano.",
      "Cooperativas que liquidan a socios con procesos de cálculo complejos en hojas enlazadas.",
    ],
  },
  {
    slug: "alicante",
    name: "Alicante",
    province: "Alicante",
    mode: "remoto con visitas puntuales",
    intro:
      "Entre calzado, comercio exterior y turismo, la provincia de Alicante está llena de pymes exportadoras con operativa intensa y sistemas heredados. Ayudamos a ordenar esa operativa sin obligar a nadie a cambiar su forma de vender.",
    sectors: ["Calzado y textil", "Comercio exterior", "Turismo", "Distribución", "Juguete y plástico"],
    scenarios: [
      "Fabricantes y marcas con temporadas, tallas y colecciones que los ERP genéricos modelan mal.",
      "Importadoras/exportadoras con seguimiento de contenedores y costes de importación en Excel.",
      "Grupos con varias tiendas o delegaciones sin reporting unificado de ventas y stock.",
    ],
  },
  {
    slug: "cordoba",
    name: "Córdoba",
    province: "Córdoba",
    mode: "presencial y remoto",
    intro:
      "Córdoba está a 45 minutos de nuestra base en Sevilla, así que el trato puede ser tan presencial como haga falta. Trabajamos con empresas cordobesas de la joyería, el metal y la agroindustria que quieren profesionalizar su gestión sin un ERP faraónico.",
    sectors: ["Joyería y orfebrería", "Agroindustria y aceite", "Metal-mecánica", "Frío industrial", "Distribución"],
    scenarios: [
      "Talleres y fabricantes con escandallos, órdenes de producción y control de metal precioso en hojas de cálculo.",
      "Almazaras y cooperativas con liquidaciones, trazabilidad y campañas que desbordan su gestión actual.",
      "Empresas del metal con presupuestos técnicos complejos que tardan días en salir.",
    ],
  },
];

export function getArea(slug: string) {
  return AREAS.find((area) => area.slug === slug);
}
