"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { CONTACT } from "@/config/contact";

/* ─── Shared easing (same across ALL sections) ─────────────────── */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Form types & styles ─────────────────────────────────────── */
type Errors = { name?: string; email?: string; phone?: string; objective?: string; privacyAccepted?: string };

const inputBase =
  "w-full rounded-xl border bg-transparent px-4 py-3 text-sm transition-all duration-300 focus:outline-none placeholder:text-blue-300/15";
const inputNormal = "border-blue-400/10 focus:border-blue-400/30 focus:shadow-[0_0_0_3px_rgba(65,105,225,0.06)]";
const inputError = "border-red-400/40 focus:border-red-400/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.06)]";
const labelClass = "block text-[11px] font-semibold uppercase tracking-[0.14em] mb-2";

/* ─── Contact channels ────────────────────────────────────────── */
const CHANNELS = [
  {
    label: "Email",
    value: CONTACT.email,
    sub: "Respuesta en 24 h laborables",
    href: `mailto:${CONTACT.email}`,
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
        <circle cx="12" cy="11" r="2.5" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN CONTACT SECTION — Professional, standalone
   ═══════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
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

  async function onSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formEl = ev.currentTarget;
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
    <section
      ref={ref}
      id="contacto"
      aria-labelledby="contact-title"
      className="relative scroll-mt-24 py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE }}
          style={{
            transformOrigin: "center",
            background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.2), transparent)",
          }}
        />
        {/* Ambient glows */}
        <div
          className="absolute -left-40 top-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.04]"
          style={{ background: "rgba(65,105,225,1)" }}
        />
        <div
          className="absolute -right-40 bottom-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.03]"
          style={{ background: "rgba(96,165,250,1)" }}
        />
      </div>

      <Container className="relative">
        {/* ── Header — centrado ── */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="section-tag mb-5">
              <span
                className="h-2 w-2 rounded-full bg-emerald-400"
                style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }}
              />
              Contacto
            </span>
          </motion.div>

          <motion.h2
            id="contact-title"
            className="text-h2 mt-4 mb-4"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Cuéntanos tu{" "}
            <span className="gradient-text-static">proyecto</span>
          </motion.h2>

          <motion.p
            className="text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            Diagnóstico gratuito y propuesta clara en 48–72 h. Sin compromiso.
          </motion.p>
        </div>

        {/* ── Main content: form left + info right ── */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-14 items-start max-w-5xl mx-auto">
          {/* ── Left: Form ── */}
          <motion.form
            onSubmit={onSubmit}
            className="relative rounded-2xl overflow-hidden p-6 sm:p-8 md:p-10"
            style={{
              background: "linear-gradient(180deg, rgba(10,17,40,0.97), rgba(6,11,26,0.95))",
              borderWidth: "1px",
              borderColor: "rgba(65,105,225,0.1)",
            }}
            aria-describedby="rgpd-note"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            {/* Accent line top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(65,105,225,0.4), rgba(96,165,250,0.3), transparent)",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: EASE }}
            />

            {/* Form header */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "rgba(65,105,225,0.1)",
                  border: "1px solid rgba(65,105,225,0.15)",
                }}
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-lg font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  Solicita un diagnóstico
                </h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Todos los campos con * son obligatorios
                </p>
              </div>
            </div>

            {/* Fields */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="ct-name" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Nombre *
                </label>
                <input
                  id="ct-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Tu nombre"
                />
                {errors.name && <p className="mt-1.5 text-[11px] text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="ct-email" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Email *
                </label>
                <input
                  id="ct-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                  placeholder="tu@empresa.com"
                />
                {errors.email && <p className="mt-1.5 text-[11px] text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="ct-phone" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Teléfono *
                </label>
                <input
                  id="ct-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                  placeholder="+34 600 000 000"
                />
                {errors.phone && <p className="mt-1.5 text-[11px] text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="ct-company" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Empresa
                </label>
                <input
                  id="ct-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={`${inputBase} ${inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Nombre de tu empresa"
                />
              </div>

              <div>
                <label htmlFor="ct-budget" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Presupuesto orientativo
                </label>
                <select
                  id="ct-budget"
                  name="budget"
                  className={`${inputBase} ${inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                >
                  <option value="">Selecciona un rango</option>
                  <option>Hasta 8.000 €</option>
                  <option>8.000–20.000 €</option>
                  <option>20.000–50.000 €</option>
                  <option>Más de 50.000 €</option>
                </select>
              </div>

              <div>
                <label htmlFor="ct-timeline" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  Plazo deseado
                </label>
                <select
                  id="ct-timeline"
                  name="timeline"
                  className={`${inputBase} ${inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                >
                  <option value="">Selecciona un plazo</option>
                  <option>Lo antes posible</option>
                  <option>1–3 meses</option>
                  <option>3–6 meses</option>
                  <option>Sin prisa, estoy explorando</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ct-objective" className={labelClass} style={{ color: "var(--text-muted)" }}>
                  ¿Qué proceso o problema queréis resolver? *
                </label>
                <textarea
                  id="ct-objective"
                  name="objective"
                  required
                  rows={4}
                  className={`${inputBase} resize-none ${errors.objective ? inputError : inputNormal}`}
                  style={{ color: "var(--text-primary)" }}
                  placeholder="Ej: tenemos los pedidos en Excel y el ERP no se sincroniza con la tienda online..."
                />
                {errors.objective && <p className="mt-1.5 text-[11px] text-red-400">{errors.objective}</p>}
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
                  className="mt-0.5 h-4 w-4 rounded accent-blue-500"
                />
                <label htmlFor="ct-privacy" className="text-xs sm:text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  He leído y acepto la{" "}
                  <a className="text-blue-400 hover:text-blue-300 underline underline-offset-2" href="/legal/privacidad">
                    Política de privacidad
                  </a>
                  .
                </label>
              </div>
              {errors.privacyAccepted && (
                <p className="sm:col-span-2 text-[11px] text-red-400">{errors.privacyAccepted}</p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button type="submit" variant="shine" disabled={status === "loading"} className="w-full sm:w-auto">
                {status === "loading" ? "Enviando…" : "Pedir diagnóstico gratis"}
              </Button>
              {status !== "idle" && (
                <p
                  className={`text-sm ${
                    status === "error" ? "text-red-400" : status === "ok" ? "text-emerald-400" : ""
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

            {/* RGPD */}
            <p id="rgpd-note" className="mt-5 text-[10px] leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
              Responsable: Daniil Kuradchik Pekarskaya. Finalidad: atender tu consulta.
              Derechos: acceso, rectificación, supresión en{" "}
              <a className="text-blue-400 hover:underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
              .
            </p>
          </motion.form>

          {/* ── Right: Contact info ── */}
          <motion.div
            className="space-y-6 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            {/* Trust badges */}
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background: "linear-gradient(180deg, rgba(10,17,40,0.97), rgba(6,11,26,0.95))",
                borderWidth: "1px",
                borderColor: "rgba(65,105,225,0.1)",
              }}
            >
              <h3
                className="text-base font-bold mb-5"
                style={{ color: "var(--text-primary)" }}
              >
                Qué puedes esperar
              </h3>

              <div className="space-y-4">
                {[
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ),
                    title: "Respuesta en 24 h",
                    desc: "Con diagnóstico inicial y siguiente paso concreto",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ),
                    title: "Propuesta en 48–72 h",
                    desc: "Alcance, plazos y precio cerrados antes de comprometer nada",
                  },
                  {
                    icon: (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    title: "100% confidencial",
                    desc: "Tu información nunca se comparte con terceros",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: EASE }}
                  >
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-blue-400"
                      style={{
                        background: "rgba(65,105,225,0.08)",
                        border: "1px solid rgba(65,105,225,0.12)",
                      }}
                    >
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact channels */}
            <div
              className="rounded-2xl overflow-hidden divide-y"
              style={{
                background: "linear-gradient(180deg, rgba(10,17,40,0.97), rgba(6,11,26,0.95))",
                borderWidth: "1px",
                borderColor: "rgba(65,105,225,0.1)",
                divideColor: "rgba(65,105,225,0.06)",
              }}
            >
              {CHANNELS.map((ch, i) => (
                <motion.div
                  key={ch.label}
                  className="flex items-center gap-4 px-6 py-4 transition-colors duration-300 hover:bg-blue-500/[0.02]"
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.55 + i * 0.08, ease: EASE }}
                >
                  <span
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-blue-400"
                    style={{
                      background: "rgba(65,105,225,0.08)",
                      border: "1px solid rgba(65,105,225,0.12)",
                    }}
                  >
                    {ch.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: "rgba(96,165,250,0.45)" }}>
                      {ch.label}
                    </p>
                    {ch.href ? (
                      <a
                        href={ch.href}
                        className="block text-sm font-semibold hover:text-blue-300 transition-colors truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {ch.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                        {ch.value}
                      </p>
                    )}
                    {ch.sub && (
                      <p className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                        {ch.sub}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
            >
              <span className="text-[10px] uppercase tracking-[0.18em] font-semibold" style={{ color: "rgba(96,165,250,0.4)" }}>
                Redes
              </span>
              {[
                {
                  href: CONTACT.linkedin,
                  name: "LinkedIn",
                  icon: (
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="3.5" />
                      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${s.name} de Qubelia`}
                  className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 hover:border-blue-400/25 hover:text-blue-300"
                  style={{
                    borderColor: "rgba(65,105,225,0.1)",
                    background: "rgba(65,105,225,0.03)",
                    color: "var(--text-muted)",
                  }}
                >
                  {s.icon} {s.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
