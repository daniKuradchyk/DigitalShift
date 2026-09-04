"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/common/Logo";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

type NavItem = {
  label: string;
  homeHref?: string;
  innerHref?: string;
  href?: string;
};

const navItems: NavItem[] = [
  { label: "Servicios", homeHref: "#servicios", innerHref: "/servicios" },
  { label: "Método", homeHref: "#metodologia", innerHref: "/servicios#metodologia" },
  { label: "Casos", homeHref: "#resultados", innerHref: "/casos" },
  { label: "Blog", href: "/blog" },
  { label: "Labs", href: "/labs" },
  { label: "FAQ", homeHref: "#faq", innerHref: "/#faq" },
];

function resolveHref(item: NavItem, isHome: boolean) {
  if (item.href) return item.href;
  return isHome ? item.homeHref! : item.innerHref!;
}

/* Id fijo en lugar de useId(): sólo hay una cabecera por página y el contador
   de useId se desincroniza entre servidor y cliente en las rutas dinámicas
   (p. ej. /buscar), dejando aria-controls apuntando a un id inexistente. */
const MENU_ID = "menu-principal-movil";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
        scrolled ? "border-b border-[#E4E6EA] shadow-[0_1px_2px_rgba(16,16,20,0.04)]" : "border-b border-[#E4E6EA]"
      }`}
    >
      <Container>
        <div className="flex h-16 sm:h-[72px] items-center justify-between gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Inicio - Qubelia">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 text-[15px] md:flex">
            {navItems.map((item) => {
              const href = resolveHref(item, isHome);
              return (
                <Link
                  key={`${item.label}-${href}`}
                  href={href}
                  className="group relative px-3 py-2 font-medium text-[#3D4046] transition-colors duration-150 hover:text-[#101014]"
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-600 transition-transform duration-200 group-hover:scale-x-100"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <Button as="a" href={isHome ? "#contacto" : "/#contacto"} variant="primary">
              Agendar diagnóstico
            </Button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-[#3D4046] transition-colors hover:text-[#101014]"
              aria-label="Abrir menú"
              aria-controls={MENU_ID}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#E4E6EA] bg-white md:hidden"
            id={MENU_ID}
          >
            <nav aria-label="Móvil" className="space-y-0.5 px-4 py-3">
              {navItems.map((item) => {
                const href = resolveHref(item, isHome);
                return (
                  <Link
                    key={`${item.label}-${href}-mobile`}
                    className="block px-3 py-2.5 text-[15px] font-medium text-[#3D4046] transition-colors hover:text-[#101014]"
                    href={href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="pb-1 pt-3">
                <Button as="a" href={isHome ? "#contacto" : "/#contacto"} variant="primary" className="w-full">
                  Agendar diagnóstico
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </>
      )}
    </svg>
  );
}
