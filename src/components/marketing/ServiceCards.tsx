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
  home: "surface-card group relative overflow-hidden rounded-[1.75rem] p-6 transition-all hover:-translate-y-1 hover:border-sky-300/60 dark:hover:border-sky-500/30",
  hub: "surface-card group relative overflow-hidden rounded-[1.75rem] p-6 transition-all hover:-translate-y-0.5 hover:border-sky-300/60 dark:hover:border-sky-500/30",
  related: "surface-card group relative overflow-hidden rounded-[1.5rem] p-5 transition-all hover:-translate-y-0.5 hover:border-sky-300/60 dark:hover:border-sky-500/30",
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
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.72),transparent)] opacity-70"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-sky-400">{service.index}</p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-sky-400 dark:text-white">
                  {service.shortTitle}
                </h3>
              </div>
              <span className="rounded-full border border-slate-200/70 bg-slate-50/90 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-300">
                {service.eyebrow}
              </span>
            </div>

            <p className="relative mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>

            <div className="relative mt-5 border-t border-slate-200/70 pt-4 dark:border-white/[0.08]">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-sky-400">{footerLabel}</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <span className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{detail}</span>
                <span className="shrink-0 text-sky-400 transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
