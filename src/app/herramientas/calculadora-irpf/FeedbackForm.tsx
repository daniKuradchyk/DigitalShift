"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import { irpfFeedbackSchema, type IrpfFeedbackPayload } from "@/lib/labs/irpfFeedback";

type Errors = Partial<Record<keyof IrpfFeedbackPayload, string>>;

const categories = [
  { value: "calculo", label: "Calculo / resultado" },
  { value: "datos", label: "Datos o normativa" },
  { value: "ui", label: "Interfaz / uso" },
  { value: "otro", label: "Otro" },
] as const;

const steps = [
  { value: "unknown", label: "No se / no aplica" },
  { value: "A", label: "Paso A - Situacion" },
  { value: "B", label: "Paso B - Ingresos" },
  { value: "C", label: "Paso C - Personal" },
  { value: "D", label: "Paso D - Helpers" },
  { value: "E", label: "Paso E - Resultado" },
] as const;

export default function FeedbackForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState<IrpfFeedbackPayload>({
    category: "calculo",
    step: "unknown",
    details: "",
    name: "",
    email: "",
    consent: false,
    page: "",
    website: "",
  });

  function setField<K extends keyof IrpfFeedbackPayload>(key: K, value: IrpfFeedbackPayload[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(payload: IrpfFeedbackPayload): Errors {
    const parsed = irpfFeedbackSchema.safeParse(payload);
    if (parsed.success) return {};
    const next: Errors = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof IrpfFeedbackPayload | undefined;
      if (field && !next[field]) {
        next[field] = issue.message;
      }
    });
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: IrpfFeedbackPayload = {
      ...form,
      page: typeof window !== "undefined" ? window.location.pathname : "",
    };
    const v = validate(payload);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      setStatus("error");
      setMessage("Revisa los campos marcados.");
      return;
    }

    setStatus("loading");
    setMessage("");
    const res = await fetch("/api/labs/irpf-feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      setStatus("ok");
      setMessage("Gracias. Revisaremos el error en breve.");
      setForm({
        category: "calculo",
        step: "unknown",
        details: "",
        name: "",
        email: "",
        consent: false,
        page: "",
        website: "",
      });
    } else {
      setStatus("error");
      setMessage("No se pudo enviar. Intentalo de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(14,29,74,0.45)] backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/80">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Feedback</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Detectaste un error en la calculadora?</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Tu feedback nos ayuda a mejorar el resultado.</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          Sin registro
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-900 dark:text-slate-200">Categoria*</label>
          <select
            id="category"
            value={form.category}
            onChange={(event) => setField("category", event.target.value as IrpfFeedbackPayload["category"])}
            className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-slate-900/70 ${errors.category ? "border-red-500" : "border-brand-200"}`}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-700">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="step" className="block text-sm font-medium text-slate-900 dark:text-slate-200">Paso (opcional)</label>
          <select
            id="step"
            value={form.step ?? "unknown"}
            onChange={(event) => setField("step", event.target.value as IrpfFeedbackPayload["step"])}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white/80 px-3 py-2 dark:bg-slate-900/70"
          >
            {steps.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="details" className="block text-sm font-medium text-slate-900 dark:text-slate-200">Describe el error*</label>
          <textarea
            id="details"
            rows={4}
            value={form.details}
            onChange={(event) => setField("details", event.target.value)}
            className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-slate-900/70 ${errors.details ? "border-red-500" : "border-brand-200"}`}
            placeholder="Ejemplo: el calculo de retenciones no coincide con el tramo X."
          />
          {errors.details && <p className="mt-1 text-xs text-red-700">{errors.details}</p>}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-900 dark:text-slate-200">Nombre (opcional)</label>
          <input
            id="name"
            type="text"
            value={form.name ?? ""}
            onChange={(event) => setField("name", event.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white/80 px-3 py-2 dark:bg-slate-900/70"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-900 dark:text-slate-200">Email (opcional)</label>
          <input
            id="email"
            type="email"
            value={form.email ?? ""}
            onChange={(event) => setField("email", event.target.value)}
            className={`mt-1 w-full rounded-xl border px-3 py-2 bg-white/80 dark:bg-slate-900/70 ${errors.email ? "border-red-500" : "border-brand-200"}`}
            placeholder="tu@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-700">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2 flex items-start gap-2">
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setField("consent", event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <label htmlFor="consent" className="text-sm text-slate-700 dark:text-slate-300">
            He leido y acepto la{" "}
            <a className="underline" href="/legal/privacidad">
              Politica de privacidad
            </a>
            .
          </label>
        </div>
        {errors.consent && <p className="sm:col-span-2 text-xs text-red-700">{errors.consent}</p>}

        <input
          type="text"
          name="website"
          value={form.website ?? ""}
          onChange={(event) => setField("website", event.target.value)}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" disabled={status === "loading"}>{status === "loading" ? "Enviando..." : "Enviar feedback"}</Button>
        <p aria-live="polite" className={`${status === "error" ? "text-red-700" : status === "ok" ? "text-brand-700" : "text-slate-600"} text-sm`}>
          {message}
        </p>
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Email opcional solo si quieres respuesta. No compartimos datos con terceros.</p>
    </form>
  );
}
