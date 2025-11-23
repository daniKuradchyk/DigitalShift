import Container from "@/components/common/Container";

export const revalidate = 86400;

export default function AvisoLegal() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Aviso legal</h1>
        <p className="mt-3 text-slate-700">
          Qubelia España · Sevilla, España · <a className="underline" href="mailto:xbydani99x@gmail.com">xbydani99x@gmail.com</a> ·
          <a className="underline ml-1" href="tel:+34674569372">+34 674 569 372</a>
        </p>
        <div className="prose prose-slate mt-6">
          <p>Este sitio web tiene por objeto informar sobre servicios de consultoría tecnológica y desarrollo de software a medida.</p>
          <p>Los contenidos son informativos y pueden cambiar sin previo aviso. Qubelia España no asume responsabilidad por el uso de la información aquí contenida.</p>
          <p>Quedan reservados todos los derechos de propiedad intelectual.</p>
        </div>
      </Container>
    </main>
  );
}
