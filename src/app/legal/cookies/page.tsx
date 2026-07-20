import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies de Qubelia",
  description: "Informacion sobre cookies tecnicas, analiticas y de marketing, consentimiento, configuracion y gestion de preferencias en el sitio web de Qubelia.",
  path: "/legal/cookies",
});

const cardClass = "surface-card rounded-3xl p-6";

export default function Cookies() {
  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/cookies" },
        { label: "Cookies" },
      ]}
      eyebrow="Cookies"
      title="Política de cookies"
      description="Aqui explicamos que cookies se utilizan en el sitio, para que sirven, como se recaba el consentimiento y como puedes revisar o cambiar tus preferencias."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Gestion</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Cookies tecnicas necesarias para el funcionamiento basico del sitio.</p>
            <p>Las cookies no esenciales solo se activan con consentimiento.</p>
            <p>Contacto: {CONTACT.email}</p>
          </div>
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">1. Que son las cookies</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Las cookies son pequenos archivos que se almacenan en tu dispositivo cuando visitas una pagina web. Permiten recordar preferencias, mantener sesiones y obtener informacion tecnica sobre el uso del sitio.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">2. Tipos de cookies utilizadas</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            El sitio utiliza cookies tecnicas o estrictamente necesarias para asegurar el funcionamiento basico, la seguridad y la gestion del consentimiento. Cuando se habilita la capa de analitica mediante Google Tag Manager, las cookies no esenciales solo se activan tras obtener autorizacion previa.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">3. Cookies tecnicas</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Estas cookies permiten que la web funcione correctamente y que se recuerden opciones esenciales como la aceptacion o configuracion de cookies. Al ser necesarias, no requieren consentimiento previo.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">4. Cookies no necesarias</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            La capa de analitica y medicion se gestiona mediante Google Tag Manager. Estas cookies o tecnologias equivalentes solo se cargan cuando existe consentimiento expreso, y puedes retirarlo en cualquier momento desde el banner o desde el enlace de preferencias.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">5. Gestion del consentimiento</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Puedes aceptar, rechazar o reconfigurar las cookies no necesarias desde el banner y desde el enlace permanente de preferencias de cookies disponible en el sitio. La revocacion del consentimiento no afecta a la licitud del tratamiento previo.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">6. Configuracion en el navegador</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Tambien puedes bloquear o eliminar cookies desde la configuracion de tu navegador. Ten en cuenta que desactivar cookies tecnicas puede afectar al funcionamiento correcto del sitio web.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">7. Contacto y actualizaciones</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Esta politica puede actualizarse para reflejar cambios funcionales, tecnicos o normativos. Para cualquier duda relacionada con cookies o privacidad puedes escribir a {CONTACT.email}.
          </p>
        </section>
      </div>
    </StaticPageFrame>
  );
}
