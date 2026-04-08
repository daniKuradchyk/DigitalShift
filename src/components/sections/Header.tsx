"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
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

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-500/10 bg-[#060B1A]/90 shadow-[0_1px_0_rgba(65,105,225,0.06),0_16px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-14 sm:h-16 items-center justify-between gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2" aria-label="Inicio - Qubelia">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-0.5 sm:gap-1 text-sm md:flex">
            {navItems.map((item) => {
              const href = resolveHref(item, isHome);
              return (
                <Link
                  key={`${item.label}-${href}`}
                  href={href}
                  className="group relative rounded-lg px-2.5 sm:px-3 py-1.5 transition-all duration-200 hover:bg-blue-500/[0.06] hover:text-blue-300"
                  style={{ color: "var(--text-muted)" }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent transition-transform duration-300 group-hover:scale-x-100"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex">
            <Button as="a" href={isHome ? "#contacto" : "/#contacto"} variant="shine">
              Agendar diagnóstico
            </Button>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 transition-all hover:bg-blue-500/[0.06] hover:text-blue-300"
              style={{ color: "var(--text-muted)" }}
              aria-label="Abrir menú"
              aria-controls={menuId}
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
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-blue-500/10 bg-[#060B1A]/95 backdrop-blur-xl md:hidden overflow-hidden"
            id={menuId}
          >
            <nav aria-label="Móvil" className="space-y-0.5 px-4 py-3">
              {navItems.map((item, i) => {
                const href = resolveHref(item, isHome);
                return (
                  <motion.div
                    key={`${item.label}-${href}-mobile`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-blue-500/[0.06] hover:text-blue-300"
                      style={{ color: "var(--text-muted)" }}
                      href={href}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="pb-1 pt-3">
                <Button as="a" href={isHome ? "#contacto" : "/#contacto"} variant="shine" className="w-full">
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
