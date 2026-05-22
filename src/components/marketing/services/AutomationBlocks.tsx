/**
 * AutomationBlocks — bloques exclusivos para /servicios/automatizacion-integraciones.
 * Tema visual: flujo visible. Before/After, diagrama de pipeline, ROI horas.
 * Server Components.
 */

/* ────────────────────────────────────────────────────────────────
   BEFORE / AFTER — comparativa de pipeline
   ──────────────────────────────────────────────────────────────── */
export function AutomationBeforeAfter() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
      {/* BEFORE */}
      <div
        className="rounded-xl border p-6 sm:p-7 animate-fade-up"
        style={{
          background: "rgba(173,193,255,0.02)",
          borderColor: "rgba(173,193,255,0.15)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Antes · flujo manual
          </span>
        </div>

        <div className="font-mono text-[12px] sm:text-[13px] space-y-3"
          style={{ color: "var(--text-muted)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400/30" />
            <span>Formulario llega a email genérico</span>
          </div>
          <div className="pl-4 text-[11px] italic">↓ alguien lo lee cuando puede</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400/30" />
            <span>Copy/paste a hoja de cálculo</span>
          </div>
          <div className="pl-4 text-[11px] italic">↓ con suerte el mismo día</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400/30" />
            <span>Crear contacto en CRM a mano</span>
          </div>
          <div className="pl-4 text-[11px] italic">↓ típico error de tecleo</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400/30" />
            <span>Asignar comercial · ping en Slack</span>
          </div>
          <div className="pl-4 text-[11px] italic">↓ a veces no se hace</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400/30" />
            <span>Email de bienvenida manual</span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t flex items-baseline gap-3"
          style={{ borderColor: "rgba(173,193,255,0.1)" }}
        >
          <span className="text-2xl font-black tabular-nums" style={{ color: "var(--text-muted)" }}>
            ~12 min
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            por lead · con error humano
          </span>
        </div>
      </div>

      {/* AFTER */}
      <div
        className="rounded-xl border p-6 sm:p-7 animate-fade-up delay-100 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,141,239,0.06) 0%, rgba(6,11,26,0.6) 100%)",
          borderColor: "rgba(91,141,239,0.3)",
        }}
      >
        <div className="flex items-center gap-2 mb-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Después · flujo orquestado
          </span>
        </div>

        <div className="font-mono text-[12px] sm:text-[13px] space-y-3"
          style={{ color: "var(--text-secondary)" }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Webhook captura el formulario · 200ms</span>
          </div>
          <div className="pl-4 text-[11px] text-blue-300/60">↓ validación · enriquecimiento</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Contacto creado/actualizado en CRM</span>
          </div>
          <div className="pl-4 text-[11px] text-blue-300/60">↓ regla por origen + score</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Asignación automática a comercial</span>
          </div>
          <div className="pl-4 text-[11px] text-blue-300/60">↓ Slack + email + tarea CRM</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Email de bienvenida disparado</span>
          </div>
          <div className="pl-4 text-[11px] text-blue-300/60">↓ logs + reintento si falla</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Métrica disponible en dashboard</span>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t flex items-baseline gap-3"
          style={{ borderColor: "rgba(91,141,239,0.15)" }}
        >
          <span className="text-2xl font-black tabular-nums text-blue-300">
            ~6 seg
          </span>
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            por lead · con logs y reintentos
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   ROI CALCULATOR (visual) — horas/mes recuperadas
   ──────────────────────────────────────────────────────────────── */
export function AutomationRoiPanel() {
  const items = [
    {
      flow: "Sincronización CRM ↔ ERP",
      manual: "8 h/sem",
      auto: "0 h",
      saving: "32 h/mes",
    },
    {
      flow: "Conciliación de pagos",
      manual: "6 h/sem",
      auto: "30 min/sem",
      saving: "22 h/mes",
    },
    {
      flow: "Generación de informes",
      manual: "4 h/sem",
      auto: "automático",
      saving: "16 h/mes",
    },
    {
      flow: "Onboarding cliente",
      manual: "2 h/cliente",
      auto: "5 min",
      saving: "depende volumen",
    },
  ];

  return (
    <div className="rounded-xl border overflow-hidden"
      style={{ borderColor: "rgba(91,141,239,0.15)" }}
    >
      <div
        className="grid grid-cols-12 gap-px px-0 py-0"
        style={{ background: "rgba(91,141,239,0.12)" }}
      >
        <div className="col-span-12 sm:col-span-5 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Flujo
          </span>
        </div>
        <div className="col-span-4 sm:col-span-2 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--text-muted)" }}
          >
            Manual
          </span>
        </div>
        <div className="col-span-4 sm:col-span-2 px-4 py-3" style={{ background: "var(--bg-page)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Auto
          </span>
        </div>
        <div className="col-span-4 sm:col-span-3 px-4 py-3" style={{ background: "rgba(91,141,239,0.08)" }}>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-300">
            Ahorro
          </span>
        </div>

        {items.map((it, i) => (
          <div key={it.flow} className="contents">
            <div
              className="col-span-12 sm:col-span-5 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60}ms` }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                {it.flow}
              </span>
            </div>
            <div
              className="col-span-4 sm:col-span-2 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60 + 20}ms` }}
            >
              <span className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
                {it.manual}
              </span>
            </div>
            <div
              className="col-span-4 sm:col-span-2 px-4 py-4 animate-fade-up"
              style={{ background: "var(--bg-page)", animationDelay: `${i * 60 + 40}ms` }}
            >
              <span className="text-sm font-mono text-blue-300">{it.auto}</span>
            </div>
            <div
              className="col-span-4 sm:col-span-3 px-4 py-4 animate-fade-up"
              style={{ background: "rgba(91,141,239,0.04)", animationDelay: `${i * 60 + 60}ms` }}
            >
              <span className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>
                {it.saving}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t flex items-center justify-between"
        style={{
          background: "rgba(91,141,239,0.04)",
          borderColor: "rgba(91,141,239,0.15)",
        }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--text-muted) " }}
        >
          Ahorro típico mensual acumulado
        </span>
        <span className="text-lg font-black tabular-nums text-blue-300">
          70+ h/mes
        </span>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   AI WHEN / WHEN-NOT — bloque más fuerte que el genérico
   ──────────────────────────────────────────────────────────────── */
export function AutomationAiHonestStance() {
  const yes = [
    {
      title: "Clasificación masiva",
      desc: "Triage de tickets, emails, documentos por categoría · IA acierta el 95%+ con prompt bien hecho",
    },
    {
      title: "Extracción de datos no estructurados",
      desc: "PDFs de facturas, contratos, formularios escaneados · valida contra reglas del negocio",
    },
    {
      title: "Resumen y síntesis",
      desc: "Actas, conversaciones largas, contenido de soporte · genera estructura sobre texto bruto",
    },
    {
      title: "Asistencia interna",
      desc: "Chatbot que sabe vuestra documentación · RAG sobre conocimiento propio, no GPT genérico",
    },
  ];
  const no = [
    {
      title: "Reglas deterministas",
      desc: "Si X entonces Y, un if/else o una API basta. Meter IA solo encarece y añade no determinismo",
    },
    {
      title: "Datos críticos sin tolerancia a error",
      desc: "Pagos, contabilidad, compliance · la IA aún se equivoca. No es la capa de decisión",
    },
    {
      title: "Volumen bajo",
      desc: "10 docs al mes · el coste por llamada y la complejidad operativa no compensan el ahorro",
    },
    {
      title: "Quedar bien con el consejo",
      desc: "'Nuestra empresa usa IA' no es un caso de uso. Es marketing interno · no resuelve nada",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="rounded-xl border p-6 sm:p-7 animate-fade-up"
        style={{
          background: "rgba(91,141,239,0.04)",
          borderColor: "rgba(91,141,239,0.25)",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-blue-300 mb-5">
          ✓ Sí encaja
        </p>
        <ul className="space-y-5">
          {yes.map((it, i) => (
            <li key={it.title} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <p className="text-base font-bold mb-1.5"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
              >
                {it.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {it.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border p-6 sm:p-7 animate-fade-up delay-100"
        style={{
          background: "rgba(173,193,255,0.02)",
          borderColor: "rgba(173,193,255,0.12)",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          × Mejor no
        </p>
        <ul className="space-y-5">
          {no.map((it, i) => (
            <li key={it.title} className="animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <p className="text-base font-bold mb-1.5"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.015em" }}
              >
                {it.title}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {it.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
