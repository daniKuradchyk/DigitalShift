import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies de Qubelia",
  description: "Información sobre cookies técnicas, analíticas y de marketing, consentimiento, configuración y gestión de preferencias en el sitio web de Qubelia.",
  path: "/legal/cookies",
});

const cardClass = "py-8 first:pt-0 last:pb-0";

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Política de cookies", url: canonical("/legal/cookies") },
]);

export default function Cookies() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/cookies" },
        { label: "Cookies" },
      ]}
      eyebrow="Cookies"
      title="Política de cookies"
      description="Aquí explicamos qué cookies se utilizan en el sitio, para qué sirven, cómo se recaba el consentimiento y cómo puedes revisar o cambiar tus preferencias."
      aside={
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Gestión</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#3D4046]">
            <p>Cookies técnicas necesarias para el funcionamiento básico del sitio.</p>
            <p>Las cookies no esenciales solo se activan con consentimiento.</p>
            <p>Contacto: {CONTACT.email}</p>
          </div>
        </>
      }
    >
      <div className="divide-y divide-[#E4E6EA]">
        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">1. Qué son las cookies</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando visitas una página web. Permiten recordar preferencias, mantener sesiones y obtener información técnica sobre el uso del sitio.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">2. Tipos de cookies utilizadas</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            El sitio utiliza cookies técnicas o estrictamente necesarias para asegurar el funcionamiento básico, la seguridad y la gestión del consentimiento. Cuando se habilita la capa de analítica mediante Google Tag Manager, las cookies no esenciales solo se activan tras obtener autorización previa.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">3. Cookies técnicas</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Estas cookies permiten que la web funcione correctamente y que se recuerden opciones esenciales como la aceptación o configuración de cookies. Al ser necesarias, no requieren consentimiento previo.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">4. Cookies no necesarias</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            La capa de analítica y medición se gestiona mediante Google Tag Manager. Estas cookies o tecnologías equivalentes solo se cargan cuando existe consentimiento expreso, y puedes retirarlo en cualquier momento desde el banner o desde el enlace de preferencias.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">5. Gestión del consentimiento</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Puedes aceptar, rechazar o reconfigurar las cookies no necesarias desde el banner y desde el enlace permanente de preferencias de cookies disponible en el sitio. La revocación del consentimiento no afecta a la licitud del tratamiento previo.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">6. Configuración en el navegador</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            También puedes bloquear o eliminar cookies desde la configuración de tu navegador. Ten en cuenta que desactivar cookies técnicas puede afectar al funcionamiento correcto del sitio web.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">7. Contacto y actualizaciones</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Esta política puede actualizarse para reflejar cambios funcionales, técnicos o normativos. Para cualquier duda relacionada con cookies o privacidad puedes escribir a {CONTACT.email}.
          </p>
        </section>
      </div>
    </StaticPageFrame>
    </>
  );
}
