import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import Calculator from "./Calculator";
import FeedbackForm from "./FeedbackForm";
import { canonical, openGraphImage, titleTemplate } from "@/lib/seo";
import { faqJsonLd } from "@/lib/jsonld";

const pageTitle = "Estimador de cuota IRPF anual";
const pageDescription =
  "Estimador de cuota IRPF para cuenta ajena, autonomos y pluriactividad. Calcula cuota diferencial con desglose y avisos legales. No guarda datos.";

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
    q: "Esto es asesoramiento fiscal?",
    a: "No. Es una estimacion orientativa para entender tu situacion. Para casos complejos consulta a un asesor o la AEAT.",
  },
  {
    q: "Que regimen incluye el estimador?",
    a: "Solo regimen comun (AEAT). Pais Vasco y Navarra no estan soportados.",
  },
  {
    q: "Se guardan mis datos?",
    a: "No. Los calculos se hacen en tu navegador y no se almacenan datos personales.",
  },
];

export default function CalculatorPage() {
  const faqLd = faqJsonLd(faqItems);

  return (
    <main className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-sky-50/40 via-white/20 to-sky-50/40 dark:from-slate-950/40 dark:via-slate-900/20 dark:to-slate-950/40">
      <Script id="ld-faq-irpf" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-sky-500/10 blur-3xl dark:bg-sky-700/10" />
      </div>

      <Container>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" aria-label="Ir a inicio" className="inline-flex items-center">
            <Logo className="scale-90 origin-left" />
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <Button as="a" href="/labs" variant="ghost">Volver a Labs</Button>
            <Button as="a" href="/#contacto" variant="shine">Hablar con Qubelia</Button>
          </div>
        </div>

        <section className="grid gap-8 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 dark:border-sky-500/30 bg-sky-50/80 dark:bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
              Herramienta gratuita
            </div>
            <div className="max-w-xl space-y-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Estimador de cuota IRPF anual</h1>
              <p className="text-slate-700 dark:text-slate-300">
                Estimacion rapida para cuenta ajena, autonomo (directa o modulos) o pluriactividad. Incluye desglose por tramos, deducciones basicas
                y avisos de precision.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#calculadora" variant="shine" className="w-full sm:w-auto">Ir al estimador</Button>
              <Button as="a" href="#metodologia" variant="ghost" className="w-full sm:w-auto">Fuentes y metodologia</Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Modo", value: "Estimador" },
                { label: "Ejercicio", value: "2024-2025" },
                { label: "Datos", value: "No guardados" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/80 dark:bg-white/[0.03] p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-4 sm:p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Incluye</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Cuenta ajena, autonomo (directa o modulos) y pluriactividad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Escala general, ahorro y deduccion 340 (2025).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Helpers para suministros y manutencion.</span>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-sky-100 dark:border-sky-500/40 bg-sky-50/80 dark:bg-sky-500/10 p-4 text-sm text-sky-700 dark:text-sky-300">
                Regimen foral no soportado. Para Pais Vasco y Navarra consulta fuentes oficiales.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-4 sm:p-6 shadow-sm backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Nota legal</p>
              <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                Estimacion orientativa. No sustituye asesoramiento profesional. Normativa cambia por año y CCAA.
              </p>
            </div>
          </aside>
        </section>

        <section id="calculadora" className="mt-12">
          <Calculator />
        </section>

        <section id="metodologia" className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold tracking-tight">Fuentes y metodologia</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Los calculos usan reglas parametrizadas por año. La escala combinada es una aproximacion estatal x2 si no se elige CCAA.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_1-base-liquidable-general/gravamen-estatal.html">Escala estatal base general (IRPF 2024)</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_1-base-liquidable-general/gravamen-autonomico.html">Gravamen autonomico (CCAA)</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/11-determinacion-cuotas-gramen-impuesto/11_1-cuota-integra/11_1_2-base-liquidable-ahorro/gravamen-base-liquidable-ahorro.html">Escala ahorro IRPF 2024</a></li>
              <li><a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2024-27403">Cambio 2025 ahorro (Ley 7/2024)</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_1-rendimientos-trabajo-personal/7_1_6-reduccion-obtencion-rendimientos-trabajo.html">Reduccion rendimientos trabajo</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_2-rendimiento-neto-calculado-conforme-art-30/estimacion-directa-simplificada.html">Estimacion directa simplificada</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2019/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_3-gastos-fiscalmente-deducibles/suministros.html">Suministros vivienda autonomo</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-ayuda-presentacion/irpf-2024/7-cumplimentacion-irpf/7_4-rendimientos-actividades-economicas/7_4_2-regimen-estimacion-directa/7_4_2_3-gastos-fiscalmente-deducibles/gastos-manutencion-contribuyente.html">Gastos manutencion autonomo</a></li>
              <li><a className="underline" href="https://www.seg-social.es/descarga/es/Tabla_Autonomo">Tabla tramos cotizacion autonomos 2025</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/irpf/tengo-que-presentar-declaracion/declaracion-individual-conjunta/caracteristicas-tributacion-conjunta.html">Reduccion tributacion conjunta</a></li>
              <li><a className="underline" href="https://www.boe.es/buscar/act.php?id=BOE-A-2025-15424">Deduccion 340 desde 2025</a></li>
              <li><a className="underline" href="https://sede.agenciatributaria.gob.es/Sede/irpf/novedades-impuesto/novedades-normativa-2025/principales-novedades-tributarias-introducidas-ley-julio.html">Novedades AEAT 2025</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Como se calcula</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Escala general progresiva + ahorro.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Reducciones trabajo y conjunta (si aplica).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Cuota liquida - retenciones y pagos a cuenta.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl border border-sky-100 dark:border-sky-500/40 bg-sky-50/80 dark:bg-sky-500/10 p-4 sm:p-6 text-sm text-sky-700 dark:text-sky-300">
              Si necesitas adaptar el estimador a un caso real o integrar tus datos, escribenos desde el formulario de contacto.
            </div>
          </div>
        </section>

        <section id="feedback" className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Feedback para mejorar el estimador</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Si detectas un error en el calculo o en los datos, cuentanoslo aqui. Revisamos cada mensaje y ajustamos la herramienta.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 dark:border-white/[0.07] bg-white/90 dark:bg-white/[0.03] p-4 sm:p-6 text-sm text-slate-700 dark:text-slate-200 shadow-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Que necesitamos</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>El paso donde viste el error (si lo sabes).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Una descripcion breve con el caso.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500/80" />
                  <span>Tu email solo si quieres respuesta.</span>
                </li>
              </ul>
            </div>
          </div>
          <FeedbackForm />
        </section>

        <section id="faq" className="mt-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Preguntas frecuentes</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">Respuestas rapidas sobre el alcance del estimador.</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {faqItems.map((item) => (
              <details
                key={item.q}
                className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white/80 dark:bg-white/[0.03] p-4 text-sm text-slate-700 dark:text-slate-200 shadow-sm"
              >
                <summary className="cursor-pointer font-semibold">{item.q}</summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
}
