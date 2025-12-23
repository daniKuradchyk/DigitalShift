"use client";
import React, { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

type Errors = { name?: string; email?: string; phone?: string; objective?: string; privacyAccepted?: string };

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
      setMessage("Revisa los campos marcados en rojo.");
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
    <section id="contacto" aria-labelledby="contact-title" className="relative overflow-hidden py-16 sm:py-20 bg-gradient-to-br from-brand-50/40 via-white/20 to-brand-50/40 dark:from-slate-950/40 dark:via-slate-900/20 dark:to-slate-950/40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-12 h-64 w-64 rounded-full bg-brand-300/10 blur-3xl dark:bg-brand-500/10" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-500/5 blur-3xl dark:bg-brand-700/10" />
      </div>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <div className="max-w-xl space-y-3">
              <h2 id="contact-title" className="text-2xl sm:text-3xl font-bold tracking-tight">¿Empezamos?</h2>
              <p className="text-slate-700">Te respondemos en 24 h laborables. Sin compromiso.</p>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Plan por hitos con precio y entregables cerrados.</span></li>
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Rendimiento, accesibilidad y analítica incluidos.</span></li>
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Código y cuentas a tu nombre.</span></li>
            </ul>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-slate-900/80 dark:text-brand-200 dark:ring-brand-500/40">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.72c.12.86.32 1.7.58 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.04a2 2 0 0 1 2.11-.45c.8.26 1.64.46 2.5.58A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Llámanos</p>
                    <a className="mt-1 inline-flex text-lg font-semibold text-slate-900 hover:text-brand-700 dark:text-slate-100 dark:hover:text-brand-200" href="tel:+34674569372">
                      +34 674 569 372
                    </a>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Lun-Vie · 9:00-18:00</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-slate-900/80 dark:text-brand-200 dark:ring-brand-500/40">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Email directo</p>
                    <a className="mt-1 inline-flex text-sm font-semibold text-slate-900 hover:text-brand-700 dark:text-slate-100 dark:hover:text-brand-200" href="mailto:daniil.kuradchyk@gmail.com">
                      daniil.kuradchyk@gmail.com
                    </a>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Respuesta en 24 h laborables</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-slate-900/80 dark:text-brand-200 dark:ring-brand-500/40">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10Z" />
                      <circle cx="12" cy="11" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Ubicación</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">Sevilla, ES</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/70">
                <div className="flex items-start gap-3">
                  <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-slate-900/80 dark:text-brand-200 dark:ring-brand-500/40">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Respuesta</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">En 24 h laborables</p>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Propuesta inicial en 48-72 h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Redes</span>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-200"
                href="https://www.linkedin.com/company/qubelia"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn de Qubelia"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M7.5 10.5V16" />
                  <circle cx="7.5" cy="7.5" r="1" />
                  <path d="M11 16v-3.2a2 2 0 0 1 4 0V16" />
                  <path d="M11 10.5h4" />
                </svg>
                LinkedIn
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-200"
                href="https://www.instagram.com/qubelia"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de Qubelia"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(14,29,74,0.45)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80" aria-describedby="rgpd-note status-msg">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Formulario</p>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Cuéntanos tu proyecto</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Te devolvemos una propuesta clara y realista.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-brand-100 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  Respuesta en 24 h
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                  Confidencial
                </span>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="block text-sm font-medium text-slate-900">Nombre*</label>
                <input id="name" name="name" type="text" required autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={`mt-1 w-full rounded-xl border px-3 py-2 ${errors.name ? "border-red-500" : "border-brand-200"}`} />
                {errors.name && <p id="name-error" className="mt-1 text-sm text-red-700">{errors.name}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="email" className="block text-sm font-medium text-slate-900">Email*</label>
                <input id="email" name="email" type="email" required autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={`mt-1 w-full rounded-xl border px-3 py-2 ${errors.email ? "border-red-500" : "border-brand-200"}`} />
                {errors.email && <p id="email-error" className="mt-1 text-sm text-red-700">{errors.email}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="phone" className="block text-sm font-medium text-slate-900">Teléfono*</label>
                <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} className={`mt-1 w-full rounded-xl border px-3 py-2 ${errors.phone ? "border-red-500" : "border-brand-200"}`} />
                {errors.phone && <p id="phone-error" className="mt-1 text-sm text-red-700">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="company" className="block text-sm font-medium text-slate-900">Empresa (opcional)</label>
                <input id="company" name="company" type="text" autoComplete="organization" className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2" />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="budget" className="block text-sm font-medium text-slate-900">Presupuesto orientativo</label>
                <select id="budget" name="budget" className="mt-1 w-full rounded-xl border border-brand-200 px-3 py-2">
                  <option value="">Selecciona un rango</option>
                  <option>Hasta 3.000 €</option>
                  <option>3.000–6.000 €</option>
                  <option>6.000–12.000 €</option>
                  <option>Más de 12.000 €</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="objective" className="block text-sm font-medium text-slate-900">Objetivo del proyecto*</label>
                <textarea id="objective" name="objective" required rows={4} aria-invalid={!!errors.objective} aria-describedby={errors.objective ? "objective-error" : undefined} className={`mt-1 w-full rounded-xl border px-3 py-2 ${errors.objective ? "border-red-500" : "border-brand-200"}`} placeholder="Cuéntanos brevemente el objetivo, usuarios, plazos y riesgos clave" />
                {errors.objective && <p id="objective-error" className="mt-1 text-sm text-red-700">{errors.objective}</p>}
              </div>

              {/* Honeypot anti-spam */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="sm:col-span-2 flex items-start gap-2">
                <input
                  id="privacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={(ev) => {
                    setPrivacyAccepted(ev.target.checked);
                    if (ev.target.checked) setPrivacyInfoOpen(true);
                  }}
                  className="mt-1 h-4 w-4"
                  aria-describedby={errors.privacyAccepted ? "privacy-error rgpd-note" : "rgpd-note"}
                />
                <label htmlFor="privacyAccepted" className="text-sm text-slate-700">
                  He leído y acepto la{" "}
                  <a className="underline" href="/legal/privacidad">
                    Política de privacidad
                  </a>
                  .
                </label>
              </div>
              {errors.privacyAccepted && <p id="privacy-error" className="sm:col-span-2 text-sm text-red-700">{errors.privacyAccepted}</p>}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando…" : "Enviar"}</Button>
              <p id="status-msg" aria-live="polite" className={`${status === "error" ? "text-red-700" : status === "ok" ? "text-brand-700" : "text-slate-600"}`}>
                {status !== "idle" ? message : ""}
              </p>
            </div>
            <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
              <button
                type="button"
                onClick={() => setPrivacyInfoOpen((v) => !v)}
                className="flex items-center gap-2 font-semibold text-slate-700 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white"
                aria-expanded={privacyInfoOpen}
                aria-controls="rgpd-note"
              >
                {privacyInfoOpen ? "Ocultar información de privacidad" : "Ver información de privacidad"}
              </button>
              <div
                id="rgpd-note"
                className={`${privacyInfoOpen ? "mt-2" : "mt-2 hidden"} rounded-lg border border-slate-200 bg-slate-50/80 p-3 leading-relaxed dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100`}
              >
                <p>
                  <strong>Responsable:</strong> Daniil Kuradchik Pekarskaya. <strong>Finalidad:</strong> atender tu consulta, gestionar solicitudes de
                  información y presupuestos y, en su caso, la relación precontractual. <strong>Legitimación:</strong> consentimiento y aplicación de medidas
                  precontractuales. <strong>Destinatarios:</strong> sin cesiones salvo obligación legal o proveedores que prestan servicios a Qubelia
                  (alojamiento web, etc.) con contrato de encargo. <strong>Derechos:</strong> acceso, rectificación, supresión, oposición, limitación,
                  portabilidad y retirada del consentimiento en{" "}
                  <a className="underline dark:text-white" href="mailto:daniil.kuradchyk@gmail.com">daniil.kuradchyk@gmail.com</a>; reclamación ante la AEPD (www.aepd.es). Más
                  info en la <a className="underline dark:text-white" href="/legal/privacidad">Política de privacidad</a>.
                </p>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
