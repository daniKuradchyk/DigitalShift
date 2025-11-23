import Link from "next/link";
import Container from "@/components/common/Container";

export default function ServicesIndex() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Servicios</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">
          Soluciones enfocadas a impacto: de la auditoría de procesos al software a medida y la automatización con IA.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          <li><Link className="underline hover:no-underline" href="/servicios/transformacion-digital">Transformación digital</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/desarrollo-medida">Desarrollo a medida</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/mvp-emprendedores">MVP para emprendedores</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/ia-automatizacion">IA y automatización</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/integraciones-datos">Integraciones y Data</Link></li>
        </ul>
      </Container>
    </main>
  );
}
