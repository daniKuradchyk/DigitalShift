import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import { postsMeta } from "@/lib/posts";
import { titleTemplate, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: titleTemplate("Blog de DigitalShift"),
  description: "Guías prácticas sobre diseño web, landing pages, SEO y conversión.",
  alternates: { canonical: canonical("/blog") },
};

export default function BlogIndex() {
  return (
    <main className="py-12 sm:py-16">
      <Container>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Blog de DigitalShift</h1>
        <p className="mt-3 text-slate-700 max-w-2xl">Guías sin humo para mejorar tu presencia digital y captar clientes.</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {postsMeta.map((p) => (
            <li key={p.slug} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold">
                <Link className="hover:underline" href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p className="mt-2 text-slate-700">{p.description}</p>
              <p className="mt-3 text-sm text-slate-500">{new Date(p.date).toLocaleDateString("es-ES")}</p>
            </li>
          ))}
        </ul>
      </Container>
    </main>
  );
}
