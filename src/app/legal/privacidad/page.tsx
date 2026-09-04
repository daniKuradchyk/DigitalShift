import type { Metadata } from "next";
import StaticPageFrame from "@/components/marketing/StaticPageFrame";
import { CONTACT } from "@/config/contact";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { buildMetadata, canonical } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = buildMetadata({
  title: "Política de privacidad de Qubelia",
  description: "Tratamiento de datos personales, bases jurídicas, plazos de conservación y ejercicio de derechos ARCO en Qubelia conforme al RGPD y la LOPDGDD.",
  path: "/legal/privacidad",
});

const cardClass = "py-8 first:pt-0 last:pb-0";

const breadcrumbLd = breadcrumbJsonLd([
  { name: "Inicio", url: canonical("/") },
  { name: "Política de privacidad", url: canonical("/legal/privacidad") },
]);

export default function Privacidad() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
    <StaticPageFrame
      breadcrumbs={[
        { label: "Inicio", href: "/" },
        { label: "Legal", href: "/legal/privacidad" },
        { label: "Privacidad" },
      ]}
      eyebrow="Privacidad"
      title="Política de privacidad"
      description="Esta política explica qué datos personales tratamos, con qué fines, cuál es la base jurídica de cada tratamiento y cómo puedes ejercer tus derechos."
      aside={
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Responsable</p>
          <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#3D4046]">
            <p>Daniil Kuradchik Pekarskaya · Qubelia</p>
            <p>{CONTACT.email}</p>
            <p>{CONTACT.phone}</p>
            <p>Atención en materia de privacidad desde Sevilla, España.</p>
          </div>
        </>
      }
    >
      <div className="divide-y divide-[#E4E6EA]">
        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">1. Responsable del tratamiento</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            El responsable del tratamiento es Daniil Kuradchik Pekarskaya, que opera como Qubelia, con domicilio en Calle Torrelodones 84B, 41016 Sevilla, España. Para cualquier cuestión relacionada con datos personales puedes escribir a {CONTACT.email}.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">2. Datos, finalidades y bases jurídicas</h2>
          <div className="mt-4 space-y-5 text-sm leading-relaxed text-[#3D4046]">
            <div>
              <h3 className="font-semibold text-[#101014]">Formulario de contacto y solicitudes</h3>
              <p className="mt-2">
                Tratamos nombre, email, teléfono, empresa y la información incluida en el mensaje para responder consultas y gestionar posibles relaciones precontractuales. La base jurídica es el consentimiento y, en su caso, la aplicación de medidas precontractuales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#101014]">Gestión de clientes y facturación</h3>
              <p className="mt-2">
                Tratamos datos identificativos, de contacto y de facturación necesarios para prestar el servicio, emitir facturas y cumplir obligaciones fiscales y contables. La base jurídica es la ejecución del contrato y el cumplimiento de obligaciones legales.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[#101014]">Analítica y mejora del sitio</h3>
              <p className="mt-2">
                Si se habilitan cookies o herramientas de analítica no esenciales, se usarán para medir el uso del sitio y mejorar su rendimiento solo con consentimiento previo del usuario.
              </p>
            </div>
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">3. Plazos de conservación</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[#3D4046]">
            <li>Consultas y solicitudes: mientras se tramitan y durante el plazo necesario para atender posibles responsabilidades.</li>
            <li>Datos de clientes y facturación: durante la relación contractual y los plazos legales exigibles.</li>
            <li>Analítica o marketing: hasta la retirada del consentimiento o la expiración del plazo configurado para la herramienta correspondiente.</li>
          </ul>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">4. Destinatarios y encargados</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Los datos solo se comunican a administraciones públicas, entidades financieras o proveedores necesarios para la prestación del servicio cuando exista base legal o contractual para ello. En esos casos, Qubelia formaliza los encargos de tratamiento exigidos por la normativa aplicable.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">5. Transferencias internacionales</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Si se utilizan proveedores ubicados fuera del Espacio Económico Europeo, se adoptarán las garantías adecuadas previstas por el RGPD, como cláusulas contractuales tipo o mecanismos equivalentes.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">6. Derechos de las personas interesadas</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación, portabilidad y retirada del consentimiento escribiendo a {CONTACT.email}. Si consideras que el tratamiento no es correcto, puedes presentar reclamación ante la Agencia Española de Protección de Datos.
          </p>
        </section>

        <section className={cardClass}>
          <h2 className="text-xl font-semibold tracking-tight text-[#101014]">7. Seguridad y actualizaciones</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#3D4046]">
            Qubelia aplica medidas técnicas y organizativas razonables para proteger la confidencialidad, integridad y disponibilidad de los datos personales. Esta política puede actualizarse si cambian la normativa o los tratamientos realizados.
          </p>
        </section>
      </div>
    </StaticPageFrame>
    </>
  );
}
