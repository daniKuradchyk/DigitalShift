"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { CONTACT } from "@/config/contact";

const nav = [
  { label: "Servicios",    href: "#servicios" },
  { label: "Metodología",  href: "#metodologia" },
  { label: "Resultados",   href: "#resultados" },
  { label: "Labs",         href: "/labs" },
  { label: "Blog",         href: "/blog" },
  { label: "FAQs",         href: "#faqs" },
];

const legal = [
  { label: "Aviso legal",  href: "/legal/aviso-legal" },
  { label: "Privacidad",   href: "/legal/privacidad" },
  { label: "Cookies",      href: "/legal/cookies" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/qubelia",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7.5 10.5V16" /><circle cx="7.5" cy="7.5" r="1" />
        <path d="M11 16v-3.2a2 2 0 0 1 4 0V16M11 10.5h4" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/qubelia.tech",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="relative overflow-hidden border-t border-slate-200/60 dark:border-white/[0.06] bg-slate-50 dark:bg-[#04080F]">
      {/* Top glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.35) 50%, transparent 90%)" }}
      />

      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div>
              <p className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">Qubelia España</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-500 leading-relaxed">
                Transformación digital y software a medida. MVPs en semanas, IA y automatización.
              </p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-50 dark:bg-sky-500/8 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">MVP en 8–10 semanas</span>
            </div>
            {/* Socials */}
            <div className="flex gap-2 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.label} de Qubelia`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800/60 text-slate-400 dark:text-slate-500 hover:border-sky-300 dark:hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400 bg-white dark:bg-white/[0.03] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer" className="space-y-2 text-sm">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-600 mb-4">Navegación</p>
            {nav.map(({ label, href }) =>
              href.startsWith("/") ? (
                <Link key={href} href={href} className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {label}
                </Link>
              ) : (
                <a key={href} href={href} className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  {label}
                </a>
              )
            )}
          </nav>

          {/* Contact */}
          <div className="text-sm space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-600 mb-4">Contacto</p>
            <p className="text-slate-500 dark:text-slate-500 leading-relaxed">
              Calle Torrelodones 84B<br />41016 Sevilla, España
            </p>
            <a href={`mailto:${CONTACT.email}`} className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors break-all">
              {CONTACT.email}
            </a>
            <a href="tel:+34674569372" className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
              +34 674 569 372
            </a>
            <p className="text-slate-400 dark:text-slate-600 text-xs pt-1">NIF: 30865688X</p>
          </div>

          {/* Legal */}
          <div className="text-sm space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-600 mb-4">Legal</p>
            {legal.map(({ label, href }) => (
              <Link key={href} href={href} className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={openPreferences}
              className="block text-slate-500 dark:text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-left"
            >
              Configurar cookies
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200/60 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 dark:text-slate-600">
          <p>© {new Date().getFullYear()} Qubelia España. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Hecho con <span className="text-red-400">❤</span> en Sevilla
          </p>
        </div>
      </Container>
    </footer>
  );
}
