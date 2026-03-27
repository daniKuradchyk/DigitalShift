import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { canonical, titleTemplate } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Politica de cookies"),
  description: "Politica de cookies de Qubelia: uso de cookies tecnicas y configuracion.",
  alternates: { canonical: canonical("/legal/cookies") },
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function Cookies() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#050A14]">
      <header className="border-b border-slate-200/60 dark:border-white/[0.06] bg-white/90 dark:bg-[#050A14]/90 backdrop-blur-xl">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <Link href="/" aria-label="Inicio"><Logo /></Link>
            <Link href="/" className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 transition-colors">← Inicio</Link>
          </div>
        </Container>
      </header>

      <Container className="py-14">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Política de cookies</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Información clara sobre qué cookies usamos, para qué sirven y cómo puedes gestionarlas en qubelia.es.
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">1. ¿Qué son las cookies?</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Las cookies son pequeños archivos que se descargan en tu dispositivo cuando navegas por un sitio web. Permiten, entre otras cosas, almacenar y
              recuperar información sobre tus hábitos de navegación o el funcionamiento básico del sitio.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">2. Tipos de cookies utilizadas en este sitio web</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              En qubelia.es utilizamos, en este momento, únicamente cookies técnicas o necesarias para el correcto funcionamiento del sitio. No usamos cookies
              de analítica ni publicitarias por el momento. Si en el futuro se añaden cookies de analítica (por ejemplo, Google Analytics 4) o de publicidad,
              se solicitará tu consentimiento previo a través del banner de cookies antes de instalarlas.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">3. Cookies técnicas o necesarias</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Estas cookies permiten que el sitio web funcione correctamente y proporcionan seguridad, balanceo de carga o preferencias básicas. Son esenciales
              y no requieren tu consentimiento. Pueden incluir cookies propias del framework utilizado y/o del proveedor de hosting (Netlify).
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">4. Cookies de analítica y otras cookies no necesarias</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Actualmente no utilizamos cookies de analítica ni otras cookies no necesarias. Si en el futuro incorporamos herramientas de analítica o
              publicidad, se presentará una tabla detallando cada cookie (nombre, proveedor, finalidad, duración y tipo) y se solicitará tu consentimiento
              antes de instalarlas. Ejemplo de tabla a completar:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600 dark:text-slate-300">
              <li>Nombre de la cookie</li>
              <li>Proveedor</li>
              <li>Finalidad</li>
              <li>Duración</li>
              <li>Tipo (técnica, analítica, publicitaria, etc.)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">5. Gestión y revocación del consentimiento</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Las cookies técnicas se instalan por ser necesarias para el funcionamiento del sitio. Cuando existan cookies no necesarias, podrás aceptarlas o
              rechazarlas mediante el banner de cookies antes de su instalación. Podrás modificar tu elección en cualquier momento a través del enlace
              permanente "Configurar cookies" disponible en el pie de página.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">6. Configuración de cookies en el navegador</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Consulta las opciones de privacidad y seguridad de tu
              navegador para ajustar las preferencias. Si bloqueas las cookies técnicas, es posible que el sitio no funcione correctamente.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">7. Actualización de la política de cookies</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Esta política puede actualizarse para reflejar cambios en el uso de cookies, la incorporación de nuevas herramientas o requisitos normativos.
              Publicaremos la versión vigente en qubelia.es y, cuando proceda, volveremos a solicitar tu consentimiento.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-slate-50 dark:bg-white/[0.02] p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Responsable y contacto</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300">
              Responsable: Daniil Kuradchik Pekarskaya - NIF: 30865688X - Domicilio: Calle Torrelodones 84B, 41016 Sevilla, Sevilla, España - Email:{" "}
              <a className="text-sky-600 dark:text-sky-400 hover:underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a> - Teléfono:{" "}
              <a className="text-sky-600 dark:text-sky-400 hover:underline" href="tel:+34674569372">674569372</a> - DPD: no aplica.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
