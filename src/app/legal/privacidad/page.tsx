import Container from "@/components/common/Container";

export const revalidate = 86400;

export default function Privacidad() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Política de privacidad</h1>
        <div className="prose prose-slate mt-6">
          <p><strong>Responsable:</strong> Qubelia España (Sevilla, España).</p>
          <p><strong>Contacto:</strong> <a className="underline" href="mailto:social.networks.qubelia@gmail.com">social.networks.qubelia@gmail.com</a>.</p>
          <p><strong>Finalidad:</strong> Atender solicitudes enviadas a través del formulario de contacto.</p>
          <p><strong>Legitimación:</strong> Consentimiento del interesado.</p>
          <p><strong>Conservación:</strong> Durante el tiempo necesario para atender la solicitud y obligaciones legales.</p>
          <p><strong>Destinatarios:</strong> No se ceden datos a terceros salvo obligación legal o proveedores estrictamente necesarios (alojamiento, email).</p>
          <p><strong>Derechos:</strong> Acceso, rectificación, supresión, oposición, limitación y portabilidad mediante solicitud a la dirección de contacto.</p>
        </div>
      </Container>
    </main>
  );
}
