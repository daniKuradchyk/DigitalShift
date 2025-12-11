"use client";
import React, { useState } from "react";
import Container from "@/components/common/Container";
import Button from "@/components/common/Button";

type Errors = { name?: string; email?: string; phone?: string; objective?: string };

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  function validate(form: FormData): Errors {
    const e: Errors = {};
    if (!String(form.get("name") || "").trim()) e.name = "El nombre es obligatorio";
    const email = String(form.get("email") || "").trim();
    if (!email) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "El email no es válido";
    const phone = String(form.get("phone") || "").trim();
    if (!phone) e.phone = "El teléfono es obligatorio";
    else if (phone.replace(/\D/g, "").length < 7) e.phone = "Introduce un teléfono válido";
    if (!String(form.get("objective") || "").trim()) e.objective = "Cuéntanos el objetivo del proyecto";
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      setMessage("Revisa los campos marcados en rojo.");
      return;
    }
    setStatus("loading");
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setStatus("ok");
      setMessage("¡Gracias! Te responderemos en 24 h laborables.");
      formEl.reset();
    } else {
      setStatus("error");
      setMessage("Ha ocurrido un error. Inténtalo de nuevo.");
    }
  }

  return (
    <section id="contacto" aria-labelledby="contact-title" className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <div>
            <h2 id="contact-title" className="text-2xl sm:text-3xl font-bold tracking-tight">¿Empezamos?</h2>
            <p className="mt-3 text-slate-700">Te respondemos en 24 h laborables. Sin compromiso.</p>
            <ul className="mt-6 space-y-2">
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Plan por hitos con precio y entregables cerrados.</span></li>
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Rendimiento, accesibilidad y analítica incluidos.</span></li>
              <li className="flex gap-2"><span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-brand-500" /><span className="text-slate-700">Código y cuentas a tu nombre.</span></li>
            </ul>
          </div>

          <form onSubmit={onSubmit} className="rounded-2xl border border-brand-100 p-6 shadow-sm bg-white" aria-describedby="rgpd-note status-msg">
            <div className="grid gap-4 sm:grid-cols-2">
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
                <input id="consent" name="consent" type="checkbox" required className="mt-1 h-4 w-4" aria-describedby="rgpd-note" />
                <label htmlFor="consent" className="text-sm text-slate-700">
                  Acepto el tratamiento de mis datos para responder a mi solicitud.
                </label>
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando…" : "Enviar"}</Button>
              <p id="status-msg" aria-live="polite" className={`${status === "error" ? "text-red-700" : status === "ok" ? "text-brand-700" : "text-slate-600"}`}>
                {status !== "idle" ? message : ""}
              </p>
            </div>
            <p id="rgpd-note" className="mt-3 text-xs text-slate-600">
              Tus datos no se comparten con terceros. Puedes solicitar su eliminación en cualquier momento.{" "}
              <a href="/legal/privacidad" className="underline">Política de privacidad</a>.
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
