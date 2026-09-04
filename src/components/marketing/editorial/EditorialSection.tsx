import Container from "@/components/common/Container";

type Props = {
  id?: string;
  eyebrow: string;
  title: string;
  lead?: string;
  marker?: string;
  variant?: "wide" | "split" | "narrow";
  tone?: "white" | "surface";
  children: React.ReactNode;
};

/**
 * Server Component. Sección editorial corporativa: fondo blanco (o #F5F6F8),
 * separada por línea fina, numeral grande a la izquierda.
 * Reveal via CSS `animate-fade-up` + delay (sin framer-motion).
 */
export default function EditorialSection({
  id,
  eyebrow,
  title,
  lead,
  marker,
  variant = "wide",
  tone = "white",
  children,
}: Props) {
  const contentCols =
    variant === "narrow" ? "lg:col-span-9" : "lg:col-span-11";

  return (
    <section
      id={id}
      className={`scroll-mt-28 border-t border-[#E4E6EA] py-20 sm:py-24 lg:py-28 ${
        tone === "surface" ? "bg-[#F5F6F8]" : "bg-white"
      }`}
    >
      <Container>
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-1">
            {marker && (
              <span className="animate-fade-up inline-block text-2xl lg:text-3xl font-light tabular-nums leading-none tracking-tight text-[#9DA0A6]">
                {marker}
              </span>
            )}
          </div>

          <div className={`col-span-12 ${contentCols}`}>
            <div className={variant === "narrow" ? "max-w-3xl" : ""}>
              <p className="section-tag animate-fade-up">{eyebrow}</p>

              <h2 className="text-h2 mt-5 animate-fade-up delay-100">{title}</h2>

              {lead && (
                <p className="mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-[#3D4046] animate-fade-up delay-200">
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
