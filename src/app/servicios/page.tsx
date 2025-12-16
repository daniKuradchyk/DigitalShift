import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { canonical, titleTemplate } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Servicios"),
  description: "Servicios de Qubelia: transformacion digital, software a medida, IA y automatizacion, MVP y data.",
  alternates: { canonical: canonical("/servicios") },
  robots: { index: true, follow: true },
  openGraph: {
    title: titleTemplate("Servicios"),
    description: "Servicios de Qubelia: transformacion digital, software a medida, IA y automatizacion, MVP y data.",
    url: canonical("/servicios"),
    images: [{ url: canonical("/images/og-cover.png"), width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate("Servicios"),
    description: "Servicios de Qubelia: transformacion digital, software a medida, IA y automatizacion, MVP y data.",
    images: [canonical("/images/og-cover.png")],
  },
};

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
