"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import { useCookieConsent } from "@/components/cookies/CookieConsentProvider";
import { CONTACT } from "@/config/contact";
import { getServices } from "@/content/services";
import { AREAS } from "@/lib/locations";
import { trackContactChannelClick } from "@/lib/gtm";

const legal = [
  { label: "Aviso legal", href: "/legal/aviso-legal" },
  { label: "Privacidad", href: "/legal/privacidad" },
  { label: "Cookies", href: "/legal/cookies" },
];

const columnTitle =
  "mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/45";
const columnLink =
  "block text-sm text-white/70 transition-colors duration-150 hover:text-white";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openPreferences } = useCookieConsent();
  const services = getServices();

  return (
    <footer className="band-dark">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <p className="text-lg font-semibold tracking-tight text-white">Qubelia</p>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Arquitectura, desarrollo y criterio técnico para empresas B2B que
              necesitan sistemas útiles, mantenibles y bien planteados.
            </p>
            <p className="text-sm text-white/60">Sevilla · España</p>
          </div>

          <nav aria-label="Servicios en footer" className="space-y-2.5">
            <p className={columnTitle}>Servicios</p>
            {services.map((service) => (
              <Link key={service.slug} href={service.href} className={columnLink}>
                {service.shortTitle}
              </Link>
            ))}
            <Link href="/servicios" className={`${columnLink} pt-1`}>
              Ver todos los servicios
            </Link>
          </nav>

          <nav aria-label="Navegación en footer" className="space-y-2.5">
            <p className={columnTitle}>Recursos</p>
            <Link href="/casos" className={columnLink}>Casos de éxito</Link>
            <Link href="/blog" className={columnLink}>Blog</Link>
            <Link href="/labs" className={columnLink}>Herramientas gratuitas</Link>
            <Link href="/labs/analisis-gratis" className={columnLink}>Análisis gratuito</Link>
            <Link href="/labs/roi-automatizacion" className={columnLink}>Calculadora ROI</Link>
            <Link href="/labs/calculadora-coste-software" className={columnLink}>Calculadora coste software</Link>
            <Link href="/herramientas/calculadora-irpf" className={columnLink}>Calculadora IRPF</Link>
            <Link href="/buscar" className={columnLink}>Buscar</Link>
            <Link href={isHome ? "#faq" : "/#faq"} className={columnLink}>FAQ</Link>
          </nav>

          <nav aria-label="Dónde trabajamos" className="space-y-2.5">
            <p className={columnTitle}>Dónde trabajamos</p>
            {AREAS.slice(0, 6).map((area) => (
              <Link key={area.slug} href={`/area/${area.slug}`} className={columnLink}>
                {area.name}
              </Link>
            ))}
            <Link href="/area" className={`${columnLink} pt-1`}>
              Todas las zonas
            </Link>
          </nav>

          <div className="space-y-2.5">
            <p className={columnTitle}>Contacto</p>
            <p className="text-sm leading-relaxed text-white/70">
              Calle Torrelodones 84B
              <br />
              41016 Sevilla, España
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              onClick={() =>
                trackContactChannelClick({
                  channel: "email",
                  href: `mailto:${CONTACT.email}`,
                  placement: "footer",
                  pagePath: pathname,
                })
              }
              className={`${columnLink} break-all`}
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.phoneHref}
              onClick={() =>
                trackContactChannelClick({
                  channel: "phone",
                  href: CONTACT.phoneHref,
                  placement: "footer",
                  pagePath: pathname,
                })
              }
              className={columnLink}
            >
              {CONTACT.phone}
            </a>
            <div className="space-y-2.5 pt-3">
              {legal.map((item) => (
                <Link key={item.href} href={item.href} className={columnLink}>
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openPreferences}
                className={`${columnLink} text-left`}
              >
                Configurar cookies
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45">
          <p>© {new Date().getFullYear()} Qubelia. Todos los derechos reservados.</p>
          <p>NIF: 30865688X</p>
        </div>
      </Container>
    </footer>
  );
}
