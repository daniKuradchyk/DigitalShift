"use client";

import React, { useState } from "react";
import Button from "@/components/common/Button";
import { irpfFeedbackSchema, type IrpfFeedbackPayload } from "@/lib/labs/irpfFeedback";

type Errors = Partial<Record<keyof IrpfFeedbackPayload, string>>;

const categories = [
  { value: "calculo", label: "Cálculo / resultado" },
  { value: "datos", label: "Datos o normativa" },
  { value: "ui", label: "Interfaz / uso" },
  { value: "otro", label: "Otro" },
] as const;

const steps = [
  { value: "unknown", label: "No sé / no aplica" },
  { value: "A", label: "Paso A - Situación" },
  { value: "B", label: "Paso B - Ingresos" },
  { value: "C", label: "Paso C - Personal" },
  { value: "D", label: "Paso D - Helpers" },
  { value: "E", label: "Paso E - Resultado" },
] as const;

/* ── Clases compartidas del sistema corporativo ───────────────── */
const fieldLabel = "block text-sm font-medium text-[#101014]";
const fieldControl = "mt-2 h-10 w-full px-3 text-sm text-[#101014]";
const textareaControl = "mt-2 w-full px-3 py-2.5 text-sm leading-relaxed text-[#101014]";
const errorText = "mt-1.5 text-xs text-[#B42318]";
const errorBorder = { borderColor: "#B42318" } as const;

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
      setMessage("No se pudo enviar. Inténtalo de nuevo.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[4px] border border-[#E4E6EA] bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#63666D]">Feedback</p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#101014]">¿Detectaste un error en el estimador?</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-[#3D4046]">Tu feedback nos ayuda a mejorar el resultado.</p>
        </div>
        <span className="inline-flex items-center border border-[#E4E6EA] px-2.5 py-1 text-xs font-medium text-[#63666D]">
          Sin registro
        </span>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="category" className={fieldLabel}>Categoría*</label>
          <select
            id="category"
            value={form.category}
            onChange={(event) => setField("category", event.target.value as IrpfFeedbackPayload["category"])}
            className={fieldControl}
            style={errors.category ? errorBorder : undefined}
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
          {errors.category && <p className={errorText}>{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="step" className={fieldLabel}>Paso (opcional)</label>
          <select
            id="step"
            value={form.step ?? "unknown"}
            onChange={(event) => setField("step", event.target.value as IrpfFeedbackPayload["step"])}
            className={fieldControl}
          >
            {steps.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="details" className={fieldLabel}>Describe el error*</label>
          <textarea
            id="details"
            rows={4}
            value={form.details}
            onChange={(event) => setField("details", event.target.value)}
            className={textareaControl}
            style={errors.details ? errorBorder : undefined}
            placeholder="Ejemplo: el cálculo de retenciones no coincide con el tramo X."
          />
          {errors.details && <p className={errorText}>{errors.details}</p>}
        </div>

        <div>
          <label htmlFor="name" className={fieldLabel}>Nombre (opcional)</label>
          <input
            id="name"
            type="text"
            value={form.name ?? ""}
            onChange={(event) => setField("name", event.target.value)}
            className={fieldControl}
          />
        </div>

        <div>
          <label htmlFor="email" className={fieldLabel}>Email (opcional)</label>
          <input
            id="email"
            type="email"
            value={form.email ?? ""}
            onChange={(event) => setField("email", event.target.value)}
            className={fieldControl}
            style={errors.email ? errorBorder : undefined}
            placeholder="tu@email.com"
          />
          {errors.email && <p className={errorText}>{errors.email}</p>}
        </div>

        <div className="flex items-start gap-2.5 lg:col-span-2">
          <input
            id="consent"
            type="checkbox"
            checked={form.consent}
            onChange={(event) => setField("consent", event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <label htmlFor="consent" className="text-sm leading-relaxed text-[#3D4046]">
            He leído y acepto la{" "}
            <a
              className="font-medium text-[#101014] underline decoration-[#C9CCD3] underline-offset-4 transition-colors hover:decoration-brand-600"
              href="/legal/privacidad"
            >
              Política de privacidad
            </a>
            .
          </label>
        </div>
        {errors.consent && <p className={`lg:col-span-2 ${errorText}`}>{errors.consent}</p>}

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

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Enviando..." : "Enviar feedback"}
        </Button>
        <p
          aria-live="polite"
          className="text-sm"
          style={{ color: status === "error" ? "#B42318" : status === "ok" ? "#2C4BC4" : "#63666D" }}
        >
          {message}
        </p>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-[#63666D]">Email opcional solo si quieres respuesta. No compartimos datos con terceros.</p>
    </form>
  );
}

