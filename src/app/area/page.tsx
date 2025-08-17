import Link from "next/link";
import Container from "@/components/common/Container";
import { AREAS } from "@/lib/locations";

export default function AreasIndex() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Áreas de servicio</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">Trabajamos desde Sevilla para proyectos en toda España. Descubre el enfoque local en tu ciudad.</p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {AREAS.map((a) => (
            <li key={a.slug}><Link className="underline hover:no-underline" href={`/area/${a.slug}`}>{a.name}</Link></li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
