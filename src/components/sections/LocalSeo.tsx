import React from "react";
import Container from "@/components/common/Container";

export default function LocalSeo() {
  return (
    <section aria-labelledby="seo-local-heading" className="py-16 sm:py-20">
      <Container className="space-y-4">
        <div className="max-w-3xl space-y-3">
          <h2 id="seo-local-heading" className="text-3xl font-bold tracking-tight">Consultoria tecnologica y desarrollo de software en Sevilla</h2>
          <p className="text-slate-700">
            En Qubelia ayudamos a pymes y emprendedores de Sevilla y del resto de Espana a disenar, desarrollar y lanzar soluciones digitales a medida:
            aplicaciones web, automatizacion de procesos con IA e integraciones con tus herramientas internas para que los datos fluyan sin friccion.
          </p>
          <p className="text-slate-700">
            Si necesitas un equipo cercano, que hable tu idioma de negocio y entregue resultados medibles, estamos en Sevilla y trabajamos en remoto con clientes
            de cualquier punto de Espana.
          </p>
        </div>
        <div className="rounded-2xl border border-brand-100 bg-white/80 p-6 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1 text-slate-800">
            <p className="text-lg font-semibold">Qubelia</p>
            <p>Calle Torrelodones 84B, 41016 Sevilla, Espana</p>
            <p>Telefono: 674 569 372</p>
            <p>Email: <a className="underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a></p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-slate-600">
            <p>Consultoria tecnologica - Desarrollo de software a medida - Automatizacion con IA - Integraciones</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
