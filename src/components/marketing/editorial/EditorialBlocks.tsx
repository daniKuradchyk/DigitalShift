import Link from "next/link";
import Button from "@/components/common/Button";
import {
  getServices,
  type ServiceProblem,
  type ServiceScenario,
  type ServiceSlug,
  type ServiceStep,
} from "@/content/services";
import { caseStudies } from "@/content/proof";

/**
 * Bloques editoriales — Server Components.
 * Sistema corporativo claro: blanco, tinta, líneas finas y un único acento azul.
 * Reveal via CSS (`animate-fade-up` + `delay-*`). Sin framer-motion.
 */

/* ────────────────────────────────────────────────────────────────
   PROBLEM NARRATIVE
   ──────────────────────────────────────────────────────────────── */
export function ProblemNarrative({
  intro,
  items,
}: {
  intro?: string;
  items: ServiceProblem[];
}) {
  return (
    <div>
      {intro && (
        <p className="mb-12 max-w-3xl text-lg leading-relaxed text-[#3D4046] animate-fade-up">
          {intro}
        </p>
      )}

      <div className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
        {items.map((item, i) => (
          <article
            key={item.title}
            className="grid grid-cols-12 gap-4 py-8 sm:gap-6 sm:py-10 animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xl sm:text-2xl font-light tabular-nums leading-none tracking-tight text-[#9DA0A6]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="col-span-10 sm:col-span-11 lg:col-span-7 lg:col-start-2">
              <h3 className="mb-3 text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-[#101014]">
                {item.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-[#3D4046]">
                {item.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   DECISION DUO
   ──────────────────────────────────────────────────────────────── */
export function DecisionDuo({
  yesTitle = "Cuándo sí",
  noTitle = "Cuándo no",
  yes,
  no,
}: {
  yesTitle?: string;
  noTitle?: string;
  yes: string[];
  no: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
      <div className="border border-[#E4E6EA] bg-white p-7 sm:p-8 animate-fade-up">
        <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
          <span aria-hidden className="inline-block h-px w-3 bg-brand-600" />
          {yesTitle}
        </div>
        <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
          {yes.map((item) => (
            <li
              key={item}
              className="py-3.5 text-[15px] leading-relaxed text-[#3D4046]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-[#E4E6EA] bg-[#F5F6F8] p-7 sm:p-8 animate-fade-up delay-100">
        <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
          <span aria-hidden className="inline-block h-px w-3 bg-[#C9CCD3]" />
          {noTitle}
        </div>
        <ul className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
          {no.map((item) => (
            <li
              key={item}
              className="py-3.5 text-[15px] leading-relaxed text-[#63666D]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   SCENARIO ROWS
   ──────────────────────────────────────────────────────────────── */
export function ScenarioRows({ items }: { items: ServiceScenario[] }) {
  return (
    <div className="divide-y divide-[#E4E6EA] border-t border-[#E4E6EA]">
      {items.map((item, i) => (
        <article
          key={item.title}
          className="grid grid-cols-12 gap-4 py-10 sm:gap-6 lg:gap-10 animate-fade-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="col-span-12 lg:col-span-5">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
              Escenario {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight text-[#101014]">
              {item.title}
            </h3>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <p className="mb-4 text-base leading-relaxed text-[#3D4046]">
              {item.description}
            </p>
            {item.note && (
              <p className="border-l border-[#C9CCD3] pl-4 text-sm leading-relaxed text-[#63666D]">
                {item.note}
              </p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   PROCESS RAIL
   ──────────────────────────────────────────────────────────────── */
export function ProcessRail({ items }: { items: ServiceStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((step, i) => (
        <li
          key={step.step}
          className="border-t border-[#E4E6EA] pt-6 animate-fade-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <span className="flex h-10 w-10 items-center justify-center border border-[#E4E6EA] text-sm font-semibold tabular-nums text-[#101014]">
            {step.step}
          </span>

          <h3 className="mt-5 text-lg font-semibold leading-tight tracking-tight text-[#101014]">
            {step.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#3D4046]">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ────────────────────────────────────────────────────────────────
   DELIVERABLE SHEET
   ──────────────────────────────────────────────────────────────── */
export function DeliverableSheet({
  items,
  footer,
}: {
  items: string[];
  footer?: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="animate-fade-up">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            Lo que llevas a casa
          </p>
          <p className="max-w-sm text-base leading-relaxed text-[#3D4046]">
            Sin asteriscos, sin sorpresas. Lo que aparece aquí es lo que
            entregamos en el alcance acordado.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <ul className="divide-y divide-[#E4E6EA] border-t border-b border-[#E4E6EA]">
          {items.map((item, i) => (
            <li
              key={item}
              className="flex items-baseline gap-4 py-4 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="shrink-0 text-xs tabular-nums text-[#9DA0A6]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] leading-relaxed text-[#3D4046]">
                {item}
              </span>
            </li>
          ))}
        </ul>
        {footer && (
          <p
            className="mt-5 text-sm leading-relaxed text-[#63666D] animate-fade-up"
            style={{ animationDelay: `${items.length * 60}ms` }}
          >
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   INTEGRATION STRIP
   ──────────────────────────────────────────────────────────────── */
export function IntegrationStrip({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2.5 gap-y-2">
      {items.map((item, i) => (
        <li
          key={item}
          className="border border-[#E4E6EA] bg-white px-2.5 py-1 text-xs sm:text-sm text-[#3D4046] animate-fade-up"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ────────────────────────────────────────────────────────────────
   BENEFIT PROSE
   ──────────────────────────────────────────────────────────────── */
export function BenefitProse({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
      {items.map((item, i) => (
        <div
          key={item}
          className="flex gap-4 border-t border-[#E4E6EA] pt-5 animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="shrink-0 text-sm font-semibold tabular-nums text-[#9DA0A6]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-base leading-relaxed text-[#3D4046]">{item}</p>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   CASE INLINE
   ──────────────────────────────────────────────────────────────── */
export function CaseInline({ ids }: { ids: string[] }) {
  const selected = caseStudies.filter((item) => ids.includes(item.id));
  if (!selected.length) return null;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
      {selected.map((item, i) => (
        <article
          key={item.id}
          className="border border-[#E4E6EA] bg-white p-7 sm:p-8 animate-fade-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            {item.client}
          </p>

          <h3 className="mb-3 text-lg sm:text-xl font-semibold leading-snug tracking-tight text-[#101014]">
            {item.headline}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-[#3D4046]">
            {item.challenge}
          </p>

          <div className="flex items-baseline gap-3 border-t border-[#E4E6EA] pt-5">
            <span className="text-3xl sm:text-4xl font-semibold tabular-nums tracking-tight text-[#101014]">
              {item.metric}
            </span>
            <span className="text-xs leading-tight text-[#63666D]">
              {item.metricLabel}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   RELATED NAV
   ──────────────────────────────────────────────────────────────── */
export function RelatedNav({ slugs }: { slugs: ServiceSlug[] }) {
  const items = getServices().filter((s) => slugs.includes(s.slug));

  return (
    <div className="grid grid-cols-1 gap-px border border-[#E4E6EA] bg-[#E4E6EA] md:grid-cols-3">
      {items.map((s, i) => (
        <Link
          key={s.slug}
          href={s.href}
          className="group flex h-full flex-col bg-white p-6 transition-colors duration-200 hover:bg-[#F5F6F8] sm:p-7 animate-fade-up"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <span className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#63666D]">
            Sigue por
          </span>
          {/* h3, no h4: el bloque va precedido de un h2 y saltar a h4 rompe la jerarquía.
              Mismas clases, así que el aspecto no cambia. */}
          <h3 className="mb-3 text-base sm:text-lg font-semibold leading-snug tracking-tight text-[#101014] transition-colors duration-200 group-hover:text-brand-600">
            {s.shortTitle}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-[#3D4046]">
            {s.cardSummary}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#101014]">
            <span className="border-b border-[#C9CCD3] transition-colors duration-200 group-hover:border-brand-600 group-hover:text-brand-600">
              Ver servicio
            </span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </Link>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   EDITORIAL FINAL CTA
   ──────────────────────────────────────────────────────────────── */
export function EditorialFinalCta({
  kicker,
  title,
  body,
  primaryHref = "/#contacto",
  primaryLabel = "Diagnóstico gratuito",
  secondaryHref,
  secondaryLabel,
}: {
  kicker?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="grid grid-cols-12 gap-6 border-t border-[#E4E6EA] py-16 sm:py-20 lg:gap-10 animate-fade-up">
      <div className="col-span-12 lg:col-span-7">
        <p className="section-tag">{kicker || "Siguiente paso"}</p>

        <h2 className="text-h2 mt-5">{title}</h2>

        <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#3D4046]">
          {body}
        </p>
      </div>

      <div className="col-span-12 lg:col-span-5 lg:flex lg:items-end lg:justify-end">
        <div className="flex flex-wrap gap-3">
          <Button as="a" href={primaryHref} variant="primary">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button as="a" href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
