import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function LocalSeo() {
  return (
    <section aria-labelledby="seo-local-heading" className="py-16 sm:py-20">
      <Container className="space-y-4">
        <div className="max-w-3xl space-y-3">
          <h2 id="seo-local-heading" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Desarrollo de software a medida en Sevilla, trabajando para toda Espana</h2>
          <p className="text-slate-600 dark:text-slate-300">
            En Qubelia combinamos desarrollo de software a medida, diseno web para pymes y automatizacion de procesos con IA desde Sevilla. Construimos
            aplicaciones, integraciones y flujos que conectan tus herramientas y evitan errores operativos.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Podemos vernos en Sevilla cuando lo necesites y operamos en remoto con equipos de toda Espana. Respuesta rapida, documentacion clara y entregables
            que se miden en ahorro de tiempo y ventas.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-6 shadow-sm sm:flex sm:items-center sm:justify-between">
          <div className="space-y-1 text-slate-900 dark:text-white">
            <p className="text-lg font-semibold">Qubelia</p>
            <p className="text-slate-600 dark:text-slate-300">Calle Torrelodones 84B, 41016 Sevilla, Espana</p>
            <p className="text-slate-600 dark:text-slate-300">Telefono: 674 569 372</p>
            <p className="text-slate-600 dark:text-slate-300">Email: <a className="text-sky-600 dark:text-sky-400 hover:underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a></p>
          </div>
          <div className="mt-4 sm:mt-0 text-sm text-slate-500 dark:text-slate-400">
            <p>Consultoria tecnologica - Desarrollo de software a medida - Automatizacion con IA - Integraciones</p>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] p-6 shadow-sm">
          <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">Servicios locales</p>
          <p className="text-slate-600 dark:text-slate-300 mt-2">
            Si buscas <Link className="text-sky-600 dark:text-sky-400 underline decoration-sky-500 dark:decoration-sky-400 underline-offset-4 hover:no-underline" href="/sevilla/desarrollo-software-a-medida">desarrollo de software a medida en Sevilla</Link>,
            aqui tienes el detalle del servicio local con proceso, precios y FAQs.
          </p>
        </div>
      </Container>
    </section>
  );
}
