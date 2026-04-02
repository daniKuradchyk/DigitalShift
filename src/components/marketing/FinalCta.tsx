import Button from "@/components/common/Button";

type Props = {
  title: string;
  text: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function FinalCta({ title, text, secondaryHref, secondaryLabel }: Props) {
  return (
    <section className="surface-shell relative overflow-hidden rounded-3xl p-8 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.10),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.06),transparent_32%)]"
      />

      <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-400">Diagnostico</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "var(--text-primary)" }}>{title}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button as="a" href="/#contacto" variant="shine">
            Agendar diagnostico
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button as="a" href={secondaryHref} variant="ghost">
              {secondaryLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
