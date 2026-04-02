import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Aviso legal de Qubelia",
  description: "Titularidad, condiciones de uso, propiedad intelectual y limitacion de responsabilidad del sitio web de Qubelia.",
  path: "/legal/aviso-legal",
});

const cardClass = "surface-card rounded-3xl p-6";

export default function AvisoLegal() {
  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/aviso-legal" },
        { label: "Aviso legal" },
      ]}
      eyebrow="Legal"
      title="Aviso legal"
      description="Aqui se recoge la informacion del titular del sitio, las condiciones de uso y los limites de responsabilidad aplicables al acceso y navegacion en qubelia.es."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Datos del titular</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Qubelia · Daniil Kuradchik Pekarskaya</p>
            <p>NIF: 30865688X</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
            <p>Calle Torrelodones 84B, 41016 Sevilla, Espana</p>
          </div>
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">1. Identificacion del titular</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            En cumplimiento del articulo 10 de la Ley 34/2002, de servicios de la sociedad de la informacion y del comercio electronico, el titular de este sitio web es Daniil Kuradchik Pekarskaya, que opera comercialmente como Qubelia.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>NIF: 30865688X</li>
            <li>Domicilio: Calle Torrelodones 84B, 41016 Sevilla, Espana</li>
            <li>Email: {CONTACT.email}</li>
            <li>Telefono: {CONTACT.phone}</li>
            <li>Actividad: consultoria tecnologica, desarrollo de software a medida y automatizacion para empresas.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">2. Objeto y ambito de aplicacion</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Este aviso regula el acceso y uso del sitio web corporativo de Qubelia, asi como los contenidos y servicios informativos que se ponen a disposicion de los usuarios. El acceso al sitio implica la aceptacion de estas condiciones.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">3. Condiciones de uso</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Hacer un uso licito, diligente y conforme a la buena fe del sitio y de sus contenidos.</li>
            <li>No danar, sobrecargar o deteriorar los sistemas, equipos o redes de Qubelia ni de terceros.</li>
            <li>No intentar acceder a areas restringidas, datos o cuentas sin autorizacion.</li>
            <li>No introducir malware, virus ni otros elementos que puedan alterar el funcionamiento del sitio.</li>
            <li>No utilizar los contenidos con fines ilicitos o contrarios a la ley, al orden publico o a este aviso.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">4. Propiedad intelectual e industrial</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Los contenidos del sitio, incluidos textos, imagenes, logotipos, disenos, codigo y materiales asociados, pertenecen a Qubelia o a sus respectivos titulares y estan protegidos por la normativa de propiedad intelectual e industrial.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            No se autoriza la reproduccion, distribucion, transformacion o comunicacion publica de estos contenidos sin permiso previo, salvo en los supuestos previstos legalmente.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">5. Responsabilidad y garantias</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            La informacion publicada tiene caracter general e informativo. Qubelia puede modificar, actualizar o retirar contenidos en cualquier momento y no garantiza la disponibilidad continua del sitio.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Fallos o interrupciones tecnicas del sitio web.</li>
            <li>Danos derivados de virus, malware o elementos daninos ajenos a su control razonable.</li>
            <li>Decisiones tomadas por el usuario a partir de informacion general sin asesoramiento profesional especifico.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">6. Enlaces a terceros</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            El sitio puede incluir enlaces a paginas de terceros con fines informativos. Qubelia no controla ni asume responsabilidad sobre sus contenidos, disponibilidad o politicas de privacidad.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">7. Ley aplicable y jurisdiccion</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Este sitio se rige por la legislacion espanola. Para cualquier controversia derivada de su acceso o uso, las partes se someten a los juzgados y tribunales de Sevilla, salvo que una norma imperativa establezca otro fuero.
          </p>
        </section>
      </div>
    </StaticPageFrame>
  );
}
