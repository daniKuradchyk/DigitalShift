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
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-white/88 backdrop-blur-sm dark:border-white/[0.06] dark:bg-[#04080F]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.35) 50%, transparent 90%)" }}
      />

      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <div>
              <p className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">Qubelia</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-500">
                Arquitectura, desarrollo y criterio técnico para empresas B2B que necesitan sistemas útiles,
                mantenibles y bien planteados.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-50 px-3 py-1 text-sky-700 dark:bg-sky-500/8 dark:text-sky-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">Sevilla · España</span>
            </div>
          </div>

          <nav aria-label="Servicios en footer" className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
              Servicios
            </p>
            {services.map((service) => (
              <Link
                key={service.slug}
                href={service.href}
                className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
              >
                {service.shortTitle}
              </Link>
            ))}
            <Link
              href="/servicios"
              className="block pt-2 text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
            >
              Ver hub de servicios
            </Link>
          </nav>

          <nav aria-label="Navegación en footer" className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
              Navegación
            </p>
            <Link href={isHome ? "#resultados" : "/#resultados"} className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400">
              Casos y resultados
            </Link>
            <Link href="/blog" className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400">
              Blog
            </Link>
            <Link href="/labs" className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400">
              Labs
            </Link>
            <Link href={isHome ? "#faq" : "/servicios#faq"} className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400">
              FAQ
            </Link>
          </nav>

          <div className="space-y-2 text-sm">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
              Contacto
            </p>
            <p className="leading-relaxed text-slate-600 dark:text-slate-500">
              Calle Torrelodones 84B
              <br />
              41016 Sevilla, España
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="block break-all text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
            >
              {CONTACT.phone}
            </a>
            <div className="pt-3 text-sm">
              {legal.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openPreferences}
                className="block text-left text-slate-600 transition-colors hover:text-sky-700 dark:text-slate-500 dark:hover:text-sky-400"
              >
                Configurar cookies
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-xs text-slate-500 dark:border-white/[0.06] dark:text-slate-600">
          <p>© {new Date().getFullYear()} Qubelia. Todos los derechos reservados.</p>
          <p>NIF: 30865688X</p>
        </div>
      </Container>
    </footer>
  );
}
