import Container from "@/components/common/Container";

export const revalidate = 86400;

export default function Privacidad() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Privacidad</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Política de privacidad</h1>
          <p className="text-slate-700">
            Esta Política de privacidad explica cómo tratamos los datos personales en qubelia.es conforme al RGPD y la LOPDGDD. Aquí encontrarás quién es el
            responsable, con qué fines usamos tus datos y cuáles son tus derechos.
          </p>
        </header>

        <div className="mt-8 grid gap-6">
          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">1. Identificación del responsable del tratamiento</h2>
            <p className="mt-3 text-slate-700">
              Responsable: Daniil Kuradchik Pekarskaya (Qubelia) - NIF/CIF: 30865688X. Domicilio: Calle torrelodones 84B, Sevilla, Sevilla 41016, España.
              Email de contacto en materia de privacidad: <a className="underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a>.
              Teléfono: <a className="underline" href="tel:+34674569372">674569372</a>. Delegado de Protección de Datos: no aplica. Sitio web: qubelia.es.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">2. Datos tratados, finalidades y bases jurídicas</h2>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Formulario de contacto / solicitud de presupuesto</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                <li>Datos: nombre, apellidos, email, teléfono, empresa, cargo, país y la información incluida en el mensaje.</li>
                <li>Finalidad: responder consultas, solicitudes de información y presupuestos, y gestionar la relación precontractual con potenciales clientes.</li>
                <li>Base jurídica: consentimiento del interesado y, en su caso, aplicación de medidas precontractuales (art. 6.1.a y 6.1.b RGPD).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Gestión de clientes y facturación</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                <li>Datos: datos identificativos y de contacto, datos de facturación y medios de pago, histórico de servicios.</li>
                <li>Finalidad: gestión administrativa, contable y fiscal de clientes, incluyendo facturación y atención al cliente.</li>
                <li>Base jurídica: ejecución de un contrato y cumplimiento de obligaciones legales (art. 6.1.b y 6.1.c RGPD).</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Analítica web</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                <li>Datos: identificadores en línea, dirección IP abreviada, datos de uso y navegación obtenidos mediante cookies o tecnologías similares.</li>
                <li>Finalidad: obtener estadísticas agregadas sobre el uso del sitio web para mejorar contenidos y servicios.</li>
                <li>
                  Base jurídica: consentimiento del usuario prestado a través del banner de cookies (art. 6.1.a RGPD). En caso de no prestar consentimiento, no se
                  realizará analítica.
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Comunicaciones comerciales por medios electrónicos</h3>
              <ul className="list-disc space-y-1 pl-5 text-slate-700">
                <li>Datos: nombre, email, teléfono y, en su caso, datos profesionales (empresa, cargo).</li>
                <li>Finalidad: envío de información comercial relacionada con los servicios de consultoría tecnológica, desarrollo de software, IA y automatización.</li>
                <li>Base jurídica: consentimiento del interesado (art. 6.1.a RGPD y art. 21 LSSI).</li>
              </ul>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">3. Plazos de conservación de los datos</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Datos de contacto y solicitudes: mientras se gestionan las consultas y hasta 2 años tras la última interacción para atender posibles
                responsabilidades.
              </li>
              <li>Datos de clientes y facturación: durante la relación contractual y los plazos legales aplicables (por ejemplo, 6 años a efectos contables y fiscales).</li>
              <li>
                Datos de analítica web: durante el periodo de retención configurado en la herramienta de analítica; en términos generales, se conservarán de forma
                agregada y anonimizada cuando sea posible.
              </li>
              <li>
                Datos para comunicaciones comerciales: hasta que el interesado retire el consentimiento o solicite la baja, y en todo caso mientras sea necesario
                para la finalidad indicada.
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">4. Destinatarios y encargados del tratamiento</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
              <li>Administraciones públicas y entidades financieras cuando proceda por obligación legal.</li>
              <li>Proveedor de hosting (Netlify) como encargado del tratamiento para la prestación de servicios de alojamiento y operaciones técnicas.</li>
              <li>Proveedor de analítica web: actualmente no aplica; en caso de activarse, actuará como encargado del tratamiento para ofrecer métricas agregadas.</li>
              <li>Otros proveedores necesarios para la prestación de servicios (por ejemplo, comunicaciones electrónicas), con quienes se firmarán contratos de encargo de tratamiento conforme al art. 28 RGPD.</li>
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">5. Transferencias internacionales de datos</h2>
            <p className="mt-3 text-slate-700">
              El uso de proveedores que presten servicios fuera del Espacio Económico Europeo puede implicar transferencias internacionales (por ejemplo,
              servicios de hosting o, si se activan, herramientas de analítica). En estos casos se adoptarán las garantías adecuadas exigidas por el RGPD, como
              la firma de Cláusulas Contractuales Tipo aprobadas por la Comisión Europea o mecanismos equivalentes, y se evaluarán las medidas complementarias
              necesarias para proteger la información.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">6. Derechos de las personas interesadas</h2>
            <p className="mt-3 text-slate-700">
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento, portabilidad y retirada del consentimiento
              enviando un email a <a className="underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a> o por escrito al domicilio
              indicado, acreditando tu identidad e indicando el derecho que deseas ejercer. Tienes derecho a presentar una reclamación ante la Agencia Española
              de Protección de Datos (www.aepd.es) si consideras que no se ha atendido correctamente tu solicitud.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">7. Seguridad de los datos personales</h2>
            <p className="mt-3 text-slate-700">
              Se aplican medidas técnicas y organizativas apropiadas para garantizar la confidencialidad, integridad, disponibilidad y resiliencia de los datos
              personales, ajustadas al estado de la técnica, la naturaleza de los datos y los riesgos identificados.
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold text-slate-900">8. Cambios en la política de privacidad</h2>
            <p className="mt-3 text-slate-700">
              Esta Política de privacidad puede actualizarse para adaptarla a cambios normativos o de tratamiento. Se publicará la versión vigente en
              qubelia.es. Te recomendamos revisarla de forma periódica.
            </p>
          </section>
        </div>
      </Container>
    </main>
  );
}
