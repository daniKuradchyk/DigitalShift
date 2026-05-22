import Container from "@/components/common/Container";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  marker?: string;
  variant?: "wide" | "split" | "narrow";
  children: React.ReactNode;
};

/**
 * Server Component. Reveal via CSS `animate-fade-up` + delay (sin framer-motion).
 */
export default function EditorialSection({
  id,
  eyebrow,
  title,
  lead,
  marker,
  variant = "wide",
  children,
}: Props) {
  const contentCols =
    variant === "narrow" ? "lg:col-span-9" : "lg:col-span-11";

  return (
    <section
      id={id}
      className="relative scroll-mt-28 py-16 sm:py-20 lg:py-28"
    >
      <Container>
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-1">
            {marker && (
              <span
                className="font-mono text-2xl lg:text-3xl font-light tabular-nums leading-none inline-block animate-fade-up"
                style={{
                  color: "rgba(91,141,239,0.4)",
                  letterSpacing: "-0.02em",
                }}
              >
                {marker}
              </span>
            )}
          </div>

          <div className={`col-span-12 ${contentCols}`}>
            <div className={variant === "narrow" ? "max-w-3xl" : ""}>
              <span
                className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] mb-3 animate-fade-up"
                style={{ color: "var(--accent-light)" }}
              >
                {eyebrow}
              </span>

              <h2
                className="font-bold animate-fade-up delay-100"
                style={{
                  color: "var(--text-primary)",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.15,
                }}
              >
                {title}
              </h2>

              {lead && (
                <p
                  className="mt-4 text-base sm:text-lg leading-relaxed max-w-3xl animate-fade-up delay-200"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {lead}
                </p>
              )}
            </div>

            <div className="mt-10 sm:mt-12">{children}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
