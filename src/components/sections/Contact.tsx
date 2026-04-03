"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";
import { CONTACT } from "@/config/contact";

type Errors = { name?: string; email?: string; phone?: string; objective?: string; privacyAccepted?: string };

const inputClass = "mt-1.5 w-full rounded-xl border border-brand-400/15 bg-[#0A1128]/80 px-3.5 py-2.5 text-sm placeholder-brand-300/20 transition-all duration-200 focus:outline-none focus:border-brand-400/40 focus:shadow-[0_0_0_3px_rgba(65,105,225,0.08)]";
const inputErrorClass = "border-red-400/60 focus:border-red-400/70 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]";
const labelClass = "block text-xs font-semibold uppercase tracking-[0.12em]";

const trustStats = [
  { value: "24 h",   label: "Respuesta",    color: "text-brand-400" },
  { value: "48–72h", label: "Propuesta",    color: "text-brand-300"   },
  { value: "100%",   label: "Tuyo siempre", color: "text-brand-400" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
    if (Object.keys(v).length > 0) { setStatus("error"); setMessage("Revisa los campos marcados."); return; }
    setStatus("loading");
    const payload = { ...Object.fromEntries(form.entries()), privacyAccepted };
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setStatus("ok"); setMessage("¡Gracias! Te responderemos en 24 h laborables."); formEl.reset(); setPrivacyAccepted(false); }
    else { setStatus("error"); setMessage("Ha ocurrido un error. Inténtalo de nuevo."); }
  }

  return (
    <section ref={ref} id="contacto" aria-labelledby="contact-title" className="relative py-24 lg:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(65,105,225,0.35) 50%, transparent 90%)" }} />
        <div className="absolute -left-20 bottom-1/4 h-96 w-96 rounded-full blur-3xl opacity-20" style={{ background: "rgba(65,105,225,0.25)" }} />
        <div className="absolute -right-20 top-1/4 h-96 w-96 rounded-full blur-3xl opacity-20" style={{ background: "rgba(91,141,239,0.25)" }} />
      </div>

      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-start">
          {/* Left: visual panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div className="relative rounded-2xl overflow-hidden p-8" style={{ background: "linear-gradient(135deg, rgba(65,105,225,0.14) 0%, rgba(91,141,239,0.08) 40%, rgba(133,162,255,0.10) 100%)" }}>
              <div className="absolute inset-0 border border-brand-400/15 rounded-2xl pointer-events-none" />
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.6)" }} aria-hidden />
                Contacto
              </div>
              <h2 id="contact-title" className="text-h2 mb-2" style={{ color: "var(--text-primary)" }}>
                Agenda un <span className="gradient-text-static">diagnóstico</span>
              </h2>
              <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                Cuéntanos el problema o el proceso que queréis mejorar. Devolvemos una propuesta clara y accionable en 48–72 h. Sin compromiso.
              </p>
              <div className="grid grid-cols-3 divide-x divide-brand-400/10 border border-brand-400/10 rounded-xl overflow-hidden bg-[#0A1128]/60">
                {trustStats.map((s) => (
                  <div key={s.label} className="flex flex-col items-center py-4 px-2 text-center">
                    <p className={`text-2xl font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-brand-400/10 bg-[#0A1128]/60 divide-y divide-brand-400/8 overflow-hidden">
              {[
                { label: "Llámanos", value: CONTACT.phone, sub: CONTACT.phoneHours, href: CONTACT.phoneHref, icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.04a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92Z" /></svg>) },
                { label: "Email", value: CONTACT.email, sub: "Respuesta en 24 h laborables", href: `mailto:${CONTACT.email}`, icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>) },
                { label: "Ubicación", value: CONTACT.address, sub: CONTACT.addressFull, href: null as string | null, icon: (<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" /><circle cx="12" cy="11" r="2.5" /></svg>) },
              ].map((card) => (
                <div key={card.label} className="flex items-center gap-4 px-5 py-4">
                  <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-brand-400 border border-brand-400/15 bg-brand-500/10">{card.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-brand-400/50">{card.label}</p>
                    {card.href ? (
                      <a href={card.href} className="block text-sm font-semibold hover:text-brand-300 transition-colors truncate" style={{ color: "var(--text-primary)" }}>{card.value}</a>
                    ) : (
                      <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{card.value}</p>
                    )}
                    {card.sub && <p className="text-xs" style={{ color: "var(--text-muted)" }}>{card.sub}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-400/50">Redes</span>
              {[
                { href: CONTACT.linkedin, label: "LinkedIn de Qubelia", name: "LinkedIn", icon: (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7.5 10.5V16" /><circle cx="7.5" cy="7.5" r="1" /><path d="M11 16v-3.2a2 2 0 0 1 4 0V16M11 10.5h4" /></svg>) },
                { href: CONTACT.instagram, label: "Instagram de Qubelia", name: "Instagram", icon: (<svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" /></svg>) },
              ].map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="inline-flex items-center gap-2 rounded-full border border-brand-400/12 bg-brand-500/[0.04] px-3 py-1.5 text-xs font-medium hover:border-brand-400/25 hover:text-brand-300 transition-all" style={{ color: "var(--text-muted)" }}>
                  {s.icon} {s.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={onSubmit}
            className="rounded-2xl border border-brand-400/12 p-6 sm:p-8 bg-[#0A1128] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
            aria-describedby="rgpd-note status-msg"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            <div className="flex flex-wrap items-start justify-between gap-3 mb-7">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-400">Diagnóstico gratuito</p>
                <h3 className="text-xl font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>¿Qué proceso queréis mejorar?</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>Propuesta realista y sin compromiso en 48–72 h.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} aria-hidden />
                  Respuesta 24 h
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-400/10 bg-brand-500/[0.04] px-2.5 py-1 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Confidencial</span>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass} style={{ color: "var(--text-muted)" }}>Nombre*</label>
                <input id="name" name="name" type="text" required autoComplete="name" aria-invalid={!!errors.name} className={`${inputClass} ${errors.name ? inputErrorClass : ""}`} style={{ color: "var(--text-primary)" }} placeholder="Tu nombre" />
                {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className={labelClass} style={{ color: "var(--text-muted)" }}>Email*</label>
                <input id="email" name="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} className={`${inputClass} ${errors.email ? inputErrorClass : ""}`} style={{ color: "var(--text-primary)" }} placeholder="tu@empresa.com" />
                {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="phone" className={labelClass} style={{ color: "var(--text-muted)" }}>Teléfono*</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} className={`${inputClass} ${errors.phone ? inputErrorClass : ""}`} style={{ color: "var(--text-primary)" }} placeholder="+34 600 000 000" />
                {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="company" className={labelClass} style={{ color: "var(--text-muted)" }}>Empresa (opcional)</label>
                <input id="company" name="company" type="text" autoComplete="organization" className={inputClass} style={{ color: "var(--text-primary)" }} placeholder="Nombre de tu empresa" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="budget" className={labelClass} style={{ color: "var(--text-muted)" }}>Presupuesto orientativo</label>
                <select id="budget" name="budget" className={inputClass} style={{ color: "var(--text-primary)" }}>
                  <option value="">Selecciona un rango</option>
                  <option>Hasta 8.000 €</option>
                  <option>8.000–20.000 €</option>
                  <option>20.000–50.000 €</option>
                  <option>Más de 50.000 €</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="objective" className={labelClass} style={{ color: "var(--text-muted)" }}>¿Qué proceso o problema queréis resolver?*</label>
                <textarea id="objective" name="objective" required rows={4} aria-invalid={!!errors.objective} className={`${inputClass} resize-none ${errors.objective ? inputErrorClass : ""}`} style={{ color: "var(--text-primary)" }} placeholder="Ej: tenemos los pedidos en Excel y el ERP no se sincroniza con la tienda online..." />
                {errors.objective && <p className="mt-1.5 text-xs text-red-400">{errors.objective}</p>}
              </div>
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="sm:col-span-2 flex items-start gap-3">
                <input id="privacyAccepted" name="privacyAccepted" type="checkbox" checked={privacyAccepted} onChange={(ev) => { setPrivacyAccepted(ev.target.checked); if (ev.target.checked) setPrivacyInfoOpen(true); }} className="mt-0.5 h-4 w-4 rounded accent-brand-500" />
                <label htmlFor="privacyAccepted" className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  He leído y acepto la <a className="text-brand-400 hover:text-brand-300 underline underline-offset-2" href="/legal/privacidad">Política de privacidad</a>.
                </label>
              </div>
              {errors.privacyAccepted && <p className="sm:col-span-2 text-xs text-red-400">{errors.privacyAccepted}</p>}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <Button type="submit" variant="shine" disabled={status === "loading"}>
                {status === "loading" ? "Enviando…" : "Pedir diagnóstico"}
              </Button>
              <p id="status-msg" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-400" : status === "ok" ? "text-emerald-400" : ""}`} style={status === "idle" ? { color: "var(--text-muted)" } : {}}>
                {status !== "idle" ? message : ""}
              </p>
            </div>

            <div className="mt-5 text-xs">
              <button type="button" onClick={() => setPrivacyInfoOpen((v) => !v)} className="flex items-center gap-1.5 font-medium hover:text-brand-300 transition-colors" style={{ color: "var(--text-muted)" }} aria-expanded={privacyInfoOpen}>
                <span className="text-base leading-none">{privacyInfoOpen ? "−" : "+"}</span>
                {privacyInfoOpen ? "Ocultar información de privacidad" : "Ver información de privacidad"}
              </button>
              {privacyInfoOpen && (
                <div id="rgpd-note" className="mt-3 rounded-xl border border-brand-400/10 bg-brand-500/[0.04] p-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  <p>
                    <strong style={{ color: "var(--text-secondary)" }}>Responsable:</strong> Daniil Kuradchik Pekarskaya.{" "}
                    <strong style={{ color: "var(--text-secondary)" }}>Finalidad:</strong> atender tu consulta y gestionar solicitudes.{" "}
                    <strong style={{ color: "var(--text-secondary)" }}>Legitimación:</strong> consentimiento y medidas precontractuales.{" "}
                    <strong style={{ color: "var(--text-secondary)" }}>Destinatarios:</strong> sin cesiones salvo obligación legal o proveedores de servicio con contrato de encargo.{" "}
                    <strong style={{ color: "var(--text-secondary)" }}>Derechos:</strong> acceso, rectificación, supresión y demás en <a className="text-brand-400 hover:underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.{" "}
                    Más info en la <a className="text-brand-400 hover:underline" href="/legal/privacidad">Política de privacidad</a>.
                  </p>
                </div>
              )}
            </div>
          </motion.form>
        </div>
      </Container>
    </section>
  );
}
