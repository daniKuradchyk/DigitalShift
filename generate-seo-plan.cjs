const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
} = require("docx");

// ── Helpers ──
const BRAND = "1B4F8A";
const BRAND_LIGHT = "E8F0FE";
const ACCENT = "D4740A";
const GRAY = "F5F5F5";
const WHITE = "FFFFFF";
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

const PAGE_W = 11906; // A4
const MARGIN = 1440;
const CONTENT_W = PAGE_W - 2 * MARGIN; // 9026

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, font: "Arial", color: BRAND })],
  });
}
function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true, size: 28, font: "Arial", color: BRAND })],
  });
}
function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, size: 24, font: "Arial", color: "333333" })],
  });
}
function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 21, font: "Arial", color: "333333", ...opts })],
  });
}
function boldPara(label, text) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: label, bold: true, size: 21, font: "Arial", color: "333333" }),
      new TextRun({ text, size: 21, font: "Arial", color: "555555" }),
    ],
  });
}
function emptyLine() {
  return new Paragraph({ spacing: { after: 80 }, children: [] });
}

function makeTable(headers, rows, colWidths) {
  const totalW = colWidths.reduce((a, b) => a + b, 0);
  const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) =>
      new TableCell({
        borders,
        width: { size: colWidths[i], type: WidthType.DXA },
        shading: { fill: BRAND, type: ShadingType.CLEAR },
        margins: cellMargins,
        verticalAlign: "center",
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Arial", color: WHITE })] })],
      })
    ),
  });
  const dataRows = rows.map(
    (row) =>
      new TableRow({
        children: row.map((cell, i) =>
          new TableCell({
            borders,
            width: { size: colWidths[i], type: WidthType.DXA },
            shading: { fill: WHITE, type: ShadingType.CLEAR },
            margins: cellMargins,
            children: [new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: String(cell), size: 19, font: "Arial", color: "333333" })] })],
          })
        ),
      })
  );
  return new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows],
  });
}

function checkItem(text) {
  return new Paragraph({
    spacing: { after: 80 },
    numbering: { reference: "checklist", level: 0 },
    children: [new TextRun({ text, size: 21, font: "Arial", color: "333333" })],
  });
}

// ── Document ──
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "checklist",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u25A1",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "bullets",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "\u2022",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
      {
        reference: "numbers",
        levels: [
          {
            level: 0,
            format: LevelFormat.DECIMAL,
            text: "%1.",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, font: "Arial", color: BRAND }, paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, font: "Arial", color: BRAND }, paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, font: "Arial", color: "333333" }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ],
  },
  sections: [
    // ══════════════════════════════════════════════════════
    // COVER PAGE
    // ══════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(), emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 80 },
          children: [new TextRun({ text: "QUBELIA", size: 20, font: "Arial", color: BRAND, bold: true, characterSpacing: 300 })],
        }),
        emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: "Plan de SEO 90 dias", size: 56, font: "Arial", color: BRAND, bold: true })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [new TextRun({ text: "Estrategia de posicionamiento organico", size: 28, font: "Arial", color: "666666" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
          children: [new TextRun({ text: "para el mercado B2B en Espana", size: 28, font: "Arial", color: "666666" })],
        }),
        emptyLine(), emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 0 },
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: BRAND, space: 8 } },
          children: [],
        }),
        emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "qubelia.es", size: 22, font: "Arial", color: BRAND })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: "Documento confidencial  |  Abril 2026", size: 20, font: "Arial", color: "999999" })],
        }),
      ],
    },

    // ══════════════════════════════════════════════════════
    // MAIN CONTENT
    // ══════════════════════════════════════════════════════
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [new TextRun({ text: "Plan SEO 90 dias  |  qubelia.es", size: 16, font: "Arial", color: "999999" })],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 1, color: "DDDDDD", space: 4 } },
              children: [
                new TextRun({ text: "Qubelia  |  Pagina ", size: 16, font: "Arial", color: "999999" }),
                new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Arial", color: "999999" }),
              ],
            }),
          ],
        }),
      },
      children: [

        // ════════════════════════════════════════════════
        // 0. VISION GENERAL
        // ════════════════════════════════════════════════
        heading1("0. Vision general del plan"),
        para("Este documento define la estrategia SEO completa para posicionar qubelia.es en el mercado espanol B2B. Cubre 90 dias de acciones concretas, dia a dia, agrupadas en 3 fases:"),
        emptyLine(),
        makeTable(
          ["Fase", "Periodo", "Objetivo principal"],
          [
            ["1. Cimientos", "Dias 1-30", "Indexacion, infraestructura tecnica y Google Business Profile"],
            ["2. Contenido", "Dias 31-60", "Publicacion sistematica de contenido y link building inicial"],
            ["3. Autoridad", "Dias 61-90", "Guest posting, backlinks de calidad y escalado de trafico"],
          ],
          [1500, 2000, 5526]
        ),
        emptyLine(),
        boldPara("Mercado objetivo: ", "Empresas B2B en Espana (10-250 empleados) que necesitan software a medida, automatizacion o integraciones."),
        boldPara("Keywords raiz: ", "software a medida, desarrollo web empresas, automatizacion procesos B2B, CRM a medida, integracion ERP CRM, desarrollo software Sevilla."),
        boldPara("Competencia directa: ", "Consultoras locales de Sevilla, agencias de desarrollo nacionales, freelancers posicionados para keywords locales."),

        // ════════════════════════════════════════════════
        // KEYWORDS MASTER
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("1. Mapa de keywords objetivo"),
        para("Todas las acciones de contenido y optimizacion giran en torno a estas keywords. Estan clasificadas por intencion de busqueda y pagina objetivo."),
        emptyLine(),

        heading2("1.1 Keywords transaccionales (alta intencion de compra)"),
        makeTable(
          ["Keyword", "Vol. est.", "Dificultad", "Pagina objetivo"],
          [
            ["software a medida para empresas", "720/mes", "Media", "/servicios/software-a-medida"],
            ["desarrollo software a medida precio", "320/mes", "Baja", "/servicios/software-a-medida"],
            ["empresa desarrollo web a medida", "480/mes", "Media", "/servicios/web-a-medida"],
            ["automatizacion procesos empresariales", "590/mes", "Alta", "/servicios/automatizacion-integraciones"],
            ["CRM a medida para pymes", "260/mes", "Baja", "/servicios/crm-intranet-a-medida"],
            ["integracion ERP CRM", "390/mes", "Media", "/servicios/automatizacion-integraciones"],
            ["presupuesto software a medida", "210/mes", "Baja", "/servicios/software-a-medida"],
            ["consultoria software Sevilla", "170/mes", "Baja", "/area/sevilla"],
          ],
          [3000, 1200, 1400, 3426]
        ),
        emptyLine(),

        heading2("1.2 Keywords informacionales (captacion de trafico)"),
        makeTable(
          ["Keyword", "Vol. est.", "Contenido a crear"],
          [
            ["software a medida vs SaaS", "880/mes", "Post blog (ya existe)"],
            ["cuanto cuesta un software a medida", "1.200/mes", "Post blog nuevo + calculadora"],
            ["como integrar ERP y CRM", "540/mes", "Post blog (ya existe)"],
            ["ventajas CRM a medida", "320/mes", "Post blog nuevo"],
            ["automatizar facturacion empresa", "410/mes", "Post blog nuevo"],
            ["como elegir empresa desarrollo software", "290/mes", "Post blog nuevo"],
            ["ROI automatizacion procesos", "260/mes", "Post blog (ya existe) + calculadora"],
            ["que es un ERP para pymes", "720/mes", "Post blog nuevo"],
          ],
          [3200, 1200, 4626]
        ),
        emptyLine(),

        heading2("1.3 Keywords locales"),
        makeTable(
          ["Keyword", "Vol. est.", "Pagina objetivo"],
          [
            ["desarrollo software Sevilla", "320/mes", "/area/sevilla"],
            ["empresa tecnologia Sevilla", "210/mes", "/area/sevilla"],
            ["consultoria digital Sevilla", "170/mes", "/area/sevilla"],
            ["diseno web profesional Sevilla", "260/mes", "/area/sevilla"],
            ["automatizacion empresas Sevilla", "90/mes", "/area/sevilla"],
          ],
          [3500, 1500, 4026]
        ),

        // ════════════════════════════════════════════════
        // FASE 1: DIAS 1-30
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("2. FASE 1: Cimientos (Dias 1-30)"),
        para("Objetivo: conseguir que Google indexe todas las paginas, establecer presencia local y preparar la infraestructura de contenido."),
        emptyLine(),

        // SEMANA 1
        heading2("Semana 1 (Dias 1-7): Indexacion y Search Console"),
        emptyLine(),
        heading3("Dia 1 - Deploy y verificacion"),
        checkItem("Hacer deploy de todos los cambios de codigo SEO implementados"),
        checkItem("Verificar que https://qubelia.es/sitemap.xml devuelve todas las URLs"),
        checkItem("Verificar que https://qubelia.es/robots.txt es correcto"),
        checkItem("Comprobar que las 11 redirecciones 301 de blog funcionan"),
        checkItem("Comprobar pagina 404 personalizada en una URL inexistente"),
        emptyLine(),

        heading3("Dia 2 - Google Search Console"),
        checkItem("Acceder a Google Search Console (search.google.com/search-console)"),
        checkItem("Verificar propiedad del dominio qubelia.es (si no esta hecho)"),
        checkItem("Ir a Sitemaps > Enviar: https://qubelia.es/sitemap.xml"),
        checkItem("Ir a Inspeccion de URLs > Inspeccionar la URL de la homepage"),
        checkItem("Solicitar indexacion de / (homepage)"),
        checkItem("Solicitar indexacion de /servicios"),
        checkItem("Solicitar indexacion de /servicios/software-a-medida"),
        emptyLine(),

        heading3("Dia 3 - Indexacion masiva (parte 1)"),
        checkItem("Solicitar indexacion de /servicios/web-a-medida"),
        checkItem("Solicitar indexacion de /servicios/automatizacion-integraciones"),
        checkItem("Solicitar indexacion de /servicios/crm-intranet-a-medida"),
        checkItem("Solicitar indexacion de /blog"),
        checkItem("Solicitar indexacion de /labs"),
        checkItem("Solicitar indexacion de /casos"),
        para("Nota: Google limita las solicitudes de indexacion a unas 10-12 por dia. Distribuir en varios dias.", { italics: true, color: "888888" }),
        emptyLine(),

        heading3("Dia 4 - Indexacion masiva (parte 2)"),
        checkItem("Solicitar indexacion de cada post del blog (6 posts)"),
        checkItem("Solicitar indexacion de /labs/analisis-gratis"),
        checkItem("Solicitar indexacion de /labs/roi-automatizacion"),
        checkItem("Solicitar indexacion de /labs/calculadora-coste-software"),
        checkItem("Solicitar indexacion de /herramientas/calculadora-irpf"),
        checkItem("Solicitar indexacion de /area/sevilla"),
        emptyLine(),

        heading3("Dia 5 - Indexacion paginas legales + validacion"),
        checkItem("Solicitar indexacion de /legal/aviso-legal, /legal/privacidad, /legal/cookies"),
        checkItem("Verificar en Search Console > Cobertura que no hay errores nuevos"),
        checkItem("Comprobar con site:qubelia.es en Google cuantas paginas aparecen"),
        checkItem("Instalar extension Chrome: SEO META in 1 CLICK para validar metadata"),
        checkItem("Validar JSON-LD de homepage en: validator.schema.org"),
        emptyLine(),

        heading3("Dia 6 - Google Business Profile"),
        checkItem("Ir a business.google.com y crear perfil (o reclamar si ya existe)"),
        checkItem("Nombre: Qubelia"),
        checkItem("Categoria principal: Empresa de desarrollo de software"),
        checkItem("Categorias secundarias: Consultoria informatica, Desarrollo web"),
        checkItem("Direccion: Calle Torrelodones 84B, 41016 Sevilla, Espana"),
        checkItem("Telefono: el mismo que en la web"),
        checkItem("Web: https://qubelia.es"),
        checkItem("Horario: Lunes a Viernes 9:00-18:00"),
        emptyLine(),

        heading3("Dia 7 - Google Business Profile (completar)"),
        checkItem("Escribir descripcion del negocio (750 chars max) incluyendo keywords principales"),
        checkItem("Subir minimo 5 fotos (logo, oficina, equipo, pantallazos de proyectos)"),
        checkItem("Crear primer Google Post con link al blog"),
        checkItem("Verificar la direccion (Google enviara postal o verificacion por telefono)"),
        emptyLine(),

        // SEMANA 2
        heading2("Semana 2 (Dias 8-14): Directorios y primeras resenas"),
        emptyLine(),

        heading3("Dia 8 - Registro en Clutch"),
        checkItem("Ir a clutch.co y crear perfil de empresa"),
        checkItem("Completar: servicios, tecnologias, tamano equipo, rango de precios"),
        checkItem("Subir los 3 case studies (Cafe Alameda, AndalBike, Clinisalud 24)"),
        checkItem("Enlazar a qubelia.es en todos los campos"),
        emptyLine(),

        heading3("Dia 9 - Registro en GoodFirms y DesignRush"),
        checkItem("Crear perfil en goodfirms.co con portfolio completo"),
        checkItem("Crear perfil en designrush.com"),
        checkItem("En ambos: listar los 4 servicios, subir casos, enlazar a qubelia.es"),
        emptyLine(),

        heading3("Dia 10 - Directorios espanoles (parte 1)"),
        checkItem("Registrar en Paginas Amarillas (paginasamarillas.es)"),
        checkItem("Registrar en QDQ (qdq.com)"),
        checkItem("Registrar en Cylex (cylex.es)"),
        checkItem("CRITICO: Usar exactamente el mismo NAP en todos (Name, Address, Phone)"),
        emptyLine(),

        heading3("Dia 11 - Directorios espanoles (parte 2)"),
        checkItem("Registrar en Europages (europages.es)"),
        checkItem("Registrar en Kompass (es.kompass.com)"),
        checkItem("Registrar en Infobel (infobel.com/es)"),
        checkItem("Verificar NAP consistency en los 6 directorios"),
        emptyLine(),

        heading3("Dia 12 - Solicitar resenas a clientes"),
        checkItem("Enviar email a Cafe Alameda pidiendo resena en Google Business"),
        checkItem("Enviar email a AndalBike pidiendo resena en Google Business"),
        checkItem("Enviar email a Clinisalud 24 pidiendo resena en Google Business"),
        checkItem("Incluir link directo a la ficha de Google (facilitar el proceso)"),
        checkItem("Pedir tambien resena en Clutch a al menos 1 cliente"),
        emptyLine(),

        heading3("Dia 13 - Directorios B2B internacionales"),
        checkItem("Crear perfil en Sortlist (sortlist.com)"),
        checkItem("Crear perfil en TopDevelopers (topdevelopers.co)"),
        checkItem("Crear perfil en UpCity (upcity.com)"),
        emptyLine(),

        heading3("Dia 14 - Revision y LinkedIn"),
        checkItem("Revisar que todos los directorios estan activos y aprobados"),
        checkItem("Optimizar pagina de LinkedIn de Qubelia: descripcion con keywords"),
        checkItem("Publicar primer post en LinkedIn con link al blog"),
        checkItem("Comprobar en Search Console si hay paginas nuevas indexadas"),
        emptyLine(),

        // SEMANA 3
        heading2("Semana 3 (Dias 15-21): Contenido y optimizacion on-page"),
        emptyLine(),

        heading3("Dia 15 - Keyword research profundo"),
        checkItem("Usar Ubersuggest (free) para validar volumenes de busqueda"),
        checkItem("Buscar en Google cada keyword principal y analizar los 10 primeros resultados"),
        checkItem("Identificar gaps: que preguntas hacen los usuarios que nadie responde bien"),
        checkItem("Documentar 10 ideas de posts nuevos con keyword objetivo de cada uno"),
        emptyLine(),

        heading3("Dia 16-17 - Escribir post: Cuanto cuesta un software a medida en 2026"),
        checkItem("Keyword objetivo: cuanto cuesta un software a medida (1.200 busquedas/mes)"),
        checkItem("Extension: minimo 2.000 palabras"),
        checkItem("Estructura: H1 con keyword, 4-6 H2, tabla de precios, FAQs (5 minimo)"),
        checkItem("Incluir link interno a /servicios/software-a-medida"),
        checkItem("Incluir link interno a /labs/calculadora-coste-software"),
        checkItem("Incluir CTA final hacia /#contacto"),
        checkItem("Anadir FAQ schema (JSON-LD) en el post"),
        emptyLine(),

        heading3("Dia 18 - Publicar post y distribuir"),
        checkItem("Publicar el post en qubelia.es/blog/cuanto-cuesta-software-medida-2026"),
        checkItem("Solicitar indexacion en Search Console"),
        checkItem("Compartir en LinkedIn con resumen ejecutivo (3-5 parrafos nativos + link)"),
        checkItem("Compartir en Twitter/X con hilo de 3-5 tweets"),
        checkItem("Publicar Google Post en Google Business con link al articulo"),
        emptyLine(),

        heading3("Dia 19-20 - Escribir post: Ventajas de un CRM a medida vs Salesforce/HubSpot"),
        checkItem("Keyword objetivo: ventajas CRM a medida (320 busquedas/mes)"),
        checkItem("Extension: minimo 1.800 palabras"),
        checkItem("Incluir comparativa en tabla: CRM a medida vs SaaS"),
        checkItem("Links internos a /servicios/crm-intranet-a-medida y /blog (posts relacionados)"),
        checkItem("FAQs especificas (4 minimo)"),
        emptyLine(),

        heading3("Dia 21 - Publicar y optimizar pagina /area/sevilla"),
        checkItem("Publicar post de CRM y distribuir en redes"),
        checkItem("Revisar y mejorar contenido de /area/sevilla con keywords locales"),
        checkItem("Anadir testimonios de clientes sevillanos en la pagina"),
        checkItem("Anadir schema LocalBusiness a /area/sevilla"),
        emptyLine(),

        // SEMANA 4
        heading2("Semana 4 (Dias 22-30): Link building desde clientes y primeros resultados"),
        emptyLine(),

        heading3("Dia 22 - Solicitar backlinks a clientes"),
        checkItem("Email a Cafe Alameda: pedir link en su web (desarrollado por / partners)"),
        checkItem("Email a AndalBike: pedir mencion en seccion partners o tecnologia"),
        checkItem("Email a Clinisalud 24: pedir link en creditos o seccion tecnologia"),
        para("Template: Estamos actualizando nuestro portfolio. Ya teneis un caso publicado en qubelia.es/casos. Seria genial un link desde vuestra web.", { italics: true, color: "888888" }),
        emptyLine(),

        heading3("Dia 23 - Asociaciones empresariales"),
        checkItem("Contactar Camara de Comercio de Sevilla para registro como empresa asociada"),
        checkItem("Contactar ETICOM (Asociacion de Empresas TIC de Andalucia)"),
        checkItem("Investigar eventos tech en Sevilla para los proximos 2 meses"),
        emptyLine(),

        heading3("Dia 24-25 - Escribir post: Que es un ERP para pymes"),
        checkItem("Keyword: que es un ERP para pymes (720 busquedas/mes)"),
        checkItem("Enfoque divulgativo, 2.000+ palabras"),
        checkItem("Links internos a /servicios/automatizacion-integraciones"),
        checkItem("Publicar y distribuir en redes"),
        emptyLine(),

        heading3("Dia 26 - Registrarse en plataformas de fuentes periodisticas"),
        checkItem("Crear perfil en Connectively (connectively.us) - antes HARO"),
        checkItem("Crear perfil en Qwoted (qwoted.com)"),
        checkItem("Configurar alertas para: software, automatizacion, IA, pymes, transformacion digital"),
        checkItem("Responder al menos 2 consultas esta semana"),
        emptyLine(),

        heading3("Dia 27-28 - Auditar competencia"),
        checkItem("Buscar software a medida espana en Google y analizar los 10 primeros"),
        checkItem("Para cada competidor: anotar DA (Ahrefs), numero de backlinks, contenido blog"),
        checkItem("Identificar 3 oportunidades donde su contenido es debil y el tuyo puede ser mejor"),
        checkItem("Identificar directorios donde estan ellos y tu no"),
        emptyLine(),

        heading3("Dia 29-30 - Revision de Fase 1"),
        checkItem("Comprobar en Search Console: cuantas paginas indexadas (objetivo: 15+)"),
        checkItem("Revisar impresiones y clics organicos del mes"),
        checkItem("Verificar que Google Business esta verificado y activo"),
        checkItem("Contar backlinks nuevos (objetivo: 10+ dominios referentes)"),
        checkItem("Documentar que funciono y que no para ajustar Fase 2"),
        emptyLine(),

        makeTable(
          ["KPI Fase 1", "Objetivo", "Como medir"],
          [
            ["Paginas indexadas", "15-20", "Search Console > Cobertura"],
            ["Impresiones organicas", "500-1.500/mes", "Search Console > Rendimiento"],
            ["Resenas en Google", "3-5", "Google Business Profile"],
            ["Dominios referentes", "10+", "Ahrefs Webmaster Tools (gratis)"],
            ["Posts publicados", "3 nuevos", "Blog de qubelia.es"],
          ],
          [2400, 1800, 4826]
        ),

        // ════════════════════════════════════════════════
        // FASE 2: DIAS 31-60
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("3. FASE 2: Contenido y autoridad (Dias 31-60)"),
        para("Objetivo: publicar contenido de forma sistematica (2 posts/semana), conseguir primeros guest posts y escalar trafico organico."),
        emptyLine(),

        heading2("Semana 5 (Dias 31-37): Ritmo de publicacion"),
        emptyLine(),

        heading3("Dia 31-32 - Post: Como elegir empresa de desarrollo de software"),
        checkItem("Keyword: como elegir empresa desarrollo software (290/mes)"),
        checkItem("Enfoque: guia practica con checklist descargable"),
        checkItem("2.000+ palabras, FAQs, links internos a /servicios y /casos"),
        checkItem("Publicar, indexar, distribuir en LinkedIn"),
        emptyLine(),

        heading3("Dia 33-34 - Post: Automatizar facturacion: guia para empresas"),
        checkItem("Keyword: automatizar facturacion empresa (410/mes)"),
        checkItem("Caso practico con numeros reales"),
        checkItem("Link a /servicios/automatizacion-integraciones y /labs/roi-automatizacion"),
        checkItem("Publicar y distribuir"),
        emptyLine(),

        heading3("Dia 35 - Preparar propuestas de guest post"),
        checkItem("Redactar 3 pitches personalizados para medios tech espanoles"),
        checkItem("Medio 1: MuyPymes - tema: ROI de automatizacion con datos reales"),
        checkItem("Medio 2: El Referente - tema: IA y agentes autonomos para pymes"),
        checkItem("Medio 3: Silicon.es - tema: Zero Trust en software a medida"),
        checkItem("Cada pitch: 3-4 parrafos, propuesta de titulo, por que es relevante para sus lectores"),
        emptyLine(),

        heading3("Dia 36 - Enviar pitches"),
        checkItem("Encontrar email del editor de cada medio (LinkedIn, web, Twitter)"),
        checkItem("Enviar los 3 pitches de guest post"),
        checkItem("Hacer follow-up en LinkedIn al editor (sin ser spam)"),
        emptyLine(),

        heading3("Dia 37 - LinkedIn semanal + Google Post"),
        checkItem("Publicar articulo nativo en LinkedIn (no solo link, sino contenido)"),
        checkItem("Crear Google Post semanal con link al ultimo articulo"),
        checkItem("Responder consultas en Connectively/Qwoted si hay nuevas"),
        emptyLine(),

        heading2("Semana 6 (Dias 38-44): Contenido pilar"),
        emptyLine(),

        heading3("Dia 38-40 - Post PILAR: Guia completa de software a medida en Espana 2026"),
        checkItem("Este es el contenido estrella: 3.000-4.000 palabras"),
        checkItem("Keywords: software a medida, software a medida para empresas, software a medida precio"),
        checkItem("Secciones: que es, cuando lo necesitas, proceso, precios, como elegir proveedor, errores comunes"),
        checkItem("Tabla comparativa detallada: a medida vs SaaS vs low-code"),
        checkItem("10+ FAQs con schema"),
        checkItem("Links internos a TODOS los servicios, calculadoras y casos"),
        checkItem("Infografia resumen (canva.com o similar)"),
        emptyLine(),

        heading3("Dia 41 - Publicar post pilar"),
        checkItem("Publicar el post pilar en el blog"),
        checkItem("Solicitar indexacion inmediata en Search Console"),
        checkItem("Crear hilo de 8-10 tweets en Twitter/X"),
        checkItem("Publicar articulo largo nativo en LinkedIn"),
        checkItem("Enviar a newsletter (si existe lista de contactos)"),
        checkItem("Compartir la infografia en Pinterest (si tiene sentido)"),
        emptyLine(),

        heading3("Dia 42-43 - Post: Integracion ERP y CRM: errores que las pymes cometen"),
        checkItem("Keyword: integracion ERP CRM pymes"),
        checkItem("Enfoque practico con errores reales y como evitarlos"),
        checkItem("1.800+ palabras, links internos"),
        emptyLine(),

        heading3("Dia 44 - Distribucion semanal"),
        checkItem("LinkedIn post + Google Post + responder HARO/Connectively"),
        checkItem("Revisar metricas en Search Console: nuevas impresiones y posiciones"),
        emptyLine(),

        heading2("Semana 7-8 (Dias 45-60): Guest posting y escalado"),
        emptyLine(),

        heading3("Dias 45-48 - Escribir guest post (si fue aceptado)"),
        checkItem("Escribir articulo de 1.500-2.000 palabras para el medio que acepto"),
        checkItem("Incluir bio del autor con link a qubelia.es"),
        checkItem("Incluir 1-2 links contextuales a paginas de servicio"),
        checkItem("Mencionar herramienta gratuita de /labs como recurso"),
        emptyLine(),

        heading3("Dias 49-50 - 2 posts mas de blog"),
        checkItem("Post 7: Como medir el ROI de un proyecto de software (keyword: ROI software a medida)"),
        checkItem("Post 8: CRM open source vs CRM a medida: comparativa real"),
        checkItem("Publicar ambos y distribuir"),
        emptyLine(),

        heading3("Dias 51-53 - Link building activo"),
        checkItem("Buscar 10 blogs de tecnologia/emprendimiento espanoles con DA 20+"),
        checkItem("Dejar comentarios de valor en 5 articulos relevantes (NO spam)"),
        checkItem("Compartir recursos de /labs en foros relevantes (Reddit, Forocoches tech, etc.)"),
        checkItem("Responder preguntas en Quora espanol sobre software a medida"),
        emptyLine(),

        heading3("Dias 54-56 - Preparar segundo lote de guest posts"),
        checkItem("Nuevos 3 pitches a medios diferentes"),
        checkItem("Medio 4: ComputerHoy - tema: herramientas gratuitas para pymes"),
        checkItem("Medio 5: Emprendedores.es - tema: cuanto cuesta digitalizar una pyme"),
        checkItem("Medio 6: Autonomos y Emprendedor - tema: calculadora IRPF y herramientas"),
        emptyLine(),

        heading3("Dias 57-60 - Revision Fase 2"),
        checkItem("Search Console: paginas indexadas (objetivo: 25+)"),
        checkItem("Impresiones organicas (objetivo: 3.000-5.000/mes)"),
        checkItem("Clics organicos (objetivo: 100-200/mes)"),
        checkItem("Backlinks/dominios referentes (objetivo: 20+)"),
        checkItem("Posts publicados total: 8-10"),
        checkItem("Guest posts publicados: 1-2"),
        emptyLine(),

        makeTable(
          ["KPI Fase 2", "Objetivo", "Como medir"],
          [
            ["Paginas indexadas", "25+", "Search Console"],
            ["Impresiones/mes", "3.000-5.000", "Search Console > Rendimiento"],
            ["Clics organicos/mes", "100-200", "Search Console > Rendimiento"],
            ["Posicion media", "< 30", "Search Console"],
            ["Posts publicados", "8-10 total", "Blog"],
            ["Guest posts", "1-2", "Medios externos"],
            ["Dominios referentes", "20+", "Ahrefs"],
          ],
          [2400, 1800, 4826]
        ),

        // ════════════════════════════════════════════════
        // FASE 3: DIAS 61-90
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("4. FASE 3: Escalado (Dias 61-90)"),
        para("Objetivo: consolidar posiciones, escalar guest posting, conseguir backlinks de alta autoridad y preparar la operativa de SEO continuo."),
        emptyLine(),

        heading2("Semana 9-10 (Dias 61-74): Autoridad de dominio"),
        emptyLine(),

        heading3("Dias 61-63 - Post pilar 2: Automatizacion de procesos B2B: Guia definitiva"),
        checkItem("3.000+ palabras, enfoque estrategico"),
        checkItem("Keywords: automatizacion procesos B2B, automatizacion empresarial"),
        checkItem("Casos reales con cifras, infografia, FAQs"),
        checkItem("Publicar y distribuir masivamente"),
        emptyLine(),

        heading3("Dias 64-65 - Estudio propio: Estado de la digitalizacion en pymes espanolas"),
        checkItem("Crear mini-estudio con datos de tus clientes y fuentes publicas (INE, Eurostat)"),
        checkItem("Formato: post largo + PDF descargable"),
        checkItem("Esto es un link magnet: los medios citan estudios con datos originales"),
        checkItem("Publicar y enviar nota de prensa a 10 medios tech"),
        emptyLine(),

        heading3("Dias 66-68 - Guest posts lote 2"),
        checkItem("Escribir y enviar el guest post para el segundo medio que acepte"),
        checkItem("Seguimiento de pitches pendientes"),
        checkItem("Si ningun medio acepto: publicar en Medium en espanol y Dev.to con canonical a tu blog"),
        emptyLine(),

        heading3("Dias 69-70 - Eventos y networking"),
        checkItem("Asistir a 1 evento tech en Sevilla (meetup, charla, networking)"),
        checkItem("Ofrecer ponencia de 15 min en algun meetup local"),
        checkItem("Recoger tarjetas y hacer follow-up por LinkedIn"),
        emptyLine(),

        heading3("Dias 71-74 - Posts semanales + distribucion"),
        checkItem("Post 11: Migracion de WordPress a Next.js: cuando y como"),
        checkItem("Post 12: KPIs que toda empresa B2B debe medir en su software"),
        checkItem("Publicar, indexar, distribuir en redes"),
        checkItem("LinkedIn: 3 publicaciones esta semana (contenido nativo)"),
        emptyLine(),

        heading2("Semana 11-12 (Dias 75-90): Consolidacion y sistema"),
        emptyLine(),

        heading3("Dias 75-77 - Optimizacion de lo existente"),
        checkItem("Search Console > Rendimiento: ver keywords con impresiones pero pocos clics"),
        checkItem("Mejorar titles y descriptions de esas paginas para subir CTR"),
        checkItem("Actualizar posts antiguos con datos nuevos y links a contenido reciente"),
        checkItem("Anadir internal links entre posts nuevos y existentes"),
        emptyLine(),

        heading3("Dias 78-80 - Tercer lote de guest posts"),
        checkItem("Enviar 3 pitches nuevos a medios de segundo nivel"),
        checkItem("Considerar podcasts de tecnologia/emprendimiento (formato entrevista)"),
        checkItem("Buscar colaboraciones con otros profesionales tech en LinkedIn"),
        emptyLine(),

        heading3("Dias 81-83 - Posts finales del trimestre"),
        checkItem("Post 13: Seguridad en software a medida: checklist para empresas"),
        checkItem("Post 14: Ecosistema digital para pymes: de Excel al ERP conectado"),
        checkItem("Ambos con FAQs, links internos, distribucion completa"),
        emptyLine(),

        heading3("Dias 84-86 - Linkbuilding avanzado"),
        checkItem("Crear pagina de recursos/tools en el blog enlazando herramientas de otros"),
        checkItem("Notificar a los creadores de esas herramientas (suelen devolver el link)"),
        checkItem("Buscar menciones sin link de Qubelia en Google y pedir que anadir el enlace"),
        checkItem("Revisar backlinks de competidores en Ahrefs y replicar los mejores"),
        emptyLine(),

        heading3("Dias 87-88 - Crear sistema de contenido mensual"),
        checkItem("Documentar el proceso de creacion de posts (plantilla, checklist, distribucion)"),
        checkItem("Crear calendario editorial para los proximos 3 meses"),
        checkItem("Definir responsable de cada tarea (contenido, redes, link building)"),
        checkItem("Objetivo post-90 dias: 2 posts/semana + 1 guest post/mes"),
        emptyLine(),

        heading3("Dias 89-90 - Revision final Fase 3 y planificacion Q2"),
        checkItem("Informe completo de Search Console: paginas indexadas, impresiones, clics, posicion media"),
        checkItem("Informe de Google Analytics: trafico organico, paginas mas visitadas, conversiones"),
        checkItem("Informe de backlinks: dominios referentes, mejores links, DR actual"),
        checkItem("Comparar con KPIs objetivo (ver tabla abajo)"),
        checkItem("Planificar proximos 90 dias basandose en los datos reales"),
        emptyLine(),

        makeTable(
          ["KPI Final (Dia 90)", "Objetivo", "Como medir"],
          [
            ["Paginas indexadas", "30+ (todas)", "Search Console"],
            ["Impresiones/mes", "8.000-15.000", "Search Console"],
            ["Clics organicos/mes", "300-600", "Search Console"],
            ["Posicion media keywords core", "10-25", "Search Console"],
            ["Posts en blog", "14+", "qubelia.es/blog"],
            ["Guest posts", "2-4", "Medios externos"],
            ["Dominios referentes", "30+", "Ahrefs"],
            ["Resenas Google", "8-10", "Google Business"],
            ["Domain Rating", "10-15", "Ahrefs"],
          ],
          [2800, 1800, 4426]
        ),

        // ════════════════════════════════════════════════
        // CALENDARIO SEMANAL TIPO
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("5. Calendario semanal tipo (post-90 dias)"),
        para("Una vez completados los 90 dias, esta es la rutina semanal para mantener y escalar el posicionamiento:"),
        emptyLine(),

        makeTable(
          ["Dia", "Tarea", "Tiempo est."],
          [
            ["Lunes", "Revisar Search Console: errores, impresiones, nuevas keywords", "30 min"],
            ["Lunes", "Planificar contenido de la semana", "30 min"],
            ["Martes", "Escribir post de blog (borrador)", "2-3 h"],
            ["Miercoles", "Editar, optimizar SEO y publicar post", "1-2 h"],
            ["Miercoles", "Distribuir en LinkedIn y redes", "30 min"],
            ["Jueves", "Link building: comentarios, foros, outreach", "1 h"],
            ["Jueves", "Responder HARO/Connectively si hay consultas", "30 min"],
            ["Viernes", "Escribir segundo post de la semana", "2-3 h"],
            ["Sabado", "Publicar, indexar y distribuir segundo post", "1 h"],
            ["Sabado", "Google Post semanal + revision de resenas", "30 min"],
          ],
          [1400, 5626, 2000]
        ),
        emptyLine(),
        boldPara("Tiempo total semanal estimado: ", "10-14 horas"),

        // ════════════════════════════════════════════════
        // HERRAMIENTAS
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("6. Herramientas recomendadas"),
        emptyLine(),

        heading2("6.1 Gratuitas (imprescindibles)"),
        makeTable(
          ["Herramienta", "Para que", "URL"],
          [
            ["Google Search Console", "Indexacion, rendimiento, errores SEO", "search.google.com/search-console"],
            ["Google Analytics 4", "Trafico, comportamiento, conversiones", "analytics.google.com"],
            ["Google Business Profile", "SEO local, resenas, visibilidad Maps", "business.google.com"],
            ["PageSpeed Insights", "Core Web Vitals, velocidad de carga", "pagespeed.web.dev"],
            ["Schema Validator", "Validar JSON-LD / datos estructurados", "validator.schema.org"],
            ["Ahrefs Webmaster Tools", "Backlinks, keywords, salud del sitio", "ahrefs.com/webmaster-tools"],
            ["Ubersuggest (free tier)", "Keyword research basico", "neilpatel.com/ubersuggest"],
            ["Canva", "Infografias para posts y redes", "canva.com"],
          ],
          [2800, 3226, 3000]
        ),
        emptyLine(),

        heading2("6.2 De pago (opcionales, recomendadas a partir del mes 3)"),
        makeTable(
          ["Herramienta", "Precio aprox.", "Para que"],
          [
            ["Ahrefs Lite", "99 EUR/mes", "Keyword research avanzado, analisis competencia, backlinks"],
            ["Semrush Pro", "120 EUR/mes", "Alternativa a Ahrefs, tracking de posiciones"],
            ["Screaming Frog (pro)", "149 GBP/ano", "Crawl tecnico completo del sitio"],
            ["Surfer SEO", "69 EUR/mes", "Optimizacion de contenido con NLP"],
          ],
          [2800, 2200, 4026]
        ),

        // ════════════════════════════════════════════════
        // ERRORES A EVITAR
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("7. Errores criticos a evitar"),
        emptyLine(),

        makeTable(
          ["Error", "Por que es peligroso", "Que hacer en su lugar"],
          [
            ["Comprar backlinks", "Google penaliza con caida de posiciones o desindexacion", "Ganar links con contenido de calidad y outreach honesto"],
            ["Usar PBNs (Private Blog Networks)", "Penalizacion manual casi segura", "Guest posting en medios reales"],
            ["Keyword stuffing", "Google detecta sobreoptimizacion y baja posiciones", "Escribir de forma natural, usar sinonimos y variaciones"],
            ["Contenido duplicado", "Google elige una version y ignora las demas", "Contenido original siempre, canonical si publicas en Medium"],
            ["Ignorar mobile", "60%+ del trafico es movil, Google indexa mobile-first", "Qubelia ya es responsive - mantenerlo asi"],
            ["No medir resultados", "Sin datos no sabes que funciona", "Revisar Search Console semanalmente"],
            ["NAP inconsistente", "Destruye SEO local: Google no sabe cual es correcto", "Mismo nombre, direccion y telefono en TODOS los sitios"],
            ["Publicar y olvidar", "Un post sin distribucion no genera trafico ni links", "Cada post: indexar + LinkedIn + redes + Google Post"],
            ["Demasiados links nofollow", "No pasan autoridad, invierten tiempo sin retorno", "Priorizar links dofollow de directorios y guest posts"],
            ["Impaciencia", "SEO tarda 3-6 meses en mostrar resultados reales", "Mantener el ritmo; los resultados son exponenciales"],
          ],
          [2200, 3413, 3413]
        ),

        // ════════════════════════════════════════════════
        // CHECKLIST RESUMEN
        // ════════════════════════════════════════════════
        new Paragraph({ children: [new PageBreak()] }),
        heading1("8. Checklist resumen ejecutivo"),
        para("Usa esta lista como referencia rapida para verificar que no se te escapa nada:"),
        emptyLine(),

        heading2("Infraestructura tecnica"),
        checkItem("Deploy de optimizaciones SEO de codigo"),
        checkItem("Sitemap.xml enviado a Search Console"),
        checkItem("Robots.txt verificado"),
        checkItem("Todas las paginas solicitadas para indexacion"),
        checkItem("Core Web Vitals en verde (PageSpeed Insights)"),
        checkItem("Schema JSON-LD validado en todas las paginas clave"),
        checkItem("Pagina 404 personalizada funcionando"),
        checkItem("Redirects 301 para URLs antiguas"),
        emptyLine(),

        heading2("Google Business Profile"),
        checkItem("Perfil creado y verificado"),
        checkItem("Nombre, direccion, telefono correctos"),
        checkItem("Categorias configuradas"),
        checkItem("Descripcion con keywords"),
        checkItem("10+ fotos subidas"),
        checkItem("Google Posts semanales"),
        checkItem("8-10 resenas (4.8+ estrellas)"),
        emptyLine(),

        heading2("Contenido"),
        checkItem("14+ posts de blog publicados"),
        checkItem("2 posts pilar (3.000+ palabras)"),
        checkItem("Cada post con FAQs, links internos, schema"),
        checkItem("Calendario editorial para los proximos 3 meses"),
        checkItem("Pagina /casos con case studies dedicados"),
        emptyLine(),

        heading2("Link building"),
        checkItem("Perfil en Clutch, GoodFirms, DesignRush"),
        checkItem("Perfil en 6+ directorios espanoles"),
        checkItem("NAP consistente en todos los directorios"),
        checkItem("2-4 guest posts publicados"),
        checkItem("Backlinks desde clientes"),
        checkItem("Registro en Connectively/Qwoted"),
        checkItem("30+ dominios referentes"),
        emptyLine(),

        heading2("Redes y distribucion"),
        checkItem("LinkedIn empresa optimizado"),
        checkItem("3 publicaciones/semana en LinkedIn"),
        checkItem("Cada post distribuido en redes el dia de publicacion"),
        checkItem("Google Posts semanales"),
        emptyLine(),

        // FOOTER
        new Paragraph({ children: [new PageBreak()] }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 2000 },
          children: [new TextRun({ text: "QUBELIA", size: 18, font: "Arial", color: BRAND, bold: true, characterSpacing: 300 })],
        }),
        emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Plan SEO 90 dias para el mercado espanol B2B", size: 24, font: "Arial", color: "666666" })],
        }),
        emptyLine(),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "qubelia.es  |  help@qubelia.es", size: 20, font: "Arial", color: BRAND })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
          children: [new TextRun({ text: "Documento generado en abril de 2026. Actualizar trimestralmente.", size: 18, font: "Arial", color: "999999", italics: true })],
        }),
      ],
    },
  ],
});

const OUTPUT = process.argv[2] || "Plan-SEO-90-Dias-Qubelia.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log(`Documento generado: ${OUTPUT}`);
});
