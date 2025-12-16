import type { Metadata } from "next";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Aviso legal"),
  description: "Aviso legal de Qubelia: titular, condiciones de uso, responsabilidades y datos de contacto.",
  alternates: { canonical: canonical("/legal/aviso-legal") },
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AvisoLegal() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Legal</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Aviso legal</h1>
          <p className="text-slate-700">
            Este Aviso legal regula el acceso y uso del sitio web corporativo qubelia.es. Consulta cada apartado para conocer el titular, las condiciones de
            uso y las limitaciones de responsabilidad aplicables.
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">1. Identificación del titular</h2>
            <p className="mt-3 text-slate-700">
              En cumplimiento del art. 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI),
              se indican los datos de identificación del titular del sitio web corporativo de Qubelia:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Titular: Daniil Kuradchik Pekarskaya (Qubelia)</li>
              <li>NIF/CIF: 30865688X</li>
              <li>Domicilio: Calle torrelodones 84B, Sevilla, Sevilla 41016</li>
              <li>Email: <a className="underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a></li>
              <li>Teléfono: <a className="underline" href="tel:+34674569372">674569372</a></li>
              <li>Actividad: consultoría tecnológica, desarrollo de software a medida, IA y automatización de procesos para empresas.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">2. Objeto y ámbito de aplicación</h2>
            <p className="mt-3 text-slate-700">
              El presente Aviso legal regula el acceso y uso del sitio web de Qubelia, así como los contenidos y servicios que se ponen a disposición de los
              usuarios. El acceso o utilización del sitio implica la aceptación de este Aviso legal. Si el usuario no está de acuerdo, debe abstenerse de
              utilizar el sitio web.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">3. Condiciones de uso del sitio web</h2>
            <p className="mt-3 text-slate-700">El usuario se compromete a:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Hacer un uso diligente, lícito y conforme a la buena fe del sitio y de sus contenidos.</li>
              <li>No dañar, sobrecargar o deteriorar los sistemas, equipos o redes de Qubelia ni de terceros.</li>
              <li>No intentar acceder a áreas, datos o cuentas de terceros sin autorización.</li>
              <li>No introducir o difundir virus, malware o cualquier otro software dañino.</li>
              <li>No realizar actividades ilícitas, fraudulentas o que puedan perjudicar a Qubelia o a terceros.</li>
              <li>No utilizar los contenidos con fines o efectos contrarios a la ley, este Aviso legal, la buena fe o el orden público.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">4. Propiedad intelectual e industrial</h2>
            <p className="mt-3 text-slate-700">
              Qubelia, o su titular Daniil Kuradchik Pekarskaya, es titular o licenciatario de los derechos de propiedad intelectual e industrial sobre los
              contenidos del sitio web, incluyendo de forma enunciativa textos, imágenes, logotipos, marcas, diseños, código fuente y demás elementos, salvo
              indicación expresa en contrario.
            </p>
            <p className="mt-3 text-slate-700">
              No se permite la reproducción, distribución, comunicación pública, puesta a disposición o transformación de los contenidos sin autorización previa
              y expresa de su titular, salvo en los supuestos legalmente permitidos. El acceso al sitio no implica cesión o renuncia de derechos de propiedad
              intelectual o industrial.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">5. Responsabilidad y exclusión de garantías</h2>
            <p className="mt-3 text-slate-700">
              Los contenidos del sitio tienen carácter general y meramente informativo y pueden modificarse, actualizarse o retirarse en cualquier momento sin
              previo aviso. Qubelia no garantiza la disponibilidad, continuidad ni la infalibilidad del funcionamiento del sitio.
            </p>
            <p className="mt-3 text-slate-700">Qubelia no se hace responsable de los daños o perjuicios que puedan derivarse de:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
              <li>Fallos o interrupciones técnicas en el funcionamiento del sitio web.</li>
              <li>La presencia de virus, malware o cualquier otro elemento dañino en los contenidos o servicios.</li>
              <li>Decisiones o actuaciones realizadas a partir de la información proporcionada en el sitio sin contar con la asesoría profesional adecuada.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">6. Enlaces a otros sitios web</h2>
            <p className="mt-3 text-slate-700">
              El sitio web puede incluir enlaces a páginas o contenidos de terceros que se facilitan únicamente a efectos informativos. Qubelia no controla ni
              es responsable del contenido, servicios, disponibilidad, condiciones o políticas de privacidad de dichos sitios. El usuario accede a estos enlaces
              bajo su exclusiva responsabilidad.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">7. Normativa aplicable y jurisdicción</h2>
            <p className="mt-3 text-slate-700">
              Este sitio web se rige por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso del sitio, las partes se
              someten, con renuncia expresa a cualquier otro fuero que pudiera corresponderles, a los Juzgados y Tribunales de Sevilla, salvo que una norma
              imperativa disponga otro fuero diferente.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
