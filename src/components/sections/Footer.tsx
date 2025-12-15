import React from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-white">
      <Container className="py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-semibold">Qubelia España</h3>
          <p className="mt-2 text-sm text-slate-700">Transformación digital y software a medida. MVPs en semanas.</p>
        </div>
        <nav aria-label="Footer" className="grid gap-2 text-sm">
          <a href="#servicios" className="text-slate-700 hover:text-slate-900">Servicios</a>
          <a href="#metodologia" className="text-slate-700 hover:text-slate-900">Metodología</a>
          <a href="#resultados" className="text-slate-700 hover:text-slate-900">Resultados</a>
          <Link href="/labs" className="text-slate-700 hover:text-slate-900">Labs</Link>
          <Link href="/blog" className="text-slate-700 hover:text-slate-900">Blog</Link>
          <a href="#faqs" className="text-slate-700 hover:text-slate-900">FAQs</a>
        </nav>
        <div className="text-sm text-slate-700">
          <p><strong>Contacto</strong></p>
          <p className="mt-1">Sevilla, España</p>
          <p>
            <a className="hover:text-slate-900" href="mailto:social.networks.qubelia@gmail.com">
              social.networks.qubelia@gmail.com
            </a>
          </p>
          <p>
            <a className="hover:text-slate-900" href="tel:+34674569372">
              +34 674 569 372
            </a>
          </p>
          <p>NIF: -</p>
        </div>
        <div className="text-sm text-slate-700">
          <p>
            <Link className="hover:text-slate-900" href="/legal/aviso-legal">Aviso legal</Link> ·{" "}
            <Link className="hover:text-slate-900" href="/legal/privacidad">Privacidad</Link> ·{" "}
            <Link className="hover:text-slate-900" href="/legal/cookies">Cookies</Link>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Qubelia España. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
