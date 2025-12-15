import Container from "@/components/common/Container";

export const revalidate = 86400;

export default function Cookies() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Política de cookies</h1>
        <div className="prose prose-slate mt-6">
          <p>Este sitio puede usar cookies técnicas necesarias para su funcionamiento y, en su caso, analíticas (GA4) para estadísticas anónimas.</p>
          <p>Podrás aceptar o rechazar las cookies no esenciales mediante el banner de consentimiento cuando esté habilitado.</p>
          <p>Más información o retirada del consentimiento: <a className="underline" href="mailto:social.networks.qubelia@gmail.com">social.networks.qubelia@gmail.com</a>.</p>
        </div>
      </Container>
    </main>
  );
}
