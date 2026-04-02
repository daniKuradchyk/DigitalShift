import Container from "@/components/common/Container";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/marketing/Breadcrumbs";

type Props = {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  subtitle: string;
  panelTitle: string;
  panelLines: string[];
};

export default function ServicePageHero({
  breadcrumbs,
  eyebrow,
  title,
  subtitle,
  panelTitle,
  panelLines,
}: Props) {
  return (
    <section className="pb-12 pt-16 sm:pb-16 sm:pt-20">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <div className="surface-shell relative overflow-hidden rounded-[2rem] p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.06),transparent_34%)]"
          />

          <div className="relative grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-4xl">
              <div className="section-tag mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                {eyebrow}
              </div>
              <h1 className="text-4xl font-black tracking-[-0.03em] sm:text-5xl" style={{ color: "var(--text-primary)" }}>
                {title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>{subtitle}</p>
            </div>

            <div className="surface-panel relative overflow-hidden rounded-3xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-violet-400">{panelTitle}</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {panelLines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
