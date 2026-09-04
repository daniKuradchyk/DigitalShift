"use client";

import React, { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Container from "@/components/common/Container";
import { CONTACT } from "@/config/contact";
import { trackContactChannelClick, trackLeadFormSuccess } from "@/lib/gtm";

/* ─── Form types & styles ─────────────────────────────────────── */
type Errors = { name?: string; email?: string; phone?: string; objective?: string; privacyAccepted?: string };

/* Los estilos base de los campos dentro de `.band-dark` viven en globals.css:
   fondo translúcido, borde fino y foco azul. Aquí sólo maquetamos. */
const inputBase = "w-full px-4 py-3 text-sm";
const errorBorder = { borderColor: "rgba(248,113,113,0.75)" } as const;
const labelClass = "mb-2 block text-sm font-medium text-white/75";

/* ─── Qué puede esperar el cliente ────────────────────────────── */
const EXPECTATIONS = [
  {
    title: "Respuesta en 24 h",
    desc: "Con diagnóstico inicial y siguiente paso concreto",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Propuesta en 48–72 h",
    desc: "Alcance, plazos y precio cerrados antes de comprometer nada",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "100% confidencial",
    desc: "Tu información nunca se comparte con terceros",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

/* ─── Contact channels ────────────────────────────────────────── */
const CHANNELS = [
  {
    label: "Email",
    value: CONTACT.email,
    sub: "Respuesta en 24 h laborables",
    href: `mailto:${CONTACT.email}`,
    trackingChannel: "email" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </svg>
    ),
  },
  {
    label: "Teléfono",
    value: CONTACT.phone,
    sub: CONTACT.phoneHours,
    href: CONTACT.phoneHref,
    trackingChannel: "phone" as const,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.04a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "Ubicación",
    value: CONTACT.address,
    sub: CONTACT.addressFull,
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    href: CONTACT.linkedin,
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7.5 10.5V16" />
        <circle cx="7.5" cy="7.5" r="1" />
        <path d="M11 16v-3.2a2 2 0 0 1 4 0V16M11 10.5h4" />
      </svg>
    ),
  },
  {
    href: CONTACT.instagram,
    name: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN CONTACT SECTION — banda oscura de cierre
   ═══════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const pathname = usePathname();
  const isSubmittingRef = useRef(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  function validate(form: FormData, consent: boolean): Errors {
    const e: Errors = {};
    if (!String(form.get("name") || "").trim()) e.name = "Obligatorio";
    const email = String(form.get("email") || "").trim();
    if (!email) e.email = "Obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Email no válido";
    const phone = String(form.get("phone") || "").trim();
    if (!phone) e.phone = "Obligatorio";
    else if (phone.replace(/\D/g, "").length < 7) e.phone = "Teléfono no válido";
    if (!String(form.get("objective") || "").trim()) e.objective = "Obligatorio";
    if (!consent) e.privacyAccepted = "Debes aceptar la Política de privacidad.";
    return e;
  }

  function handleContactChannelClick(
    channel: "email" | "phone",
    href: string,
    placement: string,
  ) {
    trackContactChannelClick({
      channel,
      href,
      placement,
      pagePath: pathname,
    });
  }

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (isSubmittingRef.current) return;
    const formEl = ev.currentTarget;
    const form = new FormData(formEl);
    const v = validate(form, privacyAccepted);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      setMessage("Revisa los campos marcados.");
      return;
    }
    isSubmittingRef.current = true;
    setStatus("loading");
    const payload = { ...Object.fromEntries(form.entries()), privacyAccepted };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    const result = res ? ((await res.json().catch(() => null)) as { ok?: boolean } | null) : null;
    if (res?.ok && result?.ok) {
      const serviceInterest =
        typeof window === "undefined"
          ? undefined
          : new URLSearchParams(window.location.search).get("service")?.trim() || undefined;
      trackLeadFormSuccess({
        formName: "home_contact_form",
        pagePath: pathname,
        serviceInterest,
      });
      setStatus("ok");
      setMessage("¡Gracias! Te responderemos en 24 h laborables.");
      formEl.reset();
      setPrivacyAccepted(false);
    } else {
      setStatus("error");
      setMessage("Ha ocurrido un error. Inténtalo de nuevo.");
    }
    isSubmittingRef.current = false;
  }

  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="band-dark scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* ── Izquierda: titular y contexto ── */}
          <div className="animate-fade-up">
            <p className="section-tag mb-6">Contacto</p>

            <h2 id="contact-title" className="text-h2 text-white">
              Cuéntanos tu proyecto
            </h2>

            <p className="mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-white/70">
              Diagnóstico gratuito y propuesta clara en 48–72 h. Sin compromiso.
            </p>

            {/* Qué puedes esperar */}
            <div className="mt-10 sm:mt-12">
              <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Qué puedes esperar
              </h3>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {EXPECTATIONS.map((item) => (
                  <li key={item.title} className="flex items-start gap-4 py-5">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-white/55">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Canales */}
            <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
              {CHANNELS.map((ch) => (
                <li key={ch.label} className="flex items-start gap-4 py-5">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 text-white">
                    {ch.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                      {ch.label}
                    </p>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        onClick={
                          ch.trackingChannel
                            ? () => handleContactChannelClick(ch.trackingChannel, ch.href, "contact_section")
                            : undefined
                        }
                        className="mt-1 block truncate text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <p className="mt-1 truncate text-sm font-medium text-white">{ch.value}</p>
                    )}
                    {ch.sub && <p className="mt-1 truncate text-sm text-white/55">{ch.sub}</p>}
                  </div>
                </li>
              ))}
            </ul>

            {/* Redes */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">
                Redes
              </span>
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.name} de Qubelia`}
                  className="inline-flex items-center gap-2 rounded-[2px] border border-white/25 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors duration-150 hover:border-white hover:text-white"
                >
                  {s.icon} {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* ── Derecha: formulario ── */}
          <form
            onSubmit={onSubmit}
            className="rounded-[4px] border border-white/12 p-6 sm:p-8 lg:p-10 animate-fade-up delay-200"
            aria-describedby="rgpd-note"
          >
            <div className="mb-8 border-b border-white/10 pb-6">
              <h3 className="text-xl font-semibold tracking-tight text-white">
                Solicita un diagnóstico
              </h3>
              <p className="mt-1.5 text-sm text-white/55">
                Todos los campos con * son obligatorios
              </p>
            </div>

            {/* Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ct-name" className={labelClass}>
                  Nombre *
                </label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputBase}
                  style={errors.name ? errorBorder : undefined}
                  aria-invalid={errors.name ? true : undefined}
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="ct-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputBase}
                  style={errors.email ? errorBorder : undefined}
                  aria-invalid={errors.email ? true : undefined}
                  placeholder="tu@empresa.com"
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="ct-phone" className={labelClass}>
                  Teléfono *
                </label>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className={inputBase}
                  style={errors.phone ? errorBorder : undefined}
                  aria-invalid={errors.phone ? true : undefined}
                  placeholder="+34 600 000 000"
                />
                {errors.phone && <p className="mt-1.5 text-xs text-red-300">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="ct-company" className={labelClass}>
                  Empresa
                </label>
                <input
                  id="ct-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={inputBase}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="ct-budget" className={labelClass}>
                  Presupuesto orientativo
                </label>
                <select id="ct-budget" name="budget" className={inputBase}>
                  <option value="">Selecciona un rango</option>
                  <option>Hasta 8.000 €</option>
                  <option>8.000–20.000 €</option>
                  <option>20.000–50.000 €</option>
                  <option>Más de 50.000 €</option>
                </select>
              </div>

              <div>
                <label htmlFor="ct-timeline" className={labelClass}>
                  Plazo deseado
                </label>
                <select id="ct-timeline" name="timeline" className={inputBase}>
                  <option value="">Selecciona un plazo</option>
                  <option>Lo antes posible</option>
                  <option>1–3 meses</option>
                  <option>3–6 meses</option>
                  <option>Sin prisa, estoy explorando</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ct-objective" className={labelClass}>
                  ¿Qué proceso o problema queréis resolver? *
                </label>
                <textarea
                  id="ct-objective"
                  name="objective"
                  required
                  rows={4}
                  className={`${inputBase} resize-none`}
                  style={errors.objective ? errorBorder : undefined}
                  aria-invalid={errors.objective ? true : undefined}
                  placeholder="Ej: tenemos los pedidos en Excel y el ERP no se sincroniza con la tienda online..."
                />
                {errors.objective && <p className="mt-1.5 text-xs text-red-300">{errors.objective}</p>}
              </div>

              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              {/* Privacy */}
              <div className="sm:col-span-2 flex items-start gap-3">
                <input
                  id="ct-privacy"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(ev) => setPrivacyAccepted(ev.target.checked)}
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="ct-privacy" className="text-sm leading-relaxed text-white/60">
                  He leído y acepto la{" "}
                  <a
                    className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                    href="/legal/privacidad"
                  >
                    Política de privacidad
                  </a>
                  .
                </label>
              </div>
              {errors.privacyAccepted && (
                <p className="sm:col-span-2 text-xs text-red-300">{errors.privacyAccepted}</p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center rounded-[2px] bg-white px-7 py-3.5 text-[15px] font-medium tracking-tight text-[#101014] transition-colors duration-150 hover:bg-white/90 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
              >
                {status === "loading" ? "Enviando…" : "Pedir diagnóstico gratis"}
              </button>
              {status !== "idle" && (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-300" : status === "ok" ? "text-emerald-300" : "text-white/70"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

            {/* RGPD */}
            <p id="rgpd-note" className="mt-6 text-xs leading-relaxed text-white/40">
              Responsable: Daniil Kuradchik Pekarskaya. Finalidad: atender tu consulta.
              Derechos: acceso, rectificación, supresión en{" "}
              <a
                className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                href={`mailto:${CONTACT.email}`}
                onClick={() => handleContactChannelClick("email", `mailto:${CONTACT.email}`, "contact_legal_note")}
              >
                {CONTACT.email}
              </a>
              .
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
