import React from "react";
import Container from "@/components/common/Container";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <Container className="py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-semibold">DigitalShift</h3>
          <p className="mt-2 text-sm text-slate-700">Resultados web medibles, sin humo ni sorpresas.</p>
        </div>
        <nav aria-label="Footer" className="grid gap-2 text-sm">
          <a href="#servicios" className="text-slate-700 hover:text-slate-900">Servicios</a>
          <a href="#metodologia" className="text-slate-700 hover:text-slate-900">Metodología</a>
          <a href="#resultados" className="text-slate-700 hover:text-slate-900">Resultados</a>
          <a href="#faqs" className="text-slate-700 hover:text-slate-900">FAQs</a>
        </nav>
        <div className="text-sm text-slate-700">
          <p><strong>Contacto</strong></p>
          <p className="mt-1">TODO: dirección</p>
          <p>TODO: email</p>
          <p>TODO: teléfono</p>
        </div>
        <div className="text-sm text-slate-700">
          <p><a className="hover:text-slate-900" href="#">Aviso legal</a> · <a className="hover:text-slate-900" href="#">Privacidad</a> · <a className="hover:text-slate-900" href="#">Cookies</a></p>
          <p className="mt-2">© {new Date().getFullYear()} DigitalShift. Todos los derechos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}