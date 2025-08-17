"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import Reveal from "@/components/common/Reveal";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/10 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-900/10 to-transparent" />
      </div>

      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <h1 id="hero-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">Resultados web medibles</span>
                <span className="block text-slate-700">sin humo ni sorpresas.</span>
              </h1>
              <p className="mt-4 text-lg text-slate-700">Diseño, copy y SEO para convertir visitas en clientes.</p>
              <ul className="mt-6 space-y-3" aria-label="Beneficios clave">
                <li className="flex items-start gap-3"><span aria-hidden className="mt-1 h-5 w-5 text-emerald-600">✓</span><span className="text-slate-700">Más leads cualificados con arquitectura, copy y pruebas sociales.</span></li>
                <li className="flex items-start gap-3"><span aria-hidden className="mt-1 h-5 w-5 text-emerald-600">✓</span><span className="text-slate-700">Menos fricción y más velocidad con procesos por hitos.</span></li>
                <li className="flex items-start gap-3"><span aria-hidden className="mt-1 h-5 w-5 text-emerald-600">✓</span><span className="text-slate-700">Autonomía total: código y cuentas a tu nombre.</span></li>
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <Button as="a" href="#contacto" variant="shine" size="lg">Solicitar propuesta</Button>
                <Button as="a" variant="ghost" href="#metodologia" size="lg">Ver metodología</Button>
                <p className="text-sm text-slate-600 sm:ml-2">Respuesta en 24 h laborables · Sin compromiso</p>
              </div>

              {/* Métricas/Pruebas sociales — placeholders */}
              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                {[
                  { k: "Proyectos", v: "+TODO" },
                  { k: "Sectores", v: "TODO" },
                  { k: "Satisfacción", v: "TODO%" },
                ].map((m) => (
                  <div key={m.k} className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur p-3 text-center shadow-card">
                    <div className="text-xl font-bold text-slate-900">{m.v}</div>
                    <div className="text-xs text-slate-600">{m.k}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-500/20 via-emerald-400/10 to-transparent blur-2xl" aria-hidden />
              <div className="relative rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-2 shadow-card">
                <Image
                  src="/images/hero-illustration.png" // TODO: añade imagen real
                  alt="Soluciones de digitalización que convierten"
                  width={1200}
                  height={900}
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}