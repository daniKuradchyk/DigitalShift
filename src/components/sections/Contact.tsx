"use client";
import React, { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

type Errors = { name?: string; email?: string; phone?: string; objective?: string; privacyAccepted?: string };

const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 dark:border-sky-500/15 bg-white dark:bg-slate-900/60 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 transition-all duration-200 focus:outline-none focus:border-sky-400 dark:focus:border-sky-500/40 focus:shadow-[0_0_0_3px_rgba(56,189,248,0.08)]";
const inputErrorClass = "border-red-400/60 focus:border-red-400/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]";
const labelClass = "block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-[0.12em]";

const trustStats = [
  { value: "24 h",   label: "Respuesta", color: "text-sky-500 dark:text-sky-400"     },
  { value: "8 sem",  label: "MVP live",  color: "text-emerald-500 dark:text-emerald-400" },
  { value: "100%",   label: "Tuyo",      color: "text-violet-500 dark:text-violet-400"   },
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [privacyInfoOpen, setPrivacyInfoOpen] = useState(false);

  function validate(form: FormData, consent: boolean): Errors {
    const e: Errors = {};
    if (!String(form.get("name") || "").trim()) e.name = "El nombre es obligatorio";
    const email = String(form.get("email") || "").trim();
    if (!email) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "El email no es válido";
    const phone = String(form.get("phone") || "").trim();
    if (!phone) e.phone = "El teléfono es obligatorio";
    else if (phone.replace(/\D/g, "").length < 7) e.phone = "Introduce un teléfono válido";
    if (!String(form.get("objective") || "").trim()) e.objective = "Cuéntanos el objetivo del proyecto";
    if (!consent) e.privacyAccepted = "Debes aceptar la Política de privacidad para enviar el formulario.";
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const v = validate(form, privacyAccepted);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      setMessage("Revisa los campos marcados.");
      return;
    }
    setStatus("loading");
    const payload = { ...Object.fromEntries(form.entries()), privacyAccepted };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setStatus("ok");
      setMessage("¡Gracias! Te responderemos en 24 h laborables.");
      formEl.reset();
      setPrivacyAccepted(false);
    } else {
      setStatus("error");
      setMessage("Ha ocurrido un error. Inténtalo de nuevo.");
    }
  }

  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Ambient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 10%, rgba(56,189,248,0.35) 50%, transparent 90%)" }} />
        <div className="absolute -left-20 bottom-1/4 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(56,189,248,0.4)" }} />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-10 dark:opacity-20"
          style={{ background: "rgba(129,140,248,0.4)" }} />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">

          {/* ── Left: visual panel ── */}
          <div className="space-y-6">
            {/* Gradient hero card */}
            <div
              className="relative rounded-2xl overflow-hidden p-8"
              style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.18) 0%, rgba(56,189,248,0.10) 40%, rgba(129,140,248,0.18) 100%)" }}
            >
              <div className="absolute inset-0 border border-sky-200/60 dark:border-sky-500/20 rounded-2xl pointer-events-none" />

              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} aria-hidden />
                Contacto
              </div>
              <h2 id="contact-title" className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight sm:text-4xl mb-2">
                ¿<span className="gradient-text-static">Hablamos</span>?
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
                Cuéntanos tu proyecto. Te devolvemos una propuesta clara en 48–72 h. Sin compromiso.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 divide-x divide-slate-200/60 dark:divide-white/[0.08] border border-slate-200/60 dark:border-white/[0.08] rounded-xl overflow-hidden bg-white/60 dark:bg-white/[0.02]">
                {trustStats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center py-4 px-2 text-center">
                    <p className={`text-2xl font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-white/[0.07] bg-white dark:bg-white/[0.02] divide-y divide-slate-100 dark:divide-white/[0.05] overflow-hidden">
              {[
                {
                  label: "Llámanos",
                  value: "+34 674 569 372",
                  sub: "Lun–Vie · 9:00–18:00",
                  href: "tel:+34674569372",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.04a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  ),
                },
                {
                  label: "Email directo",
                  value: "daniil.kuradchyk@gmail.com",
                  sub: "Respuesta en 24 h laborables",
                  href: "mailto:daniil.kuradchyk@gmail.com",
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  ),
                },
                {
                  label: "Ubicación",
                  value: "Sevilla, España",
                  sub: "Calle Torrelodones 84B",
                  href: null,
                  icon: (
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                  ),
                },
              ].map((card) => (
                <div key={card.label} className="flex items-center gap-4 px-5 py-4">
                  <span
                    className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sky-400 border border-sky-200 dark:border-sky-500/20 bg-sky-50 dark:bg-sky-500/10"
                    aria-hidden
                  >
                    {card.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-slate-400 dark:text-slate-500">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="block text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-sky-600 dark:hover:text-sky-300 transition-colors truncate">{card.value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{card.value}</p>
                    )}
                    {card.sub && <p className="text-xs text-slate-400 dark:text-slate-500">{card.sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500">Redes</span>
              {[
                { href: "https://www.linkedin.com/company/qubelia", label: "LinkedIn de Qubelia", name: "LinkedIn", icon: (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10.5V16" /><circle cx="7.5" cy="7.5" r="1" />
                    <path d="M11 16v-3.2a2 2 0 0 1 4 0V16M11 10.5h4" />
                  </svg>
                )},
                { href: "https://www.instagram.com/qubelia.tech", label: "Instagram de Qubelia", name: "Instagram", icon: (
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" />
                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                  </svg>
                )},
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-white/[0.08] px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-white/[0.03] hover:border-sky-300 dark:hover:border-sky-500/30 hover:text-sky-600 dark:hover:text-sky-400 transition-all"
                >
                  {s.icon}
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: form ── */}
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-slate-200/80 dark:border-sky-500/12 p-6 sm:p-8 bg-white dark:bg-[#070E22] shadow-[0_4px_24px_rgba(0,0,40,0.06)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
            aria-describedby="rgpd-note status-msg"
          >
            {/* Form header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-sky-500 dark:text-sky-400">Formulario</p>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">Cuéntanos tu proyecto</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Propuesta realista y clara en 48–72 h.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/8 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} aria-hidden />
                  Respuesta 24 h
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  🔒 Confidencial
                </span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Nombre*</label>
                <input
                  id="name" name="name" type="text" required autoComplete="name"
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                  className={`${inputClass} ${errors.name ? inputErrorClass : ""}`}
                  placeholder="Tu nombre"
                />
                {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>Email*</label>
                <input
                  id="email" name="email" type="email" required autoComplete="email"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                  className={`${inputClass} ${errors.email ? inputErrorClass : ""}`}
                  placeholder="tu@empresa.com"
                />
                {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>Teléfono*</label>
                <input
                  id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel"
                  aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined}
                  className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`}
                  placeholder="+34 600 000 000"
                />
                {errors.phone && <p id="phone-error" className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="company" className={labelClass}>Empresa (opcional)</label>
                <input
                  id="company" name="company" type="text" autoComplete="organization"
                  className={inputClass}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="budget" className={labelClass}>Presupuesto orientativo</label>
                <select id="budget" name="budget" className={inputClass}>
                  <option value="">Selecciona un rango</option>
                  <option>Hasta 3.000 €</option>
                  <option>3.000–6.000 €</option>
                  <option>6.000–12.000 €</option>
                  <option>Más de 12.000 €</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="objective" className={labelClass}>Objetivo del proyecto*</label>
                <textarea
                  id="objective" name="objective" required rows={4}
                  aria-invalid={!!errors.objective} aria-describedby={errors.objective ? "objective-error" : undefined}
                  className={`${inputClass} resize-none ${errors.objective ? inputErrorClass : ""}`}
                  placeholder="Cuéntanos brevemente el objetivo, usuarios, plazos y riesgos clave"
                />
                {errors.objective && <p id="objective-error" className="mt-1.5 text-xs text-red-400">{errors.objective}</p>}
              </div>

              {/* Honeypot */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="sm:col-span-2 flex items-start gap-3">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(ev) => {
                    setPrivacyAccepted(ev.target.checked);
                    if (ev.target.checked) setPrivacyInfoOpen(true);
                  }}
                  className="mt-0.5 h-4 w-4 rounded accent-sky-500"
                  aria-describedby={errors.privacyAccepted ? "privacy-error rgpd-note" : "rgpd-note"}
                />
                <label htmlFor="privacyAccepted" className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  He leído y acepto la{" "}
                  <a className="text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 underline underline-offset-2" href="/legal/privacidad">
                    Política de privacidad
                  </a>
                  .
                </label>
              </div>
              {errors.privacyAccepted && (
                <p id="privacy-error" className="sm:col-span-2 text-xs text-red-400">{errors.privacyAccepted}</p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button type="submit" variant="shine" disabled={status === "loading"}>
                {status === "loading" ? "Enviando…" : "Enviar mensaje"}
              </Button>
              <p
                id="status-msg"
                aria-live="polite"
                className={`text-sm ${status === "error" ? "text-red-400" : status === "ok" ? "text-emerald-400" : "text-slate-500"}`}
              >
                {status !== "idle" ? message : ""}
              </p>
            </div>

            {/* GDPR */}
            <div className="mt-5 text-xs">
              <button
                type="button"
                onClick={() => setPrivacyInfoOpen((v) => !v)}
                className="flex items-center gap-1.5 font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-expanded={privacyInfoOpen}
                aria-controls="rgpd-note"
              >
                <span className="text-base leading-none">{privacyInfoOpen ? "−" : "+"}</span>
                {privacyInfoOpen ? "Ocultar información de privacidad" : "Ver información de privacidad"}
              </button>
              {privacyInfoOpen && (
                <div
                  id="rgpd-note"
                  className="mt-3 rounded-xl border border-slate-200 dark:border-sky-500/10 bg-slate-50 dark:bg-white/[0.03] p-4 leading-relaxed text-slate-500 dark:text-slate-400"
                >
                  <p>
                    <strong className="text-slate-600 dark:text-slate-300">Responsable:</strong> Daniil Kuradchik Pekarskaya.{" "}
                    <strong className="text-slate-600 dark:text-slate-300">Finalidad:</strong> atender tu consulta y gestionar solicitudes.{" "}
                    <strong className="text-slate-600 dark:text-slate-300">Legitimación:</strong> consentimiento y medidas precontractuales.{" "}
                    <strong className="text-slate-600 dark:text-slate-300">Destinatarios:</strong> sin cesiones salvo obligación legal o proveedores de servicio con contrato de encargo.{" "}
                    <strong className="text-slate-600 dark:text-slate-300">Derechos:</strong> acceso, rectificación, supresión y demás en{" "}
                    <a className="text-sky-500 dark:text-sky-400 hover:underline" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a>.{" "}
                    Más info en la <a className="text-sky-500 dark:text-sky-400 hover:underline" href="/legal/privacidad">Política de privacidad</a>.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
