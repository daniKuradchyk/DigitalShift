"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { CONTACT } from "@/config/contact";
import { getServices } from "@/content/services";

const legal = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openPreferences } = useCookieConsent();
  const services = getServices();

  return (
    <footer className="relative overflow-hidden border-t border-blue-500/8 bg-[#060B1A]/95 backdrop-blur-sm">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(65,105,225,0.30) 50%, transparent 90%)" }} />

      <Container className="py-8 sm:py-10 lg:py-14">
        <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div>
              <p className="text-base font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Qubelia</p>
              <p className="mt-1.5 sm:mt-2 max-w-sm text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Arquitectura, desarrollo y criterio técnico para empresas B2B que necesitan sistemas útiles,
                mantenibles y bien planteados.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/15 bg-blue-500/[0.06] px-2.5 sm:px-3 py-0.5 sm:py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden />
              <span className="text-[10px] sm:text-[11px] font-semibold text-blue-400">Sevilla · España</span>
            </div>
          </div>

          <nav aria-label="Servicios en footer" className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <p className="mb-2 sm:mb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(91,141,239,0.5)" }}>Servicios</p>
            {services.map((service) => (
              <Link key={service.slug} href={service.href} className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>
                {service.shortTitle}
              </Link>
            ))}
            <Link href="/servicios" className="block pt-1 sm:pt-2 transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>
              Ver hub de servicios
            </Link>
          </nav>

          <nav aria-label="Navegación en footer" className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <p className="mb-2 sm:mb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(91,141,239,0.5)" }}>Recursos</p>
            <Link href="/casos" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Casos de exito</Link>
            <Link href="/blog" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Blog</Link>
            <Link href="/labs" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Herramientas gratuitas</Link>
            <Link href="/labs/roi-automatizacion" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Calculadora ROI</Link>
            <Link href="/labs/calculadora-coste-software" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Calculadora coste software</Link>
            <Link href="/herramientas/calculadora-irpf" className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Calculadora IRPF</Link>
            <Link href={isHome ? "#faq" : "/#faq"} className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>FAQ</Link>
          </nav>

          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <p className="mb-2 sm:mb-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(91,141,239,0.5)" }}>Contacto</p>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>Calle Torrelodones 84B<br />41016 Sevilla, España</p>
            <a href={`mailto:${CONTACT.email}`} className="block break-all transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref} className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>{CONTACT.phone}</a>
            <div className="pt-2 sm:pt-3 text-xs sm:text-sm">
              {legal.map((item) => (
                <Link key={item.href} href={item.href} className="block transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>{item.label}</Link>
              ))}
              <button type="button" onClick={openPreferences} className="block text-left transition-colors hover:text-blue-300" style={{ color: "var(--text-muted)" }}>Configurar cookies</button>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-t border-blue-500/8 pt-4 sm:pt-6 text-[10px] sm:text-xs" style={{ color: "var(--text-muted)" }}>
          <p>© {new Date().getFullYear()} Qubelia. Todos los derechos reservados.</p>
          <p>NIF: 30865688X</p>
        </div>
      </Container>
    </footer>
  );
}
