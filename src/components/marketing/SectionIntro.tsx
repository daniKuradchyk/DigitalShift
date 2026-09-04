type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Nivel semántico del titular. Usa "h1" en el hero de la página. */
  as?: "h1" | "h2";
};

export default function SectionIntro({ eyebrow, title, description, align = "left", as: Heading = "h2" }: Props) {
  const centered = align === "center";

  return (
    <div className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`section-tag animate-fade-up ${centered ? "mx-auto w-fit" : ""}`}>
        {eyebrow}
      </p>

      <div className="animate-fade-up delay-100">
        <Heading className={`mt-6 ${Heading === "h1" ? "text-h1" : "text-h2"} text-[#101014]`}>
          {title}
        </Heading>
      </div>

      {description && (
        <p
          className={`mt-5 max-w-2xl text-lg leading-relaxed text-[#3D4046] animate-fade-up delay-200 ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
