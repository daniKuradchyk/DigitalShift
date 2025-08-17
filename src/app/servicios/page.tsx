import Link from "next/link";
import Container from "@/components/common/Container";

export default function ServicesIndex() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Servicios</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">Soluciones ajustadas a tus objetivos. Elige el servicio para ver detalles y casos.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          <li><Link className="underline hover:no-underline" href="/servicios/landing-pages">Landing pages</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/web-corporativa">Web corporativa</Link></li>
          <li><Link className="underline hover:no-underline" href="/servicios/marketing-digital">Marketing digital</Link></li>
        </ul>
      </Container>
    </main>
  );
}