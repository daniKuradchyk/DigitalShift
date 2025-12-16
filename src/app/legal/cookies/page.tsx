import Container from "@/components/common/Container";

export const revalidate = 86400;

export default function Cookies() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Política de cookies</h1>
          <p className="text-slate-700">
            Información clara sobre qué cookies usamos, para qué sirven y cómo puedes gestionarlas en qubelia.es.
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">1. ¿Qué son las cookies?</h2>
            <p className="mt-3 text-slate-700">
              Las cookies son pequeños archivos que se descargan en tu dispositivo cuando navegas por un sitio web. Permiten, entre otras cosas, almacenar y
              recuperar información sobre tus hábitos de navegación o el funcionamiento básico del sitio.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">2. Tipos de cookies utilizadas en este sitio web</h2>
            <p className="mt-3 text-slate-700">
              En qubelia.es utilizamos, en este momento, únicamente cookies técnicas o necesarias para el correcto funcionamiento del sitio. No usamos cookies
              de analítica ni publicitarias por el momento. Si en el futuro se añaden cookies de analítica (por ejemplo, Google Analytics 4) o de publicidad,
              se solicitará tu consentimiento previo a través del banner de cookies antes de instalarlas.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">3. Cookies técnicas o necesarias</h2>
            <p className="mt-3 text-slate-700">
              Estas cookies permiten que el sitio web funcione correctamente y proporcionan seguridad, balanceo de carga o preferencias básicas. Son esenciales
              y no requieren tu consentimiento. Pueden incluir cookies propias del framework utilizado y/o del proveedor de hosting (Netlify).
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">4. Cookies de analítica y otras cookies no necesarias</h2>
            <p className="mt-3 text-slate-700">
              Actualmente no utilizamos cookies de analítica ni otras cookies no necesarias. Si en el futuro incorporamos herramientas de analítica o
              publicidad, se presentará una tabla detallando cada cookie (nombre, proveedor, finalidad, duración y tipo) y se solicitará tu consentimiento
              antes de instalarlas. Ejemplo de tabla a completar:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Nombre de la cookie</li>
              <li>Proveedor</li>
              <li>Finalidad</li>
              <li>Duración</li>
              <li>Tipo (técnica, analítica, publicitaria, etc.)</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">5. Gestión y revocación del consentimiento</h2>
            <p className="mt-3 text-slate-700">
              Las cookies técnicas se instalan por ser necesarias para el funcionamiento del sitio. Cuando existan cookies no necesarias, podrás aceptarlas o
              rechazarlas mediante el banner de cookies antes de su instalación. Podrás modificar tu elección en cualquier momento a través del enlace
              permanente “Configurar cookies” disponible en el pie de página.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">6. Configuración de cookies en el navegador</h2>
            <p className="mt-3 text-slate-700">
              Puedes permitir, bloquear o eliminar las cookies desde la configuración de tu navegador. Consulta las opciones de privacidad y seguridad de tu
              navegador para ajustar las preferencias. Si bloqueas las cookies técnicas, es posible que el sitio no funcione correctamente.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">7. Actualización de la política de cookies</h2>
            <p className="mt-3 text-slate-700">
              Esta política puede actualizarse para reflejar cambios en el uso de cookies, la incorporación de nuevas herramientas o requisitos normativos.
              Publicaremos la versión vigente en qubelia.es y, cuando proceda, volveremos a solicitar tu consentimiento.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">Responsable y contacto</h2>
            <p className="mt-3 text-slate-700">
              Responsable: Daniil Kuradchik Pekarskaya - NIF: 30865688X - Domicilio: Calle Torrelodones 84B, 41016 Sevilla, Sevilla, España - Email:{" "}
              <a className="underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a> - Teléfono:{" "}
              <a className="underline" href="tel:+34674569372">674569372</a> - DPD: no aplica.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
