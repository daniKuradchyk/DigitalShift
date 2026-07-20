import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad de Qubelia",
  description: "Tratamiento de datos personales, bases juridicas, plazos de conservacion y ejercicio de derechos ARCO en Qubelia conforme al RGPD y la LOPDGDD.",
  path: "/legal/privacidad",
});

const cardClass = "surface-card rounded-3xl p-6";

export default function Privacidad() {
  return (
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/privacidad" },
        { label: "Privacidad" },
      ]}
      eyebrow="Privacidad"
      title="Política de privacidad"
      description="Esta politica explica que datos personales tratamos, con que fines, cual es la base juridica de cada tratamiento y como puedes ejercer tus derechos."
      aside={
        <>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sky-400">Responsable</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <p>Daniil Kuradchik Pekarskaya · Qubelia</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
            <p>Atencion en materia de privacidad desde Sevilla, Espana.</p>
          </div>
        </>
      }
    >
      <div className="grid gap-6">
        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">1. Responsable del tratamiento</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            El responsable del tratamiento es Daniil Kuradchik Pekarskaya, que opera como Qubelia, con domicilio en Calle Torrelodones 84B, 41016 Sevilla, Espana. Para cualquier cuestion relacionada con datos personales puedes escribir a {CONTACT.email}.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">2. Datos, finalidades y bases juridicas</h2>
          <div className="mt-4 space-y-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Formulario de contacto y solicitudes</h3>
              <p className="mt-2">
                Tratamos nombre, email, telefono, empresa y la informacion incluida en el mensaje para responder consultas y gestionar posibles relaciones precontractuales. La base juridica es el consentimiento y, en su caso, la aplicacion de medidas precontractuales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Gestion de clientes y facturacion</h3>
              <p className="mt-2">
                Tratamos datos identificativos, de contacto y de facturacion necesarios para prestar el servicio, emitir facturas y cumplir obligaciones fiscales y contables. La base juridica es la ejecucion del contrato y el cumplimiento de obligaciones legales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Analitica y mejora del sitio</h3>
              <p className="mt-2">
                Si se habilitan cookies o herramientas de analitica no esenciales, se usaran para medir el uso del sitio y mejorar su rendimiento solo con consentimiento previo del usuario.
              </p>
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">3. Plazos de conservacion</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            <li>Consultas y solicitudes: mientras se tramitan y durante el plazo necesario para atender posibles responsabilidades.</li>
            <li>Datos de clientes y facturacion: durante la relacion contractual y los plazos legales exigibles.</li>
            <li>Analitica o marketing: hasta la retirada del consentimiento o la expiracion del plazo configurado para la herramienta correspondiente.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">4. Destinatarios y encargados</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Los datos solo se comunican a administraciones publicas, entidades financieras o proveedores necesarios para la prestacion del servicio cuando exista base legal o contractual para ello. En esos casos, Qubelia formaliza los encargos de tratamiento exigidos por la normativa aplicable.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">5. Transferencias internacionales</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Si se utilizan proveedores ubicados fuera del Espacio Economico Europeo, se adoptaran las garantias adecuadas previstas por el RGPD, como clausulas contractuales tipo o mecanismos equivalentes.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">6. Derechos de las personas interesadas</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Puedes ejercer tus derechos de acceso, rectificacion, supresion, oposicion, limitacion, portabilidad y retirada del consentimiento escribiendo a {CONTACT.email}. Si consideras que el tratamiento no es correcto, puedes presentar reclamacion ante la Agencia Espanola de Proteccion de Datos.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">7. Seguridad y actualizaciones</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Qubelia aplica medidas tecnicas y organizativas razonables para proteger la confidencialidad, integridad y disponibilidad de los datos personales. Esta politica puede actualizarse si cambian la normativa o los tratamientos realizados.
          </p>
        </section>
      </div>
    </StaticPageFrame>
  );
}
