import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Pagina no encontrada | Qubelia",
  description:
    "La pagina que buscas no existe o ha sido movida. Encuentra software a medida, web a medida y automatizacion para empresas B2B.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="min-h-[60vh] flex items-center">
        <Container className="py-20 text-center">
          <p
            className="text-8xl sm:text-9xl font-black tabular-nums tracking-tight select-none"
            style={{ color: "var(--blue-500)", opacity: 0.15 }}
            aria-hidden
          >
            404
          </p>

          <h1
            className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Pagina no encontrada
          </h1>

          <p
            className="mt-4 max-w-md mx-auto text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            La URL que has introducido no existe, ha sido movida o eliminada.
            Puedes volver al inicio o explorar nuestros servicios.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button as="a" href="/" variant="shine">
              Volver al inicio
            </Button>
            <Button as="a" href="/servicios" variant="ghost">
              Ver servicios
            </Button>
          </div>

          <nav aria-label="Enlaces utiles" className="mt-12">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              Tambien te puede interesar
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
              {[
                { label: "Software a medida", href: "/servicios/software-a-medida" },
                { label: "Web a medida", href: "/servicios/web-a-medida" },
                { label: "Automatizacion", href: "/servicios/automatizacion-integraciones" },
                { label: "Blog", href: "/blog" },
                { label: "Labs", href: "/labs" },
                { label: "Contacto", href: "/#contacto" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-blue-300"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
      <Footer />
    </>
  );
}
