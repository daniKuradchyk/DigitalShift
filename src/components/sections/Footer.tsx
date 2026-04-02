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
    <footer className="relative overflow-hidden border-t border-violet-500/8 bg-[#08090E]/95 backdrop-blur-sm">
      {/* Top gradient rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(167,139,250,0.30) 50%, transparent 90%)" }}
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div>
              <p className="text-base font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Qubelia</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Arquitectura, desarrollo y criterio técnico para empresas B2B que necesitan sistemas útiles,
                mantenibles y bien planteados.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/15 bg-violet-500/[0.06] px-3 py-1 text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden />
              <span className="text-[11px] font-semibold text-violet-400">Sevilla · España</span>
            </div>
          </div>

          <nav aria-label="Servicios en footer" className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/60">
              Servicios
            </p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="block transition-colors hover:text-violet-300"
                style={{ color: "var(--text-muted)" }}
              >
                {service.shortTitle}
              </Link>
            ))}
            <Link
              href="/servicios"
              className="block pt-2 transition-colors hover:text-violet-300"
              style={{ color: "var(--text-muted)" }}
            >
              Ver hub de servicios
            </Link>
          </nav>

          <nav aria-label="Navegación en footer" className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/60">
              Navegación
            </p>
            <Link href={isHome ? "#resultados" : "/#resultados"} className="block transition-colors hover:text-violet-300" style={{ color: "var(--text-muted)" }}>
              Casos y resultados
            </Link>
            <Link href="/blog" className="block transition-colors hover:text-violet-300" style={{ color: "var(--text-muted)" }}>
              Blog
            </Link>
            <Link href="/labs" className="block transition-colors hover:text-violet-300" style={{ color: "var(--text-muted)" }}>
              Labs
            </Link>
            <Link href={isHome ? "#faq" : "/#faq"} className="block transition-colors hover:text-violet-300" style={{ color: "var(--text-muted)" }}>
              FAQ
            </Link>
          </nav>

          <div className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/60">
              Contacto
            </p>
            <p className="leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Calle Torrelodones 84B
              <br />
              41016 Sevilla, España
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block break-all transition-colors hover:text-violet-300"
              style={{ color: "var(--text-muted)" }}
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="block transition-colors hover:text-violet-300"
              style={{ color: "var(--text-muted)" }}
            >
              {CONTACT.phone}
            </a>
            <div className="pt-3 text-sm">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block transition-colors hover:text-violet-300"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openPreferences}
                className="block text-left transition-colors hover:text-violet-300"
                style={{ color: "var(--text-muted)" }}
              >
                Configurar cookies
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-violet-500/8 pt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          <p>© {new Date().getFullYear()} Qubelia. Todos los derechos reservados.</p>
          <p>NIF: 30865688X</p>
        </div>
      </Container>
    </footer>
  );
}
