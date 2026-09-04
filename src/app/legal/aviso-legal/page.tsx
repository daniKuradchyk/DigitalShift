import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Aviso legal de Qubelia",
  description: "Titularidad, condiciones de uso, propiedad intelectual y limitación de responsabilidad del sitio web de Qubelia. Información legal conforme a la LSSI-CE.",
  path: "/legal/aviso-legal",
});

const cardClass = "py-8 first:pt-0 last:pb-0";

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Aviso legal", url: canonical("/legal/aviso-legal") },
]);

export default function AvisoLegal() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/aviso-legal" },
        { label: "Aviso legal" },
      ]}
      eyebrow="Legal"
      title="Aviso legal"
      description="Aquí se recoge la información del titular del sitio, las condiciones de uso y los límites de responsabilidad aplicables al acceso y navegación en qubelia.es."
      aside={
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Datos del titular</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#3D4046]">
            <p>Qubelia · Daniil Kuradchik Pekarskaya</p>
            <p>NIF: 30865688X</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
            <p>Calle Torrelodones 84B, 41016 Sevilla, España</p>
          </div>
        </>
      }
    >
      <div className="divide-y divide-[#E4E6EA]">
        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">1. Identificación del titular</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            En cumplimiento del artículo 10 de la Ley 34/2002, de servicios de la sociedad de la información y del comercio electrónico, el titular de este sitio web es Daniil Kuradchik Pekarskaya, que opera comercialmente como Qubelia.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3D4046]">
            <li>NIF: 30865688X</li>
            <li>Domicilio: Calle Torrelodones 84B, 41016 Sevilla, España</li>
            <li>Email: {CONTACT.email}</li>
            <li>Teléfono: {CONTACT.phone}</li>
            <li>Actividad: consultoría tecnológica, desarrollo de software a medida y automatización para empresas.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">2. Objeto y ámbito de aplicación</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Este aviso regula el acceso y uso del sitio web corporativo de Qubelia, así como los contenidos y servicios informativos que se ponen a disposición de los usuarios. El acceso al sitio implica la aceptación de estas condiciones.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">3. Condiciones de uso</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3D4046]">
            <li>Hacer un uso lícito, diligente y conforme a la buena fe del sitio y de sus contenidos.</li>
            <li>No dañar, sobrecargar o deteriorar los sistemas, equipos o redes de Qubelia ni de terceros.</li>
            <li>No intentar acceder a áreas restringidas, datos o cuentas sin autorización.</li>
            <li>No introducir malware, virus ni otros elementos que puedan alterar el funcionamiento del sitio.</li>
            <li>No utilizar los contenidos con fines ilícitos o contrarios a la ley, al orden público o a este aviso.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">4. Propiedad intelectual e industrial</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Los contenidos del sitio, incluidos textos, imágenes, logotipos, diseños, código y materiales asociados, pertenecen a Qubelia o a sus respectivos titulares y están protegidos por la normativa de propiedad intelectual e industrial.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            No se autoriza la reproducción, distribución, transformación o comunicación pública de estos contenidos sin permiso previo, salvo en los supuestos previstos legalmente.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">5. Responsabilidad y garantías</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            La información publicada tiene carácter general e informativo. Qubelia puede modificar, actualizar o retirar contenidos en cualquier momento y no garantiza la disponibilidad continua del sitio.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3D4046]">
            <li>Fallos o interrupciones técnicas del sitio web.</li>
            <li>Daños derivados de virus, malware o elementos dañinos ajenos a su control razonable.</li>
            <li>Decisiones tomadas por el usuario a partir de información general sin asesoramiento profesional específico.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">6. Enlaces a terceros</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            El sitio puede incluir enlaces a páginas de terceros con fines informativos. Qubelia no controla ni asume responsabilidad sobre sus contenidos, disponibilidad o políticas de privacidad.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">7. Ley aplicable y jurisdicción</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Este sitio se rige por la legislación española. Para cualquier controversia derivada de su acceso o uso, las partes se someten a los juzgados y tribunales de Sevilla, salvo que una norma imperativa establezca otro fuero.
          </p>
        </section>
      </div>
    </StaticPageFrame>
    </>
  );
}
