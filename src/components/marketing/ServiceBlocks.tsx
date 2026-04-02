import type { ServiceProblem, ServiceScenario, ServiceStep } from "@/content/services";
import { caseStudies } from "@/content/proof";

const cardClass = "surface-card relative overflow-hidden rounded-3xl p-6";

const lineClass = "surface-line absolute inset-x-0 top-0 h-px";

export function ProblemGrid({ items }: { items: ServiceProblem[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {items.map((item) => (
        <article key={item.title} className={cardClass}>
          <div aria-hidden className={lineClass} />
          <h3 className="relative text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
          <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.description}</p>
        </article>
      ))}
    </div>
  );
}

export function DeliverableList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item, index) => (
        <div
          key={item}
          className="surface-card relative overflow-hidden rounded-2xl p-4"
        >
          <div aria-hidden className={lineClass} />
          <div className="relative flex gap-4">
            <span className="font-mono text-sm text-violet-400">{String(index + 1).padStart(2, "0")}</span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ScenarioGrid({ items }: { items: ServiceScenario[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {items.map((item) => (
        <article key={item.title} className={cardClass}>
          <div aria-hidden className={lineClass} />
          <h3 className="relative text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
          <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.description}</p>
          <p className="relative mt-4 border-t border-violet-500/8 pt-4 text-sm" style={{ color: "var(--text-muted)" }}>
            {item.note}
          </p>
        </article>
      ))}
    </div>
  );
}

export function ProcessTimeline({ items }: { items: ServiceStep[] }) {
  return (
    <ol className="grid gap-5 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.step} className={cardClass}>
          <div aria-hidden className={lineClass} />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">{item.step}</p>
          <h3 className="relative mt-4 text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
          <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

export function FitPanels({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-3xl border border-emerald-500/20 bg-[linear-gradient(180deg,rgba(6,24,22,0.96),rgba(5,18,16,0.9))] p-6 shadow-[0_20px_52px_-34px_rgba(0,0,0,0.85)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">Si encaja</p>
        <ul className="mt-4 space-y-3">
          {yes.map((item) => (
            <li key={item} className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className={cardClass}>
        <div aria-hidden className={lineClass} />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--text-muted)" }}>No encaja</p>
        <ul className="relative mt-4 space-y-3">
          {no.map((item) => (
            <li key={item} className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function BenefitList({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item}
          className="surface-card relative overflow-hidden rounded-2xl px-5 py-4 text-sm leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          <div aria-hidden className={lineClass} />
          <span className="relative">{item}</span>
        </div>
      ))}
    </div>
  );
}

export function CaseHighlights({ ids }: { ids: string[] }) {
  const selected = caseStudies.filter((item) => ids.includes(item.id));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {selected.map((item) => (
        <article key={item.id} className={cardClass}>
          <div aria-hidden className={lineClass} />
          <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">{item.client}</p>
          <h3 className="relative mt-4 text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>{item.headline}</h3>
          <p className="relative mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.challenge}</p>
          <div className="relative mt-4 border-t border-violet-500/8 pt-4">
            <p className="text-2xl font-black tracking-tight" style={{ color: item.accent }}>
              {item.metric}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{item.metricLabel}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
