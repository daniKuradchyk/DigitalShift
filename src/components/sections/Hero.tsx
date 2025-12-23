import React from "react";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

const CheckIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="mt-0.5 h-4 w-4 flex-none text-brand-500"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5 10 17 19 8" />
  </svg>
);

export default function Hero() {
  const bullets = [
    "MVP en 8-10 semanas con metricas desde el primer dia",
    "Integraciones ERP/CRM y automatizacion con IA para quitar tareas manuales",
    "Diseno web para pymes orientado a conversion y captacion de leads",
    "Gobierno tecnico y soporte para que el equipo no se detenga",
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-brand-500/18 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-brand-300/20 blur-3xl animate-blob [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400/12 blur-3xl animate-blob [animation-delay:4s]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-900/10 to-transparent" />
      </div>

      <Container className="py-2 sm:py-12 lg:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-700 shadow-[0_12px_30px_-14px_rgba(14,29,74,0.35)]">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)]" aria-hidden />
              Qubelia - Consultoria tecnologica sin humo
            </div>
            <h1 id="hero-title" className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand-900 drop-shadow-[0_6px_18px_rgba(14,29,74,0.25)]">
              Desarrollo de software a medida en Sevilla para pymes que quieren menos caos y mas ventas
            </h1>
          <p className="text-lg text-slate-700 max-w-2xl hidden sm:block">
            Equipo en Sevilla que une consultoria tecnologica, diseno web para pymes y desarrollo de software a medida. Lanzamos rapido, integramos tus sistemas
            y automatizamos procesos con IA para ganar tiempo, reducir errores y vender mas.
          </p>
            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Beneficios clave">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl border border-brand-100/80 bg-white/80 px-3 py-2 shadow-[0_12px_30px_-16px_rgba(14,29,74,0.35)]">
                  <CheckIcon />
                  <span className="text-slate-700 text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button as="a" href="/#contacto" variant="shine" size="lg">Agenda diagnostico gratis</Button>
              <Button as="a" variant="ghost" href="/labs" size="lg">Ver productos gratuitos</Button>
              <p className="text-sm text-slate-600 sm:ml-2">Respuesta en 24 h - Sin compromiso</p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(99,137,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(14,29,74,0.25),transparent_35%),linear-gradient(120deg,rgba(14,29,74,0.14),rgba(65,104,225,0.18),rgba(99,137,255,0.22))] blur-2xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[28px] border border-white/50 bg-white/80 backdrop-blur shadow-[0_28px_70px_-38px_rgba(14,29,74,0.55)]">
              <div className="absolute left-4 top-4 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-brand-800 border border-brand-100 shadow-sm">
                El futuro es ahora
              </div>
              <Image
                src="/images/hero-illustration.png"
                alt="Soluciones de digitalizacion y software a medida"
                width={1200}
                height={900}
                priority
                sizes="(min-width: 1280px) 640px, (min-width: 1024px) 520px, 100vw"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
