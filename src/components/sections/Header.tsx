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
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
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
    <header className={`sticky top-0 z-40 border-b ${scrolled ? "bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-brand-100 shadow-sm" : "bg-white/60 backdrop-blur border-transparent"}`}>
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Inicio - Qubelia">
            <Logo />
          </Link>
          <nav aria-label="Principal" className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map(([label, href]) => {
              const linkClasses = "relative text-slate-700 hover:text-slate-900 py-1";
              const content = (
                <>
                  <span className="relative z-10">{label}</span>
                  <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-brand-600/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </>
              );

              return href.startsWith("/") ? (
                <Link key={href} href={href} className={linkClasses}>
                  {content}
                </Link>
              ) : (
                <a key={href} href={href} className={linkClasses}>
                  {content}
                </a>
              );
            })}
          </nav>
          <div className="hidden md:flex">
            <Button as="a" href="#contacto" variant="shine">Agenda diagnóstico gratis</Button>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2"
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
      {open && (
        <div className="md:hidden border-t border-brand-100" id={menuId}>
          <nav aria-label="Móvil" className="px-4 py-3 space-y-1">
            {navItems.map(([label, href]) => {
              const linkClasses = "block py-2 text-slate-700 hover:text-slate-900";
              return href.startsWith("/") ? (
                <Link key={href} className={linkClasses} href={href} onClick={() => setOpen(false)}>
                  {label}
                </Link>
              ) : (
                <a key={href} className={linkClasses} href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              );
            })}
            <Button as="a" href="#contacto" className="mt-2 inline-flex" onClick={() => setOpen(false)} variant="shine">
              Agenda diagnóstico gratis
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg className="h-6 w-6 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
