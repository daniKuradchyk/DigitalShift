import React from "react";
import Container from "@/components/common/Container";

export default function LocalSeo() {
  return (
    <section aria-labelledby="seo-local-heading" className="py-16 sm:py-20">
      <Container className="space-y-4">
        <div className="max-w-3xl space-y-3">
          <h2 id="seo-local-heading" className="text-3xl font-bold tracking-tight">Desarrollo de software a medida en Sevilla, trabajando para toda Espana</h2>
          <p className="text-slate-700">
            En Qubelia combinamos desarrollo de software a medida, diseno web para pymes y automatizacion de procesos con IA desde Sevilla. Construimos
            aplicaciones, integraciones y flujos que conectan tus herramientas y evitan errores operativos.
          </p>
          <p className="text-slate-700">
            Podemos vernos en Sevilla cuando lo necesites y operamos en remoto con equipos de toda Espana. Respuesta rapida, documentacion clara y entregables
            que se miden en ahorro de tiempo y ventas.
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
        <div className="rounded-2xl border border-brand-200 bg-white/90 p-6 shadow-card">
          <p className="text-sm font-semibold text-brand-700">Servicios locales</p>
          <p className="text-slate-700 mt-2">
            Si buscas <a className="underline decoration-brand-500 underline-offset-4" href="/sevilla/desarrollo-software-a-medida">desarrollo de software a medida en Sevilla</a>,
            aqui tienes el detalle del servicio local con proceso, precios y FAQs.
          </p>
        </div>
      </Container>
    </section>
  );
}
