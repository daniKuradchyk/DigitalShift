import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { BASE_URL, SITE_NAME, openGraphImage } from "@/lib/seo";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Página no encontrada | Qubelia",
  description:
    "La página que buscas no existe o ha sido movida. Encuentra software a medida, web profesional, automatización y CRM para empresas B2B en España.",
  robots: { index: false, follow: true },
  openGraph: {
    title: "Página no encontrada | Qubelia",
    description:
      "La página que buscas no existe o ha sido movida. Explora nuestros servicios de software a medida para empresas B2B.",
    url: `${BASE_URL}/404`,
    siteName: SITE_NAME,
    images: openGraphImage(),
    locale: "es_ES",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-white">
        <Container className="py-20 sm:py-28">
          <div className="max-w-3xl">
            <p
              className="select-none text-[6rem] font-semibold leading-none tracking-tight tabular-nums text-[#101014] sm:text-[9rem]"
              aria-hidden
            >
              404
            </p>

            <div className="mt-10 border-t border-[#E4E6EA] pt-10">
              <h1 className="text-h2">Página no encontrada</h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#3D4046]">
                La URL que has introducido no existe, ha sido movida o eliminada.
                Puedes volver al inicio o explorar nuestros servicios.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button as="a" href="/" variant="primary">
                  Volver al inicio
                </Button>
                <Button as="a" href="/servicios" variant="ghost">
                  Ver servicios
                </Button>
              </div>
            </div>

            <nav aria-label="Enlaces útiles" className="mt-14 border-t border-[#E4E6EA] pt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">
                También te puede interesar
              </p>
              <ul className="mt-5 divide-y divide-[#E4E6EA] border-t border-[#E4E6EA] sm:grid sm:grid-cols-2 sm:gap-x-10 sm:divide-y-0 sm:border-t-0">
                {[
                  { label: "Software a medida", href: "/servicios/software-a-medida" },
                  { label: "Web a medida", href: "/servicios/web-a-medida" },
                  { label: "Automatización", href: "/servicios/automatizacion-integraciones" },
                  { label: "Blog", href: "/blog" },
                  { label: "Labs", href: "/labs" },
                  { label: "Contacto", href: "/#contacto" },
                ].map((link) => (
                  <li key={link.href} className="sm:border-b sm:border-[#E4E6EA]">
                    <Link
                      href={link.href}
                      className="block py-3 text-[15px] text-[#3D4046] transition-colors hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
