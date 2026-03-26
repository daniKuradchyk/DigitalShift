"use client";
import React, { useId, useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems: Array<[string, string]> = [
    ["Servicios", "#servicios"],
    ["Metodología", "#metodologia"],
    ["Resultados", "#resultados"],
    ["Labs", "/labs"],
    ["Blog", "/blog"],
    ["FAQs", "#faqs"],
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-200/60 dark:border-sky-500/10 shadow-[0_1px_16px_rgba(0,0,40,0.06)] dark:shadow-[0_1px_0_rgba(56,189,248,0.06),0_16px_40px_-16px_rgba(0,0,0,0.7)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Inicio - Qubelia">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Principal" className="hidden md:flex items-center gap-1 text-sm">
            {navItems.map(([label, href]) => {
              const cls =
                "relative px-3 py-1.5 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 rounded-lg hover:bg-sky-500/5 transition-all duration-200 group";
              const content = (
                <>
                  <span className="relative z-10">{label}</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"
                  />
                </>
              );

              return href.startsWith("/") ? (
                <Link key={href} href={href} className={cls}>
                  {content}
                </Link>
              ) : (
                <a key={href} href={href} className={cls}>
                  {content}
                </a>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button as="a" href="/#contacto" variant="shine">
              Agenda diagnóstico gratis
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-500/5 transition-all"
              aria-label="Abrir menú"
              aria-controls={menuId}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Hamburger open={open} />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t border-slate-200/60 dark:border-sky-500/10 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl"
          id={menuId}
        >
          <nav aria-label="Móvil" className="px-4 py-3 space-y-0.5">
            {navItems.map(([label, href]) => {
              const cls =
                "block py-2.5 px-3 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-300 hover:bg-sky-500/5 rounded-lg transition-all text-sm font-medium";
              return href.startsWith("/") ? (
                <Link key={href} className={cls} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ) : (
                <a key={href} className={cls} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              );
            })}
            <div className="pt-3 pb-1">
              <Button
                as="a"
                href="/#contacto"
                variant="shine"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Agenda diagnóstico gratis
              </Button>
            </div>
          </nav>
        </div>
      )}
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
