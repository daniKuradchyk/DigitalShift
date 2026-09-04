type Props = {
  title: string;
  text: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const primaryCta =
  "inline-flex items-center justify-center rounded-[2px] bg-white px-7 py-3.5 text-[15px] font-medium tracking-tight text-[#101014] transition-colors duration-150 hover:bg-white/90";
const secondaryCta =
  "inline-flex items-center justify-center rounded-[2px] border border-white/30 px-7 py-3.5 text-[15px] font-medium tracking-tight text-white transition-colors duration-150 hover:border-white";

export default function FinalCta({ title, text, secondaryHref, secondaryLabel }: Props) {
  return (
    <section className="band-dark p-10 sm:p-14 lg:p-16 animate-fade-up">
      <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="section-tag animate-fade-up delay-100">
            Siguiente paso
          </p>
          <h2 className="mt-6 max-w-3xl text-h2 text-white animate-fade-up delay-200">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 animate-fade-up delay-300">
            {text}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 animate-fade-up delay-400">
          <a href="/#contacto" className={primaryCta}>
            Agendar diagnóstico
          </a>
          {secondaryHref && secondaryLabel ? (
            <a href={secondaryHref} className={secondaryCta}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
