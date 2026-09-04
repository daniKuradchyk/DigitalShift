/**
 * AutomationBlocks — bloques exclusivos para /servicios/automatizacion-integraciones.
 * Tema visual: flujo visible. Before/After, diagrama de pipeline, ROI horas.
 * Server Components.
 */

const LABEL = "text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]";

/* ────────────────────────────────────────────────────────────────
   BEFORE / AFTER — comparativa de pipeline
   ──────────────────────────────────────────────────────────────── */
export function AutomationBeforeAfter() {
  const before = [
    { step: "Formulario llega a email genérico", note: "↓ alguien lo lee cuando puede" },
    { step: "Copy/paste a hoja de cálculo", note: "↓ con suerte el mismo día" },
    { step: "Crear contacto en CRM a mano", note: "↓ típico error de tecleo" },
    { step: "Asignar comercial · ping en Slack", note: "↓ a veces no se hace" },
    { step: "Email de bienvenida manual", note: null },
  ];

  const after = [
    { step: "Webhook captura el formulario · 200ms", note: "↓ validación · enriquecimiento" },
    { step: "Contacto creado/actualizado en CRM", note: "↓ regla por origen + score" },
    { step: "Asignación automática a comercial", note: "↓ Slack + email + tarea CRM" },
    { step: "Email de bienvenida disparado", note: "↓ logs + reintento si falla" },
    { step: "Métrica disponible en dashboard", note: null },
  ];

  return (
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] lg:grid-cols-2">
      {/* ANTES */}
      <div className="animate-fade-up bg-white p-6 sm:p-8">
        <p className={LABEL}>Antes · flujo manual</p>

        <div className="mt-6 space-y-3">
          {before.map((b) => (
            <div key={b.step}>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-[#C9CCD3]" />
                <span className="text-[13px] leading-relaxed text-[#3D4046] sm:text-sm">
                  {b.step}
                </span>
              </div>
              {b.note && (
                <p className="mt-2 pl-[1.125rem] text-xs italic text-[#9DA0A6]">{b.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-baseline gap-3 border-t border-[#E4E6EA] pt-6">
          <span className="text-3xl font-semibold tabular-nums tracking-tight text-[#63666D]">
            ~12 min
          </span>
          <span className="text-xs text-[#63666D]">por lead · con error humano</span>
        </div>
      </div>

      {/* DESPUÉS */}
      <div className="animate-fade-up bg-[#F5F6F8] p-6 delay-100 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          Después · flujo orquestado
        </p>

        <div className="mt-6 space-y-3">
          {after.map((a) => (
            <div key={a.step}>
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-1.5 w-1.5 shrink-0 bg-brand-600" />
                <span className="text-[13px] leading-relaxed text-[#3D4046] sm:text-sm">
                  {a.step}
                </span>
              </div>
              {a.note && (
                <p className="mt-2 pl-[1.125rem] text-xs italic text-[#63666D]">{a.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-baseline gap-3 border-t border-[#E4E6EA] pt-6">
          <span className="text-3xl font-semibold tabular-nums tracking-tight text-[#101014]">
            ~6 seg
          </span>
          <span className="text-xs text-[#63666D]">por lead · con logs y reintentos</span>
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
    <div className="border border-[#E4E6EA]">
      <div className="grid grid-cols-12 border-b border-[#E4E6EA] bg-[#F5F6F8]">
        <div className="col-span-12 px-4 py-3 sm:col-span-5 sm:px-5">
          <span className={LABEL}>Flujo</span>
        </div>
        <div className="col-span-4 px-4 py-3 sm:col-span-2 sm:px-5">
          <span className={LABEL}>Manual</span>
        </div>
        <div className="col-span-4 px-4 py-3 sm:col-span-2 sm:px-5">
          <span className={LABEL}>Auto</span>
        </div>
        <div className="col-span-4 px-4 py-3 sm:col-span-3 sm:px-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
            Ahorro
          </span>
        </div>
      </div>

      <ul className="divide-y divide-[#E4E6EA]">
        {items.map((it, i) => (
          <li
            key={it.flow}
            className="grid animate-fade-up grid-cols-12"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="col-span-12 px-4 pt-4 sm:col-span-5 sm:px-5 sm:py-5">
              <span className="text-sm font-medium text-[#101014]">{it.flow}</span>
            </div>
            <div className="col-span-4 px-4 py-4 sm:col-span-2 sm:px-5 sm:py-5">
              <span className="text-[13px] tabular-nums text-[#63666D] sm:text-sm">
                {it.manual}
              </span>
            </div>
            <div className="col-span-4 px-4 py-4 sm:col-span-2 sm:px-5 sm:py-5">
              <span className="text-[13px] tabular-nums text-[#3D4046] sm:text-sm">
                {it.auto}
              </span>
            </div>
            <div className="col-span-4 px-4 py-4 sm:col-span-3 sm:bg-[#F5F6F8] sm:px-5 sm:py-5">
              <span className="text-[13px] font-semibold tabular-nums text-[#101014] sm:text-sm">
                {it.saving}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-[#E4E6EA] bg-[#F5F6F8] px-4 py-4 sm:px-5">
        <span className={LABEL}>Ahorro típico mensual acumulado</span>
        <span className="text-lg font-semibold tabular-nums tracking-tight text-[#101014]">
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
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] lg:grid-cols-2">
      <div className="animate-fade-up bg-white p-6 sm:p-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span aria-hidden className="inline-block h-px w-3 bg-brand-600" />
          Sí encaja
        </div>
        <ul className="mt-5 divide-y divide-[#E4E6EA]">
          {yes.map((it) => (
            <li key={it.title} className="py-4 first:pt-0 last:pb-0">
              <p className="text-base font-semibold tracking-tight text-[#101014]">
                {it.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#3D4046]">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="animate-fade-up bg-[#F5F6F8] p-6 delay-100 sm:p-8">
        <div className={`flex items-center gap-2 ${LABEL}`}>
          <span aria-hidden className="inline-block h-px w-3 bg-[#C9CCD3]" />
          Mejor no
        </div>
        <ul className="mt-5 divide-y divide-[#E4E6EA]">
          {no.map((it) => (
            <li key={it.title} className="py-4 first:pt-0 last:pb-0">
              <p className="text-base font-semibold tracking-tight text-[#101014]">
                {it.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#63666D]">{it.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
