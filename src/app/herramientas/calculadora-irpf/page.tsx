import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Footer from "@/components/sections/Footer";
import Calculator from "./Calculator";
import FeedbackForm from "./FeedbackForm";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";
import { breadcrumbJsonLd, faqJsonLd, softwareAppJsonLd } from "@/lib/jsonld";

const pageTitle = "Estimador de cuota IRPF anual";
const pageDescription =
  "Estimador de cuota IRPF para cuenta ajena, autónomos y pluriactividad. Calcula cuota diferencial con desglose y avisos legales. No guarda datos.";

export const metadata: Metadata = {
  title: titleTemplate(pageTitle),
  description: pageDescription,
  alternates: { canonical: canonical("/herramientas/calculadora-irpf") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate(pageTitle),
    description: pageDescription,
    url: canonical("/herramientas/calculadora-irpf"),
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
    siteName: "Qubelia",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate(pageTitle),
    description: pageDescription,
    images: openGraphImage(),
  },
};

export const revalidate = 86400;

const faqItems = [
  {
    q: "¿Esto es asesoramiento fiscal?",
    a: "No. Es una estimación orientativa para entender tu situación. Para casos complejos consulta a un asesor o la AEAT.",
  },
  {
    q: "¿Qué régimen incluye el estimador?",
    a: "Solo régimen común (AEAT). País Vasco y Navarra no están soportados.",
  },
  {
    q: "¿Se guardan mis datos?",
    a: "No. Los cálculos se hacen en tu navegador y no se almacenan datos personales.",
  },
];

const heroFacts = [
  { label: "Modo", value: "Estimador" },
  { label: "Ejercicio", value: "2024-2025" },
  { label: "Datos", value: "No guardados" },
];

const includedItems = [
  "Cuenta ajena, autónomo (directa o módulos) y pluriactividad.",
  "Escala general, ahorro y deducción 340 (2025).",
  "Helpers para suministros y manutención.",
];

const methodItems = [
  "Escala general progresiva + ahorro.",
  "Reducciones trabajo y conjunta (si aplica).",
  "Cuota líquida - retenciones y pagos a cuenta.",
];

const feedbackItems = [
  "El paso donde viste el error (si lo sabes).",
  "Una descripción breve con el caso.",
  "Tu email solo si quieres respuesta.",
];

const sourceLinks = [
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_1-base-liquidable-general/gravamen-estatal.html",
    label: "Escala estatal base general (IRPF 2024)",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_1-base-liquidable-general/gravamen-autonomico.html",
    label: "Gravamen autonómico (CCAA)",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_2-base-liquidable-ahorro/gravamen-base-liquidable-ahorro.html",
    label: "Escala ahorro IRPF 2024",
  },
  {
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-27403",
    label: "Cambio 2025 ahorro (Ley 7/2024)",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_1-rendimientos-trabajo-personal/7_1_6-reduccion-obtencion-rendimientos-trabajo.html",
    label: "Reducción rendimientos trabajo",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_2-rendimiento-neto-calculado-conforme-art-30/estimacion-directa-simplificada.html",
    label: "Estimación directa simplificada",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2019/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_3-gastos-fiscalmente-deducibles/suministros.html",
    label: "Suministros vivienda autónomo",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_3-gastos-fiscalmente-deducibles/gastos-manutencion-contribuyente.html",
    label: "Gastos manutención autónomo",
  },
  {
    href: "https://www.seg-social.es/descarga/es/Tabla_Autonomo",
    label: "Tabla tramos cotización autónomos 2025",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/irpf/tengo-que-presentar-declaracion/declaracion-individual-conjunta/caracteristicas-tributacion-conjunta.html",
    label: "Reducción tributación conjunta",
  },
  {
    href: "https://www.boe.es/buscar/act.php?id=BOE-A-2025-15424",
    label: "Deducción 340 desde 2025",
  },
  {
    href: "https://sede.agenciatributaria.gob.es/Sede/irpf/novedades-impuesto/novedades-normativa-2025/principales-novedades-tributarias-introducidas-ley-julio.html",
    label: "Novedades AEAT 2025",
  },
];

const listItem = "py-3 text-sm leading-relaxed text-[#3D4046] first:pt-0 last:pb-0";
const panelTitle = "text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]";

export default function CalculatorPage() {
  const faqLd = faqJsonLd(faqItems);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Inicio", url: canonical("/") },
    { name: "Labs", url: canonical("/labs") },
    { name: pageTitle, url: canonical("/herramientas/calculadora-irpf") },
  ]);
  const appLd = softwareAppJsonLd([
    { title: pageTitle, desc: pageDescription, href: "/herramientas/calculadora-irpf" },
  ])[0];

  return (
    <>
      {/* JSON-LD en el HTML del servidor: con <Script strategy="afterInteractive"> el
          bloque sólo existía tras hidratar y no llegaba al HTML rastreado. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appLd) }} />
      <main className="bg-white">

      {/* Barra superior */}
      <div className="border-b border-[#E4E6EA]">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 py-5">
            <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
              <Logo className="origin-left" />
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <Button as="a" href="/labs" variant="ghost" size="sm">Volver a Labs</Button>
              <Button as="a" href="/#contacto" variant="primary" size="sm">Hablar con Qubelia</Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="border-b border-[#E4E6EA]">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-24">
            <div>
              <p className="section-tag">Herramienta gratuita</p>

              <h1 className="mt-8 max-w-2xl text-h1">Estimador de cuota IRPF anual</h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#3D4046]">
                Estimación rápida para cuenta ajena, autónomo (directa o módulos) o pluriactividad. Incluye desglose por tramos, deducciones básicas
                y avisos de precisión.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href="#calculadora" variant="shine" size="lg" className="w-full sm:w-auto">Ir al estimador</Button>
                <Button as="a" href="#metodologia" variant="ghost" size="lg" className="w-full sm:w-auto">Fuentes y metodología</Button>
              </div>

              <dl className="mt-12 grid grid-cols-1 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="py-6 sm:px-6 sm:first:pl-0 sm:last:pr-0">
                    <dt className={panelTitle}>{fact.label}</dt>
                    <dd className="mt-2 text-2xl font-semibold tracking-tight text-[#101014]">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <aside className="space-y-6 lg:border-l lg:border-[#E4E6EA] lg:pl-12">
              <div className="border border-[#E4E6EA] bg-white p-6 rounded-[4px]">
                <p className={panelTitle}>Incluye</p>
                <ul className="mt-4 divide-y divide-[#E4E6EA]">
                  {includedItems.map((item) => (
                    <li key={item} className={listItem}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l-2 border-brand-600 bg-[#F5F6F8] px-5 py-4 text-sm leading-relaxed text-[#3D4046]">
                Régimen foral no soportado. Para País Vasco y Navarra consulta fuentes oficiales.
              </div>

              <div>
                <p className={panelTitle}>Nota legal</p>
                <p className="mt-3 text-sm leading-relaxed text-[#63666D]">
                  Estimación orientativa. No sustituye asesoramiento profesional. Normativa cambia por año y CCAA.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Calculadora */}
      <section id="calculadora" className="scroll-mt-24 border-b border-[#E4E6EA] bg-[#F5F6F8] py-16 sm:py-20 lg:py-24">
        <Container>
          <Calculator />
        </Container>
      </section>

      {/* Fuentes y metodologia */}
      <section id="metodologia" className="scroll-mt-24 border-b border-[#E4E6EA] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <p className="section-tag">Metodología</p>
              <h2 className="mt-6 text-h2">Fuentes y metodología</h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#3D4046]">
                Los cálculos usan reglas parametrizadas por año. La escala combinada es una aproximación estatal x2 si no se elige CCAA.
              </p>

              <ul className="mt-8 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
                {sourceLinks.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      className="block py-3.5 text-sm font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600 hover:text-brand-600"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 lg:border-l lg:border-[#E4E6EA] lg:pl-12">
              <div className="border border-[#E4E6EA] bg-white p-6 rounded-[4px]">
                <p className={panelTitle}>Cómo se calcula</p>
                <ul className="mt-4 divide-y divide-[#E4E6EA]">
                  {methodItems.map((item) => (
                    <li key={item} className={listItem}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l-2 border-brand-600 bg-[#F5F6F8] px-5 py-4 text-sm leading-relaxed text-[#3D4046]">
                Si necesitas adaptar el estimador a un caso real o integrar tus datos, escríbenos desde el formulario de contacto.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Feedback */}
      <section id="feedback" className="scroll-mt-24 border-b border-[#E4E6EA] bg-[#F5F6F8] py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
            <div>
              <p className="section-tag">Feedback</p>
              <h2 className="mt-6 text-h2">Feedback para mejorar el estimador</h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#3D4046]">
                Si detectas un error en el cálculo o en los datos, cuéntanoslo aquí. Revisamos cada mensaje y ajustamos la herramienta.
              </p>

              <div className="mt-8 border border-[#E4E6EA] bg-white p-6 rounded-[4px]">
                <p className={panelTitle}>Qué necesitamos</p>
                <ul className="mt-4 divide-y divide-[#E4E6EA]">
                  {feedbackItems.map((item) => (
                    <li key={item} className={listItem}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <FeedbackForm />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl">
            <p className="section-tag">FAQ</p>
            <h2 className="mt-6 text-h2">Preguntas frecuentes</h2>
            <p className="mt-5 text-base leading-relaxed text-[#3D4046]">Respuestas rápidas sobre el alcance del estimador.</p>
          </div>

          <div className="mt-10 divide-y divide-[#E4E6EA] border-y border-[#E4E6EA]">
            {faqItems.map((item) => (
              <details key={item.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-medium leading-snug text-[#101014] [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden className="flex-none text-[#101014]">
                    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M10 4v12" className="group-open:hidden" />
                      <path d="M4 10h12" />
                    </svg>
                  </span>
                </summary>
                <p className="max-w-3xl pb-5 text-sm leading-relaxed text-[#3D4046]">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
      </main>
      <Footer />
    </>
  );
}
