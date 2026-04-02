import Link from "next/link";
import { getServices, type ServiceSlug } from "@/content/services";

type Variant = "home" | "hub" | "related";

type Props = {
  variant?: Variant;
  slugs?: ServiceSlug[];
};

const variantClasses: Record<Variant, string> = {
  home: "lg:grid-cols-2",
  hub: "lg:grid-cols-2",
  related: "md:grid-cols-3",
};

const cardClasses: Record<Variant, string> = {
  home: "surface-card group relative overflow-hidden rounded-[1.75rem] p-6 transition-all hover:-translate-y-1 hover:border-violet-400/25",
  hub: "surface-card group relative overflow-hidden rounded-[1.75rem] p-6 transition-all hover:-translate-y-0.5 hover:border-violet-400/25",
  related: "surface-card group relative overflow-hidden rounded-[1.5rem] p-5 transition-all hover:-translate-y-0.5 hover:border-violet-400/25",
};

export default function ServiceCards({ variant = "hub", slugs }: Props) {
  const selected = getServices().filter((service) => (slugs ? slugs.includes(service.slug) : true));

  return (
    <div className={`grid gap-5 ${variantClasses[variant]}`}>
      {selected.map((service) => {
        const summary =
          variant === "home" ? service.homeSummary : variant === "related" ? service.homeSummary : service.cardSummary;
        const detail =
          variant === "home"
            ? service.scenarios[0]?.title ?? service.intent
            : variant === "related"
              ? service.scenarios[0]?.title ?? service.shortTitle
              : service.intent;
        const footerLabel = variant === "hub" ? "Encaje principal" : "Escenario habitual";

        return (
          <Link key={service.slug} href={service.href} className={cardClasses[variant]}>
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(167,139,250,0.60),transparent)] opacity-70"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-violet-400">{service.index}</p>
                <h3 className="mt-3 text-xl font-bold tracking-tight transition-colors group-hover:text-violet-300" style={{ color: "var(--text-primary)" }}>
                  {service.shortTitle}
                </h3>
              </div>
              <span className="rounded-full border border-violet-400/12 bg-violet-500/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.16em]" style={{ color: "var(--text-secondary)" }}>
                {service.eyebrow}
              </span>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{summary}</p>

            <div className="relative mt-5 border-t border-violet-500/8 pt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-violet-400">{footerLabel}</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <span className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{detail}</span>
                <span className="shrink-0 text-violet-400 transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
