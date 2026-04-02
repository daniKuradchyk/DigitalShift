type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionIntro({ eyebrow, title, description, align = "left" }: Props) {
  const centered = align === "center";

  return (
    <div className={`relative ${centered ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}`}>
      <div className={`section-tag mb-4 ${centered ? "mx-auto w-fit" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
        {eyebrow}
      </div>
      <h2 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-[2.65rem]" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      {description ? <p className="mt-4 max-w-3xl text-[1.03rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p> : null}
    </div>
  );
}
